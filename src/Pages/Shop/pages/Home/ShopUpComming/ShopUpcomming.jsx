import React, { useContext, useEffect } from "react";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { useQuery } from "@tanstack/react-query";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

const ShopUpcoming = () => {
  const { shop_id } = useContext(ShopAuthProvider);
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  const shopId = idMatch ? idMatch[1] : null;

  console.log(
    `https://backend.doob.com.bd/api/v1/shop/product/${shop_id.shop_id}/upcoming-product`
  );
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/product/${shop_id.shop_id}/upcoming-product`
      );
      const data = await res.json();
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [shop_id])
  const data = [1, 2, 3, 4];

  return (
    <div className="py-4 bg-white rounded mt-6">
      {products?.data?.length ? (
        <section className="body-font">
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
              <Link to={`/shop/${shopId}/shop-upcoming-product`}
                type="button"
                className="px-5 py-2 font-semibold rounded bg-gray-500 text-white text-xs "
              >
                SEE MORE
              </Link>
            </div>
          </div>
          <div className="border-b border-gray-200 mx-5 mt-2"></div>
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
                    className="border border-gray-500 border-opacity-90 p-3 rounded"
                  >
                    <Link to={`product/${product?._id}`}>
                      <a className="block relative rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="object-cover object-center  w-full h-[140px] block"
                          src={product?.featuredImage.src ? product?.featuredImage?.src : product?.images[0]?.src}
                        />
                      </a>
                      <div className="mt-4">
                        <h2 className="text-gray-900 whitespace-nowrap title-font md:text-lg text-sm font-medium">
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
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div class="grid px-5 my-4 mx-auto grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
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
      ) : (
        ""
      )}
    </div>
  );
};

export default ShopUpcoming;
