import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AdminSingleBlog = () => {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    fetch("https://doob.dev/api/v1/admin/all-blogs")
      .then((res) => res.json())
      .then((data) => setBlogList(data));
  }, []);
  const blogInfo = useLoaderData();

  const extractInnerText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogList.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="px-1 md:py-28 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-8 md:w-[80%] w-[95%] grid md:grid-cols-3 gap-3 ">
        <div className="md:col-span-2">
          <img
            loading="lazy"
            srcSet={blogInfo?.img}
            src={blogInfo?.img}
            alt=""
            className="w-full h-[400px] object-contain"
          />

          <h1 className=" mt-4 md:text-4xl text-2xl">{blogInfo?.title}</h1>
          <div className="mt-5 ">
            <div
              className="mb-2 text_editor "
              dangerouslySetInnerHTML={{
                __html: blogInfo.message,
              }}
            />
          </div>
        </div>
        <div className="border-l px-2 border-[#8080805f]">
          <div className="relative border border-gray-500 rounded">
            <label for="Search" className="sr-only">
              {" "}
              Search{" "}
            </label>

            <input
              type="text"
              id="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for..."
              className="w-full rounded-md  py-2.5 px-4 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute border-gray-700 inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
          <h3 className=" pb-2 border-b border-[#d8d8d85e]">Another blogs</h3>
          {filteredBlogs
            ?.filter((item) => item?._id !== blogInfo?._id)
            ?.map((blg) => (
              <Link
                to={`/admin/blogs/${blg._id}`}
                key={blg._id}
                className="flex items-center gap-2 mt-3 duration-200 hover:bg-[#3c3c4681] p-2 "
              >
                <img
                  loading="lazy"
                  srcSet={blg.img}
                  src={blg.img}
                  alt=""
                  className="md:w-[110px] w-[110px]"
                />
                <div className="">
                  <h4 className=" text-sm font-bold ">{blg.title}</h4>

                  <small>{extractInnerText(blg.message?.slice(0, 47))}</small>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSingleBlog;
