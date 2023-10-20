import JoditEditor from "jodit-react";
import React from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddFaq = () => {
  const [loading, setLoading] = useState(false);
  const dataSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const faq = {
      title,
      description,
    };

    fetch(`http://localhost:5000/admin/newfaq`, {
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
      <nav
        aria-label="breadcrumb"
        className="w-full my-20 p-4 mb-4 rounded dark:bg-gray-800 dark:text-gray-100"
      >
        <ol className="flex h-8 space-x-2">
          <li className="flex items-center">
            <Link
              rel="noopener noreferrer"
              to={"/admin/dashboard"}
              title="Back to homepage"
              className="hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 pr-1 dark:text-gray-400"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <Link
              rel="noopener noreferrer"
              to={"/admin/faq"}
              className="flex items-center px-1 capitalize hover:underline"
            >
              FAQ Management
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <Link
              rel="noopener noreferrer"
              to={"/admin/faq/add-faq"}
              className="flex items-center px-1 capitalize hover:underline"
            >
              Add FAQ
            </Link>
          </li>
        </ol>
      </nav>
      <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold text-center">
          Publish a blog for you and next
        </h1>
        <div className="p-10 border-2 rounded m-10">
          <form onSubmit={dataSubmit} className="space-y-4 ">
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
                <JoditEditor name="description" id="message"></JoditEditor>
              </div>
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
                      Add FAQ
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

export default AddFaq;
