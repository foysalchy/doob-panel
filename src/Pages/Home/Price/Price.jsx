import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { CgCheck } from "react-icons/cg";
import PriceModal from "./PriceModal";
import { Link, useNavigate } from "react-router-dom";
import MetaHelmet from "../../../Helmate/Helmate";

const Price = () => {
      const { shopInfo } = useContext(AuthContext);
      const [open, setOpen] = useState(false);
      const { data: prices = [], refetch } = useQuery({
            queryKey: ["prices"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/pricing"
                  );
                  const price = await res.json();
                  // need to data sort by Timestamp
                  const data = price.sort((a, b) => a.price - b.price);
                  return data;
            },
      });

      const { data: permission = [], loader } = useQuery({
            queryKey: ["prices"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();

                  return data?.data?.result;
            },
      });


      const navigate = useNavigate()

      return (
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                  <MetaHelmet title="Pricing" description="Here we offer low cost website installation packages" />
                  <section className="text-gray-600 body-font bar overflow-hidden">
                        <div>
                              <section className="">
                                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                          <div className="max-w-3xl mx-auto text-center">
                                                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                                                      Pricing &amp; Plans
                                                </h2>
                                                <p className="max-w-3xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                                                      Discover flexible pricing plans tailored for every vendor, from startups to established businesses. Enjoy robust features and support designed to boost your online success and drive growth.
                                                </p>
                                          </div>
                                          <div className="grid   grid-cols-1 lg:gap-6  gap-2 mx-auto mt-2 text-center lg:max-w-full lg:mt-16 lg:grid-cols-3 md:grid-cols-2">
                                                {!prices?.length ? "" :
                                                      prices?.map((price, index) => (
                                                            <div key={index}>
                                                                  <PriceModal open={open} refetch={refetch} setOpen={setOpen} />
                                                                  {price?.status && (
                                                                        <>
                                                                              {price?.best == "yes" ? (

                                                                                    <div
                                                                                          className={`bar overflow-hidden bg-white border-2 border-gray-100 rounded-md shadow-lg flex flex-col h-full ${price._id === shopInfo?.priceId
                                                                                                ? "border-green-500"
                                                                                                : " "
                                                                                                }  `}
                                                                                    >
                                                                                          <div className="p-8 xl:px-12 flex flex-col flex-grow">
                                                                                                <h3 className="text-base font-semibold text-purple-600">
                                                                                                      {price.name}
                                                                                                </h3>
                                                                                                <p className="text-5xl font-bold text-black mt-7">
                                                                                                      <span className="kalpurush">৳</span>{price.price}
                                                                                                </p>
                                                                                                <p className="mt-3 text-base text-gray-600">{price?.tagname}</p>
                                                                                                <ul className="inline-flex flex-col items-start space-y-5 text-left mt-9">
                                                                                                      {price.benefits.map((benefit, index) => (
                                                                                                            benefit.trim() !== '' && (
                                                                                                                  <li key={index} className="inline-flex items-center space-x-2">
                                                                                                                        <svg
                                                                                                                              className="flex-shrink-0 w-5 h-5 text-indigo-500"
                                                                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                                                                              viewBox="0 0 20 20"
                                                                                                                              fill="currentColor"
                                                                                                                        >
                                                                                                                              <path
                                                                                                                                    fillRule="evenodd"
                                                                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                                                                    clipRule="evenodd"
                                                                                                                              />
                                                                                                                        </svg>
                                                                                                                        <span className="text-base font-medium text-gray-900">
                                                                                                                              {benefit}
                                                                                                                        </span>
                                                                                                                  </li>
                                                                                                            )
                                                                                                      ))}
                                                                                                </ul>
                                                                                          </div>
                                                                                          <div className=" pb-8">
                                                                                                <button
                                                                                                      onClick={() => { shopInfo ? setOpen(price) : navigate("/sign-in") }}
                                                                                                      className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                                                                                                      role="button"
                                                                                                >
                                                                                                      Buy this plan
                                                                                                </button>
                                                                                                <p className="mt-4 text-sm text-gray-500">
                                                                                                      {price.timeDuration} Payment
                                                                                                </p>
                                                                                          </div>
                                                                                    </div>
                                                                              ) : (
                                                                                    <div className={`bar overflow-hidden bg-white border-2 border-gray-100 rounded-md shadow-lg h-full flex flex-col justify-between ${price._id === shopInfo?.priceId
                                                                                          ? "border-green-500"
                                                                                          : " "
                                                                                          }  `}
                                                                                    > <div className="p-8 xl:px-12">
                                                                                                <h3 className="text-base font-semibold text-purple-600">{price.name}</h3>
                                                                                                <p className="text-5xl font-bold text-black mt-7"><span className="kalpurush">৳</span>{price.price}</p>
                                                                                                <p className="mt-3 text-base text-gray-600">{price?.tagname}</p>
                                                                                                <ul className="inline-flex flex-col items-start space-y-5 text-left mt-9">
                                                                                                      {price.benefits.map((benefit, index) => (
                                                                                                            benefit.trim() !== '' && (
                                                                                                                  <li key={index} className="inline-flex items-center space-x-2">
                                                                                                                        <svg
                                                                                                                              className="flex-shrink-0 w-5 h-5 text-indigo-500"
                                                                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                                                                              viewBox="0 0 20 20"
                                                                                                                              fill="currentColor"
                                                                                                                        >
                                                                                                                              <path
                                                                                                                                    fillRule="evenodd"
                                                                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                                                                    clipRule="evenodd"
                                                                                                                              />
                                                                                                                        </svg>
                                                                                                                        <span className="text-base font-medium text-gray-900">
                                                                                                                              {benefit}
                                                                                                                        </span>
                                                                                                                  </li>
                                                                                                            )
                                                                                                      ))}
                                                                                                </ul>
                                                                                          </div>
                                                                                          <div className="pb-8">
                                                                                                <button
                                                                                                      onClick={() => { shopInfo ? setOpen(price) : navigate("/sign-in") }}
                                                                                                      className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
                                                                                                      role="button"
                                                                                                >
                                                                                                      Buy this plan
                                                                                                </button>
                                                                                                <p className="mt-4 text-sm text-gray-500">
                                                                                                      {price.timeDuration} Payment
                                                                                                </p>
                                                                                          </div>
                                                                                    </div>


                                                                              )}
                                                                        </>
                                                                  )}
                                                            </div>
                                                      ))}
                                          </div>

                                    </div>
                              </section>


                              <Component />
                        </div>
                  </section>
            </div>
      );
};

