import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import BrightAlert from 'bright-alert';

const AddPriceRole = () => {

    const { shopInfo } = useContext(AuthContext)

    const { data: priceRole = {}, refetch, isLoading } = useQuery({
        queryKey: ["getaway"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/get-price-role/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const priceRole = e.target.priceRole.value
        const shopId = shopInfo._id
        const data = { priceRole, shopId }

        fetch('https://backend.doob.com.bd/api/v1/seller/add-price-role', {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => {
            refetch()
            BrightAlert("")
        })
    }




    console.log(priceRole);

    return (
        <div className="flex flex-col  h-screen">
            <div className='flex gap-2 items-center justify-center'>
                <p>Your Price role</p>  <span className='kalpurush'> : ৳</span> <span>{priceRole.data}</span>
            </div>
            <form className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                        Price Role
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="priceRole"
                        type="text"
                        name="priceRole"
                        placeholder="Enter Price Role"
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