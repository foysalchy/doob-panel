import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Interest = () => {
      return (
            <div>
                  <section className="bg-black 2xl:py-8 2xl:bg-gray-50">
                        <div className="px-4 mx-auto bg-black max-w-7xl sm:px-6 lg:px-8 2xl:rounded-xl">
                              <div className="py-10 sm:py-16 lg:py-24 2xl:pl-24">
                                    <div className="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-8 2xl:gap-x-20">
                                          <div className="lg:order-2 2xl:-mr-32">
                                                <img
                                                      className="w-full  rounded-xl"
                                                      src="https://i.ibb.co.com/nkJcyJy/image.png"
                                                      alt=""
                                                />
                                          </div>
                                          <div className="lg:order-1">
                                                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-snug">
                                                      Ready to grow your business
                                                      with Doob?
                                                </h2>
                                                <ul className="grid grid-cols-1 mt-4 sm:mt-10 sm:grid-cols-2 gap-x-10 xl:gap-x-16 gap-y-4 xl:gap-y-6">
                                                      <li className="flex items-center">
                                                            <svg
                                                                  className="flex-shrink-0 w-5 h-5 text-green-500"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 20 20"
                                                                  fill="currentColor"
                                                            >
                                                                  <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                  />
                                                            </svg>
                                                            <span className="ml-3 font-medium text-white">
                                                                  {" "}
                                                                  Scrape & Copy Products
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <svg
                                                                  className="flex-shrink-0 w-5 h-5 text-green-500"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 20 20"
                                                                  fill="currentColor"
                                                            >
                                                                  <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                  />
                                                            </svg>
                                                            <span className="ml-3 font-medium text-white">
                                                                  {" "}
                                                                  Batch Order Processing
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <svg
                                                                  className="flex-shrink-0 w-5 h-5 text-green-500"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 20 20"
                                                                  fill="currentColor"
                                                            >
                                                                  <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                  />
                                                            </svg>
                                                            <span className="ml-3 font-medium text-white">
                                                                  Customized Shipping Label
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <svg
                                                                  className="flex-shrink-0 w-5 h-5 text-green-500"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 20 20"
                                                                  fill="currentColor"
                                                            >
                                                                  <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                  />
                                                            </svg>
                                                            <span className="ml-3 font-medium text-white">
                                                                  {" "}
                                                                  Sync Inventory
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <svg
                                                                  className="flex-shrink-0 w-5 h-5 text-green-500"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 20 20"
                                                                  fill="currentColor"
                                                            >
                                                                  <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                  />
                                                            </svg>
                                                            <span className="ml-3 font-medium text-white">
                                                                  Automated Operations
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <svg
                                                                  className="flex-shrink-0 w-5 h-5 text-green-500"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 20 20"
                                                                  fill="currentColor"
                                                            >
                                                                  <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                  />
                                                            </svg>
                                                            <span className="ml-3 font-medium text-white">
                                                                  {" "}
                                                                  Watermark Template
                                                            </span>
                                                      </li>
                                                </ul>
                                                <div className="flex flex-col items-start mt-8 sm:space-x-4 sm:flex-row sm:items-center lg:mt-12">
                                                      <Link
                                                            to={'/sign-up'}

                                                            title=""
                                                            className="inline-flex items-center justify-center  py-4 text-base font-semibold text-white transition-all duration-200 px-8 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700"
                                                            role="button"
                                                      >

                                                            Get Started
                                                            <ChevronRight />
                                                      </Link>
                                                      <Link
                                                            to={'/price'}
                                                            title=""
                                                            className="inline-flex items-center justify-center px-8 py-4 mt-5 text-base font-semibold text-white transition-all duration-200 bg-transparent border border-white rounded-md sm:mt-0 hover:bg-white hover:text-black"
                                                            role="button"
                                                      >
                                                            {" "}
                                                            Explore Our Pricing
                                                      </Link>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

            </div>
      );
};

export default Interest;
