import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import Swal from "sweetalert2";
import EditSellerBlog from "./EditSellerBlog";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import BrightAlert from "bright-alert";
import { TbRestore } from "react-icons/tb";

export const SellerManageBlog = () => {
    const { shopInfo } = useContext(AuthContext);

    const { data: blogs = [], refetch } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await fetch(
                `https://backend.doob.com.bd/api/v1/seller/blog/${shopInfo?.shopId}`
            );
            const data = await res.json();
            return data;
        },
    });

    const DeleteBlog = (id) => {
        fetch(`https://backend.doob.com.bd/api/v1/seller/blog/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    Swal.fire(`${data.message}`, "", "success");
                } else {
                    Swal.fire("Your Blog Deleted Successfully", "", "success");
                }

                refetch();
            });
    };

    const blogStash = (id, status) => {
        console.log(status);
        fetch(
            `https://backend.doob.com.bd/api/v1/seller/blog-trash?id=${id}&status=${status}`,
            {
                method: "PUT",
            }
        ).then(() => {
            BrightAlert();
            refetch();
        });
    };

    const publishBlog = (id) => {
        fetch(
            `https://backend.doob.com.bd/api/v1/seller/blog/publish-status/${id}`,
            {
                method: "PUT",
            }
        ).then(() => {
            Swal.fire("Your Blog Publish Successfully", "", "success");
            refetch();
        });
    };
    const UnpublishBlog = (id) => {
        fetch(
            `https://backend.doob.com.bd/api/v1/seller/blog/unpublish-status/${id}`,
            {
                method: "PUT",
            }
        ).then(() => {
            Swal.fire("Your Blog Unpublish Successfully", "", "success");

            refetch();
        });
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [blogType, setBlogType] = useState(false);
    const [trashType, setTrashType] = useState(false);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    let filteredData = blogs.filter((item) => (item.draft === blogType || !blogType) &&
        (item.trash === `${trashType}` || !trashType) &&
        (
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item._id.toString().includes(searchQuery)
        )
    );

    const [OpenModal, setOpenModal] = useState(false);

    const handleViewDetails = (ticketId) => {
        setOpenModal(ticketId);
    };



    return (
        <div>
            <Link
                className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/manage-blogs/add-blog"
            >
                <span className="absolute -start-full transition-all group-hover:start-4">
                    <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Add New Blog
                </span>
            </Link>

            <div className="relative  my-6">
                <input
                    type="text"
                    id="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for..."
                    className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm" />

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" className="text-gray-600 hover:text-gray-700">
                        <span className="sr-only">Search</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4 text-black"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </span>
            </div>

            <div className="flex justify-between ">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-700 ">All Blog</h2>
                    <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
                        {blogs?.length}
                    </span>
                </div>

                <div className="flex gap-3 items-start">
                    <button
                        onClick={() => setBlogType(!blogType)}
                        className={blogType ? "bg-green-700 rounded cursor-pointer text-white px-4 py-2" :
                            "bg-red-700 rounded cursor-pointer text-white px-4 py-2"}
                    >
                        {!blogType ? 'Draft' : 'All Blogs'}
                    </button>

                    <button onClick={() => setTrashType(!trashType)} className={trashType ? "bg-green-500 rounded cursor-pointer text-white px-4 py-2" :
                        "bg-red-500 rounded cursor-pointer text-white px-4 py-2"}>
                        {!trashType ? 'Trashed' : 'All Blogs'}
                    </button>
                </div>


            </div>
            <div>
                <div>.
                    <div className=" ">
                        <div className="overflow-y-hidden overflow-x-auto border mt-4 w-full border-gray-200  md:rounded-lg">
                            <table className=" divide-y w-full divide-gray-200 ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <span>Name</span>
                                            </div>
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  text-gray-400"
                                        >
                                            <button className="flex items-center gap-x-2">
                                                <span>Status</span>
                                            </button>
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  text-gray-400"
                                        >
                                            <span className="flex items-center gap-x-2">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y  divide-gray-200 ">
                                    {filteredData.map((blog) => (
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <img
                                                            className="object-cover w-10 h-10 rounded"
                                                            src={blog?.img}
                                                            srcSet={blog?.img}
                                                            alt="" />
                                                        <div>
                                                            <h2 className="font-medium text-gray-800  ">
                                                                {blog?.title.split(" ").slice(0, 5).join(" ")}
                                                                <span className="text-yellow-500">
                                                                    {blog?.draft && " ( Drafts)"}
                                                                </span>
                                                            </h2>
                                                            <p className="text-sm font-normal text-gray-600 text-gray-400">
                                                                {new DOMParser()
                                                                    .parseFromString(blog.message, "text/html")
                                                                    .body.textContent.split(" ")
                                                                    .slice(0, 5)
                                                                    .join(" ")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {blog.status ? (
                                                    <button
                                                        onClick={() => UnpublishBlog(blog._id)}
                                                        className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        <h2 className="text-sm font-normal text-emerald-500">
                                                            Active
                                                        </h2>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => publishBlog(blog._id)}
                                                        className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                        <h2 className="text-sm font-normal text-red-500">
                                                            Inactive
                                                        </h2>
                                                    </button>
                                                )}
                                            </td>
                                            {/* <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      {blog.trash === "true" ? (
                        <button
                          onClick={() => blogStash(blog._id, false)}
                          className="inline-flex items-center px-3 py-1 rounded gap-x-2 bg-emerald-100/60 text-white bg-green-600"
                        >
                          <h2 className="text-sm font-normal ">ON</h2>
                        </button>
                      ) : (
                        <button
                          onClick={() => blogStash(blog._id, true)}
                          className="inline-flex items-center px-3 py-1 rounded gap-x-2 bg-emerald-100/60 bg-red-600"
                        >
                          <h2 className="text-sm font-normal text-white">
                            OFF
                          </h2>
                        </button>
                      )}
                    </td> */}

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex gap-4 justify-center">
                                                    {trashType && <button
                                                        onClick={() => DeleteBlog(blog._id)}
                                                        className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>}
                                                    {!trashType && <button
                                                        onClick={() => blogStash(blog._id, true)}
                                                        className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>}

                                                    {trashType && <TbRestore onClick={() => blogStash(blog._id, false)} className="transition-colors text-xl duration-200 cursor-pointer text-green-500 hover:text-green-700 focus:outline-none" />}
                                                    <BiEdit
                                                        onClick={() => handleViewDetails(blog._id)}
                                                        className="transition-colors text-xl duration-200 cursor-pointer text-yellow-500 hover:text-yellow-700 focus:outline-none" />
                                                    <Link
                                                        to={`/shop/${shopInfo.shopId}/blog/${blog._id}`}
                                                    >
                                                        <BsEye className="transition-colors text-xl duration-200 cursor-pointer text-green-500 hover:text-green-700 focus:outline-none" />
                                                    </Link>
                                                </div>
                                            </td>
                                            {OpenModal === blog._id && (
                                                <div className="h-0 w-0">
                                                    <EditSellerBlog
                                                        OpenModal={OpenModal}
                                                        refetch={refetch}
                                                        setOpenModal={setOpenModal}
                                                        BlogInfo={blog} />
                                                </div>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
