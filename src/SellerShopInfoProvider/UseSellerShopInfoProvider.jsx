import React, { createContext, useState } from "react";

export const SellerShopInfoContext = createContext();

const SellerShopInfoProvider = ({ children }) => {
  const [sellerShopInfo, setSellerShopInfo] = useState({
    shopId: "",
    shopLogo: "",
    shopAddress: "",
    phone: "",
  });

  const values = {
    sellerShopInfo,
    setSellerShopInfo,
  };

  return (
    <SellerShopInfoContext.Provider value={values}>
      {children}
    </SellerShopInfoContext.Provider>
  );
};

export default SellerShopInfoProvider;
