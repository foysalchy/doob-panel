import React, { useContext, useEffect } from "react";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const { shop_id } = useContext(ShopAuthProvider);
  // console.log(`https://backend.doob.com.bd/api/v1/shop/product/${shop_id.shop_id}/all-product?limit=20`);
  const { data: newProducts = [], refetch } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/product/${shop_id.shop_id}/all-product?limit=20`
      );
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [shop_id])
  return (
    <div>
      <div className="py-4 bg-white rounded mt-6">
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

                <h3 className="whitespace-nowrap ml-2 font-medium">For You</h3>
              </div>
              <button
                type="button"
                className="px-5 py-2 font-semibold rounded bg-black text-gray-100 text-xs "
              >
                SHOP MORE
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200 mx-5 mt-2"></div>
          <div className="container px-10 py-8 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 -m-4 text-black">
              {newProducts?.data?.map((product, idx) => {
                return (
                  <Link key={product?._id} to={`product/${product?._id}`}>
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full md:h-[160px] h-[130px] block"
                        src={product?.featuredImage?.src}
                      />
                    </a>
                    <div className="mt-2">
                      <h2 className="text-black title-font md:text-lg text-sm font-medium">
                        {product?.name.slice(0, 18)}..
                      </h2>
                      <div className="flex items-center gap-10 text-black">
                        <del className="flex items-center ">
                          <span className="kalpurush">৳ </span>
                          {product?.regular_price}
                        </del>
                        <p className="">
                          <span className="kalpurush">৳</span>
                          {product?.price}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="px-5 py-2  font-semibold rounded bg-black text-white w-full mt-3 text-xs "
                      >
                        Add to card
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="px-5 py-2  font-semibold rounded bg-black text-white text-xs "
        >
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default AllProduct;
