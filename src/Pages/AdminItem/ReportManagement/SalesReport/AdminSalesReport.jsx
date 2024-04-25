import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import AdminSalesInvoice from "./AdminSalesInvoice";

const AdminSalesReport = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: serviceOrder = [], refetch } = useQuery({
    queryKey: ["serviceOrder"],
    queryFn: async () => {
      const res = await fetch(
        "https://salenow-v2-backend.vercel.app/api/v1/admin/get-all-service-order"
      );
      const data = await res.json();
      return data.data;
    },
  });

  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const searchItem = () => {
    if (input === "" && startDate === "" && endDate === "") {
      setFilteredData(serviceOrder);
    } else {
      const filteredServiceOrder = serviceOrder.filter((order) => {
        const matchesSearch = Object.values(order).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(input.toLowerCase())
        );

        const matchesDateRange =
          startDate && endDate
            ? new Date(order.timestamp) >= new Date(startDate) &&
              new Date(order.timestamp) <= new Date(endDate)
            : true;

        return matchesSearch && matchesDateRange;
      });

      setFilteredData(filteredServiceOrder);
    }
  };

  const handleDateRangeChange = (e) => {
    e.preventDefault();
    const start = e.target.startDate.value;
    const end = e.target.endDate.value;
    setStartDate(start);
    setEndDate(end);
    searchItem();
  };

  useEffect(() => {
    setFilteredData(serviceOrder);
  }, [serviceOrder]);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(filteredData?.length / pageSize);

  const currentData = filteredData?.slice(startIndex, endIndex);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
    const endPage = Math.min(totalPages, startPage + pageSize - 1);

    return (
      <React.Fragment>
        {/* First Page */}
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
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <li key={pageNumber}>
              <button
                className={`block h-8 w-8 rounded border ${
                  pageNumber === currentPage
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

  console.log(
    new Date(startDate).toDateString(),
    new Date(endDate).toDateString()
  );

  return (
    <section className="container  mx-auto">
      <div className="flex justify-between items-center">
        <fieldset className="w-full my-4 space-y-1 dark:text-gray-100">
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
                  className="w-4 h-4 dark:text-gray-100"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value), searchItem();
              }}
              name="Search"
              placeholder="Search..."
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400"
            />
          </div>
        </fieldset>

        <form onSubmit={handleDateRangeChange} className="flex space-x-4">
          <input
            type="date"
            className="border border-gray-300 px-2 py-1 rounded"
            name="startDate"
          />
          <span className="text-gray-500">to</span>
          <input
            name="endDate"
            type="date"
            className="border border-gray-300 px-2 py-1 rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Apply
          </button>
        </form>
      </div>

      <div className="flex flex-col">
        <div className=" w-full overflow-x-auto ">
          <div className="inline-block min-w-full py-2 align-middle ">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className=" divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <button className="flex items-center gap-x-2">
                          <span>Service Image</span>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Order Id
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Service Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Service Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Payment Price
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Customer
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Service Category
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Payment Getway
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {currentData?.map((order, idx) => (
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <img
                          className="h-10 w-10 rounded-sm"
                          src={order.productImg}
                          alt=""
                        />
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        <div
                          onClick={() => setModalOpen(order)}
                          className="inline-flex items-center text-blue-500 gap-x-3"
                        >
                          <span># {order._id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {order.productTitle}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {order.productPrice}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {order.normalPrice}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {new Date(order.timestamp).toDateString()}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <div>
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                              {order?.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {order?.productCategory}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {order?.method?.Getaway}
                      </td>

                      {modalOpen._id === order._id && (
                        <AdminSalesInvoice
                          products={modalOpen}
                          setModalOpen={setModalOpen}
                        />
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
    </section>
  );
};

export default AdminSalesReport;
