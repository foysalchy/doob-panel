import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import BrightAlert from "bright-alert";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import SelectPathaoAddress from "./SelectPathaoAddress";
import showAlert from "../../../../Common/alert";

const ShippingModal = ({
      readyToShip,
      setReadyToShip,
      orderInfo,
      refetch,
      ships,
      productStatusUpdate,
}) => {
      // const { shopInfo } = useContext(AuthContext)
      let shipInfo = ships[0];


      const { shopInfo } = useContext(AuthContext);
      const [loading, setLoading] = useState(false);

      // fetch accessToken//
      const [selectedDelivery, setSelectedDelivery] = useState("Other");
      const [accessToken, setAccessToken] = useState("");

      const fetchAccessToken = async () => {
            // Fetch your access token here
            const response = await fetch(
                  `https://doob.dev/api/v1/seller/pathao-accessToken?shop_id=${orderInfo?.shopId}`
            );
            if (!response.ok) {
                  throw new Error("Failed to fetch access token");
            }
            const data = await response.json();
            console.log(data?.data);
            setAccessToken(data?.data?.access_token);
            return data?.data?.access_token;
      };

      const setAccessTokenInLocalStorage = (accessToken) => {
            const currentDate = new Date();
            localStorage.setItem(
                  "pathaoAccessToken",
                  JSON.stringify({ token: accessToken, timestamp: currentDate.getTime() })
            );
      };

      useEffect(() => {
            // if(selectedDelivery ===""){

            // }
            const storedTokenData = localStorage.getItem("pathaoAccessToken");

            console.log(storedTokenData, "st");
            if (storedTokenData) {
                  console.log("have token");
                  const { token, timestamp } = JSON.parse(storedTokenData);
                  console.log(token);
                  setAccessToken(token);
                  const currentTime = new Date().getTime();
                  // Check if the stored token is more than 2 days old
                  if (currentTime - timestamp > 1 * 24 * 60 * 60 * 1000) {
                        // Fetch the access token again if it's expired
                        fetchAccessToken()
                              .then((newToken) => {
                                    console.log(newToken);
                                    setAccessTokenInLocalStorage(newToken);
                              })
                              .catch((error) => {
                                    console.error("Error fetching access token:", error);
                              });
                  }
            } else {
                  fetchAccessToken()
                        .then((newToken) => {
                              console.log(newToken);
                              setAccessTokenInLocalStorage(newToken);
                        })
                        .catch((error) => {
                              console.error("Error fetching access token:", error);
                        });
            }
      }, []);

      // console.log(accessToken);

      console.log("🚀 ~ selectedDelivery:", selectedDelivery);
      const handleDeliveryChange = (event) => {
            setSelectedDelivery(event.target.value);
      };

      // console.log(JSON.parse(selectedDelivery)?.name);
      const orderSubmit = async (event) => {
            setLoading(true);
            event.preventDefault();
            const data = event.target;

            const note = data?.note.value;

            if (selectedDelivery === "Other" || selectedDelivery === undefined) {
                  // productStatusUpdate("ready_to_ship", orderInfo._id);
                  try {
                        fetch(
                              `https://doob.dev/api/v1/seller/order-status-update?orderId=${orderInfo._id}&status=ready_to_ship`,
                              {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                          status: "ready_to_ship",
                                          orderId: orderInfo._id,
                                    }),
                              }
                        )
                              .then((res) => res.json())
                              .then((responseUpdate) => {
                                    setLoading(false);
                                    console.log("🚀 data:", responseUpdate);
                                    if (responseUpdate?.status === "success") {
                                          setReadyToShip(false);
                                    } else {
                                          // setLoading(false);
                                          showAlert(
                                                "Could not update the status",
                                                responseUpdate?.message,
                                                "error"
                                          );
                                    }

                                    refetch();
                              });
                  } catch (error) {
                        console.log("🚀 ~  ~ error:", error);
                        setLoading(false);
                        showAlert("Could not update the status", error.message, "error");
                  }
            } else if (JSON.parse(selectedDelivery)?.name === "Steadfast") {
                  const invoice = data?.invoice.value;
                  const cod_amount = data?.cod_amount.value;
                  const recipient_name = data?.recipient_name.value;
                  const recipient_phone = data?.recipient_phone.value;
                  const recipient_address = data?.recipient_address.value;
                  const uploadData = {
                        invoice,
                        cod_amount: parseInt(cod_amount),
                        recipient_name,
                        recipient_phone,
                        recipient_address,
                        note,
                        shopId: shopInfo._id,
                  };
                  console.log(shipInfo);
                  const api = `${shipInfo.api}/${shipInfo.key}/${shipInfo.secretKey}`;
                  console.log(uploadData);

                  // return;
                  try {
                        await fetch(`https://doob.dev/api/v1/seller/order-submit-steadfast`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(uploadData),
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    console.log(data);
                                    event.target.reset();
                                    setLoading(false);
                                    // readyToShip(false);
                                    setReadyToShip(false);
                                    showAlert('Order Shipped', '', 'success');
                                    refetch();
                              });
                  } catch (error) {
                        console.error("Error:", error.message);
                        setLoading(false);
                        // Handle the error, e.g., show an error message to the user
                  }
            } else if (JSON.parse(selectedDelivery)?.name === "Pathao") {
                  console.log("yes");
                  const recipient_city = data?.recipient_city.value;
                  const recipient_zone = data?.recipient_zone.value;
                  const recipient_area = data?.recipient_area.value;
                  const invoice = data?.invoice.value;

                  console.log(recipient_city, recipient_area, recipient_zone);

                  const pathaoData = {
                        recipient_name: data?.recipient_name?.value,
                        recipient_phone: data?.recipient_phone?.value,
                        recipient_address: data?.recipient_address?.value,
                        amount_to_collect: parseInt(data?.amount_to_collect?.value),
                        item_quantity: parseInt(data?.item_quantity?.value),
                        item_weight: parseFloat(data?.item_weight?.value),
                        item_description: data?.item_description?.value,
                        special_instruction: data?.special_instruction?.value,
                        delivery_type: parseInt(data?.delivery_type?.value),
                        item_type: parseInt(data?.item_type?.value),
                        recipient_city,
                        recipient_zone,
                        recipient_area,
                        merchant_order_id: orderInfo?.orderNumber,
                        invoice,
                  };

                  console.log(pathaoData, "sending pathao");

                  // return
                  await fetch(
                        `https://doob.dev/api/v1/seller/login-in-credintial-pathao?shop_id=${shopInfo?._id}`,
                        {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(pathaoData),
                        }
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data, "uplod data error");
                              if (data?.status) {
                                    event.target.reset();
                                    setLoading(false);
                                    // readyToShip(false);
                                    setReadyToShip(false);
                                    showAlert('Order Shipped', '', 'success');
                                    refetch();
                              }
                        });
            }
      };

      return (
            <div>
                  <div className={readyToShip ? "flex" : "hidden"}>
                        <div className=" mx-auto py-20">
                              <div
                                    className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5  ${readyToShip ? "block" : "hidden"
                                          }`}
                              >
                                    <div className="w-full max-w-[800px] h-[90%]  rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px] overflow-scroll">
                                          <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
                                                <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                                                      Order id : {orderInfo.orderNumber}
                                                </div>
                                                <div
                                                      onClick={() => setReadyToShip(false)}
                                                      className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                                                >
                                                      <button>
                                                            {" "}
                                                            <RxCross2 className="text-xl" />
                                                      </button>
                                                </div>
                                          </div>

                                          <form onSubmit={orderSubmit} className=" bg-white text-start ">
                                                <div>
                                                      <label className=" text-black" htmlFor="title">
                                                            Select Your Delivery
                                                      </label>

                                                      <select
                                                            value={selectedDelivery}
                                                            onChange={handleDeliveryChange}
                                                            name="HeadlineAct"
                                                            id="HeadlineAct"
                                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                      >
                                                            <option value="Other">Other</option>
                                                            {ships?.map((ship) => (
                                                                  <option value={JSON.stringify(ship)} key={ship.name}>
                                                                        {ship.name}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </div>

                                                <div>
                                                      Product List :
                                                      <div className="flex flex-col gap-2">
                                                            {" "}
                                                            {orderInfo?.productList?.map((product) => (
                                                                  <div className="flex gap-4 items-center">
                                                                        <img
                                                                              className="h-10, w-10 border"
                                                                              src={product.img}
                                                                              alt=""
                                                                        />
                                                                        <div>
                                                                              <h1>{product.productName}</h1>
                                                                              <p>{product.quantity}</p>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                                {selectedDelivery === "Other" && (
                                                      <>
                                                            <div className="mt-2">
                                                                  <label className=" text-black" htmlFor="title">
                                                                        Invoice Number
                                                                  </label>
                                                                  <input
                                                                        required
                                                                        readOnly
                                                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo._id}
                                                                        type="text"
                                                                        id="title"
                                                                        name="invoice"
                                                                  />
                                                            </div>
                                                            <div className="mt-2">
                                                                  <label className=" text-black" htmlFor="title">
                                                                        Cash
                                                                  </label>
                                                                  <input
                                                                        required
                                                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo?.promoHistory?.normalPrice}
                                                                        type="text"
                                                                        id="title"
                                                                        name="cod_amount"
                                                                  />
                                                            </div>
                                                            <div className="mt-2">
                                                                  <label className=" text-black" htmlFor="title">
                                                                        Receiver Name
                                                                  </label>
                                                                  <input
                                                                        required
                                                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo?.addresses?.fullName}
                                                                        type="text"
                                                                        id="title"
                                                                        name="recipient_name"
                                                                  />
                                                            </div>
                                                            <div className="mt-2">
                                                                  <label className=" text-black" htmlFor="title">
                                                                        Receiver Number
                                                                  </label>
                                                                  <input
                                                                        required
                                                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo?.addresses?.mobileNumber}
                                                                        type="text"
                                                                        id="title"
                                                                        name="recipient_phone"
                                                                  />
                                                            </div>
                                                            <div className="mt-2">
                                                                  <label className=" text-black" htmlFor="title">
                                                                        Receiver address
                                                                  </label>
                                                                  <textarea
                                                                        required
                                                                        className="flex-grow w-full re h-28 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={`${orderInfo?.addresses?.province},\n${orderInfo?.addresses?.city},\n${orderInfo?.addresses?.area},\n${orderInfo?.addresses?.address}`}
                                                                        type="text"
                                                                        id="title"
                                                                        name="recipient_address"
                                                                  />
                                                            </div>
                                                      </>
                                                )}
                                                {/* StedFast */}
                                                {selectedDelivery !== "Other" &&
                                                      JSON.parse(selectedDelivery)?.name === "Steadfast" && (
                                                            <>
                                                                  <div className="mt-2">
                                                                        <label className=" text-black" htmlFor="title">
                                                                              Invoice Number
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              readOnly
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo._id}
                                                                              type="text"
                                                                              id="title"
                                                                              name="invoice"
                                                                        />
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <label className=" text-black" htmlFor="title">
                                                                              Cash
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo?.promoHistory?.normalPrice}
                                                                              type="text"
                                                                              id="title"
                                                                              name="cod_amount"
                                                                        />
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <label className=" text-black" htmlFor="title">
                                                                              Receiver Name
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo?.addresses?.fullName}
                                                                              type="text"
                                                                              id="title"
                                                                              name="recipient_name"
                                                                        />
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <label className=" text-black" htmlFor="title">
                                                                              Receiver Number
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo?.addresses?.mobileNumber}
                                                                              type="text"
                                                                              id="title"
                                                                              name="recipient_phone"
                                                                        />
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <label className=" text-black" htmlFor="title">
                                                                              Receiver address
                                                                        </label>
                                                                        <textarea
                                                                              required
                                                                              className="flex-grow w-full re h-28 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={`${orderInfo?.addresses?.province},\n${orderInfo?.addresses?.city},\n${orderInfo?.addresses?.area},\n${orderInfo?.addresses?.address}`}
                                                                              type="text"
                                                                              id="title"
                                                                              name="recipient_address"
                                                                        />
                                                                  </div>
                                                            </>
                                                      )}
                                                {/* ///! pathao */}
                                                {selectedDelivery !== "Other" &&
                                                      JSON.parse(selectedDelivery)?.name === "Pathao" && (
                                                            <>
                                                                  <div className="mt-2">
                                                                        <label className=" text-black" htmlFor="title">
                                                                              Invoice Number
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              readOnly
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo._id}
                                                                              type="text"
                                                                              id="title"
                                                                              name="invoice"
                                                                        />
                                                                  </div>
                                                                  <SelectPathaoAddress accessToken={accessToken} />
                                                                  <div className="mt-2">
                                                                        <label className="text-black" htmlFor="recipient_name">
                                                                              Recipient Name
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              defaultValue={orderInfo?.addresses?.fullName}
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="text"
                                                                              id="recipient_name"
                                                                              name="recipient_name"
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label className="text-black" htmlFor="recipient_phone">
                                                                              Recipient Phone
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              defaultValue={orderInfo?.addresses?.mobileNumber}
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="text"
                                                                              id="recipient_phone"
                                                                              name="recipient_phone"
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label
                                                                              className="text-black"
                                                                              htmlFor="recipient_address"
                                                                        >
                                                                              Recipient Address
                                                                        </label>
                                                                        {console.log(orderInfo)}
                                                                        <input
                                                                              required
                                                                              minLength="10"
                                                                              defaultValue={`${orderInfo?.addresses?.province},\n${orderInfo?.addresses?.city},\n${orderInfo?.addresses?.area},\n${orderInfo?.addresses?.address}`}
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="text"
                                                                              id="recipient_address"
                                                                              name="recipient_address"
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label
                                                                              className="text-black"
                                                                              htmlFor="amount_to_collect"
                                                                        >
                                                                              Amount to Collect
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="number"
                                                                              id="amount_to_collect"
                                                                              name="amount_to_collect"
                                                                              // defaultValue={0}
                                                                              defaultValue={
                                                                                    orderInfo?.promoHistory?.normalPrice ?? 0
                                                                              }
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label className="text-black" htmlFor="item_quantity">
                                                                              Item Quantity
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="number"
                                                                              id="item_quantity"
                                                                              name="item_quantity"
                                                                              defaultValue={1}
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label className="text-black" htmlFor="item_weight">
                                                                              Item Weight (in KG)
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              min="0.5"
                                                                              defaultValue="0.5"
                                                                              max="10"
                                                                              step="0.01"
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="number"
                                                                              id="item_weight"
                                                                              name="item_weight"
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label
                                                                              className="text-black"
                                                                              htmlFor="item_description"
                                                                        >
                                                                              Item Description (Optional)
                                                                        </label>
                                                                        <textarea
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="text"
                                                                              id="item_description"
                                                                              name="item_description"
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label
                                                                              className="text-black"
                                                                              htmlFor="special_instruction"
                                                                        >
                                                                              Special Instruction (Optional)
                                                                        </label>
                                                                        <input
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              type="text"
                                                                              id="special_instruction"
                                                                              name="special_instruction"
                                                                        />
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label className="text-black" htmlFor="delivery_type">
                                                                              Delivery Type
                                                                        </label>
                                                                        <select
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              id="delivery_type"
                                                                              name="delivery_type"
                                                                        >
                                                                              <option value="48">Normal Delivery(48 Hours)</option>
                                                                              <option value="12">
                                                                                    On Demand Delivery (24 Hours)
                                                                              </option>
                                                                        </select>
                                                                  </div>

                                                                  <div className="mt-2">
                                                                        <label className="text-black" htmlFor="item_type">
                                                                              Parcel Type
                                                                        </label>
                                                                        <select
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              id="item_type"
                                                                              name="item_type"
                                                                        >
                                                                              <option value={2}>Parcel</option>
                                                                              <option value={1}>Document</option>
                                                                        </select>
                                                                  </div>
                                                            </>
                                                      )}

                                                <div className="mt-2">
                                                      <label className=" text-black" htmlFor="title">
                                                            Note (Optional)
                                                      </label>
                                                      <textarea
                                                            className="flex-grow w-full re h-12 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                            type="text"
                                                            id="title"
                                                            name="note"
                                                      />
                                                </div>

                                                <div className="flex justify-end gap-5 px-4">
                                                      {/* cancel button */}
                                                      <p
                                                            onClick={() => setReadyToShip(false)}
                                                            className="px-2.5 py-1.5 rounded-md text-white cursor-pointer text-sm bg-red-500"
                                                      >
                                                            Cancel
                                                      </p>
                                                      <input
                                                            type="submit"
                                                            disabled={loading}
                                                            className="px-2.5 py-1.5 rounded-md text-white cursor-pointer text-sm bg-indigo-500"
                                                            value={
                                                                  loading
                                                                        ? "Uploading.."
                                                                        : selectedDelivery === "Other"
                                                                              ? "Ready to ship"
                                                                              : `Ready for Ship`
                                                            }
                                                      />
                                                </div>
                                          </form>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ShippingModal;
