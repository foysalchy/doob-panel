import React, { useState } from 'react';
import { FaAnglesRight } from 'react-icons/fa6';

const UserOrderInvoice = ({ order, modalOpen, setModalOpen }) => {
    const [steps, setStep] = useState({
        stepsItems: ["Order", "Processing", "Delivered"],
    })

    const totalPrice = order?.productList?.reduce((total, item) => {
        return total + item?.price * item?.quantity;
    }, 0);

    let subtotal = 0;

    const productList = order?.productList.map((product) => {
        const productSubtotal = product.price * product.quantity;
        subtotal += productSubtotal;
        return subtotal;
    })

    let currentStep;
    if (!order.status) {
        currentStep = 2;
    } else if (order.status === 'delivered') {
        currentStep = 5;
    } else if (order.status === 'ready_to_ship') {
        currentStep = 3;
    } else if (order.status === 'shipped') {
        currentStep = 4;
    } else if (order.status === 'canceled' || "failed" || 'returned') {
        currentStep = 5;
    } else {
        // Default to 1 or any other appropriate value
        currentStep = 1;
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
    }
    
    return (
        <>
            {order &&
                <div className='bg-[#000000e1] w-[100%] h-[100%] p-2 fixed transparent-scroll overflow-x-hidden overflow-y-auto top-0 left-0 z-[2000]'>
                    <button onClick={() => setModalOpen(!modalOpen)} className='bg-white m-6 text-black px-8 py-2 float-right'>close</button>
                    <div className="w-full mt-12 h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                        <header className="clearfix">
                            <div id="logo">
                                <img src={order?.logo} />
                            </div>
                            <div id="company">
                                <h2 className="name">{order?.shopName}</h2>
                                {/* <div>455 Foggy Heights, AZ 85004, US</div> */}
                                <div>{order?.shopNumber}</div>
                                <div>
                                    <a href="mailto:company@example.com">{order?.shopEmail}</a>
                                </div>
                            </div>
                        </header>
                        <main className='main mt-4'>
                            <div id="details" className="clearfix">
                                <div id="client">
                                    {/* <img src={shoporder?.logo} alt="" className="" /> */}
                                    <div className="to">INVOICE TO:</div>
                                    <h2 className="name">{order?.addresses?.fullName}</h2>
                                    <div className="address">{order?.addresses?.address} {order?.addresses?.area} {order?.addresses?.city} {order?.addresses?.province}</div>
                                    <div className="email">
                                        <a href="mailto:john@example.com">{order?.addresses?.mobileNumber}</a>
                                    </div>
                                </div>
                                <div id="invoice">
                                    <h1>INVOICE</h1>
                                    <div className="date">Date of Invoice: {formatDate(order?.timestamp)}</div>
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
                                        order?.productList?.map((list, index) => <tr key={index} className='text-center'>
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
                                    {order?.stepsItems.map((item, idx) => (
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
            }
        </>
    );
};

export default UserOrderInvoice;