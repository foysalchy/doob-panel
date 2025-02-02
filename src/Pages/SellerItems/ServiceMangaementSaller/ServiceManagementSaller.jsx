import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import ServiceDetailsModal from "./ServiceDetailsModal";
import LoaderData from "../../../Common/LoaderData";
import { RxCross2 } from "react-icons/rx";
import BrightAlert from "bright-alert";
import useImageUpload from "../../../Hooks/UploadImage";
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";

const ServiceManagementSaller = () => {
      useAddDivToTableCells()
      const { shopInfo, user } = useContext(AuthContext);
      const [selectedStarIndex, setSelectedStarIndex] = useState(-1);

      const {
            data: serviceOrder = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["serviceOrderSaller"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/my-service?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const [images, setImages] = useState([]);

      const handleImageChange = (e) => {
            const fileList = Array.from(e.target.files);
            const newImages = fileList.map((file) => ({
                  file: file,
                  url: URL.createObjectURL(file),
            }));
            setImages([...images, ...newImages]);
      };

      const handleImageRemove = (index) => {
            const updatedImages = [...images];
            updatedImages.splice(index, 1);
            setImages(updatedImages);
      };

      const handleStarClick = (index) => {
            setSelectedStarIndex(index);
      };

      const renderStars = () => {
            const stars = [];
            for (let i = 0; i < 5; i++) {
                  const isGold = i <= selectedStarIndex;
                  stars.push(
                        <button type="button" key={i} onClick={() => handleStarClick(i)}>
                              <svg
                                    className={`h-6 w-6  ${isGold ? "bg-yellow-500" : "bg-gray-500"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                              >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                        </button>
                  );
            }
            return stars;
      };

      const { uploadImage } = useImageUpload();

      const [loader, setLoader] = useState(false);

      const [input, setInput] = useState("");
      const [filteredData, setFilteredData] = useState(serviceOrder);
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");



      const searchItem = () => {
            // Check if all filter fields are empty
            if (!input && !startDate && !endDate) {
                  setFilteredData(serviceOrder); // Set the initial state to show all service orders
                  return; // Exit the function early
            }

            // Filter service orders based on input and date range
            const filteredServiceOrder = serviceOrder.filter((order) => {
                  // Check if any value in the order matches the search input
                  const matchesSearch = Object.values(order).some(
                        (value) =>
                              typeof value === "string" &&
                              value.toLowerCase().includes(input.toLowerCase())
                  );

                  // Check if the order timestamp falls within the date range
                  const matchesDateRange =
                        startDate && endDate
                              ? new Date(order.timestamp) >= new Date(startDate) &&
                              new Date(order.timestamp) <= new Date(endDate)
                              : true;

                  // Return true if both conditions are met
                  return matchesSearch && matchesDateRange;
            });

            // Set the filtered data to the state
            setFilteredData(filteredServiceOrder);
      };

      const handleDateRangeChange = (e) => {
            e.preventDefault();
            const start = e.target.startDate.value;
            const end = e.target.endDate.value;
            setStartDate(start);
            setEndDate(end);
            searchItem();
      };

      useEffect(() => {
            setFilteredData(serviceOrder);
      }, [input, isLoading]);

      const [currentPage, setCurrentPage] = useState(1);

      const pageSize = 6;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(filteredData?.length / pageSize);

      const currentData = filteredData && filteredData?.slice(startIndex, endIndex);

      const handleChangePage = (newPage) => {
            setCurrentPage(newPage);
      };

      const renderPageNumbers = () => {
            const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
            const endPage = Math.min(totalPages, startPage + pageSize - 1);

            return (
                  <React.Fragment>
                        {/* First Page */}
                        {startPage > 1 && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
                                          onClick={() => handleChangePage(1)}
                                    >
                                          1
                                    </button>
                              </li>
                        )}

                        {/* Current Page */}
                        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                              const pageNumber = startPage + index;
                              return (
                                    <li key={pageNumber}>
                                          <button
                                                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                                                      ? "border-blue-600 bg-blue-600 text-white"
                                                      : "border-gray-900 bg-white text-center leading-8 text-gray-900"
                                                      }`}
                                                onClick={() => handleChangePage(pageNumber)}
                                          >
                                                {pageNumber}
                                          </button>
                                    </li>
                              );
                        })}

                        {/* Last Page */}
                        {endPage < totalPages && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
                                          onClick={() => handleChangePage(totalPages)}
                                    >
                                          {totalPages}
                                    </button>
                              </li>
                        )}
                  </React.Fragment>
            );
      };

      const handleStateUpdate = (id, status) => {
            console.log(status, "state update");
            fetch(
                  `"https://doob.dev/api/v1/admin/get-all-service-order?id=${id}`,
                  {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                        },
                        body: JSON.stringify({ status: status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        alert("update successful");
                        refetch();
                  });
      };

      const [review_modal, set_review_modal] = useState(false);

      const [openModal, setIsModalOpen] = useState(false);

      function calculateEndDate(orderDate, timeDuration) {
            let endDate;
            switch (timeDuration) {
                  case "Monthly":
                        endDate = new Date(
                              new Date(orderDate).getFullYear(),
                              new Date(orderDate).getMonth() + 1,
                              new Date(orderDate).getDate()
                        );
                        break;
                  case "Yearly":
                        endDate = new Date(
                              new Date(orderDate).getFullYear() + 1,
                              new Date(orderDate).getMonth(),
                              new Date(orderDate).getDate()
                        );
                        break;
                  case "OneTime":
                        endDate = new Date(orderDate);
                        break;
                  default:
                        endDate = null;
            }
            return endDate;
      }

      const uploadReview = async (e) => {
            e.preventDefault();
            setLoader(true);
            if (!user) {
                  BrightAlert({ timeDuration: 3000, title: "Login First", icon: "warning" });
                  return;
            }
            const reviews = e.target.review.value;
            const userData = { name: user.name, userId: user._id };
            const timestamp = new Date().getTime();
            let galleryImageUrls = [];
            for (let i = 0; i < images.length; i++) {
                  const imageUrl = await uploadImage(images[i].file);
                  galleryImageUrls.push(imageUrl);
            }
            const star = selectedStarIndex + 1;
            let data = {
                  text: reviews, user: userData, timeStamp: timestamp, star: star,
                  images: galleryImageUrls,
            };


            fetch(`https://doob.dev/api/v1/admin/service/reviews?service_id=${review_modal}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((response) => response.json())
                  .then((data) => {
                        setLoader(false);
                        BrightAlert({ timeDuration: 3000, title: "Review Added", icon: "success" });
                        set_review_modal(false);

                  })
      };


      return (
            <section className="container  mx-auto">
                  <div className="md:flex justify-between items-center">
                        
                              <div className="relative md:w-full mb-3 md:mb-0  w-[100%]">
                                   
                                    <input
                                          type="search"
                                          value={input}
                                          onChange={(e) => {
                                                setInput(e.target.value), searchItem();
                                          }}
                                          name="Search"
                                          placeholder="Search..."
                                          className="md:w-32 w-[100%] py-2 pl-2 text-sm rounded-md   focus:outline-none  text-gray-900"
                                    />
                              </div>
                        

                        <form onSubmit={handleDateRangeChange} className="flex space-x-4">
                              <input
                                    type="date"
                                    className="border border-gray-300 px-2 py-1 rounded"
                                    name="startDate"
                              />
                              <span className="text-gray-500">to</span>
                              <input
                                    name="endDate"
                                    type="date"
                                    className="border border-gray-300 px-2 py-1 rounded"
                              />
                              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Apply
                              </button>
                        </form>
                  </div>

                  <div className="flex flex-col">
                        <div className=" w-full bar overflow-x-auto ">
                              <div className="inline-block min-w-full py-2 align-middle ">
                                    <div className="bar overflow-hidden border border-gray-200md:rounded-lg">
                                          <table className=" divide-y  divide-gray-200 ">
                                                <thead className="bg-gray-50 ">
                                                      <tr>
                                                            <th
                                                                  scope="col"
                                                                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  <div className="flex items-center gap-x-3">
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Service Image</span>
                                                                        </button>
                                                                  </div>
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Order
                                                            </th>


                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Price
                                                            </th>

                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Time
                                                            </th>



                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Customer
                                                            </th>

                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Service Category
                                                            </th>

                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Payment Info
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  See Preview
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Actions
                                                            </th>
                                                            <th
                                                                  scope="col"
                                                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                  Review
                                                            </th>
                                                      </tr>
                                                </thead>
                                                {isLoading && <LoaderData />}
                                                <tbody className="bg-white divide-y divide-gray-200 ">
                                                      {currentData
                                                            ?.filter(
                                                                  (value, index, self) =>
                                                                        index ===
                                                                        self.findIndex((t) => t.productId === value.productId)
                                                            )
                                                            ?.map((order, idx) => (
                                                                  <tr key={idx}>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <img
                                                                                    className="h-10 w-10 rounded-sm"
                                                                                    src={order.productImg}
                                                                                    alt=""
                                                                              />
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900  whitespace-nowrap">
                                                                              <div className="inline-flexs items-center gap-x-3">
                                                                                    <p># {order._id}</p>
                                                                                    <p>  {order.productTitle}</p>
                                                                              </div>
                                                                              
                                                                        </td>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <p> Item :{order?.productPrice}</p>
                                                                              <p>Buy:   {order?.buyingPrice}</p>
                                                                        </td>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              Create: {new Date(order.timestamp).toDateString()}
                                                                              <p>Expire:  {calculateEndDate(
                                                                                    order.timestamp,
                                                                                    order?.time_duration
                                                                              )?.toDateString() ?? "N/A"}</p>
                                                                        </td>

                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <div className="flex items-center gap-x-2">
                                                                                    <div>
                                                                                          <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                                                                                {order?.userEmail}
                                                                                          </p>
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              {order?.productCategory}
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              {order?.time_duration}
                                                                              <p>  {order?.method?.Getaway}</p>
                                                                        </td>


                                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                              <button
                                                                                    className="bg-slate-300 p-2 text-black rounded-lg"
                                                                                    onClick={() => setIsModalOpen(order)}
                                                                              >
                                                                                    See Service History
                                                                              </button>
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                              <button
                                                                                    onClick={() =>
                                                                                          handleStateUpdate(
                                                                                                order?._id,
                                                                                                order?.status ? false : true
                                                                                          )
                                                                                    }
                                                                                    rel="noopener noreferrer"
                                                                                    className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group bg-gray-700 border-gray-700"
                                                                              >
                                                                                    <span
                                                                                          aria-hidden="true"
                                                                                          className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"
                                                                                    ></span>
                                                                                    <span className=" dark:text-gray-100">
                                                                                          {order?.status === true ? 'Approve' : order?.status === false ? 'Pending' : order?.status ?? 'Inactive'}

                                                                                    </span>
                                                                              </button>
                                                                        </td>
                                                                        <td>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          set_review_modal(
                                                                                                order?.productId

                                                                                          )
                                                                                    }
                                                                                    rel="noopener noreferrer"
                                                                                    className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group bg-gray-700 border-gray-700"
                                                                              >
                                                                                    <span
                                                                                          aria-hidden="true"
                                                                                          className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"
                                                                                    ></span>
                                                                                    <span className=" dark:text-gray-100">
                                                                                          Review

                                                                                    </span>
                                                                              </button>
                                                                        </td>
                                                                        {
                                                                              review_modal && (
                                                                                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-5 bg-black bg-opacity-50">
                                                                                          <div className="w-full max-w-2xl overflow-hidden bg-white rounded-lg shadow-xl">
                                                                                                <div className="sticky top-0 flex items-start justify-between w-full p-4 bg-white border-b border-gray-200">
                                                                                                      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                                                                                            Service Review
                                                                                                      </h2>
                                                                                                      <button
                                                                                                            onClick={() => { set_review_modal(false), setLoader(false), setImages([]), setSelectedStarIndex(-1) }}
                                                                                                            className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                                                                      >
                                                                                                            <RxCross2 className="w-6 h-6" />
                                                                                                      </button>
                                                                                                </div>

                                                                                                <div className="p-6">
                                                                                                      <form onSubmit={uploadReview} className="space-y-4">

                                                                                                            <div className="space-y-4">

                                                                                                                  <div className=" h-[300px] w-full bar overflow-y-scroll">
                                                                                                                        <div className="space-y-2">
                                                                                                                              <textarea
                                                                                                                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none"
                                                                                                                                    id="review"
                                                                                                                                    name="review"
                                                                                                                                    placeholder="Share your thoughts..."
                                                                                                                                    rows={4}
                                                                                                                              />
                                                                                                                        </div>
                                                                                                                        <div className="space-y-2">
                                                                                                                              <div className="flex items-center space-x-2">
                                                                                                                                    <input
                                                                                                                                          name="images"
                                                                                                                                          className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none"
                                                                                                                                          id="images"
                                                                                                                                          multiple
                                                                                                                                          type="file"
                                                                                                                                          onChange={handleImageChange}
                                                                                                                                    />
                                                                                                                              </div>
                                                                                                                              <div className="grid grid-cols-3 gap-2">
                                                                                                                                    {images.map((image, index) => (
                                                                                                                                          <div className="relative" key={index}>
                                                                                                                                                <img
                                                                                                                                                      alt={`Image ${index + 1}`}
                                                                                                                                                      className="h-20 w-full border rounded-md object-cover"
                                                                                                                                                      src={image.url}
                                                                                                                                                />
                                                                                                                                                <button
                                                                                                                                                      className="absolute top-1 right-1 rounded-full bg-gray-800 p-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                                                                                                                      type="button"
                                                                                                                                                      onClick={() => handleImageRemove(index)}
                                                                                                                                                >
                                                                                                                                                      <svg
                                                                                                                                                            className="h-4 w-4"
                                                                                                                                                            fill="currentColor"
                                                                                                                                                            viewBox="0 0 20 20"
                                                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                      >
                                                                                                                                                            <path
                                                                                                                                                                  clipRule="evenodd"
                                                                                                                                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                                                                                                                  fillRule="evenodd"
                                                                                                                                                            />
                                                                                                                                                      </svg>
                                                                                                                                                </button>
                                                                                                                                          </div>
                                                                                                                                    ))}
                                                                                                                              </div>
                                                                                                                        </div>
                                                                                                                        <div className="flex mt-2 items-center space-x-2">
                                                                                                                              <label className="font-medium" htmlFor="rating">
                                                                                                                                    Rating:
                                                                                                                              </label>
                                                                                                                              <div className="flex items-center space-x-1">
                                                                                                                                    {renderStars()}
                                                                                                                              </div>
                                                                                                                        </div>
                                                                                                                  </div>
                                                                                                                  <div className="flex justify-end  space-x-2">
                                                                                                                        <button
                                                                                                                              disabled={loader}
                                                                                                                              onClick={() => set_review_modal(false)}
                                                                                                                              className="rounded-md  bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                                                                                              type="button"
                                                                                                                        >
                                                                                                                              Cancel
                                                                                                                        </button>
                                                                                                                        <button
                                                                                                                              className={`rounded-md bg-primary px-4 py-2 text-sm font-medium text-white ${loader
                                                                                                                                    ? "opacity-50 cursor-not-allowed"
                                                                                                                                    : "hover:bg-primary-600"
                                                                                                                                    } focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700`}
                                                                                                                              type="submit"
                                                                                                                              disabled={loader}
                                                                                                                        >
                                                                                                                              {loader ? (
                                                                                                                                    <svg
                                                                                                                                          className="animate-spin h-4 w-4 mr-3 border-t-2 border-b-2 border-white rounded-full"
                                                                                                                                          viewBox="0 0 24 24"
                                                                                                                                    ></svg>
                                                                                                                              ) : (
                                                                                                                                    "Submit"
                                                                                                                              )}
                                                                                                                        </button>
                                                                                                                  </div>
                                                                                                            </div>
                                                                                                      </form>
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              )
                                                                        }
                                                                        {openModal && (
                                                                              <ServiceDetailsModal
                                                                                    openModal={openModal}
                                                                                    setIsModalOpen={setIsModalOpen}
                                                                                    shopInfo={shopInfo}
                                                                                    handleStateUpdate={handleStateUpdate}
                                                                              ></ServiceDetailsModal>
                                                                        )}
                                                                  </tr>
                                                            ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="flex justify-center mt-4">
                        <ol className="flex justify-center gap-1 text-xs font-medium">
                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                          disabled={currentPage === 1}
                                    >
                                          <span className="sr-only">Prev Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiLeftArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>

                              {renderPageNumbers()}

                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() =>
                                                handleChangePage(Math.min(totalPages, currentPage + 1))
                                          }
                                          disabled={currentPage === totalPages}
                                    >
                                          <span className="sr-only">Next Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiRightArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>
                        </ol>
                  </div>
            </section>
      );
};

export default ServiceManagementSaller;
