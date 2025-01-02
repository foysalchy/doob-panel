import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import ProductCheckout from "./ProductCheckout";
import BrightAlert from "bright-alert";
import { useNavigate } from "react-router-dom";

const CardPayment = ({ openPayment, setOpenPayment, handleStore, setNext }) => {
      const [selectedPayment, setSelectedPayment] = useState("");
      const [selectedopenPayment, setSelectedopenPayment] = useState("");
      const [get, setGet] = useState(false);
      const [payment, setPayment] = useState(false);
      const [userInfo, setUserInfo] = useState([]);
      const { shopInfo, user, userAddProduct, addLocalProduct } = useContext(AuthContext);
      const [payment_done, setPaymentDone] = useState(false);
      const get_cart_product = localStorage.getItem(`cart-product-${user._id}`);
      const parsData = JSON.parse(get_cart_product) || [];
      const navigate = useNavigate();
      const [previewUrl, setPreviewUrl] = useState(false);
      const [fileName, setFileName] = useState(false);

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

      const deliveryFees = {};

      openPayment.forEach((item) => {
            const productId = item?.product_id;
            const deliveryFee = parseFloat(item.DeliveryCharge || 100);

            // If the product ID is not in the deliveryFees object, add it with its delivery fee
            if (!(productId in deliveryFees)) {
                  deliveryFees[productId] = deliveryFee;
            }
      });
      const totalDeliveryFee = Object.values(deliveryFees).reduce(
            (acc, curr) => acc + curr,
            0
      );


      const subtotal = openPayment.reduce(
            (acc, item) => acc + item.sellingPrice * item.stock_quantity,
            0
      );


      const totalPrice = subtotal + totalDeliveryFee;
      const calculateTotal = () => {
            return openPayment
                  .filter((product) => product.selected)
                  .reduce(
                        (total, product) =>
                              total +
                              parseInt(
                                    product.sellingPrice ? product.sellingPrice : product.product_price
                              ) *
                              parseInt(product.product_quantity),
                        0
                  );
      };

      const [loading, setLoading] = useState(false);

      const handleSubmit = (event) => {

            event.preventDefault();
            setLoading(true);
            openPayment.forEach((item) => {
                  handleStore(item.product_id, payment, userInfo, item);
            });
            setLoading(false);
            BrightAlert({ timeDuration: 3000 });

            navigate(`/products/confirm-order`);


            useEffect(() => {
                  const newData2 = parsData?.filter(
                        itm => !addLocalProduct.some(arrItm => arrItm?.product_id == itm?.product_id)
                  )
                  localStorage.setItem(`cart-product-${user._id}`, JSON.stringify(newData2));
                  console.log('product add in cart from payment...', addLocalProduct, 'local:', newData2);

            }, [addLocalProduct, parsData])



      };


      const paymentHandler = async (payment) => {
            console.log(payment.Getaway, "*******");
            if (payment.Getaway === "Bkash") {
                  payWithBkash();
            } else if (payment.Getaway === "AmarPay") {
                  payWithAmarPay();
            }
      };

      const payWithBkash = async () => {
            try {
                  const response = await fetch(
                        "https://doob.dev/api/v1/seller/bkash/payment/create",
                        {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ amount: sellingPrice, userId: shopInfo._id }),
                        }
                  );
                  const data = await response.json();
                  console.log(data.bkashURL);
                  window.location.href = data.bkashURL;
            } catch (error) {
                  console.log(error);
            }
      };

      const payWithAmarPay = async () => {
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
                  if (data.payment_url) {
                        window.location.href = data.payment_url;
                  }
            } catch (error) {
                  console.log(error);
            }
      };

      const pay_with_doob = () => {
            console.log("hit");
            if (shopInfo) {
                  fetch(
                        `https://doob.dev/api/v1/seller/get-shop-balance?shopId=${shopInfo._id}`
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data, "data");
                              if (data.balance < sellingPrice) {
                                    BrightAlert({ icon: "error", text: "Insufficient Balance" });
                              } else {
                                    setPaymentDone(true);
                                    handleSubmit();
                              }
                        });
            } else {
                  navigate("/login");
            }
      };

      const setPaymentMethod = () => {
            setPayment({ Getaway: "Doob_Payment" });
            pay_with_doob();
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


      const PaymentMethod = ({ gateway, setPayment, isSelected }) => (
            <button
                  type="button"
                  onClick={() => setPayment(gateway)}
                  className={`border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center transition-all ${isSelected ? 'shadow-lg border-blue-500' : 'hover:border-blue-300'
                        }`}
            >
                  {gateway.icon && (
                        <img src={gateway.icon} alt={gateway.Getaway} className="w-16 h-16 object-contain mb-2" />
                  )}
                  <span className="font-medium text-sm">{gateway.Getaway}</span>
            </button>
      );


      return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" aria-hidden="true" />
                  <div className="relative bg-white rounded-lg w-full max-w-4xl mx-auto p-8 z-50 max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setOpenPayment(false)}>x</button>

                        {!loading ? (
                              <div>

                                    <div>
                                          <h3 className="text-xl font-semibold text-center mb-4">
                                                Select Payment and open Payment
                                          </h3>
                                          <form onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                      <label htmlFor="payment" className="block mb-2">
                                                            Payment:{totalPrice}
                                                      </label>
                                                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                            {getaways.map((gateway) => (
                                                                  <PaymentMethod
                                                                        key={gateway.Getaway}
                                                                        gateway={gateway}
                                                                        setPayment={setPayment}
                                                                        isSelected={payment?.Getaway === gateway.Getaway}
                                                                  />
                                                            ))}
                                                            <PaymentMethod
                                                                  gateway={{ Getaway: 'Cash On Delivery' }}
                                                                  setPayment={setPayment}
                                                                  isSelected={payment?.Getaway === 'Cash On Delivery'}
                                                            />
                                                            <PaymentMethod
                                                                  gateway={{ Getaway: 'Doob Payment' }}
                                                                  setPayment={setPayment}
                                                                  isSelected={payment?.Getaway === 'Doob Payment'}
                                                            />
                                                      </div>
                                                </div>

                                                {/* Payment method */}
                                                {payment.Getaway === "Bank" && (
                                                      <div className="space-y-4">
                                                            <div className="bg-blue-50 p-4 rounded-lg text-sm">
                                                                  <p><strong>Bank Name:</strong> {payment.bank_name}</p>
                                                                  <p><strong>Account Number:</strong> {payment.account_number}</p>
                                                                  <p><strong>Branch Name:</strong> {payment.branch_name}</p>
                                                                  <p><strong>Account Holder:</strong> {payment.account_name}</p>
                                                            </div>
                                                            <div>
                                                                  <label htmlFor="fileInput" className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition">
                                                                        {fileName ? fileName : "Choose Your Payment Documents"}
                                                                  </label>
                                                                  <input
                                                                        id="fileInput"
                                                                        type="file"
                                                                        className="hidden"
                                                                        onChange={handleFileChange}
                                                                  />
                                                                  {previewUrl && (
                                                                        <img
                                                                              src={previewUrl}
                                                                              alt="File Preview"
                                                                              className="mt-2 max-h-20 object-cover rounded"
                                                                        />
                                                                  )}
                                                            </div>
                                                      </div>
                                                )}



                                                <div className="flex justify-end gap-2">
                                                      <button
                                                            type="button"
                                                            onClick={() => { setOpenPayment(false), setNext(false) }}
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

                              </div>
                        ) : (
                              <h1>Wait for order</h1>
                        )}
                  </div>
            </div>
      );
};

export default CardPayment;
