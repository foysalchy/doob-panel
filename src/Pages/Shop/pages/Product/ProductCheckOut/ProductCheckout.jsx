import React, { useContext, useEffect, useState } from "react";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import AddAddress from "../../Home/UserProfile/ProfileUpdate/AddAddress";
import { PiPlus } from "react-icons/pi";
import CheckoutModal from "./CheckoutModal";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";

const ProductCheckout = () => {
  const {
    selectProductData,
    shopUser,
    shop_id,
    shopId,
    orderStage,
    setOrderStage,
    defaultAddress,
  } = useContext(ShopAuthProvider);

  const { data: addresses = [], refetch } = useQuery({
    queryKey: ["userAddress"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://doob.dev/api/v1/shop/user-address?userId=${shopUser?._id}&shopId=${shop_id?.shop_id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        const data = await res.json();

        return data;
      } catch (error) {
        console.error("Error fetching shop data:", error);
        throw error; // Rethrow the error to mark the query as failed
      }
    },
  });

  console.log(addresses);

  const [open, setOpen] = useState(false);
  const [handleReload, setHandleReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const calculateSubtotal = () => {
    return selectProductData.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = selectProductData.reduce(
      (total, product) => total + product.delivery_charge || 0,
      0
    );
    const shippingFeeDiscount = 0;
    return subtotal + shippingFee - shippingFeeDiscount;
  };

  const [promoPrice, setPromoPrice] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(false);
  const [process, setProcess] = useState(false);
  const [promoValue, setPromoValue] = useState("");

  const checkPromoCode = (e) => {
    setProcess(true);
    e.preventDefault();
    const price = calculateTotal();
    const code = e.target.promoCode.value;
    const shopId = shop_id.shop_id;
    const userEmail = shopUser.email;

    fetch(
      `https://doob.dev/api/v1/shop/user/promocode?shopId=${shopId}&code=${code}&email=${userEmail}&token=${shopUser._id}&price=${price}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProcess(false);
        if (data.status) {
          BrightAlert("Promo Code Added Successfully", "", "success");
          setPromoValue(code);
          setPromoPrice(data.promoPrice);
          setPromoDiscount(data.promoDiscount);
        } else {
          BrightAlert(data.msg, "", "error");
        }
      });
  };

  useEffect(() => {
    if (selectProductData.length < 1) {
      window.history.back();
    }
  }, [selectProductData]);

  let userAddress =
    (addresses?.data &&
      addresses?.data?.filter((itm) => itm?.defaultAddress)[0]) ||
    defaultAddress;

  const sendPlaceOrderData = (data) => {
    let promoHistory;
    if (promoValue) {
      promoHistory = {
        promoCode: promoValue,
        promoDiscount: promoDiscount,
        promoPrice: promoPrice,
      };
    } else {
      promoHistory = { status: false, normalPrice: calculateTotal() };
    }
    const newData = {
      productList: selectProductData,
      promoHistory: promoHistory,
      addresses: defaultAddress ? defaultAddress : userAddress,
    };
    setOrderStage(newData);
  };

  const handleSetData = () => {
    localStorage.setItem("orderData", JSON.stringify(selectProductData));
  };

  console.log(selectProductData, ">>>>>>");
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div className="lg:flex gap-4 w-full justify-between">
          <div className="w-full">
            <div className="rounded md:w-4xl p-6 bg-gray-200 text-gray-900 w-full">
              <div className="">
                <div className=" ">
                  {defaultAddress ? (
                    <div className="grid md:grid-cols-2 grid-cols-1">
                      <div className="bg-gray-100 capitalize p-4 rounded hover:shadow-xl border">
                        <h1>{defaultAddress?.fullName}</h1>
                        <h1>{defaultAddress?.mobileNumber}</h1>
                        <small>
                          <span>{defaultAddress?.address},</span>{" "}
                          <span>{defaultAddress?.province} - </span>{" "}
                          <span>{defaultAddress?.city}</span>{" "}
                          <span>{defaultAddress?.area}</span>
                        </small>
                        <br />
                        <small className="flex flex-wrap  gap-2 items-center mt-2">
                          <span className="bg-green-200 p-0.5 px-1 rounded text-xs text-black ">
                            {" "}
                            {defaultAddress.deliveryLabel}
                          </span>
                          <span className="bg-gray-200 rounded text-xs px-1">
                            {defaultAddress?.defaultAddress &&
                              "DEFAULT DELIVERY ADDRESS"}
                          </span>
                          <span className="bg-gray-200 rounded text-xs px-1">
                            {defaultAddress?.defaultBillingAddress &&
                              "DEFAULT BILLING ADDRESS"}
                          </span>
                          {/* <button
                            onClick={() => setEdit(!edit)}
                            className="bg-gray-200 px-2"
                          >
                            Edit
                          </button> */}
                          <div className="h-0 w-0">
                            {edit && (
                              <AddAddress
                                refetch={refetch}
                                address={addresses?.data}
                                setOpen={setEdit}
                                open={edit}
                              />
                            )}
                          </div>
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-gray-100 capitalize p-4 rounded hover:shadow-xl border">
                        <h1>{userAddress?.fullName}</h1>
                        <h1>{userAddress?.mobileNumber}</h1>
                        <small>
                          <span>{userAddress?.address},</span>{" "}
                          <span>{userAddress?.province} - </span>{" "}
                          <span>{userAddress?.city}</span>{" "}
                          <span>{userAddress?.area}</span>
                        </small>
                        <br />
                        <small className="flex gap-4 items-center mt-2">
                          <span className="bg-green-200 p-0.5 px-1 rounded text-xs text-black ">
                            {" "}
                            {userAddress?.deliveryLabel}
                          </span>
                          <span className="bg-gray-200 rounded text-xs px-1">
                            {userAddress?.defaultAddress &&
                              "DEFAULT DELIVERY ADDRESS"}
                          </span>
                          <span className="bg-gray-200 rounded text-xs px-1">
                            {userAddress?.defaultBillingAddress &&
                              "DEFAULT BILLING ADDRESS"}
                          </span>
                          <button
                            onClick={() => setEdit(!edit)}
                            className="bg-gray-200 px-2"
                          >
                            Edit
                          </button>
                          <div className="h-0 w-0">
                            {edit && (
                              <AddAddress
                                refetch={refetch}
                                address={addresses?.data}
                                setOpen={setEdit}
                                open={edit}
                              />
                            )}
                          </div>
                        </small>
                      </div>
                    </div>
                  )}
                </div>
                {!defaultAddress && (
                  <button
                    onClick={() => setOpen(true)}
                    className="flex gap-4 items-center justify-center mt-4"
                    style={{
                      padding: "10px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <PiPlus /> Add New Delivery Address
                  </button>
                )}
              </div>
              <div>
                {open && (
                  <AddAddress
                    address={addresses?.data}
                    refetch={refetch}
                    setOpen={setOpen}
                    open={open}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="mt-10" style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => setOpen(true)}
                  className="flex gap-4 items-center justify-center"
                  style={{
                    padding: "10px",
                    backgroundColor: "#f0f0f0",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <PiPlus /> Add New Delivery Address
                </button>
              </div>
              <div className="h-0 w-0">
                {open && (
                  <AddAddress
                    refetch={refetch}
                    address={addresses?.data}
                    setOpen={setOpen}
                    open={open}
                  />
                )}
              </div>
            </div>

            <div className=" mt-4 rounded max-w-4xl p-6  sm:p-10 bg-gray-200 text-gray-900 w-full">
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold">Your cart</h2>
                <ul className="flex flex-col divide-y dark:divide-gray-700">

                  {selectProductData.map((product) => (
                    <li className="flex gap-4 flex-col py-6 sm:flex-row sm:justify-between">
                      <div className="flex items-start w-full space-x-2 sm:space-x-4">
                        <img
                          className="flex-shrink-0 object-cover w-10 h-10 dark:border-transparent rounded outline-none sm:w-[90px] sm:h-[90px] dark:bg-gray-500"
                          src={product.img}
                          alt="Polaroid camera"
                        />
                        <div className="flex flex-col justify-between w-full pb-4">
                          <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold leadi sm:pr-8">
                                {product.name}
                              </h3>
                              <div className="flex flex-col  justify-between gap-4">
                                <h3 className="md:w-[500px]">
                                  {product?.productName}
                                </h3>
                                <h3
                                  htmlFor={`Quantity-${product._id}`}
                                  className=" "
                                >
                                  Quantity: {product.quantity}
                                </h3>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">
                                <span className="kalpurush">৳</span>
                                {product.price}
                              </p>
                              <p className="text-sm line-through dark:text-gray-600">
                                <span className="kalpurush">৳</span>
                                {product.regular_price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {console.log(selectProductData, "selelcted-product")}
          <div className="bg-gray-200 lg:w-96 mt-8 lg:mt-0 rounded p-8">
            <div className="space-y-1 my-4">
              <h2 className="text-xl font-semibold ">Order Summary</h2>
              <div className="flex justify-between ">
                <p className="text-gray-700">
                  Subtotal ({selectProductData.length} products){" "}
                </p>
                <p className="kalpurush">
                  ৳ <span className="font-sans">{calculateSubtotal()}</span>
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="text-gray-700">Shipping Fee </p>
                <p className="kalpurush">
                  ৳{" "}
                  <span className="font-sans">
                    {selectProductData.reduce(
                      (total, product) => total + product.delivery_charge || 0,
                      0
                    )}
                  </span>
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="text-gray-700 ">Shipping Fee Discount </p>
                <p className="kalpurush">
                  ৳ <span className="font-sans">0</span>
                </p>
              </div>
              {promoDiscount && (
                <div className="flex justify-between ">
                  <p className="text-gray-700 ">Promo Discount </p>
                  <p className="kalpurush">
                    ৳ <span className="font-sans">{promoDiscount}</span>
                  </p>
                </div>
              )}
            </div>
            {!promoDiscount && (
              <form
                onSubmit={checkPromoCode}
                className="products-center flex justify-start"
              >
                <input
                  name="promoCode"
                  type="text"
                  placeholder="Enter your promo code"
                  className="text-gray-500 border outline-none px-4 py-2 rounded w-full "
                />
                <button
                  type="submit"
                  className="mt-0 px-4 py-2 bg-gray-800 rounded text-white"
                >
                  {process ? "Processing.." : "Apply"}
                </button>
              </form>
            )}
            <div className="flex justify-between py-2">
              <p className="text-gray-700 ">Total </p>
              <p className="kalpurush">
                ৳{" "}
                <span className="font-sans">
                  {promoPrice ? promoPrice : calculateTotal()}
                </span>
              </p>
            </div>
            <div className={`${!promoDiscount ? "" : "mt-6"}`}>
              {addresses?.data ? (
                <Link
                  onClick={handleSetData}
                  to={`/shop/${shopId}/user/payment?shop_id=${shop_id?.shop_id}`}
                  type="button"
                  className="w-full"
                >
                  <button
                    onClick={() => sendPlaceOrderData()}
                    className="px-6 py-2 rounded w-full bg-gray-800 text-white"
                    type="button"
                  >
                    Place Order
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="px-6 py-2 rounded w-full bg-gray-600 text-white"
                  type="button"
                >
                  Place Order--
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
