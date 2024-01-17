import React, { useContext, useState } from 'react';
import Select from 'react-select';
import BrightAlert from 'bright-alert';

const AdminNewStaff = () => {
    const [searchValue, setSearchValue] = useState('')
    const [selectedValue, setSelectedValue] = useState([])
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const [value, setValue] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [userInfo, setUserInfo] = useState({})

    const handleSearch = () => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/seller-allUser?email=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                console.log(data, '+++++++');
                if (data?.status) {
                    setValue(data?.data)
                } else {
                    setError(data?.message)
                    setValue('')
                }
            })
    };



    const options = [
        { name: 'Blogs', route: 'blog' },
        { name: 'Manage Product', route: 'manage-product' },
        { name: 'Manage Category', route: 'manage-category' },
        { name: 'Faq', route: 'faq' },
        { name: 'Price Management', route: 'price-management' },
        { name: 'Page Management', route: 'page-management' },
        { name: 'Services', route: 'services' },
        { name: 'Contact', route: 'contact' },
        { name: 'Settings', route: 'settings' },
        { name: 'Support Ticket', route: 'support-ticket' },
        { name: 'Seller Management', route: 'seller-management' },
        { name: 'Warehouse', route: 'warehouse' },
        { name: 'Content Management', route: 'content-management' },
        { name: 'Staff Management', route: 'staff-management' },
        { name: 'Pos', route: 'pos' },
        // Add more options as needed
    ];

    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = value;
        const permissions = selectedValue

        const data = { user, permissions, role }
        console.log(data)
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/staff-role`, {
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
                <label className='' htmlFor="user">Select User</label>
                <div className="relative pt-2 flex items-center gap-4 text-left w-full">
                    <input
                        id='user'
                        type="text"
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

                    <button className='bg-black text-white py-2 px-4' type='button' onClick={() => handleSearch()}>
                        search
                    </button>
                </div>


                {value?.name ? <input type="text" readOnly value={value?.name} className="w-full p-2 rounded-md ring-1 mt-2 text-green-500 ring-gray-200" placeholder='input user role' /> : <input type="text" readOnly value={`${error} and search again!! `} className="w-full p-2 text-red-500 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role' />}
                <br /><br />
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

export default AdminNewStaff;