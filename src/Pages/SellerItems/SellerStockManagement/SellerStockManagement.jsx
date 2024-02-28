import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import SellerStockInvoice from './SellerStockInvoice';


const SellerStockManagement = () => {
    const [on, setOn] = useState(false);
    const { shopInfo } = useContext(AuthContext)
    const { data: stockRequest = [], refetch } = useQuery({
        queryKey: ["stockRequest"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/admin/seller-stock-request?shopId=${shopInfo._id}`);
            const data = await res.json();
            console.log(data, 'data');
            return data?.data;
        },
    });


    console.log(stockRequest, 'invoice data.....');
    return (
        <div className='relative'>
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="flex pb-4 items-center justify-between">
                    <h2 className="text-xl font-semibold pb-4">Stock Quantity Management</h2>


                </div>

                <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 divide-gray-700">
                        <thead className="bg-gray-50 ">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                >
                                    <div className="flex items-center gap-x-3">
                                        <span>Product Id</span>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                >
                                    <button className="flex items-center gap-x-2">
                                        <span>Status</span>
                                    </button>
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                >
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            {stockRequest?.map((itm, index) => (
                                <tr>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            <div className="w-5/12">
                                                <h2 className="font-medium text-gray-800  ">
                                                    <button onClick={() => setOn(itm)} className='  text-blue-500'>{itm?.productId}</button>
                                                </h2>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <button
                                            // onClick={() => DeactiveHandle(faq?._id)}
                                            className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   text-green-500  "
                                        >
                                            {itm?.status}
                                        </button>
                                    </td>

                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        {itm?.quantity}
                                    </td>
                                    {
                                        on?._id === itm?._id && <SellerStockInvoice setOn={setOn} products={itm} />
                                    }

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerStockManagement;