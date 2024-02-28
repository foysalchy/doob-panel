import React from 'react';
import Grocery from './pexels-pixabay-264636.jpg';
import Offer from './istockphoto-1289179862-612x612.jpg';
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const ProductCatagory = () => {

    const { data: megaCategoryData = [], refetch } = useQuery({
        queryKey: ["megaCategoryData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/category/megacategory");
            const data = await res.json();
            return data.rows;
        },
    });

    const slidesPerViewDesktop = 9;
    const slidesPerViewTablet = 6;
    const slidesPerViewMobile = 4;


    return (
        <div className='py-4 bg-white rounded mt-6'>

            <Swiper slidesPerView={window.innerWidth >= 1024 ? slidesPerViewDesktop : (window.innerWidth >= 768 ? slidesPerViewTablet : slidesPerViewMobile)}
                className="mySwiper">
                {megaCategoryData?.filter((item) => item.feature == 'true').map((itm, index) => (
                    <SwiperSlide key={index}>

                        <Link to={`/products/catagory/${itm._id}`} className=' flex flex-col items-center justify-center w-full'>
                            <img className='w-16 h-16 rounded-2xl object-cover shadow shadow-gray-700' src={itm?.image} srcSet={itm.image} alt={itm.name} />
                            <p className='text-sm text-center'>{itm.name}</p>
                        </Link>

                    </SwiperSlide>
                ))}


            </Swiper>

        </div>
    );
};

export default ProductCatagory;