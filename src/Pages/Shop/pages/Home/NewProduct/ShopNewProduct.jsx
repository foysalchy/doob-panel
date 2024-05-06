import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { Link } from "react-router-dom";

import { SwiperSlide, Swiper } from "swiper/react";

const ShopNewProduct = () => {
  const { shop_id } = useContext(ShopAuthProvider);
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  const shopId = idMatch ? idMatch[1] : null;
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/product/${shop_id.shop_id}/new-product`
      );
      const data = await res.json();
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [shop_id])
  const data = [1, 2, 3, 4];
  console.log(products, 'asdasd');

  return (
    <div>
      {products?.data?.length ? (
        <div className="py-4 bg-white rounded mt-6">
          <section className="body-font">
            <div className="px-5">
              <div className="flex justify-between text-black">
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
                <Link to={`/shop/${shopId}/shop-new-product`}
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
                      className="border my-2 border-gray-500 border-opacity-90 p-3 rounded"
                    >
                      <Link to={`product/${product?._id}`}>
                        <a className="block relative rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full md:h-[160px] h-[130px] block"
                            src={product?.featuredImage && product?.featuredImage.src ? product?.featuredImage?.src : product?.images[0]?.src}
                          />
                        </a>
                        <div className="mt-2">
                          <h2 className="text-black whitespace-nowrap title-font md:text-lg text-sm font-medium">
                            {product?.name.slice(0, 18)}
                          </h2>
                          <div className="flex items-center gap-10 text-black">
                            <del className="flex items-center ">
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
        ""
      )}
    </div>
  );
};

export default ShopNewProduct;
