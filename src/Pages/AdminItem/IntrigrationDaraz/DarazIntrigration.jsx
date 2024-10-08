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
import { Circle } from "lucide-react";

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


                  <div>
                        <div class="py-4 bg-white sm:py-8 lg:py-8 mt-10 rounded-md">
                              <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div>
                                          <p class="text-base font-bold text-gray-900">Daraz Account List</p>
                                    </div>

                                    <div class="mt-6 ring-1 ring-gray-300 rounded-2xl">
                                          <table class="min-w-full lg:divide-y lg:divide-gray-200">
                                                <thead class="hidden lg:table-header-group">
                                                      <tr>
                                                            <td width="50%" class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">Account Name</td>

                                                            <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">Login Date</td>

                                                            <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">Expire Date</td>

                                                            <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">Status</td>
                                                      </tr>
                                                </thead>

                                                <tbody class="divide-y divide-gray-200">
                                                      {
                                                            (() => {
                                                                  const uniqueNames = [];
                                                                  return previousAccount
                                                                        .filter((item) => {
                                                                              const name = item?.shop2?.data?.name;
                                                                              if (name && !uniqueNames.includes(name)) {
                                                                                    uniqueNames.push(name);
                                                                                    return true; // keep the item as it has a unique name
                                                                              }
                                                                              return false; // discard the item if name is a duplicate
                                                                        })
                                                                        .map((item) => {
                                                                              // Calculate expireDate by adding 30 days to createdAt
                                                                              const createdAt = new Date(item?.createdAt);
                                                                              const expireDate = new Date(createdAt);
                                                                              expireDate.setDate(expireDate.getDate() + 30);

                                                                              const today = new Date();
                                                                              const timeDifference = expireDate - today;
                                                                              const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // calculate days remaining

                                                                              let statusLabel;
                                                                              let statusColor;
                                                                              let bg_color;

                                                                              if (daysLeft > 5) {
                                                                                    statusLabel = 'Active';
                                                                                    statusColor = 'text-green-500';
                                                                                    bg_color = 'bg-green-500'; // Green for active
                                                                              } else if (daysLeft > 0 && daysLeft <= 5) {
                                                                                    statusLabel = `${daysLeft} days left`; // Show number of days left if expiring soon
                                                                                    statusColor = 'text-yellow-500';
                                                                                    bg_color = 'bg-yellow-500'; // Yellow for expiring soon
                                                                              } else {
                                                                                    statusLabel = 'Expired';
                                                                                    statusColor = 'text-red-500';
                                                                                    bg_color = 'bg-red-500'; // Red for expired
                                                                              }

                                                                              return (
                                                                                    <tr key={item?.shop2?.data?.name}>
                                                                                          <td class="px-6 py-4 text-sm font-medium text-gray-500 whitespace-normal">
                                                                                                {item?.shop2?.data?.name}
                                                                                          </td>
                                                                                          <td class="px-6 py-4 text-sm font-medium text-gray-500 whitespace-normal">
                                                                                                {createdAt.toDateString()}
                                                                                          </td>
                                                                                          <td class="px-6 py-4 text-sm font-medium text-gray-500 whitespace-normal">
                                                                                                {expireDate.toDateString()}
                                                                                          </td>
                                                                                          <td class={`px-6 py-4 text-sm font-medium whitespace-normal flex items-center gap-1 ${statusColor}`}>
                                                                                                <Circle className={`${bg_color} size-2 rounded-full`} />     {statusLabel}
                                                                                          </td>
                                                                                    </tr>
                                                                              );
                                                                        });
                                                            })()
                                                      }
                                                </tbody>



                                          </table>
                                    </div>
                              </div>
                        </div>

                  </div>
            </div>
      );
};

export default DarazIntegration;
