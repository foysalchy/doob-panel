import { useContext, useEffect, useRef, useState } from "react";
import { BiCart } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import { MdDashboard, MdLocationSearching } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Logo.png";
import { AuthContext } from "../AuthProvider/UserProvider";
import CategoryListSm from "../Pages/Components/Header/CategoryListSm";
import { useQuery } from "@tanstack/react-query";

export default function Component() {
      const { search, user, setSearch, logOut, setSearchQuery,shopInfo } = useContext(AuthContext);
      const [searchTerm, setSearchTerm] = useState("");
      const [searchResults, setSearchResults] = useState([]);
      const [searchHistory, setSearchHistory] = useState([]);
      const [value, setValue] = useState("");
      const [userDash, setUserDash] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [on, setOn] = useState(false);
      const [dropdowns, setDropdowns] = useState({});
      const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                  searchData();
            }
      };




      const navigate = useNavigate()
      const searchData = async () => {
            const term = searchTerm;
            setSearchQuery(term)
            setSearch(term);
            setSearchHistory([]);
            navigate('/products/search')

      };
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


      const handleInputChange = (e) => {
            const input = e.target.value;

            setValue(input);
            setSearchTerm(input);
            setSearchResults([]);
            setSearch(input);
            fetch(
                  `https://doob.dev/api/v1/admin/search-history?term=${encodeURIComponent(
                        input
                  )}`
            )
                  .then((response) => response.json())
                  .then((data) => setSearchHistory(data));
      };
      const [cardItem, setCardItem] = useState([]);

      useEffect(() => {
            // Function to update the cart from localStorage
            const updateCartFromLocalStorage = () => {
                  const myCard = localStorage.getItem(`cart-product-${user?._id}`);
                  if (myCard) {
                        const parsedCart = JSON.parse(myCard);
                        setCardItem(parsedCart);
                  }
            };

            // Initial call to update the cart
            updateCartFromLocalStorage();

            // Set interval to check for updates every millisecond (not recommended for performance reasons)
            const interval = setInterval(() => {
                  updateCartFromLocalStorage();
            }, 1);

            // Cleanup function to clear the interval
            return () => clearInterval(interval);
      }, []);

      const toggleDropdown = (dropdownId) => {
            setDropdowns((prevState) => {
                  const newState = {};

                  // Close all dropdowns except the one being toggled
                  Object.keys(prevState).forEach((key) => {
                        newState[key] = key === dropdownId ? !prevState[key] : false;
                  });

                  return {
                        ...newState,
                        [dropdownId]: !prevState[dropdownId] || false,
                  };
            });
      };

      const menuData = (
            <>
                  <li className=" ">
                        <NavLink
                              to="/products"
                              onClick={() => setIsMenuOpen(false)}
                              aria-label="Our product"
                              title="Our product"
                              className={` w-full ${({ isActive }) => {
                                    return isActive
                                          ? "tracking-wide text-gray-800 transition-colors duration-200 w-full font-semibold hover:text-black underline underline-offset-8   "
                                          : "tracking-wide text-gray-800 transition-colors duration-200 w-full font-semibold hover:text-black hover:underline underline-offset-8   ";
                              }}`}
                        >
                              <div className="w-full ">Product</div>
                        </NavLink>
                  </li>

                  <li className="relative">
                        <button
                              onClick={() => toggleDropdown("solution")}
                              className="tracking-wide   text-gray-800 transition-colors duration-200 font-semibold hover:text-black  underline-offset-8 flex items-center gap-2"
                        >
                              Solution <FaAngleDown />
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

                  <li className="relative">
                        <button
                              onClick={() => toggleDropdown("marketing")}
                              className="tracking-wide   text-gray-800 transition-colors duration-200 font-semibold hover:text-black  underline-offset-8 flex items-center gap-2"
                        >
                              Marketing <FaAngleDown />
                        </button>
                        {marketings?.length && dropdowns.marketing ? (
                              <div
                                    className={`${dropdowns.marketing ? 'h-auto opacity-100' : 'h-0 opacity-0'
                                          } w-[200px] mt-1 border border-black border-opacity-40 rounded bar overflow-hidden transition-all duration-300 absolute top-[32px] left-0 z-[1000]`}
                              >
                                    <ul className="bg-gray-100 shadow-xl w-full p-2">
                                          {marketings.map((marketing) => (
                                                <li key={marketing._id} onClick={() => setIsMenuOpen(false)}>
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

                  <li onClick={() => setIsMenuOpen(false)}>
                        <NavLink
                              to="/services"
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
                              onClick={() => setIsMenuOpen(false)}
                              to="/blogs"
                              aria-label="Product pricing"
                              title="Product pricing"
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


      const [open_search, setOpen_search] = useState(false);

      useEffect(() => {

            fetch(
                  `https://doob.dev/api/v1/admin/search-history?term=${encodeURIComponent(
                        value
                  )}`
            )
                  .then((response) => response.json())
                  .then((data) => setSearchHistory(data));

      }, [searchHistory?.length > 0]);

      const searchBoxRef = useRef(null);

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                        setOpen_search(false); // Close the dropdown
                  }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, [searchBoxRef]);




      return (
            <div className="bg-white shadow-md">
                  <div className="flex items-center justify-between max-w-7xl mx-auto py-2 px-8">
                        <NavLink
                              to="/"
                              aria-label="Company"
                              title="Company"
                              className="inline-flex items-center"
                        >
                              <img className="w-32 text-black" src={Logo} srcSet={Logo} alt="" />
                        </NavLink>
                        <div ref={searchBoxRef} className=" mx-4 relative w-[500px] md:flex hidden items-center px-1 py-1 border bg-gray-100 rounded-md">
                              <input
                                    value={searchTerm}
                                    onClick={() => setOpen_search(true)}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                    className="w-full pl-4  bg-gray-100 outline-none h-full"
                                    placeholder="Search.."
                                    type="search"
                              />
                              <button
                                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                                    onClick={searchData}
                              >
                                    Search
                              </button>


                              <div className="">
                                    {(searchHistory.length && open_search) ? (
                                          <div className=" bg-white w-full left-0 border border-gray-500 border-opacity-20 rounded absolute top-[52px] z-[1000] p-3 max-h-[400px] bar overflow-y-auto">
                                                <div className="flex flex-col text-start justify-start gap-2">
                                                      {searchHistory.slice(0, 10).map((item, index) => (
                                                            <button
                                                                  className="text-sm text-start px-2 rounded-2xl "
                                                                  onClick={() => { setSearchTerm(item.term), searchData() }}
                                                                  key={item.term + index}
                                                            >
                                                                  {item.term}
                                                            </button>
                                                      ))}
                                                </div>
                                          </div>
                                    ) : (
                                          ""
                                    )}



                              </div>

                        </div>
                        <div className="flex items-center space-x-4">
                              <Link
                                    to={`/products/admin-track-order`}
                                    className="text-black hover:text-gray-700"
                                    href="#"
                              >
                                    <MdLocationSearching className="text-xl" />
                              </Link>

                              <Link
                                    to={"/products/my-card"}
                                    className="relative mx-auto bg-white border hover:bg-gray-200 p-2 rounded-md w-fit h-fit"
                              >
                                    <BiCart className="text-2xl" />
                                    <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">
                                          {cardItem.length}
                                    </span>
                              </Link>

                              {!user ? (
                                    <Link
                                          to="/sign-in"
                                          className="inline-flex items-center justify-center h-12 px-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                                          aria-label="Sign up"
                                          title="Sign up"
                                    >
                                          LogIn
                                    </Link>
                              ) : (
                                    <>
                                          {user && (
                                                <div className="md:hidden lg:flex">
                                                      <div className="relative flex items-center gap-2 ">
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



                                                            {isMenuOpen && (
                                                                  <div className="fixed left-0 top-0 h-screen w-full bg-[white] z-10 ">
                                                                        <div className=" bg-white border rounded shadow">
                                                                              <div className="flex items-center justify-between mb-4 bg-black py-2 pt-4">

                                                                                    <div className="">
                                                                                          <button
                                                                                                aria-label="Close Menu"
                                                                                                title="Close Menu"
                                                                                                className="p-2 -mt-2  -mr-2 transition duration-200 flex  gap-4 items-center rounded  text-white"
                                                                                                onClick={() => setIsMenuOpen(false)}
                                                                                          >
                                                                                                <svg
                                                                                                      className="w-5 text-gray-600"
                                                                                                      viewBox="0 0 24 24"
                                                                                                >
                                                                                                      <path
                                                                                                            fill="currentColor"
                                                                                                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                                                                      />
                                                                                                </svg>
                                                                                                Back To Home Page....
                                                                                          </button>
                                                                                    </div>
                                                                              </div>
                                                                              <nav className={``}>
                                                                                    <div className="flex items-center justify-between border-b ">
                                                                                          <button
                                                                                                className={`${on
                                                                                                      ? "bg-white"
                                                                                                      : "bg-gray-100 border-b border-blue-700"
                                                                                                      } text-center  p-2  w-full`}
                                                                                                onClick={() => setOn(!on)}
                                                                                          >
                                                                                                Menu
                                                                                          </button>
                                                                                          <button
                                                                                                className={`${on
                                                                                                      ? "bg-gray-100 border-b border-blue-700"
                                                                                                      : "bg-white"
                                                                                                      } text-center  p-2  w-full`}
                                                                                                onClick={() => setOn(!on)}
                                                                                          >
                                                                                                Category
                                                                                          </button>
                                                                                    </div>

                                                                                    <div className="">
                                                                                          {on ? (
                                                                                                <CategoryListSm setOn={setIsMenuOpen} />
                                                                                          ) : (
                                                                                                <ul className="space-y-4 pt-3 border-r px-2  ">
                                                                                                      {menuData}
                                                                                                </ul>
                                                                                          )}
                                                                                    </div>
                                                                              </nav>
                                                                        </div>
                                                                  </div>
                                                            )}

                                                            {userDash && (
                                                                  <div
                                                                        className="absolute top-12 end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                                                        role="menu"
                                                                  >
                                                                        {(user?.role === "supperadmin" && (
                                                                              <div method="POST" action="#" className=" p-4">
                                                                                    <Link
                                                                                          to="/admin/dashboard"
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
                                                                                                to="/seller/dashboard"
                                                                                                className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                                                                                role="menuitem"
                                                                                          >
                                                                                                <MdDashboard className="h-4 w-4" />
                                                                                                Dashboard
                                                                                          </Link>
                                                                                    </div>
                                                                              )) ||
                                                                              (user?.role === "user" && (
                                                                                    <div method="POST" action="#" className=" p-4">
                                                                                          <Link
                                                                                                to="/user/dashboard"
                                                                                                className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                                                                                role="menuitem"
                                                                                          >
                                                                                                <MdDashboard className="h-4 w-4" />
                                                                                                Dashboard
                                                                                          </Link>
                                                                                    </div>
                                                                              ))}

                                                                        <div className="pb-2 px-2">
                                                                              <strong className="block px-4 text-xs font-medium uppercase text-gray-400"></strong>

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
                                          )}
                                    </>
                              )}
                              <button
                                    aria-label="Open Menu"
                                    title="Open Menu"
                                    className="p-2 md:hidden block -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
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
                        </div>
                  </div>
            </div>
      );
}
