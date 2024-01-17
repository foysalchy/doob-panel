import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StafManagement = () => {
    return (
        <div>
            <Link
                className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/staff/add-new-staff"
            >
                <span className="absolute -start-full transition-all group-hover:start-10">
                    <FaLongArrowAltRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Add New Staff
                </span>
            </Link>
        </div>
    );
};

export default StafManagement;