import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router';

import { Link } from 'react-router-dom';
import MetaHelmet from '../../../Helmate/Helmate';

const SingleService = () => {

    const service = useLoaderData()


    const { data: services = [], refetch, isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/services");
            const data = await res.json();
            return data;
        },
    });

    console.log(services[2]);


    return (
        <div className='px-4 pt-16 relative mx-auto sm:max-w-xl md:max-w-full  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="">
                    <div className=" mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-2/3 w-full lg:min-h-[400px] lg:min-w-[400px]  h-64 object-cover object-center rounded"
                            src={service.img}
                            srcSet={service.img}
                        />
                        <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {service.category}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {service.title}
                            </h1>


                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Subscription Model</span> : {service.subscriptionPeriod}

                                </div>

                            </div>
                            <div className="flex w-full justify-between items-center">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    ${service.price}
                                </span>
                                <div className="flex items-center">
                                    <Link to={`/user-service-checkout/${service?._id}`}>
                                        <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                            Buy Now
                                        </button>
                                    </Link>
                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-auto flex flex-wrap mt-4">
                        <p className='text-xl font-semibold underline underline-offset-4'>Description:</p>
                        <div
                            className=" "
                            dangerouslySetInnerHTML={{
                                __html: service.message,
                            }}
                        />
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                    <h3 className="text-gray-600 text-2xl font-medium">Relevant Service</h3>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                        {
                            services.slice(0, 4).map((service) => (
                                <Link to={`/service/${service._id}`} key={service?._id} className={!service.status ? "hidden" : "w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"}>
                                    <MetaHelmet title={service?.MetaTag} description={service?.MetaDescription} image={service?.MetaImage} />
                                    <div
                                        className="flex items-end justify-end h-56 w-full bg-cover"
                                        style={{
                                            backgroundImage:
                                                `url(${service.img})`
                                        }}
                                    >
                                        <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="px-5 py-3">
                                        <h3 className="text-gray-700 uppercase">{service.title}</h3>
                                        <span className="text-gray-500 mt-2">${service.price}</span>
                                    </div>
                                </Link>
                            ))
                        }



                    </div>
                </div>
            </section>



        </div>
    );
};

export default SingleService;