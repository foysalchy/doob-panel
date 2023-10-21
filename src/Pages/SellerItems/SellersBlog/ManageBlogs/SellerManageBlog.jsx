import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useState } from 'react';
import Swal from 'sweetalert2';


const SellerManageBlog = () => {

    const { shopInfo } = useContext(AuthContext)

    const { data: blogs = [], refetch } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/seller/blog/${shopInfo?.shopId}`);
            const data = await res.json();
            return data;
        },
    });

    const DeleteBlog = (id) => {

        fetch(`http://localhost:5000/seller/blog/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.message) {
                    Swal.fire(`${data.message}`, "", "success");

                }
                else {
                    Swal.fire("Your Blog Deleted Successfully", "", "success");
                }

                refetch()

            });
    };

    const [imageLoad, setImageLoad] = useState(false);

    const handleImageLoad = (blog) => {
        setImageLoad(false);
        // You can do additional actions after the image is loaded, if needed
        console.log(`Image loaded: ${blog.img}`);
    };


    const publishBlog = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/seller/blog/publish-status/${id}`,
            {
                method: "PUT"
            }).then(() => {
                Swal.fire("Your Blog Publish Successfully", "", "success");
                refetch()
            })
    }
    const UnpublishBlog = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/seller/blog/unpublish-status/${id}`,
            {
                method: "PUT"
            }).then(() => {

                Swal.fire("Your Blog Unpublish Successfully", "", "success");

                refetch()
            })
    }




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
                                    to="/seller/manage-blogs"
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
                    to="/seller/add-blog"
                >
                    <span className="absolute -start-full transition-all group-hover:start-4">

                        <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Add New Blog
                    </span>
                </Link>
                <div className="grid gap-8 lg:grid-cols-3 mt-10 sm:max-w-sm sm:mx-auto lg:max-w-full">
                    {blogs.map((blog, i) => (
                        <div>
                            <div className="overflow-hidden  transition-shadow duration-300 bg-white rounded shadow-sm">
                                {imageLoad && (
                                    <div className="w-[350px] text-5xl h-64 flex items-center justify-center">
                                        Loading...
                                    </div>
                                )}

                                {/* Image */}
                                <img
                                    src={blog.img}
                                    className={`object-cover w-[350px] h-64 ${imageLoad ? 'hidden' : ''}`}
                                    alt=""
                                    onLoad={() => handleImageLoad(blog.img)}
                                />
                                <div className="p-5 border border-t-0">
                                    <p className="mb-3 text-xs font-semibold tracking-wide uppercase">

                                        <span className="text-gray-600">{new Date(blog.date).toLocaleString()}</span>
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
                                            to={`/shop/blogs/${blog._id}`}
                                            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                                        >
                                            View
                                        </Link>

                                        {blog.status ?
                                            <button
                                                onClick={() => UnpublishBlog(blog._id)}
                                                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-yellow-300 hover:bg-green-100 focus:relative"
                                            >
                                                UnPublish
                                            </button> :
                                            <button
                                                onClick={() => publishBlog(blog._id)}
                                                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-yellow-100 bg-green-300 focus:relative"
                                            >
                                                Publish
                                            </button>
                                        }
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
}
export default SellerManageBlog;