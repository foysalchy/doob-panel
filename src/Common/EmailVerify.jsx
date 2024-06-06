import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const EmailVerify = () => {
  const location = useLocation();
  const userId = location.hash.replace("#", "");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successMail, setSuccessMail] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          "https://backend.doob.com.bd/api/v1/auth/verify-email",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        console.log(response);

        if (response.ok) {
          setSuccess(true);
          setSuccessMail("Email verified successfully");
        } else {
          console.error("Email verification failed:", response.statusText);
          setSuccessMail(response?.message);
        }
      } catch (error) {
        console.error("Email verification failed:", error.message);
        setSuccessMail(error?.message);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [userId]);


  return (
    <div>
      <div className="bg-gray-700">
        <div className="px-4 h-screen  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl flex items-center justify-center md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="flex flex-col   mb-16 sm:text-center sm:mb-0">
              <a href="/" className="mb-6 sm:mx-auto">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-accent-400">
                  <svg
                    className="w-10 h-10 text-deep-purple-900"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </a>
              <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                  <span className="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-deep-purple-accent-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                    >
                      <defs>
                        <pattern
                          id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30"
                        >
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                        width="52"
                        height="24"
                      />
                    </svg>
                    <span className="relative">
                      {loading ? "Loading" : "Your"}
                    </span>
                  </span>{" "}
                  {success
                    ? "Email verification successful!"
                    : "Please Wait...."}
                </h2>

              </div>
              <div>
                <Link
                  // href="/s"
                  to="/sign-in"
                  className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-teal-100 transition duration-200 rounded shadow-md bg-black hover:text-purple-900 bg-teal-accent-400 hover:bg-purple-100 focus:shadow-outline focus:outline-none"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
