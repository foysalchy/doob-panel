import React, { useContext, useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import PosInvoiceModal from "./PosInvoiceModal";

const PosHistory = () => {
  const [openInvoice, setOpenInvoice] = useState(false);
  const { shopInfo } = useContext(AuthContext);
  const ITEMS_PER_PAGE = 10; // Define number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Manage current page state

  const { data: posData = [], isLoading } = useQuery({
    queryKey: ["posData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/pos-report?shopId=${shopInfo?._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  console.log(posData);
  // Calculate total number of pages
  const totalPages = Math.ceil(posData.length / ITEMS_PER_PAGE);

  // Determine start and end index for pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Handle next page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState(posData);

  useEffect(() => {
    const lowercasedInput = input.toLowerCase();

    const filtered = posData.filter(itm => {
      // Convert the item to a string representation
      const itemStr = JSON.stringify(itm).toLowerCase();
      // Check if the input is included in the string representation
      return itemStr.includes(lowercasedInput);
    });

    setFilteredData(filtered);
  }, [input, posData]);


  
  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <fieldset className="w-60 my-4 space-y-1">
            <label for="Search" className="hidden">
              Search
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="button"
                  title="search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 "
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
                name="Search"
                placeholder="Search..."
                className="w-60 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none  focus:dark:border-violet-400"
              />
            </div>
          </fieldset>


        </div>
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right "
                      >
                        <div className="flex items-center gap-x-3">
                          <button className="flex items-center gap-x-2">
                            <span>Invoice</span>
                            <svg
                              className="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.3"
                              />
                            </svg>
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Cash
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Change
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Discount
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Phone
                      </th>{" "}
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" divide-y d">
                    {filteredData.map((itm) => (
                      <tr key={itm?._id}>
                        {openInvoice === itm._id && (
                          <PosInvoiceModal
                            setOpenInvoice={setOpenInvoice}
                            openInvoice={openInvoice}
                            invoice={itm.invoice}
                            invoiceData={itm}
                          />
                        )}
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div
                            onClick={() => setOpenInvoice(itm?._id)}
                            className="inline-flex items-center gap-x-3 cursor-pointer text-blue-500"
                          >
                            <span>{itm?._id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {`${new Date(itm?.date).getDate()}, ${new Date(itm?.date).getMonth() + 1
                            }, ${new Date(itm?.date).getFullYear()}`}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="text-emerald-500">
                            <h2 className="text-sm font-normal">
                              {itm?.userInfo.name}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="text-sm   ">
                                {itm?.userInfo.email}
                              </h2>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="text-sm   ">
                                {itm?.invoice.cash}
                              </h2>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="text-sm   ">
                                {itm?.invoice.change}
                              </h2>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="text-sm   ">
                                {itm?.invoice.discount}
                              </h2>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <h2 className="text-sm   ">
                            {itm?.userInfo.phoneNumber}
                          </h2>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <h2 className="text-sm   ">
                            {itm?.userInfo.address}
                          </h2>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Previous</span>
          </button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Next</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PosHistory;
