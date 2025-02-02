import React from 'react';
import { useContext } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { Link, NavLink, Outlet } from 'react-router-dom';
import ProfileUpdate from './ProfileUpdate/ProfileUpdate';
import AddressBook from './ProfileUpdate/AddressBook';

const UserProfile = () => {
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;
    const { shopUser } = useContext(ShopAuthProvider)

    return (
        <div className='bg-[#f5f5f5]'>
            <div className='px-2 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
                <div className='flex md:flex-row flex-col gap-8  '>
                    <div className='bg-white p-4 h-[220px]'>
                        <small>Hello, {shopUser?.name}</small>
                        <div className='mt-4 w-64'>
                            <h1 className='text-xl font-semibold'>Manage Your Account</h1>
                            <div className='ml-4 flex flex-col'>
                                <div className='ml-4 flex flex-col'>
                                    <NavLink
                                        to={`/shop/${shopId}/user/my-profile`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "tracking-wide text-blue-500 font-bold"
                                                : "tracking-wide text-gray-800 transition-colors duration-200  hover:text-black"
                                        }
                                    >
                                        My Profile
                                    </NavLink>

                                    <NavLink
                                        to={`/shop/${shopId}/user/my-address`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "tracking-wide text-blue-500 font-bold"
                                                : "tracking-wide text-gray-800 transition-colors duration-200  hover:text-black"
                                        }
                                    >
                                        Address Book
                                    </NavLink>

                                    <NavLink
                                        to={`/shop/${shopId}/user/my-orders`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "tracking-wide text-blue-500 font-bold"
                                                : "tracking-wide text-gray-800 transition-colors duration-200  hover:text-black"
                                        }
                                    >
                                        My Order
                                    </NavLink>

                                    <NavLink
                                        to={`/shop/${shopId}/user/my-wish-list`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "tracking-wide text-blue-500 font-bold"
                                                : "tracking-wide text-gray-800 transition-colors duration-200  hover:text-black"
                                        }
                                    >
                                        My Wish List
                                    </NavLink>

                                    <NavLink
                                        to={`/shop/${shopId}/user/my-support`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "tracking-wide text-blue-500 font-bold"
                                                : "tracking-wide text-gray-800 transition-colors duration-200  hover:text-black"
                                        }
                                    >
                                        Support Ticket
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;