import React, { useContext, useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import AddProductModal from "./AddProductModal";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { saveAs } from "file-saver";
import LoaderData from "../../../../Common/LoaderData";

import Select from "react-select";
import PayCustomerModal from "./PayCustomerModal";
import Pagination from "../../../../Common/Pagination";
import useAddDivToTableCells from "../../../../Common/useAddDivToTableCells";

const CustomerHistory = () => {
      const { shopInfo } = useContext(AuthContext);
      const [BiLoader, setLoader] = useState(false);
      const [openModal, setOpenModal] = useState(false);
      const [searchValue, setSearchQuery] = useState("");

      const { data: customerData = [], isLoading, refetch } = useQuery({
            queryKey: ["customerdata"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/customer-report?shopId=${shopInfo?.shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      // handle select
      const [selectSearchCategory, setSelectSearchCategory] = useState({
            label: "Select User Type",
            value: "Select User Type",
      });

      // console.log(customerData);

      const [currentPage, setCurrentPage] = useState(1);

      const pageSize = 10;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(customerData?.length / pageSize);

      const currentData = customerData
            ?.slice(startIndex, endIndex)
            ?.filter((customer) => {
                  // Iterate through all keys of the customer object
                  return Object.values(customer).some((value) =>
                        value
                              ? value.toString().toLowerCase().includes(searchValue.toLowerCase())
                              : false
                  );
            });


      console.log(customerData, 'customerData');

      // console.log(currentData);

      const handlePageChange = (newPage) => {
            setCurrentPage(newPage);
      };
      const totalItems = customerData.filter((customer) => {
            // Iterate through all keys of the customer object
            return Object.values(customer).some((value) =>
                  value
                        ? value.toString().toLowerCase().includes(searchValue.toLowerCase())
                        : false
            );
      }).length;


      const [csvData, setCsvData] = useState([]);


      const handleExportToExcel = () => {
            const headers = [
                  "Name",
                  "Email",
                  "Mobile Number",
                  "Provider",
                  "Added Products",
                  "Orders",
                  "Wishlist",
            ];
            const rows = customerData.map((customer) => [
                  customer.name,
                  customer.email,
                  customer.phoneNumber,
                  customer.provider,
                  customer.addToCart.length,
                  customer.orderList.length,
                  customer.wishList.length,
            ]);

            // Combine headers and rows with appropriate delimiters
            const csvContent = [headers.join("\t")]
                  .concat(rows.map((row) => row.join("\t")))
                  .join("\n");

            // Create a Blob object with UTF-8 encoding (supports international characters)
            const blob = new Blob([csvContent], { type: "text/tsv;charset=utf-8" });

            if (typeof saveAs !== "undefined") {
                  // Check if FileSaver.js is included
                  saveAs(blob, "table_data.xlsx"); // Use .xlsx extension for Excel-like behavior
            } else {
                  console.warn(
                        "FileSaver.js library not found. Download functionality limited."
                  );
                  // Provide alternative download instructions (optional)
            }
      };

      const [OpenPModal, setOpenPModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenPModal(ticketId);
      };
      useAddDivToTableCells()
      return (
            <div>
                  <section className=" mx-auto">
                        <div className="flex justify-between items-center gap-2">
                        <button onClick={handleExportToExcel} className="text-blue-500">
                              Export to CSV
                        </button>

                        <div>
                              {/* search bar */}
                              <div className="flex items-center justify-between my-2 ">
                                    <div className="relative flex items-center gap-4 w-full">
                                          {/* Search Icon */}
                                          <span className="absolute left-3 text-gray-500">
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 24 24"
                                                      width="20"
                                                      height="20"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth="2"
                                                >
                                                      <path d="M21 21l-4.35-4.35m0 0A7.925 7.925 0 0 0 18 9a7.925 7.925 0 1 0-7.93 7.93A7.925 7.925 0 0 0 18 9c0 .38-.04.75-.1 1.1z"></path>
                                                </svg>
                                          </span>
                                          {/* Input field */}
                                          <input
                                                type="text"
                                                placeholder="Search..."
                                                value={searchValue}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="block w-full pl-10 pr-4 py-3 rounded-md border-2 border-gray-300 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                          />
                                    </div>
                              </div>
                        </div>

                        </div>


                        <div className=" ">
                              <div className="-mx-4 -my-2 bar overflow-x-auto  sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                          <div className="bar   border border-gray-200 md:rounded-lg">
                                                <table >
                                                      <thead className="bg-gray-50 ">
                                                            <tr>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                       Name
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Email
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Phone  
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Due Balance
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Advance Balance
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Provider
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Cart Products
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Orders
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        WishList
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        Action
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      {isLoading && <LoaderData />}
                                                      <tbody className="bg-white divide-y divide-gray-200">
                                                            {currentData?.map((customer, index) => (
                                                                  <tr key={customer?._id}>

                                                                        <td className=" px-4 py-1 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                              <span>{customer?.name}</span>
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm whitespace-nowrap">
                                                                              {customer?.email}
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm  whitespace-nowrap">
                                                                              {customer?.phoneNumber}
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm  whitespace-nowrap">
                                                                              {customer?.dueAmount <0  ? customer?.dueAmount :0}
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm  whitespace-nowrap">
                                                                        {customer?.dueAmount >0  ? customer?.dueAmount :0}
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                              {customer?.provider}
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm text-gray-500  whitespace-nowrap">
                                                                              <button
                                                                                    onClick={() =>
                                                                                          setOpenModal({
                                                                                                customer,
                                                                                                status: "cart",
                                                                                                title: "Add to cart products",
                                                                                          })
                                                                                    }
                                                                                    className="text-blue-500"
                                                                              >
                                                                                  Total ({customer?.addToCart.length})
                                                                              </button>
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm text-gray-500  whitespace-nowrap">
                                                                              <button
                                                                                    onClick={() => setOpenModal({ customer, status: "order", title: "Order List" })}
                                                                                    className="text-blue-500"
                                                                              >
                                                                                  Total ({customer?.orderList.length})
                                                                              </button>
                                                                        </td>
                                                                        <td className=" px-4 py-1 text-sm whitespace-nowrap">
                                                                              <button
                                                                                    onClick={() =>
                                                                                          setOpenModal({
                                                                                                customer,
                                                                                                status: "wishlist",
                                                                                                title: "Wishlist",
                                                                                          })
                                                                                    }
                                                                                    className="text-blue-500"
                                                                              >
                                                                                    Total  ({customer?.wishList.length})
                                                                              </button>
                                                                        </td>
                                                                        {openModal && (
                                                                              <span>
                                                                                    {openModal.customer._id == customer._id && (
                                                                                          <AddProductModal
                                                                                                setOpenModal={setOpenModal}
                                                                                                title={openModal?.title}
                                                                                                products={
                                                                                                      (openModal?.status == "cart" &&
                                                                                                            customer?.addToCart) ||
                                                                                                      (openModal?.status == "order" &&
                                                                                                            customer.orderList) ||
                                                                                                      (openModal?.status == "wishlist" &&
                                                                                                            customer?.wishList)
                                                                                                }
                                                                                          />
                                                                                    )}
                                                                              </span>
                                                                        )}

                                                                        <td className="p-3">
                                                                              <button
                                                                                    className="bg-black text-white text-sm w-[100px] rounded  p-2 rounded-lg"
                                                                                    onClick={() => handleViewDetails(customer?._id)}
                                                                              >
                                                                                    Pay Now
                                                                              </button>
                                                                        </td>
                                                                        {OpenPModal === customer?._id && (
                                                                              <div className="h-0 w-0">
                                                                                    <PayCustomerModal
                                                                                          OpenModal={OpenPModal}
                                                                                          refetch={refetch}
                                                                                          setOpenModal={setOpenPModal}
                                                                                          customerInfo={customer}
                                                                                    />
                                                                              </div>
                                                                        )}
                                                                  </tr>
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <Pagination
                              totalItems={totalItems}
                              itemsPerPage={pageSize}
                              currentPage={currentPage}
                              onPageChange={handlePageChange}
                        />
                  </section>
            </div>
      );
};

export default CustomerHistory;
