import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../AuthProvider/UserProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Invoice = () => {
    const { id } = useParams();
    const { invoiceData, shopInfo, shopId } = useContext(AuthContext)
    console.log(invoiceData);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const { data: iData = [], refetch } = useQuery({
        queryKey: ["sellerOrder"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });
    const info = iData.find(itm => itm?._id === id);
    const totalPrice = info?.productList?.reduce((total, item) => {
        return total + item?.price * item?.quantity;
    }, 0);

    return (
        <div className="bg-gray-100 p-12">
            <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md'>Print</button>
            <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                <div className="pb-3">
                    <img src={shopInfo?.logo} alt="" className="w-[120px] " />
                    <h2 className="font-semibold text-xl">{shopInfo?.shopName}</h2>
                    <p className="">Purchase Summary</p>
                </div>
                <hr />
                <h3 className="font-semibold mt-2">Order Details:</h3>
                <div className="flex justify-start items-center ">
                    <ul className="text-gray-500 text-start mt-3 border w-full border-gray-600">
                        <li className='flex gap-2 items-center border-b border-gray-500 '>
                            <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Name:</div>  {info?.addresses?.fullName}
                        </li>
                        <li className='flex gap-2 items-center border-b border-gray-500 '>
                            <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Phone:</div> {info?.addresses?.mobileNumber}
                        </li>

                        <li className='flex gap-2 items-center border-b border-gray-500 '>
                            <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Address:</div> {info?.addresses?.address}, {info?.addresses?.area}, {info?.addresses?.city},
                        </li>
                        <li className='flex gap-2 items-center border-b border-gray-500 '>
                            <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Order Id:</div> {info?.addresses?._id}
                        </li>
                        <li className='flex gap-2 items-center border-gray-500 '>
                            <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Payment:</div> {info?.method?.Getaway}
                        </li>

                    </ul>
                </div> <hr /><br />
                <h1 className="text-md mb-3 font-semibold">Order Items:</h1>
                <section className="container mx-auto font-mono">
                    <div className="w-full mb-8 overflow-hidden ">
                        <div className="w-full border-2 border-b-transparent border-gray-600 overflow-hidden">
                            <table className="w-full">
                                <thead className=''>
                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-900 ">
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Quantity</th>
                                        <th className="px-4 py-3">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white ">
                                    {
                                        info?.productList?.slice(0, 8)?.map((itm, index) => <tr style={{ borderBottom: "2px solid black" }} key={itm?._id} className="text-gray-700">
                                            <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>

                                            <td className="px-4 py-3 text-sm font-[300] border">{itm?.productName}</td>
                                            <td className="px-4 py-3 text-sm border">{itm?.quantity}</td>
                                            <td className="px-4 py-3 text-sm border">
                                                {itm?.price}
                                            </td>
                                        </tr>)
                                    }
                                    <tr style={{ borderBottom: "2px solid black" }} className="text-gray-700">
                                        <td className="px-4 py-3 text-md font-semibold border"></td>
                                        <td className="px-4 py-3 text-sm font-[300] border"></td>
                                        <td className="px-4 py-3 text-sm border font-semibold">Total Price:</td>
                                        <td className="px-4 py-3 text-sm border font-semibold">{totalPrice}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Invoice;
