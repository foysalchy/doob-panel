import { useQuery } from "@tanstack/react-query";
import React from "react";

const Price = () => {
  const { data: prices = [], refetch } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch("https://salenow-v2-backend.vercel.app/admin/pricing");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
            Our Pricing
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="7e5e8ff8-1960-4094-a63a-2a0c0f922d69"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#7e5e8ff8-1960-4094-a63a-2a0c0f922d69)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Transparent</span>
          </span>{" "}
          pricing. Pay as you grow.
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque rem aperiam, eaque ipsa quae.
        </p>
      </div>
      <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
        {prices.map((price, index) => (
          <div>
            {price.status && (
              <div>
                {price.best ? (
                  <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{price.name}</div>
                      <div className="flex items-center justify-center mt-2">
                        <div className="mr-1 text-5xl font-bold">
                          {price.price}
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        {price.benefits.map((benefit, index) => (
                          <li className="flex items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="flex-shrink-0 w-6 h-6 dark:text-gay-900"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </div>
                    </div>
                    <div>
                      <a
                        href="/"
                        className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                      >
                        {price.price == "Free" ? "Start for free" : "Buy Now"}
                      </a>
                      <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                        {price.tagname}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow border-purple-400">
                    <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
                      <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-purple-400">
                        Most Popular
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{price.name}</div>
                      <div className="flex items-center justify-center mt-2">
                        <div className="mr-1 text-5xl font-bold">
                          {price.price}
                        </div>
                        <div className="text-gray-700">
                          / {price.timeDuration}
                        </div>
                      </div>
                      <div className="mt-4 space-y-3 ">
                        {price.benefits.map((benefit, index) => (
                          <li className="flex items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="flex-shrink-0 w-6 h-6 dark:text-gay-900"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </div>
                    </div>
                    <div>
                      <a
                        href="/"
                        className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                      >
                        Buy Now
                      </a>
                      <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                        {price.tagname}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Price;
