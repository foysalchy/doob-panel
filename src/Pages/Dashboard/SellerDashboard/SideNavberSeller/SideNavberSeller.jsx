import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { IoLogOut, IoSettings, IoShareSocialSharp, IoStorefront } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdContactSupport, MdContacts, MdDomain, MdOutlineAddCircleOutline, MdOutlineIntegrationInstructions, MdOutlineManageSearch } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { ImBlog } from 'react-icons/im';
import { useState } from 'react';
import { FaBlog } from 'react-icons/fa6';
import { AiFillFileAdd, AiOutlineHome } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { BsTicket } from 'react-icons/bs';
import { SiCloudflarepages, SiPagekit } from 'react-icons/si';
import { BiArchive, BiBookContent, BiCategoryAlt } from 'react-icons/bi';
import Daraz from './Daraz.png';
import Logo from "../../../../../Logo.png";
import { CgClose } from 'react-icons/cg';
import { useQuery } from '@tanstack/react-query';

const SideNavberSeller = ({ responsive, setResponsive }) => {
    const { user, logOut, shopInfo } = useContext(AuthContext)

    const { data: prices = [], loader } = useQuery({
        queryKey: ["prices"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}`);
            const data = await res.json();
            localStorage.setItem('price', JSON.stringify(data?.data));
            return data?.data;
        },
    });

    //access route
    const managementPermission = (check) => {
        return prices?.permissions?.some(itm => itm?.name === check)
    };

    console.log(user, "--------");

    return (

        <div className='py-2 sticky'>

            <div className={`${responsive ? "flex  h-screen  overflow-y-auto  flex-col  md:p-3 p-0 lg:w-[70px] md:w-[70px] w-0  border-r-2  " : "flex flex-col  p-6 md:w-64 w-[300px]  h-screen  overflow-y-auto"} md:relative fixed  z-[4000] bg-[#111827] top-0 left-0 bottom-0`}>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        {!responsive && <Link
                            to="/"
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <img className="w-32" src={Logo} srcSet={Logo} alt="" />
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
                                <CgClose />
                            </button>

                        }
                    </div>

                    {!user.disable ? <>
                        {!responsive && <div className="flex-1 h-full ">
                            <ul className="pt-2 pb-4 space-y-1 text-sm">


                                <li className="rounded-sm  hover:bg-gray-800">
                                    <Link to={'/seller/dashboard'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <AiOutlineHome className="w-5 h-5 fill-current text-gray-400" />

                                        <span>Dashboard</span>
                                    </Link>
                                </li>

                                {/* start */}
                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Blog") ? (
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
                                    ) : null
                                ) : (
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
                                )}

                                {/* end */}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Contact") ? (
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
                                    ) : null
                                ) : (
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
                                )}


                                {/* start */}
                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Manage Pages") ? (
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
                                    ) : null
                                ) : (
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
                                )}

                                {/* end */}


                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Support Ticket") ? (
                                        <li className="rounded-sm  hover:bg-gray-800">
                                            <Link to={'/seller/support-tickets'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BsTicket className="w-5 h-5 fill-current text-gray-400" />

                                                <span>Support Ticket</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (
                                    <li className="rounded-sm  hover:bg-gray-800">
                                        <Link to={'/seller/support-tickets'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BsTicket className="w-5 h-5 fill-current text-gray-400" />

                                            <span>Support Ticket</span>
                                        </Link>
                                    </li>
                                )}



                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "User Support Ticket") ? (
                                        <li className="rounded-sm  hover:bg-gray-800">
                                            <Link to={'/seller/user-tickets'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BsTicket className="w-5 h-5 fill-current text-gray-400" />

                                                <span> User Support Ticket</span>
                                            </Link>
                                        </li>

                                    ) : null
                                ) : (
                                    <li className="rounded-sm  hover:bg-gray-800">
                                        <Link to={'/seller/user-tickets'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BsTicket className="w-5 h-5 fill-current text-gray-400" />

                                            <span> User Support Ticket</span>
                                        </Link>
                                    </li>

                                )}



                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Shop Profile") ? (
                                        <li className="rounded-sm  hover:bg-gray-800">
                                            <Link to={'/seller/shop-profile'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                                <IoStorefront className="w-5 h-5 fill-current text-gray-400" />

                                                <span>Shop Profile</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (

                                    <li className="rounded-sm  hover:bg-gray-800">
                                        <Link to={'/seller/shop-profile'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                            <IoStorefront className="w-5 h-5 fill-current text-gray-400" />

                                            <span>Shop Profile</span>
                                        </Link>
                                    </li>
                                )}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Domain Management") ? (

                                        managementPermission('Domain Management') && <li className="rounded-sm  hover:bg-gray-800">
                                            <Link to={'/seller/domain-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <MdDomain className="w-5 h-5 fill-current text-gray-400" />
                                                <span>Domain Management</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (

                                    managementPermission('Domain Management') && <li className="rounded-sm  hover:bg-gray-800">
                                        <Link to={'/seller/domain-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <MdDomain className="w-5 h-5 fill-current text-gray-400" />
                                            <span>Domain Management</span>
                                        </Link>
                                    </li>
                                )}
                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Settings") ? (

                                        <li className="rounded-sm  hover:bg-gray-800">
                                            <Link to={'/seller/settings'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                                <FiSettings className="w-5 h-5  text-gray-400"></FiSettings>
                                                <span>Settings</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (

                                    <li className="rounded-sm  hover:bg-gray-800">
                                        <Link to={'/seller/settings'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                            <FiSettings className="w-5 h-5  text-gray-400"></FiSettings>
                                            <span>Settings</span>
                                        </Link>
                                    </li>
                                )}
                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Channel Integration") ? (
                                        managementPermission('Channel Integration') && <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/channel-integration'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                                                <MdOutlineIntegrationInstructions className="w-5 h-5 text-gray-400" />
                                                <span>Channel Integration</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (

                                    managementPermission('Channel Integration') && <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/channel-integration'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                                            <MdOutlineIntegrationInstructions className="w-5 h-5 text-gray-400" />
                                            <span>Channel Integration</span>
                                        </Link>
                                    </li>
                                )}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Category") ? (
                                        <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/categories-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiCategoryAlt className="w-5 h-5 text-gray-400" />
                                                <span>Category</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (
                                    <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/categories-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiCategoryAlt className="w-5 h-5 text-gray-400" />
                                            <span>Category</span>
                                        </Link>
                                    </li>
                                )}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Content Management") ? (
                                        <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/content-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiBookContent className="w-5 h-5 text-gray-400" />
                                                <span>Content Management</span>
                                            </Link>
                                        </li>

                                    ) : null
                                ) : (
                                    <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/content-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiBookContent className="w-5 h-5 text-gray-400" />
                                            <span>Content Management</span>
                                        </Link>
                                    </li>

                                )}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Product Management") ? (
                                        <li className="rounded-sm hover:bg-gray-800">
                                            <Link to="/seller/product-management" rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiArchive className="w-5 h-5 text-gray-400" />
                                                <span>Product Management</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (
                                    <li className="rounded-sm hover:bg-gray-800">
                                        <Link to="/seller/product-management" rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiArchive className="w-5 h-5 text-gray-400" />
                                            <span>Product Management</span>
                                        </Link>
                                    </li>
                                )}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Product Management") ? (
                                        managementPermission('Warehouse') && <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/warehouse'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiArchive className="w-5 h-5 text-gray-400" />
                                                <span>Warehouse Management</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (
                                    managementPermission('Warehouse') && <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/warehouse'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiArchive className="w-5 h-5 text-gray-400" />
                                            <span>Warehouse Management</span>
                                        </Link>
                                    </li>
                                )}


                                {/* {user?.staffRole && managementPermission('Warehouse') && <li className="rounded-sm hover:bg-gray-800">
                                    <Link to={'/seller/warehouse'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <BiArchive className="w-5 h-5 text-gray-400" />
                                        <span>Warehouse Management</span>
                                    </Link>
                                </li>} */}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Staff Account") ? (
                                        managementPermission('Staff Account') && <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/staff-account'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiArchive className="w-5 h-5 text-gray-400" />
                                                <span>Staff Account</span>
                                            </Link>
                                        </li>
                                    ) : null
                                ) : (
                                    managementPermission('Staff Account') && <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/staff-account'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiArchive className="w-5 h-5 text-gray-400" />
                                            <span>Staff Account</span>
                                        </Link>
                                    </li>
                                )}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Order Management") ? (
                                        <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiArchive className="w-5 h-5 text-gray-400" />
                                                <span>Order Management</span>
                                            </Link>
                                        </li>

                                    ) : null
                                ) : (
                                    <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiArchive className="w-5 h-5 text-gray-400" />
                                            <span>Order Management</span>
                                        </Link>
                                    </li>

                                )}
                                {/* report managements */}

                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Order Management") ? (
                                        <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/report-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiArchive className="w-5 h-5 text-gray-400" />
                                                <span>Report Management</span>
                                            </Link>
                                        </li>

                                    ) : null
                                ) : (
                                    <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/report-management'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiArchive className="w-5 h-5 text-gray-400" />
                                            <span>Report Management</span>
                                        </Link>
                                    </li>

                                )}
                                {user?.staffRole ? (
                                    user?.permissions.find(itm => itm?.name === "Order Management") ? (
                                        managementPermission('POS') && <li className="rounded-sm hover:bg-gray-800">
                                            <Link to={'/seller/pos'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <BiArchive className="w-5 h-5 text-gray-400" />
                                                <span>POS</span>
                                            </Link>
                                        </li>

                                    ) : null
                                ) : (
                                    managementPermission('POS') && <li className="rounded-sm hover:bg-gray-800">
                                        <Link to={'/seller/pos'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <BiArchive className="w-5 h-5 text-gray-400" />
                                            <span>POS</span>
                                        </Link>
                                    </li>

                                )}

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
                    </>
                        :
                        <div className='mt-10'>
                            <div className="rounded-sm   hover:bg-gray-800">
                                <Link to={'/seller/support-tickets'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                                    <BsTicket className="w-5 h-5 fill-current text-gray-400" />
                                    <span>Support Ticket</span>
                                </Link>
                            </div>
                            <div className="rounded-sm  hover:bg-gray-800">
                                <button onClick={() => logOut()} className="flex items-center p-2 space-x-3 rounded-md ">

                                    <IoLogOut className='w-5 h-5 fill-current text-gray-400' />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>}
                </div>


                {
                    !responsive && (
                        <div className=' bottom-5'>
                            <div className="flex items-center sticky bottom-5 p-2 mt-12 space-x-4 justify-self-end">
                                <img loading='eager' src={shopInfo.logo} srcSet={shopInfo.logo} alt="" className="w-12 h-12 rounded-lg bg-gray-500" />
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
                    )
                }
            </div>
        </div>

    );
};

export default SideNavberSeller;