import React, { useContext, useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import OrderAllinfoModal from "./DarazOrderAllinfoModal";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import DarazOrderAllinfoModal from "./DarazOrderAllinfoModal";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";

const DarazTableRow = ({ data, select, setSelect, setSelected_item, selected_item }) => {
      const {
            _id,
            order_number,
            order_id,
            created_at,
            payment_method,
            method,
            ReadytoShip,
            price,
            ShipOnTimeSLA,
            statuses,
            document,
            documentLink,
            orderDate,
            orderNumber,
            pendingSince,
            quantity,
            product,
            sellerSku,
            sendTo,
            timestamp,
            productList,
      } = data;
      const [formattedDate, setFormattedDate] = useState("");
      const [emptyAction, setEmptyAction] = useState(true);
      const [modalOn, setModalOn] = useState(false);
      useEffect(() => {
            const Timestamp = timestamp;
            const date = new Date(Timestamp);

            // Format the date and time as per your requirements
            const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZoneName: "short",
            };
            const formatted = date.toLocaleDateString("en-US", options);

            setFormattedDate(formatted);
      }, []);

      const { shopInfo, setInvoiceData } = useContext(AuthContext);
      const [isChecked, setIsChecked] = useState(false);

      function getTimeAgo(dateString) {
            const timestamp = new Date(dateString).getTime();
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

      const [orderCancel, setOrderCancel] = useState(false);

      const orderCancelFunction = (e) => {
            e.preventDefault();
            const cancel = e.target.cancel.value;
            const orderNumber = orderCancel;
            const id = shopInfo._id;
            const data = {
                  id,
                  orderNumber,
                  cancellation_reason: cancel,
            };
            console.log(cancel);
            fetch("https://doob.dev/api/v1/seller/darazOrderCancel", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
      };

      const { data: issues = [], refetch } = useQuery({
            queryKey: ["sellerDarazCancelIssue"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-cancel-reason?id=${shopInfo._id}`
                  );

                  const data = await res.json();
                  return data.data;
            },
      });

      const darazOrderReady = (order) => {
            const id = shopInfo._id;
            const data = {
                  id,
                  orderNumber: order,
            };
            fetch("https://doob.dev/api/v1/seller/daraz-ready-to-ship", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
      };

      const handleCheckboxChange = (order) => {
            if (select.includes(order)) {
                  setSelect(select.filter((item) => item !== order));
                  return;
            } else {
                  setSelect([...select, order]);
            }
      };

      const navigate = useNavigate()

      const [invoice, setInvoice] = useState(false)

      const set_invoice_number = (e) => {
            e.preventDefault()
            const invoice_number = e.target.invoice_number.value
            console.log(invoice_number);

            const data = {
                  id: shopInfo._id,
                  invoiceNumber: invoice_number,
                  orderNumber: invoice[0]?.order_number
            }
            setInvoiceData(invoice[0])


            fetch('https://doob.dev/api/v1/seller/inset-daraz-order-invoice', {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            }).then((res) => res.json())
                  .then((data) => {
                        if (data.success) {
                              navigate(`/darazinvoice/${order_number}`)
                        }
                        else {
                              BrightAlert(`${data.message}`, '', 'warning')
                        }

                  });

      }


      return (
            <tr className="border-b ">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                        <div className="flex">
                              {/* <input
            type="checkbox"
            checked={select.includes(order_id)}

            onChange={() => { handleCheckboxChange(order_id), setSelected_item(data) }} // Pass order_id to handleCheckboxChange
            className="shrink-0 mt-0.5
                        cursor-pointer border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            id={`checkbox-${order_number}`} // Use unique IDs for each checkbox
          /> */}
                              <input
                                    type="checkbox"
                                    checked={select.includes(order_id)}
                                    onChange={() => {
                                          // Check if the item is already selected
                                          if (select.includes(order_id)) {
                                                // Item is selected, so remove it
                                                setSelect(select.filter(id => id !== order_id));
                                                setSelected_item(selected_item.filter(item => item.order_id !== order_id));
                                          } else {
                                                // Item is not selected, so add it
                                                setSelect([...select, order_id]);
                                                setSelected_item([...selected_item, data]);
                                          }
                                    }}
                                    className="shrink-0 mt-0.5 cursor-pointer border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                    id={`checkbox-${order_number}`}
                              />
                        </div>
                  </td>
                  <td className="whitespace-nowrap border-r text-2xl">
                        <button onClick={() => setModalOn(!modalOn)} className=" px-4 py-4">
                              +
                        </button>
                        <DarazOrderAllinfoModal
                              setModalOn={setModalOn}
                              modalOn={modalOn}
                              productList={productList}
                        />
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 ">
                        <button
                              // to={}
                              onClick={() => setInvoice([data])}
                              // onClick=""
                              className="text-blue-600 font-[500] text-[16px]"
                        >
                              Invoice
                        </button>
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                        <Link to={`/seller/orders/daraz-order/${order_number}`} className="text-blue-500 font-[400]">
                              {order_number}
                        </Link>
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                        {/* {formattedDate} */}
                        {created_at}
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                        {getTimeAgo(created_at)}
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                        {payment_method}
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                        {price}
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                        {statuses ? <>{statuses[0]}</> : <>Process</>}
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                        {emptyAction && statuses[0] == "pending" && (
                              <>
                                    {" "}
                                    <button
                                          onClick={() => darazOrderReady(order_number)}
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          Ready to Ship
                                    </button>
                                    <button
                                          onClick={() => setOrderCancel(order_number)}
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          Cancel
                                    </button>{" "}
                              </>
                        )}
                  </td>
                  {
                        invoice.length && <div>
                              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                    <form onSubmit={set_invoice_number} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                                          <h2 className="text-xl font-semibold mb-4">Input Invoice Number</h2>

                                          <table className="min-w-full bg-white border">
                                                <thead>
                                                      <tr className="bg-gray-100 text-left">
                                                            <th className="py-3 px-4 border-b">Order Number</th>
                                                            <th className="py-3 px-4 border-b">Items</th>
                                                            {/* <th className="py-3 px-4 border-b">Tracking Number</th> */}
                                                            <th className="py-3 px-4 border-b">Invoice Number</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      <tr>
                                                            <td className="py-3 px-4 border-b">{invoice[0]?.order_number}</td>
                                                            <td className="py-3 px-4 border-b">{invoice.length}</td>
                                                            {/* <td className="py-3 px-4 border-b">{trackingNumber}</td> */}
                                                            <td className="py-3 px-4 border-b">
                                                                  <input
                                                                        type="text"
                                                                        defaultValue={invoice[0]?.order_number}
                                                                        name="invoice_number"
                                                                        readOnly
                                                                        className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        placeholder="Enter Invoice Number"
                                                                  />
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>

                                          <div className="mt-6 flex justify-end space-x-4">
                                                <button
                                                      onClick={() => setInvoice(false)}
                                                      type="button"
                                                      className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-100"
                                                >
                                                      Cancel
                                                </button>
                                                <button
                                                      type="submit"
                                                      // onClick={() => onConfirm(invoiceNumber)}
                                                      className="bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700"
                                                >
                                                      Confirm
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  }

                  {orderCancel && (
                        <div>
                              <div
                                    className="fixed inset-0 z-10 overflow-y-auto"
                                    role="dialog"
                                    aria-modal="true"
                              >
                                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                          <span
                                                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                                                aria-hidden="true"
                                          >
                                                &#8203;
                                          </span>

                                          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                                                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white">
                                                      Cancel Order
                                                </h3>

                                                <form className="mt-4" onSubmit={orderCancelFunction}>
                                                      <select className="w-full p-2" name="cancel" id="">
                                                            {issues.map((issue) => (
                                                                  <option value={JSON.stringify(issue)}>
                                                                        {issue.name}
                                                                  </option>
                                                            ))}
                                                      </select>

                                                      <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                                            <button
                                                                  type="button"
                                                                  onClick={() => setOrderCancel(false)}
                                                                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                                            >
                                                                  Close
                                                            </button>

                                                            <button
                                                                  type="submit"
                                                                  className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                            >
                                                                  Cancel Order
                                                            </button>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
            </tr>
      );
};

export default DarazTableRow;
