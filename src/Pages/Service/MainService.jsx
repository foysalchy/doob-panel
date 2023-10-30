import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const MainService = () => {

    const { data: services = [], refetch, isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/admin/services");
            const data = await res.json();
            return data;
        },
    });

    const blnkData = [{}, {}, {}]
    return (

        <section>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <header className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        Our Service
                    </h2>

                    <p className="max-w-md mx-auto mt-4 text-gray-500">
                        Empower Your Sales with Sale Now: Your Ultimate SAS-Based Web App, Providing Sellers a Robust Platform and Exceptional Services for Unmatched Success!
                    </p>
                </header>
                {
                    !isLoading ? <div>
                        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">

                            {
                                services?.map(service => (
                                    <div className={!service.status && 'hidden'}>

                                        {
                                            service?.status &&
                                            <li >
                                                <a href="#" className="relative block group   ">
                                                    <img
                                                        src={service?.img}
                                                        alt=""
                                                        className="object-cover border border-black rounded-md w-full transition duration-500 aspect-square  "
                                                    />

                                                    <div
                                                        className="absolute  group-hover:bg-gray-900 group-hover:bg-opacity-90 bg-gray-900 bg-opacity-50  inset-0 flex flex-col items-start justify-end p-6"
                                                    >
                                                        <h3 className="text-xl font-semibold text-white ">{service?.title}</h3>

                                                        <Link to={`/service/${service._id}`}
                                                            className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                                                        >
                                                            Show Details
                                                        </Link>
                                                    </div>
                                                </a>
                                            </li>
                                        }
                                    </div>)
                                )}

                        </ul>
                    </div> :
                        <div className='grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3'>
                            {blnkData.map((data, i) => (
                                <div key={i} className="flex flex-col m-8 rounded shadow-md w-full animate-pulse h-96">
                                    <div className="h-48 rounded-t dark:bg-gray-500"></div>
                                    <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                                        <div className="w-full h-6 rounded dark:bg-gray-500"></div>
                                        <div className="w-full h-6 rounded dark:bg-gray-500"></div>
                                        <div className="w-3/4 h-6 rounded dark:bg-gray-500"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                }

            </div>
        </section>


    );
};

export default MainService;

