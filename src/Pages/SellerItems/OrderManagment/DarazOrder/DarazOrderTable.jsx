// import React, { useContext, useState } from "react";
// import { BiCheck, BiLeftArrow, BiRightArrow } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import TableRow from "./DarazTableRow";
// import { AuthContext } from "../../../../AuthProvider/UserProvider";
// import { useQuery } from "@tanstack/react-query";
// import AddAddress from "../../../Shop/pages/Home/UserProfile/ProfileUpdate/AddAddress";
// import DarazTableRow from "./DarazTableRow";
// import { useEffect } from "react";
// import LoaderData from "../../../../Common/LoaderData";

// const DarazOrderTable = ({
//       selectedValue,
//       searchValue,
//       selected,
//       setSelected,
//       setSelected_item,
//       selected_item
// }) => {
//       const { shopInfo } = useContext(AuthContext);

//       const {
//             data: sellerDarazOrders = [],
//             refetch,
//             isLoading,
//       } = useQuery({
//             queryKey: ["sellerDarazOrder"],
//             queryFn: async () => {
//                   const res = await fetch(
//                         `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=${selectedValue}`
//                   );

//                   const data = await res.json();

//                   return data.data;
//             },
//       });

//       // console.log(sellerDarazOrders??sellerDarazOrders?.orders[0], "sellerDarazOrder");

//       useEffect(() => {
//             refetch();
//       }, [selectedValue]);

//       // const itemsPerPage = 4; // Number of items to display per page
//       const [currentPage, setCurrentPage] = useState(1);

//       const filteredData = searchValue
//             ? sellerDarazOrders?.filter((itm) => {
//                   console.log(itm);
//                   const order_id = itm?.order_id;
//                   const order_idString = order_id?.toString(); // Convert to string
//                   const isMatch = order_idString?.includes(searchValue);
//                   if (isMatch) {
//                         console.log("Filtered Item:", itm);
//                   }
//                   return isMatch;
//             })
//             : sellerDarazOrders;

//       // console.log(filteredData);

//       // Calculate the total number of pages
//       const [pageSize, setItemsPerPage] = useState(15);
//       const startIndex = (currentPage - 1) * pageSize;
//       const endIndex = startIndex + pageSize;
//       const totalPages = Math.ceil(filteredData?.length / pageSize);

//       const currentData =
//             filteredData?.length && filteredData?.slice(startIndex, endIndex);

//       const handleChangePage = (newPage) => {
//             setCurrentPage(newPage);
//       };

//       const renderPageNumbers = () => {
//             const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
//             const endPage = Math.min(totalPages, startPage + pageSize - 1);

//             return (
//                   <React.Fragment>
//                         {startPage > 1 && (
//                               <li>
//                                     <button
//                                           className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
//                                           onClick={() => handleChangePage(1)}
//                                     >
//                                           1
//                                     </button>
//                               </li>
//                         )}

//                         {/* Current Page */}
//                         {Array.from({ length: endPage - startPage + 1 })?.map((_, index) => {
//                               const pageNumber = startPage + index;
//                               return (
//                                     <li key={pageNumber}>
//                                           <button
//                                                 className={`block h-8 w-8 rounded border ${pageNumber === currentPage
//                                                       ? "border-blue-600 bg-blue-600 text-white"
//                                                       : "border-gray-900 bg-white text-center leading-8 text-gray-900"
//                                                       }`}
//                                                 onClick={() => handleChangePage(pageNumber)}
//                                           >
//                                                 {pageNumber}
//                                           </button>
//                                     </li>
//                               );
//                         })}

//                         {/* Last Page */}
//                         {endPage < totalPages && (
//                               <li>
//                                     <button
//                                           className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
//                                           onClick={() => handleChangePage(totalPages)}
//                                     >
//                                           {totalPages}
//                                     </button>
//                               </li>
//                         )}
//                   </React.Fragment>
//             );
//       };




