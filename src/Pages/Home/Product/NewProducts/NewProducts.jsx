import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { SwiperSlide, Swiper } from 'swiper/react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const NewProducts = () => {

  const { user } = useContext(AuthContext)

  const { data: AdminNewProducts = [], refetch, isLoading } = useQuery({
    queryKey: ["AdminNewProducts"],
    queryFn: async () => {
      const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/new-products`);
      const data = await res.json();
      return data;
    },
  });

  const blankImg = ""

  const data = [1, 2, 3, 4]


  return (
    <div>

      {AdminNewProducts?.length ? <div className="py-4 bg-white rounded mt-6">
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
                  New Product
                </h3>
              </div>
              <button
                type="button"
                className="px-5 py-2 font-semibold rounded bg-gray-500 text-white text-xs "
              >
                SHOP MORE
              </button>
            </div>
          </div>
          <div className="border-b border-gray-500 border-opacity-50 mx-5 mt-2"></div>
          {!isLoading ? <div className=" px-5 my-4 mx-auto">
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
                <SwiperSlide key={idx} className="border my-2 border-gray-500 border-opacity-90 p-3 rounded">
                  <Link to={`${product._id}`} className="group block overflow-hidden">
                    <div className="relative h-[250px] sm:h-[250px]">
                      <img
                        src={product?.featuredImage?.src}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                      />

                      <img
                        src={product?.images[1]?.src ? product?.images[1]?.src : blankImg}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                      />
                    </div>

                    <div className="relative bg-white pt-3">
                      <h3 className="capitalize text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        {product.name}
                      </h3>

                      <div className="mt-1.5 flex items-center justify-between text-gray-900">
                        <p className="tracking-wide "><span className="kalpurush">৳</span> {user ? product?.price : <Link className='text-[8px] ' to={'/sign-up'}>Login to view Price</Link>}</p>

                        <p className="text-xs uppercase tracking-wide">{product?.variations.length} Variant</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> : <div class="grid px-5 my-4 grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
            {
              data.map((i) => (
                <div key={i} class="w-full ">
                  <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                  <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                  <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
              ))
            }
          </div>
          }
        </section>
      </div> : ''}
    </div>
  );
};

export default NewProducts;
