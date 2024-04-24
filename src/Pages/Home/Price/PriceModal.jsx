import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import { useNavigate } from "react-router-dom";

const PriceModal = ({ open, setOpen }) => {
  const { shopInfo, setShopInfo, setCookie } = useContext(AuthContext);
  const [paymentMode, setPaymentMode] = useState(false);
  const [selectGetWay, setSelectGetWay] = useState(false);
  const navigate = useNavigate()
  const [time, setTime] = useState(`${open.six},6`)
  console.log(time);

  const resetForm = () => {
    // setPaymentMode(false);
    setSelectGetWay(false);
    setTime('20,6'); // Reset time to default value
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    setPaymentMode(!paymentMode);
    resetForm()
  };

  const {
    data: getawayData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getawayData"],
    queryFn: async () => {
      const res = await fetch(
        "https://salenow-v2-backend.vercel.app/api/v1/admin/getaway"
      );
      const data = await res.json();
      return data;
    },
  });


  const {
    data: possibility,
  } = useQuery({
    queryKey: ["possibility"],
    queryFn: async () => {
      const res = await fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/seller/check-free-trail?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.possible
    },
  });



  const handleSubmit = () => {


    console.log({
      paymentId: open?._id,
      shopId: shopInfo._id,
      getway: 'Cash',
      amount: open?.price,
      priceName: open?.name,
      time,

    }
    );

    if (shopInfo) {
      fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/seller/update-payment?shopId=${shopInfo._id}&paymentId=${open?._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            paymentId: open?._id,
            shopId: shopInfo._id,
            getway: 'Cash',
            amount: open?.price,
            priceName: open?.name,
            time,
            buyingPrice: parseInt(open?.price) * parseInt(time?.split(',')[1]) - parseInt(time?.split(',')[0])

          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOpen(false);
          if (data.success) {
            // data.shopInfo
            BrightAlert("Payment Successful", "", "success");
            setShopInfo(data.shopInfo);
            setCookie("SellerShop", JSON.stringify(data.shopInfo));
            setSelectGetWay(false);
            setTime(
              'one,1'
            )
          }
        });
    }
    else {
      navigate('/sign-up')
    }
  };

  const pay_on_amar_pay = async (getway) => {
    let data = {
      paymentId: open?._id,
      shopId: shopInfo._id,
      getway: getway,
      amount: open?.price,
      normalPrice: open?.price,
      priceName: open?.name,
      collection: 'price',
      time,
      buyingPrice: parseInt(open?.price) * parseInt(time?.split(',')[1]) - parseInt(time?.split(',')[0])
    };

    if (shopInfo) {
      data.callback = 'https://doob.com.bd/services-payment-successful';
      try {
        const response = await fetch('https://salenow-v2-backend.vercel.app/api/v1/seller/amarpay/payment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Corrected from 'order' to 'data'
        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.payment_url) {
          window.location.href = responseData.payment_url;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  console.log(time.split(',')[0], 'price', open);

  return (
    <div
      className={`fixed left-0 top-0 right-0 bottom-0 flex h-full min-h-screen w-full z-[1000] bg-[#0000005b] items-center justify-center bg-dark/90 px-4 py-5 ${open ? "block" : "hidden"
        }`}
    >
      <div className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]">
        <h3 className="pb-[18px] text-xl font-semibold text-dark text-black sm:text-2xl">
          Provide your payment system {possibility && '[ 7 Days Free Trial ]'}
        </h3>
        <span
          className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-blue-500`}
        ></span>

        {paymentMode ? (
          <div className="grid grid-cols-3 gap-3">
            {getawayData.map((get) => (
              <div key={get._id}>
                {get.Getaway === "Bkash" && (
                  <button

                    className={`group relative block border  ${selectGetWay._id === get._id
                      ? "border-blue-500"
                      : "border-gray-100"
                      }`}
                  >
                    <img
                      alt="Developer"
                      src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                      srcSet="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                      className={`p-4 object-cover  transition-opacity ${selectGetWay._id === get._id
                        ? "opacity-20"
                        : ""
                        }`}
                    />
                  </button>
                )}
                {get.Getaway === "Nogod" && (
                  <button
                    onClick={() => setSelectGetWay(get)}
                    className={`group relative block border  ${selectGetWay._id === get._id
                      ? "border-blue-500"
                      : "border-gray-100"
                      }`}
                  >
                    <img
                      alt="Developer"
                      src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                      srcSet="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                      className={`p-4 object-cover  transition-opacity ${selectGetWay._id === get._id
                        ? "opacity-20"
                        : "bg-gray-700"
                        }`}
                    />
                  </button>
                )}
                {get.Getaway === "AmarPay" && (
                  <button
                    onClick={() => pay_on_amar_pay(get)}
                    className={`group relative block border  ${selectGetWay._id === get._id
                      ? "border-blue-500"
                      : "border-gray-100"
                      }`}
                  >
                    <img
                      alt="Developer"
                      srcSet="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                      className={`p-4 object-cover transition-opacity `}
                    />
                  </button>
                )}


              </div>

            ))}
            {
              <button
                onClick={() => handleSubmit()}
                className={`group relative block border  ${selectGetWay === 'Cash'
                  ? "border-blue-500"
                  : "border-gray-100"
                  }`}
              >
                Cash
              </button>
            }
          </div>
        ) : (
          <div className="flex items-center justify-between px-8 py-4 border border-blue-500 cursor-pointer rounded-xl">
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
              <h2 className=" font-medium text-gray-700 sm:text-xl ">
                {open?.name}
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-blue-600 flex sm:text-3xl">
                ৳{parseInt(open?.price) * parseInt(time?.split(',')[1]) - parseInt(time?.split(',')[0])}
                <span className="text-base flex-nowrap font-medium ml-1">
                  /{time.split(',').slice(1, 2)} Month
                </span>
              </h2>
            </div>

          </div>
        )}
        <br />

        {!paymentMode ? <div>
          <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Select Period </label>

          <select
            name="HeadlineAct"
            id="HeadlineAct"
            defaultValue={`${open.six},6`} // Set the value attribute to match the option for six months
            onChange={(e) => setTime(e.target.value)}
            className="mt-1.5 w-full py-2 my-4 border rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value={`${open.one},1`}>One Month</option>
            <option value={`${open.six},6`}>Six Month</option>
            <option value={`${open.twelve},12`}>One Year</option>
            <option value={`${open.twenty},24`}>Two Year</option>
          </select>

          {/* <select
            name="HeadlineAct"
            id="HeadlineAct"
            onChange={(e) => setTime(e.target.value)}
            className="mt-1.5 w-full py-2 my-4 border rounded-lg border-gray-300 text-gray-700 sm:text-sm">
            <option value={`${open.one},1`}>One Month</option>
            <option value={`${open.six},6`}>Six Month</option>
            <option value={`${open.twelve},12`}>One Year</option>
            <option value={`${open.twenty},24`}>Two Year</option>

          </select> */}
        </div> :
          <div>
            <br />
            <br />
          </div>
        }

        <div className="-mx-3 flex flex-wrap  ">
          <div className="w-1/2 px-3">
            <button
              onClick={() => {
                setTime(`${open.six},6`)
                setOpen(false),
                  resetForm()
                setPaymentMode(false)
              }}
              className="block w-full rounded-md border border-red-500 p-3 text-center text-base font-medium text-black transition hover:border-red-600 hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
          <div className="w-1/2 px-3">
            {!paymentMode && (
              <button
                onClick={handleNextClick}
                className="block w-full rounded-md border border-blue-500 bg-blue-500 p-3 text-center text-base font-medium text-white transition hover:bg-blue-500"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default PriceModal;
