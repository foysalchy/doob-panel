import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import showAlert from "../../../Common/alert"

const EditBlog = ({ OpenModal, setOpenModal, BlogInfo, refetch }) => {
  const [previewUrl, setPreviewUrl] = useState(BlogInfo.img);

  console.log(BlogInfo);
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
  const { data: blogCategories = [] } = useQuery({
    queryKey: ["blogcategory"],
    queryFn: async () => {
      const res = await fetch(
        "https://doob.dev/api/v1/admin/blog-category"
      );
      const data = await res.json();
      return data;
    },
  });
  const handleFileChange = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://doob.dev/api/v1/image/upload-image",
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
  const [upload, setUpload] = useState(BlogInfo?.MetaImage ?? "");
  const [uplodOk, setUploadOk] = useState(false);

  const imageUploading = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", selectedFile);
    const url = `https://doob.dev/api/v1/image/upload-image`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData);
        if (imageData.imageUrl) {
          setUpload(imageData.imageUrl);
          // setFormData({ ...formData, MetaImage: imageData.imageUrl });
          setUploadOk(true);
        } else {
          setUpload("");
        }
      });
  };

  // useEffect(() => {
  //   setUpload(BlogInfo?.MetaImage);
  // },[BlogInfo?.MetaImage]);
  console.log(upload);
  const handleBlogUpdate = async (e) => {
    e.preventDefault();

    const img = previewUrl;
    const title = e.target.title.value;
    const message = e.target.message.value;
    const category = e.target.category.value;
    const MetaTag = e.target.MetaTag.value;
    const MetaDescription = e.target.MetaDescription.value;
console.log(category,'category')
    const data = {
      img,
      title,
      message,
      MetaTag,
      category,
      MetaDescription,
      MetaImage: upload,
    };

    // console.log(data);
    try {
      const response = await fetch(
        `https://doob.dev/api/v1/admin/blog/update-blog/${BlogInfo._id}`,
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
      <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px]">
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
          className="h-[500px] text-start overflow-scroll"
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
                srcSet={previewUrl}
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
          <div className="relative mb-4">
              <select
                type="text"
                id="Category"
                name="category"
                // onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                placeholder="Select a category"
              defaultValue={BlogInfo.category}
              >
                <option disabled>Select Blog Category</option>
                {blogCategories?.length &&
                  blogCategories?.map((category, i) => (
                    <option key={category.title} value={category.title}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>

          <div>
            <div>
              <JoditEditor
                id="message "
                name="message"
                value={BlogInfo.message}
                config={{
                  readonly: false,
                  uploader: {
                    insertImageAsBase64URI: true,
                  },
                }}
              />
              {/* <ReactQuill
                name="message"
                id="message"
                className="h-36"
                // value={message}
                modules={modules}
                placeholder="Enter description here..."
              /> */}

              {/* <JoditEditor value={BlogInfo.message} /> */}
            </div>
          </div>

          <div>
            <input
              name="MetaTag"
              className="w-full p-2 my-4 border"
              defaultValue={BlogInfo.MetaTag}
            />
          </div>
          <textarea
            className="w-full border p-2"
            defaultValue={BlogInfo.MetaDescription}
            name="MetaDescription"
            id=""
            cols="20"
            rows="2"
          ></textarea>
          <label className="sr-only text-black" htmlFor="MetaImage">
            Meta Image
          </label>
          <div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
            >
              <img
                srcSet={upload}
                src={upload || BlogInfo.upload}
                alt="File Preview"
                className="mt-2 w-8 h-8"
              />
              <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                {upload.slice(25)}
              </h2>
            </label>
            <input
              onChange={imageUploading}
              // required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Meta Description"
              type="file"
              id="MetaImage'"
              name="MetaImage'"
            // defaultValue={
            //   restoreDrafts && draftsBlogData?.MetaImage
            //     ? draftsBlogData?.MetaImage
            //     : ""
            // }
            />
          </div>

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

export default EditBlog;
