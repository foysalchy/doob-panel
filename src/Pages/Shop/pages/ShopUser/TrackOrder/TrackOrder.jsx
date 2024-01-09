import React from 'react';
import { useContext } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { useState } from 'react';

const TrackOrder = () => {

    const { shopUser } = useContext(ShopAuthProvider)
    const [steps, setSteps] = useState({
        stepsItems: ["Order", "Processing", "Shipped", "Delivered"],
        // currentStep: 5
    });

    const [order, setOrder] = useState(false)
    const [loading, setLoading] = useState(false)

    const trackOrderSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const orderId = e.target.orderId.value
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/order-track?token=${shopUser._id}&orderId=${orderId}`).then((res) => res.json()).then((data) => {
            setOrder(data.data)
            setLoading(false)
        })
    }


    let currentStep;
    if (!order?.status) {
        currentStep = 2;
    } else if (order?.status === 'Delivered') {
        currentStep = 5;
    } else if (order?.status === 'ReadyToShip') {
        currentStep = 3;
    } else if (order?.status === 'Shipped') {
        currentStep = 4;
    } else if (order?.status === 'Cancel' || "Failed" || 'Returned') {
        currentStep = 5;
    } else {
        // Default to 1 or any other appropriate value
        currentStep = 1;
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10'>
            <div className={!order ? "py-28" : 'py-0'} >
                {<form
                    onSubmit={trackOrderSubmit}
                    className="max-w-2xl px-4 mx-auto mt-12 flex gap-4 pb-10 justify-center items-center">
                    <div className="relative w-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search with your order id"
                            name='orderId'
                            className="w-full py-3 pl-12 pr-4 text-gray-500 border border-black outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />
                    </div>
                    <button type='submit' className='bg-gray-900 py-3 text-white px-7'>{loading ? "Searching" : "Search"}</button>
                </form>}

                {order && <div className=' p-4 rounded border-[0.5px] border-opacity-40 gap-4 border-gray-500 bg-white'>
                    <div className='pb-4 flex items-center justify-between'>
                        <h1 className="text-xl font-bold ">Order Id : {order._id}</h1>
                        <div className='flex items-center gap-4'>
                            {/* <UserOrderInvoice order={order} modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
                            <p>Order placed {formatTimestamp(order.timestamp)}</p>

                            {/* <button onClick={() => handleViewDetails(order._id)} className='text-blue-500'>View invoice →</button>

                        {modalOpen && (
                            <div>
                                <UserOrderInvoice
                                    modalOpen={true}
                                    setModalOpen={setModalOpen}
                                    order={myOrders?.data?.find(order => order._id === modalOpen)}
                                />
                            </div>
                        )} */}

                        </div>

                    </div>
                    <div className='flex flex-col gap-3'>
                        {
                            order?.productList?.map((list) => (
                                <div className='flex border p-4  justify-between gap-4 w-full'>

                                    <div className='w-[50%]'> <img className='w-32 h-32 border border-opacity-40 rounded object-cover' src={list.img} alt="" /></div>

                                    <div className='flex flex-col w-full  gap-1 '>  <h1 className='font-semibold text-lg '>{list.productName}</h1>
                                        <p className='font-semibold'> Price: <span className='kalpurush'>৳</span>{list.price}</p>
                                        <p className='text-gray-500 text-clip'>Regular Price: <span className='kalpurush'>৳</span> {list.regular_price} </p>
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
                </div>}
            </div>
        </div>
    );
};

export default TrackOrder;