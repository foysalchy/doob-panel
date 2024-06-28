import React, { useContext, useState } from "react";
import { BiCheck, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableRow from "./DarazTableRow";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import AddAddress from "../../../Shop/pages/Home/UserProfile/ProfileUpdate/AddAddress";
import DarazTableRow from "./DarazTableRow";
import { useEffect } from "react";

const DarazOrderTable = ({
  selectedValue,
  searchValue,
  selected,
  setSelected,
}) => {
  const { shopInfo } = useContext(AuthContext);

  const {
    data: sellerDarazOrders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellerDarazOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=${selectedValue}`
      );

      const data = await res.json();

      return data.data;
    },
  });

  // console.log(sellerDarazOrders??sellerDarazOrders?.orders[0], "sellerDarazOrder");

  useEffect(() => {
    refetch();
  }, [selectedValue]);

  // const itemsPerPage = 4; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = searchValue
    ? sellerDarazOrders?.orders?.filter((itm) => {
      console.log(itm);
      const order_id = itm?.order_id;
      const order_idString = order_id?.toString(); // Convert to string
      const isMatch = order_idString?.includes(searchValue);
      if (isMatch) {
        console.log("Filtered Item:", itm);
      }
      return isMatch;
    })
    : sellerDarazOrders?.orders;

  // console.log(filteredData);

  // Calculate the total number of pages
  const [pageSize, setItemsPerPage] = useState(15);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(filteredData?.length / pageSize);

  const currentData =
    filteredData?.length && filteredData?.slice(startIndex, endIndex);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
    const endPage = Math.min(totalPages, startPage + pageSize - 1);

    return (
      <React.Fragment>
        {startPage > 1 && (
          <li>
            <button
              className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
              onClick={() => handleChangePage(1)}
            >
              1
            </button>
          </li>
        )}

        {/* Current Page */}
        {Array.from({ length: endPage - startPage + 1 })?.map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <li key={pageNumber}>
              <button
                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-900 bg-white text-center leading-8 text-gray-900"
                  }`}
                onClick={() => handleChangePage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Last Page */}
        {endPage < totalPages && (
          <li>
            <button
              className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
              onClick={() => handleChangePage(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="">
      {!isLoading ? (
        <div>
          {currentData?.length ? (
            <div className=" sm:-mx-6 lg:-mx-8">
              <div className=" py-2 sm:px-6 lg:px-8">
                <div className="">
                  <table className="">
                    <thead className="border-b  font-medium  ">
                      <tr>
                        <th
                          scope="col"
                          className="border-r px-2 py-4 font-[500]"
                        >
                          <input
                            checked={selected.length === currentData?.length}
                            onChange={() => {
                              if (!selected.length) {
                                console.log("Filtered Data:", currentData);
                                setSelected(
                                  currentData?.map((item) => item.order_id)
                                );
                              } else {
                                // If selected is true, deselect all items
                                console.log("Deselect All");
                                setSelected([]);
                              }
                            }}
                            type="checkbox"
                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-checkbox-group-1"
                          />
                        </th>
                        <th
                          scope="col"
                          className="border-r px-2 py-4 font-[500]"
                        ></th>
                        <th
                          scope="col"
                          className="border-r px-2 py-4 font-[500]"
                        >
                          Document
                        </th>
                        <th
                          scope="col"
                          className="border-r px-2 py-4 font-[500]"
                        >
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
                      {currentData?.map &&
                        currentData?.map((itm, index) => (
                          <DarazTableRow
                            select={selected}
                            setSelect={setSelected}
                            data={itm}
                            index={index}
                            key={index}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div>Here is no order found</div>
          )}
        </div>
      ) : (
        <h1>Loading.</h1>
      )}
      <div className="flex items-center justify-between">

        <div className="flex items-center whitespace-nowrap gap-2">
          <span className="text-sm">Entire per page</span>
          <select

            className="border w-[50px] px-1 py-2 text-sm rounded"
            onChange={(e) => setItemsPerPage(e.target.value)}>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={70}>70</option>
            <option value={100}>100</option>

          </select>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <ol className="flex justify-center gap-1 text-xs font-medium">
          <li>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
              onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <BiLeftArrow className="text-xl" />
              </svg>
            </button>
          </li>

          {renderPageNumbers()}

          <li>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
              onClick={() =>
                handleChangePage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <BiRightArrow className="text-xl" />
              </svg>
            </button>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DarazOrderTable;
