import React, { useRef, useEffect, useState } from 'react';
import vct from '../../../../assets/vct.png';
import { useReactToPrint } from 'react-to-print';

const SellerConfirmOrder = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const data = localStorage.getItem('orderData');
        const order = JSON.parse(data);

        // Calculate subtotal
        const subTotal = order.reduce((acc, itm) => acc + (itm.product_price * itm.product_quantity), 0);
        setSubtotal(subTotal);

        // Total is the same as subtotal for now, you can add additional charges or discounts here
        setTotal(subTotal);
    }, []);

    const data = localStorage.getItem('orderData');
    const order = JSON.parse(data);


    return (
        <div className=''>
            <div ref={componentRef} className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <h1 className="text-center text-3xl mt-12 font-bold">Your order is confirmed</h1>
                <p className="text-center text-gray-500">Thank you for shopping.</p>

                <div className="grid grid-cols-3 gap-3">
                    <div ref={componentRef} className="col-span-2">
                        <>
                            <div className="p-6 overflow-x-auto px-0">
                                <table className="mt-4 w-full border-l border-r border-gray-400 table-auto text-left">
                                    <thead>
                                        <tr>
                                            <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Photo
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased  font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Name
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Price
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Quantity
                                                </p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.map(itm => (
                                            <tr key={itm?._id}>
                                                <td className="p-4 w-[110px] border-b border-blue-gray-50">
                                                    <img src={itm?.product_image} alt="" className="w-[100px] h-[80px] rounded border" />
                                                </td>
                                                <td className="p-4 border-b w-[300px] border-blue-gray-50">
                                                    {itm?.product_name}
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    {itm?.price}
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    {itm?.product_quantity}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <ul className="border w-[300px] p-3 ml-auto border-gray-400 space-y-1">
                                <li className="flex items-center justify-between">
                                    <p>Subtotal</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </li>
                                <br />
                                <li className="flex font-semibold text-gray-700 items-center justify-between">
                                    <p>Total :</p>
                                    <p>${total.toFixed(2)}</p>
                                </li>
                                <li>
                                    <button onClick={handlePrint} className='bg-blue-500 text-white px-3 py-2 rounded-md w-full mt-2'>Download Full Invoice</button>
                                </li>
                            </ul>
                        </>
                    </div>
                    <div className="">
                        <img src={vct} alt="vector" className="w-full h-full object-cover" />
                        <button className='bg-gray-900 text-white px-3 py-2 rounded-md w-full mt-2'>Track Your Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerConfirmOrder;
