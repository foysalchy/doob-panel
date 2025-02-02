import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";

const ShopFeature = () => {
      const [currentSlider, setCurrentSlider] = useState(0);

      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);

      const shopId = idMatch ? idMatch[1] : null;

      console.log("Shop ID:", shopId);

      const {
            data: features = [],
            isLoading,
            isError,
            refetch,
      } = useQuery({
            queryKey: ["features"],
            queryFn: async () => {
                  try {
                        const res = await fetch(
                              `https://doob.dev/api/v1/shop/feature/get/${shopId}`
                        );
                        const data = await res.json();
                        return data;
                  } catch (error) {
                        console.error("Error fetching data:", error);
                        throw error;
                  }
            },
      });

      return (
            <div className="mt-8 mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4 pb-8  ">
                  {features?.map((itm) => (
                        <a key={itm?._id} href={`//${itm?.link}`} className="">
                              <img
                                    src={itm?.image}
                                    alt=""
                                    className="w-full border rounded-xl h-full object-cover"
                              />
                        </a>
                  ))}
                  {/* <Swiper
                pagination={true}
                autoplay={true}
                slidesPerView={2}
                spaceBetween={20}
                modules={[Pagination, Autoplay]}
                className="mySwiper">
                {
                   <SwiperSlide>

                    </SwiperSlide>)
                }

            </Swiper> */}
            </div>
      );
};

export default ShopFeature;
