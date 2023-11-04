import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ModalForWarehouse from './Modal/ModalForWarehouse';

const WareHouseManagement = () => {

    const [OpenModal, setOpenModal] = useState(false)

    const handleViewDetails = (data) => {
        setOpenModal(data);
    };

    const buttons = ['Add New Warehouse', 'Add Area', 'Add Reck', 'Add Self', 'Add Cell']
    return (
        <div>
            <div className='grid grid-cols-3 gap-4 py-10 pr-10'>
                <Link
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                >
                    <span className="absolute -start-full transition-all group-hover:start-10">
                        <FaLongArrowAltRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Manage Warehouse
                    </span>
                </Link>
                {buttons.map((data, i) => (
                    <>

                        <button
                            key={i}
                            onClick={() => handleViewDetails(data)}
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        >
                            <span className="absolute -start-full transition-all group-hover:start-10">
                                <FaLongArrowAltRight />
                            </span>
                            <span className="text-sm font-medium transition-all group-hover:ms-4">
                                {data}
                            </span>
                        </button>

                        {OpenModal === data && <ModalForWarehouse OpenModal={OpenModal} setOpenModal={setOpenModal} data={data} />}

                    </>
                ))}




            </div>

        </div>
    );
};

export default WareHouseManagement;