import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import BrightAlert from "bright-alert";
import SelectPathaoAddress from "../../SellerItems/OrderManagment/ManageOrder/SelectPathaoAddress";
import SelectPathaoAdminAddress from "./SelectAdminPathaoAddress";
import showAlert from "../../../Common/alert";

const ProductItem = ({ product,
      quantity }) => {
      return (
            <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                        <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                        />
                  </div>
                  <div>
                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">Quantity: {product.quantity ?? quantity}</p>
                  </div>
            </li>
      );
};

const ReadyToShipModal = ({
      readyToShip,
      setReadyToShip,
      orderInfo,
      refetch,
      ships,
      productStatusUpdate,
}) => {


      const [loading, setLoading] = useState(false);

      // fetch accessToken//

      const [accessToken, setAccessToken] = useState("");

      const fetchAccessToken = async () => {
            // Fetch your access token here
            const response = await fetch(
                  `https://doob.dev/api/v1/admin/pathao-accessToken`
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
                  "pathaoAdminAccessToken",
                  JSON.stringify({ token: accessToken, timestamp: currentDate.getTime() })
            );
      };

      useEffect(() => {
            const storedTokenData = localStorage.getItem("pathaoAdminAccessToken");

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

      const [selectedDelivery, setSelectedDelivery] = useState("Other");
      const handleDeliveryChange = (event) => {
            setSelectedDelivery(event.target.value);
      };

      const orderSubmit = async (event) => {
            // setLoading(true)
            event.preventDefault();
            const data = event.target;

            const note = data?.note.value;

            if (selectedDelivery === "Other" || selectedDelivery === undefined) {
                  productStatusUpdate("ready_to_ship", orderInfo._id);
                  setReadyToShip(false);
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
                  };


                  try {
                        await fetch(`https://doob.dev/api/v1/admin/order-submit-steadfast`, {
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
                                    showAlert(" Updated Shipped Success", "", "success");
                                    refetch();
                              });
                  } catch (error) {
                        console.error("Error:", error.message);
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
                        merchant_order_id: orderInfo?.orderNumber ?? orderInfo?._id,
                        invoice,
                  };

                  console.log(pathaoData, "sending pathao");

                  // return
                  await fetch(`https://doob.dev/api/v1/admin/login-in-credintial-pathao`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(pathaoData),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data, "uplod data error");
                              if (data?.status) {
                                    event.target.reset();
                                    setLoading(false);
                                    // readyToShip(false);
                                    setReadyToShip(false);
                                    showAlert(" Shipped Success", "", "success");
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
                                    <div className="w-full max-w-[800px] h-[90%]  rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px] bar overflow-scroll">
                                          <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
                                                <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                                                      Order id : {orderInfo._id}
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

                                          <form onSubmit={orderSubmit} className=" bg-white text-start  ">
                                                <div className="">
                                                      <label className="block text-black" htmlFor="title">
                                                            Select Your Delivery :
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
                                                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Product List:</h3>
                                                      <ul className="space-y-4">
                                                            {Array.isArray(orderInfo?.product) ? (
                                                                  orderInfo.product.map((product) => (
                                                                        <ProductItem key={product.productId} product={product} />
                                                                  ))
                                                            ) : (
                                                                  orderInfo?.product && <ProductItem product={orderInfo.product} quantity={orderInfo.quantity} />
                                                            )}
                                                      </ul>
                                                </div>

                                                {selectedDelivery === "Other" && (
                                                      <>
                                                            <div className="mt-2">
                                                                  <label className="block text-black" htmlFor="title">
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
                                                                  <label className="block text-black" htmlFor="title">
                                                                        Cash
                                                                  </label>
                                                                  <input
                                                                        required
                                                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo?.promoHistory?.normalPrice ?? orderInfo.price
                                                                        }
                                                                        type="text"
                                                                        id="title"
                                                                        name="cod_amount"
                                                                  />
                                                            </div>
                                                            <div className="mt-2">
                                                                  <label className="block text-black" htmlFor="title">
                                                                        Receiver Name
                                                                  </label>
                                                                  <input
                                                                        required
                                                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo?.addresses?.fullName ?? orderInfo?.userInfo?.fullName}
                                                                        type="text"
                                                                        id="title"
                                                                        name="recipient_name"
                                                                  />
                                                            </div>
                                                            <div className="mt-2">
                                                                  <label className="block text-black" htmlFor="title">
                                                                        Receiver Number
                                                                  </label>
                                                                  <input
                                                                        required
                                                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo?.addresses?.mobileNumber ?? orderInfo?.userInfo?.mobileNumber}
                                                                        type="text"
                                                                        id="title"
                                                                        name="recipient_phone"
                                                                  />
                                                            </div>
                                                            <div className="mt-2">
                                                                  <label className="block text-black" htmlFor="title">
                                                                        Receiver address
                                                                  </label>
                                                                  <textarea
                                                                        required
                                                                        className="flex-grow w-full re h-28 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                        defaultValue={orderInfo?.addresses?.province ? `${orderInfo?.addresses?.province},\n${orderInfo?.addresses?.city},\n${orderInfo?.addresses?.area},\n${orderInfo?.addresses?.address}` : orderInfo?.userInfo?.address}
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
                                                                        <label className="block text-black" htmlFor="title">
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
                                                                        <label className="block text-black" htmlFor="title">
                                                                              Cash
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo?.promoHistory?.normalPrice ?? orderInfo.price}
                                                                              type="text"
                                                                              id="title"
                                                                              name="cod_amount"
                                                                        />
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <label className="block text-black" htmlFor="title">
                                                                              Receiver Name
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo?.addresses?.fullName ?? orderInfo?.userInfo?.fullName}
                                                                              type="text"
                                                                              id="title"
                                                                              name="recipient_name"
                                                                        />
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <label className="block text-black" htmlFor="title">
                                                                              Receiver Number
                                                                        </label>
                                                                        <input
                                                                              required
                                                                              className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo?.addresses?.mobileNumber ?? orderInfo?.userInfo?.mobileNumber}
                                                                              type="text"
                                                                              id="title"
                                                                              name="recipient_phone"
                                                                        />
                                                                  </div>
                                                                  <div className="mt-2">
                                                                        <label className="block text-black" htmlFor="title">
                                                                              Receiver address
                                                                        </label>
                                                                        <textarea
                                                                              required
                                                                              className="flex-grow w-full re h-28 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                              defaultValue={orderInfo?.addresses?.province ? `${orderInfo?.addresses?.province},\n${orderInfo?.addresses?.city},\n${orderInfo?.addresses?.area},\n${orderInfo?.addresses?.address}` : orderInfo?.userInfo?.address}
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
                                                                        <label className="block text-black" htmlFor="title">
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
                                                                  {console.log(orderInfo.userInfo,'orderInfo.userInfo')}
                                                                  <SelectPathaoAdminAddress address={orderInfo.userInfo} accessToken={accessToken} />
                                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">




                                                                        <div>
                                                                              <label htmlFor="recipient_name" className="block text-sm font-medium text-gray-700 mb-1">
                                                                                    Recipient Name
                                                                              </label>
                                                                              <input
                                                                                    id="recipient_name"
                                                                                    name="recipient_name"
                                                                                    type="text"
                                                                                    required
                                                                                    defaultValue={orderInfo?.addresses?.fullName ?? orderInfo?.userInfo?.fullName}
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                              />
                                                                        </div>

                                                                        <div>
                                                                              <label htmlFor="recipient_phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                                                    Recipient Phone
                                                                              </label>
                                                                              <input
                                                                                    id="recipient_phone"
                                                                                    name="recipient_phone"
                                                                                    type="text"
                                                                                    required
                                                                                    defaultValue={orderInfo?.addresses?.mobileNumber ?? orderInfo?.userInfo?.mobileNumber}
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                              />
                                                                        </div>
                                                                  </div>

                                                                  <div>
                                                                        <label htmlFor="recipient_address" className="block text-sm font-medium text-gray-700 mb-1">
                                                                              Recipient Address
                                                                        </label>
                                                                        <textarea
                                                                              id="recipient_address"
                                                                              name="recipient_address"
                                                                              required
                                                                              minLength={10}
                                                                              defaultValue={orderInfo?.addresses?.province ? `${orderInfo?.addresses?.province},\n${orderInfo?.addresses?.city},\n${orderInfo?.addresses?.area},\n${orderInfo?.addresses?.address}` : orderInfo?.userInfo?.address}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-24"
                                                                        />
                                                                  </div>

                                                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                        <div>
                                                                              <label htmlFor="amount_to_collect" className="block text-sm font-medium text-gray-700 mb-1">
                                                                                    Amount to Collect
                                                                              </label>
                                                                              <input
                                                                                    id="amount_to_collect"
                                                                                    name="amount_to_collect"
                                                                                    type="number"
                                                                                    required
                                                                                    defaultValue={orderInfo?.promoHistory?.normalPrice ?? orderInfo.price}
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                              />
                                                                        </div>

                                                                        <div>
                                                                              <label htmlFor="item_quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                                                                    Item Quantity
                                                                              </label>
                                                                              <input
                                                                                    id="item_quantity"
                                                                                    name="item_quantity"
                                                                                    type="number"
                                                                                    required
                                                                                    defaultValue={1}
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                              />
                                                                        </div>

                                                                        <div>
                                                                              <label htmlFor="item_weight" className="block text-sm font-medium text-gray-700 mb-1">
                                                                                    Item Weight (in KG)
                                                                              </label>
                                                                              <input
                                                                                    id="item_weight"
                                                                                    name="item_weight"
                                                                                    type="number"
                                                                                    required
                                                                                    min="0.5"
                                                                                    max="10"
                                                                                    step="0.01"
                                                                                    defaultValue="0.5"
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                              />
                                                                        </div>
                                                                  </div>

                                                                  <div>
                                                                        <label htmlFor="item_description" className="block text-sm font-medium text-gray-700 mb-1">
                                                                              Item Description (Optional)
                                                                        </label>
                                                                        <textarea
                                                                              id="item_description"
                                                                              name="item_description"
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-24"
                                                                        />
                                                                  </div>

                                                                  <div>
                                                                        <label htmlFor="special_instruction" className="block text-sm font-medium text-gray-700 mb-1">
                                                                              Special Instruction (Optional)
                                                                        </label>
                                                                        <input
                                                                              id="special_instruction"
                                                                              name="special_instruction"
                                                                              type="text"
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                        />
                                                                  </div>

                                                                  <div>
                                                                        <label htmlFor="delivery_type" className="block text-sm font-medium text-gray-700 mb-1">
                                                                              Delivery Type
                                                                        </label>
                                                                        <select
                                                                              id="delivery_type"
                                                                              name="delivery_type"
                                                                              required
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                        >
                                                                              <option value="48">Normal Delivery (48 Hours)</option>
                                                                              <option value="12">On Demand Delivery (24 Hours)</option>
                                                                        </select>
                                                                  </div>

                                                                  <div>
                                                                        <label htmlFor="item_type" className="block text-sm font-medium text-gray-700 mb-1">
                                                                              Parcel Type
                                                                        </label>
                                                                        <select
                                                                              id="item_type"
                                                                              name="item_type"
                                                                              required

                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                        >
                                                                              <option value="2">Parcel</option>
                                                                              <option value="1">Document</option>
                                                                        </select>
                                                                  </div>
                                                            </>
                                                      )}

                                                <div className="mt-2">
                                                      <label className="block text-black" htmlFor="title">
                                                            Note (Optional)
                                                      </label>
                                                      <textarea
                                                            className="flex-grow w-full re h-12 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                            type="text"
                                                            id="title"
                                                            name="note"
                                                      />
                                                </div>

                                                <div className="flex justify-end px-4">
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

export default ReadyToShipModal;
