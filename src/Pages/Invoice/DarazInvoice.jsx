import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../AuthProvider/UserProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const DarazInvoice = () => {
    const { id } = useParams();
    const { invoiceData, shopInfo, shopId } = useContext(AuthContext)
    console.log(invoiceData);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const { data: darazInvoiceData = [], refetch, isLoading } = useQuery({
        queryKey: ["invoiceDarazOrder"],
        queryFn: async () => {
            if (shopInfo) {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-single-order?id=${shopInfo?._id}&orderId=${id}`);
                const data = await res.json();
                return data.data;
            }
        },
    });
    const info = darazInvoiceData.find(itm => itm?.order_id == id);
    let totalPrice = 0;

    for (const item of darazInvoiceData || []) {
        const currentPrice = item?.paid_price || 0;
        const quantity = item?.quantity || 1;
        totalPrice += currentPrice * quantity;
    }

    function formatDate(timestamp) {
        // Check if the timestamp is in seconds, and convert it to milliseconds if needed
        if (timestamp.toString().length === 10) {
            timestamp *= 1000;
        }
        console.log(timestamp);
        const date = new Date(timestamp);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${formattedDate} `;
    } return (
        <div className="bg-gray-100 p-12">
            <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md'>Print</button>
            <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                <header className="clearfix">
                    <div id="logo">
                        <img src={shopInfo?.logo} />
                    </div>
                    <div id="company">
                        <h2 className="name">{shopInfo?.shopName}</h2>
                        {/* <div>455 Foggy Heights, AZ 85004, US</div> */}
                        <div>{shopInfo?.shopNumber}</div>
                        <div>
                            <a href="mailto:company@example.com">{shopInfo?.shopEmail}</a>
                        </div>
                    </div>
                </header>
                <main className='main mt-4'>
                    <div id="details" className="clearfix">
                        <div id="client">
                            {/* <img src={shopInfo?.logo} alt="" className="" /> */}
                            <div className="to">INVOICE TO: {info?.order_id}</div>
                            <h2 className="name">{info?.name}</h2>
                            <div className="address">{info?.addresses?.address} {info?.addresses?.area} {info?.addresses?.city} {info?.addresses?.province}</div>
                            <div className="email">
                                <a href="mailto:john@example.com">{info?.addresses?.mobileNumber}</a>
                            </div>
                        </div>
                        <div id="invoice">
                            <h1>INVOICE</h1>
                            <div className="date">Date of Invoice:
                                {formatDate(info?.updated_at)}

                            </div>
                        </div>
                    </div>
                    <table className='table' border={0} cellSpacing={0} cellPadding={0}>
                        <thead className='thead'>
                            <tr>
                                <th className="no text-center">#</th>
                                <th className=" text-center">Product photo</th>
                                <th className=" text-center">Product Name</th>
                                <th className=" text-center bg-gray-400">UNIT PRICE</th>
                                <th className="text-center">QUANTITY</th>
                                <th className=" text-center no">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            <tr className='text-center'>
                                <td className="no">1</td>
                                <td className=""><img className='w-20 h-20 border border-opacity-40 rounded object-cover' src={info?.product_main_image} alt="" /></td>
                                <td className="">
                                    <h3>{info?.name?.split(' ').slice(0, 5).join(" ")}</h3>
                                </td>
                                <td className=" ">{info?.paid_price}</td>
                                <td className=" ">{!info?.quantity ? <>1</> : info?.quantity}</td>
                                <td className="no ">{parseInt(info?.paid_price) * parseInt(info?.quantity ? info?.quantity : 1)}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} />
                                <td colSpan={2}>SUBTOTAL</td>
                                <td>{totalPrice}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} />
                                <td colSpan={2}>TAX 25%</td>
                                <td>300</td>
                            </tr>
                            <tr>
                                <td colSpan={3} />
                                <td colSpan={2}>GRAND TOTAL</td>
                                <td>{totalPrice + 300} </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div id="thanks">Thank you!</div>
                    <div id="notices">
                        <div>NOTICE:</div>

                    </div>
                    <footer>
                        Invoice was created on a computer and is valid without the signature and
                        seal.
                    </footer>
                    {/* <div id="thanks">
                        {
                            (info.status !== 'Cancel' && info.status !== 'Failed' && info.status !== 'Returned') && <div className="mt-4 mx-auto px-4 md:px-0">
                                <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
                                    {info?.stepsItems.map((item, idx) => (
                                        <li aria-current={currentStep == idx + 1 ? "step" : false} className="flex-1 last:flex-none flex gap-x-2 md:items-center">
                                            <div className="flex items-center flex-col gap-x-2">
                                                <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${currentStep > idx + 1 ? "bg-indigo-600 border-indigo-600" : "" || currentStep == idx + 1 ? "border-indigo-600" : ""}`}>
                                                    <span className={` ${currentStep > idx + 1 ? "hidden" : "" || currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                                        {idx + 1}
                                                    </span>
                                                    {
                                                        currentStep > idx + 1 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                            </svg>
                                                        ) : ""
                                                    }
                                                </div>
                                                <hr className={`h-12 border md:hidden ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                                            </div>
                                            <div className="h-8 flex items-center md:h-auto">
                                                <h3 className={`text-sm ${currentStep === idx + 1 ? "text-indigo-600" : ""}`}>
                                                    {item}
                                                </h3>
                                            </div>
                                            <hr className={`hidden mr-2 w-full border md:block ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div> */}
                </main>
            </div>
        </div>
    );
};

export default DarazInvoice;





//    <div className="bg-gray-100 p-12">
//             <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md'>Print</button>
//             <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
//                 <div className="pb-3">
//                     <img src={shopInfo?.logo} alt="" className="w-[120px] " />
//                     <h2 className="font-semibold text-xl">{shopInfo?.shopName}</h2>
//                     <p className="">Purchase Summary</p>
//                 </div>
//                 <hr />
//                 <h3 className="font-semibold mt-2">Order Details:</h3>
//                 <div className="flex justify-start items-center ">
//                     <ul className="text-gray-500 text-start mt-3 border w-full border-gray-600">
//                         <li className='flex gap-2 items-center border-b border-gray-500 '>
//                             <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Name:</div>  {info?.addresses?.fullName}
//                         </li>
//                         <li className='flex gap-2 items-center border-b border-gray-500 '>
//                             <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Phone:</div> {info?.addresses?.mobileNumber}
//                         </li>

//                         <li className='flex gap-2 items-center border-b border-gray-500 '>
//                             <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Address:</div> {info?.addresses?.address}, {info?.addresses?.area}, {info?.addresses?.city},
//                         </li>
//                         <li className='flex gap-2 items-center border-b border-gray-500 '>
//                             <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Order Id:</div> {info?.addresses?._id}
//                         </li>
//                         <li className='flex gap-2 items-center border-gray-500 '>
//                             <div className="font-[] text-gray-800 border-r w-[200px] ml-2 border-gray-500">Payment:</div> {info?.method?.Getaway}
//                         </li>

//                     </ul>
//                 </div> <hr /><br />
//                 <h1 className="text-md mb-3 font-semibold">Order Items:</h1>
//                 <section className="container mx-auto font-mono">
//                     <div className="w-full mb-8 overflow-hidden ">
//                         <div className="w-full border-2 border-b-transparent border-gray-600 overflow-hidden">
//                             <table className="w-full">
//                                 <thead className=''>
//                                     <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-900 ">
//                                         <th className="px-4 py-3">#</th>
//                                         <th className="px-4 py-3">Name</th>
//                                         <th className="px-4 py-3">Quantity</th>
//                                         <th className="px-4 py-3">Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white ">
//                                     {
//                                         darazInvoiceData?.map((itm, index) => <tr style={{ borderBottom: "2px solid black" }} key={itm?._id} className="text-gray-700">
//                                             <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>

//                                             <td className="px-4 py-3 text-sm font-[300] border">{itm?.name}</td>
//                                             <td className="px-4 py-3 text-sm border">{itm?.quantity ? itm?.quantity : 1}</td>
//                                             <td className="px-4 py-3 text-sm border">
//                                                 {itm?.paid_price}
//                                             </td>
//                                         </tr>)
//                                     }
//                                     <tr style={{ borderBottom: "2px solid black" }} className="text-gray-700">
//                                         <td className="px-4 py-3 text-md font-semibold border"></td>
//                                         <td className="px-4 py-3 text-sm font-[300] border"></td>
//                                         <td className="px-4 py-3 text-sm border font-semibold">Total Price:</td>
//                                         <td className="px-4 py-3 text-sm border font-semibold">{totalPrice}</td>
//                                     </tr>

//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </section>

//             </div>
//         </div>