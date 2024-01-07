import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import UserOrderInvoice from './UserOrderInvoice';
import PaymentGetWay from './../../../../AdminItem/Settings/PaymentGetWay/PaymentGetWay';
import Swal from 'sweetalert2';

const UserMyOrder = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mobile-bank');
    const [getway, setGetway] = useState('Bekash');
    const [orderId, setOrderId] = useState('');
    const [showPaymentGetwaySelect, setShowPaymentGetwaySelect] = useState(true);

    const [steps, setSteps] = useState({
        stepsItems: ["Order", "Processing", "Shipped", "Delivered"],
        // currentStep: 5
    });
    const [open, setOpen] = useState(false);

    const { shop_id, shopUser } = useContext(ShopAuthProvider)

    const { data: myOrders = [], refetch, isLoading } = useQuery({
        queryKey: ["my-order"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/user/order?shopId=${shop_id.shop_id}&&token=${shopUser._id}`);
            const data = await res.json();
            return data;
        },
    });


    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const userProductCancel = (orderId, productId, status) => {
        console.log(orderId, productId, status);
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/user/order-product-status-update?orderId=${orderId}&productId=${productId}&status=${status}&token=${shopUser._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (!data.error) {
                alert("Successfully Updated");
                refetch()
            } else {
                alert("Failed to Update")
            }

        });

    }

    const [modalOpen, setModalOpen] = useState(false);
    const handleViewDetails = (orderId) => {
        setModalOpen(orderId);

    };

    // ? update status
    const updateStatus = (status, orderId) => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, orderId })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (!data.error) {
                alert("Successfully Updated");
                refetch()
            } else {
                alert("Failed to Update")
            }

        });
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        let form = e.target;

        const name = form?.name?.value ? form?.name?.value : '';
        const bank_name = form?.bank_name?.value ? form?.bank_name?.value : '';
        const account_number = form?.account_number?.value ? form?.account_number?.value : '';
        const ac = form?.ac?.value ? form?.ac?.value : '';
        const holder = form?.holder?.value ? form?.holder?.value : '';
        // const getway = showPaymentGetwaySelect;
        const paymentMethod = selectedPaymentMethod;

        let data = {
            data: {
                ...(selectedPaymentMethod === 'mobile-bank'
                    ? {
                        getway: getway,
                        name: name,
                        account_number: account_number,
                    }
                    : {
                        bank_name: bank_name,
                        ac: ac,
                        holder: holder,
                        paymentMethod: selectedPaymentMethod,

                    }
                ),
            },
            shopId: shop_id.shop_id,
            userId: shopUser._id,
            orderId: orderId,
        };

        console.log(data);
        fetch(
            `http://localhost:5000/api/v1/shop/refund-Order?token=${shopUser._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .finally(() => {
                updateStatus('Refund', orderId)


                Swal.fire({
                    icon: 'success',
                    title: 'Add Successfully!',
                    showConfirmButton: false,
                    timer: 1000
                })
                form.reset()
                setFile()
                setFileName('Provide a Image or PDF')
                setDescription('')
                refetch()
            })
    }


    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.value;
        setSelectedPaymentMethod(selectedMethod);

        // If "mobile-bank" is selected, show PaymentGetway select
        setShowPaymentGetwaySelect(selectedMethod === 'mobile-bank');
    };

    const PaymentGetWay = ["Bekash", "Nogod", "AmarPay"]
    return (
        <div className=''>
            <div className=' font-google'>
                <div className='flex flex-col gap-4'>
                    {
                        myOrders?.data?.map((order) => {
                            // Determine the current step based on order status
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
                            return (
                                <div className=' p-4 rounded border-[0.5px] border-opacity-40 gap-4 border-gray-500 bg-white'>
                                    <div className='pb-4 flex items-center justify-between'>
                                        <h1 className="text-xl font-bold ">Order Id : {order._id}</h1>
                                        <div className='flex items-center gap-4'>
                                            {/* <UserOrderInvoice order={order} modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
                                            <p>Order placed {formatTimestamp(order.timestamp)}</p>

                                            <button onClick={() => handleViewDetails(order._id)} className='text-blue-500'>View invoice →</button>

                                            {modalOpen && (
                                                <div>
                                                    <UserOrderInvoice
                                                        modalOpen={true}
                                                        setModalOpen={setModalOpen}
                                                        order={myOrders?.data?.find(order => order._id === modalOpen)}
                                                    />
                                                </div>
                                            )}

                                        </div>
                                        <div className='flex items-center'>
                                            {!order.status && <div >
                                                {!order.status ? <button onClick={() => userProductCancel(order._id, order._id, "Cancel")} className='text-red-500'>  Cancel</button> : <button className=''>{order.status}ed</button>}
                                            </div>}
                                            {
                                                order?.status === 'Delivered' && <div className='flex items-center gap-2'>
                                                    <button onClick={() => updateStatus('Return', order?._id)} className="text-red-500 px-4 py-1 bg-red-100 rounded">Return</button>
                                                    <button onClick={() => {
                                                        setOpen(!open)
                                                        setOrderId(order?._id)
                                                    }} className="text-blue-500 px-4 py-1 bg-gray-100 rounded">Refund</button>
                                                    {/* refund modal */}
                                                    {open && <div className="modal h-screen w-screen fixed bg-[#0000008e] flex items-center justify-center top-0 left-0 z-[1000]">
                                                        <div className="bg-white  md:w-[500px] text-black p-6 rounded-lg">
                                                            <button onClick={() => setOpen(!open)} className='p-2 float-right text-xl'>
                                                                x
                                                            </button> <br />
                                                            <form onSubmit={handleSubmit} className="">
                                                                { }
                                                                <div className="">
                                                                    <label className="block text-sm font-medium text-gray-700" htmlFor="paymentMethod">
                                                                        Payment Method
                                                                    </label>
                                                                    <select
                                                                        id="paymentMethod"
                                                                        name="paymentMethod"
                                                                        value={selectedPaymentMethod}
                                                                        onChange={handlePaymentMethodChange}
                                                                        className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="mobile-bank">Mobile Banking</option>
                                                                        <option value="bank">Bank</option>
                                                                    </select>
                                                                    <div className="">
                                                                        <label className="block text-sm font-medium text-gray-700 mt-2" htmlFor="name">
                                                                            Name
                                                                        </label>
                                                                        <input name='name' id='name' className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder='type your name' type="text" />
                                                                    </div>
                                                                    {selectedPaymentMethod === ""}
                                                                    {showPaymentGetwaySelect && (
                                                                        <div className="">
                                                                            <div className="">
                                                                                <label
                                                                                    className="block text-sm font-medium text-gray-700 pb-1 mt-2"
                                                                                    htmlFor="paymentGetway"
                                                                                >
                                                                                    Payment Getway
                                                                                </label>
                                                                                <select
                                                                                    id="paymentGetway"
                                                                                    name="paymentGetway"
                                                                                    onChange={(e) => setGetway(e?.target?.value)}
                                                                                    className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                                >
                                                                                    {PaymentGetWay?.map((itm) => (
                                                                                        <option key={itm} value={itm}>
                                                                                            {itm}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            <div className="">
                                                                                <label
                                                                                    className="block text-sm font-medium text-gray-700 pb-1 mt-2"
                                                                                    htmlFor="account"
                                                                                >
                                                                                    Account Number
                                                                                </label>
                                                                                <input
                                                                                    id="account"
                                                                                    name="account_number"
                                                                                    type='tel'
                                                                                    placeholder='type your account number'
                                                                                    className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                                />
                                                                            </div>
                                                                        </div>


                                                                    )}

                                                                    {/* bank inputs */}
                                                                    {!showPaymentGetwaySelect && (
                                                                        <div className=''>
                                                                            <div className="">
                                                                                <label className="block text-sm font-medium text-gray-700 mt-2" htmlFor="bank_name">
                                                                                    Bank Name
                                                                                </label>
                                                                                <input name='bank_name' id='bank_name' className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder='type your name' type="text" />
                                                                            </div>
                                                                            <div className="">
                                                                                <label className="block text-sm font-medium text-gray-700 mt-2" htmlFor="ac">
                                                                                    AC
                                                                                </label>
                                                                                <input name='ac' id='ac' className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder='type your AC number' type="text" />
                                                                            </div>
                                                                            <div className="">
                                                                                <label className="block text-sm font-medium text-gray-700 mt-2" htmlFor="holder">
                                                                                    Holder
                                                                                </label>
                                                                                <input name='holder' id='holder' className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder='type Holder' type="text" />
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    <button className='bg-blue-500 text-white px-8 py-2 mt-3 ml-auto rounded' type='submit'>Pay</button>
                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>}
                                                </div>}
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        {
                                            order?.productList?.map((list) => (
                                                <div className='flex border p-4  justify-between gap-4 w-full'>

                                                    <div className='w-[50%]'> <img className='w-32 h-32 border border-opacity-40 rounded object-cover' src={list.img} alt="" /></div>

                                                    <div className='flex flex-col w-full  gap-1 '>  <h1 className='font-semibold text-lg '>{list.productName}</h1>
                                                        <p className='font-semibold'> Price: ${list.price}</p>
                                                        <p className='text-gray-500 text-clip'>Regular Price:  {list.regular_price} </p>
                                                    </div>
                                                    <div className='flex flex-col gap-1 w-full text-center'>
                                                        <h1 className='font-semibold text-lg '>Quantity</h1>
                                                        <p className='text-gray-500 text-center '>
                                                            {list.quantity}
                                                        </p>
                                                    </div>
                                                    <div className='flex flex-col gap-1 w-full'>
                                                        <h1 className='font-semibold text-lg '>Shipping updates</h1>
                                                        <p className='text-gray-500'>
                                                            {order.status ? order.status : (list.status ? list.status : "Progress")}

                                                        </p>
                                                    </div>


                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        (order.status !== 'Cancel' && order.status !== 'Failed' && order.status !== 'Returned') && <div className="mt-4 mx-auto px-4 md:px-0">
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
                                </div>
                            )
                        })}
                </div>

            </div>
        </div>
    );
};

export default UserMyOrder;