import { useContext, useEffect, useState } from "react";
import ProductCheckout from "./ProductCheckout";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { RxCross2 } from "react-icons/rx";
import LoaderData from "../../../../Common/LoaderData";

const ModalForPayment = ({
      invoice,
      setInvoice,
      sellingPrice,
      handleStore,
      seller,
      product,
      quantity,
      banifit,
}) => {
      const [selectedPayment, setSelectedPayment] = useState("");
      const [selectedInvoice, setSelectedInvoice] = useState("");
      // const [getaways, setGetaways] = useState([]);
      const [paymentLoading, setPaymentLoading] = useState(false);
      const [payment, setPayment] = useState(false);
      const [userInfo, setUserInfo] = useState([]);
      const { shopInfo } = useContext(AuthContext);
      const [payment_done, setPaymentDone] = useState(false);



      const {
            data: getaways = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["getawayData"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/getaway");
                  const data = await res.json();
                  return data;
            },
      });


      const handleSubmit = (event) => {
            console.log("submit");
            event.preventDefault();
            const getway = {
                  getway: payment,
                  sellingPrice,
            };
            // handleStore(invoice, getway, userInfo);
            paymentHandler();

            // navigate(`/admin/confirm-order`);
      };

      const [next, setNext] = useState(false);
      console.log(payment, "payment");
      const paymentHandler = async () => {
            console.log(payment.Getaway, "*******");
            if (payment.Getaway === "Bkash") {
                  payWithBkash();
            } else if (payment.Getaway === "AmarPay") {
                  payWithAmarPay();
            } else if (payment.Getaway === "Doob_Payment") {
                  pay_with_doob();
            }
      };

      // console.log(banifit);

      const payWithBkash = async () => {
            setPaymentLoading(true);
            try {
                  const getway = {
                        getway: payment,
                        sellingPrice,
                  };
                  const bkashBodyData = {
                        amount: sellingPrice,
                        userId: shopInfo._id,
                        shopId: shopInfo?.shopId,
                        shopName: shopInfo?.shopName,
                        shopUid: shopInfo?._id,
                        quantity: quantity,
                        sellingPrice: sellingPrice,
                        getway: getway,
                        userInfo,
                        invoiceId: invoice,
                  };
                  bkashBodyData.method = payment;
                  bkashBodyData.timestamp = new Date().getTime();
                  bkashBodyData.callback = "https://doob.com.bd/services-payment-successful?collection=product";

                  console.log(bkashBodyData);
                  const response = await fetch(
                        "https://doob.dev/api/v1/seller/bkash/payment/create",
                        {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(bkashBodyData),
                        }
                  );
                  const data = await response.json();
                  console.log(data?.bkashURL);
                  setPaymentLoading(false);
                  if (data?.bkashURL) {
                        window.location.href = data.bkashURL;
                  }
                  // window.location.href = data.bkashURL;
            } catch (error) {
                  console.log(error);
                  BrightAlert(`${error.message}`);
                  setPaymentLoading(false);
            }
      };

      const payWithAmarPay = async () => {
            setPaymentLoading(true);
            try {
                  const response = await fetch(
                        "https://doob.dev/api/v1/seller/amarpay/payment/create",
                        {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ amount: sellingPrice, orderId: 1 }),
                        }
                  );
                  const data = await response.json();
                  console.log(data);
                  setPaymentLoading(false);
                  if (data.payment_url) {
                        window.location.href = data.payment_url;
                  }
            } catch (error) {
                  console.log(error);
            }
      };

      const balk_buy = () => {
            // const product = productFind;
            const newData = {
                  product_id: product?._id,
                  product_seller: product?.shopId,
                  shopId: shopInfo?.shopId,
                  shopName: shopInfo?.shopName,
                  shopUid: shopInfo?._id,
                  quantity: quantity,
                  sellingPrice: sellingPrice,
                  seller: shopInfo?.seller,
            };
            console.log(newData);
            fetch(`https://doob.dev/api/v1/seller/balk-order-update`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert("Product Doob Payment Done");
                  });
            console.log(newData);
      };

      const pay_with_doob = () => {
            setPaymentLoading(true);
            // console.log("hit");
            if (shopInfo) {
                  fetch(
                        `https://doob.dev/api/v1/seller/get-shop-balance?shopId=${shopInfo._id}`
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data, "data");
                              setPaymentLoading(false);
                              if (data.balance < sellingPrice) {
                                    BrightAlert({ icon: "error", text: "Insufficient Balance" });
                              } else {
                                    setPaymentDone(true);
                                    setPaymentLoading(false);
                                    setInvoice(false);
                                    // BrightAlert({
                                    //   icon: "success",
                                    //   text: "Payment Done",
                                    //   timeDuration: 3000,
                                    // });
                                    balk_buy();
                                    // handleSubmit();
                              }
                        });
            } else {
                  navigate("/login");
            }
      };

      const setPaymentMethod = () => {
            setPayment({ Getaway: "Doob_Payment" });
            // pay_with_doob();
            // handleSubmit()
      };

      return (
            <div className="">
                  <div
                        className={`fixed inset-0   flex items-center justify-center z-50 ${invoice ? "visible" : "hidden"
                              }`}
                  >
                        <div
                              className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
                              aria-hidden="true"
                        ></div>
                        <div className="relative max-h-[80%] overflow-y-auto bg-white rounded-lg w-full max-w-4xl mx-auto px-8 py-6 z-50">
                              <button
                                    className="bg-gray-900 w-10 h-10 rounded-full text-white flex items-center justify-center"
                                    onClick={() => setInvoice(false)}
                              >
                                    <RxCross2 />
                              </button>
                              {!next ? (
                                    <ProductCheckout
                                          userInfo={userInfo}
                                          setUserInfo={setUserInfo}
                                          sellingPrice={sellingPrice}
                                          quantity={quantity}
                                          product={product}
                                          setNext={setNext}
                                    />
                              ) : (
                                    <div>
                                          <h3 className="text-xl font-semibold text-center mb-4">
                                                Select Payment and Invoices
                                          </h3>
                                          <form onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                      <label htmlFor="payment" className="block mb-2">
                                                            Payment:{sellingPrice}
                                                      </label>
                                                      <div className="grid grid-cols-4">
                                                            {getaways.map((get, index) => (
                                                                  <div key={index + 1}>
                                                                        {get.Getaway === "Bkash" && (
                                                                              <button>
                                                                                    <div
                                                                                          onClick={() => {
                                                                                                setPayment(get);
                                                                                                // payWithBkash();
                                                                                          }}
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
                                                                                                {get?.Getaway}
                                                                                          </h4>
                                                                                    </div>
                                                                              </button>
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
                                                                  <button
                                                                        type="button"
                                                                        disabled={payment_done}
                                                                        onClick={setPaymentMethod}
                                                                        className={`${payment?.Getaway === "Doob_Payment" &&
                                                                              "shadow-lg shadow-gray-700"
                                                                              }  border border-gray-600 flex md:flex-col flex-row items-center justify-center  gap-2 rounded p-4 md:w-[200px] md:h-[220px] w-full h-[50px] overflow-hidden`}
                                                                  >
                                                                        <h4 className="mt-2  md:font-bold md:text-lg">
                                                                              Doob Payment
                                                                        </h4>
                                                                  </button>
                                                            </a>
                                                      </div>
                                                </div>

                                                {/*//! loading section */}
                                                {paymentLoading && <LoaderData></LoaderData>}
                                                <div className="mb-4">
                                                      <label htmlFor="invoice" className="block mb-2">
                                                            Invoice:
                                                      </label>
                                                      <span className="text-gray-700">{sellingPrice}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                      <button
                                                            type="button"
                                                            onClick={() => setInvoice(false)}
                                                            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:text-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
                                                      >
                                                            Cancel
                                                      </button>
                                                      <button
                                                            type="submit"
                                                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                                                      >
                                                            Submit
                                                      </button>
                                                </div>
                                          </form>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default ModalForPayment;
