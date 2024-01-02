import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { useQuery } from '@tanstack/react-query';

const UserMyOrder = () => {

    const [steps, setStep] = useState({
        stepsItems: ["Order", "Processing", "Shipped", "Delivered"],
        // currentStep: 5
    })


    const { shop_id, shopUser } = useContext(ShopAuthProvider)

    const { data: myOrders = [], refetch, isLoading } = useQuery({
        queryKey: ["my-order"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/user/order?shopId=${shop_id.shop_id}&&token=${shopUser._id}`);
            const data = await res.json();
            return data;
        },
    });


    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    console.log(myOrders);


    return (
        <div className=''>
            <div className='px-4  py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-google'>
                {!isLoading ? <div className='flex flex-col gap-4'>
                    {
                        myOrders?.data?.map((order) => {
                            // Determine the current step based on order status
                            let currentStep;
                            if (!order.status) {
                                currentStep = 2;
                            } else if (order.status === 'delivery') {
                                currentStep = 5;
                            } else {
                                // Default to 1 or any other appropriate value
                                currentStep = 1;
                            }

                            return (
                                <div className=' p-4 rounded border-[0.5px] border-opacity-40 gap-4 border-gray-500 bg-gray-100'>
                                    <div className='pb-4 flex items-center justify-between'>
                                        <h1 className="text-xl font-bold ">Order Id : {order._id}</h1>
                                        <div className='flex items-center gap-4'>
                                            <p>Order placed {formatTimestamp(order.timestamp)}</p>
                                            <button className='text-blue-500'>View invoice →</button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        {
                                            order?.productList?.map((list) => (
                                                <div className='flex border p-4  justify-between gap-4 w-full'>

                                                    <div className='w-[50%]'> <img className='w-32 h-32 border border-opacity-40 rounded object-cover' src={list.img} alt="" /></div>

                                                    <div className='flex flex-col w-full  gap-1 '>  <h1 className='font-semibold text-lg '>{list.productName}</h1>
                                                        <p className='font-semibold'> Price: ${list.price}</p>
                                                        <p className='text-gray-500 text-clip'>Regular Price:  {list.regular_price} </p>
                                                    </div>
                                                    <div className='flex flex-col gap-1 w-full text-center'>
                                                        <h1 className='font-semibold text-lg '>Quantity</h1>
                                                        <p className='text-gray-500 text-center '>
                                                            {list.quantity}
                                                        </p>
                                                    </div>
                                                    <div className='flex flex-col gap-1 w-full'>
                                                        <h1 className='font-semibold text-lg '>Shipping updates</h1>
                                                        <p className='text-gray-500'>
                                                            {order.status ? order.status : "Progress"}

                                                        </p>
                                                    </div>

                                                    <div>
                                                        <button className='text-red-500'>Cancel</button>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="mt-4 mx-auto px-4 md:px-0">
                                        <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
                                            {steps.stepsItems.map((item, idx) => (
                                                <li aria-current={currentStep == idx + 1 ? "step" : false} className="flex-1 last:flex-none flex gap-x-2 md:items-center">
                                                    <div className="flex items-center flex-col gap-x-2">
                                                        <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${currentStep > idx + 1 ? "bg-indigo-600 border-indigo-600" : "" || currentStep == idx + 1 ? "border-indigo-600" : ""}`}>
                                                            <span className={` ${currentStep > idx + 1 ? "hidden" : "" || currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                                                {idx + 1}
                                                            </span>
                                                            {
                                                                currentStep > idx + 1 ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                                    </svg>
                                                                ) : ""
                                                            }
                                                        </div>
                                                        <hr className={`h-12 border md:hidden ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                                                    </div>
                                                    <div className="h-8 flex items-center md:h-auto">
                                                        <h3 className={`text-sm ${currentStep === idx + 1 ? "text-indigo-600" : ""}`}>
                                                            {item}
                                                        </h3>
                                                    </div>
                                                    <hr className={`hidden mr-2 w-full border md:block ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                </div> : <div className='text-3xl py-40'> Loading....</div>}

            </div>
        </div>
    );
};

export default UserMyOrder;