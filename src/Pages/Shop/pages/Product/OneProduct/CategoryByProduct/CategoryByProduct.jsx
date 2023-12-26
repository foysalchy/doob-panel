import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const CategoryByProduct = () => {
    const products = useLoaderData()

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;




    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <div>

                    </div>
                    <div >
                        <div className='flex w-full justify-between gap-8 '>
                            <div className='w-96 flex flex-col gap-2'>
                                <div className="space-y-2">
                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Category </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>

                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>

                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <div className="space-y-2">
                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Brands </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>

                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>

                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <div className="space-y-2">

                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Features </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>

                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>

                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <div className="space-y-2">
                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Price </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> The highest price is $600 </span>

                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>

                                            <div className="border-t border-gray-200 p-4">
                                                <div className="flex justify-between gap-4">
                                                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">$</span>

                                                        <input
                                                            type="number"
                                                            id="FilterPriceFrom"
                                                            placeholder="From"
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>

                                                    <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">$</span>

                                                        <input
                                                            type="number"
                                                            id="FilterPriceTo"
                                                            placeholder="To"
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                                <div className="space-y-2">

                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Condition </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>

                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>

                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <div className="space-y-2">

                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Rating </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>

                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>

                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <div className="space-y-2">

                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Manufacturer </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>

                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>

                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>

                            </div>
                            <div className="grid grid-cols-3 gap-4 w-full ">
                                {
                                    products?.data?.map((product) => (
                                        <Link to={`/shop/${shopId}/product/${product?._id}`} className=" border p-4 w-full">
                                            <a className="block relative h-48 rounded overflow-hidden">
                                                <img
                                                    alt="ecommerce"
                                                    className="object-cover object-center w-full h-full block"
                                                    src={product.featuredImage.src}
                                                />
                                            </a>
                                            <div className="mt-4">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                                    {product.brandName}
                                                </h3>
                                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                                    {product.name}
                                                </h2>
                                                <p className="mt-1"><span className='kalpurush'>৳</span>{product.price}</p>
                                            </div>
                                        </Link>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoryByProduct;