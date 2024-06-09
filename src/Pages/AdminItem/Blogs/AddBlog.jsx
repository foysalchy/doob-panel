import React, { useCallback, useContext, useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { useBlocker } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import { AuthContext } from "../../../AuthProvider/UserProvider";

const AddBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(false);

  const [upload, setUpload] = useState("");
  const [uplodOk, setUploadOk] = useState(false);

  // // ! for drafts
  // const [formData, setFormData] = useState({
  //   title: "", ///done
  //   category: "", //done
  //   MetaTag: "", //done
  //   message: "", //done
  //   MetaDescription: "", //done
  //   img: "", //done
  //   MetaImage: "", //done
  // });
  const [draftSaved, setDraftSaved] = useState(false);
  const [restoreDrafts, setRestoreDrafts] = useState(false);

  const { user } = useContext(AuthContext);

  const { data: blogsData = [], refetch: reftechDraft } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(
        "https://doob.dev/api/v1/admin/all-blogs"
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: blogCategories = [], refetch } = useQuery({
    queryKey: ["blogcategory"],
    queryFn: async () => {
      const res = await fetch(
        "https://doob.dev/api/v1/admin/blog-category"
      );
      const data = await res.json();
      return data;
    },
  });

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
        if (imageData.imageUrl) {
          setUpload(imageData.imageUrl);
          // setFormData({ ...formData, MetaImage: imageData.imageUrl });
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
        setFormData({ ...formData, img: imageData.imageUrl });
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const dataSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const category = form.category.value;
    const message = form.message.value;
    const image = form.photo.files[0];
    const MetaImage = upload;
    const MetaTag = form.MetaTag.value;
    const MetaDescription = form.MetaDescription.value;
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
        const blog = {
          title,
          category,
          message,
          img: image,
          date: new Date(),
          MetaImage,
          status: !draft,
          trash: false,
          MetaDescription,
          MetaTag,
          draft_status: draft,
        };

        console.log("Blogs:::::::", blog);
        postBlog(blog, form);
      });
  };

  const postBlog = (blog, form) => {
    fetch(`https://doob.dev/api/v1/admin/new-blog`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        reftechDraft();
        setLoading(false);
        Swal.fire("Your Blog Publish Successfully", "", "success");
        // blocker.proceed();
        form.reset();
        setPreviewUrl("");
        setFileName("");
        window.location.href = "/admin/blog";
      });
  };

  //! for drafts
  // const handleInputChange = (field, value) => {
  //   setFormData({ ...formData, [field]: value });
  // };

  // Block navigating elsewhere when data has been entered into the input
  // let blocker = useBlocker(
  //   ({ currentLocation, nextLocation }) =>
  //     draftSaved && currentLocation.pathname !== nextLocation.pathname
  // );

  // useEffect(() => {
  //   const isFormDataEmpty = Object.values(formData).every(
  //     (value) => value === ""
  //   );
  //   setDraftSaved(!isFormDataEmpty);
  // }, [formData]);

  // useEffect(() => {
  //   if (draftsAllBlogData?.length && !restoreDrafts) {
  //     // Check if restoreDrafts is false
  //     const confirmedRestore = window.confirm("Restore your drafts");
  //     if (confirmedRestore) {
  //       setRestoreDrafts(true);
  //       if (draftsBlogData?.message) {
  //         setMessage(draftsBlogData?.message);
  //       }
  //     }
  //   }
  // }, [draftsAllBlogData, restoreDrafts]);

  // useEffect(() => {
  //   if (blocker.state === "blocked") {
  //     console.log("yess");
  //     // event.preventDefault();
  //     // event.returnValue = ""; // Required for some browsers
  //     const confirmed = window.confirm(
  //       "Are you sure you want to leave? Your changes may not be saved."
  //     );
  //     if (confirmed) {
  //       Swal.fire("Drafts Saved", "", "success");

  //       const draftsAddBlogData = {
  //         ...formData,
  //         status: "drafts",
  //         email: user?.email,
  //         date: new Date(),
  //       };
  //       postBlog(draftsAddBlogData, "");
  //       console.log(draftsAddBlogData);

  //       // blocker.proceed();
  //     } else {
  //     }
  //   }
  // }, [draftSaved, blocker]);

  // console.log(formData);
  // console.log(draftsBlogData);
  // console.log(blocker);

  return (
    <div>
      <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        {/* Your form inputs */}
        <h1 className="text-2xl font-bold text-center">
          Publish a blog for your and next ...
        </h1>

        <br />
        <br />
        {/* <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        /> */}
        {/* {blocker.state === "blocked" ? (
          <div>
            <p>Are you sure you want to leave?</p>
            <button onClick={() => blocker.proceed()}>Proceed</button>
            <br />
            <button onClick={() => blocker.reset()}>Cancel</button>
          </div>
        ) : null} */}
        <div className="py-10 md:px-10 px-0 border-2 rounded m-10">
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
              // defaultValue={
              //   restoreDrafts && draftsBlogData?.title
              //     ? draftsBlogData?.title
              //     : ""
              // }
              // onChange={(e) => handleInputChange("title", e.target.value)} // for drafts
              />
            </div>
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
              >
                {previewUrl ? (
                  <img
                    srcSet={previewUrl}
                    src={previewUrl}
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

            <div className="relative mt-1.5">
              <select
                type="text"
                id="Category"
                name="category"
                // onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                placeholder="Select a category"
              // defaultValue={
              //   (restoreDrafts && draftsBlogData?.category)
              //     ? draftsBlogData?.category
              //     : ""
              // }
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
                  name="message"
                  id="message"
                  config={{
                    readonly: false,
                    uploader: {
                      insertImageAsBase64URI: true,
                    },
                  }}
                ></JoditEditor>
              </div>
              <br />
              <br />
            </div>

            <div>
              <label className="sr-only text-black" htmlFor="title">
                Meta Tag
              </label>
              <input
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Meta Tag"
                // onChange={(e) => handleInputChange("MetaTag", e.target.value)} // for drafts
                type="text"
                id="MetaTag"
                name="MetaTag"
              // defaultValue={
              //   restoreDrafts && draftsBlogData?.MetaTag
              //     ? draftsBlogData?.MetaTag
              //     : ""
              // }
              />
            </div>

            <div>
              <label className="sr-only text-black" htmlFor="title">
                Meta Description
              </label>
              <textarea
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Meta Description"
                type="text"
                id="MetaDescription"
                name="MetaDescription"
              // onChange={(e) =>
              // handleInputChange("MetaDescription", e.target.value)
              // } // for drafts
              // defaultValue={
              //   restoreDrafts && draftsBlogData?.MetaDescription
              //     ? draftsBlogData?.MetaDescription
              //     : ""
              // }
              />
            </div>
            <div>
              <label className="sr-only text-black" htmlFor="title">
                Meta Image
              </label>
              <input
                onChange={imageUploading}
                required
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
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <BsArrowRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Save to Draft
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
