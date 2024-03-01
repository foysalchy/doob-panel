import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../AuthProvider/UserProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Barcode from 'react-barcode';

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
            const res = await fetch(`http://localhost:5001/api/v1/seller/order?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });
    const info = iData.find(itm => itm?._id === id);
    const totalPrice = info?.productList?.reduce((total, item) => {
        return total + item?.price * item?.quantity;
    }, 0);


    const formattedDate = (time) => {
        const date = new Date(time);

        // Extract individual components (year, month, day, etc.)
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Format the components as needed
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const finalDate = formattedDate;
        return finalDate;

    }

    console.log(info, 'info');
    console.log(shopInfo, 'shop info');
    return (
        <div className="bg-gray-100 p-12 ">
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
                            <div className="to">INVOICE TO:</div>
                            <h2 className="name">{info?.addresses?.fullName}</h2>
                            <div className="address">{info?.addresses?.address} {info?.addresses?.area} {info?.addresses?.city} {info?.addresses?.province}</div>
                            <div className="email">
                                <a href="mailto:john@example.com">{info?.addresses?.mobileNumber}</a>
                            </div>
                        </div>
                        <div id="invoice">
                            <h1>INVOICE</h1>
                            <div className="wrap-2 mt-[-57px] ml-[40px]">
                                <Barcode value={info._id} />
                            </div>
                            <div className="date">Date of Invoice: {formattedDate(info?.timestamp)}</div>
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
                            {
                                info?.productList?.map((list, index) => <tr key={index} className='text-center'>
                                    <td className="no">{index + 1}</td>
                                    <td className=""><img className='w-20 h-20 border border-opacity-40 rounded object-cover' src={list.img} alt="" /></td>
                                    <td className="">
                                        <h3>{list.productName?.split(' ').slice(0, 5).join(" ")}</h3>
                                    </td>
                                    <td className=" ">{list?.price}</td>
                                    <td className=" ">{list.quantity}</td>
                                    <td className="no ">{parseInt(list?.price) * parseInt(list?.quantity)}</td>
                                </tr>)
                            }
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

export default Invoice;
