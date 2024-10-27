import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert";

const EditPackage = ({ OpenModal, setOpenModal, packageInfo, refetch }) => {
      console.log("packageInfo", packageInfo);

      const [loading, setIsLoading] = useState(false);
      // ! submit form
      const handlePackageUpdate = async (e) => {
            e.preventDefault();

            const slotOne = {
                  to: e.target.slot1_to_price.value,
                  price: e.target.slot1_to_commotion.value,
            };

            const slotTwo = {
                  to: e.target.slot2_to_price.value,
                  price: e.target.slot2_to_commotion.value,
            };

            const slotThree = {
                  to: e.target.slot3_to_price.value,
                  price: e.target.slot3_to_commotion.value,
            };
            const data = {
                  name: e.target.packageName.value,
                  slotOne,
                  slotTwo,
                  slotThree,
            };


            console.log(data, "data");
            setIsLoading(true);
            try {
                  fetch(
                        `https://doob.dev/api/v1/admin/package/update-package/${packageInfo._id}`,
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
                              //   console.log(data);
                              showAlert("Update Package Successful", "", "success");
                              setIsLoading(false);
                              refetch();
                              setOpenModal(false);
                        });
            } catch (error) {
                  console.error("Error updating FAQ:", error);
            }
      };

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 text-start py-5 ${OpenModal ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] ">
                        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border border-black-b">
                              <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                                    Update Package
                              </div>
                              <div
                                    onClick={() => setOpenModal(!OpenModal)}
                                    className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>

                        <form className="h-[500px] bar overflow-y-auto text-start my-4" onSubmit={handlePackageUpdate}>
                              <div className=""> <label
                                    htmlFor="packageName"
                                    className="inline-block mb-1 font-medium"
                              >
                                    Package Name
                              </label>
                                    <input
                                          placeholder="Package Name"
                                          required
                                          type="text"
                                          name="packageName"
                                          defaultValue={packageInfo.name}

                                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    /></div>
                              <div className="flex gap-4">
                                    <div className="border border-gray-300 p-2">
                                          <label
                                                htmlFor="packageName"
                                                className="inline-block mb-1 font-medium"
                                          >
                                                Slot 1
                                          </label>
                                          <div className="mb-2">
                                                <input
                                                      placeholder="To Price "
                                                      required
                                                      type="number"
                                                      defaultValue={packageInfo.slotOne.to}
                                                      name="slot1_to_price"
                                                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                /></div>
                                          <div>

                                                <input
                                                      placeholder="Fee  "
                                                      type="number"
                                                      name="slot1_to_commotion"
                                                      defaultValue={packageInfo.slotOne.price}

                                                      className="flex-grow w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                />
                                          </div>
                                    </div>
                                    <div className="border border-gray-300 p-2">
                                          <label
                                                htmlFor="packageName"
                                                className="inline-block mb-1 font-medium"
                                          >
                                                Slot 2
                                          </label>
                                          <div className="mb-2">
                                                <input
                                                      placeholder="To Price "
                                                      required
                                                      defaultValue={packageInfo.slotTwo.to}
                                                      type="number"
                                                      name="slot2_to_price"
                                                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                /></div>
                                          <div>

                                                <input
                                                      placeholder="Fee"
                                                      type="number"
                                                      defaultValue={packageInfo.slotTwo.price}
                                                      name="slot2_to_commotion"
                                                      className="flex-grow w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                />
                                          </div>
                                    </div>
                                    <div className="border border-gray-300 p-2">
                                          <label
                                                htmlFor="packageName"
                                                className="inline-block mb-1 font-medium"
                                          >
                                                Slot 3
                                          </label>
                                          <div className="mb-2">
                                                <input
                                                      placeholder="To Price "
                                                      required
                                                      defaultValue={packageInfo.slotThree.to}
                                                      type="number"
                                                      name="slot3_to_price"
                                                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                /></div>
                                          <div>

                                                <input
                                                      placeholder="Fee"
                                                      type="number"
                                                      name="slot3_to_commotion"
                                                      defaultValue={packageInfo.slotThree.price}
                                                      className="flex-grow w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                />
                                          </div>
                                    </div>

                              </div>
                              {loading ? (
                                    <button
                                          disabled
                                          className="group relative cursor-not-allowed inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none "
                                    >
                                          <span className="text-sm font-medium">Loading...</span>
                                          <svg
                                                className="animate-spin h-4 w-4 ml-3 text-white"
                                                viewBox="0 0 24 24"
                                          >
                                                <circle
                                                      cx="12"
                                                      cy="12"
                                                      r="10"
                                                      stroke="currentColor"
                                                      strokeWidth="4"
                                                />
                                          </svg>
                                    </button>
                              ) : (
                                    <button
                                          type="submit"
                                          className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-3"
                                    >
                                          <span className="absolute -end-full transition-all group-hover:end-4">
                                                <BsArrowRight />
                                          </span>

                                          <span className="text-sm font-medium transition-all group-hover:me-4">
                                                Update Package
                                          </span>
                                    </button>
                              )}
                        </form>
                  </div>
            </div>
      );
};

export default EditPackage;
