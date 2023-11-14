import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SideNavAdmin from '../Pages/Dashboard/SideNavAdmin/SideNavAdmin';
import MiniSideberAdmin from '../Pages/Dashboard/SideNavAdmin/MiniSideberAdmin';

const AdminLayout = () => {

    const location = useLocation();
    const paths = location.pathname.split('/').filter((path) => path !== '')

    return (
        <div>

            <div className='flex gap-8 px-4 '>
                <SideNavAdmin />
                <div className=" py-8 w-full   sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                    <div >
                        <nav
                            aria-label="breadcrumb"
                            className="w-full rounded p-4 mb-4 bg-gray-800 text-gray-100"
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
                                            className="w-5 h-5 pr-1 text-gray-400"
                                        >
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                    </Link>
                                </li>
                                {paths.slice(1).map((path, index) => (
                                    <li className="flex items-center space-x-2" key={index}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 32 32"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-600"
                                        >
                                            <path d="M32 30.031h-32l16-28.061z"></path>
                                        </svg>
                                        <Link
                                            rel="noopener noreferrer"
                                            to={`/${paths.slice(0, index + 2).join('/')}`}
                                            className="flex items-center px-1 capitalize hover:underline"
                                        >
                                            {path}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>
                    <div className='flex-1    sm:p-0'>
                        <Outlet />
                    </div>
                </div>
                {/* <div className='fixed  right-0 '>
                    <MiniSideberAdmin />
                </div> */}
            </div>



        </div>
    );
};

export default AdminLayout;