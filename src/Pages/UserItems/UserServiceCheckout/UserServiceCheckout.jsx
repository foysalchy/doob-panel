import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const UserServiceCheckout = () => {
    // const id = useParams()
    const findService = useLoaderData();
    const { setSelectProductData, setOrderStage, user } = useContext(AuthContext)
    // const findService = myServices.find((service) => service._id === id.id);
    const navigate = useNavigate();
    const subtotal = parseInt(findService?.price) || 0;
    const shippingFee = 0;
    const shippingFeeDiscount = 0;
    const discount = 0; // You need to implement promo code functionality to calculate this
    const total = subtotal + shippingFee - shippingFeeDiscount - discount;
    const [promoPice, setPomoPrice] = useState(false)

    const promoSubmit = (e) => {
        e.preventDefault();
        alert('wrong code')

    }

    const sendPlaceOrderData = () => {
        const orderData = [{ ...findService }]; // Create an array and add findService object
        const data = {
            normalPrice: total,
            productId: findService._id,
            userEmail: user.email,
            productTitle: findService.title,
            productPrice: findService.price,
            productImg: findService.img,
            productCategory: findService.category,
            promoPice,
            discount,
            shippingFee,
            shippingFeeDiscount,
            time_duration: findService.subscriptionPeriod
        };

        setOrderStage(data);
        navigate('/user-service-payment');

        localStorage.setItem('orderServiceData', JSON.stringify(orderData)); // Store the array in localStorage
    };



    // const datas = JSON.parse(localStorage.getItem('orderServiceData') || '')
    // console.log(datas, 'from localStorage', findService);

    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10'>
            <div className='md:flex gap-4 w-full justify-between'>
                <div className="w-full">

                    <div className=" mt-0 rounded max-w-4xl p-6  sm:p-10 bg-gray-200 text-gray-900 w-full">
                        <div className='flex flex-col space-y-4'>
                            <h2 className="text-xl font-semibold">Your cart</h2>
                            <ul className="flex flex-col divide-y dark:divide-gray-700">
                                <li className="flex gap-4 flex-col py-6 sm:flex-row sm:justify-between">
                                    <div className="flex items-start w-full space-x-2 sm:space-x-4">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 dark:border-transparent rounded outline-none sm:w-[90px] sm:h-[90px] dark:bg-gray-500" src={findService?.img} alt="Polaroid camera" />
                                        <div className="flex flex-col justify-between w-full pb-4">
                                            <div className="flex justify-between w-full pb-2 space-x-2">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{findService?.title}</h3>
                                                    <p className="text-lg font-semibold"><span className='kalpurush' >৳</span>{findService?.price}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='bg-gray-200 lg:w-96 mt-8 lg:mt-0 min-h-[350px] max-h-[380px] rounded p-8'>
                    <div className="space-y-1 my-4">
                        <h2 className="text-xl font-semibold ">Order Summary</h2>
                        <div className='flex justify-between '>
                            <p className="text-gray-700">Subtotal</p>
                            <p className=''>৳ <span className='font-sans'> {subtotal} </span></p>
                        </div>
                        <div className='flex justify-between '>
                            <p className="text-gray-700">Shipping Fee </p>
                            <p className='kalpurush'>৳ <span className='font-sans'>{shippingFee}</span></p>
                        </div>
                        <div className='flex justify-between '>
                            <p className="text-gray-700 "> Discount </p>
                            <p className='kalpurush'>৳ <span className='font-sans'>{discount}</span></p>
                        </div>

                    </div>
                    <form onSubmit={promoSubmit} className="products-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                        <input
                            name='promoCode'
                            type="text"
                            placeholder="Enter your promo code"
                            className="text-gray-500 border outline-none px-4 py-2 rounded w-full sm:w-72"
                        />
                        <button type='submit' className="px-4 py-2 bg-gray-800 rounded text-white">
                            apply
                        </button>
                    </form>
                    <div className='flex justify-between py-2'>
                        <p className="text-gray-700 ">Total </p>
                        <p className='kalpurush'>৳ <span className='font-sans'> {total}</span></p>
                    </div>
                    <div  >


                        <button
                            onClick={sendPlaceOrderData}
                            type="button" className='w-full'>
                            <div className="px-6 py-2 rounded w-full bg-gray-800 text-white" type='button'>
                                Place Order
                            </div>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserServiceCheckout;