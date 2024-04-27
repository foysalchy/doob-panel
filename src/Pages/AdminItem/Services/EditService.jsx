import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const EditService = ({ OpenModal, setOpenModal, BlogInfo, refetch }) => {
  const [previewUrl, setPreviewUrl] = useState(BlogInfo.img);

  const handleFileChange = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://backend.doob.com.bd/api/v1/image/upload-image",
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

  const handleBlogUpdate = async (e) => {
    e.preventDefault();

    const img = previewUrl;
    const title = e.target.title.value;
    const message = e.target.message.value;
    const MetaTag = e.target.MetaTag.value;
    const MetaDescription = e.target.MetaDescription.value;

    const data = { img, title, message, MetaTag, MetaDescription };

    try {
      const response = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/service/update-service/${BlogInfo._id}`,
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
          Swal.fire("Update Blog Successful", "", "success");
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
            className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <form
          className="h-[500px] overflow-y-scroll"
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

          <div>
            <div>
              <JoditEditor
                value={BlogInfo.message}
                name="message"
                id="message"
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
                Update Blog
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;
