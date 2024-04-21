import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import {
  BiArea,
  BiCategory,
  BiHistory,
  BiHomeAlt,
  BiShoppingBag,
  BiSlider,
  BiSolidBellRing,
  BiSolidReport,
  BiSolidShoppingBags,
} from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaBlogger,
  FaPeopleGroup,
  FaSalesforce,
  FaStore,
  FaUsersGear,
  FaWarehouse,
} from "react-icons/fa6";
import {
  MdAnnouncement,
  MdEmail,
  MdOutlineAdminPanelSettings,
  MdOutlineContentPaste,
  MdOutlineRoomPreferences,
  MdOutlineSubscriptions,
  MdPayment,
  MdReport,
  MdSelfImprovement,
  MdSettings,
  MdSystemSecurityUpdate,
  MdWarehouse,
} from "react-icons/md";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2";
import { SiGoogledomains } from "react-icons/si";
import { FaRegUserCircle, FaShippingFast } from "react-icons/fa";
import {
  AiFillCustomerService,
  AiOutlineAlert,
  AiOutlineClose,
} from "react-icons/ai";
import {
  BsChatLeftQuote,
  BsHddRack,
  BsSubscript,
  BsTicketDetailed,
} from "react-icons/bs";
import { GiEarbuds, GiNotebook } from "react-icons/gi";
import { IoLogOut, IoNotificationsCircle, IoSettings } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../../Logo.png";
import { TbCategory } from "react-icons/tb";
import { IoIosArrowDown, IoMdPhotos } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { GrDomain } from "react-icons/gr";
import { PiWarehouseThin } from "react-icons/pi";
import { VscFileMedia } from "react-icons/vsc";
const SideNavAdmin = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menu, setMenu] = useState(true);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(false);

  const handleToggle = (idx) => {
    setOpenDropdownIndex((prevIdx) => (prevIdx === idx ? false : idx));
  };

  return (
    <div className="py-6 bg-red ">
      <button
        onClick={() => setMenu(!menu)}
        className={`absolute bg-gray-900 right-[-10px] w-[25px] h-[25px] flex items-center justify-center rounded-full text-white top-20 z-[1000]`}
      >
        {menu ? <FaAngleLeft /> : <FaAngleRight />}
      </button>
      <div
        className={
          menu
            ? "flex flex-col h-screen py-2 duration-300  px-2 w-60 text-gray-900 overflow-y-auto transparent-scroll relative"
            : "flex  flex-col h-screen py-3 duration-300 px-2 w-14 text-gray-900 overflow-y-auto transparent-scroll relative"
        }
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {menu ? (
              <Link
                to="/"
                aria-label="Company"
                title="Company"
                className="inline-flex items-center"
              >
                <img className="w-32" src={Logo} srcSet={Logo} alt="" />
              </Link>
            ) : (
              <Link
                to="/"
                aria-label="Company"
                title="Company"
                className="inline-flex items-center"
              >
                <svg
                  className="w-8 text-black"
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
              </Link>
            )}
            {/* {!menu ? (
              <button className="p-2">
                <HiOutlineMenu
                  onClick={() => setMenu(true)}
                  className="w-5 h-5 fill-current text-gray-900"
                />
              </button>
            ) : (
              <button className="p-2">
                <AiOutlineClose
                  onClick={() => setMenu(false)}
                  className="w-5 h-5 fill-current text-gray-900"
                />
              </button>
            )} */}
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <NavLink
                onMouseMove={() => setMenu(true)}
                rel="noopener noreferrer"
                to="/admin/dashboard"
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <BiHomeAlt className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Home</span>}
              </NavLink>

              {/* product */}

              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Faq") ? (
                  <>
                    {menu && (
                      <li
                        onMouseMove={() => setMenu(true)}
                        className="relative"
                      >
                        <div className="group w-full [&_summary::-webkit-details-marker]:hidden flex flex-col items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(1)}
                            className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                              <span>Products</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 1 && (
                            <ul className="mt-2 space-y-1 px-4">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to="/admin/manage-product"
                                  className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <TbCategory className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Manage Product
                                </Link>
                              </li>

                              <li className="">
                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Faq"
                                  ) ? (
                                    <>
                                      {menu && (
                                        <li
                                          onMouseMove={() => setMenu(true)}
                                          className="relative"
                                        >
                                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                            <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                                              <div className="flex cursor-pointer items-center gap-2">
                                                <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                                                <span>Category...</span>
                                              </div>

                                              <span className="shrink-0 transition duration-300 ">
                                                <FaAngleDown className="h-4 w-4 " />
                                              </span>
                                            </summary>

                                            <ul className=" space-y-1 bg-gray-100 p-2">
                                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                <Link
                                                  to={
                                                    "/admin/category-management/mega-category-management"
                                                  }
                                                  className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                                >
                                                  <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                                  Mega Category
                                                </Link>
                                              </li>
                                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                <Link
                                                  to={
                                                    "/admin/category-management/sub-category-management"
                                                  }
                                                  className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                                >
                                                  <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                                  Sub Category
                                                </Link>
                                              </li>
                                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                <Link
                                                  to={
                                                    "/admin/category-management/mini-category-management"
                                                  }
                                                  className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                                >
                                                  <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                                  Mini Category
                                                </Link>
                                              </li>

                                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                <Link
                                                  to={
                                                    "/admin/category-management/extra-category-management"
                                                  }
                                                  className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                                >
                                                  <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                                  Extra Category
                                                </Link>
                                              </li>
                                            </ul>
                                          </details>
                                        </li>
                                      )}
                                    </>
                                  ) : null
                                ) : (
                                  <>
                                    {menu && (
                                      <li
                                        onMouseMove={() => setMenu(true)}
                                        className="relative"
                                      >
                                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                          <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                                            <div className="flex cursor-pointer items-center gap-2">
                                              <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                                              <span>Category...</span>
                                            </div>

                                            <span className="shrink-0 transition duration-300 ">
                                              <FaAngleDown className="h-4 w-4 " />
                                            </span>
                                          </summary>

                                          <ul className=" space-y-1 bg-gray-100 p-2">
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/mega-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                                Mega Category
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/sub-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                                Sub Category
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/mini-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                                Mini Category
                                              </Link>
                                            </li>

                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/extra-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                                Extra Category
                                              </Link>
                                            </li>
                                          </ul>
                                        </details>
                                      </li>
                                    )}
                                  </>
                                )}
                              </li>

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Warehouse"
                                ) ? (
                                  <>
                                    {menu && (
                                      <li
                                        onMouseMove={() => setMenu(true)}
                                        className=""
                                      >
                                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                          <summary className="flex cursor-pointer items-center justify-between text-black  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                            <div className="flex cursor-pointer items-center gap-2">
                                              <MdWarehouse className="w-5 h-5 fill-current text-gray-400" />
                                              <span>Warehouse... </span>
                                            </div>

                                            <span className="shrink-0 transition duration-300 ">
                                              <IoIosArrowDown className="h-5 w-5" />
                                            </span>
                                          </summary>

                                          <ul className="mt-2 space-y-1 px-4">
                                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/warehouse/warehouse-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                                Manage Warehouse
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                              <Link
                                                to={
                                                  "/admin/warehouse/area-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                                Area Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                              <Link
                                                to={
                                                  "/admin/warehouse/rack-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                                Rack Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                              <Link
                                                to={
                                                  "/admin/warehouse/self-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                                Self Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                              <Link
                                                to={
                                                  "/admin/warehouse/cell-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                                Cell Management
                                              </Link>
                                            </li>
                                          </ul>
                                        </details>
                                      </li>
                                    )}
                                  </>
                                ) : null
                              ) : (
                                <>
                                  {menu && (
                                    <li
                                      onMouseMove={() => setMenu(true)}
                                      className=""
                                    >
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                        <summary className="flex cursor-pointer items-center justify-between text-black  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <div className="flex cursor-pointer items-center gap-2">
                                            <MdWarehouse className="w-5 h-5 fill-current text-gray-400" />
                                            <span>Warehouse... </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>

                                        <ul className="mt-2 space-y-1 px-4">
                                          <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/warehouse/warehouse-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Manage Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/area-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Area Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/rack-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Rack Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/self-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Self Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/cell-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Cell Management
                                            </Link>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )}
                                </>
                              )}

                              {/* <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50'>
                              <Link
                                to="/admin/manage-product"
                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <TbCategory className='w-5 h-5 fill-current text-gray-400 ' />  Brand
                              </Link>
                            </li> */}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      <div className="group w-full [&_summary::-webkit-details-marker]:hidden flex flex-col items-center rounded-sm  ">
                        <div
                          onClick={() => handleToggle(1)}
                          className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer items-center gap-2">
                            <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                            <span>Products</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 1 && (
                          <ul className="mt-2 space-y-1 px-4">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to="/admin/manage-product"
                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                Manage Product
                              </Link>
                            </li>

                            <li className="">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Faq"
                                ) ? (
                                  <>
                                    {menu && (
                                      <li
                                        onMouseMove={() => setMenu(true)}
                                        className="relative"
                                      >
                                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                          <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                                            <div className="flex cursor-pointer items-center gap-2">
                                              <span>Category</span>
                                            </div>

                                            <span className="shrink-0 transition duration-300 ">
                                              <FaAngleDown className="h-4 w-4 " />
                                            </span>
                                          </summary>

                                          <ul className=" space-y-1 bg-gray-100 p-2">
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/mega-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                                Mega Category
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/sub-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                                Sub Category
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/mini-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                                Mini Category
                                              </Link>
                                            </li>

                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/extra-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                              >
                                                <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                                Extra Category
                                              </Link>
                                            </li>
                                          </ul>
                                        </details>
                                      </li>
                                    )}
                                  </>
                                ) : null
                              ) : (
                                <>
                                  {menu && (
                                    <li
                                      onMouseMove={() => setMenu(true)}
                                      className="relative"
                                    >
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                        <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                                          <div className="flex cursor-pointer items-center gap-2">
                                            <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                                            <span>Category...</span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <FaAngleDown className="h-4 w-4 " />
                                          </span>
                                        </summary>

                                        <ul className=" space-y-1 bg-gray-100 p-2">
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/mega-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                            >
                                              <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                              Mega Category
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/sub-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                              Sub Category
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/mini-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "}
                                              Mini Category
                                            </Link>
                                          </li>

                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/extra-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                            >
                                              <TbCategory className="w-3 h-3 fill-current text-gray-400 " />
                                              Extra Category
                                            </Link>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )}
                                </>
                              )}
                            </li>

                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Warehouse"
                              ) ? (
                                <>
                                  {menu && (
                                    <li
                                      onMouseMove={() => setMenu(true)}
                                      className=""
                                    >
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                        <summary className="flex cursor-pointer items-center justify-between text-black  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <div className="flex cursor-pointer items-center gap-2">
                                            <MdWarehouse className="w-5 h-5 fill-current text-gray-400" />
                                            <span>Warehouse... </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>

                                        <ul className="mt-2 space-y-1 px-4">
                                          <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/warehouse/warehouse-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Manage Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/area-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Area Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/rack-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Rack Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/self-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Self Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                            <Link
                                              to={
                                                "/admin/warehouse/cell-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                              Cell Management
                                            </Link>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )}
                                </>
                              ) : null
                            ) : (
                              <>
                                {menu && (
                                  <li
                                    onMouseMove={() => setMenu(true)}
                                    className=""
                                  >
                                    <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                      <summary className="flex cursor-pointer items-center justify-between text-black  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                        <div className="flex cursor-pointer items-center gap-2">
                                          <MdWarehouse className="w-5 h-5 fill-current text-gray-400" />
                                          <span>Warehouse... </span>
                                        </div>

                                        <span className="shrink-0 transition duration-300 ">
                                          <IoIosArrowDown className="h-5 w-5" />
                                        </span>
                                      </summary>

                                      <ul className="mt-2 space-y-1 px-4">
                                        <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <Link
                                            to={
                                              "/admin/warehouse/warehouse-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                            Manage Warehouse
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                          <Link
                                            to={
                                              "/admin/warehouse/area-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                            Area Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                          <Link
                                            to={
                                              "/admin/warehouse/rack-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                            Rack Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                          <Link
                                            to={
                                              "/admin/warehouse/self-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                            Self Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                                          <Link
                                            to={
                                              "/admin/warehouse/cell-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                            Cell Management
                                          </Link>
                                        </li>
                                      </ul>
                                    </details>
                                  </li>
                                )}
                              </>
                            )}

                            {/* <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50'>
                              <Link
                                to="/admin/manage-product"
                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <TbCategory className='w-5 h-5 fill-current text-gray-400 ' />  Brand
                              </Link>
                            </li> */}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* order */}
              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Faq") ? (
                  <>
                    {menu && (
                      <li
                        onMouseMove={() => setMenu(true)}
                        className="relative"
                      >
                        <div className="group [&_summary::-webkit-details-marker]:hidden flex flex-col w-full items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(2)}
                            className="flex cursor-pointer items-center w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                              <span>Orders2</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>
                          {openDropdownIndex == 2 && (
                            <ul className="mt-2 space-y-1 px-4">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) =>
                                    itm?.name === "Seller Order Management"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/seller-order-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && (
                                      <span>Seller Order Management</span>
                                    )}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/seller-order-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && (
                                    <span> Seller Order Management</span>
                                  )}
                                </NavLink>
                              )}

                              {/* {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Seller Order Management"
                                  ) ? (
                                    <NavLink
                                      onMouseMove={() => setMenu(true)}
                                      rel="noopener noreferrer"
                                      to={"/admin/seller-order-management"}
                                      className={({ isActive }) => {
                                        return isActive
                                          ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                          : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                      }}
                                    >
                                      <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                      {menu && <span>  Management Review</span>}
                                    </NavLink>
                                  ) : null
                                ) : (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/seller-order-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && <span>  Management Review</span>}
                                  </NavLink>
                                )}


                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Seller Order Management"
                                  ) ? (
                                    <NavLink
                                      onMouseMove={() => setMenu(true)}
                                      rel="noopener noreferrer"
                                      to={"/admin/seller-order-management"}
                                      className={({ isActive }) => {
                                        return isActive
                                          ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                          : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                      }}
                                    >
                                      <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                      {menu && <span>  Clam and return</span>}
                                    </NavLink>
                                  ) : null
                                ) : (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/seller-order-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && <span>  Clam and return</span>}
                                  </NavLink>
                                )} */}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      {/* start //! */}
                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                        <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <BiShoppingBag className="w-5 h-5 fill-current text-gray-400" />
                            <span>Orders</span>
                          </div>
                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </summary>
                        <ul className="mt-2 space-y-1 px-4">
                          {user?.staffRole ? (
                            user?.permissions.find(
                              (itm) => itm?.name === "Seller Order Management"
                            ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/seller-order-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Seller Order Management</span>}
                              </NavLink>
                            ) : null
                          ) : (
                            <NavLink
                              onMouseMove={() => setMenu(true)}
                              rel="noopener noreferrer"
                              to={"/admin/seller-order-management"}
                              className={({ isActive }) => {
                                return isActive
                                  ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                  : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                              }}
                            >
                              {menu && <span> Seller Order Management</span>}
                            </NavLink>
                          )}
                        </ul>

                        {/* //// ! claim  */}
                        <ul className="mt-2 space-y-1 px-4">
                          {user?.staffRole ? (
                            user?.permissions.find(
                              (itm) => itm?.name === "Claim Return"
                            ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/claim-return"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Claim Return</span>}
                              </NavLink>
                            ) : null
                          ) : (
                            <NavLink
                              onMouseMove={() => setMenu(true)}
                              rel="noopener noreferrer"
                              to={"/admin/claim-return"}
                              className={({ isActive }) => {
                                return isActive
                                  ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                  : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                              }}
                            >
                              {menu && <span> Claim Return</span>}
                            </NavLink>
                          )}89
                        </ul>

                        {/* <ul className="mt-2 space-y-1  p-2 border border-[gray] bg-[#1b202ea1]">
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                            <Link
                              to={"/admin/claim-return"}
                              className=" text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                           
                              Claim Return
                            </Link>
                          </li>
                        </ul> */}
                      </details>

                     
                    </li>
                  )}
                </>
              )}

              {/* Service */}
              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Faq") ? (
                  <>
                    {menu && (
                      <li
                        onMouseMove={() => setMenu(true)}
                        className="relative"
                      >
                        <div
                          onClick={() => handleToggle(3)}
                          className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center rounded-sm  "
                        >
                          <div className="flex w-full cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                              <span>Service</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 3 && (
                            <ul className="mt-2 space-y-1 px-4 w-full">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Services"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/services"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    {menu && <span>Service Management</span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/services"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center w-full p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center w-full p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {/* <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <span>Service Management</span>}
                                </NavLink>
                              )}

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Services"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/services"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    {/* <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" /> */}
                                    {menu && <span>Packages</span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/service-order"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {/* <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <span>Service Order</span>}
                                </NavLink>
                              )}

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Manage Category"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to="/admin/manage-category"
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                    {menu && <span>Category </span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to="/admin/manage-category"
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <span>Category </span>}
                                </NavLink>
                              )}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      <div
                        onClick={() => handleToggle(3)}
                        className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center rounded-sm  "
                      >
                        <div className="flex w-full cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                            <span>Service</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 3 && (
                          <ul className="mt-2 space-y-1 px-4 w-full">
                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Services"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/services"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {menu && <span>Service Management</span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/services"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center w-full p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center w-full p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Service Management</span>}
                              </NavLink>
                            )}

                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Services"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/services"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {/* <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <span>Packages</span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/service-order"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Service Order</span>}
                              </NavLink>
                            )}

                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Manage Category"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to="/admin/manage-category"
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <span>Category </span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to="/admin/manage-category"
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Category </span>}
                              </NavLink>
                            )}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* Posts */}
              {/* {
                user?.staffRole ? (
                  user?.permissions.find((itm) => itm?.name === "Faq") ? (
                    <>
                      {
                        menu &&
                        <li onMouseMove={() => setMenu(true)} className="relative">

                          <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                            <summary
                              className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                            >
                              <div className='flex cursor-pointer items-center gap-2'>
                                <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                                <span>Posts</span>
                              </div>

                              <span
                                className="shrink-0 transition duration-300 group-open:-rotate-180"
                              >
                                <IoIosArrowDown className="h-5 w-5" />

                              </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Staff Management"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/staff-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && <span>Add Staff</span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/staff-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Add Staff</span>}
                                </NavLink>
                              )}


                            </ul>
                          </details>
                        </li>
                      }
                    </>
                  ) : null
                ) : (
                  <>
                    {
                      menu &&
                      <li onMouseMove={() => setMenu(true)} className="relative">

                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                          <summary
                            className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                          >
                            <div className='flex cursor-pointer items-center gap-2'>
                              <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                              <span>Posts</span>
                            </div>

                            <span
                              className="shrink-0 transition duration-300 group-open:-rotate-180"
                            >
                              <IoIosArrowDown className="h-5 w-5" />

                            </span>
                          </summary>

                          <ul className="mt-2 space-y-1 px-4">

                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Staff Management"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/staff-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Add Staff</span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/staff-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Add Staff</span>}
                              </NavLink>
                            )}


                          </ul>
                        </details>
                      </li>
                    }
                  </>
                )
              } */}

              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Faq") ? (
                  <>
                    {menu && (
                      <li
                        onMouseMove={() => setMenu(true)}
                        className="relative"
                      >
                        <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(4)}
                            className="flex cursor-pointer items-center w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                              <span>Pages</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 4 && (
                            <ul className="mt-2 space-y-1 px-4">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Page Management"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/page-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && <span>Page Management</span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/page-management/add-page"}
                                  // className={({ isActive }) => {
                                  //   return isActive
                                  //     ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                  //     : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  // }}

                                  className={`flex items-center p-2 space-x-3 rounded-sm  `}
                                >
                                  <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Add Page</span>}
                                </NavLink>
                              )}

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Page Management"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/page-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && <span>Page Management</span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/page-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Page Management</span>}
                                </NavLink>
                              )}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  ">
                        <div
                          onClick={() => handleToggle(4)}
                          className="flex cursor-pointer items-center w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer items-center gap-2">
                            <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                            <span>Pages</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 4 && (
                          <ul className="mt-2 space-y-1 px-4">
                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Page Management"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/page-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Page Management</span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/page-management/add-page"}
                                // className={({ isActive }) => {
                                //   return isActive
                                //     ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                //     : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                // }}

                                className={`flex items-center p-2 space-x-3 rounded-sm  `}
                              >
                                <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Add Page</span>}
                              </NavLink>
                            )}

                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Page Management"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/page-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Page Management</span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/page-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Page Management</span>}
                              </NavLink>
                            )}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* Users */}
              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Faq") ? (
                  <>
                    {menu && (
                      <li
                        onMouseMove={() => setMenu(true)}
                        className="relative"
                      >
                        <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(5)}
                            className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                              <span>Users</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 5 && (
                            <ul className="mt-2 space-y-1 px-4">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Seller Management"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/seller-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && <span>Seller Management</span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/seller-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Seller Management</span>}
                                </NavLink>
                              )}

                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/customer-manage"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Customer manage</span>}
                              </NavLink>

                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Staff Management"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to={"/admin/staff-management"}
                                    className={({ isActive }) => {
                                      return isActive
                                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                    }}
                                  >
                                    <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                    {menu && <span> Staff Management</span>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/staff-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Staff Management</span>}
                                </NavLink>
                              )}
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  ">
                        <div
                          onClick={() => handleToggle(5)}
                          className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer items-center gap-2">
                            <TbCategory className="w-5 h-5 fill-current text-gray-400" />

                            <span>Users</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 5 && (
                          <ul className="mt-2 space-y-1 px-4">
                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Seller Management"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/seller-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span>Seller Management</span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/seller-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                <BiCategory className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Seller Management</span>}
                              </NavLink>
                            )}
                            <NavLink
                              onMouseMove={() => setMenu(true)}
                              rel="noopener noreferrer"
                              to={"/admin/shop-management"}
                              className={({ isActive }) => {
                                return isActive
                                  ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                  : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                              }}
                            >
                              <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" />
                              {menu && <span>Shop manage</span>}
                            </NavLink>
                            <NavLink
                              onMouseMove={() => setMenu(true)}
                              rel="noopener noreferrer"
                              to={"/admin/customer-manage"}
                              className={({ isActive }) => {
                                return isActive
                                  ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                  : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                              }}
                            >
                              <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" />
                              {menu && <span>Customer manage</span>}
                            </NavLink>

                            {user?.staffRole ? (
                              user?.permissions.find(
                                (itm) => itm?.name === "Staff Management"
                              ) ? (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/staff-management"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                  {menu && <span> Staff Management</span>}
                                </NavLink>
                              ) : null
                            ) : (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/staff-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                <BiSolidReport className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>Staff Management</span>}
                              </NavLink>
                            )}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* settings */}
              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Settings") ? (
                  <li onMouseMove={() => setMenu(true)} className="">
                    <div
                      onClick={() => handleToggle(6)}
                      className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                    >
                      <div className="flex cursor-pointer items-center justify-between w-full  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                        <div className="flex cursor-pointer items-center gap-2">
                          <MdSettings className="w-5 h-5 fill-current text-gray-400" />

                          <span>Settings</span>
                        </div>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <IoIosArrowDown className="h-5 w-5" />
                        </span>
                      </div>

                      {openDropdownIndex == 6 && (
                        <ul className="mt-2 space-y-1 px-4">
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/site-content"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdSettings className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Site Content
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <Link
                              to={"/admin/content-management/home-control"}
                              className="  flex gap-2 items-center px-1 p-1   rounded-md"
                            >
                              <VscFileMedia className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Home Control{" "}
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <Link
                              to={"/admin/content-management/admin-popup"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <FaPeopleGroup className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Pop UP
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/seller-notice"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Notice
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/admin-anouncement"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <MdAnnouncement className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Announcement
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/feature-image"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />
                              Feature Management
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/slider"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Slider
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/slider"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Social Links
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={""}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Referral Program
                            </Link>
                          </li>

                          {user?.staffRole ? (
                            user?.permissions.find(
                              (itm) => itm?.name === "Faq"
                            ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/faq"}
                                // className={({ isActive }) => {
                                //   return isActive
                                //     ? "flex items-center px-2 py-1 space-x-3 rounded-sm bg-gray-800 text-white "
                                //     : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                // }}
                                className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50"
                              >
                                <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>FAQ </span>}
                              </NavLink>
                            ) : null
                          ) : (
                            <NavLink
                              onMouseMove={() => setMenu(true)}
                              rel="noopener noreferrer"
                              to={"/admin/faq"}
                              // className={({ isActive }) => {
                              //   return isActive
                              //     ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                              //     : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                              // }}
                              className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50"
                            >
                              <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                              {menu && <span>FAQ </span>}
                            </NavLink>
                          )}

                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/payment-management"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdPayment className="w-5 h-5 fill-current text-gray-400 " />
                              Payment Getaway
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/seller-domain"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <GrDomain className="w-5 h-5 fill-current text-gray-400 " />
                              Seller Domain
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/send-email"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdEmail className="w-5 h-5 fill-current text-gray-400 " />
                              Send Email
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/shipping"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <FaShippingFast className="w-5 h-5 fill-current text-gray-400 " />
                              Shipping
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/daraz-setup"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdSystemSecurityUpdate className="w-5 h-5 fill-current text-gray-400 " />
                              Daraz Setup
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                ) : null
              ) : (
                <>
                  <li onMouseMove={() => setMenu(true)} className="">
                    <div
                      onClick={() => handleToggle(6)}
                      className="group [&_summary::-webkit-details-marker]:hidden w-full flex  flex-col items-center rounded-sm  "
                    >
                      <div className="flex cursor-pointer items-center justify-between w-full  p-2 rounded-sm hover:bg-gray-800 text-black hover:text-gray-50">
                        <div className="flex cursor-pointer items-center gap-2">
                          <MdSettings className="w-5 h-5 fill-current text-gray-400" />

                          <span>Settings</span>
                        </div>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <IoIosArrowDown className="h-5 w-5" />
                        </span>
                      </div>

                      {openDropdownIndex == 6 && (
                        <ul className="mt-2 space-y-1 px-4">
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/site-content"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdSettings className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Site Content
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <Link
                              to={"/admin/content-management/home-control"}
                              className="  flex gap-2 items-center px-1 p-1   rounded-md"
                            >
                              <VscFileMedia className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Home Control{" "}
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <Link
                              to={"/admin/content-management/admin-popup"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <FaPeopleGroup className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Pop UP
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/seller-notice"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Notice
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/admin-anouncement"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <MdAnnouncement className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Announcement
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/feature-image"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />
                              Feature Management
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/slider"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Slider
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={"/admin/content-management/slider"}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Social Links
                            </Link>
                          </li>

                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black">
                            <Link
                              to={""}
                              className="  flex gap-2 items-center px-1 p-1 space-x-3  rounded-md"
                            >
                              <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "}
                              Referral Program
                            </Link>
                          </li>

                          {user?.staffRole ? (
                            user?.permissions.find(
                              (itm) => itm?.name === "Faq"
                            ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/faq"}
                                // className={({ isActive }) => {
                                //   return isActive
                                //     ? "flex items-center px-2 py-1 space-x-3 rounded-sm bg-gray-800 text-white "
                                //     : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                // }}
                                className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50"
                              >
                                <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                                {menu && <span>FAQ </span>}
                              </NavLink>
                            ) : null
                          ) : (
                            <NavLink
                              onMouseMove={() => setMenu(true)}
                              rel="noopener noreferrer"
                              to={"/admin/faq"}
                              // className={({ isActive }) => {
                              //   return isActive
                              //     ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                              //     : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                              // }}
                              className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50"
                            >
                              <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                              {menu && <span>FAQ </span>}
                            </NavLink>
                          )}

                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/payment-management"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdPayment className="w-5 h-5 fill-current text-gray-400 " />
                              Payment Getaway
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/seller-domain"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <GrDomain className="w-5 h-5 fill-current text-gray-400 " />
                              Seller Domain
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/send-email"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdEmail className="w-5 h-5 fill-current text-gray-400 " />
                              Send Email
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/shipping"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <FaShippingFast className="w-5 h-5 fill-current text-gray-400 " />
                              Shipping
                            </Link>
                          </li>
                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                            <Link
                              to={"/admin/settings/daraz-setup"}
                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                            >
                              <MdSystemSecurityUpdate className="w-5 h-5 fill-current text-gray-400 " />
                              Daraz Setup
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                </>
              )}

              {/* omni chat */}
              <NavLink
                onMouseMove={() => setMenu(true)}
                to="/"
                rel="noopener noreferrer"
                href="#"
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <FaBlogger className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Omni Chat</span>}
              </NavLink>

              {/* Support */}
              <NavLink
                onMouseMove={() => setMenu(true)}
                to="/"
                rel="noopener noreferrer"
                href="#"
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <FaBlogger className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Support</span>}
              </NavLink>

              {/* Omni chats
              <li onMouseMove={() => setMenu(true)} className="">

                <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                  <summary
                    className="flex cursor-pointer items-center justify-between text-black  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                  >
                    <div className='flex cursor-pointer items-center gap-2'>
                      <MdWarehouse className="w-5 h-5 fill-current text-gray-400" />
                      <span> Settings </span>
                    </div>

                    <span
                      className="shrink-0 transition duration-300 "
                    >
                      <IoIosArrowDown className="h-5 w-5" />

                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">

                
                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black'>
                      <Link
                        to={'/admin/warehouse/area-management'}
                        className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                      >
                        <BiArea className='w-5 h-5 fill-current text-gray-400 ' /> Area Management
                      </Link>
                    </li>
                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black'>
                      <Link
                        to={'/admin/warehouse/rack-management'}
                        className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                      >
                        <BsHddRack className='w-5 h-5 fill-current text-gray-400 ' /> Rack Management
                      </Link>
                    </li>
                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black'>
                      <Link
                        to={'/admin/warehouse/self-management'}
                        className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                      >
                        <MdSelfImprovement className='w-5 h-5 fill-current text-gray-400 ' /> Self Management
                      </Link>
                    </li>
                    <li className='flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-black'>
                      <Link
                        to={'/admin/warehouse/cell-management'}
                        className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                      >
                        <BiSolidBellRing className='w-5 h-5 fill-current text-gray-400 ' /> Cell Management
                      </Link>
                    </li>


                  </ul>
                </details>
              </li> */}

              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Blog") ? (
                  <NavLink
                    to="/admin/blog"
                    rel="noopener noreferrer"
                    onMouseMove={() => setMenu(true)}
                    href="#"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                    }}
                  >
                    <FaBlogger className="w-5 h-5 fill-current text-gray-400" />
                    {menu && <span>Blogs</span>}
                  </NavLink>
                ) : null
              ) : (
                <NavLink
                  onMouseMove={() => setMenu(true)}
                  to="/admin/blog"
                  rel="noopener noreferrer"
                  href="#"
                  className={({ isActive }) => {
                    return isActive
                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                  }}
                >
                  <FaBlogger className="w-5 h-5 fill-current text-gray-400" />
                  {menu && <span>Blogs</span>}
                </NavLink>
              )}

              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Blog Category"
                ) ? (
                  <NavLink
                    onMouseMove={() => setMenu(true)}
                    rel="noopener noreferrer"
                    to="/admin/manage-blog-category"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                    }}
                  >
                    <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                    {menu && <span>Blog Category </span>}
                  </NavLink>
                ) : null
              ) : (
                <NavLink
                  onMouseMove={() => setMenu(true)}
                  rel="noopener noreferrer"
                  to="/admin/manage-blog-category"
                  className={({ isActive }) => {
                    return isActive
                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                  }}
                >
                  <FaUsersGear className="w-5 h-5 fill-current text-gray-400" />
                  {menu && <span>Blog Category</span>}
                </NavLink>
              )}

              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Service Order"
                ) ? (
                  <NavLink
                    onMouseMove={() => setMenu(true)}
                    to="/admin/service-order"
                    rel="noopener noreferrer"
                    href="#"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                    }}
                  >
                    <FaStore className="w-5 h-5 fill-current text-gray-400" />
                    {menu && <span> Service Order</span>}
                  </NavLink>
                ) : null
              ) : (
                <NavLink
                  onMouseMove={() => setMenu(true)}
                  to="/admin/service-order"
                  rel="noopener noreferrer"
                  href="#"
                  className={({ isActive }) => {
                    return isActive
                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                  }}
                >
                  <FaStore className="w-5 h-5 fill-current text-gray-400" />
                  {menu && <span> Service Order</span>}
                </NavLink>
              )}

              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Price Management"
                ) ? (
                  <NavLink
                    onMouseMove={() => setMenu(true)}
                    rel="noopener noreferrer"
                    to={"/admin/price-management"}
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                    }}
                  >
                    <AiOutlineAlert className="w-5 h-5 fill-current text-gray-400" />
                    {menu && <span> Price Management</span>}
                  </NavLink>
                ) : null
              ) : (
                <NavLink
                  onMouseMove={() => setMenu(true)}
                  rel="noopener noreferrer"
                  to={"/admin/price-management"}
                  className={({ isActive }) => {
                    return isActive
                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                  }}
                >
                  <AiOutlineAlert className="w-5 h-5 fill-current text-gray-400" />
                  {menu && <span> Price Management</span>}
                </NavLink>
              )}

              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Contact") ? (
                  <NavLink
                    onMouseMove={() => setMenu(true)}
                    rel="noopener noreferrer"
                    to={"/admin/contact"}
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                    }}
                  >
                    <SiGoogledomains className="w-5 h-5 fill-current text-gray-400" />
                    {menu && <span>Contact Management</span>}
                  </NavLink>
                ) : null
              ) : (
                <NavLink
                  onMouseMove={() => setMenu(true)}
                  rel="noopener noreferrer"
                  to={"/admin/contact"}
                  className={({ isActive }) => {
                    return isActive
                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                  }}
                >
                  <SiGoogledomains className="w-5 h-5 fill-current text-gray-400" />
                  {menu && <span>Contact Management</span>}
                </NavLink>
              )}

              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Support Ticket"
                ) ? (
                  <NavLink
                    onMouseMove={() => setMenu(true)}
                    to={"/admin/support-ticket"}
                    rel="noopener noreferrer"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                        : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                    }}
                  >
                    <BiSolidShoppingBags className="w-5 h-5 fill-current text-gray-400" />
                    {menu && <span> Support Ticket</span>}
                  </NavLink>
                ) : null
              ) : (
                <NavLink
                  onMouseMove={() => setMenu(true)}
                  to={"/admin/support-ticket"}
                  rel="noopener noreferrer"
                  className={({ isActive }) => {
                    return isActive
                      ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                      : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                  }}
                >
                  <BiSolidShoppingBags className="w-5 h-5 fill-current text-gray-400" />
                  {menu && <span> Support Ticket</span>}
                </NavLink>
              )}

              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Content Management"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div
                          onClick={() => handleToggle(8)}
                          className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                        >
                          <div className="flex cursor-pointer w-full items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <IoMdPhotos className="w-5 h-5 fill-current text-gray-400" />
                              <span>Content Management </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 8 && (
                            <ul className="mt-2 space-y-1 px-4">
                              <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                <Link
                                  to={"/admin/content-management/home-control"}
                                  className="  flex gap-2 items-center px-1 p-1   rounded-md"
                                >
                                  <VscFileMedia className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Home Control{" "}
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div
                        onClick={() => handleToggle(8)}
                        className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                      >
                        <div className="flex cursor-pointer w-full items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <IoMdPhotos className="w-5 h-5 fill-current text-gray-400" />
                            <span>Content Management </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 8 && (
                          <ul className="mt-2 space-y-1 px-4">
                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                              <Link
                                to={"/admin/content-management/home-control"}
                                className="  flex gap-2 items-center px-1 p-1   rounded-md"
                              >
                                <VscFileMedia className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                Home Control{" "}
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Content Management"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div
                          onClick={() => handleToggle(9)}
                          className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center w-full rounded-sm  "
                        >
                          <div className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800 w-full hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <MdReport className="w-5 h-5 fill-current text-gray-400" />
                              <span>Report Management </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 9 && (
                            <ul className="mt-2 space-y-1 px-4">
                              <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/admin-sales"}
                                  className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <FaSalesforce className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Sales
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/seller-admin"}
                                  className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <FaSalesforce className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Seller
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/customer-admin"}
                                  className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <AiFillCustomerService className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Cusotmer
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                <Link
                                  to={
                                    "/admin/report-management/warehouse-admin"
                                  }
                                  className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <FaWarehouse className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Warehouse
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                <Link
                                  to={
                                    "/admin/report-management/subscriber-admin"
                                  }
                                  className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <BsSubscript className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                  Subscriber
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                <Link
                                  to={
                                    "/admin/report-management/commission-history-admin"
                                  }
                                  className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  <BiHistory className="w-5 h-5 fill-current text-gray-400 " />
                                  Commission History
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div
                        onClick={() => handleToggle(9)}
                        className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center w-full rounded-sm  "
                      >
                        <div className="flex cursor-pointer items-center justify-between w-full text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <MdReport className="w-5 h-5 fill-current text-gray-400" />
                            <span>Report Management </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 9 && (
                          <ul className="mt-2 space-y-1 px-4">
                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/admin-sales"}
                                className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <FaSalesforce className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                Sales
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/seller-admin"}
                                className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <FaSalesforce className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                Seller
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/customer-admin"}
                                className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <AiFillCustomerService className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                Cusotmer
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/warehouse-admin"}
                                className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <FaWarehouse className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                Warehouse
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/subscriber-admin"}
                                className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <BsSubscript className="w-5 h-5 fill-current text-gray-400 " />{" "}
                                Subscriber
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between text-black  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                              <Link
                                to={
                                  "/admin/report-management/commission-history-admin"
                                }
                                className="  flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                <BiHistory className="w-5 h-5 fill-current text-gray-400 " />
                                Commission History
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* <NavLink
                onMouseMove={() => setMenu(true)}
                rel="noopener noreferrer"
                to={"/admin/omni-chat"}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <BsChatLeftQuote className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Omni Chat</span>}
              </NavLink> */}

              <NavLink
                onMouseMove={() => setMenu(true)}
                rel="noopener noreferrer"
                to={`/admin/referral-program`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <MdOutlineRoomPreferences className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Referral program</span>}
              </NavLink>

              <NavLink
                onMouseMove={() => setMenu(true)}
                rel="noopener noreferrer"
                to={"/admin/seller-manage"}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Stock Management</span>}
              </NavLink>

              <button
                rel="noopener noreferrer"
                onClick={() => logOut()}
                className="flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white w-full"
              >
                <IoLogOut className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Logout</span>}
              </button>
            </ul>
          </div>
        </div>
        <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
          {user?.image ? (
            <img
              src={user.image}
              srcSet={user.image}
              alt=""
              className="w-12 h-12 rounded-lg bg-gray-500"
            />
          ) : (
            <MdOutlineAdminPanelSettings className="w-12 h-12 rounded-lg " />
          )}
          {menu && (
            <div>
              <h2 className="text-lg font-semibold">{user?.name}</h2>
              <span className="flex items-center space-x-1">
                <NavLink
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-400"
                >
                  View profile
                </NavLink>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavAdmin;