//       return (
//             <div className="w-full h-full">
//                   {!isLoading ? (
//                         <div>
//                               {currentData?.length ? (
//                                     <div className=" sm:-mx-6 lg:-mx-8">
//                                           <div className=" py-2 sm:px-6 lg:px-8">
//                                                 <div className="">
//                                                       <table className="">
//                                                             <thead className="border-b  font-medium  ">
//                                                                   <tr>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 font-[500]"
//                                                                         >
//                                                                               <input
//                                                                                     checked={selected.length === currentData?.length}
//                                                                                     onChange={() => {
//                                                                                           if (!selected.length) {
//                                                                                                 console.log("Filtered Data:", currentData);
//                                                                                                 setSelected(
//                                                                                                       currentData?.map((item) => item.order_id)
//                                                                                                 );
//                                                                                                 setSelected_item(
//                                                                                                       currentData?.map((item) => item)
//                                                                                                 );
//                                                                                           } else {
//                                                                                                 // If selected is true, deselect all items
//                                                                                                 console.log("Deselect All");
//                                                                                                 setSelected([]);
//                                                                                                 setSelected_item([])
//                                                                                           }
//                                                                                     }}
//                                                                                     type="checkbox"
//                                                                                     className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
//                                                                                     id="hs-checkbox-group-1"
//                                                                               />
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 font-[500]"
//                                                                         ></th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 font-[500]"
//                                                                         >
//                                                                               Document
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 font-[500]"
//                                                                         >
//                                                                               Order No.
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 text-sm font-[500]"
//                                                                         >
//                                                                               Order Date
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 text-sm font-[500]"
//                                                                         >
//                                                                               Pending Since
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 text-sm font-[500]"
//                                                                         >
//                                                                               Payment Method
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 text-sm font-[500]"
//                                                                         >
//                                                                               Retail Price
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 text-sm font-[500]"
//                                                                         >
//                                                                               Status
//                                                                         </th>
//                                                                         <th
//                                                                               scope="col"
//                                                                               className="border-r px-2 py-4 text-sm font-[500]"
//                                                                         >
//                                                                               Actions
//                                                                         </th>
//                                                                   </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                   {currentData?.map &&
//                                                                         currentData?.map((itm, index) => (
//                                                                               <DarazTableRow
//                                                                                     selected_item={selected_item}
//                                                                                     select={selected}
//                                                                                     setSelected_item={setSelected_item}
//                                                                                     setSelect={setSelected}
//                                                                                     data={itm}
//                                                                                     index={index}
//                                                                                     key={index}
//                                                                               />
//                                                                         ))}
//                                                             </tbody>
//                                                       </table>
//                                                 </div>
//                                           </div>
//                                     </div>
//                               ) : (
//                                     <div className="my-10 mb-4 text-2xl">Here is no order found</div>
//                               )}
//                         </div>
//                   ) : (
//                         <LoaderData />
//                   )}






//                   <div className="flex items-center justify-between">

//                         <div className="flex items-center whitespace-nowrap gap-2">
//                               <span className="text-sm">Entire per page</span>
//                               <select

//                                     className="border w-[50px] px-1 py-2 text-sm rounded"
//                                     onChange={(e) => setItemsPerPage(e.target.value)}>
//                                     <option value={15}>15</option>
//                                     <option value={30}>30</option>
//                                     <option value={70}>70</option>
//                                     <option value={100}>100</option>

//                               </select>
//                         </div>
//                   </div>
//                   <div className="flex justify-center mt-4">
//                         <ol className="flex justify-center gap-1 text-xs font-medium">
//                               <li>
//                                     <button
//                                           className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
//                                           onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
//                                           disabled={currentPage === 1}
//                                     >
//                                           <span className="sr-only">Prev Page</span>
//                                           <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 className="h-3 w-3"
//                                                 viewBox="0 0 20 20"
//                                                 fill="currentColor"
//                                           >
//                                                 <BiLeftArrow className="text-xl" />
//                                           </svg>
//                                     </button>
//                               </li>

//                               {renderPageNumbers()}

//                               <li>
//                                     <button
//                                           className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
//                                           onClick={() =>
//                                                 handleChangePage(Math.min(totalPages, currentPage + 1))
//                                           }
//                                           disabled={currentPage === totalPages}
//                                     >
//                                           <span className="sr-only">Next Page</span>
//                                           <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 className="h-3 w-3"
//                                                 viewBox="0 0 20 20"
//                                                 fill="currentColor"
//                                           >
//                                                 <BiRightArrow className="text-xl" />
//                                           </svg>
//                                     </button>
//                               </li>
//                         </ol>
//                   </div>
//             </div>
//       );
// };

// export default DarazOrderTable;




