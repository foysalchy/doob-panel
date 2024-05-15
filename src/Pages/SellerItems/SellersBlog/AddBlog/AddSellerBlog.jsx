import JoditEditor from "jodit-react";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link, useBlocker, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import { quillModules } from "../../../quillModule";

const AddSellerBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const { shopInfo, user } = useContext(AuthContext);
  const [messageData, setMessage] = useState("");
  const [draft, setDraft] = useState(false);
  const navigate = useNavigate();

  const { data: category = [], refetch } = useQuery({
    queryKey: ["blog-category"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/blog-category?shopId=${shopInfo.shopId}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  // ! for drafts
  const [formData, setFormData] = useState({
    title: "", ///done
    category: "", //done
    MetaTag: "", //done
    message: "", //done
    MetaDescription: "", //done
    img: "", //done
    MetaImage: "", //done
    draft
  });
  const [draftSaved, setDraftSaved] = useState(false);

  const [upload, setUpload] = useState("");
  const [uplodOk, setUploadOk] = useState(false);

  const imageUploading = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", selectedFile);
    const url = `https://backend.doob.com.bd/api/v1/image/upload-image?shopId=${shopInfo._id}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.imageUrl) {
          setUpload(imageData.imageUrl);
          setUploadOk(true);
        } else {
          setUpload("");
        }
      });
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  //! for drafts
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Block navigating elsewhere when data has been entered into the input
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      draftSaved && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    const isFormDataEmpty = Object.values(formData).every(
      (value) => value === ""
    );
    setDraftSaved(!isFormDataEmpty);
  }, [formData]);

  useEffect(() => {
    if (blocker.state === "blocked") {
      console.log("yess");
      // event.preventDefault();
      // event.returnValue = ""; // Required for some browsers
      const confirmed = window.confirm(
        "Are you sure you want to leave? Your changes may not be saved."
      );
      if (confirmed) {
        const draftsAddBlogData = {
          ...formData,
          // status: "drafts",
          email: user?.email,
          draft: true,
        };
        // postPage(draftsAddBlogData, "");
        // console.log(draftsAddBlogData);
        fetch(`https://backend.doob.com.bd/api/v1/seller/blog`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(draftsAddBlogData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            setLoading(false);
            Swal.fire("Drafts Saved", "", "success");
            blocker.proceed();
          });

        // blocker.proceed();
      } else {
        blocker.proceed();
      }
    }
  }, [draftSaved, blocker]);

  const dataSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const category = form.category.value;
    const image = form.photo.files[0];
    const message = form?.message?.value;
    const shop = shopInfo?.shopId;
    const MetaTag = form.MetaTag.value;
    const MetaDescription = form.MetaDescription.value;

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://backend.doob.com.bd/api/v1/image/upload-image?shopId=${shopInfo._id}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const image = imageData.imageUrl;
        const blog = {
          title,
          message,
          img: image,
          shop,
          category,
          date: new Date(),
          MetaImage: image,
          MetaTag,
          status: true,
          MetaDescription,
          draft
        };
        postBlog(blog, form);
      });
  };

  const postBlog = (blog, form) => {
    fetch(`https://backend.doob.com.bd/api/v1/seller/blog`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("Your Blog Upload Successfully", "", "success");

        form.reset();
        setPreviewUrl("");
        setFileName("");
        // navigate(`/seller/manage-blogs`);
      });
  };

  return (
    <div className="  ">
      <h1 className="text-2xl font-bold text-center">
        Publish a blog for you and next
      </h1>
      <div className=" border-2 p-4 rounded md:m-10 m-0">
        <form onSubmit={dataSubmit} className="space-y-4 ">
          <div>
            <label className="sr-only text-black" htmlFor="title">
              Blog Title
            </label>
            <input
              required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Title"
              type="text"
              id="title"
              name="title"
              onChange={(e) => handleInputChange("title", e.target.value)} // for drafts
            />
          </div>
          <div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  srcSet={previewUrl}
                  alt="File Preview"
                  className="mt-2 w-8 h-8"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
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
          <div>
            <select
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              name="category"
              onChange={(e) => handleInputChange("category", e.target.value)}
              id=""
            >
              {category?.map((cat) => (
                <option key={cat?.slag} value={cat.slag}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="jodit-editor">
            <JoditEditor
              id="message"
              // onChange={handleDescriptionChange}
              name="message"

              config={{
                readonly: false,
                uploader: {
                  insertImageAsBase64URI: true,
                },
              }}
            />


          </div>

          <div>
            <label className="sr-only text-black " htmlFor="title">
              Meta Tag
            </label>
            <input
              required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Meta Tag"
              type="text"
              id="MetaTag"
              name="MetaTag"
              onChange={(e) => handleInputChange("MetaTag", e.target.value)} // for drafts
            />
          </div>

          <div>
            <label className="sr-only text-black" htmlFor="title">
              Meta Description
            </label>
            <textarea
              required
              onChange={(e) =>
                handleInputChange("MetaDescription", e.target.value)
              } // for drafts
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Meta Description"
              type="text"
              id="MetaDescription"
              name="MetaDescription"
            />
          </div>
          {/* <div>
            <label className="sr-only text-black" htmlFor="title">
              Meta Image'
            </label>
            <input
              // onChange={imageUploading}
              required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Meta Description"
              type="file"
              id="MetaImage'"
              name="MetaImage'"
            />
          </div> */}

          <div className="mt-4">
            {loading ? (
              <button
                disabled
                className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
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
                onClick={() => setDraft(false)}
                type="submit"
                className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <BsArrowRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Upload Blog
                </span>
              </button>
            )}

            <button
              onClick={() => setDraft(true)}
              type="submit"
              className="group relative ml-3 inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
            >
              <span className="absolute  -end-full transition-all group-hover:end-4">
                <BsArrowRight />
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">
                Save Trash
              </span>
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};
export default AddSellerBlog;
