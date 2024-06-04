import React, { useRef, useEffect, useState, useContext } from 'react';
import vct from '../../../../assets/vct.png';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const SellerConfirmOrder = () => {
    const { shopInfo } = useContext(AuthContext)
    console.log('ds::', shopInfo);
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


    console.log(order, 'order..');
    // invoice
    const InvoicePage = ({ order }) => {
        return (
            <>
                <div
                    ref={componentRef}
                    className="p-12 mx-8 print-data hidden  mt-6">

                    <header className="flex items-start justify-between">
                        <img src={shopInfo?.logo} alt="logo" className='w-[200px]' />
                        <div className='whitespace-wrap w-[300px]'>
                            <p className='text-gray-600 text-end'>{shopInfo?.address}</p>
                            <p className='text-gray-600 text-end'>{shopInfo?.shopName}</p>
                        </div>
                    </header>

                    <main>
                        <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                            SALES INVOICE
                        </div>

                        {/*.*/}
                        {/*.... Address ...*/}
                        {/*.*/}
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <div className='flex items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Email :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{shopInfo?.shopEmail}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Phone :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{shopInfo?.shopNumber}</p>
                                </div>
                            </div>

                            <div>
                                <li className='flex justify-start items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Invoice No :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{shopInfo?._id}</p>
                                </li>
                                <li className='flex justify-start items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Invoice Date :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{
                                        new Date().toDateString(shopInfo?.time_stamp)
                                    }</p>
                                </li>
                                <br />
                                <li className='flex justify-start items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Payment Date :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{
                                        new Date().toDateString(shopInfo?.paymentDate)
                                    }</p>
                                </li> <li className='flex justify-start items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Order Date :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{
                                        new Date().toDateString(shopInfo?.date)
                                    }</p>
                                </li>

                            </div>

                        </div>

                        {/*.*/}
                        {/*.... Product ...*/}
                        {/*.*/}

                        <section className="container mx-auto mt-8">
                            <div className="w-full mb-8 overflow-hidden">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                <th className="px-4 py-2">Photo</th>
                                                <th className="px-4 py-2">Name</th>
                                                <th className="px-4 py-2">Quantity</th>
                                                <th className="px-4 py-2">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {
                                                order?.map(itm => <tr key={itm?._id} className="text-gray-700">
                                                    <td className="px-2 py-2 border border-gray-800">
                                                        <img src={itm?.product_image} alt="photo" className="w-12 h-12 border object-cover rounded bg-indigo-400" />
                                                    </td>
                                                    <td className="px-2 py-2 w-[220px] text-sm border border-gray-800">
                                                        {itm?.product_name}
                                                    </td>

                                                    <td className="px-2 py-2 text-sm border border-gray-800">
                                                        {itm?.product_quantity}
                                                    </td>
                                                    <td className="px-2 py-2 text-sm border border-gray-800">
                                                        {itm?.product_price}
                                                    </td>


                                                </tr>)
                                            }


                                            {/* <tr>
                                                <td colSpan={6} className='px-1 py-2 text-sm border  border-gray-800'></td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border-b  border-gray-800 text-end'>
                                                    TOTAL:
                                                </td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border  border-gray-800 text-start'>
                                                    $5000
                                                </td>
                                            </tr> */}
                                            {/* Add more rows here */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-between ">
                            <div></div>
                            <div className="  gap-12 flex justify-between">
                                <ul className='space-y-2'>
                                    <li>Sub Total</li>
                                    <li className=' font-bold'>Total</li>
                                </ul>

                                <ul className='space-y-2'>
                                    <li className=''>
                                        {subtotal.toFixed(2)}
                                    </li>
                                    <li className='  font-bold'>
                                        {total.toFixed(2)}
                                    </li>
                                </ul>
                            </div>
                        </div>



                    </main>
                    <footer>

                    </footer>
                </div>
            </>
        )
    }


    return (
        <div className=''>
            <InvoicePage order={order} />
            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <h1 className="text-center text-3xl mt-12 font-bold">Your order is confirmed</h1>
                <p className="text-center text-gray-500">Thank you for shopping.</p>

                <div className="  grid-cols-3 gap-3">
                    <div className="col-span-2">
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
                                                    {itm?.product_price}
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
                    {/* <div className="">
                        <img src={vct} alt="vector" className="w-full h-full object-cover" />
                        <button className='bg-gray-900 text-white px-3 py-2 rounded-md w-full mt-2'>Track Your Order</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default SellerConfirmOrder;