export default Price;

const Component = () => {
      return (
            // <div className="md:flex  justify-center py-12">
            //       <div className="md:mx-4 bg-white rounded-lg shadow-lg p-6 w-full border border-gray-200 md:max-w-md">
            //             <div className="flex items-center space-x-4 mb-6">
            //                   <div className="bg-blue-200 p-2 rounded-full">
            //                         <PersonStandingIcon className="text-blue-800 h-8 w-8" />
            //                   </div>
            //                   <div>
            //                         <h2 className="text-xl font-semibold">All-Access</h2>
            //                         <p className="text-gray-600">For your shop</p>
            //                   </div>
            //             </div>

            //             <p className="mb-6">
            //                   Allowed to share the access with up to 05 members (five seats) You can
            //                   also add an additional 5 new members to your parent account, allowing
            //                   them to access team account files without any extra cost!
            //             </p>
            //             <Link
            //                   to={"/seller/support-tickets"}
            //                   className="bg-blue-600 text-white rounded-md px-4 py-2 w-full transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            //             >
            //                   Get All-Access - For your shop
            //             </Link>
            //       </div>

            //       <div className="md:mx-4 md:mt-0 mt-4 border border-gray-200 bg-white rounded-lg shadow-lg p-6 w-full md:max-w-md">
            //             <div className="flex items-center space-x-4 mb-6">
            //                   <div className="bg-blue-200 p-2 rounded-full">
            //                         <SearchIcon className="text-blue-800 h-8 w-8" />
            //                   </div>
            //                   <div>
            //                         <h2 className="text-xl font-semibold">
            //                               Get unlimited access for your team
            //                         </h2>
            //                   </div>
            //             </div>
            //             <div className="flex items-center space-x-4 mb-6">
            //                   <div className="bg-blue-200 p-2 rounded-full">
            //                         <FolderSyncIcon className="text-blue-800 h-8 w-8" />
            //                   </div>
            //                   <p className="text-xl">
            //                         Lifetime access to all components and templates with free updates
            //                   </p>
            //             </div>
            //             <div className="flex items-center space-x-4">
            //                   <div className="bg-blue-200 p-2 rounded-full">
            //                         <MenuIcon className="text-blue-800 h-8 w-8" />
            //                   </div>
            //                   <p className="text-xl">
            //                         Get instant access to all free 13 Bonus Templates (Worth $220)
            //                   </p>
            //             </div>
            //       </div>
            // </div>
            <section className="py-12 bg-white sm:py-16 lg:py-20">
                  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                                    Customize Your Business Plan for Optimal Growth
                              </h2>
                        </div>
                        <div className="relative max-w-5xl mx-auto mt-8 md:mt-16">
                              <div className="absolute -inset-4">
                                    <div
                                          className="w-full h-full mx-auto opacity-30 blur-lg filter"
                                          style={{
                                                background:
                                                      "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                                          }}
                                    />
                              </div>
                              <div className="relative bar overflow-hidden bg-gray-900 rounded-2xl">
                                    <div className="px-16 py-8 sm:px-8 lg:px-16 lg:py-14">
                                          <div className="md:flex md:items-center md:space-x-12 lg:space-x-24">
                                                <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-12 xl:gap-x-24">
                                                      <div>
                                                            <ul className="space-y-3 text-base font-medium text-white font-pj">
                                                                  <li className="flex items-center">
                                                                        <svg
                                                                              className="w-5 h-5 mr-2"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M5 13l4 4L19 7"
                                                                              />
                                                                        </svg>
                                                                        Unlimited members
                                                                  </li>
                                                                  <li className="flex items-center">
                                                                        <svg
                                                                              className="w-5 h-5 mr-2"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M5 13l4 4L19 7"
                                                                              />
                                                                        </svg>
                                                                        Unlimited admin accounts
                                                                  </li>
                                                                  <li className="flex items-center">
                                                                        <svg
                                                                              className="w-5 h-5 mr-2"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M5 13l4 4L19 7"
                                                                              />
                                                                        </svg>
                                                                        Unlimited Storage
                                                                  </li>
                                                            </ul>
                                                      </div>
                                                      <div>
                                                            <ul className="space-y-3 text-base font-medium text-white font-pj">
                                                                  <li className="flex items-center">
                                                                        <svg
                                                                              className="w-5 h-5 mr-2"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M5 13l4 4L19 7"
                                                                              />
                                                                        </svg>
                                                                        Unlimited Custom domain
                                                                  </li>
                                                                  <li className="flex items-center">
                                                                        <svg
                                                                              className="w-5 h-5 mr-2"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M5 13l4 4L19 7"
                                                                              />
                                                                        </svg>
                                                                        Unlimited Products
                                                                  </li>
                                                                  <li className="flex items-center">
                                                                        <svg
                                                                              className="w-5 h-5 mr-2"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M5 13l4 4L19 7"
                                                                              />
                                                                        </svg>
                                                                        Unlimited Daraz Account
                                                                  </li>
                                                            </ul>
                                                      </div>
                                                </div>
                                                <div className="block md:hidden lg:block">
                                                      <div className="hidden lg:block">
                                                            <svg
                                                                  className="w-4 h-auto text-gray-600"
                                                                  viewBox="0 0 16 123"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 11)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 46)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 81)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 116)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 18)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 53)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 88)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 123)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 25)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 60)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 95)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 32)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 67)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 102)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 39)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 74)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 109)"
                                                                  />
                                                            </svg>
                                                      </div>
                                                      <div className="block mt-10 md:hidden">
                                                            <svg
                                                                  className="w-auto h-4 text-gray-600"
                                                                  viewBox="0 0 172 16"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"
                                                                  />
                                                                  <line
                                                                        y1="-0.5"
                                                                        x2="18.0278"
                                                                        y2="-0.5"
                                                                        transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"
                                                                  />
                                                            </svg>
                                                      </div>
                                                </div>
                                                <div className="">

                                                      <Link
                                                            to={'/seller/support-tickets'}
                                                            title=""
                                                            className="
                              inline-flex
                              items-center
                              justify-center
                              px-9
                              py-3.5

                              text-base
                              font-bold
                              text-gray-900
                              transition-all
                              duration-200
                              bg-white
                              border border-transparent
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                              font-pj
                              hover:bg-opacity-90
                              rounded-xl
                          "
                                                            role="button"
                                                      >
                                                            Contact
                                                      </Link>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                  </div>
            </section>

      );
};

