import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import BrightAlert from 'bright-alert';
import { data } from 'autoprefixer';
import PaymentAlert from './PaymentAlert';

const Payment = () => {
    const paymentGetWays = useLoaderData();
    const [open, setOpen] = useState(false);
    const { selectProductData, orderStage, shopUser, shop_id } = useContext(ShopAuthProvider);
    const [payment, setPayment] = useState(false);
    const [passData, setPassData] = useState([]);
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);
    const shopId = idMatch ? idMatch[1] : null;
    const navigate = useNavigate();


    const message = ["Exercise caution when making payments, ensuring that you only transact with reputable and secure platforms to safeguard your financial information.", "Always verify the legitimacy of the payment process, double-checking the recipient details and website security features before proceeding with any transactions.", "After completing a payment, retain a screenshot or confirmation email as proof of the transaction, serving as documentation in case of any discrepancies or disputes in the future.", "Regularly monitor your bank statements and financial accounts to promptly detect and address any unauthorized or suspicious activities, ensuring the security of your financial assets."]



    useEffect(() => {
        if (!selectProductData.length) { window.history.back(); }
    }, [selectProductData]);

    const orderSubmit = () => {
        const data = orderStage
        data.method = payment
        data.timestamp = new Date().getTime()
        data.userId = shopUser._id
        data.shopId = shop_id.shop_id
        setPassData(data);
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/user/order?token=${shopUser._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => {
            BrightAlert({ icon: 'success' })
            navigate(`/shop/${shopId}/user/my-orders`)
        });

        console.log(data, '------------');

    }

    return (
        <div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
            <div className='grid grid-cols-4  gap-4 my-4 '>
                <div className="grid md:grid-cols-4 col-span-3 gap-4">
                    {
                        paymentGetWays.map(get => (
                            <div>
                                {get.Getaway === 'Bkash' &&
                                    <a href="#scrollDestination">
                                        <div onClick={() => setPayment(get)} className={`${payment?.Getaway === 'Bkash' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                                            <img
                                                alt="Developer"
                                                src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                                                srcSet="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                                                className="h-[120px] w-[120px]"
                                            />
                                            <h4 className="mt-2 font-inner text-lg">{get?.Getaway}</h4>
                                        </div>
                                    </a>

                                }
                                {get.Getaway === 'Nogod' &&
                                    <a href="#scrollDestination">
                                        <div onClick={() => setPayment(get)} className={`${payment?.Getaway === 'Nogod' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                                            <img
                                                alt="Developer"
                                                src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                                                srcSet="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                                                className="h-[120px] w-[120px] object-cover"
                                            />
                                            <h4 className="mt-2 font-inner text-lg">{get?.Getaway}</h4>
                                        </div>
                                    </a>

                                }
                                {get.Getaway === 'AmarPay' &&
                                    <a href="#scrollDestination">
                                        <div onClick={() => setPayment(get)} className={`${payment?.Getaway === 'AmarPay' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                                            <img
                                                alt="Developer"
                                                src="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                                                srcSet="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                                                className="h-[120px] w-[120px]"
                                            />
                                            <h4 className="mt-2 font-inner text-lg">{get?.Getaway}</h4>
                                        </div>
                                    </a>
                                }
                            </div>
                        ))
                    }

                    <a href="#scrollDestination">
                        <div onClick={() => setPayment({ Getaway: "CashOnDelivery" })} className={`${payment?.Getaway === 'CashOnDelivery' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                            <img
                                alt="Developer"
                                src="https://salenow-v2-backend.vercel.app/api/v1/image/658ec416b689ffabf15d9fb6.jpg"
                                srcSet="https://salenow-v2-backend.vercel.app/api/v1/image/658ec416b689ffabf15d9fb6.jpg"
                                className="h-[120px] w-[120px]"
                            />
                            <h4 className="mt-2  font-bold text-lg">Cash On Delivery</h4>
                        </div>
                    </a>

                </div>

                <div className="">
                    <div className="bg-gray-200 font-sans w-full p-3">
                        <h1 className="text-2xl font-semibold">Order Summary</h1>
                        <p className="text-gray-400 mt-2">Subtotal( {orderStage?.productList?.length} Items and shipping fee included)</p>
                        <br />
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl">Total Amount:</h1>
                            <h1 className='flex items-center gap-1  font-bold '>
                                {!orderStage?.promoHistory?.status && <div className=''>
                                    <span className="kalpurush text-2xl">৳</span>{orderStage?.promoHistory?.normalPrice}</div>}
                                {orderStage?.promoHistory?.promoPrice && <span>{orderStage?.promoHistory?.promoPrice}</span>}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {payment && <div id='scrollDestination' className="border-2 border-gray-700 mt-8 w-full border-dashed p-4">
                <div className='flex flex-col gap-2 text-xs'>
                    {message.map((mess, i) => <div className='py-2 bg-yellow-200 px-10' key={i}>{mess}</div>)}
                </div>

                <div id='scrollDestination' className="flex items-center justify-center my-6">
                    {open && <PaymentAlert open={open} />}

                    {payment.Getaway === 'CashOnDelivery' ?
                        <button
                            onClick={() => orderSubmit()}
                            className="group relative inline-flex m-auto items-center overflow-hidden rounded bg-gray-900 px-10 py-2 text-white focus:outline-none focus:ring active:bg-gray-900"

                        >
                            <span className="absolute -start-full transition-all group-hover:start-4">
                                <svg
                                    className="h-5 w-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>

                            <span className="text-lg font-medium transition-all group-hover:ms-4"> Order Now </span>
                        </button> : <button

                            className="group relative inline-flex m-auto items-center overflow-hidden rounded bg-gray-900  px-10 py-2 text-white focus:outline-none focus:ring active:bg-gray-900"

                        >
                            <span className="absolute -start-full transition-all group-hover:start-4">
                                <svg
                                    className="h-5 w-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>

                            <span className="text-lg font-medium transition-all group-hover:ms-4"> Pay Now </span>
                        </button>}

                </div>
            </div>}
        </div>
    );
};

export default Payment;