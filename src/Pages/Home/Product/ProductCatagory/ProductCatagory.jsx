import React from "react";
import Grocery from "./pexels-pixabay-264636.jpg";
import Offer from "./istockphoto-1289179862-612x612.jpg";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoaderData from "../../../../Common/LoaderData";

const ProductCatagory = () => {
  const {
    data: megaCategoryData = [],
    refetch,
    isLoading: loadingMega,
  } = useQuery({
    queryKey: ["productMegaCategoryData"],
    queryFn: async () => {
      const res = await fetch(
        "https://doob.dev/api/v1/admin/category/megacategory"
      );
      const data = await res.json();
      return data.rows;
    },
  });

  // console.log(megaCategoryData, "megaCategoryData");
  const slidesPerViewDesktop = 9;
  const slidesPerViewTablet = 6;
  const slidesPerViewMobile = 4;
  const blankImg = "https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg";
  return (
    <div className="py-4 bg-white rounded mt-6">
      {loadingMega && <LoaderData />}
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
        {megaCategoryData
          ?.filter((item) => item.feature == "true" || true)
          .map((itm, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/products/catagory/${itm._id}`}
                className=" flex flex-col items-center justify-center w-full"
              >
                <img
                  className="md:w-16 md:h-16 md:border-none border md:p-0 p-1 md:bg-transparent bg-orange-50 w-12 h-12 rounded-2xl object-cover "
                  src={itm?.image}
                  srcSet={itm.image}
                  alt={itm.name}
                />
                <p className="text-sm text-center">{itm.name}</p>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductCatagory;
