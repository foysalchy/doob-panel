import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { Link } from 'react-router-dom';

import { SwiperSlide, Swiper } from 'swiper/react';


const ShopNewProduct = () => {
    const { shop_id } = useContext(ShopAuthProvider)

    console.log(`https://salenow-v2-backend.vercel.app/api/v1/shop/product/${shop_id.shop_id}/new-product`);
    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/product/${shop_id.shop_id}/new-product`);
            const data = await res.json();
            return data;
        },
    });



    return (
        <div>
            {products?.data?.length ? <div className="py-4 bg-black rounded mt-6">
                <section className="body-font">
                    <div className="px-5">
                        <div className="flex justify-between text-white">
                            <div className="flex justify-between align-items-center">
                                <img
                                    className="md:h-5/6"
                                    src="https://i.ibb.co/zfBPGTy/new-product?.png"
                                    srcSet="https://i.ibb.co/zfBPGTy/new-product?.png"
                                    alt="icon"
                                />

                                <h3 className="whitespace-nowrap ml-2 font-medium">
                                    New Product
                                </h3>
                            </div>
                            <button
                                type="button"
                                className="px-5 py-2 font-semibold rounded bg-gray-500 text-white text-xs "
                            >
                                SHOP MORE
                            </button>
                        </div>
                    </div>
                    <div className="border-b border-gray-500 mx-5 mt-2"></div>
                    <div className=" px-5 my-4 mx-auto">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            navigation
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {products?.data?.map((product, idx) => (
                                <SwiperSlide key={idx} className="border border-gray-500 border-opacity-90 p-3 rounded">
                                    <Link to={`product/${product?._id}`} >
                                        <a className="block relative rounded overflow-hidden">
                                            <img
                                                alt="ecommerce"
                                                className="object-cover object-center w-full md:h-[160px] h-[130px] block"
                                                src={product?.featuredImage?.src}
                                            />
                                        </a>
                                        <div className="mt-2">
                                            <h2 className="text-gray-200 title-font md:text-lg text-sm font-medium">
                                                {product?.name.slice(0, 18)}..
                                            </h2>
                                            <div className="flex items-center gap-10 text-gray-300">
                                                <del className='flex items-center '>
                                                    <span className="kalpurush">৳ </span>
                                                    {product?.regular_price}
                                                </del>
                                                <p className="">
                                                    <span className="kalpurush">৳</span>
                                                    {product?.price}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="px-5 py-2  font-semibold rounded bg-white text-black w-full mt-3 text-xs "
                                            >
                                                Add to card
                                            </button>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            </div> : ''}
        </div>
    );
}

export default ShopNewProduct;