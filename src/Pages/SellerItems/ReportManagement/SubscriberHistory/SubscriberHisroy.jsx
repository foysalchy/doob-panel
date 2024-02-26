import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const SubscriberHisroy = () => {
    const { shopInfo } = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
    const { data: subscribers = [], isLoading } = useQuery({
        queryKey: ["subscriberReport"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/subscriber-report?shopId=${shopInfo?.shopId}`);
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

    // Function to handle pagination
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate start and end index for pagination
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the subscribers array based on pagination
    const displayedSubscribers = subscribers.slice(startIndex, endIndex);


    // Function to handle next page
    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(subscribers.length / itemsPerPage)));
    };

    // Function to handle previous page
    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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
                                            displayedSubscribers?.map((subscriber, index) => (
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
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        Previous
                    </button>
                    {
                        Array.from({ length: Math.ceil(subscribers.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePagination(i + 1)}
                                className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {i + 1}
                            </button>
                        ))
                    }
                    <button
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(subscribers.length / itemsPerPage)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === Math.ceil(subscribers.length / itemsPerPage) ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        Next
                    </button>
                </div>
            </section>


        </div>
    );
};

export default SubscriberHisroy;