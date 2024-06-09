import React, { useContext, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import BarCode from "react-barcode";
import ReadyToShipModal from "../../../AdminItem/SellerOrderManagement/ReadyToShipModal";
import SalesInvoice from "./SalesInvoice";

const SalesHistory = () => {
  const [on, setOn] = useState(false);
  const { shopInfo } = useContext(AuthContext);

  const { data: myOrders = [], refetch } = useQuery({
    queryKey: ["myWebstoreOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/get-my-perches?shopId=${shopInfo?._id}`
      );
      const data = await res.json();
      return data;
    },
  });


  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("mobile-bank");
  const [getway, setGetway] = useState("Bkash");
  const [orderId, setOrderId] = useState("");
  const [showPaymentGetwaySelect, setShowPaymentGetwaySelect] = useState(true);

  const [steps, setSteps] = useState({
    stepsItems: ["Order", "Processing", "Shipped", "Delivered"],
    // currentStep: 5
  });
  const [open, setOpen] = useState(false);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const userProductCancel = (orderId, status) => {
    console.log(orderId, status);
    fetch(
      `https://doob.dev/api/v1/seller/update-seller-order-status?orderId=${orderId}&status=${status}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert("Successfully Updated");
          refetch();
        } else {
          alert("Failed to Update");
        }
      });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleViewDetails = (orderId) => {
    setModalOpen(orderId);
  };

  // ? update status
  const updateStatus = (status, orderId) => {
    fetch(
      `https://doob.dev/api/v1/seller/update-seller-order-status?orderId=${orderId}&status=${status}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, orderId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert("Successfully Updated");
          refetch();
        } else {
          alert("Failed to Update");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;

    const name = form?.name?.value ? form?.name?.value : "";
    const bank_name = form?.bank_name?.value ? form?.bank_name?.value : "";
    const account_number = form?.account_number?.value
      ? form?.account_number?.value
      : "";
    const ac = form?.ac?.value ? form?.ac?.value : "";
    const holder = form?.holder?.value ? form?.holder?.value : "";
    // const getway = showPaymentGetwaySelect;
    const paymentMethod = selectedPaymentMethod;

    let data = {
      data: {
        ...(selectedPaymentMethod === "mobile-bank"
          ? {
            getway: getway,
            name: name,
            account_number: account_number,
          }
          : {
            bank_name: bank_name,
            ac: ac,
            holder: holder,
            paymentMethod: selectedPaymentMethod,
          }),
      },
      shopId: shop_id.shop_id,
      userId: shopInfo._id,
      orderId: orderId,
    };

    console.log(data);
    fetch(
      `https://doob.dev/api/v1/shop/refund-Order?token=${shopInfo._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          updateStatus("return", orderId);

          Swal.fire({
            icon: "success",
            title: "Add Successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
          form.reset();
          setFile();
          setFileName("Provide a Image or PDF");
          setDescription("");
          setOpen(!open);
          refetch();
        }
      });
  };

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setSelectedPaymentMethod(selectedMethod);

    // If "mobile-bank" is selected, show PaymentGetway select
    setShowPaymentGetwaySelect(selectedMethod === "mobile-bank");
  };

  const PaymentGetWay = ["Bkash", "Nogod", "AmarPay"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = myOrders?.data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(myOrders?.data?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationControls = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize  bg-white rounded-md  rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-600 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };

  const [showAlert, setShowAlert] = useState(false);
  const [note, setNote] = useState("");

  const cancelNoteSubmit = () => {
    fetch(
      `https://doob.dev/api/v1/shop/user/order-cancel-reason?token=${shopInfo._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note, orderId: showAlert }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert("Successfully Updated");
          refetch();
        } else {
          alert("Failed to Update");
        }
      });
  };

  return (
    <div className="">
      <div className=" font-google">
        <div className="flex flex-col gap-4">
          {currentOrders?.map((order) => {
            // Determine the current step based on order status
            let currentStep;
            if (!order.status) {
              currentStep = 2;
            } else if (order.status === "delivered") {
              currentStep = 5;
            } else if (order.status === "ready_to_ship") {
              currentStep = 3;
            } else if (order.status === "shipped") {
              currentStep = 4;
            } else if (order.status === "canceled" || "failed" || "returned") {
              currentStep = 5;
            } else {
              // Default to 1 or any other appropriate value
              currentStep = 1;
            }

            console.log(order, "------------>>>>>>>>>>>>>>");
            return (
              <div className=" p-4 rounded border-[0.5px] border-opacity-40 gap-4 border-gray-500 bg-white">
                {on?._id === order?._id && (
                  <SalesInvoice products={order} setModalOpen={setOn} />
                )}
                <div className="pb-4 flex md:flex-row flex-col items-center justify-between">
                  <h1 className="md:text-xl font-bold ">
                    Order Id : {order._id}
                  </h1>
                  <p className="md:hidden block">
                    Order placed {formatTimestamp(order.date)}
                  </p>
                  <div className="flex items-center justify-between md:w-auto gap-2 md:mt-0 mt-3 w-full">
                    <div className="flex items-center gap-4">
                      {/* <UserOrderInvoice order={order} modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
                      <p className="md:block hidden">
                        Order placed {formatTimestamp(order.date)}
                      </p>

                      <button
                        onClick={() => setOn(order)}
                        className="text-blue-500 md:text-md text-sm"
                      >
                        View invoice →
                      </button>
                    </div>
                    <div className="flex items-center">
                      {order.status === "pending" && (
                        <div>
                          {!order.status ? (
                            <button
                              onClick={() => setShowAlert(order._id)}
                              className="text-red-500"
                            >
                              {" "}
                              Cancel
                            </button>
                          ) : (
                            <button className="">{order.status}</button>
                          )}

                          {showAlert && (
                            <div className="fixed inset-0 z-10 bg-opacity-50 overflow-y-auto">
                              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div
                                  className="fixed inset-0 transition-opacity"
                                  aria-hidden="true"
                                >
                                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>

                                {/* This is the alert with text area for note */}
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start w-full">
                                      <div className="mt-3 text-center sm:mt-0 w-full sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                          Why you cancel this order
                                        </h3>
                                        <div className="mt-2 w-full">
                                          <textarea
                                            value={note}
                                            onChange={(e) =>
                                              setNote(e.target.value)
                                            }
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
                        </div>
                      )}
                      {(order?.status === "delivered" ||
                        order?.status === "returned") && (
                          <>
                            <div className="flex items-center gap-2 ">
                              {order?.status !== "returned" && (
                                <button
                                  onClick={() => {
                                    setOpen(!open);
                                    setOrderId(order?._id);
                                  }}
                                  className="text-red-500 px-4 py-1 bg-red-100 rounded"
                                >
                                  Return
                                </button>
                              )}
                              {open && (
                                <div className="modal h-screen w-screen fixed bg-[#0000008e] flex items-center justify-center top-0 left-0 z-[1000]">
                                  <div className="bg-white  md:w-[500px] text-black p-6 rounded-lg relative">
                                    <h1 className="font-bold">
                                      Please Select Your Payment Method for Refund
                                    </h1>{" "}
                                    <button
                                      onClick={() => setOpen(!open)}
                                      className="p-2 float-right text-xl absolute top-2 right-2 "
                                    >
                                      x
                                    </button>{" "}
                                    <br />
                                    <form onSubmit={handleSubmit} className="">
                                      { }
                                      <div className="">
                                        <label
                                          className="block text-sm font-medium text-gray-700"
                                          htmlFor="paymentMethod"
                                        >
                                          Payment Method
                                        </label>
                                        <select
                                          id="paymentMethod"
                                          name="paymentMethod"
                                          value={selectedPaymentMethod}
                                          onChange={handlePaymentMethodChange}
                                          className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                          <option value="mobile-bank">
                                            Mobile Banking
                                          </option>
                                          <option value="bank">Bank</option>
                                        </select>
                                        <div className="">
                                          <label
                                            className="block text-sm font-medium text-gray-700 mt-2"
                                            htmlFor="name"
                                          >
                                            Name
                                          </label>
                                          <input
                                            name="name"
                                            id="name"
                                            className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="type your name"
                                            type="text"
                                          />
                                        </div>
                                        {selectedPaymentMethod === ""}
                                        {showPaymentGetwaySelect && (
                                          <div className="">
                                            <div className="">
                                              <label
                                                className="block text-sm font-medium text-gray-700 pb-1 mt-2"
                                                htmlFor="paymentGetway"
                                              >
                                                Payment Getway
                                              </label>
                                              <select
                                                id="paymentGetway"
                                                name="paymentGetway"
                                                onChange={(e) =>
                                                  setGetway(e?.target?.value)
                                                }
                                                className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                              >
                                                {PaymentGetWay?.((itm) => (
                                                  <option key={itm} value={itm}>
                                                    {itm}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                            <div className="">
                                              <label
                                                className="block text-sm font-medium text-gray-700 pb-1 mt-2"
                                                htmlFor="account"
                                              >
                                                Personal Account Number
                                              </label>
                                              <input
                                                id="account"
                                                name="account_number"
                                                type="tel"
                                                placeholder="type your personal account number"
                                                className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                              />
                                            </div>
                                          </div>
                                        )}

                                        {/* bank inputs */}
                                        {!showPaymentGetwaySelect && (
                                          <div className="">
                                            <div className="">
                                              <label
                                                className="block text-sm font-medium text-gray-700 mt-2"
                                                htmlFor="bank_name"
                                              >
                                                Bank Name
                                              </label>
                                              <input
                                                name="bank_name"
                                                id="bank_name"
                                                className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="type your name"
                                                type="text"
                                              />
                                            </div>
                                            <div className="">
                                              <label
                                                className="block text-sm font-medium text-gray-700 mt-2"
                                                htmlFor="ac"
                                              >
                                                AC
                                              </label>
                                              <input
                                                name="ac"
                                                id="ac"
                                                className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="type your AC number"
                                                type="text"
                                              />
                                            </div>
                                            <div className="">
                                              <label
                                                className="block text-sm font-medium text-gray-700 mt-2"
                                                htmlFor="holder"
                                              >
                                                Holder
                                              </label>
                                              <input
                                                name="holder"
                                                id="holder"
                                                className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="type Holder"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                        )}

                                        <button
                                          className="bg-blue-500 text-white px-8 py-2 mt-3 ml-auto rounded"
                                          type="submit"
                                        >
                                          Return
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </div>
                <div className="md:hidden block">
                  <div class="flex items-center justify-center bg-white">
                    <div class="p-6 overflow-scroll px-0">
                      <table class="w-full min-w-max table-auto text-left">
                        <thead>
                          <tr>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Photo
                              </p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Name
                              </p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Price
                              </p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Quantity
                              </p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Shipping updates
                              </p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <td>
                            <div className="flex gap-x-2 relative">
                              <div className="bg-red-400 w-10 h-10 overflow-hidden rounded-full">
                                <img
                                  className="object-cover w-full h-full hover:cursor-pointer"
                                  src={order.image}
                                  alt=""
                                />
                              </div>
                              <div>
                                <h2 className="font-medium text-gray-800">
                                  {order.product &&
                                    order.product.name
                                      .split(" ")
                                      .slice(0, 5)
                                      .join(" ")}
                                </h2>
                                <p className="text-sm font-normal text-gray-600">
                                  {order.product.productId}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="md:block hidden text-center">
                  <div class="p-6  px-0">
                    <table class="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          <th class="border-y border-blue-gray-100 text-center bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                              Photo
                            </p>
                          </th>
                          <th class="border-y border-blue-gray-100 text-center bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                              Name
                            </p>
                          </th>
                          <th class="border-y border-blue-gray-100 text-center bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                              Price
                            </p>
                          </th>
                          <th class="border-y border-blue-gray-100 text-center bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                              Quantity
                            </p>
                          </th>
                          <th class="border-y border-blue-gray-100 text-center bg-blue-gray-50/50 p-4">
                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                              Shipping updates
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <td>
                          <div className="flex gap-x-2 relative">
                            <div className="bg-red-400 w-10 mx-auto h-10 overflow-hidden rounded">
                              <img
                                className="object-cover w-full h-full hover:cursor-pointer"
                                src={order.image}
                                alt=""
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <h2 className="font-medium text-center text-gray-800">
                            {order.product &&
                              order.product.name
                                .split(" ")
                                .slice(0, 5)
                                .join(" ")}
                          </h2>
                        </td>
                        <td>
                          <h2 className="font-medium text-center text-gray-800">
                            {order.price}
                          </h2>
                        </td>
                        <td>
                          <h2 className="font-medium text-center text-gray-800">
                            {order.quantity}
                          </h2>
                        </td>
                        <td>
                          <h2 className="font-medium text-center text-gray-800">
                            {order.status}
                          </h2>
                        </td>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {renderPaginationControls()}
      </div>
    </div>
  );
};

export default SalesHistory;
