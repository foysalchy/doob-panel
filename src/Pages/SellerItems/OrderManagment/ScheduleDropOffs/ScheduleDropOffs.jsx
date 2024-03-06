import React, { useContext, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';

const ScheduleDropOffs = () => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { shopInfo } = useContext(AuthContext);

    // console.log(`https://salenow-v2-backend.vercel.app/api/v1/seller/refund-order?shopId=${shopInfo?._id}`);

    const { data: refundData = [] } = useQuery({
        queryKey: ["selarRefundOrder"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/refund-order?shopId=${shopInfo?._id}`);
            const data = await res.json();
            return data?.data;
        },
    });

    const filteredData = refundData?.filter(itm =>
        itm?.orderId.toLowerCase().includes(searchValue.toLowerCase()) ||
        (itm?.data?.name && itm?.data?.name.toLowerCase().includes(searchValue.toLowerCase())) ||
        (itm?.data?.bank_name && itm?.data?.bank_name.toLowerCase().includes(searchValue.toLowerCase())) ||
        (itm?.data?.ac && itm?.data?.ac.toLowerCase().includes(searchValue.toLowerCase())) ||
        (itm?.data?.holder && itm?.data?.holder.toLowerCase().includes(searchValue.toLowerCase())) ||
        (itm?.data?.paymentMethod && itm?.data?.paymentMethod.toLowerCase().includes(searchValue.toLowerCase())) ||
        (itm?.data?.getway && itm?.data?.getway.toLowerCase().includes(searchValue.toLowerCase())) ||
        (itm?.data?.account_number && itm?.data?.account_number.toLowerCase().includes(searchValue.toLowerCase()))
    );
    return (
        <div>
            <div className="mb-4 mt-4 rounded-md flex items-center  border-gray-400 focus:outline-none overflow-hidden  w-full  border">
                <input
                    placeholder='Search...'
                    className='w-full p-2 focus:outline-none'
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <BiSearch className='mr-2 text-xl text-gray-400' />
            </div>
            <div className="overflow-y-hidden overflow-x-auto">
                <table className="min-w-full  bg-white border text-center text-sm font-light">
                    <thead className="border-b  font-medium  ">
                        <tr>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                #
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                orderId
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Name
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Bank Name
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Ac
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Holder
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Payment Method
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Getaway
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.length ? filteredData?.map((itm, index) => <tr className="border-b ">
                                <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                    {itm?.orderId}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                    {itm?.data?.name ? itm?.data?.name : itm?.data?.holder}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                    {itm?.data?.bank_name ? itm?.data?.bank_name : 'No'}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                    {itm?.data?.ac ? itm?.data?.ac : itm?.data?.account_number}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                    {itm?.data?.holder ? itm?.data?.holder : itm?.data?.name}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                    {itm?.data?.paymentMethod ? itm?.data?.paymentMethod : 'Mobile Banking'}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                    {itm?.data?.getway ? itm?.data?.getway : itm?.data?.bank_name}
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                                    <button onClick={() => setOpen(!open)} className='border border-gray-900 px-4 py-1 rounded'>Approve</button>
                                    {/* approve modal */}
                                    {open && <div className="fixed top-0 left-0 w-screen h-screen bg-[#0000004e] flex items-center justify-center z-[1000]">
                                        <div className="bg-white md:w-[500px] p-4 rounded-md">
                                            <button onClick={() => setOpen(!open)} className='float-right p-2 text-lg'>x</button>
                                            <h1 className='text-lg font-semibold text-center'>Quantity Update</h1>
                                            <form className="mt-3 border-t py-3">
                                                <button type='submit' className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
                                                    Yes
                                                </button>
                                                <button type='submit' className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                                    No
                                                </button>
                                            </form>
                                        </div>
                                    </div>}
                                    <button className='border border-gray-900 px-4 py-1 rounded'>Reject</button>
                                </td>



                            </tr>) : ''
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleDropOffs;