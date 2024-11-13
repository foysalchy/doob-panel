import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { FaArrowDown, FaBangladeshiTakaSign, FaEquals } from "react-icons/fa6";
import AnouncementContent from "./AdminContent/AnouncementContent";
import NoticeContent from "./AdminContent/NoticeContent";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SellerPopUp from "./SellerPopUp";
import { Link } from "react-router-dom";
import { LuSwitchCamera } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import EditInventory from "../../SellerItems/Inventory/EditInventory";
import { PiStorefrontLight } from "react-icons/pi";
import showAlert from "../../../Common/alert";
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
const SellerDashboard = () => {

      const { user, shopInfo, setCheckUpData } = useContext(AuthContext);
      const [greeting, setGreeting] = useState("");
      const currentDate = new Date();
      const [open, setOpen] = useState(false);
      const [openAnouncement, setOpenAnouncement] = useState(false);
      useEffect(() => {
            const currentHour = new Date().getHours();

            const getCurrentTime = () => {
                  console.log(currentHour >= 20 || currentHour < 5, currentHour);

                  if (currentHour >= 5 && currentHour < 12) {
                        setGreeting("Good morning");
                  } else if (currentHour >= 12 && currentHour < 15) {
                        setGreeting("Good noon");
                  } else if (currentHour >= 15 && currentHour < 17) {
                        setGreeting("Good afternoon");
                  } else if (currentHour >= 17 && currentHour < 20) {
                        setGreeting("Good evening");
                  } else if (currentHour >= 20 || currentHour < 5) {
                        setGreeting("Happy Nightfall");
                  } else {
                        setGreeting("Good evening");
                  }
            };

            getCurrentTime();
      }, []);

      const options = { month: "long", day: "numeric", year: "numeric" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);

      const {
            data: sellerPopupData = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: "sellerPopupData",
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/pop-up`);
                  const data = await res.json();
                  return data?.data;
            },
      });
      const [selectedDate, setSelectedDate] = useState(null);
      const [showDatePicker, setShowDatePicker] = useState(false);

      const handleButtonClick = () => {
            setShowDatePicker(!showDatePicker);
      };

      const { data: shopCredential = {}, isLoading: itemLoad } = useQuery({
            queryKey: ["shopCredential"],
            queryFn: async () => {
                  try {
                        const res = await fetch(
                              `https://doob.dev/api/v1/shop/firebase/${shopInfo.shopId}`
                        );
                        const data = await res.json();
                        return data;
                  } catch (error) {
                        throw error; // Rethrow the error to mark the query as failed
                  }
            },
      });


      const { data: noticeInfo = [] } = useQuery({
            queryKey: "sliderInfo",
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/slider`);
                  const data = await res.json();
                  return data?.data;
            },
      });


      const [showModal, setShowModal] = useState(false);

      const [popup, setPopUp] = useState(true);

      useEffect(() => {
            const lastModalShownTimestamp = localStorage.getItem("lastClosedTime");
            if (lastModalShownTimestamp) {
                  const lastShownTime = new Date(parseInt(lastModalShownTimestamp));
                  const currentTime = new Date();
                  const timeDifference = currentTime.getTime() - lastShownTime.getTime();
                  const hoursDifference = timeDifference / (1000 * 3600); // Convert milliseconds to hours

                  if (hoursDifference >= 5) {
                        setPopUp(true); // More than 5 hours, set popup to true
                  } else {
                        setPopUp(false); // Less than 5 hours, set popup to false
                  }
            }
      }, []);

      const onClose = () => {
            setShowModal(false);
            setPopUp(false);
            localStorage.setItem("isModalOpen", false);
            localStorage.setItem("lastClosedTime", Date.now());

            setTimeout(() => {
                  setShowModal(true);
                  localStorage.setItem("isModalOpen", true);
            }, 4 * 60 * 60 * 1000); // 4 hours in milliseconds
      };

      const { data: orderData = [] } = useQuery({
            queryKey: ["orderData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const {
            data: darazShop = [],

            refetch: darazShopRefetch,
      } = useQuery({
            queryKey: ["darazShopBd"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/seller-daraz-accounts?id=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data[0];
            },
      });

      const {
            data: previousAccount = [],
            isLoading: loading,
            refetch: reload,
      } = useQuery({
            queryKey: ["previousAccount"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/daraz/get-privious-account?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const switchAccount = (previous_id) => {
            const current_id = darazShop._id
            fetch(
                  `https://doob.dev/api/v1/daraz/switching-your-daraz?id=${previous_id}&loginId=${current_id}`,
                  {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                  }
            )
                  .then((response) => response.json())
                  .then((data) => {
                        console.log(data);
                        if (data.status === true) {
                              showAlert("Account Switched", "", "success");
                              darazShopRefetch();
                              reload();

                        }
                        else {
                              BrightAlert(data.message, "", "warning");
                        }
                  });
      };



      const [selectedAccount, setSelectedAccount] = useState("");
      const handleChange = (event) => {
            const selectedOldId = event.target.value;
            setSelectedAccount(selectedOldId);
            switchAccount(selectedOldId);
            darazShopRefetch();
            reload();
            // window.location.reload();
      };

      const { data: products = [] } = useQuery({
            queryKey: ["products"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/all-products/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const { data: orders = [] } = useQuery({
            queryKey: ["sellerOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const { data: withdrawHistory = [] } = useQuery({
            queryKey: ["my-withdrawHistory"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/withdraw-for-shop?shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const { data: orders_admin = [] } = useQuery({
            queryKey: ["orders_admin"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-my-order?shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const [totalAllTotalPrices, setTotalAllTotalPrices] = useState(0);

      useEffect(() => {
            // Calculate the total of all total prices
            const total = orders_admin.reduce((acc, order) => {
                  return (
                        acc +
                        (order.price + parseInt(order.commission) + parseInt(order.handling))
                  );
            }, 0);
            setTotalAllTotalPrices(total);
      }, [orders]);

      const total_request_amount = withdrawHistory.reduce(
            (acc, withdraw) => acc + withdraw.amount,
            0
      );

      const currentAvailableAmount =
            parseInt(totalAllTotalPrices) - parseInt(total_request_amount);

      const { data: productData = [] } = useQuery({
            queryKey: ["productData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/all-products/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const getStatus = (quantity, product_Low_alert) => {
            console.log(product_Low_alert, quantity);
            const lowAlert = product_Low_alert ? parseInt(product_Low_alert) : null;

            if (quantity <= 0) {
                  return {
                        text: "Stock Out",
                        color: "text-red-500",
                        icon: <FaExclamationCircle />,
                  };
            } else if (quantity <= (lowAlert !== null ? lowAlert : 10)) {
                  return {
                        text: "Lowest Stock",
                        color: "text-orange-500",
                        icon: <FaArrowDown />,
                  };
            } else if (quantity <= (lowAlert !== null ? lowAlert : 50)) {
                  return {
                        text: "Average Stock",
                        color: "text-yellow-500",
                        icon: <FaEquals />,
                  };
            } else {
                  return {
                        text: "Good Stock",
                        color: "text-green-500",
                        icon: <FaCheckCircle />,
                  };
            }
      };

      const filteredProducts =
            productData?.length &&
            productData?.filter((product) => {
                  const lowStockWarning = product?.low_stock_warning
                        ? parseInt(product.low_stock_warning)
                        : null;
                  const stockQuantity = product.stock_quantity;

                  const selectedFilter = "Lowest Stock";

                  switch (selectedFilter) {
                        case "all":
                              return true; // Include all products
                        case "Good Stock":
                              return stockQuantity > (lowStockWarning ? lowStockWarning + 50 : 50);
                        case "Average Stock":
                              return (
                                    stockQuantity <= (lowStockWarning ? lowStockWarning + 50 : 50) &&
                                    lowStockWarning &&
                                    lowStockWarning > 10
                              );
                        case "Lowest Stock":
                              return (
                                    stockQuantity <= (lowStockWarning ? lowStockWarning : 10) &&
                                    stockQuantity > 0
                              );
                        case "Stock Out":
                              return stockQuantity <= 0;
                        default:
                              return true; // Default to include all products
                  }
            });

      const firstAmount = parseInt(currentAvailableAmount);

      const {
            data: prices = [],
            isLoading: loadingPrice,
            refetch: refetchPrice,
      } = useQuery({
            queryKey: ["subscriptionModalData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data?.data;
            },
      });
      const check_expired = () => {
            const paymentDate = new Date(shopInfo?.paymentDate);
            const currentDate = new Date();

            const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
            const SEVEN_DAYS_IN_MILLISECONDS = 7 * MILLISECONDS_IN_A_DAY;

            // Calculate the time difference in milliseconds
            const timeDifference = currentDate.getTime() - paymentDate.getTime();

            // Check if the current date is within 7 days of the payment date
            const isWithinFreeTrial = timeDifference < SEVEN_DAYS_IN_MILLISECONDS;

            // Calculate remaining and passed days if `prices.orderInfo` is available
            if (prices.orderInfo) {
                  const remainingDays = Math.max(
                        0,
                        (paymentDate.getTime() +
                              SEVEN_DAYS_IN_MILLISECONDS -
                              currentDate.getTime()) /
                        MILLISECONDS_IN_A_DAY
                  );
                  const passedDays = Math.floor(timeDifference / MILLISECONDS_IN_A_DAY);

                  return remainingDays - passedDays > 0;
            } else {
                  return isWithinFreeTrial;
            }
      };


      const isWithin28Days = (createdAt) => {
            const currentTime = new Date().getTime();
            const differenceInMilliseconds = currentTime - new Date(createdAt).getTime();
            const millisecondsIn28Days = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
            return differenceInMilliseconds < millisecondsIn28Days;
      };
      const [totalRevenue, setTotalRevenue] = useState(0);

      useEffect(() => {
            if (orders.length) {
                  const revenue = orders.reduce((acc, order) => {
                        const orderTotal = order.productList.reduce((sum, item) => {
                              const price = parseFloat(item.variations.offerPrice);
                              const quantity = item.quantity;
                              return sum + price * quantity;
                        }, 0);
                        return acc + orderTotal;
                  }, 0);

                  setTotalRevenue(revenue);
            }
      }, [orders]);
      const [chartDatax, setChartDatax] = useState({
            labels: [],
            datasets: [
                  {
                        label: 'Monthly Revenue',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                  },
            ],
      });

      useEffect(() => {
            if (orders.length) {
                  const revenueData = {};
                  const now = new Date();

                  // Get the last three months in "MMM YYYY" format
                  for (let i = 0; i < 3; i++) {
                        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
                        const monthLabel = month.toLocaleDateString("en-GB", { month: 'short', year: 'numeric' });
                        revenueData[monthLabel] = 0;
                  }

                  // Calculate revenue for each order based on its month
                  orders.forEach(order => {
                        const orderDate = new Date(order.timestamp);
                        const monthLabel = orderDate.toLocaleDateString("en-GB", { month: 'short', year: 'numeric' });

                        if (revenueData[monthLabel] !== undefined) {
                              const orderTotal = order.productList.reduce((sum, item) => {
                                    const price = parseFloat(item.variations.offerPrice);
                                    const quantity = item.quantity;
                                    return sum + price * quantity;
                              }, 0);

                              revenueData[monthLabel] += orderTotal;
                        }
                  });

                  // Update chart data with the calculated monthly revenues
                  setChartDatax({
                        labels: Object.keys(revenueData).reverse(), // Display from oldest to latest
                        datasets: [
                              {
                                    label: 'Monthly Revenue',
                                    data: Object.values(revenueData).reverse(),
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    fill: false,
                              },
                        ],
                  });
            }
      }, [orders]);



      const [chartData, setChartData] = useState({
            labels: [],
            datasets: [
                  {
                        label: 'Sales',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                  },
            ],
      });

      useEffect(() => {
            if (orders.length) {
                  const salesData = {};
                  orders.forEach(order => {
                        const date = new Date(order.timestamp).toLocaleDateString("en-GB", { month: 'short', day: 'numeric' });
                        const total = order.productList.reduce((sum, item) => sum + parseFloat(item.variations.offerPrice) * item.quantity, 0);
                        salesData[date] = (salesData[date] || 0) + total;
                  });

                  setChartData({
                        labels: Object.keys(salesData),
                        datasets: [
                              {
                                    label: 'Sales',
                                    data: Object.values(salesData),
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    fill: false,
                              },
                        ],
                  });
            }
      }, [orders]);
      const [topProducts, setTopProducts] = useState([]);

      useEffect(() => {
            if (orders.length) {
                  const productSales = {};

                  // Aggregate sales for each product
                  orders.forEach(order => {
                        order.productList.forEach(product => {
                              const productId = product.productId;
                              const quantitySold = product.quantity;

                              if (!productSales[productId]) {
                                    productSales[productId] = {
                                          ...product,
                                          totalQuantity: 0,
                                    };
                              }
                              productSales[productId].totalQuantity += quantitySold;
                        });
                  });

                  // Get top 5 products by sales quantity
                  const sortedProducts = Object.values(productSales)
                        .sort((a, b) => b.totalQuantity - a.totalQuantity)
                        .slice(0, 5);

                  setTopProducts(sortedProducts);
            }
      }, [orders]);

      return (
            <div className="h-screen mb-10   ">
                  {sellerPopupData.length
                        ? popup && (
                              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
                                    <SellerPopUp
                                          onClose={onClose}
                                          showModal={popup}
                                          setShowModal={setPopUp}
                                          data={sellerPopupData}
                                          handleClose={onClose}
                                    />
                              </div>
                        )
                        : ""}

                  <div className=" ">
                        <div className="">
                              <div className="md:flex justify-between">
                                    <div>
                                          <div className=" bg-gradient-to-r from-[#1493f4] to-[#835177] absolute -z-10 -top-12 -right-14 blur-2xl opacity-10"></div>
                                          <h1 className="text-4xl font-semibold text-gray-800 capitalize">
                                                {greeting}, {user.name}
                                          </h1>
                                          <h2 className="text-gray-400 text-md">
                                                Here&#x27;s what&#x27;s happening with your ambassador account today.
                                          </h2>

                                    </div>
                                    <div className="">
                                          <div className="bg-gray-50 px-4 py-2 rounded text-blue-500 flex items-center gap-2">
                                                <h1 className="whitespace-nowrap">Switch Account</h1>
                                                <hr className="flex-grow mx-2 border-t border-blue-500" />

                                                <select
                                                      className="w-full px-4 py-2 border rounded bg-[#d2d2d2] text-sm"
                                                      // value={selectedAccount}
                                                      onChange={handleChange}
                                                >


                                                      <option value="">
                                                            {darazShop?.shop2?.data?.name ?? darazShop?.result?.account}
                                                      </option>
                                                      {(() => {
                                                            const seenNames = new Set();
                                                            return previousAccount
                                                                  .filter((item) => darazShop?.shop2?.data?.name !== item?.shop2?.data?.name)
                                                                  .filter((item) => {
                                                                        const name = item?.shop2?.data?.name;
                                                                        if (name && !seenNames.has(name)) {
                                                                              seenNames.add(name);
                                                                              return true;
                                                                        }
                                                                        return false;
                                                                  })
                                                                  .map((shopSingle) => {
                                                                        const isRecent = isWithin28Days(shopSingle?.createdAt);
                                                                        const isBlocked = shopSingle?.isAdmin === "block";

                                                                        return (
                                                                              <option
                                                                                    disabled={isBlocked}
                                                                                    style={{
                                                                                          color: isBlocked ? "#ffffff" : isRecent ? "" : "#ffffff",
                                                                                          backgroundColor: isBlocked || !isRecent ? "#ff0000" : "",
                                                                                    }}
                                                                                    key={shopSingle._id}
                                                                                    value={shopSingle._id}
                                                                              >
                                                                                    {shopSingle?.shop2?.data?.name ?? shopSingle?.result?.account}
                                                                                    {!isRecent && <span> Almost 28 days</span>}
                                                                              </option>
                                                                        );
                                                                  });
                                                      })()}

                                                </select>

                                          </div>

                                    </div>
                              </div>


                              {shopCredential?._id ? (
                                    <div className=""></div>
                              ) : (
                                    <div className="">
                                          {!itemLoad && (
                                                <div
                                                      className="bg-red-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative"
                                                      role="alert"
                                                >
                                                      <strong className="font-bold">Warning: </strong>
                                                      <Link to={`/seller/settings/auth-credential`}>
                                                            <span className="block sm:inline">
                                                                  {" "}
                                                                  You have no auth credential yet now. so your website have no
                                                                  user login please setup your auth credential.{" "}
                                                            </span>
                                                      </Link>
                                                      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                                                </div>
                                          )}
                                    </div>
                              )}
                        </div>


                  </div>
                  <div className="my-4">
                        <Swiper
                              autoplay={{ delay: 3000 }}
                              loop={true}
                              slidesPerView={1}
                              spaceBetween={10}
                              pagination={{ clickable: true }}
                              navigation={true}
                              modules={[Autoplay, Pagination, Navigation]}
                              className="mySwiper"
                        >
                              {noticeInfo?.filter((item) => item.n_status == 'true')?.map((item, i) => (
                                    <SwiperSlide>
                                          <a href={item.link}>
                                                <img
                                                      src={item.image}
                                                      alt="Description of image 1"
                                                      className="h-32 object-cover rounded w-full"
                                                />
                                          </a>
                                    </SwiperSlide>
                              ))}
                        </Swiper>
                  </div>
                  <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                              style={{
                                    boxShadow: `0 1px 2px #d0d0d0`,
                              }}
                              className="  relative ring-1 ring-gray-100 w-full  bar overflow-hidden rounded-lg bg-white  "
                        >
                              <a
                                    href="#"
                                    className="justify-between w-full flex items-center h-full"
                              >
                                    <div className="flex w-full items-center  justify-between px-4  space-x-4">
                                          <div className="flex gap-3 items-center">
                                                <div className="relative w-[50px] flex items-center justify-center h-[50px] bg-yellow-100 rounded-full">
                                                      <PiStorefrontLight className="text-3xl" />
                                                </div>
                                                <p className="ml-2  text-sm font-semibold text-gray-700  border-gray-200 capitalize">
                                                      {user.name} <br />
                                                      <hr />
                                                      {shopInfo?.shopName}
                                                </p>
                                          </div>

                                          <div className="mt-3 text-xl md:font-bold text-black  border-gray-200 md:mt-0 ">
                                                ৳{Math.floor(firstAmount || "0000")}
                                          </div>
                                    </div>

                                    <div className="w-full hidden h-3 bg-gray-100">
                                          <div className="w-2/5 h-full text-xs text-center  bg-green-400"></div>
                                    </div>
                              </a>
                        </div>

                        <div
                              style={{
                                    boxShadow: `0 1px 2px #d0d0d0`,
                              }}
                              className="flex flex-col bg-white rounded-lg border px-8  shadow-3 py-4  gap-3  "
                        >
                              {/* <div className="bg-white  p-3 ring-1 ring-gray-400 rounded-md shadow-xl "> */}
                              {<AnouncementContent setOpen={setOpenAnouncement} />}
                              {/* </div> */}
                              <hr />
                              {/* <div className="bg-white p-3 ring-1 ring-gray-200 rounded-md shadow-xl "> */}
                              {<NoticeContent setOpen={setOpen} />}
                              {/* </div> */}
                        </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="w-full">
                              <div
                                    style={{
                                          boxShadow: `0 1px 2px #d0d0d0`,
                                    }}
                                    className="relative rounded-lg ring-1 ring-gray-100 w-full px-4 h-[120px] bg-[#ffffff] shadow-lg "
                              >
                                    <Link to="/seller/product-management/manage">
                                          <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max  pt-4">
                                                Total Product
                                          </p>
                                          <div className="flex items-end my-6 space-x-2">
                                                <p className="md:text-3xl text-3xl font-bold text-black ">
                                                      {" "}
                                                      {products?.length}
                                                </p>
                                          </div>
                                    </Link>
                              </div>
                        </div>
                        <div className="w-full">
                              <div className="relative rounded-lg w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg ">
                                    <Link to="/seller/orders"
                                          style={{
                                                boxShadow: `0 1px 2px #d0d0d0`,
                                          }}

                                    >
                                          <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max  pt-4">
                                                Total Order
                                          </p>

                                          <div className="flex items-end my-6 space-x-2">
                                                <p className="md:text-3xl text-3xl font-bold text-black ">
                                                      {orders.length}
                                                </p>
                                          </div>
                                    </Link>
                              </div>
                        </div>
                        <div className="w-full">
                              <div
                                    style={{
                                          boxShadow: `0 1px 2px #d0d0d0`,
                                    }}
                                    className="relative rounded-lg w-full px-4 ring-1 ring-gray-100 h-[120px] bg-white shadow-lg "
                              >
                                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max  pt-4">
                                          Total Sold
                                    </p>
                                    <div className="flex items-end my-6 space-x-2">
                                          <p className="md:text-3xl  text-3xl font-bold text-black ">
                                                ৳
                                                {orders
                                                      .filter((order) => order?.status === "delivered")
                                                      .reduce(
                                                            (total, order) =>
                                                                  total +
                                                                  parseInt(
                                                                        order.promoHistory?.status
                                                                              ? order.promoHistory.promoPrice
                                                                              : order.promoHistory.normalPrice
                                                                  ),
                                                            0
                                                      )}
                                          </p>
                                    </div>
                              </div>
                        </div>
                        <div className="w-full">
                              <div
                                    style={{
                                          boxShadow: `0 1px 2px #d0d0d0`,
                                    }}
                                    className="relative rounded-lg ring-1 ring-gray-100 w-full px-4 h-[120px] bg-white shadow-lg "
                              >
                                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max  pt-4">
                                          Total Customs
                                    </p>
                                    <div className="flex items-end my-6 space-x-2">
                                          <p className="md:text-3xl text-3xl font-bold text-black ">
                                                {orderData.length}
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* <div className="grid grid-cols-1 gap-4 my-10 md:grid-cols-2 lg:grid-cols-2">
        <div className="w-full px-4 py-2 bg-gray-50 rounded text-blue-500 flex items-center gap-2">
          <MdEmail />
          {<h1 className="w-full"> {darazShop?.shop2?.data?.name ?? darazShop?.result?.account}</h1>}
        </div>
        <div className="w-full bg-gray-50 px-4 py-2 rounded text-blue-500 flex items-center gap-2">
          <h1 className="whitespace-nowrap">Previous Login</h1>
          <hr />
          <select
            className="w-full px-4 py-2 border rounded bg-[#d2d2d2] text-sm"
            value={selectedAccount}
            onChange={handleChange}
          >
            <option value="">Select an account</option>
            {filteredAccounts?.map((shop) => (
              <option key={shop._id} value={`${shop._id},${shop.oldId}`}>
                {shop.result.account}
              </option>
            ))}
          </select>
        </div>
      </div> */}

                  <div className="bar overflow-hidden mt-3 bg-[white] p-4">
                        <h1 className="mb-3 font-semibold">Lowest Stock Product</h1>
                        <table className="w-full bar overflow-x-scroll bg-white border text-center text-sm font-light">
                              <thead className="border-b  font-medium  ">
                                    <tr>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Photo
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Product Name
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Price
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                                Regular Price
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                                Sale Price
                                          </th>

                                          <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                                Stock Quantity
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                                Status
                                          </th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {filteredProducts?.length ?
                                          filteredProducts?.slice(0, 4)?.map((product) => {
                                                const status = getStatus(
                                                      product?.stock_quantity,
                                                      product?.low_stock_warning
                                                );
                                                return (
                                                      <tr className="border-b " key={product?._id}>
                                                            <td className="whitespace-nowrap border-r px-2 py-2 font-medium ">
                                                                  <img
                                                                        src={product?.featuredImage?.src}
                                                                        alt=""
                                                                        className="w-[80px] h-[80px] rounded-lg object-cover m-auto"
                                                                  />
                                                            </td>
                                                            <td className="whitespace-wrap text-sm text-start w-[300px] border-r px-6 py-4 font-medium ">
                                                                  {product?.name}
                                                                  <br />
                                                                  <span className="text-xs text-gray-500">
                                                                        {" "}
                                                                        {product?.sku}
                                                                  </span>
                                                            </td>
                                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                  {product?.price}
                                                            </td>
                                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                  {product?.regular_price}
                                                            </td>
                                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                  {product?.sale_price}
                                                            </td>

                                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                  {product?.stock_quantity} /
                                                                  <span className="text-red-400">
                                                                        {product?.low_stock_warning}
                                                                  </span>
                                                            </td>

                                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                  <>
                                                                        <div className={`text-xs  ${status.color}`}>
                                                                              <p className="flex items-center gap-2 justify-center">
                                                                                    {status.icon} {status.text}
                                                                              </p>
                                                                        </div>
                                                                  </>
                                                            </td>
                                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                  <button
                                                                        onClick={() => setOpen(product)}
                                                                        className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded-lg"
                                                                  >
                                                                        Edit
                                                                  </button>
                                                            </td>

                                                            {open._id === product._id && (
                                                                  <div className="h-0 w-0">
                                                                        <EditInventory
                                                                              refetch={refetch}
                                                                              data={product}
                                                                              open={open}
                                                                              setOpen={setOpen}
                                                                        />
                                                                  </div>
                                                            )}
                                                      </tr>
                                                );
                                          }) : ''}
                              </tbody>
                        </table>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border mt-8 mb-10 p-4 shadow-sm bar overflow-auto ">
                              <h1 className=" font-semibold border-b pb-2">Top Selling Item</h1>
                              <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                          <tr>
                                                <th className="px-4 py-2 border-b">Image</th>
                                                <th className="px-4 py-2 border-b">Product Name</th>
                                                <th className="px-4 py-2 border-b">Quantity Sold</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {topProducts.map((product) => (
                                                <tr key={product.productId} className="text-center">
                                                      <td className="border-r px-2 py-2">
                                                            <div className="flex items-center">
                                                                  <img
                                                                        src={product?.img || product?.featuredImage?.src}
                                                                        alt={product?.name}
                                                                        className="w-[40px] h-[40px] rounded-lg object-cover mr-5"
                                                                  />
                                                            </div>
                                                      </td>
                                                      <td className="border-r px-2 py-2 font-medium text-left">
                                                            <div className="flex-1">
                                                                  <p className="ptitle">{product?.productName || product?.name}</p>
                                                            </div>
                                                            <p className="text-green-600">{product?.variations?.SKU || product?.sku}</p>
                                                      </td>
                                                      <td className="border-r px-2 py-2">{product.totalQuantity}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                        <div className="bg-white border mt-8 mb-10 p-4 shadow-sm bar overflow-auto ">
                              <h1 className=" font-semibold border-b pb-2">Sales Order</h1>
                              <table className="w-full">
                                    <thead>
                                          <tr>
                                                <th className="px-4 py-3 text-left font-medium">Order</th>
                                                <th className="px-4 py-3 text-left font-medium">Customer</th>

                                                <th className="px-4 py-3 text-right font-medium">Total</th>

                                          </tr>
                                    </thead>
                                    <tbody>
                                          {orders?.slice(0, 5).map((order) => (
                                                <tr
                                                      className="border-b"
                                                      key={order?._id}
                                                      style={{ whiteSpace: "nowrap" }}
                                                >
                                                      <Link
                                                            to="/seller/orders/manage-order/order-checkup"
                                                            onClick={() => setCheckUpData(order)}
                                                            style={{ whiteSpace: "nowrap" }}
                                                            className="px-4 font-[400]"
                                                      >
                                                            # {order?.orderNumber}
                                                      </Link>
                                                      <td className="px-4 py-3">{order?.addresses?.fullName}</td>

                                                      <td className="px-4 py-3 text-right">
                                                            ৳{" "}
                                                            {order.promoHistory?.status
                                                                  ? order?.promoHistory?.promoPrice
                                                                  : order?.promoHistory?.normalPrice}
                                                      </td>

                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>


                        {/* <div className="bg-white border mt-0 mb-10 p-4 shadow-sm bar overflow-auto ">
                              <h1 className=" font-semibold border-b pb-2">Sales Graph  </h1>
                              {chartData.labels.length > 0 ? ( // Render only if data exists
                                    <Line
                                          key={chartData.labels.join('-')} // Force re-render on data change
                                          data={chartData}
                                          options={{
                                                scales: {
                                                      x: { title: { display: true, text: 'Date' } },
                                                      y: { title: { display: true, text: 'Sales (in currency)' } },
                                                },
                                          }}
                                    />
                              ) : (
                                    <p>No sales data available</p> // Message for empty data case
                              )}
                        </div> */}

                        {/* <div className="bg-white border mt-0 mb-10 p-4 shadow-sm bar overflow-auto ">
                              <h1 className=" font-semibold border-b pb-2">Monthly Revenue (Last 3 Months)    </h1>
                              {chartDatax.labels.length > 0 ? (
                                    <Line
                                          key={chartDatax.labels.join('-')} // Force re-render on data change
                                          data={chartDatax}
                                          options={{
                                                scales: {
                                                      x: { title: { display: true, text: 'Month' } },
                                                      y: { title: { display: true, text: 'Revenue (in currency)' } },
                                                },
                                          }}
                                    />
                              ) : (
                                    <p>No revenue data available for the last three months</p>
                              )}
                        </div> */}

                  </div>
                  <br />
                  <br />
            </div>
      );
};

export default SellerDashboard;
