import React, { useContext } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { useQuery } from '@tanstack/react-query';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

const ShopUpcoming = () => {


    const { shop_id } = useContext(ShopAuthProvider)

    console.log(`https://salenow-v2-backend.vercel.app/api/v1/shop/product/${shop_id.shop_id}/upcoming-product`);
    const { data: products = [], refetch } = useQuery({
        queryKey: ["upcoming"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/product/${shop_id.shop_id}/upcoming-product`);
            const data = await res.json();
            return data;
        },
    });



    return (
        <div className="py-4 bg-white rounded mt-6">
            {products?.data?.length ? <section className="body-font">
                <div className="px-5">
                    <div className="flex justify-between text-black">
                        <div className="flex justify-between align-items-center">
                            <img
                                className="h-5/6"
                                src="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                srcSet="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                alt="new-product-icon"
                            />

                            <h3 className="whitespace-nowrap ml-2 font-medium">
                                Upcoming Product
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="px-5 py-2 font-semibold rounded bg-black text-gray-100 text-xs "
                        >
                            SHOP MORE
                        </button>
                    </div>
                </div>
                <div className="border-b border-gray-200 mx-5 mt-2"></div>
                <div className=" px-5 my-4 mx-auto">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        navigation
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                            }, 640: {
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
                                            className="object-cover object-center  w-full h-[140px] block"
                                            src={product?.featuredImage?.src}
                                        />
                                    </a>
                                    <div className="mt-4">
                                        <h2 className="text-gray-900 title-font md:text-lg text-sm font-medium">
                                            {product?.name.slice(0, 20)}..
                                        </h2>
                                        <div className="flex items-center gap-10 text-gray-800">
                                            <del>
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
                                            className="px-5 py-2  font-semibold rounded bg-black text-white w-full mt-3 text-xs "
                                        >
                                            Add to card
                                        </button>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section> : ""}
        </div>
    );
};

export default ShopUpcoming;