import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ForYouProducts = () => {
      const { user } = useContext(AuthContext);
      const [displayedProducts, setDisplayedProducts] = useState(10);

      const { data: newProducts = [], refetch } = useQuery({
            queryKey: ["newProducts"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/products");
                  const data = await res.json();
                  return data;
            },
      });

      function extractTextFromHTML(htmlString) {
            const doc = new DOMParser().parseFromString(htmlString, "text/html");
            return doc.body.textContent || "";
      }

      const handleLoadMore = () => {
            setDisplayedProducts((prev) => prev + 10);
            refetch();
      };

      const blankImg = "https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg";

      return (
            <div>
                  <div className="py-4 bg-white rounded mt-6">
                        <section className="body-font">
                              <div className="md:px-5 px-2">
                                    <div className="flex justify-between text-black">
                                          <div className="flex justify-between align-items-center">
                                                <img
                                                      className="h-5/6"
                                                      src="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                                      srcSet="https://i.ibb.co/5FhYvk8/upcoming-foru.png"
                                                      alt="new-product-icon"
                                                />

                                                <h3 className="whitespace-nowrap ml-2 font-medium">For You</h3>
                                          </div>
                                    </div>
                              </div>
                              <div className="border-b border-gray-200 md:mx-5 mx-2 mt-2"></div>
                              <div className="container px-2 md:px-5 py-8 mx-auto">
                                    {!newProducts ? (
                                          <>
                                                <div className="p-4 grid md:grid-cols-4 grid-cols-1 gap-4">
                                                      {Array(4)
                                                            .fill()
                                                            .map((_, index) => (
                                                                  <div
                                                                        key={index}
                                                                        className="flex flex-col  f-full rounded shadow-md  animate-pulse h-96"
                                                                  >
                                                                        <div className="h-48 rounded-t dark:bg-gray-200"></div>
                                                                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-100">
                                                                              <div className="w-full h-6 rounded dark:bg-gray-200"></div>
                                                                              <div className="w-full h-6 rounded dark:bg-gray-200"></div>
                                                                              <div className="w-3/4 h-6 rounded dark:bg-gray-200"></div>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                </div>
                                          </>
                                    ) : (
                                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 -m-4 text-black md:px-4">
                                                {!newProducts.length ? '' : newProducts?.slice(0, displayedProducts)
                                                      .filter(
                                                            (product) =>
                                                                  product?.status === true &&
                                                                  product?.product_status !== "reject"
                                                      )
                                                      .filteredProducts?.map((product, idx) => {
                                                            let name = product?.name?.slice(0, 60);
                                                            {
                                                                  // const blankImg = 'https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg';
                                                            }
                                                            console.log(product);
                                                            return (
                                                                  <Link
                                                                        to={`${product._id}`}
                                                                        className="group block overflow-hidden border my-2 border-gray-500 border-opacity-90 md:p-3 p-1 rounded "
                                                                  >
                                                                        {/* <div className="relative h-[140px] sm:h-[250px]">
                          <img
                            src={
                              product?.featuredImage?.src
                                ? product?.featuredImage?.src
                                : product?.images[0]?.src
                            }
                            alt=""
                            className="absolute rounded inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                          />

                          <img
                            src={product?.images[1]?.src}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                          />
                        </div> */}

                                                                        <div className="relative  rounded-md overflow-hidden h-[180px] bg-transparent sm:h-[250px]">
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
                                                                                                : blankImg
                                                                                    }
                                                                                    alt=""
                                                                                    style={{ background: "transparent" }}
                                                                                    className="absolute duration-300 left-[110%] group-hover:-left-[0%] bg-transparent inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                                                                              />
                                                                        </div>

                                                                        <div className="relative bg-white pt-3">
                                                                              <h3 className="text-sm whitespace-nowrap h-5 overflow-hidden text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                                                    {name}
                                                                              </h3>

                                                                              <div className="mt-1.5 flex items-center justify-between text-gray-900">
                                                                                    <p className="tracking-wide  ">
                                                                                          {user ? (
                                                                                                <div>
                                                                                                      <span className="kalpurush">৳</span>{" "}
                                                                                                      {product?.variantData?.product1?.quantityPrice ?? 0}

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
                                                            );
                                                      })}
                                          </div>
                                    )}
                              </div>
                        </section>
                  </div>
                  {newProducts && newProducts.length > displayedProducts && (
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
      );
};

export default ForYouProducts;
