import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
// import localImg from '../../../assets/Logo.png'
import ReactToPrint from 'react-to-print';
const PosInvoice = ({ setOpen, invoiceData, setInvoiceOpen, invoiceOpen }) => {
    const [loader, setLoader] = useState(false);
    const { shopInfo } = useContext(AuthContext)

    const componentRef = useRef();




    console.log(invoiceData, '****');
    return (
        <>
        
            {
                invoiceOpen && <div className="bg-gray-100 p-12  w-screen h-screen overflow-x-hidden overflow-h-auto fixed top-0 left-0 bottom-0 right-0">
                    <div className="flex justify-between gap-3 items-center border-b pb-3">
                        <h1 className="text-xl font-semibold">
                            . {/* Invoice */}
                        </h1>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => { setOpen(false) }}
                                className='px-4 py-2 text-white rounded-md bg-red-600'>
                                Close
                            </button>

                            <ReactToPrint
                                trigger={() => (
                                    <button
                                        disabled={!(loader === false)}
                                        className='px-4 py-2 text-white rounded-md bg-blue-600'>
                                        {loader ? (<span>Printing...</span>) : (<span>Print</span>)}
                                    </button>
                                )}
                                content={() => componentRef.current}
                            />
                        </div>
                    </div><br />
                    <div className="w-screen flex justify-center">
                        <div id='invoice' ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '812px', height: '1218px' }}>
                            <div className="flex items-center justify-between pb-3   border-blue-700">
                                <div className="">
                                    {shopInfo?.logo && <img src={shopInfo?.logo} className='w-[120px]' alt="" />}
                                    <h3 className="text-start text-lg font-semibold">Name: {shopInfo?.shopName}</h3>
                                    <p className="text-start text text-gray-500">Email: {shopInfo?.shopEmail}</p>
                                    <p className="text-start text text-gray-500">Phone: {shopInfo?.shopNumber}</p>
                                    <p className="text-start text text-gray-500">Address: {shopInfo?.address}</p>
                                </div>
                                <div>
                                    <h1 className='text-2xl'>Recept</h1>
                                    paid date: {new Date().toLocaleDateString()}
                                    <p></p>
                                </div>
                            </div>
                            <ul className=''>
                                <div className="border-b border-dashed flex items-center justify-between border-gray-700 py-2 gap-2 ">
                                    <h2 className="text-md font-semibold">Product Name</h2>
                                    <h2 className="text-md font-semibold">Price</h2>
                                </div>
                                {
                                    invoiceData?.invoice?.items?.map((itm, index) => <li key={index}>
                                        <div className="border-b border-dashed justify-between flex  items-start text-start border-gray-700 py-2 gap-2">
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {`(${index + 1})`}
                                                </span>
                                                <h2 className="w-[400px]">{itm?.name}</h2>
                                            </div>

                                            <div className="">
                                                <h2 className=""> ৳ {itm?.price}</h2>
                                            </div>
                                        </div>
                                    </li>)
                                }
                            </ul>

                            <ul className='mt-6 w-[300px] ml-auto'>
                                <li>
                                    <div className=" border-dashed flex items-center justify-between border-gray-700 py-2 gap-2 ">
                                        <h2 className="text-md font-semibold"> Total :</h2>
                                        <h2 className="text-md border-b pb-1 border-dashed border-gray-600 w-[130px]">{invoiceData?.invoice?.total}  ৳</h2>
                                    </div>
                                </li>

                                <li>
                                    <div className=" border-dashed flex items-center justify-between border-gray-700 py-2 gap-2 ">
                                        <h2 className="text-md font-semibold"> Pay Amount: :</h2>
                                        <h2 className="text-md border-b pb-1 border-dashed border-gray-600 w-[130px]">{invoiceData?.invoice?.cash}  ৳</h2>
                                    </div>
                                </li>
                            </ul>
                            <div className="border-t mt-6 border-dashed flex items-center justify-between border-gray-700 py-2 gap-2 ">
                                <h2 className="text-md font-semibold">Your total change today :</h2>

                                <h2 className="text-lg font-semibold pb-1 border-dashed border-gray-600  ">{invoiceData?.invoice.change}  ৳</h2>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PosInvoice;