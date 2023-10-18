import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/admin/blogs");
      const data = await res.json();
      return data;
    },
  });

  const DeleteBlog = (id) => {
  
    fetch(`http://localhost:5000/admin/blog`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("delete successful");
  
      });
  };

  return (
    <div>
      <div className="px-4 py-8 w-full  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div>
          <nav
            aria-label="breadcrumb"
            className="w-full rounded p-4 mb-4 dark:bg-gray-800 dark:text-gray-100"
          >
            <ol className="flex h-8 space-x-2">
              <li className="flex items-center">
                <Link
                  rel="noopener noreferrer"
                  to="/admin/dashboard"
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
                  to="/admin/blog"
                  className="flex items-center px-1 capitalize hover:underline"
                >
                  Blog
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          to="/admin/blogs/new-blog"
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
            Add New Blog
          </span>
        </Link>
        <div className="grid gap-8 lg:grid-cols-3 mt-10 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {blogs.map((blog, i) => (
            <div>
              <div className="overflow-hidden  transition-shadow duration-300 bg-white rounded shadow-sm">
                <img
                  src={blog.img}
                  className="object-cover w-[350px] h-64"
                  alt=""
                />
                <div className="p-5 border border-t-0">
                  <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                    <a
                      href="/"
                      className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                      aria-label="Category"
                      title="traveling"
                    >
                      traveling
                    </a>
                    <span className="text-gray-600">— 28 Dec 2020</span>
                  </p>
                  <a
                    href="/"
                    aria-label="Category"
                    title={blog.title}
                    className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                  >
                    {blog.title}
                  </a>
                  <div
                    className="mb-2 text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: blog?.message.slice(0, 150) + "...",
                    }}
                  />

                  <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                    <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                      Edit
                    </button>

                    <Link
                      to={`/admin/blogs/${blog._id}`}
                      className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => DeleteBlog(blog._id)}
                      className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
