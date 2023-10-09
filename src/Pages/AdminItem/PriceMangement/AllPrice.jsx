import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AllPrice = () => {
    const [loading, setLoading] = useState(false)
    const {
        data: prices = [],
        refetch,

    } = useQuery({
        queryKey: ["prices"],
        queryFn: async () => {
            const res = await fetch(
                "http://localhost:5000/admin/pricing",
            );
            const data = await res.json();
            return data;
        },
    });


    const publishHandle = (id) => {
        setLoading(true)
        console.log(id);
        fetch(`http://localhost:5000/admin/pricing/status/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire("success", "Your Price Publish Successfully", "success");
                refetch()
            });
    }

    const unpublishHandle = (id) => {

        console.log(id);
        fetch(`http://localhost:5000/admin/pricing/unstatus/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire("success", "Your Price Publish Successfully", "success");
                refetch()
            });
    }
    const DeletePrice = (id) => {

        console.log(id);
        fetch(`http://localhost:5000/admin/pricing/delete/${id}`, {
            method: "Delete",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire("success", "Your Price Delete Successfully", "success");
                refetch()
            });
    }




    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

            <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">

                {
                    prices.map((price, index) => (
                        <div>
                            {price.best ?
                                <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{price.name}</div>
                                        <div className="flex items-center justify-center mt-2">
                                            <div className="mr-1 text-5xl font-bold">{price.price}</div>
                                            <div className="text-gray-700">/ {price.timeDuration}</div>
                                        </div>
                                        <div className="mt-4 space-y-3">
                                            {

                                                price.benefits.map((benefit, index) => (
                                                    <li className="flex items-center space-x-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-gay-900">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                        </svg>
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))

                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-5'>
                                            <button
                                                onClick={() => DeletePrice(price._id)}
                                                className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                                            >
                                                Delete
                                            </button>
                                            {!price.status ?
                                                <button
                                                    onClick={() => publishHandle(price._id)}
                                                    className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                >
                                                    Publish
                                                </button> :
                                                <button
                                                    onClick={() => unpublishHandle(price._id)}
                                                    className="inline-flex items-center justify-center w-full h-12 px-3 mt-6 font-medium tracking-wide text-white transition duration-200 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                >
                                                    UnPublish
                                                </button>
                                            }
                                        </div>
                                        <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                                            {price.tagname}
                                        </p>
                                    </div>
                                </div>
                                :
                                <div className="relative flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow border-purple-400">
                                    <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
                                        <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-purple-400">
                                            Most Popular
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{price.name}</div>
                                        <div className="flex items-center justify-center mt-2">
                                            <div className="mr-1 text-5xl font-bold">{price.price}</div>
                                            <div className="text-gray-700">/ {price.timeDuration}</div>
                                        </div>
                                        <div className="mt-4 space-y-3 ">
                                            {

                                                price.benefits.map((benefit, index) => (
                                                    <li className="flex items-center space-x-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-gay-900">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                        </svg>
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))

                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-5'>
                                            <button
                                                onClick={() => DeletePrice(price._id)}
                                                className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                                            >
                                                Delete
                                            </button>
                                            {!price.status ?
                                                <button
                                                    onClick={() => publishHandle(price._id)}
                                                    className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                >
                                                    Publish
                                                </button> :
                                                <button
                                                    onClick={() => unpublishHandle(price._id)}
                                                    className="inline-flex items-center justify-center w-full h-12 px-3 mt-6 font-medium tracking-wide text-white transition duration-200 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                >
                                                    UnPublish
                                                </button>
                                            }
                                        </div>
                                        <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                                            {price.tagname}
                                        </p>
                                    </div>
                                </div>}
                        </div>
                    ))
                }


            </div>
        </div>
    );
};

export default AllPrice;