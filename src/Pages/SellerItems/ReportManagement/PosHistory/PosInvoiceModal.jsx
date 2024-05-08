import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useReactToPrint } from 'react-to-print';

const PosInvoiceModal = ({ setOpenInvoice, openInvoice, invoice }) => {
    const { shopInfo } = useContext(AuthContext);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const style = {
        overlay: 'fixed top-0 left-0 right-0 bottom-0 w-full bg-black h-screen overflow-y-auto bg-white p-2 flex items-center justify-center z-[2000]',
        cart: 'bg-white',
        title: 'text-3xl font-semibold text-center pb-4',
        close: 'text-2xl p-2 absolute right-3 top-2'
    }

    const invoiceData = invoice
    console.log(invoice.items);
    return (
        <div className={style.overlay}>
            <div className="-mx-4 -my-2 overflow-x-auto ">
                <div className="inline-block  py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden max-w-3xl overflow-x-auto  border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <h2 className={style?.title}>Products</h2>
 
                        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-md">
                                <div className="flex p-4 justify-between">
                                    <button
                                        onClick={() => setOpenInvoice(!openInvoice)}
                                        className="px-4 py-2 text-white rounded-md bg-red-600"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handlePrint}
                                        className="px-4 py-2 text-white rounded-md bg-blue-600"
                                    >
                                        Print
                                    </button>


                                </div>
                                <div id='invoice'
                                    ref={componentRef}
                                    className="w-full p-4 bg-white" style={{ width: '300px' }}>
                                    <div className="flex  pb-2  border-b border-gray-700 text-start">
                                        <div className="">
                                            {shopInfo?.logo && <img src={shopInfo?.logo} className='' alt="" />}
                                            <h3 className="text-lg font-semibold">Name: {shopInfo?.shopName}</h3>
                                            <p className="text-xs text-gray-500">Email: {shopInfo?.shopEmail}</p>
                                            <p className="text-xs text-gray-500">Phone: {shopInfo?.shopNumber}</p>
                                            <p className="text-xs text-gray-500">Address: {shopInfo?.address}</p>
                                        </div>
                                        <div className='pl-2'>
                                            <p className='text-xl text-blue-500'>Receipt</p>
                                            <p className="text-sm">Paid Date: {new Date().toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <ul className=''>
                                        <li className="py-2 border-b border-gray-700">
                                            <div className="flex justify-between">
                                                <h2 className="text-sm font-semibold">Product Name</h2>
                                                <h2 className="text-sm font-semibold">Price</h2>
                                            </div>
                                        </li>
                                        {
                                            invoiceData?.items?.map((itm, index) => (
                                                <li key={index} className="py-2 border-b border-gray-700">
                                                    <div className="flex justify-between items-start">
                                                        <span>{`(${index + 1})`}</span>
                                                        <h2 className="w-[150px] text-sm">{itm?.name}</h2>
                                                        <div className="">
                                                            <h2 className="text-sm">৳ {itm?.price}</h2>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <ul className='mt-4'>
                                        <li className="py-2 border-b border-gray-700">
                                            <div className="flex justify-between">
                                                <h2 className="text-sm font-semibold">Total:</h2>
                                                <h2 className="text-sm">৳ {invoiceData?.total}</h2>
                                            </div>
                                        </li>
                                        <li className="py-2 border-b border-gray-700">
                                            <div className="flex justify-between">
                                                <h2 className="text-sm font-semibold">Pay Amount:</h2>
                                                <h2 className="text-sm">৳ {invoiceData?.cash}</h2>
                                            </div>
                                        </li>
                                        <li className="py-2 border-b border-gray-700">
                                            <div className="flex justify-between">
                                                <h2 className="text-sm font-semibold">Payment Getaway:</h2>
                                                <h2 className="text-sm">{invoiceData?.invoice?.
                                                    getaway
                                                }</h2>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="flex justify-between mt-4">
                                        <h2 className="text-sm font-semibold">Change:</h2>
                                        <h2 className="text-sm">৳ {invoiceData?.change}</h2>
                                    </div>

                                </div>
                            </div >
                        </div >

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosInvoiceModal;