import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const SellerPageManagement = () => {
    const [loading, setLoading] = useState(false);

    const { shopInfo } = useContext(AuthContext)

    const { data: faqs = [], refetch } = useQuery({
        queryKey: ["faqs"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/seller/pages/${shopInfo.shopId}`);
            const data = await res.json();
            return data;
        },
    });

    const ActiveHandle = (id) => {
        setLoading(true);

        fetch(`http://localhost:5000/seller/page/status/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("success", "Your Faq Publish Successfully", "success");
                refetch();
            });
    };

    const DativeHandle = (id) => {

        fetch(`http://localhost:5000/seller/page/falseStatus/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Your Page Unpublish Successfully", "", "success");
                refetch();
            });
    };
    const DeleteHandle = (id) => {

        fetch(`http://localhost:5000/seller/page/delete/${id}`, {
            method: "Delete",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Your Page Delete Successfully", "", "success");
                refetch();
            });
    };

    return (
        <div className="py-8 w-full overflow-x-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 whitespace-nowrap">
            <div>
                <nav

                    className="rounded p-4 mb-4 bg-gray-800 dark:text-gray-100"
                >
                    <ol className="flex h-8 space-x-2">
                        <li className="flex items-center">
                            <Link
                                rel="noopener noreferrer"
                                to="/admin/dashboard"
                                title="Back to homepage"
                                className="hover:underline"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 pr-1 dark:text-gray-400"
                                >
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg>
                            </Link>
                        </li>
                        <li className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                fill="currentColor"
                                className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
                            >
                                <path d="M32 30.031h-32l16-28.061z"></path>
                            </svg>
                            <Link
                                rel="noopener noreferrer"
                                to="/seller/manage-blogs"
                                className="flex items-center px-1 capitalize hover:underline"
                            >
                                Blog
                            </Link>
                        </li>
                    </ol>
                </nav>
            </div>
            <Link
                className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/admin/page-management/add-page"
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Add New Page
                </span>
            </Link>

            <section className=" px-4 mx-auto">
                <h1 className="text-center my-10 font-bold text-2xl">
                    This is Page List
                </h1>
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <span>Page Name</span>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <button className="flex items-center gap-x-2">
                                                    <span>Status</span>
                                                </button>
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {faqs?.map((faq, index) => (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <div className="w-5/12">
                                                            <h2 className="font-medium text-gray-800  ">
                                                                {faq?.title}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {faq.status ? (
                                                        <button
                                                            onClick={() => DativeHandle(faq?._id)}
                                                            className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            <h2 className="text-sm font-normal text-emerald-500">
                                                                Active
                                                            </h2>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => ActiveHandle(faq?._id)}
                                                            className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                            <h2 className="text-sm font-normal text-red-500">
                                                                Dative
                                                            </h2>
                                                        </button>
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <button
                                                            onClick={() => DeleteHandle(faq?._id)}
                                                            className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SellerPageManagement;