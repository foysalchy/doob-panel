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
        `https://backend.doob.com.bd/api/v1/admin/upcoming-products`
      );
      const data = await res.json();
      return data;
    },
  });

  const data = [1, 2, 3, 4];
  const blankImg = "";

  return (
    <div className="  bg-white">
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
        <div className="py-4 bg-white rounded mt-6">
          <section className="body-font">
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
                  {AdminNewProducts?.map((product, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="border my-2 border-gray-500 border-opacity-90 p-3 rounded"
                    >
                      <Link
                        to={`${product._id}`}
                        className="group block overflow-hidden"
                      >
                        <div className="relative h-[180px] sm:h-[250px]">
                          <img
                            src={
                              product?.featuredImage.src
                                ? product?.featuredImage?.src
                                : product?.images[0]?.src
                            }
                            // src={product?.featuredImage?.src}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                          />

                          <img
                            src={
                              product?.images[1]?.src
                                ? product?.images[1]?.src
                                : blankImg
                            }
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                          />
                        </div>
                        <div className="relative bg-white pt-3">
                          <h3 className="text-sm h-5 overflow-hidden text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {product?.name}
                          </h3>

                          <div className="mt-1.5 flex items-center justify-between text-gray-900">
                            <p className="tracking-wide  ">
                              {user ? (
                                <div>
                                  <span className="kalpurush">৳</span>{" "}
                                  {user ? product?.price : 0}
                                </div>
                              ) : (
                                <Link className="text-[12px] text-blue-500" to={"/sign-up"}>
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
              <div class="grid px-5 my-4 grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                {data.map((i) => (
                  <div key={i} class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
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
