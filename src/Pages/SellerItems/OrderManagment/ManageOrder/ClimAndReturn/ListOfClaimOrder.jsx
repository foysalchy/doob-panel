import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
// import OrderAllinfoModal from "../OrderAllinfoModal";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { BiSearch } from "react-icons/bi";
import OrderAllinfoModal from "../OrderAllinfoModal";
import Pagination from "../../../../../Common/Pagination";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import Datepicker from "react-tailwindcss-datepicker";
import RejectModalForAll from "./RejectMoalForAll";



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


function getTimeAgo(timestamp) {
      console.log(timestamp, 'timestamp');

      let date;

      // Check if timestamp is a number (Unix timestamp)
      if (typeof timestamp === 'number') {
            // If it's already a Unix timestamp, create a new Date object from it
            date = new Date(timestamp);
      } else if (typeof timestamp === 'string') {
            // If it's a string, parse it into a Date object
            date = new Date(timestamp);
      } else {
            // If the input is neither, return 'Invalid timestamp'
            return 'Invalid timestamp';
      }

      const currentTime = new Date().getTime(); // Get current time in milliseconds
      const timeDifference = currentTime - date.getTime(); // Calculate the difference in milliseconds

      const minutes = Math.floor(timeDifference / (1000 * 60)); // Convert difference to minutes
      const hours = Math.floor(minutes / 60); // Convert minutes to hours
      const days = Math.floor(hours / 24); // Convert hours to days

      if (minutes < 60) {
            return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
      } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      } else {
            return `${days} day${days !== 1 ? "s" : ""} ago`;
      }
}


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








