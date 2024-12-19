

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import MetaHelmet from '../../../../Helmate/Helmate';
import ProductCheckout from './ProductCheckout';
import CardPayment from './CardPayment';
// import { AuthContext } from '../context/AuthContext';

const CardProduct = () => {
      const { user, shopInfo, setAddLocalProduct } = useContext(AuthContext);
      const get_cart_product = localStorage.getItem(`cart-product-${user._id}`);
      const initialCartProduct = JSON.parse(get_cart_product) || [];
      const [cartProduct, setCartProduct] = useState(initialCartProduct);
      const [selectAll, setSelectAll] = useState(false);
      const [openPayment, setOpenPayment] = useState(false);
      const navigate = useNavigate();
      const [next, setNext] = useState(false)

      useEffect(() => {
            localStorage.setItem(
                  `cart-product-${user._id}`,
                  JSON.stringify(cartProduct)
            );
      }, [cartProduct]);

      useEffect(() => {
            const selectedData = cartProduct.filter((product) => product.selected);
            setAddLocalProduct(selectedData);
      }, [cartProduct, setAddLocalProduct]);

      const handleQuantityUpdate = (index, newQuantity) => {
            const updatedCart = [...cartProduct];
            updatedCart[index].stock_quantity = newQuantity;
            updatedCart[index].variations[0].quantity = newQuantity;
            setCartProduct(updatedCart);
      };

      const handleQuantityDecrease = (index) => {
            const updatedCart = [...cartProduct];
            if (updatedCart[index].stock_quantity > 1) {
                  updatedCart[index].stock_quantity--;
                  setCartProduct(updatedCart);
            }
      };

      const handleDelete = (index) => {
            const updatedCart = [...cartProduct];
            updatedCart.splice(index, 1);
            setCartProduct(updatedCart);
      };

      const handleSelectProduct = (index) => {
            const updatedCart = [...cartProduct];
            updatedCart[index].selected = !updatedCart[index].selected;
            setCartProduct(updatedCart);
      };

      const toggleSelectAll = () => {
            setSelectAll(!selectAll);
            const updatedCart = cartProduct.map((product) => ({
                  ...product,
                  selected: !selectAll,
            }));
            setCartProduct(updatedCart);
      };

      const deliveryFees = {};
      cartProduct
            .filter((product) => product.selected)
            .forEach((item) => {
                  const productId = item.product_id;
                  const deliveryFee = parseFloat(item.delivery ? item.delivery : 0);
                  if (!(productId in deliveryFees)) {
                        deliveryFees[productId] = deliveryFee;
                  }
            });

      const totalDeliveryFee = Object.values(deliveryFees).reduce(
            (acc, curr) => acc + curr,
            0
      );

      console.log(cartProduct, 'cartProduct');
      const calculateTotal = () => {
            return cartProduct
                  .filter((product) => product.selected)
                  .reduce(
                        (total, product) =>
                              total +
                              parseInt(
                                    product.sellingPrice
                                          ? product.sellingPrice
                                          : product.sellingPrice
                              ) *
                              parseInt(product.stock_quantity),
                        0
                  );
      };

      const handleSetData = () => {
            const selectedProducts = cartProduct.filter((product) => product.selected);
            if (selectedProducts.length === 0) {
                  alert("Please select at least one product to proceed to checkout.");
                  return;
            }
            if (!shopInfo?._id) {
                  navigate("/sign-in");
                  return;
            }
            setOpenPayment(selectedProducts);
            localStorage.setItem("orderData", JSON.stringify(selectedProducts));
      };

      const handleStore = (id, getway, userInfo, product) => {
            if (shopInfo) {
                  const data = {
                        shopId: shopInfo?.shopId,
                        shopName: shopInfo?.shopName,
                        shopUid: shopInfo?._id,
                        quantity: product.product_quantity,
                        sellingPrice: product.product_price,
                        getway: getway,
                        userInfo,
                  };
                  fetch(`https://doob.dev/api/v1/seller/web-store?id=${id}`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  })
                        .then((res) => res.json())
                        .then((data) => { });
            } else {
                  navigate("/sign-in");
            }
      };

      const subtotal = cartProduct.reduce(
            (acc, item) =>
                  acc +
                  (item?.sellingPrice
                        ? item?.sellingPrice
                        : item?.product_price * item.product_quantity),
            0
      );

      const discount = 0;
      const total = subtotal - discount;



      return (
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                  <MetaHelmet title="My Cart" />
                  <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="mx-auto max-w-6xl">
                              <div className="lg:items-start gap-y-10 lg:gap-x-12 xl:gap-x-16 grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6">
                                    <div className="lg:col-span-3 xl:col-span-4">
                                          <div className="flex justify-between items-center">
                                                <h1 className="font-bold text-2xl text-gray-900">Your Cart</h1>
                                                <p className="font-medium text-gray-500 text-sm">{cartProduct.length} Items in cart</p>
                                          </div>
                                          <hr className="border-gray-200 mt-6" />
                                          <div className="mt-7 flow-root">
                                                <ul className="-my-7 divide-y divide-gray-200">
                                                      {cartProduct.map((product, index) => (
                                                            <li key={product._id} className="flex items-center py-7">
                                                                  <div className="flex items-center px-4">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={product.selected || false}
                                                                              onChange={() => handleSelectProduct(index)}
                                                                        />

                                                                  </div>
                                                                  <div className="flex-shrink-0">
                                                                        <img
                                                                              className="rounded-lg w-28 h-28 object-cover"
                                                                              src={product?.featuredImage.src}
                                                                              alt={product?.featuredImage.name}
                                                                        />
                                                                  </div>
                                                                  <div className="flex-1 items-center ml-5">
                                                                        <div className="relative justify-center sm:gap-x-5 sm:grid sm:grid-cols-2">
                                                                              <div className="pr-9 sm:pr-5">
                                                                                    <p className="font-bold text-base text-gray-900">
                                                                                          {product.name}

                                                                                    </p>
                                                                                    <p className="mt-1.5 font-medium text-gray-500 text-sm">
                                                                                          {product.oldId}
                                                                                    </p>
                                                                                    <p className="mt-1.5 font-medium text-gray-500 text-sm">
                                                                                          {product.variations[0].SKU}
                                                                                    </p>

                                                                              </div>
                                                                              <div className="flex justify-between sm:justify-end items-end sm:items-start mt-3 sm:mt-0 sm:pr-14">
                                                                                    <p className="sm:text-right flex-shrink-0 sm:order-2 sm:ml-8 w-20 font-bold text-base text-gray-900 text-left">
                                                                                          {product.sellingPrice
                                                                                                ? product.sellingPrice
                                                                                                : product.product_price} BDT
                                                                                    </p>
                                                                                    <div className="flex items-center gap-2 sm:order-1">
                                                                                          <button
                                                                                                className="bg-gray-200 px-3 py-1 rounded text-gray-600"
                                                                                                onClick={() => handleQuantityDecrease(index)}
                                                                                          >
                                                                                                -
                                                                                          </button>
                                                                                          <span>{product.stock_quantity}</span>
                                                                                          <button
                                                                                                className="bg-gray-200 px-3 py-1 rounded text-gray-600"
                                                                                                onClick={() =>
                                                                                                      handleQuantityUpdate(
                                                                                                            index,
                                                                                                            product.stock_quantity + 1
                                                                                                      )
                                                                                                }
                                                                                          >
                                                                                                +
                                                                                          </button>
                                                                                    </div>
                                                                                    <div className="top-0 right-0 absolute flex" onClick={() => handleDelete(index)}>
                                                                                          <button
                                                                                                type="button"
                                                                                                className="inline-flex -m-2 p-2 rounded text-gray-400 hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                                                                          >
                                                                                                <svg
                                                                                                      className="w-5 h-5"
                                                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                                                      fill="none"
                                                                                                      viewBox="0 0 24 24"
                                                                                                      stroke="currentColor"
                                                                                                >
                                                                                                      <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            strokeWidth={2}
                                                                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                                      />
                                                                                                </svg>
                                                                                          </button>
                                                                                    </div>
                                                                              </div>
                                                                        </div>

                                                                  </div>
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    </div>
                                    <div className="lg:col-span-2 xl:col-span-2 border-t border-gray-200 pt-10 lg:pt-0">
                                          <h2 className="font-bold text-xl text-gray-900">Order Summary</h2>
                                          <div className="mt-6">
                                                <div className="flex justify-between text-gray-700">
                                                      <span>Subtotal:</span>
                                                      <span>{calculateTotal()} BDT</span>
                                                </div>
                                                <div className="flex justify-between text-gray-700 mt-2">
                                                      <span>Delivery Fee:</span>
                                                      <span>{totalDeliveryFee > 0 ? totalDeliveryFee : 100} BDT</span>
                                                </div>
                                                <div className="flex justify-between text-gray-900 font-bold mt-2">
                                                      <span>Total:</span>
                                                      <span>{calculateTotal() + totalDeliveryFee > 0 ? totalDeliveryFee : 100} BDT</span>
                                                </div>
                                                <button
                                                      className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
                                                      onClick={handleSetData}
                                                >
                                                      Proceed to Checkout
                                                </button>
                                                <button
                                                      className="mt-2 w-full bg-gray-600 text-white py-2 rounded"
                                                      onClick={toggleSelectAll}
                                                >
                                                      {selectAll ? "Deselect All" : "Select All"}
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {console.log(openPayment, next)}

                  {
                        openPayment && (
                              next !== true ? (
                                    <div className={next ? "hidden" : "block"}>
                                          <ProductCheckout
                                                setNext={setNext}
                                                next={next}
                                                setOpenPayment={setOpenPayment}
                                                products={openPayment}
                                                userInfo={user}
                                          />
                                    </div>
                              ) : (
                                    <div className={!next ? "hidden" : "block"}>
                                          <CardPayment
                                                openPayment={openPayment}
                                                setNext={setNext}
                                                setOpenPayment={setOpenPayment}
                                                handleStore={handleStore}
                                          />
                                    </div>
                              )
                        )
                  }

            </section>
      );
};


export default CardProduct;
