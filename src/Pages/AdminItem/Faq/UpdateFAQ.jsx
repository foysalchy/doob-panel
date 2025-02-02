import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert";

const UpdateFAQ = ({ OpenModal, setOpenModal, FAQInfo, refetch }) => {
      const modules = {
            toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
            ],
      };
      const handleFAQUpdate = async (e) => {
            e.preventDefault();

            const title = e.target.title.value;
            const description = e.target.description.value;
            const sortIndex = e.target.sortIndex.value;
            const MetaTag = e.target.MetaTag.value;
            const MetaDescription = e.target.MetaDescription.value;

            const data = {
                  title,
                  description,
                  sortIndex,
                  MetaTag,
                  MetaDescription,
            };

            try {
                  const response = await fetch(
                        `https://doob.dev/api/v1/admin/faq/update-faq/${FAQInfo._id}`,
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
                              showAlert("Update FAQ Successful", "", "success");
                              refetch();
                              setOpenModal(false);
                        });
            } catch (error) {
                  console.error("Error updating FAQ:", error);
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
                                    Update FAQ
                              </div>
                              <div
                                    onClick={() => setOpenModal(!OpenModal)}
                                    className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>

                        <form
                              className="h-[500px] bar overflow-y-scroll text-start px-4"
                              onSubmit={handleFAQUpdate}
                        >
                              <input
                                    name="title"
                                    className="w-full p-2 my-4 border"
                                    defaultValue={FAQInfo.title}
                              />

                              <div>
                                    <JoditEditor
                                          className="h-36"
                                          name="description"
                                          value={FAQInfo.description}
                                          id="message"
                                          config={{
                                                readonly: false, height: 200, resizable: true,
                                                askBeforePasteHTML: false,
                                                uploader: {
                                                      insertImageAsBase64URI: true,
                                                },
                                          }}
                                    ></JoditEditor>
                              </div>
                              <br />
                              <div>
                                    <label className="sr-only text-black" htmlFor="sortIndex">
                                          Sort Index
                                    </label>
                                    <input
                                          required
                                          defaultValue={FAQInfo.sortIndex}
                                          className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                          placeholder="Sort Index"
                                          type="number"
                                          id="sortIndex"
                                          name="sortIndex"
                                    />
                              </div>

                              <input
                                    name="MetaTag"
                                    placeholder="Meta Tag"
                                    className="w-full p-2 my-4 border"
                                    defaultValue={FAQInfo.MetaTag}
                              />
                              <textarea
                                    name="MetaDescription"
                                    placeholder="Meta Description"
                                    className="w-full p-2 my-4 border"
                                    defaultValue={FAQInfo.MetaTag}
                              />

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
                                                Update FAQ
                                          </span>
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default UpdateFAQ;
