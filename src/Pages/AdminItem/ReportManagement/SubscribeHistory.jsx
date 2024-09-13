import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";

import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";

const SubscribeHistory = () => {
  //   const { shopInfo } = useContext(AuthContext);

  const { data: subscriber = [], refetch, isLoading } = useQuery({
    queryKey: ["subscriber"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/admin/get-all-subscribe`
      );
      const data = await res.json();
      return data?.data;
    },
  });

  const DeleteCategory = (id) => {
    fetch(
      `https://doob.dev/api/v1/admin/delete-subscribe?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        showAlert("Subscriber Deleted Successfully", "", "success");
        refetch();
      });
  };

  console.log(subscriber, "subscriber");

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData =
    subscriber.length &&
    subscriber?.filter((item) =>
      item?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

  return (
    <div>
      <div className="relative my-6">
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
      <div className="overflow-x-auto mt-4 pr-10">
        {filteredData?.length > 0 && filteredData.length ? (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left bg-gray-800 rounded-xl">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  Subscriber
                </th>

                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  Time
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  Action
                </th>
                {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  Action
                </th> */}
              </tr>
            </thead>

            <tbody className="divide-y  divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="text-center py-8">
                    <LoaderData />
                  </td>
                </tr>
              )
                :
                filteredData?.map((subscrib, index) => {
                  const timestamp = 1715791630755;
                  const date = new Date(subscrib?.dateTime);

                  const year = date.getFullYear();
                  const month = date.getMonth() + 1; // Months are zero-based
                  const day = date.getDate();
                  return (
                    <tr key={subscrib?._id}>
                      <td className="whitespace-nowrap  px-4 py-2 font-medium text-gray-900">
                        {subscrib.email}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {`Year: ${year}, Month: ${month}, Day: ${day}`}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() => DeleteCategory(subscrib._id)}
                          className="inline-block rounded  bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>
    </div>
  );
};

export default SubscribeHistory;