const ListOfClaimOrder = () => {

      const { shopInfo, setCheckUpData, user } = useContext(AuthContext);
      const [modalOn, setModalOn] = useState(false);
      const [search_query, set_search_query] = useState("");
      const [rejectNote, setRejectNote] = useState(false);
      const [open_modal, set_open_modal] = useState(null);
      const [showCalendar, setShowCalendar] = useState(false);
      const [dateRange, setDateRange] = useState([null, null]);
      const [daraz_ac, set_daraz_ac] = useState(null)
      const calendarRef = useRef(null);


      console.log(typeof daraz_ac, 'daraz_ac');


      console.log(dateRange, 'dateRange');

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const { data: tData = [], refetch } = useQuery({
            queryKey: ["sellerOrderForClaim"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();

                  // Sort the data by clam_time or timestamp
                  const sortedData = data.data.sort((a, b) => {
                        const timeA = a?.clam_time ?? a?.timestamp;
                        const timeB = b?.clam_time ?? b?.timestamp;
                        return new Date(timeA) - new Date(timeB); // Ascending order
                  });

                  return sortedData;
            },
      });


      const { data: daraz_clam_order = [], isLoading: loadingDaraz, refetch: refetchDaraz } = useQuery({
            queryKey: ["daraz_clam_order"],
            queryFn: async () => {
                  const res = await fetch(
                        `http://localhost:5001/api/v1/seller/daraz-clam-order?shop_id=${shopInfo._id}`
                  );
                  const data = await res.json();

                  return data.data
                        .filter(
                              (item) =>
                                    item.rejectStatus !== "claim_to_daraz" &&
                                    item.rejectStatus !== "return_to_courier"
                        )
                        .sort((a, b) => {
                              const timeA = a?.clam_time ?? a?.timestamp;
                              const timeB = b?.clam_time ?? b?.timestamp;
                              return new Date(timeA) - new Date(timeB); // Ascending order
                        });
            },
      });



      const {
            data: darazShop = [],
            isLoading: loadingShopData,
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
            isLoading: loadingPreviousAccount,
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

      const {
            data: shop = {},
            isLoading,
            reload,
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopInfo?.shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const all_data = (isLoading || loadingDaraz)
            ? []
            : [
                  ...tData.filter(item =>
                        ["claim", "return"].includes(item.status?.toLowerCase())
                  ),
                  ...daraz_clam_order,
            ];

      const safeSearchQuery = search_query?.toLowerCase() || "";

      const filterItems = (data, query, status = "All", dateRange = null, selectedDarazAc = null) => {
            return data.filter(item => {
                  // Query match
                  const matchesQuery = !query || Object.keys(item).some(key => {
                        const value = item[key];
                        if (typeof value === "string") {
                              return value.toLowerCase().includes(query);
                        }
                        if (typeof value === "number") {
                              return value.toString().includes(query);
                        }
                        return false;
                  });

                  // Status match
                  const matchesStatus =
                        status === "All" ||
                        (item.rejectStatus?.toLowerCase() === status.toLowerCase());

                  // Date range match
                  const matchesDateRange = (() => {
                        if (!dateRange?.startDate || !dateRange?.endDate) return true;
                        const itemDate = new Date(item?.clam_time ?? item.timestamp);
                        if (isNaN(itemDate)) return false;
                        const startDate = new Date(dateRange.startDate);
                        const endDate = new Date(dateRange.endDate);
                        return itemDate >= startDate && itemDate <= endDate;
                  })();

                  // Daraz account match
                  const matchesDarazAc = !selectedDarazAc || item.daraz_ac === selectedDarazAc;

                  // Return true if all conditions are met
                  return matchesQuery && matchesStatus && matchesDateRange && matchesDarazAc;
            });
      };



      // State Management
      const [itemsPerPage, setItemsPerPage] = useState(15);
      const [currentPage, setCurrentPage] = useState(1);
      const [selectedOption, setSelectedOption] = useState("All");
      const [filteredItems, setFilteredItems] = useState([]);
      const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


      useEffect(() => {
            const all_data = (isLoading || loadingDaraz)
                  ? []
                  : [
                        ...tData.filter(item =>
                              ["claim", "return"].includes(item.status?.toLowerCase())
                        ),
                        ...daraz_clam_order,
                  ];

            setFilteredItems(all_data)

      }, [tData, daraz_clam_order]);

      // Pagination Index
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentData = filteredItems.slice(startIndex, startIndex + itemsPerPage);

      // Handle Page Change
      const handlePageChange = (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
                  setCurrentPage(newPage);
            }
      };

      // Handle Filter Change
      const handleChange = (event) => {
            setSelectedOption(event.target.value);
      };


      useEffect(() => {
            const updatedFilteredItems = filterItems(
                  all_data,
                  safeSearchQuery,
                  selectedOption,
                  dateRange,
                  daraz_ac
            );
            setFilteredItems(updatedFilteredItems);
            setCurrentPage(1); // Reset to the first page after filtering
      }, [safeSearchQuery, selectedOption, dateRange, daraz_ac]);

      // Handle Outside Click for Calendar
      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                        setShowCalendar(false);
                  }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      // Logging Date Range
      console.log(
            dateRange?.startDate && new Date(dateRange.startDate).getDate(),
            dateRange?.endDate && new Date(dateRange.endDate).getDate(),
            "dateRange"
      );

      // Options for Status Filter
      const options = [
            "All",
            "Arrange to Claim",
            "Claimed",
            "Verifying",
            "Partial Refund",
            "Refund",
            "Damaged",
            "Missing parts",
            "Received",
            "Rejected",
      ];

      // Total Items
      const totalItems = filteredItems.length;

      const [selectedItems, setSelectedItems] = useState([]);
      const [selectAll, setSelectAll] = useState(false);

      const handleSelectAll = () => {
            const newSelectAll = !selectAll;
            setSelectAll(newSelectAll);

            if (newSelectAll) {
                  // If "Select All" is enabled, add all currentItems to selectedItems and orderList
                  setSelectedItems(currentData);


            } else {
                  // If "Select All" is disabled, clear selectedItems and orderList
                  setSelectedItems([]);

            }
      };

      const handleCheckboxChange = (event, item) => {
            const isChecked = event.target.checked;

            if (isChecked) {
                  // Add the item to selectedItems and orderList
                  setSelectedItems((prev) => [...prev, item]);

            } else {
                  // Remove the item from selectedItems and orderList
                  setSelectedItems((prev) =>
                        prev.filter(
                              (selectedItem) => selectedItem._id !== item._id || selectedItem.order_number !== item.order_number
                        )
                  );

            }
      };


      const [showAlert, setShowAlert] = useState(false);
      const [approveNote, setapproveNote] = useState("");
      const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
      const [isReject, setReject] = useState(false);




      return (
            <div>
                  <div className="flex flex-col bar overflow-hidden mt-4">

                        <div className="flex items-center justify-between">
                              <h2 className="text-lg font-semibold">Clam List</h2>
                        </div>

                        <div className="flex items-center justify-between whitespace-nowrap gap-2">
                              <div className="relative   my-2 mr-10">
                                    <input
                                          type="text"
                                          id="Search"
                                          value={search_query}
                                          onChange={(e) => set_search_query(e.target.value)}
                                          placeholder="Search for..."
                                          className="min-w-36  px-5 whitespace-nowrap  rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
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
                                                      className="h-4 w-4 text-black"
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
                              {(selectedItems?.length > 0 || selectAll) && (
                                    <div className="flex items-center gap-2 ">
                                          {/* <button
                                                      onClick={() => setShowAlert(true)}
                                                      className="bg-gray-800   mb-6 text-white px-3  py-2 rounded"
                                                >
                                                      Approve
                                                </button> */}
                                          <button
                                                onClick={() => setReject(selectedItems)}
                                                className="bg-gray-800  mb-6 text-white px-3 py-2 rounded"
                                          >
                                                Reject
                                          </button>
                                    </div>
                              )}

                              <div className="flex gap-2 items-end">

                                    <div className="flex flex-col items-end">
                                          <h1>Items per page </h1>
                                          <select
                                                className="border w-[50px] px-1 py-2 text-sm rounded"
                                                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                                          >
                                                <option value={15}>15</option>
                                                <option value={30}>30</option>
                                                <option value={70}>70</option>
                                                <option value={100}>100</option>
                                          </select>
                                    </div>

                                    <div className="flex gap-2 items-end">
                                          <div className="flex flex-col items-end">
                                                <h1>Filter by daraz account</h1>
                                                <select
                                                      className="border w-full px-1 py-2 text-sm rounded"
                                                      onChange={(e) => set_daraz_ac(parseInt(e.target.value))}
                                                >
                                                      <option value={null}>
                                                            Nothing
                                                      </option>
                                                      <option value={darazShop?.shop2?.data?.seller_id}>
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
                                                                        const isBlocked = shopSingle?.isAdmin === "block";

                                                                        return (
                                                                              <option
                                                                                    disabled={isBlocked}
                                                                                    style={{
                                                                                          color: isBlocked ? "#ffffff" : "#ffffff",
                                                                                          backgroundColor: isBlocked ? "#ff0000" : "",
                                                                                    }}
                                                                                    key={shopSingle._id}
                                                                                    value={shopSingle.shop2.data.seller_id}
                                                                              >
                                                                                    {shopSingle?.shop2?.data?.name ?? shopSingle?.result?.account}
                                                                              </option>
                                                                        );
                                                                  });
                                                      })()}

                                                </select>
                                          </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                          <h1> Filter by status </h1>
                                          <div>
                                                <select className="border  px-1 py-2 text-sm rounded" id="filter-dropdown" value={selectedOption} onChange={handleChange}>
                                                      <option value="" disabled>Select an option</option>
                                                      {options.map((option, index) => (
                                                            <option key={index} value={option}>
                                                                  {option}
                                                            </option>
                                                      ))}
                                                </select>


                                          </div>
                                    </div>
                                    <div className="w-[200px] h-full">
                                          <Datepicker

                                                value={dateRange}
                                                onChange={newValue => setDateRange(newValue)}
                                                showShortcuts={true}
                                          />
                                    </div>



                              </div>

                        </div>





                        {isReject && (
                              <RejectModalForAll
                                    ordersList={selectedItems}
                                    isReject={isReject}
                                    setReject={setReject}
                                    refetch={refetch}
                                    refetchDaraz={refetchDaraz}
                              />
                        )}


                        <div className="bar overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                              <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="bar overflow-hidden">
                                          <table className="w-full bg-white border text-center text-sm font-light">
                                                <thead className="border-b font-medium">
                                                      <tr>

                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  <input
                                                                        type="checkbox"
                                                                        className="cursor-pointer"
                                                                        name=""
                                                                        id=""
                                                                        onChange={handleSelectAll}
                                                                        checked={selectAll}
                                                                  />
                                                            </th>
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
                                                                  Approved Note
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Reject Note
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Retail Price
                                                            </th>
                                                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                  Status
                                                            </th>
                                                            {/* <th scope="col" className="border-r px-2 py-4 font-[500]">Actions</th> */}
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {currentData?.map((item, index) => (
                                                            <React.Fragment key={item._id}>
                                                                  <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                                        <td scope="col" className="border-r px-2 py-4 font-[500]">
                                                                              <input
                                                                                    className="cursor-pointer"
                                                                                    type="checkbox"
                                                                                    onChange={(e) => handleCheckboxChange(e, item)} // Trigger handler with the event and item
                                                                                    checked={selectedItems.some(
                                                                                          (selectedItem) =>
                                                                                                selectedItem._id === item._id && selectedItem.order_number === item.order_number
                                                                                    )} // Determine if the current item is selected
                                                                              />
                                                                        </td>

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
                                                                              {item?.clam_id ?? item?._id}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <button
                                                                                    onClick={() => set_open_modal(item)}
                                                                                    className="text-blue-600 font-[500]"
                                                                              >
                                                                                    Invoice
                                                                              </button>
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <Link
                                                                                    to="/seller/orders/manage-order/order-checkup"
                                                                                    onClick={() => setCheckUpData(item)}
                                                                                    className="text-blue-500 font-[400]"
                                                                              >
                                                                                    {item?.orderNumber ?? item?.order_id}
                                                                              </Link>
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {formattedDate(item.timestamp ?? item.updated_at)}
                                                                        </td>
                                                                        <td className="border-r w-[200px] px-6 py-4">
                                                                              {getTimeAgo(item?.clam_time ?? item.timestamp)}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {item?.method?.Getaway ? item?.method?.Getaway : item?.payment_method || "N/A"}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {item?.approveNote}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <button
                                                                                    onClick={() => setRejectNote(item)}
                                                                                    className="p-2 bg-gray-200"
                                                                              >
                                                                                    {" "}
                                                                                    Show Message
                                                                              </button>

                                                                        </td>
                                                                        {rejectNote && (
                                                                              <div className="fixed inset-0 z-50 flex items-center justify-center text-start bg-gray-700 bg-opacity-10">
                                                                                    <div className="bg-white p-4 rounded shadow-lg w-1/3">
                                                                                          <div className="flex justify-between">
                                                                                                <h1 className="text-xl"> Note</h1>
                                                                                                <button
                                                                                                      onClick={() => setRejectNote(false)}
                                                                                                      className="text-gray-500 text-xl hover:text-gray-700"
                                                                                                >
                                                                                                      &times;
                                                                                                </button>
                                                                                          </div>
                                                                                          <div>
                                                                                                <h1>Status: {rejectNote?.rejectStatus}</h1>
                                                                                                <h1>Message: {rejectNote?.rejectNote ?? rejectNote?.approveNote}</h1>
                                                                                                {rejectNote?.reject_message ? <p className="">Reject Message: {rejectNote?.reject_message}</p> : ''}

                                                                                                <div className="flex flex-wrap gap-1 mt-2">
                                                                                                      {
                                                                                                            rejectNote?.rejectImages?.map((image, index) => (
                                                                                                                  <a target="_blank" href={image}>
                                                                                                                        <img key={index} src={image} alt="image" className="w-20 object-cover h-10 border" />
                                                                                                                  </a>
                                                                                                            ))
                                                                                                      }
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        )}
                                                                        <td className="border-r px-6 py-4">
                                                                              {item.price ?? ratial_price(item?.productList)}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {item?.status ? item?.status : "Pending"}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4 flex items-center gap-2">
                                                                              <div>
                                                                                    <div
                                                                                          onClick={() => setModalOn(false)}
                                                                                          className={`fixed z-[100] flex items-center justify-center ${modalOn?._id === item?._id
                                                                                                ? "visible opacity-100"
                                                                                                : "invisible opacity-0"
                                                                                                } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                                                    >
                                                                                          <div
                                                                                                onClick={(e_) => e_.stopPropagation()}
                                                                                                className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${modalOn?._id === item?._id
                                                                                                      ? "scale-1 opacity-1 duration-300"
                                                                                                      : "scale-0 opacity-0 duration-150"
                                                                                                      }`}
                                                                                          >
                                                                                                <h1 className="mb-2 text-2xl font-semibold">
                                                                                                      Edit Order { }
                                                                                                </h1>
                                                                                                <form>
                                                                                                      <div className="flex items-start w-full mb-6 flex-col gap-1">
                                                                                                            <label htmlFor="name">Name</label>
                                                                                                            <input
                                                                                                                  type="text"
                                                                                                                  className="border border-white w-full bg-transparent text-white py-2"
                                                                                                                  defaultValue={item?.addresses?.fullName}
                                                                                                            />
                                                                                                      </div>

                                                                                                      <div className="flex justify-between">
                                                                                                            <button
                                                                                                                  type="submit"
                                                                                                                  onClick={() => setModalOn(false)}
                                                                                                                  className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                                                            >
                                                                                                                  Ok
                                                                                                            </button>
                                                                                                      </div>
                                                                                                </form>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                  </tr>

                                                                  <div
                                                                        onClick={() => set_open_modal(false)}
                                                                        className={`fixed z-[100]   flex items-center justify-center ${open_modal?._id === item?._id
                                                                              ? "opacity-1 visible"
                                                                              : "invisible opacity-0"
                                                                              } inset-0 bg- backdrop-blur-sm duration-100`}
                                                                  >
                                                                        <div
                                                                              onClick={(e_) => e_.stopPropagation()}
                                                                              className={`absolute w-full  p-6 text-center drop-shadow-2xl bg-gray-100 dark:text-white ${open_modal?._id === item?._id
                                                                                    ? "opacity-1 translate-y-0 duration-300"
                                                                                    : "translate-y-20 opacity-0 duration-150"
                                                                                    } bar overflow-y-auto h-screen`}
                                                                        >
                                                                              <div className="flex flex-col  space-y-4">
                                                                                    <div className="flex gap-2">
                                                                                          <button
                                                                                                onClick={handlePrint}
                                                                                                className="rounded-md bg-indigo-600 px-6 py-2 text-sm text-white"
                                                                                          >
                                                                                                Print
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() => set_open_modal(false)}
                                                                                                className="rounded-md border border-rose-600 px-6 py-2 text-sm text-rose-600 hover:bg-rose-600 hover:text-white"
                                                                                          >
                                                                                                Cancel
                                                                                          </button>
                                                                                    </div>

                                                                                    <div className="">
                                                                                          <div
                                                                                                ref={componentRef}
                                                                                                className="lg:px-6 m-auto w-[210mm] h-[297mm] bg-white print-container  pb-12 pt-16  print-data"
                                                                                          >
                                                                                                <header className="flex items-start justify-between">
                                                                                                      <img
                                                                                                            src={shop?.logo ?? ""}
                                                                                                            alt="logo"
                                                                                                            className="w-[200px]"
                                                                                                      />
                                                                                                      <div className="whitespace-wrap w-[300px]">
                                                                                                            <p className="text-gray-600 text-end">
                                                                                                                  {shop?.shopName}
                                                                                                            </p>
                                                                                                            <p className="text-gray-600 text-end">
                                                                                                                  {shop?.shopEmail}
                                                                                                            </p>
                                                                                                      </div>
                                                                                                </header>

                                                                                                <main>
                                                                                                      <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                                                                                            INVOICE
                                                                                                      </div>


                                                                                                      <div className=" items-start justify-between mt-4">
                                                                                                            <div>
                                                                                                                  <div className="flex items-center gap-2">
                                                                                                                        <h4 className="font-semibold text-gray-700 text-sm">
                                                                                                                              Name :
                                                                                                                        </h4>
                                                                                                                        <p className="text-gray-600 text-sm">
                                                                                                                              {open_modal?.addresses?.fullName}
                                                                                                                        </p>
                                                                                                                  </div>
                                                                                                                  <div className="flex items-center gap-2">
                                                                                                                        <h4 className="font-semibold text-gray-700 text-sm">
                                                                                                                              Number :
                                                                                                                        </h4>
                                                                                                                        <p className="text-gray-600 text-sm">
                                                                                                                              {open_modal?.addresses?.mobileNumber}
                                                                                                                        </p>
                                                                                                                  </div>
                                                                                                                  <div className="flex items-center gap-2">
                                                                                                                        <h4 className="font-semibold text-gray-700 text-sm">
                                                                                                                              address :
                                                                                                                        </h4>
                                                                                                                        <p className="text-gray-600 text-sm">
                                                                                                                              {open_modal?.addresses?.address},{" "}
                                                                                                                              {open_modal?.addresses?.city}
                                                                                                                        </p>
                                                                                                                  </div>
                                                                                                            </div>

                                                                                                            <div>
                                                                                                                  <li className="flex justify-start items-center gap-2">
                                                                                                                        <h4 className="font-semibold text-gray-700 text-sm">
                                                                                                                              Invoice No : {user?._id}
                                                                                                                        </h4>
                                                                                                                        <p className="text-gray-600 text-sm">
                                                                                                                              {open_modal?._id}
                                                                                                                        </p>
                                                                                                                  </li>
                                                                                                            </div>
                                                                                                      </div>



                                                                                                      <section className="container mx-auto mt-8">
                                                                                                            <div className="w-full mb-8 bar overflow-hidden">
                                                                                                                  <div className="w-full bar overflow-x-auto border">
                                                                                                                        <table className="w-full">
                                                                                                                              <thead>
                                                                                                                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                                                                                          <th className="px-4 py-2">
                                                                                                                                                Photo
                                                                                                                                          </th>
                                                                                                                                          <th className="px-4 py-2">
                                                                                                                                                Name
                                                                                                                                          </th>
                                                                                                                                          <th className="px-4 py-2 whitespace-nowrap">
                                                                                                                                                Stock Quantity
                                                                                                                                          </th>
                                                                                                                                          <th className="px-4 py-2">
                                                                                                                                                Price
                                                                                                                                          </th>
                                                                                                                                    </tr>
                                                                                                                              </thead>
                                                                                                                              <tbody className="bg-white text-black">
                                                                                                                                    {open_modal?.productList?.map(
                                                                                                                                          (itm) => (
                                                                                                                                                <tr
                                                                                                                                                      className="border-t"
                                                                                                                                                      key={itm?._id}
                                                                                                                                                >
                                                                                                                                                      <td className="p-4 w-[110px] border-b border-blue-gray-50">
                                                                                                                                                            <img
                                                                                                                                                                  src={itm?.img}
                                                                                                                                                                  alt=""
                                                                                                                                                                  className="w-[100px] object-cover h-[80px] rounded border"
                                                                                                                                                            />
                                                                                                                                                      </td>
                                                                                                                                                      <td className="p-4 text-start border-b w-[300px] border-blue-gray-50">
                                                                                                                                                            {itm?.productName}
                                                                                                                                                      </td>
                                                                                                                                                      <td className="p-4 text-start border-b border-blue-gray-50">
                                                                                                                                                            {itm?.price}
                                                                                                                                                      </td>
                                                                                                                                                      <td className="p-4 text-start border-b border-blue-gray-50">
                                                                                                                                                            {itm?.quantity}
                                                                                                                                                      </td>
                                                                                                                                                </tr>
                                                                                                                                          )
                                                                                                                                    )}
                                                                                                                              </tbody>
                                                                                                                        </table>
                                                                                                                  </div>
                                                                                                            </div>

                                                                                                      </section>
                                                                                                </main>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  </div>


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

                              <Pagination
                                    totalItems={totalItems}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default ListOfClaimOrder;


// const ListOfClaimOrder = () => {
//       const [modalOn, setModalOn] = useState(false);
//       const [openModal, setOpenModal] = useState(false);



//       console.log(all_data, 'all_data');




//       const [itemsPerPage, setItemsPerPage] = useState(15);
//       const [currentPage, setCurrentPage] = useState(1);
//       let totalPages = Math.ceil(all_data?.length / itemsPerPage);

//       const startIndex = (currentPage - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;

//       const currentItems = all_data?.slice(startIndex, endIndex).reverse();




//       useEffect(() => {
//             totalPages = Math.ceil(all_data?.length / itemsPerPage);
//       }, [itemsPerPage, all_data]);

//       const formattedDate = (time) => {
//             const date = new Date(time);

//             // Extract individual components (year, month, day, etc.)
//             const year = date.getFullYear();
//             const month = date.getMonth() + 1; // Months are zero-based
//             const day = date.getDate();
//             const hours = date.getHours();
//             const minutes = date.getMinutes();
//             const seconds = date.getSeconds();

//             // Format the components as needed
//             const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
//                   .toString()
//                   .padStart(2, "0")}`;
//             const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//                   .toString()
//                   .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//             const finalDate = formattedDate + " " + formattedTime;
//             return finalDate;
//       };

//       const productStatusUpdate = (status, orderId) => {
//             fetch(
//                   `https://doob.dev/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`,
//                   {
//                         method: "PUT",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ status, orderId }),
//                   }
//             )
//                   .then((res) => res.json())
//                   .then((data) => {
//                         refetch();
//                   });
//       };

//       const {
//             data: shop = {},
//             isLoading,
//             reload,
//       } = useQuery({
//             queryKey: ["shop"],
//             queryFn: async () => {
//                   const res = await fetch(
//                         `https://doob.dev/api/v1/shop/${shopInfo?.shopId}`
//                   );
//                   const data = await res.json();
//                   return data;
//             },
//       });

//       const { data: ships = [] } = useQuery({
//             queryKey: ["getaway"],
//             queryFn: async () => {
//                   const res = await fetch(
//                         `https://doob.dev/api/v1/seller/shipping-interrogation/${shopInfo._id}`
//                   );
//                   const data = await res.json();
//                   return data;
//             },
//       });

//       const ratial_price = (productList) => {
//             let ratial_price = 0;
//             for (let i = 0; i < productList?.length; i++) {
//                   const price =
//                         parseFloat(productList[i]?.price) *
//                         parseFloat(productList[i]?.quantity);
//                   ratial_price += price;
//             }
//             return ratial_price;
//       };
//       function getTimeAgo(timestamp) {
//             console.log(timestamp, 'timestamp');

//             let date;

//             // Check if timestamp is a number (Unix timestamp)
//             if (typeof timestamp === 'number') {
//                   // If it's already a Unix timestamp, create a new Date object from it
//                   date = new Date(timestamp);
//             } else if (typeof timestamp === 'string') {
//                   // If it's a string, parse it into a Date object
//                   date = new Date(timestamp);
//             } else {
//                   // If the input is neither, return 'Invalid timestamp'
//                   return 'Invalid timestamp';
//             }

//             const currentTime = new Date().getTime(); // Get current time in milliseconds
//             const timeDifference = currentTime - date.getTime(); // Calculate the difference in milliseconds

//             const minutes = Math.floor(timeDifference / (1000 * 60)); // Convert difference to minutes
//             const hours = Math.floor(minutes / 60); // Convert minutes to hours
//             const days = Math.floor(hours / 24); // Convert hours to days

//             if (minutes < 60) {
//                   return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
//             } else if (hours < 24) {
//                   return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
//             } else {
//                   return `${days} day${days !== 1 ? "s" : ""} ago`;
//             }
//       }

//       const [readyToShip, setReadyToShip] = useState(false);

//       const [showImage, setShowImage] = useState(false);
//       const [selectedImage, setSelectedImage] = useState("");

//       const handleImageClick = (image) => {
//             setSelectedImage(image);
//             setShowImage(true);
//       };

//       const handleProductStatusUpdate = (orders) => {
//             fetch(`https://doob.dev/api/v1/seller/order-quantity-update`, {
//                   method: "PUT",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify(orders),
//             })
//                   .then((res) => res.json())
//                   .then((data) => {
//                         console.log(data);
//                         if (data.success) {
//                               productStatusUpdate("claim", orders._id);
//                         } else {
//                               alert("Failed to Update");
//                         }
//                   });
//       };

//       const [showAlert, setShowAlert] = useState(false);
//       const [note, setNote] = useState("");

//       const [isChecked, setIsChecked] = useState(false);
//       const [refundCheck, setRefundCheck] = useState(false);

//       const viewDetails = (order) => {
//             console.log(order);

//             fetch(
//                   `https://doob.dev/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${order._id}`
//             )
//                   .then((res) => res.json())
//                   .then((data) => {
//                         console.log(data);
//                         const refund = { refund: data.data, order };

//                         console.log(refund);
//                         setDetails(refund);
//                   });
//       };
//       const [refundData, setRefundData] = useState(true);
//       const checkBox = (orderId) => {
//             fetch(
//                   `https://doob.dev/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${orderId}`
//             )
//                   .then((res) => res.json())
//                   .then((data) => {
//                         console.log(data);
//                         setRefundData(data);
//                   });
//       };

//       const updateOrderInfo = (note, file, id) => {
//             const noteData = { note, file, orderId: id };
//             fetch("https://doob.dev/api/v1/seller/refound-order-info", {
//                   method: "PUT",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify(noteData),
//             })
//                   .then((res) => res.json())
//                   .then((data) => alert(` Successfully Done!`));
//       };
//       const [file, setFile] = useState();
//       const cancelNoteSubmit = () => {
//             console.log({
//                   isChecked,
//                   refundCheck,
//                   note,
//                   file,
//                   showAlert,
//             });

//             if (isChecked && !refundCheck) {
//                   handleProductStatusUpdate(showAlert);
//                   updateOrderInfo(note, file, showAlert._id);
//                   setShowAlert(false);
//             } else if (isChecked && refundCheck) {
//                   handleProductStatusUpdate(showAlert);
//                   updateOrderInfo(note, file, showAlert._id);
//                   setShowAlert(false);
//             } else {
//                   updateOrderInfo(note, file, showAlert._id);
//                   setShowAlert(false);
//             }

//       };

//       const handleFileChange = async (event) => {
//             const file = event.target.files[0];
//             const imageFormData = new FormData();
//             imageFormData.append("image", file);
//             const imageUrl = await uploadImage(imageFormData);
//             setFile(imageUrl);
//       };

//       async function uploadImage(formData) {
//             const url = "https://doob.dev/api/v1/image/upload-image";
//             const response = await fetch(url, {
//                   method: "POST",
//                   body: formData,
//             });
//             const imageData = await response.json();
//             return imageData.imageUrl;
//       }

//       const updateCourier_status = (id, courier_id) => {
//             fetch(
//                   `https://doob.dev/api/v1/admin/courier_status?orderId=${id}&id=${courier_id}`,
//                   {
//                         method: "PUT",
//                         headers: { "Content-Type": "application/json" },
//                   }
//             )
//                   .then((res) => res.json())
//                   .then((data) => {
//                         console.log(data?.status);
//                         if (data?.status) {
//                               alert("Successfully Updated");
//                               refetch();
//                         } else {
//                               alert("Failed to Update");
//                         }
//                   });
//       };
//       const [cartProducts, setCartProducts] = useState([]);
//       const [searchQuery, setSearchQuery] = useState("");

//       const handleSearch = (event) => {
//             setSearchQuery(event.target.value);
//       };

//       const [selectAll, setSelectAll] = useState(false);

//       const [ordersList, setOrderList] = useState([]);

//       // Function to handle "Select All" action
//       const handleSelectAll = () => {
//             setSelectAll(!selectAll);
//             if (!selectAll) {
//                   // If selectAll is false, set ordersList to currentItems
//                   setOrderList(currentItems);
//             } else {
//                   // If selectAll is true, set ordersList to an empty array
//                   setOrderList([]);
//             }
//       };


//       const options = ["All", "Arrange to Claim", "Claimed", "Verifying", "Partial Refund", "Refund", "Damaged", "Missing parts", "Received", "Rejected"]

//       const [selectedOption, setSelectedOption] = useState('');
//       const [filteredItems, setFilteredItems] = useState(currentItems);
//       console.log(filteredItems, 'filteredItems')
//       // Handle change event
//       const handleChange = (event) => {
//             const selectedValue = event.target.value;
//             setSelectedOption(selectedValue);

//             // Filter currentItems based on selected status
//             const newFilteredItems = selectedValue !== "All"
//                   ? currentItems.filter(item => item.rejectStatus === selectedValue)
//                   : currentItems; // If "all" is selected, keep all items
//             // Assign the filtered items back to state
//             setFilteredItems(newFilteredItems);
//       };

//       const [rejectNote, setRejectNote] = useState(false);


//       const handlePageChange = (newPage) => {
//             if (newPage < 1 || newPage > totalPages) return;
//             if (scrollRef.current) {
//                   scrollRef.current.scrollTo({
//                         top: 0,
//                         behavior: 'smooth',
//                   });
//             } else {
//                   window.scrollTo({
//                         top: 0,
//                         behavior: 'smooth',
//                   });
//             }
//             setCurrentPage(newPage);

//       };

//       return (
//             <div>
//                   <div className="flex flex-col bar overflow-hidden mt-4">

//                         <div className="flex items-center justify-between">
//                               <h2 className="text-lg font-semibold">Clam List</h2>

//                               <div className="flex items-center whitespace-nowrap gap-2">
//                                     <div>
//                                           <select id="filter-dropdown" value={selectedOption} onChange={handleChange}>
//                                                 <option value="" disabled>Select an option</option>
//                                                 {options.map((option, index) => (
//                                                       <option key={index} value={option}>
//                                                             {option}
//                                                       </option>
//                                                 ))}
//                                           </select>


//                                     </div>
//                                     <div className="relative   my-2 mr-10">
//                                           <input
//                                                 type="text"
//                                                 id="Search"
//                                                 value={searchQuery}
//                                                 onChange={handleSearch}
//                                                 placeholder="Search for..."
//                                                 className="min-w-36  px-5 whitespace-nowrap  rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
//                                           />

//                                           <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
//                                                 <button type="button" className="text-gray-600 hover:text-gray-700">
//                                                       <span className="sr-only">Search</span>

//                                                       <svg
//                                                             xmlns="http://www.w3.org/2000/svg"
//                                                             fill="none"
//                                                             viewBox="0 0 24 24"
//                                                             strokeWidth="1.5"
//                                                             stroke="currentColor"
//                                                             className="h-4 w-4 text-black"
//                                                       >
//                                                             <path
//                                                                   strokeLinecap="round"
//                                                                   strokeLinejoin="round"
//                                                                   d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//                                                             />
//                                                       </svg>
//                                                 </button>
//                                           </span>
//                                     </div>
//                                     <span className="text-sm">Entire per page</span>
//                                     <select
//                                           className="border w-[50px] px-1 py-2 text-sm rounded"
//                                           onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
//                                     >
//                                           <option value={15}>15</option>
//                                           <option value={30}>30</option>
//                                           <option value={70}>70</option>
//                                           <option value={100}>100</option>
//                                     </select>
//                               </div>
//                         </div>
//                         <div className="bar overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
//                               <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
//                                     <div className="bar overflow-hidden">
//                                           <table className="w-full bg-white border text-center text-sm font-light">
//                                                 <thead className="border-b font-medium">
//                                                       <tr>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   #
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Details
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Document
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Order No.
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Order Date
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Pending Since
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Payment Method
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Approved Note
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Reject Note
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Retail Price
//                                                             </th>
//                                                             <th scope="col" className="border-r px-2 py-4 font-[500]">
//                                                                   Status
//                                                             </th>
//                                                             {/* <th scope="col" className="border-r px-2 py-4 font-[500]">Actions</th> */}
//                                                       </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                       {filteredItems
//                                                             ?.filter((item) =>
//                                                                   Object.keys(item)?.some(key =>
//                                                                         typeof item[key] === 'string' &&
//                                                                         item[key]?.toLowerCase().includes(searchQuery.toLowerCase())
//                                                                   )
//                                                             )
//                                                             ?.map((item, index) => (
//                                                                   <React.Fragment key={item._id}>
//                                                                         <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>

//                                                                               <td className="border-r px-6 py-4 font-medium">
//                                                                                     {index + 1}
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     {!modalOn ? (
//                                                                                           <button
//                                                                                                 onClick={() => setModalOn(item._id)}
//                                                                                                 className="px-4 py-2"
//                                                                                           >
//                                                                                                 Details
//                                                                                           </button>
//                                                                                     ) : (
//                                                                                           <button
//                                                                                                 onClick={() => setModalOn(false)}
//                                                                                                 className="px-4 py-2"
//                                                                                           >
//                                                                                                 Close
//                                                                                           </button>
//                                                                                     )}
//                                                                                     {item?.clam_id ?? item?._id}
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     <button
//                                                                                           onClick={() => setOpenModal(item)}
//                                                                                           className="text-blue-600 font-[500]"
//                                                                                     >
//                                                                                           Invoice
//                                                                                     </button>
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     <Link
//                                                                                           to="/seller/orders/manage-order/order-checkup"
//                                                                                           onClick={() => setCheckUpData(item)}
//                                                                                           className="text-blue-500 font-[400]"
//                                                                                     >
//                                                                                           {item?.orderNumber ?? item?.order_id}
//                                                                                     </Link>
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     {formattedDate(item?.timestamp ?? item.created_at)}
//                                                                               </td>
//                                                                               <td className="border-r w-[200px] px-6 py-4">
//                                                                                     {getTimeAgo(item?.timestamp ?? item.created_at)}
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     {item?.method?.Getaway ? item?.method?.Getaway : item?.payment_method || "N/A"}
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     {item?.approveNote}
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     <button
//                                                                                           onClick={() => setRejectNote(item)}
//                                                                                           className="p-2 bg-gray-200"
//                                                                                     >
//                                                                                           {" "}
//                                                                                           Show Message
//                                                                                     </button>

//                                                                               </td>
//                                                                               {rejectNote && (
//                                                                                     <div className="fixed inset-0 z-50 flex items-center justify-center text-start bg-[#00000030] bg-opacity-50">
//                                                                                           <div className="bg-white p-4 rounded shadow-lg w-1/3">
//                                                                                                 <div className="flex justify-between">
//                                                                                                       <h1 className="text-xl"> Note</h1>
//                                                                                                       <button
//                                                                                                             onClick={() => setRejectNote(false)}
//                                                                                                             className="text-gray-500 text-xl hover:text-gray-700"
//                                                                                                       >
//                                                                                                             &times;
//                                                                                                       </button>
//                                                                                                 </div>
//                                                                                                 <div>
//                                                                                                       <h1>Status: {rejectNote?.rejectStatus}</h1>
//                                                                                                       <h1>Message: {rejectNote?.rejectNote ?? rejectNote?.approveNote}</h1>
//                                                                                                       {rejectNote?.reject_message ? <p className="">Reject Message: {rejectNote?.reject_message}</p> : ''}

//                                                                                                       <div className="flex flex-wrap gap-1 mt-2">
//                                                                                                             {
//                                                                                                                   rejectNote?.rejectImages?.map((image, index) => (
//                                                                                                                         <a target="_blank" href={image}>
//                                                                                                                               <img key={index} src={image} alt="image" className="w-20 object-cover h-10 border" />
//                                                                                                                         </a>
//                                                                                                                   ))
//                                                                                                             }
//                                                                                                       </div>
//                                                                                                 </div>
//                                                                                           </div>
//                                                                                     </div>
//                                                                               )}
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     {ratial_price(item?.productList)}
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4">
//                                                                                     {item?.status ? item?.status : "Pending"}
//                                                                               </td>
//                                                                               <td className="border-r px-6 py-4 flex items-center gap-2">
//                                                                                     <div>
//                                                                                           <div
//                                                                                                 onClick={() => setModalOn(false)}
//                                                                                                 className={`fixed z-[100] flex items-center justify-center ${modalOn?._id === item?._id
//                                                                                                       ? "visible opacity-100"
//                                                                                                       : "invisible opacity-0"
//                                                                                                       } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
//                                                                                           >
//                                                                                                 <div
//                                                                                                       onClick={(e_) => e_.stopPropagation()}
//                                                                                                       className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${modalOn?._id === item?._id
//                                                                                                             ? "scale-1 opacity-1 duration-300"
//                                                                                                             : "scale-0 opacity-0 duration-150"
//                                                                                                             }`}
//                                                                                                 >
//                                                                                                       <h1 className="mb-2 text-2xl font-semibold">
//                                                                                                             Edit Order { }
//                                                                                                       </h1>
//                                                                                                       <form>
//                                                                                                             <div className="flex items-start w-full mb-6 flex-col gap-1">
//                                                                                                                   <label htmlFor="name">Name</label>
//                                                                                                                   <input
//                                                                                                                         type="text"
//                                                                                                                         className="border border-white w-full bg-transparent text-white py-2"
//                                                                                                                         defaultValue={item?.addresses?.fullName}
//                                                                                                                   />
//                                                                                                             </div>

//                                                                                                             <div className="flex justify-between">
//                                                                                                                   <button
//                                                                                                                         type="submit"
//                                                                                                                         onClick={() => setModalOn(false)}
//                                                                                                                         className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
//                                                                                                                   >
//                                                                                                                         Ok
//                                                                                                                   </button>
//                                                                                                             </div>
//                                                                                                       </form>
//                                                                                                 </div>
//                                                                                           </div>
//                                                                                     </div>
//                                                                               </td>
//                                                                         </tr>

//                                                                         <div
//                                                                               onClick={() => setOpenModal(false)}
//                                                                               className={`fixed z-[100]   flex items-center justify-center ${openModal?._id === item?._id
//                                                                                     ? "opacity-1 visible"
//                                                                                     : "invisible opacity-0"
//                                                                                     } inset-0 bg- backdrop-blur-sm duration-100`}
//                                                                         >
//                                                                               <div
//                                                                                     onClick={(e_) => e_.stopPropagation()}
//                                                                                     className={`absolute w-full  p-6 text-center drop-shadow-2xl bg-gray-100 dark:text-white ${openModal?._id === item?._id
//                                                                                           ? "opacity-1 translate-y-0 duration-300"
//                                                                                           : "translate-y-20 opacity-0 duration-150"
//                                                                                           } bar overflow-y-auto h-screen`}
//                                                                               >
//                                                                                     <div className="flex flex-col  space-y-4">
//                                                                                           <div className="flex gap-2">
//                                                                                                 <button
//                                                                                                       onClick={handlePrint}
//                                                                                                       className="rounded-md bg-indigo-600 px-6 py-2 text-sm text-white"
//                                                                                                 >
//                                                                                                       Print
//                                                                                                 </button>
//                                                                                                 <button
//                                                                                                       onClick={() => setOpenModal(false)}
//                                                                                                       className="rounded-md border border-rose-600 px-6 py-2 text-sm text-rose-600 hover:bg-rose-600 hover:text-white"
//                                                                                                 >
//                                                                                                       Cancel
//                                                                                                 </button>
//                                                                                           </div>

//                                                                                           <div className="">
//                                                                                                 <div
//                                                                                                       ref={componentRef}
//                                                                                                       className="lg:px-6 m-auto w-[210mm] h-[297mm] bg-white print-container  pb-12 pt-16  print-data"
//                                                                                                 >
//                                                                                                       <header className="flex items-start justify-between">
//                                                                                                             <img
//                                                                                                                   src={shop?.logo ?? ""}
//                                                                                                                   alt="logo"
//                                                                                                                   className="w-[200px]"
//                                                                                                             />
//                                                                                                             <div className="whitespace-wrap w-[300px]">
//                                                                                                                   <p className="text-gray-600 text-end">
//                                                                                                                         {shop?.shopName}
//                                                                                                                   </p>
//                                                                                                                   <p className="text-gray-600 text-end">
//                                                                                                                         {shop?.shopEmail}
//                                                                                                                   </p>
//                                                                                                             </div>
//                                                                                                       </header>

//                                                                                                       <main>
//                                                                                                             <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
//                                                                                                                   INVOICE
//                                                                                                             </div>

//                                                                                                             {/*.*/}
//                                                                                                             {/*.... Address ...*/}
//                                                                                                             {/*.*/}
//                                                                                                             <div className=" items-start justify-between mt-4">
//                                                                                                                   <div>
//                                                                                                                         <div className="flex items-center gap-2">
//                                                                                                                               <h4 className="font-semibold text-gray-700 text-sm">
//                                                                                                                                     Name :
//                                                                                                                               </h4>
//                                                                                                                               <p className="text-gray-600 text-sm">
//                                                                                                                                     {openModal?.addresses?.fullName}
//                                                                                                                               </p>
//                                                                                                                         </div>
//                                                                                                                         <div className="flex items-center gap-2">
//                                                                                                                               <h4 className="font-semibold text-gray-700 text-sm">
//                                                                                                                                     Number :
//                                                                                                                               </h4>
//                                                                                                                               <p className="text-gray-600 text-sm">
//                                                                                                                                     {openModal?.addresses?.mobileNumber}
//                                                                                                                               </p>
//                                                                                                                         </div>
//                                                                                                                         <div className="flex items-center gap-2">
//                                                                                                                               <h4 className="font-semibold text-gray-700 text-sm">
//                                                                                                                                     address :
//                                                                                                                               </h4>
//                                                                                                                               <p className="text-gray-600 text-sm">
//                                                                                                                                     {openModal?.addresses?.address},{" "}
//                                                                                                                                     {openModal?.addresses?.city}
//                                                                                                                               </p>
//                                                                                                                         </div>
//                                                                                                                   </div>

//                                                                                                                   <div>
//                                                                                                                         <li className="flex justify-start items-center gap-2">
//                                                                                                                               <h4 className="font-semibold text-gray-700 text-sm">
//                                                                                                                                     Invoice No : {user?._id}
//                                                                                                                               </h4>
//                                                                                                                               <p className="text-gray-600 text-sm">
//                                                                                                                                     {openModal?._id}
//                                                                                                                               </p>
//                                                                                                                         </li>
//                                                                                                                   </div>
//                                                                                                             </div>

//                                                                                                             {/*.*/}
//                                                                                                             {/*.... Product ...*/}
//                                                                                                             {/*.*/}

//                                                                                                             <section className="container mx-auto mt-8">
//                                                                                                                   <div className="w-full mb-8 bar overflow-hidden">
//                                                                                                                         <div className="w-full bar overflow-x-auto border">
//                                                                                                                               <table className="w-full">
//                                                                                                                                     <thead>
//                                                                                                                                           <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
//                                                                                                                                                 <th className="px-4 py-2">
//                                                                                                                                                       Photo
//                                                                                                                                                 </th>
//                                                                                                                                                 <th className="px-4 py-2">
//                                                                                                                                                       Name
//                                                                                                                                                 </th>
//                                                                                                                                                 <th className="px-4 py-2 whitespace-nowrap">
//                                                                                                                                                       Stock Quantity
//                                                                                                                                                 </th>
//                                                                                                                                                 <th className="px-4 py-2">
//                                                                                                                                                       Price
//                                                                                                                                                 </th>
//                                                                                                                                           </tr>
//                                                                                                                                     </thead>
//                                                                                                                                     <tbody className="bg-white text-black">
//                                                                                                                                           {openModal?.productList?.map(
//                                                                                                                                                 (itm) => (
//                                                                                                                                                       <tr
//                                                                                                                                                             className="border-t"
//                                                                                                                                                             key={itm?._id}
//                                                                                                                                                       >
//                                                                                                                                                             <td className="p-4 w-[110px] border-b border-blue-gray-50">
//                                                                                                                                                                   <img
//                                                                                                                                                                         src={itm?.img}
//                                                                                                                                                                         alt=""
//                                                                                                                                                                         className="w-[100px] object-cover h-[80px] rounded border"
//                                                                                                                                                                   />
//                                                                                                                                                             </td>
//                                                                                                                                                             <td className="p-4 text-start border-b w-[300px] border-blue-gray-50">
//                                                                                                                                                                   {itm?.productName}
//                                                                                                                                                             </td>
//                                                                                                                                                             <td className="p-4 text-start border-b border-blue-gray-50">
//                                                                                                                                                                   {itm?.price}
//                                                                                                                                                             </td>
//                                                                                                                                                             <td className="p-4 text-start border-b border-blue-gray-50">
//                                                                                                                                                                   {itm?.quantity}
//                                                                                                                                                             </td>
//                                                                                                                                                       </tr>
//                                                                                                                                                 )
//                                                                                                                                           )}
//                                                                                                                                     </tbody>
//                                                                                                                               </table>
//                                                                                                                         </div>
//                                                                                                                   </div>

//                                                                                                             </section>
//                                                                                                       </main>
//                                                                                                 </div>
//                                                                                           </div>
//                                                                                     </div>
//                                                                               </div>
//                                                                         </div>


//                                                                         {item._id === modalOn && (
//                                                                               <tr>
//                                                                                     <td colSpan="10">
//                                                                                           <OrderAllinfoModal
//                                                                                                 status={item?.status ? item?.status : "Pending"}
//                                                                                                 setModalOn={setModalOn}
//                                                                                                 modalOn={modalOn}
//                                                                                                 productList={item?.productList}
//                                                                                           />
//                                                                                     </td>
//                                                                               </tr>
//                                                                         )}
//                                                                   </React.Fragment>
//                                                             ))}
//                                                 </tbody>
//                                           </table>
//                                     </div>
//                                     <br />
//                                     <PaginationComponent
//                                           cartProducts={all_data}
//                                           filter_category={filteredItems
//                                                 ?.filter((item) =>
//                                                       Object.keys(item)?.some(key =>
//                                                             typeof item[key] === 'string' &&
//                                                             item[key]?.toLowerCase().includes(searchQuery.toLowerCase())
//                                                       )
//                                                 )}
//                                           handlePage={handlePageChange}
//                                           currentPage={currentPage}
//                                     />
//                               </div>
//                         </div>
//                   </div>
//             </div>
//       );
// };

// export default ListOfClaimOrder;


// const PaginationComponent = ({ cartProducts, filter_category, handlePage, currentPage }) => {

//       const itemsPerPage = 15;
//       const totalPages = Math.ceil(filter_category.length / itemsPerPage);

//       const startIndex = (currentPage - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;

//       const currentItems = cartProducts?.slice(startIndex, endIndex);

//       const handlePageChange = (newPage) => {
//             if (newPage >= 1 && newPage <= totalPages) {
//                   handlePage(newPage);
//             }
//       };

//       // Helper function to generate "windowed" page range with ellipses
//       const generatePageRange = () => {
//             const range = [];
//             const pageWindow = 2; // Number of pages before and after the current page

//             if (totalPages <= 7) {
//                   // Show all pages if total pages are 7 or less
//                   for (let i = 1; i <= totalPages; i++) range.push(i);
//             } else {
//                   range.push(1); // Always show first page

//                   if (currentPage > pageWindow + 2) {
//                         range.push("..."); // Add ellipsis if current page is too far from the beginning
//                   }

//                   for (let i = Math.max(2, currentPage - pageWindow); i <= Math.min(totalPages - 1, currentPage + pageWindow); i++) {
//                         range.push(i); // Show pages around the current page
//                   }

//                   if (currentPage < totalPages - pageWindow - 1) {
//                         range.push("..."); // Add ellipsis if current page is too far from the end
//                   }

//                   range.push(totalPages); // Always show last page
//             }

//             return range;
//       };

//       const pageRange = generatePageRange();

//       return (
//             <div className="py-6 bg-gray-50">
//                   <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//                         <div className="flex flex-col items-center lg:flex-row lg:justify-between">
//                               <p className="text-sm font-medium text-gray-500">
//                                     Showing {startIndex + 1} to {Math.min(endIndex, filter_category.length)} of {filter_category.length} results
//                               </p>
//                               <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
//                                     {/* Previous Button */}
//                                     <button
//                                           onClick={() => handlePageChange(currentPage - 1)}
//                                           disabled={currentPage === 1}
//                                           className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
//                                           aria-label="Previous"
//                                     >
//                                           <span className="sr-only">Previous</span>
//                                           <svg
//                                                 className="flex-shrink-0 w-4 h-4"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 24 24"
//                                                 stroke="currentColor"
//                                           >
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                           </svg>
//                                     </button>

//                                     {/* Page Numbers */}
//                                     {pageRange.map((page, index) => (
//                                           <button
//                                                 key={index}
//                                                 onClick={() => typeof page === 'number' && handlePageChange(page)}
//                                                 className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${currentPage === page ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-400 bg-white border border-gray-200'
//                                                       } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9`}
//                                                 aria-current={currentPage === page ? 'page' : undefined}
//                                                 disabled={page === '...'} // Disable ellipsis buttons
//                                           >
//                                                 {page}
//                                           </button>
//                                     ))}

//                                     {/* Next Button */}
//                                     <button
//                                           onClick={() => handlePageChange(currentPage + 1)}
//                                           disabled={currentPage === totalPages}
//                                           className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
//                                           aria-label="Next"
//                                     >
//                                           <span className="sr-only">Next</span>
//                                           <svg
//                                                 className="flex-shrink-0 w-4 h-4"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 24 24"
//                                                 stroke="currentColor"
//                                           >
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
//                                           </svg>
//                                     </button>
//                               </nav>
//                         </div>
//                   </div>
//             </div>
//       );
// };
