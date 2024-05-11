import React, { useContext, useEffect } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
const ShopProductCategory = () => {
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  const shopId = idMatch ? idMatch[1] : null;
  const { shop_id } = useContext(ShopAuthProvider);

  console.log("Shop ID:", shopId);
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["feature_category"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/feature-category?shopId=${shop_id.shop_id}`
      );
      const data = await res.json();
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [shop_id])
  console.log(categories, "feature-category");
  const slidesPerViewDesktop = 9;
  const slidesPerViewTablet = 6;
  const slidesPerViewMobile = 4;

  return (
    <div>
      <div className="py-4 bg-white rounded mt-6">
        <Swiper
          slidesPerView={
            window.innerWidth >= 1024
              ? slidesPerViewDesktop
              : window.innerWidth >= 768
                ? slidesPerViewTablet
                : slidesPerViewMobile
          }
          className="mySwiper"
        >
          {categories.length ?
            categories?.map((i, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={`categories/${shop_id.shop_id}/${i?.name}`}
                  className=" flex flex-col items-center justify-center w-full"
                >
                  <img
                    className="md:w-16 md:h-16 md:border-none border md:p-0 p-1 md:bg-transparent bg-orange-50 w-12 h-12 rounded-2xl object-cover "
                    srcSet={i?.img}
                    src={i.img}
                    alt=""
                  />
                  <p className="text-sm text-center mt-1">{i.name}</p>
                </Link>
              </SwiperSlide>
            ))
            :
            ''
          }
        </Swiper>
      </div>
    </div>
  );
};

export default ShopProductCategory;
