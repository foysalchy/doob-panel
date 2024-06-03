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

const ClimAndReturn = () => {
  const [modalOn, setModalOn] = useState(false);

  const { shopInfo, setCheckUpData } = useContext(AuthContext);

  const {
    data: normalOrderAllData = [],
    refetch,
    isLoading: loadingAllNormalOrder,
  } = useQuery({
    queryKey: ["sellerOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/order?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });
  const {
    data: totalOrderedData = [],
    refetchDarazData,
    isLoading: loadingDaraz,
  } = useQuery({
    queryKey: ["orderDarazOrderData"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/daraz-order-claimed?id=${shopInfo._id}&status=All`
      );
      const data = await res.json();
      console.log(data);
      return data.data;
    },
  });
  console.log(loadingDaraz, "loadingDaraz");
  console.log(totalOrderedData);

  const [cartProducts, setCartProducts] = useState([]);
  const [loadingSearchData, setLoadingSearchData] = useState(false);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const searchValue = e.target.search.value;
  //   if (loadingAllNormalOrder || loadingDaraz) {
  //     setLoadingSearchData(true);
  //   } else {
  //     setLoadingSearchData(false);
  //     const findNormalProduct = normalOrderAllData.find((itm) =>
  //       itm.orderNumber.includes(searchValue)
  //     );
  //     const findDarazProduct = totalOrderedData.find((itm) =>
  //       itm.orderNumber.includes(searchValue)
  //     );

  //     if (findNormalProduct) {
  //       const existingProductIndex = cartProducts.findIndex(
  //         (item) => item.orderNumber === findNormalProduct.orderNumber
  //       );

  //       if (existingProductIndex === -1) {
  //         setCartProducts([...cartProducts, findNormalProduct]);
  //       } else {
  //         console.log("Product with the same ID already exists in cart");
  //       }

  //       // Reset the form input field
  //       e.target.reset();
  //     }
  //   }
  // };

  useEffect(() => {
    if (loadingAllNormalOrder || loadingDaraz) {
      setLoadingSearchData(true);
    } else {
      setLoadingSearchData(false);
    }
  }, [loadingAllNormalOrder, loadingDaraz, loadingSearchData]);

  console.log(loadingSearchData);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;

    setLoadingSearchData(true);
    if (searchValue) {
      const findNormalProduct = normalOrderAllData.find((itm) =>
        itm.orderNumber.includes(searchValue)
      );

      const findDarazProduct = totalOrderedData.find((itm) =>
        itm.orderNumber.includes(searchValue)
      );

      const foundProducts = [];
      if (findNormalProduct) {
        foundProducts.push(findNormalProduct);
      }
      if (findDarazProduct) {
        foundProducts.push(findDarazProduct);
      }

      console.log(foundProducts);
      console.log(foundProducts?.length, "foundProducts?.length");

      setCartProducts(foundProducts);
    }
    setLoadingSearchData(false);

    e.target.reset();
  };

  // console.log(loadingSearchData, "loadingSearchData");
  // console.log(cartProducts, "my item", normalOrderAllData);

  // Calculate the range of items to display based on pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cartProducts?.slice(startIndex, endIndex);

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

  const productStatusUpdate = (status, orderId) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, orderId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  const { data: ships = [] } = useQuery({
    queryKey: ["getaway"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/shipping-interrogation/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const ratial_price = (productList) => {
    let ratial_price = 0;
    for (let i = 0; i < productList.length; i++) {
      const price =
        parseFloat(productList[i]?.price) *
        parseFloat(productList[i]?.quantity);
      ratial_price += price;
    }
    return ratial_price;
  };

  function getTimeAgo(timestamp) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - timestamp;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      return `${days} day ${days !== 1 ? "s" : ""} ago`;
    }
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log(cartProducts);

  const [readyToShip, setReadyToShip] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImage(true);
  };

  const handleProductStatusUpdate = (orders) => {
    fetch(`https://backend.doob.com.bd/api/v1/seller/order-quantity-update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          productStatusUpdate("claim", orders._id);
        } else {
          alert("Failed to Update");
        }
      });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [note, setNote] = useState("");

  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
  const [refundCheck, setRefundCheck] = useState(false);

  const viewDetails = (order) => {
    console.log(order);
    setOpenModal(true);

    fetch(
      `https://backend.doob.com.bd/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${order._id}`
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
      `https://backend.doob.com.bd/api/v1/seller/refound-order-info?shopId=${shopInfo._id}&orderId=${orderId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefundData(data);
      });
  };

  const updateOrderInfo = (note, file, id) => {
    const noteData = { note, file, orderId: id };
    fetch("https://backend.doob.com.bd/api/v1/seller/refound-order-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    })
      .then((res) => res.json())
      .then((data) => alert(` Successfully Done!`));
  };
  const [file, setFile] = useState();
  const cancelNoteSubmit = () => {
    console.log({
      isChecked: isUpdateQuantity,
      refundCheck,
      note,
      file,
      showAlert,
    });

    if (isUpdateQuantity && !refundCheck) {
      handleProductStatusUpdate(showAlert);
      updateOrderInfo(note, file, showAlert._id);
      setShowAlert(false);
    } else if (isUpdateQuantity && refundCheck) {
      handleProductStatusUpdate(showAlert);
      updateOrderInfo(note, file, showAlert._id);
      setShowAlert(false);
    } else {
      updateOrderInfo(note, file, showAlert._id);
      setShowAlert(false);
    }

    // Perform your submit logic here, such as sending data to an API

    // After submission, you might want to reset the state or close the modal
    // setIsChecked(false);
    // setRefundCheck(false);
    // setNote('');
    // setShowAlert(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append("image", file);
    const imageUrl = await uploadImage(imageFormData);
    setFile(imageUrl);
  };

  async function uploadImage(formData) {
    const url = "https://backend.doob.com.bd/api/v1/image/upload-image";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imageData = await response.json();
    return imageData.imageUrl;
  }

  const updateCourier_status = (id, courier_id) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/admin/courier_status?orderId=${id}&id=${courier_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.status);
        if (data.status) {
          alert("Successfully Updated");
          refetch();
        } else {
          alert("Failed to Update");
        }
      });
  };

  const [selectAll, setSelectAll] = useState(false);

  const [ordersList, setOrderList] = useState([]);

  // Function to handle "Select All" action
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If selectAll is false, set ordersList to currentItems
      setOrderList(currentItems);
    } else {
      // If selectAll is true, set ordersList to an empty array
      setOrderList([]);
    }
  };

  // const update_all_status_claim = () => {
  //     // Ask for confirmation to update status
  //     const isConfirmedUpdate = confirm('Are you sure you want to update the status?');
  //     ordersList.forEach
  //     if (isConfirmedUpdate) {
  //         // If confirmed to update status, ask for confirmation to update stock
  //         const isConfirmedStockUpdate = confirm('Would you like to update the stock as well?');

  //         if (isConfirmedStockUpdate) {
  //             // If confirmed to update stock, call handleProductStatusUpdate
  //             handleProductStatusUpdate(order);
  //         } else {
  //             // If not confirmed to update stock, call productStatusUpdate for claim
  //             productStatusUpdate("claim", order?._id);
  //         }
  //     } else {
  //         // If not confirmed to update status, do nothing
  //         console.log('Update cancelled');
  //     }
  // };

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

    Swal.fire({
      title: "Are you sure you want to update the status?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const isConfirmedStockUpdate = confirm(
          "Would you like to update the stock as well for order ?"
        );
        // Iterate over each order in the ordersList array
        ordersList.forEach((order) => {
          // Ask for confirmation to update stock for each order

          if (isConfirmedStockUpdate) {
            // If confirmed to update stock, call handleProductStatusUpdate

            if (status === "reject") {
              fetch(
                `https://backend.doob.com.bd/api/v1/seller/order-quantity-update?isUpdateQuantity=${isUpdateQuantity}&note=${note}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(order),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  setShowAlert(false);
                  if (data.success) {
                    productStatusUpdate("reject", order._id);
                    refetch();
                  } else {
                    alert("Failed to Update");
                  }
                });
            } else {
              handleProductStatusUpdate(order);
            }
          } else {
            // If not confirmed to update stock, call productStatusUpdate for claim
            if (status === "reject") {
              productStatusUpdate("reject", order?._id);
            } else {
              productStatusUpdate("claim", order?._id);
            }
          }
        });
        refetch();
      } else {
        // If not confirmed to update status, do nothing
        console.log("Update cancelled");

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  const [isReject, setReject] = useState(false);

  const update_all_status_reject = (item) => {
    Swal.fire({
      title: "Do you want to reject All Order?",
      showCancelButton: true,
      confirmButtonText: "Reject",
      input: "textarea", // Add a textarea input
      inputPlaceholder: "Enter your rejection reason here", // Placeholder for the textarea
      inputAttributes: {
        // Optional attributes for the textarea
        maxLength: 100, // Set maximum length
      },
    }).then((result) => {
      const rejectNote = result.value; // Get the value entered in the textarea
      // Now you can use the rejection reason as needed
      console.log(rejectNote, item?._id);

      ordersList.forEach((order) => {
        console.log(order, "order");

        const rejectData = {
          status: "return",
          orderId: order?._id,
          rejectNote: rejectNote,
        };
        // console.log(rejectData);
        // return;
        fetch(
          `https://backend.doob.com.bd/api/v1/seller/order-quantity-update`,
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
              // productStatusUpdate("reject", order._id);
              fetch(
                `https://backend.doob.com.bd/api/v1/seller/order-status-update?orderId=${order?._id}&status=return`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...rejectData,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  refetch();
                });
              refetch();
            } else {
              alert("Failed to Update");
            }
          });
      });
      // return;
    });
  };

  console.log(currentItems, "currentItems");

  return (
    <div className="flex flex-col overflow-hidden mt-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center border w-[70%] bg-gray-100 ring-1 border-gray-900 p-2 rounded-md "
      >
        <BiSearch className="text-gray-600 text-lg" />
        <input
          name="search"
          type="text"
          className="outline-none  bg-transparent w-full px-2"
          placeholder="Search..."
        />
      </form>
      {selectAll && (
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
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
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
                {loadingAllNormalOrder || loadingDaraz || loadingSearchData ? (
                  <tr>
                    <h2>Loading All order.......</h2>
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
                            checked={selectAll}
                          />
                        </td>
                        <td className="border-r px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="border-r px-6 py-4">
                          {!modalOn ? (
                            <button
                              onClick={() => setModalOn(item._id)}
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
                            {item?._id}
                          </Link>
                        </td>
                        <td className="border-r px-6 py-4">
                          {formattedDate(item?.timestamp)}
                        </td>
                        <td className="border-r w-[200px] px-6 py-4">
                          {getTimeAgo(item?.timestamp)}
                        </td>
                        <td className="border-r px-6 py-4">
                          {item?.method.Getaway}
                        </td>
                        <td className="border-r px-6 py-4">
                          {ratial_price(item?.productList)}
                        </td>
                        <td className="border-r px-6 py-4">
                          {item?.status ? item?.status : "Pending"}
                          {item?.daraz ? (
                            <span className="text-yellow-600">Daraz</span>
                          ) : (
                            ""
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
                                    productStatusUpdate("failed", item?._id)
                                  }
                                  className="text-[16px] font-[400] text-blue-700"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>

                          <div>
                            <div
                              onClick={() => setModalOn(false)}
                              className={`fixed z-[100] flex items-center justify-center ${
                                modalOn?._id === item?._id
                                  ? "visible opacity-100"
                                  : "invisible opacity-0"
                              } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                            >
                              <div
                                onClick={(e_) => e_.stopPropagation()}
                                className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${
                                  modalOn?._id === item?._id
                                    ? "scale-1 opacity-1 duration-300"
                                    : "scale-0 opacity-0 duration-150"
                                }`}
                              >
                                <h1 className="mb-2 text-2xl font-semibold">
                                  Edit Order {}
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
                          </div>
                        </td>
                      </tr>
                      {/* {item._id === readyToShip._id && (
                                            <tr>
                                                <td colSpan="10">
                                                    <ShippingModal readyToShip={readyToShip} setReadyToShip={setReadyToShip} productStatusUpdate={productStatusUpdate} orderInfo={item} refetch={refetch} ships={ships} />
                                                </td>
                                            </tr>
                                        )} */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimAndReturn;

// {
//     currentItems?.map((item, index) => (
//         <React.Fragment key={item._id}>
//             <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
//                 <td className="border-r px-6 py-4 font-medium">{index + 1}</td>
//                 <td className="border-r px-6 py-4">
//                     {!modalOn ? (
//                         <button onClick={() => setModalOn(item._id)} className="px-4 py-2">Details</button>
//                     ) : (
//                         <button onClick={() => setModalOn(false)} className="px-4 py-2">Close</button>
//                     )}
//                 </td>
//                 <td className="border-r px-6 py-4">
//                     <Link to={`/invoice/${item?._id}`} onClick={handlePrint} className="text-blue-600 font-[500]">Invoice</Link>
//                 </td>
//                 <td className="border-r px-6 py-4">
//                     <Link to="order-checkup" onClick={() => setCheckUpData(item)} className="text-blue-500 font-[400]">{item?._id}</Link>
//                 </td>
//                 <td className="border-r px-6 py-4">{formattedDate(item?.timestamp)}</td>
//                 <td className="border-r w-[200px] px-6 py-4">{getTimeAgo(item?.timestamp)}</td>
//                 <td className="border-r px-6 py-4">{item?.method.Getaway}</td>
//                 <td className="border-r px-6 py-4">{ratial_price(item?.productList)}</td>
//                 <td className="border-r px-6 py-4">{item?.courier_status}</td>
//                 <td className="border-r px-6 py-4">{item?.courier_id}</td>
//                 <td className="border-r px-6 py-4">{item?.status ? item?.status : 'Pending'}
//                 </td>
//                 <td className="border-r px-6 py-4 flex items-center gap-2">
//                     <td className="whitespace-nowrap  px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
//                         {!item?.status && (
//                             <>
//                                 <button onClick={() => setReadyToShip(item)} className="text-[16px] font-[400] text-blue-700">Ready to Ship</button>
//                                 <button onClick={() => productStatusUpdate("Cancel", item?._id)} className="text-[16px] font-[400] text-blue-700">Cancel</button>
//                             </>
//                         ) || item?.status === 'ready_to_ship' && (
//                             <button onClick={() => productStatusUpdate("shipped", item?._id)} className="text-[16px] font-[400] text-blue-700">Shipped</button>
//                         ) || item?.status === 'shipped' && (
//                             <div className="flex flex-col gap-2">
//                                 <button onClick={() => productStatusUpdate("delivered", item?._id)} className="text-[16px] font-[400] text-blue-700">Delivered</button>
//                                 <button onClick={() => productStatusUpdate("failed", item?._id)} className="text-[16px] font-[400] text-blue-700">Failed Delivery</button>
//                             </div>
//                         ) || item?.status === 'delivered' && (
//                             <button onClick={() => productStatusUpdate("returned", item?._id)} className="text-[16px] font-[400] text-blue-700">Returned</button>
//                         ) || item?.status === 'return' && (
//                             <div className="flex flex-col justify-center">
//                                 <button onClick={() => { setShowAlert(item), checkBox(item._id) }} className="text-[16px] font-[400] text-blue-700">Approve</button>
//                                 <button onClick={() => productStatusUpdate("failed", item?._id)} className="text-[16px] font-[400] text-blue-700">Reject</button>
//                             </div>
//                         ) || item?.status === 'returned' && (
//                             <button onClick={() => productStatusUpdate("RefoundOnly", item?._id)} className="text-[16px] font-[400] text-blue-700">Refund Data</button>
//                         ) || item?.status === 'Refund' && (
//                             <button onClick={() => viewDetails(item)} className="text-[16px] font-[400] text-blue-700">View Details</button>
//                         )}
//                     </td>

//                     {/* <button
//                                                     onClick={() => setModalOn(item)}
//                                                     className='bg-blue-500 text-white px-3 py-1 text-sm rounded'>
//                                                     Edit
//                                                 </button> */}

//                     <div>
//                         <div onClick={() => setModalOn(false)} className={`fixed z-[100] flex items-center justify-center ${modalOn?._id === item?._id ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>
//                             <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${modalOn?._id === item?._id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
//                                 <h1 className="mb-2 text-2xl font-semibold">Edit Order { }</h1>
//                                 <form>

//                                     <div className="flex items-start w-full mb-6 flex-col gap-1">
//                                         <label htmlFor="name">Name</label>
//                                         <input type="text"
//                                             className='border border-white w-full bg-transparent text-white py-2'

//                                             defaultValue={item?.addresses?.fullName}
//                                         />
//                                     </div>

//                                     <div className="flex justify-between">
//                                         <button type='submit' onClick={() => setModalOn(false)} className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white">Ok</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>

//                 </td>
//                 <td className="border-r px-6 py-4">
//                     {item?.courier_id && <button onClick={() => updateCourier_status(item._id, item.courier_id)}>Check Status</button>}
//                 </td>
//             </tr>
//             {item._id === readyToShip._id && (
//                 <tr>
//                     <td colSpan="10">
//                         <ShippingModal readyToShip={readyToShip} setReadyToShip={setReadyToShip} productStatusUpdate={productStatusUpdate} orderInfo={item} refetch={refetch} ships={ships} />
//                     </td>
//                 </tr>
//             )}
//             {item._id === modalOn && (
//                 <tr>
//                     <td colSpan="10">
//                         <OrderAllinfoModal status={item?.status ? item?.status : 'Pending'} setModalOn={setModalOn} modalOn={modalOn} productList={item?.productList} />
//                     </td>
//                 </tr>
//             )}
//         </React.Fragment>
//     ))
// }
