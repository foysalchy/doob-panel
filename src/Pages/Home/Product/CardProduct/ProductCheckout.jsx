import React, { useContext, useState } from "react";
import SelectWareHouse from "../ProductDetails/SelectWareHouse";
import CategorySelect from "../ProductDetails/CategorySelect";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, X } from "lucide-react";
import Select from "react-select";

const ProductCheckout = ({ setNext, products, userInfo, setUserInfo, setOpenPayment, next }) => {
      const [userType, setUserType] = useState(false);

      const { shopInfo } = useContext(AuthContext);



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

      const handleSelectChange = (selectedValue) => {
            const data = tData.find((item) => item._id === selectedValue);

            if (data) {
                  setUserInfo(data.addresses);
            }
      };


      console.log(userInfo);
      //   console.log(shopInfo);

      const handleSetData = () => {
            setNext(true);
            localStorage.setItem("orderData", JSON.stringify(products));
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




      const deliveryFees = {};

      products.forEach((item) => {
            const productId = item?.product_id;
            const deliveryFee = parseFloat(item.DeliveryCharge ? item.DeliveryCharge : 0);

            // If the product ID is not in the deliveryFees object, add it with its delivery fee
            if (!(productId in deliveryFees)) {
                  deliveryFees[productId] = deliveryFee;
            }
      });
      const totalDeliveryFee = Object.values(deliveryFees).reduce(
            (acc, curr) => acc + curr,
            0
      );


      const subtotal = products.reduce(
            (acc, item) => acc + item.sellingPrice * item.stock_quantity,
            0
      );

      const totalPrice = subtotal + totalDeliveryFee;

      const handleChange = (e) => {
            const { name, value } = e.target;
            console.log(name, "and", value);

            // console.log("yes");

            if (userType === "customer") {
                  // If userType is "customer", update userInfo with the new value for the corresponding property
                  //   console.log("yes");
                  setUserInfo((prevState) => ({
                        ...prevState,
                        [name]: value,
                  }));
            }
      };



      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b">
                              <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                              <button
                                    onClick={() => setOpenPayment(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                              >
                                    <X className="h-6 w-6" />
                              </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
                              <div className="space-y-6">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                          <ShoppingCart className="h-5 w-5" />
                                          <span>{products.length} items in your cart</span>
                                    </div>
                                    <div className="space-y-4">
                                          {products.map((product) => (
                                                <div key={product._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                                                      <img
                                                            src={product.featuredImage.src}
                                                            alt={product.name}
                                                            className="h-16 w-16 object-cover rounded"
                                                      />
                                                      <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-800">{product.name.slice(0, 20)}</h3>
                                                            <p className="text-sm text-gray-600">Quantity: {product.stock_quantity}</p>
                                                      </div>
                                                      <span className="font-semibold text-gray-800">
                                                            <span className="kalpurush">৳</span>{product.sellingPrice * parseInt(product.stock_quantity)}
                                                      </span>
                                                </div>
                                          ))}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-semibold"><span className="kalpurush">৳</span>{subtotal}</span>
                                          </div>
                                          <div className="flex justify-between">
                                                <span className="text-gray-600">Delivery Fee</span>
                                                <span className="font-semibold"><span className="kalpurush">৳</span>{totalDeliveryFee}</span>
                                          </div>
                                          <div className="border-t pt-2 mt-2">
                                                <div className="flex justify-between text-lg font-semibold">
                                                      <span>Total</span>
                                                      <span><span className="kalpurush">৳</span>{totalPrice}</span>
                                                </div>
                                          </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                          By placing your order, you agree to our company's{' '}
                                          <a href="#" className="text-blue-600 hover:underline">
                                                Privacy Policy
                                          </a>{' '}
                                          and{' '}
                                          <a href="#" className="text-blue-600 hover:underline">
                                                Conditions of Use
                                          </a>
                                          .
                                    </p>
                              </div>
                              <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Shipping Details</h2>
                                    <form onSubmit={dataSubmit} className="space-y-4">
                                          <div>
                                                <label htmlFor="orderType" className="block text-sm font-medium text-gray-700 mb-1">
                                                      Order Type
                                                </label>
                                                <select
                                                      id="orderType"
                                                      value={userInfo.for_product}
                                                      onChange={(e) => {
                                                            setUserType(e.target.value);
                                                            setUserInfo((prevState) => ({
                                                                  ...prevState,
                                                                  for_product: e.target.value,
                                                            }));
                                                      }}
                                                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                      <option value="">Select Order Type</option>
                                                      <option value="customer">Customer</option>
                                                      <option value="doob_warehouse">Doob Warehouse</option>
                                                      <option value="seller_warehouse">Seller Warehouse</option>
                                                </select>
                                          </div>
                                          {userType === 'customer' && (
                                                <div>
                                                      <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Order Number
                                                      </label>
                                                      <Select onChange={handleSelectChange} options={tData.map((item) => ({ value: item._id, label: item.orderNumber }))} />

                                                </div>
                                          )}
                                          {userType === 'doob_warehouse' && <SelectWareHouse adminWare={true} />}
                                          {userType === 'seller_warehouse' && <SelectWareHouse adminWare={false} />}
                                          {(userType === 'doob_warehouse' || userType === 'seller_warehouse') && <CategorySelect />}
                                          <button
                                                type="submit"
                                                disabled={userType == !'customer' || userType === !'doob_warehouse' || userType === !'seller_warehouse'}
                                                onClick={handleSetData}
                                                className="w-full disabled:bg-gray-400 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          >
                                                Next Step
                                          </button>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ProductCheckout;
