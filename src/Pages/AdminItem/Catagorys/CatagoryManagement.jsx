import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React from "react";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

const CatagoryManagement = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data: category = [], refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/category"
      );
      const data = await res.json();
      return data;
    },
  });

  const DeleteCategory = (id) => {
    fetch(`https://backend.doob.com.bd/api/v1/admin/category`, {
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
  const filteredData =
    category &&
    category?.filter((item) =>
      item?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

  const uploadImage = async (formData) => {
    const url = `https://backend.doob.com.bd/api/v1/image/upload-image`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imageData = await response.json();
    return imageData.imageUrl;
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const image = e.target.image;
    const title = e.target.title.value;

    const imageFormData = new FormData();
    imageFormData.append("image", image.files[0]);
    const imageUrl = await uploadImage(imageFormData);

    const data = {
      title,
      image: imageUrl,
      id: openModal._id,
    };

    fetch(`https://backend.doob.com.bd/api/v1/admin/category-update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert();
        refetch();
      });
  };

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

                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredData.map((cate, index) => (
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <img
                      name="image"
                      className="w-10 h-10 rounded object-fill"
                      srcSet={cate.img}
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
                    <button
                      onClick={() => setOpenModal(cate)}
                      className="inline-block rounded ml-3 bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Edit
                    </button>
                    <Link
                      to={`/services`}
                      className="inline-block rounded ml-3 text-blue-600 px-3 text-lg font-medium  "
                    >
                      <BsEye />
                    </Link>
                  </td>

                  <div>
                    <div
                      onClick={() => setOpenModal(false)}
                      className={`fixed z-[100] flex items-center justify-center ${openModal?._id === cate?._id
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                    >
                      <div
                        onClick={(e_) => e_.stopPropagation()}
                        className={`text- w-[500px] absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?._id === cate?._id
                          ? "scale-1 opacity-1 duration-300"
                          : "scale-0 opacity-0 duration-150"
                          }`}
                      >
                        <form onSubmit={handleEdit} action="">
                          <h1 className="mb-2 text-2xl font-semibold">
                            Edit Category!
                          </h1>
                          <div className="flex flex-col gap-2 bb-3">
                            <label
                              htmlFor="title"
                              className="text-sm font-medium"
                            >
                              Category Name
                            </label>
                            <input
                              name="title"
                              type="text"
                              id="title"
                              className="w-full text-black placeholder:hover:text=black px-4 py-2 rounded-sm border border-gray-300"
                              defaultValue={openModal?.title}
                            />
                          </div>{" "}
                          <br />
                          <div className="flex flex-col gap-2 bb-3">
                            <label
                              htmlFor="img"
                              className="text-sm font-medium"
                            >
                              Photo
                            </label>
                            <input
                              type="file"
                              className="w-full bg-white text-black placeholder:hover:text=black px-4 py-2 rounded-sm border border-gray-300"
                              name="image"
                            />
                          </div>
                          <br />
                          <div className="flex justify-between">
                            <button
                              type="submit"
                              className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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