import React, { useContext, useState, useEffect } from "react";
import { BiCheck, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import LoaderData from "../../../../Common/LoaderData";
import DarazTableRow from "./DarazTableRow";

const DarazOrderTable = ({
      selectedValue,
      searchValue,
      selected,
      setSelected,
      setSelected_item,
      selected_item,
}) => {
      const [pageSize, setPageSize] = useState(15);
      const [currentPage, setCurrentPage] = useState(1);
      const [offset, setOffset] = useState(0);
      const { shopInfo } = useContext(AuthContext);

      // const { data: sellerDarazOrders = { orders: [], countTotal: 0 }, refetch, isLoading } = useQuery({
      //       queryKey: ["sellerDarazALLOrderHere", shopInfo._id, selectedValue, offset],
      //       queryFn: async () => {
      //             const res = await fetch(
      //                   `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=${selectedValue}&offset=${offset}`
      //             );
      //             const data = await res.json();
      //             return data.data;
      //       },
      //       keepPreviousData: false, // Disable keeping previous data to avoid stale data
      //       enabled: !!shopInfo._id,
      //       onSuccess: (data) => {
      //             if (offset === 0) {
      //                   // Reset the orders when offset is zero
      //                   setAllOrders(data.orders);
      //             } else {
      //                   // Append new orders for pagination
      //                   setAllOrders((prevOrders) => [...prevOrders, ...data.orders]);
      //             }
      //       },
      // });

      // console.log(allOrders);

      // const [allOrders, setAllOrders] = useState({
      //       count: 0,
      //       orders: [],
      //       countTotal: 0
      // });

      // const { refetch } = useQuery({
      //       queryKey: ["sellerAllDarazOrder", shopInfo._id, offset],
      //       queryFn: async () => {
      //             const res = await fetch(
      //                   `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=${selectedValue}&offset=${offset}`
      //             );

      //             if (!res.ok) {
      //                   throw new Error('Failed to fetch orders');
      //             }

      //             const data = await res.json();
      //             return data.data;
      //       },
      //       onSuccess: (data) => {
      //             console.log(data, 'darazOrder');
      //             // Assuming data has the structure { count, orders, countTotal }
      //             setAllOrders(prevState => ({
      //                   count: prevState.count + data.count, // Accumulate count if needed
      //                   orders: [...prevState.orders, ...data.orders], // Append new orders
      //                   countTotal: data.countTotal // Update total count
      //             }));
      //       },
      //       keepPreviousData: true, // Keeps previous data while fetching new data
      // });
      const [allOrders, setAllOrders] = useState({
            count: 0,
            orders: [],
            countTotal: 0
      });

      const { refetch } = useQuery({
            queryKey: ["sellerAllDarazOrderData", shopInfo._id, offset],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=${selectedValue}&offset=${offset}`
                  );

                  if (!res.ok) {
                        throw new Error('Failed to fetch orders');
                  }

                  const data = await res.json();
                  return data.data;
            },
            onSuccess: (data) => {
                  console.log(data, 'darazOrder');
                  // Ensure orders is always an array
                  setAllOrders(prevState => ({
                        count: prevState.count + (data.count || 0), // Accumulate count if needed
                        orders: [...(prevState.orders || []), ...(data.orders || [])], // Append new orders
                        countTotal: data.countTotal || prevState.countTotal // Update total count
                  }));
            },
            keepPreviousData: true, // Keeps previous data while fetching new data
      });


      // Effect to handle selectedValue changes
      useEffect(() => {
            setCurrentPage(1); // Reset to first page
            setOffset(0); // Reset offset
            setAllOrders([]); // Clear allOrders to load new data
            refetch(); // Refetch data with new selectedValue

      }, [selectedValue, refetch]);

      // Effect to handle pagination
      useEffect(() => {
            if (allOrders?.orders?.length == allOrders.countTotal && allOrders.countTotal != 0) {
                  return
            }
            else {
                  setOffset(allOrders?.orders?.length)
                  refetch()
            }
      }, [allOrders?.orders?.length, allOrders.countTotal]);

      const searchInOrder = (order, searchValue) => {
            if (!searchValue) return true;
            const lowerSearchValue = searchValue.toLowerCase();
            return Object.values(order).some(value =>
                  value?.toString().toLowerCase().includes(lowerSearchValue)
            );
      };

      console.log(allOrders);

      const filteredData = allOrders?.orders?.filter(order => searchInOrder(order, searchValue));
      const totalPages = Math.ceil(filteredData?.length / pageSize);

      // Define startIndex and endIndex
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, filteredData?.length);
      const currentData = filteredData?.slice(startIndex, endIndex);

      const handlePageChange = (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
                  setCurrentPage(newPage);
            }
      };

      const renderPageNumbers = () => {
            const maxPagesToShow = 10;
            const pageRange = [];

            if (totalPages <= maxPagesToShow) {
                  for (let i = 1; i <= totalPages; i++) {
                        pageRange.push(i);
                  }
            } else {
                  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
                  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

                  for (let i = startPage; i <= endPage; i++) {
                        pageRange.push(i);
                  }

                  if (startPage > 1) {
                        pageRange.unshift(1, '...');
                  }

                  if (endPage < totalPages) {
                        pageRange.push('...', totalPages);
                  }
            }

            return pageRange;
      };




      return (
            <div>
                  <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                              <span className="text-sm">Items per page</span>
                              <select
                                    className="border w-[50px] px-1 py-2 text-sm rounded"
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                              >
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={70}>70</option>
                                    <option value={100}>100</option>
                              </select>
                        </div>
                  </div>
                  <div className="w-[100%] overflow-x-auto">
                        {currentData?.length ? (
                              <div className="inline-block">
                                    <div className="py-2 sm:px-6 lg:px-8">
                                          <div className="">
                                                <table className="">
                                                      <thead className="border-b font-medium">
                                                            <tr>
                                                                  <th className="border-r px-2 py-4 font-[500]">
                                                                        <input
                                                                              checked={selected?.length === currentData?.length}
                                                                              onChange={() => {
                                                                                    if (selected?.length === currentData?.length) {
                                                                                          setSelected([]);
                                                                                          setSelected_item([]);
                                                                                    } else {
                                                                                          setSelected(currentData?.map(item => item.order_id));
                                                                                          setSelected_item(currentData);
                                                                                    }
                                                                              }}
                                                                              type="checkbox"
                                                                              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                                                                        />
                                                                  </th>
                                                                  <th className="border-r px-2 py-4 font-[500]">Document</th>
                                                                  <th className="border-r whitespace-nowrap px-2 py-4 font-[500]">View Invoice</th>
                                                                  <th className="border-r px-2 py-4 font-[500]">Order No.</th>
                                                                  <th className="border-r px-2 py-4 text-sm font-[500]">Order Date</th>
                                                                  <th className="border-r px-2 py-4 text-sm font-[500]">Pending Since</th>
                                                                  <th className="border-r px-2 py-4 text-sm font-[500]">Payment Method</th>
                                                                  <th className="border-r px-2 py-4 text-sm font-[500]">Retail Price</th>
                                                                  <th className="border-r px-2 py-4 text-sm font-[500]">Status</th>
                                                                  <th className="border-r px-2 py-4 text-sm font-[500]">Actions</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentData?.map((order, index) => (
                                                                  <DarazTableRow
                                                                        key={order.order_id}
                                                                        data={order}
                                                                        selected_item={selected_item}
                                                                        select={selected}
                                                                        setSelected_item={setSelected_item}
                                                                        setSelect={setSelected}
                                                                        index={index}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        ) : (
                              <div className="my-10 mb-4 text-2xl">No orders found</div>
                        )}
                  </div>




                  <div className="py-6 bg-gray-50">
                        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                              <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                                    <p className="text-sm font-medium text-gray-500">
                                          Showing {startIndex + 1} to {endIndex} of {filteredData?.length} results
                                    </p>
                                    <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                          <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                                aria-label="Previous"
                                          >
                                                <span className="sr-only">Previous</span>
                                                <svg
                                                      className="flex-shrink-0 w-4 h-4"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 19l-7-7 7-7"
                                                      />
                                                </svg>
                                          </button>

                                          {renderPageNumbers().map((page, index) => (
                                                <button
                                                      key={index}
                                                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                                                      className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${typeof page === 'number' ? (currentPage === page ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-400 bg-white border border-gray-200') : 'text-gray-500 bg-white border border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9`}
                                                      aria-current={typeof page === 'number' && currentPage === page ? 'page' : undefined}
                                                >
                                                      {page}
                                                </button>
                                          ))}

                                          <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                                aria-label="Next"
                                          >
                                                <span className="sr-only">Next</span>
                                                <svg
                                                      className="flex-shrink-0 w-4 h-4"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                                      />
                                                </svg>
                                          </button>
                                    </nav>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default DarazOrderTable;
