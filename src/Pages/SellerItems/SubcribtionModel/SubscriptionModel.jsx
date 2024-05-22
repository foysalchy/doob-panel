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

  const { data: prices = {}, isLoading, refetch: reload } = useQuery({
    queryKey: ["subscriptionModal"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data?.data;
    },
  });

  console.log(prices);


  const { data: CommissionHistory = [] } = useQuery({
    queryKey: ["commissionHistory"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/get-commission?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      console.log(data);
      return data.history;
    },
  });

  const { data: pricesData = [], refetch } = useQuery({
    queryKey: ["pricesData"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/pricing"
      );
      const data = await res.json();
      return data;
    },
  });


  console.log(prices.orderInfo, "orderInfo");



  // const showWarningIfNeeded = () => {
  //   if (daysPassed > 0 && daysPassed <= 5) {
  //     setShowWarning(true);
  //   } else {
  //     setShowWarning(false);
  //   }
  // };

  // Use useEffect to trigger the warning check on component mount and when daysPassed changes
  // useEffect(() => {
  //   showWarningIfNeeded();
  // }, [daysPassed]);



  const [invoice, setInvoice] = useState(false);

  // const buyTi
  const showBuyingPrice = parseInt(prices?.orderInfo?.buyingPrice);

  console.log(prices.orderInfo);

  const amount = parseInt(prices?.orderInfo?.amount)

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
  const remainingDays = calculateRemainingDays(prices?.orderInfo?.endTime);

  console.log(CommissionHistory);
  return (
    <div className="">
      {!isLoading ? <div className="bg-white text-black">
        {(remainingDays - passedDays <= 5) && (
          <div className="bg-orange-100 px-2 py-3 rounded- flex justify-between items-center">
            <p className="text-sm text-orange-800 capitalize ">
              Hi dear, only {remainingDays - passedDays} days left for your service. Please renew{" "}
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

        {(!prices?.orderInfo) && (
          <div className="bg-orange-100 px-2 py-3 rounded- flex justify-between items-center">
            <p className="text-sm text-orange-800 capitalize ">
              Hi dear, Your free trial is end. Please renew{" "}
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
                  id={prices?._id}
                  CommissionHistory={CommissionHistory}
                  setInvoice={setInvoice}
                  invoice={invoice}
                />
              )}
            </div>
          </div>
        )}
        <div className="container px-6 py-8 mx-auto">
          {amount ? (
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
              {`The number of days that have passed since your package activation is ${passedDays} days. The remaining validity of your package is ${remainingDays} days. And Remaining Date is ${remainingDays - passedDays} Days`}
            </h1>
          ) : ''}

          {amount ? <div className="flex justify-center mt-3">
            <div className="w-[300px] bg-[#0000ff08] text-center border-2 border-blue-400 p-3 rounded">
              <h2 className="font-semibold pb-2">Order Information:</h2>
              <ul>
                <li className="text-sm text-gray-500">
                  {/* parseInt(open?.price) * parseInt(time?.split(',')[1]) - parseInt(time?.split(',')[0]) */}
                  <span className=" text-black">Amount :</span>{" "}
                  {amount ? amount : 0} {" "}
                  ৳
                </li>
                <li className="text-sm text-gray-500 ">
                  <span className=" text-black">Buying Price :</span>{" "}
                  {prices?.orderInfo?.buyingPrice ? prices?.orderInfo?.buyingPrice : 0} ৳
                </li>
                <li className="text-sm text-gray-500 ">
                  <span className=" text-black">Discount Price :</span>{" "}
                  {prices?.orderInfo?.time?.split(",")[0]} ৳
                </li>
              </ul>
            </div>
          </div> : ''}

          {/* <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3 xl:mt-12">

                    {
                        pricesData?.map(data => {
                            return (
                                <div>

                                    {data._id === prices?._id &&

                                        <div key={data?._id} className="flex items-center justify-between px-8 py-4 border border-blue-500 cursor-pointer rounded-xl">
                                            <div className="flex flex-col items-center space-y-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-blue-600  sm:h-7 sm:w-7"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <h2 className="text-lg font-medium text-gray-700 sm:text-xl ">
                                                    {data?.name}
                                                </h2>
                                            </div>
                                            <div className="flex flex-col items-center space-y-1">

                                                <h2 className="text-2xl font-semibold text-blue-600  sm:text-3xl">
                                                    ${data?.price} <span className="text-base font-medium">/{data?.timeDuration}</span>
                                                </h2>
                                            </div>
                                        </div>


                                    }
                                </div>
                            )
                        }
                        )
                    }
                </div> */}

          {/* list */}
          {/* <div className="p-8 mt-8 space-y-8 bg-gray-100  rounded-xl">
                    {
                        prices?.benefits?.map(benefit => <div className="flex items-center justify-between text-gray-800 ">
                            <p className="text-lg sm:text-xl">{benefit}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-blue-500 sm:h-7 sm:w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>)

                    }
                    {
                        prices?.permissions?.map(benefit => <div className="flex items-center justify-between text-gray-800 ">
                            <p className="text-lg sm:text-xl">{benefit.name}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-blue-500 sm:h-7 sm:w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>)
                    }
                </div> */}
          <div className="flex gap-3 justify-center mt-8">
            {/* <Link to={`/price`} className="px-8 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Renew
                    </Link> */}
            <PriceModal refetch={reload} open={open} setOpen={setOpen} />

            <Link to={`/price`}>
              <div className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4  focus:outline-none hover:bg-indigo-600 rounded">
                Update
              </div>
            </Link>
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
          </div>
        </div>
      </div> : <div className="flex justify-center items-center h-screen">
        Data is load on Database
      </div>}
    </div>
  );
};
export default SubscriptionModel;