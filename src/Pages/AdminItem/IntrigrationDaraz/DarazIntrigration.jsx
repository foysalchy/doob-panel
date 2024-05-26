import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import CryptoJS from "crypto-js";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import ModalForWoo from "./ModalForWoo";
import { LuSwitchCamera } from "react-icons/lu";
import { MdEmail } from "react-icons/md";

const DarazIntegration = () => {
  const { shopInfo, setShopInfo } = useContext(AuthContext);
  const [wooModal, setWoModal] = useState(false);

  const [code, setCode] = useState(null);

  const currentTimeInMilliseconds = new Date().getTime();

  useEffect(() => {
    const currentUrl = window.location.href;

    // Parse the URL and get the value of the 'code' parameter
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    const code = urlParams.get("code");
    setCode(code);
    refetch();
  }, []);

  useEffect(() => {
    if (code) {
      fetch("https://backend.doob.com.bd/api/v1/daraz/get-key")
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "daraz");
          const { appkey, secretkey } = data[0];

          const appKey = appkey;
          const secretKey = secretkey;

          const url = "https://api.daraz.com.bd/rest/auth/token/create";
          const timestamp = currentTimeInMilliseconds;
          const patch = `/auth/token/createapp_key${appKey}code${code}sign_methodsha256timestamp${timestamp}`;
          const sign = CryptoJS.HmacSHA256(patch, secretKey)
            .toString(CryptoJS.enc.Hex)
            .toUpperCase();

          const body = {
            sign_method: "sha256",
            sign: sign,
            app_key: appKey,
            code: code,
            timestamp: timestamp,
            url,
          };

          fetch(
            `https://backend.doob.com.bd/api/v1/daraz/addCode/${shopInfo._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              setShopInfo(data);
              const jsonData = JSON.stringify(data);
              document.cookie = `SellerShop=${encodeURIComponent(
                jsonData
              )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
              Swal.fire("Daraz Login Successful", "", "success");
              refetch();
            });
        });
    }
  }, [code]);

  const {
    data: darazShop = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["darazShopBd"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/seller-daraz-accounts?id=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data[0];
    },
  });

  console.log(
    `log================   https://backend.doob.com.bd/api/v1/seller/get-privious-account?shopId=${shopInfo._id}`
  );

  const {
    data: priviousAccount = [],
    isLoading: loading,
    refetch: reload,
  } = useQuery({
    queryKey: ["priviousAccount"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/daraz/get-privious-account?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const switchAccount = (_id, id) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/daraz/switching-your-daraz?id=${id}&loginId=${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log response data
        Swal.fire("Success", "", "success"); // Show success message (assuming you're using SweetAlert)
        refetch(); // Refetch data
        reload(); // Reload data
      });
  };

  console.log("prev:", priviousAccount, "daraz:", darazShop);

  return (
    <div>
      <div className="grid md:grid-cols-2 justify-between md:gap-10 gap-3 md:mt-10">
        <div className={"bg-gray-300  py-6 text-center  rounded-md "}>
          {
            <a
              href="https://api.daraz.com.bd/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://doob.com.bd/seller/channel-integration/&client_id=501436"
              className="text-blue-500 hover:underline mb-4 inline-block"
            >
              Login Daraz
            </a>
          }
          {/* 
                {shopInfo.darazLogin && (
                    <div className="bg-green-100 border-l-4 border-green-500  py-6 text-center  rounded-md">
                        <h1 className="text-green-700 font-bold">Your daraz account is connected</h1>
                    </div>
                )} */}
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
              Woocomarce Login
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
        <div className="w-full px-4 py-2 bg-gray-50 rounded text-blue-500 flex items-center gap-2">
          <MdEmail />
          {<h1 className="w-full"> {darazShop?.result?.account}</h1>}
        </div>

        <div className="w-full">
          <h1>Previous Login</h1>
          <hr />
          {priviousAccount
            .filter(
              (shop) => shop.result.account !== darazShop?.result?.account
            )
            .map((shop) => (
              <div className="  px-4 py-2 border flex items-center justify-between rounded bg-[#d2d2d2] text-sm">
                {shop.result.account}{" "}
                <button
                  onClick={() => switchAccount(shop._id, shop.oldId)}
                  className="cursor-pointer bg-blue-500 text-white  px-4 py-1 rounded flex items-center gap-2 "
                >
                  <LuSwitchCamera /> Switch
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DarazIntegration;
