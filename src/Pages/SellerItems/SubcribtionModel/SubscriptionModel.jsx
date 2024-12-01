

import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import PriceModal from "../../Home/Price/PriceModal";
import SubscriptionInvoice from "./SubscriptionInvoice";

const SubscriptionModel = () => {
      const [open, setOpen] = useState(false);
      const { user, shopInfo } = useContext(AuthContext);
      const [services, setServices] = useState([]);
      const [showWarning, setShowWarning] = useState(false);

      const {
            data: prices = [],
            isLoading,
            isError,
            error,
            refetch: reload,
      } = useQuery({
            queryKey: ["subscriptionModal", shopInfo?.priceId, shopInfo?._id], // Make queryKey dependent on dynamic parameters
            queryFn: async () => {
                  if (!shopInfo?.priceId || !shopInfo?._id) {
                        throw new Error("Missing required parameters"); // Add error handling if priceId or shopId is missing
                  }
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo._id}`
                  );

                  if (!res.ok) {
                        throw new Error("Failed to fetch data from the server"); // Handle API errors
                  }

                  const data = await res.json();
                  return data?.data;
            },
            enabled: Boolean(shopInfo?.priceId && shopInfo?._id), // Only fetch when both priceId and shopId are available
      });





      const { data: CommissionHistory = [] } = useQuery({
            queryKey: ["commissionHistory"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-commission?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.history;
            },
      });

      const { data: pricesData = [], refetch } = useQuery({
            queryKey: ["pricesData"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/pricing"
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const [invoice, setInvoice] = useState(false);

      // const buyTi
      const showBuyingPrice = parseInt(prices?.orderInfo?.buyingPrice);


      const amount = parseInt(prices?.orderInfo?.amount);

      const calculatePassedDays = (startTime) => {
            const currentTime = Date.now();
            const passedTimeMs = currentTime - startTime;
            return Math.floor(passedTimeMs / (1000 * 60 * 60 * 24));
      };

      const calculateRemainingDays = (endTime) => {
            const currentTime = Date.now();
            const remainingTimeMs = endTime - currentTime;
            return Math.ceil(remainingTimeMs / (1000 * 60 * 60 * 24));
      };


      const passedDays = calculatePassedDays(prices?.orderInfo?.time_stamp);

      console.log(passedDays, "passedDays");
      const remainingDays = calculateRemainingDays(prices?.orderInfo?.endTime);
      const check_expired = () => {
            const paymentDate = new Date(shopInfo.paymentDate);
            const currentDate = new Date();

            const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
            const SEVEN_DAYS_IN_MILLISECONDS = 7 * MILLISECONDS_IN_A_DAY;

            // Calculate the time difference in milliseconds
            const timeDifference = currentDate.getTime() - paymentDate.getTime();

            // Check if the current date is within 7 days of the payment date
            const isWithinFreeTrial = timeDifference < SEVEN_DAYS_IN_MILLISECONDS;

            // Calculate remaining and passed days if `prices.orderInfo` is available
            if (prices.orderInfo) {
                  const remainingDays = Math.max(
                        0,
                        (paymentDate.getTime() +
                              SEVEN_DAYS_IN_MILLISECONDS -
                              currentDate.getTime()) /
                        MILLISECONDS_IN_A_DAY
                  );
                  const passedDays = Math.floor(timeDifference / MILLISECONDS_IN_A_DAY);

                  return remainingDays - passedDays > 0;
            } else {
                  return isWithinFreeTrial;
            }
      };


      const how_many_days = () => {
            const paymentDate = new Date(shopInfo.paymentDate);
            const currentDate = new Date();

            // Calculate the difference in milliseconds
            const diffInTime = currentDate - paymentDate;

            // Calculate total trial period in milliseconds (7 days)
            const totalTrialTime = 7 * 24 * 60 * 60 * 1000;

            // Calculate remaining time
            const remainingTime = totalTrialTime - diffInTime;

            // Convert remaining time to days, hours, and minutes
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

            // Calculate progress percentage
            const progress = ((totalTrialTime - remainingTime) / totalTrialTime) * 100;

            return { days, hours, minutes, progress };
      };


      const InfoCard = ({ title, value, icon, color }) => (
            <div className={`${color} rounded-xl p-6 text-white shadow-lg`}>
                  <div className="text-5xl mb-4">{icon}</div>
                  <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                  <p className="text-4xl font-bold">{value}</p>
            </div>
      );



      return (
            <div className="">
                  {!isLoading ? (
                        <div className=" text-black">
                              {remainingDays - passedDays <= 5 && (
                                    <div className="bg-orange-100 px-2 py-3 rounded- flex justify-between items-center">
                                          <p className="text-sm text-orange-800 capitalize ">
                                                Hi dear, only {remainingDays - passedDays} days left for your
                                                service. Please renew{" "}
                                                <button
                                                      onClick={() => setInvoice(true)}
                                                      className="bg-orange-500 px-4 ml-2 py-1 text-xs rounded text-black"
                                                >
                                                      Renew
                                                </button>
                                          </p>
                                          <div className="h-0 w-0">
                                                {invoice && (
                                                      <SubscriptionInvoice
                                                            pricesData={pricesData}
                                                            id={prices}
                                                            CommissionHistory={CommissionHistory}
                                                            setInvoice={setInvoice}
                                                            invoice={invoice}
                                                      />
                                                )}
                                          </div>
                                    </div>
                              )}

                              {check_expired() && !prices?.orderInfo && (
                                    <div className="bg-orange-100  px-2 py-3 rounded- flex justify-between items-center">
                                          <p className="text-sm text-orange-800 capitalize ">
                                                Hi dear, You using free trail. Please update your package
                                          </p>
                                          <div className="h-0 w-0">
                                                {invoice && (
                                                      <SubscriptionInvoice
                                                            pricesData={pricesData}
                                                            id={prices?._id}
                                                            CommissionHistory={CommissionHistory}
                                                            setInvoice={setInvoice}
                                                            invoice={invoice}
                                                      />
                                                )}
                                          </div>
                                    </div>
                              )}
                              {/* {console.log(prices?.orderInfo, "orderInfo")} */}
                              {!check_expired() && !prices?.orderInfo && (
                                    <div className="bg-orange-100  px-2 py-3 rounded- flex justify-between items-center">
                                          <p className="text-sm text-orange-800 capitalize ">
                                                Expired
                                                {/* <button
                onClick={() => setInvoice(true)}
                className="bg-orange-500 px-4 ml-2 py-1 text-xs rounded text-black"
              >
                Renew
              </button> */}
                                          </p>
                                          <div className="h-0 w-0">
                                                {invoice && (
                                                      <SubscriptionInvoice
                                                            pricesData={pricesData}
                                                            id={prices?._id}
                                                            CommissionHistory={CommissionHistory}
                                                            setInvoice={setInvoice}
                                                            invoice={invoice}
                                                      />
                                                )}
                                          </div>
                                    </div>
                              )}
                              <div className="container px-6  py-8 mx-auto">
                                    {(amount !== undefined && amount !== null && prices?.orderInfo) ? (
                                          <div className=" mx-auto p-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-2xl">
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-white mb-10 tracking-tight">
                                                      Your Package Status
                                                </h1>
                                                <div className="mb-10 text-center">
                                                      <p className="text-xl text-white font-medium">
                                                            Package Amount: <span className="font-bold text-yellow-300"><span className="kalpurush">৳</span> {amount}</span>
                                                      </p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                      <InfoCard
                                                            title="Days Active"
                                                            value={passedDays}
                                                            icon="⏳"
                                                            color="bg-pink-500"
                                                      />
                                                      <InfoCard
                                                            title="Remaining Days"
                                                            value={remainingDays}
                                                            icon="🗓️"
                                                            color="bg-green-500"
                                                      />
                                                      <InfoCard
                                                            title="Days to Expiry"
                                                            value={remainingDays - passedDays}
                                                            icon="⏰"
                                                            color="bg-yellow-500"
                                                      />
                                                </div>

                                          </div>

                                    ) : (
                                          ""
                                    )}

                                    {!prices?.orderInfo && (
                                          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto my-8 transform hover:scale-105 transition-transform duration-300">
                                                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                                                      Your Free Trial Status
                                                </h1>
                                                <div className="space-y-4">
                                                      <p className="text-2xl text-center text-gray-700">
                                                            You are currently using our <span className="font-semibold text-blue-600">free trial package</span>.
                                                      </p>
                                                      <div className="flex justify-center items-center space-x-4">
                                                            <span className="text-5xl font-bold text-green-500">{how_many_days().days}</span>
                                                            <span className="text-3xl font-medium text-gray-600">days</span>
                                                            <span className="text-4xl font-bold text-green-500">{how_many_days().hours}</span>
                                                            <span className="text-2xl font-medium text-gray-600">hours</span>
                                                            <span className="text-3xl font-bold text-green-500">{how_many_days().minutes}</span>
                                                            <span className="text-xl font-medium text-gray-600">minutes</span>
                                                      </div>
                                                      <p className="text-xl text-center text-gray-700 mt-4">
                                                            remaining in your trial period.
                                                      </p>
                                                </div>
                                                <div className="mt-8">
                                                      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                                                            <div
                                                                  className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-out"
                                                                  style={{ width: `${how_many_days().progress}%` }}
                                                            ></div>
                                                      </div>
                                                      <p className="text-center text-gray-600 mt-2">
                                                            {Math.round(how_many_days().progress)}% of trial period used
                                                      </p>
                                                </div>
                                          </div>
                                    )}

                                    {(amount !== undefined && amount !== null) ? (
                                          <div className="flex justify-center mt-8">
                                                <div className="w-full  bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg overflow-hidden">
                                                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                                                            <h2 className="text-2xl font-bold text-white">Order Information</h2>
                                                      </div>
                                                      <div className="p-6">
                                                            <ul className="space-y-4">
                                                                  <InfoItem label="Amount" value={`${amount || 0}`} icon="💰" />
                                                                  <InfoItem
                                                                        label="Buying Price"
                                                                        value={`${prices?.orderInfo?.buyingPrice || 0}`}
                                                                        icon="🏷️"
                                                                  />
                                                                  <InfoItem
                                                                        label="Discount"
                                                                        value={`${prices?.orderInfo?.time?.split(",")[0] || 0} `}
                                                                        icon="🎉"
                                                                  />
                                                            </ul>
                                                      </div>
                                                </div>
                                          </div>
                                    ) : (
                                          ""
                                    )}

                                    <div className="flex gap-3 justify-center mt-8">
                                          <PriceModal refetch={reload} open={open} setOpen={setOpen} />

                                          <Link to={`/price`}>
                                                <div className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4  focus:outline-none hover:bg-indigo-600 rounded">
                                                      Update your plan
                                                </div>
                                          </Link>
                                          {prices?.orderInfo && (
                                                <button
                                                      onClick={() => setOpen(prices?.result)}
                                                      className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4  focus:outline-none hover:bg-indigo-600 rounded"
                                                >
                                                      Renew
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
                                          )}
                                    </div>
                              </div>
                        </div>
                  ) : (
                        <div className="flex justify-center items-center h-screen">
                              Data is load on Database
                        </div>
                  )}
            </div>
      );
};
export default SubscriptionModel;





const InfoItem = ({ label, value, icon }) => (
      <li className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label={label}>
                        {icon}
                  </span>
                  <span className="text-gray-600 font-medium">{label}</span>
            </div>
            <span className="text-indigo-600 font-bold">{value} <span className="kalpurush">৳</span></span>
      </li>
)
