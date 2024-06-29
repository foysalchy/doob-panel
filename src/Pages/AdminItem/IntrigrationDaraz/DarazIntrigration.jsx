import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import CryptoJS from "crypto-js";
import { useQuery } from "@tanstack/react-query";
// import { data } from "autoprefixer";
import Swal from "sweetalert2";
import ModalForWoo from "./ModalForWoo";
// import { LuSwitchCamera } from "react-icons/lu";
// import { MdEmail } from "react-icons/md";

const DarazIntegration = () => {
  const { shopInfo, setShopInfo } = useContext(AuthContext);
  const [wooModal, setWoModal] = useState(false);

  const [code, setCode] = useState(null);

  const currentTimeInMilliseconds = new Date().getTime();

  useEffect(() => {
    const currentUrl = window.location.href;

    // Parse the URL and get the value of the 'code' parameter
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    console.log("🚀 ~.jsx:25 ~ useEffect ~ urlParams:", urlParams);
    const code = urlParams.get("code");
    if (code) {
      setCode(code);
      refetch();
    }
    // setCode(code);
  }, []);

  console.log(code);
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
              setShopInfo(data);
              const jsonData = JSON.stringify(data);
              document.cookie = `SellerShop=${encodeURIComponent(
                jsonData
              )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
              Swal.fire("Daraz Login Successful", "", "success");

              const currentUrl = new URL(window.location.href);
              currentUrl.searchParams.delete("code");
              window.history.replaceState(
                {},
                document.title,
                currentUrl.toString()
              );
              refetch();
              setCode(null);
            });
        });
    }
  }, [code]);

  const {
    data: darazShop = [],
    isLoading,
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

  // console.log(previousAccount);
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

  // console.log(parseInt(prices?.result?.limitValue));
  // console.log(previousAccount.length);
  const switchAccount = (_id, id) => {
    console.log(
      `https://doob.dev/api/v1/daraz/switching-your-daraz?id=${id}&loginId=${_id}`
    );
    fetch(
      `https://doob.dev/api/v1/daraz/switching-your-daraz?id=${id}&loginId=${_id}`,
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

  const [selectedAccount, setSelectedAccount] = useState("");
  const handleChange = (event) => {
    const selectedOldId = event.target.value;
    console.log(selectedOldId);
    const selectedShop = previousAccount.find(
      (shop) => shop._id === selectedOldId
    );
    console.log(selectedShop, selectedOldId);
    setSelectedAccount(selectedOldId);
    if (selectedShop) {
      switchAccount(selectedShop._id, selectedShop.oldId);
    }
  };

  // console.log(prices?.result);
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
                  {" "}
                  your remain account space{" "}
                  {parseInt(prices?.result?.limitValue) -
                    previousAccount?.length}
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
        {/* <div className="w-full px-4 py-2 bg-gray-50 rounded text-blue-500 flex items-center gap-2">
          <MdEmail />
          {<h1 className="w-full"> {darazShop?.result?.account}</h1>}
        </div> */}

        <div className="bg-gray-50 px-4 py-2 rounded text-blue-500 flex items-center gap-2">
          <h1 className="whitespace-nowrap">Switch Account</h1>
          <hr className="flex-grow mx-2 border-t border-blue-500" />
          <select
            className="w-full px-4 py-2 border rounded bg-[#d2d2d2] text-sm"
            value={selectedAccount}
            onChange={handleChange}
          >
            <option value="">{darazShop?.result?.account}</option>
            {previousAccount?.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop?.shopInfo?.name ?? shop?.result?.account}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DarazIntegration;