function FolderSyncIcon(props) {
      return (
            <svg
                  {...props}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
            >
                  <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1" />
                  <path d="M12 10v4h4" />
                  <path d="m12 14 1.5-1.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5c.4.4.8 1 1 1.5" />
                  <path d="M22 22v-4h-4" />
                  <path d="m22 18-1.5 1.5c-.9.9-2.1 1.5-3.5 1.5s-2.6-.6-3.5-1.5c-.4-.4-.8-1-1-1.5" />
            </svg>
      );
}

function MenuIcon(props) {
      return (
            <svg
                  {...props}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
            >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
      );
}

function PersonStandingIcon(props) {
      return (
            <svg
                  {...props}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
            >
                  <circle cx="12" cy="5" r="1" />
                  <path d="m9 20 3-6 3 6" />
                  <path d="m6 8 6 2 6-2" />
                  <path d="M12 10v4" />
            </svg>
      );
}

function SearchIcon(props) {
      return (
            <svg
                  {...props}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
            >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
            </svg>
      );
}







{/* <div
                                                                              key={index}
                                                                              className="p-4 xl:w-1/4 md:w-1/2 w-full"
                                                                        >
                                                                              <div
                                                                                    className={`h-full p-6 rounded-lg border-2  flex flex-col  relative bar overflow-hidden ${price._id === shopInfo?.priceId
                                                                                          ? "border-indigo-500"
                                                                                          : "border-gray-300"
                                                                                          }  `}
                                                                              >
                                                                                    <div className="flex  h-full flex-col justify-between">
                                                                                          <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                                                                                                {price?.tagname}
                                                                                          </span>
                                                                                          <div className=" ">
                                                                                                <h2 className="text-md text-black font-semibold">
                                                                                                      {price.name}
                                                                                                </h2>

                                                                                                <hr />
                                                                                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium"></h2>

                                                                                                {price.benefits.map((benefit, index) => (
                                                                                                      // Check if benefit is not empty before rendering
                                                                                                      benefit.trim() !== '' && (
                                                                                                            <p key={index} className="flex items-center text-gray-600 mb-2">
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
                                                                                                      )
                                                                                                ))}


                                                                                          </div>
                                                                                          <div>
                                                                                                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4   border-gray-200">
                                                                                                      <span>৳{price.price}</span>
                                                                                                      <span className="text-lg ml-1 font-normal text-gray-500">
                                                                                                            /{price.timeDuration}
                                                                                                      </span>
                                                                                                </h1>
                                                                                                <>
                                                                                                      {shopInfo ? (
                                                                                                            <button
                                                                                                                  onClick={() => setOpen(price)}
                                                                                                                  className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                                                                                            >
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
                                                                                                      ) : (
                                                                                                            <Link
                                                                                                                  to={"/sign-up"}
                                                                                                                  className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                                                                                            >
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
                                                                                                            </Link>
                                                                                                      )}
                                                                                                </>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </div> */}




















