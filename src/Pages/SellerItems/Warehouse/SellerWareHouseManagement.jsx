import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const SellerWareHouseManagement = () => {


    return (
        <div>
            <div className='grid md:grid-cols-3 gap-4 md:py-10  '>
                <Link
                    to={'warehouse-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Warehouse Management
                    </span>
                </Link>
                <Link
                    to={'area-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Area Management
                    </span>
                </Link>
                <Link
                    to={'rack-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Rack Management
                    </span>
                </Link>
                <Link
                    to={'self-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Self Management
                    </span>
                </Link>
                <Link
                    to={'cell-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Cell Management
                    </span>
                </Link>





            </div>

        </div>
    );
};

export default SellerWareHouseManagement;