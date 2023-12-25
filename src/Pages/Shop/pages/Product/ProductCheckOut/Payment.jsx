import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import Delivery from './../../../../SellerItems/ProductManagement/SellerAddProduct/Components/Delivery';

const Payment = () => {
    const paymentGetWays = useLoaderData();
    const { selectProductData, orderStage } = useContext(ShopAuthProvider);
    const [myTabs, setMyTabs] = useState(false)


    console.log(myTabs);
    return (
        <div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
            <div className='grid grid-cols-4  gap-4 my-4 '>
                <div className="grid md:grid-cols-4 col-span-3 gap-4">
                    {
                        paymentGetWays.map(get => (
                            <div>
                                {get.Getaway === 'Bkash' && 
                                    <div onClick={() => setMyTabs(get)} className={`${myTabs?.Getaway==='Bkash' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                                    <img
                                        alt="Developer"
                                        src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                                        srcSet="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                                        className="h-[120px] w-[120px]"
                                    />
                                    <h4 className="mt-2 text-lg">{get?.Getaway}</h4>
                                </div>

                                }
                                {get.Getaway === 'Nogod' &&
                                   
                                    <div onClick={() => setMyTabs(get)} className={`${myTabs?.Getaway==='Nogod' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                                    <img
                                        alt="Developer"
                                        src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                                        srcSet="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                                        className="h-[120px] w-[120px] object-cover"
                                    />
                                    <h4 className="mt-2 text-lg">{get?.Getaway}</h4>
                                </div>
                                }
                                {get.Getaway === 'AmarPay' &&  <div onClick={() => setMyTabs(get)} className={`${myTabs?.Getaway==='AmarPay' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                                    <img
                                        alt="Developer"
                                        src="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                                        srcSet="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                                        className="h-[120px] w-[120px]"
                                    />
                                    <h4 className="mt-2 text-lg">{get?.Getaway}</h4>
                                </div>}
                            </div>
                        ))
                    }
                    <div onClick={() => setMyTabs({ Getaway: "CashOnDelivery" })} className={`${myTabs?.Getaway==='CashOnDelivery' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex items-center justify-center flex-col rounded p-4 w-[200px] h-[220px]`}>
                        <img
                            alt="Developer"
                            src="https://salenow-v2-backend.vercel.app/api/v1/image/65899d8a90705ef9459e30e6.jpg"
                            srcSet="https://salenow-v2-backend.vercel.app/api/v1/image/65899d8a90705ef9459e30e6.jpg"
                            className="h-[120px] w-[120px]"
                        />
                        <h4 className="mt-2 text-lg">Cash On Delivery</h4>
                    </div>
                </div>

                <div className="">
                    <div className="bg-gray-200 w-full p-3">
                                              <h1 className="text-2xl font-semibold">Order Summary</h1>
                    <p className="text-gray-400 mt-2">Subtotal( {orderStage?.productList?.length} Items and shipping fee included)</p>
                    <br />
                        <div className="flex items-center justify-between">
                        <h1 className="text-lg">Total Amount:</h1>
                        <h1 className='flex items-center '>
                            {!orderStage?.promoHistory?.status && <div className=''><span className="kalpurush text-xl">৳</span>{orderStage?.promoHistory?.normalPrice}</div>}
                            {orderStage?.promoHistory?.promoPrice && <span>{orderStage?.promoHistory?.promoPrice}</span>}
                        </h1>
                    </div>
                     </div>
                </div>
            </div>
            
            <div className="border-2 border-gray-700 mt-8 w-full border-dashed p-4">
                <div
                className="mb-3 inline-flex w-full bg-yellow-50 border text-gray-800 items-center rounded-lg px-6 py-5  "
                role="alert">
               
                   <ol>
                    <li className="">Exercise caution when making payments, ensuring that you only transact with reputable and secure platforms to safeguard your financial information.</li>
                   </ol>
                </div>
                <div
                className="mb-3 inline-flex w-full bg-yellow-50 border text-gray-800 items-center rounded-lg px-6 py-5  "
                role="alert">
               
                   <ol>
                    <li className="">Always verify the legitimacy of the payment process, double-checking the recipient details and website security features before proceeding with any transactions.

</li>
                   </ol>
                </div>
                <div
                className="mb-3 inline-flex w-full bg-yellow-50 border text-gray-800 items-center rounded-lg px-6 py-5  "
                role="alert">
               
                   <ol>
                    <li className="">After completing a payment, retain a screenshot or confirmation email as proof of the transaction, serving as documentation in case of any discrepancies or disputes in the future.


</li>
                   </ol>
                </div>
                <div
                className="mb-3 inline-flex w-full bg-yellow-50 border text-gray-800 items-center rounded-lg px-6 py-5  "
                role="alert">
               
                   <ol>
                    <li className="">Regularly monitor your bank statements and financial accounts to promptly detect and address any unauthorized or suspicious activities, ensuring the security of your financial assets.


</li>
                   </ol>
                </div>
 
                <div className="flex items-center justify-center my-6">
                <button
                class="group relative inline-flex m-auto items-center overflow-hidden rounded bg-gray-900 px-20 py-5 text-white focus:outline-none focus:ring active:bg-gray-900"
            
            >
                <span class="absolute -start-full transition-all group-hover:start-4">
                    <svg
                        class="h-5 w-5 rtl:rotate-180"
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

                <span class="text-lg font-medium transition-all group-hover:ms-4"> Pay Now </span>
            </button>
       </div>
            </div>
        </div>
    );
};

export default Payment;