import React from 'react';
import { useContext } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { Outlet } from 'react-router-dom';
import ProfileUpdate from './ProfileUpdate/ProfileUpdate';

const UserProfile = () => {

    const { shopUser } = useContext(ShopAuthProvider)
    console.log(shopUser);

    return (
        <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
            <div className='flex gap-8'>
                <div>
                    <small>Hello, {shopUser?.displayName}</small>
                    <div className='mt-4'>
                        <h1 className='text-xl font-semibold'>Manage Your Account</h1>
                        <div className='ml-4'>
                            <h1>My Profile</h1>
                            <h1>Address Book</h1>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    {/* <Outlet /> */}
                    <ProfileUpdate />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;