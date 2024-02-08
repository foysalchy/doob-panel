import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewTableRow from './ReviewTableRow';

const ReviewTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // You can change this value based on your requirements

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalItems = [1, 2, 3, 4, 5, 6, 7, 8, 9].length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // console.log(`https://backend.doob.com.bd/api/v1/seller/`, 'review.....');

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="border-r px-2 py-4 dark:border-neutral-500">
                                        Order
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 px-2 py-4 dark:border-neutral-500">
                                        Content
                                    </th>
                                    <th scope="col" className="border-r px-6 py-4 dark:border-neutral-500">
                                        Product
                                    </th>
                                    <th scope="col" className="border-r px-6 py-4 dark:border-neutral-500">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.slice(startIndex, endIndex)?.map(itm => <ReviewTableRow key={itm} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index}>
                            <button
                                className={`px-4 py-2 border ${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'text-blue-500'
                                    }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReviewTable;
