import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { BiSearch } from "react-icons/bi";

const ShopSmallNav = () => {
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  const shopId = idMatch ? idMatch[1] : null;

  const shopInfo = useContext(AuthContext);

  const {
    data: shop = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/${shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(shopInfo, "+++");

  return (
    <>
      <div className="bg-black">
        <div className=" mx-auto py-3 px-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex justify-between">
            <div className="flex gap-4 md:gap-10">
              <h1 className="text-white flex gap-1 text-[12px] md:text-sm items-center">
                <IoCall />
                {shop?.shopNumber}
              </h1>
              <h1 className="text-white flex gap-1 text-[12px] md:text-sm items-center">
                <MdEmail className="text-xl" />{" "}
                <span className="">{shop?.shopEmail}</span>
              </h1>
            </div>
            {shopInfo && (
              <Link
                to={"/seller/dashboard"}
                className="text-sm hidden lg:block text-white underline underline-offset-2"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
      <nav className="mx-auto lg:hidden md:border-none border-b flex items-center justify-between py-3 px-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <Link to={`/shop/${shopId}`} aria-label="Company" title="Company">
          <img
            srcSet={shop?.logo}
            className="w-[100px] object-cover"
            src={shop?.logo}
            alt=""
          />
        </Link>

        <div className="flex items-center border py-1 px-2 h-[36px] rounded">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none focus:outline-none h-full"
          />
          <button className="text-lg">
            <BiSearch />
          </button>
        </div>
      </nav>
    </>
  );
};

export default ShopSmallNav;
