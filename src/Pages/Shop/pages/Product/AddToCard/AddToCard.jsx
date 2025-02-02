import { useEffect, useState } from "react";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import BrightAlert from "bright-alert";
import { useQuery } from "@tanstack/react-query";
import showAlert from "../../../../../Common/alert";

const ProductListCartSm = ({
      selectAll,
      allProducts,
      product,
      selectOne,
      handleRemove,
      handleManualInput,
      handleIncrease,
      handleDecrease,
}) => {
      //  const { shopUser, shop_id, shopId, setSelectProductData } =
      //  useContext(ShopAuthProvider);



      const { shopUser, shop_id, shopId } = useContext(ShopAuthProvider);


      const {
            data: wishlist = {},
            isLoading,
            refetch,
      } = useQuery({
            queryKey: ["wishlist"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/user/wishlist?userId=${shopUser._id}&shopId=${shop_id.shop_id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      console.log(wishlist);

      const isExistWhish = wishlist?.data?.find(
            (w) => w.productId === product.productId
      );

      console.log("🚀 ~ isExistWhish:", isExistWhish);
      const addToFavorite = (favorite) => {
            if (isExistWhish?._id) {
                  showAlert("Already added", "", "warning");
                  return;
            }
            delete favorite._id;
            console.log(favorite);
            fetch("https://doob.dev/api/v1/shop/user/wishlist", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(favorite), // Corrected the case of JSON
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        showAlert("Successfully added", "", "success");
                        refetch();
                  });
      };

      return (
            <li className="flex gap-4 relative flex-col py-6 sm:flex-row sm:justify-between">
                  <input
                        className="absolute top-[10px] left-0"
                        type="checkbox"
                        checked={
                              selectAll || allProducts.some((p) => p._id === product.productId)
                        }
                        onChange={() => selectOne(product)}
                  />
                  <div className="flex mt-2 w-full space-x-2 sm:space-x-4">
                        <img
                              className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                              src={product.img}
                              alt="Polaroid camera"
                        />
                        <div className="flex flex-col justify-between w-full pb-4">
                              <div className="flex justify-between w-full pb-2 space-x-2">
                                    <div className="space-y-1">
                                          <h3 className="text-sm font-semibold leadi sm:pr-8">
                                                {product.productName.slice(0, 14)}..
                                          </h3>
                                          <div>
                                                <label
                                                      htmlFor={`Quantity-${product.productId}`}
                                                      className="sr-only"
                                                >
                                                      Quantity
                                                </label>
                                                <div className="flex bar overflow-hidden h-[24px] items-center products-center gap-1 rounded">
                                                      <button
                                                            type="button"
                                                            onClick={() => handleDecrease(product.productId)}
                                                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                      >
                                                            -
                                                      </button>
                                                      <input
                                                            type="number"
                                                            id={`Quantity-${product.productId}`}
                                                            value={product.quantity}
                                                            onChange={(e) =>
                                                                  handleManualInput(
                                                                        product.productId,
                                                                        parseInt(e.target.value, 10)
                                                                  )
                                                            }
                                                            className="py-1 w-16 text-center rounded border px-1 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                                      />
                                                      <button
                                                            type="button"
                                                            onClick={() => handleIncrease(product?.productId)}
                                                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75 "
                                                      >
                                                            +
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="text-right">
                                          <p className="text-lg font-semibold">
                                                <span className="kalpurush">৳</span>
                                                {product.price}
                                          </p>
                                          <p className="text-sm line-through dark:text-gray-600 mt-1">
                                                <span className="kalpurush">৳</span>
                                                {product.regular_price}
                                          </p>
                                    </div>
                              </div>
                              <div className="flex text-sm divide-x ">
                                    <button
                                          type="button"
                                          className="flex items-center px-2 py-0 space-x-1"
                                          onClick={() => {
                                                handleRemove(!shopUser ? product.productId : product._id),
                                                      selectOne(product);
                                          }}
                                    >
                                          <MdDelete className="w-4 h-4 " />
                                          <span className="text-[12px]">Remove</span>
                                    </button>

                                    <button
                                          type="button"
                                          onClick={() => addToFavorite(product)}
                                          className="flex items-center justify-start py-0 space-x-1"
                                    >
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                // className="w-4 h-4 fill-red-400 text-red-600"
                                                className={`w-4 h-4   ${isExistWhish?._id ? " fill-red-600 " : " fill-current"
                                                      }`}
                                          >
                                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                          </svg>
                                          <span className="text-[12px]">Add to favorites</span>
                                    </button>
                              </div>
                        </div>
                  </div>
            </li>
      );
};

const ProductListCartLg = ({
      selectAll,
      allProducts,
      product,
      selectOne,
      handleRemove,
      handleManualInput,
      handleIncrease,
      handleDecrease,
}) => {
      const { shopUser, shop_id, shopId } = useContext(ShopAuthProvider);

      const {
            data: wishlist = {},
            isLoading,
            refetch,
      } = useQuery({
            queryKey: ["wishlist"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/user/wishlist?userId=${shopUser._id}&shopId=${shop_id.shop_id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });



      const isExistWhish = wishlist?.data?.find(
            (w) => w.productId === product.productId
      );

      const addToFavorite = (favorite) => {
            if (isExistWhish?._id) {
                  showAlert("Already added", "", "warning");
                  return;
            }
            delete favorite._id;
            console.log(favorite);
            fetch("https://doob.dev/api/v1/shop/user/wishlist", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(favorite), // Corrected the case of JSON
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        if (data?.status) {
                              showAlert("successfully added", "", "success");
                              refetch();
                        }
                  });
      };
      // const { shopUser } = useContext(ShopAuthProvider);


      return (
            <li className="flex gap-4 flex-col py-6 sm:flex-row sm:justify-between">
                  <input
                        type="checkbox"
                        checked={
                              allProducts?.filter((pro) => pro._id === product._id).length > 0
                        }
                        onChange={() => selectOne(product)}
                  />
                  <div className="flex w-full space-x-2 sm:space-x-4">
                        <img
                              className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                              src={product.img}
                              alt="Polaroid camera"
                        />
                        <div className="flex flex-col justify-between w-full pb-4">
                              <div className="flex justify-between w-full pb-2 space-x-2">
                                    <div className="space-y-1">
                                          <h3 className="text-lg font-semibold leadi sm:pr-8">
                                                {product.productName.split(" ").slice(0, 8).join(" ")}
                                          </h3>
                                          <div>
                                                <label
                                                      htmlFor={`Quantity-${product.productId}`}
                                                      className="sr-only"
                                                >
                                                      Quantity
                                                </label>
                                                <div className="flex products-center gap-1">
                                                      <button
                                                            type="button"
                                                            onClick={() => handleDecrease(product.productId)}
                                                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                      >
                                                            -
                                                      </button>
                                                      <input
                                                            type="number"
                                                            id={`Quantity-${product.productId}`}
                                                            value={product.quantity}
                                                            onChange={(e) =>
                                                                  handleManualInput(
                                                                        product.productId,
                                                                        parseInt(e.target.value, 10)
                                                                  )
                                                            }
                                                            className="py-1 w-16 text-center rounded border px-1 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                                      />
                                                      <button
                                                            type="button"
                                                            onClick={() => handleIncrease(product.productId)}
                                                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75 "
                                                      >
                                                            +
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="text-right">
                                          <p className="text-sm line-through dark:text-gray-600">
                                                <span className="kalpurush">৳</span>
                                                {product?.regular_price}
                                          </p>

                                          <p className="text-lg font-semibold">
                                                <span className="kalpurush">৳</span>
                                                {product?.campaignPrice
                                                      ? product?.campaignPrice
                                                      : product?.price}
                                          </p>
                                    </div>
                              </div>
                              <div className="flex text-sm divide-x">
                                    <button
                                          type="button"
                                          className="flex items-center px-2 py-1 space-x-1"
                                          onClick={
                                                () => {
                                                      handleRemove(!shopUser ? product.productId : product._id)
                                                }

                                                // console.log(product)
                                          }
                                    >
                                          <MdDelete className="w-5 h-5 " />
                                          <span>Remove</span>
                                    </button>
                                    {shopUser ? (
                                          <button
                                                type="button"
                                                onClick={() => addToFavorite(product)}
                                                className="flex items-center px-2 py-1 space-x-1"
                                          >
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 512 512"
                                                      className={`w-4 h-4   ${isExistWhish?._id ? " fill-red-600 " : " fill-current"
                                                            }`}
                                                >
                                                      <path
                                                            // fill="red"

                                                            d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"
                                                      ></path>
                                                </svg>
                                                <span>Add to favorite</span>
                                          </button>
                                    ) : (
                                          <Link
                                                to={`/shop/${shopId}/sign-in`}
                                                className="flex items-center px-2 py-1 space-x-1"
                                                aria-label="Sign up"
                                                title="Sign In"
                                          >
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 512 512"
                                                      className={`w-4 h-4   ${isExistWhish?._id ? " fill-red-600 " : " fill-current"
                                                            }`}
                                                >
                                                      <path
                                                            // fill="red"

                                                            d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"
                                                      ></path>
                                                </svg>
                                                <span>Add to favorite</span>
                                          </Link>
                                    )}
                              </div>
                        </div>
                  </div>
            </li>
      );
};

const AddToCard = () => {
      const { shopUser, shop_id, shopId, selectProductData, setSelectProductData } =
            useContext(ShopAuthProvider);

      const [productData, setProductData] = useState([]);
      const [cartProducts, setCartProducts] = useState(productData.data);
      const [invoiceData, setInvoiceData] = useState({});
      const [cookiesProduct, setCookiesProduct] = useState([]);
      const [selectAll, setSelectAll] = useState(true);
      const [allProducts, setAllProducts] = useState(productData?.data || []);
      const location = useLocation();
      const navigate = useNavigate();
      const handleSelectAllChange = () => {
            setSelectAll(!selectAll);
            if (!selectAll) {
                  setAllProducts([...cartProducts]);
            } else {
                  setAllProducts([]);
            }
      };

      useEffect(() => {

            if (Array.isArray(cartProducts)) {
                  if (selectAll) {
                        setAllProducts([...cartProducts]);
                  } else {
                        setAllProducts([]);
                  }
            }
      }, [cartProducts, selectAll]);

      const selectOne = (newProduct) => {
            console.log(newProduct);
            setSelectAll(false);
            setAllProducts((prevProducts) => {
                  const isProductSelected = prevProducts?.some(
                        (product) => product?.productId === newProduct?.productId
                  );

                  if (isProductSelected) {
                        return prevProducts?.filter(
                              (product) => product?.productId !== newProduct?.productId
                        );
                  } else {
                        return [...prevProducts, newProduct];
                  }
            });
      };

      const calculateSubtotal = () => {
            return allProducts.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
            );
      };

      const calculateTotal = () => {
            const subtotal = calculateSubtotal();
            const shippingFee = allProducts.reduce(
                  (total, product) => total + product.delivery_charge,
                  0
            );
            const shippingFeeDiscount = 0;
            return subtotal + shippingFee - shippingFeeDiscount;
      };

      const handleDecrease = (productId) => {
            setAllProducts((prevProducts) =>
                  prevProducts?.map((product) =>
                        product.productId === productId && product.quantity > 1
                              ? { ...product, quantity: product.quantity - 1 }
                              : product
                  )
            );
            setCartProducts((prevProducts) =>
                  prevProducts?.map((product) =>
                        product.productId === productId && product.quantity > 1
                              ? { ...product, quantity: product.quantity - 1 }
                              : product
                  )
            );
      };

      const handleIncrease = (productId) => {
            setAllProducts((prevProducts) =>
                  prevProducts?.map((product) =>
                        product.productId === productId
                              ? { ...product, quantity: product.quantity + 1 }
                              : product
                  )
            );
            setCartProducts((prevProducts) =>
                  prevProducts?.map((product) =>
                        product.productId === productId
                              ? { ...product, quantity: product.quantity + 1 }
                              : product
                  )
            );
      };

      const handleManualInput = (productId, quantity) => {
            if (!isNaN(quantity) && quantity > 0) {
                  setAllProducts((prevProducts) =>
                        prevProducts?.map((product) =>
                              product.productId === productId
                                    ? { ...product, quantity: Math.max(quantity, 1) }
                                    : product
                        )
                  );
                  setCartProducts((prevProducts) =>
                        prevProducts?.map((product) =>
                              product.productId === productId
                                    ? { ...product, quantity: Math.max(quantity, 1) }
                                    : product
                        )
                  );
            }
      };


      const handleRemove = (productId) => {

            setCartProducts(
                  cartProducts?.filter((product) => product._id !== productId) && cartProducts?.filter((product) => product.productId !== productId)
            );
            const cartData = JSON.parse(localStorage.getItem(`addToCart-${shopId}`)) || [];
            const updatedCartData = cartData.filter(
                  (product) => product.productId !== productId && product._id !== productId
            );
            localStorage.setItem(`addToCart-${shopId}`, JSON.stringify(updatedCartData));

            setAllProducts(
                  allProducts?.filter((product) => product.productId !== productId)
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

      const navigator = () => {
            navigate(`/shop/${shopId}/sign-in`, {
                  replace: true,
                  state: { from: location?.pathname },
            });
      };

      useEffect(() => {
            if (!shopUser) {
                  const productData = localStorage.getItem(`addToCart-${shopId}`);
                  console.log(JSON.parse(productData));
                  setCartProducts(JSON.parse(productData));
            } else {
                  fetch(
                        `https://doob.dev/api/v1/shop/user/add-to-cart?userId=${shopUser?._id}&shopId=${shop_id?.shop_id}&token=${shopUser?._id}`
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              setCartProducts(data.data);
                              const productData = localStorage.getItem(`addToCart-${shopId}`);
                              let datas = JSON.parse(productData);
                              for (let i = 0; i < datas?.length; i++) {
                                    const element = datas[i];
                                    element.userId = shopUser?._id;
                                    fetch(
                                          `https://doob.dev/api/v1/shop/user/add-to-cart?token=${shopUser._id}`,
                                          {
                                                method: "POST",
                                                headers: {
                                                      "Content-Type": "application/json",
                                                      "ngrok-skip-browser-warning": "69420",
                                                },
                                                body: JSON.stringify(element),
                                          }
                                    )
                                          .then((res) => res.json())
                                          .then((data) => {
                                                // localStorage.removeItem('addToCart');
                                          });
                              }
                        });
            }
      }, [shopUser]);
      const [guest, setGuest] = useState(true);

      return (
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                  <div className="md:flex gap-4 w-full justify-between">
                        <div className=" rounded max-w-4xl p-6  sm:p-10 bg-gray-200 text-gray-900 w-full">
                              <div className="flex flex-col space-y-4">
                                    <h2 className="text-xl font-semibold">Your cart</h2>
                                    <div className="flex gap-4 items-center">
                                          <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAllChange}
                                          />
                                          <span>Select All </span>
                                    </div>

                                    <ul className="flex flex-col divide-y dark:divide-gray-700">
                                          {cartProducts?.map((product, index) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <div key={product?._id + index}>
                                                      <div className="md:hidden block">
                                                            <ProductListCartSm
                                                                  selectAll={selectAll}
                                                                  allProducts={allProducts}
                                                                  product={product}
                                                                  selectOne={selectOne}
                                                                  handleDecrease={handleDecrease}
                                                                  handleIncrease={handleIncrease}
                                                                  handleManualInput={handleManualInput}
                                                                  handleRemove={handleRemove}
                                                                  handleSelectAllChange={handleSelectAllChange}
                                                            />
                                                      </div>
                                                      <div className="md:block hidden">
                                                            <ProductListCartLg
                                                                  selectAll={selectAll}
                                                                  allProducts={allProducts}
                                                                  product={product}
                                                                  selectOne={selectOne}
                                                                  handleDecrease={handleDecrease}
                                                                  handleIncrease={handleIncrease}
                                                                  handleManualInput={handleManualInput}
                                                                  handleRemove={handleRemove}
                                                                  handleSelectAllChange={handleSelectAllChange}
                                                            />
                                                      </div>
                                                </div>
                                          ))}
                                    </ul>
                              </div>
                        </div>

                        <div className="bg-gray-200 flex flex-col flex-grow lg:w-96 mt-8 lg:mt-0 h-[330px] rounded p-8">
                              <div className="">
                                    <div className="space-y-1 my-4">
                                          <h2 className="text-xl font-semibold ">Order Summary</h2>
                                          <div className="flex justify-between ">
                                                <p className="text-gray-700">
                                                      Subtotal ({allProducts.length} products){" "}
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
                                                            {allProducts.reduce(
                                                                  (total, product) => total + product.delivery_charge,
                                                                  0
                                                            )}
                                                      </span>
                                                </p>
                                          </div>
                                          \
                                          <div className="flex justify-between ">
                                                <p className="text-gray-700 ">Shipping Fee Discount </p>
                                                <p className="kalpurush">
                                                      ৳ <span className="font-sans">0</span>
                                                </p>
                                          </div>
                                    </div>

                                    <div className="flex justify-between py-2">
                                          <p className="text-gray-700 ">Total </p>
                                          <p className="kalpurush">
                                                ৳ <span className="font-sans">{calculateTotal()}</span>
                                          </p>
                                    </div>
                              </div>
                              <div className=" w-full">
                                    {(shopUser || guest) ? (
                                          <div className="">
                                                {allProducts?.length ? (
                                                      <Link
                                                            to={`/shop/${shopId}/user/order?shop_id=${shop_id?.shop_id}&userId=${shopUser?._id}`}
                                                      >
                                                            <button
                                                                  onClick={() => setSelectProductData(allProducts)}
                                                                  type="button"
                                                                  className="px-6 py-2 rounded w-full bg-gray-800 text-white"
                                                            >
                                                                  Process Checkout ({allProducts.length})
                                                            </button>
                                                      </Link>
                                                ) : (
                                                      <button
                                                            disabled
                                                            type="button"
                                                            className="px-6 py-2 rounded w-full bg-gray-600 text-white"
                                                      >
                                                            Process Checkout ({allProducts.length})
                                                      </button>
                                                )}
                                          </div>
                                    ) : (
                                          <div>
                                                <button
                                                      onClick={() => navigator()}
                                                      type="button"
                                                      className="px-6 py-2 rounded w-full bg-gray-800 text-white"
                                                >
                                                      Process Checkout ({allProducts.length})
                                                </button>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default AddToCard;
