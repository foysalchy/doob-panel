import React from 'react';
import banar1 from './Rectangle 40.png'
import banar2 from './wallpaperflare.com_wallpaper(2).jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';

const ProductHero = () => {
    const category = [{ name: 'Home & Lifestyle' }, { name: 'Groceries' }, { name: 'Electronic Accessories' }, { name: 'TV & Home Appliances' }, { name: 'TV & Home Appliances' }, { name: 'TV & Home Appliances' }, { name: 'Cosmitics Product' }, { name: 'Mother & Baby' }, { name: 'Watches, Bags, Jewellery' }, { name: 'Health & Beauty' }, { name: 'Electronics Devices' }, { name: 'Womens & Girls Fashion' }, { name: 'Men Product' }, { name: 'Men Product' }, { name: 'Men Product' }, { name: 'Men Product' }, { name: 'Men Product' }, { name: 'Men Product' }]

    const Banar = [{ image: banar1 }, { image: banar2 }, { image: banar1 }]
    return (
        <div className='flex gap-4 '>
            <div className='hidden  bg-white w-[20%] h-[350px] overflow-hidden overflow-y-scroll rounded-xl lg:flex flex-col gap-2 p-4 text-sm'>
                {category.map((item, index) => (
                    <Link to={`products/catagory/${item?.name}`}><p key={index}>{item?.name}</p></Link>
                ))}
            </div>
            <div className='lg:w-[80%] w-[100%]'>
                <Swiper className="mySwiper rounded-md">
                    {Banar.map((i, index) => (
                        <SwiperSlide key={index}><img className=' w-full lg:h-[350px] h-[150px] object-cover object-center rounded' src={i?.image} alt="" /></SwiperSlide>
                    ))}


                </Swiper>
            </div>
        </div>
    );
};

export default ProductHero;