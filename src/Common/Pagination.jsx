import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const getPageNumbers = () => {
            const pageNumbers = [];
            const maxVisiblePages = 5;
            const halfVisible = Math.floor(maxVisiblePages / 2);

            if (totalPages <= maxVisiblePages) {
                  for (let i = 1; i <= totalPages; i++) {
                        pageNumbers.push(i);
                  }
            } else if (currentPage <= halfVisible + 1) {
                  for (let i = 1; i <= maxVisiblePages - 1; i++) {
                        pageNumbers.push(i);
                  }
                  pageNumbers.push('...');
                  pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - halfVisible) {
                  pageNumbers.push(1);
                  pageNumbers.push('...');
                  for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
                        pageNumbers.push(i);
                  }
            } else {
                  pageNumbers.push(1);
                  pageNumbers.push('...');
                  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        pageNumbers.push(i);
                  }
                  pageNumbers.push('...');
                  pageNumbers.push(totalPages);
            }

            return pageNumbers;
      };

      const handlePrevious = () => {
            if (currentPage > 1) {
                  onPageChange(currentPage - 1);
            }
      };

      const handleNext = () => {
            if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
            }
      };

      return (
            <div className="py-6 bg-gray-50">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                              <p className="text-sm font-medium text-gray-500">
                                    Showing {currentPage} of {totalPages} out of {totalItems} results
                              </p>

                              <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                    {/* Previous Button */}
                                    <button
                                          onClick={handlePrevious}
                                          className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${currentPage === 1 ? "text-gray-300" : "text-gray-400"
                                                } bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2  ring-gray-400 w-9`}
                                          disabled={currentPage === 1}
                                          title="Previous"
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
                                                      strokeWidth="2"
                                                      d="M15 19l-7-7 7-7"
                                                />
                                          </svg>
                                    </button>

                                    {/* Page Numbers */}
                                    {getPageNumbers().map((page, index) => (
                                          <button
                                                key={index}
                                                onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                                                className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${page === currentPage
                                                      ? "text-white bg-gray-900 border-gray-200"
                                                      : "text-gray-400 bg-white border-gray-200"
                                                      } border rounded-md focus:outline-none focus:ring-2 disabled:cursor-not-allowed focus:ring-offset-2 focus:ring-gray-500 w-9`}
                                                disabled={page === '...'}
                                          >
                                                {page}
                                          </button>
                                    ))}

                                    {/* Next Button */}
                                    <button
                                          onClick={handleNext}
                                          className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${currentPage === totalPages ? "text-gray-300" : "text-gray-400"
                                                } bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ring-gray-400 w-9`}
                                          disabled={currentPage === totalPages}
                                          title="Next"
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
                                                      strokeWidth="2"
                                                      d="M9 5l7 7-7 7"
                                                />
                                          </svg>
                                    </button>
                              </nav>
                        </div>
                  </div>
            </div>
      );
};

export default Pagination;
