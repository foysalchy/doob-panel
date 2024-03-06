import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const SubscriberHisroy = () => {
    const { shopInfo } = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
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

    // Function to handle pagination
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate start and end index for pagination
    const itemsPerPage = 6;



    const pageSize = 6;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = Math.ceil(subscribers?.length / pageSize);

    const currentData = subscribers.slice(startIndex, endIndex);

    const handleChangePage = (newPage) => {

        setCurrentPage(newPage);
    };



    const renderPageNumbers = () => {
        const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
        const endPage = Math.min(totalPages, startPage + pageSize - 1);

        return (
            <React.Fragment>
                {/* First Page */}
                {startPage > 1 && (
                    <li>
                        <button
                            className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
                            onClick={() => handleChangePage(1)}
                        >
                            1
                        </button>
                    </li>
                )}



                {/* Current Page */}
                {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                    const pageNumber = startPage + index;
                    return (
                        <li key={pageNumber}>
                            <button
                                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-gray-900 bg-white text-center leading-8 text-gray-900'
                                    }`}
                                onClick={() => handleChangePage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}



                {/* Last Page */}
                {endPage < totalPages && (
                    <li>
                        <button
                            className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
                            onClick={() => handleChangePage(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </li>
                )}
            </React.Fragment>
        );
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
                                            currentData?.map((subscriber, index) => (
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

                <div className='flex justify-center mt-4'>
                    <ol className="flex justify-center gap-1 text-xs font-medium">
                        <li>
                            <button
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
                                onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Prev Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <BiLeftArrow className='text-xl' />
                                </svg>
                            </button>
                        </li>

                        {renderPageNumbers()}

                        <li>
                            <button
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                                onClick={() => handleChangePage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">Next Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <BiRightArrow className='text-xl' />
                                </svg>
                            </button>
                        </li>
                    </ol>
                </div>
            </section>


        </div>
    );
};

export default SubscriberHisroy;