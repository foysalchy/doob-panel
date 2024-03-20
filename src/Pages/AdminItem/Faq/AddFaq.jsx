import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddFaq = () => {
  const [loading, setLoading] = useState(false);
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };
  const dataSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const sortIndex = form.sortIndex.value; // Get the sort index value
    const faq = {
      title,
      description,
      sortIndex, // Include sort index in the FAQ object
    };

    fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/newfaq`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(faq),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("success", "Your Blog Publish Successfully", "success");
        form.reset();
      });
  };

  return (
    <div>
      <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold text-center">
          Publish a blog for you and next
        </h1>
        <div className="p-10 border-2 rounded m-10">
          <form onSubmit={dataSubmit} className="space-y-4">
            <div>
              <label className="sr-only text-black" htmlFor="title">
                Faq Title
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
              <div>
                <ReactQuill

                  className="h-36"
                  name="description" id="message"
                  modules={modules}
                  placeholder="Enter description here..."
                />
                <br />
                <br />
                {/* <JoditEditor></JoditEditor> */}
              </div>
            </div>
            <div>
              <label className="sr-only text-black" htmlFor="sortIndex">
                Sort Index
              </label>
              <input
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Sort Index"
                type="number"
                id="sortIndex"
                name="sortIndex"
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
                  type="submit"
                  className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <BsArrowRight />
                  </span>
                  <span className="text-sm font-medium transition-all group-hover:me-4">
                    Add FAQ
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

export default AddFaq;
