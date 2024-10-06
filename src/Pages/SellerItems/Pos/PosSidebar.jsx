import React, { useContext, useEffect, useState } from "react";
import { CgClose, CgShoppingCart } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import clickAudio from "../../../../src/assets/sound_beep-29.mp3";
import deleteSound from "../../../../src/assets/sound_button-21.mp3";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import PosProductsDetails from "./PosProductsDetails";
import Swal from "sweetalert2";
import PosPaymentModal from "./PosPaymentModal";
import BrightAlert from "bright-alert";
import showAlert from "../../../Common/alert";

const PosSidebar = ({ cartProducts, setCartProducts, close, setClose }) => {
      const { shopInfo } = useContext(AuthContext);

      const [open, setOpen] = useState(false);
      const [invoice, setInvoice] = useState({});
      const [isChecked, setIsChecked] = useState(false);
      const [userCheck, SetUserCheck] = useState(false);
      const [existing, setExisting] = useState(false);
      const [user, setUser] = useState(false);
      const [error, setError] = useState(false);
      const [isPreviewModal, setIsPreviewModal] = useState(false);

      // const [name, setName] = useState(user.name);
      // const [email, setEmail] = useState(user.email);
      // const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
      // const [address, setAddress] = useState(user.address);

      const [searchValue, setSearchValue] = useState("");
      const [searchType, setSearchType] = useState("userNumber");
      const [gest, setGest] = useState(false);

      const gust_update = (status) => {
            setGest(status);
            if (status) {
                  const data = {
                        name: "Gust User",
                        email: " ",
                        phoneNumber: " ",
                        address: " ",
                  };

                  setUser(data);
            } else {
                  setUser(false);
            }
            SetUserCheck(false);
      };
      const { pathname } = useLocation();

      useEffect(() => {
            if (pathname) {
                  gust_update(true);
            }
      }, [pathname]);

      const toggleCheckbox = () => {
            setIsChecked(!isChecked);
      };

      const [deleteAudio] = useState(new Audio(deleteSound));
      const [audio] = useState(new Audio(clickAudio));

      useEffect(() => {
            return () => {
                  deleteAudio.pause();
                  deleteAudio.currentTime = 0;
            };
      }, [deleteAudio]);

      useEffect(() => {
            return () => {
                  audio.pause();
                  audio.currentTime = 0;
            };
      }, [audio]);

      const [cash, setCash] = useState(0);
      const [getaway, setGetaway] = useState("Cash");
      const [discount, setDiscount] = useState(0);
      const [parcents, setParcents] = useState(false);
      const [transactionId, setTransactionId] = useState("");

      const singleDiscount = (index, value) => {
            const updatedCart = [...cartProducts];
            updatedCart[index].discount = value;
            setCartProducts(updatedCart);
      };

      const increaseQuantity = (index) => {
            const updatedCart = [...cartProducts];
            updatedCart[index].quantity += 1;
            setCartProducts(updatedCart);
      };

      const handleQuantityChange = (index, value) => {
            const updatedCart = [...cartProducts];
            const newQuantity = parseInt(value, 10);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
                  updatedCart[index].quantity = newQuantity;
                  setCartProducts(updatedCart);
            }
      };

      const setCashValue = (value) => {
            if (value >= 0) {
                  setCash(value);
            } else {
                  setCash(0);
            }
      };
      const decreaseQuantity = (index) => {
            const updatedCart = [...cartProducts];
            updatedCart[index].quantity = Math.max(0, updatedCart[index].quantity - 1);
            setCartProducts(updatedCart);
      };

      const fetchData = (searchValue) => {
            fetch(
                  `https://doob.dev/api/v1/seller/seller-user?shopId=${shopInfo.shopId}&${searchType}=${searchValue}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        if (data.userInfo) {
                              setUser(data.userInfo);
                              setExisting(false);
                              setError(false);
                        } else {
                              setError("User not found");
                              setUser(false);
                        }
                  });
      };

      const totalPrice = () => {
            return cartProducts.reduce((total, item) => {
                  const discountedPrice = item.price - (item.discount || 0); // Subtract discount from item price
                  return total + item.quantity * discountedPrice; // Multiply by quantity and add to total
            }, 0);
      };

      let discountAmount = 0;

      const calculateChange = () => {
            const cashAmount = cash ? parseInt(cash) : 0;
            let discountAmount = 0;
            console.log(user);
            const userDueAmount = parseInt(user?.dueAmount || 0);
            const total = totalPrice();

            if (discount) {
                  if (parcents) {
                        discountAmount = (total / 100) * parseInt(discount);
                  } else {
                        discountAmount = parseInt(discount);
                  }
            }

            const discountedPrice = total - discountAmount;
            const finalAmount = cashAmount - discountedPrice + userDueAmount;

            return finalAmount;
      };

      let changeAmount = calculateChange();

      const totalAmount = parseInt(changeAmount || 0);

      const [loading, setLoadingInvoice] = useState(false);
      const handleSubmit = () => {
            setLoadingInvoice(true);
            const items = cartProducts;
            const total = totalPrice();
            const change = changeAmount;
            const present = parcents;
            const discount = discountAmount;
            const data = {
                  items,
                  total,
                  cash,
                  change,
                  discount,
                  present,
                  getaway,
                  transactionId,
            };

            if (user.name == "Gust User" || (user.email && user.email.trim() !== "")) {
                  const bodyData = {
                        shopId: shopInfo?.shopId,
                        email: user?.email,
                        dueAmount: changeAmount,
                  };

                  try {
                        fetch(`https://doob.dev/api/v1/seller/update-pos-user`, {
                              method: "PUT",
                              headers: {
                                    "content-type": "application/json",
                              },
                              body: JSON.stringify(bodyData),
                        })
                              .then((res) => res.json())
                              .then((responseData) => {
                                    // setLoading(false);
                                    console.log(responseData);
                                    setLoadingInvoice(false);
                                    if (responseData) {
                                          // showAlert("Success", "Submitted", "success");

                                          setInvoice(data);
                                          setOpen(true);
                                    } else {
                                          showAlert("error", responseData?.error, "error");
                                    }
                              });
                  } catch (error) {
                        showAlert("Success", error?.message ?? "failed to SUbmit", "error");
                        setLoadingInvoice(false);
                  }
            }
      };

      const handleDelete = (id) => {
            deleteAudio.play();
            const updatedCartProducts = cartProducts?.filter(
                  (product) => product.id !== id
            );
            setCartProducts(updatedCartProducts);
      };

      const handleDeleteAll = () => {
            deleteAudio.play();
            setCartProducts([]);
            changeAmount = 0;
      };

      const handleFormSubmit = (e) => {
            e.preventDefault();

            const form = e.target;
            const name = form?.name.value ? form?.name.value : "Gest User";
            const email = form?.email.value;
            const number = form?.phoneNumber?.value;
            const address = form?.phoneNumber?.value;
            // const email = gest ? " " : form?.email.value;
            // const number = gest ? " " : form?.phoneNumber.value;
            // const address = gest ? " " : form?.phoneNumber.value;

            const data = {
                  name,
                  email,
                  number,
                  address,
            };

            const newUserData = {
                  name,
                  email,
                  shopId: shopInfo?.shopId,
                  phoneNumber: number,
            };

            try {
                  fetch(`https://doob.dev/api/v1/seller/new-pos-user`, {
                        method: "POST",
                        headers: {
                              "content-type": "application/json",
                        },
                        body: JSON.stringify(newUserData),
                  })
                        .then((res) => res.json())
                        .then((responseData) => {
                              // setLoading(false);

                              if (responseData?.status) {
                                    showAlert("Success", "Added New User", "success");

                                    setUser(data);
                                    setIsChecked(false);
                                    SetUserCheck(true);
                                    setGest(false);
                              } else {
                                    Swal.fire(
                                          "error",
                                          responseData?.error ?? "Your email is empty",
                                          "error"
                                    );
                              }
                        });
            } catch (error) {
                  showAlert("Success", error?.message ?? "failed add the user", "error");
            }
      };

      const isDisabled = () => {
            if (user?.email && user.email.trim() !== "") {
                  return false; // Enable the button if user email exists
            } else if (user?.name === "Gust User") {
                  return false;
            }
            // Disable the button if changeAmount < -1 or cartProducts.length is 0
            return changeAmount < -1 || !cartProducts.length;
      };

      const disabledSUbmit = isDisabled();

      const handleChange = (e) => {
            let value = e.target.value;
            // Ensure the input always starts with 01

            setSearchValue(value);
            fetchData(value); // Fetch data with the updated search value
      };

      return (
            <div className=" h-full ">
                  <div className="h-full flex flex-col">
                        <div className="flex-grow">
                              <div className="">
                                    <div className="relative">
                                          {
                                                <div>
                                                      <div className="flex items-center border-b pb-2 justify-between">
                                                            <div className="relative ">
                                                                  <CgShoppingCart className="text-2xl " />
                                                                  <span
                                                                        className="absolute top-[-10px] flex justify-center items-center left-8 bg-red-500
                                text-white rounded-full px-2 py-1 text-[10px] font-semibold transform h-6 w-6 p-1 -translate-x-1/2 -translate-y-1
                                6"
                                                                  >
                                                                        {cartProducts.length}
                                                                  </span>
                                                            </div>

                                                            <button
                                                                  onClick={() => setClose(!close)}
                                                                  className="text-[#fb2464] lg:hidden text-xl"
                                                            >
                                                                  <CgClose />
                                                            </button>

                                                            <button
                                                                  className="bg-[#f1397929] w-[35px] h-[35px] rounded-full flex justify-center items-center"
                                                                  onClick={handleDeleteAll}
                                                            >
                                                                  <MdDeleteOutline className="text-[#f1397afe] text-xl" />
                                                            </button>
                                                      </div>

                                                      <ul className="h-[46vh] overflow-x-hidden overflow-y-auto">
                                                            {cartProducts?.map((itm, index) => (
                                                                  <li key={index}>
                                                                        <div className="flex justify-between items-center my-4 bg-white relative p-2 rounded-md">
                                                                              <button
                                                                                    onClick={() => handleDelete(itm.id)}
                                                                                    className="bg-red-500 text-white text-xs w-[20px] h-[20px] rounded-full absolute right-0 -top-2"
                                                                              >
                                                                                    x
                                                                              </button>
                                                                              <div className="flex items-center gap-2">
                                                                                    <img
                                                                                          src={itm?.img}
                                                                                          alt=""
                                                                                          className="w-[60px] h-[60px] ring-1 ring-gray-300 rounded-md object-cover"
                                                                                    />
                                                                                    <div className="">
                                                                                          <h3 className="text-sm">
                                                                                                {itm?.name.slice(0, 16)}...
                                                                                          </h3>
                                                                                          <h3 className="text-lg">
                                                                                                {itm?.price - (itm?.discount || 0)}
                                                                                          </h3>{" "}
                                                                                          {/* Subtract discount from price, defaulting to 0 if discount is not provided */}
                                                                                    </div>
                                                                              </div>
                                                                              <div className="relative">
                                                                                    <span className="text-xs absolute top-[-17px] text-center left-0 right-0">
                                                                                          Discount
                                                                                    </span>
                                                                                    <input
                                                                                          onChange={(e) =>
                                                                                                singleDiscount(index, e.target.value)
                                                                                          }
                                                                                          type="number"
                                                                                          className="border border-red-500 rounded w-[60px] px-1"
                                                                                    />
                                                                              </div>

                                                                              <div className="flex mr-2 items-center relative">
                                                                                    <div className="absolute left-[-10px]">
                                                                                          <button
                                                                                                onClick={() => decreaseQuantity(index)}
                                                                                                className="relative bg-red-500 w-[18px] h-[18px] rounded-full  flex items-center justify-center"
                                                                                          >
                                                                                                <span className="text-white absolute top-[-4px] left-0 right-0 bottom-0">
                                                                                                      -
                                                                                                </span>
                                                                                          </button>
                                                                                    </div>
                                                                                    <input
                                                                                          type="number"
                                                                                          value={itm?.quantity}
                                                                                          onChange={(e) =>
                                                                                                handleQuantityChange(index, e.target.value)
                                                                                          }
                                                                                          className="border text-center border-red-500 rounded w-[60px] px-3"
                                                                                    />
                                                                                    <div className="absolute right-[-9px]">
                                                                                          <button
                                                                                                onClick={() => increaseQuantity(index)}
                                                                                                className="relative bg-red-500 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                                                                                          >
                                                                                                <span className="text-white absolute top-[-3px] left-0 right-0 bottom-0">
                                                                                                      +
                                                                                                </span>
                                                                                          </button>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                </div>
                                          }
                                    </div>
                              </div>
                        </div>
                        <div className="bg-white px-2 py-2">
                              {
                                    <div>
                                          <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                      <input
                                                            className="ml-2"
                                                            type="checkbox"
                                                            name="user"
                                                            id="user"
                                                            checked={userCheck}
                                                            onChange={toggleCheckbox}
                                                      />
                                                      <label htmlFor="user" className="">
                                                            New User
                                                      </label>
                                                      <div>
                                                            <input
                                                                  className="ml-2"
                                                                  type="checkbox"
                                                                  name="gest"
                                                                  id="gest"
                                                                  checked={gest}
                                                                  onChange={() => gust_update(!gest)}
                                                            />
                                                            <label htmlFor="gest" className="">
                                                                  Gest User
                                                            </label>
                                                      </div>
                                                      {(error && (
                                                            <p className="text-sm text-red-500">Error: {error}</p>
                                                      )) ||
                                                            (user && (
                                                                  <p className="text-sm text-green-500">{user?.name}</p>
                                                            ))}
                                                </div>
                                          </div>

                                          <div className="flex gap-2 items-center">
                                                <select
                                                      onChange={(e) => setSearchType(e.target.value)}
                                                      className="mt-1 p-2 border  focus:outline-none focus:border-gray-500  focus:ring-0"
                                                      name=""
                                                      id=""
                                                >
                                                      <option value="userNumber">Phone Number</option>
                                                      <option value="userEmail">Email</option>
                                                </select>
                                                <input
                                                      onChange={handleChange}
                                                      value={searchValue}
                                                      className="mt-1 ml-2 w-full p-2 border focus:outline-none focus:border-gray-500 focus:ring-0"
                                                      type="text"
                                                      id=""
                                                      name=""
                                                />
                                                {/* <button
                  // onClick={() => fetchData()}
                  className="p-2  px-4 bg-gray-900 text-white"
                >
                  Search
                </button> */}
                                          </div>
                                    </div>
                              }

                              <div>
                                    <div
                                          onClick={() => setIsChecked(false)}
                                          className={`fixed z-[100] flex items-center justify-center ${isChecked ? "visible opacity-100" : "invisible opacity-0"
                                                } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                    >
                                          <div
                                                onClick={(e_) => e_.stopPropagation()}
                                                className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg  ${isChecked
                                                      ? "scale-1 opacity-1 duration-300"
                                                      : "scale-0 opacity-0 duration-150"
                                                      }`}
                                          >
                                                {/* <h1 className='flex gap-2'> <input onClick={() => { setExisting(!existing), setUser(false) }} type="checkbox" />Existing User ?</h1> */}

                                                <h1 className="text-2xl font-bold mb-2 mt-4">User Info</h1>

                                                {existing && (
                                                      <div>
                                                            <label> Search User</label>
                                                            <div className="flex gap-2 items-center">
                                                                  <select
                                                                        onChange={(e) => setSearchType(e.target.value)}
                                                                        className="mt-1 p-2 border  focus:outline-none focus:border-gray-500  focus:ring-0"
                                                                        name=""
                                                                        id=""
                                                                  >
                                                                        <option value="userNumber">Phone Number</option>
                                                                        <option value="userEmail">Email</option>
                                                                  </select>
                                                                  <input
                                                                        onChange={(e) => {
                                                                              setSearchValue(e.target.value), fetchData();
                                                                        }}
                                                                        className="mt-1 ml-2 w-full p-2 border  focus:outline-none focus:border-gray-500  focus:ring-0"
                                                                        type="text"
                                                                        name=""
                                                                        id=""
                                                                  />
                                                                  <button
                                                                        onClick={() => fetchData()}
                                                                        className="p-2  px-4 bg-gray-900 text-white"
                                                                  >
                                                                        Search
                                                                  </button>
                                                            </div>
                                                      </div>
                                                )}
                                                {error && (
                                                      <p className="text-sm text-red-500">Error: {error}</p>
                                                )}

                                                {!existing && (
                                                      <form onSubmit={handleFormSubmit}>
                                                            <div className="mb-2">
                                                                  <label
                                                                        htmlFor="name"
                                                                        className="block text-sm font-medium text-gray-600"
                                                                  >
                                                                        Name:
                                                                  </label>
                                                                  <input
                                                                        type="text"
                                                                        id="name"
                                                                        defaultValue={user && !existing ? user?.name : ""}
                                                                        name="name"
                                                                        className="mt-1 p-2 w-full border rounded-md"
                                                                        required
                                                                  // onChange={(e) => setName(e.target.value)}
                                                                  />
                                                            </div>

                                                            <div className="mb-2">
                                                                  <label
                                                                        htmlFor="email"
                                                                        className="block text-sm font-medium text-gray-600"
                                                                  >
                                                                        Email:
                                                                  </label>
                                                                  <input
                                                                        type="email"
                                                                        required
                                                                        id="email"
                                                                        name="email"
                                                                        defaultValue={user && !existing ? user?.email : ""}
                                                                        className="mt-1 p-2 w-full border rounded-md"
                                                                  // onChange={(e) => setEmail(e.target.value)}
                                                                  />
                                                            </div>

                                                            <div className="mb-2">
                                                                  <label
                                                                        htmlFor="phoneNumber"
                                                                        className="block text-sm font-medium text-gray-600"
                                                                  >
                                                                        Phone Number:
                                                                  </label>
                                                                  <input
                                                                        type="text"
                                                                        id="phoneNumber"
                                                                        required
                                                                        name="phoneNumber"
                                                                        defaultValue={
                                                                              user && !existing ? user?.phoneNumber : ""
                                                                        }
                                                                        className="mt-1 p-2 w-full border rounded-md"
                                                                        // onChange={(e) => setPhoneNumber(e.target.value)}

                                                                        min="100000000"
                                                                        pattern="\+880[0-9]{9,}"
                                                                  />
                                                            </div>

                                                            <div className="mb-2">
                                                                  <label
                                                                        htmlFor="address"
                                                                        className="block text-sm font-medium text-gray-600"
                                                                  >
                                                                        Address:
                                                                  </label>
                                                                  <textarea
                                                                        id="address"
                                                                        name="address"
                                                                        className="mt-1 p-2 w-full border rounded-md"
                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                  ></textarea>
                                                            </div>

                                                            <div className="flex justify-between">
                                                                  <button
                                                                        type="submit"
                                                                        className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                  >
                                                                        SUbmit
                                                                  </button>

                                                                  <button
                                                                        onClick={() => setIsChecked(false)}
                                                                        className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                  >
                                                                        Cancel
                                                                  </button>
                                                            </div>
                                                      </form>
                                                )}

                                                <br />
                                          </div>
                                    </div>
                              </div>
                              <div className="">
                                    <div className="grid grid-cols-4 gap-2">
                                          <div>
                                                Total:{" "}
                                                <div>
                                                      Tk.{totalPrice()}{" "}
                                                      {user?.dueAmount ? (
                                                            <span className="text-red-500 font-semibold">
                                                                  ({user?.dueAmount})
                                                            </span>
                                                      ) : (
                                                            ""
                                                      )}
                                                      /=
                                                </div>
                                          </div>

                                          {/* <div>
                Due:{" "}
                <div
                  className={`   ${
                    changeAmount > 0
                      ? "text-green-500"
                      : changeAmount < 0
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Tk.{parseInt(changeAmount)}/=
                </div>

              </div> */}

                                          {totalAmount > 0 ? (
                                                <div>
                                                      Total Change : <p className="text-green-600">{totalAmount}</p>
                                                </div>
                                          ) : (
                                                <div>
                                                      Total Due : <p className="text-red-500">{totalAmount}</p>
                                                </div>
                                          )}
                                          <div>
                                                <label className="flex gap-1" htmlFor="percents">
                                                      <input
                                                            id="percents"
                                                            type="checkbox"
                                                            checked={parcents}
                                                            onChange={() => setParcents(!parcents)}
                                                      />
                                                      Discount(%)
                                                </label>
                                                <input
                                                      onChange={(e) => setDiscount(e.target.value)}
                                                      className="bg-transparent text-right ring-1 px-2 w-[80px] ring-gray-300 rounded-md text-lg"
                                                      type="text px-2"
                                                />
                                          </div>
                                          <div>
                                                Paid:{" "}
                                                <div>
                                                      {" "}
                                                      <input
                                                            defaultValue="0"
                                                            value={cash}
                                                            onChange={(e) => {
                                                                  const value = e.target.value;
                                                                  setCashValue(value === "" ? "0" : value);
                                                            }}
                                                            type="number"
                                                            className="bg-transparent px-2 text-right ring-1 w-[80px] ring-gray-300 rounded-md text-lg"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                                    <div className=" ">
                                          <div className="flex justify-between flex-wrap mt-3 gap-2">
                                                <button
                                                      onClick={() => {
                                                            setCashValue(parseInt(cash) + parseInt(100)), audio.play();
                                                      }}
                                                      className="w-[65px] px-3 py-0 rounded bg-gray-200"
                                                >
                                                      100
                                                </button>
                                                <button
                                                      onClick={() => {
                                                            setCashValue(parseInt(cash) + parseInt(500)), audio.play();
                                                      }}
                                                      className="w-[65px] px-3 py-0 rounded bg-gray-200"
                                                >
                                                      500
                                                </button>
                                                <button
                                                      onClick={() => {
                                                            setCashValue(parseInt(cash) + parseInt(1000)), audio.play();
                                                      }}
                                                      className="w-[65px] px-3 py-0 rounded bg-gray-200"
                                                >
                                                      1000
                                                </button>
                                                <button
                                                      onClick={() => {
                                                            setCashValue(parseInt(cash) + parseInt(2000)), audio.play();
                                                      }}
                                                      className="w-[65px] px-3 py-0 rounded bg-gray-200"
                                                >
                                                      2000
                                                </button>
                                          </div>
                                    </div>
                                    <div className="flex justify-between bg-white-400  py-  items-center">
                                          <div className="">
                                                <h3 className="text-md">Payment Method :</h3>
                                          </div>
                                          <label>
                                                <input
                                                      name="paymentMethod"
                                                      value="Cash"
                                                      defaultChecked
                                                      onChange={(e) => setGetaway(e.target.value)}
                                                      type="radio"
                                                      className=""
                                                />{" "}
                                                Cash
                                          </label>
                                          <label>
                                                <input
                                                      name="paymentMethod"
                                                      value="mobile_bank"
                                                      onChange={(e) => {
                                                            setGetaway(e.target.value);
                                                            setIsPreviewModal("mobile_bank");
                                                      }}
                                                      type="radio"
                                                      className=""
                                                />{" "}
                                                Bank
                                          </label>
                                          <span className="text-green-700 text-sm">({getaway})</span>
                                    </div>

                                    {isPreviewModal === "mobile_bank" && (
                                          <PosPaymentModal
                                                isPreviewModal={isPreviewModal}
                                                setIsPreviewModal={setIsPreviewModal}
                                                setGetaway={setGetaway}
                                                setTransactionId={setTransactionId}
                                                transactionId={transactionId}
                                          />
                                    )}

                                    <button
                                          onClick={handleSubmit}
                                          disabled={disabledSUbmit}
                                          className={`${disabledSUbmit
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-gray-900"
                                                } b text-white rounded-md p-2 w-full mt-3`}
                                    >
                                          {loading ? "Loading......" : "    Submit"}
                                    </button>
                              </div>
                        </div>
                  </div>

                  <PosProductsDetails
                        setCartProducts={setCartProducts}
                        passUser={{
                              name: user?.name,
                              email: user?.email,
                              phoneNumber: user?.phoneNumber,
                              address: user?.address,
                        }}
                        invoice={invoice}
                        setGest={setGest}
                        setCash={setCashValue}
                        setDiscount={setDiscount}
                        setUser={setUser}
                        open={open}
                        setOpen={setOpen}
                  />
            </div>
      );
};

export default PosSidebar;
