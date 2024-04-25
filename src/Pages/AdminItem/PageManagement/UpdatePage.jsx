import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const UpdatePage = ({ OpenModal, setOpenModal, FAQInfo, refetch }) => {
  const handleFAQUpdate = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const MetaTag = e.target.MetaTag.value;
    const MetaDescription = e.target.MetaDescription.value;

    const data = {
      title,
      description,
      MetaDescription,
    };

    try {
      fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/admin/page/update-page/${FAQInfo._id}`,
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
          Swal.fire("Update FAQ Successful", "", "success");
          refetch();
          setOpenModal(false);
        });
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
        OpenModal ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-[800px] rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px]">
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
          className="h-[500px] overflow-y-scroll"
          onSubmit={handleFAQUpdate}
        >
          <input
            name="title"
            className="w-full p-2 my-4 border"
            defaultValue={FAQInfo.title}
          />

          <div>
            {/* <label className="sr-only text-black" htmlFor="title">
                            Select Page
                        </label> */}
            <select
              name="page"
              className="w-full rounded-lg border bg-white border-gray-900 p-3 text-sm"
            >
              <option value="footer1">Footer 1</option>
              <option value="footer2">Footer 2</option>
              <option value="solution">Solution</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <br />
          <div>
            <div>
              <JoditEditor
                value={FAQInfo.description}
                name="description"
                id="answer"
              />
            </div>
          </div>

          <input
            name="MetaTag"
            placeholder="Meta Tag"
            className="w-full p-2 my-4 border"
            defaultValue={FAQInfo.metaTag}
          />
          <textarea
            name="MetaDescription"
            placeholder="Meta Description"
            className="w-full p-2 my-4 border"
            defaultValue={FAQInfo.metaDescription}
          />

          <div className="flex justify-start">
            <button
              type="submit"
              className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
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
                Update Page
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
