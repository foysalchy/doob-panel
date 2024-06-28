import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React from "react";
import { useState } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";

const BlogsCatagoryManagement = () => {
  const { data: category = [], refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/blog-category");
      const data = await res.json();
      return data;
    },
  });

  const DeleteCategory = (id) => {
    fetch(`https://doob.dev/api/v1/admin/blog-category`, {
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

  const [openModal, setOpenModal] = useState(false);

  const uploadImage = async (formData) => {
    const url = `https://doob.dev/api/v1/image/upload-image`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imageData = await response.json();
    return imageData.imageUrl;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.name.value;
    const image = form.image;

    const imageFormData = new FormData();
    imageFormData.append("image", image.files[0]);
    const imageUrl = await uploadImage(imageFormData);

    const data = {
      id: openModal._id,
      title: title,
      img: image.files[0] ? imageUrl : openModal.img,
    };

    fetch(`https://doob.dev/api/v1/admin/blog-category-details`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });

    console.log(data, category);
    setOpenModal(false);
  };

  return (
    <div>
      <Link
        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        to="/admin/add-blog-category"
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
          Add New Blog Category
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
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredData.map((cate, index) => (
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <img
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
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => DeleteCategory(cate._id)}
                        className="inline-block rounded  bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => setOpenModal(cate)}
                        className="inline-block rounded ml-4 bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <Link
                        to={`/blogs#${cate?.title}`}
                        className="inline-block rounded px-4 text-xs font-medium text-green-600  "
                      >
                        <RxEyeOpen className="text-xl" />
                      </Link>
                    </div>
                  </td>

                  <div>
                    <div
                      className={`fixed z-[100] flex items-center justify-center ${
                        openModal ? "opacity-1 visible" : "invisible opacity-0"
                      } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                    >
                      <form
                        onSubmit={handleUpdate}
                        className={`absolute w-[500px] rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${
                          openModal
                            ? "scale-1 opacity-1 duration-300"
                            : "scale-0 opacity-0 duration-150"
                        } `}
                      >
                        <svg
                          onClick={() => setOpenModal(false)}
                          className="mx-auto mr-0 w-8 cursor-pointer"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g strokeWidth="0"></g>
                          <g strokeLinecap="round" strokeLinejoin="round"></g>
                          <g>
                            <path
                              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                              fill="#000"
                            ></path>
                          </g>
                        </svg>
                        <h1 className="mb-2 text-xl font-semibold">
                          Edit Blog Category
                        </h1>
                        <br />
                        <div className="flex flex-col">
                          <label className="text-start" htmlFor="name">
                            Name
                          </label>
                          <input
                            className="w-full px-2 py-2 border border-gray-200 rounded-sm"
                            type="text"
                            name="name"
                            defaultValue={openModal?.title}
                          />
                        </div>
                        <div className="flex flex-col mt-2">
                          <labe className="text-start" htmlFor="image">
                            Photo
                          </labe>
                          <input
                            className="w-full px-2 py-2 mt-2 mb-4 border border-gray-200 rounded-sm"
                            type="file"
                            name="image"
                          />
                        </div>

                        <div className="flex justify-start">
                          <button
                            type="submit"
                            className="me-2 rounded-sm bg-blue-700 px-8 py-2 text-white"
                          >
                            Save
                          </button>
                        </div>
                      </form>
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

export default BlogsCatagoryManagement;
