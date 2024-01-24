import React, { useContext } from 'react';
import Logo from '../../../assets/Logo.png'
import { Link, NavLink } from 'react-router-dom';
import { FaBlogger } from 'react-icons/fa6';
import { BiHomeAlt, BiLogOut } from 'react-icons/bi';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { IoLogOutOutline } from "react-icons/io5";

const UserSidebar = () => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div className='h-screen'>
            <div class="  bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
                <div class="flex justify-between  items-center space-x-3">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" fill="white" />
                    </svg>
                    <p class="text-2xl leading-6 text-white">OvonRueden</p>
                </div>
                <div aria-label="toggler" class="flex justify-center items-center">
                    <button aria-label="open" id="open" onclick="showNav(true)" class="hidden focus:outline-none focus:ring-2">
                        <svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 12H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 18H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button aria-label="close" id="close" onclick="showNav(true)" class=" focus:outline-none focus:ring-2">
                        <svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 6L18 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="Main" class="xl:rounded-r transform  h-full xl:translate-x-0  ease-in-out transition duration-500 flex flex-col justify-between  items-start w-full sm:w-64 bg-gray-900">
                <div className="w-full">
                    <div class="hidden xl:flex justify-start p-6 items-center space-x-3">
                        <img className="w-32" src={`http://localhost:5173/Logo.png`} srcSet={`http://localhost:5173/Logo.png`} alt="" />
                    </div>

                    <div class="mt-6 h-full flex flex-col justify-start items-center  pl-4 w-full space-y-3 pb-5 ">
                        <NavLink rel=" noopener noreferrer" to='dashboard' className={({ isActive }) => {
                            return isActive
                                ? "flex jusitfy-start items-center w-full py-2 px-2 bg-gray-800 duration-200 -ml-5 space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded "
                                : "flex jusitfy-start items-center w-full py-2 px-2  -ml-5 space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ";
                        }}>

                            <BiHomeAlt className="w-5 h-5 fill-current text-gray-400" />
                            <p class="text-base leading-4 ">Dashboard</p>
                        </NavLink>
                        <NavLink rel=" noopener noreferrer" to='orders' className={({ isActive }) => {
                            return isActive
                                ? "flex jusitfy-start items-center w-full py-2 px-2 bg-gray-800 duration-200 -ml-5 space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded "
                                : "flex jusitfy-start items-center w-full py-2 px-2  -ml-5 space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ";
                        }}>

                            <BiHomeAlt className="w-5 h-5 fill-current text-gray-400" />
                            <p class="text-base leading-4 ">Orders</p>
                        </NavLink>
                        <NavLink rel=" noopener noreferrer" to='wishlist' className={({ isActive }) => {
                            return isActive
                                ? "flex jusitfy-start items-center w-full py-2 px-2 bg-gray-800 duration-200 -ml-5 space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded "
                                : "flex jusitfy-start items-center w-full py-2 px-2  -ml-5 space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ";
                        }}>

                            <BiHomeAlt className="w-5 h-5 fill-current text-gray-400" />
                            <p class="text-base leading-4 ">My WishList</p>
                        </NavLink>

                        <button onClick={() => logOut()} className="flex jusitfy-start items-center w-full py-2 px-2 bg-[#ef293d] duration-200 -ml-5 space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded">
                            <IoLogOutOutline className='text-xl mr-6' /> Logout
                        </button>
                    </div>
                </div>
                <div class="flex flex-col border-t border-gray-700 pt-2 justify-between items-center  pb-6   px-6  w-full  space-y-32 ">
                    <div class=" flex justify-between items-center w-full">
                        <Link to={``} class="flex justify-center items-center  space-x-2">
                            <div>
                                <img class="rounded-full" src="https://i.ibb.co/L1LQtBm/Ellipse-1.png" alt="avatar" />
                            </div>
                            <div class="flex justify-start flex-col items-start">
                                <p class="cursor-pointer text-sm leading-5 text-white">{user?.name}</p>
                                <p class="cursor-pointer text-xs leading-3 text-gray-300">{user.email}</p>
                            </div>
                        </Link>
                        <svg class="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserSidebar;