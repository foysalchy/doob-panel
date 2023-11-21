import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SellerProductManagement = () => {
    return (
        <div className='grid grid-cols-3 gap-4 py-10'>
            <Link
                className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/product-management/add-product"
            >
                <span className="absolute -start-full transition-all group-hover:start-10">
                    <FaLongArrowAltRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Add New Product
                </span>
            </Link>

            <Link
                className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/product-management/add-product"
            >
                <span className="absolute -start-full transition-all group-hover:start-10">
                    <FaLongArrowAltRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Product Management
                </span>
            </Link>
            <Link
                className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/content-management/popup-management"
            >
                <span className="absolute -start-full transition-all group-hover:start-10">
                    <FaLongArrowAltRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Pop Up
                </span>
            </Link>
            <Link
                className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/content-management/slider-management"
            >
                <span className="absolute -start-full transition-all group-hover:start-10">
                    <FaLongArrowAltRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Slider
                </span>
            </Link>
        </div>
    );
};

export default SellerProductManagement;