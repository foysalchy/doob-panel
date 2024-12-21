import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import { ChevronDown, ChevronUp, Printer } from 'lucide-react';
import ShippingModal from "../ManageOrder/ShipingModal";
import { useQuery } from "@tanstack/react-query";
import Woo_Shipping_Modal from "./Woo_Shiping_Modal";

const WooCommerceTableRow = ({ data, refetch, set_woo_select_item, woo_select_item, currentItems }) => {
      const [isExpanded, setIsExpanded] = useState(false);
      const { shopInfo } = useContext(AuthContext);


      const { data: ships = [] } = useQuery({
            queryKey: ["getaway"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/shipping-interrogation/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const {
            data: admin_shop = [],
      } = useQuery({
            queryKey: ["admin_shop"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/allShippings"
                  );
                  const data = await res.json();
                  return data;
            },
      });







      const { data: woo_order = [], isLoading } = useQuery({
            queryKey: ["woo_order_status"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/woo-order-status?shop_id=${shopInfo?._id ?? null}&is_admin=${shopInfo ? false : true}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });




      function getTimeAgo(timestamp) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - new Date(timestamp).getTime();

            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const days = Math.floor(hours / 24);

            if (hours < 24) {
                  return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
            } else {
                  return `${days} day${days !== 1 ? "s" : ""} ago`;
            }
      }

      const update_order_status = (status, order_id, shop_id) => {
            fetch(
                  `https://doob.dev/api/v1/seller/woo-order-status-update?order_id=${order_id}&status=${status}&shop_id=${shop_id ?? shopInfo._id}`
            )
                  .then((res) => res.json())
                  .then((data) => {

                        BrightAlert({ timeDuration: 3000 });
                        refetch();
                  });
      };


      const getStatusColor = (status) => {
            switch (status) {
                  case "completed":
                        return "bg-green-100 text-green-800";
                  case "processing":
                        return "bg-blue-100 text-blue-800";
                  case "on-hold":
                        return "bg-yellow-100 text-yellow-800";
                  case "cancelled":
                        return "bg-red-100 text-red-800";
                  default:
                        return "bg-gray-100 text-gray-800";
            }
      };

      const [ready_to_ship, setReadyToShip] = useState(false);



      const isItemSelected = (item) =>
            woo_select_item.some((selectedItem) => selectedItem.id === item?.id);

      const handleCheckboxChange = (event, item) => {
            set_woo_select_item((prevSelectedItems) =>
                  event.target.checked
                        ? [...prevSelectedItems, item] // Add the item if checked
                        : prevSelectedItems.filter(
                              (selectedItem) => selectedItem.id !== item?.id // Remove the item if unchecked
                        )
            );
      };

      const local_status_updated = (status, order_id) => {


            fetch(`https://doob.dev/api/v1/seller/woo-order-status-update?order_id=${order_id}&shop_id=${data?.shopId ?? shopInfo._id}`, {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        orderId: data?.id,
                        billing: data?.billing,
                        shipping: data?.shipping,
                        line_items: data?.line_items,
                        shop_id: shopInfo._id ?? data.shopId,
                        is_admin: true,
                        order_status: status,
                        time_stamp: new Date().toLocaleString(),
                  }),
            }).then((res) => res.json()).then((data) => {
                  BrightAlert({ title: data?.message, timeDuration: 3000 });
                  refetch();
            });
      }

      return (
            <>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, data)}
                                    checked={isItemSelected(data)}
                              />
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                                    aria-expanded={isExpanded}
                                    aria-label={isExpanded ? "Collapse row" : "Expand row"}
                              >
                                    {isExpanded ? (
                                          <ChevronUp className="w-5 h-5" />
                                    ) : (
                                          <ChevronDown className="w-5 h-5" />
                                    )}
                              </button>
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              <Link
                                    to={`/woo-invoice/${shopInfo._id ?? data.shopId}/${data?.id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                    Invoice
                              </Link>
                        </td>
                        <td className="whitespace-nowrap text-blue-600 hover:text-blue-800 border-r px-4 py-3 font-medium">
                              <Link to={`/seller/woo-details/${shopInfo._id}/${data.id}`}>   {data?.number}</Link>
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              {new Date(data?.date_created).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              {getTimeAgo(data?.date_created)}
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              {data?.payment_method_title}
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3 font-medium">
                              {woo_order.some((itm) => itm?.orderId === data?.id) && (
                                    <div className="flex flex-col items-center justify-center">
                                          <h1 className={`inline-block px-2 py-1 text-xs font-semibold rounded-full`}>{woo_order.find((itm) => itm?.orderId == data?.id)?.courier_status}</h1>
                                          <h1 className={`inline-block px-2 py-1 text-xs font-semibold rounded-full`}>{woo_order.find((itm) => itm?.orderId == data?.id)?.courier_name}</h1>
                                          <h1 className={`inline-block px-2 py-1 text-xs font-semibold rounded-full`}>{woo_order.find((itm) => itm?.orderId == data?.id)?.courier_id}</h1>
                                    </div>
                              )}
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3 font-medium">
                              {data?.total}
                        </td>

                        <td className="whitespace-nowrap border-r px-4 py-3">
                              <span
                                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full`}
                              >
                                    {data?.status}|   {woo_order.some((itm) => itm?.orderId === data?.id) && (
                                    <div className="flex flex-col items-center justify-center">
                                          <h1 title="site status" className={`inline-block px-2 py-1 text-xs font-semibold rounded-full`}>{woo_order.find((itm) => itm?.orderId == data?.id)?.order_status}</h1> 
                                    </div>
                              )}
                              </span>
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              <div className="flex flex-col gap-2">
                                    {data?.status === "pending" && (
                                          <>
                                                <button
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                      onClick={() => update_order_status("processing", data?.id, data.shopId)}
                                                >
                                                      Ready to Ship
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("cancelled", data?.id, data.shopId)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Cancel
                                                </button>
                                          </>
                                    )}
                                    {data?.status === "processing" && (
                                          <>
                                                <button
                                                      onClick={() => update_order_status("on-hold", data?.id, data.shopId)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      On Hold
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("completed", data?.id, data.shopId)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Complete
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("cancelled", data?.id, data.shopId)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Cancel
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("failed", data?.id, data.shopId)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Failed
                                                </button>
                                          </>
                                    )}
                                    {data?.status === "on-hold" && (
                                          <>
                                                <button
                                                      onClick={() => update_order_status("completed", data?.id)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Complete
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("failed", data?.id)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Failed
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("cancelled", data?.id)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Cancel
                                                </button>
                                          </>
                                    )}
                                    {data?.status === "completed" && (
                                          <button
                                                onClick={() => update_order_status("refunded", data?.id)}
                                                className="text-blue-700 hover:text-blue-900 font-medium"
                                          >
                                                Refund
                                          </button>
                                    )}
                              </div>
                        </td>
                        <td>

                              {woo_order.find((itm) => itm?.orderId !== data?.id) ? <div>
                                    <button
                                          className="text-blue-700 hover:text-blue-900 font-medium"
                                          onClick={() => setReadyToShip(data?.id)}
                                    >
                                          Ready to Ship
                                    </button>
                              </div> : <button
                                    className="text-blue-700 hover:text-blue-900 font-medium"


                              >
                                    Shipped
                              </button>}
                              <div>
                                    <button
                                          className="text-blue-700 hover:text-blue-900 font-medium"
                                          onClick={() => local_status_updated("return", data?.id, data.shopId)}
                                    >
                                          Return Request
                                    </button>
                                    <span> | </span>
                                    <button
                                          onClick={() => local_status_updated("returned", data?.id, data.shopId)}
                                          className="text-blue-700 hover:text-blue-900 font-medium">
                                          Returned
                                    </button>
                                    <span> |  </span>
                                    <button
                                          onClick={() => local_status_updated("refund", data?.id, data.shopId)}
                                          className="text-blue-700 hover:text-blue-900 font-medium"
                                    >
                                          Refund Only
                                    </button>
                              </div>
                        </td>
                  </tr>
                  {isExpanded && (
                        <tr>
                              <td colSpan={10}>
                                    <div className="p-4 bg-gray-50">
                                          <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold">Order Items</h3>
                                                
                                          </div>
                                          <div className="overflow-x-auto">
                                                <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
                                                      <thead className="bg-gray-100">
                                                            <tr>
                                                                  <th className="border-b px-4 py-2 text-left font-semibold">
                                                                        Image
                                                                  </th>
                                                                  <th className="border-b px-4 py-2 text-left font-semibold">
                                                                        Name
                                                                  </th>
                                                                  <th className="border-b px-4 py-2 text-left font-semibold">
                                                                        Price
                                                                  </th>
                                                                  <th className="border-b px-4 py-2 text-left font-semibold">
                                                                        Quantity
                                                                  </th>
                                                                  <th className="border-b px-4 py-2 text-left font-semibold">
                                                                        Status
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {data?.line_items?.map((item, index) => (
                                                                  <ModalTableRow
                                                                        key={item?.id || index}
                                                                        item={item}
                                                                        status={data?.status}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </td>
                        </tr>
                  )}

                  {
                        ready_to_ship === data?.id && (
                              <div>
                                    <Woo_Shipping_Modal
                                          local_status_updated={local_status_updated}
                                          readyToShip={ready_to_ship}
                                          setReadyToShip={setReadyToShip}
                                          orderInfo={data}
                                          refetch={refetch}
                                          ships={shopInfo ? ships : admin_shop}
                                    />
                              </div>
                        )
                  }
            </>
      );
};

const ModalTableRow = ({ status, item }) => {
      return (
            <tr className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">
                        <img
                              className="h-10 w-10 rounded border object-cover"
                              src={item?.image?.src || "/placeholder.svg"}
                              alt={item?.productName || "Product"}
                        />
                  </td>
                  <td className="px-4 py-2 text-start">{item?.productName || item?.name}</td>
                  <td className="px-4 py-2 text-start">{item?.price}</td>
                  <td className="px-4 py-2 text-start">{item?.quantity}</td>
                  <td className="px-4 py-2 text-start">
                        <span
                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full`}
                        >
                              {status}
                        </span>
                  </td>
            </tr>
      );
};

export default WooCommerceTableRow;
