import React, { useContext, useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../../Logo.png";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import CategoryListSm from "./CategoryListSm";
import { useQuery } from "@tanstack/react-query";

import {

      BsShop,
} from "react-icons/bs";

const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [userDash, setUserDash] = useState(false);
      const { user, logOut, search, setSearch,shopInfo } = useContext(AuthContext);
      
      const [on, setOn] = useState(false);
      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
            const handleScroll = () => {
                  const offset = window.scrollY;
                  if (offset > 80) {
                        setScrolled(true);
                  } else {
                        setScrolled(false);
                  }
            };

            window.addEventListener('scroll', handleScroll);

            // Clean up the event listener
            return () => {
                  window.removeEventListener('scroll', handleScroll);
            };
      }, []);

      // Inside your component

      const { data: pages = [], refetch } = useQuery({
            queryKey: ["faqs"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/pages-front");
                  const data = await res.json();
                  return data;
            },
      });



      const solutions = pages?.length && pages?.filter((itm) => itm?.page == "solution").filter((itm) => itm?.status == true);
      const marketings = pages?.length && pages?.filter((itm) => itm?.page == "marketing").filter((itm) => itm?.status == true);


      const [dropdowns, setDropdowns] = useState({
            solution: false,
            marketing: false,
      });
      const location = useLocation();

      useEffect(() => {
            // Example effect when location changes
            // Reset dropdowns when location changes
            setDropdowns({
                  solution: false,
                  marketing: false,
            });
      }, [location]);
      const marketingDropdownRef = useRef(null);
      const solutionDropdownRef = useRef(null);

      // Function to handle dropdown toggle
      const toggleDropdown = (dropdownId) => {
            setDropdowns(prevState => {
                  const newState = {};
                  Object.keys(prevState).forEach(key => {
                        newState[key] = key === dropdownId ? !prevState[key] : false;
                  });
                  return newState;
            });
      };

      // Handle clicks outside of dropdowns
      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (marketingDropdownRef.current && !marketingDropdownRef.current.contains(event.target)) {
                        if (dropdowns.marketing) {
                              toggleDropdown('marketing');
                        }
                  }
                  if (solutionDropdownRef.current && !solutionDropdownRef.current.contains(event.target)) {
                        if (dropdowns.solution) {
                              toggleDropdown('solution');
                        }
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, [dropdowns]);


      const menuData = (
            <>
                  <li>
                        <NavLink
                              to="/products"
                              onClick={() => setIsMenuOpen(false)}
                              aria-label="Our product"
                              title="Our product"
                              className={({ isActive }) => {
                                    return isActive
                                          ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8   "
                                          : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8   ";
                              }}
                        >
                              Product
                        </NavLink>
                  </li>


                  <li className="relative" ref={solutionDropdownRef}>
                        <button
                              onClick={() => toggleDropdown('solution')}
                              className={`tracking-wide  text-gray-800 transition-colors duration-200 font-semibold flex items-center gap-2 ${dropdowns.solution ? 'border-b-[1.5px] border-black' : ''} underline-offset-8`}
                        >
                              Solution {solutions?.length ? <span>
                                    {!dropdowns.solution ? <FaAngleDown /> :
                                          <FaAngleUp />}
                              </span> : ''}
                        </button>
                        {solutions?.length && dropdowns.solution ? (
                              <div
                                    className={`${dropdowns.solution ? 'h-auto opacity-100' : 'h-0 opacity-0'
                                          } w-[200px] mt-1 border border-black border-opacity-40 rounded bar overflow-hidden transition-all duration-300 absolute top-[32px] left-0 z-[1000]`}
                              >
                                    <ul className="bg-gray-100 shadow-xl w-full p-2">
                                          {solutions.map((solution) => (
                                                <li key={solution._id} onClick={() => setIsMenuOpen(false)}>
                                                      <Link
                                                            to={`/pages/${solution._id}`}
                                                            className="block text-gray-700 hover:text-white hover:bg-gray-900 py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                                                      >
                                                            {solution.title}
                                                      </Link>
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        ) : null}
                  </li>

                  <li className="relative" ref={marketingDropdownRef}>
                        <button
                              onClick={() => toggleDropdown('marketing')}
                              className={`tracking-wide  text-gray-800 transition-colors duration-200 font-semibold flex items-center gap-2 ${dropdowns.marketing ? 'border-b-[1.5px] border-black' : ''} underline-offset-8`}
                        >
                              Marketing {marketings?.length ? <span>
                                    {!dropdowns.marketing ? <FaAngleDown /> :
                                          <FaAngleUp />}
                              </span> : ''}
                        </button>
                        {marketings?.length && dropdowns.marketing ? (
                              <div
                                    className={`${dropdowns.marketing ? 'h-auto opacity-100' : 'h-0 opacity-0'
                                          } w-[200px] mt-1 border border-black border-opacity-40 rounded bar overflow-hidden transition-all duration-300 absolute top-[32px] left-0 z-[1000]`}
                              >
                                    <ul className="bg-gray-100 shadow-xl w-full p-2">
                                          {marketings.map((marketing) => (
                                                <li key={marketing._id}>
                                                      <Link
                                                            to={`/pages/${marketing._id}`}
                                                            className="block text-gray-700 hover:text-white hover:bg-gray-900 py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                                                      >
                                                            {marketing.title}
                                                      </Link>
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        ) : null}
                  </li>

                  <li>
                        <NavLink
                              to="/services"
                              onClick={() => setIsMenuOpen(false)}
                              aria-label="About us"
                              title="Services"
                              className={({ isActive }) => {
                                    return isActive
                                          ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text- "
                                          : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text- ";
                              }}
                        >
                              Services
                        </NavLink>
                  </li>



                  <li>
                        <NavLink
                              to="/price"
                              onClick={() => setIsMenuOpen(false)}
                              aria-label="Product pricing"
                              title="Product pricing"
                              className={({ isActive }) => {
                                    return isActive
                                          ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black underline underline-offset-8 text- "
                                          : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black hover:underline underline-offset-8 text- ";
                              }}
                        >
                              Pricing
                        </NavLink>
                  </li>
                  <li>
                        <NavLink
                              to="/blogs"
                              onClick={() => setIsMenuOpen(false)}
                              aria-label="turorial"
                              title="turorial  "
                              className={({ isActive }) => {
                                    return isActive
                                          ? "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black border-b pb-2 border-black text- "
                                          : "tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black  text- ";
                              }}
                        >
                              Learn
                        </NavLink>
                  </li>

            </>
      );

      return (
            <div className={scrolled ? 'navbar scrolled fixed top-0 border-b right-0 left-0 z-50 bg-white' : 'fixed top-0 border-b right-0 left-0 z-50 bg-white'}>
                  <div className=" sm:max-w-xl mx-auto md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <div className="px-4 md:py-2  py-2 relative flex mx-auto  items-center justify-between">
                              <div className="flex gap-1">
                                    <NavLink
                                          to="/"
                                          aria-label="Company"
                                          title="Company"
                                          className="inline-flex items-center"
                                    >
                                          <img className="w-32 text-black" src={Logo} srcSet={Logo} alt="" />

                                    </NavLink>
                                    <ul className="flex items-center hidden space-x-8 ml-10 lg:flex">
                                          {menuData}
                                    </ul>
                              </div>
                              <ul className="flex items-center hidden gap-3 justify-right lg:flex">


                                    <li>


                                          {!user ? (
                                                <div
                                                      to="/sign-in"
                                                      aria-label="Sign up"
                                                      title="Sign up"
                                                >
                                                      <Link to={"/sign-in"} className="tracking-wide text-gray-800 transition-colors duration-200 font-semibold hover:text-black  text- "> Sign In</Link>
                                                </div>
                                          ) : (
                                                <>

                                                </>
                                          )}
                                    </li>
                                    <li>


                                          {!user ? (
                                                <div
                                                      to="/sign-in"
                                                      aria-label="Sign up"
                                                      title="Sign up"
                                                >
                                                      <Link to={"/sign-up"} className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-black bg-gray-800 focus:shadow-outline focus:outline-none"> Sign Up For Free</Link>
                                                </div>
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
                                                                                    {console.log(shopInfo?.favicon,'useruser')}
                                                                                    {shopInfo?.favicon ? (
                                                                                    <div style={{height:'50px'}} className="p-2 flex justify-center items-center px-4 rounded-full bg-gray-300 font-bold">
                                                                                       
                                                                                                <img style={{width:'20px'}} src={shopInfo?.favicon} alt="" />
                                                                                                </div>
                                                                                          ):(
                                                                                                <div className="p-2 flex justify-center items-center px-4 rounded-full bg-gray-300 font-bold">
                                                                                                <p className="text-2xl capitalize text-center">{user?.name.charAt(0)}</p>
                                                                                        
                                                                                       
                                                                                    </div>
  )}
                                                                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0">

                                                                                    </span>
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

                                                                                                            <Link
                                                                                                                  to="/seller/shop-profile"
                                                                                                                  className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                                                                                                  role="menuitem"
                                                                                                            >
                                                                                                                  <BsShop className="h-4 w-4" />
                                                                                                                  Shop Profile
                                                                                                            </Link>
                                                                                                      </div>

                                                                                                )) ||
                                                                                                (user?.role === "user" && (
                                                                                                      <div method="POST" action="#" className=" p-4">
                                                                                                            <Link
                                                                                                                  to="user/dashboard"
                                                                                                                  className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                                                                                                  role="menuitem"
                                                                                                            >
                                                                                                                  <MdDashboard className="h-4 w-4" />

                                                                                                                  Dashboard
                                                                                                            </Link>
                                                                                                      </div>

                                                                                                ))

                                                                                          }

                                                                                          <div className="pb-2 px-2 flex w-full items-center justify-center ">

                                                                                                <div className="px-4 w-full mt-3">

                                                                                                      <button
                                                                                                            onClick={() => logOut()}
                                                                                                            className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-green-50"
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
                                                to="/sign-in"
                                                className="inline-flex items-center justify-center py-1.5 px-4  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                                                aria-label="Sign up"
                                                title="Sign up"
                                          >
                                                Sign in
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
                                                                              {shopInfo?.favicon ? (
                                                                                    <div style={{height:'50px'}} className="p-2 flex justify-center items-center px-4 rounded-full bg-gray-300 font-bold">
                                                                                       
                                                                                                <img style={{width:'20px'}} src={shopInfo?.favicon} alt="" />
                                                                                                </div>
                                                                                          ):(
                                                                                                <div className="p-2 flex justify-center items-center px-4 rounded-full bg-gray-300 font-bold">
                                                                                                <p className="text-2xl capitalize text-center">{user?.name.charAt(0)}</p>
                                                                                        
                                                                                       
                                                                                    </div>
  )}

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


                                                                                          <div className="px-4">

                                                                                                <button
                                                                                                      onClick={() => logOut()}
                                                                                                      className="flex w-full items-center gap-2 rounded-lg px-4 mt-2 py-2 text-sm text-red-700 hover:bg-red-50"
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
                                          <div className="absolute  top-0 z-10 left-0 bottom-0 bg-white right-0 w-screen h-screen">
                                                <div className=" bg-white border rounded shadow">
                                                      <div className="flex items-center justify-between mb-4 bg-black py-2 pt-4">
                                                            {/* <div>
                      <NavLink
                        to="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <img className="w-32" src={Logo} srcSet={Logo} alt="" />
                      </NavLink>
                    </div> */}
                                                            <div className="">
                                                                  <button
                                                                        aria-label="Close Menu"
                                                                        title="Close Menu"
                                                                        className="p-2 -mt-2 -mr-2 transition duration-200 flex  gap-4 items-center rounded  text-white"
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                  >
                                                                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                                              <path
                                                                                    fill="currentColor"
                                                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                                              />
                                                                        </svg>
                                                                        Back To Home Page
                                                                  </button>
                                                            </div>
                                                      </div>
                                                      <nav className={``}>
                                                            <div className="flex items-center justify-between border-b ">
                                                                  <button className={`${on ? 'bg-white' : 'bg-gray-100 border-b border-blue-700'} text-center  p-2  w-full`} onClick={() => setOn(!on)}>
                                                                        Menu
                                                                  </button>
                                                                  <button className={`${on ? 'bg-gray-100 border-b border-blue-700' : 'bg-white'} text-center  p-2  w-full`} onClick={() => setOn(!on)}>
                                                                        Category
                                                                  </button>
                                                            </div>

                                                            <div className="">
                                                                  {
                                                                        on ? <CategoryListSm setOn={setIsMenuOpen} /> : <ul className="space-y-4 pt-3 border-r px-2  ">{menuData}</ul>
                                                                  }
                                                            </div>
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
