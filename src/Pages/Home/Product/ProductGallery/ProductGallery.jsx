import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Pagination, Autoplay } from 'swiper/modules';


const ProductGallery = () => {

  const { data: featureImageData = [], refetch: isLoading } = useQuery({
    queryKey: ["featureImageData"],
    queryFn: async () => {
      const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/feature-images`);
      const data = await res.json();
      return data?.data ? data?.data : [];
    },
  });

  const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
  return (
    <div >

      <div className='my-12 grid grid-cols-2 gap-4 lg:grid-cols-4 '>
        {featureImageData?.map(itm => (<div className="">
          <img src={itm?.image} alt="" className="w-full border rounded-xl h-full object-cover" />

        </div>))}
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
