import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";

import {
  BiCategory,
  BiSolidReport
} from "react-icons/bi";
import {
  BsBasket,
  BsBox2,
  BsBoxSeam,
  BsCalculator,
  BsCalendar2Range,
  BsColumnsGap,
  BsFillBootstrapFill,
  BsFillJournalBookmarkFill,
  BsGear,
  BsHddNetworkFill,
  BsHeadset,
  BsLayoutTextSidebarReverse,
  BsLifePreserver,
  BsPersonLinesFill
} from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import {
  FaAngleDown,
  FaBlogger
} from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import {
  MdOutlineAdminPanelSettings
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/doobLightLogo.png";

import { IoIosArrowDown, IoMdPhotos } from "react-icons/io";
const SideNavAdmin = ({ responsive, setResponsive }) => {
  const { user, logOut } = useContext(AuthContext);
  const [menu, setMenu] = useState(true);
  console.log(user);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(false);

  const handleToggle = (idx) => {
    setOpenDropdownIndex((prevIdx) => (prevIdx === idx ? false : idx));
  };



  console.log('check permission', user);

  return (
    <div className="py-  bg-red-400">

      {/* <button
        onClick={() => setMenu(!menu)}
        className={`absolute bg-gray-900 right-[-10px] w-[25px] h-[25px] flex items-center justify-center rounded-full text-white top-20 z-[1000]`}
      >
        {menu ? <FaAngleLeft /> : <FaAngleRight />}
      </button> */}
      <div
        className={`${responsive
          ? "flex  h-screen  overflow-y-auto  flex-col  md:p-3 p-0 lg:w-[70px] md:w-[70px] w-0  border-r-2  "
          : "flex flex-col  p-6 md:w-64 w-[300px]  h-screen  overflow-y-auto"
          } md:relative fixed  z-[4000] bg-[#111827] text-white  top-0 left-0 bottom-0`}
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
                className="inline-flex items-center "
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
                <BsColumnsGap className="w-5 h-5 fill-current text-gray-400" />
                {!responsive && <span>Dashboard</span>}
              </NavLink>

              {/* product */}

              {user?.staffRole ? (
                user?.permissions?.find((itm) => itm?.name === "Manage Product") ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="relative">
                        <div className="group w-full [&_summary::-webkit-details-marker]:hidden flex flex-col items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(101)}
                            className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsBox2 className="w-5 h-5 fill-current text-gray-400" />

                              <span>Products</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 101 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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
                                            <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                                              <div className="flex cursor-pointer items-center gap-2">
                                                <span className="text-white">
                                                  Category
                                                </span>
                                              </div>

                                              <span className="shrink-0 transition duration-300 ">
                                                <FaAngleDown className="h-4 w-4 " />
                                              </span>
                                            </summary>

                                            <ul className=" space-y-1 bg-gray-00 p-2 border border-white">
                                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                <Link
                                                  to={
                                                    "/admin/category-management/mega-category-management"
                                                  }
                                                  className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                                >
                                                  {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                                  {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                                  {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                                  {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                          <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                                            <div className="flex cursor-pointer items-center gap-2">
                                              {/* <TbCategory className="w-5 h-5 fill-current text-gray-400" /> */}

                                              <span>Category</span>
                                            </div>

                                            <span className="shrink-0 transition duration-300 ">
                                              <FaAngleDown className="h-4 w-4 " />
                                            </span>
                                          </summary>

                                          <ul className=" space-y-1 bg-gray-700 p-2">
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/mega-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                              >
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                          <summary className="flex cursor-pointer items-center justify-between text-white  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                            <div className="flex cursor-pointer items-center gap-2">
                                              {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                              <span>Warehouse </span>
                                            </div>

                                            <span className="shrink-0 transition duration-300 ">
                                              <IoIosArrowDown className="h-5 w-5" />
                                            </span>
                                          </summary>

                                          <ul className="mt-2 space-y-1 bg-gray-700 px-4">
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/warehouse/warehouse-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                {/* <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                Manage Warehouse
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                              <Link
                                                to={
                                                  "/admin/warehouse/area-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                Area Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                              <Link
                                                to={
                                                  "/admin/warehouse/rack-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                {/* <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                Rack Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                              <Link
                                                to={
                                                  "/admin/warehouse/self-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                {/* <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                Self Management
                                              </Link>
                                            </li>
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                              <Link
                                                to={
                                                  "/admin/warehouse/cell-management"
                                                }
                                                className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                              >
                                                {/* <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
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
                                        <summary className="flex cursor-pointer items-center justify-between text-white  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <div className="flex cursor-pointer items-center gap-2">
                                            {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                            <span>Warehouse </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>

                                        <ul className="mt-2 space-y-1 px-4 py-4 bg-gray-700">
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/warehouse-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Manage Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/area-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Area Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/rack-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Rack Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/self-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Shelf Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/cell-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
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
                          onClick={() => handleToggle(101)}
                          className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsBox2 className="w-5 h-5 fill-current text-gray-400" />

                            <span>Products</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 101 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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
                                          <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                                            <div className="flex cursor-pointer items-center gap-2">
                                              <span className="text-white">
                                                Category
                                              </span>
                                            </div>

                                            <span className="shrink-0 transition duration-300 ">
                                              <FaAngleDown className="h-4 w-4 " />
                                            </span>
                                          </summary>

                                          <ul className=" space-y-1 bg-gray-00 p-2 border border-white">
                                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                              <Link
                                                to={
                                                  "/admin/category-management/mega-category-management"
                                                }
                                                className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                              >
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                                {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                        <summary className="flex cursor-pointer items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                                          <div className="flex cursor-pointer items-center gap-2">
                                            {/* <TbCategory className="w-5 h-5 fill-current text-gray-400" /> */}

                                            <span>Category</span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <FaAngleDown className="h-4 w-4 " />
                                          </span>
                                        </summary>

                                        <ul className=" space-y-1 bg-gray-700 p-2">
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/mega-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2 items-center px-4 p-2 justify-between  rounded-md"
                                            >
                                              {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                              {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                              {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
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
                                              {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
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
                                        <summary className="flex cursor-pointer items-center justify-between text-white  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <div className="flex cursor-pointer items-center gap-2">
                                            {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                            <span>Warehouse </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>

                                        <ul className="mt-2 space-y-1 bg-gray-700 px-4">
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/warehouse/warehouse-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Manage Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/area-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Area Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/rack-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Rack Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/self-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Self Management
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/cell-management"
                                              }
                                              className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
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
                                      <summary className="flex cursor-pointer items-center justify-between text-white  py-2 px-4 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                        <div className="flex cursor-pointer items-center gap-2">
                                          {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                          <span>Warehouse </span>
                                        </div>

                                        <span className="shrink-0 transition duration-300 ">
                                          <IoIosArrowDown className="h-5 w-5" />
                                        </span>
                                      </summary>

                                      <ul className="mt-2 space-y-1 px-4 py-4 bg-gray-700">
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                          <Link
                                            to={
                                              "/admin/warehouse/warehouse-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            {/* <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                            Manage Warehouse
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                          <Link
                                            to={
                                              "/admin/warehouse/area-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                            Area Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                          <Link
                                            to={
                                              "/admin/warehouse/rack-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            {/* <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                            Rack Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                          <Link
                                            to={
                                              "/admin/warehouse/self-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            {/* <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                            Shelf Management
                                          </Link>
                                        </li>
                                        <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                          <Link
                                            to={
                                              "/admin/warehouse/cell-management"
                                            }
                                            className="  flex gap-2 items-center px-4 p-2 space-x-1  rounded-md"
                                          >
                                            {/* <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
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
                user?.permissions.find((itm) => itm?.name === "Orders") ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="relative w-full">
                        {/* start //! */}
                        <div className="group [&_summary::-webkit-details-marker]:hidden block w-full items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(102)}
                            className="flex cursor-pointer items-center w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsBasket className="w-5 h-5 fill-current text-gray-400" />
                              <span>Orders</span>
                            </div>
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>
                          {openDropdownIndex == 102 && <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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
                              <li>
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
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/claim-list"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                      : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {menu && <span> Claim List</span>}
                                </NavLink>
                              </li>
                            )}
                          </ul>}



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
                        </div>
                      </li>
                    )}
                  </>
                ) : null
              ) : (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative w-full">
                      {/* start //! */}
                      <div className="group [&_summary::-webkit-details-marker]:hidden block w-full items-center rounded-sm  ">
                        <div
                          onClick={() => handleToggle(102)}
                          className="flex cursor-pointer items-center w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsBasket className="w-5 h-5 fill-current text-gray-400" />
                            <span>Orders</span>
                          </div>
                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>
                        {openDropdownIndex == 102 && <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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
                            <li>
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
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/claim-list"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex items-center p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                    : "flex items-center p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span> Claim List</span>}
                              </NavLink>
                            </li>
                          )}
                        </ul>}



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
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* Service */}
              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Services") ? (
                  <>
                    {menu && (
                      <li
                        onMouseMove={() => setMenu(true)}
                        className="relative"
                      >
                        <div

                          className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center rounded-sm  "
                        >
                          <div onClick={() => handleToggle(3)} className="flex w-full cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsLifePreserver className="w-5 h-5 fill-current text-gray-400" />

                              <span>Service</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 3 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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
                    <li
                      onMouseMove={() => setMenu(true)}
                      className="relative"
                    >
                      <div

                        className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center rounded-sm  "
                      >
                        <div onClick={() => handleToggle(3)} className="flex w-full cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsLifePreserver className="w-5 h-5 fill-current text-gray-400" />

                            <span>Service</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 3 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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


              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Page Management") ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="relative">
                        <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(40)}
                            className="flex cursor-pointer items-center w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsCalendar2Range className="w-5 h-5 fill-current text-gray-400" />

                              <span>Pages</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 40 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                              {/* {user?.staffRole ? (
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
                            )} */}

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
                                    {/* <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                  {/* <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" /> */}
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
                          onClick={() => handleToggle(40)}
                          className="flex cursor-pointer items-center w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsCalendar2Range className="w-5 h-5 fill-current text-gray-400" />

                            <span>Pages</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 40 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                            {/* {user?.staffRole ? (
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
                            )} */}

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
                                  {/* <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                {/* <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" /> */}
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
                user?.permissions.find((itm) => itm?.name === "Users") ? (
                  <>
                    {menu && (
                      <li
                        onMouseMove={() => setMenu(true)}
                        className="relative"
                      >
                        <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  ">
                          <div
                            onClick={() => handleToggle(5)}
                            className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                          >
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsPersonLinesFill className="w-5 h-5 fill-current text-gray-400" />

                              <span>Users</span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 5 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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
                                    {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                  {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                {/* <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                  {/* <BiSolidReport className="w-5 h-5 fill-current text-gray-400" /> */}
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
                          className="flex cursor-pointer w-full items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsPersonLinesFill className="w-5 h-5 fill-current text-gray-400" />

                            <span>Users</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 5 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
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
                                  {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
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
                              {/* <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" /> */}
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
                              {/* <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                  {/* <BiSolidReport className="w-5 h-5 fill-current text-gray-400" /> */}
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
                                {/* <BiSolidReport className="w-5 h-5 fill-current text-gray-400" /> */}
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


              {/* content management */}

              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Content Management"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div

                          className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                        >
                          <div onClick={() => handleToggle(8)} className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <IoMdPhotos className="w-5 h-5 fill-current text-gray-400" />
                              <span>Content Management </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 8 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/settings/site-content"}
                                  className="w-full"
                                >
                                  <div className=" hover:text-gray-50 flex gap-2  w-full items-center px-4 p-2 space-x-3  rounded-md">
                                    Site Content
                                  </div>
                                  {/* <MdSettings className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/content-management/home-control"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Home Control
                                  </div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/content-management/admin-popup"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Pop UP

                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/content-management/slider"}
                                  className="w-full"
                                >

                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Slider
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/content-management/feature-image"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Feature Management
                                  </div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Faq"
                                  ) ? (
                                    <Link
                                      to={"/admin/faq"}
                                      className="w-full"
                                    >
                                      <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                        FAQ
                                      </div>
                                    </Link>
                                  ) : null
                                ) : (
                                  <Link
                                    to={"/admin/faq"}
                                    className="w-full"
                                  >
                                    <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                      FAQ
                                    </div>
                                  </Link>
                                )}
                              </li>

                              {/* <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                  <Link
                                    to={"/admin/content-management/slider"}
                                    className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                  >
                                    {/* <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                              {/* Social Links
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
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div

                        className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                      >
                        <div onClick={() => handleToggle(8)} className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <IoMdPhotos className="w-5 h-5 fill-current text-gray-400" />
                            <span>Content Management </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 8 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/settings/site-content"}
                                className="w-full"
                              >
                                <div className=" hover:text-gray-50 flex gap-2  w-full items-center px-4 p-2 space-x-3  rounded-md">
                                  Site Content
                                </div>
                                {/* <MdSettings className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/content-management/home-control"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Home Control
                                </div>
                              </Link>
                            </li>

                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/content-management/admin-popup"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Pop UP

                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/slider"}
                                className="w-full"
                              >

                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Slider
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/feature-image"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Feature Management
                                </div>
                              </Link>
                            </li>

                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Faq"
                                ) ? (
                                  <Link
                                    to={"/admin/faq"}
                                    className="w-full"
                                  >
                                    <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                      FAQ
                                    </div>
                                  </Link>
                                ) : null
                              ) : (
                                <Link
                                  to={"/admin/faq"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    FAQ
                                  </div>
                                </Link>
                              )}
                            </li>

                            {/* <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/slider"}
                                className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                            {/* Social Links
                              </Link>
                            </li> */}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}


              {/* notice 2 */}
              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Notice"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div

                          className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                        >
                          <div
                            onClick={() => handleToggle(12)}
                            className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsHddNetworkFill className="w-5 h-5 fill-current text-gray-400" />
                              <span>Notice </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 12 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/content-management/seller-notice"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50   flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Notice
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/content-management/admin-anouncement"}
                                  className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                  Announcement
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/settings/send-email"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Send Email
                                  </div>
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

                        className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                      >
                        <div
                          onClick={() => handleToggle(12)}
                          className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsHddNetworkFill className="w-5 h-5 fill-current text-gray-400" />
                            <span>Notice </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 12 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/seller-notice"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50   flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Notice
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/admin-anouncement"}
                                className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                Announcement
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/send-email"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Send Email
                                </div>
                              </Link>
                            </li>

                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}


              {/* config setting */}
              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Settings"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div

                          className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                        >
                          <div onClick={() => handleToggle(13)} className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsGear className="w-5 h-5 fill-current text-gray-400" />
                              <span>Config Setting </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 13 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                              {/* <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/seller-notice"}
                                className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                              {/* Notice
                              </Link>
                            </li> */}
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/settings/payment-management"}
                                  className="w-full"
                                >
                                  {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Payment Getway
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/settings/seller-domain"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Seller Domain
                                  </div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/settings/shipping"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Shipping
                                  </div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/settings/daraz-setup"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Daraz Setup
                                  </div>
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

                        className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                      >
                        <div onClick={() => handleToggle(13)} className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsGear className="w-5 h-5 fill-current text-gray-400" />
                            <span>Config Setting </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 13 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                            {/* <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/seller-notice"}
                                className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                              >
                                {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                            {/* Notice
                              </Link>
                            </li> */}
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/payment-management"}
                                className="w-full"
                              >
                                {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Payment Getway
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/seller-domain"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Seller Domain
                                </div>
                              </Link>
                            </li>

                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/shipping"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Shipping
                                </div>
                              </Link>
                            </li>

                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/daraz-setup"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Daraz Setup
                                </div>
                              </Link>
                            </li>

                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* config setting */}
              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Price Management"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div
                          className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                        >
                          <div onClick={() => handleToggle(14)} className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <IoMdPhotos className="w-5 h-5 fill-current text-gray-400" />
                              <span>Pricing </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 14 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/price-management"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Price Management
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/manage-product/add-product"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Commission</div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/package-management"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">Package Handle</div>
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
                        className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                      >
                        <div onClick={() => handleToggle(14)} className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <IoMdPhotos className="w-5 h-5 fill-current text-gray-400" />
                            <span>Pricing </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 14 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/price-management"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Price Management
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/manage-product/add-product"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Commission</div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/package-management"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">Package Handle</div>
                              </Link>
                            </li>



                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}
              {/* end */}



              {/* config setting */}
              {user?.staffRole ? (
                user?.permissions?.find(
                  (itm) => itm?.name === "Blogs"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div
                          onClick={() => handleToggle(15)}
                          className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                        >
                          <div className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsFillBootstrapFill className="w-5 h-5 fill-current text-gray-400" />
                              <span>Blog </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 15 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                <Link
                                  to={"/admin/blog/new-blog"}
                                  className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md"
                                >
                                  {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                  Add Blog
                                </Link>
                              </li>
                              <li className="flex cursor-pointer w-full items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">

                                {user?.staffRole ? (
                                  user?.permissions.find((itm) => itm?.name === "Blog") ? (
                                    <NavLink
                                      to="/admin/blog"
                                      rel="noopener noreferrer"
                                      onMouseMove={() => setMenu(true)}
                                      href="#"
                                      className='hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md'
                                    >
                                      {/* <FaBlogger className="w-5 h-5 fill-current text-gray-400" /> */}
                                      {menu && <span>Blogs</span>}
                                    </NavLink>
                                  ) : null
                                ) : (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    to="/admin/blog"
                                    rel="noopener noreferrer"
                                    href="#"
                                    className='hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md'
                                  >
                                    {/* <FaBlogger className="w-5 h-5 fill-current text-gray-400" /> */}
                                    {menu && <span>Blogs</span>}
                                  </NavLink>
                                )}
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                {user?.staffRole ? (
                                  user?.permissions.find(
                                    (itm) => itm?.name === "Blog Category"
                                  ) ? (
                                    <NavLink
                                      onMouseMove={() => setMenu(true)}
                                      rel="noopener noreferrer"
                                      to="/admin/manage-blog-category"
                                      className='hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md'
                                    >
                                      {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                      {menu && <span>Blog Category </span>}
                                    </NavLink>
                                  ) : null
                                ) : (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to="/admin/manage-blog-category"
                                    className='hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md'
                                  >
                                    {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                    {menu && <span>Blog Category</span>}
                                  </NavLink>
                                )}
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

                        className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col items-center rounded-sm  "
                      >
                        <div onClick={() => handleToggle(15)} className="flex cursor-pointer w-full items-center justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsFillBootstrapFill className="w-5 h-5 fill-current text-gray-400" />
                            <span>Blog </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 15 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/blog/new-blog"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Add Blog
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer w-full items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">

                              {user?.staffRole ? (
                                user?.permissions.find((itm) => itm?.name === "Blog") ? (
                                  <NavLink
                                    to="/admin/blog"
                                    rel="noopener noreferrer"
                                    onMouseMove={() => setMenu(true)}
                                    href="#"
                                    className='w-full'
                                  >
                                    {/* <FaBlogger className="w-5 h-5 fill-current text-gray-400" /> */}
                                    {menu && <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">Blogs</div>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  to="/admin/blog"
                                  rel="noopener noreferrer"
                                  onMouseMove={() => setMenu(true)}
                                  href="#"
                                  className='w-full'
                                >
                                  {/* <FaBlogger className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">Blogs</div>}
                                </NavLink>
                              )}
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              {user?.staffRole ? (
                                user?.permissions.find(
                                  (itm) => itm?.name === "Blog Category"
                                ) ? (
                                  <NavLink
                                    onMouseMove={() => setMenu(true)}
                                    rel="noopener noreferrer"
                                    to="/admin/manage-blog-category"
                                    className='w-full'
                                  >
                                    {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                    {menu && <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">Blog Category </div>}
                                  </NavLink>
                                ) : null
                              ) : (
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to="/admin/manage-blog-category"
                                  className='w-full'
                                >
                                  {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">Blog Category </div>}
                                </NavLink>
                              )}
                            </li>



                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}

              {/* blog end */}
              {user?.staffRole ? (
                user?.permissions.find(
                  (itm) => itm?.name === "Report"
                ) ? (
                  <>
                    {menu && (
                      <li onMouseMove={() => setMenu(true)} className="">
                        <div
                          className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center w-full rounded-sm  "
                        >
                          <div onClick={() => handleToggle(9)} className="flex cursor-pointer items-center justify-between w-full text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                            <div className="flex cursor-pointer items-center gap-2">
                              <BsLayoutTextSidebarReverse className="w-5 h-5 fill-current text-gray-400" />
                              <span>Report Management </span>
                            </div>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                              <IoIosArrowDown className="h-5 w-5" />
                            </span>
                          </div>

                          {openDropdownIndex == 9 && (
                            <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/admin-sales"}
                                  className="w-full"
                                >
                                  {/* <FaSalesforce className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Service Sales
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/seller-admin"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Shop
                                  </div>
                                </Link>
                              </li>

                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/warehouse-admin"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Warehouse
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/subscriber-admin"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Subscriber
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/report-management/pricing"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Pricing
                                  </div>
                                </Link>
                              </li>
                              <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={
                                    "/admin/report-management/commission-history-admin"
                                  }
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                    Commission History
                                  </div>
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
                        className="group [&_summary::-webkit-details-marker]:hidden flex flex-col items-center w-full rounded-sm  "
                      >
                        <div onClick={() => handleToggle(9)} className="flex cursor-pointer items-center justify-between w-full text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                          <div className="flex cursor-pointer items-center gap-2">
                            <BsLayoutTextSidebarReverse className="w-5 h-5 fill-current text-gray-400" />
                            <span>Report Management </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 9 && (
                          <ul className="mt-2 space-y-1 px-4 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/admin-sales"}
                                className="w-full"
                              >
                                {/* <FaSalesforce className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Service Sales
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/seller-admin"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Shop
                                </div>
                              </Link>
                            </li>

                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/warehouse-admin"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Warehouse
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/subscriber-admin"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Subscriber
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/pricing"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Pricing
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer items-center justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={
                                  "/admin/report-management/commission-history-admin"
                                }
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2 items-center px-4 p-2 space-x-3  rounded-md">
                                  Commission History
                                </div>
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              )}
              {/* end */}

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

              {/* //!  close price management */}
              {user?.staffRole ? (
                user?.permissions.find((itm) => itm?.name === "Support Ticket") ? (
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
                    <BsFillJournalBookmarkFill className="w-5 h-5 fill-current text-gray-400" />
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
                  <BsFillJournalBookmarkFill className="w-5 h-5 fill-current text-gray-400" />
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
                    <BsHeadset className="w-5 h-5 fill-current text-gray-400" />
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
                  <BsHeadset className="w-5 h-5 fill-current text-gray-400" />
                  {menu && <span> Support Ticket</span>}
                </NavLink>
              )}


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
                <HiOutlineUserGroup className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Referral program</span>}
              </NavLink>

              <NavLink
                onMouseMove={() => setMenu(true)}
                rel="noopener noreferrer"
                to={"/admin/stock-manage"}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <BsBoxSeam className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Stock Management</span>}
              </NavLink>

              <NavLink
                onMouseMove={() => setMenu(true)}
                rel="noopener noreferrer"
                to={"/admin/daraz-account-management"}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex items-center p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <BsBoxSeam className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Daraz Account Management</span>}
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
          </div >
        </div >
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
                <Link
                  rel="noopener noreferrer"
                  to="/admin/dashboard/view-profile"
                  className="text-xs hover:underline text-gray-400"
                >
                  View profile
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavAdmin;