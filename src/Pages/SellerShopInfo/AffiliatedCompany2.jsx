import React, { useContext, useState } from "react";
import darazLogo from "./logos/darazlogo.png";
import wooCommerceLogo from "./logos/woocommerce.png";
import { SellerShopInfoContext } from "../../SellerShopInfoProvider/UseSellerShopInfoProvider";

const AffiliatedCompany2 = ({ handleNextButton, handlePrevButton }) => {
  const { sellerShopInfo, setSellerShopInfo } = useContext(
    SellerShopInfoContext
  );
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleButtonClick = (platform) => {
    if (selectedOptions.includes(platform)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== platform));
    } else {
      setSelectedOptions([...selectedOptions, platform]);
    }
  };

  const handleNoStoreCheckboxChange = () => {
    setSelectedOptions([]);
  };

  const handleNext = () => {
    let updatedShopInfo = { ...sellerShopInfo };
    updatedShopInfo.haveDarazAccount = selectedOptions.includes("daraz");
    updatedShopInfo.haveWooCommerceAccount =
      selectedOptions.includes("woocommerce");
    updatedShopInfo.noAccount = selectedOptions.length === 0;

    setSellerShopInfo(updatedShopInfo);
    handleNextButton();
  };

  return (
    <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
      <h2 className="text-xl font-medium mb-5">Affiliated Company</h2>
      <div className="grid grid-cols-2 items-center gap-3 sm:gap-x-5 mb-5">
        <button
          disabled={selectedOptions.includes("daraz")}
          onClick={() => handleButtonClick("daraz")}
          className={`${
            selectedOptions.includes("daraz")
              ? "bg-slate-200"
              : "bg-white hover:bg-slate-200"
          } rounded-lg duration-300 transition-colors border px-8 py-2.5`}
        >
          <img className="w-16 h-6" src={darazLogo} alt="daraz" />
        </button>
        <button
          disabled={selectedOptions.includes("woocommerce")}
          onClick={() => handleButtonClick("woocommerce")}
          className={`${
            selectedOptions.includes("woocommerce")
              ? "bg-slate-200"
              : "bg-white hover:bg-slate-200"
          } rounded-lg duration-300 transition-colors border px-8 py-2.5`}
        >
          <img className="h-6" src={wooCommerceLogo} alt="logo" />
        </button>
      </div>
      <div className="flex justify-start items-center ">
        <input
          className="mx-2 cursor-pointer"
          type="checkbox"
          checked={selectedOptions.length === 0}
          onChange={handleNoStoreCheckboxChange}
        />
        I have no store
      </div>
      <div className="mt-4 gap-3 flex justify-center items-center">
        <button
          onClick={handlePrevButton}
          className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AffiliatedCompany2;
