import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const UserOrders = () => {
    const { user } = useContext(AuthContext)
    const { data: wishlistData = [], isLoading } = useQuery({
        queryKey: ["orderListForSideUser"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/site-user/order?userId=${user._id}`);
            const data = await res.json();

            return data?.data;
        },
    });


    console.log(wishlistData, 'wsh');
    return (
        <section className="container  mx-auto">
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800  ">
                    My Orders
                </h2>

            </div>
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200  ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-800  "
                                        >
                                            <div className="flex items-center gap-x-3">

                                                <span>Photo</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-800  "
                                        >
                                            <div className="flex items-center gap-x-3">

                                                <span>Name</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-800  "
                                        >
                                            <div className="flex items-center gap-x-3">

                                                <span>category</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-800  "
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <span>Method</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-800  "
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <span>Price</span>
                                            </div>
                                        </th>
                                        
                                          <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-800  "
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <span>Date</span>
                                            </div>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {
                                        wishlistData?.map((item) => <tr key={item._id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <img
                                                    className="object-cover w-10 h-10 rounded-full border border-gray-500"
                                                    src={item?.productImg}
                                                    alt=""
                                                />
                                            </td>

                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="text-sm text-start font-normal text-emerald-500">
                                                    {item?.productTitle}
                                                </h2>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="text-sm font-normal text-emerald-500">
                                                    {item?.productCategory}
                                                </h2>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="text-sm font-normal text-emerald-500">
                                                    {item?.method?.Getaway}
                                                </h2>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="text-sm font-normal text-emerald-500">
                                                    {item?.normalPrice}
                                                </h2>
                                            </td><td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="text-sm font-normal text-emerald-500">
                                                    {new Date(item?.timestamp).toLocaleDateString()}
                                                </h2>
                                            </td>
                                        </tr>)
                                    }
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
                <div className="items-center hidden lg:flex gap-x-3">
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                    >
                        1
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm   rounded-md border border-gray-800 text-black hover:bg-gray-100"
                    >
                        2
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
}

export default UserOrders;