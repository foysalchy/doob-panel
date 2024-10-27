import React, { useEffect, useRef } from "react";
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
import { RxCross2 } from "react-icons/rx";
import BrightAlert from "bright-alert";
import showAlert from "../../../../Common/alert";
const EditPromoCode = ({ data, setOpenModal, refetch }) => {
      // Component name changed to EditPromo
      const { shopInfo } = useContext(AuthContext);
      const [uniq, setUniq] = useState(false);
      const [loading, setLoading] = useState(false);
      const [isEditing, setIsEditing] = useState(true); // Set edit mode as default

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
            selectedGmails: data.selectedGmails,
            startDateTime: "",
            endDateTime: "",
            status: true,
      });

      // Use data prop for default values
      useEffect(() => {
            if (data) {
                  setFormData(data);
            }
      }, [data]);

      console.log(formData);

      const handleChange = (e) => {
            const { name, value } = e.target;

            const updatedValue =
                  name === "code" ? value.replace(/\s+/g, "").toUpperCase() : value;

            if (updatedValue.length > 3) {
                  fetch(`https://doob.dev/api/v1/seller/uniq-promo/${updatedValue}`)
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
            // need to remove _id with a new variable
            const data = { ...formData };
            delete data._id;

            if (isEditing) {
                  setLoading(true);
                  fetch(
                        `https://doob.dev/api/v1/seller/promo-code/update?id=${formData._id}`,
                        {
                              method: "PUT",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(data),
                        }
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              if (data.acknowledged) {
                                    showAlert('Promo Code Update', '', 'success');
                                    refetch();
                                    setOpenModal(false);
                                    setLoading(false);
                              }
                        });
            }
      };

      const handleSelectChange = (selectedOptions) => {
            const selectedValues = selectedOptions.map((option) => option.value);
            setFormData((prevData) => ({
                  ...prevData,
                  selectedGmails: selectedValues,
            }));
      };

      return (
            <div
                  className={`fixed left-0 top-0 right-0 bottom-0 flex h-full min-h-screen w-full z-[1000] bg-[#0000005b] items-center justify-center bg-dark/90 px-4 py-5 ${open ? "block" : "hidden"
                        }`}
            >
                  <form
                        onSubmit={handleSubmit}
                        className="bg-white h-[80%] w-[60%] bar overflow-hidden shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  >
                        <h2 className="text-2xl  font-semibold text-black mb-6 ">
                              Edit Promo
                              <div
                                    onClick={() => setOpenModal(false)}
                                    className="bg-gray-900 cursor-pointer flex items-center justify-center text-white w-[30px] h-[30px] float-right rounded-full text-xl"
                              >
                                    {" "}
                                    <RxCross2 />
                              </div>
                        </h2>
                        <div className="h-[80%]  p-3 bar overflow-y-auto bar overflow-x-hidden">
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
                              <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                          Select Gmails
                                    </label>
                                    <Select
                                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          options={options}
                                          value={formData.selectedGmails.map((email) => ({
                                                value: email,
                                                label: email,
                                          }))} // Map emails to options format
                                          onChange={handleSelectChange}
                                          isMulti
                                    />
                              </div>
                        </div>
                        <div className="flex items-center justify-between">
                              <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                              >
                                    Save
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default EditPromoCode;
