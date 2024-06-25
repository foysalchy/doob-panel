// import React, { useEffect } from 'react';
// import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

// const ServicePaymentSuccess = () => {

//     // const paymentGetWays = useLoaderData();
//     // const bkashInfo = paymentGetWays.filter((get) => get.Getaway === "Bkash")[0]
//     // console.log(bkashInfo);
//     // const location = useLocation()
//     // console.log(`http://localhost:5001/api/v1/seller/bkash/payment/callback${location.search}`);

//     // useEffect(() => {
//     //     fetch(`http://localhost:5001/api/v1/seller/bkash/payment/callback${location.search}`, {
//     //         method: "GET",
//     //         body: JSON.stringify({ method: bkashInfo })
//     //     })
//     //         .then((res) => res.json())
//     //         .then((data) => {
//     //             console.log(data);
//     //         })
//     //         .catch((error) => {
//     //             console.error("Error fetching data:", error);
//     //         });
//     // }, [location.search]);

//     // const paymentGetWays = useLoaderData();
//     // const bkashInfo = paymentGetWays.find(get => get.Getaway === "Bkash");
//     // console.log(bkashInfo);

//     // const location = useLocation();
//     // const callbackURL = `http://localhost:5001/api/v1/seller/bkash/payment/callback${location.search}?collection=service`;
//     // console.log(callbackURL);

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const response = await fetch(callbackURL, {
//     //                 method: "POST",
//     //                 headers: {
//     //                     "Content-Type": "application/json"
//     //                 },
//     //                 body: JSON.stringify({ method: bkashInfo })
//     //             });

//     //             if (!response.ok) {
//     //                 throw new Error('Network response was not ok');
//     //             }

//     //             const data = await response.json();
//     //             console.log(data);
//     //         } catch (error) {
//     //             console.error("Error fetching data:", error);
//     //         }
//     //     };

//     //     fetchData();
//     // }, [callbackURL, bkashInfo, location.search]);

//     const paymentGetWays = useLoaderData();
//     const bkashInfo = paymentGetWays.find(get => get.Getaway === "Bkash");
//     const location = useLocation();
//     const navigate = useNavigate()
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const callbackURL = `http://localhost:5001/api/v1/seller/bkash/payment/callback${location.search}?collection=service`;

//         const fetchData = async () => {
//             try {
//                 const response = await fetch(callbackURL, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ method: bkashInfo })
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 console.log(data);

//                 // Redirect based on the data
//                 // For example, if data contains a redirect URL
//                 if (data.redirectUrl) {
//                     navigate(data.redirectUrl)

//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError(error.message); // Set error state
//             }
//         };

//         fetchData();
//     }, [callbackURL, bkashInfo, location.search, history]);

//     return (
//         <div>
//             <div className="bg-gray-100 h-screen">
//                 <div className="bg-white p-6  md:mx-auto">
//                     <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
//                         <path
//                             fill="currentColor"
//                             d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
//                         ></path>
//                     </svg>
//                     <div className="text-center">
//                         <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
//                             Payment Done!
//                         </h3>
//                         <p className="text-gray-600 my-2">
//                             Thank you for completing your secure online payment.
//                         </p>
//                         <p> Have a great day!</p>
//                         <div className="py-10 text-center">
//                             <a
//                                 href="#"
//                                 className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
//                             >
//                                 GO BACK
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

import React, { useState, useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ServicePaymentSuccess = () => {
  const paymentGetWays = useLoaderData();
  const bkashInfo = paymentGetWays.find((get) => get.Getaway === "Bkash");
  const location = useLocation();
  console.log("🚀 ~ location:", location)
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  console.log(
    `http://localhost:5001/api/v1/seller/bkash/payment/callback${location.search}?collection=service`
  );

  // console.log(location.search)
  const searchParams = new URLSearchParams(location.search);
  const collection = searchParams.get("collection");

  console.log("🚀 ~ collection:", collection);

  useEffect(() => {
    const callbackURL = `http://localhost:5001/api/v1/seller/bkash/payment/callback${location.search}?collection=${collection??"service"}`;

    const fetchData = async () => {
      console.log(bkashInfo);
      try {
        const response = await fetch(callbackURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ method: bkashInfo }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        // Redirect based on the data
        // For example, if data contains a redirect URL
        if (data.redirectUrl) {
          navigate(data.redirectUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error state
      }
    };

    fetchData();
  }, [bkashInfo, location.search, navigate]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day!</p>
          <div className="py-10 text-center">
            <button
              onClick={() => navigate(-1)}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePaymentSuccess;
