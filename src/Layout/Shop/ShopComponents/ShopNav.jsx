import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useState } from 'react';
import { FaJediOrder, FaMapLocationDot } from 'react-icons/fa6';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link, } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShopAuthProvider } from '../../../AuthProvider/ShopAuthProvide';
import { CgLogOut, CgProfile } from "react-icons/cg";
import { MdFavoriteBorder, MdOutlineFavoriteBorder } from 'react-icons/md';
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from 'react-icons/fa';

const ShopNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;




    const { data: shop = {}, isLoading, refetch } = useQuery({
        queryKey: ["shop"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/${shopId}`);
            const data = await res.json();
            return data;
        },
    });


    const { shopUser, logOut, shop_id } = useContext(ShopAuthProvider)


    const [isOpen, setIsOpen] = useState(false);

    return (

        <div className='shadow-xl'>
            <Helmet >
                <title>{shop?.shopName}</title>
                {/* <meta name="description" content={description} /> */}
                <meta name="keywords" content={shop?.shopName} />
                <meta property="og:title" content={shop?.shopName} />
                {/* <meta property="og:description" content={description} /> */}
                <meta property="og:image" content={shop?.logo} />
                <meta property="twitter:card" content={shop?.logo} />
                <meta property="twitter:title" content={shop?.shopName} />
                {/* <meta property="twitter:description" content={description} /> */}
                <meta property="twitter:image" content={shop?.logo} />
            </Helmet>
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
                            <img srcSet={shop?.logo} className='w-10' src={shop?.logo} alt="" />
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
                        {shopUser && <li>
                            <Link
                                to={`/shop/${shopId}/user/cart?shop_id=${shop_id.shop_id}&userId=${shopUser._id}`}
                                className="inline-flex items-center bg-gray-900 p-2 rounded-full justify-center "
                                aria-label="Sign up"
                                title="Sign up"
                            >
                                <PiShoppingCartSimpleBold className='text-3xl  text-white' />
                            </Link>
                        </li>}
                        <li>
                            {!shopUser ? <Link
                                to={`/shop/${shopId}/sign-in`}
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                                aria-label="Sign up"
                                title="Sign up"
                            >
                                Login
                            </Link> : <div

                            >

                                <div className="relative inline-block">
                                    {/* Dropdown toggle button */}
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent text-2xl rounded-full dark:text-white focus:border-blue-500 focus:ring-opacity-40  h-12 w-12 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
                                    >
                                        {shopUser?.name.slice(0, 1)}
                                    </button>

                                    {/* Dropdown menu */}
                                    <div
                                        className={`absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 ${isOpen ? 'block' : 'hidden'}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Link to={`/shop/${shopId}/user/my-profile`} className="flex justify-center items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

                                            <CgProfile className="w-5 h-5 mx-1" />
                                            <span className="mx-1">View Profile</span>
                                        </Link>
                                        <Link to={`/shop/${shopId}/user/my-orders`} className="flex mx-auto items-center px-10 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

                                            <MdOutlineFavoriteBorder className="w-5  h-5 mx-1" />
                                            <span className="mx-1">My Orders</span>
                                        </Link>

                                        <a href="#" className="flex mx-auto items-center px-10 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <IoSettings className="w-5 h-5 mx-1" />
                                            <span className="mx-1">Settings</span>
                                        </a>



                                        <hr className="border-gray-200 dark:border-gray-700" />

                                        {/* Add more dropdown items as needed */}

                                        <a href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                {/* SVG path for another menu item */}
                                            </svg>
                                            <span className="mx-1">Help</span>
                                        </a>

                                        <button onClick={() => logOut()} className="flex justify-center w-full items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

                                                <FaSignOutAlt className="w-5 h-5 mx-1" />
                                            <span className="mx-1">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            }
                        </li>
                    </ul>

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
        </div >
    );
};

export default ShopNav;