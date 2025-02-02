import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableLoader from "../../../../Common/TableLoader";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import LoaderData from "../../../../Common/LoaderData";

const SellerReport = () => {
      const {
            data: serviceOrder = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["sellerReport"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/seller-report"
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const [input, setInput] = useState("");
      const [startDate, setStartDate] = useState("");
      const [filteredData, setFilteredData] = useState([]);
      const [endDate, setEndDate] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);

      useEffect(() => {
            setFilteredData(serviceOrder);
      }, [serviceOrder]);

      const searchItem = () => {
            const filteredServiceOrder = serviceOrder.filter((order) => {
                  const matchesSearch = Object.values(order).some(
                        (value) =>
                              typeof value === "string" &&
                              value.toLowerCase().includes(input.toLowerCase())
                  );

                  const matchesDateRange =
                        startDate && endDate
                              ? new Date(order.timestamp) >= new Date(startDate) &&
                              new Date(order.timestamp) <= new Date(endDate)
                              : true;

                  return matchesSearch && matchesDateRange;
            });

            setFilteredData(filteredServiceOrder);
      };

      useEffect(() => {
            searchItem();
      }, [input, startDate, endDate]);

      useEffect(() => {
            const filteredServiceOrder = serviceOrder.filter((order) => {
                  const matchesSearch = Object.values(order).some(
                        (value) =>
                              typeof value === "string" &&
                              value.toLowerCase().includes(input.toLowerCase())
                  );

                  const matchesDateRange =
                        startDate && endDate
                              ? new Date(order.timestamp) >= new Date(startDate) &&
                              new Date(order.timestamp) <= new Date(endDate)
                              : true;

                  return matchesSearch && matchesDateRange;
            });

            setFilteredData(filteredServiceOrder);
      }, [input, startDate, endDate, serviceOrder]);

      const handleChangePage = (newPage) => {
            setCurrentPage(newPage);
      };

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(filteredData?.length / pageSize);
      const currentData = filteredData?.slice(startIndex, endIndex);

      const calculateRemainingDays = (paymentDate, timeDuration) => {
            const currentDate = new Date();
            const parsedPaymentDate = new Date(paymentDate);
            let expirationDate;

            switch (timeDuration) {
                  case "10 Days":
                        expirationDate = new Date(
                              parsedPaymentDate.getTime() + 10 * 24 * 60 * 60 * 1000
                        );
                        break;
                  case "Monthly":
                        expirationDate = new Date(
                              parsedPaymentDate.getFullYear(),
                              parsedPaymentDate.getMonth() + 1,
                              parsedPaymentDate.getDate()
                        );
                        break;
                  case "Yearly":
                        expirationDate = new Date(
                              parsedPaymentDate.getFullYear() + 1,
                              parsedPaymentDate.getMonth(),
                              parsedPaymentDate.getDate()
                        );
                        break;
                  case "Lifetime":
                        // For lifetime, you may set a very distant future date or handle it differently
                        expirationDate = new Date(2100, 0, 1);
                        break;
                  default:
                        return 0;
            }

            const remainingDays = Math.ceil(
                  (expirationDate - currentDate) / (24 * 60 * 60 * 1000)
            );

            return remainingDays >= 0 ? remainingDays : 0;
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

      return (
            <section className="container px-4 mx-auto">
                  <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                              <div className="flex items-center gap-x-3">
                                    <h2 className="text-lg font-medium text-gray-800 ">Customers</h2>
                                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
                                          {serviceOrder.length} vendors
                                    </span>
                              </div>
                        </div>
                  </div>
                  <div className="mt-6 md:flex md:items-center md:justify-between">
                        <div className="relative flex items-center mt-4 md:mt-0">
                              <span className="absolute">
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-5 h-5 mx-3 text-gray-400 "
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                          />
                                    </svg>
                              </span>
                              <input
                                    onChange={(e) => setInput(e.target.value)}
                                    type="text"
                                    placeholder="Search"
                                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              />
                        </div>
                        <div>
                              <select
                                    onChange={(e) => setPageSize(e.target.value)}
                                    className="w-full md:w-56 h-12 mt-6 text-sm bg-blue-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-lg"
                              >
                                    <option value={10}>10</option>
                                    <option value={30}>30</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                              </select>

                        </div >
                  </div >

                  <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 bar overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="bar overflow-hidden border border-gray-200  md:rounded-lg">
                                          <table className="min-w-full divide-y divide-gray-200 ">
                                                <thead className="bg-gray-50 ">
                                                      <tr>
                                                            <th
                                                                  scope="col"
                                                                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                            >
                                                                  <button className="flex items-center gap-x-3 focus:outline-none">
                                                                        <span>Company</span>
                                                                        <svg
                                                                              className="h-3"
                                                                              viewBox="0 0 10 11"
                                                                              fill="none"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                              <path
                                                                                    d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                                                                    fill="currentColor"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="0.1"
                                                                              />
                                                                              <path
                                                                                    d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                                                                    fill="currentColor"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="0.1"
                                                                              />
                                                                              <path
                                                                                    d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                                                                    fill="currentColor"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="0.3"
                                                                              />
                                                                        </svg>
                                                                  </button>
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                            >
                                                                  Status
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                            >
                                                                  About
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                            >
                                                                  Users
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                            >
                                                                  License use
                                                            </th>
                                                      </tr>
                                                </thead>

                                                <tbody className="bg-white divide-y divide-gray-200  ">

                                                      {isLoading ? (
                                                            <tr>
                                                                  <td colSpan="5" className="text-center py-8">
                                                                        <LoaderData />
                                                                  </td>
                                                            </tr>
                                                      )
                                                            :
                                                            currentData.length
                                                                  ?
                                                                  currentData?.map((shopInfo) => (
                                                                        <tr>

                                                                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                                                    <div>
                                                                                          <h2 className="font-medium text-gray-800  ">
                                                                                                Shop Name: {shopInfo.shop.shopName}
                                                                                          </h2>
                                                                                          <p className="text-sm font-normal text-gray-600 ">
                                                                                                Shop Email: {shopInfo.shop.shopEmail}
                                                                                          </p>
                                                                                    </div>
                                                                              </td>
                                                                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                                                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ">
                                                                                          Shop
                                                                                    </div>
                                                                              </td>
                                                                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                    <div>
                                                                                          <h4 className="text-gray-700 ">
                                                                                                Content curating app
                                                                                          </h4>
                                                                                          <p className="text-gray-500 ">
                                                                                                Brings all your news into one place
                                                                                          </p>
                                                                                    </div>
                                                                              </td>
                                                                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                    <div className="flex items-center">
                                                                                          {shopInfo.shopUsers.slice(0, 3).map((user) => (
                                                                                                <div className="object-cover  w-6 h-6 -mx-1 border-2  flex items-center  justify-center rounded-full  shrink-0">
                                                                                                      <p className="capitalize">
                                                                                                            {user.name.slice(0, 1)}
                                                                                                      </p>
                                                                                                </div>
                                                                                          ))}

                                                                                          {shopInfo.shopUsers.length > 4 && (
                                                                                                <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                                                                                      +{shopInfo.shopUsers.length - 4}
                                                                                                </p>
                                                                                          )}
                                                                                    </div>
                                                                              </td>
                                                                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                    {console.log(calculateRemainingDays(
                                                                                          shopInfo?.shop?.paymentDate,
                                                                                          new Date().getTime()
                                                                                    ))}
                                                                                    <div className="w-48 h-1.5 bg-blue-200 bar overflow-hidden rounded-full">
                                                                                          <div
                                                                                                className="bg-blue-500"
                                                                                                style={{
                                                                                                      width: `${calculateRemainingDays(
                                                                                                            shopInfo?.shop?.paymentDate,
                                                                                                            new Date().toDateString()
                                                                                                      )}%`,
                                                                                                }}
                                                                                          />
                                                                                    </div>
                                                                              </td>
                                                                        </tr>
                                                                  ))
                                                                  :
                                                                  <tr>
                                                                        <td colSpan="5" className="text-center py-2">
                                                                              No Data Found
                                                                        </td>
                                                                  </tr>
                                                      }
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
            </section >
      );
};

export default SellerReport;
