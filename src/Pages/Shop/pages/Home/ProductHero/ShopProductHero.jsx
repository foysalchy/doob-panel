import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { useEffect } from 'react';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';



const ShopProductHero = () => {

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    console.log('Shop ID:', shopId);
    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/category/get/${shopId}`);
            const data = await res.json();
            return data;
        },
    });


    const { data: Banar = [] } = useQuery({
        queryKey: ["banar"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/slider/get/${shopId}`);
            const data = await res.json();
            return data;
        },
    });


    const { data: adds } = useQuery({
        queryKey: ["adds"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/popup/get/${shopId}`);
            const data = await res.json();
            return data;
        },
    });

    console.log(adds);

    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const lastModalShownTimestamp = localStorage.getItem('lastModalShownTimestamp');

        // Check if the modal hasn't been shown in the last 24 hours for this device
        if (
            (!lastModalShownTimestamp ||
                Date.now() - parseInt(lastModalShownTimestamp, 10) >= 5 * 60 * 60 * 1000) &&
            window.location.pathname === `/shop/${shopId}`
        ) {
            // Show the modal after 5 seconds
            const timeoutId = setTimeout(() => {
                setShowModal(true);

                // Update the timestamp to the current time
                localStorage.setItem('lastModalShownTimestamp', Date.now().toString());
            }, 5000);

            // Cleanup the timeout to avoid memory leaks
            return () => clearTimeout(timeoutId);
        }
    }, [shopId]);


    return (
        <div>
            <div className='flex gap-4 '>
                <div className='hidden  bg-white w-[20%] h-[350px] overflow-hidden overflow-y-scroll rounded-xl lg:flex flex-col gap-2 p-4 text-sm'>
                    {showModal && adds && (
                        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
                            <div className="relative max-w-screen-lg mx-auto">
                                <div onClick={() => setShowModal(false)} className='cursor-pointer bg-gray-300 rounded-full absolute top-4 right-4  mb-2 p-2 text-2xl hover:bg-gray-400'>
                                    <RxCross2 className='text-xl' />
                                </div>

                                <img
                                    className="max-w-full rounded max-h-full"
                                    srcSet={adds.image}
                                    src={adds.image}
                                    alt="Preview"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        {categories
                            ?.filter((item) => item.status)
                            ?.map((item, index) => (
                                <div className='mt-2' key={index + 1}>
                                    <Link className='flex items-center gap-2' to={`category/${item?._id}`}>
                                        <img
                                            className="h-4 w-4 rounded text-gray-400 filter grayscale brightness-90 object-cover"
                                            src={item?.img}
                                            srcSet={item?.img}
                                            alt=""
                                        />
                                        <p>{item?.name}</p>
                                    </Link>
                                </div>
                            ))}
                    </div>


                </div>
                <div className='lg:w-[80%] w-[100%]'>

                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper rounded-md">
                        {Banar?.filter((item) => item.status).map((i, index) => (
                            <SwiperSlide key={index + 6}>
                                {i.status && (
                                    <Link to={`${i?.link}`}>
                                        <img
                                            className='w-full lg:h-[350px] h-[150px] object-cover object-center rounded'
                                            src={i?.image}
                                            srcSet={i?.image}
                                            alt=""
                                            loading="lazy"

                                        />
                                    </Link>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </div>
    );
};


export default ShopProductHero;