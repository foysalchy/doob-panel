import React, { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Upload.json";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import showAlert from "../../../../Common/alert";
const AddCopon = () => {

      const { shopInfo } = useContext(AuthContext);
      const [uniq, setUniq] = useState(false);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();


      const { data: your_shop_users = [] } = useQuery({
            queryKey: ["your_shop_users"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-all-shop-user?shopId=${shopInfo.shopId}`
                  );
                  const data = await res.json();
                  return data.users;
            },
      });

      const options = your_shop_users?.map((user) => ({
            value: user.email,
            label: `${user.email}   (${user.name})`,
      }));

      const handleGoBack = () => {
            navigate(-1);
      };

      const [formData, setFormData] = useState({
            code: "",
            name: "",
            type: "percentage",
            price: 10,
            usageLimitPerUser: 1,
            userLimit: 100,
            shopId: shopInfo._id,
            selectedGmails: [],
            startDateTime: "",
            endDateTime: "",
            status: true,
      });

      console.log(formData);

      const handleChange = (e) => {
            const { name, value } = e.target;

            const updatedValue =
                  name === "code" ? value.replace(/\s+/g, "").toUpperCase() : value;

            if (updatedValue.length > 3) {
                  fetch(
                        `https://doob.dev/api/v1/seller/uniq-promo/${shopInfo._id}/${updatedValue}`
                  )
                        .then((res) => res.json())
                        .then((data) => setUniq(data));
            } else {
                  setUniq(false);
            }

            setFormData((prevData) => ({
                  ...prevData,
                  [name]: updatedValue,
            }));
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formData);

            fetch(`https://doob.dev/api/v1/seller/promo-code/add`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(formData),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Your Promo Code Published Successfully", "", "success");
                        setLoading(false);
                        setFormData({
                              code: "",
                              name: "",
                              type: "percentage",
                              price: 10,
                              usageLimitPerUser: 1,
                              userLimit: 100,
                              shopId: shopInfo._id,
                              selectedGmails: [],
                        });
                        handleGoBack();
                  });
      };

      const handleSelectChange = (selectedOptions) => {
            const selectedValues = selectedOptions.map((option) => option.value);
            setFormData((prevData) => ({
                  ...prevData,
                  selectedGmails: selectedValues,
            }));
      };

      return (
            <div className="">
                  <button
                        onClick={() => handleGoBack()}
                        type="button"
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <FaLongArrowAltLeft />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Go Back
                        </span>
                  </button>

                  <h2 className="text-2xl font-semibold text-black mb-6 text-center">
                        Upload a brand for your shop
                  </h2>

                  <div>
                        <div className=" border-black p-10 rounded border-dashed border-2  my-4">
                              <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                          <label
                                                htmlFor="code"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Promo Code
                                          </label>

                                          <div className="relative">
                                                <input
                                                      type="text"
                                                      id="code"
                                                      name="code"
                                                      required
                                                      value={formData.code}
                                                      onChange={handleChange}
                                                      placeholder="Enter promo code"
                                                      className={
                                                            uniq
                                                                  ? "border-green-700 flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border  rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                                  : " flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-red-500 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                      }
                                                />
                                                {uniq && (
                                                      <span className="pointer-events-none absolute inset-y-0 text-green-500 font-bold end-0 grid w-10 place-content-center">
                                                            <Lottie animationData={groovyWalkAnimation} loop={false} />
                                                            {/* <GrStatusGood className=' bg-green-500 rounded-full font-bold' /> */}
                                                      </span>
                                                )}
                                          </div>
                                    </div>

                                    <div className="mb-4">
                                          <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Name of Promo
                                          </label>
                                          <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline "
                                                placeholder="Enter promo name"
                                          />
                                    </div>

                                    <div className="mb-4">
                                          <label
                                                htmlFor="type"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Promo Type
                                          </label>
                                          <select
                                                id="type"
                                                name="type"
                                                required
                                                value={formData.type}
                                                onChange={handleChange}
                                                className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline "
                                          >
                                                <option value="percentage">Percentage</option>
                                                <option value="fixed">Fixed</option>
                                                {/* Add more options as needed */}
                                          </select>
                                    </div>

                                    <div className="mb-4">
                                          <label
                                                htmlFor="usageLimitPerUser"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Provide what is your discount number
                                          </label>
                                          <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                required
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline "
                                                min="1"
                                          />
                                    </div>

                                    <div className="mb-4">
                                          <label
                                                htmlFor="usageLimitPerUser"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Usage Limit Per User
                                          </label>
                                          <input
                                                type="number"
                                                id="usageLimitPerUser"
                                                name="usageLimitPerUser"
                                                required
                                                value={formData.usageLimitPerUser}
                                                onChange={handleChange}
                                                className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline "
                                                min="1"
                                          />
                                    </div>

                                    <div className="mb-4">
                                          <label
                                                htmlFor="userLimit"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                User Limit
                                          </label>
                                          <input
                                                type="number"
                                                id="userLimit"
                                                name="userLimit"
                                                required
                                                value={formData.userLimit}
                                                onChange={handleChange}
                                                className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline "
                                                min="1"
                                          />
                                    </div>

                                    <div className="mb-4">
                                          <label
                                                htmlFor="startDateTime"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Set Timer
                                          </label>
                                          <div className="flex">
                                                <input
                                                      type="datetime-local"
                                                      id="startDateTime"
                                                      name="startDateTime"
                                                      value={formData.startDateTime}
                                                      onChange={handleChange}
                                                      className="flex-grow w-full h-12 px-4 mr-2 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                />
                                                <input
                                                      type="datetime-local"
                                                      id="endDateTime"
                                                      name="endDateTime"
                                                      value={formData.endDateTime}
                                                      onChange={handleChange}
                                                      className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                />
                                          </div>
                                    </div>

                                    <div className="relative">
                                          <div className="">
                                                {formData.selectedGmails.map((gmail) => (
                                                      <div
                                                            key={gmail}
                                                            className="inline-block m-1 bg-blue-500 text-white rounded px-2 py-1 mr-1"
                                                      >
                                                            {gmail}
                                                            <button
                                                                  type="button"
                                                                  onClick={() => handleRemoveGmail(gmail)}
                                                                  className="ml-1"
                                                            >
                                                                  &times;
                                                            </button>
                                                      </div>
                                                ))}
                                          </div>

                                          <Select
                                                name="selectedGmails"
                                                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none"
                                                options={options}
                                                isMulti
                                                value={options?.filter((option) =>
                                                      formData.selectedGmails.includes(option.value)
                                                )}
                                                onChange={handleSelectChange}
                                          />

                                    </div>

                                    <button
                                          type="submit"
                                          className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 w-full justify-center py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <FaLongArrowAltRight />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                {loading ? "Uploading ..." : "Add Promo Code"}
                                          </span>
                                    </button>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default AddCopon;
