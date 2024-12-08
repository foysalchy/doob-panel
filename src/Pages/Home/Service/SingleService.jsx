import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import MetaHelmet from "../../../Helmate/Helmate";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert";

const SingleService = () => {
      const { user, setOrderStage } = useContext(AuthContext);
      const { id } = useParams()


      const {
            data: service = {},
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["services", id],  // Include the `id` in the queryKey
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/service/${id}`);
                  const data = await res.json();
                  return data;
            },
      });
      useEffect(() => {
            window.scrollTo(0, 0);  // Scroll to top on service change
      }, [id,]);





      const navigate = useNavigate();
      const {
            data: more_services = [],
            refetch: refetchMoreServices,
            isLoading: isLoadingMoreServices,
      } = useQuery({
            queryKey: ["more_services"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/services");
                  const data = await res.json();
                  return data;
            },
      });

      // loader: ({ params }) =>
      //       fetch(`https://doob.dev/api/v1/admin/service/${params.id}`),




      const [selectedDiscount, setSelectedDiscount] = useState(`0,0`);

      function calculateEndTime(time) {
            // console.log(time);
            const monthsToAdd = parseInt(time?.split(",")[1], 10);
            if (isNaN(monthsToAdd)) {
                  throw new Error("Invalid month value in time");
            }

            const currentDate = new Date();
            const endDate = new Date(currentDate);
            endDate.setMonth(endDate.getMonth() + monthsToAdd);

            return endDate.getTime();
      }



      const handleOrder = () => {
            if (!user) {
                  navigate("/sign-in");
            } else {
                  if (parseFloat(selectedDiscount?.split(",")[1]) < 0) {
                        showAlert("Select Any Subscription Model", "", "warning");
                        return;
                  }
                  const order = {
                        id: service?._id,
                        title: service?.title,
                        price: service?.price,
                        img: service?.img,
                        category: service?.category,
                        subscriptionPeriod: service?.subscriptionPeriod,
                        endDate: selectedDiscount?.split(",")[1],
                        endTime: calculateEndTime(selectedDiscount),
                        normalPrice: service?.price,
                        buyingPrice: selectedDiscount
                              ? service?.price - selectedDiscount?.split(",")[0]
                              : service?.price,
                  };
                  console.log(order, "bodyData");
                  // setOrderStage([order]);
                  setOrderStage(order);
                  navigate(`/user-service-checkout/${service?._id}`);
            }
      };

      const handleWishlist = () => {
            if (!user) {
                  navigate("/sign-in");
            } else {
                  if (parseFloat(selectedDiscount?.split(",")[1]) < 0) {
                        showAlert("Select Any Subscription Model", "", "info");
                        return;
                  }
                  const order = {
                        serviceId: service?._id,
                        userId: user._id,
                        userEmail: user.email,
                        img: service?.img,
                        email: user.email,
                        title: service?.title,
                        price: service?.price,
                        category: service?.category,
                        subscriptionPeriod: service?.subscriptionPeriod,
                        endDate: selectedDiscount?.split(",")[1],
                        endTime: calculateEndTime(selectedDiscount),
                        normalPrice: service?.price,
                        buyingPrice: selectedDiscount
                              ? service?.price - selectedDiscount?.split(",")[0]
                              : service?.price,
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
                              showAlert("Add in Wishlist", "", "success");
                              setOpen(!open);
                        });
            }
      };

      // const uploadReview = (e) => {
      //       e.preventDefault();
      //       if (!user) {
      //             BrightAlert({ timeDuration: 3000, title: "Login First", icon: "warning" });
      //             return;
      //       }
      //       const reviews = e.target.reviews.value;
      //       const userData = { name: user.name, userId: user._id };
      //       const timestamp = new Date().getTime();
      //       let data = { text: reviews, user: userData, timeStamp: timestamp };
      //       fetch(`https://doob.dev/api/v1/admin/service/reviews?service_id=${service?._id}`, {
      //             method: "PUT",
      //             headers: {
      //                   "Content-Type": "application/json",
      //             },
      //             body: JSON.stringify(data),
      //       })
      //             .then((response) => response.json())
      //             .catch((error) => console.log(error))
      //             .finally(() => {
      //                   e.target.reset();
      //                   window.location.reload();
      //                   BrightAlert({ timeDuration: 3000, title: "Review Added", icon: "success" });
      //             });
      // };



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
            console.log(value, "value");
            // const TimeValue = JSON.stringify(value);

            const selectedPrice = parseFloat(value.split(",")[0]);

            console.log(parseFloat(service?.price), selectedPrice);
            // console.log(TimeValue, "values", TimeValue.split(",")[0]);
            // console.log(service?.price > TimeValue.split(",")[0]);
            // console.log(service?.price, TimeValue.split(",")[0]);
            if (parseFloat(service?.price) > selectedPrice) {
                  // console.log(TimeValue);
                  setSelectedDiscount(value);
            } else {
                  showAlert(
                        `Please select less than ${parseFloat(service?.price)}`,
                        "",
                        "warning"
                  );
            }
      };


      return (
            <div className="px-4 pt-16 relative mx-auto sm:max-w-xl md:max-w-full  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                  <MetaHelmet title={service?.MetaTag} description={service?.MetaDescription} image={service?.img} />
                  <section className="text-gray-600 body-font bar overflow-hidden">
                        <div className="">
                              <div className=" mx-auto flex flex-wrap">
                                    <img
                                          className="lg:w-2/3 w-full lg:min-h-[400px] lg:min-w-[400px]  h-64 object-cover object-center rounded"
                                          src={service?.img}
                                          srcSet={service?.img}
                                          alt={service?.title}
                                    />
                                    <div className="lg:w-1/3 w-full lg:pl-10 md:py-6 lg:pt-0 mt-6 lg:mt-0">
                                          <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                                {service?.category}
                                          </h2>
                                          <h1 className="text-gray-900 text-xl mt-2 mb-2 title-font font-medium mb-1">
                                                {service?.title}
                                          </h1>

                                          <h1 className="text-gray-900 text-lg font-mono title-font font-medium mb-1">
                                                Price :  {service?.subscriptionPeriod !== "Monthly" && (<span> {service?.price}.Tk </span>)}
                                          </h1>

                                          {/* <div className="text-gray-900 text-lg font-mono title-font font-medium mb-1">
                                                Total Views : {service?.viewCount ?? 0}
                                          </div> */}

                                          {service?.subscriptionPeriod === "Monthly" && (

                                                <div className="flex items-center pb-5 border-gray-100 mb-2">


                                                      <div className="w-full text-center relative   ">

                                                            <div className="mt-1  grid grid-cols-2 gap-2 ">
                                                                  {service?.pricingPriceOne && (
                                                                        <div
                                                                              className={`${service?.pricingPriceOne.split(",")[0] >=
                                                                                    parseFloat(service?.price)
                                                                                    ? "text-red-500"
                                                                                    : ""
                                                                                    } border border-black-900 px-2 py-5 rounded  cursor-pointer`}
                                                                        >
                                                                              <input
                                                                                    type="radio"
                                                                                    id="pricingPriceOne"
                                                                                    name="pricingDiscount"
                                                                                    value={service?.pricingPriceOne}
                                                                                    disabled={
                                                                                          parseFloat(
                                                                                                service?.pricingPriceOne.split(",")[0]
                                                                                          ) >=
                                                                                                parseFloat(service?.price) ===
                                                                                                true
                                                                                                ? true
                                                                                                : false
                                                                                    }
                                                                                    onChange={(e) => onChangeDiscount(e.target.value)}
                                                                                    className="mr-2  opacity-0 absolute"
                                                                              />
                                                                              <label className=" cursor-pointer" htmlFor="pricingPriceOne" >
                                                                                    Monthly Time{" "}

                                                                                    <p>BDT.{parseInt(service.price) - parseInt(service?.pricingPriceOne.split(",")[0])}{" "}</p>
                                                                              </label>
                                                                        </div>
                                                                  )}
                                                                  {service?.pricingPriceSix && (
                                                                        <div
                                                                              className={`${service?.pricingPriceSix.split(",")[0] >=
                                                                                    parseFloat(service?.price)
                                                                                    ? "text-red-500"
                                                                                    : ""
                                                                                    }border border-black-900 px-2 py-5 rounded pointer`}
                                                                        >
                                                                              <input
                                                                                    type="radio"
                                                                                    id="pricingPriceSix"
                                                                                    name="pricingDiscount"
                                                                                    disabled={
                                                                                          parseFloat(
                                                                                                service?.pricingPriceSix.split(",")[0]
                                                                                          ) >=
                                                                                                parseFloat(service?.price) ===
                                                                                                true
                                                                                                ? true
                                                                                                : false
                                                                                    }
                                                                                    value={service?.pricingPriceSix}
                                                                                    onChange={(e) => onChangeDiscount(e.target.value)}
                                                                                    className="mr-2  opacity-0 absolute"
                                                                              />
                                                                              <label className=" cursor-pointer" htmlFor="pricingPriceSix">
                                                                                    Six Month
                                                                                    <p>BDT.{parseInt(service.price) - parseInt(service?.pricingPriceSix.split(",")[0])}{" "}
                                                                                    </p>
                                                                              </label>
                                                                        </div>
                                                                  )}
                                                                  {service?.pricingPriceTwelve && (
                                                                        <div
                                                                              className={`${service?.pricingPriceTwelve.split(",")[0] >=
                                                                                    parseFloat(service?.price)
                                                                                    ? "text-red-500"
                                                                                    : ""
                                                                                    } border border-black-900 px-2 py-5 rounded pointer`}
                                                                        >
                                                                              <input
                                                                                    type="radio"
                                                                                    id="pricingPriceTwelve"
                                                                                    name="pricingDiscount"
                                                                                    disabled={
                                                                                          parseFloat(
                                                                                                service?.pricingPriceTwelve.split(",")[0]
                                                                                          ) >=
                                                                                                parseFloat(service?.price) ===
                                                                                                true
                                                                                                ? true
                                                                                                : false
                                                                                    }
                                                                                    value={service?.pricingPriceTwelve}
                                                                                    onChange={(e) => onChangeDiscount(e.target.value)}
                                                                                    className="mr-2  opacity-0 absolute"
                                                                              />
                                                                              <label className=" cursor-pointer" htmlFor="pricingPriceTwelve">
                                                                                    One Year
                                                                                    <p>BDT.{parseInt(service.price) - parseInt(service?.pricingPriceTwelve.split(",")[0])}{" "}
                                                                                    </p>
                                                                              </label>
                                                                        </div>
                                                                  )}
                                                                  {service?.pricingPriceTwenty && (
                                                                        <div
                                                                              className={`${service?.pricingPriceTwenty.split(",")[0] >=
                                                                                    parseFloat(service?.price)
                                                                                    ? "text-red-500"
                                                                                    : ""
                                                                                    } border border-black-900 px-2 py-5 rounded pointer`}
                                                                        >
                                                                              <input
                                                                                    type="radio"
                                                                                    id="pricingPriceTwenty"
                                                                                    name="pricingDiscount"
                                                                                    disabled={
                                                                                          parseFloat(
                                                                                                service?.pricingPriceTwenty.split(",")[0]
                                                                                          ) >=
                                                                                                parseFloat(service?.price) ===
                                                                                                true
                                                                                                ? true
                                                                                                : false
                                                                                    }
                                                                                    value={service?.pricingPriceTwenty}
                                                                                    onChange={(e) => onChangeDiscount(e.target.value)}
                                                                                    className="mr-2  opacity-0 absolute"
                                                                              />
                                                                              <label className=" cursor-pointer" htmlFor="pricingPriceTwenty">
                                                                                    Two Year
                                                                                    <p>
                                                                                          BDT.{parseInt(service.price) - parseInt(service?.pricingPriceTwenty.split(",")[0])}{" "}
                                                                                    </p>
                                                                              </label>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      </div>
                                                </div>
                                          )}
                                          <div className="flex w-full justify-between items-center">
                                                <span className="title-font font-medium text-2xl text-gray-900">
                                                      Total: {selectedDiscount
                                                            ? service?.price - selectedDiscount?.split(",")[0]
                                                            : service?.price}
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
                                                      {/* <button
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
                                                      </button> */}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className=" mx-auto mt-4">
                                    {/* <p className="text-xl font-semibold underline underline-offset-4">
                                          Description:
                                    </p> */}

                                    <p
                                          className=" text_editor jodit-editor"
                                          dangerouslySetInnerHTML={{
                                                __html: service?.message,
                                          }}
                                    />
                              </div>
                        </div>
                        {/* ======== service reviews ======= */}
                        {/* <hr className="my-4 border-gray-500" />
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
                        </form> */}
                        <div className="space-y-4">
                              {service?.reviews?.map((comment) => (
                                    <div className="space-y-2 bg-gray-100 p-2 rounded">
                                          <div className="flex items-start  space-x-2">
                                                <div className="rounded-full mt-1 bar overflow-hidden w-8 h-8">
                                                      <div
                                                            height={32}
                                                            src="/placeholder.svg"
                                                            style={{
                                                                  aspectRatio: "32/32",
                                                                  objectFit: "cover",
                                                            }}
                                                            width={32}
                                                            className="rounded-full  flex justify-center items-center border border-black"
                                                      >
                                                            {comment.user.name.slice(0, 1)}
                                                      </div>
                                                </div>
                                                <div className="space-y-1">
                                                      <p className="text-sm font-medium">{comment.user.name}</p>
                                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {timeAgo(comment.timeStamp)}
                                                      </p>
                                                      <p className="text-gray-500 mr-l">{comment.text}</p>
                                                </div>
                                          </div>

                                    </div>
                              ))}
                        </div>

                        {/* ======== service reviews ======= */}

                        <div className=" mt-8">
                              <h3 className="text-gray-600 text-2xl font-medium">
                                    Relevant Service
                              </h3>
                              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                                    {more_services
                                          ?.filter((item) => item?._id !== service?._id)
                                          .slice(0, 4)
                                          .map((service) => (
                                                <div key={service._id} className=" border border-black ">
                                                      <Link to={`/service/${service._id}`} className="relative block group">
                                                            <img
                                                                  src={service.img}
                                                                  alt={service.title}
                                                                  className="object-contain rounded-md w-full transition duration-500"
                                                            />
                                                            <div className="px-5 py-2 text-center">
                                                                  <h3 className="mb-0 mt-4 ptitle text-l font-semibold text-black">{service.title}</h3>
                                                                  <h3 className="mb-2 mt-0 ptitle text-l font-semibold text-black">BDT.{service.price}TK</h3>
                                                                  <Link to={`/service/${service._id}`} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Show Details</Link>
                                                            </div>

                                                      </Link>
                                                </div>
                                          ))}
                              </div>
                        </div>
                  </section>
            </div>
      );
};

export default SingleService;
