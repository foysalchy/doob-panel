import React from 'react';
import Feature from './Group 79.png'
import { BsWindowDock } from 'react-icons/bs'

const HomePopularFeatures = () => {
    return (
        <div className='bg-gray-200'>
            <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
                <h1 className='text-2xl text-center mb-2'>Check out Our</h1>
                <h1 className='text-4xl font-extrabold text-center font-inner'>Most Popular Features</h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 py-10 gap-5">
                    <div className="group md:h-72 h-56  scroll-smooth relative block overflow-hidden rounded hover:text-black text-black  bg-indigo-50">

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white border">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl font-bold group-hover:hidden sm:text-xl">

                                Scrape & Copy Products
                            </p>

                            <p className="text-sm opacity-100 mt-6 transition-all group-hover:hidden">
                                Scrape and copy product listings to your shops with one click.
                            </p>

                            <div className="">
                                <div className="translate-y-64 duration-500 transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                    <p className="text-lg mb-6 text-ellipsis font-bold sm:text-xl">

                                        Scrape & Copy Products
                                    </p>
                                    <p className="text-sm">
                                        Scrape Listings: you can scrape product information from other marketplaces and stores and import them into your store
                                        Copy Listings: you can copy listings in bulk from one marketplace or store to another marketplace or store
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="group  md:h-72 h-56  scroll-smooth relative block overflow-hidden rounded hover:text-black text-black  bg-indigo-50">

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white border">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl font-bold group-hover:hidden sm:text-xl">Batch Order Processing

                            </p>

                            <p className="text-sm opacity-100 mt-6 duration-75 transition-all group-hover:hidden">
                                Centralize orders across multiple sales channels, streamline order fulfillment process
                            </p>

                            <div className="">
                                <div className="translate-y-64 duration-500  transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                    <p className="text-xl font-bold mb-4 sm:text-xl">Batch Order Processing

                                    </p>
                                    <p className="text-sm">
                                        Support packing orders, printing shipping labels at high speed, managing returned items, and tracking packages
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="group  md:h-72 h-56  scroll-smooth relative block overflow-hidden rounded hover:text-black text-black  bg-indigo-50">

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white ">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl font-bold group-hover:hidden sm:text-xl">Customized Shipping Label
                            </p>

                            <p className="text-sm opacity-100 mt-6 transition-all group-hover:hidden">
                                Support customizing your shipping label template

                            </p>

                            <div className="">
                                <div className="translate-y-64 transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100 duration-700 ">
                                    <p className="text-xl font-bold sm:text-xl mb-4">Customized Shipping Label
                                    </p>
                                    <p className="text-sm">
                                        You can customize the template of shipping labels and picking lists according to your need
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div
                        className="group md:h-72 h-56  scroll-smooth relative block overflow-hidden rounded hover:text-black text-black bg-indigo-50"

                    >

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white border">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl group-hover:hidden font-bold sm:text-xl">Sync Inventory
                            </p>

                            <p className="text-sm opacity-100 mt-6 transition-all group-hover:hidden">
                                Automate stock update in real-time, no more overselling
                            </p>

                            <div className="">
                                <div className="translate-y-64 transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100 duration-700">
                                    <p className="text-xl mb-4 font-bold sm:text-xl">Sync Inventory
                                    </p>

                                    <p className="text-sm">
                                        Support managing the inventory of multiple warehouses and marketplaces. The system will intelligently deduct the stock when orders are shipped. Sound purchase suggestions are provided to prevent products from overselling
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div
                        className="group md:h-72 h-56  hover:overflow-y-scroll scroll-smooth relative block overflow-hidden rounded hover:text-black text-black bg-indigo-50"

                    >

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white border">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl font-bold group-hover:hidden sm:text-xl"> Automated Operations
                            </p>

                            <p className="text-sm opacity-100 mt-6 transition-all group-hover:hidden">
                                Auto reply to reviews, auto boost Shopee products every 4 hours, and auto publish products according to the scheduled slot
                            </p>

                            <div className="">
                                <div className="translate-y-64 transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100 duration-700">
                                    <p className="text-xl font-bold mb-4 sm:text-xl"> Automated Operations
                                    </p>
                                    <p className="text-sm">
                                        Auto Reply: after you set up auto-reply rules, the system will automatically reply to the reviews of buyers
                                        Auto Boost: Only Shopee available. The selected products will be auto bumped by the system every four hours
                                        Auto Publishing: you can schedule products to be scheduled at a specific date and time
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="group  md:h-72 h-56  scroll-smooth relative block overflow-hidden rounded hover:text-black text-black  bg-indigo-50">

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white border">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl font-bold group-hover:hidden sm:text-xl">Watermark Template
                            </p>

                            <p className="text-sm opacity-100 mt-6 transition-all group-hover:hidden">
                                Customize your watermark templates and apply them to the product images
                            </p>

                            <div >
                                <div className="translate-y-64 transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100 duration-700">
                                    <p className="text-xl font-bold mb-4 sm:text-xl">Watermark Template
                                    </p>
                                    <p className="text-sm">
                                        Product Image Watermark: you can save multiple watermark templates and add them to product images in bulk
                                        Marketing Watermark: you can save multiple marketing watermark templates and add them to the promotional products with one click
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="group  md:h-72 h-56  scroll-smooth relative block overflow-hidden rounded hover:text-black text-black  bg-indigo-50">

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center  w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white border">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl font-bold group-hover:hidden sm:text-xl">Advanced Report and Analysis
                            </p>

                            <p className="text-sm opacity-100 mt-6 transition-all group-hover:hidden">
                                Help you to get real-time insights into your online marketing and sales activities and gives you an advantage over competitors
                            </p>

                            <div >
                                <div className="translate-y-64 transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100 duration-700">
                                    <p className="text-xl font-bold sm:text-xl">Advanced Report and Analysis
                                    </p>
                                    <p className="text-sm">
                                        Advanced Reports: various kinds of data reports, including business reports, invoice reports, and shipping reports, are generated for you to gain insight into your current business performance
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="group   h-72  scroll-smooth relative block overflow-hidden rounded hover:text-black text-black   bg-indigo-50">

                        <div className="relative p-4 sm:p-6 lg:p-8 group">
                            <div className="flex items-center justify-center w-16  group-hover:hidden h-16 mb-4 rounded-full bg-white border">
                                <svg
                                    className="w-12 h-12 text-black"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>

                            <p className="text-xl font-bold group-hover:hidden sm:text-xl">Smart Scan Mobile App</p>

                            <p className="text-sm opacity-100 mt-6 transition-all group-hover:hidden">
                                Scan the shipping label and automatically identify the order. Take and send captured photos to the buyers
                            </p>

                            <div className="">
                                <div className="translate-y-64  transform opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                    <p className="text-xl mb-4 font-bold sm:text-xl">Smart Scan Mobile App</p>
                                    <p className="text-sm">
                                        Package Tracking: 17 Track is integrated with BigSeller to track packages and provide you with the latest logistics information
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePopularFeatures;