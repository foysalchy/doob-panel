import React, { useContext, useEffect, useState } from "react";
import { SellerShopInfoContext } from "../../SellerShopInfoProvider/UseSellerShopInfoProvider";

const ShopInfo1 = ({ handleNextButton }) => {
  const { sellerShopInfo, setSellerShopInfo } = useContext(
    SellerShopInfoContext
  );


  const handleChange = (event) => {
    const { name, value } = event.target;
    setSellerShopInfo({ ...sellerShopInfo, [name]: value });
  };

  const handleImgChange = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=2b8c7f515b1f628299764a2ce4c4cb0e`;
    try {
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            setSellerShopInfo({
              ...sellerShopInfo,
              shopLogo: imgData?.data?.url,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
      <h2 className="text-xl font-medium mb-2"> Shop Information</h2>
      <div className="flex flex-col mb-2">
        <label className="text-slate-500" htmlFor="shopId">
          Shop ID <span className="text-red-500">*</span>
        </label>
        <input
          value={sellerShopInfo?.shopId}
          onChange={handleChange}
          className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
          type="text"
          name="shopId"
          placeholder="Shop ID"
          id="shopId"
        />
      </div>
      {/* shop logo  */}
      <div className="flex flex-col mb-2">
        <label className="text-slate-500" htmlFor="image">
          Shop Logo <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          onChange={handleImgChange}
          className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
        />
      </div>
      {/* shop address  */}
      <div className="flex flex-col mb-2">
        <label className="text-slate-500" htmlFor="shopAddress">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          value={sellerShopInfo?.shopAddress}
          onChange={handleChange}
          className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
          type="text"
          name="shopAddress"
          placeholder="Shop Address"
          id="shopAddress"
        />
      </div>

      {/* phone number  */}
      <div className="flex flex-col mb-2">
        <label className="text-slate-500" htmlFor="phone">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          value={sellerShopInfo?.phone}
          onChange={handleChange}
          className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
          type="number"
          name="phone"
          placeholder="phone"
        />
      </div>

      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={handleNextButton}
          className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopInfo1;
