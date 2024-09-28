import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

const ReleventProduct = ({ productFind }) => {
      const { user } = useContext(AuthContext);

      const { data: releventProduct = [], refetch } = useQuery({
            queryKey: ["releventProduct"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/products"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      // console.log(releventProduct, "releventProduct", productFind);

      if (
            !Array.isArray(releventProduct) ||
            !releventProduct.every((item) => Array.isArray(item?.adminCategory))
      ) {
            console.error("Invalid data format for releventProduct.");
            return null;
      }

      const relevantProducts = releventProduct?.filter((product) =>
            product?.adminCategory?.some((category) =>
                  productFind?.adminCategory?.includes(category)
            )
      );

      const handleClick = () => {
            window.scrollTo(0, 0); // Scrolls to the top of the page
      };

      return (
            <div className="bg-white rounded">
                  <section className="body-font">
                        <div className="px-2 md:px-5">
                              <div className="flex justify-between text-black">
                                    <div className="flex justify-between align-items-center">
                                          <h3 className="ml-2 font-medium whitespace-nowrap">
                                                Top Selling Products
                                          </h3>
                                    </div>
                              </div>
                        </div>
                        <div className="border-gray-200 mx-5 mt-2 border-b"></div>
                        <div className="mx-auto p-5">
                              <div className="px-2 md:px-5 my-4 mx-auto">
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
                                          {relevantProducts?.map((product, idx) => (
                                                <SwiperSlide
                                                      key={idx}
                                                      className="border my-2 border-gray-500 border-opacity-90 md:p-3 p-1 rounded"
                                                >
                                                      <Link
                                                            to={`/products/${product?._id}`}
                                                            className="group block overflow-hidden"
                                                      >
                                                            <div className="relative  rounded-md overflow-hidden bg-transparent tc">
                                                                  <img
                                                                        src={
                                                                              product?.featuredImage?.src
                                                                                    ? product?.featuredImage?.src
                                                                                    : product?.images[0]?.src
                                                                        }
                                                                        alt=""
                                                                        style={{ background: "transparent" }}
                                                                        className="absolute duration-300 left-0 group-hover:-left-[110%] bg-transparent inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                                                                  />
                                                                  <img
                                                                        src={
                                                                              product?.images[1]?.src
                                                                                    ? product?.images[1]?.src
                                                                                    : ''
                                                                        }
                                                                        alt=""
                                                                        style={{ background: "transparent" }}
                                                                        className="absolute duration-300 left-[110%] group-hover:-left-[0%] bg-transparent inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                                                                  />

                                                                  {/* <img
                            src={
                              product?.images[1]?.src
                                ? product?.images[1]?.src
                                : blankImg
                            }
                            alt=""
                            style={{ background: 'transparent' }}
                            className="absolute   light-[52%] duration-200 bg-transparent  inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                          /> */}
                                                            </div>

                                                            <div className="relative bg-white pt-3">
                                                                  <h3 className="capitalize text-sm ptitle overflow-hidden text-gray-700 group-hover:text-orange-500 group-hover:underline-offset-4">
                                                                        {product.name}
                                                                  </h3>

                                                                  <div className="mt-1.5 flex items-center justify-between text-gray-900">
                                                                        <p className="tracking-wide ">
                                                                              {user ? (
                                                                                    <div>
                                                                                          <span className="kalpurush">৳</span>{" "}
                                                                                          {product?.variantData?.[0]?.product1?.quantityPrice ?? 0}
                                                                                    </div>
                                                                              ) : (
                                                                                    <Link
                                                                                          className="text-[12px] text-red-500"
                                                                                          to={"/sign-up"}
                                                                                    >
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
                        </div>
                  </section>
            </div>
      );
};

export default ReleventProduct;
