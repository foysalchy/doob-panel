import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import OrderAllinfoModal from "../../../SellerItems/OrderManagment/ManageOrder/OrderAllinfoModal";
import WooCommerceTableRow from "../../../SellerItems/OrderManagment/WoocommerceOrder/WooCommerceTableRow";
import Pagination from "../../../../Common/Pagination";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert";
import Datepicker from "react-tailwindcss-datepicker";
import { woo_order_nav } from "../../../SellerItems/OrderManagment/ManageOrder/ManageOrderNavData";
import Woo_Order_stock from "../../../SellerItems/OrderManagment/ManageOrder/Woo_Order_stock";
import InvoicePage from "../../../SellerItems/OrderManagment/ManageOrder/Woo_order_Invoice";

function getTimeAgo(timestamp) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - new Date(timestamp).getTime();


      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (minutes < 60) {
            return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
      } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      } else {
            return `${days} day${days !== 1 ? "s" : ""} ago`;
      }
}

const formattedDate = (time) => {
      const date = new Date(time);

      // Extract individual components (year, month, day, etc.)
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


const WooOrder = () => {
      const itemsPerPage = 15; // Number of items to display per page
      const [currentPage, setCurrentPage] = useState(1);
      const [woo_select_item, set_woo_select_item] = useState([]);
      const [searchValue, setSearchValue] = useState("");
      const [selectedValue, setSelectedValue] = useState("All");
      const [showInvoiceSm, setShowInvoiceSm] = useState(false);
      const [selectedStatusModal, setSelectedStatusModal] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
      const [woo_select_item_view, setWoo_select_item_view] = useState(false);
      const [view_invoice, setView_invoice] = useState(false)
      const [value, setValue] = useState({
            startDate: null,
            endDate: null
      });

      const { data: tData = [], refetch, isLoading } = useQuery({
            queryKey: ["adminWooOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `http://localhost:5001/api/v1/admin/get-woo-admin-order`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const { data: woo_order = [], refetch: woo_order_refetch } = useQuery({
            queryKey: ["woo_order_status"],
            queryFn: async () => {
                  const res = await fetch(
                        `http://localhost:5001/api/v1/seller/woo-order-status?shop_id=${shopInfo?._id}&is_admin=${shopInfo ? false : true}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });



      console.log(woo_order);




      const filteredData = tData
            ?.filter((itm) => {

                  if (searchValue) {
                        const matchesSearch = Object.values(itm).some((value) =>
                              String(value).toLowerCase().includes(searchValue.toLowerCase())
                        );
                        if (!matchesSearch) return false;
                  }

                  if (selectedValue === "shipped") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "ready_to_ship"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order) => {
                              return Number(order.orderId) === Number(itm.id);
                        });
                        if (isInShippedOrders) return true;
                  }
                  if (selectedValue === "refund") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "refund"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order) => {
                              return Number(order.orderId) === Number(itm.id);
                        });
                        if (isInShippedOrders) return true;
                  }
                  if (selectedValue === "return") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "return"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order) => {
                              return Number(order.orderId) === Number(itm.id);
                        });
                        if (isInShippedOrders) return true;
                  }
                  if (selectedValue === "returned") {
                        const shippedOrders = woo_order.filter((order) => {
                              return order.order_status === "returned"; // Filter condition
                        });
                        const isInShippedOrders = shippedOrders.some((order) => {
                              return Number(order.orderId) === Number(itm.id);
                        });
                        if (isInShippedOrders) return true;
                  }

                  if (selectedValue !== "All") {
                        const matchesSelectedValue =
                              itm.status?.toLowerCase() === selectedValue.toLowerCase(); // Assuming "status" is the field
                        if (!matchesSelectedValue) return false;
                  }

                  if (value.startDate && value.endDate) {

                        const itemDate = new Date(itm.date_created).getTime(); // Assuming "date" is the field
                        const startDate = new Date(value.startDate).getTime();
                        const endDate = new Date(value.endDate).getTime();
                        console.log(itemDate < startDate || itemDate > endDate, 'value', itemDate);
                        if (itemDate < startDate || itemDate > endDate) return false;
                  }

                  return true; // Include item if it passes all filters
            }); // Pagination logic


      console.log(filteredData, 'filteredData');



      // Calculate the range of items to display based on pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const filteredStatusData = filteredData

      // Then, slice the filtered data and calculate total items
      const currentItems = filteredStatusData.slice(startIndex, endIndex);
      const totalItems = filteredStatusData.length;



      const all_select_item = () => {
            if (woo_select_item.length === currentItems.length) {
                  // If all items are already selected, deselect them
                  set_woo_select_item([]);
            } else {
                  // Otherwise, select all items
                  set_woo_select_item(currentItems);
            }
      };


      const handlePageChange = (page) => {
            setCurrentPage(page);
            // Add logic to fetch new data based on the page
      };


      let statusCounts = {};

      // Calculate counts for each status
      filteredData.forEach((product) => {
            if (product?.status) {
                  if (!statusCounts[product?.status]) {
                        statusCounts[product?.status] = 1;
                  } else {
                        statusCounts[product?.status]++;
                  }
            }
      });

      const handle_print = () => {
            console.log(selectProducts.length, 'hellow');
            if (selectProducts.length > 0) {
                  set_doob_invoice(true);
            }
            else {
                  showAlert("Please select product", "", "error");
            }
      };

      const toggleDropdown = () => {
            setIsOpen(!isOpen);
      };

      const getWooCount = (orders, status) => {
            return tData?.filter(order => {
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


      const get_woo_sleeted_order_invoice = () => {
            if (woo_select_item.length) {
                  setView_invoice(true)
            }
            else {
                  BrightAlert({ timeDuration: 3000, title: 'Please Select Order First ', icon: 'warning' });
            }
      }



      return (
            <div>
                  <h1 className="text-3xl">Woo Order</h1>
                  <div className="md:flex items-center gap-3 mt-3 w-full ">
                        <input
                              className="border p-2 rounded"
                              placeholder="search..."
                              onChange={(e) => setSearchValue(e.target.value)}
                              type="text"
                        />
                        <div className="relative inline-block text-left group">
                              <button
                                    onClick={toggleDropdown}
                                    className="px-4 bg-white py-[9px] border relative"
                                    id="dropdown-button"
                                    aria-haspopup="true"
                              >
                                    Print
                              </button>

                              {isOpen && (
                                    <div
                                          className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="dropdown-button"
                                          tabIndex="-1"
                                    >
                                          <div className="py-1" role="none">
                                                <button
                                                      onClick={() => setWoo_select_item_view(true)}
                                                      className="block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                      role="menuitem"
                                                      tabIndex="-1"
                                                      id="dropdown-item-1"
                                                >
                                                      Print Stock Checklist For Selected Items
                                                </button>

                                                <button
                                                      onClick={() => get_woo_sleeted_order_invoice()}
                                                      className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100"
                                                      role="menuitem"
                                                      tabIndex="-1"
                                                      id="dropdown-item-2"
                                                >
                                                      Print Invoice For Selected Items
                                                </button>


                                          </div>
                                    </div>
                              )}
                        </div>

                        {view_invoice && <InvoicePage view_invoice={view_invoice} setView_invoice={setView_invoice} wooSelectItem={woo_select_item} />}

                        {
                              woo_select_item_view && <Woo_Order_stock woo_select_item={woo_select_item} woo_select_item_view={woo_select_item_view} setWoo_select_item_view={setWoo_select_item_view} />
                        }


                        <div className="flex items-center gap-2">
                              <select
                                    className="border w-[50px] px-1 py-2 text-sm rounded"
                                    onChange={(e) => setPageSize(e.target.value)}
                              >
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={70}>70</option>
                                    <option value={100}>100</option>
                              </select>{" "}


                        </div>

                        <div className="w-[250px]">
                              <Datepicker
                                    value={value}
                                    onChange={newValue => setValue(newValue)}
                                    showShortcuts={true}
                              />
                        </div>

                  </div>

                  <nav className="flex flex-wrap md:gap-4 gap-2  my-6">
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
                                                `(${getWooCount(tData, itm.value)})`

                                          }
                                    </span>

                              </button>
                        )
                        )}
                  </nav>

                  {isLoading ? <LoaderData /> :
                        <div className="bar overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                              <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="bar overflow-hidden">
                                          <table className="min-w-full  bg-white border text-center text-sm font-light">
                                                <thead className="border-b  font-medium  ">
                                                      <tr>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  <input
                                                                        onClick={() => all_select_item()}
                                                                        checked={woo_select_item?.length === currentItems?.length && currentItems?.length > 0}
                                                                        type="checkbox"
                                                                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                                        id="hs-checkbox-group-1"
                                                                  />
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 font-[500]"
                                                            ></th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Document
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Order No.
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Order Date
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Pending Since
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Payment Method
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Courier Status
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Retail Price
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Status
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Actions
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="border-r px-2 py-4 text-sm font-[500]"
                                                            >
                                                                  Custom Status
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {currentItems?.map((data, index) => (
                                                            <WooCommerceTableRow
                                                                  set_woo_select_item={set_woo_select_item}
                                                                  woo_select_item={woo_select_item}
                                                                  data={data}
                                                                  currentItems={currentItems}
                                                                  index={index + startIndex}
                                                                  key={index}
                                                                  refetch={woo_order_refetch}
                                                            />
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>}
                  <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                  />
            </div>
      );
};

export default WooOrder;
