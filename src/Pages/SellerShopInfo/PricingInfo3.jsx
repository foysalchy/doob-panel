import React, { useContext } from "react";
import { SellerShopInfoContext } from "../../SellerShopInfoProvider/UseSellerShopInfoProvider";
import { useQuery } from "@tanstack/react-query";

const PricingInfo3 = ({ handlePrevButton, handleFinalSubmit }) => {
  const { sellerShopInfo, setSellerShopInfo } = useContext(
    SellerShopInfoContext
  );
  const { data: prices = [], refetch } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/admin/pricing");
      const data = await res.json();
      return data;
    },
  });

  console.log(sellerShopInfo);
  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setUserData({ ...sellerShopInfo, [name]: value });
  //   };
  return (
    <div>
      <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <h2 className="text-xl font-medium mb-2">Pricing</h2>
        <div className="grid gap-3 grid-cols-2 py-5">
          {prices.map((price, index) => (
            <div>
              {price.status && (
                <div>
                  {price.best ? (
                    <div className="flex flex-col justify-between p-4 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
                      <div className="text-center">
                        <div className="font-semibold">{price?.name}</div>
                        <div className="flex items-center justify-center mt-2">
                          <div className="mr-1">{price?.price}</div>
                        </div>
                        <div className="mt-4 space-y-3">
                          {price.benefits.map((benefit, index) => (
                            <li className="flex items-center space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="flex-shrink-0 w-4 h-4 dark:text-gay-900"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="text-xs">{benefit}</span>
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex flex-col justify-between p-3 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow border-purple-400">
                      <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
                        <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-purple-400">
                          Most Popular
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {price.name}
                        </div>
                        <div className="flex items-center justify-center mt-2">
                          <div className="mr-1">{price?.price}</div>
                          <div className="text-gray-700 text-xs">
                            / {price.timeDuration}
                          </div>
                        </div>
                        <div className="mt-3 space-y-2 ">
                          {price.benefits.map((benefit, index) => (
                            <li className="flex items-center space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="flex-shrink-0 w-4 h-4 dark:text-gay-900"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="text-xs">{benefit}</span>
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 gap-3 flex justify-center items-center">
        <button
          onClick={handlePrevButton}
          className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
        >
          Prev
        </button>
        <button
          //   onClick={handleFinalSubmit}
          className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PricingInfo3;
