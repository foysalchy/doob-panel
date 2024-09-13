import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import BrightAlert from 'bright-alert';
import { useNavigate } from 'react-router-dom';
import showAlert from '../../../../Common/alert';

const AddPriceRole = () => {

    const { shopInfo } = useContext(AuthContext)

    const { data: priceRole = {}, refetch, isLoading } = useQuery({
        queryKey: ["getaway"],
        queryFn: async () => {
            const res = await fetch(`https://doob.dev/api/v1/seller/get-price-role/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const to = e.target.to.value
        const from = e.target.from.value
        const priceRange = e.target.priceRange.value
        const percentage = e.target.percentage.value
        const shopId = shopInfo._id;
        const data = { to, from, priceRange, shopId, percentage }

        fetch('https://doob.dev/api/v1/seller/add-price-role', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => {
            refetch()
            navigate('/seller/settings/price-role')
            showAlert("successfully done","","success")
        })
    }

    // console.log(priceRole?.data);



    return (
        <div className="flex flex-col  h-screen">
            <div className='flex gap-2 items-center justify-center'>
                {/* <p>Your Price role</p>  <span className='kalpurush'> : ৳</span> <span>{ }</span> */}
            </div>
            <form className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                            To
                        </label>
                        <input
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="priceRole"
                            type="number"
                            name="to"
                            placeholder="Enter To value"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                            From
                        </label>
                        <input
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="priceRole"
                            type="number"
                            name="from"
                            placeholder="Enter From value"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                        Percentage
                    </label>
                    <select
                        name="percentage"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                        Price Range
                    </label>
                    <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="priceRole"
                        type="number"
                        name="priceRange"
                        placeholder="Enter price range"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPriceRole;