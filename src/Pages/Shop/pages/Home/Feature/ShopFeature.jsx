import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Pagination, Autoplay } from 'swiper/modules';


const ShopFeature = () => {
    const [currentSlider, setCurrentSlider] = useState(0);

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    console.log('Shop ID:', shopId);


    const { data: features = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["features"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/feature/get/${shopId}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        },
    });

    return (
        <div className='my-12'>
            <h2 className="text- pb-4">Feature Images</h2>
            <Swiper
                pagination={true}
                autoplay={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper">
                {
                    features?.map(itm => <SwiperSlide>
                        <div className="md:h-[500px] h-[170px]">
                            <img src={itm?.image} alt="" className="w-full h-full object-cover" />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum sit inventore deserunt non fugit officia earum obcaecati deleniti, quidem praesentium, est architecto minus, placeat molestiae? Nemo ab tenetur possimus quas?
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default ShopFeature;
