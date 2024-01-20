import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const SubscriberHisroy = () => {
    const { shopInfo } = useContext(AuthContext)
    const { data: subscribers = [], isLoading } = useQuery({
        queryKey: ["subscriberReport"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/subscriber-report?shopId=${shopInfo?.shopId}`);
            const data = await res.json();
            return data?.data;
        },
    });

    const handleDate = (dateString) => {
        const monthsAbbreviations = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const dateObject = new Date(dateString);

        const monthAbbreviation = monthsAbbreviations[dateObject.getMonth()];
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();

        const formattedDate = `${monthAbbreviation} ${day}, ${year}`;
        const formattedTime = `${hours}:${minutes}`;

        return {
            formattedDate,
            formattedTime
        };
    };

    return (
        <div>
            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Subscriber Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Subscribe Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            subscribers?.map((subscriber, index) => (
                                                <tr key={subscriber?.id}>
                                                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {subscriber?.email}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {handleDate(subscriber.date).formattedDate} {handleDate(subscriber.date).formattedTime}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center space-x-4 text-sm">
                                                            <a
                                                                href={`mailto:${subscriber.email}?subject=mail from shop nme`}
                                                                className="inline-block px-6 py-2.5 border rounded-md border-white text-black bg-white hover:bg-gray-900 hover:text-white font-medium"
                                                            >
                                                                Send Mail
                                                            </a>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <a
                        href="#"
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span>previous</span>
                    </a>
                    <div className="items-center hidden md:flex gap-x-3">
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            3
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            ...
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            12
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            13
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            14
                        </a>
                    </div>
                    <a
                        href="#"
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <span>Next</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </a>
                </div>
            </section>


        </div>
    );
};

export default SubscriberHisroy;