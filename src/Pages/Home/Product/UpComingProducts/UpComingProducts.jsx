import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { SwiperSlide, Swiper } from "swiper/react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

const UpComingProducts = () => {
      const { user } = useContext(AuthContext);

      const {
            data: AdminNewProducts = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["AdminNewProducts"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/upcoming-products`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const data = [1, 2, 3, 4];
      const blankImg = 'https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg';
      console.log(AdminNewProducts);

      return (
            <div className="mt-3 md:py-6 pt-6 rounded bg-white">
                  <div className="md:px-5 px-2">
                        <div className="flex justify-between text-black">
                              <div className="flex justify-between align-items-center">
                                    <img
                                          className="h-5/6"
                                          src="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                          srcSet="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                          alt="new-product-icon"
                                    />

                                    <h3 className="whitespace-nowrap ml-2 font-medium">
                                          Upcoming Products
                                    </h3>
                              </div>
                              <Link
                                    to="upcoming-product"
                                    type="button"
                                    className="px-5 py-2 font-semibold rounded bg-gray-500 text-white text-xs "
                              >
                                    SEE MORE
                              </Link>
                        </div>
                  </div>
                  {AdminNewProducts?.length ? (
                        <div className="  bg-white rounded ">
                              <section className="body-font">
                                    <div className="border-b border-gray-500 border-opacity-50 md:mx-5 mx-2 md:mt-2"></div>
                                    {!isLoading ? (
                                          <div className="px-2 md:px-5 my-4 mx-auto">
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
                                                      {AdminNewProducts?.map((product, idx) => (
                                                            <SwiperSlide
                                                                  key={idx}
                                                                  className="border my-2 border-gray-500 border-opacity-90 md:p-3 p-1 rounded"
                                                            >
                                                                  <Link
                                                                        to={`${product._id}`}
                                                                        className="group block bar overflow-hidden"
                                                                  >


                                                                        <div className="relative  rounded-md bar overflow-hidden bg-transparent tc">
                                                                              <img
                                                                                    src={
                                                                                          product?.featuredImage?.src
                                                                                                ? product?.featuredImage?.src
                                                                                                : product?.images[0]?.src
                                                                                    }
                                                                                    alt={product?.name}
                                                                                    style={{ background: 'transparent' }}
                                                                                    className="absolute duration-300 left-0 group-hover:-left-[110%] bg-transparent inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                                                                              />
                                                                              <img
                                                                                    src={
                                                                                          product?.images[1]?.src
                                                                                                ? product?.images[1]?.src
                                                                                                : blankImg
                                                                                    }
                                                                                    alt=""
                                                                                    style={{ background: 'transparent' }}
                                                                                    className="absolute duration-300 left-[110%] group-hover:-left-[0%] bg-transparent inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                                                                              />
                                                                        </div>

                                                                        <div className="relative bg-white pt-3">
                                                                              <h3 className="text-sm ptitle bar overflow-hidden text-gray-700 group-hover:text-orange-500">
                                                                                    {product?.name}
                                                                              </h3>

                                                                              <div className="mt-1.5 flex items-center justify-between text-gray-900">
                                                                                    <p className="tracking-wide  ">
                                                                                          {user ? (
                                                                                                <div>
                                                                                                      <span className="kalpurush">৳</span>{" "}
                                                                                                      {product?.variantData?.[0]?.product1?.quantityPrice ?? 0}
                                                                                                </div>
                                                                                          ) : (
                                                                                                <Link
                                                                                                      className="text-[12px] text-red-500"
                                                                                                      to={"/sign-up"}
                                                                                                >
                                                                                                      Login to view Price
                                                                                                </Link>
                                                                                          )}
                                                                                    </p>

                                                                                    <p className="text-xs uppercase tracking-wide">
                                                                                          {product?.variations.length} Variant
                                                                                    </p>
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
                        <div className="p-4 grid md:grid-cols-4 grid-cols-1 gap-4">
                              {Array(4)
                                    .fill()
                                    .map((_, index) => (
                                          <div
                                                key={index}
                                                className="flex flex-col  f-full rounded shadow-md  animate-pulse h-96"
                                          >
                                                <div className="h-48 rounded-t dark:bg-gray-200"></div>
                                                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-100">
                                                      <div className="w-full h-6 rounded dark:bg-gray-200"></div>
                                                      <div className="w-full h-6 rounded dark:bg-gray-200"></div>
                                                      <div className="w-3/4 h-6 rounded dark:bg-gray-200"></div>
                                                </div>
                                          </div>
                                    ))}
                        </div>
                  )}
            </div>
      );
};
export default UpComingProducts;
