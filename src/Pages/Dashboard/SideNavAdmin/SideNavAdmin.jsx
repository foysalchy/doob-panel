import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";

import { BiCategory, BiSolidReport } from "react-icons/bi";
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
  BsPersonLinesFill,
} from "react-icons/bs";
import { TfiAnnouncement } from "react-icons/tfi";
import { CgClose } from "react-icons/cg";
import { FaAngleDown, FaBlogger } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoLogOut, IoNotificationsCircle } from "react-icons/io5";
import { RiChatSmile2Line } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
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

  console.log("check permission", user);

  return (
    <div className="py-  bg-red-400">
      {/* <button
        onClick={() => setMenu(!menu)}
        className={`absolute bg-gray-900 right-[-10px] w-[25px] h-[25px] flex  justify-center rounded-full text-white top-20 z-[1000]`}
      >
        {menu ? <FaAngleLeft /> : <FaAngleRight />}
      </button> */}
      <div
        className={`${responsive
          ? "flex  h-screen  overflow-y-auto  flex-col  md:p-3 p-0 lg:w-[70px] md:w-[70px] w-0  border-r-2  "
          : "flex flex-col  p-6 md:w-64 w-[300px]  h-screen  overflow-y-auto"
          } md:relative fixed  z-[4000] bg-[#111827] text-white  top-0 left-0 bottom-0`}
      >
        <style jsx>{`
          .fixed a {
            display: block;
            padding: 7px 10px;
            width: 100%;
          }
          .fixed a div {
            padding: 0;
          }
          .fixed li {
            padding: 0 !important;
          }
        `}</style>
        <div className="space-y-3">
          <div className="flex  justify-between">
            {!responsive && (
              <Link
                to="/"
                aria-label="Company"
                title="Company"
                className="inline-flex "
              >
                <img className="w-32" src={Logo} srcSet={Logo} alt="" />
              </Link>
            )}
            {responsive ? (
              <button
                onClick={() => setResponsive(false)}
                aria-label="Company"
                title="Company"
                className="inline-flex  "
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
                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                }}
              >
                <div className="flex  p-2 space-x-3 ">
                  <BsColumnsGap className="w-5 h-5 fill-current text-gray-400" />
                  {!responsive && <span>Dashboard</span>}
                </div>
              </NavLink>

              {/* product */}

              {!user?.staffRole ||
                user?.permissions?.find(
                  (itm) => itm?.name === "Manage Product"
                ) ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      <div className="group w-full [&_summary::-webkit-details-marker]:hidden flex flex-col  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(101)}
                          className="flex cursor-pointer w-full  justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <BsBox2 className="w-5 h-5 fill-current text-gray-400" />

                            <span>Products</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 101 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to="/admin/manage-product"
                                className=" hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                              >
                                Manage Product
                              </Link>
                            </li>

                            <li className="">
                              {!user?.staffRole ||
                                user?.permissions.find(
                                  (itm) => itm?.name === "Faq"
                                ) ? (
                                <>
                                  {menu && (
                                    <li
                                      onMouseMove={() => setMenu(true)}
                                      className="relative"
                                    >
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex  rounded-sm  ">
                                        <summary className="flex cursor-pointer  justify-between px-2 py-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50">
                                          <div className="flex cursor-pointer  gap-2">
                                            <span className="text-white">
                                              Category
                                            </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <FaAngleDown className="h-4 w-4 " />
                                          </span>
                                        </summary>

                                        <ul className=" space-y-1 bg-gray-00 p-2 border border-white">
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/mega-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2  px-2 p-2 justify-between  rounded-md"
                                            >
                                              {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " /> */}
                                              Mega Category
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/sub-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                            >
                                              {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
                                              Sub Category
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/mini-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                            >
                                              {/* <TbCategory className="w-3 h-3 fill-current text-gray-400 " />{" "} */}
                                              Mini Category
                                            </Link>
                                          </li>

                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/category-management/extra-category-management"
                                              }
                                              className=" hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
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
                              ) : null}
                            </li>

                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={
                                  "/admin/category-management/mega-category-management"
                                }
                                className=" hover:text-gray-50 flex gap-2  px-2 p-2 justify-between  rounded-md"
                              >
                                Review
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}

              {/* order */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Orders") ? (
                <>
                  {menu && (
                    <li
                      onMouseMove={() => setMenu(true)}
                      className="relative w-full"
                    >
                      {/* start //! */}
                      <div className="group [&_summary::-webkit-details-marker]:hidden block w-full  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(102)}
                          className="flex cursor-pointer  w-full justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <BsBasket className="w-5 h-5 fill-current text-gray-400" />
                            <span>Orders</span>
                          </div>
                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>
                        {openDropdownIndex == 102 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Orders"
                              ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/seller-order-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Order Management</span>}
                              </NavLink>
                            ) : null}
                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Claim Return"
                              ) ? (
                              <li>
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/claim-return"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex  p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                      : "flex  p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
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
                                      ? "flex  p-2 space-x-1 rounded-sm bg-gray-800 text-white "
                                      : "flex  p-2 space-x-1 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {menu && <span> Claim List</span>}
                                </NavLink>
                              </li>
                            ) : null}
                          </ul>
                        )}

                        {/* <ul className="mt-2 space-y-1  p-2 border border-[gray] bg-[#1b202ea1]">
                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 text-gray-50">
                            <Link
                              to={"/admin/claim-return"}
                              className=" text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                            >
                           
                              Claim Return
                            </Link>
                          </li>
                        </ul> */}
                      </div>
                    </li>
                  )}
                </>
              ) : null}

              {/* Service */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Services") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      <div className="group [&_summary::-webkit-details-marker]:hidden flex flex-col  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(3)}
                          className="flex w-full cursor-pointer  justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <BsLifePreserver className="w-5 h-5 fill-current text-gray-400" />

                            <span>Service</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 3 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Services"
                              ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/services"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span>Management</span>}
                              </NavLink>
                            ) : null}

                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Services"
                              ) ? (
                              <li>
                                <NavLink
                                  onMouseMove={() => setMenu(true)}
                                  rel="noopener noreferrer"
                                  to={"/admin/service-order"}
                                  className={({ isActive }) => {
                                    return isActive
                                      ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                      : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                  }}
                                >
                                  {/* <BsTicketDetailed className="w-5 h-5 fill-current text-gray-400" /> */}
                                  {menu && <span>Requested</span>}
                                </NavLink>
                              </li>
                            ) : null}

                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Manage Category"
                              ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to="/admin/manage-category"
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Type </span>}
                              </NavLink>
                            ) : null}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}

              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Services") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
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
                            <li>
                              {!user?.staffRole ||
                                user?.permissions.find(
                                  (itm) => itm?.name === "Warehouse"
                                ) ? (
                                <>
                                  {menu && (
                                    <li
                                      onMouseMove={() => setMenu(true)}
                                      className=""
                                    >
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex  rounded-sm  ">
                                        <summary className="flex cursor-pointer  justify-between text-white  py-2 px-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <div className="flex cursor-pointer  gap-2">
                                            {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                            <span>Warehouse </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>

                                        <ul className="mt-2 space-y-1 bg-gray-700 px-2">
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                            <Link
                                              to={
                                                "/admin/warehouse/warehouse-management"
                                              }
                                              className="  flex gap-2  px-2 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <PiWarehouseThin className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Warehouse
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/area-management"
                                              }
                                              className="  flex gap-2  px-2 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Area Manage
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/rack-management"
                                              }
                                              className="  flex gap-2  px-2 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BsHddRack className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Rack Manage
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/self-management"
                                              }
                                              className="  flex gap-2  px-2 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <MdSelfImprovement className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Self Manage
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/warehouse/cell-management"
                                              }
                                              className="  flex gap-2  px-2 p-2 space-x-1  rounded-md"
                                            >
                                              {/* <BiSolidBellRing className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              Cell Manage
                                            </Link>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )}
                                </>
                              ) : null}
                            </li>
                            <li>
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/stock-manage"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span>Stock Request</span>}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/stock-manage"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span>Stock Check</span>}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/stock-manage"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span>Report</span>}
                              </NavLink>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}

              {/* content management */}

              {!user?.staffRole ||
                user?.permissions.find(
                  (itm) => itm?.name === "Content Management"
                ) ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(8)}
                          className="flex cursor-pointer w-full  justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <IoMdPhotos className="w-5 h-5 fill-current text-gray-400" />
                            <span>Contents </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 8 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Page Management"
                              ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/page-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <MdOutlineSubscriptions className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Page Management</span>}
                              </NavLink>
                            ) : null}

                            <li>
                              {!user?.staffRole ||
                                user?.permissions.find(
                                  (itm) => itm?.name === "Blogs"
                                ) ? (
                                <>
                                  {menu && (
                                    <li
                                      onMouseMove={() => setMenu(true)}
                                      className=""
                                    >
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex  rounded-sm  ">
                                        <summary className="flex cursor-pointer  justify-between text-white  py-2 px-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <div className="flex cursor-pointer  gap-2">
                                            {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                            <span>Blogs </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>
                                        <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={"/admin/blog/new-blog"}
                                              className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                            >
                                              {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                              New Post
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer w-full  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            {!user?.staffRole ||
                                              user?.permissions.find(
                                                (itm) => itm?.name === "Blog"
                                              ) ? (
                                              <NavLink
                                                to="/admin/blog"
                                                rel="noopener noreferrer"
                                                onMouseMove={() =>
                                                  setMenu(true)
                                                }
                                                href="#"
                                                className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                              >
                                                {/* <FaBlogger className="w-5 h-5 fill-current text-gray-400" /> */}
                                                {menu && <span>Post List</span>}
                                              </NavLink>
                                            ) : null}
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            {!user?.staffRole ||
                                              user?.permissions.find(
                                                (itm) =>
                                                  itm?.name === "Blog Category"
                                              ) ? (
                                              <NavLink
                                                onMouseMove={() =>
                                                  setMenu(true)
                                                }
                                                rel="noopener noreferrer"
                                                to="/admin/manage-blog-category"
                                                className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                              >
                                                {/* <FaUsersGear className="w-5 h-5 fill-current text-gray-400" /> */}
                                                {menu && (
                                                  <span> Category </span>
                                                )}
                                              </NavLink>
                                            ) : null}
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )}
                                </>
                              ) : null}
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/settings/site-content"}
                                className="w-full"
                              >
                                <div className=" hover:text-gray-50 flex gap-2  w-full  px-2 p-2 space-x-3  rounded-md">
                                  Site Content
                                </div>
                                {/* <MdSettings className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                              </Link>
                            </li>
                            {/* <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                <Link
                                  to={"/admin/content-management/home-control"}
                                  className="w-full"
                                >
                                  <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                    Home Control
                                  </div>
                                </Link>
                              </li> */}

                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/content-management/admin-popup"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Pop UP
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/slider"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Slider
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              {!user?.staffRole ||
                                user?.permissions.find(
                                  (itm) => itm?.name === "Faq"
                                ) ? (
                                <Link to={"/admin/faq"} className="w-full">
                                  <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                    FAQ
                                  </div>
                                </Link>
                              ) : null}
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/feature-image"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Feature Widgets
                                </div>
                              </Link>
                            </li>

                            {/* <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                  <Link
                                    to={"/admin/content-management/slider"}
                                    className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                                  >
                                    {/* <BiSlider className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                            {/* Social Links
                                  </Link>
                                </li> */}
                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Support Ticket"
                              ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/contact"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span>Contact Management</span>}
                              </NavLink>
                            ) : null}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}

              {/* notice 2 */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Notice") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(12)}
                          className="flex cursor-pointer w-full  justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <TfiAnnouncement className="w-5 h-5 fill-current text-gray-400" />
                            <span>Notice </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 12 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/content-management/seller-notice"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50   flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Notice
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={
                                  "/admin/content-management/admin-anouncement"
                                }
                                className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                              >
                                {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                Announcement
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/send-email"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
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
              ) : null}

              {/* config setting */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Settings") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(13)}
                          className="flex cursor-pointer w-full  justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <BsGear className="w-5 h-5 fill-current text-gray-400" />
                            <span> Settings </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 13 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">

                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/seller-domain"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Domain Management
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/media"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Media
                                </div>
                              </Link>
                            </li>

                            <li>
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/daraz-account-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span>Daraz Account </span>}
                              </NavLink>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/payment-management"}
                                className="w-full"
                              >
                                {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Payment Getway
                                </div>
                              </Link>
                            </li>

                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/shipping"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Courier Setup
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/settings/daraz-setup"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Daraz Api Setup
                                </div>
                              </Link>
                            </li>
                            <li>
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={`/admin/referral-program`}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span>Referral </span>}
                              </NavLink>
                            </li>

                            <li>
                              {!user?.staffRole ||
                                user?.permissions.find(
                                  (itm) => itm?.name === "Price Management"
                                ) ? (
                                <>
                                  {menu && (
                                    <li
                                      onMouseMove={() => setMenu(true)}
                                      className=""
                                    >
                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex  rounded-sm  ">
                                        <summary className="flex cursor-pointer  justify-between text-white  py-2 px-2 rounded-sm hover:bg-gray-800  hover:text-gray-50">
                                          <div className="flex cursor-pointer  gap-2">
                                            {/* <MdWarehouse className="w-5 h-5 fill-current text-gray-400" /> */}
                                            <span>Pricing </span>
                                          </div>

                                          <span className="shrink-0 transition duration-300 ">
                                            <IoIosArrowDown className="h-5 w-5" />
                                          </span>
                                        </summary>
                                        <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={"/admin/price-management"}
                                              className="w-full"
                                            >
                                              <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                                Price Management
                                              </div>
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={
                                                "/admin/manage-product/add-product"
                                              }
                                              className="w-full"
                                            >
                                              <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                                Commission
                                              </div>
                                            </Link>
                                          </li>
                                          <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                            <Link
                                              to={"/admin/package-management"}
                                              className="w-full"
                                            >
                                              <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                                Package Handle
                                              </div>
                                            </Link>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  )}
                                </>
                              ) : null}
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}
              {/* Users */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Users") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="relative">
                      <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(5)}
                          className="flex cursor-pointer w-full  justify-between  p-2 rounded-sm hover:bg-gray-800 text-white hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <BsPersonLinesFill className="w-5 h-5 fill-current text-gray-400" />

                            <span>Users</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 5 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Seller Management"
                              ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/seller-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {/* <BiCategory className="w-5 h-5 fill-current text-gray-400" /> */}
                                {menu && <span>Seller Management</span>}
                              </NavLink>
                            ) : null}

                            {!user?.staffRole ||
                              user?.permissions.find(
                                (itm) => itm?.name === "Staff Management"
                              ) ? (
                              <NavLink
                                onMouseMove={() => setMenu(true)}
                                rel="noopener noreferrer"
                                to={"/admin/staff-management"}
                                className={({ isActive }) => {
                                  return isActive
                                    ? "flex  p-2 space-x-3 rounded-sm bg-gray-800 text-white "
                                    : "flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white";
                                }}
                              >
                                {menu && <span> Staff Management</span>}
                              </NavLink>
                            ) : null}
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/subscriber-admin"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Subscriber
                                </div>
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}

              {/* config setting */}

              {/* blog end */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Report") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div className="group [&_summary::-webkit-details-marker]:hidden flex flex-col  w-full rounded-sm  ">
                        <div
                          onClick={() => handleToggle(9)}
                          className="flex cursor-pointer  justify-between w-full text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <BsLayoutTextSidebarReverse className="w-5 h-5 fill-current text-gray-400" />
                            <span>Reports </span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 9 && (
                          <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/admin-sales"}
                                className="w-full"
                              >
                                {/* <FaSalesforce className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Service
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/warehouse-admin"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Warehouse
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/seller-admin"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Shop
                                </div>
                              </Link>
                            </li>

                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={"/admin/report-management/pricing"}
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Package
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={
                                  "/admin/report-management/commission-history-admin"
                                }
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Processing
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50">
                              <Link
                                to={
                                  "/admin/report-management/commission-history-admin"
                                }
                                className="w-full"
                              >
                                <div className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Search
                                </div>
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}
              {/* end */}
              {/* notice */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Notice") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
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
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link to={"#"} className="w-full">
                                <div className="hover:text-gray-50   flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Facebook
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
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
                  )}
                </>
              ) : null}

              {/* end */}

              {/* notice */}
              {!user?.staffRole ||
                user?.permissions.find((itm) => itm?.name === "Notice") ? (
                <>
                  {menu && (
                    <li onMouseMove={() => setMenu(true)} className="">
                      <div className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col  rounded-sm  ">
                        <div
                          onClick={() => handleToggle(204)}
                          className="flex cursor-pointer w-full  justify-between text-white  p-2 rounded-sm hover:bg-gray-800  hover:text-gray-50"
                        >
                          <div className="flex cursor-pointer  gap-2">
                            <BsHeadset className="w-5 h-5 fill-current text-gray-400" />
                            <span>Help Desk</span>
                          </div>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowDown className="h-5 w-5" />
                          </span>
                        </div>

                        {openDropdownIndex == 204 && (
                          <ul className="mt-2 space-y-1 w-full px-2 border border-white border-opacity-40 py-2">
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link to={"#"} className="w-full">
                                <div className="hover:text-gray-50   flex gap-2  px-2 p-2 space-x-3  rounded-md">
                                  Live Chat
                                </div>
                              </Link>
                            </li>
                            <li className="flex cursor-pointer  justify-between  rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                              <Link
                                to={"/admin/support-ticket"}
                                className="hover:text-gray-50 flex gap-2  px-2 p-2 space-x-3  rounded-md"
                              >
                                {/* <IoNotificationsCircle className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                Tickets
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </>
              ) : null}

              <button
                rel="noopener noreferrer"
                onClick={() => logOut()}
                className="flex  p-2 space-x-3 rounded-sm hover:bg-gray-800 hover:text-white w-full"
              >
                <IoLogOut className="w-5 h-5 fill-current text-gray-400" />
                {menu && <span>Logout</span>}
              </button>
            </ul>
          </div>
        </div>
        <div className="flex  p-2 mt-12 space-x-4 justify-self-end">
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
              <span className="flex  space-x-1">
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
