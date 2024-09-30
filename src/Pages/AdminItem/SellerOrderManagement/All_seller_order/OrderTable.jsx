
import BrightAlert from "bright-alert";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import OrderAllinfoModal from "../../../SellerItems/OrderManagment/ManageOrder/OrderAllinfoModal";
import LoaderData from "../../../../Common/LoaderData";
import ShippingModal from "../../../SellerItems/OrderManagment/ManageOrder/ShipingModal";
import Select from "react-select";

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
      setIsDaraz,
      setWoo
}) => {
      const [modalOn, setModalOn] = useState(false);
      const [selected_seller, setSelectedSeller] = useState(false);
      const [selected_warehouse, set_selected_warehouse] = useState(false);

      const { shopInfo, setCheckUpData } = useContext(AuthContext);

      const { data: tData = [], refetch, isLoading: loading } = useQuery({
            queryKey: ["seller_all_order"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/get-shop-all-order-by-admin`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });







      const [all_data, set_all_data] = useState([...tData,]);

      useEffect(() => {
            if (selected_seller) {
                  set_all_data([...tData].filter((item) => {
                        return item?.shopId === selected_seller;
                  }));
            }

            if (selected_warehouse) {
                  set_all_data([...tData].filter((item) => {
                        console.log(item, 'item');
                        return item?.productList?.some(prod => {
                              console.log("Product:", prod); // Log the product here
                              return prod?.warehouse?.some(wh => {
                                    console.log("Warehouse:", wh); // Log warehouse here
                                    return wh?.name === selected_warehouse;
                              });
                        });
                  }));
            } else {
                  set_all_data([...tData]);
            }
      }, [selected_seller, selected_warehouse, tData]);






      const [itemsPerPage, setItemsPerPage] = useState(15);
      const [currentPage, setCurrentPage] = useState(1);

      const filteredData = all_data?.filter((item) => {
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
                  return item?.orderNumber?.includes(searchValue.toLowerCase());
            }

            if (selectedValue && timestampValid) {
                  // Filter by status
                  return item?.status === selectedValue;
            }

            // Exclude items that don't meet any condition
            return false;
      });



      useState(() => {
            orderCounts = ordersNav?.map((navItem) => {
                  const count = tData.filter(
                        (item) => item?.status === navItem.value
                  )?.length;
                  return { ...navItem, count };
            });
      }, [tData]);

      // Calculate the range of items to display based on pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = filteredData?.slice(startIndex, endIndex);


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
            for (let i = 0; i < productList?.length; i++) {
                  const price =
                        parseFloat(productList[i]?.price) *
                        parseFloat(productList[i]?.quantity);
                  ratial_price += price;
            }
            return ratial_price;
      };

      function getTimeAgo(timestamp) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - new Date(timestamp).getTime();

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
      const checkBox = (orderId, item) => {
            fetch(
                  `https://doob.dev/api/v1/seller/refound-order-info?shopId=${item?.shopId}&orderId=${orderId}`
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
                        console.log(data?.status);
                        if (data?.status) {
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
                        prevSelectedItems?.filter(
                              (selectedItem) => selectedItem._id !== (item._id ?? item.item?.order_number)
                        )
                  );
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
                        showAlert("Saved!", `Rejection reason: ${rejectNote}`, "success");
                  } else if (result.isDenied) {
                        showAlert("Changes are not saved", "", "info");
                  }
            });
            // productStatusUpdate("failed", item?._id);
      };

      const [rejectNote, setRejectNote] = useState(false)

      const showRejectNode = (item) => {
            // console.log("item", item);
            setRejectNote(item)
      };



      const handlePageChange = (newPage) => {
            setCurrentPage(newPage);
      }

      const update_paid_status = (id, status) => {

            fetch(`https://doob.dev/api/v1/seller/order-paid-status`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                        status: status,
                        orderId: id,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert({ timeDuration: 3000, icon: 'success' });
                        refetch();
                  });
      }


      const { data: sellers = [] } = useQuery({
            queryKey: ["sellers_all_shop"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/shop"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      console.log(sellers, 'seller');


      const seller_option = sellers?.map((itm) => {
            return {
                  value: itm?._id,
                  label: itm?.shopName,
            };
      });

      const { data: warehouses = [], } = useQuery({
            queryKey: ["warehouses"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/warehouse");
                  const data = await res.json();
                  return data;
            },
      });


      const warehouses_option = warehouses?.map((itm) => {

            return {
                  value: itm?.slag,
                  label: itm?.name,
            };
      });


      const seller_filter = (event) => {
            const seller_id = event?.value;
            setSelectedSeller(seller_id);

      };

      const warehouse_filter = (event) => {
            const seller_id = event?.value;
            set_selected_warehouse(seller_id);

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

                  <div className='my-8 lg:flex gap-4'>

                        <Select
                              className='w-80'
                              placeholder="Select Seller"
                              options={seller_option}
                              onChange={seller_filter}
                        />
                        <Select
                              placeholder="Select Warehouse"
                              className="w-80"
                              options={warehouses_option}
                              onChange={warehouse_filter}
                        />
                  </div>

                  {loading ? <LoaderData /> : <div>
                        {currentItems?.length ? (
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
                                                                        Paid \ Unpaid
                                                                  </th>
                                                                  <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                        Check Status
                                                                  </th>
                                                            </tr>
                                                      </thead>

                                                      <tbody>
                                                            {currentItems?.map((item, index) => (
                                                                  <React.Fragment key={item?._id ?? item?.order_id
                                                                  }>
                                                                        <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                                              <td className="border-r px-6 py-4 font-medium">
                                                                                    <input
                                                                                          type="checkbox"
                                                                                          onChange={(e) => handleCheckboxChange(e, item)}
                                                                                          checked={selectedItems.some(
                                                                                                (selectedItem) => selectedItem._id === (item._id ?? item.item?.order_number)
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
                                                                                          to={item?.order_number ? `/darazinvoice/${item?.order_number}` : `/invoice/${item?._id}?shop_id=${item.shopId}`}
                                                                                          onClick={handlePrint}
                                                                                          className="text-blue-600 font-[500]"
                                                                                    >
                                                                                          Invoice
                                                                                    </Link>
                                                                              </td>
                                                                              <td className="border-r px-6 py-4">
                                                                                    <Link
                                                                                          // to="order-checkup"
                                                                                          to={item?.order_number ? `/seller/orders/daraz-order/${item?.order_number}` : `/admin/seller-order-management/order-details`}
                                                                                          onClick={() => setCheckUpData(item)}
                                                                                          style={{ whiteSpace: "nowrap" }}
                                                                                          className="text-blue-500  font-[400]"
                                                                                    >
                                                                                          {item?.orderNumber ?? item?.order_id}
                                                                                    </Link>
                                                                              </td>
                                                                              <td className="border-r px-6 py-4">
                                                                                    {formattedDate(item?.timestamp ?? item?.created_at)}
                                                                              </td>
                                                                              <td className="border-r w-[200px] px-6 py-4">
                                                                                    {item?.created_at ? getTimeAgo(item?.created_at) : getTimeAgo(item?.timestamp)}
                                                                              </td>
                                                                              <td className="border-r px-6 py-4">
                                                                                    {item?.method?.Getaway ?? item?.
                                                                                          payment_method
                                                                                    }
                                                                              </td>
                                                                              <td className="border-r px-6 py-4">
                                                                                    {item?.productList ? ratial_price(item?.productList) : item?.price}
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
                                                                                    {item?.statuses ? item?.statuses[0] : (item?.status ? item?.status : "Pending")}
                                                                              </td>
                                                                              <td className="border-r px-6 py-4 flex items-center gap-2">
                                                                                    <td className="whitespace-nowrap  px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                                                                                          {!item?.order_id ? <div className="flex gap-2">
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
                                                                                                            |
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
                                                                                                            <div className="flex gap-2">
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
                                                                                                                  |
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
                                                                                                                        <div className="flex gap-2 ">
                                                                                                                              <button
                                                                                                                                    onClick={() => {
                                                                                                                                          setShowAlert(item),
                                                                                                                                                checkBox(item?._id, item);
                                                                                                                                    }}
                                                                                                                                    className="text-[16px] font-[400] text-blue-700"
                                                                                                                              >
                                                                                                                                    Approve
                                                                                                                              </button>
                                                                                                                              |
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
                                                                                          </div> :
                                                                                                <Link to={`/seller/orders/daraz-order/${item?.order_number}`}>Daraz product</Link>}
                                                                                    </td>


                                                                              </td>
                                                                              <td className="border-r px-6 py-4 whitespace-nowrap">
                                                                                    <div className="flex gap-2">


                                                                                          {(item?.paid_status === 'unpaid' || item?.paid_status === undefined) && < button className="bg-gray-200 text-gray-500 px-2 py-1"
                                                                                                onClick={() =>
                                                                                                      update_paid_status(item._id, 'paid')
                                                                                                }
                                                                                          >
                                                                                                Paid
                                                                                          </button>}
                                                                                          {item?.paid_status === 'paid' && < button className="bg-gray-200 text-gray-500 px-2 py-1"
                                                                                                onClick={() =>
                                                                                                      update_paid_status(item._id, 'unpaid')
                                                                                                }
                                                                                          >
                                                                                                UnPaid
                                                                                          </button>}
                                                                                    </div>

                                                                              </td>
                                                                              <td className="border-r px-6 py-4">
                                                                                    {item?.courier_id && (
                                                                                          <button
                                                                                                onClick={() =>
                                                                                                      updateCourier_status(item._id, item?.courier_id)
                                                                                                }
                                                                                          >
                                                                                                Check Status
                                                                                          </button>
                                                                                    )}
                                                                              </td>
                                                                        </tr>
                                                                        {
                                                                              item._id === readyToShip._id && readyToShip._id && (
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
                                                                              )
                                                                        }
                                                                        {
                                                                              item._id === modalOn && (
                                                                                    <tr>
                                                                                          {console.log(item)}
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
                                                                              )
                                                                        }
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
                        )
                        }
                  </div>}


                  {
                        showAlert && (
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
                        )
                  }

                  {/* <div className="max-w-2xl mx-auto mt-8 pb-8">
                        <nav aria-label="Page navigation example">
                              <ul className="inline-flex -space-x-px">
                                    {Array.from(
                                          { length: Math.ceil(filteredData?.length / itemsPerPage) },
                                          (_, i) => (
                                                <li key={i}>
                                                      <button
                                                            onClick={() => setCurrentPage(i + 1)}
                                                            className={`bg-white border ${currentPage === i + 1
                                                                  ? "text-blue-600"
                                                                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                  } border-gray-300 leading-tight py-2 px-3 rounded ${i === 0 ? "rounded-l-lg" : ""
                                                                  } ${i === Math.ceil(filteredData?.length / itemsPerPage) - 1
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
                  </div> */}
                  <div className="py-6 bg-gray-50">
                        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                              <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                                    <p className="text-sm font-medium text-gray-500">
                                          Showing {startIndex + 1} to {endIndex} of {filteredData.length} results
                                    </p>
                                    <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
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
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 19l-7-7 7-7"
                                                      />
                                                </svg>
                                          </button>

                                          {Array.from(
                                                { length: Math.ceil(filteredData?.length / itemsPerPage) },
                                                (_, i) => (
                                                      <button
                                                            key={i}
                                                            onClick={() => setCurrentPage(i + 1)}
                                                            className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${currentPage === i + 1
                                                                  ? 'text-white bg-blue-600 border-blue-600'
                                                                  : 'text-gray-400 bg-white border border-gray-200'
                                                                  } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9`}
                                                            aria-current={currentPage === i + 1 ? 'page' : undefined}
                                                      >
                                                            {i + 1}
                                                      </button>
                                                )
                                          )}

                                          <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === Math.ceil(filteredData?.length / itemsPerPage)}
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
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                                      />
                                                </svg>
                                          </button>
                                    </nav>
                              </div>
                        </div>
                  </div>



                  {
                        rejectNote && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                        </div>
                  }
            </div >
      );
};

export default OrderTable;
