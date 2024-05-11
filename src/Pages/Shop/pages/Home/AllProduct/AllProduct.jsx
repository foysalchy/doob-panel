import React, { useContext, useEffect, useState } from "react";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const [displayedProducts, setDisplayedProducts] = useState(10);

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

  const handleLoadMore = () => {
    setDisplayedProducts((prev) => prev + 10);
    refetch();
  };



  return (
    <div className="bg-white py-4 mt-6">
      <div className=" bg-white pt-6 rounded mt-[-65px]">
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
              {/* <button
                type="button"
                className="px-5 py-2 font-semibold rounded bg-black text-gray-100 text-xs "
              >
                SHOP MORE
              </button> */}
            </div>
          </div>
          <div className="border-b border-gray-200 mx-5 mt-2"></div>
          <div className="container md:px-10 px-4 py-8 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 -m-4 text-black">
              {newProducts?.data?.slice(0, displayedProducts)?.map((product, idx) => {
                return (
                  <Link className="group overflow-hidden  border my-2 border-gray-500 border-opacity-90 p-3 rounded" key={product?._id} to={`product/${product?._id}`}>
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full md:h-[160px] h-[130px] block"
                        src={product?.featuredImage?.src ? product?.featuredImage?.src : product?.images[0]?.src}
                      />
                    </a>
                    <div className="mt-2">
                      <h2 className="text-black whitespace-nowrap title-font md:text-lg text-sm font-medium">
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
                        className="px-5 py-2 whitespace-nowrap font-semibold rounded bg-black text-white w-full mt-3 text-xs "
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
  );
};

export default AllProduct;
