import React, { useState } from 'react';
import SideNavberSeller from '../Pages/Dashboard/SellerDashboard/SideNavberSeller/SideNavberSeller';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const popUp =()=> {
  
    return (
        <div>
            hello world!!!
        </div>
    )
}

const SellerDashLayout = () => {
    const [responsive, setResponsive] = useState(false)

    const location = useLocation();
    const paths = location.pathname.split('/').filter((path) => path !== '')


    function convertToTitleCase(str) {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return (
        <div className='flex  '>

            <div className="sticky z-50 top-0 h-full min-h-screen  bg-gray-900 text-white">
                <SideNavberSeller responsive={responsive} setResponsive={setResponsive} />
            </div>
            <div className="px-4 py-8 w-full   sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                <div>
                    <nav
                        aria-label="breadcrumb"
                        className="w-full rounded p-4 mb-4 bg-gray-800 text-gray-100"
                    >
                        <ol className="flex h-8 space-x-2">
                            <li className='md:hidden block'>
                                <button onClick={() => setResponsive(!responsive)} className="py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-100">
                                        <rect width="352" height="32" x="80" y="96"></rect>
                                        <rect width="352" height="32" x="80" y="240"></rect>
                                        <rect width="352" height="32" x="80" y="384"></rect>
                                    </svg>
                                </button>
                            </li>
                            <li className="flex items-center">
                                <Link
                                    rel="noopener noreferrer"
                                    to="/seller/dashboard"
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
                            <li className="flex w-full overflow-x-auto  overflow-y-hidden items-center">
                                {paths.slice(1).map((path, index) => (
                                    <div className="md:text-md text-sm flex items-center space-x-2" key={index}>
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
                                            {convertToTitleCase(path)}
                                        </Link>
                                    </div>
                                ))}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='flex-1  p-4 sm:p-0'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerDashLayout;