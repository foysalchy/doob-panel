import React from 'react';
import { useContext } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { Link, Outlet } from 'react-router-dom';
import ProfileUpdate from './ProfileUpdate/ProfileUpdate';
import AddressBook from './ProfileUpdate/AddressBook';

const UserProfile = () => {
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;
    const { shopUser } = useContext(ShopAuthProvider)

    return (
        <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
            <div className='flex gap-8'>
                <div>
                    <small>Hello, {shopUser?.name}</small>
                    <div className='mt-4 w-64'>
                        <h1 className='text-xl font-semibold'>Manage Your Account</h1>
                        <div className='ml-4 flex flex-col'>
                            <Link to={`/shop/${shopId}/user/my-profile`} className='text-blue-500'>My Profile</Link>
                            <Link to={`/shop/${shopId}/user/my-address`} className='text-blue-500'>Address Book</Link>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;