import React, { useState } from 'react';
import { useContext } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';

const SellerInputProductName = ({ product,brandName, setBrandName }) => {


    const { shopInfo } = useContext(AuthContext)
    const { data: AllBrand = [], refetch } = useQuery({
        queryKey: ["allBrand"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/brand/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });


    const handleBrand = (value) => {
        console.log(value);
        setBrandName(value)
    }




    return (
        <div>
            <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>

                <div className='flex flex-col'>
                    <span className='font-bold'>Product Information</span>
                    <small>Having accurate product information raises discoverability.</small>
                </div>
                <div className='flex flex-col mt-3'>
                    <span>Product Name <span className='text-red-500'> *</span></span>

                </div>

                <fieldset className="w-full  text-gray-100">
                    <label for="url" className="block text-sm font-medium">Website</label>
                    <div className="flex">
                        <span className="flex items-center px-3 pointer-events-none h-10 sm:text-sm rounded-l-md dark:bg-gray-700">English</span>
                        <input
                            defaultValue={product?.name ? product?.name : ''}
                            type="text" name="productNameEn" placeholder="Ex. Nikon Coolpix A300 Digital Camera" className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" />
                    </div>
                </fieldset>
                <fieldset className="w-full  dark:text-gray-100">
                    <label for="url" className="block text-sm font-medium">Website</label>
                    <div className="flex">
                        <span className="flex items-center px-3 pointer-events-none h-10 sm:text-sm rounded-l-md dark:bg-gray-700">Bengali</span>
                        <input
                            defaultValue={product?.BnName ? product?.BnName : ''}
                            type="text" name="productNameBn" placeholder="Ex. Nikon Coolpix A300 Digital Camera" className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" />
                    </div>
                </fieldset>


                <div className='mt-2'>
                    <label htmlFor="megaCategory">Select Your Brand</label>
                    <Select
                        id="megaCategory"
                        placeholder='Select your Brand'
                        onChange={(selectedOption) => handleBrand(selectedOption.value)}
                        options={AllBrand?.map((warehouse) => ({
                            value: warehouse.name,
                            label: warehouse.name
                        }))}
                    />
                </div>

                <div className='mt-2'>
                    <label htmlFor="megaCategory">Provide SKU</label>
                    <input defaultValue={`${shopInfo.shopId}_${Math.random().toString(36).substr(2, 6)}`} className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" type="text" required name="ProductSKU" id="" />
                </div>

            </div>
        </div>
    );
};

export default SellerInputProductName;
