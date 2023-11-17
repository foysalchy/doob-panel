import React from 'react';
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
const ShopProductCategory = () => {

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

    const slidesPerViewDesktop = 9;
    const slidesPerViewTablet = 6;
    const slidesPerViewMobile = 4;


    return (
        <div>
            <div className='py-4 bg-white rounded mt-6'>

                <Swiper slidesPerView={window.innerWidth >= 1024 ? slidesPerViewDesktop : (window.innerWidth >= 768 ? slidesPerViewTablet : slidesPerViewMobile)}
                    className="mySwiper">
                    {categories.map((i, index) => (
                        <SwiperSlide key={index}>

                            <Link to={`/products/catagory/${i.name}`} className=' flex flex-col items-center justify-center w-full'>
                                <img className='w-16 h-16 rounded-2xl object-cover shadow shadow-gray-700' srcSet={i?.img} src={i.img} alt="" />
                                <p className='text-sm text-center'>{i.name}</p>
                            </Link>

                        </SwiperSlide>
                    ))}


                </Swiper>

            </div>
        </div>
    );
};

export default ShopProductCategory;