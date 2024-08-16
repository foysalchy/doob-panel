import { useQuery } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import DarazOrderTable from "../DarazOrder/DarazOrderTable";
import WooCommerceOrderTable from "../WoocommerceOrder/WooCommerceOrderTable";
import AllOrderInvoice from "./AllOrderInvoice";
import ExportModal from "./ExportModal";
import { ordersNav } from "./ManageOrderNavData";
import OrderTable from "./OrderTable";
import PrintedWebInvoice from "./PrintedWebInvoice";
import Swal from "sweetalert2";
import BrightAlert from "bright-alert";
import SellectedInvoice from "./SellectedInvoice";
const ManageOrder = () => {
      const { shopInfo } = useContext(AuthContext);
      const [openModal, setOpenModal] = useState(false);
      const [selectedValue, setSelectedValue] = useState("All");
      const [selectedItems, setSelectedItems] = useState([]);
      const [showPrintModal1, setShowPrintModal1] = useState(false);

      const [searchValue, setSearchValue] = useState("");
      const [selectedDate, setSelectedDate] = useState(null);
      const [details, setDetails] = useState();
      const [isDaraz, setIsDaraz] = useState(false);
      const [showInvoiceSm, setShowInvoiceSm] = useState(false);
      const [woo, setWoo] = useState(false);
      const [passData, setPassData] = useState([]);
      const [selected, setSelected] = useState([]);
      const [showInvoice, setShowInvoice] = useState(false);

      const [selected_item, setSelected_item] = useState([])

      console.log(selected_item, selected);

      const { data: tData = [], refetch, isLoading: order_loading } = useQuery({
            queryKey: ["sellerOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const { data: darazOrder = [], refetch: refetchDaraz } = useQuery({
            queryKey: ["sellerAllDarazOrder"],

            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=all`
                  );

                  const data = await res.json();
                  return data.data;
            },
      });

      const { data: daraz_pending = [], } = useQuery({
            queryKey: ["sellerPendingDarazOrder"],

            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=pending`
                  );

                  const data = await res.json();
                  return data.data;
            },
      });


      console.log(darazOrder.count, daraz_pending.count);



      const daraz_order = order_loading ? [] : (daraz_pending?.orders?.length ? daraz_pending?.orders : [])



      const all_data = [...tData, ...daraz_order]



      const getOrderCount = (orders, status) => {
            console.log(orders, status);
            return orders.filter(
                  (order) =>
                        status === "All" ||
                        (status === "pending" && !order?.status || !order?.statuses[0]) ||
                        order?.status === status
            ).length;
      };

      const getDarazOrderCount = (orders, status) => {


            return orders?.filter(
                  (order) =>
                        status === "All" ||
                        (status === "pending" && !order?.statuses[0]) ||
                        (status === "canceled" && order?.statuses[0] === "Cancel") ||
                        // (status === "Ready to ship" && order?.statuses[0] === "ready_to_ship") ||
                        order?.statuses[0] === status
            ).length;
      };


      const [isOpen, setIsOpen] = useState(false);

      const toggleDropdown = () => {
            setIsOpen(!isOpen);
      };

      // const get_print_for_selected_items = () => {
      //   if (selected.length) {
      //     fetch(
      //       `https://doob.dev/api/v1/seller/daraz-get-order-invoice?id=${shopInfo._id}&orderId=[${selected}]`
      //     )
      //       .then((res) => res.text())
      //       .then((html) => {

      //         console.log(html, 'update_html');
      //         if (!html.status) {

      //           const tempDiv = document.createElement("div");
      //           tempDiv.innerHTML = html;
      //           const iframe = tempDiv.querySelector("iframe");
      //           if (iframe) {
      //             const src = iframe.getAttribute("src");
      //             // Now you have the src value, you can use it as needed
      //             console.log("src:", src);
      //             // For example, you can open it in a new tab/window
      //             window.open(src, "_blank");
      //           } else {
      //             console.error("No iframe found in the HTML content.");
      //           }
      //         }
      //         else {
      //           BrightAlert({ timeDuration: 3000, title: `${html.message}`, icon: 'warning' });
      //         }
      //       })
      //       .catch((error) => {
      //         BrightAlert({ timeDuration: 3000, title: `${error.message}`, icon: 'warning' });
      //       });
      //   }
      //   else {
      //     BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
      //   }
      // };


      const get_print_for_selected_items = () => {
            if (selected.length) {
                  fetch(
                        `https://doob.dev/api/v1/seller/daraz-get-order-invoice?id=${shopInfo._id}&orderId=[${selected}]`
                  )
                        .then((res) => res.text())
                        .then((html) => {
                              const parsedHTML = new DOMParser().parseFromString(html, "text/html");
                              const iframe = parsedHTML.querySelector("iframe");
                              if (iframe) {
                                    const src = iframe.getAttribute("src");
                                    window.open(src, "_blank");
                              } else {
                                    const text_to_json = JSON.parse(html);
                                    BrightAlert({ timeDuration: 3000, title: text_to_json.message, icon: 'warning' });
                              }
                        })
                        .catch((error) => {
                              BrightAlert({ timeDuration: 3000, title: `${error.message}`, icon: 'warning' });
                        });
            } else {
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First', icon: 'warning' });
            }
      };


      const get_daraz_sleeted_order_invoice = () => {

            if (selected.length) {
                  fetch(
                        `https://doob.dev/api/v1/seller/daraz-get-order-items?id=${shopInfo._id}&orderId=[${selected}]`
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data.data);
                              const invoiceHTML = constructInvoiceHTML(data.data);

                              // Open the invoice in a new window/tab
                              const newWindow = window.open("");
                              newWindow.document.write(invoiceHTML);
                        })
                        .catch((error) => {
                              BrightAlert(error)
                        });
            }
            else {
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
            }
      };
      const constructInvoiceHTML = (invoiceData) => {
            // Construct the HTML content for the invoice using the fetched data
            let html = `
    <html>
    <head>
        <title>Invoice</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            h1 {
                text-align: center;
                margin-bottom: 20px;
            }
            .print-button {
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div className="max-w-2xl mx-auto p-4">
        <div className="print-button mt-8 text-right flex items-end justify-end">
            <button onclick="window.print()" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Print Invoice</button>
        </div>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Invoice</h1>
            </div>
            <div>
                <h2 className="text-lg font-semibold">Buyer Information</h2>
                <p><strong>Buyer ID:</strong> ${invoiceData.buyer_id}</p>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <p><strong>Order ID:</strong> ${invoiceData.order_id}</p>
                <p><strong>Order Status:</strong> ${invoiceData?.status}</p>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold">Order Items</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="py-2">Product Image</th>
                            <th className="py-2">Product Name</th>
                            <th className="py-2">SKU</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
`;

            // Iterate over the order items and add rows to the table
            invoiceData.forEach((item) => {
                  html += `
            <tr>
                <td className="py-2"><img src="${item.product_main_image
                        }" alt="Product Image" className="w-16 h-16 object-cover"></td>
                <td className="py-2">${item.name}</td>
                <td className="py-2">${item.sku}</td>
                <td className="py-2">${item.item_price}</td>
                <td className="py-2">${item.quantity}</td>
                <td className="py-2">${item.item_price * item.quantity}</td>
            </tr>
        `;
            });

            // Close the HTML content
            html += `
                    </tbody>
                </table>
            </div>
        </div>

    </body>
    </html>
`;

            return html;
      };


      const [handle_invoice, setHandle_invoice] = useState(false)

      const getPrintForSelectedEveryItems = async () => {
            if (selected.length) {
                  try {
                        setHandle_invoice(true)
                  } catch (error) {
                        alert(error);
                  }
            }
            else {
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
            }
      };

      const constructMultipleInvoiceHTML = (allInvoicesData) => {
            console.log(allInvoicesData);
            // Initialize an empty string to store the HTML content for all invoices
            let allInvoicesHTML = "";

            // Iterate over each invoice data
            allInvoicesData.forEach(invoiceGroup => {
                  invoiceGroup.forEach(invoiceData => {
                        // Construct the HTML content for each invoice using the fetched data
                        let html = `
                <div className="max-w-2xl mx-auto p-6 mb-6 border rounded-lg shadow-md">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold">Invoice</h1>
                        <p className="text-sm text-gray-500">Invoice Number: ${invoiceData.invoice_number}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">Buyer Information</h2>
                        <p><strong>Buyer ID:</strong> ${invoiceData.buyer_id}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">Order Details</h2>
                        <p><strong>Order ID:</strong> ${invoiceData.order_id}</p>
                        <p><strong>Order Status:</strong> ${invoiceData?.status}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="py-2 px-4">Product Image</th>
                                    <th className="py-2 px-4">Product Name</th>
                                    <th className="py-2 px-4">SKU</th>
                                    <th className="py-2 px-4">Price</th>
                                    <th className="py-2 px-4">Quantity</th>
                                    <th className="py-2 px-4">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

                        // Check if order_items exist and iterate over them
                        if (invoiceData?.order_items) {
                              invoiceData.order_items.forEach(item => {
                                    html += `
                        <tr className="border-b">
                            <td className="py-2 px-4"><img src="${item.product_main_image}" alt="Product Image" className="h-20 w-20 object-cover"></td>
                            <td className="py-2 px-4">${item.name}</td>
                            <td className="py-2 px-4">${item.sku}</td>
                            <td className="py-2 px-4">${item.item_price}</td>
                            <td className="py-2 px-4">${item.quantity}</td>
                            <td className="py-2 px-4">${item.item_price * item.quantity}</td>
                        </tr>
                    `;
                              });
                        } else {
                              html += `
                    <tr>
                        <td className="py-2 px-4 text-center" colspan="6">No items in this order.</td>
                    </tr>
                `;
                        }

                        // Close the HTML content for the current invoice
                        html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

                        // Append the HTML content of the current invoice to the overall HTML string
                        allInvoicesHTML += html;
                  });
            });

            return allInvoicesHTML;
      };

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const {
            data: darazShop = [],
            isLoading,
            refetch: darazShopRefetch,
      } = useQuery({
            queryKey: ["darazShopBd"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/seller-daraz-accounts?id=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data[0];
            },
      });

      const {
            data: previousAccount = [],
            isLoading: loading,
            refetch: reload,
      } = useQuery({
            queryKey: ["previousAccount"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/daraz/get-privious-account?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const switchAccount = (_id, id) => {
            console.log(`https://doob.dev/api/v1/daraz/switching-your-daraz?id=${id}&loginId=${_id}`,);
            fetch(
                  `https://doob.dev/api/v1/daraz/switching-your-daraz?id=${id}&loginId=${_id}`,
                  {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                  }
            )
                  .then((response) => response.json())
                  .then((data) => {
                        console.log(data); // Log response data
                        Swal.fire("Success", "", "success"); // Show success message (assuming you're using SweetAlert)
                        refetch(); // Refetch data
                        reload(); // Reload data
                        darazShopRefetch()
                        refetchDaraz()
                  });
      };

      const [selectedAccount, setSelectedAccount] = useState("");

      const handleChange = (event) => {
            const selectedOldId = event.target.value;
            console.log(selectedOldId);
            const selectedShop = previousAccount.find(shop => shop._id === selectedOldId);
            console.log(selectedShop, selectedOldId);
            setSelectedAccount(selectedOldId);
            if (selectedShop) {
                  switchAccount(selectedShop._id, selectedShop.oldId);
            }
      };


      const isWithin28Days = (createdAt) => {
            const currentTime = new Date().getTime();
            const differenceInMilliseconds = currentTime - new Date(createdAt).getTime();
            const millisecondsIn28Days = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
            return differenceInMilliseconds < millisecondsIn28Days;
      };


      return (
            <div>
                  <ExportModal
                        openModal={openModal}
                        details={details}
                        setOpenModal={setOpenModal}
                  />
                  <div className="flex justify-end items-center gap-12 mt-8 w-full">
                        {/* <div className="w-full px-4 py-2 bg-gray-50 rounded text-blue-500 flex items-center gap-2">
          <MdEmail />
          {<h1 className="w-full"> {darazShop?.shop2?.data?.name ?? darazShop?.result?.account}</h1>}
        </div> */}
                        <div className="bg-gray-50 px-4 py-2 rounded text-blue-500 flex items-center gap-2">
                              <h1 className="whitespace-nowrap">Switch Account</h1>
                              <hr className="flex-grow mx-2 border-t border-blue-500" />
                              <select
                                    className="w-full px-4 py-2 border rounded bg-[#d2d2d2] text-sm"
                                    value={selectedAccount}
                                    onChange={handleChange}
                              >
                                    <option value="">
                                          {darazShop?.shop2?.data?.name ?? darazShop?.result?.account}
                                    </option>
                                    {(() => {
                                          const seenNames = new Set();
                                          return previousAccount
                                                .filter((item) => darazShop?.shop2?.data?.name !== item?.shop2?.data?.name)
                                                .filter((item) => {
                                                      const name = item?.shop2?.data?.name;
                                                      if (name && !seenNames.has(name)) {
                                                            seenNames.add(name);
                                                            return true;
                                                      }
                                                      return false;
                                                })
                                                .map((shopSingle) => {
                                                      const isRecent = isWithin28Days(shopSingle?.createdAt);
                                                      const isBlocked = shopSingle?.isAdmin === "block";

                                                      return (
                                                            <option
                                                                  disabled={isBlocked}
                                                                  style={{
                                                                        color: isBlocked ? "#ffffff" : isRecent ? "" : "#ffffff",
                                                                        backgroundColor: isBlocked || !isRecent ? "#ff0000" : "",
                                                                  }}
                                                                  key={shopSingle._id}
                                                                  value={shopSingle._id}
                                                            >
                                                                  {shopSingle?.shop2?.data?.name ?? shopSingle?.result?.account}
                                                                  {!isRecent && <span> Almost 28 days</span>}
                                                            </option>
                                                      );
                                                });
                                    })()}
                              </select>
                        </div>
                  </div>

                  <h3 className="font-bold text-xl">Orders Overview</h3>
                  <div className="flex flex-wrap justify-start  items-center gap-4 ">
                        <button
                              onClick={() => {
                                    setIsDaraz(false), setWoo(false);
                              }}
                              className={`px-4 py-1 border text-white ${!isDaraz && !woo ? "bg-gray-900" : "bg-gray-500"
                                    }`}
                        >
                              Shop Order
                        </button>
                        <button
                              onClick={() => {
                                    setIsDaraz(true), setWoo(false);
                              }}
                              className={`px-4 py-1 border text-white ${isDaraz ? "bg-gray-900" : "bg-gray-500"
                                    }`}
                        >
                              Daraz Order
                        </button>
                        <button
                              onClick={() => {
                                    setWoo(true), setIsDaraz(false);
                              }}
                              className={`px-4 py-1 text-white  border ${woo ? "bg-gray-900" : "bg-gray-500"
                                    }`}
                        >
                              Woo Commerce Order
                        </button>
                        <Link
                              to={"/seller/orders/web-store-order"}
                              className={`px-4 py-1 text-white border bg-gray-500
            `}
                        >
                              Doob Order
                        </Link>
                  </div>

                  <nav className="flex flex-wrap md:gap-4 gap-2  mt-6">
                        {ordersNav?.map((itm) =>
                              itm?.status === "dropdown" ? (
                                    <select
                                          key={itm.name}
                                          className={`px-4 border-r bg-transparent relative border-gray-300 flex items-center gap-2 justify-center ${selectedValue === "pending" ? "text-red-500" : ""
                                                }`}
                                          value={selectedValue}
                                          onChange={(e) => setSelectedValue(e.target.value)}
                                    >
                                          <option value="pending">Pending</option>
                                          {itm?.dropdownLink?.map((option) => (
                                                <option key={option}>{option}</option>
                                          ))}
                                    </select>
                              ) : (
                                    <button
                                          key={itm.name}
                                          className={`px-4 border-r md:bg-transparent bg-gray-50 border-gray-300 flex  items-center ${selectedValue === itm.value ? "text-red-500" : ""
                                                }`}
                                          style={{ whiteSpace: "nowrap" }}
                                          onClick={() => setSelectedValue(itm.value)}
                                    >
                                          {itm.name} (
                                          {!isDaraz
                                                ? `${getOrderCount(all_data, itm.value)}`
                                                : getDarazOrderCount(darazOrder.orders, itm.daraz_value)}
                                          )
                                    </button>
                              )
                        )}
                  </nav>

                  <div>
                        <div
                              onClick={() => setShowInvoice(false)}
                              className={`fixed z-[100] flex items-center justify-center ${showInvoice ? "visible opacity-100" : "invisible opacity-0"
                                    } inset-0   backdrop-blur-sm duration-100 dark:bg-white/10`}
                        >
                              <div
                                    onClick={(e_) => e_.stopPropagation()}
                                    className={`text- absolute w-[98%] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-gray-50 h-full  overflow-y-auto dark:text-black ${showInvoice
                                          ? "scale-1 opacity-1 duration-300"
                                          : "scale-0 opacity-0 duration-150"
                                          }`}
                              >
                                    <button
                                          onClick={() => setShowInvoice(false)}
                                          className="bg-red-500 absolute left-[100px] text-white px-4 py-1 rounded"
                                    >
                                          Close
                                    </button>
                                    <PrintedWebInvoice data={selectedItems} />
                              </div>
                        </div>
                  </div>

                  <div className="flex md:flex-row flex-col items-center gap-4 mt-4">
                        <div className="relative inline-block text-left">
                              <button
                                    onClick={toggleDropdown}
                                    className="px-4 bg-white py-1 border"
                                    id="dropdown-button"
                                    aria-haspopup="true"
                                    aria-expanded={isOpen ? "true" : "false"}
                              >
                                    Print
                              </button>
                              {isOpen && !isDaraz && (
                                    <div
                                          className="origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="dropdown-button"
                                          tabIndex="-1"
                                    >
                                          <div className="py-1" role="none">
                                                <button
                                                      onClick={() => setShowInvoiceSm(true)}
                                                      className="block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                      role="menuitem"
                                                      tabIndex="-1"
                                                      id="dropdown-item-1"
                                                >
                                                      Print Stock Checklist For Selected Items
                                                </button>

                                                <button
                                                      onClick={() => setShowPrintModal1(true)}
                                                      className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100"
                                                      role="menuitem"
                                                      tabIndex="-1"
                                                      id="dropdown-item-2"
                                                >
                                                      Print Invoice For Selected Items
                                                </button>
                                                {/* <button
                  onClick={() => setShowInvoice(true)}
                  className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  id="dropdown-item-3"
                >
                  Print Shipping Label For Selected Items
                </button> */}
                                          </div>
                                    </div>
                              )}
                              {isOpen && isDaraz && (
                                    <div
                                          className="origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="dropdown-button"
                                          tabIndex="-1"
                                    >
                                          <div className="py-1" role="none">
                                                <button
                                                      onClick={get_daraz_sleeted_order_invoice}
                                                      className="block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                      role="menuitem"
                                                      tabIndex="-1"
                                                      id="dropdown-item-1"
                                                >
                                                      Print Stock Checklist For Selected Items
                                                </button>

                                                <button
                                                      onClick={getPrintForSelectedEveryItems}
                                                      className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100"
                                                      role="menuitem"
                                                      tabIndex="-1"
                                                      id="dropdown-item-2"
                                                >
                                                      Print Invoice For Selected Items
                                                </button>
                                                <button
                                                      onClick={() => get_print_for_selected_items()}
                                                      className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100"
                                                      role="menuitem"
                                                      tabIndex="-1"
                                                      id="dropdown-item-3"
                                                >
                                                      Print Shipping Label For Selected Items
                                                </button>
                                          </div>
                                    </div>
                              )}
                        </div>
                        {/* !work  */}
                        <div>
                              <div
                                    onClick={() => setShowInvoiceSm(false)}
                                    className={`fixed z-[100] flex items-center justify-center ${showInvoiceSm ? "visible opacity-100" : "invisible opacity-0"
                                          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                              >
                                    <div
                                          onClick={(e_) => e_.stopPropagation()}
                                          className={`text- absolute w-[95%] h-[96%] overflow-y-auto rounded-sm bg-gray-50 p-6 drop-shadow-lg ${showInvoiceSm
                                                ? "scale-1 opacity-1 duration-300"
                                                : "scale-0 opacity-0 duration-150"
                                                }`}
                                    >
                                          <div className="flex gap-2">
                                                <button
                                                      onClick={handlePrint}
                                                      className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                >
                                                      Print
                                                </button>
                                                <button
                                                      onClick={() => setShowInvoiceSm(false)}
                                                      className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                >
                                                      Cancel
                                                </button>
                                          </div>
                                          <div ref={componentRef}>

                                                <div
                                                      style={{ width: "210mm", height: "297mm" }}
                                                      className="bg-white mx-auto mb-4 p-12  "
                                                // key={itm?._id}
                                                >


                                                      <header className="flex justify-between  ">
                                                            <div id="logo">
                                                                  <img src={shopInfo?.logo} />
                                                            </div>
                                                            <div className="text-end">
                                                                  <h2 className="name">{shopInfo?.shopName}</h2>
                                                                  <div>{shopInfo?.shopNumber}</div>
                                                                  <a className="text-end" href={`mailto:${shopInfo?.shopEmail}`}>
                                                                        {shopInfo?.shopEmail}
                                                                  </a>

                                                            </div>
                                                      </header>

                                                      <br />
                                                      <main>
                                                            <div className="lg:px-6 bg-white print-container  pb-12 print-data">
                                                                  <main>
                                                                        <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 text-center ">
                                                                              INVOICE
                                                                        </div>

                                                                        {/*.*/}
                                                                        {/*.... Address ...*/}
                                                                        {/*.*/}



                                                                        <section className="container  mx-auto mt-8">
                                                                              <div className="w-full mb-8 overflow-hidden">
                                                                                    <div className="w-full overflow-x-auto border">
                                                                                          <table className="w-full">
                                                                                                <thead>
                                                                                                      <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                                                            <th className="px-4 py-2">Photo</th>
                                                                                                            <th className="px-4 py-2">Name</th>
                                                                                                            <th className="px-4 py-2 whitespace-nowrap">
                                                                                                                  Price
                                                                                                            </th>
                                                                                                            <th className="px-4 py-2"> Quantity</th>
                                                                                                      </tr>
                                                                                                </thead>
                                                                                                <tbody className="bg-white">
                                                                                                      {selectedItems?.map(order =>
                                                                                                            order?.productList?.map((itm) =>
                                                                                                                  <tr className="border-t" key={itm?._id}>
                                                                                                                        <td className="p-4 w-[110px] border-b border-blue-gray-50">
                                                                                                                              <img
                                                                                                                                    src={itm?.img}
                                                                                                                                    alt=""
                                                                                                                                    className="w-[100px] object-cover h-[80px] rounded border"
                                                                                                                              />
                                                                                                                        </td>
                                                                                                                        <td className="p-4 border-b w-[300px] border-blue-gray-50">
                                                                                                                              {itm?.productName}
                                                                                                                        </td>
                                                                                                                        <td className="p-4 border-b border-blue-gray-50">
                                                                                                                              {itm?.offerPrice || itm?.price || itm?.regular_price}
                                                                                                                        </td>
                                                                                                                        <td className="p-4 border-b border-blue-gray-50">
                                                                                                                              {itm?.quantity}
                                                                                                                        </td>
                                                                                                                  </tr>
                                                                                                            ))}
                                                                                                </tbody>
                                                                                          </table>
                                                                                    </div>
                                                                              </div>
                                                                        </section>
                                                                  </main>
                                                                  <footer></footer>
                                                            </div>
                                                      </main>
                                                </div>

                                          </div>

                                    </div>
                              </div>
                        </div>

                        <div>
                              <div
                                    onClick={() => setShowPrintModal1(false)}
                                    className={`fixed z-[100] flex items-center justify-center ${showPrintModal1 ? "visible opacity-100" : "invisible opacity-0"
                                          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                              >
                                    <div
                                          onClick={(e_) => e_.stopPropagation()}
                                          className={`text- absolute overflow-y-auto w-[96%] h-[98%] rounded-sm bg-gray-50 p-6 drop-shadow-lg text-black ${showPrintModal1
                                                ? "scale-1 opacity-1 duration-300"
                                                : "scale-0 opacity-0 duration-150"
                                                }`}
                                    >
                                          <AllOrderInvoice
                                                data={selectedItems}
                                                setShowPrintModal1={setShowPrintModal1}
                                                showPrintModal1={showPrintModal1}
                                          />
                                    </div>
                              </div>
                        </div>

                        <button
                              onClick={() => setOpenModal(!openModal)}
                              className="px-4 py-1 bg-transparent border"
                        >
                              Export order
                        </button>

                        <input
                              className="w-[260px] md:mt-0 mt-3 rounded border-gray-400 focus:outline-none p-2 border"
                              type="date"
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

                  <div className="mt-12 ">
                        {!isDaraz && !woo && (
                              <OrderTable
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    setPassData={setPassData}
                                    ordersNav={ordersNav}
                                    selectedDate={selectedDate}
                                    setDetails={setDetails}
                                    setOpenModal={setOpenModal}
                                    selectedValue={selectedValue}
                                    searchValue={searchValue}
                                    darazOrder={darazOrder}
                                    setIsDaraz={setIsDaraz}
                                    setWoo={setWoo}
                              />
                        )}
                        {isDaraz && (
                              <DarazOrderTable
                                    selected_item={selected_item}
                                    setSelected_item={setSelected_item}
                                    selected={selected}
                                    setSelected={setSelected}
                                    selectedValue={selectedValue}
                                    searchValue={searchValue}
                              />
                        )}
                        {woo && (
                              <WooCommerceOrderTable
                                    selected={selected}
                                    setSelected={setSelected}
                                    selectedValue={selectedValue}
                                    searchValue={searchValue}
                              />
                        )}

                        {handle_invoice && <SellectedInvoice invoiceData={selected_item} handle_invoice={handle_invoice} setHandle_invoice={setHandle_invoice} />}
                  </div>
            </div>
      );
};

export default ManageOrder;
