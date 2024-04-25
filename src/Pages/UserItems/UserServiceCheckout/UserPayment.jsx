import React, { useContext, useEffect, useState } from "react";
import UserPaymentAlert from "./UserPaymentAlert";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ShopAuthProvider } from "../../../AuthProvider/ShopAuthProvide";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";

const UserPayment = () => {
  const paymentGetWays = useLoaderData();
  const [open, setOpen] = useState(false);
  const { selectProductData, orderStage, user, shopInfo } =
    useContext(AuthContext);
  const [payment, setPayment] = useState(false);
  const [passData, setPassData] = useState([]);
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);
  const shopId = idMatch ? idMatch[1] : null;
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(false);
  const [fileName, setFileName] = useState(false);

  const message = [
    "Exercise caution when making payments, ensuring that you only transact with reputable and secure platforms to safeguard your financial information.",
    "Always verify the legitimacy of the payment process, double-checking the recipient details and website security features before proceeding with any transactions.",
    "After completing a payment, retain a screenshot or confirmation email as proof of the transaction, serving as documentation in case of any discrepancies or disputes in the future.",
    "Regularly monitor your bank statements and financial accounts to promptly detect and address any unauthorized or suspicious activities, ensuring the security of your financial assets.",
  ];

  useEffect(() => {
    if (!orderStage) {
      window.history.back();
    }
  }, [orderStage]);

  const orderSubmit = () => {
    const data = orderStage;
    data.method = payment;
    data.timestamp = new Date().getTime();
    data.userId = shopInfo._id ? shopInfo._id : user?._id;
    console.log(data, "service order");

    if (fileName) {
      data.file = fileName;
    }
    setPassData(data);
    fetch(`https://backend.doob.com.bd/api/v1/site-user/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data payment", data);
        BrightAlert({ icon: "success" });
        navigate(`/services`);
      });
  };

  const paymentHandler = async (payment) => {
    console.log(payment.Getaway);
    if (payment.Getaway === "Bkash") {
      payWithBkash();
    } else if (payment.Getaway === "AmarPay") {
      payWithAmarPay();
    }
  };

  const payWithBkash = async () => {
    const order = orderStage;
    order.method = payment;
    order.timestamp = new Date().getTime();
    order.userId = shopInfo._id ? shopInfo._id : user?._id;
    order.callback = "https://doob.com.bd/services-payment-successful";
    try {
      const response = await fetch(
        "https://backend.doob.com.bd/api/v1/seller/bkash/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );
      const data = await response.json();
      console.log(data.bkashURL);

      window.location.href = data.bkashURL;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const payWithAmarPay = async () => {
    const order = orderStage;
    order.method = payment;
    order.timestamp = new Date().getTime();
    order.userId = shopInfo._id ? shopInfo._id : user?._id;
    order.callback = "https://doob.com.bd/services-payment-successful";
    try {
      const response = await fetch(
        "https://backend.doob.com.bd/api/v1/seller/amarpay/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append("image", file);
    const imageUrl = await uploadImage(imageFormData);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(imageUrl);
    }
  };

  async function uploadImage(formData) {
    const url = "https://backend.doob.com.bd/api/v1/image/upload-image";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imageData = await response.json();
    return imageData.imageUrl;
  }

  const pay_with_doob = () => {
    console.log("hit");
    if (shopInfo) {
      fetch(
        `https://backend.doob.com.bd/api/v1/seller/get-shop-balance?shopId=${shopInfo._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data");
          if (data.balance < orderStage.normalPrice) {
            BrightAlert({ icon: "error", text: "Insufficient Balance" });
          } else {
            orderSubmit();
          }
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid md:grid-cols-4 grid-cols-1 md:gap-3 gap-2">
        <div className="grid md:grid-cols-4 grid-cols-1 md:col-span-3 gap-4">
          {paymentGetWays.map((get) => (
            <div>
              {get.Getaway === "Bkash" && (
                <a href="#scrollDestination">
                  <div
                    onClick={() => setPayment(get)}
                    className={`${
                      payment?.Getaway === "Bkash" &&
                      "shadow-lg shadow-gray-700"
                    }   border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
                  >
                    <img
                      alt="Developer"
                      src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                      srcSet="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                      className="md:h-[120px] md:w-[120px] w-[30px] h-[auto]"
                    />
                    <h4 className="mt-2  md:font-bold md:text-lg">
                      {get?.Getaway}...
                    </h4>
                  </div>
                </a>
              )}
              {get.Getaway === "Nogod" && (
                <a href="#scrollDestination">
                  <div
                    onClick={() => setPayment(get)}
                    className={`${
                      payment?.Getaway === "Nogod" &&
                      "shadow-lg shadow-gray-700"
                    }  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
                  >
                    <img
                      alt="Developer"
                      src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                      srcSet="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                      className="md:h-[120px] md:w-[120px] w-[30px] h-[40px] object-cover"
                    />
                    <h4 className="mt-2  md:font-bold md:text-lg">
                      {get?.Getaway}
                    </h4>
                  </div>
                </a>
              )}
              {get.Getaway === "AmarPay" && (
                <a href="#scrollDestination">
                  <div
                    onClick={() => setPayment(get)}
                    className={`${
                      payment?.Getaway === "AmarPay" &&
                      "shadow-lg shadow-gray-700"
                    }  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
                  >
                    <img
                      alt="Developer"
                      src="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                      srcSet="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                      className="md:h-[120px] md:w-[120px] w-[30px] h-[40px] object-cover"
                    />
                    <h4 className="mt-2  md:font-bold md:text-lg">
                      {get?.Getaway}
                    </h4>
                  </div>
                </a>
              )}
              {get.Getaway === "Bank" && (
                <a href="#scrollDestination">
                  <div
                    onClick={() => setPayment(get)}
                    className={`${
                      payment?.Getaway === "AmarPay" &&
                      "shadow-lg shadow-gray-700"
                    }  border border-gray-600 flex md:flex-col flex-row items-center justify-center gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
                  >
                    <h4 className="mt-2  md:font-bold md:text-lg">
                      {get?.Getaway}
                    </h4>
                  </div>
                </a>
              )}
            </div>
          ))}

          <a href="#scrollDestination">
            <div
              onClick={() => setPayment({ Getaway: "CashOnDelivery" })}
              className={`${
                payment?.Getaway === "CashOnDelivery" &&
                "shadow-lg shadow-gray-700"
              }  border border-gray-600 flex md:flex-col flex-row items-center justify-center  gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
            >
              <img
                alt="Developer"
                src="https://backend.doob.com.bd/api/v1/image/658ec416b689ffabf15d9fb6.jpg"
                srcSet="https://backend.doob.com.bd/api/v1/image/658ec416b689ffabf15d9fb6.jpg"
                className="md:h-[120px] md:w-[120px] w-[30px] h-[40px] object-cover"
              />
              <h4 className="mt-2  md:font-bold md:text-lg">
                Cash On Delivery
              </h4>
            </div>
          </a>
          <a href="#scrollDestination">
            <div
              onClick={() => setPayment({ Getaway: "Doob_Payment" })}
              className={`${
                payment?.Getaway === "Doob_Payment" &&
                "shadow-lg shadow-gray-700"
              }  border border-gray-600 flex md:flex-col flex-row items-center justify-center  gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
            >
              <h4 className="mt-2  md:font-bold md:text-lg">Doob Payment</h4>
            </div>
          </a>
        </div>

        <div className="">
          <div className="bg-gray-200 font-sans w-full p-3">
            <h1 className="md:text-2xl text-md font-semibold">Order Summary</h1>
            <p className="md:text-md text-sm text-gray-400 mt-2">
              Subtotal (1 Items and shipping fee included)
            </p>
            <br />
            <div className="flex items-center justify-between">
              <h1 className="md:text-xl text-md font-semibold">
                Total Amount:
              </h1>
              <h1 className="flex items-center gap-1  md:text-xl text-md font-semibold">
                {!orderStage?.promoPrice?.status && (
                  <div className="">
                    <span className="kalpurush text-2xl">৳</span>
                    {orderStage?.normalPrice}
                  </div>
                )}
                {orderStage?.promoPrice?.promoPrice && (
                  <span>{orderStage?.promoPrice}</span>
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {payment && (
        <div
          id="scrollDestination"
          className="border-2 border-gray-700 mt-8 w-full border-dashed p-4"
        >
          <div className="flex flex-col gap-2 text-xs">
            {message.map((mess, i) => (
              <div className="py-2 bg-yellow-200 px-10" key={i}>
                {mess}
              </div>
            ))}
            {payment.Getaway === "Bank" && (
              <div className="flex flex-col gap-2 text-xs">
                <div className="py-2 bg-red-200 px-10 text-xl flex gap-4 item-center">
                  <div>Bank Name: {payment?.bankName}</div>
                  <span>||</span>
                  <div>Account Number: {payment.accountNumber}</div>
                  <span>||</span>
                  <div>Branch Name: {payment?.branchName}</div>
                  <span>||</span>
                  <div>Holder Name: {payment?.holderName}</div>
                </div>

                {
                  <label
                    htmlFor="fileInput"
                    className="relative cursor-pointer  px-10 py-2 rounded-md text-black border"
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </span>
                    <span className="ml-2">
                      {fileName ? fileName : "Choose Your Payment Documents"}
                    </span>
                    <input
                      id="fileInput"
                      className="hidden"
                      type="file"
                      onChange={handleFileChange}
                    />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="File"
                        className="mt-2 max-h-20 object-cover"
                      />
                    )}
                  </label>
                }
              </div>
            )}
          </div>

          <div
            id="scrollDestination"
            className="flex items-center justify-center my-6"
          >
            {open && <PaymentAlert open={open} />}

            {payment.Getaway === "CashOnDelivery" ? (
              <button
                onClick={() => orderSubmit()}
                className="group relative inline-flex m-auto items-center overflow-hidden rounded bg-gray-900 px-10 py-2 text-white focus:outline-none focus:ring active:bg-gray-900"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-lg font-medium transition-all group-hover:ms-4">
                  {" "}
                  Order Now{" "}
                </span>
              </button>
            ) : payment.Getaway === "Bank" ? (
              <button
                onClick={() => orderSubmit()}
                className="group relative inline-flex m-auto items-center overflow-hidden rounded bg-gray-900 px-10 py-2 text-white focus:outline-none focus:ring active:bg-gray-900"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-lg font-medium transition-all group-hover:ms-4">
                  {" "}
                  Order Now{" "}
                </span>
              </button>
            ) : (
              <div>
                <button
                  onClick={() => pay_with_doob()}
                  className="group relative inline-flex m-auto items-center overflow-hidden rounded bg-gray-900  px-10 py-2 text-white focus:outline-none focus:ring active:bg-gray-900"
                >
                  <span className="absolute -start-full transition-all group-hover:start-4">
                    <svg
                      className="h-5 w-5 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  <span className="text-lg font-medium transition-all group-hover:ms-4">
                    {" "}
                    Pay Now {payment.Getaway}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPayment;
