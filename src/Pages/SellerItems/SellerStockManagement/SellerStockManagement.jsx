import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import SellerStockInvoice from "./SellerStockInvoice";
import { BiEdit, BiSave, BiSearch } from "react-icons/bi";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
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

      return data?.data;
    },
  });
  const [selectedStatus, setSelectedStatus] = useState('');
      const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

      const statuses = ['All', 'reject', 'cancel', 'Stock Updated']; // Status options
      const deliveryStatuses = ['All', 'pending', 'purchasing', 'shipped','recived']; // Delivery status options

      const handleStatusChange = (event) => {
      setSelectedStatus(event.target.value);
      };

      const handleDeliveryStatusChange = (event) => {
      setSelectedDeliveryStatus(event.target.value);
      };


  const filteredStockRequest = searchQuery
    ? stockRequestData.filter((item) =>
      item._id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : stockRequestData;

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


  const [itemsPerPage, setItemsPerPage] = useState(10); // Initial items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(stockRequestData.length / itemsPerPage);
  // Get the data for the current page
      // Filter the data based on selected statuses
  const filteredData = stockRequestData.filter((itm) => {
      const matchesStatus =
        selectedStatus === 'All' || selectedStatus === '' || itm.status === selectedStatus;
      const matchesDeliveryStatus =
        selectedDeliveryStatus === 'All' || selectedDeliveryStatus === '' || itm.delivery_status === selectedDeliveryStatus;

      return matchesStatus && matchesDeliveryStatus;
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


  return (
    <div className="relative">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="flex pb-4 items-center justify-between">
          <h2 className="text-xl font-semibold pb-4">
            Stock Quantity Managements
          </h2>
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
          <div className=" gap-1 w-[150px] items-center">
                              <label>Status:</label>
                              <select  className="bg-white px-3 border py-2 rounded text-black border w-[150px]"onChange={handleStatusChange} value={selectedStatus}>
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

        <div className="flex items-center space-x-3 py-4">
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

        <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 divide-gray-700 ">
            <thead className="bg-gray-50 ">
              <tr>
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
                  className="px-5 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
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
                    <img
                      src={
                        itm?.productInfo?.image?.src ?? itm?.productInfo?.image
                      }
                      alt=""
                      className="w-[80px] h-[80px] rounded-lg object-cover m-auto"
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
                            className="  text-blue-500"
                          >
                            {itm?._id}
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
                          return <span key={war?.name}>= {war?.name} <br/></span>;
                        }
                      })}
                    </button>
                  </td>
                  <td className="px-4 py-2 flex gap-2  text-lg text-gray-700  whitespace-nowrap">
                    {itm?.status === "pending" ? (
                      <div className="flex gap-2 whitespace-nowrap">
                        {itm?.status === "reject" ? (
                          <h2 className="text-red-400 text-sm">rejected</h2>
                        ) : itm?.status === "cancel" ? (
                          <h2>Canceled</h2>
                        ) : (
                          <button
                            // onClick={() => handleUpdate(itm, "reject")}
                            onClick={() =>
                              cancelHandler(itm?.productId, itm?._id)
                            }
                            className="inline-flex rounded-full gap-x-2 text-sm items-center gap-2 bg-orange-500 px-2 py-1 text-white"
                          >
                            Cancel
                          </button>
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

        </div>
      </div>
      <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-9 ${page === currentPage
              ? 'bg-gray-100 text-gray-900 border-gray-900'
              : 'bg-white text-gray-400 border-gray-200'
              }`}
          >
            {page}
          </button>
        ))}

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default SellerStockManagement;
