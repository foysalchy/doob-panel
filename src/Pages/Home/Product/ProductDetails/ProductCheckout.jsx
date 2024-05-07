import React, { useState } from "react";

const ProductCheckout = ({
  setNext,
  product,
  quantity,
  sellingPrice,
  userInfo,
  setUserInfo,
}) => {
  const [userType, setUserType] = useState();

  console.log("userType", userType);
  console.log(userInfo, "userInfo");
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, "and", value);

    // return;
    // setUserType(value);
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSetData = () => {
    setNext(true);
    localStorage.setItem("orderData", JSON.stringify(product));
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto my-8 p-4 bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* left side */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
            <p className="text-sm text-gray-600 mb-4">
              You have 3 items in your cart
            </p>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    className="h-12 w-12"
                    src={product?.featuredImage?.src}
                    alt=""
                  />
                  <div>
                    <h3 className="font-semibold">{product?.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {quantity}
                    </p>
                  </div>
                </div>
                <span className="font-semibold">৳{product.price} </span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{parseInt(product.price) * parseInt(quantity)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <span>All</span>
                <span>৳{sellingPrice}</span>
              </div>

              {/* <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Place Order
                            </button> */}
              <p className="text-xs text-gray-500 mt-2">
                By placing your order, you agree to our company{" "}
                <a className="text-blue-600" href="#">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a className="text-blue-600" href="#">
                  Conditions of Use
                </a>
                .
              </p>
            </div>
            {/* <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Coupon Code</h3>
                            <div className="flex space-x-2">
                                <input className="border p-2 rounded-md flex-1" placeholder="Coupon code" type="text" />
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                    Apply
                                </button>
                            </div>
                        </div> */}
          </div>
          {/* right side */}
          <div>
            <div className="border-b pb-4 mb-4">
              {/* <h2 className="text-lg font-semibold mb-4">Shipping Details</h2> */}

              <div>
                <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
                <div className=" flex flex-col gap-2">
                  <select
                    value={userInfo.for_product}
                    onChange={(e) => setUserType(e.target?.value)}
                    className="border p-2 rounded-md"
                    name="for_product"
                    id=""
                  >
                    <option value="">Order Type</option>
                    <option value="customer">Customer</option>
                    <option value="doob_warehouse">Doob Warehouse</option>
                    <option value="seller_warehouse">Seller warehouse</option>
                  </select>
                  {userType === "customer" && (
                    <div className=" flex flex-col gap-2">
                      <input
                        className="border p-2 rounded-md"
                        placeholder="Full Name"
                        type="text"
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={handleChange}
                      />

                      <input
                        className="border p-2 rounded-md"
                        placeholder="Mobile Number"
                        type="tel"
                        name="mobileNumber"
                        value={userInfo.mobileNumber}
                        onChange={handleChange}
                      />

                      <input
                        className="border p-2 rounded-md"
                        placeholder="Province"
                        type="text"
                        name="province"
                        value={userInfo.province}
                        onChange={handleChange}
                      />

                      <input
                        className="border p-2 rounded-md"
                        placeholder="City"
                        type="text"
                        name="city"
                        value={userInfo.city}
                        onChange={handleChange}
                      />

                      <input
                        className="border p-2 rounded-md"
                        placeholder="Area"
                        type="text"
                        name="area"
                        value={userInfo.area}
                        onChange={handleChange}
                      />

                      <input
                        className="border p-2 rounded-md"
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                      />

                      <input
                        className="border p-2 rounded-md"
                        placeholder="Landmark (Optional)"
                        type="text"
                        name="landmark"
                        value={userInfo.landmark}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  {userType === "doob_warehouse" && <div>Select Warehouse</div>}
                </div>
              </div>

              <button
                onClick={handleSetData}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
