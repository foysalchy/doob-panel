import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { Link } from 'react-router-dom';

const SubscriptionModel = () => {

    const { user, shopInfo } = useContext(AuthContext)
    const [services, setServices] = useState([])
    const { data: prices = {}, loader } = useQuery({
        queryKey: ["subscriptionModal"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}`);
            const data = await res.json();
            return data?.data;
        },
    });


    const { data: pricesData = [], refetch } = useQuery({
        queryKey: ["pricesData"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/pricing");
            const data = await res.json();
            return data;
        },
    });

    const originalDate = shopInfo?.paymentDate;
    const formattedDate = new Date(originalDate);

    // Calculate the time difference in milliseconds
    const timeDifference = new Date() - formattedDate;

    // Convert milliseconds to days
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const time = prices?.timeDuration === 'Monthly' && 30 || prices?.timeDuration === 'yearly' && 365 || prices?.timeDuration === 'weekly' && 7 || prices?.timeDuration === 'daily' && 1 || prices?.timeDuration === 'Lifetime' && 10000000000000000000000000000000000;

    console.log(`${daysPassed} days have passed since the user was created.`);


    // if (daysPassed >= time) {
    //     alert('your ads;fj');
    // }

    // console.log(daysPassed, time, prices, 'services time');

    return (
        <div className="bg-white text-black">
            <div className="container px-6 py-8 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
                    {`${daysPassed} days have passed since the user was created.`}
                </h1>

                <h1 className="text-2xl font-semibold text-center text-red-800 capitalize lg:text-3xl ">
                    {`${time == 10000000000000000000000000000000000 ? 'Unlimited' : time} days you use this service.`}
                </h1>
                <p className="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6 ">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quas magni
                    libero consequuntur voluptatum velit amet id repudiandae ea, deleniti
                    laborum in neque eveniet.
                </p>
                <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3 xl:mt-12">

                    {
                        pricesData?.map(data => {
                            return (
                                <div>
                                    {data._id === prices._id ?

                                        <div key={data?._id} className="flex items-center justify-between px-8 py-4 border border-blue-500 cursor-pointer rounded-xl">
                                            <div className="flex flex-col items-center space-y-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-blue-600  sm:h-7 sm:w-7"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <h2 className="text-lg font-medium text-gray-700 sm:text-xl ">
                                                    {data?.name}
                                                </h2>
                                            </div>
                                            <div className="flex flex-col items-center space-y-1">

                                                <h2 className="text-2xl font-semibold text-blue-600  sm:text-3xl">
                                                    ${data?.price} <span className="text-base font-medium">/{data?.timeDuration}</span>
                                                </h2>
                                            </div>
                                        </div>

                                        :

                                        <div key={data?._id} className="flex items-center justify-between px-8 py-4 border border-gray-500 cursor-pointer rounded-xl">
                                            <div className="flex flex-col items-center space-y-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-gray-600  sm:h-7 sm:w-7"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <h2 className="text-lg font-medium text-gray-800 sm:text-xl ">
                                                    {data?.name}
                                                </h2>
                                            </div>
                                            <div className="flex flex-col items-center space-y-1">

                                                <h2 className="text-2xl font-semibold text-gray-600  sm:text-3xl">
                                                    ${data?.price} <span className="text-base font-medium">/{data?.timeDuration}</span>
                                                </h2>
                                            </div>
                                        </div>}
                                </div>
                            )
                        }
                        )
                    }
                </div>

                {/* list */}
                <div className="p-8 mt-8 space-y-8 bg-gray-100  rounded-xl">
                    {
                        prices?.benefits?.map(benefit => <div className="flex items-center justify-between text-gray-800 ">
                            <p className="text-lg sm:text-xl">{benefit}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-blue-500 sm:h-7 sm:w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>)

                    }
                    {
                        prices?.permissions?.map(benefit => <div className="flex items-center justify-between text-gray-800 ">
                            <p className="text-lg sm:text-xl">{benefit.name}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-blue-500 sm:h-7 sm:w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>)
                    }
                </div>
                <div className="flex justify-center mt-8">
                    <Link to={`/price`} className="px-8 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Choose Plan
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default SubscriptionModel;