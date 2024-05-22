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
        `http://localhost:5001/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo._id}`
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
      const remainingDays = Math.max(0, (paymentDate.getTime() + SEVEN_DAYS_IN_MILLISECONDS - currentDate.getTime()) / MILLISECONDS_IN_A_DAY);
      const passedDays = Math.floor(timeDifference / MILLISECONDS_IN_A_DAY);

      return remainingDays - passedDays > 0;
    } else {
      return isWithinFreeTrial;
    }
  };

  return (
    <div className="">
      {!isLoading ?
        <div className="bg-white text-black">
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

          {(check_expired() && !prices?.orderInfo) && (
            <div className="bg-orange-100  px-2 py-3 rounded- flex justify-between items-center">
              <p className="text-sm text-orange-800 capitalize ">
                Hi dear, You using free trail. Please update your package
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
          {console.log(prices?.orderInfo, "orderInfo")}
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


            <div className="flex gap-3 justify-center mt-8">

              <PriceModal refetch={reload} open={open} setOpen={setOpen} />

              <Link to={`/price`}>
                <div className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4  focus:outline-none hover:bg-indigo-600 rounded">
                  Update
                </div>
              </Link>
              {prices?.orderInfo && <button
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
              </button>}
            </div>
          </div>
        </div> : <div className="flex justify-center items-center h-screen">
          Data is load on Database
        </div>
      }
    </div>
  );
};
export default SubscriptionModel;