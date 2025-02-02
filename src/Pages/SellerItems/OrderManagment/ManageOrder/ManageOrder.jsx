import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import DarazOrderTable from "../DarazOrder/DarazOrderTable";
import WooCommerceOrderTable from "../WoocommerceOrder/WooCommerceOrderTable";
import AllOrderInvoice from "./AllOrderInvoice";
import AllOrderInvoice2 from "./AllOrderInvoice2";
import ExportModal from "./ExportModal";
import { ordersNav, woo_order_nav } from "./ManageOrderNavData";
import OrderTable from "./OrderTable";
import PrintedWebInvoice from "./PrintedWebInvoice";
import Swal from "sweetalert2";
import BrightAlert from "bright-alert";
import showAlert from "../../../../Common/alert";
import { IoIosArrowDown } from "react-icons/io";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

import SellectedInvoice from "./SellectedInvoice";
import InvoicePage from "./Woo_order_Invoice";
import Woo_Order_stock from "./Woo_Order_stock";
import Datepicker from "react-tailwindcss-datepicker";
const ManageOrder = () => {
      const { shopInfo } = useContext(AuthContext);
      const [openModal, setOpenModal] = useState(false);
      const [selectedValue, setSelectedValue] = useState("pending");
      const [selectedItems, setSelectedItems] = useState([]);
      const [showPrintModal1, setShowPrintModal1] = useState(false);
      const [showPrintModal2, setShowPrintModal2] = useState(false);
      const [swithcOrder, setSwithcOrder] = useState(false);
      {console.log(showPrintModal2,'showPrintModal2')}
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
      const [offset, setOffset] = useState(0)
      const [offsetAll, setOffsetAl] = useState(0)
      const [woo_select_item, set_woo_select_item] = useState([]);
      const [value, setValue] = useState({
            startDate: null,
            endDate: null
      });



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

      const [isOpenStatus, setIsOpenStatus] = useState(false);

      const [woo_data, setWoo_data] = useState([])
      const [reloadData, setReloadData] = useState(false);


      const { data: woo_order = [] } = useQuery({
            queryKey: ["woo_order_status"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/woo-order-status?shop_id=${shopInfo?._id}&is_admin=${shopInfo ? false : true}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      useEffect(() => {
            let offset = 0;
            const pageSize = 20; // Set your desired page size
            let hasMore = true;

            const fetchData = async () => {
                  while (hasMore) {
                        const res = await fetch(
                              `https://doob.dev/api/v1/seller/woo-commerce-order?shopId=${shopInfo._id}&offset=${offset}&page_size=${pageSize}`
                        );
                        const data = await res.json();

                        if (data.data.length > 0) {

                              // Avoid adding duplicates by checking the order ID
                              setWoo_data((prevData) => {
                                    const existingOrderIds = new Set(prevData.map((item) => item.id)); // Assuming `id` is unique for each order
                                    const newData = data.data.filter((item) => !existingOrderIds.has(item.id));

                                    return [...prevData, ...newData]; // Append only non-duplicate items
                              });

                              offset += pageSize; // Increment the offset to fetch the next set of records
                        } else {
                              hasMore = false; // Stop fetching when no more data is available
                        }
                  }
            };

            fetchData();
      }, [shopInfo._id, reloadData]);


      const getWooCount = (woo_data, status) => {
            return woo_data?.filter(order => {
                  if (status === "All") {
                        return true;
                  }
                  if (status === "shipped") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "ready_to_ship"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order_data) => {
                              return Number(order_data.orderId) === Number(order.id);
                        });
                        if (isInShippedOrders) return true;
                  }
                  if (status === "refund") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "refund"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order_data) => {
                              return Number(order_data.orderId) === Number(order.id);
                        });
                        if (isInShippedOrders) return true;
                  }
                  if (status === "return") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "return"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order_data) => {
                              return Number(order_data.orderId) === Number(order.id);
                        });
                        if (isInShippedOrders) return true;
                  }
                  if (status === "returned") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "returned"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order_data) => {
                              return Number(order_data.orderId) === Number(order.id);
                        });
                        if (isInShippedOrders) return true;
                  }
                  if (status === "returned") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "returned"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order_data) => {
                              return Number(order_data.orderId) === Number(order.id);
                        });
                        if (isInShippedOrders) return true;
                  }


                  return order?.status === status;
            }).length;
      };
      // woo order work here


      const all_data = [...tData]


      const getOrderCount = (orders, status) => {
            return orders?.filter(order => {
                  if (status === "All") {
                        return true; // Include all orders
                  }

                  if (status === "pending") {
                        // Check if the order status is missing or if statuses array is empty
                        if (!isDaraz) {
                              if (order?.statuses?.[0] === 'pending') {
                                    return true;
                              } else if (!order?.statuses?.[0] && !order?.status) {
                                    return true;
                              }


                        }

                        else {
                              return order?.statuses?.[0]
                        }
                  }

                  // Match orders with the exact status
                  return order?.status === status;
            }).length;
      };







      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef(null);
      
      const productStatusUpdate = (status, orderId) => {
           
            // Open modal dialog to confirm action
            fetch(
                  `https://doob.dev/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status, orderId }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        // Assuming refetch is defined somewhere
                        refetch();
                        
                  });
      };

      const BulkStatusUpdate = async (e) => {
            const status = e.target.value;
            let completed = 0;
        
            // Initialize SweetAlert2 with a progress message
            Swal.fire({
                title: "Updating Status",
                html: `Processing <b>0</b> of ${selectedItems.length}`,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); // Show a loading spinner
                },
            });
        
            // Update status for each item and update the count
            for (const item of selectedItems) {
                await productStatusUpdate(status, item?._id);
                completed++;
        
                // Update the Swal content with the current count
                Swal.update({
                    html: `Processing <b>${completed}</b> of ${selectedItems.length}`,
                });
                
            }
            setSelectedItems([]);
            setIsOpenStatus(false)
            // Final message with a button to hide
            e.target.value='';
            Swal.fire({
                icon: "success",
                title: "Status Update Complete",
                text: `${completed} items have been updated successfully.`,
                timer: 3000,
            });
        };
                
      

      const toggleDropdown = () => {
          
            setIsOpen(!isOpen);
            setDropdownOpenFor2nd(false)
            setIsOpenStatus(false);
      };

      const toggleDropdownStatus = () => {
            setIsOpen(false)
            setDropdownOpenFor2nd(false)
            setIsOpenStatus(!isOpenStatus);
      };
      

      // Close dropdown if clicked outside
      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsOpen(false);
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, [dropdownRef]);


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
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
            }
      };


      const get_daraz_sleeted_order_invoice = () => {

            if (selected.length) {
                  fetch(
                        `https://doob.dev/api/v1/seller/daraz-get-order-items?id=${shopInfo._id}&orderId=[${selected}]`
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              const invoiceHTML = constructInvoiceHTML(data.data);

                              // Open the invoice in a new window/tab
                              const newWindow = window.open("");
                              newWindow.document.write(invoiceHTML);
                        })
                        .catch((error) => {
                              showAlert(error, "", "warning")
                        });
            }
            else {
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
            }
      };

      const constructInvoiceHTML = (invoiceData) => {

            let html = `
    <html>
    <head>
        <title>Invoice</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8fafc;
                color: #333;
            }
            .container {
                max-width: 800px;
                margin: 40px auto;
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                margin-bottom: 20px;
                font-size: 2rem;
                font-weight: 700;
                color: #1f2937;
            }
            .table-header {
                background-color: #e5e7eb;
            }
            .table-header th {
                text-transform: uppercase;
                font-size: 0.875rem;
                font-weight: 600;
                letter-spacing: 0.05em;
            }
            .table-row {
                border-bottom: 1px solid #e5e7eb;
            }
            .table-row:last-child {
                border-bottom: none;
            }
            .total-row {
                font-weight: bold;
                border-top: 2px solid #1f2937;
            }
            .footer {
                text-align: right;
                margin-top: 30px;
                font-size: 1.125rem;
                color: #374151;
            }
        </style>
    </head>
    <body>
        <div class="container">
           
            <div class="print-button text-right">
                <button onclick="window.print()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Print Invoice
                </button>
            </div>

            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Order Items</h2>
                <table class="min-w-full bg-white">
                    <thead class="table-header">
                        <tr>
                            <th class="py-3 px-4">Product Image</th>
                            <th class="py-3 px-4">Product Name</th>
                            <th class="py-3 px-4">SKU</th>
                            <th class="py-3 px-4">Price</th>
                            <th class="py-3 px-4">Quantity</th>
                            <th class="py-3 px-4">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
  `;
            const productMap = {};

            // Step 1: Accumulate products based on SKU and their quantities
            invoiceData.forEach((item) => {
                  if (productMap[item.sku]) {
                        // If the SKU matches, increase the quantity
                        productMap[item.sku].quantity += 1;
                  } else {
                        // Otherwise, add the product with an initial quantity of 1
                        productMap[item.sku] = { ...item, quantity: 1 };
                  }
            });
            // Iterate over the order items and add rows to the table
            Object.values(productMap).forEach((item) => {
                  html += `
            <tr class="table-row">

                <td class="py-3 px-4"><img src="${item.product_main_image}" alt="Product Image" class="w-16 h-16 object-cover rounded"></td>
                <td class="py-3 px-4">${item.name}</td>
                <td class="py-3 px-4">${item.sku}</td>
                <td class="py-3 px-4">${item.item_price}</td>
                <td class="py-3 px-4">${item.quantity}</td>
                <td class="py-3 px-4">${item.item_price * item.quantity}</td>
            </tr>
        `;
            });

            // Calculate total price for all items
            const totalPrice = invoiceData.reduce(
                  (total, item) => total + item.item_price * 1,
                  0
            );

            // Add total row and close the HTML content
            html += `
                    </tbody>
                    <tfoot>
                        <tr class="total-row">
                            <td colspan="4"></td>
                            <td class="py-3 px-4 text-right">Total:</td>
                            <td class="py-3 px-4">${totalPrice}</td>
                        </tr>
                    </tfoot>
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
                  console.log('hit','item')
               
                  selected.forEach((item) => {
                        console.log('hit',item)
                        handlePrintStatus(item);
                    });
                    
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
      const getPrintHit = async () => {
            console.log('hit','item')
            if (selectedItems.length) {
                 
               
                  selectedItems.forEach((item) => {
                        console.log('hit',item)
                        handlePrintStatus(item);
                    });
                    
                 
            }
            else {
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
            }
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

      const switchAccount = (previous_id) => {
            const current_id = darazShop._id
            fetch(
                  `https://doob.dev/api/v1/daraz/switching-your-daraz?id=${previous_id}&loginId=${current_id}`,
                  {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                  }
            )
                  .then((response) => response.json())
                  .then((data) => {

                        if (data.status === true) {
                              showAlert("Account Switched", "", "success");
                              darazShopRefetch();
                              reload();
                              setSwithcOrder(true)
                        }
                        else {
                              BrightAlert(data.message, "", "warning");
                        }
                  });
      };

      const [selectedAccount, setSelectedAccount] = useState("");

      const handleChange = (event) => {
            const selectedOldId = event.target.value;
            setSelectedAccount(selectedOldId);
            switchAccount(selectedOldId);
            darazShopRefetch()
            reload()
      };

      const isWithin28Days = (createdAt) => {
            const currentTime = new Date().getTime();
            const differenceInMilliseconds = currentTime - new Date(createdAt).getTime();
            const millisecondsIn28Days = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
            return differenceInMilliseconds < millisecondsIn28Days;
      };
      const [countSelect, setCountSelect] = useState(0);

      useEffect(() => {
            const selectorderCount = !isDaraz ? selectedItems.length : selected_item.length;
            setCountSelect(selectorderCount);
      }, [selectedItems, selected_item, isDaraz]); // Run effect when any of these dependencies change

      const export_order_with_csv = () => {
            const order = !isDaraz ? selectedItems : selected_item;
            const csvData = order.map((item) => ({
                  "Order Id": isDaraz ? item.order_id : item.orderNumber,
                  "Order Status": item?.statuses ? item?.statuses[0] : (item?.status ? item?.status : "Pending"),
                  "Order Total": ratial_price(item?.productList),
                  "Order Date": new Date(item.timestamp).toLocaleDateString(), // Formatting date
            }));

            // Convert JSON to CSV
            const csvHeaders = Object.keys(csvData[0]);
            const csv = jsonToCSV(csvData, csvHeaders);

            // Download CSV
            downloadCSV(csv, "order.csv");
      };

      // Helper function to convert JSON to CSV
      const jsonToCSV = (jsonArray, headers) => {
            const csvRows = [];

            // Add headers
            csvRows.push(headers.join(','));

            // Add data
            jsonArray.forEach(row => {
                  const values = headers.map(header => {
                        const escaped = ('' + row[header]).replace(/"/g, '\\"'); // Escape quotes
                        return `"${escaped}"`;
                  });
                  csvRows.push(values.join(','));
            });

            return csvRows.join('\n');
      };

      const ratial_price = (productList) => {
            let ratial_price = 0;
            for (let i = 0; i < productList?.length; i++) {
                  const price =
                        parseFloat(productList[i]?.price) *
                        parseFloat(productList[i]?.quantity);
                  ratial_price += price;
            }
            return ratial_price;
      };

      // Helper function to trigger CSV download
      const downloadCSV = (csvContent, fileName) => {
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
      };

      const [view_invoice, setView_invoice] = useState(false)
      const get_woo_sleeted_order_invoice = () => {
            if (woo_select_item.length) {
                  setView_invoice(true)
            }
            else {
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
            }
      }


      const [woo_select_item_view, setWoo_select_item_view] = useState(false);
      const [dropdownOpenFor2nd, setDropdownOpenFor2nd] = useState(false);
      const [dropdownOpenForAction, setDropdownOpenForAction] = useState(false);

      const toggleDropdownFor2nd = () => {
            setIsOpen(false)
            setIsOpenStatus(false);
            setDropdownOpenFor2nd(!dropdownOpenFor2nd);
            setdropdownOpenWeb(false);
            setDropdownOpenForWare(false);
           
      };


      const handlePrintStatus = (order) => {
            const order_id = order._id;
        
            // Add print_status = true to the order object
            const updatedOrder = {
                ...order,
                print_status: true,
            };
            delete updatedOrder._id
            const body = {
                order_id: order_id,
                order_data: updatedOrder,
            };
        
            fetch("https://doob.dev/api/v1/seller/update-order-data", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((data) => {
                   
                    
                });
        };

       const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    switch (selectedValue) {
        case "stock-checklist":
            setShowInvoiceSm(true);
            setIsOpen(false);
            break;
        case "invoice":
            setShowPrintModal1(true);
            setIsOpen(false);
            getPrintHit();
            break;
        case "shipping-label":
            setShowPrintModal2(true);
            setIsOpen(false);
            getPrintHit();
            break;
        case "export-order":
            export_order_with_csv();
            setIsOpen(false);
            break;
        case "daraz-stock-checklist":
            get_daraz_sleeted_order_invoice();
            break;
        case "daraz-invoice":
            getPrintForSelectedEveryItems();
            break;
        case "daraz-shipping-label":
            get_print_for_selected_items();
            break;
        case "daraz-export-order":
            export_order_with_csv();
            break;
        case "woo-stock-checklist":
            setWoo_select_item_view(true);
            break;
        case "woo-invoice":
            get_woo_sleeted_order_invoice();
            break;
        case "woo-export-order":
            export_order_with_csv();
            break;
        default:
            break;
    }
};

          const scrollRef1 = useRef(null);
          const scrollRef2 = useRef(null);
        
          const scrollLeft = (ref) => {
            if (ref.current) {
              ref.current.scrollBy({ left: -100, behavior: "smooth" });
            }
          };
        
          const scrollRight = (ref) => {
            if (ref.current) {
              ref.current.scrollBy({ left: 100, behavior: "smooth" });
            }
          };
          
      return (
            <div className="">
                  <ExportModal
                        openModal={openModal}
                        details={details}
                        setOpenModal={setOpenModal}
                  />

                  {view_invoice && <InvoicePage view_invoice={view_invoice} setView_invoice={setView_invoice} wooSelectItem={woo_select_item} />}
                  {
                        woo_select_item_view && <Woo_Order_stock woo_select_item={woo_select_item} woo_select_item_view={woo_select_item_view} setWoo_select_item_view={setWoo_select_item_view} />
                  }




                  <div className="flex  items-center ">
                        <h3 className="mb-2 font-bold text-xl w-full">Orders Overview   {countSelect > 0 && <span>|| Selected : {countSelect} itmes</span>}</h3>
                        
                  </div>
                  <div className="flex items-center gap-2 ">
                   <button
                      onClick={() => scrollLeft(scrollRef2)}
                         className="p-1 bg-gray-200  md:hidden bloack rounded shadow-md hover:bg-gray-300  "
                   >
                         <ChevronLeft className="w-5 h-5" />
                   </button>
                  <div  ref={scrollRef2} className="flex  overflow-auto  gap-2">
                        
                  
                 
                  <div className="relative">
                      <select
                        onChange={(e) => handleSelectChange(e)}
                        className="px-4 bg-white py-2 border rounded w-[100px]"
                        aria-expanded={isOpen ? "true" : "false"}
                        >
                        <option value="" disabled selected>
                              Print
                        </option>

                        {!isDaraz && !woo && (
                              <>
                                    <option value="stock-checklist">Print Stock Checklist </option>
                                    <option value="invoice">Print Invoice </option>
                                    <option value="shipping-label">Shipping Label</option>
                                    <option value="export-order">Export Order</option>
                              </>
                        )}

                        {isDaraz && !woo && (
                              <>
                                    <option value="daraz-stock-checklist">Print Stock Checklist </option>
                                    <option value="daraz-invoice">Print Invoice </option>
                                    <option value="daraz-shipping-label">Print Shipping Label </option>
                                    <option value="daraz-export-order">Export Order</option>
                              </>
                        )}

                        {woo && (
                              <>
                                    <option value="woo-stock-checklist">Print Stock Checklist </option>
                                    <option value="woo-invoice">Print Invoice </option>
                                    <option value="woo-export-order">Export Order</option>
                              </>
                        )}
                        </select>

                  </div>

                             
                  <div className="relative">
                        <select
                              onChange={BulkStatusUpdate}
                              className="px-4 bg-white py-2 border rounded w-[100px]"
                              aria-label="Select Status"
                        >
                              <option value="">Status</option>
                              <option value="pending">Pending</option>
                              <option value="onhold">On Hold</option>
                              <option value="cancel">Cancel</option>
                              <option value="ready_to_ship">Ready To Ship</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="return_request">Return Request</option>
                              <option value="returned">Returned</option>
                              <option value="failed_delivered">Failed Delivered</option>
                              <option value="refund_only">Refund Only</option>
                        </select>
                  </div>
                  <div className="relative ">
                        <select
                              onChange={(e) => {
                                    const selectedOption = e.target.value;
                                    if (selectedOption === "shop") {
                                    setIsDaraz(false);
                                    setWoo(false);
                                    setSelectedValue(""); // Clear the selected value
                                    } else if (selectedOption === "daraz") {
                                    setIsDaraz(true);
                                    setWoo(false);
                                    setSelectedValue("pending");
                                    } else if (selectedOption === "woo") {
                                    setWoo(true);
                                    setIsDaraz(false);
                                    }
                              }}
                              className="bg-white w-[120px] px-4 py-2 border rounded"
                              aria-label="Order Type"
                              value={isDaraz ? "daraz" : woo ? "woo" : "shop"}
                        >
                              <option value="" disabled selected>Order</option>
                              <option value="shop">Shop  </option>
                              <option value="daraz">Daraz  </option>
                              <option value="woo">Woo  </option>
                        </select>
                  </div>

                                          <Link
                                                to={"/seller/orders/web-store-order"}
                                                 className="px-2 bg-white py-2 border rounded col-span-2"
                                                 style={{minWidth:'110px'}}
                                          >
                                                B2B Order
                                          </Link>
                                          
                                          <div className="w-full md:block hidden"></div>
                  
                
                                     


                                           
                                                <div className="w-[250px] min-w-[250px] w-[100%] orderpage col-span-2"  >
                                                <Datepicker
                                                      value={value}
                                                      onChange={newValue => setValue(newValue)}
                                                      showShortcuts={true}
                                                      classNames="px-2 bg-white py-2 border rounded"
                                                />
                                          </div>

                                          <div className=" col-span-2">
                                                <div className="flex items-center md:mt-0  bg-white ">
                                                      <input
                                                            onChange={(e) => setSearchValue(e.target.value)}
                                                            type="text"
                                                            placeholder="Search"
                                                            className="w-[260px] rounded border-gray-200 focus:outline-none p-2 border"
                                                      />
                                                </div>
                                          </div>
                                          <div className="col-span-2 ">
                                          <select
                                            className="px-2  w-[190px]    bg-white py-2 border rounded"
                                          // value={selectedAccount}
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
                                    </select></div>
                 
                                           
                 </div>
                 <button
                         onClick={() => scrollRight(scrollRef2)}
                       className="p-1 bg-gray-200  rounded shadow-md hover:bg-gray-300 md:hidden bloack "
                  >
                        <ChevronRight className="w-5 h-5" />
                  </button>
                  </div>

                  <div className="flex items-center gap-2 ">
                   <button
                      onClick={() => scrollLeft(scrollRef1)}
                         className="p-1 bg-gray-200  rounded shadow-md hover:bg-gray-300  "
                   >
                         <ChevronLeft className="w-5 h-5" />
                   </button>

                  {woo ? <nav ref={scrollRef1}  className="flex overflow-x-auto overflow-y-hidden md:gap-4 gap-2 mt-2 pb-3">

                        {woo_order_nav?.map((itm) =>
                        (
                              <button
                                    key={itm.name}
                                    className={`px-4 border-r md:bg-transparent bg-gray-50 border-gray-300 flex gap-2 items-center ${selectedValue === itm.value ? "text-red-500" : ""
                                          }`}
                                    style={{ whiteSpace: "nowrap" }}
                                    onClick={() => setSelectedValue(itm.value)}
                              >
                                    {itm.name}

                                    <span>
                                          {
                                                woo
                                                      ? `(${getWooCount(woo_data, itm.value)})`
                                                      : ''
                                          }
                                    </span>

                              </button>
                        )
                        )}
                  </nav> :
                   
                        <nav   ref={scrollRef1} className="flex overflow-auto  md:gap-4 pb-3 gap-2  mt-2">
                              {ordersNav?.map((itm) =>
                              (
                                    <button
                                          key={itm.name}
                                          className={`px-4 border-r gap-2 bg-transparent   border-gray-300 flex  items-center ${selectedValue === itm.value ? "text-red-500" : ""
                                                }`}
                                          style={{ whiteSpace: "nowrap" }}
                                          onClick={() => setSelectedValue(itm.value)}
                                    >
                                          <span>
                                                {itm.name}
                                          </span>
                                          <span>
                                                {(!isDaraz && !woo)
                                                      ? `(${getOrderCount(all_data, itm.value)})`
                                                      : ''}
                                                {
                                                      woo
                                                            ? `(${getWooCount(all_data, itm.value)})`
                                                            : ''
                                                }
                                          </span>

                                    </button>
                              )
                              )}
                        </nav>
                       
                  }

                  <button
                         onClick={() => scrollRight(scrollRef1)}
                       className="p-1 bg-gray-200  rounded shadow-md hover:bg-gray-300  "
                  >
                        <ChevronRight className="w-5 h-5" />
                  </button>
                  </div>
                  <div>
                        <div
                              onClick={() => setShowInvoice(false)}
                              className={`fixed z-[100] flex items-center justify-center ${showInvoice ? "visible opacity-100" : "invisible opacity-0"
                                    } inset-0   backdrop-blur-sm duration-100 dark:bg-white/10`}
                        >
                              <div
                                    onClick={(e_) => e_.stopPropagation()}
                                    className={`text- absolute w-[98%] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-gray-50 h-full  bar overflow-y-auto dark:text-black ${showInvoice
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

                  <div className="flex md:flex-row flex-col items-center gap-4 ">
                       
                        {/* !work  */}
                        <div>
                              <div
                                    onClick={() => setShowInvoiceSm(false)}
                                    className={`fixed z-[100] flex items-center justify-center ${showInvoiceSm ? "visible opacity-100" : "invisible opacity-0"
                                          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                              >
                                    <div
                                          onClick={(e_) => e_.stopPropagation()}
                                          className={`text- absolute w-[95%] h-[96%] bar overflow-y-auto rounded-sm bg-gray-50 p-6 drop-shadow-lg ${showInvoiceSm
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
                                                                  <p>Date:{ new Date().toLocaleDateString()}</p>
                                                            </div>
                                                      </header>

                                                      <main style={{marginTop:'-10px'}}>
                                                            <div className="lg:px-6 bg-white print-container  pb-12 print-data">
                                                                  <main>
                                                        



                                                                        <section className="container  mx-auto mt-8">
                                                                              <div className="w-full mb-8 bar overflow-hidden">
                                                                                    <div className="w-full bar overflow-x-auto border">
                                                                                          <table className="w-full">
                                                                                                <thead>
                                                                                                      <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                                                            <th className="px-4 py-2">Photo</th>
                                                                                                            <th className="px-4 py-2">Name</th>

                                                                                                            <th className="px-4 py-2">Order</th>
                                                                                                            <th className="px-4 py-2 whitespace-nowrap">
                                                                                                                  Price
                                                                                                            </th>
                                                                                                            <th className="px-4 py-2"> Quantity</th>
                                                                                                      </tr>
                                                                                                </thead>

                                                                                                <tbody className="bg-white">
                                                                                                      {(() => {
                                                                                                            const productMap = {};
                                                                                                            let totalQty = 0; // Initialize total quantity
                                                                                                            let total_am=0;

                                                                                                            // Step 1: Loop through selectedItems to accumulate quantities
                                                                                                            selectedItems?.forEach(order => {
                                                                                                                  order?.productList?.forEach(itm => {
                                                                                                                    if (productMap[itm?.productId]) {
                                                                                                                      // If product already exists, increase the quantity
                                                                                                                      productMap[itm?.productId].quantity += itm?.quantity;
                                                                                                                
                                                                                                                      // Add the current orderId to the list if not already present
                                                                                                                      if (!productMap[itm?.productId].orderId.includes(order?.orderNumber ?? order?.order_id)) {
                                                                                                                        productMap[itm?.productId].orderId.push(order?.orderNumber ?? order?.order_id);
                                                                                                                      }
                                                                                                                    } else {
                                                                                                                      // Otherwise, add the product to the map, initialize orderId as an array
                                                                                                                      productMap[itm?.productId] = { 
                                                                                                                        ...itm, 
                                                                                                                        orderId: [order?.orderNumber ?? order?.order_id]  // Start with the current orderId in an array
                                                                                                                      };
                                                                                                                    }
                                                                                                                  });
                                                                                                                });
                                                                                                                
                                                                                                               
                                                                                                            // Step 2: Calculate total quantity while rendering unique products
                                                                                                            const rows = Object.values(productMap)?.map(itm => {
                                                                                                                  totalQty += itm?.quantity; // Add quantity to the total
                                                                                                                  const am =itm?.offerPrice || itm?.price || itm?.regular_price;
                                                                                                                  total_am += parseInt(am); // Add quantity to the total
                                                                                                                  return (
                                                                                                                        <tr className="border-t" key={itm?._id}>
                                                                                                                              <td className="p-4 w-[110px] border-b border-blue-gray-50">
                                                                                                                                    <img
                                                                                                                                          src={itm?.img}
                                                                                                                                          alt=""
                                                                                                                                          className="w-[80px] object-cover h-[60px] rounded border"
                                                                                                                                    />
                                                                                                                              </td>
                                                                                                                           

                                                                                                                              <td style={{maxWidth:'250px',wordWrap: 'anywhere'}} className="p-4    border-blue-gray-50">
                                                                                                                                  <p className="h-[45px] ptitlec">  {itm?.productName}</p>
                                                                                                                                    <b>SKU:{itm.variations.SKU}</b>
                                                                                                                              </td>
                                                                                                                              <td>
                                                                                                                                    {itm.orderId.map((order_id) => (
                                                                                                                                    <React.Fragment key={order_id}>
                                                                                                                                        <p>  {order_id}</p>
                                                                                                                                    </React.Fragment>
                                                                                                                                    ))}
                                                                                                                              </td>
                                                                                                                              <td className="p-4 border-b border-blue-gray-50">
                                                                                                                                    {itm?.offerPrice || itm?.price || itm?.regular_price}
                                                                                                                              </td>
                                                                                                                              <td className="p-4 border-b text-center border-blue-gray-50">
                                                                                                                                    {itm?.quantity}
                                                                                                                              </td>
                                                                                                                        </tr>
                                                                                                                  );
                                                                                                            });

                                                                                                            // Step 3: Render rows and total quantity
                                                                                                            return (
                                                                                                                  <>
                                                                                                                        {rows}
                                                                                                                        <tr className="border-t font-bold">
                                                                                                                              <td className="p-4 border-b border-blue-gray-50"></td>
                                                                                                                              <td className="p-4 border-b border-blue-gray-50"></td>
                                                                                                                              <td className="p-4 border-b border-blue-gray-50">Toal: {total_am}.TK</td>

                                                                                                                              <td className="p-4 border-b border-blue-gray-50 text-center">Total: {totalQty}</td>
                                                                                                                        </tr>
                                                                                                                  </>
                                                                                                            );
                                                                                                      })()}
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

                        {showPrintModal1 && <div>

                              <AllOrderInvoice
                                    data={selectedItems}
                                    setShowPrintModal1={setShowPrintModal1}
                                    showPrintModal1={showPrintModal1}
                              />


                        </div>}
                       
                        {showPrintModal2 && <div>

                        <AllOrderInvoice2
                              data={selectedItems}
                              setShowPrintModal2={setShowPrintModal2}
                              showPrintModal2={showPrintModal2}
                        />


                        </div>}

                        {/* <input
                              className="w-[260px] md:mt-0 mt-3 rounded border-gray-400 focus:outline-none p-2 border"
                              type="date"
                              onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        /> */}
                        
                  </div>

                  <div className=" ">
                        {!isDaraz && !woo && (
                              <OrderTable
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    setPassData={setPassData}
                                    ordersNav={ordersNav}
                                    value={value}
                                    setDetails={setDetails}
                                    setOpenModal={setOpenModal}
                                    selectedValue={selectedValue}
                                    searchValue={searchValue}
                                    setIsDaraz={setIsDaraz}
                                    setWoo={setWoo}
                              />
                        )}
                        {isDaraz && (
                              <div className="">
                                    <DarazOrderTable
                                          value={value}
                                          selected_item={selected_item}
                                          setSelected_item={setSelected_item}
                                          selected={selected}
                                          setSelected={setSelected}
                                          selectedValue={selectedValue}
                                          searchValue={searchValue}
                                          setSelectedValue={setSelectedValue}
                                          setSwithcOrder={setSwithcOrder}
                                          swithcOrder={swithcOrder}
                                    />
                              </div>
                        )}
                        {woo && (
                              <WooCommerceOrderTable
                                    value={value}
                                    set_woo_select_item={set_woo_select_item}
                                    woo_select_item={woo_select_item}
                                    setSelected={set_woo_select_item}
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
