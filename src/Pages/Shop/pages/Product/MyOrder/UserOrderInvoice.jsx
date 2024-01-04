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
    } else if (order.status === 'Delivered') {
        currentStep = 5;
    } else if (order.status === 'ReadyToShip') {
        currentStep = 3;
    } else if (order.status === 'Shipped') {
        currentStep = 4;
    } else if (order.status === 'Cancel' || "Failed" || 'Returned') {
        currentStep = 5;
    } else {
        // Default to 1 or any other appropriate value
        currentStep = 1;
    }
    console.log(order, 'order.........');
    return (
        <>
            {order &&
                <div className='bg-[#000000e1] w-[100%] h-[100%] p-2 fixed transparent-scroll overflow-x-hidden overflow-y-auto top-0 left-0 z-[2000]'>
                    <button onClick={() => setModalOpen(!modalOpen)} className='bg-white m-6 text-black px-8 py-2 float-right'>close</button>
                    <div className="w-full mt-12 h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                        <div className="bg-gray-100 flex justify-between p-4 rounded-md">
                            <div className="text-lg font-semibold">
                                <h1 className="text-xl font-semibold">
                                    {order?.addresses?.fullName}
                                </h1>
                                <ul className='mt-2'>
                                    <li className='text-black text-sm font-[500] flex items-center gap-1 '>
                                        <FaAnglesRight className='text-sm' /> Phone : <span className="text-gray-600">{order?.addresses?.mobileNumber},
                                        </span>
                                    </li>
                                    <li className='text-black text-sm font-[500] flex items-center gap-1 mt-1'>
                                        <FaAnglesRight className='text-sm' /> Address : <span className="text-gray-600">{order?.addresses?.address},{order?.addresses?.area},{order?.addresses?.city}
                                        </span>
                                    </li>
                                    <li className='text-black text-sm font-[500] flex items-center gap-1 mt-1'>
                                        <FaAnglesRight className='text-sm' /> Payment : <span className="text-gray-600">{order?.method?.Getaway}
                                        </span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        {/* status steps */}
                        <p className="text-gray-600 mt-2 pb-2">Express Delivery</p>
                        <ul aria-label="Steps">
                            {
                                (order.status !== 'Cancel' && order.status !== 'Failed' && order.status !== 'Returned') && <div className="mt-4 px-4 md:px-0 w-full">
                                    <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
                                        {steps.stepsItems.map((item, idx) => (
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
                        </ul>
                        {/* products */}
                        <section>
                            <div className="mx-auto max-w-screen-xl bg-gray-100 mt-4 px-4 py-2 sm:px-6 rounded-lg sm:py-4 lg:px-8">
                                <div className="mx-auto max-w-3xl">
                                    <div className="mt-8">
                                        <ul className="space-y-4">
                                            {
                                                order?.productList?.map(itm => <li className="flex items-center gap-4">
                                                    <img
                                                        src={itm?.img}
                                                        alt=""
                                                        className="h-16 w-16 rounded object-cover"
                                                    />

                                                    <div>
                                                        <h3 className="text-sm text-gray-900">{itm?.productName}</h3>

                                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                            <div>
                                                                <div className="inline">Quantity:</div>
                                                                <dd className="inline">{itm?.quantity}</dd>
                                                            </div>

                                                            <div>
                                                                <dt className="inline">Color:</dt>
                                                                <dd className="inline">White</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </li>)
                                            }
                                        </ul>

                                        <div className="mt-8 flex justify-between border-t border-gray-400 pt-2">
                                            <div className="">

                                            </div>
                                            <div className="w-screen max-w-lg space-y-4">
                                                <dl className="space-y-0.5 text-sm text-gray-700">
                                                    <div className="flex flex-col items-end gap-1 font-semibold text-xl">

                                                        <div className="flex gap-2">
                                                            <h1>Subtotal:</h1>
                                                            <dd>
                                                                {subtotal}
                                                            </dd>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <h1>Total:</h1>
                                                            <dd>
                                                                {totalPrice}
                                                            </dd>
                                                        </div>
                                                    </div>
                                                </dl>

                                                <div className="flex justify-end">
                                                </div>

                                                <div className="flex justify-end">
                                                    <a
                                                        href="#"
                                                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            }
        </>
    );
};

export default UserOrderInvoice;