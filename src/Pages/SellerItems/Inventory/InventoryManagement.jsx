import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import EditInventory from './EditInventory';

const InventoryManagement = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full  bg-white border text-center text-sm font-light">
                            <thead className="border-b  font-medium  ">
                                <tr>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Product Name
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Order No.
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Order Date
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Pending Since
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Retail Price
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Status
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b ">
                                    {open && <EditInventory open={open} setOpen={setOpen} />}
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        #
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        #
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        #
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        #
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        #
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        #
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        #
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                        <button onClick={() => setOpen(!open)} className='text- justify-center m-auto flex items-center gap-2 text-green-500'>
                                            <BiEdit /> Edit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryManagement;