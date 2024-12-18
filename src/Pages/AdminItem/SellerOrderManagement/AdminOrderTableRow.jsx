import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DarazOrderAllinfoModal from '../../SellerItems/OrderManagment/DarazOrder/DarazOrderAllinfoModal';
import { Link } from 'react-router-dom';
import SellerInvoiceDaraz from './SellerInvoiceDaraz';
import { useReactToPrint } from 'react-to-print';
import AllAdminOrderInvoice from './AllAdminOrderInvoice';
import Daraz_ship from './Daraz_ship';
import { AuthContext } from '../../../AuthProvider/UserProvider';


const AdminOrderTableRow = ({ data, select, setSelect }) => {
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
            shopId,
            shop_id,
            order_status
      } = data;

      const [formattedDate, setFormattedDate] = useState("");
      const [emptyAction, setEmptyAction] = useState(true);
      const [modalOn, setModalOn] = useState(false);
      const [ready_to_ship, setReady_to_ship] = useState(false);
      const { shopInfo } = useContext(AuthContext);
      const [local_status_updated, setLocal_status_updated] = useState(false);

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


      const {
            data: admin_shop = [],
      } = useQuery({
            queryKey: ["admin_shop"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/allShippings"
                  );
                  const data = await res.json();
                  return data;
            },
      });




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
            const id = shop_id;
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
                        `https://doob.dev/api/v1/seller/daraz-cancel-reason?id=${shop_id}`
                  );

                  const data = await res.json();
                  return data.data;
            },
      });

      const darazOrderReady = (order) => {
            const id = shop_id;
            const data = {
                  id,
                  orderNumber: order,
            };
            fetch(`https://doob.dev/api/v1/seller/daraz-ready-to-ship`, {
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

            console.log(order);

            if (select.includes(order)) {
                  setSelect(select.filter((item) => item.order_id !== order.order_id));
                  return;
            } else {
                  setSelect([...select, order]);
            }
      };

      const [invoice, setInvoice] = useState(false)
      const [invoices_data, setInvoices_data] = useState(false)






      const set_invoice_number = (e) => {
            e.preventDefault()
            const invoice_number = e.target.invoice_number.value
            console.log(invoice_number);
            console.log();

            const data = {
                  id: shop_id,
                  invoiceNumber: invoice_number,
                  orderNumber: invoice[0]?.order_number
            }


            fetch('https://doob.dev/api/v1/seller/inset-daraz-order-invoice', {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            }).then((res) => res.json())
                  .then((data) => {
                        if (data.success) {
                              setInvoices_data(invoice)
                              setInvoice(false)
                        }
                        else {
                              BrightAlert(`${data.message}`, '', 'warning')
                        }

                  });

      }


      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });




      return (
            <tr className="border-b ">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                        <div className="flex">
                              <input
                                    type="checkbox"
                                    checked={select?.includes(data)}
                                    onChange={() => handleCheckboxChange(data)} // Pass order_id to handleCheckboxChange
                                    className="shrink-0 mt-0.5
                        cursor-pointer border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                    id={`checkbox-${order_number}`} // Use unique IDs for each checkbox
                              />
                        </div>
                  </td>
                  <td className="whitespace-nowrap border-r text-2xl">
                        <button onClick={() => setInvoice([data])} className=" px-4 py-4">
                              +
                        </button>
                        <DarazOrderAllinfoModal
                              setModalOn={setModalOn}
                              modalOn={modalOn}
                              productList={productList}
                        />
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 ">

                        {`${data?.address_billing?.first_name ?? data?.address_billing?.first_name}` + ' ' + data.address_billing?.last_name ?? data?.address_billing?.last_name}
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                        <Link to={`/admin/admin-daraz-invoice/${order_number}/${shop_id}/${order_status}`} className="text-blue-500 font-[400]">
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
                                          onClick={() => { setReady_to_ship(data) }}
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
                        ready_to_ship && <>
                              <Daraz_ship
                                    readyToShip={ready_to_ship}
                                    setReadyToShip={setReady_to_ship}
                                    orderInfo={data}
                                    refetch={refetch}
                                    ships={shopInfo ? ships : admin_shop}
                                    local_status_updated={darazOrderReady}
                              />
                        </>
                  }


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

                  {
                        invoices_data.length && <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                              <div className="bg-gray-100 w-full h-full p-12 mx-4 md:mx-auto relative bar overflow-auto">
                                    <div className="flex gap-2 items-start">
                                          <button
                                                onClick={handlePrint}
                                                className="bg-blue-500 px-6 py-2 rounded-md text-white mb-4"
                                          >
                                                Print
                                          </button>
                                          <button
                                                onClick={() => setInvoices_data(false)}
                                                className="bg-blue-500 px-6 py-2 rounded-md text-white mb-4"
                                          >
                                                Cancel
                                          </button>
                                    </div>
                                    <div
                                          ref={componentRef}
                                          className="w-full p-8 bg-white mx-auto"
                                    // style={{ width: "210mm", height: "297mm" }}
                                    >
                                          {invoices_data.map((invoiceData, index) => (
                                                <div key={invoiceData.order_id} className="text-2xl mt-4 font-bold mb-4 page-break">
                                                      <SellerInvoiceDaraz invoiceData={invoiceData} />
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  }




                  {orderCancel && (
                        <div>
                              <div
                                    className="fixed inset-0 z-10 bar overflow-y-auto"
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

                                          <div className="relative inline-block px-4 pt-5 pb-4 bar overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
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

export default AdminOrderTableRow;
