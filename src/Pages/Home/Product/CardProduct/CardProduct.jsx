import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import CardPayment from "./CardPayment";
import { useNavigate } from "react-router-dom";

const CardProduct = () => {
  const { user, shopInfo, setAddLocalProduct } = useContext(AuthContext);
  const get_cart_product = localStorage.getItem(`cart-product-${user._id}`);
  const initialCartProduct = JSON.parse(get_cart_product) || [];
  const [cartProduct, setCartProduct] = useState(initialCartProduct);
  const [selectAll, setSelectAll] = useState(false);

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
    updatedCart[index].product_quantity = newQuantity;
    setCartProduct(updatedCart);
  };

  const handleQuantityDecrease = (index) => {
    const updatedCart = [...cartProduct];
    if (updatedCart[index].product_quantity > 1) {
      updatedCart[index].product_quantity--;
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

  const calculateTotal = () => {
    return cartProduct
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

  const [openPayment, setOpenPayment] = useState(false);

  const navigate = useNavigate();

  const handleSetData = () => {
    const selectedProducts = cartProduct.filter((product) => product.selected);
    if (!shopInfo?._id) {
      navigate("/sign-in");
      return;
    }
    setOpenPayment(selectedProducts);
    localStorage.setItem("orderData", JSON.stringify(cartProduct));
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
                    <li key={product._id} className="flex py-7">
                      <div className="flex-shrink-0">
                        <img
                          className="rounded-lg w-16 h-16 object-cover"
                          src={product?.product_image}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 ml-5">
                        <div className="relative sm:gap-x-5 sm:grid sm:grid-cols-2">
                          <div className="pr-9 sm:pr-5">
                            <p className="font-bold text-base text-gray-900">
                              {product.product_name}
                            </p>
                            <p className="mt-1.5 font-medium text-gray-500 text-sm">
                              {product.product_id}
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
                              <span>{product.product_quantity}</span>
                              <button
                                className="bg-gray-200 px-3 py-1 rounded text-gray-600"
                                onClick={() =>
                                  handleQuantityUpdate(
                                    index,
                                    product.product_quantity + 1
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
            <div className="lg:top-6 lg:sticky lg:col-span-2 lg:mt-14">
              <div className="bg-gray-50 rounded overflow-hidden">
                <div className="px-4 py-6 sm:p-6 lg:p-8">
                  <div className="flow-root">
                    <div className="-my-5 divide-y divide-gray-200">
                      <div className="flex justify-between items-center py-5">
                        <p className="font-medium text-base text-gray-600">
                          Subtotal
                        </p>
                        <p className="text-right font-medium text-base text-gray-600">
                          {subtotal} BDT
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-5">
                        <p className="font-medium text-base text-gray-600">Delivery</p>
                        <p className="text-right font-medium text-base text-gray-600">
                          {totalDeliveryFee} BDT
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-5">
                        <p className="font-medium text-base text-gray-600">
                          Discount
                        </p>
                        <p className="text-right font-medium text-base text-gray-600">
                          {discount} BDT
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-5">
                        <p className="font-bold text-base text-gray-900">Total</p>
                        <p className="text-right font-bold text-base text-gray-900">
                          {total} BDT
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-6">
                    <button
                      type="button"
                      onClick={handleSetData}
                      className="inline-flex justify-center items-center bg-gray-900 hover:bg-gray-700 px-6 py-4 border border-transparent rounded-md w-full font-bold text-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </section >

  )
  // return (
  //   <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
  //     <div className="flex lg:flex-row flex-col gap-8">
  //       <div className="flex-1">
  //         <h1 className="mb-4 font-bold text-2xl">
  //           Shopping cart ({cartProduct.length} Items)
  //         </h1>
  //         <div className="shadow rounded-lg overflow-hidden">
  //           <table className="divide-y divide-gray-200 min-w-full">
  //             <thead className="bg-gray-50">
  //               <tr>
  //                 <th
  //                   className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider"
  //                   scope="col"
  //                 >
  //                   <input
  //                     type="checkbox"
  //                     checked={selectAll}
  //                     onChange={toggleSelectAll}
  //                   />
  //                 </th>
  //                 <th
  //                   className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider"
  //                   scope="col"
  //                 >
  //                   Product
  //                 </th>
  //                 <th
  //                   className="hidden lg:table-cell px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider"
  //                   scope="col"
  //                 >
  //                   Price
  //                 </th>
  //                 <th
  //                   className="hidden lg:table-cell px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider"
  //                   scope="col"
  //                 >
  //                   Quantity
  //                 </th>
  //                 <th
  //                   className="hidden lg:table-cell px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider"
  //                   scope="col"
  //                 >
  //                   Remove
  //                 </th>
  //               </tr>
  //             </thead>
  //             <tbody className="bg-white divide-y divide-gray-200">
  //               {cartProduct.map((product, index) => (
  //                 <tr key={index}>
  //                   <td className="px-6 py-4 whitespace-nowrap">
  //                     <input
  //                       type="checkbox"
  //                       checked={product.selected}
  //                       onChange={() => handleSelectProduct(index)}
  //                     />
  //                   </td>
  //                   <td className="px-6 py-4">
  //                     <div className="flex items-center">
  //                       <div className="flex-shrink-0 w-20 lg:w-10 h-20 lg:h-10">
  //                         <img
  //                           alt=""
  //                           className="rounded w-20 lg:w-10 h-20 lg:h-10"
  //                           height="40"
  //                           src={product.product_image}
  //                           style={{
  //                             aspectRatio: "40/40",
  //                             objectFit: "cover",
  //                           }}
  //                           width="40"
  //                         />
  //                       </div>
  //                       <div className="bg-green-400 ml-4 w-20">
  //                         <div className="font-medium text-gray-900 text-sm">
  //                           {product.product_id}
  //                         </div>
  //                         <div className="bg-red-400 text-gray-500 text-sm">
  //                           {product.product_name
  //                             .split(" ")
  //                             .slice(0, 8)
  //                             .join(" ")}
  //                         </div>
  //                         <div className="flex justify-between items-center lg:hidden">
  //                           <div>
  //                             <div className="py-4 text-gray-500 text-md whitespace-nowrap">
  //                               Price :
  //                               {product.sellingPrice
  //                                 ? product.sellingPrice
  //                                 : product.product_price}
  //                             </div>
  //                             <div>
  //                               <div className="flex items-center gap-2">
  //                                 <button
  //                                   className="bg-gray-200 px-2 py-1 rounded text-gray-600"
  //                                   onClick={() => handleQuantityDecrease(index)}
  //                                 >
  //                                   -
  //                                 </button>
  //                                 <span>{product.product_quantity}</span>
  //                                 <button
  //                                   className="bg-gray-200 px-2 py-1 rounded text-gray-600"
  //                                   onClick={() =>
  //                                     handleQuantityUpdate(
  //                                       index,
  //                                       product.product_quantity + 1
  //                                     )
  //                                   }
  //                                 >
  //                                   +
  //                                 </button>
  //                               </div>
  //                             </div>
  //                           </div>
  //                           <div>
  //                             <button
  //                               className="text-red-600 hover:text-red-900"
  //                               onClick={() => handleDelete(index)}
  //                             >
  //                               <TrashIcon className="w-6 h-6" />
  //                             </button>
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </td>
  //                   <td className="hidden lg:table-cell px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
  //                     {product.sellingPrice
  //                       ? product.sellingPrice
  //                       : product.product_price}
  //                   </td>

  //                   <td className="hidden lg:table-cell px-6 py-4 font-medium text-sm whitespace-nowrap">
  //                     <div className="flex items-center gap-2">
  //                       <button
  //                         className="bg-gray-200 px-2 py-1 rounded text-gray-600"
  //                         onClick={() => handleQuantityDecrease(index)}
  //                       >
  //                         -
  //                       </button>
  //                       <span>{product.product_quantity}</span>
  //                       <button
  //                         className="bg-gray-200 px-2 py-1 rounded text-gray-600"
  //                         onClick={() =>
  //                           handleQuantityUpdate(
  //                             index,
  //                             product.product_quantity + 1
  //                           )
  //                         }
  //                       >
  //                         +
  //                       </button>
  //                     </div>
  //                   </td>
  //                   <td className="hidden lg:table-cell text-right px-6 py-4 font-medium text-sm whitespace-nowrap">
  //                     <button
  //                       className="text-red-600 hover:text-red-900"
  //                       onClick={() => handleDelete(index)}
  //                     >
  //                       <TrashIcon className="w-6 h-6" />
  //                     </button>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //       <div className="w-full lg:w-96">
  //         <div className="bg-white shadow p-4 rounded-lg">
  //           <div className="flex justify-between mb-2">
  //             <span>Subtotal</span>
  //             <span>{subtotal}</span>
  //           </div>
  //           <div className="flex justify-between mb-2">
  //             <span>Delivery</span>
  //             <span>{totalDeliveryFee}</span>
  //           </div>
  //           <div className="flex justify-between mb-2">
  //             <span>Discount</span>
  //             <span>-৳{discount}</span>
  //           </div>
  //           <div className="flex justify-between mt-3 mb-2 font-bold">
  //             <span>Total</span>
  //             <span>{total}</span>
  //           </div>
  //           <button
  //             onClick={handleSetData}
  //             className="bg-blue-600 shadow mb-4 px-4 py-2 rounded w-full text-white"
  //           >
  //             Checkout
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     {openPayment && (
  //       <CardPayment
  //         openPayment={openPayment}
  //         setOpenPayment={setOpenPayment}
  //         handleStore={handleStore}
  //       />
  //     )}
  //   </div>
  // );
};

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default CardProduct;
