import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import MetaHelmet from "../../../Helmate/Helmate";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";

const SingleService = () => {
  const { user, setOrderStage } = useContext(AuthContext);

  const service = useLoaderData();
  console.log(service);
  const navigate = useNavigate();
  const {
    data: services = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/services");
      const data = await res.json();
      return data;
    },
  });

  console.log(service, "service");

  const [selectedDiscount, setSelectedDiscount] = useState(`0,0`);

  function calculateEndTime(time) {
    console.log(time);
    const monthsToAdd = parseInt(time?.split(",")[1], 10);
    if (isNaN(monthsToAdd)) {
      throw new Error("Invalid month value in time");
    }

    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + monthsToAdd);

    return endDate.getTime();
  }

  console.log({
    endDate: selectedDiscount?.split(",")[1],
    endTime: calculateEndTime(selectedDiscount),
  });

  const handleOrder = () => {
    if (!user) {
      navigate("/sign-in");
    } else {
      if (parseFloat(selectedDiscount?.split(",")[1]) < 1) {
        BrightAlert("Select Any Subscription Model", "", "warning");
        return;
      }
      const order = {
        id: service._id,
        title: service.title,
        price: service?.price,
        img: service?.img,
        category: service.category,
        subscriptionPeriod: service.subscriptionPeriod,
        endDate: selectedDiscount?.split(",")[1],
        endTime: calculateEndTime(selectedDiscount),
        normalPrice: service?.price,
        buyingPrice: selectedDiscount
          ? service.price - selectedDiscount?.split(",")[0]
          : service.price,
      };
      console.log(order);
      // setOrderStage([order]);
      setOrderStage(order);
      navigate(`/user-service-checkout/${service._id}`);
    }
  };

  // console.log(parseFloat(selectedDiscount.split(",")[1]));
  // console.log(parseFloat(selectedDiscount?.split(",")[1]) < 1);
  const handleWishlist = () => {
    if (!user) {
      navigate("/sign-in");
    } else {
      if (parseFloat(selectedDiscount?.split(",")[1]) < 1) {
        BrightAlert("Select Any Subscription Model", "", "info");
        return;
      }
      const order = {
        serviceId: service._id,
        userId: user._id,
        userEmail: user.email,
        img: service.img,
        email: user.email,
        title: service.title,
        price: service.price,
        category: service.category,
        subscriptionPeriod: service.subscriptionPeriod,
        endDate: selectedDiscount?.split(",")[1],
        endTime: calculateEndTime(selectedDiscount),
        normalPrice: service?.price,
        buyingPrice: selectedDiscount
          ? service.price - selectedDiscount?.split(",")[0]
          : service.price,
      };

      console.log(order);

      fetch(`https://doob.dev/api/v1/site-user/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
          BrightAlert({ timeDuration: 3000 });
          setOpen(!open);
        });
    }
  };

  const uploadReview = (e) => {
    e.preventDefault();
    const reviews = e.target.reviews.value;
    const userData = { name: user.name, userId: user._id };
    const timestamp = new Date().getTime();
    let data = { text: reviews, user: userData, timeStamp: timestamp };
    fetch(`https://doob.dev/api/v1/admin/service/reviews?id=${service._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .finally(() => {
        window.location.reload();
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  function timeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = Date.now();
    const difference = now - date.getTime();

    const units = [
      { value: 365 * 24 * 60 * 60 * 1000, label: "year" },
      { value: 30 * 24 * 60 * 60 * 1000, label: "month" },
      { value: 7 * 24 * 60 * 60 * 1000, label: "week" },
      { value: 24 * 60 * 60 * 1000, label: "day" },
      { value: 60 * 60 * 1000, label: "hour" },
      { value: 60 * 1000, label: "minute" },
    ];

    for (const unit of units) {
      const count = Math.floor(difference / unit.value);
      if (count >= 1) {
        return count === 1
          ? `1 ${unit.label} ago`
          : `${count} ${unit.label}s ago`;
      }
    }

    return "just now";
  }

  const onChangeDiscount = (value) => {
    console.log(service.price > value.split(",")[0]);
    console.log(service.price, value.split(",")[0]);
    if (service.price > parseInt(value.split(",")[0])) {
      console.log(value);
      setSelectedDiscount(value);
    } else {
      BrightAlert(" Subscription Model is not valid", "", "warning");
    }
  };

  return (
    <div className="px-4 pt-16 relative mx-auto sm:max-w-xl md:max-w-full  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="">
          <div className=" mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-2/3 w-full lg:min-h-[400px] lg:min-w-[400px]  h-64 object-cover object-center rounded"
              src={service.img}
              srcSet={service.img}
            />
            <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {service.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {service.title}
              </h1>
              <div className="py-3 font-semibold">
                Total Views : {service?.views}
              </div>

              <div className="flex items-center pb-5 border-b-2 border-gray-100 mb-5">
                <span className="mr-3">Subscription Model</span> :{" "}
                <div className="flex"></div>
                <div className="relative mt-1.5 p-2">
                  {/* <div className="">{service.subscriptionPeriod}</div> */}
                  <select
                    type="text"
                    list="pricingDiscount"
                    id="pricingDiscount"
                    name="pricingDiscount"
                    className="w-full mt-1 rounded-lg border border-gray-600 px-1 py-3 text-sm mx-"
                    placeholder="Select Subscription Period"
                    onChange={(e) => onChangeDiscount(e.target.value)}
                  >
                    <option disabled selected className="" value="">
                      Select Service Discount
                    </option>

                    {service?.pricingPriceOne && (
                      <option value={service?.pricingPriceOne}>
                        Monthly Time {service?.pricingPriceOne.split(",")[0]}{" "}
                        BDT
                      </option>
                    )}
                    {service?.pricingPriceSix && (
                      <option value={service?.pricingPriceSix}>
                        Six Month {service?.pricingPriceSix.split(",")[0]} BDT
                      </option>
                    )}
                    {service?.pricingPriceTwelve && (
                      <option value={service?.pricingPriceTwelve}>
                        One Year {service?.pricingPriceTwelve.split(",")[0]} BDT
                      </option>
                    )}
                    {service?.pricingPriceTwenty && (
                      <option value={service?.pricingPriceTwenty}>
                        Two Year {service?.pricingPriceTwenty.split(",")[0]} BDT
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="flex w-full justify-between items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {selectedDiscount
                    ? service.price - selectedDiscount?.split(",")[0]
                    : service.price}
                  <span> BDT</span>
                </span>
                <div className="flex items-center">
                  {/* <Link to={`/user-service-checkout/${service?._id}`}> */}
                  {user?.role === "supperadmin" ? (
                    <div className="flex ml-auto cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none  rounded">
                      OWN SERVICE
                    </div>
                  ) : (
                    <button
                      button
                      onClick={handleOrder}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Buy Now
                    </button>
                  )}
                  {/* </Link> */}
                  <button
                    onClick={handleWishlist}
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto flex flex-wrap mt-4">
            <p className="text-xl font-semibold underline underline-offset-4">
              Description:
            </p>
            <div
              className=" text_editor"
              dangerouslySetInnerHTML={{
                __html: service.message,
              }}
            />
          </div>
        </div>
        {/* ======== service reviews ======= */}
        <hr className="my-4 border-gray-500" />
        <form onSubmit={uploadReview} className="">
          <textarea
            name="reviews"
            className="border w-full  border-gray-500 p-2 rounded resize-y"
            rows="5"
            placeholder="Write your reviews here..."
          ></textarea>
          <button
            type="submit"
            className="block  mt-2 mb-10 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <div className="space-y-4">
          {service?.reviews?.map((comment) => (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="rounded-full overflow-hidden w-8 h-8">
                  <div
                    height={32}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width={32}
                    className="rounded-full flex justify-center items-center border border-black"
                  >
                    {comment.user.name.slice(0, 1)}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{comment.user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {timeAgo(comment.timeStamp)}
                  </p>
                </div>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>

        {/* ======== service reviews ======= */}

        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <h3 className="text-gray-600 text-2xl font-medium">
            Relevant Service
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {services
              ?.filter((item) => item?._id !== service?._id)
              .slice(0, 4)
              .map((service) => (
                <Link
                  to={`/service/${service._id}`}
                  key={service?._id}
                  className={
                    !service.status
                      ? "hidden"
                      : "w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
                  }
                >
                  <MetaHelmet
                    title={service?.MetaTag}
                    description={service?.MetaDescription}
                    image={service?.MetaImage}
                  />
                  <div
                    className="flex items-end justify-end h-56 w-full bg-cover"
                    style={{
                      backgroundImage: `url(${service.img})`,
                    }}
                  >
                    <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className="px-5 py-3">
                    <h3 className="text-gray-700 uppercase">{service.title}</h3>
                    <span className="text-gray-500 mt-2">
                      ৳
                      {selectedDiscount
                        ? service.price - selectedDiscount?.split(",")[0]
                        : service.price}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleService;
