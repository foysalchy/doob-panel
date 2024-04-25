import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiSolidTraffic, BiSolidUser } from "react-icons/bi";
import { FaPersonArrowUpFromLine, FaSalesforce } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
const Starts = () => {
  const { data: newUsers = [], refetch } = useQuery({
    queryKey: ["newUser"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/previous-week-users"
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: orderData = [], reload } = useQuery({
    queryKey: ["orderData"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/get-shop-all-order`
      );
      const data = await res.json();
      return data.data;
    },
  });

  // seller data
  const [showSeller, setShowSeller] = useState(false);
  const { data: sellerData = [] } = useQuery({
    queryKey: ["sellerData"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/seller"
      );
      const data = await res.json();
      return data;
    },
  });

  function sumObjectPrices(objects) {
    let totalPrice = 0;
    for (let i = 0; i < objects.length; i++) {
      totalPrice += objects[i].price;
    }
    return totalPrice;
  }

  const totalAmount = sumObjectPrices(orderData);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/products"
      );
      const data = await res.json();
      return data;
    },
  });

  const topSel = products.sort((a, b) => {
    return (b.total_sales || 0) - (a.total_sales || 0);
  });

  console.log(topSel, "topSel");

  return (
    <div>
      <div className="hidden ">
        <div className=" pt-6 2xl:container">
          <div>
            <div className="block lg:flex  p-5 flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Total Orders
                        </h5>
                        <span className="font-bold text-xl">
                          {orderData.length}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                          <BiSolidTraffic />
                        </div>
                      </div>
                    </div>
                    {/* <p className="text-sm text-blueGray-500 mt-4">
                                            <span className="text-emerald-500 mr-2">
                                                <i className="fas fa-arrow-up" /> 3.48%
                                            </span>
                                            <span className="whitespace-nowrap">Since last month</span>
                                        </p> */}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto px-4 py-2">
                    <div className="flex ">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Top 10 Seller
                        </h5>
                        <button
                          onClick={() => setShowSeller(true)}
                          className="text-blue-500"
                        >
                          view
                        </button>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                          <BiSolidUser />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* seller modal */}
              <div>
                <div
                  onClick={() => setShowSeller(false)}
                  className={`fixed z-[100] flex items-center justify-center ${showSeller ? "visible opacity-100" : "invisible opacity-0"
                    } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                >
                  <div
                    onClick={(e_) => e_.stopPropagation()}
                    className={`text- absolute w-[600px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${showSeller
                        ? "scale-1 opacity-1 duration-300"
                        : "scale-0 opacity-0 duration-150"
                      }`}
                  >
                    <main>
                      <h1 className="font-semibold border-b pb-3">
                        Top 10 Seller
                      </h1>
                      <ul>
                        <li className="grid grid-cols-3 items-center gap-4 py-2 border-b border-gray-500">
                          <span className="w-full text-sm">Name</span>
                          <span className="w-full text-sm">Shop Name</span>
                          <span className="w-full text-sm">Email</span>
                        </li>
                        {sellerData &&
                          sellerData?.slice(0, 10).map((itm) => (
                            <li
                              className="grid grid-cols-3 gap-4 py-2 border-b border-gray-400 text-sm text-gray-500"
                              key={itm?._id}
                            >
                              <div className="text-nowrap w-full text-xs text-start">
                                {itm?.name}
                              </div>
                              <div className="text-nowrap w-full text-xs text-start">
                                {itm?.shopName}
                              </div>
                              <div className="w-full text-xs text-start">
                                <p className="text-xs">{itm?.email}</p>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </main>{" "}
                    <br />
                    <div className="flex justify-between">
                      <button
                        onClick={() => setShowSeller(false)}
                        className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* end seller modal */}

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 h-[100px] break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Total Amount
                        </h5>
                        <span className="font-bold text-xl">{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex ">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          NEW USERS
                        </h5>
                        <span className="font-bold text-xl">
                          {newUsers?.newUsersCount
                            ? newUsers?.newUsersCount
                            : 0}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                          <BiSolidUser />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-500 mt-1">
                      <span
                        className={
                          !newUsers?.percentageChange > 0
                            ? "text-red-500 mr-2"
                            : "text-green-500 mr-2"
                        }
                      >
                        <i className="fas fa-arrow-down" />{" "}
                        {newUsers?.percentageChange}%
                      </span>
                      <span className="whitespace-nowrap">
                        Since last weeks
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* card 1 */}
        <div className="bg-[#1caf12] p-4 h-[140px] rounded-md flex items-center justify-between">
          <div>
            <h1 className="text-gray-100 ">Total Order</h1>
            <h1 className="text-white font-bold text-4xl ">
              {orderData.length}
            </h1>
          </div>
          <div>
            <div className="w-[60px] h-[60px] bg-[green] rounded-full flex items-center justify-center">
              <LuShoppingCart className="text-white text-3xl" />
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="bg-[#f3b121] p-4 h-[140px] rounded-md flex items-center justify-between">
          <div>
            <h1 className="text-gray-100 ">Total Amount Sold</h1>
            <h1 className="text-white font-bold text-4xl ">{totalAmount}</h1>
          </div>
          <div>
            <div className="w-[60px] h-[60px] bg-[#d76d21] rounded-full flex items-center justify-center">
              <TbMoneybag className="text-white text-3xl" />
            </div>
          </div>
        </div>
        {/* card 3 */}
        <div className="bg-[#1b4ffa] p-4 h-[140px] rounded-md flex items-center justify-between">
          <div>
            <h1 className="text-gray-100 ">New Users</h1>
            <p className="text-sm text-white mt-1">
              <small
                className={
                  !newUsers?.percentageChange > 0
                    ? "text-red-500 mr-2"
                    : "text-green-500 mr-2"
                }
              >
                <i className="fas fa-arrow-down" /> {newUsers?.percentageChange}
                %
              </small>
              <span className="whitespace-nowrap">Since last week</span>
            </p>
            <h1 className="text-white font-bold text-4xl ">
              {newUsers?.newUsersCount ? newUsers?.newUsersCount : 0}
            </h1>
          </div>
          <div>
            <div className="w-[60px] h-[60px] bg-[#2682fa] rounded-full flex items-center justify-center">
              <TbUsers className="text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* dashboard table */}
      <section className="py-1 bg-blueGray-50 mt-8">
        <div className=" ">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-bold text-base  text-blueGray-700">
                    Top 10 Seller
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Shop Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sellerData &&
                    sellerData?.slice(0, 10).map((item, index) => (
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}{" "}
                          {/* Assuming there's a name property in your data */}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {item?.name ? item?.name : "empty"}{" "}
                          {/* Assuming there's a name property in your data */}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item?.shopName ? item?.shopName : "empty"}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item?.email ? item?.email : "empty"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* dashboard top 20 selling items table */}
      <section className="py-1 bg-blueGray-50 mt-8">
        <div className=" ">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-bold text-base  text-blueGray-700">
                    Top 20 selling products
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Image
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sellerData &&
                    products?.slice(0, 20).map((item, index) => (
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}{" "}
                          {/* Assuming there's a name property in your data */}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          <img
                            src={`${item?.featuredImage?.src}`}
                            className="w-[60px] h-[60px] rounded-md"
                          />
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-nowrap whitespace-nowrap p-4">
                          {item?.name ? item?.name : "empty"}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item?.price ? item?.price : 0}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Starts;
