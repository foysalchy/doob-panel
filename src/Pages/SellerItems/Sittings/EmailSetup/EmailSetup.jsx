import React, { useContext, useEffect, useState } from "react";

import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa6";
import { BsGoogle } from "react-icons/bs";
import BrightAlert from "bright-alert";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import showAlert from "../../../../Common/alert";

const SellerEmailSetup = () => {
      const { shopInfo } = useContext(AuthContext);

      const [emailActive, setEmailActive] = useState(true);
      const [googleActive, setGoogleActive] = useState(true);
      const [facebookActive, setFacebookActive] = useState(true);
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);

      const handleToggle = (button) => {
            switch (button) {
                  case "email":
                        setEmailActive(!emailActive);
                        break;
                  case "google":
                        setGoogleActive(!googleActive);
                        break;
                  case "facebook":
                        setFacebookActive(!facebookActive);
                        break;
                  default:
                        break;
            }
      };

      const { data: defaultEmailData = {}, refetch } = useQuery({
            queryKey: ["defaultEmailData"],
            queryFn: async () => {
                  try {
                        const res = await fetch(
                              ` https://doob.dev/api/v1/seller/setup-email/${shopInfo?._id}`
                        );
                        const data = await res.json();
                        return data;
                  } catch (error) {
                        throw error; // Rethrow the error to mark the query as failed
                  }
            },
      });

      // console.log(defaultEmailData.secure);
      // console.log(defaultEmailData?.secure ?? false);
      const [secure, setSecure] = useState(defaultEmailData?.secure ?? false);

      useEffect(() => {
            setSecure(defaultEmailData?.secure ?? false);
      }, [defaultEmailData]);

      const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
      };

      const handleSubmit = (e) => {
            e.preventDefault();

            const values = Object.fromEntries(new FormData(e.target));
            console.log("Form values:", values);

            const shopId = shopInfo._id;

            // const { email, port, authUser, authPassword } = values;

            const data = { ...values, secure, shopId };

            console.log(data, "data");

            // return;
            setLoading(true);

            fetch("https://doob.dev/api/v1/seller/setup-email", {
                  method: "PATCH",
                  body: JSON.stringify(data),
                  headers: {
                        "Content-Type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);

                        console.log(!data.error);
                        if (!data.error) {
                              showAlert("setup success", '', 'success');
                              refetch();
                        } else {
                              showAlert(`${data.message}`, "", "error");
                        }
                  })
                  .catch((error) => {
                        console.log("Error:", error);
                  });
      };

      //   useEffect(() => {
      //     if (defaultEmailData) {
      //       setEmailActive(defaultEmailData?.service?.email);
      //       setGoogleActive(defaultEmailData?.service?.google);
      //       setFacebookActive(defaultEmailData?.service?.facebook);
      //     }
      //   }, [defaultEmailData]);

      return (
            <div>
                  {/* <div>email Setup</div> */}
                  <div className="border md:p-10 p-4 mt-3 bg-gray-100">
                        <h1 className="text-2xl ">Email Setup</h1>
                        <form onSubmit={handleSubmit} className=" mx-auto mt-5 rounded-md ">
                              <div className="mb-4">
                                    <label
                                          htmlFor="email"
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                          Host Name
                                    </label>
                                    <input
                                          defaultValue={
                                                defaultEmailData?.email ? defaultEmailData?.email : ""
                                          }
                                          type="text"
                                          name="email"
                                          placeholder="example.host.com"
                                          id="email"
                                          className="w-full p-2 border rounded-md"
                                    />
                              </div>
                              <div className="mb-4">
                                    <label
                                          htmlFor="post"
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                          Port Number
                                    </label>
                                    <input
                                          defaultValue={defaultEmailData.port ? defaultEmailData.port : ""}
                                          type="number"
                                          name="port"
                                          id="port"
                                          className="w-full p-2 border rounded-md"
                                    />
                              </div>
                              <div className="mb-4 fle gap-3">
                                    <label
                                          htmlFor="secureStatus"
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                          Secure Status
                                    </label>
                                    <div
                                          onClick={() => setSecure((prev) => !prev)}
                                          className={`flex h-fit w-12 items-center rounded-sm border border-sky-400 ${secure ? "bg-sky-400/50 duration-500" : "duration-300"
                                                }`}
                                    >
                                          <div
                                                className={`size-6 rounded-sm bg-sky-400 duration-300 ${secure ? "translate-x-4" : "translate-x-0"
                                                      }`}
                                          ></div>
                                    </div>
                              </div>
                              <div className="mb-4">
                                    <label
                                          htmlFor="authUser"
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                          Auth User
                                    </label>
                                    <input
                                          defaultValue={
                                                defaultEmailData.authUser ? defaultEmailData.authUser : ""
                                          }
                                          type="text"
                                          name="authUser"
                                          id="authUser"
                                          className="w-full p-2 border rounded-md"
                                    />
                              </div>
                              <div className="mb-4">
                                    <label
                                          htmlFor="authPassword"
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                          Auth Password
                                    </label>
                                    <div className="relative">
                                          <input
                                                placeholder="*******"
                                                required
                                                //   value={password}
                                                //   onChange={handlePasswordChange}

                                                defaultValue={
                                                      defaultEmailData.authPassword
                                                            ? defaultEmailData.authPassword
                                                            : ""
                                                }
                                                type={showPassword ? "text" : "password"}
                                                className="w-full p-2 border rounded-md"
                                                id="authPassword"
                                                name="authPassword"
                                          />
                                          {showPassword ? (
                                                <span
                                                      className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                                      onClick={togglePasswordVisibility}
                                                >
                                                      <AiFillEyeInvisible />
                                                </span>
                                          ) : (
                                                <span
                                                      className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                                      onClick={togglePasswordVisibility}
                                                >
                                                      <AiFillEye />
                                                </span>
                                          )}
                                    </div>
                              </div>

                              <button
                                    disabled={loading}
                                    type="submit"
                                    className="bg-blue-500 mt-4 w-full text-white p-2 rounded-md hover:bg-blue-600"
                              >
                                    {loading ? "Loading.." : "Submit"}
                              </button>
                        </form>
                  </div>
            </div>
      );
};

export default SellerEmailSetup;
