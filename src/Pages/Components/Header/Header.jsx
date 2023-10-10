import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userDash, setUserDash] = useState(false)
    const { user } = useContext(AuthContext)

    const menuData = <>
        <li>
            <a
                href="/"
                aria-label="Our product"
                title="Our product"
                className=" tracking-wide text-gray-700 transition-colors duration-200 font-semibold hover:text-black"
            >
                Features
            </a>
        </li>
        <li>
            <NavLink
                to="/products"
                aria-label="Our product"
                title="Our product"
                className=" tracking-wide text-gray-700 transition-colors duration-200 font-semibold hover:text-black"
            >
                Product
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/price"
                aria-label="Product pricing"
                title="Product pricing"
                className=" tracking-wide text-gray-700 transition-colors duration-200 font-semibold hover:text-black"
            >
                Pricing
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/blogs"
                aria-label="About us"
                title="About us"
                className=" tracking-wide text-gray-700 transition-colors duration-200 font-semibold hover:text-black"
            >
                Blog
            </NavLink>
        </li>
        <li>
            <a
                href="/"
                aria-label="About us"
                title="About us"
                className=" tracking-wide text-gray-700 transition-colors duration-200 font-semibold hover:text-black"
            >
                Contact
            </a>
        </li>
        <li>
            <a
                href="/"
                aria-label="About us"
                title="About us"
                className=" tracking-wide text-gray-700 transition-colors duration-200 font-semibold hover:text-black"
            >
                Support
            </a>
        </li>

    </>

    return (
        <div className="px-4 py-5 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="relative flex items-center justify-between">
                <a
                    href="/"
                    aria-label="Company"
                    title="Company"
                    className="inline-flex items-center"
                >
                    <svg
                        className="w-8 text-black"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                    >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                    </svg>
                    <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 ">
                        SeleNow
                    </span>
                </a>
                <ul className="flex items-center hidden space-x-8 lg:flex">

                    {menuData}
                    <li>
                        {
                            !user ?
                                <Link
                                    to='/sign-up'
                                    className="inline-flex items-center justify-center h-12 px-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                                    aria-label="Sign up"
                                    title="Sign up"
                                >
                                    Sign up
                                </Link>
                                :
                                <>
                                    {
                                        user.role === 'supperadmin' &&
                                        < Link
                                            to='admin/dashboard'
                                            className="inline-flex items-center justify-center h-12 px-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                                            aria- label="Sign up"
                                            title="Sign up"
                                        >
                                            Dashboard
                                        </Link> ||
                                        user.role === 'seller' &&
                                        < Link
                                            to='seller/dashboard'
                                            className="inline-flex items-center justify-center h-12 px-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                                            aria- label="Sign up"
                                            title="Sign up"
                                        >
                                            Dashboard
                                        </Link> ||
                                        user.role === 'user' &&
                                        <div className='md:hidden lg:flex' >
                                            <div className='relative '>
                                                <button onClick={() => setUserDash(!userDash)} className="relative ">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                                                </button>

                                                {userDash &&
                                                    <div
                                                        className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                                        role="menu"
                                                    >
                                                        <div className="p-2">
                                                            <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                                                                General
                                                            </strong>

                                                            <a
                                                                href="#"
                                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                                role="menuitem"
                                                            >
                                                                View on Storefront
                                                            </a>

                                                            <a
                                                                href="#"
                                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                                role="menuitem"
                                                            >
                                                                View Warehouse Info
                                                            </a>

                                                            <a
                                                                href="#"
                                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                                role="menuitem"
                                                            >
                                                                Duplicate Product
                                                            </a>

                                                            <a
                                                                href="#"
                                                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                                role="menuitem"
                                                            >
                                                                Unpublish Product
                                                            </a>
                                                        </div>

                                                        <div className="p-2">
                                                            <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                                                                Danger Zone
                                                            </strong>

                                                            <form method="POST" action="#">
                                                                <button
                                                                    type="submit"
                                                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                    role="menuitem"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                        />
                                                                    </svg>

                                                                    Delete Product
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>}
                                            </div>
                                        </div>


                                    }
                                </>
                        }
                    </li>
                </ul>

                <div className="lg:hidden flex items-center gap-1">
                    {!user ?
                        <Link
                            to='/sign-up'
                            className="inline-flex items-center justify-center h-12 px-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                        >
                            Sign up
                        </Link>
                        :
                        <>
                            {
                                user?.role === 'supperadmin' &&
                                < Link
                                    to='admin/dashboard'
                                    className="inline-flex items-center justify-center text-sm  px-6 py-2  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                                    aria- label="Sign up"
                                    title="Sign up"
                                >
                                    Dashboard
                                </Link> ||
                                user?.role === 'seller' &&
                                < Link
                                    to='seller/dashboard'
                                    className="inline-flex items-center justify-center py-2 px-6 text-sm tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                                    aria- label="Sign up"
                                    title="Sign up"
                                >
                                    Dashboard
                                </Link> ||
                                user?.role === 'user' &&
                                <div className='md:hidden lg:flex' >
                                    <div className='relative '>
                                        <button onClick={() => setUserDash(!userDash)} className="relative ">
                                            <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                                        </button>

                                        {userDash &&
                                            <div
                                                className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                                role="menu"
                                            >
                                                <div className="p-2">
                                                    <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                                                        General
                                                    </strong>

                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        View on Storefront
                                                    </a>

                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        View Warehouse Info
                                                    </a>

                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        Duplicate Product
                                                    </a>

                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        Unpublish Product
                                                    </a>
                                                </div>

                                                <div className="p-2">
                                                    <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                                                        Danger Zone
                                                    </strong>

                                                    <form method="POST" action="#">
                                                        <button
                                                            type="submit"
                                                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                            role="menuitem"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>

                                                            Delete Product
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>}
                                    </div>
                                </div>


                            }
                        </>}
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
                        <div className="absolute top-0 z-10 left-0 w-full">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <a
                                            href="/"
                                            aria-label="Company"
                                            title="Company"
                                            className="inline-flex items-center"
                                        >
                                            <svg
                                                className="w-8 text-black"
                                                viewBox="0 0 24 24"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeMiterlimit="10"
                                                stroke="currentColor"
                                                fill="none"
                                            >
                                                <rect x="3" y="1" width="7" height="12" />
                                                <rect x="3" y="17" width="7" height="6" />
                                                <rect x="14" y="1" width="7" height="6" />
                                                <rect x="14" y="11" width="7" height="12" />
                                            </svg>
                                            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 ">
                                                SeleNow
                                            </span>
                                        </a>
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
                                        {menuData}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Header;