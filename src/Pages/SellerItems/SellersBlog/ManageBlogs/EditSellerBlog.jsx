import JoditEditor from "jodit-react";
import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import showAlert from "../../../../Common/alert";
const EditSellerBlog = ({ OpenModal, setOpenModal, BlogInfo, refetch }) => {
      const [previewUrl, setPreviewUrl] = useState(BlogInfo.img);
      const { shopInfo } = useContext(AuthContext)
      const handleFileChange = async (event) => {
            const image = event.target.files[0];
            const formData = new FormData();
            formData.append("image", image);

            try {
                  const response = await fetch(
                        `https://doob.dev/api/v1/image/upload-image/?shopId=${shopInfo._id}`,
                        {
                              method: "POST",
                              body: formData,
                        }
                  );

                  const imageData = await response.json();
                  setPreviewUrl(imageData.imageUrl);
            } catch (error) {
                  console.error("Error uploading image:", error);
            }
      };
      const { data: category = [] } = useQuery({
            queryKey: ["blog-category"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/blog-category?shopId=${shopInfo.shopId}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const handleBlogUpdate = async (e) => {
            e.preventDefault();

            const img = previewUrl;
            const title = e.target.title.value;
            const category = e.target.category.value;
            const message = e.target.message.value;
            const MetaTag = e.target.MetaTag.value;
            const MetaDescription = e.target.MetaDescription.value;
            const data = { img, title, category, message, MetaTag, MetaDescription };

            try {
                  const response = await fetch(
                        `https://doob.dev/api/v1/seller/blog/update-blog/${BlogInfo._id}`,
                        {
                              method: "PUT",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(data),
                        }
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              showAlert("Update Blog Successful", "", "success");
                              refetch();
                              setOpenModal(false);
                        });
            } catch (error) {
                  console.error("Error updating blog:", error);
            }
      };

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] ">
                        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
                              <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                                    Edit Blog
                              </div>
                              <div
                                    onClick={() => setOpenModal(!OpenModal)}
                                    className="cursor-pointer bg-gray-500 flex justify-center items-center rounded-full p-2.5 mb-2  text-2xl hover:text-red-500"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>

                        <form
                              className="h-[500px] bar overflow-y-scroll text-start"
                              onSubmit={handleBlogUpdate}
                        >
                              <input
                                    name="title"
                                    className="w-full p-2 my-4 border"
                                    defaultValue={BlogInfo.title}
                              />

                              <div className="mb-4">
                                    <label
                                          htmlFor="dropzone-file"
                                          className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
                                    >
                                          <img
                                                srcSet={previewUrl || BlogInfo.img}
                                                src={previewUrl || BlogInfo.img}
                                                alt="File Preview"
                                                className="mt-2 w-8 h-8"
                                          />
                                          <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                                                {previewUrl.slice(25)}
                                          </h2>
                                          <input
                                                id="dropzone-file"
                                                type="file"
                                                accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                                name="photo"
                                                className="hidden"
                                                onChange={handleFileChange}
                                          />
                                    </label>
                              </div>
                              <div className="mb-4">
                                    <select
                                          className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                          name="category"
                                          // onChange={(e) => handleInputChange("category", e.target.value)}
                                          id="category"
                                          defaultValue={BlogInfo.category}
                                    >
                                          {category?.map((cat) => (
                                                <option key={cat?.slag} value={cat.slag}>
                                                      {cat.title}
                                                </option>
                                          ))}
                                    </select>
                              </div>



                              <div>
                                    <div className="jodit-editor">
                                          <JoditEditor
                                                value={BlogInfo.message}
                                                name="message"
                                                id="message"
                                                config={{
                                                      readonly: false, height: 200, resizable: true,
                                                      askBeforePasteHTML: false,
                                                      uploader: {
                                                            insertImageAsBase64URI: true,
                                                      }
                                                }}
                                          />
                                    </div>
                              </div>

                              <input
                                    name="MetaTag"
                                    className="w-full p-2 my-4 border"
                                    defaultValue={BlogInfo.MetaTag}
                              />
                              <textarea
                                    className="w-full border p-2"
                                    defaultValue={BlogInfo.MetaDescription}
                                    name="MetaDescription"
                                    id=""
                                    cols="20"
                                    rows="2"
                              ></textarea>

                              <div className="flex justify-start">
                                    <button
                                          type="submit"
                                          className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
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
                                                Update Blog
                                          </span>
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default EditSellerBlog;
