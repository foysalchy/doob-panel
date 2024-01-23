import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const ForYouProducts = () => {

  const { user } = useContext(AuthContext)
  const [displayedProducts, setDisplayedProducts] = useState(14);

  const { data: newProducts = [], refetch } = useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => {
      const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/products");
      const data = await res.json();
      return data;
    },
  });

  function extractTextFromHTML(htmlString) {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  }

  const handleLoadMore = () => {
    setDisplayedProducts((prev) => prev + 15);
    refetch();
  };

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
          <div className="container px-5 py-8 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 -m-4 text-black">
              {newProducts?.slice(0, displayedProducts)?.map((product, idx) => {
                let name = product?.name?.slice(0, 60);
                return (

                  <Link to={`${product._id}`} className="space-y-2">
                    <img
                      alt="Ceramic Coffee Mug"
                      className="h-[200px] w-full rounded-md object-cover"
                      height="200"
                      srcSet={product?.featuredImage?.src}
                      src={product?.featuredImage?.src}
                      style={{
                        aspectRatio: "200/200",
                        objectFit: "cover",
                      }}
                      width="200"
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold">{product?.regular_price}</span>
                      <span className="text-sm font-medium">
                        {name}...
                      </span>

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
          onClick={handleLoadMore}
          type="button"
          className="px-5 py-2  font-semibold rounded bg-black text-white text-xs "
        >
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default ForYouProducts;
