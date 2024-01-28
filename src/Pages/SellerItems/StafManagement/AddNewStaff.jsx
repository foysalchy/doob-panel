import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import BrightAlert from 'bright-alert';

const AddNewStaff = () => {
    const { shopInfo } = useContext(AuthContext)
    const [searchValue, setSearchValue] = useState('')
    const [selectedValue, setSelectedValue] = useState([])
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const [value, setValue] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [newUser, setIsNewUser] = useState(false)

    const handleSearch = () => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/seller-allUser?email=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                 if (data?.status) {
                    setValue(data?.data)
                } else {
                    setError(data?.message)
                }
            })
    };



    const options = [
        { name: 'Manage Blogs', route: 'manage-blogs' },
        { name: 'Manage Contact', route: 'manage-contact' },
        { name: 'Manage Pages', route: 'manage-pages' },
        { name: 'Staf Account', route: 'staf-account' },
        { name: 'Support Tickets', route: 'support-tickets' },
        { name: 'User Tickets', route: 'user-tickets' },
        { name: 'Shop Profile', route: 'shop-profile' },
        { name: 'Domain Management', route: 'domain-management' },
        { name: 'Settings', route: 'settings' },
        { name: 'Channel Integration', route: 'channel-integration' },
        { name: 'Categories Management', route: 'categories-management' },
        { name: 'Product Management', route: 'product-management' },
        { name: 'Staff Management', route: 'staff-management' },
        { name: 'Orders', route: 'orders' },
        { name: 'Pos', route: 'pos' },
        // Add more options as needed
    ];

    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = value;
        const shopEmail = shopInfo?.shopEmail
        const permissions = selectedValue

        const data = { user, shopEmail, permissions, role }
         fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/staff-add`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    BrightAlert(`${data.message}`, '', "success")
                }
                else {
                    BrightAlert(`Something went wrong`, '', "error")
                }

            })
    }



    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-gray-100 p-4'>
                {isNewUser ? <div>
                    <div className='pb-3'>
                        <div className="flex flex-col gap-3 mt-3">
                            <label className='' htmlFor="fullname">Input FullName</label>
                            <input type="text" id='fullname' className="w-full p-2 rounded-md ring-1 mt-1 ring-gray-200" placeholder='input user fullname' />
                        </div>
                        <div className="flex flex-col gap-3 mt-3">
                            <label className='' htmlFor="email">Input Email</label>
                            <input type="text" className="w-full p-2 rounded-md ring-1 mt-1 ring-gray-200" placeholder='input user email' />
                        </div>
                        <div className="flex flex-col gap-3 mt-3">
                            <label className='' htmlFor="password">Input Password</label>
                            <input type="text" className="w-full p-2 rounded-md ring-1 mt-1 ring-gray-200" placeholder='input user password' />
                        </div>
                    </div>
                </div> :
                    <div className="">
                        <label className='' htmlFor="user">Select User</label>
                        <div className="relative pt-2 flex items-center gap-4 text-left w-full">
                            <input
                                id='user'
                                type="text"
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search or Select"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />


                            <button className='bg-black text-white py-2 px-4' type='button' onClick={() => handleSearch()}>
                                search
                            </button>
                        </div>

                        {value?.name ? <input type="text" readOnly value={value?.name} className="w-full p-2 rounded-md ring-1 mt-2 text-green-500 ring-gray-200" placeholder='input user role' /> : <input type="text" readOnly value={`${error} and search again!! `} className="w-full p-2 text-red-500 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role' />}
                    </div>}
                    
                <label htmlFor="check">
                    <input type="checkbox" id='check' onChange={(e) => setIsNewUser(e.target.checked)} />
                    <span className='ml-2'>New User</span>
                </label>
                <br /> <br />

                {/* <label className='' htmlFor="user">Select User</label>
                <div className="relative pt-2 flex items-center gap-4 text-left w-full">
                    <input
                        id='user'
                        type="text"
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search or Select"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                 
                    <button className='bg-black text-white py-2 px-4' type='button' onClick={() => handleSearch()}>
                        search
                    </button>
                </div>


                {value?.name ? <input type="text" readOnly value={value?.name} className="w-full p-2 rounded-md ring-1 mt-2 text-green-500 ring-gray-200" placeholder='input user role' /> : <input type="text" readOnly value={`${error} and search again!! `} className="w-full p-2 text-red-500 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role' />}
                <br /><br /> */}
                <label className='' htmlFor="user">Input Role</label>
                <input onChange={(e) => setRole(e.target.value)} type="text" className="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role' />
                <br /><br />
                <label className='' htmlFor="user">Select Permissions </label>
                <Select
                    // lassName="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role'
                    options={options}
                    isMulti={true}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.route}
                    onChange={handleChange}
                />

                <input className='px-12 py-2 rounded-md bg-blue-500 text-white mt-6' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddNewStaff;