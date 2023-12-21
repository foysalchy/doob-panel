import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ShopAuthProvider } from '../../../../../../AuthProvider/ShopAuthProvide';

const ProfileUpdate = () => {

    const [editProfile, setEditProfile] = useState(false)
    const { shopUser, updateProfile } = useContext(ShopAuthProvider)

    const [name, setName] = useState("")

    const submit = () => {
        updateProfile(name)
        setEditProfile(false)
    }

    return (
        <div className='bg-gray-200 rounded w-full py-10 px-8'>
            <div className='grid grid-cols-3 gap-7'>
                <div>
                    <h1>Full Name</h1>
                    {!editProfile ? <div>
                        {shopUser ? shopUser?.displayName : "Input Your Name"}
                    </div> : <div>
                        <input onChange={(e) => setName(e.target.value)} className='px-4 py-1 ' defaultValue={shopUser.displayName} type="text" />
                    </div>}
                </div>
                <div>
                    <h1>Email Address</h1>
                    {shopUser ? shopUser?.email : "Input Your Name"}

                </div>
                <div>
                    <h1>Phone Number <span className='text-blue-500'> | Add</span></h1>
                    {shopUser ? shopUser?.phoneNumber : "Input Your Name"}

                </div>
                <div>
                    <h1>Birthday</h1>
                    {!editProfile ? <div>
                        {shopUser ? shopUser?.birthday : "Input Your Name"}
                    </div> : <div>
                        <input defaultValue={shopUser?.birthday} type="date" />
                    </div>}
                </div>
                <div>
                    <h1>Gender</h1>
                    {shopUser ? shopUser?.gender : "Input Your Name"}

                </div>
            </div>

            <div className='flex gap-4 mt-8'>
                {!editProfile ? <button onClick={() => setEditProfile(true)}>
                    Edit Profile
                </button> : <button onClick={() => submit}>
                    Save Update
                </button>}
                <button>
                    Change Your Password
                </button>
            </div>

        </div>
    );
};

export default ProfileUpdate;