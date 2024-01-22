import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CategoryManagement = () => {
    return (
        <div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 py-10 pr-10'>
                <Link
                    to={'mega-category-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Mega Category
                    </span>
                </Link>

                <Link
                    to={'sub-category-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Sub Category Management
                    </span>
                </Link>
                <Link
                    to={'mini-category-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Mini Category Management
                    </span>
                </Link>
                <Link
                    to={'extra-category-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Extra Category Management
                    </span>
                </Link>


            </div>

        </div>
    );
};

export default CategoryManagement;