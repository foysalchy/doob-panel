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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">
            Shopping cart ({cartProduct.length} Items)
          </h1>
          <div className="overflow-hidden rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Product
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Price
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Quantity
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartProduct.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={product.selected}
                        onChange={() => handleSelectProduct(index)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            alt=""
                            className="h-10 w-10 rounded"
                            height="40"
                            src={product.product_image}
                            style={{
                              aspectRatio: "40/40",
                              objectFit: "cover",
                            }}
                            width="40"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.product_id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.product_name
                              .split(" ")
                              .slice(0, 8)
                              .join(" ")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sellingPrice
                        ? product.sellingPrice
                        : product.product_price}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-gray-200 text-gray-600 px-2 py-1 rounded"
                          onClick={() => handleQuantityDecrease(index)}
                        >
                          -
                        </button>
                        <span>{product.product_quantity}</span>
                        <button
                          className="bg-gray-200 text-gray-600 px-2 py-1 rounded"
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(index)}
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full lg:w-96">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>{totalDeliveryFee}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-৳{discount}</span>
            </div>
            <div className="flex font-bold justify-between mb-2 mt-3">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <button
              onClick={handleSetData}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded shadow mb-4"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {openPayment && (
        <CardPayment
          openPayment={openPayment}
          setOpenPayment={setOpenPayment}
          handleStore={handleStore}
        />
      )}
    </div>
  );
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
