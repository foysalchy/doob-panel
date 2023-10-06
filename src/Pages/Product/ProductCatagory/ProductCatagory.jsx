import React from 'react';
import Grocery from './pexels-pixabay-264636.jpg';
import Offer from './istockphoto-1289179862-612x612.jpg';
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

const ProductCatagory = () => {



    const category = [{ name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer }, { name: 'Home & Lifestyle', image: Grocery }, { name: 'Groceries', image: Offer },]

    const slidesPerViewDesktop = 9;
    const slidesPerViewTablet = 6;
    const slidesPerViewMobile = 4;

    return (
        <div className='py-4 bg-white rounded mt-6'>

            <Swiper slidesPerView={window.innerWidth >= 1024 ? slidesPerViewDesktop : (window.innerWidth >= 768 ? slidesPerViewTablet : slidesPerViewMobile)}
                className="mySwiper">
                {category.map((i, index) => (
                    <SwiperSlide key={index}>

                        <Link to={`/products/catagory/${i.name}`} className=' flex flex-col items-center justify-center w-full'>
                            <img className='w-16 h-16 rounded-2xl object-cover shadow shadow-gray-700' src={i.image} alt="" />
                            <p className='text-sm text-center'>{i.name}</p>
                        </Link>

                    </SwiperSlide>
                ))}


            </Swiper>

        </div>
    );
};

export default ProductCatagory;