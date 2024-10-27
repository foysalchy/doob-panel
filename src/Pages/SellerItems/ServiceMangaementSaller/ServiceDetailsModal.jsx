import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function ServiceDetailsModal({
      openModal,
      setIsModalOpen,
      shopInfo,
      handleStateUpdate,
}) {
      // console.log("🚀 ~ file: ServiceDetailsModal.jsx:10 ~ openModal:", openModal);
      // console.log(openModal);
      const {
            data: serviceSIngleData = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["serviceSIngleDataSaller"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/my-single-service?shopId=${shopInfo._id}&productId=${openModal?.productId}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      // console.log(serviceSIngleData);

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${openModal ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full    max-w-[90%] mx-auto bar overflow-hidden  rounded-[20px] bg-white pb-10 px-4 text-center md:px-[20px]">
                        <div className="flex justify-between z-50 pt-4 items-start w-full  sticky top-0 bg-white border-b">
                              <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                                    Service History
                              </div>
                              <div
                                    onClick={() => setIsModalOpen(false)}
                                    className="cursor-pointer bg-gray-500   rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>

                        <table className="divide-y">
                              <thead className="bg-gray-50  w-[95%] bar overflow-scroll">
                                    <tr>
                                          <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                <div className="flex items-center gap-x-3">
                                                      <button className="flex items-center gap-x-2">
                                                            <span>Service Image</span>
                                                      </button>
                                                </div>
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Order Id
                                          </th>

                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Service Name
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Service Price
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Discount Price
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Payment Price
                                          </th>

                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                End Time
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Created Time
                                          </th>

                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Customer
                                          </th>

                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Service Category
                                          </th>

                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Payment Getway
                                          </th>

                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Actions
                                          </th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {serviceSIngleData?.map((order, idx) => (
                                          <tr key={idx}>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      <img
                                                            className="h-10 w-10 rounded-sm"
                                                            src={order.productImg}
                                                            alt=""
                                                      />
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                      <div className="inline-flex items-center gap-x-3">
                                                            <span># {order._id}</span>
                                                      </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {order.productTitle}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {order.productPrice}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {order.normalPrice}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {order.discount}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {new Date(order.endTime).toDateString()}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {new Date(order.timestamp).toDateString()}
                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      <div className="flex items-center gap-x-2">
                                                            <div>
                                                                  <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                                                        {order?.userEmail}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {order?.productCategory}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      {order?.method?.Getaway}
                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                      <button
                                                            onClick={() =>
                                                                  handleStateUpdate(
                                                                        order?._id,
                                                                        order?.status ? false : true
                                                                  )
                                                            }
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group hover:bg-gray-700 dark:border-gray-700"
                                                      >
                                                            <span
                                                                  aria-hidden="true"
                                                                  className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"
                                                            ></span>
                                                            <span className=" dark:text-gray-100">
                                                                  {order?.status ? (
                                                                        <span>
                                                                              {order?.status === true ? (
                                                                                    <span className="text-yellow-500">Pending</span>
                                                                              ) : (
                                                                                    <span className="text-green-500">Active</span>
                                                                              )}
                                                                        </span>
                                                                  ) : (
                                                                        <span>InActive</span>
                                                                  )}
                                                            </span>
                                                      </button>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}
