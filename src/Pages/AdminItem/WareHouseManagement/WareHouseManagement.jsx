import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const WareHouseManagement = () => {

    const [OpenModal, setOpenModal] = useState(false)

    const handleViewDetails = (data) => {
        setOpenModal(data);
    };

    const buttons = ['Add Area', 'Add ', 'Add ', 'Add Cell']
    return (
        <div>
            <div className='grid grid-cols-3 gap-4 py-10 pr-10'>
                <Link
                    to={'/admin/warehouse/warehouse-management'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Warehouse Management++
                    </span>
                </Link>
                <Link
                    to={'/admin/warehouse/area-management'}
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
                    to={'/admin/warehouse/rack-management'}
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
                    to={'/admin/warehouse/self-management'}
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
                    to={'/admin/warehouse/cell-management'}
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

export default WareHouseManagement;