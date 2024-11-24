import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLoaderData, useNavigate } from "react-router-dom";

const ResetPass = () => {
      const [loading, setLoading] = useState(false);
      const [showPassword1, setShowPassword1] = useState(false);
      const [showPassword2, setShowPassword2] = useState(false);
      const navigate = useNavigate();
      const [error, setError] = useState("");
      const id = useLoaderData();
      const fromSubmit = (event) => {
            setLoading(true);
            event.preventDefault();
            const form = event.target;
            const pass1 = form.password1.value;
            const pass2 = form.password2.value;
            if (pass1 === pass2) {
                  fetch(`https://doob.dev/api/v1/auth/reset-pass/${id}`, {
                        method: "put",
                        headers: {
                              "content-type": "application/json",
                        },
                        body: JSON.stringify({ pass1 }),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              setLoading(false);
                              setError("");
                              alert(data.message);
                              navigate("/sign-in");
                        });
            } else setError("Password is not match");
            setLoading(false);
      };

      const togglePasswordVisibility1 = () => {
            setShowPassword1(!showPassword1);
      };
      const togglePasswordVisibility2 = () => {
            setShowPassword2(!showPassword2);
      };

      return (
            <div>
                  <div>
                        <div className="w-full max-w-xl xl:px-8 xl:w-5/12 py-10 mx-auto">
                              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                    <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                          Password Reset
                                    </h3>
                                    <form onSubmit={fromSubmit}>
                                          <div className="mb-1 sm:mb-2">
                                                <label
                                                      htmlFor="password"
                                                      className="inline-block mb-1 font-medium"
                                                >
                                                      Password
                                                </label>
                                                <div className="relative">
                                                      <input
                                                            onChange={() => setError("")}
                                                            placeholder="*******"
                                                            required
                                                            type={showPassword1 ? "text" : "password"}
                                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                            id="password"
                                                            name="password1"
                                                      />
                                                      {showPassword1 ? (
                                                            <span
                                                                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                                                                  onClick={togglePasswordVisibility1}
                                                            >
                                                                  <AiFillEyeInvisible />
                                                            </span>
                                                      ) : (
                                                            <span
                                                                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                                                                  onClick={togglePasswordVisibility1}
                                                            >
                                                                  <AiFillEye />
                                                            </span>
                                                      )}
                                                </div>
                                          </div>
                                          <div className="mb-1 sm:mb-2">
                                                <label
                                                      htmlFor="password"
                                                      className="inline-block mb-1 font-medium"
                                                >
                                                      Re Password
                                                </label>
                                                <div className="relative">
                                                      <input
                                                            onChange={() => setError("")}
                                                            placeholder="*******"
                                                            required
                                                            type={showPassword2 ? "text" : "password"}
                                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                                            id="password"
                                                            name="password2"
                                                      />
                                                      {showPassword2 ? (
                                                            <span
                                                                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                                                                  onClick={togglePasswordVisibility2}
                                                            >
                                                                  <AiFillEyeInvisible />
                                                            </span>
                                                      ) : (
                                                            <span
                                                                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                                                                  onClick={togglePasswordVisibility2}
                                                            >
                                                                  <AiFillEye />
                                                            </span>
                                                      )}
                                                </div>
                                          </div>

                                          <p className="text-sm text-red-500">{error}</p>

                                          <div className="mt-4 mb-2 sm:mb-4">
                                                {!loading ? (
                                                      <button
                                                            type="submit"
                                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-black bg-gray-800 focus:shadow-outline focus:outline-none"
                                                      >
                                                            Change Password
                                                      </button>
                                                ) : (
                                                      <button
                                                            disabled
                                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-black bg-gray-800 focus:shadow-outline focus:outline-none"
                                                      >
                                                            Loading...
                                                      </button>
                                                )}
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ResetPass;
