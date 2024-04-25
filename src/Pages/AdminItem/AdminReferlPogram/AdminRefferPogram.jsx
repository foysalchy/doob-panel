import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const AdminReeferProgram = () => {
  const { data: referUsers = [], refetch } = useQuery({
    queryKey: ["referUsers"],
    queryFn: async () => {
      const res = await fetch(
        "https://salenow-v2-backend.vercel.app/api/v1/admin/refer-users"
      );
      const data = await res.json();
      return data.data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(
    referUsers?.filter((user) => user.code !== "")?.length / pageSize
  );

  const currentData = referUsers
    .filter((user) => user.code !== "")
    .slice(startIndex, endIndex);

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

  console.log(currentData);

  return (
    <section className="container  mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
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
                      Refer Code
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Due
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {currentData
                    .filter((user) => user.code !== "")
                    .map((users, idx) => (
                      <tr>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span># {idx + 1}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {new Date(users.time).toDateString()}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <p className="text-xs font-normal text-gray-400">
                                {users?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {users?.code}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {" "}
                          ৳ {users.due ? users.due : 2500}
                        </td>
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

export default AdminReeferProgram;
