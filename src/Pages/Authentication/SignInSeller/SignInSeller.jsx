import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useNavigate } from "react-router-dom";

const SignInSeller = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setCookie, setUser } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const data = {
      email,
      password,
    };
    setLoading(true);
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCookie("SaleNowUser", JSON.stringify(data.user));
          setUser(data.user);
          setLoading(false);
          setPassError("");

          Swal.fire(
            "Login Successful",
            "You are a valid user. Best of luck",
            "success"
          );
          if (data.user.role === "supperadmin") {
            navigate("/admin/dashboard");
          }
          if (data.user.role === "seller") {
            navigate("/seller/dashboard");
          }
          setLoading(false);
        }

        setPassError(data.message);

        setLoading(false);

        setLoading(false);
      });
  };

  return (
    <div className="relative">
      <img
        src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75">
        {showAlert && (
          <CustomAlert message={alertMessage} onClose={closeAlert} />
        )}
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                Do you have no account?
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                Please Go to create an account
              </p>
              <Link
                to="/sign-up"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-500"
              >
                Sign Up
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
                  Sign In with SaleNow account
                </h3>
                <form onChange={() => setPassError('')} onSubmit={loginUser}>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="Email"
                      className="inline-block mb-1 font-medium"
                    >
                      Email
                    </label>
                    <input

                      placeholder="john.doe@example.org"
                      required
                      type="email"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded "
                      id="email"
                      name="email"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="password"
                      className="inline-block mb-1 font-medium"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input

                        placeholder="*******"
                        required
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
                  <p className="text-sm text-red-500">{passError}</p>

                  <div className="mt-4 mb-2 sm:mb-4">
                    {!loading ? (
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-black bg-gray-800 focus:shadow-outline focus:outline-none"
                      >
                        Sign in
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
                  <Link
                    to={"/forget-pass"}
                    className="text-xs text-blue-600 sm:text-sm"
                  >
                    Forgot Password ?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSeller;
