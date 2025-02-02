import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import TimeCountDown from "./TimeCountDown";

import { Link } from "react-router-dom";

const ShopCampain = () => {
      const { shop_id } = useContext(ShopAuthProvider);

      const { data: shopCampainData = [], isLoading, refetch } = useQuery({
            queryKey: ["shopCampain"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/shop-campaign?shop_id=${shop_id?.shop_id}`
                  );
                  const data = await res.json();
                  return data?.data;
            },
      });
      useEffect(() => {
            refetch();
      }, [shop_id])


      return (
            <div>
                  {shopCampainData
                        ?.sort((a, b) => b.isFlash - a.isFlash)
                        ?.map((data) => (
                              <div key={data?._id}>
                                    {data.products.length ? (
                                          <div className="py-4 bg-black rounded mt-6" >
                                                <section className="body-font">
                                                      <div className="px-2">
                                                            <div className="flex items-center justify-between text-white">
                                                                  <div className="flex justify-between align-items-center">
                                                                        <div className="flex items-center gap-3">
                                                                              <img
                                                                                    className="h-[40px] object-cover w-[40px] "
                                                                                    src={data.image}
                                                                                    srcSet={data.image}
                                                                                    alt="new-product-icon"
                                                                              />

                                                                              <h3 className="whitespace-nowrap  font-medium">
                                                                                    {data?.name}
                                                                              </h3>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                              {data?.isFlash && (
                                                                                    <TimeCountDown
                                                                                          start={data.startTime}
                                                                                          end={data?.endTime}
                                                                                    />
                                                                              )}
                                                                        </div>
                                                                  </div>
                                                                  <div className="">
                                                                        <button
                                                                              type="button"
                                                                              className="px-5 py-2 sec_bg font-semibold border rounded bg-gray-500 text-white text-xs "
                                                                        >
                                                                              SHOP MORE
                                                                        </button>
                                                                  </div>

                                                            </div>
                                                      </div>
                                                      <div className="border-b border-gray-500 mx-5 mt-2"></div>
                                                      <div className="container px-5 py-8 mx-auto">
                                                            <div className=" ">
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
                                                                        {data?.products?.map((product, idx) => (
                                                                              <SwiperSlide
                                                                                    key={idx}
                                                                                    className="border border-gray-500 border-opacity-90 p-3 rounded bg-white"
                                                                              >
                                                                                    <Link to={`flash-product/${product?._id}`}>
                                                                                          <a className="block relative rounded bar overflow-hidden">
                                                                                                <img
                                                                                                      alt={product?.name}
                                                                                                      className="object-cover object-center w-full md:h-[160px] h-[130px] block"
                                                                                                      src={product?.featuredImage.src ? product?.featuredImage?.src : product?.images[0]?.src}
                                                                                                />
                                                                                          </a>
                                                                                          <div className="mt-2">
                                                                                                <h2 className="text-black-200 title-font md:text-lg text-sm font-medium">
                                                                                                      {product?.name.slice(0, 18)}..
                                                                                                </h2>
                                                                                                <div className="flex items-center gap-10 text-black-300">
                                                                                                      <del className="flex items-center ">
                                                                                                            <span className="kalpurush">৳ </span>
                                                                                                            {product?.regular_price}
                                                                                                      </del>
                                                                                                      <p className="">
                                                                                                            <span className="kalpurush">৳</span>
                                                                                                            {product?.campaignPrice
                                                                                                                  ? product?.campaignPrice
                                                                                                                  : product?.price}
                                                                                                      </p>
                                                                                                </div>

                                                                                                <button
                                                                                                      type="button"
                                                                                                      className="px-5 py-2  font-semibold rounded bg-white sec_bg text-black w-full mt-3 text-xs ">
                                                                                                      Add to Cart
                                                                                                </button>
                                                                                          </div>
                                                                                    </Link>
                                                                              </SwiperSlide>
                                                                        ))}
                                                                  </Swiper>
                                                            </div>
                                                      </div>
                                                </section>
                                          </div>
                                    ) : (
                                          ""
                                    )}
                              </div>
                        ))}
            </div>
      );
};

export default ShopCampain;
