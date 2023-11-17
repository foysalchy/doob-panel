import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDash, setUserDash] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const menuData = (
    <>
      <li>
        <NavLink
          href="/"
          aria-label="Our product"
          title="Our product"
          className={({ isActive }) => {
            return isActive
              ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text-lg "
              : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text-lg ";
          }}
        >
          Features
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          aria-label="Our product"
          title="Our product"
          className={({ isActive }) => {
            return isActive
              ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text-lg "
              : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text-lg ";
          }}
        >
          Product
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/price"
          aria-label="Product pricing"
          title="Product pricing"
          className={({ isActive }) => {
            return isActive
              ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text-lg "
              : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text-lg ";
          }}
        >
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          aria-label="About us"
          title="About us"
          className={({ isActive }) => {
            return isActive
              ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text-lg "
              : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text-lg ";
          }}
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          aria-label="About us"
          title="Services"
          className={({ isActive }) => {
            return isActive
              ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text-lg "
              : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text-lg ";
          }}
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          aria-label="Contact"
          title="contact"
          className={({ isActive }) => {
            return isActive
              ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text-lg "
              : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text-lg ";
          }}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/faq"
          aria-label="About us"
          title="About us"
          className={({ isActive }) => {
            return isActive
              ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text-lg "
              : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text-lg ";
          }}
        >
          F.A.Q
        </NavLink>
      </li>

    </>
  );

  return (
    <div className="fixed top-0 right-0 left-0 z-50 bg-white">
      <div className="px-4 py-5 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <NavLink
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <img className="w-32 text-black" src="../../../../Logo.png" alt="" />
            {/* <svg
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
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 ">
              SaleNow
            </span> */}
          </NavLink>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            {menuData}
            <li>
              {!user ? (
                <Link
                  to="/sign-up"
                  className="inline-flex items-center justify-center h-12 px-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Sign up
                </Link>
              ) : (
                <>
                  {
                    (user && (
                      <div className="md:hidden lg:flex">
                        <div className="relative ">
                          <button
                            onClick={() => setUserDash(!userDash)}
                            className="relative "
                          >
                            <div className="p-2 flex justify-center items-center px-4 rounded-full bg-gray-300 font-bold">
                              <p className="text-2xl text-center">{user?.name.charAt(0)}</p>
                            </div>

                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                          </button>

                          {userDash && (
                            <div
                              className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                              role="menu"
                            >
                              {(user?.role === "supperadmin" && (
                                <div method="POST" action="#" className=" p-4">
                                  <Link
                                    to="admin/dashboard"
                                    className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                    role="menuitem"
                                  >
                                    <MdDashboard className="h-4 w-4" />

                                    Dashboard
                                  </Link>
                                </div>




                              )) ||
                                (user?.role === "seller" && (
                                  <div method="POST" action="#" className=" p-4">
                                    <Link
                                      to="seller/dashboard"
                                      className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                      role="menuitem"
                                    >
                                      <MdDashboard className="h-4 w-4" />

                                      Dashboard
                                    </Link>
                                  </div>

                                ))}

                              <div className="pb-2">
                                <strong className="block px-4 text-xs font-medium uppercase text-gray-400">
                                  Danger Zone
                                </strong>

                                <div className="px-4">

                                  <button
                                    onClick={() => logOut()}
                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                    role="menuitem"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Log Out
                                  </button>
                                </div>

                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </>
              )}
            </li>
          </ul>

          <div className="lg:hidden flex items-center gap-1">
            {!user ? (
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center py-1.5 px-4  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </Link>
            ) : (

              <>
                {
                  (user && (
                    <div className="md:hidden lg:flex">
                      <div className="relative ">
                        <button
                          onClick={() => setUserDash(!userDash)}
                          className="relative "
                        >
                          <div className="p-2 flex justify-center items-center px-4 rounded-full bg-gray-300 font-bold">
                            <p className="text-2xl text-center">{user?.name.charAt(0)}</p>
                          </div>

                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        </button>

                        {userDash && (
                          <div
                            className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                            role="menu"
                          >
                            {(user?.role === "supperadmin" && (
                              <div method="POST" action="#" className=" p-4">
                                <Link
                                  to="admin/dashboard"
                                  className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                  role="menuitem"
                                >
                                  <MdDashboard className="h-4 w-4" />

                                  Dashboard
                                </Link>
                              </div>




                            )) ||
                              (user?.role === "seller" && (
                                <div method="POST" action="#" className=" p-4">
                                  <Link
                                    to="seller/dashboard"
                                    className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                    role="menuitem"
                                  >
                                    <MdDashboard className="h-4 w-4" />

                                    Dashboard
                                  </Link>
                                </div>

                              ))}

                            <div className="pb-2">
                              <strong className="block px-4 text-xs font-medium uppercase text-gray-400">
                                Danger Zone
                              </strong>

                              <div className="px-4">

                                <button
                                  onClick={() => logOut()}
                                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                  role="menuitem"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Log Out
                                </button>
                              </div>

                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </>
            )}



            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >

              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-0 z-10 left-0 w-full">
                <div className="p-6 bg-white border rounded shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <NavLink
                        to="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <img className="w-32" src="../../../../Logo.png" alt="" />
                      </NavLink>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">{menuData}</ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
