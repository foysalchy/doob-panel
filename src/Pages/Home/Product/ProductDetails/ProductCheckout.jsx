import React, { useContext, useState } from "react";
import SelectWareHouse from "./SelectWareHouse";
import OnlySyncCategory from "../../../SellerItems/ProductManagement/SellerAddProduct/Components/OnlySyncCategory";
import CategorySelect from "./CategorySelect";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";

const ProductCheckout = ({
      setNext,
      product,
      quantity,
      sellingPrice,
      userInfo,
      setUserInfo,
}) => {
      const { shopInfo } = useContext(AuthContext);
      const [userType, setUserType] = useState();


      const { data: tData = [], refetch, isLoading: order_loading } = useQuery({
            queryKey: ["sellerOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const handleSelectChange = (event) => {
            const selectedValue = event.target.value;
            const data = tData.find((item) => item._id === selectedValue);

            if (data) {
                  setUserInfo(data.addresses);
            }
      };


      console.log(userInfo);
      //   console.log(shopInfo);

      const handleSetData = () => {
            setNext(true);
            localStorage.setItem("orderData", JSON.stringify(product));
      };

      const dataSubmit = async (e) => {
            e.preventDefault();

            if (userType === "customer") {
                  handleSetData();

                  return;
            }
            const form = e.target;
            const warehouse = form.warehouse.value;
            const area = form.area ? form.area.value : "";
            const rack = form.rack ? form.rack.value : "";
            const self = form.self ? form.self.value : "";
            const cell = form.cell ? form.cell.value : "";

            const megaCategory = form?.megaCategory?.value;
            const Subcategory = form?.subCategory?.value || null;
            const miniCategory = form?.miniCategory?.value || null;
            const extraCategory = form?.extraCategory?.value || null;

            const categories = [
                  { name: megaCategory },
                  Subcategory && { name: Subcategory },
                  miniCategory && { name: miniCategory },
                  extraCategory && { name: extraCategory },
            ];
            const warehouseValue = [
                  { name: warehouse },
                  { name: area },
                  { name: rack },
                  { name: self },
                  { name: cell },
            ];


            if (categories.length > 0 && warehouseValue.length > 0) {
                  //   return;
                  setUserInfo((prevState) => ({
                        for_product: userType,
                        categories: categories,
                        warehouse: warehouseValue,
                        fullName: shopInfo?.shopName,
                        mobileNumber: shopInfo?.shopNumber,
                        address: shopInfo?.address,
                  }));
                  handleSetData();
            }
      };





      return (
            <div className="">
                  <div className="max-w-4xl mx-auto my-8 p-2  h-[80%]  shadow-md">
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
                                                            alt={product?.name}
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


                                          <p className="text-xs text-gray-500 mt-2">
                                                By placing your order, you agree to our company {" "}
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

                              </div>

                              <div>
                                    <div className="border-b pb-1 mb-2">


                                          <div>
                                                <h2 className="text-lg font-semibold mb-4">Shipping Details </h2>
                                                <div className=" flex flex-col gap-2 overflow-auto">
                                                      <select
                                                            value={userInfo.for_product}
                                                            onChange={(e) => {
                                                                  setUserType(e.target?.value);
                                                                  if (e.target?.value === "customer") {
                                                                        setUserInfo((prevState) => ({
                                                                              ...prevState,
                                                                              for_product: e.target.value,
                                                                        }));
                                                                  } else {
                                                                        setUserInfo({ for_product: e.target.value });
                                                                  }
                                                            }}
                                                            className="border p-2 rounded-md"
                                                            name="for_product"
                                                            id=""
                                                      >
                                                            <option value="">Order Type</option>
                                                            <option value="customer">Customer</option>
                                                            <option value="doob_warehouse">Doob Warehouse</option>
                                                            <option value="seller_warehouse">Seller warehouse</option>
                                                      </select>

                                                      {/* <div className=" flex flex-col gap-2">
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
                                                            </div> */}

                                                      {userType === "customer" && (
                                                            <label className="mt-2 -mb-2">Order Number</label>

                                                      )}
                                                      {userType === "customer" && (
                                                            <select
                                                                  className="border p-2 rounded-md"
                                                                  onChange={handleSelectChange}
                                                                  defaultValue=""
                                                            >
                                                                  <option value="" disabled>Select an option</option>
                                                                  {tData?.map((data) => (
                                                                        <option key={data?.name} value={data?._id}>
                                                                              {data?.orderNumber}
                                                                        </option>
                                                                  ))}
                                                            </select>


                                                      )}

                                                      <form onSubmit={dataSubmit}>
                                                            {userType === "doob_warehouse" && (
                                                                  <div className="">
                                                                        <SelectWareHouse adminWare={true} />
                                                                        <CategorySelect />
                                                                  </div>
                                                            )}
                                                            {userType === "seller_warehouse" && (
                                                                  <div className="">
                                                                        <SelectWareHouse adminWare={false} />
                                                                        <CategorySelect />
                                                                  </div>
                                                            )}
                                                            <button
                                                                  //   onClick={handleSetData}
                                                                  type="submit"
                                                                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                                                            >
                                                                  Next Step
                                                            </button>
                                                      </form>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div >
      );
};

export default ProductCheckout;
