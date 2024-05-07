
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import ProductCheckout from './ProductCheckout';
import BrightAlert from 'bright-alert';
import { useNavigate } from 'react-router-dom';

const CardPayment = ({ openPayment, setOpenPayment, handleStore }) => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedopenPayment, setSelectedopenPayment] = useState('');
    const [get, setGet] = useState(false)
    const [payment, setPayment] = useState(false);
    const [userInfo, setUserInfo] = useState([])
    const { shopInfo } = useContext(AuthContext)
    const [payment_done, setPaymentDone] = useState(false)
    const navigate = useNavigate();

    const {
        data: getaways = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["getawayData"],
        queryFn: async () => {
            const res = await fetch(
                "https://backend.doob.com.bd/api/v1/admin/getaway"
            );
            const data = await res.json();
            return data;
        },
    });


    const deliveryFees = {};

    // Calculate total delivery fee
    openPayment.forEach(item => {
        const productId = item?.product_id;
        const deliveryFee = parseFloat(item.delivery ? item.delivery : 0);

        // If the product ID is not in the deliveryFees object, add it with its delivery fee
        if (!(productId in deliveryFees)) {
            deliveryFees[productId] = deliveryFee;
        }
    });



    const totalDeliveryFee = Object.values(deliveryFees).reduce((acc, curr) => acc + curr, 0);
    const calculateTotal = () => {
        return openPayment.filter(product => product.selected).reduce((total, product) => total + (parseInt(product.sellingPrice ? product.sellingPrice : product.product_price) * parseInt(product.product_quantity)), 0);
    };

    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        openPayment.forEach(item => {
            handleStore(item.product_id, payment, userInfo, item);
        });
        setLoading(false)
        BrightAlert()

        navigate(`/products/confirm-order`)
    };




    const [next, setNext] = useState(false)

    const paymentHandler = async (payment) => {
        console.log(payment.Getaway, '*******');
        if (payment.Getaway === 'Bkash') {
            payWithBkash()
        }
        else if (payment.Getaway === 'AmarPay') {
            payWithAmarPay()
        }

    };


    const payWithBkash = async () => {
        try {
            const response = await fetch('https://backend.doob.com.bd/api/v1/seller/bkash/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: sellingPrice, userId: shopInfo._id }),
            });
            const data = await response.json();
            console.log(data.bkashURL);
            window.location.href = data.bkashURL;
        } catch (error) {
            console.log(error);
        }
    }


    const payWithAmarPay = async () => {

        try {
            const response = await fetch('https://backend.doob.com.bd/api/v1/seller/amarpay/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: sellingPrice, orderId: 1 }),
            });
            const data = await response.json();
            console.log(data);
            if (data.payment_url) {
                window.location.href = data.payment_url;
            }

        } catch (error) {
            console.log(error);
        }
    }


    const pay_with_doob = () => {
        console.log('hit');
        if (shopInfo) {
            fetch(`https://backend.doob.com.bd/api/v1/seller/get-shop-balance?shopId=${shopInfo._id}`).then(res => res.json()).then(data => {
                console.log(data, 'data');
                if (data.balance < sellingPrice) {

                    BrightAlert({ icon: 'error', text: 'Insufficient Balance' })
                } else {
                    setPaymentDone(true)
                    handleSubmit()
                }
            })
        }
        else {
            navigate('/login')
        }
    }

    const setPaymentMethod = () => {
        setPayment({ Getaway: "Doob_Payment" })
        pay_with_doob()

    }







    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${openPayment ? 'visible' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg w-full h-[80%] overflow-y-auto max-w-4xl mx-auto px-8 py-6 z-50">
                <button onClick={() => setOpenPayment(false)}>x</button>

                {!loading ? <div>
                    {!next ? <ProductCheckout userInfo={userInfo} setUserInfo={setUserInfo} products={openPayment} setNext={setNext} /> :
                        <div>
                            <h3 className="text-xl font-semibold text-center mb-4">Select Payment and openPayment</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="payment" className="block mb-2">Payment:{calculateTotal() + totalDeliveryFee}</label>
                                    <div className='grid grid-cols-4' >


                                        {getaways.map((get) => (
                                            <div>
                                                {get.Getaway === 'Bkash' &&
                                                    <button >
                                                        <div onClick={() => { payWithBkash() }} className={`${payment?.Getaway === 'Bkash' && 'shadow-lg shadow-gray-700'}   border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}>
                                                            <img
                                                                alt="Developer"
                                                                src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                                                                srcSet="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                                                                className="md:h-[120px] md:w-[120px] w-[30px] h-[auto]"
                                                            />
                                                            <h4 className="mt-2  md:font-bold md:text-lg">{get?.Getaway}...</h4>
                                                        </div>
                                                    </button>

                                                }
                                                {get.Getaway === 'Nogod' &&
                                                    <a href="#scrollDestination">
                                                        <div onClick={() => setPayment(get)} className={`${payment?.Getaway === 'Nogod' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}>
                                                            <img
                                                                alt="Developer"
                                                                src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                                                                srcSet="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                                                                className="md:h-[120px] md:w-[120px] w-[30px] h-[40px] object-cover"
                                                            />
                                                            <h4 className="mt-2  md:font-bold md:text-lg">{get?.Getaway}</h4>
                                                        </div>
                                                    </a>

                                                }
                                                {get.Getaway === 'AmarPay' &&
                                                    <a href="#scrollDestination">
                                                        <div onClick={() => payWithAmarPay()} className={`${payment?.Getaway === 'AmarPay' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}>
                                                            <img
                                                                alt="Developer"
                                                                src="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                                                                srcSet="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                                                                className="md:h-[120px] md:w-[120px] w-[30px] h-[40px] object-cover"
                                                            />
                                                            <h4 className="mt-2  md:font-bold md:text-lg">{get?.Getaway}</h4>
                                                        </div>
                                                    </a>
                                                }
                                                {get.Getaway === 'Bank' &&
                                                    <a href="#scrollDestination">
                                                        <div onClick={() => setPayment(get)} className={`${payment?.Getaway === 'AmarPay' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}>

                                                            <h4 className="mt-2  md:font-bold md:text-lg">{get?.Getaway}</h4>


                                                        </div>
                                                    </a>
                                                }

                                            </div>
                                        ))}
                                        <a href="#scrollDestination">
                                            <div onClick={() => setPayment({ getaway: 'COD' })} className={`${payment?.Getaway === 'AmarPay' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}>

                                                <h4 className="mt-2  md:font-bold md:text-lg">Cash On Delivery</h4>


                                            </div>
                                        </a>
                                        <a href="#scrollDestination">
                                            <button type='button' disabled={payment_done} onClick={setPaymentMethod} className={`${payment?.Getaway === 'Doob_Payment' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex md:flex-col flex-row items-center justify-center  gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}>

                                                <h4 className="mt-2  md:font-bold md:text-lg">Doob Payment</h4>
                                            </button>
                                        </a>

                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="openPayment" className="block mb-2">openPayment:</label>
                                    <span className="text-gray-700">{calculateTotal() + totalDeliveryFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setopenPayment(false)}
                                        className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:text-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>}
                </div> : <h1>Wait for order</h1>}
            </div>

        </div>

    );
};

export default CardPayment;
