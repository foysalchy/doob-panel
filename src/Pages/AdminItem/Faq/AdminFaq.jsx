import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateFAQ from "./UpdateFAQ";
import BrightAlert from "bright-alert";
import LoaderData from "../../../Common/LoaderData";

const AdminFaq = () => {
      const [loading, setLoading] = useState(false);
      const { data: faqs = [], refetch, isLoading } = useQuery({
            queryKey: ["faqs_admin"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/faq");
                  const data = await res.json();
                  return data;
            },
      });

      const ActiveHandle = (id) => {
            setLoading(true);

            fetch(`https://doob.dev/api/v1/admin/faq/status/${id}`, {
                  method: "PUT",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        Swal.fire("success", "Your Faq Publish Successfully", "success");
                        refetch();
                  });
      };

      const DeactiveHandle = (id) => {
            fetch(`https://doob.dev/api/v1/admin/faq/unstatus/${id}`, {
                  method: "PUT",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        Swal.fire("success", "Your FAQ Unpublish Successfully", "success");
                        refetch();
                  });
      };
      const DeleteHandle = (id) => {
            fetch(`https://doob.dev/api/v1/admin/faq/delete/${id}`, {
                  method: "Delete",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert({ timeDuration: 3000 });
                        refetch();
                  });
      };

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData = faqs?.filter((item) =>
            item.title?.toLowerCase().includes(searchQuery?.toLowerCase())
      );

      const [OpenModal, setOpenModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenModal(ticketId);
      };

      return (
            <div>
                  <Link
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/admin/faq/add-faq"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="h-5 w-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Add New FAQ
                        </span>
                  </Link>

                  <div className="relative w-3/5 my-6">
                        <input
                              type="text"
                              id="Search"
                              value={searchQuery}
                              onChange={handleSearch}
                              placeholder="Search for..."
                              className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                              <button type="button" className="text-gray-600 hover:text-gray-700">
                                    <span className="sr-only">Search</span>

                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="h-4 w-4 text-black"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                          />
                                    </svg>
                              </button>
                        </span>
                  </div>

                  <section className=" px-4 mx-auto">
                        <h1 className="text-center my-10 font-bold text-2xl">
                              This is Faq List
                        </h1>
                        <div className="flex flex-col mt-6">
                              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                          <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200 divide-gray-700">
                                                      <thead className="bg-gray-50 ">
                                                            <tr>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                                  >
                                                                        <div className="flex items-center gap-x-3">
                                                                              <span>Name</span>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Status</span>
                                                                        </button>
                                                                  </th>

                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                                  >
                                                                        Action
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="bg-white divide-y divide-gray-200 ">
                                                            {
                                                                  isLoading ? (
                                                                        <tr>
                                                                              <td colSpan="3" className="text-center py-8">
                                                                                    <LoaderData />
                                                                              </td>
                                                                        </tr>
                                                                  )
                                                                        :
                                                                        filteredData.length
                                                                              ? filteredData?.map((faq, index) => (
                                                                                    <tr>
                                                                                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                                <div className="inline-flex items-center gap-x-3">
                                                                                                      <div className="w-5/12">
                                                                                                            <h2 className="font-medium text-gray-800  ">
                                                                                                                  {faq?.title
                                                                                                                        .split(" ")
                                                                                                                        .slice(0, 5)
                                                                                                                        .join(" ")}
                                                                                                            </h2>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </td>
                                                                                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                                {faq?.status ? (
                                                                                                      <button
                                                                                                            onClick={() => DeactiveHandle(faq?._id)}
                                                                                                            className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                      >
                                                                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                            <h2 className="text-sm font-normal text-emerald-500">
                                                                                                                  Active
                                                                                                            </h2>
                                                                                                      </button>
                                                                                                ) : (
                                                                                                      <button
                                                                                                            onClick={() => ActiveHandle(faq?._id)}
                                                                                                            className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                      >
                                                                                                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                                                            <h2 className="text-sm font-normal text-red-500">
                                                                                                                  Deactive
                                                                                                            </h2>
                                                                                                      </button>
                                                                                                )}
                                                                                          </td>

                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex items-center gap-x-6">
                                                                                                      <button
                                                                                                            onClick={() => DeleteHandle(faq?._id)}
                                                                                                            className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                                                                      >
                                                                                                            <svg
                                                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                                                  fill="none"
                                                                                                                  viewBox="0 0 24 24"
                                                                                                                  strokeWidth="1.5"
                                                                                                                  stroke="currentColor"
                                                                                                                  className="w-5 h-5"
                                                                                                            >
                                                                                                                  <path
                                                                                                                        strokeLinecap="round"
                                                                                                                        strokeLinejoin="round"
                                                                                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                                                                  />
                                                                                                            </svg>
                                                                                                      </button>
                                                                                                      <button
                                                                                                            onClick={() => handleViewDetails(faq?._id)}
                                                                                                      >
                                                                                                            <BiEdit className="text-xl transition-colors duration-200 text-yellow-500 hover:text-yellow-700 focus:outline-none" />
                                                                                                      </button>
                                                                                                </div>
                                                                                          </td>
                                                                                          {OpenModal === faq?._id && (
                                                                                                <div className="h-0 w-0">
                                                                                                      <UpdateFAQ
                                                                                                            OpenModal={OpenModal}
                                                                                                            refetch={refetch}
                                                                                                            setOpenModal={setOpenModal}
                                                                                                            FAQInfo={faq}
                                                                                                      />
                                                                                                </div>
                                                                                          )}
                                                                                    </tr>
                                                                              ))
                                                                              :
                                                                              <tr>
                                                                                    <td
                                                                                          colSpan="3"
                                                                                          className="py-2 text-center text-gray-500">
                                                                                          No Data Found!
                                                                                    </td>
                                                                              </tr>
                                                            }
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      );
};

export default AdminFaq;
