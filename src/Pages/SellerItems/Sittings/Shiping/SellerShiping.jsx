import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";

const SellerShipping = () => {
  const { shopInfo } = useContext(AuthContext);

  const {
    data: ships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getaway"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/shipping-interrogation/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const [selectedMedia, setSelectedMedia] = useState("Choose your Api");
  const [disabled, setDisable] = useState(true);

  const handleGetaway = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue == "Choose your Api") {
      setDisable(true);
    } else {
      setDisable(false);
      setSelectedMedia(selectedValue);
    }
  };

  const dataSubmit = (event) => {
    event.preventDefault();
    const name = selectedMedia;
    const api = event.target.api.value;
    const key = event.target.key.value;
    const secretKey = event.target.secretKey.value;
    const user_name = name == "Pathao" ? event.target.user_name.value : "";
    const password = name == "Pathao" ? event.target.password.value : "";

    const data = {
      name,
      api,
      key,
      secretKey,
      user_name,
      password,
      shop_id: shopInfo._id,
      shopId: shopInfo.shopId,
    };

    fetch("https://backend.doob.com.bd/api/v1/seller/shipping-interrogation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == false) {
          Swal.fire({
            icon: "info",
            title: "Already have it!",
            text: "",
          });
        } else {
          Swal.fire("Shipping interrogation Successful", "", "success");
          refetch();
        }
      });
  };

  const deleteHandel = (id) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/seller/shipping-interrogation/${id}`,
      {
        method: "Delete",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Your Getaway Delete Successfully", "", "success");
        refetch();
      });
  };

  return (
    <div>
      <div>
        <div className="md:my-10">
          <h1 className="text-2xl font-bold text-center">
            Publish your shipping information
          </h1>
          <div className="md:p-10 p-3 bg-[#d3edc1] border-2  rounded md:m-10 mt-3">
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
                  <option disabled>Choose your Api</option>
                  <option value="Pathao">Pathao</option>
                  <option value="Steadfast">Steadfast </option>
                </select>
              </div>

              {!disabled && selectedMedia !== "Pathao" ? (
                <div>
                  <div>
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} Base URL
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + " Base URL"}
                      type="text"
                      id="title"
                      name="api"
                    />
                  </div>
                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} Api Key
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  Api Key"}
                      type="text"
                      id="title"
                      name="key"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} Secret-Key
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  Secret-Key"}
                      type="text"
                      id="title"
                      name="secretKey"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} Base URL
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + " Base URL"}
                      type="text"
                      id="title"
                      name="api"
                    />
                  </div>
                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} client_id
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  client_id"}
                      type="text"
                      id="title"
                      name="key"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} client_secret
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  client_secret"}
                      type="text"
                      id="title"
                      name="secretKey"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} user_name
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  user_name"}
                      type="text"
                      id="title"
                      name="user_name"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="title">
                      {selectedMedia} password
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  password"}
                      type="text"
                      id="title"
                      name="password"
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
                    type="submit"
                    disabled={selectedMedia == "Choose your Api"}
                    className="group relative inline-flex items-center overflow-hidden rounded disabled:bg-gray-400 bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <BsArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                      Upload Shipping Information
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="border my-10 p-10">
            {ships.length ? (
              <div className="flex items-center justify-center gap-4 my-4 ">
                {ships?.map((get) => (
                  <div>
                    {get.name === "Steadfast" && (
                      <div className="group border relative block bg-white">
                        <img
                          alt="Developer"
                          src="https://pathao.com/wp-content/uploads/2023/10/Pathao-Logo_Vertical_with_TagLine.png"
                          srcSet="hhttps://pathao.com/wp-content/uploads/2023/10/Pathao-Logo_Vertical_with_TagLine.png"
                          className="absolute inset-0 p-2 object-cover opacity-75 flex justify-center items-center transition-opacity group-hover:opacity-20"
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
                    {get?.name === "Pathao" && (
                      <div className="group border relative block bg-white">
                        <img
                          alt="Developer"
                          src="https://seeklogo.com/images/P/pathao-logo-003EC541E2-seeklogo.com.png"
                          srcSet="https://seeklogo.com/images/P/pathao-logo-003EC541E2-seeklogo.com.png"
                          className="absolute inset-0 py-3 object-cover opacity-75 flex justify-center items-center transition-opacity group-hover:opacity-20"
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
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SellerShipping;
