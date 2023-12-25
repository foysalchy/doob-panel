import React, { useContext, useState } from 'react';
import { ShopAuthProvider } from '../../../../../../AuthProvider/ShopAuthProvide';
import ChangePassword from './ChangePassword';

const ProfileUpdate = () => {
    const { shopUser, shopId, setToken, setShopUser } = useContext(ShopAuthProvider);
    const [editProfile, setEditProfile] = useState(false);




    const submit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const birthdate = e.target.birthdate.value;
        const gender = e.target.gender.value;
        const data = {
            name,
            phone,
            birthdate,
            gender,
            shopId
        };
        console.log(data);

        fetch(`http://localhost:5000/api/v1/shop/update/userInfo?token=${shopUser._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const user = result.user
                const userJSON = JSON.stringify(user);

                localStorage.setItem(`${shopId}`, userJSON);

                setToken(user);
                setShopUser(user)
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

        setEditProfile(false);
    };


    const [open, setOpen] = useState(false)

    return (
        <div className='bg-gray-200 rounded w-full py-10 px-8'>
            <form onSubmit={submit}>
                <div className='grid grid-cols-3 gap-7'>
                    <div>
                        <h1 className='font-bold mb-2'>Full Name</h1>
                        {!editProfile ? (
                            <div>{shopUser ? shopUser.name : "Input Your Name"}</div>
                        ) : (
                            <div>
                                <input
                                    name='name'
                                    onChange={(e) => setName(e.target.value)}
                                    className='px-4 py-1'
                                    defaultValue={shopUser?.name}
                                    type="text"
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className='font-bold mb-2'>Email Address</h1>
                        {shopUser ? shopUser.email : "Input Your Email Address"}
                    </div>
                    <div>
                        <h1 className='font-bold mb-2'>Phone Number</h1>
                        {!editProfile ? (
                            <div>{shopUser ? shopUser.phoneNumber : "Input Your Phone Number"}</div>
                        ) : (
                            <div>
                                <input
                                    name='phone' // Change this line from 'phoneNumber' to 'phone'
                                    placeholder='Input Your Phone Number'
                                    className='px-4 py-1'
                                    defaultValue={shopUser?.phoneNumber}
                                    type="text"
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="font-bold mb-2">Birthday</h1>
                        {!editProfile ? (
                            <div className="text-gray-600">
                                {shopUser ? shopUser.birthdate : "Input Your Birthday"}
                            </div>
                        ) : (
                            <div>
                                <input
                                    name='birthdate'
                                    defaultValue={shopUser?.birthdate}
                                    type="date"
                                    className="px-4 py-2 border border-gray-300 rounded"
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className='font-bold mb-2'>Gender</h1>
                        {!editProfile ? (
                            <div className="text-gray-600">
                                {shopUser?.gender ? shopUser.gender : "Prefer Not Say"}
                            </div>
                        ) : (
                            <select
                                onChange={(e) => setGender(e.target.value)}
                                name="gender"
                                id=""
                                className="px-4 py-2 border border-gray-300 rounded"
                            >
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"not-say"}>Prefer Not Say</option>
                            </select>
                        )}
                    </div>
                </div>

                <div className='flex gap-4 mt-8'>
                    {
                        editProfile && <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded">
                            Save Update
                        </button>}

                </div>
            </form>

            <div>
                <div>
                    {!editProfile &&
                        <div className='flex gap-4 mt-8'>
                            <button type='button' onClick={() => setEditProfile(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Edit Profile
                            </button>
                            <button onClick={() => setOpen(true)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Change Your Password
                            </button>
                        </div>}
                </div>

            </div>

            {open && <ChangePassword setOpen={setOpen} open={open} />}
        </div>
    );
};

export default ProfileUpdate;