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
            const res = await fetch(`https://salenow-v2-backend.vercel.app/seller/blog/${shopInfo?.shopId}`);
            const data = await res.json();
            return data;
        },
    });

    const DeleteBlog = (id) => {

        fetch(`https://salenow-v2-backend.vercel.app/seller/blog/${id}`, {
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
        fetch(`https://salenow-v2-backend.vercel.app/seller/blog/publish-status/${id}`,
            {
                method: "PUT"
            }).then(() => {
                Swal.fire("Your Blog Publish Successfully", "", "success");
                refetch()
            })
    }
    const UnpublishBlog = (id) => {
        console.log(id);
        fetch(`https://salenow-v2-backend.vercel.app/seller/blog/unpublish-status/${id}`,
            {
                method: "PUT"
            }).then(() => {

                Swal.fire("Your Blog Unpublish Successfully", "", "success");

                refetch()
            })
    }




    return (
        <div>
            <Link
                className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/manage-contact/add-contact"
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
    );
}
export default SellerManageBlog;