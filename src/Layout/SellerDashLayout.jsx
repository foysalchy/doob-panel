import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/UserProvider";
import SideNavberSeller from "../Pages/Dashboard/SellerDashboard/SideNavberSeller/SideNavberSeller";
import {
       
      BsBasket,
      BsBox2,
      BsPersonLinesFill
     
} from "react-icons/bs";

const SellerDashLayout = () => {
      const { user, shopInfo, setCookie, setShopInfo } = useContext(AuthContext);

      const [responsive, setResponsive] = useState(false);

      const location = useLocation();
      const paths = location.pathname.split("/").filter((path) => path !== "");

      function convertToTitleCase(str) {
            return str
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
      }

      const [services, setServices] = useState(true);
      const { data: prices = {}, refetch } = useQuery({
            queryKey: ["subscriptionModal"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();
                  return data?.data?.result;
            },
      });

      const originalDate = user?.createdAt;
      const formattedDate = new Date(originalDate);

      // Calculate the time difference in milliseconds
      const timeDifference = new Date() - formattedDate;

      // Convert milliseconds to days
      const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      const time =
            (prices?.timeDuration === "Monthly" && 30) ||
            (prices?.timeDuration === "Yearly" && 365) ||
            (prices?.timeDuration === "Weekly" && 7) ||
            (prices?.timeDuration === "Daily" && 1) ||
            (prices?.timeDuration === "Lifetime" && 1000000000000000000000000000000);

      localStorage.setItem("checkingPayment", daysPassed);

      useEffect(() => {
            const getTime = localStorage.getItem("checkingPayment");


            const checkAndUpdateStatus = () => {
                  // Your logic for updating status, setting services, and logging out
                  if (daysPassed > time) {

                        // updateStatus(false);
                        setServices(false);
                  }
            };

            // Check and update status immediately when the component mounts
            checkAndUpdateStatus();

            // Calculate the time until the next day
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            const timeUntilNextDay = tomorrow - now;

            // Set up an interval to run the checkAndUpdateStatus function every day
            const intervalId = setInterval(() => {
                  checkAndUpdateStatus();
            }, timeUntilNextDay);

            // Clean up the interval when the component is unmounted
            return () => clearInterval(intervalId);
      }, []); // Empty dependency array to run the effect only once when the component mounts

      const updateStatus = (status) => {
            fetch(
                  `https://doob.dev/api/v1/seller/update-shopInfo-for-status?id=${shopInfo._id}&status=${status}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {


                        if (data.modifiedCount > 0) {
                              setShopInfo(data.data);
                              setCookie("SellerShop", JSON.stringify(data.data));
                        }
                        refetch();
                  });
      };

      return (
            <div className="flex w-screen h-screen bar overflow-y-auto bg-[#f1f5f0]">
                  <div className=" h-full z-50  text-white">
                        <SideNavberSeller
                              responsive={responsive}
                              setResponsive={setResponsive}
                        />
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
                  <div className="md:px-4 md:py-5 py-0 pb-[100px] md:pb-[20px] w-full bar overflow-y-scroll ">
                        <div className="">
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
                                                            className="w-5 h-5 fill-current text-gray-100"
                                                      >
                                                            <rect width="352" height="32" x="80" y="96"></rect>
                                                            <rect width="352" height="32" x="80" y="240"></rect>
                                                            <rect width="352" height="32" x="80" y="384"></rect>
                                                      </svg>
                                                </button>
                                          </li>
                                          <li className="flex items-center"style={{flex:'1'}}>
                                                <Link
                                                      rel="noopener noreferrer"
                                                      to={"/seller/shop-profile"}
                                                      title="Back to homepage"
                                                      className="hover:underline"
                                                >
                                                    <BsPersonLinesFill className="w-5 h-5 text-gray-400" />
                                                </Link>
                                          </li>
                                          <li className="flex items-center" style={{flex:'1'}}>
                                                <Link
                                                      rel="noopener noreferrer"
                                                      to="/seller/dashboard"
                                                      title="Back to homepage"
                                                      className="hover:underline"
                                                >
                                                      <svg
                                                      style={{padding:'0'}}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="w-5 h-5 pr-1 text-gray-400"
                                                      >
                                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                                      </svg>
                                                </Link>
                                          </li>
                                          <li className="flex items-center" style={{flex:'1'}}>
                                                <Link
                                                      rel="noopener noreferrer"
                                                      to={"/seller/orders/manage-order"}
                                                      title="Back to homepage"
                                                      className="hover:underline"
                                                >
                                                         <BsBasket className="w-5 h-5 fill-current text-gray-400" />
                                                </Link>
                                          </li>
                                          <li className="flex items-center" style={{flex:'1'}}>
                                                <Link
                                                      rel="noopener noreferrer"
                                                      to={"/seller/product-management/manage"}
                                                      title="Back to homepage"
                                                      className="hover:underline"
                                                >
                                                        <BsBox2 className="w-5 h-5 fill-current text-gray-400" />
                                                </Link>
                                          </li>
                                          
                                    </ol>
                              </nav>
                        </div>
                        <div
                              className={`bg-[#f0f2f5] flex-1 w-full  lg:px-8   p-4 sm:p-0`}
                        >
                              <Outlet />
                        </div>
                  </div>
            </div>
      );
};

export default SellerDashLayout;
