import React, { useContext, useState } from "react";
import {
  AiFillCheckSquare,
  AiFillEye,
  AiFillEyeInvisible,
  AiTwotoneCheckSquare,
} from "react-icons/ai";
import Image from "./wallpaperflare.com_wallpaper.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { BiCheckbox } from "react-icons/bi";

const SignUpSeller = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { RegistrationInEmail } = useContext(AuthContext);
  const [shop, setShop] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signUpData = (event) => {
    event.preventDefault();
    let shopName = "";
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    shopName = form?.shopName?.value;
    let role = "user";

    const userId = email.split("@")[0];
    console.log(userId);

    setLoading(true);
    if (password.length >= 6) {
      if (shop) {
        role = "seller";
      }
      let user = { name, email, password, userId, role };
      if (shop) {
        user = { name, email, password, userId, role, shopName };
      }
      // Update user

      setPassError("");

      fetch("http://localhost:5000/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          const result = data.result;
          if (result) {
            Swal.fire("Success", "Your registration is complete", "success");
            setLoading(false);
            form.reset();
          } else {
            setPassError(data.message);
          }

          setLoading(false);
          form.reset();
        });
    } else {
      setPassError("Please enter six digit password");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative">
        <img
          src={Image}
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-75">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  Do You <br className="hidden md:block" />
                  Have an
                  <span className="text-teal-400 ml-2"> Accout?</span>
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                  Go to Login Page
                </p>
                <Link
                  to={"/sign-in"}
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-700"
                >
                  Sign In
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </Link>
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Sign up for updates
                  </h3>
                  <form onChange={() => setPassError("")} onSubmit={signUpData}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="name"
                        className="inline-block mb-1 font-medium"
                      >
                        Full Name
                      </label>
                      <input
                        placeholder="John Doe"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        Email
                      </label>
                      <input
                        placeholder="xyz@email.com"
                        required
                        type="email"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                      />
                    </div>

                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          placeholder="*******"
                          required
                          onChange={() => setPassError("")}
                          type={showPassword ? "text" : "password"}
                          className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                          id="password"
                          name="password"
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

                    {!shop ? (
                      <div
                        className="flex gap-1 cursor-pointer"
                        onClick={() => setShop(true)}
                      >
                        <AiTwotoneCheckSquare className="text-2xl " />
                        <p className="">Are you Seller?</p>
                      </div>
                    ) : (
                      <div
                        className="flex gap-1 cursor-pointer"
                        onClick={() => setShop(false)}
                      >
                        <AiFillCheckSquare className="text-2xl " />
                        <p className="">Yes I'm Seller</p>
                      </div>
                    )}

                    {shop && (
                      <div className="mb-1 sm:mb-2">
                        <label
                          htmlFor="email"
                          className="inline-block mb-1 font-medium"
                        >
                          Shop Name
                        </label>
                        <input
                          placeholder="Sell Now"
                          required={shop}
                          type="text"
                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                          id="shopName"
                          name="shopName"
                        />
                      </div>
                    )}
                    <p className="text-sm text-red-500">{passError}</p>
                    <div className="mt-4 mb-2 sm:mb-4">
                      {!loading ? (
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-black bg-gray-800 focus:shadow-outline focus:outline-none"
                        >
                          Sign Up
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
                    <p className="text-xs text-gray-600 text-center sm:text-sm">
                      By clicking "Sign up", you agree to the
                      <br />
                      <Link className="underline text-blue-500" to={"/terms"}>
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link className="underline text-blue-500" to={"/"}>
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSeller;
