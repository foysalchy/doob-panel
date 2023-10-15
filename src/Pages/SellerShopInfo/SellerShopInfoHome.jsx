import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ShopInfo1 from "./ShopInfo1";
import AffiliatedCompany2 from "./AffiliatedCompany2";
import PricingInfo3 from "./PricingInfo3";
import { SellerShopInfoContext } from "../../SellerShopInfoProvider/UseSellerShopInfoProvider";

function SellerShopInfoHome() {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const { sellerShopInfo } = useContext(SellerShopInfoContext);

  const handleNextButton = () => {
    if (
      formNo === 1 &&
      sellerShopInfo?.shopId &&
      sellerShopInfo?.shopLogo &&
      sellerShopInfo?.shopAddress &&
      sellerShopInfo?.phone
    ) {
      setFormNo(formNo + 1);
    } else if (formNo === 2) {
      setFormNo(formNo + 1);
    } else {
      toast.error("Please fill up all input field");
    }
  };

  const handlePrevButton = () => {
    setFormNo(formNo - 1);
  };

  const handleFinalSubmit = () => {
    // final submit logic eikhane hobe
  };

  return (
    <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12 flex justify-center items-center">
      <Toaster />
      {/* form  */}
      <div className="card w-[400px] min-h-[300px] rounded-md shadow-md bg-white p-5 border">
        {/* stepper  */}
        <div className="flex justify-center items-center">
          {formArray.map((v, i) => (
            <>
              <div
                className={`w-[35px] mt-3 text-white rounded-full ${
                  formNo - 1 === i ||
                  formNo - 1 === i + 1 ||
                  formNo === formArray.length
                    ? "bg-blue-500"
                    : "bg-slate-400"
                } h-[35px] flex justify-center items-center`}
              >
                {v}
              </div>
              {i !== formArray.length - 1 && (
                <div
                  className={`w-[85px] h-[2px] ${
                    formNo === i + 2 || formNo === formArray.length
                      ? "bg-blue-500"
                      : "bg-slate-400"
                  }`}
                ></div>
              )}
            </>
          ))}
        </div>

        {formNo === 1 && <ShopInfo1 handleNextButton={handleNextButton} />}

        {formNo === 2 && (
          <AffiliatedCompany2
            handleNextButton={handleNextButton}
            handlePrevButton={handlePrevButton}
          />
        )}

        {formNo === 3 && (
          <PricingInfo3
            handleFinalSubmit={handleFinalSubmit}
            handlePrevButton={handlePrevButton}
          />
        )}
      </div>
    </div>
  );
}

export default SellerShopInfoHome;
