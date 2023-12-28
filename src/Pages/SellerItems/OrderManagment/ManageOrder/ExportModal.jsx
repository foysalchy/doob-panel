import React from 'react';
import { CgClose } from 'react-icons/cg';
import { GrClose } from 'react-icons/gr';

const ExportModal = ({ openModal, setOpenModal }) => {
    return (
        <div className={`${openModal ? 'flex' : 'hidden'} fixed z-50 top-0 left-0 h-full min-h-screen w-full items-center justify-center bg-[black] bg-opacity-90 px-20 py-5`}>
            <div className="flex bg-white flex-col overflow-hidden mt-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Export</h1>
                    <button onClick={() => setOpenModal(!openModal)} className="">
                        <GrClose />
                    </button>
                </div>

                <div className="overflow-x-auto mt-4 transparent-scroll sm:-mx-6 lg:-mx-8">
                    <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full  bg-white border text-center text-sm font-light ">
                                <thead className="border-b  font-medium  ">
                                    <tr>
                                        <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            #
                                        </th>
                                        <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            Date
                                        </th>
                                        <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            Type
                                        </th>
                                        <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            User name
                                        </th>
                                        <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            Time Completed
                                        </th>
                                        <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            Status
                                        </th>
                                        <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            Download
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b ">
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                            <span> 1322420</span>
                                        </td>
                                        <td className="whitespace-nowrap w-[60px] word-wrap border-r px-6 py-4 font-medium ">
                                            <span className=''> Dec 28, 2023 11:50:42 PM</span>
                                        </td>
                                        <td className="whitespace-nowrap w-[60px] word-wrap border-r px-6 py-4 font-medium ">
                                            order.list.export
                                        </td>
                                        <td className="whitespace-nowrap w-[60px] word-wrap border-r px-6 py-4 font-medium ">
                                            SS International Collection Center
                                        </td>
                                        <td className="whitespace-nowrap w-[60px] word-wrap border-r px-6 py-4 font-medium ">
                                            Dec 28, 2023 11:52:20 PM
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                            Finished
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                            <button className="text-blue-500">
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;