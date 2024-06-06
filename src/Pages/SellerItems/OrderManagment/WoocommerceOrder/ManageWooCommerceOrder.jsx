import React, { useState } from 'react';
import { ManageWooCommerceNav } from './ManageWooCommerceOrderNavData';
import ExportModal from './ExportModal';
import WooCommerceOrderTable from './WooCommerceOrderTable';

// import OrderTable from './OrderTable';

const ManageWooCommerceOrder = () => {
    const [selectedValue, setSelectedValue] = useState('Pending');
    const [openModal, setOpenModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            
            <ExportModal openModal={openModal} setOpenModal={setOpenModal} />
            <h3 className="font-bold text-xl">Orders Overview</h3>
            <nav className='flex gap-4 flex-wrap mt-6'>
                {ManageWooCommerceNav?.map((itm) =>
                    itm?.status === 'dropdown' ? (
                        <select
                            key={itm.name}
                            className={`px-4 border-r bg-transparent relative border-gray-300 flex items-center gap-2 justify-center ${selectedValue === 'pending' ? 'text-red-500' : '' // Change to your desired color
                                }`}
                            value={selectedValue}
                            onChange={handleSelectChange}
                        >
                            <option selected value="pending">Pending</option>
                            {itm?.dropdownLink?.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <button
                            className={`px-4 border-r border-gray-300 ${selectedValue === itm.name ? 'text-red-500' : '' // Change to your desired color
                                }`}
                            key={itm.name}
                            onClick={() => setSelectedValue(itm.name)}
                        >
                            {itm.name}
                        </button>
                    )
                )}
            </nav>

            {/* filter */}
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                    <button className='px-4 bg-white py-1 border'>Print</button>
                    <button onClick={() => setOpenModal(!openModal)} className='px-4 py-1 bg-transparent border'>
                        Export orders
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <div className='flex items-center bg-white '>
                        <input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='Search' className="w-[260px] rounded border-gray-400 focus:outline-none p-2 border" />

                    </div>
                </div>
            </div>
            {/* table area */}
            <div className='mt-12'>
                {/* table */}
              
            </div>
        </div>
    );
};

export default ManageWooCommerceOrder;
