import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import StockEdit from "./StockEdit";
import BrightAlert from "bright-alert";
import StockInvoiceAdmin from "./StockInvoiceAdmin";
import Swal from "sweetalert2";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
const StockManagement = () => {
      const [on, setOn] = useState(false);
      const [invoiceOn, setInvoiceOn] = useState(false);
      const {
            data: stockRequest = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["stockRequest"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/stock-request`);
                  const data = await res.json();
                  const sortedData = data?.data?.sort((a, b) => {
                        if (a.status === "pending" && b.status !== "pending") return -1;
                        if (a.status !== "pending" && b.status === "pending") return 1;
                        return 0;
                  });

                  return sortedData;
            },
      });
      const [selectedStatus, setSelectedStatus] = useState('');
      const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

      const statuses = ['All', 'reject', 'cancel', 'Stock Updated']; // Status options
      const deliveryStatuses = ['All', 'pending', 'purchasing', 'shipped', 'recived']; // Delivery status options

      const handleStatusChange = (event) => {
            setSelectedStatus(event.target.value);
      };

      const handleDeliveryStatusChange = (event) => {
            setSelectedDeliveryStatus(event.target.value);
      };

      const [adminNote, setAdminNote] = useState("");

      // console.log(stockRequest, "stockRequest");
      const handleUpdate = (data, status) => {

            if (status === "reject") {
                  Swal.fire({
                        title: "Write Note for Reject",
                        input: "text",
                        inputAttributes: {
                              autocapitalize: "off",
                        },
                        showCancelButton: true,
                        confirmButtonText: "Submit",
                        showLoaderOnConfirm: true,
                        preConfirm: async (note) => {
                              console.log(note); // Log the input value
                              setAdminNote(note);

                              const bodyData = {
                                    status: status,
                                    rejectNote: note, // Update rejectNote here
                              };

                              console.log(bodyData, "bodyData");

                              // return;

                              // Make the fetch call inside the preConfirm callback
                              return fetch(
                                    `https://doob.dev/api/v1/admin/stock-request-update?productId=${data?.productId}&orderId=${data?._id}&quantity=${data?.quantity}&SKU=${data?.SKU}`,
                                    {
                                          method: "PUT",
                                          headers: {
                                                "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify(bodyData),
                                    }
                              )
                                    .then((res) => res.json())
                                    .then((data) => {
                                          console.log(data);
                                          showAlert("Update Quantity", "", "success");
                                          refetch();
                                    });
                        },
                        allowOutsideClick: () => !Swal.isLoading(),
                  });
            } else {
                  const bodyData = {
                        status: status,
                  };

                  console.log(bodyData, "bodyData");

                  return fetch(
                        `https://doob.dev/api/v1/admin/stock-request-update?productId=${data?.productId}&orderId=${data?._id}&quantity=${data?.quantity}&SKU=${data?.SKU}`,
                        {
                              method: "PUT",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(bodyData),
                        }
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data, 'update_data');
                              showAlert("Update Quantity", "", "success");
                              refetch();
                        });
            }
      };

      const [searchQuery, setSearchQuery] = useState("");

      const filteredStockRequestData = searchQuery
            ? stockRequest.filter((item) =>
                  item._id.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : stockRequest;



      const [editedQuantity, setEditedQuantity] = useState("");
      const [editMode, setEditMode] = useState(false);
      // console.log(editedQuantity, "and", editMode);
      const save_quantity_input = (stockId) => {
            fetch(
                  `https://doob.dev/api/v1/admin/stock-quantity-update?stockId=${stockId}&quantity=${editedQuantity}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        // body: JSON.stringify(data),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {


                        refetch();

                        showAlert('stock request updated', '', 'success');
                        setEditMode(false);

                        setEditedQuantity("");
                  });
      };

      // ! update delivery

      const [selectStatusValue, setSelectStatusValue] = useState("");
      const [editDMode, setDEditMode] = useState(false);
      const statusOptionsData = ["pending", "purchasing", "shipped", "recived"];
      // console.log("options", options);


      const updateDeliveryStatusHandler = async (productId, order) => {
            // console.log(order);
            // console.log(selectStatusValue, productId, "status", orderId);
            if (order?.status === "cancel" || order?.status === "reject") {
                  setDEditMode(false);
                  return showAlert(`${order?.status}ed can't be updated`, "", "warning");
            }
            // return;
            return fetch(
                  `https://doob.dev/api/v1/admin/stock-status-update?productId=${productId}&orderId=${order?._id}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              delivery_status: selectStatusValue,
                        }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        BrightAlert(data?.message ?? "Updated Delivery", "", "success");
                        refetch();
                        setDEditMode(false);
                        false;
                  });
      };

      const [itemsPerPage, setItemsPerPage] = useState(10); // Initial items per page
      const [currentPage, setCurrentPage] = useState(1);

      // Calculate the total number of pages
      const totalPages = Math.ceil(filteredStockRequestData.length / itemsPerPage);

      // Get the data for the current page
      // Filter the data based on selected statuses
      const filteredData = filteredStockRequestData.filter((itm) => {
            const matchesStatus =
                  selectedStatus === 'All' || selectedStatus === '' || itm.status === selectedStatus;
            const matchesDeliveryStatus =
                  selectedDeliveryStatus === 'All' || selectedDeliveryStatus === '' || itm.delivery_status === selectedDeliveryStatus;

            return matchesStatus && matchesDeliveryStatus;
      });

      // Pagination logic
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageData = filteredData.slice(startIndex, endIndex);
      // Handle page change
      const handlePageChange = (page) => {
            setCurrentPage(page);
      };


      const handleItemsPerPageChange = (e) => {
            setItemsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1);
      };


      const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);



      const getDisplayedPages = () => {
            const totalVisiblePages = 5; // Number of pages to show at once, excluding first and last
            const pages = [];

            // Always show the first page
            pages.push(1);

            // Show ellipsis if currentPage is greater than 4 (beyond the first few pages)
            if (currentPage > 4) {
                  pages.push("...");
            }

            // Show current page and up to 2 pages before and after the current page
            const startPage = Math.max(2, currentPage - 2);
            const endPage = Math.min(totalPages - 1, currentPage + 2);
            for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
            }

            // Show ellipsis if currentPage is not near the last page
            if (currentPage < totalPages - 3) {
                  pages.push("...");
            }

            // Always show the last page
            pages.push(totalPages);

            return pages;
      };

      const displayedPages = getDisplayedPages();



      return (
            <div>
                  <div className=" py-2 align-middle md:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                              <div className="relative my-5">
                                    <label htmlFor="Search" className="sr-only ">
                                          {" "}
                                          Search{" "}
                                    </label>

                                    <input
                                          type="text"
                                          id="Search"
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                          placeholder="Search for..."
                                          className="w-[200px] px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                                    />

                                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                          <button type="button" className="text-gray-600 hover:text-gray-700">
                                                <span className="sr-only">Search</span>

                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="h-4 w-4"
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
                              <div className=" gap-1 w-[150px] items-center">
                                    <label>Status:</label>
                                    <select className="bg-white px-3 border py-2 rounded text-black border w-[150px]" onChange={handleStatusChange} value={selectedStatus}>
                                          {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                      {status}
                                                </option>
                                          ))}
                                    </select>
                              </div>

                              <div className=" gap-1 w-[150px] items-center">
                                    <label>Delivery Status:</label>
                                    <select className="bg-white px-3 border py-2 rounded text-black border w-[150px]" onChange={handleDeliveryStatusChange} value={selectedDeliveryStatus}>
                                          {deliveryStatuses.map((deliveryStatus) => (
                                                <option key={deliveryStatus} value={deliveryStatus}>
                                                      {deliveryStatus}
                                                </option>
                                          ))}
                                    </select>
                              </div>


                        </div>

                        <div className="flex items-center py-4 space-x-3">
                              <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-500">
                                    Items per page:
                              </label>
                              <select
                                    id="itemsPerPage"
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
                              >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                              </select>
                        </div>
                        <div className=" overflow-x-auto border  border-gray-700 md:rounded-lg">
                              <table className=" divide-y w-full divide-gray-700">
                                    <thead className="bg-gray-50 ">
                                          <tr>
                                                <th
                                                      scope="col"
                                                      className="py-3.5 px-4 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      <div className="flex items-center gap-x-3">
                                                            <span>Image</span>
                                                      </div>
                                                </th>
                                                <th
                                                      scope="col"
                                                      className="w-[140px] py-3.5 px-4 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      <div className="flex items-center gap-x-3">
                                                            <span> Order</span>
                                                      </div>
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-5 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      <button className="flex items-center gap-x-2">
                                                            <span>Status</span>
                                                      </button>
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      Delivery Status
                                                </th>
                                                <th
                                                      scope="col"
                                                      className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      Note
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      Quantity
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-5 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      <button className="flex items-center gap-x-2">
                                                            <span>Seller</span>
                                                      </button>
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-5 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 "
                                                >
                                                      <button className="flex items-center gap-x-2">
                                                            <span>Warehouse</span>
                                                      </button>
                                                </th>

                                          </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                          {isLoading ? (
                                                <tr>
                                                      <td colSpan="9" className="text-center py-8">
                                                            <LoaderData />
                                                      </td>
                                                </tr>
                                          ) : currentPageData.length > 0 ? (
                                                currentPageData?.map((itm, index) => (
                                                      <tr key={index + 1}>
                                                            <td className="whitespace-nowrap border-r px-2 py-2 font-medium ">
                                                                  <img
                                                                        src={
                                                                              itm?.productInfo?.image?.src ??
                                                                              itm?.productInfo?.image
                                                                        }
                                                                        alt=""
                                                                        className="w-[80px] h-[80px] rounded-lg object-cover m-auto"
                                                                  />
                                                            </td>
                                                            <td className="px-4 py-4 text-sm font-medium border-r text-gray-700 whitespace-nowrap">
                                                                  <div className="inline-flex items-center gap-x-3">
                                                                        <div className="w-5/12">
                                                                              {itm?.productInfo?.name.slice(0, 20)}
                                                                              <br />
                                                                              <span className="text-xs text-gray-500"> {itm?.SKU}</span>
                                                                              <h2
                                                                                    onClick={() => setInvoiceOn(itm)}
                                                                                    className="font-medium text-blue-500  "
                                                                              >
                                                                                    {itm?._id}
                                                                              </h2>

                                                                        </div>
                                                                  </div>
                                                            </td>

                                                            <td className="px-5 py-4 text-sm font-medium border-r text-gray-700 whitespace-nowrap">
                                                                  {itm?.status === "cancel" ? (
                                                                        <span className="text-red-500">Canceled</span>
                                                                  ) : (
                                                                        <div>
                                                                              {itm?.status === "reject" ? (
                                                                                    <button
                                                                                          disabled
                                                                                          // onClick={() => handleUpdate(itm, "")}
                                                                                          className="inline-flex items-center rounded-full gap-x-2  text-sm  gap-2 bg-red-600 px-2 py-1  text-white "
                                                                                    >
                                                                                          Rejected
                                                                                    </button>
                                                                              ) : (
                                                                                    <div className="">
                                                                                          {itm?.status === "pending" ? (
                                                                                                <div className="flex gap-2">
                                                                                                      <button
                                                                                                            disabled={
                                                                                                                  itm?.status === "cancel" ? true : false
                                                                                                            }
                                                                                                            onClick={() => handleUpdate(itm, "Stock Updated")}
                                                                                                            className="inline-flex  rounded-full gap-x-2    text-sm items-center gap-2 bg-[#23b123ea] px-2 py-1 text-white "
                                                                                                      >
                                                                                                            Approve
                                                                                                      </button>
                                                                                                      <button
                                                                                                            onClick={() => handleUpdate(itm, "reject")}
                                                                                                            className="inline-flex  rounded-full gap-x-2    text-sm items-center gap-2 bg-orange-500 px-2 py-1 text-white "
                                                                                                      >
                                                                                                            Reject
                                                                                                      </button>
                                                                                                </div>
                                                                                          ) : (
                                                                                                <button
                                                                                                      disabled
                                                                                                      // onClick={() => handleUpdate(itm, "")}
                                                                                                      className="inline-flex  rounded-full gap-x-2    text-sm items-center gap-2 bg-[#23b123ea] px-2 py-1 text-white "
                                                                                                >
                                                                                                      Stock Updated
                                                                                                </button>
                                                                                          )}
                                                                                    </div>
                                                                              )}
                                                                        </div>
                                                                  )}
                                                            </td>
                                                            <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                                                                  <div className="my-3 flex items-center gap-1">
                                                                        {editDMode === itm._id ? (
                                                                              <div className="flex gap-2 ">
                                                                                    <select
                                                                                          // options={statusOptions}
                                                                                          // aria-readonly
                                                                                          // disabled={editStatus}
                                                                                          onChange={(e) =>
                                                                                                setSelectStatusValue(e.target.value)
                                                                                          }
                                                                                          className="rounded-lg p-1"
                                                                                    >
                                                                                          {statusOptionsData?.map((item) => (
                                                                                                <option value={item} key={item}>
                                                                                                      {item}{" "}
                                                                                                </option>
                                                                                          ))}
                                                                                    </select>
                                                                                    <button>
                                                                                          <BiSave
                                                                                                onClick={() =>
                                                                                                      updateDeliveryStatusHandler(
                                                                                                            itm?.productId,
                                                                                                            itm
                                                                                                      )
                                                                                                }
                                                                                          />
                                                                                    </button>
                                                                              </div>
                                                                        ) : (
                                                                              <button
                                                                                    onClick={() => setDEditMode(itm?._id)}
                                                                                    className="px-3 py-1 flex items-center gap-2 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60"
                                                                              >
                                                                                    {itm?.delivery_status}
                                                                                    <BiEdit />
                                                                              </button>
                                                                        )}
                                                                  </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                                                                  <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                                        {itm?.note?.slice(0, 25)}..
                                                                  </button>
                                                            </td>
                                                            <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                                                                  <div className="flex items-center gap-x-2">
                                                                        {itm?.status !== "reject" &&
                                                                              itm?.status !== "cancel" &&
                                                                              editMode === itm._id ? (
                                                                              <div className="flex gap-2 ">
                                                                                    <input
                                                                                          type="text"
                                                                                          defaultValue={itm?.quantity}
                                                                                          onChange={(e) =>
                                                                                                setEditedQuantity(e.target.value)
                                                                                          }
                                                                                          className="px-3 w-12 py-1 text-sm border rounded bg-gray-100"
                                                                                    />
                                                                                    <button>
                                                                                          <BiSave
                                                                                                onClick={() => save_quantity_input(itm?._id)}
                                                                                          />
                                                                                    </button>
                                                                              </div>
                                                                        ) : (
                                                                              <button
                                                                                    onClick={() => setEditMode(itm?._id)}
                                                                                    className="px-3 py-1 flex items-center gap-2 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60"
                                                                              >
                                                                                    {itm?.quantity}
                                                                                    <BiEdit />
                                                                              </button>
                                                                        )}
                                                                  </div>
                                                            </td>

                                                            <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                                                                  <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                                        {itm?.shopName}
                                                                  </button>
                                                            </td>
                                                            <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                                                                  <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                                        {itm?.warehouse?.map((war) => {
                                                                              if (war?.name) {
                                                                                    return <span key={war?.name}>{war?.name}</span>;
                                                                              }
                                                                        })}
                                                                  </button>
                                                            </td>
                                                            {/* {on._id=== itm?._id && <StockEdit setOn={setOn} itm={itm} />} */}

                                                            <td>
                                                                  {invoiceOn?._id === itm?._id && (
                                                                        <StockInvoiceAdmin
                                                                              setOn={setInvoiceOn}
                                                                              products={itm}
                                                                        />
                                                                  )}
                                                            </td>
                                                      </tr>
                                                ))
                                          ) : (
                                                <tr>
                                                      <td colSpan="9" className="text-center  py-2">
                                                            Data Not Found
                                                      </td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>

                        {/* <nav className="relative mt-6 flex justify-start space-x-1.5">
                              <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold  bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 disabled:opacity-50"
                              >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                          className="flex-shrink-0 w-4 h-4"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                    >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                              </button>

                              {pageNumbers.map((page) => (
                                    <button
                                          key={page}
                                          onClick={() => handlePageChange(page)}
                                          className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-9 ${page === currentPage
                                                ? 'bg-gray-100 text-gray-900 border-gray-900'
                                                : 'bg-white  border-gray-200'
                                                }`}
                                    >
                                          {page}
                                    </button>
                              ))}

                              <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold  bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 disabled:opacity-50"
                              >
                                    <span className="sr-only">Next</span>
                                    <svg
                                          className="flex-shrink-0 w-4 h-4"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                    >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                              </button>
                        </nav> */}

                        <div className="py-6 bg-gray-50">
                              <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                                    <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                                          <p className="text-sm font-medium text-gray-500">
                                                Showing {currentPage} of {totalPages} out of {filteredData?.length} results
                                          </p>

                                          <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                                {/* Previous Button */}
                                                <button
                                                      onClick={() => handlePageChange(currentPage - 1)}
                                                      disabled={currentPage === 1}
                                                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 disabled:opacity-50"
                                                >
                                                      <span className="sr-only">Previous</span>
                                                      <svg
                                                            className="flex-shrink-0 w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M15 19l-7-7 7-7"
                                                            />
                                                      </svg>
                                                </button>

                                                {/* Page Numbers */}
                                                {displayedPages.map((page, index) => (
                                                      <button
                                                            key={index}
                                                            onClick={() => handlePageChange(page)}
                                                            disabled={page === '...'}
                                                            className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-9 ${page === currentPage
                                                                  ? 'bg-gray-100 text-gray-900 border-gray-900'
                                                                  : page === '...'
                                                                        ? 'text-gray-400 bg-white border-gray-200 cursor-default'
                                                                        : 'bg-white text-gray-400 border-gray-200'
                                                                  }`}
                                                      >
                                                            {page}
                                                      </button>
                                                ))}

                                                {/* Next Button */}
                                                <button
                                                      onClick={() => handlePageChange(currentPage + 1)}
                                                      disabled={currentPage === totalPages}
                                                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 disabled:opacity-50"
                                                >
                                                      <span className="sr-only">Next</span>
                                                      <svg
                                                            className="flex-shrink-0 w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                                            />
                                                      </svg>
                                                </button>
                                          </nav>
                                    </div>
                              </div>
                        </div>


                  </div>
            </div>
      );
};

export default StockManagement;
