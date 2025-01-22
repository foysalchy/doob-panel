import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import SellerStockInvoice from "./SellerStockInvoice";
import BulkSellerStockInvoice from "./BulkSellerStockInvoice";
import { BiEdit, BiSave, BiSearch } from "react-icons/bi";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
import Pagination from "../../../Common/Pagination";
import { FiPrinter } from 'react-icons/fi';


const SellerStockManagement = () => {
      const [on, setOn] = useState(false);
      const [searchQuery, setSearchQuery] = useState(""); // State to store search query

      const { shopInfo } = useContext(AuthContext);
      const {
            data: stockRequestData = [],
            refetch,
            isLoading: loadingData,
      } = useQuery({
            queryKey: ["stockRequestData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/seller-stock-request?shopId=${shopInfo._id}`
                  );
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
      });
      const [selectedStatus, setSelectedStatus] = useState('');
      const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

      const statuses = ['All', 'reject', 'cancel', 'Stock Updated']; // Status options
      const bulks = ['Deleted', 'Approve']; // Status options
      const deliveryStatuses = ['All', 'pending', 'purchasing', 'shipped', 'recived']; // Delivery status options

      const handleStatusChange = (event) => {
            setSelectedStatus(event.target.value);
      };

      const handleDeliveryStatusChange = (event) => {
            setSelectedDeliveryStatus(event.target.value);
      };




      // const filterData = stockRequest.filter(itm => itm?._id.toLowerCase().includes(searchValue.toLowerCase()));

      const cancelHandler = async (productId, orderId) => {
            console.log(productId, orderId);
            return fetch(
                  `https://doob.dev/api/v1/admin/stock-request-update?productId=${productId}&orderId=${orderId}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              status: "cancel",
                              admin_note: "",
                              reject_note: "",
                        }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        showAlert("Update Quantity", "", "success");
                        refetch();
                  });
      };


      // ! update delivery status
      const [editStatus, setEditStatus] = useState(false);

      const [selectStatusValue, setSelectStatusValue] = useState("");
      const [editMode, setEditMode] = useState(false);
      const statusOptionsData = ["pending", "purchasing", "shipped",];
      // console.log("options", options);


      const updateDeliveryStatusHandler = async (productId, order) => {
            console.log(order);
            // console.log(selectStatusValue, productId, "status", orderId);
            if (order?.status === "cancel" || order?.status === "reject") {
                  setEditMode(false);
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
                        setEditMode(false);
                        false;
                  });
      };

      const [adminNote, setAdminNote] = useState("");

      const handleUpdate = (data, status) => {
            console.log(data, status);

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
                                          showAlert("Update Quantity Status", "", "success");
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
            }
      };


      const handleUpdatebalk = (data, status) => {
            console.log(data, status);

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
                                    });
                        },
                        allowOutsideClick: () => !Swal.isLoading(),
                  });
            } else {
                  const bodyData = {
                        status: status,
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
            }
      };


      const [itemsPerPage, setItemsPerPage] = useState(1000); // Initial items per page
      const [currentPage, setCurrentPage] = useState(1);

      // Calculate the total number of pages
      const totalPages = Math.ceil(stockRequestData.length / itemsPerPage);
      // Get the data for the current page
      // Filter the data based on selected statuses
      const filteredData = stockRequestData.filter((itm) => {
            // Check for matches with status
            const matchesStatus =
                  selectedStatus === 'All' || selectedStatus === '' || itm.status === selectedStatus;

            // Check for matches with delivery status
            const matchesDeliveryStatus =
                  selectedDeliveryStatus === 'All' || selectedDeliveryStatus === '' || itm.delivery_status === selectedDeliveryStatus;
            console.log(itm.SKU)
            const matchesSearchQuery = searchQuery
                  ? (itm._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (itm.SKU && itm.SKU.toLowerCase().includes(searchQuery.toLowerCase())) || // Safely check SKU
                        (itm?.productInfo?.name && itm.productInfo.name.toLowerCase().includes(searchQuery.toLowerCase())))
                  : true; // Include all if no search query


            // Return true only if all conditions are satisfied
            return matchesStatus && matchesDeliveryStatus && matchesSearchQuery;
      });


      // Get the data for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageData = filteredData.slice(startIndex, endIndex);

      // Handle page change
      const handlePageChange = (page) => {
            setCurrentPage(page);
      };


      // Handle items per page change
      const handleItemsPerPageChange = (e) => {
            setItemsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1); // Reset to first page
      };
      // Create an array of page numbers for rendering
      const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
      const totalItems = stockRequestData.length;





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
                        console.log(data);
                        showAlert("Stock Log Deleted", "", "success");
                        refetch();
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
      const [selectedItems, setSelectedItems] = useState([]);
      const [isAllSelected, setIsAllSelected] = useState(false);

      // Handle selecting all items
      const handleSelectAll = (isChecked) => {
            if (isChecked) {
                  setSelectedItems(currentPageData.map((item) => item._id)); // Select all visible items
                  setIsAllSelected(true);
            } else {
                  setSelectedItems([]);
                  setIsAllSelected(false);
            }
      };

      // Handle selecting a single item
      const handleSelectItem = (id, isChecked) => {
            if (isChecked) {
                  setSelectedItems((prev) => [...prev, id]);
            } else {
                  setSelectedItems((prev) => prev.filter((item) => item !== id));
            }
            setIsAllSelected(false); // Deselect "select all" if any individual item is unchecked
      };

      const handleBulkAction = async () => {


            console.log(selectedItems, 'selectedItems');

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
                              const id = selectedItems[i];
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


      const handle_bulk_update = (data, status) => {
            console.log(data, 'balk_update');

            console.log(!data.adminWare, 'adminWare');
            if (!data.adminWare) {

            }


      };
      const [isBulkPrint, setIsBulkPrint] = useState(false);
      const [productForBulkPrint, setProductForBulkPrint] = useState([]);
      
      const bulk_print = async () =>{
            
            setProductForBulkPrint(currentPageData)
            setIsBulkPrint(true);
      }
      const bulk_approve = async () => {
            if (selectedItems.length > 0) {
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
                        for (let i = 0; i < selectedItems.length; i++) {
                              const item = selectedItems[i];
                              const item_data = stockRequestData.find((itm) => itm._id === item);
                              if (!item_data.adminWare) {
                                    await handleUpdatebalk(item_data, "Stock Updated");
                              }


                              // Update the progress message in SweetAlert
                              Swal.update({
                                    html: `Updating product ${i + 1} of ${selectedItems.length}`
                              });
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

      return (
            <div className="relative">
                  {isBulkPrint && (
                      <BulkSellerStockInvoice productForBulkPrint={productForBulkPrint} setIsBulkPrint={setIsBulkPrint} products={selectedItems} />
                   )}

                  <div className=" ">
                  <h2 className="text-xl font-semibold pb-4">
                                    Stock Quantity Managements
                              </h2>
                        <div className="flex pb-4 items-center justify-between gap-2 ">
                              
                              <div className="flex gap-2">
                                    <div className=" gap-2 items-center flex ">

                                    
                                          <button
                                                className="px-3 py-2 whitespace-nowrap bg-gray-900 text-white rounded hover:bg-yellow-600"
                                                onClick={handleBulkAction}>Bulk Delete</button>
                                          <button
                                                onClick={() => bulk_approve()}
                                                className=" px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                          >
                                                Bulk Approve
                                          </button>
                                          <button
                                                onClick={() => bulk_print()}
                                                className=" px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                          >
                                                Bulk Print
                                          </button>
                                    </div>
                                    <div className=" gap-1 w-[150px] items-center rounded flex">
                                          <select className=" text-white rounded-lg px-3 border py-2  text-black bg-gray-900 border w-[150px]" onChange={handleStatusChange} value={selectedStatus}>
                                                <option value="" disabled> Status</option>
                                                {statuses.map((status) => (
                                                      <option key={status} value={status}>
                                                            {status}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>


                                    <div className=" gap-1 w-[150px] items-center flex">
                                          
                                          <select className="bg-gray-900 text-white  px-3 py-2 rounded-lg text-black border w-[150px]" onChange={handleDeliveryStatusChange} value={selectedDeliveryStatus}>
                                                <option value="" disabled>Delivery</option>
                                                {deliveryStatuses.map((deliveryStatus) => (
                                                      <option key={deliveryStatus} value={deliveryStatus}>
                                                            {deliveryStatus}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                              </div>
                              <div className="flex gap-1  ">
                                    <div className="flex px-2 items-center p-1   rounded bg-white">
                                          <BiSearch />
                                          <input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                type="text"
                                                className="px-1 py-1 outline-none w-full"
                                                placeholder="search..."
                                          />
                                    </div>
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

                         

                        {totalItems > 0 ? <div className="bar overflow-auto border border-gray-200 border-gray-700 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200 divide-gray-700 ">
                                    <thead className="bg-gray-50 ">
                                          <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400">
                                                      <input
                                                            type="checkbox"
                                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                                            checked={isAllSelected}
                                                            className="rounded"
                                                      />
                                                </th>
                                                <th
                                                      scope="col"
                                                      className="py-3.5 px-4 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                      <div className="flex items-center gap-x-3">
                                                            <span>Image</span>
                                                      </div>
                                                </th>
                                                <th
                                                      scope="col"
                                                      className="py-3.5 px-4 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                      <div className="flex items-center gap-x-3">
                                                            <span>Ordered</span>
                                                      </div>
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-5 py-3.5 text-sm font-normal border-r text-left rtl:text-right  text-gray-500 text-gray-400"
                                                >
                                                      <button className="flex items-center gap-x-2">
                                                            <span>Delivery Status</span>
                                                      </button>
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                      Admin Note
                                                </th>
                                                <th
                                                      scope="col"
                                                      className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                      Note
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                      Quantity
                                                </th>

                                                <th
                                                      scope="col"
                                                      className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                      <button className="flex items-center gap-x-2">
                                                            <span>Warehouse</span>
                                                      </button>
                                                </th>
                                                <th
                                                      scope="col"
                                                      className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                      <button className="flex items-center gap-x-2">
                                                            <span>Action</span>
                                                      </button>
                                                </th>
                                          </tr>
                                    </thead>
                                    {loadingData && <LoaderData />}
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                          {currentPageData?.map((itm, index) => (
                                                <tr key={index + 1}>
                                                      <td className="whitespace-nowrap border-r px-2 py-2 font-medium ">
                                                            <input
                                                                  type="checkbox"
                                                                  onChange={(e) => handleSelectItem(itm._id, e.target.checked)}
                                                                  checked={selectedItems.includes(itm._id)}
                                                                  className="rounded"
                                                            />
                                                      </td>
                                                      <td className="whitespace-nowrap border-r px-2 py-2 font-medium ">
                                                            <img
                                                                  src={
                                                                        itm?.productInfo?.image?.src ?? itm?.productInfo?.image
                                                                  }
                                                                  alt=""
                                                                  className="min-w-[60px] h-[60px] rounded-lg object-cover m-auto"
                                                            />
                                                      </td>

                                                      <td className="px-4 py-2 text-sm font-medium border-r text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">
                                                                  <div className="w-5/12">
                                                                        {itm?.productInfo?.name.slice(0, 20)}
                                                                        <br />
                                                                        <span className="text-xs text-gray-500"> {itm?.SKU}</span>
                                                                        <h2 className="font-medium text-gray-800  ">
                                                                              <button
                                                                                    onClick={() => setOn(itm)}
                                                                                    className="flex items-center gap-2  text-blue-500"
                                                                              >
                                                                                    {itm?.requestID ?? itm?._id}  <FiPrinter /> 
                                                                              </button>
                                                                        </h2>
                                                                  </div>
                                                            </div>
                                                      </td>

                                                      <td className="px-4 py-2 text-lg text-gray-700 border-r  whitespace-nowrap">
                                                            {/* <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                      {itm?.delivery_status}
                    </button> */}
                                                            <div className="my-3 flex items-center gap-1">
                                                                  {itm?.status === "pending" ? (
                                                                        editMode === itm._id ? (
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
                                                                                                      updateDeliveryStatusHandler(itm?.productId, itm)
                                                                                                }
                                                                                          />
                                                                                    </button>
                                                                              </div>
                                                                        ) : (
                                                                              <button
                                                                                    onClick={() => setEditMode(itm?._id)}
                                                                                    className="px-3 py-1 flex items-center gap-2 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60"
                                                                              >
                                                                                    {itm?.delivery_status}
                                                                                    <BiEdit />
                                                                              </button>
                                                                        )
                                                                  ) : (
                                                                        <h2 className="capitalize">{itm?.delivery_status}</h2>
                                                                  )}
                                                            </div>
                                                      </td>
                                                      <td className="px-4 py-2 text-lg text-gray-700 border-r  whitespace-nowrap">
                                                            <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                                  {itm?.reject_note?.slice(0, 25)}..
                                                            </button>
                                                      </td>
                                                      <td className="px-5 py-2 text-sm font-medium border-r text-gray-700 whitespace-nowrap">
                                                            <button
                                                                  // onClick={() => DeactiveHandle(faq?._id)}
                                                                  className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   text-green-500  "
                                                            >
                                                                  {itm?.note}
                                                            </button>
                                                      </td>

                                                      <td className="px-4 py-2 text-sm border-r whitespace-nowrap">
                                                            {itm?.quantity}
                                                      </td>

                                                      <td className="px-4 py-2 text-lg text-gray-700 border-r   whitespace-nowrap">
                                                            <button className="text-sm  items-center gap-2  px-2 py-1 rounded ">
                                                                  {itm?.warehouse?.map((war) => {
                                                                        if (war?.name) {
                                                                              return <span key={war?.name}>= {war?.name} <br /></span>;
                                                                        }
                                                                  })}
                                                            </button>
                                                      </td>
                                                      <td className="px-4 py-2 flex gap-2  text-lg text-gray-700  whitespace-nowrap">

                                                            <button
                                                                  // onClick={() => handleUpdate(itm, "reject")}
                                                                  onClick={() =>
                                                                        delete_single_Stock(itm?._id)
                                                                  }
                                                                  className="inline-flex rounded-full gap-x-2 text-sm items-center gap-2 bg-orange-500 px-2 py-1 text-white"
                                                            >
                                                                  Delete
                                                            </button>
                                                            {itm?.status === "pending" ? (
                                                                  <div className="flex gap-2 whitespace-nowrap">
                                                                        {itm?.status === "reject" ? (
                                                                              <h2 className="text-red-400 text-sm">rejected</h2>
                                                                        ) : itm?.status === "cancel" ? (
                                                                              <h2>Canceled</h2>
                                                                        ) : (
                                                                              // <button
                                                                              //       // onClick={() => handleUpdate(itm, "reject")}
                                                                              //       onClick={() =>
                                                                              //             cancelHandler(itm?.productId, itm?._id)
                                                                              //       }
                                                                              //       className="inline-flex rounded-full gap-x-2 text-sm items-center gap-2 bg-orange-500 px-2 py-1 text-white"
                                                                              // >
                                                                              //       Cancel
                                                                              // </button>
                                                                              <div></div>
                                                                        )}

                                                                        {!itm.adminWare && (
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
                                                                                                                  onClick={() =>
                                                                                                                        handleUpdate(itm, "reject")
                                                                                                                  }
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
                                                                                                            Active
                                                                                                      </button>
                                                                                                )}
                                                                                          </div>
                                                                                    )}
                                                                              </div>
                                                                        )}
                                                                  </div>
                                                            ) : (
                                                                  <h2 className="capitalize">{itm?.status}</h2>
                                                            )}
                                                      </td>
                                                      {on?._id === itm?._id && (
                                                            <SellerStockInvoice setOn={setOn} products={itm} />
                                                      )}
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>

                        </div> : <h1 className="text-4xl text-center py-40">No Stock Request Found</h1>}
                  </div>

                  <Pagination
                        totalItems={filteredData.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                  />
            </div>
      );
};

export default SellerStockManagement;
