import React, { useContext, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableRow from "./WooCommerceTableRow";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import AddAddress from "../../../Shop/pages/Home/UserProfile/ProfileUpdate/AddAddress";
import WooCommerceTableRow from "./WooCommerceTableRow";
import Pagination from "../../../../Common/Pagination";

const WooCommerceOrderTable = ({ searchValue, set_woo_select_item, woo_select_item, selectedValue }) => {
      const { shopInfo } = useContext(AuthContext);

      const { data: tData = [], refetch } = useQuery({
            queryKey: ["sellerWooOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/woo-commerce-order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      console.log(`https://doob.dev/api/v1/seller/woo-commerce-order?shopId=${shopInfo._id}`);


      const itemsPerPage = 15; // Number of items to display per page
      const [currentPage, setCurrentPage] = useState(1);

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
            <div className="flex flex-col bar overflow-hidden mt-4">
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

export default WooCommerceOrderTable;
