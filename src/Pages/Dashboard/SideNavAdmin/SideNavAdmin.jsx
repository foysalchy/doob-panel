import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { BiCategory, BiHomeAlt, BiSolidShoppingBags } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { FaBlogger, FaStore, FaUsersGear } from 'react-icons/fa6';
import { MdOutlineRoomPreferences, MdOutlineSubscriptions } from 'react-icons/md';
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2';
import { SiGoogledomains } from 'react-icons/si';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineAlert, AiOutlineClose } from 'react-icons/ai';
import { BsChatLeftQuote, BsTicketDetailed } from 'react-icons/bs';
import { GiNotebook } from 'react-icons/gi';
import { IoLogOut, IoSettings, } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import Logo from "../../../../Logo.png";

const SideNavAdmin = () => {
    const { user, logOut } = useContext(AuthContext)
    const [menu, setMenu] = useState(true)

    return (
        <div className='py-6 sticky'>
            <div className={menu ? "flex flex-col h-screen p-2  w-60 text-gray-900 overflow-y-auto" : 'flex flex-col h-screen p-3 w-14 text-gray-900 overflow-y-auto'}>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        {menu ? <Link
                            to="/"
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <img className="w-32" src={Logo} alt="" />
                        </Link> : <Link
                            to="/"
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

                        </Link>}
                        {!menu ? <button className="p-2">

                            <HiOutlineMenu onClick={() => setMenu(true)} className="w-5 h-5 fill-current text-gray-900" />
                        </button> :
                            <button className="p-2">

                                <AiOutlineClose onClick={() => setMenu(false)} className="w-5 h-5 fill-current text-gray-900" />
                            </button>}
                    </div>

                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            {/* " hover:" */}
                            <NavLink rel="noopener noreferrer" to='/admin/dashboard' className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>

                                <BiHomeAlt className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Home</span>}
                            </NavLink>


                            <NavLink to='/admin/blog' rel="noopener noreferrer" href="#" className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <FaBlogger className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Blogs</span>}
                            </NavLink>


                            <NavLink to='/admin/manage-product' rel="noopener noreferrer" href="#" className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <FaStore className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span> Products Management</span>}
                            </NavLink>




                            <NavLink rel="noopener noreferrer" to='/admin/manage-category' className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Sevice Category </span>}
                            </NavLink>

                            <NavLink rel="noopener noreferrer" to={'/admin/faq'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>FAQ Management</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" to={'/admin/price-management'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <AiOutlineAlert className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span> Price Management</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" to={'/admin/page-management'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Page Management</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" to={'/admin/services'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Service Management</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" to={'/admin/contact'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <SiGoogledomains className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Contact Management</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" to={'/admin/settings'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <IoSettings className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Settings</span>}
                            </NavLink>


                            <NavLink to={'/admin/support-ticket'} rel="noopener noreferrer" className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <BiSolidShoppingBags className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span> Support Ticket</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" to={'/admin/seller-management'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Seller Management</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" to={'/admin/warehouse'} className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <GiNotebook className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Warehouse Management</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" href="#" className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <BsChatLeftQuote className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Omni Chat</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" href="#" className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <MdOutlineRoomPreferences className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Referral program</span>}
                            </NavLink>


                            <NavLink rel="noopener noreferrer" href="#" className={({ isActive }) => {
                                return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                            }}>
                                <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Customer manage
                                </span>}
                            </NavLink>




                            <button rel="noopener noreferrer" onClick={() => logOut()} className="flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white w-full"
                            >
                                <IoLogOut className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Logout</span>}
                            </button>

                        </ul>
                    </div>
                </div>
                <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
                    {user?.image ? <img src={user.image} alt="" className="w-12 h-12 rounded-lg bg-gray-500" /> : <FaRegUserCircle className="w-12 h-12 rounded-lg " />}
                    {menu && <div>
                        <h2 className="text-lg font-semibold">{user?.name}</h2>
                        <span className="flex items-center space-x-1">
                            <NavLink rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">View profile</NavLink>
                        </span>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default SideNavAdmin;