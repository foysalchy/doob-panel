import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const AddNewStaff = () => {
    const { shopInfo } = useContext(AuthContext)
    const [searchValue, setSearchValue] = useState('')
    const { data: menuItems = [], refetch } = useQuery({
        queryKey: ["menuItems"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/seller-allUser?shopId=${shopInfo?.shopId}`);
            const data = await res.json();
            return data?.data;
        },
    });
    console.log(menuItems);
    const [value, setValue] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [userInfo, setUserInfo] = useState({})

    const handleSearch = () => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/seller-allUser?email=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                console.log(data, '++++++++++')
            })
    };

    // const handleSelect = (selectedItem) => {
    //     let pars = JSON.parse(selectedItem);
    //     setValue(pars?.name);
    //     setUserInfo(pars);
    //     setFilteredItems([]);
    // };

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
        console.log('Selected Option:', selectedOption);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = e.body.userInfo
        const shopEmail = req.body.shopEmail
        const permissions = req.body.permissions

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/staff-add`, {

        })
    }



    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-gray-100 p-4'>
                <label className='' htmlFor="user">Select User</label>
                <div className="relative pt-2 inline-block text-left w-full">
                    <input
                        id='user'
                        type="text"
                        value={value}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search or Select"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {/* {filteredItems.length > 0 && (
                        <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg">
                            {filteredItems.slice(0, 10).map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                    onClick={() => handleSelect(JSON.stringify(item))}
                                >
                                    {item?.name}
                                </div>
                            ))}
                        </div>
                    )} */}

                    <button type='button' onClick={() => handleSearch()}>
                        search
                    </button>
                </div>
                <br /><br />
                <label className='' htmlFor="user">Input Role</label>
                <input type="text" className="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role' />
                <br /><br />
                <label className='' htmlFor="user">Input Role</label>
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