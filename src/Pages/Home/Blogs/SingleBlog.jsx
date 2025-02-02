import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { Link, useParams } from "react-router-dom";
import MetaHelmet from "../../../Helmate/Helmate";
import ReactQuill from "react-quill";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";

const SingleBlog = () => {
      const [blogList, setBlogList] = useState([]);
      const { user } = useContext(AuthContext);

      const location = useParams();


      const {
            data: blogInfo = {},
            isLoading: isCategoriesLoading,
            refetch,
      } = useQuery({
            queryKey: ["blogInfo"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/all-blogs/${location.id}`
                  );
                  const data = await res.json();
                  console.log(data);
                  return data;
            },
      });


      useEffect(() => {
            fetch("https://doob.dev/api/v1/admin/all-blogs")
                  .then((res) => res.json())
                  .then((data) => setBlogList(data));
      }, []);



      const extractInnerText = (html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            return doc.body.textContent || "";
      };

      const uploadComment = (e) => {
            e.preventDefault();
            const comment = e.target.comment.value;
            const userData = { name: user.name, userId: user._id };
            const timestamp = new Date().getTime();
            let data = {
                  text: comment, user: userData, timeStamp: timestamp, status: true
            };
            fetch(
                  `https://doob.dev/api/v1/admin/add-blog-comment?id=${blogInfo._id}`,
                  {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  }
            )
                  .then((response) => response.json())
                  .catch((error) => console.log(error))
                  .finally(() => {
                        e.target.comment.value = "";
                        refetch()
                  });
      };

      const formattedDate = new Date(blogInfo.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
      });

      function timeAgo(timestamp) {
            const date = new Date(timestamp);
            const now = Date.now();
            const difference = now - date.getTime();

            const units = [
                  { value: 365 * 24 * 60 * 60 * 1000, label: "year" },
                  { value: 30 * 24 * 60 * 60 * 1000, label: "month" },
                  { value: 7 * 24 * 60 * 60 * 1000, label: "week" },
                  { value: 24 * 60 * 60 * 1000, label: "day" },
                  { value: 60 * 60 * 1000, label: "hour" },
                  { value: 60 * 1000, label: "minute" },
            ];

            for (const unit of units) {
                  const count = Math.floor(difference / unit.value);
                  if (count >= 1) {
                        return count === 1
                              ? `1 ${unit.label} ago`
                              : `${count} ${unit.label}s ago`;
                  }
            }

            return "just now";
      }

      const [searchTerm, setSearchTerm] = useState("");
      const filteredBlogs = blogList.filter((blog) =>
            blog?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );


      useEffect(() => {
            console.log(`https://doob.dev/api/v1/admin/all-blogs/${location.id}`,);
            refetch()
      }, [location.id]);

      return (
            <div className=" ">
                  <MetaHelmet
                        title={blogInfo?.MetaTag}
                        description={blogInfo?.MetaDescription}
                        image={blogInfo?.MetaImage}
                  />
                  <div className="relative">
                        <img
                              src={blogInfo?.img}
                              srcSet={blogInfo?.img}
                              className="absolute inset-0 object-cover w-full h-full"
                              alt=""
                        />
                        <div className="relative bg-gray-900 bg-opacity-90">
                              <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                                    <div>
                                          <h2 className=" mb-6 text-center font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                                {blogInfo?.title}
                                          </h2>
                                          <div className="text-xl gap-3 text-white flex justify-center items-center">
                                                <FaRegCalendarAlt className="" />
                                                Updated On {formattedDate}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="px-1 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-8 md:w-[80%] w-[95%] grid md:grid-cols-3 gap-3 ">
                        <div className="md:col-span-2">
                              <img
                                    loading="lazy"
                                    src={blogInfo?.img}
                                    srcSet={blogInfo?.img}
                                    alt={blogInfo?.title}
                                    className="w-full h-[400px] object-cover rounded-md"
                              />

                              <h1 className=" mt-4 md:text-4xl text-2xl">{blogInfo?.title}</h1>
                              <div className="mt-5 ">
                                    <div
                                          className="mb-2 text_editor"
                                          dangerouslySetInnerHTML={{
                                                __html: blogInfo.message,
                                          }}
                                    />
                              </div>
                              <hr className="my-4 border-gray-500 border-opacity-50" />
                              <form onSubmit={uploadComment} className="">
                                    <textarea
                                          name="comment"
                                          className="border w-full  border-opacity-50  border-gray-500 p-2 rounded resize-y"
                                          rows="5"
                                          placeholder="Write your comment here..."
                                    ></textarea>
                                    <button
                                          type="submit"
                                          className="block  mt-2 mb-10 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                    >
                                          Submit
                                    </button>
                              </form>
                              <div className="space-y-4">
                                    {(user.role === "superadmin"
                                          ? blogInfo?.comments
                                          : blogInfo?.comments?.filter((comm) => comm?.status)
                                    )?.map((comment) => (
                                          <div className="space-y-2" key={comment.id}>
                                                <div className="flex items-center space-x-2">
                                                      <div className="rounded-full bar overflow-hidden w-8 h-8">
                                                            <div
                                                                  height={32}
                                                                  src="/placeholder.svg"
                                                                  style={{
                                                                        aspectRatio: "32/32",
                                                                        objectFit: "cover",
                                                                  }}
                                                                  width={32}
                                                                  className="rounded-full flex justify-center items-center border border-black"
                                                            >
                                                                  {comment.user.name.slice(0, 1)}
                                                            </div>
                                                      </div>
                                                      <div className="space-y-1">
                                                            <p className="text-sm font-medium">{comment.user.name}</p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                  {timeAgo(comment.timeStamp)}
                                                            </p>
                                                      </div>
                                                </div>
                                                <p>{comment.text}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                        <div className=" px-4 ">
                              <div className="relative border border-gray-500 rounded-md">
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
                              <h3 className=" py-2 border-b border-[#d8d8d85e]">Another blogs</h3>
                              {filteredBlogs?.map((blg) => (
                                    <Link
                                          to={`/blogs/${blg._id}`}
                                          key={blg._id}
                                          className="flex items-center gap-2 mt-3 duration-200 hover:bg-[#3c3c4681] p-2 rounded-md "
                                    >
                                          <img
                                                loading="lazy"
                                                src={blg.img}
                                                srcSet={blg.img}
                                                alt={blg.title}
                                                className="md:w-[110px] h-16 object-cover w-[110px]"
                                          />
                                          <div className="">
                                                <h4 className=" text-sm ">{blg.title}</h4>

                                                <small>{extractInnerText(blg.message?.slice(0, 47))}</small>
                                          </div>
                                    </Link>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default SingleBlog;
