import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideNavAdmin from "../Pages/Dashboard/SideNavAdmin/SideNavAdmin";
import { AiTwotoneHome } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import {
      BsBasket,
      BsBox2,
      BsBoxSeam,
     
} from "react-icons/bs";
const AdminLayout = () => {
      const location = useLocation();
      const [responsive, setResponsive] = useState(false);
      const paths = location.pathname.split("/").filter((path) => path !== "");
      function convertToTitleCase(str) {
            return str
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
      }

      return (
            <div>
                  <div className="flex fixed w-screen bar overflow-hidden h-full bg-[#f0f2f5]">
                        <div className=" h-full  z-50   text-white ">
                              <SideNavAdmin responsive={responsive} setResponsive={setResponsive} />
                        </div>
                        <style>{`
                
                              .mobilenav{
                                    position: fixed;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    margin: 0; 
                                    z-index: 99;
                              } `}
                        </style>
                        <div className="px-4 py-4 w-full bar overflow-y-scroll  ">
                              <div>
                              <nav
                                    aria-label="breadcrumb"
                                    className="w-full mobilenav  lg:hidden rounded p-4 mb-4 bg-gray-800 text-gray-100"
                              >
                                          <ol className="flex h-8 space-x-2 items-center flex">
                                                <li className="md:hidden block" style={{flex:'1'}}>
                                                      <button
                                                            onClick={() => setResponsive(!responsive)}
                                                            className="py-2"
                                                      >
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 512 512"
                                                                  className="w-6 h-6 fill-current text-gray-100"
                                                            >
                                                                  <rect width="352" height="32" x="80" y="96"></rect>
                                                                  <rect width="352" height="32" x="80" y="240"></rect>
                                                                  <rect width="352" height="32" x="80" y="384"></rect>
                                                            </svg>
                                                      </button>
                                                </li>
                                                <li className="md:hidden block" style={{flex:'1'}}>
                                                      <Link
                                                            rel="noopener noreferrer"
                                                            to="/admin/stock-manage"
                                                            title="Back to homepage"
                                                            className="hover:underline"
                                                      >
                                                            <BsBoxSeam className="w-6 h-6 pr-1 text-gray-400" />
                                                      </Link>
                                                </li>
                                                <li className="md:hidden block" style={{flex:'1'}}>
                                                      <Link
                                                            rel="noopener noreferrer"
                                                            to="/admin/dashboard"
                                                            title="Back to homepage"
                                                            className="hover:underline"
                                                      >
                                                            <AiTwotoneHome className="w-6 h-6 pr-1 text-gray-400" />
                                                      </Link>
                                                </li>
                                                <li className="md:hidden block" style={{flex:'1'}}>
                                                      <Link
                                                            rel="noopener noreferrer"
                                                            to="/admin/manage-product"
                                                            title="Back to homepage"
                                                            className="hover:underline"
                                                      >
                                                            <BsBox2 className="w-6 h-6 pr-1 text-gray-400" />
                                                      </Link>
                                                </li>
                                                <li className="md:hidden block" style={{flex:'1'}}>
                                                      <Link
                                                            rel="noopener noreferrer"
                                                            to="/admin/doob-order-management"
                                                            title="Back to homepage"
                                                            className="hover:underline"
                                                      >
                                                            <BsBasket className="w-6 h-6 pr-1 text-gray-400" />
                                                      </Link>
                                                </li>
                                                 
                                          </ol>
                                    </nav>
                              </div>
                              <div className="flex-1 sm:p-0 pb-24">
                                    <Outlet />
                              </div>
                        </div>
                        {/* <div className='fixed  right-0 '>
                    <MiniSideberAdmin />
                </div> */}
                  </div>
            </div>
      );
};

export default AdminLayout;
