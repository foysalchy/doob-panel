import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Select from "react-select";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";

const SellerInputProductName = ({ product, brandName, setBrandName }) => {
  console.log(brandName);
  // Function to handle brand selection
  const handleBrand = (value) => {
    console.log(value);
    setBrandName(value);
  };

  const { shopInfo } = useContext(AuthContext);
  const {
    data: AllBrand = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allBrand"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/brand/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  // Set the default brand name when the product changes
  useEffect(() => {
    if (!isLoading && product && product.brandName) {
      setBrandName(product.brandName);
    }
  }, [product, isLoading, setBrandName]);

  console.log(isLoading, AllBrand);
  // console.log(AllBrand);
  console.log(product?.brandName);

  return (
    <div>
      <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
        <div className="flex flex-col">
          <span className="font-bold">Product Informations</span>
          <small>
            Having accurate product information raises discoverability.
          </small>
        </div>



        <fieldset className="mt-4 w-full  dark:text-gray-100">
          <div className="">
            <label htmlFor="">English Title</label>
            <input
              defaultValue={product?.name ? product?.name : ""}
              type="text"
              name="productNameEn"
              placeholder="Ex. Nikon Coolpix A300 Digital Camera"
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />
          </div>
        </fieldset>
        <fieldset className="mt-4 w-full  dark:text-gray-100">

          <div className="">
            <label htmlFor="">Bnagla Title</label>
            <input
              defaultValue={product?.BnName ? product?.BnName : ""}
              type="text"
              name="productNameBn"
              placeholder="Ex. Nikon Coolpix A300 Digital Camera"
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />
          </div>
        </fieldset>

        <div className="mt-2 grid items-center gap-2 grid-cols-2 mt-4">
          <div>
            <label htmlFor="megaCategory">Select Your Brand</label>
            <Select
              id="megaCategory"
              placeholder="Select your Brand"
              // Set the value prop to the selected brand name
              value={{
                value: brandName || "",
                label: brandName || "Select your Brand",
              }}
              onChange={(selectedOption) => handleBrand(selectedOption.value)}
              options={AllBrand?.map((brand) => ({
                value: brand.name,
                label: brand.name,
              }))}
            />
          </div>
          <div  >
            <label htmlFor="megaCategory">Provide SKU Update</label>
            <input
              defaultValue={product?.sku ?? `${shopInfo.shopId}_${Math.floor(
                Math.random() * 100000000
              )}`}
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
              type="text"
              // pattern="[0-9]{8}"
              title="Please enter an 8-digit number."
              required
              name="ProductSKU"
              id=""
            />
          </div>
        </div>


      </div>
    </div>
  );
};

export default SellerInputProductName;
