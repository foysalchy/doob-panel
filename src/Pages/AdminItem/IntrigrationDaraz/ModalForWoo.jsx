import React from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert";

const ModalForWoo = ({ woo_commerce, setWoModal, OpenModal, shopId, setShopInfo }) => {
      const [loading, setLoading] = useState(false);

      const LoginWoocomarce = (e) => {
            e.preventDefault();
            setLoading(true);
            const domain = e.target.domain.value;
            const consumer_key = e.target.consumer_key.value;
            const consumer_secret = e.target.consumer_secret.value;
            const data = {
                  domain,
                  consumer_key,
                  consumer_secret,
                  shopId,
            };
            fetch(`https://doob.dev/api/v1/woo/login`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        if (data.message) {
                              showAlert(`${data.message}`, "", "warning");
                        } else {
                              console.log(data);
                              setShopInfo(data);
                              e.target.reset();
                              const jsonData = JSON.stringify(data);
                              document.cookie = `SellerShop=${encodeURIComponent(
                                    jsonData
                              )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                              showAlert(`woo commerce login successful`, "", "success");
                              setWoModal(false);
                        }
                  });
      };

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 text-center ">
                        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
                              <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
                                    Integration with woo commerce
                              </div>
                              <div
                                    onClick={() => setWoModal(!OpenModal)}
                                    className="cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>

                        <div className="max-h-[500px] px-10 text-start bar overflow-y-scroll">
                              <form
                                    onSubmit={LoginWoocomarce}
                                    className="flex flex-col gap-4 mt-6"
                                    action=""
                              >
                                    <div>
                                          <label htmlFor="Domain URL">
                                                Domain URL <span className="text-red-500"> *</span>
                                          </label>
                                          <input
                                                defaultValue={woo_commerce.domain}
                                                className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                placeholder="Please provide your domain url"
                                                required
                                                type="text"
                                                name="domain"
                                                id=""
                                          />
                                    </div>
                                    <div>
                                          <label htmlFor="Domain URL">
                                                Consumer Key <span className="text-red-500"> *</span>
                                          </label>
                                          <input
                                                defaultValue={woo_commerce.consumer_key}
                                                required
                                                className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                placeholder="Please provide your Consumer Key"
                                                type="text"
                                                name="consumer_key"
                                                id=""
                                          />
                                    </div>
                                    <div>
                                          <label htmlFor="Domain URL">
                                                Consumer Secret <span className="text-red-500"> *</span>
                                          </label>
                                          <input
                                                defaultValue={woo_commerce.consumer_secret}
                                                required
                                                className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                placeholder="Please provide your Consumer Secret"
                                                type="text"
                                                name="consumer_secret"
                                                id=""
                                          />
                                    </div>
                                    {loading ? (
                                          <button
                                                disabled={loading}
                                                className="group w-1/3 relative cursor-not-allowed inline-flex justify-between items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
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
                                                className="group relative cursor-pointer inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 w-1/3"
                                          >
                                                <span className="absolute -end-full transition-all group-hover:end-4">
                                                      <BsArrowRight />
                                                </span>

                                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                                      Login Woo commerce
                                                </span>
                                          </button>
                                    )}
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default ModalForWoo;
