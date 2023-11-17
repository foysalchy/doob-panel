import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';



const ShopProductHero = () => {

    const params = useParams();
    const shopId = params.id;
    console.log(shopId);

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



    return (
        <div>
            <div className='flex gap-4 '>
                <div className='hidden  bg-white w-[20%] h-[350px] overflow-hidden overflow-y-scroll rounded-xl lg:flex flex-col gap-2 p-4 text-sm'>

                    <div>
                        {categories
                            ?.filter((item) => item.status)
                            ?.map((item, index) => (
                                <span key={index + 1}>
                                    <Link className='flex items-center gap-2' to={`products/catagory/${item?.name}`}>
                                        <img
                                            className="h-3 w-3 rounded text-gray-400 filter grayscale brightness-90 object-cover"
                                            src={item?.img}
                                            srcSet={item?.img}
                                            alt=""
                                        />
                                        <p>{item?.name}</p>
                                    </Link>
                                </span>
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
                                            alt=""
                                            loading="lazy"
                                            srcSet={i?.image}
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