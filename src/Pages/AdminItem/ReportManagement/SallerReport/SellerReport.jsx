import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const SellerReport = () => {
    const { data: serviceOrder = [], refetch, isLoading } = useQuery({
        queryKey: ["sellerReport"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/seller-report");
            const data = await res.json();
            return data.data;
        },
    });

    const [input, setInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const searchItem = () => {
        if (input === '' && startDate === '' && endDate === '') {
            setFilteredData(serviceOrder);
        } else {
            const filteredServiceOrder = serviceOrder.filter(order => {
                const matchesSearch = Object.values(order).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(input.toLowerCase())
                );

                const matchesDateRange = startDate && endDate
                    ? new Date(order.timestamp) >= new Date(startDate) && new Date(order.timestamp) <= new Date(endDate)
                    : true;

                return matchesSearch && matchesDateRange;
            });

            setFilteredData(filteredServiceOrder);
        }
    };

    const handleDateRangeChange = (e) => {
        e.preventDefault()
        const start = e.target.startDate.value
        const end = e.target.endDate.value
        setStartDate(start);
        setEndDate(end);
        searchItem();
    };

    useEffect(() => {
        setFilteredData(serviceOrder);
    }, [serviceOrder]);


    const calculateRemainingDays = (paymentDate, timeDuration) => {
        const currentDate = new Date();
        const parsedPaymentDate = new Date(paymentDate);
        let expirationDate;

        switch (timeDuration) {
            case "10 Days":
                expirationDate = new Date(parsedPaymentDate.getTime() + 10 * 24 * 60 * 60 * 1000);
                break;
            case "Monthly":
                expirationDate = new Date(parsedPaymentDate.getFullYear(), parsedPaymentDate.getMonth() + 1, parsedPaymentDate.getDate());
                break;
            case "Yearly":
                expirationDate = new Date(parsedPaymentDate.getFullYear() + 1, parsedPaymentDate.getMonth(), parsedPaymentDate.getDate());
                break;
            case "Lifetime":
                // For lifetime, you may set a very distant future date or handle it differently
                expirationDate = new Date(2100, 0, 1);
                break;
            default:
                return 0;
        }

        const remainingDays = Math.ceil((expirationDate - currentDate) / (24 * 60 * 60 * 1000));

        return remainingDays >= 0 ? remainingDays : 0;
    };


    console.log(serviceOrder);
    return (
        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 ">
                            Customers
                        </h2>
                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
                            240 vendors
                        </span>
                    </div>

                </div>

            </div>
            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse  ">
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm  ">
                        View all
                    </button>
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                        Monitored
                    </button>
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                        Unmonitored
                    </button>
                </div>
                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mx-3 text-gray-400 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>



            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                        >
                                            <button className="flex items-center gap-x-3 focus:outline-none">
                                                <span>Company</span>
                                                <svg
                                                    className="h-3"
                                                    viewBox="0 0 10 11"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth="0.1"
                                                    />
                                                    <path
                                                        d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth="0.1"
                                                    />
                                                    <path
                                                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth="0.3"
                                                    />
                                                </svg>
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                        >
                                            About
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                        >
                                            Users
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                        >
                                            License use
                                        </th>


                                    </tr>

                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200  ">
                                    {isLoading && <tr>
                                        <td colSpan="5" className='w-full'>
                                            <div className="loader w-full">
                                                <div className="loader-inner"></div>
                                            </div>
                                        </td>
                                    </tr>}
                                    {
                                        filteredData?.map((shopInfo) => (

                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800  ">
                                                            {shopInfo.shop.shopName}
                                                        </h2>
                                                        <p className="text-sm font-normal text-gray-600 ">
                                                            {shopInfo.shop.shopEmail}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ">
                                                        Customer
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">
                                                            Content curating app
                                                        </h4>
                                                        <p className="text-gray-500 ">
                                                            Brings all your news into one place
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {shopInfo.shopUsers.slice(0, 3).map(user => <div className="object-cover  w-6 h-6 -mx-1 border-2  flex items-center  justify-center rounded-full  shrink-0">
                                                            <p className='capitalize'>{user.name.slice(0, 1)}</p>
                                                        </div>)}

                                                        {shopInfo.shopUsers.length > 4 && <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                                            +{shopInfo.shopUsers.length - 4}
                                                        </p>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">

                                                    <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                                                        <div
                                                            className="bg-blue-500"
                                                            style={{ width: `${calculateRemainingDays(shopInfo?.shop?.paymentDate, shopInfo?.timeDuration)}%` }}
                                                        />
                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                <div className="text-sm text-gray-500 ">
                    Page{" "}
                    <span className="font-medium text-gray-700 ">
                        1 of 10
                    </span>
                </div>
                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <a
                        href="#"
                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100    "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span>previous</span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100    "
                    >
                        <span>Next</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section >

    );

};

export default SellerReport;