import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import SellerAddSelfModal from './SellerAddSelfModal';
import SellerAddNewWarehouse from './SellerAddNewWarehouse';
import SellerAddAreaForWarehouse from './SellerAddAreaForWarehouse';
import SellerAddRackModal from './SellerAddRackModal';
import SellerAddCellModal from './SellerAddCellModal';


const SellerModalForWarehouse = ({ setOpenModal, OpenModal, data, refetch }) => {
    const [newData, setNewData] = useState(data)
    const [next, setNext] = useState(false)
    const hello = () => {
        const a = 5;
        const b = 10;
        const ans = a + b;
        console.log(ans)
    }
    const [warehouses, setWareHouses] = useState({
        warehouse: '',
        area: '',
        reck: '',
        cell: '',
        self: ''
    })
    return (
        <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"}`}>
            <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 text-center ">
                <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10'>
                    <div className='pb-2 text-xl font-bold text-white text-center sm:text-2xl'>{newData}</div>
                    <div onClick={() => setOpenModal(!OpenModal)} className='cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400'>
                        <RxCross2 className='text-xl' />
                    </div>
                </div>

                <div className='max-h-[500px] px-10 text-start overflow-y-scroll custom-scroll' >
                    {
                        (newData == 'Add New Warehouse' && <SellerAddNewWarehouse
                            warehouses={warehouses} setWareHouses={setWareHouses} setNewData={setNewData} setNext={setNext} setOpenModal={setOpenModal} refetch={refetch} />) ||
                        (newData == 'Add Area' && <SellerAddAreaForWarehouse
                            setNewData={setNewData} setOpenModal={setOpenModal}
                            preSelectWarehouse={warehouses} next={next} setNext={setNext} setWareHouses={setWareHouses} recall={refetch} />) ||
                        (newData == 'Add Rack' && <SellerAddRackModal
                            preSelectWarehouse={warehouses} setNewData={setNewData} setWareHouses={setWareHouses} next={next} setNext={setNext} setOpenModal={setOpenModal} recall={refetch} />) ||
                        (newData == 'Add Shelf' && <SellerAddSelfModal setNewData={setNewData} preSelectWarehouse={warehouses} setWareHouses={setWareHouses} next={next} setNext={setNext} setOpenModal={setOpenModal} recall={refetch} />) ||
                        (newData == 'Add Cell' && <SellerAddCellModal next={next} preSelectWarehouse={warehouses} setOpenModal={setOpenModal} recall={refetch} />)
                    }

                </div>
            </div>
        </div>
    );
};

export default SellerModalForWarehouse;