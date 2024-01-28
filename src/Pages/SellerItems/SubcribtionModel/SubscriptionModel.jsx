import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const SubscriptionModel = () => {

    const { shopInfo } = useContext(AuthContext)

    const { data: prices = {}, loader } = useQuery({
        queryKey: { price: "prices" },
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}`);
            const data = await res.json();
            return data?.data;
        },
    });


    console.log(prices);
    const checkIcon = <svg className="w-5 h-5 mx-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" /></svg>
    const minusIcon = <svg className="w-5 h-5 mx-auto text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" /></svg>




    const tables = [
        {
            label: "Features",
            label_icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>,
            items: [
                {
                    name: "Aliquam finibus",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Vestibulum tristique",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Aliquam finibus",
                    basic: minusIcon,
                    business: minusIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Praesent aliquet",
                    basic: minusIcon,
                    business: "150GB",
                    enterprise: "Unlimited"
                },
            ]
        },
        {
            label: "Analytics",
            label_icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>,
            items: [
                {
                    name: "Aliquam finibus",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Vestibulum tristique",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Aliquam finibus",
                    basic: minusIcon,
                    business: minusIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Lorinto dinor",
                    basic: "30",
                    business: "60",
                    enterprise: "Custom"
                },
                {
                    name: "Praesent aliquet",
                    basic: "Limited",
                    business: "Limited",
                    enterprise: checkIcon
                },
                {
                    name: "Praesent aliquet",
                    basic: minusIcon,
                    business: "150GB",
                    enterprise: "Unlimited"
                },
            ]
        },
        {
            label: "Support",
            label_icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>,
            items: [
                {
                    name: "Aliquam finibus",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Vestibulum tristique",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Aliquam finibus",
                    basic: minusIcon,
                    business: minusIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Praesent aliquet",
                    basic: minusIcon,
                    business: "150GB",
                    enterprise: "Unlimited"
                },
            ]
        }
    ]


    return (
        <section className="py-14 text-gray-600">
            <div className="">
                <div className='relative max-w-xl mx-auto space-y-3 px-4 sm:text-center md:px-0'>
                    <h3 className="text-indigo-600 font-semibold">
                        Pricing
                    </h3>
                    <p className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                        Compare our plans and find yours
                    </p>
                    <div className='max-w-xl'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
                        </p>
                    </div>
                </div>
                <div className="mt-16">

                    <div className="max-w-screen-xl mx-auto mt-10 space-y-4 px-4 overflow-auto md:overflow-visible md:px-8">
                        {

                            <table s className="w-full table-auto text-sm text-left">
                                <thead className="text-gray-600 font-medium border-b">
                                    <tr>
                                        <th className="z-20 top-12 py-6">
                                            <div className="flex items-center gap-x-3">
                                                <div className="w-12 h-12 text-indigo-600 rounded-full border flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                                    </svg>

                                                </div>
                                                <h4 className="text-gray-800 text-xl font-medium">
                                                    Features
                                                </h4>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 divide-y">

                                </tbody>
                            </table>

                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SubscriptionModel;