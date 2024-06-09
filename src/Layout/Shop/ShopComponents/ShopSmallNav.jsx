import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { ShopAuthProvider } from "../../../AuthProvider/ShopAuthProvide";
import { AuthContext } from "../../../AuthProvider/UserProvider";
const ShopSmallNav = () => {
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  const shopId = idMatch ? idMatch[1] : null;

  const shopInfo = useContext(AuthContext);
  const { color, setColor } = useContext(ShopAuthProvider);

  const {
    data: shop = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/shop/${shopId}`
      );
      const data = await res.json();
      setColor({ 'primary_color': data.primary_color, 'secounder_color': data.secounder_color, 'text_color': data.text_color });
      return data;
    },
  });

  console.log(shopInfo, "+++");

  return (
    <>
      <style jsx>{`
        .bg-black,.bg-gray-900,.bg-gray-950,.bg-gray-800 ,.bg-gray-600  ,.bg-gray-400  ,.bg-gray-500 {
          background: ${color.primary_color};
        }  

       .text-white,.text-gray-100,.text-gray-500{
        color:${color.text_color}
       } 
       
        .bg-white svg,.bg-gray-900  svg{
          fill:${color.text_color}
        }
        .secondry_color{
          color: ${color.primary_color};
        }
        .bg-blue-500,.bg-indigo-600,.sec_bg{
          background: ${color.secounder_color};
          color:white !important
        }
        .bg-blue-500:hover,.bg-indigo-600:hover{
          background: ${color.primary_color};
          color:white !important
        }
        .text-whitex { 
          color: white !important;
        }
        
        .bg-gray-900{ opacity:0.9 }
        .bg-gray-950{ opacity:0.9 }
        .bg-gray-800{ opacity:0.8 }
        .bg-gray-700{ opacity:0.7 }
        .bg-gray-600{ opacity:0.6 }
        .bg-gray-400{ opacity:0.4 }
      `}</style>

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
