import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideNavAdmin from "../Pages/Dashboard/SideNavAdmin/SideNavAdmin";
import { AiTwotoneHome } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";

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
                        <div className="px-4 py-8 w-full bar overflow-y-scroll  ">
                              <div>
                                    <nav
                                          aria-label="breadcrumb"
                                          className="w-full rounded p-4 mb-4 bg-gray-800 text-gray-100"
                                    >
                                          <ol className="flex h-8 space-x-2">
                                                <li className="md:hidden block">
                                                      <button
                                                            onClick={() => setResponsive(!responsive)}
                                                            className="py-2"
                                                      >
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 512 512"
                                                                  className="w-5 h-5 fill-current text-gray-100"
                                                            >
                                                                  <rect width="352" height="32" x="80" y="96"></rect>
                                                                  <rect width="352" height="32" x="80" y="240"></rect>
                                                                  <rect width="352" height="32" x="80" y="384"></rect>
                                                            </svg>
                                                      </button>
                                                </li>
                                                <li className="flex items-center">
                                                      <Link
                                                            rel="noopener noreferrer"
                                                            to="/admin/dashboard"
                                                            title="Back to homepage"
                                                            className="hover:underline"
                                                      >
                                                            <AiTwotoneHome className="w-5 h-5 pr-1 text-gray-400" />
                                                      </Link>
                                                </li>
                                                {paths.slice(1).map((path, index) => (
                                                      <li
                                                            className="flex items-center space-x-2"
                                                            key={index + path}
                                                      >
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 32 32"
                                                                  aria-hidden="true"
                                                                  fill="currentColor"
                                                                  className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-600"
                                                            >
                                                                  <path d="M32 30.031h-32l16-28.061z"></path>
                                                            </svg>

                                                            <Link
                                                                  rel="noopener noreferrer"
                                                                  to={`/${paths.slice(0, index + 2).join("/")}`}
                                                                  className="flex items-center px-1 capitalize hover:underline"
                                                            >
                                                                  {convertToTitleCase(path)}
                                                            </Link>
                                                      </li>
                                                ))}
                                          </ol>
                                    </nav>
                              </div>
                              <div className="flex-1 sm:p-0">
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
