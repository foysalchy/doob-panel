import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import AddAddress from "./../../../Shop/pages/Home/UserProfile/ProfileUpdate/AddAddress";
import { useReactToPrint } from "react-to-print";
import OrderAllinfoModal from "./OrderAllinfoModal";
import ShippingModal from "./ShipingModal";
import { useEffect } from "react";
import { saveInvoice } from "./StoreInvoiceData";
import Swal from "sweetalert2";

const OrderTable = ({
  setSelectedItems,
  selectedItems,
  setPassData,
  ordersNav,
  orderCounts,
  searchValue,
  selectedValue,
  setDetails,
  setOpenModal,
  selectedDate,
}) => {
  const [modalOn, setModalOn] = useState(false);

  const { shopInfo, setCheckUpData } = useContext(AuthContext);

  const { data: tData = [], refetch } = useQuery({
    queryKey: ["sellerOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = tData?.filter((item) => {
    const timestampValid = !selectedDate || new Date(item?.timestamp) >= new Date(selectedDate);

    if (searchValue === "" && selectedValue === "All" && timestampValid) {
      // Include all items when searchValue is empty, selectedValue is "All", and timestamp is valid
      return true;
    }

    if (selectedValue === "pending" && timestampValid) {
      // Include items with a pending status
      return !item?.status;
    }

    if (searchValue && timestampValid) {
      // Filter by _id, converting _id to a string before comparison
      return item.orderNumber.includes(searchValue.toLowerCase());
    }

    if (selectedValue && timestampValid) {
      // Filter by status
      return item?.status === selectedValue;
    }

    // Exclude items that don't meet any condition
    return false;
  });


  useState(() => {
    orderCounts = ordersNav.map((navItem) => {
      const count = tData.filter(
        (item) => item.status === navItem.value
      ).length;
      return { ...navItem, count };
    });

    console.log(
      ordersNav.map((navItem) => {
        const count = tData.filter(
          (item) => item.status === navItem.value
        ).length;
        return { ...navItem, count };
      }),
      "msg-------"
    );
  }, [tData]);

  // Calculate the range of items to display based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData?.slice(startIndex, endIndex);

  console.log(currentItems, "currentItems");

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
    // Open modal dialog to confirm action
    fetch(
      `https://doob.dev/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, orderId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Assuming refetch is defined somewhere
        refetch();
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

  //   console.log(filteredData);

  const [readyToShip, setReadyToShip] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImage(true);
  };

  const handleProductStatusUpdate = (orders, isUpdateQuantity) => {
    fetch(
      `https://doob.dev/api/v1/seller/order-quantity-update?isUpdateQuantity=${isUpdateQuantity}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orders),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          productStatusUpdate("Refund", orders._id);
        } else {
          alert("Failed to Update");
        }
      });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [note, setNote] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [refundCheck, setRefundCheck] = useState(false);

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
    console.log(noteData);
    // return;
    fetch("https://doob.dev/api/v1/seller/refound-order-info", {
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
      isChecked,
      refundCheck,
      note,
      file,
      showAlert,
    });

    // return;

    if (isChecked && !refundCheck) {
      handleProductStatusUpdate(showAlert, isChecked);
      updateOrderInfo(note, file, showAlert._id);
      setShowAlert(false);
    } else if (isChecked && refundCheck) {
      handleProductStatusUpdate(showAlert, isChecked);
      updateOrderInfo(note, file, showAlert._id);
      setShowAlert(false);
    } else {
      updateOrderInfo(note, file, showAlert._id);
      setShowAlert(false);
    }
  };

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
    console.log(id, courier_id, shopInfo._id);

    // return;
    fetch(
      `https://doob.dev/api/v1/admin/courier_status?orderId=${id}&id=${courier_id}&shopId=${shopInfo._id}`,
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

  const [openInvoice, setOpenInvoice] = useState(false);

  const handleSelectAll = (e, data) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems(data);
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // If checkbox is checked, add item to selectedItems array
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      // If checkbox is unchecked, remove item from selectedItems array
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem._id !== item._id
        )
      );
      // asdfasd
    }
  };
  const handleRejectProduct = (item) => {
    console.log(selectedItems);

    Swal.fire({
      title: "Do you want to reject the Order?",
      showCancelButton: true,
      confirmButtonText: "Reject",
      input: "textarea", // Add a textarea input
      inputPlaceholder: "Enter your rejection reason here", // Placeholder for the textarea
      inputAttributes: {
        // Optional attributes for the textarea
        maxLength: 100, // Set maximum length
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const rejectNote = result.value; // Get the value entered in the textarea
        // Now you can use the rejection reason as needed
        console.log(rejectNote, item?._id);

        // return;

        fetch(
          `https://doob.dev/api/v1/seller/order-status-update?orderId=${item?._id}&status=return`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "return",
              orderId: item?._id,
              rejectNote: rejectNote,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // Assuming refetch is defined somewhere
            refetch();
          });
        Swal.fire("Saved!", `Rejection reason: ${rejectNote}`, "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    // productStatusUpdate("failed", item?._id);
  };

  console.log(currentItems, "currentItems");
  const [rejectNote, setRejectNote] = useState(false)

  const showRejectNode = (item) => {
    // console.log("item", item);
    setRejectNote(item)


  };

  return (
    <div className="flex flex-col overflow-hidden mt-4">

      <div className="flex items-center justify-between">

        <div className="flex items-center whitespace-nowrap gap-2">
          <span className="text-sm">Entire per page</span>
          <select

            className="border w-[50px] px-1 py-2 text-sm rounded"
            onChange={(e) => setItemsPerPage(e.target.value)}>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={70}>70</option>
            <option value={100}>100</option>

          </select>
        </div>
      </div>
      {currentItems.length ? (
        <div className="overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
          <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-y-hidden overflow-x-auto">
              <table className="w-full bg-white border text-center text-sm font-light">
                <thead className="border-b font-medium">
                  <tr>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          handleSelectAll(e, currentItems);
                          handleStoreInvoice(e, selectedItems);
                        }}
                        checked={
                          currentItems?.length === selectedItems?.length
                            ? true
                            : false
                        }
                      />
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
                      courier_status
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      courier_name
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      courier_id
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      Status
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      Actions
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      Check Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((item, index) => (
                    <React.Fragment key={item._id}>
                      <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="border-r px-6 py-4 font-medium">
                          <input
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(e, item)}
                            checked={selectedItems.some(
                              (selectedItem) => selectedItem._id === item._id
                            )}
                          />
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
                            to="order-checkup"
                            onClick={() => setCheckUpData(item)}
                            style={{ whiteSpace: "nowrap" }}
                            className="text-blue-500  font-[400]"
                          >
                            {item?.orderNumber}
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
                          {item?.courier_status}
                        </td>
                        <td className="border-r px-6 py-4">
                          {item?.courier_name}
                        </td>
                        <td className="border-r px-6 py-4">
                          {item?.courier_id}
                        </td>
                        <td className="border-r px-6 py-4">
                          {item?.status ? item?.status : "Pending"}
                        </td>
                        <td className="border-r px-6 py-4 flex items-center gap-2">
                          <td className="whitespace-nowrap  px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                            {(!item?.status && (
                              <>
                                <button
                                  onClick={() => setReadyToShip(item)}
                                  // onClick={() =>
                                  //   productStatusUpdate(
                                  //     "ready_to_ship",
                                  //     item?._id
                                  //   )
                                  // }
                                  className="text-[16px] font-[400] text-blue-700"
                                >
                                  Ready to Ship
                                </button>
                                <button
                                  onClick={() =>
                                    productStatusUpdate("Cancel", item?._id)
                                  }
                                  className="text-[16px] font-[400] text-blue-700"
                                >
                                  Cancel
                                </button>
                              </>
                            )) ||
                              (item?.status === "ready_to_ship" && (
                                <button
                                  onClick={() =>
                                    productStatusUpdate("shipped", item?._id)
                                  }
                                  className="text-[16px] font-[400] text-blue-700"
                                >
                                  Shipped
                                </button>
                              )) ||
                              (item?.status === "shipped" && (
                                <div className="flex flex-col gap-2">
                                  <button
                                    onClick={() =>
                                      productStatusUpdate(
                                        "delivered",
                                        item?._id
                                      )
                                    }
                                    className="text-[16px] font-[400] text-blue-700"
                                  >
                                    Delivered
                                  </button>
                                  <button
                                    onClick={() =>
                                      productStatusUpdate("failed", item?._id)
                                    }
                                    className="text-[16px] font-[400] text-blue-700"
                                  >
                                    Failed Delivery
                                  </button>
                                </div>
                              )) ||
                              (item?.status === "delivered" && (
                                <button
                                  onClick={() =>
                                    productStatusUpdate("returned", item?._id)
                                  }
                                  className="text-[16px] font-[400] text-blue-700"
                                >
                                  Returned
                                </button>
                              )) ||
                              (item?.status === "return" && (
                                <div>
                                  {item?.rejectNote ? (
                                    <button
                                      className="text-red-500"
                                      onClick={() => showRejectNode(item)}
                                    >
                                      Rejected
                                    </button>
                                  ) : (
                                    <div className="flex flex-col justify-center">
                                      <button
                                        onClick={() => {
                                          setShowAlert(item),
                                            checkBox(item._id);
                                        }}
                                        className="text-[16px] font-[400] text-blue-700"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleRejectProduct(item)
                                        }
                                        className="text-[16px] font-[400] text-blue-700"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )) ||
                              (item?.status === "returned" && (
                                <button
                                  onClick={() =>
                                    productStatusUpdate(
                                      "RefoundOnly",
                                      item?._id
                                    )
                                  }
                                  className="text-[16px] font-[400] text-blue-700"
                                >
                                  Refund Data
                                </button>
                              )) ||
                              (item?.status === "Refund" && (
                                <button
                                  onClick={() => viewDetails(item)}
                                  className="text-[16px] font-[400] text-blue-700"
                                >
                                  View Details
                                </button>
                              ))}
                          </td>

                          {/* <div>
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
                                  Edit Order { }
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
                          </div> */}
                        </td>
                        <td className="border-r px-6 py-4">
                          {item?.courier_id && (
                            <button
                              onClick={() =>
                                updateCourier_status(item._id, item.courier_id)
                              }
                            >
                              Check Status
                            </button>
                          )}
                        </td>
                      </tr>
                      {item._id === readyToShip._id && (
                        <tr>
                          <td colSpan="10">
                            <ShippingModal
                              readyToShip={readyToShip}
                              setReadyToShip={setReadyToShip}
                              productStatusUpdate={productStatusUpdate}
                              orderInfo={item}
                              refetch={refetch}
                              ships={ships}
                            />
                          </td>
                        </tr>
                      )}
                      {item._id === modalOn && (
                        <tr>
                          <td colSpan="12">
                            <OrderAllinfoModal
                              status={item?.status ? item?.status : "Pending"}
                              setModalOn={setModalOn}
                              modalOn={modalOn}
                              orderInfo={item}
                              productList={item?.productList}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Here is not order found</h1>
        </div>
      )}
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
                      onClick={() => setIsChecked(!isChecked)}
                      className=" text-lg flex gap-2 items-center cursor-pointer font-medium text-gray-900"
                    >
                      <input
                        className="h-4 w-4"
                        type="checkbox"
                        checked={isChecked}
                      />
                      Do you update your product quantity?
                    </h3>
                    <h3
                      onClick={() => setRefundCheck(!refundCheck)}
                      className=" text-lg flex gap-2 items-center cursor-pointer font-medium text-gray-900"
                    >
                      <input
                        className="h-4 w-4"
                        type="checkbox"
                        checked={refundCheck}
                      />
                      Do you give refund for this product?
                    </h3>
                    {refundCheck && (
                      <div>
                        <details className="w-full">
                          <summary className="focus:outline-none focus-visible:ri">
                            Check Payment Getaway Information?
                          </summary>
                          <p className=" ml-4 mt-2 dark:text-gray-700">
                            Holder Name :{" "}
                            {refundData?.data?.data?.holder
                              ? refundData?.data?.data?.holder
                              : refundData?.data?.data?.name}
                            <br />
                            Account Number :{" "}
                            {refundData?.data?.data?.ac
                              ? refundData?.data?.data?.ac
                              : refundData?.data?.data?.account_number}
                            <br />
                            Bank / Getaway :{" "}
                            {refundData?.data?.data?.bank_name
                              ? refundData?.data?.data?.bank_name
                              : refundData?.data?.data?.getway}
                          </p>
                        </details>

                        <div className="mt-2 flex gap-4">
                          <label htmlFor="">Payment Prove</label>
                          <input onChange={handleFileChange} type="file" />
                        </div>
                      </div>
                    )}
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
                  onClick={() => cancelNoteSubmit()}
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

      <div className="max-w-2xl mx-auto mt-8 pb-8">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCurrentPage(i + 1)}
                    className={`bg-white border ${currentPage === i + 1
                      ? "text-blue-600"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      } border-gray-300 leading-tight py-2 px-3 rounded ${i === 0 ? "rounded-l-lg" : ""
                      } ${i === Math.ceil(filteredData.length / itemsPerPage) - 1
                        ? "rounded-r-lg"
                        : ""
                      }`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
      {console.log(rejectNote)}

      {rejectNote && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg w-1/3">
          <div className="flex justify-between">
            <h1>Reject Note</h1>
            <button onClick={() => setRejectNote(false)} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <div>
            <h1>Status: {rejectNote.rejectStatus}</h1>
            <h1>Message: {rejectNote.rejectNote}</h1>

          </div>
        </div>
      </div>}
    </div>
  );
};

export default OrderTable;
