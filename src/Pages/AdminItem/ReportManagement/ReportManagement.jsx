import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ReportManagement = () => {
    return (
        <div>
            <div className='grid grid-cols-3 gap-4 py-10 pr-10'>
                <Link
                    to={'admin-sales'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Sales
                    </span>
                </Link>

                <Link
                    to={'seller-admin'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Seller
                    </span>
                </Link>

                <Link
                    to={'customer-admin'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Customer
                    </span>
                </Link>

                <Link
                    to={'warehouse-admin'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Warehouse
                    </span>
                </Link>

                <Link
                    to={'subscriber-admin'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Subscriber
                    </span>
                </Link>

                {/* <Link
                    to={'Payment-admin'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Payment
                    </span>
                </Link> */}

                <Link
                    to={'commission-history-admin'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Commission History
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default ReportManagement;