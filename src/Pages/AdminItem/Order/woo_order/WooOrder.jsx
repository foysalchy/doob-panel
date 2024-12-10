import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import OrderAllinfoModal from "../../../SellerItems/OrderManagment/ManageOrder/OrderAllinfoModal";
import WooCommerceTableRow from "../../../SellerItems/OrderManagment/WoocommerceOrder/WooCommerceTableRow";
import Pagination from "../../../../Common/Pagination";

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
      const itemsPerPage = 10; // Number of items to display per page
      const [currentPage, setCurrentPage] = useState(1);
      const [woo_select_item, set_woo_select_item] = useState([]);
      const [searchValue, setSearchValue] = useState("");
      const [selectedValue, setSelectedValue] = useState("All");

      const { data: tData = [], refetch } = useQuery({
            queryKey: ["adminWooOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `http://localhost:5001/api/v1/admin/get-woo-admin-order`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      const filteredData = searchValue
            ? tData?.filter((itm) =>
                  Object.values(itm).some((value) =>
                        String(value).toLowerCase().includes(searchValue.toLowerCase())
                  )
            )
            : tData;

      // Calculate the range of items to display based on pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const filteredStatusData = filteredData.filter(
            (item) => item.status === selectedValue || selectedValue === 'All'
      );

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

      return (
            <div>
                  <h1 className="text-3xl">Woo Order</h1>
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
                                                            refetch={refetch}
                                                      />
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>
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
