import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import { ChevronDown, ChevronUp, Printer } from 'lucide-react';

const WooCommerceTableRow = ({ data, refetch, set_woo_select_item, woo_select_item, currentItems }) => {
      const [isExpanded, setIsExpanded] = useState(false);
      const { shopInfo } = useContext(AuthContext);


      console.log(data, 'data');

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

      const update_order_status = (status, order_id) => {
            fetch(
                  `https://doob.dev/api/v1/seller/woo-order-status-update?order_id=${order_id}&status=${status}&shop_id=${shopInfo?._id}`
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
                                    to={`/woo-invoice/${shopInfo._id}/${data?.id}`}
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
                              {data?.total}
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              <span
                                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full`}
                              >
                                    {data?.status}
                              </span>
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-3">
                              <div className="flex flex-col gap-2">
                                    {data?.status === "pending" && (
                                          <>
                                                <button
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                      onClick={() => update_order_status("processing", data?.id)}
                                                >
                                                      Ready to Ship
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("cancelled", data?.id)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Cancel
                                                </button>
                                          </>
                                    )}
                                    {data?.status === "processing" && (
                                          <>
                                                <button
                                                      onClick={() => update_order_status("on-hold", data?.id)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      On Hold
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("completed", data?.id)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Complete
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("cancelled", data?.id)}
                                                      className="text-blue-700 hover:text-blue-900 font-medium"
                                                >
                                                      Cancel
                                                </button>
                                                <button
                                                      onClick={() => update_order_status("failed", data?.id)}
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
                  </tr>
                  {isExpanded && (
                        <tr>
                              <td colSpan={10}>
                                    <div className="p-4 bg-gray-50">
                                          <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold">Order Items</h3>
                                                <button
                                                      onClick={() => window.print()}
                                                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
                                                >
                                                      <Printer className="w-4 h-4 mr-2" />
                                                      Print
                                                </button>
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
