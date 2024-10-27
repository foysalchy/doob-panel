import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EditService from "./EditService";
import { BsEye } from "react-icons/bs";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
import { BiEdit } from "react-icons/bi";
import { TbRestore } from "react-icons/tb";

const ManageService = () => {
      const {
            data: services = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["admin_services"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/services/all");
                  const data = await res.json();
                  return data;
            },
      });

      const [draft, set_draft] = useState(false);
      const [trash, set_trash] = useState(false);
      const [active, set_active] = useState('all');

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      // const filteredData = !isLoading && services?.length && services?.filter(
      //       (item) =>
      //             item.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      //             item._id.toString().includes(searchQuery)
      // );

      let filteredData = services.length
            ? services.filter((item) => {
                  const matchesBlogType = !draft || item.draft === draft;

                  // Exclude items where `item.draft` is `false`, `null`, or `undefined` when `draft` is not defined or false


                  // Exclude items where `item.trash` is `false`, `null`, or `undefined` when `trash` is not defined or false
                  const matchesTrashType = trash !== 'false' && trash !== null && trash !== undefined
                        ? item.trash === String(trash)
                        : !item.trash; // Show only items where trash is false, null, or undefined if `trash` is not specified

                  const matchesSearchQuery =
                        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item._id.toString().includes(searchQuery);

                  return matchesBlogType && matchesTrashType && matchesSearchQuery;
            })
            : [];

      const ActiveHandle = (id) => {
            fetch(`https://doob.dev/api/v1/admin/service/status/${id}`, {
                  method: "PUT",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        refetch();
                        showAlert("success", "Your Service Publish Successfully", "success");
                  });
      };

      const DeactiveHandle = (id) => {
            fetch(`https://doob.dev/api/v1/admin/service/unstatus/${id}`, {
                  method: "PUT",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        refetch();
                        showAlert("success", "Your Service Unpublish Successfully", "success");
                  });
      };

      const DeleteBlog = (id) => {
            fetch(`https://doob.dev/api/v1/admin/service/delete/${id}`, {
                  method: "DELETE",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        refetch();
                        showAlert("success", "Your Service Delete Successfully", "success");
                  });
      };

      const [OpenModal, setOpenModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenModal(ticketId);
      };


      const blogStash = (id, status) => {
            console.log(status);
            fetch(
                  `https://doob.dev/api/v1/admin/service/trash?id=${id}&status=${status}`,
                  {
                        method: "PUT",
                  }
            ).then(() => {
                  showAlert("Blog Updated Success", "", "success");;
                  refetch();
            });
      };


      return (
            <div className="">
                  <div>
                        <Link
                              className="group relative inline-flex  items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="/admin/services/add-service"
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
                                    Add Service
                              </span>
                        </Link>
                        <button
                              className={`group relative inline-flex items-center bar overflow-hidden rounded px-8 py-3 ml-2 text-white focus:outline-none focus:ring ${draft ? "bg-red-500 active:bg-red-700" : "bg-gray-900 active:bg-gray-900"
                                    }`}
                              onClick={() => set_draft(!draft)}
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
                                    Draft
                              </span>
                        </button>
                        <button
                              className={`group relative inline-flex items-center bar overflow-hidden rounded px-8 py-3 ml-2 text-white focus:outline-none focus:ring ${trash ? "bg-red-500 active:bg-red-700" : "bg-gray-900 active:bg-gray-900"
                                    }`}
                              onClick={() => set_trash(!trash)}
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
                                    Trashed
                              </span>
                        </button>

                  </div>

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

                  <section className=" px-4 ">
                        <div className="flex items-center gap-x-3">
                              <h2 className="text-lg font-medium text-gray-800 ">All Services</h2>
                              <span className="px-3 py-1 text-xs bg-blue-100 rounded-full text-blue-400">
                                    {services?.length}
                              </span>
                        </div>

                        <div className="flex flex-col mt-6 w-full">
                              <div className=" ">
                                    <div className="py-2 pr-10 bar overflow-x-auto">
                                          <div className="relative bar overflow-x-auto shadow-md sm:rounded-lg border border-gray-700 md:rounded-lg">
                                                <table className="w-full divide-y divide-gray-700">
                                                      <thead className="bg-gray-50">
                                                            <tr>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                                                                  >
                                                                        <div className="flex items-center gap-x-3">
                                                                              <span>Name</span>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Category</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Type</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Price</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Status</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                                                                  >
                                                                        Action
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="bg-white divide-y divide-gray-200">
                                                            {isLoading ? (
                                                                  <tr>
                                                                        <td colSpan="6" className="text-center py-8">
                                                                              <LoaderData />
                                                                        </td>
                                                                  </tr>
                                                            ) : filteredData.length > 0 ? (
                                                                  filteredData
                                                                        .sort((a, b) => new Date(b?.timestamp) - new Date(a?.timestamp))
                                                                        .map((service) => (
                                                                              <tr key={service._id}>
                                                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                          <div className="inline-flex items-center gap-x-3">
                                                                                                <div className="flex items-center gap-x-2">
                                                                                                      <img
                                                                                                            className="object-cover w-10 h-10 rounded"
                                                                                                            srcSet={service?.img}
                                                                                                            alt=""
                                                                                                      />
                                                                                                      <div>
                                                                                                            <h2 className="font-medium text-gray-800">
                                                                                                                  {service?.title}
                                                                                                            </h2>
                                                                                                            <p className="text-sm font-normal text-gray-600">
                                                                                                                  {service._id} {service.draft && <span className="text-red-500">(Draft)</span>}
                                                                                                            </p>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    </td>
                                                                                    <td className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                                                          {service.category}
                                                                                    </td>
                                                                                    <td className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                                                          {service.subscriptionPeriod}
                                                                                    </td>
                                                                                    <td className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                                                          {service?.price}
                                                                                    </td>
                                                                                    {service?.status ? (
                                                                                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                                <button
                                                                                                      onClick={() => DeactiveHandle(service?._id)}
                                                                                                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                >
                                                                                                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                      <h2 className="text-sm font-normal text-emerald-500">
                                                                                                            Active
                                                                                                      </h2>
                                                                                                </button>
                                                                                          </td>
                                                                                    ) : (
                                                                                          <td className="px-12 py-4 text-sm font-medium text-red-700 whitespace-nowrap">
                                                                                                <button
                                                                                                      onClick={() => ActiveHandle(service._id)}
                                                                                                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                >
                                                                                                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                                                      <h2 className="text-sm font-normal text-red-500">
                                                                                                            Deactive
                                                                                                      </h2>
                                                                                                </button>
                                                                                          </td>
                                                                                    )}
                                                                                    {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                          <div className="flex items-center gap-x-6">
                                                                                                <button
                                                                                                      onClick={() => DeleteHandle(service._id)}
                                                                                                      className="transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
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
                                                                                                      onClick={() => handleViewDetails(service._id)}
                                                                                                      className="transition-colors duration-200 hover:text-yellow-500 text-yellow-700 focus:outline-none"
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
                                                                                                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                                                                            />
                                                                                                      </svg>
                                                                                                </button>
                                                                                                <Link to={`/service/${service?._id}`}>
                                                                                                      <BsEye className="transition-colors text-xl duration-200 text-green-500 hover:text-green-700 focus:outline-none" />
                                                                                                </Link>
                                                                                          </div>
                                                                                    </td> */}
                                                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                          <div className="flex px-8  items-center gap-2">
                                                                                                {service?.trash === "true" && (
                                                                                                      <button
                                                                                                            onClick={() => DeleteBlog(service._id)}
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
                                                                                                )}
                                                                                                {service.trash === "true" ? (
                                                                                                      <button
                                                                                                            onClick={() => blogStash(service._id, false)}
                                                                                                            className="inline-flex items-center px-3 py-1 rounded gap-x-2 text-xl text-green-600"
                                                                                                      >
                                                                                                            <h2 className=" ">
                                                                                                                  <TbRestore />
                                                                                                            </h2>
                                                                                                      </button>
                                                                                                ) : (
                                                                                                      <button
                                                                                                            onClick={() => blogStash(service._id, true)}
                                                                                                            className="inline-flex items-center px-3 py-1 rounded gap-x-2 "
                                                                                                      >
                                                                                                            <h2 className="text-sm font-normal text-red-500">
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
                                                                                                            </h2>
                                                                                                      </button>
                                                                                                )}
                                                                                                <BiEdit
                                                                                                      onClick={() => handleViewDetails(service._id)}
                                                                                                      className="transition-colors text-xl duration-200 cursor-pointer text-yellow-500 hover:text-yellow-700 focus:outline-none"
                                                                                                />

                                                                                                <Link to={`/blogs/${service._id}`}>
                                                                                                      <BsEye className="transition-colors text-xl duration-200 cursor-pointer text-green-500 hover:text-green-700 focus:outline-none" />
                                                                                                </Link>
                                                                                          </div>
                                                                                    </td>
                                                                                    {OpenModal === service._id && (
                                                                                          <div className="h-0 w-0">
                                                                                                <EditService
                                                                                                      OpenModal={OpenModal}
                                                                                                      refetch={refetch}
                                                                                                      setOpenModal={setOpenModal}
                                                                                                      BlogInfo={service}
                                                                                                />
                                                                                          </div>
                                                                                    )}
                                                                              </tr>
                                                                        ))
                                                            ) : (
                                                                  <tr>
                                                                        <td colSpan="6" className="py-2 text-gray-500 text-center">
                                                                              Data Not Found!
                                                                        </td>
                                                                  </tr>
                                                            )}
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

export default ManageService;
