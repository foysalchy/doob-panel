import React from "react";
import { BiEdit, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";

import SellerModalForWarehouse from "./Modal/SellerModalForWarehouse";
import SellerEditWareHouse from "./SellerEditWareHouse";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import SellerShowPrivew from "./SellerShowPrivew";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";
const SellerListOfWarehouse = () => {
      const { shopInfo } = useContext(AuthContext);

      const { data: warehouses = [], refetch, isLoading: loadingData } = useQuery({
            queryKey: ["warehouses"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/warehouse/get/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const { data: wareLength = [], refetch: reload } = useQuery({
            queryKey: ["wareLength"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/warehouse/seller-all-warehouse-area-rack-cell-self?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData =
            warehouses &&
            warehouses?.filter((item) => {
                  const lowercaseSearchQuery = searchQuery?.toLowerCase();

                  return (
                        item?.name?.toLowerCase()?.includes(lowercaseSearchQuery) ||
                        item?.slag?.toLowerCase()?.includes(lowercaseSearchQuery)
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
                                          className={`block h-8  w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
                                          onClick={() => handleChangePage(1)}
                                    >
                                          1
                                    </button>
                              </li>
                        )}

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

      const [isPreviewModal, setIsPreviewModal] = useState(false);

      const updateStatus = (id, status) => {
            fetch(`https://doob.dev/api/v1/seller/warehouse/status/${id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(`Seller disable ${status} `, "", "success");
                        refetch();
                  });
      };

      const DeleteWarehouse = async (id) => {
            const response = await fetch(
                  `https://doob.dev/api/v1/seller/warehouse/delete/${id}`,
                  {
                        method: "DELETE",
                        headers: {
                              "Content-Type": "application/json",
                        },
                  }
            );

            if (response.ok) {
                  showAlert("Seller Deleted", "", "success");
                  refetch();
            } else {
                  console.error("Error deleting seller:", response?.statusText);
                  showAlert("Error Deleting Seller", "An error occurred", "error");
            }
      };

      const [OpenModal, setOpenModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenModal(ticketId);
      };
useAddDivToTableCells()
      return (
            <div>
                  <div className="mt-0 lg:pr-10 w-full mx-auto bar overflow-hidden">
                        

                        {OpenModal === "Add New Warehouse" && (
                              <SellerModalForWarehouse
                                    OpenModal={OpenModal}
                                    setOpenModal={setOpenModal}
                                    data={"Add New Warehouse"}
                                    refetch={refetch}
                              />
                        )}
                        <div className="md:hidden flex items-center gap-2 justify-between ">
                              <div className="relative  my-2">
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

                              <div className="whitespace-nowrap gap-2">
                                    <select
                                          className="border w-[50px] px-1 py-2 text-sm rounded"
                                          onChange={(e) => setPageSize(e.target.value)}
                                    >
                                          <option value={15}>15</option>
                                          <option value={30}>30</option>
                                          <option value={70}>70</option>
                                          <option value={100}>100</option>
                                    </select>
                              </div></div>
                        <div className="flex items-center overflow-auto justify-between">
                        <div className="flex gap-2 ">
                              <button
                                    className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 md:w-auto w-full"
                                    onClick={() => handleViewDetails("Add New Warehouse")}
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

                                    <span className="text-sm text-center md:w-auto w-full font-medium transition-all group-hover:ms-4">
                                          Add New Warehouse.
                                    </span>
                              </button>
                               
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/area-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Area Manage
                                    </Link>
                              </li>
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/rack-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Rack Manage
                                    </Link>
                              </li>
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/self-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Self Manage
                                    </Link>
                              </li>
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                    <Link
                                          to={
                                                "/seller/warehouse/cell-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                          Cell Manage
                                    </Link>
                              </li>
                              <li className="flex bg-gray-900 py-1 rounded cursor-pointer items-center justify-between   hover:bg-gray-800 text-gray-50">
                                
                                    <Link
                                          to={
                                                "/seller/report-management/warehouse-report"
                                          }
                                         className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                    >
                                           
                                                Report
                                           
                                    </Link>
                              </li>
                                          </div>
                              <div className="md:flex hidden items-center gap-2 justify-between ">
                              <div className="relative  my-2">
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

                              <div className="whitespace-nowrap gap-2">
                                    <select
                                          className="border w-[50px] px-1 py-2 text-sm rounded"
                                          onChange={(e) => setPageSize(e.target.value)}
                                    >
                                          <option value={15}>15</option>
                                          <option value={30}>30</option>
                                          <option value={70}>70</option>
                                          <option value={100}>100</option>
                                    </select>
                              </div></div>
                        </div>
                        <div className="bar overflow-x-auto bar overflow-y-hidden mt-3">
                              <table className="table-auto border rounded-lg overflo w-full text-left whitespace-no-wrap">
                                    <thead>
                                          <tr>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                                                      Warehouse Name
                                                </th>
                                                <th className=" py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                      Details
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                      Address
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                      Status
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800   ">
                                                      Action
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tr "></th>
                                          </tr>
                                    </thead>
                                    {loadingData && <LoaderData />}
                                    <tbody>
                                          {currentData.map((warehouse, index) => (
                                                <tr key={index + warehouse._id} className="">
                                                      <td className="px-4 py-3">
                                                            <div className="flex gap-2 items-center">
                                                                  <img
                                                                        className="h-10 w-10 object-fill"
                                                                        src={warehouse.img}
                                                                        srcSet={warehouse.img}
                                                                        alt=""
                                                                  />
                                                                  <div>
                                                                        <h2 className="font-medium text-gray-800  ">
                                                                              {warehouse.name}
                                                                        </h2>
                                                                        <p className="text-sm font-normal text-gray-600 text-gray-400">
                                                                              {warehouse.slag}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                      </td>
                                                      <td className="px-4 py-3 grid grid-cols-2 gap-1">
                                                            <span>
                                                                  {" "}
                                                                  Area:{" "}
                                                                  {
                                                                        wareLength?.find(
                                                                              (item) => item.warehouse === warehouse.name
                                                                        )?.areas?.length
                                                                  }
                                                            </span>

                                                            <span>
                                                                  {" "}
                                                                  Racks:{" "}
                                                                  {
                                                                        wareLength?.find(
                                                                              (item) => item.warehouse === warehouse.name
                                                                        )?.racks?.length
                                                                  }
                                                            </span>

                                                            <span>
                                                                  {" "}
                                                                  Selfs:{" "}
                                                                  {
                                                                        wareLength?.find(
                                                                              (item) => item.warehouse === warehouse.name
                                                                        )?.selfs?.length
                                                                  }
                                                            </span>

                                                            <span>
                                                                  {" "}
                                                                  Cells:{" "}
                                                                  {
                                                                        wareLength?.find(
                                                                              (item) => item.warehouse === warehouse.name
                                                                        )?.cells?.length
                                                                  }
                                                            </span>
                                                      </td>
                                                      <td className="px-4 py-3">{warehouse.address}</td>
                                                      <td className="px-4 py-3 text-gray-900">
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
                                                      <td className="px-4 flex gap-2 py-6 items-center  ">
                                                            <MdDelete
                                                                  className="text-red-500 cursor-pointer"
                                                                  onClick={() => DeleteWarehouse(warehouse._id)}
                                                            />
                                                            <BiEdit
                                                                  className="text-yellow-500 cursor-pointer"
                                                                  onClick={() => handleViewDetails(warehouse?._id)}
                                                            />
                                                      </td>
                                                      <td className="">
                                                            <button
                                                                  onClick={() =>
                                                                        setIsPreviewModal({
                                                                              data: wareLength?.find(
                                                                                    (item) => item.warehouse === warehouse.name
                                                                              ),
                                                                              id: warehouse._id,
                                                                        })
                                                                  }
                                                                  className="text-black bg-slate-200 p-2 rounded "
                                                            >
                                                                  Show Previews
                                                            </button>
                                                      </td>

                                                      {OpenModal === warehouse._id && (
                                                            <div className="h-0 w-0">
                                                                  <SellerEditWareHouse
                                                                        OpenModal={OpenModal}
                                                                        refetch={refetch}
                                                                        setOpenModal={setOpenModal}
                                                                        data={warehouse}
                                                                  />
                                                            </div>
                                                      )}
                                                      {isPreviewModal.id === warehouse._id && (
                                                            <SellerShowPrivew
                                                                  status={isPreviewModal}
                                                                  setStatus={setIsPreviewModal}
                                                            />
                                                      )}
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>

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

export default SellerListOfWarehouse;
