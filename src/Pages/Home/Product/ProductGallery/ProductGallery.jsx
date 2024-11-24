import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";

const ProductGallery = () => {
      const { data: featureImageData = [], refetch: isLoading } = useQuery({
            queryKey: ["featureImageData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/feature-images`
                  );
                  const data = await res.json();
                  return data?.data ? data?.data : [];
            },
      });

      console.log(featureImageData);
      // const blankImg = 'https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg';
      return (
            <div>
                  <div className=" mt-[20px] grid grid-cols-4 gap-2 md:gap-4 lg:grid-cols-6 ">
                        {featureImageData?.length > 0 &&
                              featureImageData?.map((itm) => (
                                    <a key={itm?._id} target="_blank" href={`//${itm?.link}`}>
                                          <img
                                                src={itm?.image}
                                                alt=""
                                                className="w-full border rounded-lg h-full object-cover"
                                          />
                                    </a>
                              ))}
                  </div>
                  {/* <Swiper
        pagination={true}
        autoplay={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper">
        {
          featureImageData?.map(itm => <SwiperSlide>
            <div className="md:h-[500px] h-[170px]">
              <img src={itm?.image} alt="" className="w-full h-full object-cover" />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum sit inventore deserunt non fugit officia earum obcaecati deleniti, quidem praesentium, est architecto minus, placeat molestiae? Nemo ab tenetur possimus quas?
            </div>
          </SwiperSlide>)
        }

      </Swiper> */}
            </div>
      );
};

export default ProductGallery;
