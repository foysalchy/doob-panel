import React, { useContext, useEffect, useState } from "react";
import {
  AiFillCheckSquare,
  AiFillEye,
  AiFillEyeInvisible,
  AiTwotoneCheckSquare,
} from "react-icons/ai";
import Image from "./wallpaperflare.com_wallpaper.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { BiCheckbox } from "react-icons/bi";
import Modal from "./Modal";
import BrightAlert from "bright-alert";

const SignUpSeller = () => {
  const [switchForm, setSwitchForm] = useState(false);
  const [switchNumberForm, setSwitchNumberForm] = useState(true);
  const [switchOtpForm, setSwitchOtpForm] = useState(false);
  const [phone, setPhone] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { RegistrationInEmail } = useContext(AuthContext);
  const [shop, setShop] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('+880');


  // otp number form


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signUpData = (event) => {
    event.preventDefault();


    const form = event.target;
    const name = form.name.value;

    const email = form.email.value;
    const password = form.password.value;
    const shopName = form?.shopName?.value
    const referCode = form?.referCode?.value;
    let role = "user";
    const createdAt = new Date()

    setUserEmail(email)

    console.log(form?.shopName?.value);

    const userId = email.replace(/[@.]/g, '')


    setLoading(true);
    let user = { name, email, password, userId, phoneNumber, role, createdAt, referCode }
    if (password.length >= 6) {
      if (shop) {
        role = "seller";
        user.role = role;
        user.shopName = shopName;

      }


      // Update user

      setPassError("");
      console.log(user);

      fetch("https://salenow-v2-backend.vercel.app/api/v1/auth/sign-up", {
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
            if (shop) {
              handleSubmit(referCode, email);
            }
            setLoading(false);
            BrightAlert(`${data.message}`, '', 'success');
            form.reset();
            navigate('/sign-in');
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

  const handleSubmit = (referCode, email) => {
    const code = referCode
    const time = new Date().getTime()
    const data = { email, code, time }

    fetch('https://salenow-v2-backend.vercel.app/api/v1/admin/refer-code', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),

    }).then((res) => res.json()).then((data) => {

      setLoading(false)
      navigate('/sign-in')
    })

  }


  function isBangladeshiPhoneNumber(phoneNumber) {
    // Remove any non-digit characters from the phone number
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Check if the cleaned number starts with +880 and has a valid length
    return /^880\d{10}$/.test(cleanedNumber);
  }


  const [valid, setValid] = useState(false);

  const handleInputChange = (event) => {
    let newPhoneNumber = event.target.value;
    if (!newPhoneNumber.startsWith('+880')) {
      // If the country code is removed, add it back
      newPhoneNumber = '+880' + newPhoneNumber.replace(/\D/g, '');
    }
    setPhoneNumber(newPhoneNumber); // Update the phone number in the state

    if (isBangladeshiPhoneNumber(newPhoneNumber)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const [setTime, setSetTime] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(120);
  const [otpError, setOtpError] = useState(false);

  const handleNumberForm = (e) => {
    e.preventDefault();
    fetch(`https://salenow-v2-backend.vercel.app/api/v1/auth/send-otp?number=${phoneNumber}`).then((response) => response.json()).then((data) => {

      if (data.success) {

        setPhone(phone)
        setSwitchNumberForm(false)
        setSwitchOtpForm(true);
        setSetTime(true);
      }
      else {
        setOtpError('Already  registered')
        setSwitchNumberForm(true)
      }


    })
  }

  const handleResendOtp = () => {
    setTimeRemaining(120)
    fetch(`https://salenow-v2-backend.vercel.app/api/v1/auth/send-otp?number=${phoneNumber}`).then((response) => response.json()).then((data) => {

      setPhone(phone)
      setSwitchNumberForm(false)
      setSwitchOtpForm(true);
      setSetTime(true);

    })
  }

  const handleOtpForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const otp = form.otp.value;

    fetch(`https://salenow-v2-backend.vercel.app/api/v1/auth/verify-otp?number=${phoneNumber}&otp=${otp}`).then((response) => response.json()).then((data) => {
      if (data.success) {
        setSwitchNumberForm(false)
        setSwitchOtpForm(false)
        setSwitchForm(true)
      }

    })

  }

  useEffect(() => {
    if (setTime) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {

          if (prevTime === 0) {
            clearInterval(timer);
            setSetTime(false)
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [setTime]);

  return (
    <div>
      <div className="relative">
        <img
          srcSet='https://c0.wallpaperflare.com/preview/781/693/128/abstract-business-communication-computer.jpg'
          src='https://c0.wallpaperflare.com/preview/781/693/128/abstract-business-communication-computer.jpg'
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

              <div className="w-full max-w-xl xl:px-8 xl:w-7/12">
                {/* otp number form */}
                {switchNumberForm &&
                  <form
                    className="bg-white rounded shadow-2xl p-7 sm:p-10"
                    onSubmit={handleNumberForm}>
                    <div className="mb-1 sm:mb-2 ">
                      <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                        Sign up for updates
                      </h3>
                      <p className="text-xs text-start">
                        We will send you the 4 digit verification code
                      </p>
                      <label
                        htmlFor="phone"
                        className="inline-block mb-1 font-medium"
                      >
                        Phone
                      </label>
                      <input
                        placeholder="+8801XXXXXXXXX"
                        value={phoneNumber}
                        required
                        type="text"
                        onChange={(e) => {
                          handleInputChange(e);
                          setOtpError(false);
                        }}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded "
                        id="phone"
                        name="phone"
                      />
                      {otpError && <small>{otpError}</small>}
                      {!valid && <small className="text-red-500">Your Number is not valid</small>}
                      <button
                        disabled={!valid}
                        type="submit"
                        className="bg-gray-900 text-white px-8 w-full py-3 rounded mt-3">Submit</button>
                    </div>

                  </form>}

                {/* otp form */}
                {switchOtpForm &&
                  <form
                    className="bg-white rounded shadow-2xl p-7 sm:p-10"
                    onSubmit={handleOtpForm}>
                    <div className="mb-1 sm:mb-2">
                      <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                        Sign up for updates
                      </h3>
                      <p className="text-xs text-start">
                        We have already send you  4 digit
                        <br />verification code on your number *********{phoneNumber.slice(-3)}
                      </p>
                      <span
                        htmlFor="otp"
                        className="inline-block text-xs mb-1 font-medium"
                      >
                        Enter the OTP send from {phone}
                      </span>
                      <input
                        placeholder="0000"
                        required
                        style={{
                          'letterSpacing': '20px'
                        }}
                        type="number"
                        className="flex-grow   w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded "
                        id="otp"
                        name="otp"
                      />
                      <div>
                        {setTime && timeRemaining > 0 && <small className="">Resend OTP after  {`${Math.floor(timeRemaining / 60)}, ${timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}`}</small>}
                      </div>

                      {timeRemaining < 1 && <small className="text-blue-500" onClick={handleResendOtp}>Resend</small>}
                      <br />
                      <button
                        type="submit"
                        className="bg-gray-900 text-white px-8 w-full py-3 rounded mt-3">Submit</button>
                    </div>

                  </form>}

                {/* main form */}
                {switchForm &&
                  <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                    <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                      Sign up for updates
                    </h3>
                    <form onChange={() => setPassError("")} onSubmit={signUpData}>
                      <div className="flex gap-4">
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

                      <div className="grid grid-cols-2 gap-3 items-center">
                        <div className="order-last">
                          <label
                            htmlFor="email"
                            className="inline-block mb-1 font-medium"
                          >
                            Refer Code
                          </label>
                          <input
                            placeholder="refer code"
                            type="text"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                            id="referCode"
                            name="referCode"
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
                      </div>


                      {/* <div className="text-xs text-gray-600 text-center sm:text-sm"> {!shop ? (
                        <div
                          className="flex gap-1 cursor-pointer"

                          onClick={() => { setShop(true); setPassError(''); }}
                        >
                          <AiTwotoneCheckSquare className="text-2xl " />
                          <p className="">Are you try to create as a seller?</p>
                        </div>
                      ) : (
                        <div
                          className="flex gap-1 cursor-pointer"
                          onClick={() => { setShop(false); setPassError(''); }}
                        >
                          <AiFillCheckSquare className="text-2xl " />
                          <p className="">No i try to create as a user</p>
                        </div>
                      )}</div> */}


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


                  </div>}

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 w-0">

        <Modal email={userEmail} setModalOpen={setModalOpen} modalOpen={modalOpen} />
      </div>
    </div>
  );
};

export default SignUpSeller;
