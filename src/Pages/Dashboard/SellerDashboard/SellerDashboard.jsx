import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useState } from "react";
import { useEffect } from "react";
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
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/pop-up`
      );
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
          `https://backend.doob.com.bd/api/v1/shop/firebase/${shopInfo.shopId}`
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
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/slider`
      );
      const data = await res.json();
      return data?.data;
    },
  });

  console.log(noticeInfo);
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
        `https://backend.doob.com.bd/api/v1/seller/order?shopId=${shopInfo._id}`
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
        `https://backend.doob.com.bd/api/v1/seller/seller-daraz-accounts?id=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data[0];
    },
  });



  const {
    data: priviousAccount = [],
    isLoading: loading,
    refetch: reload,
  } = useQuery({
    queryKey: ["priviousAccount"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/daraz/get-privious-account?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });


  const switchAccount = (_id, id) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/daraz/switching-your-daraz?id=${id}&loginId=${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log response data
        Swal.fire("Success", "", "success"); // Show success message (assuming you're using SweetAlert)
        refetch(); // Refetch data
        darazShopRefetch(); // Reload data
      });
  };

  const [selectedAccount, setSelectedAccount] = useState("");



  const handleChange = (event) => {
    const [shopId, oldId] = event.target.value.split(",");
    setSelectedAccount(event.target.value);
    switchAccount(shopId, oldId);
  };


  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/all-products/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["sellerOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/order?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const { data: withdrawHistory = [] } = useQuery({
    queryKey: ["my-withdrawHistory"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/withdraw-for-shop?shopId=${shopInfo?._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const { data: orders_admin = [] } = useQuery({
    queryKey: ["orders_admin"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/get-my-order?shopId=${shopInfo?._id}`
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
        `https://backend.doob.com.bd/api/v1/seller/all-products/${shopInfo._id}`
      );
      k;
      const data = await res.json();
      return data;
    },
  });

  console.log(shopInfo._id, productData);

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
      <div className=" bg-gradient-to-r from-[#1493f4] to-[#835177] absolute -z-10 -top-12 -right-14 blur-2xl opacity-10"></div>
      <h1 className="text-4xl font-semibold text-gray-800 capitalize">
        {greeting}, {user.name}
      </h1>

      <h2 className="text-gray-400 text-md">
        Here&#x27;s what&#x27;s happening with your ambassador account today.
      </h2>
      {!shopCredential?._id && (
        <div className="">
          <div
            class="bg-red-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Warning: </strong>
            <Link to={`/seller/settings/auth-credential`}>
              <span class="block sm:inline">
                {" "}
                You have no auth credential yet now. so your website have no
                user login please setup your auth credential.{" "}
              </span>
            </Link>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
          </div>
        </div>
      )}

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
          {noticeInfo?.map((item, i) => (
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
          className="  relative ring-1 ring-gray-100 w-full  overflow-hidden rounded-lg bg-white  "
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
            <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max  pt-4">
              Total Product
            </p>
            <div className="flex items-end my-6 space-x-2">
              <p className="md:text-3xl text-3xl font-bold text-black ">
                {" "}
                {products?.length}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div
            style={{
              boxShadow: `0 1px 2px #d0d0d0`,
            }}
            className="relative rounded-lg w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg "
          >
            <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max  pt-4">
              Total Order
            </p>

            <div className="flex items-end my-6 space-x-2">
              <p className="md:text-3xl text-3xl font-bold text-black ">
                {orders.length}
              </p>
            </div>
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
                  .filter((order) => order.status === "delivered")
                  .reduce(
                    (total, order) =>
                      total +
                      parseInt(
                        order.promoHistory.status
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
          {<h1 className="w-full"> {darazShop?.result?.account}</h1>}
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
      <div className="flex justify-end items-center gap-12 mt-8 w-full">
        {/* <div className="w-full px-4 py-2 bg-gray-50 rounded text-blue-500 flex items-center gap-2">
          <MdEmail />
          {<h1 className="w-full"> {darazShop?.result?.account}</h1>}
        </div> */}

        {darazShop?.result?.account && <div className=" bg-gray-50 px-4 py-2 rounded text-blue-500 flex items-center gap-2">
          <h1 className="whitespace-nowrap">Switch Account</h1>
          <hr />
          <select
            className="w-full px-4 py-2 border rounded bg-[#d2d2d2] text-sm"
            value={selectedAccount}
            onChange={handleChange}
          >
            <option value="">{darazShop?.result?.account}</option>

            {priviousAccount?.map((shop) => (
              <option key={shop._id} value={`${shop._id},${shop.oldId}`}>
                {shop.result.account}
              </option>
            ))}
          </select>
        </div>}
      </div>

      <div className="overflow-hidden mt-3 bg-[white] p-4">
        <h1 className="mb-3 font-semibold">Lowest Stock Product</h1>
        <table className="w-full overflow-x-scroll bg-white border text-center text-sm font-light">
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
            {filteredProducts.length &&
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
              })}
          </tbody>
        </table>
      </div>

      <div className="bg-white border mt-8 mb-10 p-4 shadow-sm overflow-auto ">
        <h1 className=" font-semibold border-b pb-2">Recent Order</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left font-medium">Order</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium hidden md:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">
                Status
              </th>
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
                <td className="px-4 py-3 hidden md:table-cell">
                  {new Date(order.timestamp).toDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  ৳{" "}
                  {order.promoHistory.status
                    ? order.promoHistory.promoPrice
                    : order.promoHistory.normalPrice}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {order.status ? order.status : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
    </div>
  );
};

export default SellerDashboard;
