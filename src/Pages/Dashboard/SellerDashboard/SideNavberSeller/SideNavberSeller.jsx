import React, { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";

import { useState } from "react";

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
    console.log(prices, "orderInfo");
    const orderInfo = prices?.orderInfo;
    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const SEVEN_DAYS_IN_MILLISECONDS = 7 * MILLISECONDS_IN_A_DAY;

    const paymentDate = new Date(shopInfo?.paymentDate);
    const currentDate = new Date();

    const isGreaterThanSevenDays =
      currentDate.getTime() - paymentDate.getTime() <
      SEVEN_DAYS_IN_MILLISECONDS;
    return (
      prices?.result?.permissions?.some((itm) => itm?.name === check) &&
      isGreaterThanSevenDays
    );
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

  const check_expired = () => {
    const paymentDate = new Date(shopInfo.paymentDate);
    const currentDate = new Date();

    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    const SEVEN_DAYS_IN_MILLISECONDS = 7 * MILLISECONDS_IN_A_DAY;

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - paymentDate.getTime();

    // Check if the current date is within 7 days of the payment date
    const isWithinFreeTrial = timeDifference < SEVEN_DAYS_IN_MILLISECONDS;

    // Calculate remaining and passed days if `prices.orderInfo` is available
    if (!loaderPrice && prices?.orderInfo) {
      // console.log('yes')
      const remainingDays = Math.max(
        0,
        (paymentDate.getTime() +
          SEVEN_DAYS_IN_MILLISECONDS -
          currentDate.getTime()) /
        MILLISECONDS_IN_A_DAY
      );
      const passedDays = Math.floor(timeDifference / MILLISECONDS_IN_A_DAY);

      // console.log(remainingDays, "remainingDays", passedDays, "remainingDays, passedDays",remainingDays - passedDays > 0);
      return remainingDays - passedDays > 0;
    }
    // else {
    //   return isWithinFreeTrial;
    // }
  };

  const [openDropdownIndex, setOpenDropdownIndex] = useState(false);

  const handleToggle = (idx) => {
    setOpenDropdownIndex((prevIdx) => (prevIdx === idx ? false : idx));
  };

  console.log(
    `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo._id}`
  );
  console.log(check_expired(), "check_expired");
  return (
    <div className=" sticky">
      <div
        className={`${responsive
          ? "flex  h-screen  overflow-y-auto  flex-col  md:p-3 p-0 lg:w-[70px] md:w-[70px] w-0  border-r-2  "
          : "flex flex-col  p-6 md:w-64 w-[300px]  h-screen  overflow-y-auto"
          } md:relative fixed  z-[4000] bg-[#111827] top-0 left-0 bottom-0`}
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

          {shopInfo.status && !user.disable && prices && check_expired() ? (
            // status

            <>
              {!responsive && (
                <div className="flex-1 h-full ">
                  <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm  hover:bg-gray-800">
                      <Link
                        to={"/seller/dashboard"}
                        rel="noopener noreferrer"
                        href="#"
                        className="flex items-center p-2 space-x-3 rounded-md"
                      >
                        <BsColumnsGap className="w-5 h-5 fill-current text-gray-400" />

                        <span>Dashboard</span>
                      </Link>
                    </li>

                    {/* product management */}
                    {user?.staffRole ? (
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
                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Manage Product"
                                  ) ? (
                                    <li className="">
                                      <ul className="flex flex-col ">
                                        <Link
                                          to={
                                            "/seller/product-management/manage"
                                          }
                                          className="flex cursor-pointer items-center justify-between  py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                        >
                                          Products
                                        </Link>
                                        <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/product-management/add-product"
                                            }
                                          >
                                            Add Product
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link to={"/products"}>
                                            Add Doob Product
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/product-management/add-daraz-product"
                                            }
                                          >
                                            Add Daraz Product
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
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
                                  ) : null
                                ) : (
                                  <li className="">
                                    <ul className="flex flex-col ">
                                      <li>
                                        <Link
                                          to={
                                            "/seller/product-management/manage"
                                          }
                                          className="flex cursor-pointer items-center justify-between  py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                        >
                                          Products
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-product"
                                          }
                                        >
                                          Add Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link to={"/products"}>
                                          Add Doob Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-daraz-product"
                                          }
                                        >
                                          Add Daraz Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-woo-product"
                                          }
                                        >
                                          Woo Product...
                                        </Link>
                                      </li>
                                    </ul>
                                  </li>
                                )}

                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Category Management"
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

                                        <ul className="mt-2 space-y-1 px-4 text-control">
                                          <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/categories-management/mega-categories-management"
                                              }
                                              className="w-full"
                                            >
                                              Mega Category
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/categories-management/sub-categories-management"
                                              }
                                              className="w-full"
                                            >
                                              Sub Category
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/categories-management/mini-categories-management"
                                              }
                                              className="w-full"
                                            >
                                              Mini Category
                                            </Link>
                                          </li>

                                          <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
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
                                  ) : null
                                ) : (
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

                                      <ul className="mt-2 space-y-1 px-4 text-control">
                                        <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/mega-categories-management"
                                            }
                                            className="w-full"
                                          >
                                            Mega Category ***
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/sub-categories-management"
                                            }
                                            className="w-full"
                                          >
                                            Sub Category
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/mini-categories-management"
                                            }
                                            className="w-full"
                                          >
                                            Mini Category
                                          </Link>
                                        </li>

                                        <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
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
                                )}

                                {user?.staffRole
                                  ? user?.permissions.find(
                                    (itm) => itm?.name === "Warehouse"
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

                                          <ul className="mt-2 space-y-1 px-4 text-control">
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                              <Link
                                                to={
                                                  "/seller/warehouse/warehouse-management"
                                                }
                                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md"
                                              >
                                                Manage Warehouse
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                              <Link
                                                to={
                                                  "/seller/warehouse/area-management"
                                                }
                                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md"
                                              >
                                                Area Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                              <Link
                                                to={
                                                  "/seller/warehouse/rack-management"
                                                }
                                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md"
                                              >
                                                Rack Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                              <Link
                                                to={
                                                  "/seller/warehouse/self-management"
                                                }
                                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md"
                                              >
                                                Self Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                              <Link
                                                to={
                                                  "/seller/warehouse/cell-management"
                                                }
                                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md"
                                              >
                                                Cell Management
                                              </Link>
                                            </li>
                                          </ul>
                                        </details>
                                      </li>
                                    )
                                    : null
                                  : managementPermission("Warehouse") && (
                                    <li className="bg-[#1b202ea1]">
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                        <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          <div className="flex cursor-pointer items-center gap-2">
                                            {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                            <span>Warehouse</span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>

                                        <ul className="mt-2 space-y-1 px-4 text-control">
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/warehouse-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-1 space-x-3 text-sm rounded-md"
                                            >
                                              Manage Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/area-management"
                                              }
                                              className="w-full"
                                            >
                                              Area Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/rack-management"
                                              }
                                              className="w-full"
                                            >
                                              Rack Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/self-management"
                                              }
                                              className="w-full"
                                            >
                                              Self Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/cell-management"
                                              }
                                              className="w-full"
                                            >
                                              Cell Management
                                            </Link>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )}
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
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
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Product Management"
                                ) ? (
                                  <li className="">
                                    <ul className="flex flex-col ">
                                      <li>
                                        <Link
                                          className="flex cursor-pointer items-center justify-between  py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                          to={
                                            "/seller/product-management/manage"
                                          }
                                        >
                                          Products
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to={
                                            "/seller/product-management/add-product"
                                          }
                                          className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                        >
                                          Add Product
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="w-full"
                                          to={"/products"}
                                        >
                                          <div className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                            Add Doob Product
                                          </div>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="w-full"
                                          to={
                                            "/seller/product-management/add-daraz-product"
                                          }
                                        >
                                          <div className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                            Add Daraz Product
                                          </div>
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          className="w-full"
                                          to={
                                            "/seller/product-management/add-woo-product"
                                          }
                                        >
                                          <div className="flex cursor-pointer !h-[30px] items-center justify-between px-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                            Woo Product
                                          </div>
                                        </Link>
                                      </li>
                                    </ul>
                                  </li>
                                ) : null
                              ) : (
                                <li className="">
                                  <ul className="flex flex-col ">
                                    <li>
                                      <Link
                                        className="flex cursor-pointer items-center justify-between  py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                        to={"/seller/product-management/manage"}
                                      >
                                        Products
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to={
                                          "/seller/product-management/add-product"
                                        }
                                        className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                                      >
                                        Add Product
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="w-full" to={"/products"}>
                                        <div className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          Add Doob Product
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="w-full"
                                        to={
                                          "/seller/product-management/add-daraz-product"
                                        }
                                      >
                                        <div className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          Add Daraz Product
                                        </div>
                                      </Link>
                                    </li>
                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                      <Link
                                        className="w-full"
                                        to={
                                          "/seller/product-management/add-woo-product"
                                        }
                                      >
                                        <div className="flex cursor-pointer !h-[30px] items-center justify-between px-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                          Woo Product
                                        </div>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              )}

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Category"
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

                                      <ul className="mt-2 space-y-1 px-4 text-control">
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/mega-categories-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Mega Category
                                            </div>
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/sub-categories-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Sub Category
                                            </div>
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/mini-categories-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Mini Category
                                            </div>
                                          </Link>
                                        </li>

                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/extra-categories-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Extra Category
                                            </div>
                                          </Link>
                                        </li>
                                      </ul>
                                    </details>
                                  </li>
                                ) : null
                              ) : (
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

                                    <ul className="mt-2 space-y-2 px-4 text-control">
                                      <li className="flex cursor-pointer items-center justify-between  px-2 py-2  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/mega-categories-management"
                                          }
                                          className="w-full"
                                        >
                                          <div className="py-3">
                                            Mega Category
                                          </div>
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/sub-categories-management"
                                          }
                                          className="w-full"
                                        >
                                          <div className="text-gray-50 flex gap-2 items-center px-2 py-2 space-x-3 text-sm rounded-md">
                                            Sub Category
                                          </div>
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/mini-categories-management"
                                          }
                                          className="w-full"
                                        >
                                          <div className="text-gray-50 flex gap-2 items-center px-2 py-2 space-x-3 text-sm rounded-md">
                                            Mini Category
                                          </div>
                                        </Link>
                                      </li>

                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/extra-categories-management"
                                          }
                                          className="w-full"
                                        >
                                          <div className="text-gray-50 flex gap-2 items-center px-2 py-2 space-x-3 text-sm rounded-md">
                                            Extra Category
                                          </div>
                                        </Link>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                              )}

                              {user?.staffRole
                                ? user?.permissions.find(
                                  (itm) => itm?.name === "Warehouse"
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

                                        <ul className="mt-2 space-y-1 px-4 text-control">
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/warehouse-management"
                                              }
                                              className="w-full"
                                            >
                                              <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                                Manage Warehouse
                                              </div>
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/area-management"
                                              }
                                              className="w-full"
                                            >
                                              <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                                Area Management
                                              </div>
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/rack-management"
                                              }
                                              className="w-full"
                                            >
                                              <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                                Rack Management
                                              </div>
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/self-management"
                                              }
                                              className="w-full"
                                            >
                                              <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                                Self Management
                                              </div>
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/cell-management"
                                              }
                                              className="w-full"
                                            >
                                              <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                                Cell Management
                                              </div>
                                            </Link>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )
                                  : null
                                : managementPermission("Warehouse") && (
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

                                      <ul className="mt-2 space-y-2 px-4 text-control">
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/warehouse-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex text-nowrap whitespace-nowrap gap-2 items-center px-4 py-2 space-x-3 text-sm rounded-md">
                                              Manage Warehouse
                                            </div>
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/area-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Area Management
                                            </div>
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/rack-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Rack Management
                                            </div>
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/self-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Self Management
                                            </div>
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/cell-management"
                                            }
                                            className="w-full"
                                          >
                                            <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                              Cell Management
                                            </div>
                                          </Link>
                                        </li>
                                      </ul>
                                    </details>
                                  </li>
                                )}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* end */}

                    {user?.staffRole
                      ? user?.permissions?.find((itm) => itm?.name === "Pos")
                        ? managementPermission("POS") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to="/seller/pos"
                              rel="noopener noreferrer"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BsPrinter className="w-5 h-5 text-gray-400" />
                              <span>POS</span>
                            </Link>
                          </li>
                        )
                        : null
                      : managementPermission("POS") && (
                        <li className="rounded-sm hover:bg-gray-800">
                          <Link
                            to="/seller/pos"
                            rel="noopener noreferrer"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <BsPrinter className="w-5 h-5 text-gray-400" />
                            <span>POS</span>
                          </Link>
                        </li>
                      )}

                    {user?.staffRole ? (
                      user?.permissions.find((itm) => itm?.name === "Faq") ? (
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
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/orders/manage-order"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Manage Orders
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/orders/claim-return"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Claim Return
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/orders/claim-order-list"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Claim List
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/orders/web-store-order"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Manage Web Orders
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/orders/manage-review"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Manage Review
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
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
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/manage-order"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Manage Orders
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/claim-return"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Claim Return
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/claim-order-list"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Claim List
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/web-store-order"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Manage Web Orders
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/manage-review"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Manage Review
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* start */}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Page Management"
                      ) ? (
                        <li className="rounded-sm">
                          <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                            <div
                              onClick={() => handleToggle(3)}
                              className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                            >
                              <div className="flex cursor-pointer items-center gap-2">
                                <BsCalendar2Range className="w-5 h-5 fill-current text-gray-400" />

                                <span>Pages</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </div>
                            {openDropdownIndex === 3 && (
                              <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/manage-pages"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Manage Pages
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/manage-pages/add-page"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Add Page
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(3)}
                            className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsCalendar2Range className="w-5 h-5 fill-current text-gray-400" />

                              <span>Pages</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>
                          {openDropdownIndex === 3 && (
                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-pages"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Manage Pages
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-pages/add-page"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Add Page
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* end */}

                    {user?.staffRole
                      ? user?.permissions.find(
                        (itm) => itm?.name === "Staff Management"
                      )
                        ? managementPermission("Staff Account") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to={"/seller/staff-account"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BsPersonLinesFill className="w-5 h-5 text-gray-400" />
                              <span>Staff Account</span>
                            </Link>
                          </li>
                        )
                        : null
                      : managementPermission("Staff Account") && (
                        <li className="rounded-sm hover:bg-gray-800">
                          <Link
                            to={"/seller/staff-account"}
                            rel="noopener noreferrer"
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <BsPersonLinesFill className="w-5 h-5 text-gray-400" />
                            <span>Staff Account</span>
                          </Link>
                        </li>
                      )}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Content Management"
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
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/report-management/packaging-cost-report"
                                    }
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Processing Fee Report
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/report-management/customer-report"
                                    }
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Customer Report
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/report-management/pos-report"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Pos Report
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/report-management/sales-report"
                                    }
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Sales Report
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/report-management/subscriber-report"
                                    }
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Subscriber Report
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/report-management/user-search-report"
                                    }
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Search Report
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/report-management/warehouse-report"
                                    }
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Warehouse Report
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
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
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/packaging-cost-report"
                                  }
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Processing Fee Report
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/customer-report"
                                  }
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Customer Report
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/report-management/pos-report"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Pos Report
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/report-management/sales-report"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Sales Report
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/subscriber-report"
                                  }
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Subscriber Report
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/user-search-report"
                                  }
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Search Report
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/warehouse-report"
                                  }
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Warehouse Report
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* start */}
                    {user?.staffRole ? (
                      user?.permissions.find((itm) => itm?.name === "Faq") ? (
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
                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) =>
                                      itm?.name === "Subscription Management"
                                  ) ? (
                                    managementPermission(
                                      "SubscriptionModel"
                                    ) && (
                                      <>
                                        <li className="rounded-sm hover:bg-gray-800">
                                          <Link
                                            to={
                                              "/seller/subscription-management"
                                            }
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                          >
                                            {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                            <span>Subscription</span>
                                          </Link>
                                        </li>
                                        <li className="rounded-sm hover:bg-gray-800">
                                          <Link
                                            to={"/seller/finance"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                          >
                                            {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                            <span>Finance Report</span>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  ) : null
                                ) : (
                                  <>
                                    <li className="rounded-sm hover:bg-gray-800">
                                      <Link
                                        to={"/seller/subscription-management"}
                                        rel="noopener noreferrer"
                                        href="#"
                                        className="flex items-center p-2 space-x-3 rounded-md"
                                      >
                                        {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                        <span>Subscription </span>
                                      </Link>
                                    </li>
                                    <li className="rounded-sm hover:bg-gray-800">
                                      <Link
                                        to={"/seller/finance"}
                                        rel="noopener noreferrer"
                                        href="#"
                                        className="flex items-center p-2 space-x-3 rounded-md"
                                      >
                                        {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                        <span>Finance Report </span>
                                      </Link>
                                    </li>
                                    <li className="rounded-sm hover:bg-gray-800">
                                      <Link
                                        to={"/seller/withdraw"}
                                        rel="noopener noreferrer"
                                        href="#"
                                        className="flex items-center p-2 space-x-3 rounded-md"
                                      >
                                        {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                        <span>Withdraw </span>
                                      </Link>
                                    </li>
                                  </>
                                )}
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
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
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) =>
                                    itm?.name === "Subscription Management"
                                ) ? (
                                  managementPermission("SubscriptionModel") && (
                                    <>
                                      <li className="rounded-sm hover:bg-gray-800">
                                        <Link
                                          to={"/seller/subscription-management"}
                                          rel="noopener noreferrer"
                                          href="#"
                                          className="flex items-center p-2 space-x-3 text-sm rounded-md"
                                        >
                                          {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                          <span>Subscription</span>
                                        </Link>
                                      </li>
                                      <li className="rounded-sm hover:bg-gray-800">
                                        <Link
                                          to={"/seller/finance"}
                                          rel="noopener noreferrer"
                                          href="#"
                                          className="flex items-center p-2 space-x-3 text-sm rounded-md"
                                        >
                                          {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                          <span>Finance Report</span>
                                        </Link>
                                      </li>
                                    </>
                                  )
                                ) : null
                              ) : (
                                <>
                                  <li className="rounded-sm hover:bg-gray-800">
                                    <Link
                                      to={"/seller/subscription-management"}
                                      rel="noopener noreferrer"
                                      href="#"
                                      className="flex items-center p-2 space-x-3 text-sm rounded-md"
                                    >
                                      {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                      <span>Subscription</span>
                                    </Link>
                                  </li>
                                  <li className="rounded-sm hover:bg-gray-800">
                                    <Link
                                      to={"/seller/finance"}
                                      rel="noopener noreferrer"
                                      href="#"
                                      className="flex items-center p-2 text-sm space-x-3 rounded-md"
                                    >
                                      {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                      <span>Finance Report </span>
                                    </Link>
                                  </li>
                                  <li className="rounded-sm hover:bg-gray-800">
                                    <Link
                                      to={"/seller/withdraw"}
                                      rel="noopener noreferrer"
                                      href="#"
                                      className="flex items-center p-2 text-sm space-x-3 rounded-md"
                                    >
                                      {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                      <span>Withdraw </span>
                                    </Link>
                                  </li>
                                </>
                              )}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* end */}

                    {/* start */}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Support Ticket"
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
                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Support Tickets"
                                  ) ? (
                                    <li className="rounded-sm  hover:bg-gray-800">
                                      <Link
                                        to={"/seller/support-tickets"}
                                        rel="noopener noreferrer"
                                        href="#"
                                        className="flex items-center p-2 space-x-3 rounded-md"
                                      >
                                        {/* <BsTicket className="w-5 h-5 fill-current text-gray-400" /> */}

                                        <span>Support Ticket***</span>
                                      </Link>
                                    </li>
                                  ) : null
                                ) : (
                                  <li className="rounded-sm  hover:bg-gray-800">
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
                                )}

                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "User Tickets"
                                  ) ? (
                                    <li className="rounded-sm  hover:bg-gray-800">
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
                                  ) : null
                                ) : (
                                  <li className="rounded-sm  hover:bg-gray-800">
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
                                )}
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
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
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Support Ticket"
                                ) ? (
                                  <li className="rounded-sm  hover:bg-gray-800">
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
                                ) : null
                              ) : (
                                <li className="rounded-sm  hover:bg-gray-800">
                                  <Link
                                    to={"/seller/support-tickets"}
                                    rel="noopener noreferrer"
                                    href="#"
                                    className="flex items-center p-2 space-x-3 text-sm rounded-md"
                                  >
                                    {/* <BsTicket className="w-5 h-5 fill-current text-gray-400" /> */}

                                    <span>Support Ticket</span>
                                  </Link>
                                </li>
                              )}

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "User Support Ticket"
                                ) ? (
                                  <li className="rounded-sm  hover:bg-gray-800">
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
                                ) : null
                              ) : (
                                <li className="rounded-sm  hover:bg-gray-800">
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
                              )}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* end */}

                    {/* blog */}
                    {user?.staffRole ? (
                      user?.permissions.find((itm) => itm?.name === "Blogs") ? (
                        <li className="rounded-sm">
                          <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                            <div
                              onClick={() => handleToggle(7)}
                              className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                            >
                              <div className="flex cursor-pointer items-center gap-2">
                                <BsFillBootstrapFill className="w-5 h-5 fill-current text-gray-400" />
                                <span>Blog</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </div>

                            {openDropdownIndex === 7 && (
                              <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/manage-blogs"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Manage Blogs
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/manage-blogs/add-blog"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Add Blog
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/manage-blogs/blog-category"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Blog Category
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(7)}
                            className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsFillBootstrapFill className="w-5 h-5 fill-current text-gray-400" />
                              <span>Blog</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex === 7 && (
                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-blogs"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Manage Blogs
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-blogs/add-blog"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Add Blog
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-blogs/blog-category"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Blog Category
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* end */}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Contact"
                      ) ? (
                        <li className="rounded-sm">
                          <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                            <div
                              onClick={() => handleToggle(8)}
                              className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                            >
                              <div className="flex cursor-pointer items-center gap-2">
                                <BsFillJournalBookmarkFill className="w-5 h-5 fill-current text-gray-400" />

                                <span>Contact</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </div>

                            {openDropdownIndex === 8 && (
                              <ul className="mt-2 space-y-1  px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/manage-contact"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Contact
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/manage-contact/add-contact"}
                                    className="w-full"
                                  >
                                    <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                      Add Contact
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(8)}
                            className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsFillJournalBookmarkFill className="w-5 h-5 fill-current text-gray-400" />

                              <span>Contact</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex === 8 && (
                            <ul className="mt-2 space-y-1  px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-contact"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Contact
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-contact/add-contact"}
                                  className="w-full"
                                >
                                  <div className="text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-sm rounded-md">
                                    Add Contact
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {user?.staffRole ? (
                      user?.permissions.find((itm) => itm?.name === "Faq") ? (
                        <li className="rounded-sm  hover:bg-gray-800">
                          <Link
                            to={"/seller/shop-profile"}
                            rel="noopener noreferrer"
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <BsShop className="w-5 h-5 fill-current text-gray-400" />

                            <span>Shop Profile</span>
                          </Link>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm  hover:bg-gray-800">
                        <Link
                          to={"/seller/shop-profile"}
                          rel="noopener noreferrer"
                          href="#"
                          className="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <BsShop className="w-5 h-5 fill-current text-gray-400" />

                          <span>Shop Profile</span>
                        </Link>
                      </li>
                    )}

                    {user?.staffRole
                      ? user?.permissions.find((itm) => itm?.name === "Faq")
                        ? managementPermission("Domain Management") && (
                          <li className="rounded-sm  hover:bg-gray-800">
                            <Link
                              to={"/seller/domain-management"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BsGlobe className="w-5 h-5 fill-current text-gray-400" />
                              <span>Domain Management</span>
                            </Link>
                          </li>
                        )
                        : null
                      : managementPermission("Domain Management") && (
                        <li className="rounded-sm  hover:bg-gray-800">
                          <Link
                            to={"/seller/domain-management"}
                            rel="noopener noreferrer"
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <BsGlobe className="w-5 h-5 fill-current text-gray-400" />
                            <span>Domain Management</span>
                          </Link>
                        </li>
                      )}
                    {user?.staffRole ? (
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
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/content-management/frame"}
                                    className="w-full"
                                  >
                                    <div className="flex p-2 cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Frame Management
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/content-management/popup-management"
                                    }
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Popup Management
                                    </div>
                                  </Link>
                                </li>

                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/content-management/slider-management"
                                    }
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Slider Management
                                    </div>
                                  </Link>
                                </li>

                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/content-management/feature-management"
                                    }
                                    className="w-full"
                                  >
                                    {/* <MdPhotoSizeSelectActual className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      {" "}
                                      Feature Image
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/settings/payment-management"}
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Payment Getaway
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/settings/pos-payment-management"
                                    }
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Pos Payment Getaway
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/settings/send-email"}
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Send Email
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/settings/shipping"}
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Shipping
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/settings/auth-credential"}
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Auth Credential
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/settings/email-setup"}
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Email Setup
                                    </div>
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/settings/price-role"}
                                    className="w-full"
                                  >
                                    <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      Price Role
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
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
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/content-management/frame"}
                                  className="w-full"
                                >
                                  <div className="flex p-2 cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Frame Management
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/popup-management"
                                  }
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Popup Management
                                  </div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/slider-management"
                                  }
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Slider Management
                                  </div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/feature-management"
                                  }
                                  className="w-full"
                                >
                                  {/* <MdPhotoSizeSelectActual className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    {" "}
                                    Feature Image
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/payment-management"}
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Payment Getaway
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/pos-payment-management"}
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Pos Payment Getaway
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/send-email"}
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Send Email
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/shipping"}
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Shipping
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/auth-credential"}
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Auth Credential
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/email-setup"}
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Email Setup
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center p-2 justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/price-role"}
                                  className="w-full"
                                >
                                  <div className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                    Price Role
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {user?.staffRole ? (
                      user?.permissions?.find((itm) => itm?.name === "Faq") ? (
                        <li>
                          <div className="group items-center rounded-sm">
                            <Link
                              to="/seller/channel-integration"
                              rel="noopener noreferrer"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BsHddNetworkFill className="w-5 h-5 text-gray-400" />
                              <span>Channel Integration</span>
                            </Link>
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <li>
                        <div className="group items-center rounded-sm">
                          <Link
                            to="/seller/channel-integration"
                            rel="noopener noreferrer"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <BsHddNetworkFill className="w-5 h-5 text-gray-400" />
                            <span>Channel Integration</span>
                          </Link>
                        </div>
                      </li>
                    )}

                    {user?.staffRole ? (
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

                                <span>Content Management</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </div>

                            {openDropdownIndex === 10 && (
                              <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/content-management/brand-management"
                                    }
                                    className="w-full"
                                  >
                                    <div className=" "></div>
                                    Brand Name
                                  </Link>
                                </li>
                                <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/content-management/promo-code-management"
                                    }
                                    className="w-full"
                                  >
                                    <div className="w-full  ">Promo Code</div>
                                  </Link>
                                </li>

                                <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={
                                      "/seller/content-management/campaign-management"
                                    }
                                    className="w-full"
                                  >
                                    <div className="w-full  ">
                                      Campaign Management
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <li className="">
                        <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(10)}
                            className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsWindowPlus className="w-5 h-5 fill-current text-gray-400" />

                              <span>Content Management</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex === 10 && (
                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/brand-management"
                                  }
                                  className="w-full"
                                >
                                  <div className=" "></div>
                                  Brand Name
                                </Link>
                              </li>
                              <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/promo-code-management"
                                  }
                                  className="w-full"
                                >
                                  <div className="w-full  ">Promo Code</div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/campaign-management"
                                  }
                                  className="w-full"
                                >
                                  <div className="w-full  ">
                                    Campaign Management
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}

                    {/* service management */}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Services"
                      ) ? (
                        <li className=" ">
                          {/* <Link to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <BiArchive className="w-5 h-5 text-gray-400" />
                                                    <span>Order Management</span>
                                                </Link> */}
                          <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                            <div className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div
                                onClick={() => handleToggle(11)}
                                className="flex cursor-pointer items-center gap-2"
                              >
                                <BsLifePreserver className="w-5 h-5 fill-current text-gray-400" />
                                <span>My Service</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </div>
                            {openDropdownIndex === 11 && (
                              <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={"/seller/service/manage-service"}
                                    className="w-full"
                                  >
                                    <div className="w-full hover:bg-[#1b202ea1]">
                                      My Service
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <div className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm  ">
                        <div className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                          <div
                            onClick={() => handleToggle(11)}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <BsLifePreserver className="w-5 h-5 fill-current text-gray-400" />
                            <span>My Service</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>
                        {openDropdownIndex === 11 && (
                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/service/manage-service"}
                                className="w-full"
                              >
                                <div className=" ">My Service</div>
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    )}

                    {/* stock dropdown */}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Services"
                      ) ? (
                        <li className=" ">
                          <div className="group  items-center rounded-sm  ">
                            <div
                              onClick={() => handleToggle(12)}
                              className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                            >
                              <div className="flex cursor-pointer items-center gap-2">
                                <BsBoxSeam className="w-5 h-5 fill-current text-gray-400" />
                                <span>Stock Management</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </div>
                            {openDropdownIndex === 12 && (
                              <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                  <Link
                                    to={`stock-management`}
                                    className="w-full"
                                  >
                                    <div className="w-full px-3 ">Stock</div>
                                  </Link>
                                </li>

                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) =>
                                      itm?.name === "Inventory Management"
                                  ) ? (
                                    managementPermission(
                                      "SubscriptionModel"
                                    ) && (
                                      <li className="rounded-sm p-2">
                                        <Link
                                          to={"/seller/inventory-management"}
                                          rel="noopener noreferrer"
                                          href="#"
                                          className="w-full"
                                        >
                                          {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                          <div className="w-full px-5 py-2 ">
                                            Inventory Management
                                          </div>
                                        </Link>
                                      </li>
                                    )
                                  ) : null
                                ) : (
                                  <li className="rounded-sm hover:bg-gray-800">
                                    <Link
                                      to={"/seller/inventory-management"}
                                      rel="noopener noreferrer"
                                      href="#"
                                      className="w-full"
                                    >
                                      {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                      <div className="w-full px-5 py-2 ">
                                        Inventory Management
                                      </div>
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <li className=" ">
                        <div className="group  items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(12)}
                            className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsBoxSeam className="w-5 h-5 fill-current text-gray-400" />
                              <span>Stock Management</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>
                          {openDropdownIndex === 12 && (
                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer p-2 items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={`stock-management`}
                                  className="w-full"
                                >
                                  <div className="w-full px-3 ">Stock</div>
                                </Link>
                              </li>

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Inventory Management"
                                ) ? (
                                  managementPermission("SubscriptionModel") && (
                                    <li className="rounded-sm p-2">
                                      <Link
                                        to={"/seller/inventory-management"}
                                        rel="noopener noreferrer"
                                        href="#"
                                        className="w-full"
                                      >
                                        {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                        <div className="w-full px-5 py-2 ">
                                          Inventory Management
                                        </div>
                                      </Link>
                                    </li>
                                  )
                                ) : null
                              ) : (
                                <li className="rounded-sm hover:bg-gray-800">
                                  <Link
                                    to={"/seller/inventory-management"}
                                    rel="noopener noreferrer"
                                    href="#"
                                    className="w-full"
                                  >
                                    {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                                    <div className="w-full px-5 py-2 ">
                                      Inventory Management
                                    </div>
                                  </Link>
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                    {/* edn stock dropdown */}

                    <li className="rounded-sm hover:bg-gray-800">
                      <Link
                        to={`omni-chat`}
                        className="flex items-center p-2 space-x-3 rounded-md gap-3"
                      >
                        <BsChatSquareText className="w-5 h-5 text-gray-400" />
                        Omni Chat
                      </Link>
                    </li>

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Content Management"
                      ) ? (
                        managementPermission("SubscriptionModel") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to={"/seller/media-manager"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BsFillImageFill className="w-5 h-5 text-gray-400" />
                              <span>Media Manager</span>
                            </Link>
                          </li>
                        )
                      ) : null
                    ) : (
                      <li className="rounded-sm hover:bg-gray-800">
                        <Link
                          to={"/seller/media-manager"}
                          rel="noopener noreferrer"
                          href="#"
                          className="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <BsFillImageFill className="w-5 h-5 text-gray-400" />
                          <span>Media Manager</span>
                        </Link>
                      </li>
                    )}

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
              <div className="mt-10">
                <div className="rounded-sm   hover:bg-gray-800">
                  <Link
                    to={"/seller/support-tickets"}
                    rel="noopener noreferrer"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <BsHeadset className="w-5 h-5 fill-current text-gray-400" />
                    <span>Support Ticket</span>
                  </Link>
                </div>
                <div className="rounded-sm   hover:bg-gray-800">
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
                <div>
                  <button
                    onClick={() => logOut()}
                    className="flex items-center p-2   hover:bg-gray-800 space-x-3 rounded-md "
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
                src={shopInfo.logo}
                srcSet={shopInfo.logo}
                alt=""
                className="w-12 h-12 rounded-lg bg-gray-500"
              />
              <div className="relative">
                <div className="">
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <span className="flex items-center space-x-1">
                    <Link
                      to={`/shop/${shopInfo?.shopId}`}
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
