import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import ShippingModal from "../ShipingModal";
import { Link } from "react-router-dom";
import OrderAllinfoModal from "../OrderAllinfoModal";
import { BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import RejectModal from "./RejectModal";
import showAlert from "../../../../../Common/alert";

import Select from "react-select";

const ClimAndReturn = () => {
      const [modalOn, setModalOn] = useState(false);
      const [cartProducts, setCartProducts] = useState([]);
      const [search_item, set_search_item] = useState([]);

      const { shopInfo, setCheckUpData } = useContext(AuthContext);
      const scrollRef = useRef(null);
      const {
            data: normalOrderAllData = [],
            refetch,
            isLoading: loadingAllNormalOrder,
      } = useQuery({
            queryKey: ["sellerOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });





      const [offsetAll, setOffsetAll] = useState(0);

      const [totalDarazOrderedData, setTotalDarazOrderedData] = useState({
            count: 0,
            orders: [],
            countTotal: 0
      });

      const { refetch: refetchDarazAll, isLoading: loadingDaraz } = useQuery({
            queryKey: ["DarazAllOrderCount", shopInfo._id, offsetAll],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=All&offset=${offsetAll}`
                  );

                  if (!res.ok) {
                        throw new Error('Failed to fetch orders');
                  }

                  const data = await res.json();
                  return data.data;
            },
            onSuccess: (data) => {

                  setTotalDarazOrderedData(prevState => ({
                        count: prevState.count + (data.count || 0), // Accumulate count if needed
                        orders: [...(prevState.orders || []), ...(data.orders || [])], // Append new orders
                        countTotal: data.countTotal || prevState.countTotal // Update total count
                  }));
            },
            keepPreviousData: true, // Keeps previous data while fetching new data
      });





      useEffect(() => {
            if (totalDarazOrderedData?.orders?.length == totalDarazOrderedData.countTotal && totalDarazOrderedData.countTotal != 0) {
                  return
            }
            else {
                  setOffsetAll(totalDarazOrderedData?.orders?.length)
                  refetchDarazAll()
            }
      }, [totalDarazOrderedData?.orders?.length, totalDarazOrderedData.countTotal]);



      const {
            data: totalWooOrderData = [],
            refetchWooData,
            isLoading: loadingWoo,
      } = useQuery({
            queryKey: ["totalWooOrderData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/woo-commerce-order-claim?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  console.log(data);
                  return data.data;
            },
      });

      const [selectSearchCategory, setSelectSearchCategory] = useState({
            label: "Site Order",
            value: "Site Order",
      });



      const [loadingSearchData, setLoadingSearchData] = useState(false);
      const [emptyOrder, setEmptyOrder] = useState(false);

      const [category_change, set_category_change] = useState(true);


      const handleCategoryChange = () => {
            setLoadingSearchData(true);
            set_category_change(true)
            if (selectSearchCategory.value === "Site Order") {
                  if (normalOrderAllData?.length > 0) {
                        set_search_item(normalOrderAllData.filter((item) => item.status !== "Pending")); // Set all Site Orders
                        setEmptyOrder(null); // Clear empty order message
                  } else {
                        setEmptyOrder({ message: "No Site Orders Found" });
                        set_search_item([]); // Clear cart products
                  }
            } else if (selectSearchCategory.value === "Daraz Order") {
                  if (totalDarazOrderedData?.orders?.length > 0) {
                        set_search_item(totalDarazOrderedData.orders); // Set all Daraz Orders
                        setEmptyOrder(null);
                  } else {
                        setEmptyOrder({ message: "No Daraz Orders Found" });
                        set_search_item([]);
                  }
            } else if (selectSearchCategory.value === "Woo Order") {
                  if (!loadingWoo && totalWooOrderData?.length > 0) {
                        set_search_item(totalWooOrderData); // Set all Woo Orders
                        setEmptyOrder(null);
                  } else {
                        setEmptyOrder({ message: "No Woo Orders Found" });
                        set_search_item([]);
                  }
            }

            setLoadingSearchData(false); // Stop loading
            set_category_change(false)
      };

      useEffect(() => {
            handleCategoryChange();
      }, [selectSearchCategory.value]);

      const [showAlert, setShowAlert] = useState(false);
      const [approveNote, setapproveNote] = useState("");

      const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
      const [refundCheck, setRefundCheck] = useState(false);
      const [search, setSearch] = useState("");

      const handleSearch = (e) => {
            const searchValue = e.target.value.trim();
            if (!searchValue) {
                  set_search_item(cartProducts); // Reset search results if input is cleared

                  setEmptyOrder(false);
                  return;
            }

            setSearch(searchValue);
            setEmptyOrder(false);
            setLoadingSearchData(true);

            const foundProducts = [];

            // Site Order Search (Partial Match)
            if (selectSearchCategory.value === "Site Order") {
                  const findNormalProducts = normalOrderAllData.filter((itm) =>
                        itm.orderNumber.toLowerCase().includes(searchValue.toLowerCase())
                  );

                  if (findNormalProducts.length > 0) {
                        foundProducts.push(...findNormalProducts);
                  } else {
                        setEmptyOrder({ message: "Not Found Any Site Order" });
                  }
                  setLoadingSearchData(false);

                  // Daraz Order Search (Partial Match)
            } else if (selectSearchCategory.value === "Daraz Order") {
                  if (totalDarazOrderedData?.orders?.length > 0) {
                        const findDarazProducts = totalDarazOrderedData.orders.filter((itm) =>
                              itm.order_number.toString().includes(searchValue)
                        );

                        if (findDarazProducts.length > 0) {
                              foundProducts.push(...findDarazProducts);
                        } else {
                              setEmptyOrder({ message: "Not Found Daraz Order" });
                        }
                  } else {
                        setEmptyOrder({ message: "Not Found Daraz Order" });
                  }
                  setLoadingSearchData(false);

                  // Woo Order Search (Partial Match)
            } else if (selectSearchCategory.value === "Woo Order") {
                  if (!loadingWoo && totalWooOrderData?.length > 0) {
                        const findWooProducts = totalWooOrderData.filter((itm) =>
                              itm.orderNumber.toLowerCase().includes(searchValue.toLowerCase())
                        );

                        if (findWooProducts.length > 0) {
                              foundProducts.push(...findWooProducts);
                        } else {
                              setEmptyOrder({ message: "Not Found Woo Order" });
                        }
                  } else {
                        setEmptyOrder({ message: "Not Found Woo Order" });
                  }
                  setLoadingSearchData(false);
            }

            // Set results
            set_search_item(foundProducts);
            setLoadingSearchData(false);
      };


      const filtered_order = search_item.length
            ? search_item
            : cartProducts;


      const order_statuses =
            selectSearchCategory.value === "Site Order"
                  ? ["claim", "shipped", "RefoundOnly", "returned", "Cancel"]
                  : selectSearchCategory.value === "Daraz Order"
                        ? ["shipped_back", "canceled", "RefoundOnly", "returned", "Cancel", "shipped_back_success", "delivered"]
                        : []; // Default to an empty array if no category matches

      const filtered_orders = (() => {
            if (selectSearchCategory.value === "Site Order") {
                  return filtered_order?.filter(order => order_statuses.includes(order.status)) || filtered_order;
            } else if (selectSearchCategory.value === "Daraz Order") {
                  return filtered_order?.filter(order => {
                        return Array.isArray(order?.statuses) && order?.statuses.some(status => order_statuses.includes(status));
                  }) || filtered_order;
            }
            return filtered_order; // Return all orders if no category matches
      })();





      // Calculate the range of items to display based on pagination
      const itemsPerPage = 20;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(filtered_orders?.length / itemsPerPage);

      // Calculate the indices for the items to show
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Slice the data to show only the items for the current page
      const currentItems = filtered_orders?.slice(startIndex, endIndex);






      // Handle page changes
      const handlePageChange = (newPage) => {
            if (newPage < 1 || newPage > totalPages) return;
            if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                  });
            } else {
                  window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                  });
            }
            setCurrentPage(newPage);

      };
      const formattedDate = (time) => {
            const date = new Date(time);

            // Extract individual components (year, month, day, etc.)
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            // Format the components as needed
            const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
                  .toString()
                  .padStart(2, "0")}`;
            const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            const finalDate = formattedDate + " " + formattedTime;
            return finalDate;
      };


      const productStatusUpdate = (status, order) => {
            fetch(
                  `https://doob.dev/api/v1/seller/order-status-update?orderId=${order?._id}&status=${status}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status, orderId: order?._id, approveNote }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        refetch();
                        setShowAlert(false);
                        setapproveNote("");
                        setSelectAll(!selectAll);
                        setIsUpdateQuantity(false);
                        setCartProducts([]);
                  });
      };

      const { data: ships = [] } = useQuery({
            queryKey: ["getaway"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/shipping-interrogation/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const ratial_price = (productList) => {
            let ratial_price = 0;
            for (let i = 0; i < productList?.length; i++) {
                  const price =
                        parseFloat(productList[i]?.price) *
                        parseFloat(productList[i]?.quantity);
                  ratial_price += price;
            }
            return ratial_price;
      };

      function getTimeAgo(timestamp) {
            let eventTime;
            if (typeof timestamp === "string") {
                  eventTime = new Date(timestamp).getTime();
            } else if (typeof timestamp === "number") {
                  eventTime = timestamp;
            } else {
                  throw new Error("Invalid timestamp format");
            }
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - eventTime;

            const minutes = Math.floor(timeDifference / (1000 * 60));
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (minutes < 60) {
                  return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
            } else if (hours < 24) {
                  return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
            } else {
                  return `${days} day${days !== 1 ? "s" : ""} ago`;
            }
      }


      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const [readyToShip, setReadyToShip] = useState(false);

      const [showImage, setShowImage] = useState(false);
      const [selectedImage, setSelectedImage] = useState("");

      const handleImageClick = (image) => {
            setSelectedImage(image);
            setShowImage(true);
      };

      const handleProductStatusUpdate = (order) => {
            console.log(order);
            fetch(
                  `https://doob.dev/api/v1/seller/order-quantity-update?isUpdateQuantity=${isUpdateQuantity}&note=${approveNote}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(order),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        if (data.success) {
                              if (order.daraz || order.woo) {
                                    fetch(`https://doob.dev/api/v1/seller/claim-order-add`, {
                                          method: "PUT",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({
                                                ...order,
                                                status: "claim",
                                                approveNote,
                                          }),
                                    })
                                          .then((res) => res.json())
                                          .then((data) => {
                                                refetch();
                                                setShowAlert(false);
                                                setapproveNote("");
                                                setSelectAll(!selectAll);
                                                setIsUpdateQuantity(false);
                                                setCartProducts([]);
                                          });
                              } else {
                                    productStatusUpdate("claim", order);
                              }
                              // productStatusUpdate("claim", order);
                        } else {
                              setShowAlert(false);
                              setSelectAll(!selectAll);
                              setapproveNote("");
                              setIsUpdateQuantity(false);
                              alert("Failed to Update");
                        }
                  });
      };

      const viewDetails = (order) => {
            console.log(order);
            setOpenModal(true);

            fetch(
                  `https://doob.dev/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${order._id}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        const refund = { refund: data.data, order };
                        console.log(refund);
                        setDetails(refund);
                  });
      };
      const [refundData, setRefundData] = useState(true);
      const checkBox = (orderId) => {
            fetch(
                  `https://doob.dev/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${orderId}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        setRefundData(data);
                  });
      };

      const updateOrderInfo = (note, file, id) => {
            const noteData = { note, file, orderId: id };
            fetch("https://doob.dev/api/v1/seller/refound-order-info", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(noteData),
            })
                  .then((res) => res.json())
                  .then((data) => alert(` Successfully Done!`));
      };
      const [file, setFile] = useState();

      const handleFileChange = async (event) => {
            const file = event.target.files[0];
            const imageFormData = new FormData();
            imageFormData.append("image", file);
            const imageUrl = await uploadImage(imageFormData);
            setFile(imageUrl);
      };

      async function uploadImage(formData) {
            const url = "https://doob.dev/api/v1/image/upload-image";
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });
            const imageData = await response.json();
            return imageData.imageUrl;
      }

      const updateCourier_status = (id, courier_id) => {
            fetch(
                  `https://doob.dev/api/v1/admin/courier_status?orderId=${id}&id=${courier_id}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data?.status);
                        if (data?.status) {
                              alert("Successfully Updated");
                              refetch();
                        } else {
                              alert("Failed to Update");
                        }
                  });
      };

      const [selectedItems, setSelectedItems] = useState([]);

      const [selectAll, setSelectAll] = useState(false);

      const [ordersList, setOrderList] = useState([]);

      // Function to handle "Select All" action
      const handleSelectAll = () => {
            setSelectAll(!selectAll);
            if (!selectAll) {
                  // If selectAll is false, set ordersList to currentItems
                  setOrderList(currentItems);
                  setSelectedItems(currentItems);
            } else {
                  // If selectAll is true, set ordersList to an empty array
                  setOrderList([]);
                  setSelectedItems([]);
            }
            // yes
      };

      const handleCheckboxChange = (event, item) => {
            const isChecked = event.target.checked;
            if (isChecked) {
                  console.log("yes");
                  // If checkbox is checked, add item to selectedItems array
                  setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
                  setOrderList((prevSelectedItems) => [...prevSelectedItems, item]);
                  // setSelectAll(true);
            } else {
                  console.log("no");
                  // If checkbox is unchecked, remove item from selectedItems array
                  setSelectedItems((prevSelectedItems) =>
                        prevSelectedItems?.filter(
                              (selectedItem) => selectedItem._id !== item._id
                        )
                  );
                  setOrderList((prevSelectedItems) =>
                        prevSelectedItems?.filter(
                              (selectedItem) => selectedItem._id !== item._id
                        )
                  );
                  // asdfasd
            }
      };


      const handleApprove = () => {
            update_all_status_claim("approved");
      };

      // console.log(isUpdateQuantity);
      // console.log(note);
      const update_all_status_claim = (status) => {
            // Ask for confirmation to update status
            // const isConfirmedUpdate = confirm(
            //   "Are you sure you want to update the status?"
            // );
            ordersList.forEach((order) => {
                  // Ask for confirmation to update stock for each order

                  if (isUpdateQuantity) {
                        // If confirmed to update stock, call handleProductStatusUpdate
                        if (status === "reject") {
                              fetch(
                                    `https://doob.dev/api/v1/seller/order-quantity-update?isUpdateQuantity=${isUpdateQuantity}&note=${approveNote}`,
                                    {
                                          method: "PUT",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify(order),
                                    }
                              )
                                    .then((res) => res.json())
                                    .then((data) => {
                                          console.log(data);
                                          if (data.success) {
                                                console.log(order);
                                                if (order.daraz || order.woo) {
                                                      fetch(`https://doob.dev/api/v1/seller/claim-order-add`, {
                                                            method: "PUT",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                  ...order,
                                                                  status,
                                                                  approveNote,
                                                            }),
                                                      })
                                                            .then((res) => res.json())
                                                            .then((data) => {
                                                                  refetch();
                                                                  setShowAlert(false);
                                                                  setapproveNote("");
                                                                  setSelectAll(!selectAll);
                                                                  setIsUpdateQuantity(false);
                                                                  setCartProducts([]);
                                                            });
                                                } else {
                                                      productStatusUpdate(status, order);
                                                }
                                                refetch();
                                          } else {
                                                // setShowAlert(false);

                                                setapproveNote("");
                                                setIsUpdateQuantity(false);
                                                alert("Failed to Update");
                                                setSelectAll(!selectAll);
                                          }
                                    });
                        } else {
                              handleProductStatusUpdate(order);
                        }
                  } else {
                        // If not confirmed to update stock, call productStatusUpdate for claim
                        if (status === "reject") {
                              productStatusUpdate("reject", order);
                        } else {
                              productStatusUpdate("claim", order);
                        }
                  }
            });
            refetch();
      };

      const [isReject, setReject] = useState(false);


      const [rejectNote, setMessage] = useState(false);

      useEffect(() => {
            // Scroll to the top when currentPage changes
            window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
            });
      }, [currentPage]);

      return (
            <div ref={scrollRef} className="flex flex-col overflow-hidden mt-4 ">
                  <div className="my-4 ">
                        <label className="text-sm">Select Order Category</label>
                        <Select
                              // menuPortalTarget={document.body}
                              styles={{
                                    control: (provided) => ({
                                          ...provided,
                                          cursor: "pointer",
                                    }),
                                    option: (provided) => ({
                                          ...provided,
                                          cursor: "pointer",
                                    }),
                              }}
                              defaultValue={{ label: "Site Order", value: "Site Order" }}
                              onChange={setSelectSearchCategory}
                              name="searchCategory"
                              required
                              options={[
                                    // { label: "All", value: "All" },
                                    { label: "Site Order", value: "Site Order" },
                                    { label: "Daraz Order", value: "Daraz Order" },
                                    { label: "Woo Order", value: "Woo Order" },
                              ]}
                              placeholder="Please select"
                        />
                  </div>
                  <form
                        onChange={handleSearch}
                        className="flex items-center justify-between border w-[100%] bg-gray-100 ring-1 border-gray-900 p-2 rounded-md "
                  >
                        <BiSearch className="text-gray-600 text-lg" />
                        <input
                              name="search"
                              type="text"
                              className="outline-none  bg-transparent w-full px-2"
                              placeholder="Search..."
                        />
                  </form>
                  {(ordersList?.length > 0 || selectAll) && (
                        <div className="flex items-center gap-8">
                              <button
                                    onClick={() => setShowAlert(true)}
                                    className="bg-gray-800 w-[200px] mt-4 mb-6 text-white px-3 py-2 rounded"
                              >
                                    Approve
                              </button>
                              <button
                                    onClick={() => setReject(ordersList)}
                                    className="bg-gray-800 w-[200px] mt-4 mb-6 text-white px-3 py-2 rounded"
                              >
                                    Reject
                              </button>
                        </div>
                  )}
                  {/* modal for approved */}
                  {showAlert && (
                        <div className="fixed inset-0 z-10 bg-opacity-50 overflow-y-auto">
                              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div
                                          className="fixed inset-0 transition-opacity"
                                          aria-hidden="true"
                                    >
                                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                    </div>

                                    {/* This is the alert with text area for note */}
                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start w-full">
                                                      <div className="mt-3 text-center sm:mt-0 w-full sm:text-left">
                                                            <h3
                                                                  onClick={() => setIsUpdateQuantity(!isUpdateQuantity)}
                                                                  className=" text-lg flex gap-2 items-center cursor-pointer font-medium text-gray-900"
                                                            >
                                                                  <input
                                                                        className="h-4 w-4"
                                                                        type="checkbox"
                                                                        checked={isUpdateQuantity}
                                                                  />
                                                                  Do you update your product quantity?
                                                            </h3>

                                                            <div className="mt-2 w-full">
                                                                  <textarea
                                                                        value={approveNote}
                                                                        onChange={(e) => setapproveNote(e.target.value)}
                                                                        rows="4"
                                                                        cols="10"
                                                                        className="shadow-sm w-full p-2 focus:ring-blue-500 focus:border-blue-500 mt-1 block  sm:text-sm border-gray-300 rounded-md"
                                                                        placeholder="Enter your note here ..."
                                                                  ></textarea>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                                                <button
                                                      onClick={() => setShowAlert(false)}
                                                      type="button"
                                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                      Close
                                                </button>
                                                <button
                                                      onClick={() => handleApprove()}
                                                      type="button"
                                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                      Submit
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}

                  {isReject && (
                        <RejectModal
                              ordersList={ordersList}
                              isReject={isReject}
                              setReject={setReject}
                              refetch={refetch}
                        />
                  )}

                  <div className="overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                        <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                              <div className="overflow-hidden">
                                    <table className="w-full bg-white border text-center text-sm font-light">
                                          <thead className="border-b font-medium">
                                                <tr>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            <input
                                                                  type="checkbox"
                                                                  name=""
                                                                  id=""
                                                                  onChange={handleSelectAll}
                                                                  checked={selectAll}
                                                            />
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            #
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Details
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Document
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Order No.
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Order Date
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Pending Since
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Payment Method
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Retail Price
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Status
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Actions
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                <h2 className="text-center ">
                                                      {!loadingSearchData && emptyOrder?.message
                                                            ? emptyOrder?.message
                                                            : ""}
                                                </h2>
                                                {loadingSearchData ? (
                                                      <tr>
                                                            <h2 className="text-center">

                                                                  Loading Order....
                                                            </h2>
                                                      </tr>
                                                ) : (
                                                      currentItems?.map((item, index) => (
                                                            <React.Fragment key={item._id}>
                                                                  <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>

                                                                        <td
                                                                              scope="col"
                                                                              className="border-r px-2 py-4 font-[500]"
                                                                        >
                                                                              <input
                                                                                    type="checkbox"
                                                                                    name=""
                                                                                    id=""
                                                                                    // checked={selectAll}
                                                                                    onChange={(e) => handleCheckboxChange(e, item)}
                                                                                    checked={selectedItems.some(
                                                                                          (selectedItem) => selectedItem._id === item._id
                                                                                    )}
                                                                              />
                                                                        </td>
                                                                        <td className="border-r px-6 py-4 font-medium">
                                                                              {index + 1}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {!modalOn ? (
                                                                                    <button
                                                                                          onClick={() => setModalOn(item.order_number)}
                                                                                          className="px-4 py-2"
                                                                                    >
                                                                                          Details
                                                                                    </button>
                                                                              ) : (
                                                                                    <button
                                                                                          onClick={() => setModalOn(false)}
                                                                                          className="px-4 py-2"
                                                                                    >
                                                                                          Close
                                                                                    </button>
                                                                              )}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <Link
                                                                                    to={`/invoice/${item?._id}`}
                                                                                    onClick={handlePrint}
                                                                                    className="text-blue-600 font-[500]"
                                                                              >
                                                                                    Invoice
                                                                              </Link>
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              <Link
                                                                                    to="/seller/orders/manage-order/order-checkup"
                                                                                    onClick={() => setCheckUpData(item)}
                                                                                    className="text-blue-500 font-[400]"
                                                                              >
                                                                                    {item?.orderNumber ?? item?.order_number}
                                                                              </Link>
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {formattedDate(item?.timestamp ?? item?.created_at)}
                                                                        </td>
                                                                        <td className="border-r w-[200px] px-6 py-4">
                                                                              {getTimeAgo(item?.timestamp ?? item?.created_at)}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {item?.method?.Getaway ?? item?.payment_method}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4">
                                                                              {item?.productList?.length ? ratial_price(item?.productList) : item?.price}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4 ">
                                                                              {item?.status === "return" ? (
                                                                                    <button
                                                                                          onClick={() => setMessage(item)}
                                                                                          className="p-2 bg-gray-200"
                                                                                    >
                                                                                          {" "}
                                                                                          Show Message
                                                                                    </button>
                                                                              ) : (
                                                                                    <div>
                                                                                          {
                                                                                                selectSearchCategory.value === "Site Order"
                                                                                                      ? (item?.status || "Pending")
                                                                                                      : (item?.statuses || item.status)
                                                                                          }

                                                                                          {item?.daraz ? (
                                                                                                <span className="text-yellow-600">Daraz</span>
                                                                                          ) : (
                                                                                                ""
                                                                                          )}
                                                                                    </div>
                                                                              )}
                                                                        </td>
                                                                        <td className="border-r px-6 py-4 flex items-center gap-2">
                                                                              <td className="whitespace-nowrap  px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                                                                                    {item?.status === "return" && (
                                                                                          <div className="flex flex-col justify-center">
                                                                                                <button
                                                                                                      onClick={() => {
                                                                                                            setShowAlert(item), checkBox(item._id);
                                                                                                      }}
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      Claim
                                                                                                </button>
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            productStatusUpdate("failed", item)
                                                                                                      }
                                                                                                      className="text-[16px] font-[400] text-blue-700"
                                                                                                >
                                                                                                      Reject
                                                                                                </button>
                                                                                          </div>
                                                                                    )}
                                                                              </td>

                                                                              {modalOn && <div>
                                                                                    <div
                                                                                          onClick={() => setModalOn(false)}
                                                                                          className={`fixed z-[100] flex items-center justify-center ${modalOn?._id === item?._id
                                                                                                ? "visible opacity-100"
                                                                                                : "invisible opacity-0"
                                                                                                } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                                                    >
                                                                                          <div
                                                                                                onClick={(e_) => e_.stopPropagation()}
                                                                                                className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${modalOn?._id === item?._id
                                                                                                      ? "scale-1 opacity-1 duration-300"
                                                                                                      : "scale-0 opacity-0 duration-150"
                                                                                                      }`}
                                                                                          >
                                                                                                <h1 className="mb-2 text-2xl font-semibold">
                                                                                                      Edit Order
                                                                                                </h1>
                                                                                                <form>
                                                                                                      <div className="flex items-start w-full mb-6 flex-col gap-1">
                                                                                                            <label htmlFor="name">Name</label>
                                                                                                            <input
                                                                                                                  type="text"
                                                                                                                  className="border border-white w-full bg-transparent text-white py-2"
                                                                                                                  defaultValue={item?.addresses?.fullName}
                                                                                                            />
                                                                                                      </div>

                                                                                                      <div className="flex justify-between">
                                                                                                            <button
                                                                                                                  type="submit"
                                                                                                                  onClick={() => setModalOn(false)}
                                                                                                                  className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                                                            >
                                                                                                                  Ok
                                                                                                            </button>
                                                                                                      </div>

                                                                                                </form>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>}
                                                                        </td>

                                                                        {rejectNote && (
                                                                              <div className="fixed inset-0 z-50 flex items-center justify-center text-start bg-black bg-opacity-50">
                                                                                    <div className="bg-white p-4 rounded shadow-lg w-1/3">
                                                                                          <div className="flex justify-between">
                                                                                                <h1 className="text-xl">Reject Note</h1>
                                                                                                <button
                                                                                                      onClick={() => setMessage(false)}
                                                                                                      className="text-gray-500 text-xl hover:text-gray-700"
                                                                                                >
                                                                                                      &times;
                                                                                                </button>
                                                                                          </div>
                                                                                          <div>
                                                                                                <h1>Status: {rejectNote.rejectStatus}</h1>
                                                                                                <h1>Message: {rejectNote.rejectNote}</h1>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        )}
                                                                  </tr>

                                                                  {item._id === modalOn && (
                                                                        <tr>
                                                                              <td colSpan="10">
                                                                                    <OrderAllinfoModal
                                                                                          status={item?.status ? item?.status : "Pending"}
                                                                                          setModalOn={setModalOn}
                                                                                          modalOn={modalOn}
                                                                                          productList={item?.productList}
                                                                                    />
                                                                              </td>
                                                                        </tr>
                                                                  )}
                                                            </React.Fragment>
                                                      ))
                                                )}
                                          </tbody>
                                    </table>


                                    <PaginationComponent
                                          cartProducts={filtered_orders}
                                          filter_category={filtered_orders}
                                          handlePage={handlePageChange}
                                          currentPage={currentPage}
                                    />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ClimAndReturn;



