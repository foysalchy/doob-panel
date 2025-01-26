import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import Select from "react-select";
import showAlert from "../../../Common/alert";

const EditPrice = ({ OpenModal, setOpenModal, FAQInfo, refetch }) => {
      const [benefits, setBenefits] = useState(FAQInfo.benefits);
      const [limitValue, setLimitValue] = useState(FAQInfo.limitValue);

      console.log(FAQInfo?.permissions);
      const [selectedPermissions, setSelectedPermissions] = useState(
            Array.isArray(FAQInfo?.permissions) ? FAQInfo.permissions : []
      );

      const appendBenefit = () => {
            const newBenefits = [...benefits, "New Benefit"];
            setBenefits(newBenefits);
      };

      const removeBenefit = (indexToRemove) => {
            const newBenefits = benefits?.filter((_, i) => i !== indexToRemove);

            setBenefits(newBenefits);
      };

      const options = [
            { name: "Domain Management", route: "domain-management" },
            { name: "Channel Integration", route: "channel-integration" },
            { name: "Warehouse", route: "warehouse" },
            { name: "Staff Account", route: "staff-account" },
            { name: "POS", route: "pos" },
            { name: "Payment", route: "payment-intergation" },
            { name: "Sell on doob", route: "Sell on doob" },
            { name: "Fraud", route: "Fraud" },
            { name: "Omni Chat", route: "Omni Chat" },
            { name: "App", route: "app" },
            { name: "Pixel", route: "facebook-pixel" },
            // Add more options as needed
      ];

      // console.log(selectedPermissions, "");

      // const selectedPermissions = [];
      const handleChange = (selectedRoute) => {
            setSelectedPermissions((prevPermissions) => {
                  const currentOption = options.find((itm) => itm.route === selectedRoute);
                  if (!currentOption) return prevPermissions;

                  if (prevPermissions.some((perm) => perm.route === selectedRoute)) {
                        // Remove the permission if already selected
                        return prevPermissions?.filter((perm) => perm.route !== selectedRoute);
                  } else {
                        // Add the permission if not selected
                        return [...prevPermissions, currentOption];
                  }
            });
      };
      // console.log(benefits);
      const handleFAQUpdate = async (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const price = e.target.price.value;
            const timeDuration = e.target.timeDuration.value;
            const best = e.target.best.value;
            const one = e.target.one.value;
            const six = e.target.six.value;
            const twelve = e.target.twelve.value;
            const twenty = e.target.twenty.value;
            const product_limit = e.target.product_limit.value;
            const tagname = e.target.tagname.value;

            const data = {
                  name,
                  price,
                  timeDuration,
                  best,
                  benefits,
                  one,
                  six,
                  twelve,
                  twenty,
                  permissions: selectedPermissions,
                  limitValue,
                  product_limit,
                  tagname,
            };

            try {
                  fetch(`https://doob.dev/api/v1/admin/price/update-price/${FAQInfo._id}`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              showAlert("Update Price Successful", "", "success");
                              refetch();
                              setOpenModal(false);
                        });
            } catch (error) {
                  console.error("Error updating FAQ:", error);
            }
      };
      // const contentEditableRefs = useRef([]);
      const handleBenefitChange = (index, value) => {
            console.log({ index, value });
            setBenefits((prevBenefits) => {
                  const newBenefits = [...prevBenefits];
                  newBenefits[index] = value;
                  return newBenefits;
            });
      };

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 text-start py-5 ${OpenModal ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px] text-start  rounded-[20px] bg-white pb-4  ">
                        <div className="flex justify-between z-50 pt-4 items-start  px-8 w-full sticky top-0 rounded-t-[20px] bg-gray-900 border border-black-b">
                              <div className="pb-2 text-xl font-bold text-white  sm:text-2xl">
                                    Update Pricing
                              </div>
                              <div
                                    onClick={() => setOpenModal(!OpenModal)}
                                    className="cursor-pointer bg-gray-500 rounded-full h-8 w-8 flex justify-center items-center text-2xl hover:text-red-500"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>
                        <div className="h-[500px] bar overflow-y-scroll ">
                              <form className=" px-8 py-4" onSubmit={handleFAQUpdate}>
                                    <p className="text-start">Name</p>
                                    <input
                                          name="name"
                                          className="w-full p-2 my-4 border border-black"
                                          defaultValue={FAQInfo.name}
                                    />
                                    <p className="text-start">Price</p>
                                    <input
                                          name="price"
                                          className="w-full p-2 my-4 border border-black"
                                          defaultValue={FAQInfo.price}
                                    />
                                    <p className="text-start">Tag Name</p>
                                    <input
                                          name="tagname"
                                          className="w-full p-2 my-4 border border-black"
                                          defaultValue={FAQInfo.tagname}
                                    />

                                    <p className="text-start">Time Duration</p>

                                    <div className="relative mt-1.5">
                                          <input
                                                defaultValue={FAQInfo.timeDuration}
                                                type="text"
                                                name="timeDuration"
                                                list="HeadlineActArtist"
                                                id="HeadlineAct"
                                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-black border border-black-gray-300 rounded shadow-sm appearance-none focus:border border-black-purple-400 focus:outline-none focus:shadow-outline"
                                                placeholder="Please select"
                                          />
                                    </div>

                                    <datalist name="HeadlineAct" id="HeadlineActArtist">
                                          <option value="10Days">10 days</option>
                                          <option value="Monthly">Monthly</option>
                                          <option value="Yearly">Yearly</option>
                                          <option value="Lifetime">Lifetime</option>
                                    </datalist>

                                    <label
                                          htmlFor="firstName"
                                          className="inline-block mb-1 font-medium"
                                    >
                                          1st Mouth Descount
                                    </label>
                                    <input
                                          placeholder="$50"
                                          required
                                          type="number"
                                          defaultValue={FAQInfo?.one}
                                          name="one"
                                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                          htmlFor="firstName"
                                          className="inline-block mb-1 font-medium"
                                    >
                                          Six Month Discount
                                    </label>
                                    <input
                                          placeholder="$50"
                                          required
                                          defaultValue={FAQInfo?.six}
                                          type="number"
                                          name="six"
                                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                          htmlFor="firstName"
                                          className="inline-block mb-1 font-medium"
                                    >
                                          One Year Discount
                                    </label>
                                    <input
                                          placeholder="$50"
                                          required
                                          defaultValue={FAQInfo?.twelve}
                                          type="number"
                                          name="twelve"
                                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                          htmlFor="firstName"
                                          className="inline-block mb-1 font-medium"
                                    >
                                          Two Year Discount
                                    </label>
                                    <input
                                          placeholder="$50"
                                          defaultValue={FAQInfo?.twenty}
                                          required
                                          type="number"
                                          name="twenty"
                                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    />

                                    <div>
                                          <p className="text-start">Is it Best</p>

                                          <select
                                                defaultValue={FAQInfo.best}
                                                name="best"
                                                id="HeadlineAct"
                                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-black  rounded shadow-sm appearance-none focus:border border-black-purple-400 focus:outline-none focus:shadow-outline"
                                          >
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                          </select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                          <label className="text-start  ml-0">Seller permission</label>
                                          {/* <Select
                options={options}
                isMulti={true}
                defaultValue={FAQInfo?.permissions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.route}
                onChange={handleChange}
              /> */}
                                          <div className="flex flex-wrap gap-3">
                                                {options?.map((itm) => (
                                                      <div key={itm?.name} className="flex gap-2 flex-wrap">
                                                            <input
                                                                  type="checkbox"
                                                                  id={itm.name}
                                                                  name={itm.name}
                                                                  value={itm.route}
                                                                  onChange={(e) => handleChange(e.target.value)}
                                                                  checked={selectedPermissions.some(
                                                                        (perm) => perm.route === itm.route
                                                                  )}
                                                            />
                                                            <label htmlFor={itm.name}>{itm.name}</label>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="flex flex-col items-start gap-2 mt-3 w-full">
                                          Benefits:
                                          <div className="border w-full p-4">
                                                {benefits?.map((data, index) => (
                                                      <div className="" key={index}>
                                                            {/* <div
                      onInput={(e) =>
                        handleBenefitChange(index, e.currentTarget.textContent)
                      }
                      contentEditable
                      name="benefit"
                      className="w-full p-2 my-1 border border-black text-start"
                    >
                      {data}
                    </div> */}
                                                            <input
                                                                  defaultValue={data}
                                                                  onChange={(e) =>
                                                                        handleBenefitChange(index, e.target.value)
                                                                  }
                                                                  className="w-full p-2 my-1 border border-black text-start"
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="bg-red-500 text-start px-4 py-0.5 mb-2 flex justify-start"
                                                                  onClick={() => removeBenefit(index)}
                                                            >
                                                                  Remove
                                                            </button>
                                                      </div>
                                                ))}
                                                <button
                                                      type="button"
                                                      className="bg-green-500 px-4 py-1"
                                                      onClick={appendBenefit}
                                                >
                                                      Add More Benefit
                                                </button>
                                          </div>
                                    </div>

                                    <div className="my-4">
                                          <label>Daraz Limit:</label>
                                          <input
                                                onChange={(e) => setLimitValue(e.target.value)}
                                                name="darazLimit"
                                                type="number"
                                                defaultValue={FAQInfo?.limitValue}
                                                className="border px-2 py-1 rounded"
                                                placeholder="daraz limit"
                                          />
                                    </div>

                                    <label>Product Limit:</label>
                                    <input
                                          name="product_limit"
                                          type="number"
                                          defaultValue={FAQInfo?.product_limit}
                                          className="border px-2 py-1 rounded"
                                          placeholder="product_limit"
                                    />

                                    <div className="flex justify-start">
                                          <button
                                                type="submit"
                                                className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
                                          >
                                                <span className="absolute -start-full transition-all group-hover:start-4">
                                                      <svg
                                                            className="h-5 w-5 rtl:rotate-180"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                            />
                                                      </svg>
                                                </span>
                                                <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                      Update Price
                                                </span>
                                          </button>
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default EditPrice;
