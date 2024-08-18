import React from "react";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";

const SellerTopSellingProduct = ({ productFind }) => {
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


      if (
            !Array.isArray(releventProduct) ||
            !releventProduct.every((item) => Array.isArray(item.adminCategory))
      ) {
            console.error("Invalid data format for releventProduct.");
            return null;
      }

      // const relevantProducts = releventProduct?.filter((product) =>
      //     product.categories.some((category) =>
      //         productFind.categories.includes(category?.name)
      //     )
      // );

      const productFindCategoryNames = productFind.categories
            .filter(category => category !== null)
            .map(category => category.name);

      const filteredProducts = releventProduct.filter(product => {
            const productCategoryNames = product.categories
                  .filter(category => category !== null)
                  .map(category => category.name);

            return productCategoryNames.some(categoryName => productFindCategoryNames.includes(categoryName));
      });

      console.log("----->", filteredProducts);
      // console.log(relevantProducts, "releventProduct-----", productFind);

      const handleClick = () => {
            window.scrollTo(0, 0); // Scrolls to the top of the page
      };

      return (
            <div className=" bg-white rounded ">
                  <section className="body-font">
                        <div className="md:px-5 px-2">
                              <div className="flex justify-between text-black">
                                    <div className="flex justify-between align-items-center">
                                          <h3 className="whitespace-nowrap ml-2 font-medium">
                                                Top Selling Products
                                          </h3>
                                    </div>
                              </div>
                        </div>
                        <div className="border-b border-gray-200 mx-5 mt-2"></div>
                        <div className="container px-5 py-8 mx-auto">
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 -m-4 text-black">
                                    {filteredProducts?.slice(0, 7).map((product, idx) => {
                                          return (
                                                <Link to={`/products/${product._id}`} className="mt-2 group" onClick={handleClick}>
                                                      <div
                                                            key={idx}
                                                            className="  flex flex-col justify-center   items-center w-full md:w-11/12 lg:mx-2 text-black rounded"
                                                      >
                                                            <a className="block w-full relative md:h-[220px] h-[150px] rounded overflow-hidden">
                                                                  <img
                                                                        alt="ecommerce"
                                                                        className="thumbnail"
                                                                        srcSet={
                                                                              product?.featuredImage?.src
                                                                                    ? product?.featuredImage?.src
                                                                                    : product?.images[0]?.src
                                                                        }
                                                                        src={
                                                                              product?.featuredImage?.src
                                                                                    ? product?.featuredImage?.src
                                                                                    : product?.images[0]?.src
                                                                        }
                                                                  />
                                                            </a>
                                                            <div className="md:mt-4 mt-2 px-1 w-full text-start ">
                                                                  <h3 className="text-sm ptitle w-full mb-1 group-hover:text-indigo-500  overflow-hidden font-medium">
                                                                        {product?.name}
                                                                  </h3>

                                                                  {product?.price > 0 && product?.price !== product?.regular_price ? (
                                                                                          <div className="">
                                                                                                <p style={{ fontSize: '20px', lineHeight: '14px' }} className="pt-1 font-medium text-green-800 text-medium ">
                                                                                                      <span className="kalpurush" style={{ fontSize: '24px' }}>৳</span>
                                                                                                      {product?.price}
                                                                                                </p>
                                                                                                <p className="flex items-center text-sm pt-1 gap-2">
                                                                                                      <del className="flex items-center  text-gray-600 text-sm">
                                                                                                            <span className="kalpurush" style={{ fontSize: '22px' }}>৳</span>
                                                                                                            {product?.regular_price > 0
                                                                                                                  ? product?.regular_price
                                                                                                                  : product?.price}
                                                                                                      </del>
                                                                                                      -{Math.round(((product.regular_price - product.price) / product.regular_price * 100).toFixed(2))}%
                                                                                                </p>

                                                                                          </div>
                                                                                    ) : (
                                                                                          <div>
                                                                                                {" "}
                                                                                                <p style={{ fontSize: '20px', lineHeight: '14px' }} className="pt-1 font-medium text-green-800 text-medium ">
                                                                                                      <span className="kalpurush" style={{ fontSize: '24px' }}>৳</span>
                                                                                                      {product?.regular_price > 0
                                                                                                            ? product?.regular_price
                                                                                                            : product?.price}
                                                                                                </p>
                                                                                          </div>
                                                                                    )}
                                                            </div>
                                                      </div>
                                                </Link>
                                          );
                                    })}
                              </div>
                        </div>
                  </section>
            </div>
      );
};

export default SellerTopSellingProduct;