const PaginationComponent = ({ cartProducts, filter_category, handlePage, currentPage }) => {

      const itemsPerPage = 20;
      const totalPages = Math.ceil(filter_category.length / itemsPerPage);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const currentItems = cartProducts?.slice(startIndex, endIndex);

      const handlePageChange = (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
                  handlePage(newPage);
            }
      };

      // Helper function to generate "windowed" page range with ellipses
      const generatePageRange = () => {
            const range = [];
            const pageWindow = 2; // Number of pages before and after the current page

            if (totalPages <= 7) {
                  // Show all pages if total pages are 7 or less
                  for (let i = 1; i <= totalPages; i++) range.push(i);
            } else {
                  range.push(1); // Always show first page

                  if (currentPage > pageWindow + 2) {
                        range.push("..."); // Add ellipsis if current page is too far from the beginning
                  }

                  for (let i = Math.max(2, currentPage - pageWindow); i <= Math.min(totalPages - 1, currentPage + pageWindow); i++) {
                        range.push(i); // Show pages around the current page
                  }

                  if (currentPage < totalPages - pageWindow - 1) {
                        range.push("..."); // Add ellipsis if current page is too far from the end
                  }

                  range.push(totalPages); // Always show last page
            }

            return range;
      };

      const pageRange = generatePageRange();

      return (
            <div className="py-6 bg-gray-50">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                              <p className="text-sm font-medium text-gray-500">
                                    Showing {startIndex + 1} to {Math.min(endIndex, filter_category.length)} of {filter_category.length} results
                              </p>
                              <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                    {/* Previous Button */}
                                    <button
                                          onClick={() => handlePageChange(currentPage - 1)}
                                          disabled={currentPage === 1}
                                          className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                          aria-label="Previous"
                                    >
                                          <span className="sr-only">Previous</span>
                                          <svg
                                                className="flex-shrink-0 w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                          </svg>
                                    </button>

                                    {/* Page Numbers */}
                                    {pageRange.map((page, index) => (
                                          <button
                                                key={index}
                                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                                className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${currentPage === page ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-400 bg-white border border-gray-200'
                                                      } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9`}
                                                aria-current={currentPage === page ? 'page' : undefined}
                                                disabled={page === '...'} // Disable ellipsis buttons
                                          >
                                                {page}
                                          </button>
                                    ))}

                                    {/* Next Button */}
                                    <button
                                          onClick={() => handlePageChange(currentPage + 1)}
                                          disabled={currentPage === totalPages}
                                          className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                          aria-label="Next"
                                    >
                                          <span className="sr-only">Next</span>
                                          <svg
                                                className="flex-shrink-0 w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                          </svg>
                                    </button>
                              </nav>
                        </div>
                  </div>
            </div>
      );
};
