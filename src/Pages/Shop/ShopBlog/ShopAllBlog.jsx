import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

const ShopAllBlog = () => {

    const blogs = useLoaderData()
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    const extractInnerText = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };


    const { data: category = [], refetch, isLoading } = useQuery({
        queryKey: ["blog-category"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/blog-category?shopId=${shopId}`);
            const data = await res.json();
            return data.data;
        },
    });

    const location = useLocation();
    const path = location.hash.replace("#", "")

    useEffect(() => {
        // Update selected category based on path
        if (path === undefined || path === '') {
            setSelectedCategory('all');
        } else {
            setSelectedCategory(path);
        }
    }, [path]);


    // Filter blogs based on selected category
    const filteredBlogs = blogs.filter(blog => {
        // Check if the blog matches the selected category or if the category is 'all'
        const categoryMatch = selectedCategory === 'all' || blog.category === selectedCategory;
        // Check if the blog title contains the search term
        const titleMatch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && titleMatch;
    });



    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

            <div className="relative border border-gray-500 rounded">
                <label for="Search" className="sr-only"> Search </label>

                <input
                    type="text"
                    id="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for..."
                    className="w-full rounded-md  py-2.5 px-4 pe-10 shadow-sm sm:text-sm"
                />

                <span className="absolute border-gray-700 inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" className="text-gray-600 hover:text-gray-700">
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

            <div className=" my-8">
                <div className="flex flex-wrap gap-4">
                    <a
                        href='#all'
                        className={`px-4 py-2 text-sm font-medium uppercase tracking-wide ${selectedCategory === 'all' ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                    >
                        All
                    </a>
                    {!isLoading &&
                        category?.map((category) => (
                            <a
                                key={category.id}
                                href={`#${category.slag}`}
                                className={`px-4 py-2 text-sm font-medium uppercase tracking-wide ${selectedCategory === category.slag ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'
                                    }`}
                            >
                                {category.title}
                            </a>
                        ))}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                {filteredBlogs.map((blog, index) => (
                    <div className={!blog.status && "hidden"}>

                        {blog.status && <div
                            key={index}
                            className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
                        >
                            <img
                                srcSet={blog?.img}
                                src={blog?.img}
                                className="object-cover w-full h-64"
                                alt=""
                            />
                            <div className="p-5 border border-t-0">
                                <Link
                                    to={`/shop/${shopId}/blog/${blog._id}`}
                                    aria-label="Category"
                                    title="Visit the East"
                                    className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-purple-700"
                                >
                                    {blog.title}
                                </Link>
                                <div
                                    className="mb-2 text-sm text-gray-700">
                                    {
                                        extractInnerText(blog?.message?.slice(0, 200) + "...")
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