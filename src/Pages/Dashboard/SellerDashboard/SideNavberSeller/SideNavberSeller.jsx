import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { IoLogOut, IoStorefront } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdContactSupport, MdContacts, MdDomain, MdOutlineAddCircleOutline, MdOutlineManageSearch } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { ImBlog } from 'react-icons/im';
import { useState } from 'react';
import { FaBlog } from 'react-icons/fa6';
import { AiFillFileAdd, AiOutlineHome } from 'react-icons/ai';
import { GrContact, GrContactInfo, GrDomain, GrLogout } from 'react-icons/gr';
import { BsTicket } from 'react-icons/bs';
import { SiCloudflarepages, SiPagekit } from 'react-icons/si';

const SideNavberSeller = () => {
    const { user, logOut, shopInfo } = useContext(AuthContext)
    const [responsive, setResponsive] = useState(false)

    return (


        <div className={responsive ? "flex  h-full  flex-col  p-3 w-30  border-r-2  " : "flex flex-col  p-6 w-60 h-full "}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    {!responsive && <Link
                        to="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                    >
                        <svg
                            className="w-8 text-white"
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
                        {!responsive && <span className="ml-2 text-xl font-bold tracking-wide text-white ">
                            SaleNow
                        </span>}
                    </Link>}
                    {responsive ?

                        <button
                            onClick={() => setResponsive(false)}
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <svg
                                className="w-8 text-white"
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

                        </button>
                        :
                        <button onClick={() => setResponsive(true)} className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-100">
                                <rect width="352" height="32" x="80" y="96"></rect>
                                <rect width="352" height="32" x="80" y="240"></rect>
                                <rect width="352" height="32" x="80" y="384"></rect>
                            </svg>
                        </button>

                    }
                </div>

                {!responsive && <div className="flex-1 h-full ">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">


                        <li className="rounded-sm  hover:bg-gray-800">
                            <Link to={'/seller/dashboard'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <AiOutlineHome className="w-5 h-5 fill-current text-gray-400" />

                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li className="rounded-sm">
                            <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                <summary
                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                >
                                    <div className='flex cursor-pointer items-center gap-2'>
                                        <ImBlog className="w-5 h-5 fill-current text-gray-400" />

                                        <span>Blog</span>
                                    </div>

                                    <span
                                        className="shrink-0 transition duration-300 group-open:-rotate-180"
                                    >
                                        <IoIosArrowDown className="h-5 w-5" />

                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                        <Link
                                            to={'/seller/manage-blogs'}
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                        >
                                            <MdOutlineManageSearch className='w-5 h-5 fill-current text-gray-400' />  Manage Blogs
                                        </Link>
                                    </li>
                                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                        <Link
                                            to={'/seller/manage-blogs/add-blog'}
                                            className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                        >
                                            <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' />   Add Blog
                                        </Link>
                                    </li>


                                </ul>
                            </details>
                        </li>
                        <li className="rounded-sm">
                            <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                <summary
                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                >
                                    <div className='flex cursor-pointer items-center gap-2'>
                                        <MdContacts className="w-5 h-5 fill-current text-gray-400" />

                                        <span>Contact</span>
                                    </div>

                                    <span
                                        className="shrink-0 transition duration-300 group-open:-rotate-180"
                                    >
                                        <IoIosArrowDown className="h-5 w-5" />

                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                        <Link
                                            to={'/seller/manage-contact'}
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                        >
                                            <MdContactSupport className='w-5 h-5 fill-current text-gray-400' />  Contact
                                        </Link>
                                    </li>
                                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                        <Link
                                            to={'/seller/manage-contact/add-contact'}
                                            className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                        >
                                            <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' />   Add Contact
                                        </Link>
                                    </li>


                                </ul>
                            </details>
                        </li>
                        <li className="rounded-sm">
                            <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                <summary
                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                >
                                    <div className='flex cursor-pointer items-center gap-2'>
                                        <SiCloudflarepages className="w-5 h-5 fill-current text-gray-400" />

                                        <span>Manage Pages</span>
                                    </div>

                                    <span
                                        className="shrink-0 transition duration-300 group-open:-rotate-180"
                                    >
                                        <IoIosArrowDown className="h-5 w-5" />

                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                        <Link
                                            to={'/seller/manage-pages'}
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                        >
                                            <SiPagekit className='w-5 h-5 fill-current text-gray-400' />  Manage Pages
                                        </Link>
                                    </li>
                                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                        <Link
                                            to={'/seller/manage-pages/add-page'}
                                            className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                        >
                                            <AiFillFileAdd className='w-5 h-5 fill-current text-gray-400' />   Add Page
                                        </Link>
                                    </li>


                                </ul>
                            </details>
                        </li>


                        <li className="rounded-sm  hover:bg-gray-800">
                            <Link to={'/seller/support-tickets'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <BsTicket className="w-5 h-5 fill-current text-gray-400" />

                                <span>Support Ticket</span>
                            </Link>
                        </li>
                        <li className="rounded-sm  hover:bg-gray-800">
                            <Link to={'/seller/shop-profile'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                <IoStorefront className="w-5 h-5 fill-current text-gray-400" />

                                <span>Shop Profile</span>
                            </Link>
                        </li>
                        <li className="rounded-sm  hover:bg-gray-800">
                            <Link to={'/seller/domain-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <MdDomain className="w-5 h-5 fill-current text-gray-400" />
                                <span>Domain Management</span>
                            </Link>
                        </li>
                        <li className="rounded-sm  hover:bg-gray-800">
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-400">
                                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                </svg>
                                <span>Wishlist</span>
                            </a>
                        </li>
                        <li className="rounded-sm  hover:bg-gray-800">
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-400">
                                    <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                    <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                </svg>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li className="rounded-sm  hover:bg-gray-800">
                            <button onClick={() => logOut()} className="flex items-center p-2 space-x-3 rounded-md ">

                                <IoLogOut className='w-5 h-5 fill-current text-gray-400' />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>}
                {
                    responsive &&
                    <div className="flex-1 ">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <Link to={'/seller/manage-blogs'} className='flex items-center  space-x-3 rounded-md'>
                                <FaBlog className='w-8 h-8 fill-current text-gray-400' />
                            </Link>
                        </ul>
                    </div>
                }
            </div>


            {!responsive && (
                <div className=' bottom-5'>
                    <div className="flex items-center sticky bottom-5 p-2 mt-12 space-x-4 justify-self-end">
                        <img loading='eager' src={shopInfo.logo} alt="" className="w-12 h-12 rounded-lg bg-gray-500" />
                        <div className='relative'>
                            <div className=''>
                                <h2 className="text-lg font-semibold">{user?.name}</h2>
                                <span className="flex items-center space-x-1">
                                    <Link to={`/shop/${shopInfo?.shopId}`} className="text-xs hover:underline text-gray-400">
                                        View Your Shop
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default SideNavberSeller;