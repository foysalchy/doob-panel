import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BrightAlert from 'bright-alert';
import showAlert from "../../../Common/alert";

const ServiceReview = () => {
      const [searchQuery, setSearchQuery] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 15; // Define how many items you want per page

      const {
            data: services = [],
            isLoading,
            refetch,
      } = useQuery({
            queryKey: ["admin_services"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/services");
                  const data = await res.json();
                  return data;
            },
      });

      const service_review = services.flatMap((service) =>
            (service.reviews || []).map(review => ({
                  ...review,
                  service_id: service._id,
                  service_name: service.title
            }))
      );


      // Filter reviews based on search query
      const filteredReviews = service_review.filter((review) =>
            review.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Calculate total pages
      const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

      // Get the reviews for the current page
      const currentReviews = filteredReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
            setCurrentPage(1); // Reset to first page on search
      };

      const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
      };


      const delete_review = (service_id, timestamp) => {
            fetch(`https://doob.dev/api/v1/admin/service/review/delete_review?service_id=${service_id}&timestamp=${timestamp}`, {
                  method: "DELETE",
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        refetch();
                        showAlert("Your Review Delete Successfully", "", "success");
                  });
      };


      return (
            <div>
                  <div className="py-6 bg-white rounded-t-md ">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                              <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                          <p className="text-xl font-bold text-gray-900">Service Review</p>

                                    </div>
                                    <div className="">
                                          <fieldset className="w-[300px]  space-y-1 text-gray-800">
                                                <div className="relative  ">
                                                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                            <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                                                  <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
                                                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                                                  </svg>
                                                            </button>
                                                      </span>
                                                      <input value={searchQuery}
                                                            onChange={handleSearch}
                                                            type="search" name="Search" placeholder="Search..." className="w-[300px]  py-2 pl-10 text-sm rounded-md  focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600" />
                                                </div>
                                          </fieldset>
                                    </div>
                              </div>
                              <div className="flex flex-col mt-4 lg:mt-8">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                                                      <thead className="hidden lg:table-header-group">
                                                            <tr>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                                                                        User
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                                                                        Service Name
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Review
                                                                  </th>

                                                                  <th className="py-3.5 px-4 text-left hidden xl:table-cell text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Review Date
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-center hidden xl:table-cell text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        <span className=""> Actions </span>
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentReviews.map((service) => (
                                                                  <tr key={service.timeStamp} className="bg-white ">
                                                                        <td className="px-4 py-4 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                                                                              <div className="flex items-center gap-4 capitalize">
                                                                                    <div className="bg-gray-200 flex justify-center items-center rounded-full w-10 h-10">
                                                                                          {service.user.name.slice(0, 1)}
                                                                                    </div>
                                                                                    {service.user.name}
                                                                              </div>
                                                                        </td>
                                                                        <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                              {service.service_name.slice(0, 50)}
                                                                        </td>
                                                                        <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                              {service.text.slice(0, 50)}
                                                                        </td>

                                                                        <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                                                                              <div className="flex items-center">
                                                                                    <svg
                                                                                          className="w-4 h-4 mr-2 text-gray-400"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          fill="none"
                                                                                          viewBox="0 0 24 24"
                                                                                          stroke="currentColor"
                                                                                          strokeWidth={2}
                                                                                    >
                                                                                          <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                                          />
                                                                                    </svg>
                                                                                    {new Date(service.timeStamp).toDateString()}
                                                                              </div>
                                                                        </td>

                                                                        <td className="  items-center px-4 py-4 lg:table-cell whitespace-nowrap">
                                                                              <div className="flex justify-center items-center space-x-4">

                                                                                    <button
                                                                                          onClick={() => delete_review(service.service_id, service.timeStamp)}
                                                                                          type="button"
                                                                                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                                    >
                                                                                          <svg
                                                                                                className="w-5 h-5 mr-2 -ml-1"
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                fill="none"
                                                                                                viewBox="0 0 24 24"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth={2}
                                                                                          >
                                                                                                <path
                                                                                                      strokeLinecap="round"
                                                                                                      strokeLinejoin="round"
                                                                                                      d="M6 18L18 6M6 6l12 12"
                                                                                                />
                                                                                          </svg>
                                                                                          Remove
                                                                                    </button>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="py-6 bg-gray-50  rounded-b-md">
                        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                              <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                                    <p className="text-sm font-medium text-gray-500">
                                          Showing {currentPage} of {totalPages} out of {service_review.length} results
                                    </p>

                                    <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                          <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                          >
                                                <span className="sr-only"> Previous </span>
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
                                                            strokeWidth={2}
                                                            d="M15 19l-7-7 7-7"
                                                      />
                                                </svg>
                                          </button>
                                          {Array.from({ length: totalPages }, (_, i) => (
                                                <a
                                                      href="#"
                                                      title=""
                                                      className={`"inline-flex items-center justify-center px-3 py-2 text-sm font-bold  border border-gray-900 rounded-md focus:outline-none  w-9" ${currentPage === i + 1 ? "bg-gray-900 text-white " : "text-gray-400 bg-white "}`}
                                                >
                                                      {i + 1}
                                                </a>
                                          ))}

                                          <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                          >
                                                <span className="sr-only"> Next </span>
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
                                                            strokeWidth={2}
                                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                                      />
                                                </svg>
                                          </button>
                                    </nav>
                              </div>
                        </div>
                  </div>


            </div>
      );
};

export default ServiceReview;
