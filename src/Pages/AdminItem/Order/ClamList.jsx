import React, { useContext, useEffect, useRef, useState } from "react";
// import OrderAllinfoModal from "../OrderAllinfoModal";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { BiSearch } from "react-icons/bi";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import Datepicker from "react-tailwindcss-datepicker";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Pagination from "../../../Common/Pagination";
import Select from "react-select";




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

      const { data: tData = [], refetch, isLoading } = useQuery({
            queryKey: ["admin_order_for_claim"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/get-shop-all-order`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      console.log(tData, 'tData');






      const { data: sellers = [] } = useQuery({
            queryKey: ["sellers_all_shop"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/shop"
                  );
                  const data = await res.json();
                  return data;
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

      const all_data = (isLoading)
            ? []
            : [
                  ...tData.filter(item =>
                        ["claim"].includes(item.order_status?.toLowerCase())
                  ),
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
                        (item.reject_message?.rejectStatus?.toLowerCase() === status.toLowerCase());

                  // Date range match
                  const matchesDateRange = (() => {
                        if (!dateRange?.startDate || !dateRange?.endDate) return true;
                        const itemDate = new Date(item?.date);
                        if (isNaN(itemDate)) return false;
                        const startDate = new Date(dateRange.startDate);
                        const endDate = new Date(dateRange.endDate);
                        return itemDate >= startDate && itemDate <= endDate;
                  })();

                  // Daraz account match
                  const matchesDarazAc = selectedDarazAc === null || item?.seller === selectedDarazAc;

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
            const all_data = (isLoading)
                  ? []
                  : [
                        ...tData.filter(item =>
                              ["claim"].includes(item.order_status?.toLowerCase())
                        ),
                  ];

            setFilteredItems(all_data)

      }, [tData]);

      console.log(filteredItems, 'filteredItems');
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

            console.log(all_data, 'all_data');
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

      const seller_option = [
            { value: null, label: "No Select" }, // Static option
            ...sellers?.map((itm) => ({
                  value: itm?._id,
                  label: itm?.shopName,
            }))
      ];

      const seller_filter = (event) => {
            const seller_id = event?.value;
            set_daraz_ac(seller_id);

      };


      return (
            <div>
                  <div className="flex flex-col bar overflow-hidden mt-4">

                        <div className="flex items-center justify-between">
                              <h2 className="text-lg font-semibold">Clam List </h2>
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
                                                <Select
                                                      className='w-80'
                                                      placeholder="Select Seller"
                                                      options={seller_option}
                                                      onChange={seller_filter}
                                                />
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
                                                                  {console.log(item?.clam_time, 'time', index)}
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
                                                                              {formattedDate(item.timestamp ?? item.date)}
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
                                                                              {item?.status ? item?.order_status : "Pending"}
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
