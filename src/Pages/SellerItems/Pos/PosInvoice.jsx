


// import React, { useContext, useRef, useState } from 'react';
// import { AuthContext } from '../../../AuthProvider/UserProvider';
// import ReactToPrint from 'react-to-print';

// const PosInvoice = ({ setOpen, setUser, invoiceData, setInvoiceOpen, invoiceOpen }) => {
//     const [loader, setLoader] = useState(false);
//     const { shopInfo } = useContext(AuthContext);
//     const componentRef = useRef();

//     const delete_all = () => {
//         setInvoiceOpen(false)
//         setUser(false)
//         setCartProducts([])
//         setOpen(false)

//     }
//     console.log(invoiceData, 'invoiceData');

//     return (
//         <>
//             {
//                 invoiceOpen && <div className=" p-6 bg-[#000000] bg-opacity-65 fixed top-0 right-0 bottom-0 left-0 overflow-auto">
//                     <div className=''>
//                         <div className="flex items-center justify-center gap-2">
//                             <div>
//                                 <div className='my-4 flex gap-2'>
//                                     <button
//                                         onClick={() => { delete_all() }}
//                                         className='px-4 py-2 text-white rounded-md bg-red-600'>
//                                         Close
//                                     </button>
//                                     <ReactToPrint
//                                         trigger={() => (
//                                             <button
//                                                 disabled={loader}
//                                                 className='px-4 py-2 text-white rounded-md bg-blue-600'>
//                                                 {loader ? (<span>Printing...</span>) : (<span>Print</span>)}
//                                             </button>
//                                         )}
//                                         content={() => componentRef.current}
//                                     />
//                                 </div>
// <div id='invoice' ref={componentRef} className="w-full p-4 bg-white" style={{ width: '300px' }}>
//     <div className="flex  pb-2 border-b border-gray-700 text-start">
//         <div className="">
//             {shopInfo?.logo && <img src={shopInfo?.logo} className='' alt="" />}
//             <h3 className="text-lg font-semibold">Name: {shopInfo?.shopName}</h3>
//             <p className="text-xs text-gray-500">Email: {shopInfo?.shopEmail}</p>
//             <p className="text-xs text-gray-500">Phone: {shopInfo?.shopNumber}</p>
//             <p className="text-xs text-gray-500">Address: {shopInfo?.address}</p>
//         </div>
//         <div>
//             <p className='text-xl text-blue-500'>Receipt</p>
//             <p className="text-sm">Paid Date: {new Date().toLocaleDateString()}</p>
//         </div>
//     </div>
//     <ul className=''>
//         <li className="py-2 border-b border-gray-700">
//             <div className="flex justify-between">
//                 <h2 className="text-sm font-semibold">Product Name</h2>
//                 <h2 className="text-sm font-semibold">Price</h2>
//             </div>
//         </li>
//         {
//             invoiceData?.invoice?.items?.map((itm, index) => (
//                 <li key={index} className="py-2 border-b border-gray-700">
//                     <div className="flex justify-between items-start">
//                         <span>{`(${index + 1})`}</span>
//                         <h2 className="w-[150px] text-sm">{itm?.name}</h2>
//                         <div className="">
//                             <h2 className="text-sm">৳ {itm?.price}</h2>
//                         </div>
//                     </div>
//                 </li>
//             ))
//         }
//     </ul>
//     <ul className='mt-4'>
//         <li className="py-2 border-b border-gray-700">
//             <div className="flex justify-between">
//                 <h2 className="text-sm font-semibold">Total:</h2>
//                 <h2 className="text-sm">৳ {invoiceData?.invoice?.total}</h2>
//             </div>
//         </li>
//         <li className="py-2 border-b border-gray-700">
//             <div className="flex justify-between">
//                 <h2 className="text-sm font-semibold">Pay Amount:</h2>
//                 <h2 className="text-sm">৳ {invoiceData?.invoice?.cash}</h2>
//             </div>
//         </li>
//         <li className="py-2 border-b border-gray-700">
//             <div className="flex justify-between">
//                 <h2 className="text-sm font-semibold">Payment Getaway:</h2>
//                 <h2 className="text-sm">{invoiceData?.invoice?.
//                     getaway
//                 }</h2>
//             </div>
//         </li>
//     </ul>
//     <div className="flex justify-between mt-4">
//         <h2 className="text-sm font-semibold">Change:</h2>
//         <h2 className="text-sm">৳ {invoiceData?.invoice?.change}</h2>
//     </div>

// </div>
//                             </div>




//                         </div>
//                     </div>
//                 </div>
//             }
//         </>
//     );
// };

// export default PosInvoice;
import React, { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import ReactToPrint from 'react-to-print';

const PosInvoice = ({ setOpen, setUser, invoiceData, setInvoiceOpen, invoiceOpen }) => {
    const [loader, setLoader] = useState(false);
    const { shopInfo } = useContext(AuthContext);
    const componentRef = useRef();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                cancelButtonRef.current.focus();
            } else if (event.key === 'ArrowRight') {
                printButtonRef.current.focus();
            } else if (event.key === 'Enter') {
                if (document.activeElement === cancelButtonRef.current) {
                    delete_all();
                } else if (document.activeElement === printButtonRef.current) {
                    handlePrint();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const cancelButtonRef = useRef(null);
    const printButtonRef = useRef(null);

    const delete_all = () => {
        setInvoiceOpen(false);
        setUser(false);
        setOpen(false);
    };

    const handlePrint = () => {
        setLoader(true); // Set loader to true to show "Printing..." text
        printButtonRef.current.click();
        setLoader(false);
    };

    return (
        <>
            {invoiceOpen && (
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-md">
                        <div className="flex p-4 justify-between">
                            <button
                                ref={cancelButtonRef}
                                onClick={delete_all}
                                className="px-4 py-2 text-white rounded-md bg-red-600"
                            >
                                Cancel
                            </button>
                            {/* <ReactToPrint
                                trigger={() => (
                                    <button
                                        ref={printButtonRef}
                                        disabled={loader}
                                        className="px-4 py-2 text-white rounded-md bg-blue-600"
                                    >
                                        {loader ? 'Printing...' : 'Print'}
                                    </button>
                                )}
                                content={() => componentRef.current}
                            /> */}
                            <ReactToPrint
                                trigger={() => (
                                    <button
                                        ref={printButtonRef}
                                        disabled={loader}
                                        className='px-4 py-2 text-white rounded-md bg-blue-600'>
                                        {loader ? (<span>Printing...</span>) : (<span>Print</span>)}
                                    </button>
                                )}
                                content={() => componentRef.current}
                            />
                        </div>
                        <div id='invoice' ref={componentRef} className="w-full p-4 bg-white" style={{ width: '300px' }}>
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
                                    invoiceData?.invoice?.items?.map((itm, index) => (
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
                                        <h2 className="text-sm">৳ {invoiceData?.invoice?.total}</h2>
                                    </div>
                                </li>
                                <li className="py-2 border-b border-gray-700">
                                    <div className="flex justify-between">
                                        <h2 className="text-sm font-semibold">Pay Amount:</h2>
                                        <h2 className="text-sm">৳ {invoiceData?.invoice?.cash}</h2>
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
                                <h2 className="text-sm">৳ {invoiceData?.invoice?.change}</h2>
                            </div>

                        </div>
                    </div >
                </div >
            )}
        </>
    );
};

export default PosInvoice;
