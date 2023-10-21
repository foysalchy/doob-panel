import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const ShopAllBlog = () => {

    const blogs = useLoaderData()
    console.log(blogs);
    const params = useParams();
    const shopId = params.id;

    const extractInnerText = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                {blogs.map((blog, index) => (
                    <div className={!blog.status && "hidden"}>

                        {blog.status && <div
                            key={index}
                            className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
                        >
                            <img
                                src={blog?.img}
                                className="object-cover w-full h-64"
                                alt=""
                            />
                            <div className="p-5 border border-t-0">
                                <a
                                    href="/"
                                    aria-label="Category"
                                    title="Visit the East"
                                    className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-purple-700"
                                >
                                    {blog.title}
                                </a>
                                <div
                                    className="mb-2 text-sm text-gray-700">
                                    {
                                        extractInnerText(blog?.message.slice(0, 200) + "...")
                                    }
                                </div>

                                <Link
                                    to={`/shop/${shopId}/blog/${blog._id}`}
                                    aria-label=""
                                    className="inline-flex items-center font-semibold transition-colors duration-200 text-gay-400 hover:text-gray-800"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopAllBlog;