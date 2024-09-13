import React, { useContext, useState } from "react";
import { ShopAuthProvider } from "../../../../../../AuthProvider/ShopAuthProvide";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import { useEffect } from "react";
import showAlert from "../../../../../../Common/alert";
const EditAddress = ({
  data,
  refetch,
  setEditAddress,
  setNewAddress,
  setOpen,
}) => {
  const { shopUser, shopId, shop_id, setDefaultAddress } =
    useContext(ShopAuthProvider);

  const [district, setDistrict] = useState("");

  const { data: divisions = [], isLoading: loadingDivision } = useQuery({
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

  const [division, setDivision] = useState(data === true ? "" : data.province);

  const [districts, setDistricts] = useState([]);

  const handleProvinceChange = async (event) => {
    const division = event.target.value;
    const res = await fetch(`https://bdapis.com/api/v1.1/division/${division}`);
    const data = await res.json();
    const districts = data.data;
    setDistricts(districts);
    console.log(districts, division);
  };

  console.log({ shopId: shop_id?.shop_id, userId: shopUser?._id });
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

    const uploadData = {
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
    console.log(
      data == true
        ? "https://doob.dev/api/v1/shop/upload-Address"
        : `https://doob.dev/api/v1/shop/upload-Address?addressId=${data._id}`
    );
    const url =
      data == true
        ? "https://doob.dev/api/v1/shop/upload-Address"
        : `https://doob.dev/api/v1/shop/upload-Address?addressId=${data._id}`;

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(uploadData),
    })
      .then((response) => response.json())
      .then((result) => {
        showAlert("success", "", "success");
        refetch();
        setEditAddress(false);
        setNewAddress(false);
        setOpen(false);
        setDefaultAddress(uploadData);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  const upazilla = district ? JSON?.parse(district)?.upazilla : [];

  return (
    <div>
      <form onSubmit={submitData} class Name="text-start w-full z-50">
        <div className="mt-4 w-full">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            defaultValue={data === true ? shopUser?.name : data.fullName}
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
            defaultValue={
              data === true ? shopUser?.phoneNumber : data.mobileNumber
            }
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
            defaultValue={data === true ? "" : data.province}
            onChange={handleProvinceChange}
            id="province"
            name="province"
            isLoading={loadingDivision}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* {!data ? <option value="">Please choose your province</option> : <option value={data?.province}>{data.province}</option>} */}
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
            defaultValue={data === true ? "" : data.city}
            onClick={(e) => setDistrict(e.target.value)}
            name="city"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* {!data ? <option value="">Please choose your city</option> : <option value={data.city}>{data.province}</option>} */}

            {districts &&
              districts?.map((district) => (
                <option
                  label={district.district}
                  key={district.district}
                  value={JSON?.stringify(district)}
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
            defaultValue={data === true ? "" : data.area}
            id="area"
            name="area"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* {!data ? <option value="">Please choose your area</option> : <option value={data?.area}>{data.province}</option>} */}
            {upazilla && upazilla.map((up) => <option value={up}>{up}</option>)}
          </select>

          <label
            htmlFor="address"
            className="mt-4 text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            defaultValue={data === true ? "" : data.address}
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
            defaultValue={data === true ? "" : data.landmark}
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
            defaultValue={data === true ? "" : data.deliveryLabel}
          >
            <option value="Home">Home</option>
            <option value="Office">Office</option>
          </select>
          <div className="mt-4">
            <label htmlFor="defaultAddress" className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={data === true ? true : data.defaultAddress}
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
                defaultChecked={
                  data === true ? true : data.defaultBillingAddress
                }
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

          {data === true ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 mt-8 rounded">
              Save
            </button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 mt-8 rounded">
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
