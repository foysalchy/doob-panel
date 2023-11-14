import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CatagoryManagement = () => {
  const { data: category = [], refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/admin/category");
      const data = await res.json();
      return data;
    },
  });

  const DeleteCategory = (id) => {

    fetch(`http://localhost:5000/api/v1/admin/category`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("delete successful");
        refetch();
      });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event?.target?.value || "");
  };
  const filteredData = category?.filter((item) =>
    item?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div>


      <Link
        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        to="/admin/manage-category/add-category"
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
          Add New Category
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

      <div className="overflow-x-auto mt-4">
        {filteredData.length ? (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Category Image
                </th>

                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Category Name
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredData.map((cate, index) => (
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <img
                      className="w-10 h-10 rounded object-fill"
                      src={cate.img}
                      alt=""
                    />
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {cate.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <button
                      onClick={() => DeleteCategory(cate._id)}
                      className="inline-block rounded  bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>
    </div>
  );
};

export default CatagoryManagement;
