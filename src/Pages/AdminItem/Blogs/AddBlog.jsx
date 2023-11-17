import React, { useState } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const AddBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);


  const [upload, setUpload] = useState('')
  const [uplodOk, setUploadOk] = useState(false)

  const imageUploading = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", selectedFile);
    const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {

        if (imageData.imageUrl) {
          setUpload(imageData.imageUrl)
          setUploadOk(true)
        }
        else {
          setUpload('')
        }

      });
  }




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




  const dataSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const image = form.photo.files[0];
    const message = form.message.value;
    const MetaImage = upload
    const MetaTag = form.MetaTag.value
    const MetaDescription = form.MetaDescription.value

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;
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
          date: new Date(),
          MetaImage,
          MetaDescription,
          MetaTag
        };
        postBlog(blog, form);
      });
  };

  const postBlog = (blog, form) => {

    fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/new-blog`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("Your Blog Publish Successfully", "", "success");

        form.reset();
        setPreviewUrl("");
        setFileName("");
      });
  };

  return (
    <div >

      <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold text-center">
          Publish a blog for you and next
        </h1>
        <div className="p-10 border-2 rounded m-10">
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
                  type="file" accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                  name="photo"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div>
              <div>
                <JoditEditor name="message" id="message"></JoditEditor>
              </div>
            </div>

            <div>
              <label className="sr-only text-black" htmlFor="title">
                Meta Tag
              </label>
              <input
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Meta Tag"
                type="text"
                id="MetaTag"
                name="MetaTag"
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
              />
            </div>
            <div>
              <label className="sr-only text-black" htmlFor="title">
                Meta Image'
              </label>
              <input
                onChange={imageUploading}
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Meta Description"
                type="file"
                id="MetaImage'"
                name="MetaImage'"
              />
              {uplodOk && 'done'}
            </div>


            <div className="mt-4">
              {
                loading ?
                  <button disabled className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                    <span className="text-sm font-medium">
                      Loading...
                    </span>
                    <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </button>

                  :
                  <button type='submit'
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <BsArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                      Upload Blog
                    </span>
                  </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
