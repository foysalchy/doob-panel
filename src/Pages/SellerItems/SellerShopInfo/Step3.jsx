import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const Step3 = ({ prevStep, submitForm, handleChange, values }) => {

    const { data: prices = [], refetch } = useQuery({
        queryKey: ["prices"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/pricing");
            const data = await res.json();
            return data;
        },
    });

    const { data: permission = [], loader } = useQuery({
        queryKey: ["prices"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}`);
            const data = await res.json();

            return data?.data;
        },
    });
    const [selectedPriceId, setSelectedPriceId] = useState(null);

    const handlePriceClick = (priceId) => {
        setSelectedPriceId(priceId);
        handleChange("priceId");
        values.priceId = priceId;
    };


    const [error, setError] = useState(true)

    useEffect(() => {
        if (!selectedPriceId) {

            setError(true);
        }
        else {

            setError(false)
        }
    }, [selectedPriceId]);

    return (
        <div>
            <div>
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className="h-2 w-[100%] rounded-full bg-blue-500"></div>
                </div>

                <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                    <li className="flex items-center justify-start text-blue-600 sm:gap-1.5">
                        <span className="hidden sm:inline"> Details </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                        </svg>
                    </li>

                    <li className="flex items-center justify-center text-blue-600 sm:gap-1.5">
                        <span className="hidden sm:inline"> Connect Store </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </li>

                    <li className="flex items-center justify-end text-blue-600 sm:gap-1.5">
                        <span className="hidden sm:inline"> Payment </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                    </li>
                </ol>
            </div>

            <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto my-10">
                {prices.length && prices?.map((price, index) => (
                    <div key={index}>
                        {price.status && (
                            <div

                                className={`flex cursor-pointer flex-col justify-between p-8 transition-shadow duration-300  border rounded  shadow-sm sm:items-center hover:shadow ${values.priceId === price._id ? 'border-blue-500 bg-gray-300' : '' // Add a border if the price is selected
                                    }`}
                                onClick={() => handlePriceClick(price._id)}
                            >
                                <div className="text-center h-[500px]">
                                    <div className="text-lg font-semibold">{price.name}</div>
                                    <hr />
                                    {
                                        price.benefits.map((benefit, index) => (
                                            <p className="flex items-center text-gray-600 mb-2">
                                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.5"
                                                        className="w-3 h-3"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                </span>
                                                {benefit}


                                            </p>
                                        ))
                                    }

                                    {permission.find((perm) => perm._id === price._id) && (
                                        <div className="">
                                            <div >
                                                {permission.find((perm) => perm._id === price._id)?.permissions?.map(itm => <p className="flex items-center text-gray-600 mb-2">
                                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                        <svg
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2.5"
                                                            className="w-3 h-3"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M20 6L9 17l-5-5" />
                                                        </svg>
                                                    </span>
                                                    {itm?.name}


                                                </p>)}
                                            </div>
                                        </div>
                                    )}

                                    <div className=" mt-2">
                                        <div className="mr-1 text-3xl font-bold  flex justify-center items-baseline gap-1">
                                            <span>{price.price}</span>
                                            <span className="text-sm flex items-center">/ {price.timeDuration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>



            <br />
            <div className="mt-4 gap-3 flex justify-center items-center">
                <button onClick={prevStep}
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                        <BsArrowLeft />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                        Previous Step
                    </span>
                </button>

                <button onClick={submitForm}
                    disabled={error}
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 disabled:cursor-not-allowed disabled:bg-gray-700"

                >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                        <BsArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                        Submit Form
                    </span>
                </button>


            </div>
        </div>
    )
};

export default Step3;