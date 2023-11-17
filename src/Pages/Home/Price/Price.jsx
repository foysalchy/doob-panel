import { useQuery } from "@tanstack/react-query";
import React from "react";

const Price = () => {
  const { data: prices = [], refetch } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/pricing");
      const data = await res.json();
      return data;
    },
  });




  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <section className="text-gray-600 body-font overflow-hidden">
        <div>
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
            </p>
            {/* <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
              <button className="py-1 px-4 bg-indigo-500 text-white focus:outline-none">
                Monthly
              </button>
              <button className="py-1 px-4 focus:outline-none">Annually</button>
            </div> */}
          </div>
          <div className="flex flex-wrap -m-4">
            {prices.map((price, index) => (
              <>
                {price.status && (
                  <>
                    {price.best == 'yes' ?
                      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                        <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                          <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                            POPULAR
                          </span>
                          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                            {price.name}
                          </h2>
                          <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                            <span>{price.price}</span>
                            <span className="text-lg ml-1 font-normal text-gray-500">/{price.timeDuration}</span>
                          </h1>
                          {
                            price.benefits.map((benefit, index) => (
                              <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20 6L9 17l-5-5" />
                                  </svg>
                                </span>
                                {benefit}
                              </p>
                            ))
                          }

                          <p className="text-xs text-gray-500 my-3">
                            {price.tagname}
                          </p>
                          <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                            Buy Now
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-4 h-4 ml-auto"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>

                        </div>
                      </div>
                      :
                      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                            {price.name}
                          </h2>
                          <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                            <span>{price.price}</span>
                            <span className="text-lg ml-1 font-normal text-gray-500">/{price.timeDuration}</span>
                          </h1>
                          {
                            price.benefits.map((benefit, index) => (
                              <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20 6L9 17l-5-5" />
                                  </svg>
                                </span>
                                {benefit}
                              </p>
                            ))
                          }
                          <p className="text-xs text-gray-500 my-3">
                            {price.tagname}
                          </p>
                          <button className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                            Buy Now
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-4 h-4 ml-auto"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>

                        </div>
                      </div>}
                  </>
                )}
              </>
            ))}
          </div>



        </div>

      </section>

    </div>
  );
};

export default Price;
