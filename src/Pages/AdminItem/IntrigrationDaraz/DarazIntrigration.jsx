import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import CryptoJS from "crypto-js";
import { useQuery } from "@tanstack/react-query";
// import { data } from "autoprefixer";
import Swal from "sweetalert2";
import ModalForWoo from "./ModalForWoo";
import BrightAlert from "bright-alert";
// import { LuSwitchCamera } from "react-icons/lu";
// import { MdEmail } from "react-icons/md";
import showAlert from "../../../Common/alert";

const DarazIntegration = () => {
      const { shopInfo, setShopInfo } = useContext(AuthContext);
      const [wooModal, setWoModal] = useState(false);

      const [code, setCode] = useState(null);

      const currentTimeInMilliseconds = new Date().getTime();

      useEffect(() => {
            const currentUrl = window.location.href;
            const urlParams = new URLSearchParams(new URL(currentUrl).search);
            const code = urlParams.get("code");
            if (code) {
                  setCode(code);
                  refetch();
            }
            // setCode(code);
      }, []);

      useEffect(() => {
            if (code) {
                  fetch("https://doob.dev/api/v1/daraz/get-key")
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data, "daraz");
                              const { appkey, secretkey } = data[0];

                              const newAppKey = appkey;
                              const newScretecretKey = secretkey;

                              const url = "https://api.daraz.com.bd/rest/auth/token/create";
                              const timestamp = currentTimeInMilliseconds;
                              const patch = `/auth/token/createapp_key${newAppKey}code${code}sign_methodsha256timestamp${timestamp}`;
                              const sign = CryptoJS.HmacSHA256(patch, newScretecretKey)
                                    .toString(CryptoJS.enc.Hex)
                                    .toUpperCase();

                              const body = {
                                    sign_method: "sha256",
                                    sign: sign,
                                    app_key: newAppKey,
                                    code: code,
                                    timestamp: timestamp,
                                    url,
                                    newScretecretKey,
                              };

                              fetch(`https://doob.dev/api/v1/daraz/addCode/${shopInfo._id}`, {
                                    method: "PUT",
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(body),
                              })
                                    .then((res) => res.json())
                                    .then((data) => {
                                          console.log(data, 'chanel intrigraiin on 69');
                                          if (!data.disable) {
                                                setShopInfo(data);
                                                const jsonData = JSON.stringify(data);
                                                document.cookie = `SellerShop=${encodeURIComponent(
                                                      jsonData
                                                )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;

                                                BrightAlert("Daraz Login Successful", "", "success");

                                                const currentUrl = new URL(window.location.href);
                                                currentUrl.searchParams.delete("code");
                                                window.history.replaceState(
                                                      {},
                                                      document.title,
                                                      currentUrl.toString()
                                                );
                                                refetch();
                                                setCode(null);
                                          }
                                          else {
                                                BrightAlert(data.message, "", "warning");
                                                const currentUrl = new URL(window.location.href);
                                                currentUrl.searchParams.delete("code");
                                                window.history.replaceState(
                                                      {},
                                                      document.title,
                                                      currentUrl.toString()
                                                );
                                                setCode(null);
                                          }

                                    });
                        });
            }
      }, [code]);

      const {
            data: darazShop = [],
            refetch,
            isLoading: loadingShopData,
      } = useQuery({
            queryKey: ["darazShopBd"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/seller-daraz-accounts?id=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data[0];
            },
      });



      const {
            data: previousAccount = [],
            isLoading: loadingPreviousAccount,
            refetch: reload,
      } = useQuery({
            queryKey: ["previousAccount"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/daraz/get-privious-account?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });



      const {
            data: prices = [],
            isLoading: loadingPrice,
            refetch: refetchPrice,
      } = useQuery({
            queryKey: ["pricingPreviousAccount"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data?.data;
            },
      });

      const isWithin28Days = (createdAt) => {
            const currentTime = new Date().getTime();
            const differenceInMilliseconds = currentTime - new Date(createdAt).getTime();
            const millisecondsIn28Days = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
            return differenceInMilliseconds < millisecondsIn28Days;
      };



      const switchAccount = (previous_id) => {
            const current_id = darazShop._id
            fetch(
                  `https://doob.dev/api/v1/daraz/switching-your-daraz?id=${previous_id}&loginId=${current_id}`,
                  {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                  }
            )
                  .then((response) => response.json())
                  .then((data) => {
                        console.log(data);
                        if (data.status === true) {
                              showAlert("Account Switched", "", "success");
                              refetch();
                              reload();

                        }
                        else {
                              BrightAlert(data.message, "", "warning");
                        }
                  });
      };

      const [selectedAccount, setSelectedAccount] = useState("");
      const handleChange = (event) => {
            const selectedOldId = event.target.value;
            console.log(selectedOldId);
            setSelectedAccount(selectedOldId);
            switchAccount(selectedOldId);
            refetch();
            reload();
            // window.location.reload();
      };

      const getOptionClassName = (timestamp) => {
            // Get the current timestamp
            const currentTimestamp = Date.now();

            // Calculate the difference in days
            const differenceInDays = Math.floor(
                  (currentTimestamp - timestamp) / (1000 * 60 * 60 * 24)
            );

            // Return the appropriate class name based on the condition
            return differenceInDays === 2 ? "text-yellow-500" : "";
      };



      const remaining_account = (parseInt(prices?.result?.limitValue) - previousAccount.filter((item) => darazShop?.shop2?.data?.name !== item?.shop2?.data?.name)?.length)
      console.log(remaining_account);

      return (
            <div>
                  <div className="grid md:grid-cols-2 justify-between md:gap-10 gap-3 md:mt-10">
                        <div
                              // aria-disabled={true}
                              className={"bg-gray-300  py-6 text-center  rounded-md "}
                        >
                              {!loadingPrice && !loadingPreviousAccount ? (
                                    parseInt(prices?.result?.limitValue) > previousAccount?.length ? (
                                          <a
                                                href="https://api.daraz.com.bd/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://doob.com.bd/seller/channel-integration/&client_id=501436"
                                                className="text-blue-500 hover:underline mb-4 inline-block"
                                          >
                                                Login Daraz
                                                <p className="text-yellow-700 mx-1">

                                                      your remain account space{" "}
                                                      {remaining_account}
                                                      ,
                                                </p>
                                          </a>
                                    ) : (
                                          <button className="bg-disabled ">
                                                Login Daraz
                                                <span className="text-red-500 mx-1"> (limit finished)</span>
                                          </button>
                                    )
                              ) : (
                                    "Loading..."
                              )}


                        </div>
                        <div
                              className={
                                    !shopInfo.wooLogin &&
                                    "bg-gray-300  flex items-center justify-center text-center rounded-md "
                              }
                        >
                              {!shopInfo.wooLogin && (
                                    <button
                                          onClick={() => setWoModal(true)}
                                          className="text-blue-500 hover:underline mb-4 inline-block"
                                    >
                                          WooCommerce Login
                                    </button>
                              )}

                              {wooModal && (
                                    <ModalForWoo
                                          setWoModal={setWoModal}
                                          OpenModal={wooModal}
                                          shopInfo={shopInfo}
                                          setShopInfo={setShopInfo}
                                          shopId={shopInfo._id}
                                    />
                              )}

                              {shopInfo.wooLogin && (
                                    <div className="bg-green-100 border-l-4 border-green-500  py-6 text-center  rounded-md">
                                          <h1 className="text-green-700 font-bold">
                                                Your woo Commerce account is connected
                                          </h1>
                                    </div>
                              )}
                        </div>
                  </div>

                  <div className="flex items-center gap-12 mt-8 w-full">

                        <div className="bg-gray-50 px-4 py-2 rounded text-blue-500 flex items-center gap-2">
                              <h1 className="whitespace-nowrap">Switch Account</h1>
                              <hr className="flex-grow mx-2 border-t border-blue-500" />

                              <select
                                    className="w-full px-4 py-2 border rounded bg-[#d2d2d2] text-sm"
                                    // value={selectedAccount}
                                    onChange={handleChange}
                              >


                                    <option value="">
                                          {darazShop?.shop2?.data?.name ?? darazShop?.result?.account}
                                    </option>
                                    {(() => {
                                          const seenNames = new Set();
                                          return previousAccount
                                                .filter((item) => darazShop?.shop2?.data?.name !== item?.shop2?.data?.name)
                                                .filter((item) => {
                                                      const name = item?.shop2?.data?.name;
                                                      if (name && !seenNames.has(name)) {
                                                            seenNames.add(name);
                                                            return true;
                                                      }
                                                      return false;
                                                })
                                                .map((shopSingle) => {
                                                      const isRecent = isWithin28Days(shopSingle?.createdAt);
                                                      const isBlocked = shopSingle?.isAdmin === "block";

                                                      return (
                                                            <option
                                                                  disabled={isBlocked}
                                                                  style={{
                                                                        color: isBlocked ? "#ffffff" : isRecent ? "" : "#ffffff",
                                                                        backgroundColor: isBlocked || !isRecent ? "#ff0000" : "",
                                                                  }}
                                                                  key={shopSingle._id}
                                                                  value={shopSingle._id}
                                                            >
                                                                  {shopSingle?.shop2?.data?.name ?? shopSingle?.result?.account}
                                                                  {!isRecent && <span> Almost 28 days</span>}
                                                            </option>
                                                      );
                                                });
                                    })()}

                              </select>

                        </div>
                  </div>
            </div>
      );
};

export default DarazIntegration;

// import React, { useState } from 'react';

// const DarazIntegration = () => {
//   const [selectValue, setSelectValue] = useState({
//     id: 2,
//     bg: '#cdb309',
//     value: "Vanilla Js"
//   });

//   const data = [
//     {
//       id: 1,
//       bg: 'red',
//       value: "React"
//     },
//     {
//       id: 2,
//       bg: '#cdb309',
//       value: "Vanilla Js"
//     },
//     {
//       id: 3,
//       bg: '#08C26E',
//       value: "Vue Js"
//     },
//   ];

//   const handleChange = (e) => {
//     const selectedId = parseInt(e.target.value);
//     const selectedItem = data.find(item => item.id === selectedId);
//     setSelectValue(selectedItem);
//   };

//   return (
//     <>
//       <div className='px-20 pt-20 flex items-start gap-4'>
//         <div className="flex flex-col gap-1">
//           <label htmlFor="static">Static</label>
//           <select
//             className='border bg-[indigo] focus:border-none focus:outline-none focus-within:border-none focus-within:outline-none text-white border-purple-500 shadow px-2 rounded py-2 w-[200px]'
//             name="select"
//             id=""
//           >
//             <option
//               style={{ backgroundColor: 'red' }}
//               value="option 1"
//             >
//               option 1
//             </option>
//             <option
//               style={{ backgroundColor: 'orange' }}
//               value="option 2"
//             >
//               option 2
//             </option>
//             <option
//               style={{ backgroundColor: 'yellow' }}
//               value="option 3"
//             >
//               option 3
//             </option>
//           </select>
//         </div>

//         <div className="flex flex-col gap-1">
//           <label htmlFor="dynamic">Dynamic</label>
//           <select
//             className='border focus:border-none focus:outline-none focus-within:border-none focus-within:outline-none text-white border-red-500 shadow px-2 rounded py-2 w-[200px]'
//             style={{ backgroundColor: selectValue.bg }}
//             name="select"
//             value={selectValue.id}
//             onChange={handleChange}
//           >
//             {data.map(itm => (
//               <option
//                 className='hover:!bg-[red]'
//                 key={itm.id}
//                 style={{ backgroundColor: itm.bg }}
//                 value={itm.id}
//               >
//                 {itm.value}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="mt-4 px-20 text-xl font-bold">
//         Selected Value: <span style={{ color: selectValue.bg }}>
//           {selectValue.value}
//         </span>
//       </div>
//     </>
//   );
// };

// export default DarazIntegration;
