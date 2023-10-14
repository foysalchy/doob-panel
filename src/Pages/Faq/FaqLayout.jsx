import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const FaqLayout = () => {
    const [faqs, setFaq] = useState([])

    useEffect(() => {

        fetch('https://salenow-kmg7yawl2-salenow-backend.vercel.app/admin/faq')
            .then(response => response.json())
            .then(data => {

                setFaq(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);





    return (
        <div>
            <div className="px-4 pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">

                <section className="bg-white ">
                    <div className=" ">
                        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800 lg:text-3xl ">
                            Have any Questions?
                        </h1>
                        <div className=" grid grid-cols-12 gap-4">
                            <div className=" col-span-3">

                                <div className="mt-4 space-y-4  lg:mt-8">

                                    {faqs.map((faq, index) => (
                                        <div key={index} className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">

                                            <div className="">

                                                <Link
                                                    to={`/faq/${faq._id}`}
                                                    aria-label="Category"
                                                    title="Visit the East"
                                                    className="block text-blue-500 dark:text-blue-400 hover:underline"
                                                >
                                                    {faq.title}
                                                </Link>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="ml-4 col-span-9 flex  lg:mt-0">
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
};
export default FaqLayout;