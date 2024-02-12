import React from 'react';
import { AiFillFileAdd, AiOutlineHome } from 'react-icons/ai';
import { BiArchive, BiBookContent, BiCategoryAlt } from 'react-icons/bi';
import { BsTicket } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { ImBlog } from 'react-icons/im';
import { IoIosArrowDown } from 'react-icons/io';
import { IoLogOut, IoShareSocialSharp, IoStorefront } from 'react-icons/io5';
import { MdContactSupport, MdDomain, MdOutlineAddCircleOutline, MdOutlineIntegrationInstructions, MdOutlineManageSearch } from 'react-icons/md';
import { SiCloudflarepages, SiPagekit } from 'react-icons/si';

const DemoNav = () => {
    return (
        <div className='py-2'>

            <div className=''>
                <div className="space-y-3">




                    <>
                        <div className="flex-1 h-full ">
                            <ul className="pt-2 pb-4 space-y-1 text-sm">


                                <li className="rounded-sm  hover:bg-gray-800">
                                    <button to={'/seller/dashboard'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <AiOutlineHome className="w-5 h-5 fill-current text-gray-400" />

                                        <span>Dashboard</span>
                                    </button>
                                </li>

                                {/* start */}

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
                                                <button
                                                    to={'/seller/manage-blogs'}
                                                    className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                                >
                                                    <MdOutlineManageSearch className='w-5 h-5 fill-current text-gray-400' />  Manage Blogs
                                                </button>
                                            </li>
                                            <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                                <button
                                                    to={'/seller/manage-blogs/add-blog'}
                                                    className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                                >
                                                    <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' />   Add Blog
                                                </button>
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
                                                <IoShareSocialSharp className="w-5 h-5 fill-current text-gray-400" />

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
                                                <button
                                                    to={'/seller/manage-contact'}
                                                    className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                                >
                                                    <MdContactSupport className='w-5 h-5 fill-current text-gray-400' />  Contact
                                                </button>
                                            </li>
                                            <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                                <button
                                                    to={'/seller/manage-contact/add-contact'}
                                                    className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                                >
                                                    <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' />   Add Contact
                                                </button>
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
                                                <button
                                                    to={'/seller/manage-pages'}
                                                    className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                                >
                                                    <SiPagekit className='w-5 h-5 fill-current text-gray-400' />  Manage Pages
                                                </button>
                                            </li>
                                            <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50'>
                                                <button
                                                    to={'/seller/manage-pages/add-page'}
                                                    className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                                >
                                                    <AiFillFileAdd className='w-5 h-5 fill-current text-gray-400' />   Add Page
                                                </button>
                                            </li>


                                        </ul>
                                    </details>
                                </li>




                                <li className="rounded-sm  hover:bg-gray-800">
                                    <button to={'/seller/support-tickets'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BsTicket className="w-5 h-5 fill-current text-gray-400" />

                                        <span>Support Ticket</span>
                                    </button>
                                </li>




                                <li className="rounded-sm  hover:bg-gray-800">
                                    <button to={'/seller/user-tickets'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BsTicket className="w-5 h-5 fill-current text-gray-400" />

                                        <span> User Support Ticket</span>
                                    </button>
                                </li>




                                <li className="rounded-sm  hover:bg-gray-800">
                                    <button to={'/seller/shop-profile'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                        <IoStorefront className="w-5 h-5 fill-current text-gray-400" />

                                        <span>Shop Profile</span>
                                    </button>
                                </li>
                                <li className="rounded-sm  hover:bg-gray-800">
                                    <button to={'/seller/domain-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <MdDomain className="w-5 h-5 fill-current text-gray-400" />
                                        <span>Domain Management</span>
                                    </button>
                                </li>


                                <li className="rounded-sm  hover:bg-gray-800">
                                    <button to={'/seller/settings'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                        <FiSettings className="w-5 h-5  text-gray-400"></FiSettings>
                                        <span>Settings</span>
                                    </button>
                                </li>
                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/channel-integration'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                                        <MdOutlineIntegrationInstructions className="w-5 h-5 text-gray-400" />
                                        <span>Channel Integration</span>
                                    </button>
                                </li>

                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/categories-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiCategoryAlt className="w-5 h-5 text-gray-400" />
                                        <span>Category</span>
                                    </button>
                                </li>



                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/content-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiBookContent className="w-5 h-5 text-gray-400" />
                                        <span>Content Management</span>
                                    </button>
                                </li>


                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to="/seller/product-management" rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Product Management</span>
                                    </button>
                                </li>

                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/warehouse'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Warehouse Management</span>
                                    </button>
                                </li>

                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/staff-account'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Staff Account</span>
                                    </button>
                                </li>

                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Order Management</span>
                                    </button>
                                </li>



                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/report-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Report Management</span>
                                    </button>
                                </li>
                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/pos'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>POS</span>
                                    </button>
                                </li>

                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/subscription-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Subscription Management</span>
                                    </button>
                                </li>




                                <li className="rounded-sm hover:bg-gray-800">
                                    <button to={'/seller/inventory-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Inventory Management</span>
                                    </button>
                                </li>


                                {/* <li className="rounded-sm  hover:bg-gray-800">
                                    <button onClick={() => logOut()} className="flex items-center p-2 space-x-3 rounded-md ">
                                        <IoLogOut className='w-5 h-5 fill-current text-gray-400' />
                                        <span>Logout</span>
                                    </button>
                                </li> */}
                            </ul>
                        </div>

                    </>



                </div>



            </div>
        </div>
    );
};

export default DemoNav;