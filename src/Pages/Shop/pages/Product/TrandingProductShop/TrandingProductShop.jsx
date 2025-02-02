import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";

const TrandingProductShop = () => {
      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);

      const shopId = idMatch ? idMatch[1] : null;

      const { shop_id } = useContext(ShopAuthProvider);
      // console.log(`https://doob.dev/api/v1/shop/product/${shop_id.shop_id}/all-product?limit=20`);
      const { data: newProducts = [], refetch } = useQuery({
            queryKey: ["allProduct"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/product/${shop_id.shop_id}/all-product?limit=20`
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const [displayedProducts, setDisplayedProducts] = useState(10);
      const handleLoadMore = () => {
            setDisplayedProducts((prev) => prev + 10);
            refetch();
      };



      console.log(newProducts, "newProducts");
      return (
            <div>
                  <div className="py-4 bg-white rounded md:mt-6">
                        <section className="body-font">
                              <div className="px-2">
                                    <div className="flex justify-between text-black">
                                          <div className="flex justify-between align-items-center">
                                                <img
                                                      className="h-5/6"
                                                      src="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                                      srcSet="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                                      alt="new-product-icon"
                                                />

                                                <h3 className="whitespace-nowrap font-semibold ml-2 text-lg">
                                                      Trading Products
                                                </h3>
                                          </div>
                                    </div>
                              </div>
                              <div className="border-b border-gray-200 mx-5 mt-2"></div>
                              <div className="container px-5 py-8 mx-auto">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 -m-4 text-black">
                                          {newProducts?.data?.map((product, idx) => {
                                                return (
                                                      <Link
                                                            to={`/shop/${shopId}/product/${product?._id}`}
                                                            key={idx}
                                                            className="p-2 w-full  border lg:mx-2 text-black rounded"
                                                      >
                                                            <a className="block relative w-full m-auto h-32 rounded bar overflow-hidden">
                                                                  <img
                                                                        alt={product?.name}
                                                                        className="object-cover h-full block w-full m-auto border rounded"
                                                                        src={product?.featuredImage[0]?.src ? product?.featuredImage[0]?.src : product?.images[0]?.src}
                                                                        srcSet={product?.featuredImage[0]?.src}
                                                                  />
                                                            </a>
                                                            <div className="mt-4 text-center">
                                                                  <h3 className="text-xs whitespace-nowrap mb-1 font-medium">
                                                                        {product?.name.slice(0, 20)}..
                                                                  </h3>

                                                                  <div className="flex justify-evenly mt-2">
                                                                        <p className="py-0 font-medium">
                                                                              {" "}
                                                                              {product?.regular_price}
                                                                        </p>
                                                                        <del> {product?.price}</del>
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <button
                                                                              type="button"
                                                                              className="px-5 py-2  font-semibold w-full rounded bg-black text-white text-xs "
                                                                        >
                                                                              Add to Cart
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                );
                                          })}
                                    </div>
                              </div>
                        </section>
                  </div>
                  <div className="mt-6 flex justify-center">
                        <div className="mt-6 flex justify-center">
                              {newProducts && newProducts.data && newProducts.data.length > displayedProducts && (
                                    <div className="mt-6 flex justify-center">
                                          <button
                                                onClick={handleLoadMore}
                                                type="button"
                                                className="px-5 py-2 font-semibold rounded bg-black text-white text-xs"
                                          >
                                                LOAD MORE
                                          </button>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default TrandingProductShop;
