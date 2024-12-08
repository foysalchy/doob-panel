import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import ServiceDetailsModal from "./ServiceDetailsModal";
import LoaderData from "../../../Common/LoaderData";
import { RxCross2 } from "react-icons/rx";
import BrightAlert from "bright-alert";

const ServiceManagementSaller = () => {
      const { shopInfo, user } = useContext(AuthContext);

      const {
            data: serviceOrder = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["serviceOrderSaller"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/my-service?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      console.log(serviceOrder);
      console.log(
            `https://doob.dev/api/v1/seller/my-service?shopId=${shopInfo._id}`
      );

      const [input, setInput] = useState("");
      const [filteredData, setFilteredData] = useState(serviceOrder);
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");



      const searchItem = () => {
            // Check if all filter fields are empty
            if (!input && !startDate && !endDate) {
                  setFilteredData(serviceOrder); // Set the initial state to show all service orders
                  return; // Exit the function early
            }

            // Filter service orders based on input and date range
            const filteredServiceOrder = serviceOrder.filter((order) => {
                  // Check if any value in the order matches the search input
                  const matchesSearch = Object.values(order).some(
                        (value) =>
                              typeof value === "string" &&
                              value.toLowerCase().includes(input.toLowerCase())
                  );

                  // Check if the order timestamp falls within the date range
                  const matchesDateRange =
                        startDate && endDate
                              ? new Date(order.timestamp) >= new Date(startDate) &&
                              new Date(order.timestamp) <= new Date(endDate)
                              : true;

                  // Return true if both conditions are met
                  return matchesSearch && matchesDateRange;
            });

            // Set the filtered data to the state
            setFilteredData(filteredServiceOrder);
      };

      const handleDateRangeChange = (e) => {
            e.preventDefault();
            const start = e.target.startDate.value;
            const end = e.target.endDate.value;
            setStartDate(start);
            setEndDate(end);
            searchItem();
      };

      useEffect(() => {
            setFilteredData(serviceOrder);
      }, [input, isLoading]);

      const [currentPage, setCurrentPage] = useState(1);

      const pageSize = 6;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(filteredData?.length / pageSize);

      const currentData = filteredData && filteredData?.slice(startIndex, endIndex);

      const handleChangePage = (newPage) => {
            setCurrentPage(newPage);
      };

      const renderPageNumbers = () => {
            const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
            const endPage = Math.min(totalPages, startPage + pageSize - 1);

            return (
                  <React.Fragment>
                        {/* First Page */}
                        {startPage > 1 && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
                                          onClick={() => handleChangePage(1)}
                                    >
                                          1
                                    </button>
                              </li>
                        )}

                        {/* Current Page */}
                        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                              const pageNumber = startPage + index;
                              return (
                                    <li key={pageNumber}>
                                          <button
                                                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                                                      ? "border-blue-600 bg-blue-600 text-white"
                                                      : "border-gray-900 bg-white text-center leading-8 text-gray-900"
                                                      }`}
                                                onClick={() => handleChangePage(pageNumber)}
                                          >
                                                {pageNumber}
                                          </button>
                                    </li>
                              );
                        })}

                        {/* Last Page */}
                        {endPage < totalPages && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
                                          onClick={() => handleChangePage(totalPages)}
                                    >
                                          {totalPages}
                                    </button>
                              </li>
                        )}
                  </React.Fragment>
            );
      };

      const handleStateUpdate = (id, status) => {
            console.log(status, "state update");
            fetch(
                  `"https://doob.dev/api/v1/admin/get-all-service-order?id=${id}`,
                  {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                        },
                        body: JSON.stringify({ status: status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        alert("update successful");
                        refetch();
                  });
      };

      const [review_modal, set_review_modal] = useState(false);

      const [openModal, setIsModalOpen] = useState(false);

      function calculateEndDate(orderDate, timeDuration) {
            let endDate;
            switch (timeDuration) {
                  case "Monthly":
                        endDate = new Date(
                              new Date(orderDate).getFullYear(),
                              new Date(orderDate).getMonth() + 1,
                              new Date(orderDate).getDate()
                        );
                        break;
                  case "Yearly":
                        endDate = new Date(
                              new Date(orderDate).getFullYear() + 1,
                              new Date(orderDate).getMonth(),
                              new Date(orderDate).getDate()
                        );
                        break;
                  case "OneTime":
                        endDate = new Date(orderDate);
                        break;
                  default:
                        endDate = null;
            }
            return endDate;
      }

      const uploadReview = (e) => {
            e.preventDefault();
            if (!user) {
                  BrightAlert({ timeDuration: 3000, title: "Login First", icon: "warning" });
                  return;
            }
            const reviews = e.target.reviews.value;
            const userData = { name: user.name, userId: user._id };
            const timestamp = new Date().getTime();
            let data = { text: reviews, user: userData, timeStamp: timestamp };

            console.log(data, 'user_data');
            fetch(`https://doob.dev/api/v1/admin/service/reviews?service_id=${review_modal}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((response) => response.json())
                  .then((data) => {
                        console.log(data, 'data');
                        BrightAlert({ timeDuration: 3000, title: "Review Added", icon: "success" });
                  })
      };


      return (
            <section className="container  mx-auto">
                  <div className="flex justify-between items-center">
                        <fieldset className="w-full my-4 space-y-1 dark:text-gray-100">
                              <label for="Search" className="hidden">
                                    Search
                              </label>
                              <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                          <button
                                                type="button"
                                                title="search"
                                                className="p-1 focus:outline-none focus:ring"
                                          >
                                                <svg
                                                      fill="currentColor"
                                                      viewBox="0 0 512 512"
                                                      className="w-4 h-4 dark:text-gray-100"
                                                >
                                                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                                </svg>
                                          </button>
                                    </span>
                                    <input
                                          type="search"
                                          value={input}
                                          onChange={(e) => {
                                                setInput(e.target.value), searchItem();
                                          }}
                                          name="Search"
                                          placeholder="Search..."
                                          className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400"
                                    />
                              </div>
                        </fieldset>

                        <form onSubmit={handleDateRangeChange} className="flex space-x-4">
                              <input
                                    type="date"
                                    className="border border-gray-300 px-2 py-1 rounded"
                                    name="startDate"
                              />
                              <span className="text-gray-500">to</span>
                              <input
                                    name="endDate"
                                    type="date"
                                    className="border border-gray-300 px-2 py-1 rounded"
                              />
                              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Apply
                              </button>
                        </form>
                  </div>

                  <div className="flex flex-col">
                        <div className=" w-full bar overflow-x-auto ">
                              <div className="inline-block min-w-full py-2 align-middle ">
                                    <div className="bar overflow-hidden border border-gray-200md:rounded-lg">
                                          <table className=" divide-y  divide-gray-200 ">
                                                <thead className="bg-gray-50 ">
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
                                                                  Order
                                                            </th>


                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Price
                                                            </th>

                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Time
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
                                                                  Payment Info
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  See Preview
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Actions
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Review
                                                            </th>
                                                      </tr>
                                                </thead>
                                                {isLoading && <LoaderData />}
                                                <tbody className="bg-white divide-y divide-gray-200 ">
                                                      {currentData
                                                            ?.filter(
                                                                  (value, index, self) =>
                                                                        index ===
                                                                        self.findIndex((t) => t.productId === value.productId)
                                                            )
                                                            ?.map((order, idx) => (
                                                                  <tr key={idx}>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <img
                                                                                    className="h-10 w-10 rounded-sm"
                                                                                    src={order.productImg}
                                                                                    alt=""
                                                                              />
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900  whitespace-nowrap">
                                                                              <div className="inline-flex items-center gap-x-3">
                                                                                    <span># {order._id}</span>
                                                                              </div>
                                                                              <p>  {order.productTitle}</p>
                                                                        </td>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <p> Item :{order?.productPrice}</p>
                                                                              <p>Buy:   {order?.buyingPrice}</p>
                                                                        </td>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              Create: {new Date(order.timestamp).toDateString()}
                                                                              <p>Expire:  {calculateEndDate(
                                                                                    order.timestamp,
                                                                                    order?.time_duration
                                                                              )?.toDateString() ?? "N/A"}</p>
                                                                        </td>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <div className="flex items-center gap-x-2">
                                                                                    <div>
                                                                                          <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                                                                                {order?.userEmail}
                                                                                          </p>
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              {order?.productCategory}
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              {order?.time_duration}
                                                                              <p>  {order?.method?.Getaway}</p>
                                                                        </td>


                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <button
                                                                                    className="bg-slate-300 p-2 text-black rounded-lg"
                                                                                    onClick={() => setIsModalOpen(order)}
                                                                              >
                                                                                    See Service History
                                                                              </button>
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
                                                                                    className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group bg-gray-700 border-gray-700"
                                                                              >
                                                                                    <span
                                                                                          aria-hidden="true"
                                                                                          className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"
                                                                                    ></span>
                                                                                    <span className=" dark:text-gray-100">
                                                                                          {order?.status === true ? 'Approve' : order?.status === false ? 'Pending' : order?.status ?? 'Inactive'}

                                                                                    </span>
                                                                              </button>
                                                                        </td>
                                                                        <td>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          set_review_modal(
                                                                                                order?.productId

                                                                                          )
                                                                                    }
                                                                                    rel="noopener noreferrer"
                                                                                    className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group bg-gray-700 border-gray-700"
                                                                              >
                                                                                    <span
                                                                                          aria-hidden="true"
                                                                                          className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"
                                                                                    ></span>
                                                                                    <span className=" dark:text-gray-100">
                                                                                          Review

                                                                                    </span>
                                                                              </button>
                                                                        </td>
                                                                        {
                                                                              review_modal && (
                                                                                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-5 bg-black bg-opacity-50">
                                                                                          <div className="w-full max-w-2xl overflow-hidden bg-white rounded-lg shadow-xl">
                                                                                                <div className="sticky top-0 flex items-start justify-between w-full p-4 bg-white border-b border-gray-200">
                                                                                                      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                                                                                            Service Review
                                                                                                      </h2>
                                                                                                      <button
                                                                                                            onClick={() => set_review_modal(false)}
                                                                                                            className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                                                                      >
                                                                                                            <RxCross2 className="w-6 h-6" />
                                                                                                      </button>
                                                                                                </div>

                                                                                                <div className="p-6">
                                                                                                      <form onSubmit={uploadReview} className="space-y-4">
                                                                                                            <textarea
                                                                                                                  name="reviews"
                                                                                                                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                                                  rows="5"
                                                                                                                  placeholder="Write your review here..."
                                                                                                                  required
                                                                                                            ></textarea>
                                                                                                            <button
                                                                                                                  type="submit"
                                                                                                                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                                                                            >
                                                                                                                  Submit
                                                                                                            </button>
                                                                                                      </form>
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              )
                                                                        }
                                                                        {openModal && (
                                                                              <ServiceDetailsModal
                                                                                    openModal={openModal}
                                                                                    setIsModalOpen={setIsModalOpen}
                                                                                    shopInfo={shopInfo}
                                                                                    handleStateUpdate={handleStateUpdate}
                                                                              ></ServiceDetailsModal>
                                                                        )}
                                                                  </tr>
                                                            ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="flex justify-center mt-4">
                        <ol className="flex justify-center gap-1 text-xs font-medium">
                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                          disabled={currentPage === 1}
                                    >
                                          <span className="sr-only">Prev Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiLeftArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>

                              {renderPageNumbers()}

                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() =>
                                                handleChangePage(Math.min(totalPages, currentPage + 1))
                                          }
                                          disabled={currentPage === totalPages}
                                    >
                                          <span className="sr-only">Next Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiRightArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>
                        </ol>
                  </div>
            </section>
      );
};

export default ServiceManagementSaller;
