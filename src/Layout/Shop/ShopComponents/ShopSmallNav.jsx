import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { IoCall } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { useLoaderData, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShopSmallNav = () => {

    const params = useParams();
    const shopId = params.id;

    console.log(shopId);

    const { data: shop = {}, refetch, isLoading } = useQuery({
        queryKey: ["buyer"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/shop/${shopId}`);
            const data = await res.json();
            return data;
        },
    });

    console.log(shop);
    const placeholderNumber = '555-123-4567';


    return (
        <div className='bg-black'>

            <div className=' mx-auto py-3 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
                <div className='flex gap-10'>
                    <h1 className='text-white flex gap-1 items-center'><IoCall />
                        <motion.h1
                            className='text-white font-semibold flex gap-1 items-center'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        > {shop?.shopNumber}</motion.h1>
                    </h1>
                    <h1 className='text-white flex gap-1 items-center'><MdEmail className='text-xl' /> <span className='font-semibold'>{shop?.shopEmail}</span></h1>
                </div>
            </div>
        </div>
    );
};

export default ShopSmallNav;