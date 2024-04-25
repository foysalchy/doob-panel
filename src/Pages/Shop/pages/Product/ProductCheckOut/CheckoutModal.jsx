import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";

const CheckoutModal = ({ modalOpen, setModalOpen, defaultAddress }) => {
  const { shopUser, shopId, shop_id } = useContext(ShopAuthProvider);

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const { data: divisions = [], refetch: refetchDivisions } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      try {
        const res = await fetch(`https://bdapis.com/api/v1.1/divisions`);
        const data = await res.json();
        const divisions = data.data;
        return divisions;
      } catch (error) {
        console.error("Error fetching shop data:", error);
        throw error; // Rethrow the error to mark the query as failed
      }
    },
  });

  const { data: districts = [], refetch: refetchDistricts } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      try {
        if (division) {
          const res = await fetch(
            `https://bdapis.com/api/v1.1/division/${division}`
          );
          const data = await res.json();
          const districts = data.data;
          return districts;
        }
        return [];
      } catch (error) {
        console.error("Error fetching shop data:", error);
        throw error; // Rethrow the error to mark the query as failed
      }
    },
  });

  const submitData = (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const province = document.getElementById("province").value;
    const city =
      document.getElementById("city").options[
        document.getElementById("city").selectedIndex
      ].label;
    const area = document.getElementById("area").value;
    const address = document.getElementById("address").value;
    const landmark = document.getElementById("landmark").value;
    const deliveryLabel = document.getElementById("deliveryLabel").value;
    const defaultAddress = document.getElementById("defaultAddress").checked;
    const defaultBillingAddress = document.getElementById(
      "defaultBillingAddress"
    ).checked;

    const data = {
      fullName,
      mobileNumber,
      province,
      city,
      area,
      address,
      landmark,
      deliveryLabel,
      defaultAddress,
      defaultBillingAddress,
      shopId: shop_id?.shop_id,
      userId: shopUser?._id,
    };
    console.log(data);

    fetch("https://salenow-v2-backend.vercel.app/api/v1/shop/upload-Address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        BrightAlert();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  const upazilla = district && JSON?.parse(district).upazilla;
  console.log(defaultAddress);
  return (
    <div>
      <div className={modalOpen ? "flex" : "hidden"}>
        <div className="mx-auto py-20">
          <div
            className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-30 shadow-2xl px-4 py-5 ${
              setModalOpen ? "block" : "hidden"
            }`}
          >
            <div className="w-full max-w-[800px] h-[90%] rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] overflow-scroll">
              <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
                <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                  Update your Address
                </div>
                <div
                  onClick={() => setModalOpen(!modalOpen)}
                  className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                >
                  <button>
                    <RxCross2 className="text-xl" />
                  </button>
                </div>
              </div>
              <form onSubmit={submitData} className="text-start">
                <div className="mt-4">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={defaultAddress?.fullName}
                    id="fullName"
                    name="fullName"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-3 w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"
                  />

                  <label
                    htmlFor="mobileNumber"
                    className="mt-4 text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    defaultValue={defaultAddress?.mobileNumber}
                    type="text"
                    placeholder="provide your phone Number"
                    id="mobileNumber"
                    name="mobileNumber"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-3 w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"
                  />

                  <label
                    htmlFor="province"
                    className="mt-4 text-sm font-medium text-gray-700"
                  >
                    Province
                  </label>
                  <select
                    onClick={(e) => {
                      setDivision(e.target.value);
                      refetchDistricts();
                      setDistrict("");
                    }}
                    id="province"
                    name="province"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option selected value={defaultAddress?.province}>
                      {defaultAddress?.province}
                    </option>
                    {divisions?.map((division) => (
                      <option key={division.division} value={division.division}>
                        {division.division}
                      </option>
                    ))}
                  </select>

                  <label
                    htmlFor="city"
                    className="mt-4 text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    onClick={(e) => setDistrict(e.target.value)}
                    name="city"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option selected value={defaultAddress?.city}>
                      {defaultAddress?.city}
                    </option>
                    {districts &&
                      districts?.map((district) => (
                        <option
                          label={district.district}
                          key={district.district}
                          value={JSON.stringify(district)}
                        >
                          {district.district}
                        </option>
                      ))}
                  </select>

                  <label
                    htmlFor="area"
                    className="mt-4 text-sm font-medium text-gray-700"
                  >
                    Area
                  </label>
                  <select
                    id="area"
                    name="area"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option selected value={defaultAddress?.area}>
                      {defaultAddress?.area}
                    </option>
                    {upazilla &&
                      upazilla.map((up) => <option value={up}>{up}</option>)}
                  </select>

                  <label
                    htmlFor="address"
                    className="mt-4 text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    defaultValue={defaultAddress?.address}
                    placeholder="House no. / building / street / area"
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-3 w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"
                  />

                  <label
                    htmlFor="landmark"
                    className="mt-4 text-sm font-medium text-gray-700"
                  >
                    Landmark (Optional)
                  </label>
                  <input
                    defaultValue={defaultAddress?.landmark}
                    type="text"
                    id="landmark"
                    name="landmark"
                    placeholder="E.g. beside train station"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-3 w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"
                  />

                  <label
                    htmlFor="deliveryLabel"
                    className="mt-4 text-sm font-medium text-gray-700"
                  >
                    Select a label for effective delivery:
                  </label>
                  <select
                    id="deliveryLabel"
                    name="deliveryLabel"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-3 w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                  </select>

                  <div className="mt-4">
                    <label
                      htmlFor="defaultAddress"
                      className="flex items-center"
                    >
                      <input
                        checked
                        type="checkbox"
                        id="defaultAddress"
                        name="defaultAddress"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Default delivery address
                      </span>
                    </label>
                    <label
                      htmlFor="defaultBillingAddress"
                      className="flex items-center mt-2"
                    >
                      <input
                        checked
                        type="checkbox"
                        id="defaultBillingAddress"
                        name="defaultBillingAddress"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Default billing address
                      </span>
                    </label>
                  </div>

                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 mt-8 rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
