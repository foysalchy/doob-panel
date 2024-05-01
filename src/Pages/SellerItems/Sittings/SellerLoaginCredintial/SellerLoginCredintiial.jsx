import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa6";
import { BsGoogle } from "react-icons/bs";
import BrightAlert from "bright-alert";
import { useQuery } from "@tanstack/react-query";

const SellerLoginCredintiial = () => {
  const { shopInfo } = useContext(AuthContext);

  const [emailActive, setEmailActive] = useState(true);
  const [googleActive, setGoogleActive] = useState(true);
  const [facebookActive, setFacebookActive] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const apiKey = e.target.apiKey.value;
    const authDomain = e.target.authDomain.value;
    const projectId = e.target.projectId.value;
    const storageBucket = e.target.storageBucket.value;
    const messagingSenderId = e.target.messagingSenderId.value;
    const appId = e.target.appId.value;
    const measurementId = e.target.measurementId.value;
    const shopId = shopInfo._id;

    const data = {
      email,
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
      shopId,
      service: {
        email: emailActive,
        google: googleActive,
        facebook: facebookActive,
      },
    };

    fetch("https://backend.doob.com.bd/api/v1/shop/firebase/add", {
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
          BrightAlert({ timeDuration: 2000 });
        } else {
          BrightAlert(`${data.message}`, "", "error");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const { data: shopCredential = {} } = useQuery({
    queryKey: ["sellerCredential"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://backend.doob.com.bd/api/v1/shop/firebase/${shopInfo?.shopId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        throw error; // Rethrow the error to mark the query as failed
      }
    },
  });

  useEffect(() => {
    if (shopCredential) {
      setEmailActive(shopCredential.service.email)
      setGoogleActive(shopCredential.service.google)
      setFacebookActive(shopCredential.service.facebook)
    }
  }, [shopCredential])

  return (
    <div>
      <div>Follow the message</div>
      <div className="border md:p-10 p-4 mt-3 bg-gray-100">
        <h1 className="text-2xl ">Firebase SDK</h1>
        <form onSubmit={handleSubmit} className=" mx-auto mt-5 rounded-md ">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input

              defaultValue={shopCredential.email ? shopCredential.email : ""}
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="apiKey"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Api Key
            </label>
            <input

              defaultValue={shopCredential.apiKey ? shopCredential.apiKey : ""}
              type="text"
              name="apiKey"
              id="apiKey"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="authDomain"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Auth Domain
            </label>
            <input

              defaultValue={
                shopCredential.authDomain ? shopCredential.authDomain : ""
              }
              type="text"
              name="authDomain"
              id="authDomain"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="projectId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Project Id
            </label>
            <input

              defaultValue={
                shopCredential.email ? shopCredential.projectId : ""
              }
              type="text"
              name="projectId"
              id="projectId"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="storageBucket"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Storage Bucket
            </label>
            <input

              defaultValue={
                shopCredential.storageBucket ? shopCredential.storageBucket : ""
              }
              type="text"
              name="storageBucket"
              id="storageBucket"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="messagingSenderId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Messaging Sender ID
            </label>
            <input

              defaultValue={
                shopCredential.messagingSenderId
                  ? shopCredential.messagingSenderId
                  : ""
              }
              type="text"
              name="messagingSenderId"
              id="messagingSenderId"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="appId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              App ID
            </label>
            <input

              defaultValue={shopCredential.appId ? shopCredential.appId : ""}
              type="text"
              name="appId"
              id="appId"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="measurementId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Measurement ID
            </label>
            <input

              defaultValue={
                shopCredential.measurementId ? shopCredential.measurementId : ""
              }
              type="text"
              name="measurementId"
              id="measurementId"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <label htmlFor=""> Select your services</label>{" "}
          <div className="flex space-x-4">
            {/* Email Logo */}
            <button
              type="button"
              className={`p-2 rounded-full ${emailActive ? "bg-blue-500" : "bg-gray-300"
                }`}
              onClick={() => handleToggle("email")}
            >
              <div>
                <MdEmail />
              </div>
            </button>

            {/* Google Logo */}
            <button
              type="button"
              className={`p-2 rounded-full ${googleActive ? "bg-red-500" : "bg-gray-300"
                }`}
              onClick={() => handleToggle("google")}
            >
              <BsGoogle />
            </button>

            {/* Facebook Logo */}
            <button
              type="button"
              className={`p-2 rounded-full ${facebookActive ? "bg-blue-800" : "bg-gray-300"
                }`}
              onClick={() => handleToggle("facebook")}
            >
              <FaFacebook />
            </button>
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

export default SellerLoginCredintiial;
