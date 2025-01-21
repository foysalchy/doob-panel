import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import MetaHelmet from "../../../Helmate/Helmate";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert";
import { Star } from "lucide-react";

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



      const [active, setActive] = useState('desc');
      const [activeS, setActiveS] = useState('m');


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
            <div className="px-4 pt-1 relative mx-auto sm:max-w-xl md:max-w-full  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-2">
                  <MetaHelmet title={service?.MetaTag} description={service?.MetaDescription} image={service?.img} />
                  <style jsx>{`
                        @media(min-width:676px){
                              .container_service{
                                    box-shadow: rgb(205, 205, 205) 0px 0px 8px;
                                    border-radius: 10px;
                                    margin: 10px;
                              }
                        }
                  `}</style>
                  <section className="text-gray-600 body-font bar overflow-hidden">
                        <div className="container_service"   >
                              <div className=" mx-auto flex flex-wrap">
                                    <img
                                          className="lg:w-2/5   round-lg w-full lg:min-h-[400px] lg:min-w-[400px] md:p-5 p-2 h-64 object-cover object-center rounded"
                                          src={service?.img}
                                          srcSet={service?.img}
                                          alt={service?.title}
                                          style={{borderRadius:'15px'}}
                                    />
                                    <div className="lg:w-2/5 w-full lg:pl-10 md:py-6  md:mt-6  md:p-5 p-2 lg:mt-0">
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
                                                                        style={{
                                                                              border: activeS === 'm' ? '1px solid green' : '1px solid #00000026'
                                                                          }}
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
                                                                                    onChange={(e) => {onChangeDiscount(e.target.value);setActiveS('m')}}
                                                                                    className="mr-2  opacity-0 absolute"
                                                                              />
                                                                              <label className=" cursor-pointer" htmlFor="pricingPriceOne" >
                                                                                    Monthly  {" "}

                                                                                    <p>BDT.{parseInt(service.price) - parseInt(service?.pricingPriceOne.split(",")[0])}{" "}</p>
                                                                              </label>
                                                                        </div>
                                                                  )}
                                                                  {service?.pricingPriceSix && (
                                                                        <div
                                                                        style={{
                                                                              border: activeS === 's' ? '1px solid green' : '1px solid #00000026'
                                                                          }}
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
                                                                                    onChange={(e) => {onChangeDiscount(e.target.value),setActiveS('s')}}
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
                                                                        style={{
                                                                              border: activeS === 'o' ? '1px solid green' : '1px solid #00000026'
                                                                          }}
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
                                                                                    onChange={(e) => {onChangeDiscount(e.target.value),setActiveS('o')}}
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
                                                                        style={{
                                                                              border: activeS === 't' ? '1px solid green' : '1px solid #00000026'
                                                                          }}
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
                                                                                    onChange={(e) => {onChangeDiscount(e.target.value),setActiveS('t')}}
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
                                                
                                          </div>
                                          <div className="flex items-center">
                                                      {/* <Link to={`/user-service-checkout/${service?._id}`}> */}
                                                      {user?.role === "supperadmin" ? (
                                                            <div className="flex mt-2 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none  rounded">
                                                                  OWN SERVICE
                                                            </div>
                                                      ) : (
                                                            <button
                                                                  button
                                                                  onClick={handleOrder}
                                                                  className="flex mt-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                                            >
                                                                  Buy Now
                                                            </button>
                                                      )}

                                                </div>
                                    </div>
                                    <div className="lg:w-1/5 w-full md:py-2  mt-2 pt-2 lg:mt-0 md:block hidden" style={{background:'#f1f1f1'}}>
                                          <h3 className="ml-3"><b>Popular Service</b></h3>
                                          <ul>
                                          {more_services
                                          ?.filter((item) => item?._id !== service?._id)
                                          .slice(0, 6)
                                          .map((service) => (
                                                <li key={service._id} className="rounded p-2 mx-3 mb-1 bg-white">
                                                      <Link to={`/service/${service._id}`} className="relative block group flex">
                                                            <img
                                                                  src={service.img}
                                                                  alt={service.title}
                                                                  className="  rounded-md w-[60px] object-contain transition duration-500"
                                                            />
                                                            <div className="px-2 py-1 text-left">
                                                                  <h3 style={{fontSize:'14px'}} className="mb-0 mt-1 ptitle    text-black">{service.title}</h3>
                                                                  <h3 style={{fontSize:'14px'}} className="mb-0 mt-0 ptitle   text-black">BDT.{service.price}TK</h3>
                                                                 
                                                            </div>

                                                      </Link>
                                                </li>
                                          ))}</ul>
                                    </div>
                              </div>
                             
                        </div>
                        <br />
                        <div className="flex  gap-3 items-center border-b mt-3" style={{margin:'10px'}}>
                                    <h2 onClick={() => setActive('desc')}
                                          className={active === 'desc' ? "bg-green-500 py-2 px-5 rounded cursor-pointer" : " py-2 cursor-pointer px-5 rounded"}

                                    >
                                          <span className="font-medium  sm lg:text-lg ">
                                                Description
                                          </span>
                                    </h2>
                                    
                                    <h2 className={active === 'review' ? "bg-green-500 py-2 px-5 rounded cursor-pointer" : "cursor-pointer py-2 px-5 rounded"} onClick={() => setActive('review')}>
                                          <span className="font-medium lg:text-lg ">
                                                Review
                                          </span>
                                    </h2>

                              </div>
                              {active === 'desc' && (
                              <div className=" mx-auto mt-4 v">

                                    <p
                                          className=" text_editor jodit-editor"
                                          dangerouslySetInnerHTML={{
                                                __html: service?.message,
                                          }}
                                    />
                              </div>)}
                        <div className="space-y-4 " style={{margin:'10px'}}>
                              <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
                              </div>
                              {service?.reviews?.map((review, index) => (
                                    <div key={index} className="bg-white border rounded-lg p-6 space-y-4">
                                          <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                                            {review.user.name.charAt(0).toUpperCase()}
                                                      </div>
                                                </div>
                                                <div className="flex-grow">
                                                      <div className="flex items-center justify-between">
                                                            <h3 className="text-lg font-semibold text-gray-800">{review.user.name}</h3>
                                                            <span className="text-sm text-gray-500">{timeAgo(review.timeStamp)}</span>
                                                      </div>
                                                      <div className="flex items-center mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                  <Star
                                                                        key={i}
                                                                        className={`w-5 h-5 ${i < review.star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                              }`}
                                                                  />
                                                            ))}
                                                      </div>
                                                      <p className="mt-2 text-gray-600">{review.text}</p>
                                                      {review.images && review.images.length > 0 && (
                                                            <div className="mt-4 flex flex-wrap gap-2">
                                                                  {review.images.map((image, imgIndex) => (
                                                                        <a href={image} target="_blank" rel="noopener noreferrer">
                                                                              <img
                                                                                    key={imgIndex}
                                                                                    src={image}
                                                                                    alt={`Review image ${imgIndex + 1}`}
                                                                                    className="w-24 h-24 object-cover rounded-md"
                                                                              />
                                                                        </a>
                                                                  ))}
                                                            </div>
                                                      )}
                                                </div>
                                          </div>
                                    </div>
                              ))}

                        </div>

                        {/* ======== service reviews ======= */}
                        <div className="lg:w-1/5 w-full md:py-2  mt-2  py-3 lg:mt-0 md:hidden block" style={{background:'#f1f1f1'}}>
                                          <h3 className="ml-3"><b>Popular Service</b></h3>
                                          <ul>
                                          {more_services
                                          ?.filter((item) => item?._id !== service?._id)
                                          .slice(0, 6)
                                          .map((service) => (
                                                <li key={service._id} className="rounded p-2 mx-3 mb-1 bg-white">
                                                      <Link to={`/service/${service._id}`} className="relative block group flex">
                                                            <img
                                                                  src={service.img}
                                                                  alt={service.title}
                                                                  className="  rounded-md w-[60px] object-contain transition duration-500"
                                                            />
                                                            <div className="px-2 py-1 text-left">
                                                                  <h3 style={{fontSize:'14px'}} className="mb-0 mt-1 ptitle    text-black">{service.title}</h3>
                                                                  <h3 style={{fontSize:'14px'}} className="mb-0 mt-0 ptitle   text-black">BDT.{service.price}TK</h3>
                                                                 
                                                            </div>

                                                      </Link>
                                                </li>
                                          ))}</ul>
                                    </div>

                        <div className=" mt-8">
                              <h3 className="text-gray-600 text-2xl font-medium">
                                    Relevant Service
                              </h3>
                              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                                    {more_services
                                          ?.filter((item) => item?._id !== service?._id)
                                          .slice(0, 6)
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
