import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AdminSeviceOrder = () => {
    const { data: serviceOrder = [], refetch } = useQuery({
        queryKey: ["serviceOrder"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/get-all-service-order");
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


    console.log(new Date(startDate).toDateString(), new Date(endDate).toDateString());

    return (
        <section className="container  mx-auto">

            <div className='flex justify-between items-center'>
                <fieldset className="w-full my-4 space-y-1 dark:text-gray-100">
                    <label for="Search" className="hidden">Search</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="search" value={input} onChange={(e) => { setInput(e.target.value), searchItem() }} name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400" />
                    </div>
                </fieldset>

                <form onSubmit={handleDateRangeChange} className="flex space-x-4">

                    <input
                        type="date"
                        className="border border-gray-300 px-2 py-1 rounded"
                        name='startDate'
                    />
                    <span className="text-gray-500">to</span>
                    <input
                        name='endDate'
                        type="date"
                        className="border border-gray-300 px-2 py-1 rounded"
                    />
                    <button

                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Apply
                    </button>
                </form>

            </div>



            <div className="flex flex-col">
                <div className=" w-full overflow-x-auto ">
                    <div className="inline-block min-w-full py-2 align-middle ">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className=" divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <div className="flex items-center gap-x-3">

                                                <button className="flex items-center gap-x-2">
                                                    <span>Service Image</span>

                                                </button>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Order Id
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Service Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Service Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Payment Price
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Date
                                        </th>


                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Customer
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Service Category
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Payment Getway
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Actions
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {filteredData.map((order, idx) => (
                                        <tr>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <img className='h-10 w-10 rounded-sm' src={order.productImg} alt="" />
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span># {order._id}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order.productTitle}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order.productPrice}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order.normalPrice}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {new Date(order.timestamp).toDateString()}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">

                                                    <div>
                                                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                                            {order?.userEmail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order?.productCategory}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {order?.method?.Getaway}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <button rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group hover:bg-gray-700 dark:border-gray-700">
                                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"></span>
                                                    <span className=" dark:text-gray-100">Pending</span>
                                                </button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-6">
                <a
                    href="#"
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
                <div className="items-center hidden md:flex gap-x-3">
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                    >
                        1
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        2
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        3
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        ...
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        12
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        13
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        14
                    </a>
                </div>
                <a
                    href="#"
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
        </section>

    );
};

export default AdminSeviceOrder;