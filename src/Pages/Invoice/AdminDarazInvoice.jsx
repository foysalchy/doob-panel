import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AdminDarazInvoice = () => {
      const { id, shopId } = useParams();
      console.log(id);

      const [emptyAction, setEmptyAction] = useState(true);

      const { data: darazData = [], refetch: reload, isLoading: loading } = useQuery({
            queryKey: ["darazData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/daraz-orders`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      console.log(darazData);

      // const { data: products_admin = [], isLoading } = useQuery({
      //       queryKey: ["products_admin"],
      //       queryFn: async () => {
      //             const res = await fetch(

      //             );
      //             const data = await res.json();
      //             return data.data;
      //       },
      // });







      const findData = darazData?.find((itm) => itm?.order_number == id);
      const billingAddress = findData?.address_billing;
      const shippingAddress = findData?.address_shipping;




      const { data: darazSingleOrderProduct = [], refetch, isLoading } = useQuery({
            queryKey: ["darazSingleOrderProduct"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-single-order?id=${shopId}&orderId=${id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });



      useEffect(() => {
            refetch();
            reload()
      }, [id, findData]);


      const [orderCancel, setOrderCancel] = useState(false);

      const orderCancelFunction = (e) => {
            e.preventDefault();
            const cancel = e.target.cancel.value;
            const orderNumber = orderCancel;
            const id = shopId;
            const data = {
                  id,
                  orderNumber,
                  cancellation_reason: cancel,
            };
            console.log(cancel);
            fetch("https://doob.dev/api/v1/seller/darazOrderCancel", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
      };

      const { data: issues = [] } = useQuery({
            queryKey: ["sellerDarazCancelIssue"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-cancel-reason?id=${shopId}`
                  );

                  const data = await res.json();
                  return data.data;
            },
      });

      const darazOrderReady = (order) => {
            const id = shopId;
            const data = {
                  id,
                  orderNumber: order,
            };
            fetch("https://doob.dev/api/v1/seller/daraz-ready-to-ship", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
      };



      return (
            <div>
                  {!loading ? <div className="bg-gray-50">
                        <div className=" p-2 grid grid-cols-3">
                              <div className="">
                                    <div className=" p-3 rounded-lg">
                                          <h3 className="font-bold text-black pb-2">Customer Information</h3>{" "}
                                          <hr />
                                          <ul className="text-gray-600 mt-3">
                                                <li>
                                                      <span className="font-semibold flex items-center gap-2">
                                                            Name :{" "}
                                                            <div className="font-[400]">
                                                                  {findData?.customer_first_name}{" "}
                                                                  {findData?.customer_last_name}
                                                            </div>
                                                      </span>
                                                </li>
                                                {/* <li>
                                <span className="font-semibold flex items-center gap-2">Phone : </span>
                            </li> */}
                                                <li>
                                                      <span className="font-semibold flex items-center gap-2">
                                                            Date :<div className="font-[400]">{findData?.created_at}</div>
                                                      </span>
                                                </li>
                                                <li>
                                                      <span className="font-semibold flex items-center gap-2">
                                                            Payment Method :
                                                            <div className="font-[400]">{findData?.payment_method}</div>
                                                      </span>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                              <div className="">
                                    <div className=" p-3 rounded-lg">
                                          <h3 className="font-semibold text-black pb-2">Billing Address</h3>{" "}
                                          <hr />
                                          <ul className="text-gray-600 mt-3">
                                                <li>
                                                      <div className="font-[400]">
                                                            {billingAddress?.first_name} {billingAddress?.last_name}
                                                      </div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{billingAddress?.phone}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[500] text-black mt-2 border-b pb-3">
                                                            Address
                                                      </div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{billingAddress?.address1}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{billingAddress?.address2}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{billingAddress?.address3}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">
                                                            {billingAddress?.address4address4}
                                                      </div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{billingAddress?.address5}</div>
                                                </li>{" "}
                                                <li>
                                                      <div className="font-[400]">{billingAddress?.country}</div>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                              <div className="">
                                    <div className=" p-3 rounded-lg">
                                          <h3 className="font-semibold text-black pb-2">Shipping Address</h3>{" "}
                                          <hr />
                                          <ul className="text-gray-600 mt-3">
                                                <li>
                                                      <div className="font-[400]">
                                                            {shippingAddress?.first_name} {shippingAddress?.last_name}
                                                      </div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{shippingAddress?.phone}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[500] text-black mt-2 border-b pb-3">
                                                            Address
                                                      </div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{shippingAddress?.address1}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{shippingAddress?.address2}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{shippingAddress?.address3}</div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">
                                                            {shippingAddress?.address4address4}
                                                      </div>
                                                </li>
                                                <li>
                                                      <div className="font-[400]">{shippingAddress?.address5}</div>
                                                </li>{" "}
                                                <li>
                                                      <div className="font-[400]">{shippingAddress?.country}</div>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                        </div>
                        <div className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                              {emptyAction && findData?.statuses[0] == "pending" && (
                                    <>
                                          {" "}
                                          <button
                                                onClick={() => darazOrderReady(findData.order_number)}
                                                className="text-[16px] font-[400] text-blue-700"
                                          >
                                                Ready to Ship
                                          </button>
                                          <button
                                                onClick={() => setOrderCancel(findData.order_number)}
                                                className="text-[16px] font-[400] text-blue-700"
                                          >
                                                Cancel
                                          </button>{" "}
                                    </>
                              )}
                        </div>

                        {orderCancel && (
                              <div>
                                    <div
                                          className="fixed inset-0 z-10 bar overflow-y-auto"
                                          role="dialog"
                                          aria-modal="true"
                                    >
                                          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                <span
                                                      className="hidden sm:inline-block sm:h-screen sm:align-middle"
                                                      aria-hidden="true"
                                                >
                                                      &#8203;
                                                </span>

                                                <div className="relative inline-block px-4 pt-5 pb-4 bar overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                                                      <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white">
                                                            Cancel Order
                                                      </h3>

                                                      <form className="mt-4" onSubmit={orderCancelFunction}>
                                                            <select className="w-full p-2" name="cancel" id="">
                                                                  {issues.map((issue) => (
                                                                        <option value={JSON.stringify(issue)}>
                                                                              {issue.name}
                                                                        </option>
                                                                  ))}
                                                            </select>

                                                            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                                                  <button
                                                                        type="button"
                                                                        onClick={() => setOrderCancel(false)}
                                                                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                                                  >
                                                                        Close
                                                                  </button>

                                                                  <button
                                                                        type="submit"
                                                                        className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                                  >
                                                                        Cancel Order
                                                                  </button>
                                                            </div>
                                                      </form>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}

                        {/* ? products */}
                        <div className="p-2 mt-8">
                              <h2 className="text-lg pb-2">Products</h2>
                              {isLoading ? <h1>Data loading now </h1> : <table className="w-full  bg-white border text-center text-sm font-light ">
                                    <thead className="border-b  font-medium  bar overflow-y-scroll">
                                          <tr className="font-bold">
                                                <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                      Image
                                                </th>
                                                <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                      Name
                                                </th>
                                                <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                      Price
                                                </th>
                                                <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                      SKU
                                                </th>
                                                <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                      quantity
                                                </th>
                                                <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                      Status
                                                </th>

                                          </tr>
                                    </thead>
                                    <tbody>
                                          {!isLoading ? darazSingleOrderProduct?.map((itm) => (
                                                <tr key={itm?._id} className="border-b">
                                                      <td className="whitespace-nowrap flex items-center justify-center border-r text-2xl p-2">
                                                            <img src={itm?.product_main_image} alt="" className="w-16 object-cover h-16 rounded" />
                                                      </td>
                                                      <td className="whitespace-wrap w-[280px] border-r text-md font-[400] text-gray-800 px-4">
                                                            {itm?.name}
                                                      </td>
                                                      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                                            {itm?.paid_price}
                                                      </td>
                                                      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                                            {itm?.sku}
                                                      </td>
                                                      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                                            {itm?.quantity ? itm?.quantity : 1}
                                                      </td>
                                                      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                                            {itm?.status}
                                                      </td>

                                                </tr>
                                          )) : <div>
                                                <h1>Data loading  Please wait</h1>
                                          </div>}
                                    </tbody>
                              </table>}

                        </div>
                  </div> : <div className="text-center text-3xl">Data loading  Please wait</div>}
            </div>
      );
};
export default AdminDarazInvoice;
