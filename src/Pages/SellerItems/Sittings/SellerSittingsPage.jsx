import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SellerSittingsPage = () => {
    return (
        <div>
            <div className='grid grid-cols-3 gap-4 py-10'>
                {/* <Link
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                    to="/seller/settings/site-content"
                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        SetUp Site Content
                    </span>
                </Link> */}
                <Link
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                    to="/seller/settings/payment-management"
                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Payment GetWay
                    </span>
                </Link>

                <Link
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                    to="/seller/settings/send-email"
                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Send Email
                    </span>
                </Link>
                <Link
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                    to="/seller/settings/shipping"
                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Shipping
                    </span>
                </Link>
                <Link
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                    to="/seller/settings/auth-credential"
                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Add Login Credential
                    </span>
                </Link>
                <Link
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                    to="/seller/settings/price-role"
                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Add   Price Role
                    </span>
                </Link>



            </div>
        </div>
    );
};

export default SellerSittingsPage;