import React from 'react';
import { Link } from 'react-router-dom';

const AdminBlogs = () => {
    return (
        <div>
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                <div>
                    <h1 className="text-center">Admin Blogs</h1><br />
                </div>
                <Link
                    className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                    to="/admin/new-blog"
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

                    <div className="overflow-hidden  transition-shadow duration-300 bg-white rounded shadow-sm">
                        <img
                            src="https://images.pexels.com/photos/139829/pexels-photo-13982.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
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
                                title="Film It!"
                                className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                            >
                                Film It!
                            </a>
                            <p className="mb-2 text-sm text-gray-700">
                                Sed ut perspiciatis unde omnis iste natus error sit sed quia
                                consequuntur magni voluptatem doloremque.
                            </p>
                            <span
                                className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm"
                            >
                                <button
                                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                                >
                                    Edit
                                </button>

                                <button
                                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                                >
                                    View
                                </button>

                                <button
                                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                                >
                                    Delete
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogs;