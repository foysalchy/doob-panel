import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import BrightAlert from "bright-alert";
import { data } from "autoprefixer";
import PaymentAlert from "./PaymentAlert";

const Payment = () => {
  const paymentGetWays = useLoaderData();
  const [open, setOpen] = useState(false);
  const { selectProductData, orderStage, shopUser, shop_id, shopInfo, user } =
    useContext(ShopAuthProvider);

  const [loadingPayment, setLoadingPayment] = useState(false);

  const params = useParams();
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
    if (!selectProductData.length) {
      window.history.back();
    }
  }, [selectProductData]);

  const handleRemoveFromCart = (productId) => {
    console.log(productId, "productId");
    const cartData = JSON.parse(localStorage.getItem("addToCart")) || [];
    // console.log(productId, "and", cartData);
    const updatedCartData = cartData.filter(
      (product) => product._id !== productId
    );
    // console.log(
    //   "🚀 ~ file: Payment.jsx:45 ~ handleRemoveFromCart ~ updatedCartData:",
    //   updatedCartData
    // );
    localStorage.setItem("addToCart", JSON.stringify(updatedCartData));

    if (shopUser) {
      fetch(
        `https://doob.dev/api/v1/shop/user/add-to-cart?productId=${productId}&token=${shopUser._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  console.log(orderStage);
  const orderSubmit = async () => {
    const data = orderStage;
    data.method = payment;
    data.timestamp = new Date().getTime();
    data.userId = shopUser._id;
    data.shopId = shop_id.shop_id;
    data.shopUid = shopId;
    if (!fileName && payment.Getaway == !"CashOnDelivery") {
      BrightAlert(
        "Please add your bank transaction",
        "Bank transaction Image Mandatory",
        "info"
      );
      navigate(`/shop/${shopId}/confirm-order`);
    } else {
      data.file = fileName;
      setPassData(data);
      setLoadingPayment(true);
      await fetch(
        `https://doob.dev/api/v1/shop/user/order?token=${shopUser._id}&shopId=${shop_id.shop_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((responseData) => {
          console.log("responseData payment", responseData);
          BrightAlert({ icon: "success" });
          setLoadingPayment(false);
          console.log(data);
          data.productList?.forEach((order) => {
            handleRemoveFromCart(order.productId);
          });

          navigate(`/shop/${shopId}/user/my-orders`);
        });
    }


    for (let i = 0; i < orderStage?.productList.length; i++) {
      const product = orderStage?.productList[i];
      handleRemove(!shopUser ? product?.productId : product?._id)
    }

  };



  const handleRemove = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
    const cartData = JSON.parse(localStorage.getItem("addToCart")) || [];
    const updatedCartData = cartData.filter(
      (product) => product._id !== productId
    );
    localStorage.setItem("addToCart", JSON.stringify(updatedCartData));

    setAllProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== productId)
    );

    if (shopUser) {
      fetch(
        `https://doob.dev/api/v1/shop/user/add-to-cart?productId=${productId}&token=${shopUser._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };



  const paymentHandler = async (payment) => {
    if (payment.Getaway === "Bkash") {
      await payWithBkash();
    } else if (payment.Getaway === "AmarPay") {
      payWithAmarPay();
    }
  };

  // console.log(orderStage?.normalPrice);
  //   console.log(user);
  const payWithBkash = async () => {
    setLoadingPayment(true);
    const order = orderStage;
    order.method = payment;
    order.timestamp = new Date().getTime();
    order.userId = shop_id.shop_id;
    order.normalPrice = orderStage?.promoHistory?.normalPrice;
    order.callback = `https://doob.dev/shop/${params?.id}/user/success`;
    console.log(order, "order");
    // setLoadingPayment(true);
    try {
      const response = await fetch(
        "https://doob.dev/api/v1/seller/bkash/payment/create",
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
      if (data?.bkashURL) {
        // setLoadingPayment(false);
        setLoadingPayment(false);
        window.location.href = data.bkashURL;
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(payment);

  const payWithAmarPay = async () => {
    console.log(orderStage.productPrice);
    setLoadingPayment(true);
    const order = orderStage;
    order.method = payment;
    order.timestamp = new Date().getTime();
    order.normalPrice = orderStage?.promoHistory?.normalPrice;
    order.userId = shop_id.shop_id;
    order.callback = `https://doob.com.bd/shop/${params?.id}/user/success`;
    // setLoadingPayment(true);
    try {
      const response = await fetch(
        "https://doob.dev/api/v1/seller/amarpay/payment/create",
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
        setLoadingPayment(false);
        window.location.href = data.payment_url;
        // setLoadingPayment(false);
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
    const url = "https://doob.dev/api/v1/image/upload-image";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imageData = await response.json();
    return imageData.imageUrl;
  }

  console.log(previewUrl);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 min-h-[60vh]">
      <div className="grid md:grid-cols-4 grid-cols-1 md:gap-3 gap-2">
        <div className="grid md:grid-cols-4 grid-cols-1 md:col-span-3 gap-4">
          {paymentGetWays.map((get, index) => (
            <div key={index + 1}>
              {get.Getaway === "Bkash" && (
                <a href="#scrollDestination">
                  <div
                    onClick={() => setPayment(get)}
                    className={`${payment?.Getaway === "Bkash" &&
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
                    className={`${payment?.Getaway === "Nogod" &&
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
                    className={`${payment?.Getaway === "AmarPay" &&
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
                    className={`${payment?.Getaway === "AmarPay" &&
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
              className={`${payment?.Getaway === "CashOnDelivery" &&
                "shadow-lg shadow-gray-700"
                }  border border-gray-600 flex md:flex-col flex-row items-center justify-center  gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
            >
              <img
                alt="Developer"
                src="https://doob.dev/api/v1/image/658ec416b689ffabf15d9fb6.jpg"
                srcSet="https://doob.dev/api/v1/image/658ec416b689ffabf15d9fb6.jpg"
                className="md:h-[120px] md:w-[120px] w-[30px] h-[40px] object-cover"
              />
              <h4 className="mt-2  md:font-bold md:text-lg">
                Cash On Delivery
              </h4>
            </div>
          </a>
        </div>

        <div className="">
          <div className="bg-gray-200 font-sans w-full p-3">
            <h1 className="md:text-2xl text-md font-semibold">Order Summary</h1>
            <p className="md:text-md text-sm text-gray-400 mt-2">
              Subtotal( {orderStage?.productList?.length} Items and shipping fee
              included)
            </p>
            <br />
            <div className="flex items-center justify-between">
              <h1 className="md:text-xl text-md font-semibold">
                Total Amount:
              </h1>
              <h1 className="flex items-center gap-1  md:text-xl text-md font-semibold">
                {!orderStage?.promoHistory?.status && (
                  <div className="">
                    <span className="kalpurush text-2xl">৳</span>
                    {orderStage?.promoHistory?.normalPrice}
                  </div>
                )}
                {orderStage?.promoHistory?.promoPrice && (
                  <span>{orderStage?.promoHistory?.promoPrice}</span>
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
              <div>
                {loadingPayment ? (
                  <div
                    // onClick={() => orderSubmit()}
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
                      Loading order
                    </span>
                  </div>
                ) : (
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
                      Order Now
                    </span>
                  </button>
                )}
              </div>
            ) : payment.Getaway === "Bank" ? (
              <p>
                {loadingPayment ? (
                  <div
                    // onClick={() => orderSubmit()}
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
                      Loading ....{payment.Getaway}
                    </span>
                  </div>
                ) : (
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
                      Order Now {payment.Getaway}
                    </span>
                  </button>
                )}
              </p>
            ) : (
              <div>
                <button
                  onClick={paymentHandler(payment)}
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

export default Payment;
