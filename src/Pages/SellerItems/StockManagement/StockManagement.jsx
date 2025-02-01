import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import StockEdit from "./StockEdit";
import BrightAlert from "bright-alert";
import StockInvoiceAdmin from "./StockInvoiceAdmin";
import Swal from "sweetalert2";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";
const StockManagement = () => {
      const [on, setOn] = useState(false);
      const [call_refetch, setCallRefetch] = useState(false);
      const [invoiceOn, setInvoiceOn] = useState(false);

      const [selectedProducts, setSelectedProducts] = useState([]);
      const [selectedStatus, setSelectedStatus] = useState('');
      const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');
      const statuses = ['All', 'reject', 'cancel', 'Stock Updated']; // Status options
      const deliveryStatuses = ['All', 'pending', 'purchasing', 'shipped', 'recived']; // Delivery status options
      const [searchQuery, setSearchQuery] = useState("");
      const [adminNote, setAdminNote] = useState("");
      const [editedQuantity, setEditedQuantity] = useState("");
      const [editMode, setEditMode] = useState(false);
      const [selectStatusValue, setSelectStatusValue] = useState("");
      const [editDMode, setDEditMode] = useState(false);
      const statusOptionsData = ["pending", "purchasing", "shipped", "recived"];
      const [itemsPerPage, setItemsPerPage] = useState(10); // Initial items per page
      const [currentPage, setCurrentPage] = useState(1);
      const [selectType, setSelectType] = useState('false');
      


      const {
            data: stockRequest = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["stock_request_for_admin"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/stock-request`);
                  const data = await res.json();

                  const sortedData = data?.data?.reduce(
                        (acc, itm) => {
                              if (itm?.status === 'pending') {
                                    acc.pending.push(itm);
                              } else {
                                    acc.others.push(itm);
                              }
                              return acc;
                        },
                        { pending: [], others: [] }
                  );

                  // Combine pending items with the others
                  return [...(sortedData.pending || []), ...(sortedData.others || [])];
            },
            refetchOnWindowFocus: true, // Refetch when the window regains focus
            refetchOnReconnect: true,   // Refetch when the network reconnects
            staleTime: 0,               // Data is always considered stale
      });






      const handleStatusChange = (event) => {
            setSelectedStatus(event.target.value);
      };
      
      const handleDeliveryStatusChange = (event) => {
            setSelectedDeliveryStatus(event.target.value);
      };
      const handleTypeChange = (event) => {
            setSelectType(event.target.value);
      };



      // console.log(stockRequest, "stockRequest");
      const handleUpdate = (data, status) => {
            console.log(data);

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
                                          showAlert(data.message, "", "success");
                                          refetch();
                                    });
                        },
                        allowOutsideClick: () => !Swal.isLoading(),
                  });
            } else {
                  const bodyData = {
                        status: status,
                  };

                  console.log(data?.productId);
                  const orderid = data?._id;
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
                              if (data.status == false) {
                                    deleteStock(orderid);
                                    showAlert(data.message, "", "warning");
                              } else {
                                    showAlert("stock updated", "", "success");
                              }

                              refetch();
                        });
            }
      };



      const filteredStockRequestData = searchQuery
            ? stockRequest.filter((item) => {
                  const itemValues = Object.values(item);
                  const productName = item.productInfo?.name?.toLowerCase() || ''; // Safely access productInfo.name

                  return (
                        itemValues.some((value) =>
                              value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                        ) || productName.includes(searchQuery.toLowerCase())
                  );
            })
            : stockRequest;




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


      // Calculate the total number of pages


      // Get the data for the current page
      // Filter the data based on selected statuses
      const filteredData = filteredStockRequestData.filter((itm) => {
            const matchesStatus =
                  selectedStatus === 'All' || selectedStatus === '' || itm.status === selectedStatus;
            const matchesDeliveryStatus =
                  selectedDeliveryStatus === 'All' || selectedDeliveryStatus === '' || itm.delivery_status === selectedDeliveryStatus;
            const matchType=selectType=='true' ?  itm.adminTransfer == true : !itm.adminTransfer ;

            return matchesStatus && matchesDeliveryStatus && matchType;
      });
      console.log(selectType,'selectType')

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




      const handleSelectAll = (checked) => {
            if (checked) {
                  setSelectedProducts(currentPageData.map((product) => product));
            } else {
                  setSelectedProducts([]);
            }
      };

      const handleCheckboxChange = (checked, product) => {
            if (checked) {
                  setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
            } else {
                  setSelectedProducts((prevSelectedProducts) =>
                        prevSelectedProducts?.filter((selectedId) => selectedId._id !== product._id)
                  );
            }
      }


      const handle_bulk_update = (data, status) => {
            console.log(data);

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
                                          console.log(data, 'datac');
                                          showAlert(data.message, "", "success");
                                          refetch();
                                    });
                        },
                        allowOutsideClick: () => !Swal.isLoading(),
                  });
            } else {
                  const bodyData = {
                        status: status,
                  };

                  console.log(data?.productId);

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
                              if (data.status == false) {
                                    showAlert(data.message, "", "warning");
                                    refetch()
                              } else {
                                    showAlert(data.message, "", "success");
                                    refetch()
                              }

                              refetch();
                        });
            }
      };


      const bulk_approve = async () => {
            console.log(selectedProducts,'selectedProducts')
            if (selectedProducts.length > 0) {
                  // Show a SweetAlert loading indicator that won't close until we call Swal.close()
                  Swal.fire({
                        title: 'Updating Stock...',
                        html: 'Please wait while updating stock for each product',
                        allowOutsideClick: false,
                        didOpen: () => {
                              Swal.showLoading();
                        }
                  });

                  try {
                        // Process each product one by one, and wait for each to complete before continuing
                        for (let i = 0; i < selectedProducts.length; i++) {
                              const product = selectedProducts[i];
                              console.log(product,'product')
                              if( product.status !='Stock Updated'){

                             
                                    await handle_bulk_update(product, "Stock Updated");

                                    // Update the progress message in SweetAlert
                                    Swal.update({
                                          html: `Updating product ${i + 1} of ${selectedProducts.length}`
                                    });
                              }
                        }
                        refetch()
                        // Close the loading alert once all products are processed
                        Swal.close();
                        setSelectedProducts([])
                        // Show success message after completion
                        Swal.fire({
                              icon: 'success',
                              title: 'Stock Update Complete',
                              text: 'All selected products have been updated successfully!'
                        });
                  } catch (error) {
                        refetch()
                        // Handle errors and display failure message if necessary
                        Swal.close();
                        Swal.fire({
                              icon: 'error',
                              title: 'Error Occurred',
                              text: 'An error occurred while updating the products. Please try again.'
                        });
                  }
            } else {
                  // Show alert if no products are selected
                  BrightAlert("Please select at least one product", "", "info");
            }
      };


      const delete_item = (id) => {
            setCallRefetch(true)
            fetch(`https://doob.dev/api/v1/admin/stock-request-delete?order_id=${id}`, {
                  method: "DELETE",
            })
                  .then((res) => res.json())
                  .then((data) => {

                        if (data.status == true) {
                              refetch();
                              BrightAlert(data.message, "", "success");
                        } else {
                              refetch();
                              BrightAlert(data.message, "", "warning");
                        }
                  });
      }




      const delete_single_Stock = async (orderId) => {

            return fetch(
                  `https://doob.dev/api/v1/admin/stock-request-delete?orderId=${orderId}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              status: "Delete",
                              admin_note: "",
                              reject_note: "",
                        }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {

                        showAlert("Stock Log Deleted", "", "success");

                  });
      };
      const deleteStock = async (orderId) => {

            return fetch(
                  `https://doob.dev/api/v1/admin/stock-request-delete?orderId=${orderId}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              status: "Delete",
                              admin_note: "",
                              reject_note: "",
                        }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {


                  });
      };

      const handleBulkAction = async () => {
            console.log(selectedProducts, 'selectedProducts');
            const selectedItems = selectedProducts;

            if (!selectedItems.length) {
                  Swal.fire({
                        icon: "warning",
                        title: "No items selected",
                        text: "Please select items to delete.",
                  });
                  return;
            }

            // Initialize SweetAlert2 popup
            Swal.fire({
                  title: "Deleting Items",
                  html: `<div class="swal-progress-container">
            <p id="swal-progress-text">Deleting items...</p>
            <progress id="swal-progress-bar" max="${selectedItems.length}" value="0"></progress>
          </div>`,
                  allowOutsideClick: false,
                  showConfirmButton: false,
                  didOpen: async () => {
                        const progressBar = Swal.getHtmlContainer().querySelector("#swal-progress-bar");
                        const progressText = Swal.getHtmlContainer().querySelector("#swal-progress-text");

                        for (let i = 0; i < selectedItems.length; i++) {
                              const id = selectedProducts[i]._id;
                              try {
                                    await deleteStock(id); // Ensure delete function returns a promise
                                    progressBar.value = i + 1;
                                    progressText.textContent = `Deleted ${i + 1} of ${selectedItems.length} items`;
                              } catch (error) {
                                    console.error(`Error deleting item with ID: ${id}`, error);
                              }
                        }

                        // Close SweetAlert2 popup and show success alert after processing
                        Swal.fire({
                              icon: "success",
                              title: "Items Deleted",
                              text: "All selected items have been deleted successfully.",
                              timer: 3000,
                        });

                        // Trigger data reload
                        refetch(); // Ensure the query re-fetches the latest data from the server
                  },
            });
      };


      const totalPages = Math.ceil(filteredStockRequestData.length / itemsPerPage);
      const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
      const displayedPages = getDisplayedPages();
      useAddDivToTableCells()
      return (
            <div>
                  <div className=" py-2 align-middle md:px-6 lg:px-8">
                        <div className=" flex-row-reverse  mb-3 md:flex  gap-4 items-center justify-between">
                              <div className="flex items-center gap-1">
                                    <div className="relative my-">
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
                                                className="w-[100%] md:w-[200px] px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
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
                                    <div className="gap-1  items-center">
      
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
                              </div>

                              <div className="md:flex grid mt-3 md:mt-0 grid-cols-2 items-center gap-1">
                              <div className=" gap-1 w-[150px] items-center">
                                     
                                    <select className="bg-white px-3 border py-2 rounded text-black border w-[150px]" onChange={handleStatusChange} value={selectedStatus}>
                                          <option value="" selected disabled>Status</option>
                                          {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                      {status}
                                                </option>
                                          ))}
                                    </select>
                              </div>

                              <div className=" gap-1 w-[150px] items-center">
                                  
                                    <select className="bg-white px-3 border py-2 rounded text-black border w-[150px]" onChange={handleDeliveryStatusChange} value={selectedDeliveryStatus}>
                                          <option value="" selected disabled>Delivery Status</option>
                                          {deliveryStatuses.map((deliveryStatus) => (
                                                <option key={deliveryStatus} value={deliveryStatus}>
                                                      {deliveryStatus}
                                                </option>
                                          ))}
                                    </select>
                              </div>
                              <div className=" gap-1 w-[150px] items-center">
                                  
                                    <select className="bg-white px-3 border py-2 rounded text-black border w-[150px]" onChange={handleTypeChange} value={selectType}>
                                          <option value="false"    > Request  </option>
                                          <option value="true"    > Transfer  </option>
                                           
                                    </select>
                              </div>
                              
                              {selectedProducts.length > 0 &&  <>

                              <div className=" w-[150px] ">

                                    <button
                                          className="w-[150px]  px-3 py-2 whitespace-nowrap bg-red-500 text-white rounded hover:bg-yellow-600"
                                          onClick={handleBulkAction}>Bulk Delete</button>
                              </div>
                              <div className=" w-[150px] ">
                                    <button
                                          onClick={() => bulk_approve()}
                                          className="w-[150px]  inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                          Bulk Approve
                                    </button>
                              </div>


                              </>}
                              </div>

                        </div>


                        <div className="bar overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg bar overflow-hidden">
                                    <thead className="bg-gray-50">
                                          <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      <input
                                                            type="checkbox"
                                                            onChange={(e) => handleSelectAll(e.target.checked)} // Function to handle select all
                                                            className="form-checkbox h-4 w-4 text-blue-600"
                                                      />
                                                </th>
                                                {['Image', 'Order', 'Status', 'Delivery Status', 'Note', 'Quantity', 'Seller', 'Request Time', 'Warehouse'].map((header, index) => (
                                                      <th
                                                            key={index}
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                      >
                                                            {header}
                                                      </th>
                                                ))}
                                          </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                          {isLoading ? (
                                                <tr>
                                                      <td colSpan={9} className="px-6 py-4 whitespace-nowrap text-center">
                                                            <div className="flex justify-center items-center">
                                                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                                            </div>
                                                      </td>
                                                </tr>
                                          ) : currentPageData.length > 0 ? (
                                                currentPageData.map((itm, index) => (
                                                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <input
                                                                        checked={selectedProducts.some(selectedProduct => selectedProduct._id === itm._id)}
                                                                        onChange={(e) => handleCheckboxChange(e, itm)}
                                                                        name="select"
                                                                        type="checkbox"
                                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                                  />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <img
                                                                        src={itm.productInfo.image?.src ?? itm.productInfo.image}
                                                                        alt=""
                                                                        sty
                                                                        className="min-w[60px] h-[60px] border rounded-md object-cover"
                                                                  />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div>
                                                                  <div className="text-sm font-medium text-gray-900">{itm.productInfo.name.slice(0, 20)}</div>
                                                                  <div className="text-sm text-gray-500">{itm.SKU}</div>
                                                                  <div
                                                                        onClick={() => setInvoiceOn(itm)}
                                                                        className="text-sm font-medium text-blue-500 cursor-pointer hover:text-blue-700"
                                                                  >
                                                                        {itm._id}
                                                                  </div>
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 gap-1 py-4 whitespace-nowrap flex">
                                                                  <button
                                                                        // onClick={() => handleUpdate(itm, "reject")}
                                                                        onClick={() =>
                                                                              delete_single_Stock(itm?._id)
                                                                        }
                                                                        className=" md:inline-flex rounded-full   text-sm items-center bg-orange-500 px-2 py-1 text-white"
                                                                  >
                                                                        Delete
                                                                  </button>
                                                                  {itm.adminTransfer ? (
                                                                        <div>Transfer</div>
                                                                  ):(
                                                                        <>
                                                                        {itm.status === "cancel" ? (
                                                                              <span className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                                    Canceled
                                                                              </span>
                                                                        ) : itm.status === "reject" ? (
                                                                              <span className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                                    Rejected
                                                                              </span>
                                                                        ) : itm.status === "pending" ? (
                                                                              <div className="flex space-x-2">
                                                                                    <button
                                                                                          onClick={() => handleUpdate(itm, "Stock Updated")}
                                                                                          className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                                                                    >
                                                                                          Approve
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() => handleUpdate(itm, "reject")}
                                                                                          className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800"
                                                                                    >
                                                                                          Reject
                                                                                    </button>
                                                                                    {/* <button
                                                                                          onClick={() => delete_item(itm._id)}
                                                                                          className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                                                                                    >
                                                                                          Delete
                                                                                    </button> */}
                                                                              </div>
                                                                        ) : (
                                                                              <span className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                                    Stock Updated
                                                                              </span>
                                                                        )}</>
                                                                  )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  {editDMode === itm._id ? (
                                                                        <div className="flex items-center space-x-2">
                                                                              <select
                                                                                    onChange={(e) => setSelectStatusValue(e.target.value)}
                                                                                    className="block  px-3 py-2 w-32 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                                              >
                                                                                    {statusOptionsData.map((item) => (
                                                                                          <option key={item} value={item}>
                                                                                                {item}
                                                                                          </option>
                                                                                    ))}
                                                                              </select>
                                                                              <button
                                                                                    onClick={() => updateDeliveryStatusHandler(itm.productId, itm)}
                                                                                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    <BiSave className="h-5 w-5" aria-hidden="true" />
                                                                              </button>
                                                                        </div>
                                                                  ) : (
                                                                        <button
                                                                              onClick={() => setDEditMode(itm._id)}
                                                                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                                                                        >
                                                                              {itm.delivery_status}
                                                                              <BiEdit className="ml-2 h-4 w-4" />
                                                                        </button>
                                                                  )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <span className="text-sm text-gray-500">{itm.note?.slice(0, 25)}..</span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  {itm.status !== "reject" && itm.status !== "cancel" && editMode === itm._id ? (
                                                                        <div className="flex items-center space-x-2">
                                                                              <input
                                                                                    type="text"
                                                                                    defaultValue={itm.quantity}
                                                                                    onChange={(e) => setEditedQuantity(e.target.value)}
                                                                                    className="block w-20 px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                                              />
                                                                              <button
                                                                                    onClick={() => save_quantity_input(itm._id)}
                                                                                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    <BiSave className="h-5 w-5" aria-hidden="true" />
                                                                              </button>
                                                                        </div>
                                                                  ) : (
                                                                        <button
                                                                              onClick={() => setEditMode(itm._id)}
                                                                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                                                                        >
                                                                              {itm.quantity}
                                                                              <BiEdit className="ml-2 h-4 w-4" />
                                                                        </button>
                                                                  )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{itm.shopName}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                  {new Date(itm.date).toDateString()}, {new Date(itm.date).toLocaleTimeString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                  {itm.warehouse?.map((war) => war?.name).join(', ')}
                                                            </td>
                                                      </tr>
                                                ))
                                          ) : (
                                                <tr>
                                                      <td colSpan={9} className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-500">
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
