import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React, { useRef } from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaLongArrowAltRight } from "react-icons/fa";
import Swal from "sweetalert2";

const ShippingManagement = () => {
  const {
    data: ships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getaway"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5001/api/v1/admin/allShippings"
      );
      const data = await res.json();
      return data;
    },
  });

  const [selectedMedia, setSelectedMedia] = useState("Choose your Api");
  const [disabled, setDisable] = useState(true);

  const handleGetaway = (event) => {
    const selectedValue = event.target.value;

    console.log(selectedValue);
    if (selectedValue == "Choose your Api") {
      setDisable(true);
    } else if (selectedValue === "Pathao") {
      setDisable(false);
      setSelectedMedia(selectedValue);
    } else {
      setDisable(false);
      setSelectedMedia(selectedValue);
    }
  };
  const [shop, setShop] = useState([]);
  const [loadingUpdate, setloadingUpdate] = useState(false);

  const [storePathaoData, setStorePathaoData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handlStoreSelect = (event) => {
    const selectedValue = event.target.value;
    setStorePathaoData(selectedValue);
  };

  const formRef = useRef(null);
  const dataSubmit = (event) => {
    setloadingUpdate(true);
    event.preventDefault();
    const name = selectedMedia;
    const api = event.target.api.value;
    const client_id = event.target.client_id.value;
    const secretKey = event.target.secretKey.value;
    const user_name = name == "Pathao" ? event.target.user_name.value : "";
    const password = name == "Pathao" ? event.target.password.value : "";

    const data = {
      name,
      api,
      client_id,
      secretKey,
      user_name,
      password,
      // shop_id: shopInfo._id,
      // shopId: shopInfo.shopId,
    };

    // const data = {
    //   name,
    //   api,
    //   key,
    //   secretKey,
    // };

    fetch("http://localhost:5001/api/v1/admin/shipping-interrogation", {
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
          // event.target.reset();
          // setSelectedMedia("Choose your Api");
          if (selectedMedia === "Pathao") {
            // setDisable(true);
            // handleGetaway()
            console.log("yes");
            fetch(`http://localhost:5001/api/v1/admin/pathao-shopId`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setShop(data);
                setOpenModal(data);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          } else {
            setSelectedMedia("Choose your Api");
            setloadingUpdate;
            false;
            BrightAlert("Shipping interrogation Successful", "", "success");
            event.target.reset();
            refetch();
          }
        }
      });
  };
  const updateShopId = async () => {
    console.log(storePathaoData);
    fetch(`http://localhost:5001/api/v1/admin/update-shopId`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pathao_store_id: storePathaoData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setSelectedMedia("Choose your Api");
        refetch();
        if (formRef.current) {
          formRef.current.reset();
        }
        setloadingUpdate(false);
        BrightAlert("Shipping interrogation Successful", "", "success");
        setOpenModal(false);
      });
  };
  const deleteHandel = (id) => {
    fetch(`http://localhost:5001/api/v1/admin/removeShipping/${id}`, {
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
      <div>
        <div className="md:my-10">
          <h1 className="text-2xl font-bold text-center">
            Publish your shipping information.
          </h1>
          <div className="md:p-10 p-3 bg-[#d3edc1] border-2  rounded md:m-10 mt-3">
            <form ref={formRef} onSubmit={dataSubmit} className="w-full ">
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
                    <label className="sr-only text-black" htmlFor="api">
                      {selectedMedia} Base URL
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + " Base URL"}
                      type="text"
                      id="api"
                      name="api"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="secretKey">
                      {selectedMedia} Secret-Key
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + " Secret-Key"}
                      type="text"
                      id="secretKey"
                      name="secretKey"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="client_id">
                      {selectedMedia} Client Id
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + " Client Id"}
                      type="text"
                      id="client_id"
                      name="client_id"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <label className="sr-only text-black" htmlFor="api">
                      {selectedMedia} Base URL
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + " Base URL"}
                      type="text"
                      id="api"
                      name="api"
                    />
                  </div>
                  {/* //! Select Shop */}
                  {/* <div className="my-4">
                    <label className="sr-only text-black" htmlFor="store">
                      Select an Store
                    </label>
                    <select
                      name="store"
                      onChange={handlStoreSelect}
                      value={storePathaoData}
                      id="countries"
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                    >
                    
                      <option disabled>Choose A Store</option>
                      {shop?.storeInfoArray?.map((item) => (
                        <option value={item?.store_id}>
                          {item?.store_name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="client_id">
                      {selectedMedia} client_id
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  client_id"}
                      type="text"
                      id="client_id"
                      name="client_id"
                    />
                  </div>
                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="secretKey">
                      {selectedMedia} client_secret
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  client_secret"}
                      type="text"
                      id="secretKey"
                      name="secretKey"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="user_name">
                      {selectedMedia} user_name
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  user_name"}
                      type="text"
                      id="user_name"
                      name="user_name"
                    />
                  </div>

                  <div className="my-4">
                    <label className="sr-only text-black" htmlFor="password">
                      {selectedMedia} password
                    </label>
                    <input
                      required
                      className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      placeholder={selectedMedia + "  password"}
                      type="text"
                      id="password"
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
                      {loadingUpdate
                        ? "Updating..."
                        : " Upload Shipping Information"}
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>
          {/* modal for shopid */}
          {openModal && (
            <div
              className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
                openModal ? "block" : "hidden"
              }`}
            >
              <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10  text-center ">
                <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
                  <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
                    Update ShopId of Pathao
                  </div>
                  <div
                    onClick={() => setOpenModal(!openModal)}
                    className="cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400"
                  >
                    <RxCross2 className="text-xl" />
                  </div>
                </div>

                <div className="max-h-[700px] px-10 text-start overflow-y-scroll">
                  <div action="">
                    <div className="my-4">
                      <label className="sr-only text-black" htmlFor="store">
                        Select an Store
                      </label>
                      <select
                        name="store"
                        onChange={handlStoreSelect}
                        value={storePathaoData}
                        id="countries"
                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                      >
                        <option disabled>Choose A Store</option>
                        {shop?.storeInfoArray?.map((item) => (
                          <option value={item?.store_id}>
                            {item?.store_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                      <button
                        // type="submit"
                        onClick={updateShopId}
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                      >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                          <FaLongArrowAltRight />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                          Add ShopId
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* closed modal */}
          <div className="border my-10 p-10">
            {ships.length ? (
              <div className="flex items-center justify-center gap-4 my-4 ">
                {ships?.map((get) => (
                  <div>
                    {get.name === "Steadfast" && (
                      <div className="group border relative block bg-white">
                        {/* <img
                          alt="Developer"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0WCZpBjYh0ZHeRKSPywA5x_FnBovhgJVyUfzx6Wn0w&s"
                          srcSet="hhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0WCZpBjYh0ZHeRKSPywA5x_FnBovhgJVyUfzx6Wn0w&s"
                          className="absolute inset-0 p-2 object-cover opacity-75 flex justify-center items-center transition-opacity group-hover:opacity-20"
                        /> */}

                        <img
                          alt="Developer"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0WCZpBjYh0ZHeRKSPywA5x_FnBovhgJVyUfzx6Wn0w&s"
                          srcSet="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0WCZpBjYh0ZHeRKSPywA5x_FnBovhgJVyUfzx6Wn0w&s"
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

export default ShippingManagement;
