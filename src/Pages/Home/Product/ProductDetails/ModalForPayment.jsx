import { useEffect, useState } from 'react';
import ProductCheckout from './ProductCheckout';

const ModalForPayment = ({ invoice, setInvoice, sellingPrice, handleStore, seller, product, quantity }) => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState('');
    const [getaways, setGetaways] = useState([]);
    const [payment, setPayment] = useState(false);
    const [userInfo, setUserInfo] = useState([])


    useEffect(() => {
        // Fetch payment gateways
        const fetchPaymentGetways = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/v1/seller/payment-getaway/${seller}`);
                const data = await response.json();
                setGetaways(data);
            } catch (error) {
                console.error('Error fetching payment gateways:', error);
            }
        };

        fetchPaymentGetways();
    }, [seller]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const getway = {
            getway: payment,
            sellingPrice

        }
        handleStore(invoice, getway, userInfo);
    };

    const [next, setNext] = useState(false)


    const payWithBkash = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/v1/seller/bkash/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include'
                },
                body: JSON.stringify({ amount: 50, orderId: 1 }),
                credentials: 'include'
            });
            const data = await response.json();
            window.location.href = data.bkashURL;
        } catch (error) {
            console.log(error);
        }
    }
    const payWithAmarPay = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/v1/seller/amarpay/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include'
                },
                body: JSON.stringify({ amount: 50, orderId: 1 }),
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);
            // window.location.href = data.bkashURL;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${invoice ? 'visible' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg w-full max-w-4xl mx-auto px-8 py-6 z-50">
                <button onClick={() => setInvoice(false)}>x</button>
                {!next ? <ProductCheckout userInfo={userInfo} setUserInfo={setUserInfo} sellingPrice={sellingPrice} quantity={quantity} product={product} setNext={setNext} /> :
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-4">Select Payment and Invoice</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="payment" className="block mb-2">Payment:{sellingPrice}</label>
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
                                                    <div onClick={payWithAmarPay()} className={`${payment?.Getaway === 'AmarPay' && 'shadow-lg shadow-gray-700'}  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}>
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

                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="invoice" className="block mb-2">Invoice:</label>
                                <span className="text-gray-700">{sellingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setInvoice(false)}
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
            </div>

        </div>

    );
};

export default ModalForPayment;
