import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { ordersNav } from "../../SellerItems/OrderManagment/ManageOrder/ManageOrderNavData";
import { useEffect } from "react";
import OrderAllinfoModal from "../../SellerItems/OrderManagment/ManageOrder/OrderAllinfoModal";
import ShippingModal from "../../SellerItems/OrderManagment/ManageOrder/ShipingModal";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";

const AllOrderManage = () => {
      const [selectedValue, setSelectedValue] = useState("pending");
      const [openModal, setOpenModal] = useState(false);
      const [daraz, setDaraz] = useState(false);
      const [searchValue, setSearchValue] = useState("");
      const handleSelectChange = (event) => {
            setSelectedValue(event.target.value);
      };

      const [myStore, setMyStore] = useState(false);

      const [selectedDate, setSelectedDate] = useState(null);
      const [details, setDetails] = useState();

      const [modalOn, setModalOn] = useState(false);
      const { shopInfo, setCheckUpData } = useContext(AuthContext);

      const { data: tData = [], refetch } = useQuery({
            queryKey: ["AllSellerOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/all-seller-orders`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const itemsPerPage = 10;
      const [currentPage, setCurrentPage] = useState(1);

      const filteredData = tData?.filter((item) => {
            if (
                  searchValue === "" &&
                  selectedValue === "All" &&
                  (!selectedDate || new Date(item?.timestamp) >= selectedDate)
            ) {
                  return true; // Include all items when searchValue is empty and selectedValue is "All" and timestamp is greater than or equal to selectedDate
            } else if (
                  selectedValue === "pending" &&
                  (!selectedDate || new Date(item?.timestamp) >= selectedDate)
            ) {
                  return !item?.status;
            } else if (
                  searchValue &&
                  (!selectedDate || new Date(item?.timestamp) >= selectedDate)
            ) {
                  return item?._id?.toLowerCase()?.includes(searchValue.toLowerCase()); // Filter by _id
            } else if (
                  selectedValue &&
                  (!selectedDate || new Date(item?.timestamp) >= selectedDate)
            ) {
                  return item?.status === selectedValue; // Filter by status
            }

            return false; // Exclude items that don't meet any condition
      });

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = filteredData?.slice(startIndex, endIndex);

      const formattedDate = (time) => {
            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            // Format the components as needed
            const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
                  .toString()
                  .padStart(2, "0")}`;
            const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            const finalDate = formattedDate + " " + formattedTime;
            return finalDate;
      };

      const productStatusUpdate = (status, orderId) => {
            // console.log(status, orderId);
            // return;
            fetch(
                  `https://doob.dev/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status, orderId }),
                  }
            )
                  .then((res) => res.json())
                  .then((responseUpdate) => {
                        if (responseUpdate?.status === "success") {
                              // setReadyToShip(false);
                              showAlert("status updated", status, "success");
                        } else {
                              // setLoading(false);
                              BrightAlert(
                                    "Could not update the status",
                                    responseUpdate?.message,
                                    "error"
                              );
                        }
                        refetch();
                  });
      };

      const { data: ships = [] } = useQuery({
            queryKey: ["getaway"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/shipping-interrogation/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const ratial_price = (productList) => {
            let ratial_price = 0;
            for (let i = 0; i < productList.length; i++) {
                  const price =
                        parseFloat(productList[i]?.price) *
                        parseFloat(productList[i]?.quantity);
                  ratial_price += price;
            }
            return ratial_price;
      };

      function getTimeAgo(timestamp) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - timestamp;

            const minutes = Math.floor(timeDifference / (1000 * 60));
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (minutes < 60) {
                  return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
            } else if (hours < 24) {
                  return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
            } else {
                  return `${days} day ${days !== 1 ? "s" : ""} ago`;
            }
      }

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      console.log(filteredData);

      const [readyToShip, setReadyToShip] = useState(false);

      const [showImage, setShowImage] = useState(false);
      const [selectedImage, setSelectedImage] = useState("");

      const handleImageClick = (image) => {
            setSelectedImage(image);
            setShowImage(true);
      };

      const handleProductStatusUpdate = (orders) => {
            fetch(`https://doob.dev/api/v1/seller/order-quantity-update`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(orders),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        if (data.success) {
                              productStatusUpdate("Refund", orders._id);
                        } else {
                              alert("Failed to Update");
                        }
                  });
      };

      const [showAlert, setShowAlert] = useState(false);
      const [note, setNote] = useState("");

      const [isChecked, setIsChecked] = useState(true);
      const [refundCheck, setRefundCheck] = useState(false);

      const viewDetails = (order) => {
            console.log(order);
            setOpenModal(true);

            fetch(
                  `https://doob.dev/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${order._id}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        const refund = { refund: data.data, order };
                        console.log(refund);
                        setDetails(refund);
                  });
      };
      const [refundData, setRefundData] = useState(true);
      const checkBox = (orderId) => {
            fetch(
                  `https://doob.dev/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${orderId}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        setRefundData(data);
                  });
      };

      const updateOrderInfo = (note, file, id) => {
            const noteData = { note, file, orderId: id };
            fetch("https://doob.dev/api/v1/seller/refound-order-info", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(noteData),
            })
                  .then((res) => res.json())
                  .then((data) => alert(` Successfully Done!`));
      };
      const [file, setFile] = useState();
      const cancelNoteSubmit = () => {
            console.log({
                  isChecked,
                  refundCheck,
                  note,
                  file,
                  showAlert,
            });

            if (isChecked && !refundCheck) {
                  handleProductStatusUpdate(showAlert);
                  updateOrderInfo(note, file, showAlert._id);
                  setShowAlert(false);
            } else if (isChecked && refundCheck) {
                  handleProductStatusUpdate(showAlert);
                  updateOrderInfo(note, file, showAlert._id);
                  setShowAlert(false);
            } else {
                  updateOrderInfo(note, file, showAlert._id);
                  setShowAlert(false);
            }
      };

      const handleFileChange = async (event) => {
            const file = event.target.files[0];
            const imageFormData = new FormData();
            imageFormData.append("image", file);
            const imageUrl = await uploadImage(imageFormData);
            setFile(imageUrl);
      };

      async function uploadImage(formData) {
            const url = "https://doob.dev/api/v1/image/upload-image";
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });
            const imageData = await response.json();
            return imageData.imageUrl;
      }


      const export_order_with_csv = () => {
            const order = filteredData;
            const csvData = order.map((item) => ({
                  "Order Id": item._id,
                  "Order Status": item.orderStatus,
                  "Order Total": item.totalPrice,
                  "Order Date": item.createdAt,
            }));
            const csvHeaders = Object.keys(csvData[0]);
            const csv = jsonToCSV(csvData, csvHeaders);
            downloadCSV(csv, "order.csv");

      }

      return (
            <div>
                  <div>
                        {myStore ? (
                              <button onClick={() => setMyStore(!myStore)}>
                                    My Warehouse Order
                              </button>
                        ) : (
                              <button onClick={() => setMyStore(!myStore)}>All</button>
                        )}
                  </div>
                  <nav className="flex md:gap-4 gap-2 bar overflow-x-auto mt-6">
                        {ordersNav?.map((itm) =>
                              itm?.status === "dropdown" ? (
                                    <select
                                          key={itm.name}
                                          className={`px-4 border-r bg-transparent relative border-gray-300 flex items-center gap-2 justify-center ${selectedValue === "pending" ? "text-red-500" : "" // Change to your desired color
                                                }`}
                                          value={selectedValue}
                                          onChange={handleSelectChange}
                                    >
                                          <option selected value="pending">
                                                Pending
                                          </option>
                                          {itm?.dropdownLink?.map((option) => (
                                                <option key={option}>{option}</option>
                                          ))}
                                    </select>
                              ) : (
                                    <button
                                          className={`px-4 border-r md:bg-transparent bg-gray-50 border-gray-300 flex  items-center ${selectedValue === itm.value ? "text-red-500" : "" // Change to your desired color
                                                }`}
                                          key={itm.name}
                                          onClick={() => setSelectedValue(itm.value)}
                                    >
                                          {itm.name}
                                    </button>
                              )
                        )}
                  </nav>

                  <div className="flex md:flex-row flex-col items-center justify-between mt-4">
                        <button className="px-4 bg-white py-1 border">Print</button>
                        <button
                              onClick={() => export_order_with_csv()}
                              className="px-4 py-1 bg-transparent border"
                        >
                              Export orders
                        </button>
                        <input
                              className="w-[260px] md:mt-0 mt-3 rounded border-gray-400 focus:outline-none p-2 border"
                              type="date"
                              // value={selectedDate}
                              onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        />
                        <div className="flex items-center gap-4">
                              <div className="flex items-center md:mt-0 mt-3 bg-white ">
                                    <input
                                          onChange={(e) => setSearchValue(e.target.value)}
                                          type="text"
                                          placeholder="Search"
                                          className="w-[260px] rounded border-gray-400 focus:outline-none p-2 border"
                                    />
                              </div>
                        </div>
                  </div>

                  <div className="flex flex-col bar overflow-hidden mt-4">
                        <div className="bar overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                              <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="bar overflow-hidden">
                                          <table className="w-full bg-white border text-center text-sm font-light">
                                                <thead className="border-b font-medium">
                                                      <tr>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  #
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Details
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Document
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Order No.
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Order Date
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Pending Since
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Payment Method
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Retail Price
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Status
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Actions
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {currentItems?.map((item, index) => (
                                                            <React.Fragment key={item._id}>
                                                                  <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                                        <td className="border-r px-6 py-4 font-medium">
                                                                              {index + 1}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {!modalOn ? (
                                                                                    <button
                                                                                          onClick={() => setModalOn(item._id)}
                                                                                          className="px-4 py-2"
                                                                                    >
                                                                                          Details
                                                                                    </button>
                                                                              ) : (
                                                                                    <button
                                                                                          onClick={() => setModalOn(false)}
                                                                                          className="px-4 py-2"
                                                                                    >
                                                                                          Close
                                                                                    </button>
                                                                              )}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <Link
                                                                                    to={`/invoice/${item?._id}`}
                                                                                    onClick={handlePrint}
                                                                                    className="text-blue-600 font-[500]"
                                                                              >
                                                                                    Invoice
                                                                              </Link>
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <Link
                                                                                    to="order-checkup"
                                                                                    onClick={() => setCheckUpData(item)}
                                                                                    className="text-blue-500 font-[400]"
                                                                              >
                                                                                    {item?._id}
                                                                              </Link>
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {formattedDate(item?.timestamp)}
                                                                        </td>
                                                                        <td className="border-r w-[200px] px-6 py-4">
                                                                              {getTimeAgo(item?.timestamp)}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {item?.method.Getaway}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {ratial_price(item?.productList)}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {item?.status ? item?.status : "Pending"}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                                                                                    {(!item?.status && (
                                                                                          <>
                                                                                                <button
                                                                                                      //   onClick={() => setReadyToShip(item)}
                                                                                                      onClick={() =>
                                                                                                            productStatusUpdate(
                                                                                                                  "ready_to_ship",
                                                                                                                  item._id
                                                                                                            )
                                                                                                      }
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      Ready to Ships
                                                                                                </button>
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            productStatusUpdate("Cancel", item?._id)
                                                                                                      }
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      Cancel
                                                                                                </button>
                                                                                          </>
                                                                                    )) ||
                                                                                          (item?.status === "ready_to_ship" && (
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            productStatusUpdate("shipped", item?._id)
                                                                                                      }
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      Shipped
                                                                                                </button>
                                                                                          )) ||
                                                                                          (item?.status === "shipped" && (
                                                                                                <div className="flex flex-col gap-2">
                                                                                                      <button
                                                                                                            onClick={() =>
                                                                                                                  productStatusUpdate(
                                                                                                                        "delivered",
                                                                                                                        item?._id
                                                                                                                  )
                                                                                                            }
                                                                                                            className="text-[16px] font-[400] text-blue-700"
                                                                                                      >
                                                                                                            Delivered
                                                                                                      </button>
                                                                                                      <button
                                                                                                            onClick={() =>
                                                                                                                  productStatusUpdate("failed", item?._id)
                                                                                                            }
                                                                                                            className="text-[16px] font-[400] text-blue-700"
                                                                                                      >
                                                                                                            Failed Delivery
                                                                                                      </button>
                                                                                                </div>
                                                                                          )) ||
                                                                                          (item?.status === "delivered" && (
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            productStatusUpdate("returned", item?._id)
                                                                                                      }
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      Returned
                                                                                                </button>
                                                                                          )) ||
                                                                                          (item?.status === "return" && (
                                                                                                <div className="flex flex-col justify-center">
                                                                                                      <button
                                                                                                            onClick={() => {
                                                                                                                  setShowAlert(item), checkBox(item._id);
                                                                                                            }}
                                                                                                            className="text-[16px] font-[400] text-blue-700"
                                                                                                      >
                                                                                                            Approve
                                                                                                      </button>
                                                                                                      <button
                                                                                                            onClick={() =>
                                                                                                                  productStatusUpdate("failed", item?._id)
                                                                                                            }
                                                                                                            className="text-[16px] font-[400] text-blue-700"
                                                                                                      >
                                                                                                            Reject
                                                                                                      </button>
                                                                                                </div>
                                                                                          )) ||
                                                                                          (item?.status === "returned" && (
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            productStatusUpdate(
                                                                                                                  "RefoundOnly",
                                                                                                                  item?._id
                                                                                                            )
                                                                                                      }
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      Refund Data
                                                                                                </button>
                                                                                          )) ||
                                                                                          (item?.status === "Refund" && (
                                                                                                <button
                                                                                                      onClick={() => viewDetails(item)}
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      View Details
                                                                                                </button>
                                                                                          ))}
                                                                              </td>
                                                                        </td>
                                                                  </tr>
                                                                  {item._id === readyToShip._id && (
                                                                        <tr>
                                                                              <td colSpan="10">
                                                                                    <ShippingModal
                                                                                          readyToShip={readyToShip}
                                                                                          setReadyToShip={setReadyToShip}
                                                                                          productStatusUpdate={productStatusUpdate}
                                                                                          orderInfo={item}
                                                                                          refetch={refetch}
                                                                                          ships={ships}
                                                                                    />
                                                                              </td>
                                                                        </tr>
                                                                  )}
                                                                  {item._id === modalOn && (
                                                                        <tr>
                                                                              <td colSpan="10">
                                                                                    <OrderAllinfoModal
                                                                                          status={item?.status ? item?.status : "Pending"}
                                                                                          setModalOn={setModalOn}
                                                                                          modalOn={modalOn}
                                                                                          productList={item?.productList}
                                                                                    />
                                                                              </td>
                                                                        </tr>
                                                                  )}
                                                            </React.Fragment>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>

                        {showAlert && (
                              <div className="fixed inset-0 z-10 bg-opacity-50 bar overflow-y-auto">
                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                          <div
                                                className="fixed inset-0 transition-opacity"
                                                aria-hidden="true"
                                          >
                                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                          </div>

                                          {/* This is the alert with text area for note */}
                                          <div className="inline-block align-bottom bg-white rounded-lg text-left bar overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                      <div className="sm:flex sm:items-start w-full">
                                                            <div className="mt-3 text-center sm:mt-0 w-full sm:text-left">
                                                                  <h3
                                                                        onClick={() => setIsChecked(!isChecked)}
                                                                        className=" text-lg flex gap-2 items-center cursor-pointer font-medium text-gray-900"
                                                                  >
                                                                        <input
                                                                              className="h-4 w-4"
                                                                              type="checkbox"
                                                                              checked={isChecked}
                                                                        />
                                                                        Do you update your product quantity ?
                                                                  </h3>
                                                                  <h3
                                                                        onClick={() => setRefundCheck(!refundCheck)}
                                                                        className=" text-lg flex gap-2 items-center cursor-pointer font-medium text-gray-900"
                                                                  >
                                                                        <input
                                                                              className="h-4 w-4"
                                                                              type="checkbox"
                                                                              checked={refundCheck}
                                                                        />
                                                                        Do you give refund for this product?
                                                                  </h3>
                                                                  {refundCheck && (
                                                                        <div>
                                                                              <details className="w-full">
                                                                                    <summary className="focus:outline-none focus-visible:ri">
                                                                                          Check Payment Getaway Information?
                                                                                    </summary>
                                                                                    <p className=" ml-4 mt-2 dark:text-gray-700">
                                                                                          Holder Name :{" "}
                                                                                          {refundData?.data?.data?.holder
                                                                                                ? refundData?.data?.data?.holder
                                                                                                : refundData?.data?.data?.name}
                                                                                          <br />
                                                                                          Account Number :{" "}
                                                                                          {refundData?.data?.data?.ac
                                                                                                ? refundData?.data?.data?.ac
                                                                                                : refundData?.data?.data?.account_number}
                                                                                          <br />
                                                                                          Bank / Getaway :{" "}
                                                                                          {refundData?.data?.data?.bank_name
                                                                                                ? refundData?.data?.data?.bank_name
                                                                                                : refundData?.data?.data?.getway}
                                                                                    </p>
                                                                              </details>

                                                                              <div className="mt-2 flex gap-4">
                                                                                    <label htmlFor="">Payment Prove</label>
                                                                                    <input onChange={handleFileChange} type="file" />
                                                                              </div>
                                                                        </div>
                                                                  )}
                                                                  <div className="mt-2 w-full">
                                                                        <textarea
                                                                              value={note}
                                                                              onChange={(e) => setNote(e.target.value)}
                                                                              rows="4"
                                                                              cols="10"
                                                                              className="shadow-sm w-full p-2 focus:ring-blue-500 focus:border-blue-500 mt-1 block  sm:text-sm border-gray-300 rounded-md"
                                                                              placeholder="Enter your note here..."
                                                                        ></textarea>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                                                      <button
                                                            onClick={() => setShowAlert(false)}
                                                            type="button"
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                      >
                                                            Close
                                                      </button>
                                                      <button
                                                            onClick={() => cancelNoteSubmit()}
                                                            type="button"
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                      >
                                                            Submit
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}

                        <div className="max-w-2xl mx-auto mt-8 pb-8">
                              <nav aria-label="Page navigation example">
                                    <ul className="inline-flex -space-x-px">
                                          {Array.from(
                                                { length: Math.ceil(filteredData.length / itemsPerPage) },
                                                (_, i) => (
                                                      <li key={i}>
                                                            <button
                                                                  onClick={() => setCurrentPage(i + 1)}
                                                                  className={`bg-white border ${currentPage === i + 1
                                                                        ? "text-blue-600"
                                                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                        } border-gray-300 leading-tight py-2 px-3 rounded ${i === 0 ? "rounded-l-lg" : ""
                                                                        } ${i === Math.ceil(filteredData.length / itemsPerPage) - 1
                                                                              ? "rounded-r-lg"
                                                                              : ""
                                                                        }`}
                                                            >
                                                                  {i + 1}
                                                            </button>
                                                      </li>
                                                )
                                          )}
                                    </ul>
                              </nav>
                        </div>
                  </div>
            </div>
      );
};

export default AllOrderManage;
