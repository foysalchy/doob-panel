import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { Link } from "react-router-dom";

import { SwiperSlide, Swiper } from "swiper/react";


const TopQuantityDiscount = () => {
      const { shop_id } = useContext(ShopAuthProvider);
      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);

      const shopId = idMatch ? idMatch[1] : null;
      const {
            data: products = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["discount-product"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/product/${shop_id.shop_id}/discount-product`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      useEffect(() => {
            refetch();
      }, [shop_id]);
      const data = [1, 2, 3, 4];


      return (
            <div>
                  {products?.data?.length ? (
                        <div className="py-4 bg-white rounded mt-6">
                              <section className="body-font">
                                    <div className="px-5">
                                          <div className="flex justify-between text-black">
                                                <div className="flex justify-between align-items-center">
                                                      {/* <img
                                        className="md:h-5/6"
                                        src="https://i.ibb.co/zfBPGTy/new-product.png"
                                        srcSet="https://i.ibb.co/zfBPGTy/new-product.png"
                                        alt="icon"
                                    /> */}

                                                      <h3 className="whitespace-nowrap ml-2 font-medium">
                                                            Top Discount Products
                                                      </h3>
                                                </div>
                                                <Link
                                                      to={`/shop/${shopId}/shop-new-product`}
                                                      type="button"
                                                      className="px-5 py-2 font-semibold rounded bg-gray-500 text-white text-xs "
                                                >
                                                      SEE MORE
                                                </Link>
                                          </div>
                                    </div>
                                    <div className="border-b border-gray-500 border-opacity-50 mx-5 mt-2"></div>
                                    {!isLoading ? (
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
                                                            <SwiperSlide
                                                                  key={idx}
                                                                  className="  my-2 rounded"
                                                            >
                                                                  <Link
                                                                        className="group overflow-hidden   block rounded"
                                                                        key={product?._id}
                                                                        to={`product/${product?._id}`}
                                                                  >
                                                                        <div className="block relative rounded overflow-hidden">
                                                                              <img
                                                                                     alt={product?.name}
                                                                                    className="thumbnail"
                                                                                    src={
                                                                                          product?.featuredImage?.src
                                                                                                ? product?.featuredImage?.src
                                                                                                : product?.images[0]?.src
                                                                                    }
                                                                              />
                                                                        </div>
                                                                        <div className="mt-2">
                                                                              <h2 className="text-black  title-font md:text-sm ptitle text-medium font-medium">
                                                                                    {product?.name}
                                                                              </h2>
                                                                              <div className="flex items-center gap-10 text-black">
                                                                                    {product?.price > 0 && product?.price !== product?.regular_price ? (
                                                                                          <div className="">
                                                                                                <p style={{ fontSize: '20px', lineHeight: '14px' }} className="pt-1 font-medium text-green-800 text-medium ">
                                                                                                      <span className="kalpurush" style={{ fontSize: '24px' }}>৳</span>
                                                                                                      {product?.price}
                                                                                                </p>
                                                                                                <p className="flex items-center text-sm pt-1 gap-2">
                                                                                                      <del className="flex items-center  text-gray-600 text-sm">
                                                                                                            <span className="kalpurush" style={{ fontSize: '22px' }}>৳</span>
                                                                                                            {product?.regular_price > 0
                                                                                                                  ? product?.regular_price
                                                                                                                  : product?.price}
                                                                                                      </del>
                                                                                                      -{Math.round(((product.regular_price - product.price) / product.regular_price * 100).toFixed(2))}%
                                                                                                </p>

                                                                                          </div>
                                                                                    ) : (
                                                                                          <div>
                                                                                                {" "}
                                                                                                <p style={{ fontSize: '20px', lineHeight: '14px' }} className="pt-1 font-medium text-green-800 text-medium ">
                                                                                                      <span className="kalpurush" style={{ fontSize: '24px' }}>৳</span>
                                                                                                      {product?.regular_price > 0
                                                                                                            ? product?.regular_price
                                                                                                            : product?.price}
                                                                                                </p>
                                                                                          </div>
                                                                                    )}
                                                                              </div>


                                                                        </div>
                                                                  </Link>
                                                            </SwiperSlide>
                                                      ))}
                                                </Swiper>
                                          </div>
                                    ) : (
                                          <div className="grid px-5 my-4 grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                                                {data.map((i) => (
                                                      <div key={i} className="w-full ">
                                                            <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                                            <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                                            <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                                      </div>
                                                ))}
                                          </div>
                                    )}
                              </section>
                        </div>
                  ) : (
                        ""
                  )}
            </div>
      );

};

export default TopQuantityDiscount;
