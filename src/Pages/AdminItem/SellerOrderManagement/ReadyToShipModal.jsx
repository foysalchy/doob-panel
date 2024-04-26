import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const ReadyToShipModal = ({
  readyToShip,
  setReadyToShip,
  orderInfo,
  refetch,
  productStatusUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState("Other");
  console.log(selectedDelivery);
  const handleDeliveryChange = (event) => {
    setSelectedDelivery(event.target.value);
  };

  const commentSubmit = async (event) => {
    // setLoading(true)
    event.preventDefault();
    const data = event.target;
    const invoice = data.invoice.value;
    const cod_amount = data.cod_amount.value;
    const recipient_name = data.recipient_name.value;
    const recipient_phone = data.recipient_phone.value;
    const recipient_address = data.recipient_address.value;
    const note = data.note.value;

    const uploadData = {
      invoice,
      cod_amount: parseInt(cod_amount),
      recipient_name,
      recipient_phone,
      recipient_address,
      note,
      // ApiKey: shipInfo.key,
      // SecretKey: shipInfo.secretKey,
      // BaseUrl: shipInfo.api
    };
    if (selectedDelivery === "Other" || selectedDelivery === undefined) {
      productStatusUpdate("ready_to_ship", orderInfo._id);
      setReadyToShip(false);
    } else {
      console.log(shipInfo);
      const api = `${shipInfo.api}/${shipInfo.key}/${shipInfo.secretKey}`;
      console.log(uploadData);

      try {
        const res = await fetch(
          `https://backend.doob.com.bd/api/v1/seller/order-submit-steadfast`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(uploadData),
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        event.target.reset();
        setLoading(false);
        Swal.fire("Comment Uploaded", "", "success");
        refetch();
      } catch (error) {
        console.error("Error:", error.message);
        // Handle the error, e.g., show an error message to the user
      }
    }
  };

  return (
    <div className={readyToShip ? "flex" : "hidden"}>
      <div className=" mx-auto py-20">
        <div
          className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5  ${readyToShip ? "block" : "hidden"
            }`}
        >
          <div className="w-full max-w-[800px] h-[90%]  rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px] overflow-scroll">
            <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
              <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                Order id: {orderInfo._id}
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

            <form onSubmit={commentSubmit} className=" bg-white text-start ">
              <div className="mt-2 flex gap-4 items-start justify-between">
                <label className=" text-black" htmlFor="title">
                  Select Your Delivery
                </label>
                <select
                  value={selectedDelivery}
                  onChange={handleDeliveryChange}
                  name="HeadlineAct"
                  id="HeadlineAct"
                  className="flex-grow w-[50%]  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                >
                  <option value="Other">Other</option>
                  {/* {ships?.map((ship) => (
                                            <option value={ship}>{ship.name}</option>
                                        ))} */}
                </select>
              </div>

              <div>
                <div className="flex gap-4 items-center">
                  <img
                    className="h-10, w-10 border"
                    src={orderInfo.img}
                    alt=""
                  />
                  <div>
                    <h1>{orderInfo.product.name}</h1>
                    {/* <p>{product.quantity}</p> */}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-4 items-start justify-between">
                <label className=" text-black" htmlFor="title">
                  Invoice Number
                </label>
                <input
                  required
                  readOnly
                  className="flex-grow w-[50%]  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                  defaultValue={orderInfo._id}
                  type="text"
                  id="title"
                  name="invoice"
                />
              </div>
              <div className="mt-2 flex gap-4 items-start justify-between">
                <label className=" text-black" htmlFor="title">
                  Cash
                </label>
                <input
                  required
                  className="flex-grow w-[50%]  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                  defaultValue={orderInfo?.price}
                  type="text"
                  id="title"
                  name="cod_amount"
                />
              </div>
              <div className="mt-2 flex gap-4 items-start justify-between">
                <label className=" text-black" htmlFor="title">
                  Receiver Name
                </label>
                <input
                  required
                  className="flex-grow w-[50%]  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                  defaultValue={orderInfo?.userInfo?.name}
                  type="text"
                  id="title"
                  name="recipient_name"
                />
              </div>
              <div className="mt-2 flex gap-4 items-start justify-between">
                <label className=" text-black" htmlFor="title">
                  Receiver Number
                </label>
                <input
                  required
                  className="flex-grow w-[50%]  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                  defaultValue={orderInfo?.userInfo?.phoneNumber}
                  type="text"
                  id="title"
                  name="recipient_phone"
                />
              </div>
              <div className="mt-2 flex gap-4 items-start justify-between">
                <label className=" text-black" htmlFor="title">
                  Receiver address
                </label>
                <textarea
                  required
                  className="flex-grow w-[50%]  h-28 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                  defaultValue={`${orderInfo?.userInfo?.city},\n${orderInfo?.userInfo?.area}`}
                  type="text"
                  id="title"
                  name="recipient_address"
                />
              </div>
              <div className="mt-2 flex gap-4 items-start justify-between">
                <label className=" text-black" htmlFor="title">
                  Note
                </label>
                <textarea
                  className="flex-grow w-[50%]  h-12 p-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
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
                        : `Ready for ${selectedDelivery}`
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToShipModal;
