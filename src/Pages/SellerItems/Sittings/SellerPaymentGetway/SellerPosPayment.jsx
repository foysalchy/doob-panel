import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
// import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import showAlert from "../../../../Common/alert";
const SellerPosPayment = () => {
      const { shopInfo } = useContext(AuthContext);

      const {
            data: getawayData = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["getaway"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/pos-payment?shopId=${shopInfo.shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      console.log(getawayData);
      const dataSubmit = (event) => {
            isLoading;
            event.preventDefault();

            // Collect all input values based on the selected media
            const formData = {
                  Getaway: selectedMedia,
                  // Add other fields based on the selected media
                  ...(selectedMedia === "Bank" && {
                        bankName: event.target.bankName.value,
                        holderName: event.target.holderName.value,
                        accountNumber: event.target.accountNumber.value,
                  }),
                  ...(selectedMedia === "Mobile" && {
                        mobileNumber: event.target.mobileNumber.value,
                        mobileType: event.target.mobileType.value,
                        name: event.target.name.value,
                  }),
                  shop_id: shopInfo._id,
                  shopId: shopInfo.shopId,
            };

            console.log(formData);
            fetch(`https://doob.dev/api/v1/seller/pos-payment`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(formData),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (!data?.status) {
                              showAlert(`${data?.message} ${selectedMedia}`, "", "info");
                              refetch();
                        } else {
                              Swal.fire({
                                    icon: "success",
                                    title: "Getaway Added Successfully",
                                    text: "",
                              });
                              event.target.reset();
                              setSelectedMedia("Choose your getaway");
                        }

                        refetch();
                  });

            // event.target.reset();
      };

      const [selectedMedia, setSelectedMedia] = useState("Choose your getaway");
      const [disabled, setDisable] = useState(true);

      const handleGetaway = (event) => {
            const selectedValue = event.target.value;

            if (selectedValue === "Choose your getaway") {
                  setDisable(true);
            } else {
                  setDisable(false);
                  setSelectedMedia(selectedValue);
            }
      };

      const deleteHandel = (id) => {
            fetch(`https://doob.dev/api/v1/seller/pos-payment/${id}`, {
                  method: "DELETE",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Your Getaway Delete Successfully", "", "success");
                        refetch();
                  });
      };

      return (
            <div>
                  <div className="">
                        <div className="md:my-10">
                              <h1 className="text-2xl font-bold text-center">
                                    Publish your Pos Payment
                              </h1>
                              <div className="md:p-10 p-4 border-2 rounded md:m-10 mt-6">
                                    <form onSubmit={dataSubmit} className="w-full ">
                                          <div className="my-4">
                                                <label className="sr-only text-black" htmlFor="title">
                                                      Select an option
                                                </label>
                                                <select
                                                      name="Media"
                                                      onChange={handleGetaway}
                                                      value={selectedMedia}
                                                      id="countries"
                                                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                >
                                                      <option disabled>Choose your getaway</option>
                                                      <option value="Bank">Bank</option>
                                                      <option value="Mobile">Mobile Bank</option>
                                                </select>
                                          </div>
                                          {selectedMedia === "Bank" && (
                                                <div>
                                                      <div>
                                                            <label className="sr-only text-black" htmlFor="title">
                                                                  {selectedMedia} Bank Name
                                                            </label>
                                                            <input
                                                                  required
                                                                  className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                  placeholder={selectedMedia + " Bank Name"}
                                                                  type="text"
                                                                  id="title"
                                                                  name="bankName"
                                                            />
                                                      </div>

                                                      <div className="my-4">
                                                            <label className="sr-only text-black" htmlFor="title">
                                                                  {selectedMedia} HolderName
                                                            </label>
                                                            <input
                                                                  required
                                                                  className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                  placeholder={selectedMedia + "  HolderName"}
                                                                  type="text"
                                                                  id="title"
                                                                  name="holderName"
                                                            />
                                                      </div>

                                                      <div className="my-4">
                                                            <label className="sr-only text-black" htmlFor="title">
                                                                  {selectedMedia} Account Number
                                                            </label>
                                                            <input
                                                                  required
                                                                  className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                  placeholder={selectedMedia + "  Account Number"}
                                                                  type="text"
                                                                  id="title"
                                                                  name="accountNumber"
                                                            />
                                                      </div>
                                                </div>
                                          )}

                                          {selectedMedia === "Mobile" && (
                                                <div>
                                                      <div className="mt-4">
                                                            <label className="sr-only text-black" htmlFor="title">
                                                                  {selectedMedia} Mobile Number*
                                                            </label>
                                                            <input
                                                                  required
                                                                  className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                  placeholder={selectedMedia + " Mobile Number*"}
                                                                  type="number"
                                                                  id="title"
                                                                  name="mobileNumber"
                                                            />
                                                      </div>
                                                      <div className="my-4">
                                                            <label className="sr-only text-black" htmlFor="mobileType">
                                                                  Select an Account Type
                                                            </label>
                                                            <select
                                                                  name="mobileType"
                                                                  id="mobileType"
                                                                  className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                            >
                                                                  <option disabled>Choose your getaway</option>
                                                                  <option value="Bkash">Bkash</option>
                                                                  <option value="Nagad">Nagad</option>
                                                                  <option value="Amarpay">Amarpay</option>
                                                            </select>
                                                      </div>
                                                      <div className="mt-4">
                                                            <label className="sr-only text-black" htmlFor="title">
                                                                  {selectedMedia} Name
                                                            </label>
                                                            <input
                                                                  className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                                  placeholder={selectedMedia + " Name*"}
                                                                  type="text"
                                                                  id="title"
                                                                  name="name"
                                                            />
                                                      </div>
                                                </div>
                                          )}

                                          <div className="mt-4">
                                                {isLoading ? (
                                                      <button
                                                            disabled
                                                            className="group relative cursor-not-allowed inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
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
                                                            disabled={disabled}
                                                            type="submit"
                                                            className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none md:mt-4 md:w-auto w-full"
                                                      >
                                                            <span className="absolute -end-full transition-all group-hover:end-4">
                                                                  <BsArrowRight />
                                                            </span>

                                                            <span className="text-sm font-medium transition-all group-hover:me-4">
                                                                  Upload Getaway
                                                            </span>
                                                      </button>
                                                )}
                                          </div>
                                    </form>
                              </div>
                        </div>

                        <div className="border md:my-10 my-4 md:p-10 p-2">
                              <p className="text-xl font-bold text-center">
                                    You have uploaded {getawayData?.data?.length} Accounts
                              </p>
                              <div className="flex flex-wrap items-center justify-center gap-4 mx-2 my-4">
                                    {getawayData?.data?.length &&
                                          getawayData?.data?.map((get) => (
                                                <div key={get._id}>
                                                      {get.Getaway === "Bank" && (
                                                            <div className="group border relative block bg-white">
                                                                  <img
                                                                        alt="Bank"
                                                                        src="https://shorturl.at/F1iAB"
                                                                        className="absolute inset-0 p-4 object-cover opacity-75 transition-opacity group-hover:opacity-20"
                                                                  />
                                                                  <div className="relative p-4 sm:p-6 lg:p-8">
                                                                        <div>
                                                                              <button
                                                                                    onClick={() => deleteHandel(get._id)}
                                                                                    className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-center justify-between"
                                                                              >
                                                                                    <span>{get?.accountNumber}</span>
                                                                                    <MdDelete />
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      )}
                                                      {get.Getaway === "Mobile" && (
                                                            <div className="group relative block border bg-white">
                                                                  <img
                                                                        alt="Mobile"
                                                                        src={
                                                                              get?.mobileType === "Bkash"
                                                                                    ? "https://shorturl.at/0Cbei"
                                                                                    : get?.mobileType === "Nagad"
                                                                                          ? "https://shorturl.at/Jhskq"
                                                                                          : "https://shorturl.at/KfFHp"
                                                                        }
                                                                        className="absolute inset-0 p-4 w-full opacity-75 transition-opacity group-hover:opacity-20"
                                                                  />

                                                                  <div className="relative p-4 sm:p-3 lg:p-6">
                                                                        <div>
                                                                              <div className="translate-y-8 transform opacity-0 transition-al group-hover:translate-y-0 group-hover:opacity-100">
                                                                                    {get?.mobileNumber}
                                                                              </div>
                                                                              <button
                                                                                    onClick={() => deleteHandel(get._id)}
                                                                                    className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                                                                              >
                                                                                    <MdDelete />
                                                                                    {/* {get?.mobileNumber} */}
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      )}
                                                </div>
                                          ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default SellerPosPayment;