{/* <div className="p-4 xl:w-1/4 md:w-1/2  w-full">
                                                                              <div
                                                                                    className={`h-full p-6 rounded-lg border-2  flex flex-col  relative bar overflow-hidden ${price._id === shopInfo?.priceId
                                                                                          ? "border-500-500 bg-slate-200"
                                                                                          : "border-gray-300"
                                                                                          }  `}
                                                                              >
                                                                                    {price._id === shopInfo?.priceId && (
                                                                                          <div className="font-bold text-green-500 mb-2 text-lg text-center border-b-2 border-green-500 ">
                                                                                                Running Package
                                                                                          </div>
                                                                                    )}
                                                                                    <div className="flex  h-full  flex-col justify-between">
                                                                                          <div className=" ">
                                                                                                <h2 className="text-md text-black font-semibold">
                                                                                                      {price.name}
                                                                                                </h2>

                                                                                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium"></h2>

                                                                                                {price.benefits.map((benefit, index) => (
                                                                                                      // Check if benefit is not empty before rendering
                                                                                                      benefit && (
                                                                                                            <p key={index} className="flex items-center text-gray-600 mb-2">
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
                                                                                                      )
                                                                                                ))}



                                                                                          </div>
                                                                                          <div>
                                                                                                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4   border-gray-200">
                                                                                                      <span>{price.price}</span>
                                                                                                      <span className="text-lg ml-1 font-normal text-gray-500">
                                                                                                            /{price.timeDuration}
                                                                                                      </span>
                                                                                                </h1>
                                                                                                <>
                                                                                                      {shopInfo ? (
                                                                                                            <button
                                                                                                                  onClick={() => setOpen(price)}
                                                                                                                  className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                                                                                            >
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
                                                                                                      ) : (
                                                                                                            <Link
                                                                                                                  to={"/sign-up"}
                                                                                                                  className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                                                                                            >
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
                                                                                                            </Link>
                                                                                                      )}
                                                                                                </>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </div> */}
