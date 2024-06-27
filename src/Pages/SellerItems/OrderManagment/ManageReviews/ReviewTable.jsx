import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ReviewTableRow from "./ReviewTableRow";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import BrightAlert from "bright-alert";

const ReviewTable = ({ search, pageSize, setPageSize }) => {
  const { shopInfo } = useContext(AuthContext);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const { data: reviewData = [], refetch } = useQuery({
    queryKey: ["reviewData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/review?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(reviewData?.length / pageSize);

  const currentData = reviewData.slice(startIndex, endIndex);

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

  const updateReviewSatatus = (id, status) => {
    fetch(`https://doob.dev/api/v1/seller/review-status?id=${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 1000 });
        refetch();
      });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th
                    scope="col"
                    className="border-r px-2 py-4 dark:border-neutral-500"
                  >
                    Product Id
                  </th>
                  <th
                    scope="col"
                    className="border-r border-gray-400 px-2 py-4 dark:border-neutral-500"
                  >
                    View Review
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewData?.slice(startIndex, endIndex)?.map((itm) => (
                  <ReviewTableRow
                    updateReviewSatatus={updateReviewSatatus}
                    refetch={refetch}
                    itm={itm}
                    key={itm}
                  />
                ))}
              </tbody>
            </table>
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
    </div>
  );
};

export default ReviewTable;
