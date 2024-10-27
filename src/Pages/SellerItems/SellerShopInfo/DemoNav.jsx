import React, { useContext } from 'react';
import { AiFillFileAdd, AiOutlineHome } from 'react-icons/ai';
import { BiArchive, BiBookContent, BiCategoryAlt } from 'react-icons/bi';
import { BsTicket } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { ImBlog } from 'react-icons/im';
import { IoIosArrowDown } from 'react-icons/io';
import { IoLogOut, IoShareSocialSharp, IoStorefront } from 'react-icons/io5';
import { MdContactSupport, MdDomain, MdOutlineAddCircleOutline, MdOutlineIntegrationInstructions, MdOutlineManageSearch } from 'react-icons/md';
import { SiCloudflarepages, SiPagekit } from 'react-icons/si';
import { RiChatSmile2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import Logo from "../../../assets/doobLightLogo.png";
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
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { CgClose } from 'react-icons/cg';

const DemoNav = ({ responsive, setResponsive }) => {

      const { logOut } = useContext(AuthContext);

      return (
            <div className='py-2'>
                  <style jsx>{`
        .space-y-1{
        width:95%}
        }
      `}</style>

                  <div className={`${responsive
                        ? "flex h  h-screen  bar overflow-y-auto  flex-col  md:p-3 p-0 lg:w-[70px] md:w-[70px] w-0  border-r-2  "
                        : "flex flex-col  p-6 md:w-64 w-[300px]  h-screen  bar overflow-y-auto"
                        } md:relative fixed  z-[5000] bg-[#111827] top-0 left-0 bottom-0 nv`}>
                        <div className="space-y-3">




                              <>
                                    <div >
                                          <ul className="pt-2 pb-4 space-y-1 text-sm">
                                                <li className='flex items-center p-2 space-x-3 rounded-md'>
                                                      <img className="w-32" src={Logo} srcSet={Logo} alt="" />
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
                                                </li>

                                                <li className="rounded-sm  hover:bg-gray-800">
                                                      <button to={'/seller/dashboard'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                            <AiOutlineHome className="w-5 h-5 fill-current text-gray-400" />

                                                            <span>Dashboard</span>
                                                      </button>
                                                </li>
                                                <li className="rounded-sm">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm  ">
                                                            <summary className="flex cursor-pointer items-center justify-between  p-2 rounded-sm hover:bg-gray-800 text-gray-50" >
                                                                  <div className='flex cursor-pointer items-center gap-2'>
                                                                        <ImBlog className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Products</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 px-4">
                                                                  <div className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Products
                                                                  </div>
                                                                  <div className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Doob Products
                                                                  </div>
                                                                  <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Add Product
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Add Doob Product
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Add Daraz Product
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between py-2 p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Woo Product
                                                                  </li>

                                                                  <li className="bg-[#1b202ea1]">
                                                                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm">
                                                                              <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <span>Category</span>
                                                                                    </div>
                                                                                    <span className="shrink-0 transition duration-300">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </summary>

                                                                              <ul className="mt-2 space-y-1 px-2 border border-gray-500">
                                                                                    <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                          Mega Category
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                          Sub Category
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                          Mini Category
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between text-xs py-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                          Extra Category
                                                                                    </li>
                                                                              </ul>
                                                                        </details>
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>

                                                <li className="rounded-sm">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm">
                                                            <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                        <BsBasket className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Orders</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>

                                                            <ul className="mt-2 space-y-1 p-2 border border-[gray] bg-[#1b202ea1]">
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Manage Orders
                                                                        </div>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Claim Return
                                                                        </div>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Claim List
                                                                        </div>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Doob Orders
                                                                        </div>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Review
                                                                        </div>
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>

                                                <li className="rounded-sm">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden flex flex-col rounded-sm">
                                                            <summary className="flex cursor-pointer justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer gap-2">
                                                                        <BsBoxSeam className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Inventory</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>

                                                            <ul className="mt-2 space-y-1 px-2 border border-white border-opacity-40 py-2">
                                                                  <li className="bg-[#1b202ea1]">
                                                                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm">
                                                                              <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <span>Warehouse</span>
                                                                                    </div>
                                                                                    <span className="shrink-0 transition duration-300">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </summary>

                                                                              <ul className="mt-2 space-y-1 px-2 border border-gray-500">
                                                                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                          Warehouse Manage
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                          Area Manage
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                          Rack Manage
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                          Self Manage
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                          Cell Manage
                                                                                    </li>
                                                                              </ul>
                                                                        </details>
                                                                  </li>

                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 p-2 space-x-3">
                                                                        Stock Request
                                                                  </li>

                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 p-2 space-x-3">
                                                                        Stock Check
                                                                  </li>

                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 p-2 space-x-3">
                                                                        Report
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li className="rounded-sm">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm">
                                                            <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                        <BsPrinter className="w-5 h-5 text-gray-400" />
                                                                        <span>POS</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                  <li className="flex items-center px-2 p-2 space-x-3 rounded-md hover:bg-gray-800 text-gray-50">
                                                                        Sale
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm">
                                                                        Order
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm">
                                                                        Customer Report
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li className="rounded-sm">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm">
                                                            <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                        <BsWindowPlus className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Contents</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>

                                                            <ul className="mt-2 space-y-1 px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm">
                                                                        Pages
                                                                  </li>
                                                                  <li className="bg-[#1b202ea1]">
                                                                        <details className="group [&_summary::-webkit-details-marker]:hidden flex items-center rounded-sm">
                                                                              <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                                    <div className="flex cursor-pointer items-center gap-2">
                                                                                          <span>Blogs</span>
                                                                                    </div>
                                                                                    <span className="shrink-0 transition duration-300">
                                                                                          <IoIosArrowDown className="h-5 w-5" />
                                                                                    </span>
                                                                              </summary>
                                                                              <ul className="mt-2 px-4 border border-gray-500">
                                                                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 py-2 space-x-3 text-sm">
                                                                                          Post
                                                                                    </li>
                                                                                    <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm">
                                                                                          Category
                                                                                    </li>
                                                                              </ul>
                                                                        </details>
                                                                  </li>
                                                                  <li className="flex cursor-pointer p-2 items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Brand Manage
                                                                  </li>
                                                                  <li className="flex cursor-pointer p-2 items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Frame Management
                                                                  </li>
                                                                  <li className="flex cursor-pointer p-2 items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Popup Manage
                                                                  </li>
                                                                  <li className="flex cursor-pointer p-2 items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Promo Code
                                                                  </li>
                                                                  <li className="flex cursor-pointer p-2 items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Home Slider
                                                                  </li>
                                                                  <li className="flex cursor-pointer p-2 items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        Feature Widgets
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50 px-2 p-2 space-x-3 text-sm">
                                                                        Add Contact
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li className="rounded-sm">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden w-full items-center rounded-sm">
                                                            <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                        <BsCalculator className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Finance</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>

                                                            <ul className="mt-2 space-y-1 px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                  <>
                                                                        <li className="rounded-sm hover:bg-gray-800 p-2 space-x-3">
                                                                              <span>Package</span>
                                                                        </li>
                                                                        <li className="rounded-sm hover:bg-gray-800 p-2 space-x-3">
                                                                              <span>Ledger</span>
                                                                        </li>
                                                                        <li className="rounded-sm hover:bg-gray-800 p-2 space-x-3">
                                                                              <span>Payment Request</span>
                                                                        </li>
                                                                        <li className="rounded-sm hover:bg-gray-800 p-2 space-x-3">
                                                                              <span>Service</span>
                                                                        </li>
                                                                        <li className="flex cursor-pointer items-center p-2 justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                              <span>Price Role</span>
                                                                        </li>
                                                                  </>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li className="">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden w-full items-center rounded-sm">
                                                            <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                        <BsLayoutTextSidebarReverse className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Report Management</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Fee
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Sales
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Search
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                              Warehouse
                                                                        </span>
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li className="">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden w-full items-center rounded-sm">
                                                            <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                        <BsGear className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Settings</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">
                                                                  <li className="flex cursor-pointer justify-between rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                                                        <span className="w-full text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 rounded-md">
                                                                              Facebook Pixel
                                                                        </span>
                                                                  </li>
                                                                  <li className="rounded-sm hover:bg-gray-800">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Shop Profile
                                                                        </span>
                                                                  </li>

                                                                  <li className="rounded-sm hover:bg-gray-800">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Addon Domain
                                                                        </span>
                                                                  </li>

                                                                  <li>
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Channel Integration
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center p-2 justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Payment Integration
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center p-2 justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Shipping Integration
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center p-2 justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Pos Payment Getaway
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center p-2 justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Social Login
                                                                        </span>
                                                                  </li>
                                                                  <li className="flex cursor-pointer items-center p-2 justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Email
                                                                        </span>
                                                                  </li>
                                                                  <li className="rounded-sm hover:bg-gray-800">
                                                                        <span className="w-full text-gray-50 flex items-center p-2 space-x-3 rounded-md">
                                                                              Media
                                                                        </span>
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <>
                                                      <li className="">
                                                            <details className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col rounded-sm">
                                                                  <summary className="flex cursor-pointer w-full justify-between text-white p-2 rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                                        <div className="flex cursor-pointer gap-2">
                                                                              <BsPersonLinesFill className="w-5 h-5 text-gray-400" />
                                                                              <span>Users</span>
                                                                        </div>
                                                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                              <IoIosArrowDown className="h-5 w-5" />
                                                                        </span>
                                                                  </summary>
                                                                  <ul className="mt-2 space-y-1 w-full px-2 border border-white border-opacity-40 py-2">
                                                                        <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                              <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                    Customers
                                                                              </div>
                                                                        </li>
                                                                        <li className="flex cursor-pointer items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                              <div className="text-gray-50 flex gap-2 items-center px-2 p-2 space-x-3 text-sm rounded-md">
                                                                                    Subscribers
                                                                              </div>
                                                                        </li>
                                                                        <li className="rounded-sm hover:bg-gray-800">
                                                                              <div className="flex items-center p-2 space-x-3 rounded-md">
                                                                                    <span>Staff</span>
                                                                              </div>
                                                                        </li>
                                                                  </ul>
                                                            </details>
                                                      </li>
                                                </>
                                                <>
                                                      <li className="">
                                                            <details className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col rounded-sm">
                                                                  <summary className="flex cursor-pointer w-full justify-between text-white p-2 rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                                        <div className="flex cursor-pointer gap-2">
                                                                              <TfiAnnouncement className="w-5 h-5 fill-current text-gray-400" />
                                                                              <span>Marketing</span>
                                                                        </div>
                                                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                              <IoIosArrowDown className="h-5 w-5" />
                                                                        </span>
                                                                  </summary>
                                                                  <ul className="mt-2 space-y-1 w-full px-2 border border-white border-opacity-40 py-2">
                                                                        <li className="flex cursor-pointer p-2 items-center justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                              <div className="w-full">Campaign</div>
                                                                        </li>
                                                                        <li className="flex cursor-pointer items-center p-2 justify-between rounded-sm hover:bg-gray-800 text-gray-50">
                                                                              <div className="w-full">Email</div>
                                                                        </li>
                                                                  </ul>
                                                            </details>
                                                      </li>
                                                </>
                                                <li className="rounded-sm">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden items-center rounded-sm">
                                                            <summary className="flex cursor-pointer items-center justify-between p-2 rounded-sm hover:bg-gray-800 text-gray-50">
                                                                  <div className="flex cursor-pointer items-center gap-2">
                                                                        <BsHeadset className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Support</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 px-2 bg-[#1b202ea1] border border-gray-500 py-2 border-opacity-50">

                                                                  <li className="rounded-sm hover:bg-gray-800 text-gray-50 p-2">
                                                                        Support Ticket
                                                                  </li>

                                                                  <li className="rounded-sm hover:bg-gray-800 text-gray-50 p-2">
                                                                        User Support Ticket
                                                                  </li>

                                                            </ul>
                                                      </details>
                                                </li>
                                                <li className="">
                                                      <details className="group [&_summary::-webkit-details-marker]:hidden w-full flex flex-col rounded-sm">
                                                            <summary className="flex cursor-pointer w-full justify-between text-white p-2 rounded-sm hover:bg-gray-800 hover:text-gray-50">
                                                                  <div className="flex cursor-pointer gap-2">
                                                                        <RiChatSmile2Line className="w-5 h-5 fill-current text-gray-400" />
                                                                        <span>Omni Chat</span>
                                                                  </div>
                                                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                        <IoIosArrowDown className="h-5 w-5" />
                                                                  </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 w-full px-2 border border-white border-opacity-40 py-2">
                                                                  <li className="flex cursor-pointer justify-between rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                                                        <div className="w-full flex gap-2 px-2 p-2 space-x-3 rounded-md">
                                                                              Facebook
                                                                        </div>
                                                                  </li>
                                                                  <li className="flex cursor-pointer justify-between rounded-sm hover:bg-gray-800 hover:text-gray-50 text-white">
                                                                        <div className="w-full flex gap-2 px-2 p-2 space-x-3 rounded-md">
                                                                              Daraz
                                                                        </div>
                                                                  </li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li onClick={logOut} className="mt-2 space-y-1 px-2 bg-[#1b202ea1]  border-gray-500 py-2 ">

                                                      <div className="flex cursor-pointer gap-2">
                                                            <RiLogoutBoxRLine className="w-5 h-5 fill-current text-gray-400" />
                                                            <span>Log Out</span>
                                                      </div>

                                                </li>



                                          </ul>
                                    </div>

                              </>



                        </div>



                  </div>
            </div >
      );
};

export default DemoNav;
