import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import {
  IoCellular,
  IoLogOut,
  IoScale,
  IoSettings,
  IoShareSocialSharp,
  IoStorefront,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  MdCampaign,
  MdContactSupport,
  MdContacts,
  MdDomain,
  MdManageAccounts,
  MdMediation,
  MdOutlineAddCircleOutline,
  MdOutlineCategory,
  MdOutlineDashboardCustomize,
  MdOutlineIntegrationInstructions,
  MdOutlineLocalShipping,
  MdOutlineManageSearch,
  MdOutlinePriceChange,
  MdOutlineReviews,
  MdOutlineSecurity,
  MdPayment,
  MdPhotoSizeSelectActual,
  MdProductionQuantityLimits,
  MdReport,
  MdReportOff,
  MdSelfImprovement,
  MdWarehouse,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { ImBlog } from "react-icons/im";
import { useState } from "react";
import { FaBlog, FaPeopleGroup, FaPlaneDeparture } from "react-icons/fa6";
import { AiFillFileAdd, AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import {
  BsGear,
  BsHddRack,
  BsPostage,
  BsSubscript,
  BsTicket,
} from "react-icons/bs";
import { SiCloudflarepages, SiPagekit } from "react-icons/si";
import {
  BiArchive,
  BiArea,
  BiBookContent,
  BiCategoryAlt,
  BiEnvelope,
  BiImage,
  BiSearchAlt,
  BiShoppingBag,
  BiSlider,
  BiSolidBellRing,
  BiSolidShoppingBag,
} from "react-icons/bi";
import Daraz from "./Daraz.png";
import Logo from "../../../../../Logo.png";
import { CgAdd, CgClose, CgProductHunt } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import {
  TbCategory,
  TbExclamationMark,
  TbMenuOrder,
  TbReportAnalytics,
} from "react-icons/tb";
import { PiBrandy, PiNumberFourFill, PiWarehouseThin } from "react-icons/pi";
import { FaPage4, FaWarehouse } from "react-icons/fa";
import { GiScales, GiWoodBeam } from "react-icons/gi";

const SideNavberSeller = ({ responsive, setResponsive }) => {
  const { user, logOut, shopInfo } = useContext(AuthContext);

  const { data: prices = {}, loader } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo?._id}`
      );
      const data = await res.json();
      console.log(data?.data?.result);
      return data?.data?.result;
    },
  });

  const managementPermission = (check) => {
    return prices?.permissions?.some((itm) => itm?.name === check);
  };

  console.log(managementPermission("POS") && prices.permissions);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(false);

  const handleToggle = (idx) => {
    setOpenDropdownIndex((prevIdx) => (prevIdx === idx ? false : idx));
  };

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
                <svg
                  className="w-8 text-white"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  stroke="currentColor"
                  fill="none"
                >
                  <rect x="3" y="1" width="7" height="12" />
                  <rect x="3" y="17" width="7" height="6" />
                  <rect x="14" y="1" width="7" height="6" />
                  <rect x="14" y="11" width="7" height="12" />
                </svg>
              </button>
            ) : (
              <button onClick={() => setResponsive(true)} className="p-2">
                <CgClose />
              </button>
            )}
          </div>

          {shopInfo.status && !user.disable && prices ? (
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
                        <AiOutlineHome className="w-5 h-5 fill-current text-gray-400" />

                        <span>Dashboard</span>
                      </Link>
                    </li>

                    {/* product management */}
                    {user?.staffRole ? (
                      user?.permissions.find((itm) => itm?.name === "Blog") ? (
                        <li className="rounded-sm">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <ImBlog className="w-5 h-5 fill-current text-gray-400" />

                                <span>Product</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>


                            <ul className="mt-2 space-y-1 px-2 py-2 border border-[#80808043] w-full bg-white">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Product Management"
                                ) ? (
                                  <li className="">
                                    <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                      <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                        <div className="flex cursor-pointer items-center gap-2">
                                          {/* <CgProductHunt className="w-5 h-5 fill-current text-gray-400" /> */}
                                          <span> Management Product</span>
                                        </div>

                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                          <IoIosArrowDown className="h-5 w-5" />
                                        </span>
                                      </summary>

                                      <ul className="mt-2 space-y-1 px-4 text-control">
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/product-management/add-product"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 text-[10px] space-x-3 text-xs rounded-md"
                                          >
                                            Add Product
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/product-management/add-daraz-product"
                                            }
                                            className=" text-[15px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Add Daraz Product
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  text-[15px] rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/product-management/add-woo-product"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Woo Product
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/product-management/manage"
                                            }
                                            className=" text-gray-50 text-[15px] flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Product Management
                                          </Link>
                                        </li>
                                      </ul>
                                    </details>
                                  </li>
                                ) : null
                              ) : (
                                <li className="bg-white">
                                  <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                    <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                      <div className="flex cursor-pointer items-center gap-2">
                                        {/* <CgProductHunt className="w-5 h-5 fill-current text-gray-400" /> */}
                                        <span> Management Product</span>
                                      </div>

                                      <span className="shrink-0 transition duration-300 ">
                                        <IoIosArrowDown className="h-5 w-5" />
                                      </span>
                                    </summary>

                                    <ul className="mt-2 bg-white space-y-1 px-4 text-control">
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-product"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          <CgAdd className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                          Add Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-daraz-product"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          <CgAdd className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                          Add Daraz Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-woo-product"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          <CgAdd className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                          Woo Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/manage"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          <MdProductionQuantityLimits className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                          Product Management
                                        </Link>
                                      </li>
                                    </ul>
                                  </details>
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
                                          <TbCategory className="w-5 h-5 fill-current text-gray-400" />

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
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            {" "}
                                            Mega Category
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/sub-categories-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Sub Category
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/mini-categories-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Mini Category
                                          </Link>
                                        </li>

                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/extra-categories-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
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
                                        <TbCategory className="w-5 h-5 fill-current text-gray-400" />

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
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                        >
                                          Mega Category
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/sub-categories-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                        >
                                          Sub Category
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/mini-categories-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3text-xs  rounded-md"
                                        >
                                          Mini Category
                                        </Link>
                                      </li>

                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/extra-categories-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
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
                                  (itm) => itm?.name === "Product Management"
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
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              {/* <PiWarehouseThin className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                              Manage Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/area-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              {/* <BiArea className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                              Area Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/rack-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              {/* <BsHddRack className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                              Rack Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/self-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              {/* <MdSelfImprovement className='w-5 h-5 fill-current text-gray-400 ' />  */}
                                              Self Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/cell-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "}
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
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                          >
                                            {/* <PiWarehouseThin className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                            Manage Warehouse
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/area-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                          >
                                            {/* <BiArea className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                            Area Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/rack-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                          >
                                            {/* <BsHddRack className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                            Rack Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/self-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                          >
                                            {/* <MdSelfImprovement className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                            Self Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/cell-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                          >
                                            {/* <BiSolidBellRing className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                            Cell Management
                                          </Link>
                                        </li>
                                      </ul>
                                    </details>
                                  </li>
                                )}
                            </ul>
                          </details>
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
                              <ImBlog className="w-5 h-5 fill-current text-gray-400" />

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
                                    <ul className="mt-2 space-y-1 px-4 text-control">
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-product"
                                          }
                                          className="text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          Add Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={"/products"}
                                          className="text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          Add Doob Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-daraz-product"
                                          }
                                          className=" text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          Add Daraz Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/add-woo-product"
                                          }
                                          className="text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          Woo Product
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/product-management/manage"
                                          }
                                          className="text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                        >
                                          Product Management
                                        </Link>
                                      </li>
                                    </ul>
                                  </li>
                                ) : null
                              ) : (
                                <li className="">
                                  <ul className="flex flex-col gap-2">
                                    <li className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                      <Link
                                        to={
                                          "/seller/product-management/add-product"
                                        }
                                        className="text-[14px] text-center text-gray-50 flex gap-2 items-center px-4  space-x-3  rounded-md"
                                      >
                                        Add Product
                                      </Link>
                                    </li>
                                    <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      <Link
                                        to={"/products"}
                                        className="text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                      >
                                        Add Doob Product
                                      </Link>
                                    </li>
                                    <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      <Link
                                        to={
                                          "/seller/product-management/add-daraz-product"
                                        }
                                        className=" text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                      >
                                        Add Daraz Product
                                      </Link>
                                    </li>
                                    <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      <Link
                                        to={
                                          "/seller/product-management/add-woo-product"
                                        }
                                        className="text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                      >
                                        Woo Product
                                      </Link>
                                    </li>
                                    <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                      <Link
                                        to={
                                          "/seller/product-management/manage"
                                        }
                                        className="text-[14px] text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                      >
                                        Product Management
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
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Mega Category
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/sub-categories-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Sub Category
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/mini-categories-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Mini Category
                                          </Link>
                                        </li>

                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/categories-management/extra-categories-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
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
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/mega-categories-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                        >
                                          Mega Category
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/sub-categories-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                        >
                                          Sub Category
                                        </Link>
                                      </li>
                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/mini-categories-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                        >
                                          Mini Category
                                        </Link>
                                      </li>

                                      <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                        <Link
                                          to={
                                            "/seller/categories-management/extra-categories-management"
                                          }
                                          className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
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
                                  (itm) => itm?.name === "Product Management"
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
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                            >
                                              Manage Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/area-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                            >
                                              Area Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/rack-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                            >
                                              Rack Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/self-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                            >
                                              Self Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                            <Link
                                              to={
                                                "/seller/warehouse/cell-management"
                                              }
                                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
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
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-1 space-x-3 text-xs rounded-md"
                                          >
                                            Manage Warehouse
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/area-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Area Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/rack-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Rack Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/self-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
                                          >
                                            Self Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                          <Link
                                            to={
                                              "/seller/warehouse/cell-management"
                                            }
                                            className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 text-xs rounded-md"
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
                    )}

                    {/* end */}

                    {user?.staffRole
                      ? user?.permissions.find(
                        (itm) => itm?.name === "Order Management"
                      )
                        ? managementPermission("POS") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to={"/seller/pos"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BiArchive className="w-5 h-5 text-gray-400" />
                              <span>POS</span>
                            </Link>
                          </li>
                        )
                        : null
                      : managementPermission("POS") && (
                        <li className="rounded-sm hover:bg-gray-800">
                          <Link
                            to={"/seller/pos"}
                            rel="noopener noreferrer"
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <BiArchive className="w-5 h-5 text-gray-400" />
                            <span>POS</span>
                          </Link>
                        </li>
                      )}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Order Management"
                      ) ? (
                        <li className=" ">
                          {/* <Link to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <BiArchive className="w-5 h-5 text-gray-400" />
                                                    <span>Order Management</span>
                                                </Link> */}
                          <div className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div onClick={() => handleToggle(2)} className="flex cursor-pointer items-center gap-2">
                                <BiShoppingBag className="w-5 h-5 fill-current text-gray-400" />
                                <span>Orders</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

                            {openDropdownIndex === 2 && <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/manage-order"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  Manage Orders
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/web-store-order"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  Manage Web Orders
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/orders/manage-review"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <MdOutlineReviews className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  Manage Review
                                </Link>
                              </li>
                            </ul>}
                          </div>
                        </li>
                      ) : null
                    ) : (
                      <li className=" ">
                        {/* <Link to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <BiArchive className="w-5 h-5 text-gray-400" />
                                                    <span>Order Management</span>
                                                </Link> */}
                        <details onClick={() => handleToggle(2)} className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BiShoppingBag className="w-5 h-5 fill-current text-gray-400" />
                              <span>Orders</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          {openDropdownIndex === 2 && <ul className="mt-2 space-y-1  p-2 border border-[gray] bg-[#1b202ea1]">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/orders/manage-order"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Manage Orders
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/orders/claim-return"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Claim Return
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/orders/claim-order-list"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Claim List
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/orders/web-store-order"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Manage Web Orders
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/orders/manage-review"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdOutlineReviews className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Manage Review
                              </Link>
                            </li>
                          </ul>}
                        </details>
                      </li>
                    )}

                    {/* start */}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Manage Pages"
                      ) ? (
                        <li className="rounded-sm">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <SiCloudflarepages className="w-5 h-5 fill-current text-gray-400" />

                                <span>Pages</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-pages"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  {/* <SiPagekit className='w-5 h-5 fill-current text-gray-400' /> */}
                                  Manage Pages
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-pages/add-page"}
                                  className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  {/* <AiFillFileAdd className='w-5 h-5 fill-current text-gray-400' /> */}
                                  Add Page
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <SiCloudflarepages className="w-5 h-5 fill-current text-gray-400" />

                              <span>Pages</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/manage-pages"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <SiPagekit className='w-5 h-5 fill-current text-gray-400' /> */}
                                Manage Pages
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/manage-pages/add-page"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <AiFillFileAdd className='w-5 h-5 fill-current text-gray-400' /> */}
                                Add Page
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )}

                    {/* end */}

                    {user?.staffRole
                      ? user?.permissions.find(
                        (itm) => itm?.name === "Staff Account"
                      )
                        ? managementPermission("Staff Account") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to={"/seller/staff-account"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BiArchive className="w-5 h-5 text-gray-400" />
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
                            <BiArchive className="w-5 h-5 text-gray-400" />
                            <span>Staff Account</span>
                          </Link>
                        </li>
                      )}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Order Management"
                      ) ? (
                        <li className=" ">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <MdReport className="w-5 h-5 fill-current text-gray-400" />
                                <span>Report Management</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>
                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/packaging-cost-report"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <TbReportAnalytics className="w-5 h-5 fill-current text-gray-400 " />
                                  Commission Report
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/customer-report"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <MdReportOff className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Customer Report
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/report-management/pos-report"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <BsPostage className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Pos Report
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/report-management/sales-report"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <IoScale className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Sales Report
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/subscriber-report"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <BsSubscript className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Subscriber Report
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/user-search-report"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <BiSearchAlt className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Search Report
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/report-management/warehouse-report"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <FaWarehouse className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Warehouse Report
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className=" ">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <MdReport className="w-5 h-5 fill-current text-gray-400" />
                              <span>Report Management</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50 ">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/report-management/packaging-cost-report"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <TbReportAnalytics className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Packaging Cost Report
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/report-management/customer-report"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdReportOff className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Customer Report
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/report-management/pos-report"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <BsPostage className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Pos Report
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/report-management/sales-report"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <IoScale className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Sales Report
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/report-management/subscriber-report"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <BsSubscript className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Subscriber Report
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/report-management/user-search-report"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <BiSearchAlt className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Search Report
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/report-management/warehouse-report"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <FaWarehouse className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Warehouse Report
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )}

                    {/* start */}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Manage Pages"
                      ) ? (
                        <li className="rounded-sm">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <SiCloudflarepages className="w-5 h-5 fill-current text-gray-400" />
                                <span>Finance</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

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
                                          className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                          <BiArchive className="w-5 h-5 text-gray-400" />
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
                                          <BiArchive className="w-5 h-5 text-gray-400" />
                                          <span>Finance Report</span>
                                        </Link>
                                      </li>
                                    </>
                                  )
                                ) : null
                              ) : (
                                <>
                                  {" "}
                                  <li className="rounded-sm hover:bg-gray-800">
                                    <Link
                                      to={"/seller/subscription-management"}
                                      rel="noopener noreferrer"
                                      href="#"
                                      className="flex items-center p-2 space-x-3 rounded-md"
                                    >
                                      <BiArchive className="w-5 h-5 text-gray-400" />
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
                                      <BiArchive className="w-5 h-5 text-gray-400" />
                                      <span>Finance Report</span>
                                    </Link>
                                  </li>
                                </>
                              )}
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <SiCloudflarepages className="w-5 h-5 fill-current text-gray-400" />
                              <span>Finance</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Subscription Management"
                              ) ? (
                                managementPermission("SubscriptionModel") && (
                                  <>
                                    <li className="rounded-sm hover:bg-gray-800">
                                      <Link
                                        to={"/seller/subscription-management"}
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
                        </details>
                      </li>
                    )}

                    {/* end */}

                    {/* start */}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Manage Pages"
                      ) ? (
                        <li className="rounded-sm">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <SiCloudflarepages className="w-5 h-5 fill-current text-gray-400" />
                                <span>Support</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

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
                                    className="flex items-center p-2 space-x-3 rounded-md"
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
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <SiCloudflarepages className="w-5 h-5 fill-current text-gray-400" />
                              <span>Support</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

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
                                  className="flex items-center p-2 space-x-3 rounded-md"
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
                        </details>
                      </li>
                    )}

                    {/* end */}

                    {/* blog */}
                    {user?.staffRole ? (
                      user?.permissions.find((itm) => itm?.name === "Blog") ? (
                        <li className="rounded-sm">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <ImBlog className="w-5 h-5 fill-current text-gray-400" />

                                <span>Blog</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-blogs"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  {/* <MdOutlineManageSearch className='w-5 h-5 fill-current text-gray-400' />  Manage Blogs */}
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-blogs/add-blog"}
                                  className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  {/* <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' /> */}
                                  Add Blog
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-blogs/blog-category"}
                                  className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  {/* <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' /> */}
                                  Blog Category
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <ImBlog className="w-5 h-5 fill-current text-gray-400" />

                              <span>Blog</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/manage-blogs"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdOutlineManageSearch className='w-5 h-5 fill-current text-gray-400' /> */}
                                Manage Blogs
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/manage-blogs/add-blog"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' /> */}
                                Add Blog
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/manage-blogs/blog-category"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' /> */}
                                Blog Category
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )}

                    {/* end */}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Contact"
                      ) ? (
                        <li className="rounded-sm">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <IoShareSocialSharp className="w-5 h-5 fill-current text-gray-400" />

                                <span>Contact</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-contact"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  {/* <MdContactSupport className='w-5 h-5 fill-current text-gray-400' /> */}
                                  Contact
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-contact/add-contact"}
                                  className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  {/* <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' /> */}
                                  Add Contact
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className="rounded-sm">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <IoShareSocialSharp className="w-5 h-5 fill-current text-gray-400" />

                              <span>Contact</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/manage-contact"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdContactSupport className='w-5 h-5 fill-current text-gray-400' /> */}
                                Contact
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/manage-contact/add-contact"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdOutlineAddCircleOutline className='w-5 h-5 fill-current text-gray-400' /> */}
                                Add Contact
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Shop Profile"
                      ) ? (
                        <li className="rounded-sm  hover:bg-gray-800">
                          <Link
                            to={"/seller/shop-profile"}
                            rel="noopener noreferrer"
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <IoStorefront className="w-5 h-5 fill-current text-gray-400" />

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
                          <IoStorefront className="w-5 h-5 fill-current text-gray-400" />

                          <span>Shop Profile</span>
                        </Link>
                      </li>
                    )}

                    {user?.staffRole
                      ? user?.permissions.find(
                        (itm) => itm?.name === "Domain Management"
                      )
                        ? managementPermission("Domain Management") && (
                          <li className="rounded-sm  hover:bg-gray-800">
                            <Link
                              to={"/seller/domain-management"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <MdDomain className="w-5 h-5 fill-current text-gray-400" />
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
                            <MdDomain className="w-5 h-5 fill-current text-gray-400" />
                            <span>Domain Management</span>
                          </Link>
                        </li>
                      )}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Settings"
                      ) ? (
                        <li className=" ">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <BsGear className="w-5 h-5 fill-current text-gray-400" />

                                <span>Settings</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/settings/payment-management"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <MdContactSupport className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Payment Getaway
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/manage-contact/add-contact"}
                                  className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                                >
                                  <MdOutlineAddCircleOutline className="w-5 h-5 fill-current text-gray-400" />{" "}
                                  Add Contact
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className=" ">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsGear className="w-5 h-5 fill-current text-gray-400" />

                              <span>Settings</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/content-management/popup-management"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <FaPage4 className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Popup Management
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/content-management/slider-management"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <BiSlider className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Slider Management
                              </Link>
                            </li>

                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/content-management/feature-management"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdPhotoSizeSelectActual className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Feature Image
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/settings/payment-management"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdPayment className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Payment Getaway
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/settings/send-email"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <BiEnvelope className='w-5 h-5 fill-current text-gray-400' /> */}
                                Send Email
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/settings/shipping"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdOutlineLocalShipping className='w-5 h-5 fill-current text-gray-400' /> */}
                                Shipping
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/settings/auth-credential"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdOutlineSecurity className='w-5 h-5 fill-current text-gray-400' /> */}
                                Auth Credential
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/settings/price-role"}
                                className="  text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3 rounded-md"
                              >
                                {/* <MdOutlinePriceChange className='w-5 h-5 fill-current text-gray-400' /> */}
                                Price Role
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )}
                    {user?.staffRole
                      ? user?.permissions.find(
                        (itm) => itm?.name === "Channel Integration"
                      )
                        ? managementPermission("Channel Integration") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to={"/seller/channel-integration"}
                              rel="noopener noreferrer"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <MdOutlineIntegrationInstructions className="w-5 h-5 text-gray-400" />
                              <span>Channel Integration</span>
                            </Link>
                          </li>
                        )
                        : null
                      : managementPermission("Channel Integration") && (
                        <li className="rounded-sm hover:bg-gray-800">
                          <Link
                            to={"/seller/channel-integration"}
                            rel="noopener noreferrer"
                            className="flex items-center p-2 space-x-3 rounded-md"
                          >
                            <MdOutlineIntegrationInstructions className="w-5 h-5 text-gray-400" />
                            <span>Channel Integration</span>
                          </Link>
                        </li>
                      )}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Content Management"
                      ) ? (
                        <li className="">
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <BiImage className="w-5 h-5 fill-current text-gray-400" />

                                <span>Content Management</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/brand-management"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <PiBrandy className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  Brand Name
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/promo-code-management"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <PiNumberFourFill className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  Promo Code
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={
                                    "/seller/content-management/campaign-management"
                                  }
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <MdCampaign className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  Campaign Management
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className="">
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BiImage className="w-5 h-5 fill-current text-gray-400" />

                              <span>Content Management</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/content-management/brand-management"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <PiBrandy className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Brand Name
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/content-management/promo-code-management"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <PiNumberFourFill className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Promo Code
                              </Link>
                            </li>

                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={
                                  "/seller/content-management/campaign-management"
                                }
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdCampaign className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                Campaign Management
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )}

                    {/* service management */}
                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Service Management"
                      ) ? (
                        <li className=" ">
                          {/* <Link to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <BiArchive className="w-5 h-5 text-gray-400" />
                                                    <span>Order Management</span>
                                                </Link> */}
                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                              <div className="flex cursor-pointer items-center gap-2">
                                <BiShoppingBag className="w-5 h-5 fill-current text-gray-400" />
                                <span>My Service</span>
                              </div>

                              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <IoIosArrowDown className="h-5 w-5" />
                              </span>
                            </summary>

                            <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                                <Link
                                  to={"/seller/service/manage-service"}
                                  className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                  My Service
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      ) : null
                    ) : (
                      <li className=" ">
                        {/* <Link to={'/seller/orders'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <BiArchive className="w-5 h-5 text-gray-400" />
                                                    <span>Order Management</span>
                                                </Link> */}
                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BiShoppingBag className="w-5 h-5 fill-current text-gray-400" />
                              <span>My Service </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1   px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                              <Link
                                to={"/seller/service/manage-service"}
                                className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <MdManageAccounts className='w-5 h-5 fill-current text-gray-400 ' /> */}
                                My Service
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )}

                    <li className="rounded-sm hover:bg-gray-800">
                      <Link
                        to={`stock-management`}
                        className="flex items-center p-2 space-x-3 rounded-md gap-3"
                      >
                        <BiArchive className="w-5 h-5 text-gray-400" />
                        Stock Management
                      </Link>
                    </li>

                    <li className="rounded-sm hover:bg-gray-800">
                      <Link
                        to={`omni-chat`}
                        className="flex items-center p-2 space-x-3 rounded-md gap-3"
                      >
                        <BiArchive className="w-5 h-5 text-gray-400" />
                        Omni Chat
                      </Link>
                    </li>

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Inventory Management"
                      ) ? (
                        managementPermission("SubscriptionModel") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to={"/seller/inventory-management"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              {/* <BiArchive className="w-5 h-5 text-gray-400" /> */}
                              <span>Inventory Management</span>
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
                          className="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <BiArchive className="w-5 h-5 text-gray-400" />
                          <span>Inventory Management</span>
                        </Link>
                      </li>
                    )}

                    {user?.staffRole ? (
                      user?.permissions.find(
                        (itm) => itm?.name === "Media Manager"
                      ) ? (
                        managementPermission("SubscriptionModel") && (
                          <li className="rounded-sm hover:bg-gray-800">
                            <Link
                              to={"/seller/media-manager"}
                              rel="noopener noreferrer"
                              href="#"
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <BiArchive className="w-5 h-5 text-gray-400" />
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
                          <BiArchive className="w-5 h-5 text-gray-400" />
                          <span>Media Manager</span>
                        </Link>
                      </li>
                    )}

                    <li className="rounded-sm  hover:bg-gray-800">
                      <button
                        onClick={() => logOut()}
                        className="flex items-center p-2 space-x-3 rounded-md "
                      >
                        <IoLogOut className="w-5 h-5 fill-current text-gray-400" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              {responsive && (
                <div className="flex-1 ">
                  <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <Link
                      to={"/seller/manage-blogs"}
                      className="flex items-center  space-x-3 rounded-md"
                    >
                      <FaBlog className="w-8 h-8 fill-current text-gray-400" />
                    </Link>
                  </ul>
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
                    <BsTicket className="w-5 h-5 fill-current text-gray-400" />
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
                    <BiArchive className="w-5 h-5 text-gray-400" />
                    <span>Subscription Management</span>
                  </Link>
                </div>
                <div className="rounded-sm  hover:bg-gray-800">
                  <button
                    onClick={() => logOut()}
                    className="flex items-center p-2 space-x-3 rounded-md "
                  >
                    <IoLogOut className="w-5 h-5 fill-current text-gray-400" />
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
                      className="text-xs hover:underline text-gray-400"
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
    </div >
  );
};

export default SideNavberSeller;
