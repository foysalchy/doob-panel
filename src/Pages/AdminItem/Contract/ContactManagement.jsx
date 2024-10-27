import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import LoaderData from "../../../Common/LoaderData";

const ContactManagement = () => {
      const {
            data: contact = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["contact"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/contact"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const DeleteCategory = (id) => {
            fetch(`https://doob.dev/api/v1/admin/contact/${id}`, {
                  method: "DELETE",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        alert("delete successful");

                        refetch();
                  });
      };

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData = contact.filter((item) =>
            item?.media?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      return (
            <div className="w-full">
                  <Link
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/admin/contact/add-contact"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <BiArrowFromLeft />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Add Contact Info
                        </span>
                  </Link>
                  <div className="relative w-3/5 my-6">
                        {!isLoading && (
                              <input
                                    type="text"
                                    id="Search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search for..."
                                    className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                              />
                        )}

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

                  {(
                        <div className="bar overflow-x-auto mt-4">
                              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="text-left">
                                          <tr>
                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                      Media Name
                                                </th>

                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                      Media URL
                                                </th>
                                                <th className="px-4 py-2"></th>
                                          </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                          {isLoading ? (
                                                <tr>
                                                      <td colSpan="3" className="text-center py-8">
                                                            <LoaderData />
                                                      </td>
                                                </tr>
                                          )
                                                :
                                                filteredData.length > 0 ? filteredData.map((media, index) => (
                                                      <tr>
                                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                  {media.media}
                                                            </td>

                                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                  {media.URL}
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 py-2">
                                                                  <button
                                                                        onClick={() => DeleteCategory(media._id)}
                                                                        className="inline-block rounded  bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                ))
                                                      :

                                                      <tr>
                                                            <td colSpan="3" className="text-center py-2 text-gray-500">
                                                                  No Data Found
                                                            </td>
                                                      </tr>
                                          }
                                    </tbody>
                              </table>
                        </div>
                  )}
            </div>
      );
};

export default ContactManagement;
