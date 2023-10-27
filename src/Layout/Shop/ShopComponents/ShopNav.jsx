import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShopNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const params = useParams();
    const shopId = params.id;



    const { data: shop = {}, isLoading, refetch } = useQuery({
        queryKey: ["shop"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/shop/${shopId}`);
            const data = await res.json();
            return data;
        },
    });
    return (

        <div>

            <div className="px-4 py-5 hidden lg:block mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="relative flex items-center justify-between">
                    <div
                        className=' font-semibold flex gap-1 items-center'

                    >
                        <Link to={`/shop/${shopId}`}

                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <img className='w-10' src={shop?.logo} alt="" />
                            <span className="ml-2 md:text-xl font-bold tracking-wide text-gray-800 ">
                                {shop?.shopName}
                            </span>
                        </Link>
                    </div>
                    <ul className='w-2/4'>




                        <div className="relative ">


                            <input
                                type="text"
                                id="Search"
                                placeholder="Search for..."
                                className="w-full rounded-md border px-4 border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                            />

                            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                <button type="button" className="text-gray-600 hover:text-gray-700">
                                    <span className="sr-only ">Search</span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </div>

                    </ul>
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        <li>
                            <a
                                href="/"
                                className="inline-flex items-center bg-gray-900 p-2 rounded-full justify-center "
                                aria-label="Sign up"
                                title="Sign up"
                            >
                                <FaMapLocationDot className='text-3xl  text-white' />
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="inline-flex items-center bg-gray-900 p-2 rounded-full justify-center "
                                aria-label="Sign up"
                                title="Sign up"
                            >
                                <PiShoppingCartSimpleBold className='text-3xl  text-white' />
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                                aria-label="Sign up"
                                title="Sign up"
                            >
                                Login
                            </a>
                        </li>
                    </ul>
                    {/* <div className="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full z-50">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <motion.div
                                            className='text-white font-semibold flex gap-1 items-center'
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            <a
                                                href="/"
                                                aria-label="Company"
                                                title="Company"
                                                className="inline-flex items-center"
                                            >
                                                <img className='w-10' src={shop?.logo} alt="" />
                                                <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 ">
                                                    {shop?.shopName}
                                                </span>
                                            </a>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="Our product"
                                                title="Our product"
                                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                Product
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="Our product"
                                                title="Our product"
                                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                Features
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="Product pricing"
                                                title="Product pricing"
                                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                Pricing
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="About us"
                                                title="About us"
                                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                About us
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-black focus:shadow-outline focus:outline-none"
                                                aria-label="Sign up"
                                                title="Sign up"
                                            >
                                                Sign up
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div> */}
                </div>
            </div>
            <div className='block lg:hidden'>
                <div className="fixed z-50 left-0 right-0 bottom-2  p-5 px-6 m-2   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
                    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                            ></path>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center  hover:text-blue-400 ">
                        <div className="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-20 h-20 p-2 text-white transition ease-in duration-200 ">
                            <i className="fas fa-phone-alt" />
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShopNav;