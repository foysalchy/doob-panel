import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
    return (
        <div>
            <div>
                <div className='grid grid-cols-3 gap-4 py-10 pr-10'>
                    <Link
                        to={'admin-popup'}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                    >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                            <FaLongArrowAltRight />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                            POP UP
                        </span>
                    </Link>

                    <Link
                        to={'seller-notice'}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                    >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                            <FaLongArrowAltRight />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                            Notice
                        </span>
                    </Link>
                    <Link
                        to={'admin-anouncement'}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                    >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                            <FaLongArrowAltRight />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                            Announcement
                        </span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ContentManagement;