import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderManagement = () => {

    return (
        <div>
            <div className='grid grid-cols-3 gap-4 py-10 pr-10'>
                <Link
                    to={'manage-order'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Manage Order
                    </span>
                </Link>

                <Link
                    to={'manage-review'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Review Review
                    </span>
                </Link>

                {/* <Link
                    to={'refand-order'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500">

                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Refund
                    </span>
                </Link>
                <Link
                    to={'customer-return'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Customer Return
                    </span>
                </Link>
                <Link
                    to={'daraz-order'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Daraz Order
                    </span>
                </Link>
                <Link
                    to={'woo-commerce-order'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Woo-commerce Order
                    </span>
                </Link> */}
            </div>

        </div>
    );
};

export default OrderManagement;