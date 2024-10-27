import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert"

const AddBlogsCatagorys = () => {
      const [selectedFile, setSelectedFile] = useState(null);
      const [preDeleteUrl, setPreDeleteUrl] = useState(null);
      const [fileName, setFileName] = useState("");
      const [loading, setLoading] = useState(false);

      const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);

            if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setPreDeleteUrl(reader.result);
                  };
                  reader.readAsDataURL(file);
                  setFileName(file.name);
            }
      };

      const dataSubmit = (event) => {
            setLoading(true);
            event.preventDefault();
            const form = event.target;
            const title = form.categoryName.value;
            const image = form.photo.files[0];

            const formData = new FormData();
            formData.append("image", image);
            const url = `https://doob.dev/api/v1/image/upload-image`;
            fetch(url, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((imageData) => {
                        const image = imageData.imageUrl;
                        const category = {
                              title,
                              img: image,
                        };
                        PostCategory(category, form);
                  });
      };

      const PostCategory = (category, form) => {
            fetch(`https://doob.dev/api/v1/admin/blog-category`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(category),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        showAlert("Category Added Success", "", "success");

                        form.reset();
                        setPreDeleteUrl("");
                        setFileName("");
                        refetch();
                  });
      };

      return (
            <div className="w-full">
                  <div className="my-10">
                        <h1 className="text-2xl font-bold text-center">
                              Publish a Blog Category for you and next
                        </h1>
                        <div className="p-10 border-2  rounded m-10">
                              <form onSubmit={dataSubmit} className="w-full ">
                                    <div>
                                          <label className="sr-only text-black" htmlFor="title">
                                                Category Name
                                          </label>
                                          <input
                                                required
                                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                                placeholder="Category Name"
                                                type="text"
                                                id="title"
                                                name="categoryName"
                                          />
                                    </div>

                                    <div>
                                          <label
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
                                          >
                                                {preDeleteUrl ? (
                                                      <img
                                                            srcSet={preDeleteUrl}
                                                            alt="File PreDelete"
                                                            className="mt-2 w-8 h-8"
                                                      />
                                                ) : (
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            DeleteBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-8 h-8 text-gray-500 "
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                            />
                                                      </svg>
                                                )}
                                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                                                      {fileName ? fileName : " Upload Picture"}
                                                </h2>
                                                <p className="mt-2 text-xs tracking-wide text-gray-500 ">
                                                      Upload Your Photo Only.
                                                </p>
                                                <input
                                                      required
                                                      id="dropzone-file"
                                                      type="file"
                                                      accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                                      name="photo"
                                                      className="hidden"
                                                      onChange={handleFileChange}
                                                />
                                          </label>
                                    </div>

                                    <div className="mt-4">
                                          {loading ? (
                                                <button
                                                      disabled
                                                      className="group relative cursor-not-allowed inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                                                >
                                                      <span className="text-sm font-medium">Loading...</span>
                                                      <svg
                                                            className="animate-spin h-4 w-4 ml-3 text-white"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <circle
                                                                  cx="12"
                                                                  cy="12"
                                                                  r="10"
                                                                  stroke="currentColor"
                                                                  strokeWidth="4"
                                                            />
                                                      </svg>
                                                </button>
                                          ) : (
                                                <button
                                                      type="submit"
                                                      className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                                                >
                                                      <span className="absolute -end-full transition-all group-hover:end-4">
                                                            <BsArrowRight />
                                                      </span>

                                                      <span className="text-sm font-medium transition-all group-hover:me-4">
                                                            Add Blog Category
                                                      </span>
                                                </button>
                                          )}
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default AddBlogsCatagorys;
