import { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Step2 = ({ nextStep, prevStep, handleChange, values }) => {
    const [daraz, setDaraz] = useState(false)
    const [woocommerce, setWoocommerce] = useState(false)
    const [noStore, setNoStore] = useState(false)


    const handleDarazClick = (e) => {
        e.preventDefault();
        setDaraz(!daraz);
        setNoStore(false);

    };

    const handleWoocommerceClick = (e) => {
        e.preventDefault();
        setWoocommerce(!woocommerce);
        setNoStore(false);

    };

    const handleNoStoreClick = (e) => {
        e.preventDefault();
        setNoStore(!noStore);
        setDaraz(false);
        setWoocommerce(false);

    };

    const [error, setError] = useState(true)

    useEffect(() => {
        if (daraz || woocommerce || noStore) {

            values.daraz = daraz;
            values.woocommerce = woocommerce;
            values.noStore = noStore;

            console.log(daraz, 'Daraz', woocommerce, 'woocommerce', noStore, 'noStore');
            setError(false);
        }
        else {
            console.log('work');
            setError(true)
        }
    }, [daraz, woocommerce, noStore]);


    console.log(error);

    return (
        <div>


            <div>
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className="h-2 w-[52%] rounded-full bg-blue-500"></div>
                </div>

                <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                    <li className="flex items-center justify-start text-blue-600 sm:gap-1.5">
                        <span className="hidden sm:inline"> Details </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                        </svg>
                    </li>

                    <li className="flex items-center justify-center text-blue-600 sm:gap-1.5">
                        <span className="hidden sm:inline"> Connect Store </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </li>

                    <li className="flex items-center justify-end sm:gap-1.5">
                        <span className="hidden sm:inline"> Payment </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                    </li>
                </ol>
            </div>

            <div className='my-10'>


                <div className='flex gap-20 justify-center'>
                    <button
                        onChange={handleChange('daraz')} value={values.daraz}
                        onClick={handleDarazClick}
                        className={`${daraz
                            ? "bg-slate-400  bg-opacity-100"
                            : "bg-white hover:bg-slate-200"
                            } rounded-lg duration-300 transition-colors border px-8 py-2.5`}
                    >
                        <img className={daraz ? "blur-sm w-20 h-10" : "w-20 h-10 "} src='https://logos-world.net/wp-content/uploads/2022/05/Daraz-Logo.png' alt="daraz" />
                    </button>
                    <button
                        onChange={handleChange('woocommerce')} value={values.woocommerce}
                        onClick={handleWoocommerceClick}
                        className={`${woocommerce ? 'bg-slate-400' : 'bg-white hover:bg-slate-200'
                            } rounded-lg duration-300 transition-colors border px-8 py-2.5`}
                    >
                        <img className={woocommerce ? "blur-sm w-20 h-10" : "w-20 h-10 "} src='https://1000logos.net/wp-content/uploads/2020/08/WooCommerce-Logo.png' alt="daraz" />
                    </button>
                    <button
                        onChange={handleChange('noStore')} value={noStore}
                        onClick={handleNoStoreClick}
                        className={`${noStore ? 'bg-slate-400' : 'bg-white hover:bg-slate-200'
                            } rounded-lg duration-300 transition-colors border px-8  py-2.5`}
                    >
                        <p className={noStore && "blur-sm"}>  I have no store</p>
                    </button>
                </div>
            </div>

            <div className="mt-4 gap-3 flex justify-center items-center">
                <button onClick={prevStep}
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                        <BsArrowLeft />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                        Previous Step
                    </span>
                </button>

                <button onClick={nextStep}
                    disabled={error}
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 disabled:cursor-not-allowed disabled:bg-gray-700"

                >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                        <BsArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                        Next Step
                    </span>
                </button>


            </div>
        </div>
    );
};

export default Step2