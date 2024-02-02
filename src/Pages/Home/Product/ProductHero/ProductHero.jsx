import React from 'react';
import banar1 from './Rectangle 40.png'
import banar2 from './wallpaperflare.com_wallpaper(2).jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const ProductHero = () => {


    const { data: megaSideCategoryData = [], refetch } = useQuery({
        queryKey: ["megaSideCategoryData"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/category/megacategory");
            const data = await res.json();
            return data.rows;
        },
    });

    const { data: heroBanner = [], reload } = useQuery({
        queryKey: "heroBanner",
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/admin/slider`);
            const data = await res.json();
            return data?.data;
        },
    });

    const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
    const bannerFind = heroBanner?.filter((item) => item.status === 'true');
    console.log(bannerFind);
    return (
        <div className='flex gap-4 '>
            <div className='hidden  bg-white w-[20%] h-[350px] overflow-hidden overflow-y-scroll rounded-xl lg:flex flex-col gap-2 p-4 text-sm'>
                {megaSideCategoryData.map((item, index) => (
                    <div>
                        {!item.status == '' && <Link to={`products/catagory/${item?._id}`}><p key={index}>{item?.name}</p></Link>}
                    </div>
                ))}
            </div>
            <div className='lg:w-[80%] w-[100%]'>
                {bannerFind.length > 0 ? <Swiper className="mySwiper rounded-md">
                    {bannerFind.map((i, index) => (
                        <SwiperSlide key={index}>
                            <img className=' w-full lg:h-[350px] h-[150px] object-cover  object-center rounded' src={i?.image} srcSet={i?.image} alt="" />
                        </SwiperSlide>
                    ))}

                </Swiper> : <img className=' w-full lg:h-[350px] h-[150px] object-cover  object-center rounded' src={blankImg} alt="" />}
            </div>
        </div>
    );
};

export default ProductHero;