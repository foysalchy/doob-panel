import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BiHomeAlt } from "react-icons/bi";
import { BsFillPinMapFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoLogIn, IoSettings } from "react-icons/io5";
import {
  MdMenu,
  MdOutlineFavoriteBorder,
  MdOutlineShoppingCart
} from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ShopAuthProvider } from "../../../AuthProvider/ShopAuthProvide";
import CategorieItems from "./categorieItems";

const ShopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);
  const shopId = idMatch ? idMatch[1] : null;

  const { shopUser, logOut, shop_id } = useContext(ShopAuthProvider);
  // console.log("🚀 ~ file: ShopNav.jsx:32 ~ ShopNav ~ shop_id:", shop_id);

  // const {} = useContext()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [value, setValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchData = async () => {
    const term = searchTerm;
    console.log(shop_id);

    try {
      const response = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/search`,
        {
          method: "POST",
          body: JSON.stringify({ shop_id: shop_id.shop_id, term }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      setSearchResults(data.data);
      setSearchHistory([]);

      // Update the context with the current search term
      // setSearch(term);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    // console.log(input);
    setValue(input);
    setSearchTerm(input);
    setSearchResults();
    // setSearch(input);
    fetch("https://backend.doob.com.bd/api/v1/shop/search-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shop_id: shop_id.shop_id, term: input }),
    })
      .then((response) => response.json())
      .then((data) => setSearchHistory(data));
  };

  const { data: categories = [], refetch: reload } = useQuery({
    queryKey: ["ShopCategories"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/category/get/${shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  const {
    data: shop = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["shop"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/${shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      if (!shopUser) {
        const productData = localStorage.getItem("addToCart");
        setCartProducts(JSON.parse(productData));
      } else {
        fetch(
          `https://backend.doob.com.bd/api/v1/shop/user/add-to-cart?userId=${shopUser?._id}&shopId=${shop_id?.shop_id}&token=${shopUser?._id}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCartProducts(data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    };

    const timeoutId = setTimeout(fetchData, 1000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, [shopUser, shop_id, cartProducts]);

  return (
    <div className="shadow-xl">
      <Helmet>
        <title>{shop?.shopName}</title>
        {/* <meta name="description" content={description} /> */}
        <meta name="keywords" content={shop?.shopName} />
        <meta property="og:title" content={shop?.shopName} />
        {/* <meta property="og:description" content={description} /> */}
        <meta property="og:image" content={shop?.logo} />
        <meta property="twitter:card" content={shop?.logo} />
        <meta property="twitter:title" content={shop?.shopName} />
        {/* <meta property="twitter:description" content={description} /> */}
        <meta property="twitter:image" content={shop?.logo} />
      </Helmet>
      <div className="px-4 py-5 hidden lg:block mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className=" font-semibold flex gap-1 items-center">
            <Link to={`/shop/${shopId}`} aria-label="Company" title="Company">
              <img
                srcSet={shop?.logo}
                className="w-[170px] h-[50px] object-cover"
                src={shop?.logo}
                alt=""
              />
            </Link>

            <div className="relative group">
              <div className="bg-gray-100 px-4 font-[400] flex items-center gap-2 py-2 rounded-md cursor-pointer">
                <MdMenu /> All Category
              </div>
              <div className="group-hover:block hidden absolute top-full left-0 bg-white px-4 py-2 rounded-lg border z-30 shadow w-[240px]">
                <ul className="flex items-start flex-col gap-3">
                  {categories.length &&
                    categories?.map((i, index) => (
                      <li key={index} className="">
                        <Link
                          className="flex items-center gap-2 break-words"
                          to={`/shop/${shopId}/categories/${shop_id.shop_id}/${i?.name}`}
                        >
                          <img
                            className="h-4 w-4 rounded text-gray-400 filter grayscale brightness-90 object-cover"
                            src={i?.img}
                            srcSet={i?.img}
                            alt=""
                          />
                          <p className="font-[400] break-words capitalize text-md whitespace-no-wrap">
                            {i?.name}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <ul className="w-[320px]">
            <div className=" mx-4 relative w-[400px] md:flex hidden items-center px-1 py-1 border bg-gray-100 rounded-md">
              <input
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full pl-4  bg-gray-100 outline-none h-full"
                placeholder="Search......"
                type="search"
              />
              <button
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                onClick={searchData}
              >
                Search
              </button>
              {!value == "" && (
                <div className="bg-white w-full left-0 border border-gray-500 rounded border-opacity-50 absolute top-[52px] z-[1000] p-3">
                  {/* Display search history suggestions */}
                  {searchHistory.length ? (
                    <div className="mt-4 w-full">
                      <div className="flex flex-wrap justify-center gap-2  border-b-black">
                        {searchHistory.slice(0, 10).map((item, index) => (
                          <button
                            className="border-2 text-sm px-2 rounded-2xl "
                            onClick={() => setSearchTerm(item.term)}
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
                  {/* Display search results */}
                  {
                    <div className="mt-4 max-h-[400px] overflow-y-auto ">
                      <ul>
                        {searchResults?.length &&
                          searchResults?.map((product, index) => (
                            <li key={index}>
                              <Link
                                onClick={() => {
                                  setSearchHistory(false), setSearchHistory();
                                }}
                                to={`/shop/${shopId}/product/${product._id}`}
                                className="text-black  mb-2 flex items-center gap-2"
                                key={index}
                              >
                                <img
                                  src={
                                    product?.featuredImage.src ??
                                    product.images[0].src
                                  }
                                  className="w-[30px] h-[30px]"
                                />
                                {product?.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  }
                </div>
              )}
            </div>
          </ul>
          <ul className="flex items-center  space-x-8 lg:flex">
            <li>
              <Link
                to={`/shop/${shopId}/track-order`}
                aria-label="Sign up"
                title="Sign up"
                className="flex items-center gap-2"
              >
                <div className="inline-flex items-center bg-gray-900 w-[30px] h-[30px] p-2 rounded-full justify-center ">
                  <BsFillPinMapFill className="text-white " />
                </div>
                Track Order
              </Link>
            </li>
            <li>
              <Link
                to={`/shop/${shopId}/user/cart`}
                aria-label="Sign up"
                className="flex items-center gap-2"
                title="Sign up"
              >
                <div className="inline-flex items-center bg-gray-900 w-[30px] h-[30px] p-2 rounded-full justify-center relative">
                  <PiShoppingCartSimpleBold className=" text-white" />
                  <div className="text-whitex bg-[red] absolute text-[12px] px-1 rounded-full top-[-10px] left-[18px]">
                    {cartProducts?.length}
                  </div>
                </div>
                My Cart
              </Link>
            </li>
            <li>
              {!shopUser ? (
                <Link
                  to={`/shop/${shopId}/sign-in`}
                  className="px-6 py-1 rounded duration-200 hover:bg-[black] flex items-center gap-2 hover:text-white text-black"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  <IoLogIn className="text-xl" /> Login
                </Link>
              ) : (
                <div>
                  <div className="relative inline-block">
                    {/* Dropdown toggle button */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="relative z-10 text-gray-700 bg-white border border-transparent rounded-full dark:text-white focus:border-blue-500 focus:ring-opacity-40  h-[30px] w-[30px] dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none flex items-center justify-center"
                    >
                      <FaUser className="m-auto" />
                      {/* {shopUser?.name.slice(0, 1)} */}
                    </button>

                    {/* Dropdown menu */}
                    <div
                      className={`absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 ${
                        isOpen ? "block" : "hidden"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Link
                        to={`/shop/${shopId}/user/my-profile`}
                        className="flex justify-center items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <CgProfile className="w-5 h-5 mx-1" />
                        <span className="mx-1">View Profile</span>
                      </Link>
                      <Link
                        to={`/shop/${shopId}/user/my-orders`}
                        className="flex mx-auto items-center px-10 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <MdOutlineFavoriteBorder className="w-5  h-5 mx-1" />
                        <span className="mx-1">My Orders</span>
                      </Link>

                      <a
                        href="#"
                        className="flex mx-auto items-center px-10 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <IoSettings className="w-5 h-5 mx-1" />
                        <span className="mx-1">Settings</span>
                      </a>

                      <hr className="border-gray-200 dark:border-gray-700" />

                      <a
                        href="#"
                        className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                          className="w-5 h-5 mx-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                        <span className="mx-1">Help</span>
                      </a>

                      <button
                        onClick={() => logOut()}
                        className="flex justify-center w-full items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <FaSignOutAlt className="w-5 h-5 mx-1" />
                        <span className="mx-1">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* {
                searchOpen && <div className=" fixed left-0 right-0 flex flex-col items-center justify-center top-0 h-screen bg-[#0c0c0cd6] z-[800]">
                    <form className="bg-white p-2 shadow-xl flex  items-center gap-2 w-[90%] mx-auto shadow-[#8080805c] rounded ring-1 ring-gray-100">
                        <BiSearch className='text-lg' />
                        <input className='focus:outline-none w-full bg-transparent' type="text" placeholder='Search...' />
                        <CgClose onClick={() => setSearchOpen(!searchOpen)} className='text-lg' />
                    </form>
                </div>
            } */}
      {isMenuOpen && (
        <CategorieItems
          setIsMenuOpen={setIsMenuOpen}
          shopId={shopId}
          categories={categories}
        />
      )}
      <div className="block lg:hidden">
        <div className="fixed  left-0 right-0 bottom-0  px-4 py-3 flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 cursor-pointer z-[2000]">
          <div>
            <Link
              className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
              to={`/shop/salenow`}
            >
              <div className="flex flex-col items-center justify-center">
                <BiHomeAlt className="text-[28px]" />
                <div className="text-xs text-gray-400">Home</div>
              </div>
            </Link>
          </div>

          <div className="relative group">
            {/* categories */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  ></path>
                </svg>
                <div className="text-xs text-gray-400">Category</div>
              </div>
            </button>
          </div>
          <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 relative z-[2000]">
            <Link to={`/shop/${shopId}/user/cart`}>
              <span className="absolute bg-red px-2 bg-[red] rounded-full  text-white text-[11px] left-4 -top-2">
                {" "}
                {cartProducts?.length}
              </span>
              <MdOutlineShoppingCart className="text-2xl " />
              <div className="text-xs text-gray-400">Cart</div>
            </Link>
          </div>
          <Link
            to={`/shop/${shopId}/user/my-profile`}
            className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="text-xs text-gray-400">Profile</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopNav;
