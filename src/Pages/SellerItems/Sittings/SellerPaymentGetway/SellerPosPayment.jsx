import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";

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
        `https://doob.dev/api/v1/seller/payment-getaway/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const dataSubmit = (event) => {
    isLoading;
    event.preventDefault();

    // Collect all input values based on the selected media
    const formData = {
      Getaway: selectedMedia,
      // Add other fields based on the selected media
      ...(selectedMedia === "Bank" && {
        BaseURL: event.target.BaseURL.value,
        key: event.target.key.value,
        Username: event.target.Username.value,
        Password: event.target.Password.value,
        Secret: event.target.Secret.value,
      }),
      ...(selectedMedia === "Nogod" && {
        apiVersion: event.target.apiVersion.value,
        BaseURL: event.target.BaseURL.value,
        CallbackURL: event.target.CallbackURL.value,
        MerchantID: event.target.MerchantID.value,
        MerchantNumber: event.target.MerchantNumber.value,
        PrivateKey: event.target.PrivateKey.value,
        PublicKey: event.target.PublicKey.value,
      }),
      ...(selectedMedia === "AmarPay" && {
        BaseURL: event.target.BaseURL.value,
        StoreID: event.target.StoreID.value,
        SignatureKey: event.target.SignatureKey.value,
      }),
      ...(selectedMedia === "Bank" && {
        bankName: event.target.bankName.value,
        accountNumber: event.target.accountNumber.value,
      }),
      shop_id: shopInfo._id,
      shopId: shopInfo.shopId,
    };

    fetch(`https://doob.dev/api/v1/seller/payment-getaway`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === false) {
          Swal.fire(`Already exist ${selectedMedia}`, "", "info");
          refetch();
        } else {
          Swal.fire({
            icon: "success",
            title: "Getaway Added Successfully",
            text: "",
          });
        }
        setSelectedMedia("Choose your getaway");
        refetch();
        form.reset();
      });

    event.target.reset();
  };

  const [selectedMedia, setSelectedMedia] = useState("Choose your getaway");
  const [disabled, setDisable] = useState(true);

  const handleGetaway = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue == "Choose your getaway") {
      setDisable(true);
    } else {
      setDisable(false);
      setSelectedMedia(selectedValue);
    }
  };

  const deleteHandel = (id) => {
    fetch(`https://doob.dev/api/v1/seller/payment-getaway/${id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Your Getaway Delete Successfully", "", "success");
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
          <div className="md:p-10 p-4 border-2  rounded md:m-10 mt-6">
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
                      //   onChange={handleGetaway}
                      //   value={selectedMedia}
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
                      //   required
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
                    className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
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
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none md:mt-4 md:w-auto w-full"
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
            You are upload {getawayData.length} Account Added{" "}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mx-2 my-4 ">
            {getawayData.map((get) => (
              <div>
                {get.Getaway === "Bank" && (
                  <div className="group border relative block bg-white">
                    <img
                      alt="Developer"
                      src="https://logos-download.com/wp-content/uploads/2022/01/Bank_Logo_icon-1536x1452.png"
                      srcSet="https://logos-download.com/wp-content/uploads/2022/01/Bank_Logo_icon-1536x1452.png"
                      className="absolute inset-0 p-4 object-cover opacity-75 transition-opacity group-hover:opacity-20"
                    />

                    <div className="relative p-4 sm:p-6 lg:p-8">
                      <div className="">
                        <button
                          onClick={() => deleteHandel(get._id)}
                          className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {get.Getaway === "Nogod" && (
                  <div className="group relative block border  bg-white">
                    <img
                      alt="Developer"
                      src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                      srcSet="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                      className="absolute inset-0 w-full mt-4 opacity-75 transition-opacity group-hover:opacity-20"
                    />

                    <div className="relative p-4 sm:p-6 lg:p-8">
                      <div className="">
                        <button
                          onClick={() => deleteHandel(get._id)}
                          className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {get.Getaway === "AmarPay" && (
                  <div className="group relative block border  bg-white">
                    <img
                      alt="Developer"
                      src="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                      srcSet="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                      className="absolute inset-0 p-4 w-full  opacity-75 transition-opacity group-hover:opacity-20"
                    />

                    <div className="relative p-4 sm:p-6 lg:p-8">
                      <div className="">
                        <button
                          onClick={() => deleteHandel(get._id)}
                          className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {get.Getaway === "Bank" && (
                  <div className="group relative block border  bg-white">
                    <div className="absolute inset-0 flex justify-center items-center p-4 w-full  opacity-75 transition-opacity group-hover:opacity-20">
                      Bank
                    </div>

                    <div className="relative p-4 sm:p-6 lg:p-8">
                      <div className="">
                        <button
                          onClick={() => deleteHandel(get._id)}
                          className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          <MdDelete />
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
