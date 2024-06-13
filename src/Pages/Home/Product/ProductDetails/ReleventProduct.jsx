import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
    !releventProduct.every((item) => Array.isArray(item.adminCategory))
  ) {
    console.error("Invalid data format for releventProduct.");
    return null;
  }

  const relevantProducts = releventProduct.filter((product) =>
    product.adminCategory.some((category) =>
      productFind.adminCategory.includes(category)
    )
  );

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
            {relevantProducts.slice(0, 7).map((product, idx) => {
              return (
                <Link to={`/products/${product._id}`} className="mt-2 group" onClick={handleClick}>
                  <div
                    key={idx}
                    className="md:p-4 p-1 flex flex-col justify-center border items-center w-full md:w-11/12 lg:mx-2 text-black rounded"
                  >
                    <a className="block w-full relative md:h-[220px] h-[150px] rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover w-full h-full block border rounded"
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
                      <h3 className="text-md w-full mb-1 group-hover:text-indigo-500 h-[52px] overflow-hidden font-medium">
                        {product?.name.slice(0, 60)}
                      </h3>

                      <div className="flex justify-start gap-4 mt-3">
                        <p className="tracking-wide ">
                          {user ? (
                            <div className="flex items-center gap-3">
                              <div className="text-indigo-500 text-xl">
                                <span className="kalpurush text-2xl">৳</span>
                                <span>{user ? product?.price : 0}</span>
                              </div>
                              <del className="text-gray-500">
                                {" "}
                                ৳
                                {product.discountPrice
                                  ? product.discountPrice
                                  : 0}
                              </del>
                            </div>
                          ) : (
                            <Link
                              className="text-[12px] text-blue-500"
                              to={"/sign-up"}
                            >
                              Login to view Price
                            </Link>
                          )}
                        </p>
                      </div>
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

export default ReleventProduct;
