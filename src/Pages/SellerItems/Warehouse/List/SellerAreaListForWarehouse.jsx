import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { BiEdit, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import SellerModalForWarehouse from "../Modal/SellerModalForWarehouse";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useContext } from "react";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert";
import { Link } from "react-router-dom";
import useAddDivToTableCells from "../../../../Common/useAddDivToTableCells";

const SellerAreaListForWarehouse = () => {
      useAddDivToTableCells()
      const { shopInfo } = useContext(AuthContext);

      const { data: areas = [], refetch, isLoading: loadingData } = useQuery({
            queryKey: ["areas"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/warehouse/area/get/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData = areas?.filter((item) => {
            const lowercaseSearchQuery = searchQuery?.toLowerCase();

            return (
                  item.warehouse?.toLowerCase().includes(lowercaseSearchQuery) ||
                  item.area?.toLowerCase().includes(lowercaseSearchQuery)
            );
      });

      const [currentPage, setCurrentPage] = useState(1);

      const [pageSize, setPageSize] = useState(15);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(filteredData?.length / pageSize);

      const currentData = filteredData?.slice(startIndex, endIndex);

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

      const updateStatus = (id, status) => {
            fetch(
                  `https://doob.dev/api/v1/seller/warehouse/area/status/${id}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(`Seller disable ${status} `, "", "success");
                        refetch();
                  });
      };

      const DeleteWarehouse = (id) => {
            let timerInterval;

            Swal.fire({
                  title: "Deleting Seller",
                  html: "Please wait... <br> <b></b> milliseconds remaining.",
                  timer: 500,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {
                              b.textContent = Swal.getTimerLeft();
                        }, 100);
                  },
                  willClose: () => {
                        clearInterval(timerInterval);
                  },
            }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                        fetch(
                              `https://doob.dev/api/v1/seller/warehouse/area/delete/${id}`,
                              {
                                    method: "DELETE",
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                              }
                        )
                              .then((res) => res.json())
                              .then((data) => {
                                    showAlert("Seller Deleted", "", "success");
                                    refetch();
                              })
                              .catch((error) => {
                                    console.error("Error deleting seller:", error);
                                    showAlert("Error Deleting Seller", "An error occurred", "error");
                              });
                  }
            });
      };

      const [OpenModal, setOpenModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenModal(ticketId);
      };

      return (
            <div>
                  <div className="mt-2 lg:pr-10 w-full mx-auto bar overflow-hidden">
                        

                        {OpenModal === "Add Area" && (
                              <SellerModalForWarehouse
                                    OpenModal={OpenModal}
                                    setOpenModal={setOpenModal}
                                    data={"Add Area"}
                                    refetch={refetch}
                              />
                        )}
                        <div className="md:hidden gap-2 items-center justify-between flex">
                              <div className="relative my-2">
                                    <input
                                          type="text"
                                          id="Search"
                                          value={searchQuery}
                                          onChange={handleSearch}
                                          placeholder="Search for..."
                                          className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                                    />

                                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                          <button
                                                type="button"
                                                className="text-gray-600 hover:text-gray-700"
                                          >
                                                <span className="sr-only">Search</span>

                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="h-4 w-4 text-black"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                      />
                                                </svg>
                                          </button>
                                    </span>
                              </div>

                              <div className="flex items-center whitespace-nowrap gap-2">
                                   
                                    <select
                                          className="border w-[50px] px-1 py-2 text-sm rounded"
                                          onChange={(e) => setPageSize(e.target.value)}
                                    >
                                          <option value={15}>15</option>
                                          <option value={30}>30</option>
                                          <option value={70}>70</option>
                                          <option value={100}>100</option>
                                    </select>
                              </div>
                              
                        </div>

                        <div className="flex overflow-auto items-center justify-between">
                        <div className="flex gap-2">
                              <button
                                    className="w-[130px] group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-2 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 "
                                    onClick={() => handleViewDetails("Add Area")}
                              >
                                    <span className="absolute -start-full transition-all group-hover:start-4">
                                          <svg
                                                className="h-5 w-5 rtl:rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                          </svg>
                                    </span>

                                    <span className="text-sm font-medium transition-all text-center md:w-auto w-full group-hover:ms-4">
                                          Add New Area
                                    </span>
                              </button>
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/warehouse-management"
                                          }
                                          className=" text-gray-50 flex gap-2  w-[110px] text-center   items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Warehouse  
                                    </Link>
                              </li>
                              
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/rack-management"
                                          }
                                          className=" text-gray-50 flex gap-2  w-[110px] text-center   items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Rack Manage
                                    </Link>
                              </li>
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/self-management"
                                          }
                                          className=" text-gray-50 flex gap-2  w-[110px] text-center   items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Self Manage
                                    </Link>
                              </li>
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/cell-management"
                                          }
                                          className=" text-gray-50 flex gap-2  w-[110px] text-center   items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Cell Manage
                                    </Link>
                              </li>
                              </div>
                              <div className="md:flex gap-2 items-center hidden">
                              <div className="relative my-6">
                                    <input
                                          type="text"
                                          id="Search"
                                          value={searchQuery}
                                          onChange={handleSearch}
                                          placeholder="Search for..."
                                          className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                                    />

                                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                          <button
                                                type="button"
                                                className="text-gray-600 hover:text-gray-700"
                                          >
                                                <span className="sr-only">Search</span>

                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="h-4 w-4 text-black"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                      />
                                                </svg>
                                          </button>
                                    </span>
                              </div>

                              <div className="flex items-center whitespace-nowrap gap-2">
                                    <span className="text-sm">Entire per page</span>
                                    <select
                                          className="border w-[50px] px-1 py-2 text-sm rounded"
                                          onChange={(e) => setPageSize(e.target.value)}
                                    >
                                          <option value={15}>15</option>
                                          <option value={30}>30</option>
                                          <option value={70}>70</option>
                                          <option value={100}>100</option>
                                    </select>
                              </div>
                              </div>
                        </div>

                        <div className="bar overflow-x-auto bar overflow-hidden">
                              <table className="table-auto md:mt-0 mt-3 border w-full text-left  whitespace-no-wrap">
                                    <thead>
                                          <tr>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                                                      Area Name
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                      Warehouse Name
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                      Status
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tr ">
                                                      Action
                                                </th>
                                          </tr>
                                    </thead>
                                    {loadingData && <LoaderData />}
                                    <tbody>
                                          {currentData.map((warehouse, index) => (
                                                <tr key={index + warehouse._id} className="">
                                                      <td className="px-4 py-3">
                                                            <div className="flex gap-2 items-center">
                                                                  <div>
                                                                        <h2 className="font-medium text-gray-800  ">
                                                                              {warehouse?.area}
                                                                        </h2>
                                                                  </div>
                                                            </div>
                                                      </td>
                                                      <td className="px-4 py-3">{warehouse?.warehouse}</td>
                                                      <td className="px-4 py-3">
                                                            {!warehouse?.status ? (
                                                                  <button
                                                                        onClick={() => updateStatus(warehouse._id, true)}
                                                                        className="inline-flex items-center justify-center py-1 px-4 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                                                                  >
                                                                        Disable
                                                                  </button>
                                                            ) : (
                                                                  <button
                                                                        onClick={() => updateStatus(warehouse._id, false)}
                                                                        className="inline-flex items-center justify-center py-1 px-4 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                                  >
                                                                        Enable
                                                                  </button>
                                                            )}{" "}
                                                      </td>
                                                      <td className="px-4   flex gap-2 py-6   ">
                                                            <MdDelete
                                                                  className="text-red-500 cursor-pointer"
                                                                  onClick={() => DeleteWarehouse(warehouse._id)}
                                                            />
                                                            <BiEdit
                                                                  className="text-yellow-500 cursor-pointer"
                                                                  onClick={() => handleViewDetails(warehouse?._id)}
                                                            />
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                        <br />
                        <nav>
                              <ul className="flex items-center gap-2 justify-center mt-8">
                                    {/* Previous Page */}
                                    <li>
                                          <button
                                                className="pagination-btn"
                                                onClick={() => handleChangePage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                          >
                                                Previous
                                          </button>
                                    </li>

                                    {/* Page Numbers */}
                                    {renderPageNumbers()}

                                    {/* Next Page */}
                                    <li>
                                          <button
                                                className="pagination-btn"
                                                onClick={() => handleChangePage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                          >
                                                Next
                                          </button>
                                    </li>
                              </ul>
                        </nav>
                  </div>
            </div>
      );
};

export default SellerAreaListForWarehouse;
