import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const ModalForWarehouse = ({ setOpenModal, OpenModal, data }) => {
    return (
        <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"}`}>
            <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px]">
                <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b'>
                    <div className='pb-2 text-xl font-bold text-dark text-center sm:text-2xl'>Edit {data}</div>
                    <div onClick={() => setOpenModal(!OpenModal)} className='cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500'>
                        <RxCross2 className='text-xl' />
                    </div>
                </div>

                <div className='h-[500px] overflow-y-scroll' >


                </div>
            </div>
        </div>
    );
};

export default ModalForWarehouse;