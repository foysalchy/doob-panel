import React, { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

import { Link, NavLink } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";

import { useState } from "react";
import { RiChatSmile2Line } from "react-icons/ri";
import {
      BsArrowsFullscreen,
      BsBasket,
      BsBox2,
      BsBoxArrowLeft,
      BsBoxSeam,
      BsCalculator,
      BsCalendar2Range,
      BsChatSquareText,
      BsColumnsGap,
      BsFillBootstrapFill,
      BsFillImageFill,
      BsFillJournalBookmarkFill,
      BsGear,
      BsGlobe,
      BsHddNetworkFill,
      BsHeadset,
      BsLayoutTextSidebarReverse,
      BsLifePreserver,
      BsPersonLinesFill,
      BsPrinter,
      BsShop,
      BsWindowPlus,
} from "react-icons/bs";

import { useQuery } from "@tanstack/react-query";
import { CgClose } from "react-icons/cg";
import Logo from "../../../../assets/doobLightLogo.png";
import { TfiAnnouncement } from "react-icons/tfi";
const SideNavberSeller = ({ responsive, setResponsive }) => {
      const { user, logOut, shopInfo } = useContext(AuthContext);

      const { data: prices = {}, loader: loaderPrice } = useQuery({
            queryKey: ["ShopPrices"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();
                  console.log(data?.data?.result);
                  return data?.data;
            },
      });

      console.log(prices, "orderInfo");
      const managementPermission = (check) => {
             return true;
      };

      const calculatePassedDays = (startTime) => {
            const currentTime = Date.now();
            const passedTimeMs = currentTime - startTime;
            return Math.floor(passedTimeMs / (1000 * 60 * 60 * 24));
      };

      const calculateRemainingDays = (endTime) => {
            const currentTime = Date.now();
            const remainingTimeMs = endTime - currentTime;
            return Math.ceil(remainingTimeMs / (1000 * 60 * 60 * 24));
      };

      const passedDays = calculatePassedDays(prices?.orderInfo?.time_stamp);
      const remainingDays = calculateRemainingDays(prices?.orderInfo?.endTime);

      // const check_expired = () => {
      //   const paymentDate = new Date(shopInfo?.paymentDate);
      //   const currentDate = new Date();

      //   const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
      //   const SEVEN_DAYS_IN_MILLISECONDS = 7 * MILLISECONDS_IN_A_DAY;

      //   // Calculate the time difference in milliseconds
      //   const timeDifference = currentDate.getTime() - paymentDate.getTime();

      //   // Check if the current date is within 7 days of the payment date
      //   const isWithinFreeTrial = timeDifference < SEVEN_DAYS_IN_MILLISECONDS;

      //   // Calculate remaining and passed days if `prices.orderInfo` is available
      //   if (!loaderPrice && prices?.orderInfo) {
      //     // console.log('yes')
      //     const remainingDays = Math.max(
      //       0,
      //       (paymentDate.getTime() +
      //         SEVEN_DAYS_IN_MILLISECONDS -
      //         currentDate.getTime()) /
      //       MILLISECONDS_IN_A_DAY
      //     );
      //     const passedDays = Math.floor(timeDifference / MILLISECONDS_IN_A_DAY);

      //     // console.log(remainingDays, "remainingDays", passedDays, "remainingDays, passedDays",remainingDays - passedDays > 0);
      //     return remainingDays - passedDays > 0;
      //   } else {
      //     return isWithinFreeTrial;
      //   }
      // };

      const check_expired = () => {
            const paymentDate = new Date(shopInfo?.paymentDate);
            const currentDate = new Date();

            const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
            const SEVEN_DAYS_IN_MILLISECONDS = 7 * MILLISECONDS_IN_A_DAY;

            // Calculate the time difference in milliseconds
            const timeDifference = currentDate.getTime() - paymentDate.getTime();

            // Check if the current date is within 7 days of the payment date
            const isWithinFreeTrial = timeDifference < SEVEN_DAYS_IN_MILLISECONDS;

            if (!loaderPrice && prices?.orderInfo) {
                  const remainingDays = Math.max(
                        0,
                        (paymentDate.getTime() +
                              SEVEN_DAYS_IN_MILLISECONDS -
                              currentDate.getTime()) /
                        MILLISECONDS_IN_A_DAY
                  );

                  return remainingDays > 0;
            } else {
                  return isWithinFreeTrial;
            }
      };

      const [openDropdownIndex, setOpenDropdownIndex] = useState(false);
      console.log(user?.permissions, "permssion");
      const handleToggle = (idx) => {
            setOpenDropdownIndex((prevIdx) => (prevIdx === idx ? false : idx));
      };

      console.log(
            shopInfo
      );


      const handleClick = () => {
            // Check if the screen width is small (e.g., less than 768px)
            if (window.innerWidth < 768) {
                  // Perform your action for small devices
                  !responsive && setResponsive(true);
            }
      };

      return (
            <div className=" sticky">
                  <style jsx>{`
        .nv a {
          display: block;
          padding: 7px 10px;
          width: 100%;
        }
        .nv a div {
          padding: 0;
        }
        .nv li {
          padding: 0 !important;
        }
      `}</style>

                  <div
                        className={`${responsive
                              ? "flex h  h-screen  overflow-y-auto  flex-col  md:p-3 p-0 lg:w-[70px] md:w-[70px] w-0  border-r-2  "
                              : "flex flex-col  p-6 md:w-64 w-[300px]  h-screen  overflow-y-auto"
                              } md:relative fixed  z-[4000] bg-[#111827] top-0 left-0 bottom-0 nv`}
                  >
                        <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                    {!responsive && (
                                          <Link
                                                to="/"
                                                aria-label="Company"
                                                title="Company"
                                                className="inline-flex items-center"
                                          >
                                                <img className="w-32" src={Logo} srcSet={Logo} alt="" />
                                          </Link>
                                    )}
                                    {responsive ? (
                                          <button
                                                onClick={() => setResponsive(false)}
                                                aria-label="Company"
                                                title="Company"
                                                className="inline-flex items-center"
                                          >
                                                <BsArrowsFullscreen className="w-5 h-5 fill-current " />
                                          </button>
                                    ) : (
                                          <button onClick={() => setResponsive(true)} className="p-2">
                                                <CgClose />
                                          </button>
                                    )}
                              </div>

                              {shopInfo?.status && !user.disable && prices && check_expired() ? (
                                    // status

                                    <>
                                          {!responsive && (
                                                <div className="flex-1 h-full ">
                                                      <ul className="pt-2 pb-4 space-y-1 text-sm">
                                                            <li className="rounded-sm  hover:bg-gray-800">
                                                                  <Link
                                                                        to={"/seller/dashboard"}
                                                                        rel="noopener noreferrer"
                                                                        onClick={handleClick}
                                                                        className="ok flex items-center p-2 space-x-3 rounded-md"
                                                                  >
                                                                        <div className=" flex items-center p-2 space-x-3 ">
                                                                              <BsColumnsGap className="w-5 h-5 fill-current text-gray-400" />

                                                                              <span>Dashboard</span>
                                                                        </div>
                                                                  </Link>
                                                            </li>

                                                            {/* product management */}
                                                            {!user?.staffRole ||
                                                                  user?.permissions.find(
                                                                        (itm) => itm?.name === "Product Management"
                                                                  ) ? (
                                                                  <li className="rounded-sm">
                                                                        <div className="group [&_summary::-webkit-details-marker]:hidden flex-col flex items-center rounded-sm  ">
                                                                              <div
                                                                                    onClick={() => handleToggle(1)}
                                                                                    className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                              >
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <BsBox2 className="w-5 h-5 fill-current text-gray-400" />

                                                                                          <span>Product</span>
                                                                                    </div>

                                                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </div>

                                                                              {openDropdownIndex === 1 && (
                                                                                    <ul className="mt-2 space-y-1  p-2 border border-[gray] bg-[#1b202ea1] w-full">
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Product Management"
                                                                                                ) ? (
                                                                                                <li className="">
                                                                                                      <ul className="flex flex-col ">
                                                                                                            <Link
                                                                                                                  onClick={handleClick}
                                                                                                                  to={"/seller/product-management/manage"}
                                                                                                                  className="flex cursor-pointer items-center justify-between  py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                                                            >
                                                                                                                  Products
                                                                                                            </Link>
                                                                                                            <Link
                                                                                                                  onClick={handleClick}
                                                                                                                  to={"/seller/product-management/doob"}
                                                                                                                  className="flex cursor-pointer items-center justify-between  py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                                                            >
                                                                                                                  Doob Products
                                                                                                            </Link>
                                                                                                            <li onClick={handleClick} className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  <Link

                                                                                                                        to={
                                                                                                                              "/seller/product-management/add-product"
                                                                                                                        }
                                                                                                                  >
                                                                                                                        Add Product
                                                                                                                  </Link>
                                                                                                            </li>
                                                                                                            <li onClick={handleClick} className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  <Link to={"/products"}>
                                                                                                                        Add Doob Product
                                                                                                                  </Link>
                                                                                                            </li>
                                                                                                            <li onClick={handleClick} className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  <Link
                                                                                                                        to={
                                                                                                                              "/seller/product-management/add-daraz-product"
                                                                                                                        }
                                                                                                                  >
                                                                                                                        Add Daraz Product
                                                                                                                  </Link>
                                                                                                            </li>
                                                                                                            <li onClick={handleClick} className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  <Link
                                                                                                                        to={
                                                                                                                              "/seller/product-management/add-woo-product"
                                                                                                                        }
                                                                                                                  >
                                                                                                                        Woo Product
                                                                                                                  </Link>
                                                                                                            </li>
                                                                                                      </ul>
                                                                                                </li>
                                                                                          ) : null}
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Categories Management"
                                                                                                ) ? (
                                                                                                <li className="bg-[#1b202ea1]">
                                                                                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                                                                                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                                                                        {/* <TbCategory className="w-5 h-5 fill-current text-gray-400" /> */}

                                                                                                                        <span>Category</span>
                                                                                                                  </div>

                                                                                                                  <span className="shrink-0 transition duration-300 ">
                                                                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                                                                  </span>
                                                                                                            </summary>

                                                                                                            <ul className="mt-2 space-y-1 px-2 border border-gray-500 ">
                                                                                                                  <li onClick={handleClick} className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                        <Link
                                                                                                                              to={
                                                                                                                                    "/seller/categories-management/mega-categories-management"
                                                                                                                              }
                                                                                                                              className="w-full"
                                                                                                                        >
                                                                                                                              Mega Category
                                                                                                                        </Link>
                                                                                                                  </li>
                                                                                                                  <li onClick={handleClick} className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                        <Link
                                                                                                                              to={
                                                                                                                                    "/seller/categories-management/sub-categories-management"
                                                                                                                              }
                                                                                                                              className="w-full"
                                                                                                                        >
                                                                                                                              Sub Category
                                                                                                                        </Link>
                                                                                                                  </li>
                                                                                                                  <li onClick={handleClick} className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                        <Link
                                                                                                                              to={
                                                                                                                                    "/seller/categories-management/mini-categories-management"
                                                                                                                              }
                                                                                                                              className="w-full"
                                                                                                                        >
                                                                                                                              Mini Category
                                                                                                                        </Link>
                                                                                                                  </li>

                                                                                                                  <li onClick={handleClick} className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                        <Link
                                                                                                                              to={
                                                                                                                                    "/seller/categories-management/extra-categories-management"
                                                                                                                              }
                                                                                                                              className="w-full"
                                                                                                                        >
                                                                                                                              Extra Category
                                                                                                                        </Link>
                                                                                                                  </li>
                                                                                                            </ul>
                                                                                                      </details>
                                                                                                </li>
                                                                                          ) : null}
                                                                                    </ul>
                                                                              )}
                                                                        </div>
                                                                  </li>
                                                            ) : null}

                                                            {!user?.staffRole ||
                                                                  user?.permissions.find((itm) => itm?.name === "Orders") ? (
                                                                  <li className=" ">
                                                                        <div className="group [&_summary::-webkit-details-marker]:hidden  items-center rounded-sm  ">
                                                                              <div
                                                                                    onClick={() => handleToggle(2)}
                                                                                    className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                              >
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <BsBasket className="w-5 h-5 fill-current text-gray-400" />
                                                                                          <span>Orders</span>
                                                                                    </div>

                                                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </div>

                                                                              {openDropdownIndex === 2 && (
                                                                                    <ul className="mt-2 space-y-1  p-2 border border-[gray] bg-[#1b202ea1]">
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/orders/manage-order"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Manage Orders
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/orders/claim-return"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Claim Return
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/orders/claim-order-list"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Claim List
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/orders/web-store-order"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Doob Orders
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/orders/manage-review"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Review
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                    </ul>
                                                                              )}
                                                                        </div>
                                                                  </li>
                                                            ) : null}
                                                            {!user?.staffRole ||
                                                                  user?.permissions.find(
                                                                        (itm) => itm?.name === "Inventory"
                                                                  ) ? (
                                                                  <>
                                                                        <li

                                                                              className="relative "
                                                                        >
                                                                              <div className="group [&_summary::-webkit-details-marker]:hidden flex flex-col  rounded-sm  ">
                                                                                    <div
                                                                                          onClick={() => handleToggle(60)}
                                                                                          className="flex w-full cursor-pointer  justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                                                                                    >
                                                                                          <div className="flex cursor-pointer  gap-2">
                                                                                                <BsBoxSeam className="w-5 h-5 fill-current text-gray-400" />
                                                                                                <span>Inventory</span>
                                                                                          </div>

                                                                                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                                <IoIosArrowDown className="h-5 w-5" />
                                                                                          </span>
                                                                                    </div>

                                                                                    {openDropdownIndex == 60 && (
                                                                                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                                                                                                {!user?.staffRole ||
                                                                                                      user?.permissions.find(
                                                                                                            (itm) => itm?.name === "Warhouse"
                                                                                                      )
                                                                                                      ? managementPermission("Warehouse") && (
                                                                                                            <li className="bg-[#1b202ea1]">
                                                                                                                  <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                                                                                                        <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                              <div className="flex cursor-pointer items-center gap-2">
                                                                                                                                    {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                                                                                                                    <span>Warehouse </span>
                                                                                                                              </div>

                                                                                                                              <span className="shrink-0 transition duration-300">
                                                                                                                                    <IoIosArrowDown className="h-5 w-5" />
                                                                                                                              </span>
                                                                                                                        </summary>

                                                                                                                        <ul className="mt-2 space-y-1 px-2 border border-gray-500 ">
                                                                                                                              <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                                    <Link
                                                                                                                                          to={
                                                                                                                                                "/seller/warehouse/warehouse-management"
                                                                                                                                          }
                                                                                                                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                                                                                                                    >
                                                                                                                                          Warehouse Manage
                                                                                                                                    </Link>
                                                                                                                              </li>
                                                                                                                              <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                                    <Link
                                                                                                                                          to={
                                                                                                                                                "/seller/warehouse/area-management"
                                                                                                                                          }
                                                                                                                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                                                                                                                    >
                                                                                                                                          Area Manage
                                                                                                                                    </Link>
                                                                                                                              </li>
                                                                                                                              <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                                    <Link
                                                                                                                                          to={
                                                                                                                                                "/seller/warehouse/rack-management"
                                                                                                                                          }
                                                                                                                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                                                                                                                    >
                                                                                                                                          Rack Manage
                                                                                                                                    </Link>
                                                                                                                              </li>
                                                                                                                              <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                                    <Link
                                                                                                                                          to={
                                                                                                                                                "/seller/warehouse/self-management"
                                                                                                                                          }
                                                                                                                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                                                                                                                    >
                                                                                                                                          Self Manage
                                                                                                                                    </Link>
                                                                                                                              </li>
                                                                                                                              <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                                    <Link
                                                                                                                                          to={
                                                                                                                                                "/seller/warehouse/cell-management"
                                                                                                                                          }
                                                                                                                                          className=" text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md"
                                                                                                                                    >
                                                                                                                                          Cell Manage
                                                                                                                                    </Link>
                                                                                                                              </li>
                                                                                                                        </ul>
                                                                                                                  </details>
                                                                                                            </li>
                                                                                                      )
                                                                                                      : null}
                                                                                                <li>
                                                                                                      <NavLink
                                                                                                            onClick={handleClick}
                                                                                                            rel="noopener noreferrer"
                                                                                                            to={"/seller/stock-management"}
                                                                                                            className={({ isActive }) => {
                                                                                                                  return isActive
                                                                                                                        ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                                                                                                        : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                                                                                            }}
                                                                                                      >
                                                                                                            <span>Stock Request</span>
                                                                                                      </NavLink>
                                                                                                </li>
                                                                                                <li>
                                                                                                      <NavLink
                                                                                                            onClick={handleClick}
                                                                                                            rel="noopener noreferrer"
                                                                                                            to={"/seller/inventory-management"}
                                                                                                            className={({ isActive }) => {
                                                                                                                  return isActive
                                                                                                                        ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                                                                                                        : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                                                                                            }}
                                                                                                      >
                                                                                                            <span>Stock Check</span>
                                                                                                      </NavLink>
                                                                                                </li>
                                                                                                <li>
                                                                                                      <NavLink
                                                                                                            onClick={handleClick}
                                                                                                            rel="noopener noreferrer"
                                                                                                            to={"/seller/report-management/stock"}
                                                                                                            className={({ isActive }) => {
                                                                                                                  return isActive
                                                                                                                        ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                                                                                                        : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                                                                                            }}
                                                                                                      >
                                                                                                            <span>Report</span>
                                                                                                      </NavLink>
                                                                                                </li>
                                                                                          </ul>
                                                                                    )}
                                                                              </div>
                                                                        </li>
                                                                  </>
                                                            ) : null}
                                                            {!user?.staffRole ||
                                                                  user?.permissions?.find((itm) => itm?.name === "Pos")
                                                                  ? managementPermission("POS") && (
                                                                        <li className="rounded-sm">
                                                                              <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                                                                                    <div
                                                                                          onClick={() => handleToggle(3)}
                                                                                          className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                                    >
                                                                                          <div className="flex cursor-pointer items-center gap-2">
                                                                                                <BsPrinter className="w-5 h-5 text-gray-400" />
                                                                                                <span>POS</span>
                                                                                          </div>

                                                                                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                                <IoIosArrowDown className="h-5 w-5" />
                                                                                          </span>
                                                                                    </div>
                                                                                    {openDropdownIndex === 3 && (
                                                                                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                                                <li onClick={handleClick}>
                                                                                                      <Link
                                                                                                            to="/seller/pos"
                                                                                                            rel="noopener noreferrer"
                                                                                                            className="flex items-center px-2 p-2 space-x-3 rounded-md"
                                                                                                      >
                                                                                                            Sale
                                                                                                      </Link>
                                                                                                </li>
                                                                                                <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                      <Link
                                                                                                            to={
                                                                                                                  "/seller/report-management/pos-report"
                                                                                                            }
                                                                                                            className="w-full"
                                                                                                      >
                                                                                                            <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                                  Order
                                                                                                            </div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                                <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                      <Link
                                                                                                            to={
                                                                                                                  "/seller/report-management/customer-report"
                                                                                                            }
                                                                                                            className="w-full"
                                                                                                      >
                                                                                                            <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                                  Customer Report
                                                                                                            </div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          </ul>
                                                                                    )}
                                                                              </div>
                                                                        </li>
                                                                  )
                                                                  : null}
                                                            {/* end */}
                                                            {!user?.staffRole ||
                                                                  user?.permissions.find(
                                                                        (itm) => itm?.name === "Content Management"
                                                                  ) ? (
                                                                  <li className="">
                                                                        <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                                                                              <div
                                                                                    onClick={() => handleToggle(10)}
                                                                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                              >
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <BsWindowPlus className="w-5 h-5 fill-current text-gray-400" />

                                                                                          <span>Contents</span>
                                                                                    </div>

                                                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </div>

                                                                              {openDropdownIndex === 10 && (
                                                                                    <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                                           {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Manage Pages"
                                                                                                ) ? (
                                                                                                
                                                                                        
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/manage-pages"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Pages
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                    ) : null}
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Manage Blogs"
                                                                                                ) ? (
                                                                                                
                                                                                        
                                                                                          <li className="bg-[#1b202ea1]">
                                                                                                <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                                                                                      <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            <div className="flex cursor-pointer items-center gap-2">
                                                                                                                  {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                                                                                                  <span>Blogs </span>
                                                                                                            </div>

                                                                                                            <span className="shrink-0 transition duration-300">
                                                                                                                  <IoIosArrowDown className="h-5 w-5" />
                                                                                                            </span>
                                                                                                      </summary>

                                                                                                      <ul className="mt-2 px-4 border border-gray-500 ">
                                                                                                            <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  <Link
                                                                                                                        to={"/seller/manage-blogs"}
                                                                                                                        className="w-full"
                                                                                                                  >
                                                                                                                        <div className="text-gray-50 flex text-nowrap whitespace-nowrap gap-2 items-center px-2 py-2 space-x-3 text-sm rounded-md">
                                                                                                                              Post
                                                                                                                        </div>
                                                                                                                  </Link>
                                                                                                            </li>

                                                                                                            <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  <Link
                                                                                                                        to={
                                                                                                                              "/seller/manage-blogs/blog-category"
                                                                                                                        }
                                                                                                                        className="w-full"
                                                                                                                  >
                                                                                                                        <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                                              Category
                                                                                                                        </div>
                                                                                                                  </Link>
                                                                                                            </li>
                                                                                                      </ul>
                                                                                                </details>
                                                                                          </li>
                                                                                            ) : null}
                                                                                          <li onClick={handleClick} className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/content-management/brand-management"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className=" "></div>
                                                                                                      Brand Manage
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/content-management/frame"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex p-2 cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Frame Management
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/content-management/popup-management"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Popup Manage
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/content-management/promo-code-management"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="w-full  ">Promo Code</div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/content-management/slider-management"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Home Slider
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>

                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/content-management/feature-management"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      {/* <MdPhotoSizeSelectActual className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            {" "}
                                                                                                            Feature Widgets
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                           
                                                                                                <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                      <Link
                                                                                                            to={"/seller/manage-contact/add-contact"}
                                                                                                            className="w-full"
                                                                                                      >
                                                                                                            <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                                  Add Contact
                                                                                                            </div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          
                                                                                    </ul>
                                                                              )}
                                                                        </div>
                                                                  </li>
                                                            ) : null}
                                                            {/* start */}
                                                            {/* start */}
                                                            {!user?.staffRole ||
                                                                  user?.permissions.find((itm) => itm?.name === "finance") ? (
                                                                  <li className="rounded-sm">
                                                                        <div className="group [&_summary::-webkit-details-marker]:hidden w-full items-center rounded-sm  ">
                                                                              <div
                                                                                    onClick={() => handleToggle(5)}
                                                                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                              >
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <BsCalculator className="w-5 h-5 fill-current text-gray-400" />
                                                                                          <span>Finance</span>
                                                                                    </div>

                                                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </div>

                                                                              {openDropdownIndex === 5 && (
                                                                                    <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Subscription"
                                                                                                ) ? (
                                                                                                <>
                                                                                                      <li onClick={handleClick} className="rounded-sm hover:bg-gray-800">
                                                                                                            <Link
                                                                                                                  to={"/seller/subscription-management"}
                                                                                                                  rel="noopener noreferrer"
                                                                                                                  href="#"
                                                                                                                  className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                            >
                                                                                                                  {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                                                                                                  <span>Package</span>
                                                                                                            </Link>
                                                                                                      </li>
                                                                                                      <li onClick={handleClick} className="rounded-sm hover:bg-gray-800">
                                                                                                            <Link
                                                                                                                  to={"/seller/finance"}
                                                                                                                  rel="noopener noreferrer"
                                                                                                                  href="#"
                                                                                                                  className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                            >
                                                                                                                  {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                                                                                                  <span>Ledger</span>
                                                                                                            </Link>
                                                                                                      </li>
                                                                                                      <li onClick={handleClick} className="rounded-sm hover:bg-gray-800">
                                                                                                            <Link
                                                                                                                  to={"/seller/withdraw"}
                                                                                                                  rel="noopener noreferrer"
                                                                                                                  href="#"
                                                                                                                  className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                            >
                                                                                                                  {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                                                                                                  <span>Payment Request </span>
                                                                                                            </Link>
                                                                                                      </li>
                                                                                                      <li onClick={handleClick} className="rounded-sm hover:bg-gray-800">
                                                                                                            <Link
                                                                                                                  to={"/seller/service/manage-service"}
                                                                                                                  className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                            >
                                                                                                                  <div className="w-full hover:bg-[#1b202ea1]">
                                                                                                                        Service
                                                                                                                  </div>
                                                                                                            </Link>
                                                                                                      </li>
                                                                                                      <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            <Link
                                                                                                                  to={"/seller/settings/price-role"}
                                                                                                                  className="w-full"
                                                                                                            >
                                                                                                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                        Price Role
                                                                                                                  </div>
                                                                                                            </Link>
                                                                                                      </li>
                                                                                                </>
                                                                                          ) : null}
                                                                                    </ul>
                                                                              )}
                                                                        </div>
                                                                  </li>
                                                            ) : null}

                                                            {/* end */}

                                                            {!user?.staffRole ||
                                                                  user?.permissions.find(
                                                                        (itm) => itm?.name === "Report"
                                                                  ) ? (
                                                                  <li className=" ">
                                                                        <div className="group [&_summary::-webkit-details-marker]:hidden  items-center rounded-sm  ">
                                                                              <div
                                                                                    onClick={() => handleToggle(4)}
                                                                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                              >
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <BsLayoutTextSidebarReverse className="w-5 h-5 fill-current text-gray-400" />
                                                                                          <span>Report Management</span>
                                                                                    </div>

                                                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </div>
                                                                              {openDropdownIndex === 4 && (
                                                                                    <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/report-management/packaging-cost-report"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Fee
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>

                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/report-management/sales-report"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Sales
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>

                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/report-management/user-search-report"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Search
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={
                                                                                                            "/seller/report-management/warehouse-report"
                                                                                                      }
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                            Warehouse
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                    </ul>
                                                                              )}
                                                                        </div>
                                                                  </li>
                                                            ) : null}
                                                            {!user?.staffRole ||
                                                                  user?.permissions.find(
                                                                        (itm) => itm?.name === "Settings"
                                                                  ) ? (
                                                                  <li className=" ">
                                                                        <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                                                                              <div
                                                                                    onClick={() => handleToggle(9)}
                                                                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                              >
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <BsGear className="w-5 h-5 fill-current text-gray-400" />

                                                                                          <span>Settings</span>
                                                                                    </div>

                                                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </div>

                                                                              {openDropdownIndex === 9 && (
                                                                                    <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                                          <li onClick={handleClick} className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                                                                                <Link
                                                                                                      to={"/seller/content-management/facebook-pixel"}
                                                                                                      className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                                                                                >

                                                                                                      Facebook Pixel
                                                                                                </Link>
                                                                                          </li>
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Shop Profile"
                                                                                                ) ? (
                                                                                                <li onClick={handleClick} className="rounded-sm  hover:bg-gray-800">
                                                                                                      <Link
                                                                                                            to={"/seller/shop-profile"}
                                                                                                            rel="noopener noreferrer"
                                                                                                            href="#"
                                                                                                            className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                      >
                                                                                                            <span>Shop Profile </span>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          ) : null}
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Domain Management"
                                                                                                ) ? managementPermission(
                                                                                                      "Domain Management"
                                                                                                ) && (
                                                                                                <li onClick={handleClick} className="rounded-sm  hover:bg-gray-800">
                                                                                                      <Link
                                                                                                            to={"/seller/domain-management"}
                                                                                                            rel="noopener noreferrer"
                                                                                                            href="#"
                                                                                                            className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                      >
                                                                                                            <span>Add Domain </span>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          )
                                                                                                : null}
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions?.find(
                                                                                                      (itm) => itm?.name === "Channel"
                                                                                                ) ? (
                                                                                                <li>
                                                                                                      <div className="group items-center rounded-sm">
                                                                                                            <Link
                                                                                                                  onClick={handleClick}
                                                                                                                  to="/seller/channel-integration"
                                                                                                                  rel="noopener noreferrer"
                                                                                                                  className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                            >
                                                                                                                  <span>Channel Integration</span>
                                                                                                            </Link>
                                                                                                      </div>
                                                                                                </li>
                                                                                          ) : null}
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions?.find(
                                                                                                      (itm) => itm?.name === "Payment"
                                                                                                ) ? (
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/settings/payment-management"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Payment Integration
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                    ) : null}
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/settings/shipping"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Shipping Integration
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/settings/pos-payment-management"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Pos Payment Getaway
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/settings/auth-credential"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Social Login
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>

                                                                                          <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                <Link
                                                                                                      to={"/seller/settings/email-setup"}
                                                                                                      className="w-full"
                                                                                                >
                                                                                                      <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                            Email
                                                                                                      </div>
                                                                                                </Link>
                                                                                          </li>
                                                                                          <li onClick={handleClick} className="rounded-sm hover:bg-gray-800">
                                                                                                <Link
                                                                                                      to={"/seller/media-manager"}
                                                                                                      rel="noopener noreferrer"
                                                                                                      href="#"
                                                                                                      className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                >
                                                                                                      <span>Media</span>
                                                                                                </Link>
                                                                                          </li>
                                                                                    </ul>
                                                                              )}
                                                                        </div>
                                                                  </li>
                                                            ) : null}
                                                            
                                                                        <li className="">
                                                                              <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                                                                                    <div
                                                                                          onClick={() => handleToggle(204)}
                                                                                          className="flex cursor-pointer w-full  justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                                                                                    >
                                                                                          <div className="flex cursor-pointer  gap-2">
                                                                                                <BsPersonLinesFill className="w-5 h-5 text-gray-400" />
                                                                                                <span>Users </span>
                                                                                          </div>

                                                                                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                                <IoIosArrowDown className="h-5 w-5" />
                                                                                          </span>
                                                                                    </div>

                                                                                    {openDropdownIndex == 204 && (
                                                                                          <ul className="mt-2 space-y-1 w-full px-2 border border-white border-opacity-40 py-2">
                                                                                               
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions?.find(
                                                                                                      (itm) => itm?.name === "customer"
                                                                                                ) ? (
                                                                                                <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                      <Link
                                                                                                            to={
                                                                                                                  "/seller/report-management/customer-report"
                                                                                                            }
                                                                                                            className="w-full"
                                                                                                      >
                                                                                                            <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                                  Customers
                                                                                                            </div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                                 ) : null}
                                                                                                   {!user?.staffRole ||
                                                                                                user?.permissions?.find(
                                                                                                      (itm) => itm?.name === "customer"
                                                                                                ) ? (
                                                                                                <li onClick={handleClick} className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                      <Link
                                                                                                            to={
                                                                                                                  "/seller/report-management/subscriber-report"
                                                                                                            }
                                                                                                            className="w-full"
                                                                                                      >
                                                                                                            <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                                                  Subscribers
                                                                                                            </div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          ) : null}
                                                                                                {!user?.staffRole ||
                                                                                                      user?.permissions.find(
                                                                                                            (itm) => itm?.name === "Staff Account"
                                                                                                      )
                                                                                                      ? managementPermission("Staff Account") && (
                                                                                                            <li onClick={handleClick} className="rounded-sm hover:bg-gray-800">
                                                                                                                  <Link
                                                                                                                        to={"/seller/staff-account"}
                                                                                                                        rel="noopener noreferrer"
                                                                                                                        href="#"
                                                                                                                        className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                                  >
                                                                                                                        <span>Staff</span>
                                                                                                                  </Link>
                                                                                                            </li>
                                                                                                      )
                                                                                                      : null}
                                                                                          </ul>
                                                                                    )}
                                                                              </div>
                                                                        </li>
                                                                 

                                                            {!user?.staffRole ||
                                                                  user?.permissions.find((itm) => itm?.name === "Marketing") ? (
                                                                  <>
                                                                        <li className="">
                                                                              <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                                                                                    <div
                                                                                          onClick={() => handleToggle(205)}
                                                                                          className="flex cursor-pointer w-full  justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                                                                                    >
                                                                                          <div className="flex cursor-pointer  gap-2">
                                                                                                <TfiAnnouncement className="w-5 h-5 fill-current text-gray-400" />

                                                                                                <span>Marketing </span>
                                                                                          </div>

                                                                                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                                <IoIosArrowDown className="h-5 w-5" />
                                                                                          </span>
                                                                                    </div>

                                                                                    {openDropdownIndex == 205 && (
                                                                                          <ul className="mt-2 space-y-1 w-full px-2 border border-white border-opacity-40 py-2">
                                                                                                <li onClick={handleClick} className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                      <Link
                                                                                                            to={
                                                                                                                  "/seller/content-management/campaign-management"
                                                                                                            }
                                                                                                            className="w-full"
                                                                                                      >
                                                                                                            <div className="w-full  ">Campaign</div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                                <li onClick={handleClick} className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                      <Link
                                                                                                            to={"/seller/settings/send-email"}
                                                                                                            className="w-full"
                                                                                                      >
                                                                                                            <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                                                  Email
                                                                                                            </div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          </ul>
                                                                                    )}
                                                                              </div>
                                                                        </li>
                                                                  </>
                                                            ) : null}

                                                            {/* end */}

                                                            {/* start */}
                                                            {!user?.staffRole ||
                                                                  user?.permissions.find(
                                                                        (itm) => itm?.name === "Support Tickets"
                                                                  ) ? (
                                                                  <li className="rounded-sm">
                                                                        <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                                                                              <div
                                                                                    onClick={() => handleToggle(6)}
                                                                                    className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                                                              >
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <BsHeadset className="w-5 h-5 fill-current text-gray-400" />
                                                                                          <span>Support</span>
                                                                                    </div>

                                                                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </div>

                                                                              {openDropdownIndex === 6 && (
                                                                                    <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "Support Tickets"
                                                                                                ) ? (
                                                                                                <li onClick={handleClick} className="rounded-sm  hover:bg-gray-800">
                                                                                                      <Link
                                                                                                            to={"/seller/support-tickets"}
                                                                                                            rel="noopener noreferrer"
                                                                                                            href="#"
                                                                                                            className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                      >
                                                                                                            {/* <BsTicket className="w-5 h-5 fill-current text-gray-400" /> */}

                                                                                                            <span>Support Ticket</span>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          ) : null}

                                                                                          {!user?.staffRole ||
                                                                                                user?.permissions.find(
                                                                                                      (itm) => itm?.name === "User Tickets"
                                                                                                ) ? (
                                                                                                <li onClick={handleClick} className="rounded-sm  hover:bg-gray-800">
                                                                                                      <Link
                                                                                                            to={"/seller/user-tickets"}
                                                                                                            rel="noopener noreferrer"
                                                                                                            href="#"
                                                                                                            className="flex items-center p-2 space-x-3 rounded-md"
                                                                                                      >
                                                                                                            {/* <BsTicket className="w-5 h-5 fill-current text-gray-400" /> */}

                                                                                                            <span> User Support Ticket</span>
                                                                                                      </Link>
                                                                                                </li>
                                                                                          ) : null}
                                                                                    </ul>
                                                                              )}
                                                                        </div>
                                                                  </li>
                                                            ) : null}

                                                            {/* end */}

                                                            {/* blog */}

                                                            {/* end */}

                                                            {/* service management */}

                                                            {/* stock dropdown */}

                                                            {/* edn stock dropdown */}

                                                            {!user?.staffRole ||
                                                                  user?.permissions.find((itm) => itm?.name === "Omni Chat") ? (
                                                                  <>
                                                                        <li className="">
                                                                              <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                                                                                    <div
                                                                                          onClick={() => handleToggle(203)}
                                                                                          className="flex cursor-pointer w-full  justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                                                                                    >
                                                                                          <div className="flex cursor-pointer  gap-2">
                                                                                                <RiChatSmile2Line className="w-5 h-5 fill-current text-gray-400" />

                                                                                                <span>Omni Chat </span>
                                                                                          </div>

                                                                                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                                                <IoIosArrowDown className="h-5 w-5" />
                                                                                          </span>
                                                                                    </div>

                                                                                    {openDropdownIndex == 203 && (
                                                                                          <ul className="mt-2 space-y-1 w-full px-2 border border-white border-opacity-40 py-2">
                                                                                                <li onClick={handleClick} className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                                                                                      <Link to={"#"} className="w-full">
                                                                                                            <div className="hover:text-gray-50   flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                                                                                                  Facebook
                                                                                                            </div>
                                                                                                      </Link>
                                                                                                </li>
                                                                                                <li onClick={handleClick} className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                                                                                      <Link
                                                                                                            to={"#"}
                                                                                                            className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                                                                                      >
                                                                                                            {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                                                                            Daraz
                                                                                                      </Link>
                                                                                                </li>
                                                                                          </ul>
                                                                                    )}
                                                                              </div>
                                                                        </li>
                                                                  </>
                                                            ) : null}

                                                            <li className="rounded-sm  hover:bg-gray-800">
                                                                  <button
                                                                        onClick={() => logOut()}
                                                                        className="flex items-center p-2 space-x-3 rounded-md "
                                                                  >
                                                                        <BsBoxArrowLeft className="w-5 h-5 fill-current text-gray-200" />
                                                                        <span>Logout</span>
                                                                  </button>
                                                            </li>
                                                      </ul>
                                                </div>
                                          )}

                                          {responsive && (
                                                <div className="flex-1 ">
                                                      <ul className="pt-2 pb-4 space-y-1 text-sm"></ul>
                                                </div>
                                          )}
                                    </>
                              ) : (
                                    <>
                                          <div className="mt-10 w-[400px]">
                                                <div onClick={handleClick} className="rounded-sm   hover:bg-gray-800">
                                                      <Link

                                                            to={"/seller/support-tickets"}
                                                            rel="noopener noreferrer"
                                                            href="#"
                                                            className="flex items-center p-2 space-x-3 rounded-md"
                                                      >
                                                            <span>Support Ticket</span>
                                                      </Link>
                                                </div>
                                                <div onClick={handleClick} className="rounded-sm   hover:bg-gray-800">
                                                      <Link
                                                            to={"/seller/subscription-management"}
                                                            rel="noopener noreferrer"
                                                            href="#"
                                                            className="flex items-center p-2 space-x-3 rounded-md"
                                                      >
                                                            {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                                            <span>Subscription Management</span>
                                                      </Link>
                                                </div>
                                                <div >
                                                      <button
                                                            onClick={() => logOut()}
                                                            className="flex items-center p-2 w-full  hover:bg-gray-800 space-x-3 rounded-md "
                                                      >
                                                            <BsBoxArrowLeft className="w-5 h-5 fill-current text-gray-400" />
                                                            <span>Logout</span>
                                                      </button>
                                                </div>
                                          </div>
                                    </>
                              )}
                        </div>

                        {!responsive && (
                              <div className=" bottom-5">
                                    <div className="flex items-center sticky bottom-5 p-2 mt-12 space-x-4 justify-self-end">
                                          <img
                                                loading="eager"
                                                src={shopInfo?.logo}
                                                srcSet={shopInfo?.logo}
                                                alt=""
                                                className="w-12 h-12 rounded-lg bg-gray-500"
                                          />
                                          <div className="relative">
                                                <div className="">
                                                      <h2 className="text-lg capitalize font-semibold">{user?.name}</h2>
                                                      <span className="mt-[-2px]">
                                                            <Link
                                                                  style={{ padding: '0px' }}
                                                                  to={shopInfo?.subDomain ? `//${shopInfo?.subDomain}` : `/shop/${shopInfo?.shopId}`}
                                                                  target="_blank"
                                                                  className="text-sm hover:underline text-gray-400"
                                                            >
                                                                  View Your Shop
                                                            </Link>
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default SideNavberSeller;
