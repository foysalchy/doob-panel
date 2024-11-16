import React, { useContext, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableRow from "./WooCommerceTableRow";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import AddAddress from "../../../Shop/pages/Home/UserProfile/ProfileUpdate/AddAddress";
import WooCommerceTableRow from "./WooCommerceTableRow";

const WooCommerceOrderTable = ({ searchValue }) => {
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

      const itemsPerPage = 15; // Number of items to display per page
      const [currentPage, setCurrentPage] = useState(1);

      const filteredData = searchValue
            ? tData?.filter((itm) =>
                  itm?.addresses?.fullName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
            )
            : tData;

      // Calculate the range of items to display based on pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = tData?.slice(startIndex, endIndex);


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
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {currentItems?.map((data, index) => (
                                                      <WooCommerceTableRow
                                                            data={data}
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
                  <div className="max-w-2xl mx-auto mt-8 pb-8">
                        <nav aria-label="Page navigation example">
                              <ul className="inline-flex -space-x-px">
                                    {Array.from(
                                          { length: Math.ceil(filteredData.length / itemsPerPage) },
                                          (_, i) => (
                                                <li key={i}>
                                                      <button
                                                            onClick={() => setCurrentPage(i + 1)}
                                                            className={`bg-white border ${currentPage === i + 1
                                                                  ? "text-blue-600"
                                                                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                  } border-gray-300 leading-tight py-2 px-3 rounded ${i === 0 ? "rounded-l-lg" : ""
                                                                  } ${i === Math.ceil(filteredData.length / itemsPerPage) - 1
                                                                        ? "rounded-r-lg"
                                                                        : ""
                                                                  }`}
                                                      >
                                                            {i + 1}
                                                      </button>
                                                </li>
                                          )
                                    )}
                              </ul>
                        </nav>
                  </div>
            </div>
      );
};

export default WooCommerceOrderTable;
