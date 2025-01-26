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
import { HiOutlineDotsVertical } from "react-icons/hi";

import LoaderData from "../../../../Common/LoaderData";
import  showAlert  from "../../../../Common/alert";
import BrightAlert from "bright-alert";
import Pagination from "../../../../Common/Pagination";
import { FiPrinter } from 'react-icons/fi';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { BsCopy } from "react-icons/bs";
import EditableOrder from "./Edit_order";
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
      value,
      setIsDaraz,
      setWoo
}) => {
      const [modalOn, setModalOn] = useState(false);

      const { shopInfo, setCheckUpData,user } = useContext(AuthContext);
 
      const { data: tData = [], refetch, isLoading: loading } = useQuery({
            queryKey: ["sellerOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      const { data: darazOrder = [], refetch: refetchDaraz, isLoading: loade } = useQuery({
            queryKey: ["sellerPendingDarazOrder"],

            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=pending&offset=0`
                  );

                  const data = await res.json();
                  return data.data;
            },
      });
     
      const daraz_order = loade ? [] : (darazOrder?.orders?.length ? darazOrder?.orders : [])



      const all_data = [...tData, ...daraz_order]



      const [itemsPerPage, setItemsPerPage] = useState(15);
      const [currentPage, setCurrentPage] = useState(1);

      const filteredData = all_data?.filter((item) => item?.productList !== undefined)?.filter((item) => {
            const startDate = new Date(value.startDate);
            const endDate = new Date(value.endDate);
            const timestamp = new Date(item?.timestamp);

            const timestampValid = value.startDate && value.endDate ? timestamp >= startDate && timestamp <= endDate : true;
            if (searchValue === "" && selectedValue === "All" && timestampValid) {
                  // Include all items when searchValue is empty, selectedValue is "All", and timestamp is valid
                  return true;
            }

           

            if (searchValue && timestampValid) {
                  // Convert search value to lowercase for case-insensitive search
                  const lowerCaseSearchValue = searchValue.toLowerCase();
             
                  // Filter by orderNumber or addresses.fullName
                  return (
                        item?.orderNumber?.toLowerCase().includes(lowerCaseSearchValue) ||
                        item?.addresses?.fullName?.toLowerCase().includes(lowerCaseSearchValue) ||
                        item?.addresses?.email?.toLowerCase().includes(lowerCaseSearchValue) ||
                        (typeof item?.courier_id === "string" && item.courier_id.toLowerCase().includes(lowerCaseSearchValue)) ||
                        item?.addresses?.mobileNumber?.toLowerCase().includes(lowerCaseSearchValue)
                    );
                    
              }
              
              if (selectedValue === "pending" && timestampValid) {
                  // Include items with a pending status
                  return !item?.status;
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
      const currentItems = filteredData?.filter((item) => item?.productList !== undefined)?.slice(startIndex, endIndex);


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
      const [actionLoad, setActionLoad] = useState(false);
      
      
      const ReadyToShipGO =  (item) => {
                  setActionLoad(true)
                  console.log(item,'itemitemitemitem')
                  const orderInfo=item;
                  const invoice = orderInfo?._id;
                  const cod_amount = orderInfo?.promoHistory?.normalPrice ?? orderInfo?.shipping_total;
                  const recipient_name = orderInfo?.addresses?.fullName ?? `${orderInfo?.billing?.first_name} ${orderInfo?.billing?.last_name}`; // Added space between first and last name
                  const recipient_phone = orderInfo?.addresses?.mobileNumber ?? orderInfo?.billing?.phone;
                  const recipient_address = orderInfo?.addresses.address ;
                  const note =orderInfo?.customer_note || '';
                  const shopID =shopInfo?._id || '';
                  const uploadData = {
                    invoice,
                    cod_amount: parseInt(cod_amount), // Ensures cod_amount is converted to an integer
                    recipient_name,
                    recipient_phone,
                    recipient_address,
                    note, // Assuming `note` is defined elsewhere in the code
                    shopID,
                  };
                  

                
                        fetch(`https://doob.dev/api/v1/admin/order-submit-steadfast?collection_name=seller&type=seller`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(uploadData),
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    console.log(data);
                                    if (data.success) {
                                         
                                          showAlert("Order Shipped", "", "success");
                                          refetch();
                                          setActionLoad(false)
                                    }
                                    else {
                                          setActionLoad(false)
                                          showAlert(data.message, '', 'error');
                                          setReadyToShip(item)
                                    }
                              });
                   
             
      };
            const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
      
      const productStatusUpdate = (status, orderId) => {
            setActionLoad(true)
            // Open modal dialog to confirm action
            fetch(
                  `https://doob.dev/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status, orderId,user }),
                  }
            )
                  .then((res) => res.json())
                  .then((responseUpdate) => {
                        if (responseUpdate?.status === "success") {
                              setReadyToShip(false);
                        } else {
                              // setLoading(false);
                              showAlert(`${responseUpdate.message}`);
                             
                        }
                        refetch();
                        setActionLoad(false)
                  });
                   if (responseUpdate?.status === "success") {
                                          setReadyToShip(false);
                                    } else {
                                          // setLoading(false);
                                          showAlert(
                                                "Could not update the status",
                                                responseUpdate?.message,
                                                "error"
                                          );
                                    }
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
      const quantX = (productList) => {
            let ratial_price = 0;
            for (let i = 0; i < productList?.length; i++) {
                  const price =
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
      const handlePrintStatus = (order) => {
            const order_id = order._id;
        
            // Add print_status = true to the order object
            const updatedOrder = {
                ...order,
                print_status: true,
            };
            delete updatedOrder._id
            const body = {
                order_id: order_id,
                order_data: updatedOrder,
            };
        
            fetch("https://doob.dev/api/v1/seller/update-order-data", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((data) => {
                   
                    
                });
        };
        


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

      const [showAlertC, setshowAlertC] = useState(false);
      const [note, setNote] = useState("");

      const [isChecked, setIsChecked] = useState(true);
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
                  showAlertC,
            });

            // return;

            if (isChecked && !refundCheck) {
                  handleProductStatusUpdate(showAlertC, isChecked);
                  updateOrderInfo(note, file, showAlertC._id);
                  setshowAlertC(false);
            } else if (isChecked && refundCheck) {
                  handleProductStatusUpdate(showAlertC, isChecked);
                  updateOrderInfo(note, file, showAlertC._id);
                  setshowAlertC(false);
            } else {
                  updateOrderInfo(note, file, showAlertC._id);
                  setshowAlertC(false);
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
                                          user:user,
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
                        showAlert("success", "", "success");
                        refetch();
                  });
      }


      const totalItems = filteredData.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);


      const [edit, set_edit] = useState(false)
      const [note_edit, set_note_edit] = useState(false)
      const [note_type, setNoteType] = useState(false)
      
      const handle_edit = (item) => {
            set_edit(item)
      }
      const handle_Note = (item) => {
            set_note_edit(item)
      }
      
      const copyID = (id) => { 
            navigator.clipboard.writeText(id);
            BrightAlert({ timeDuration: 600, icon: 'Copied' });
      }
     
      const handleDropdownChange = (e, item) => {
            const action = e.target.value;
          
            switch (action) {
              case 'pending':
                productStatusUpdate("pending", item._id);
                break;
              case 'checkStatus':
                updateCourier_status(item._id, item.courier_id);
                break;
              case 'paid':
                update_paid_status(item._id, 'paid');
                break;
              case 'unpaid':
                update_paid_status(item._id, 'unpaid');
                break;
              case 'onhold':
                productStatusUpdate("onhold", item._id);
                break;
              case 'ready_to_ship':
                productStatusUpdate("ready_to_ship", item._id);
                break;
              case 'cancel':
                productStatusUpdate("Cancel", item._id);
                break;
              case 'delivered':
                productStatusUpdate("delivered", item._id);
                break;
              case 'failed':
                productStatusUpdate("failed", item._id);
                break;
              case 'returned':
                productStatusUpdate("returned", item._id);
                break;
              case 'showRejectNote':
                showRejectNode(item);
                break;
              case 'approve':
                setshowAlertC(item);
                checkBox(item._id);
                break;
              case 'reject':
                handleRejectProduct(item);
                break;
              case 'refund':
                productStatusUpdate("RefoundOnly", item._id);
                break;
              case 'viewDetails':
                viewDetails(item);
                
                break;
            case 'fraud_check':
                  console.log(item.addresses.mobileNumber,'itemitem')
                  window.open(`https://doob.com.bd/fraud/index.html?phone=${item.addresses.mobileNumber}`, '_blank');
                  break;
              default:
                break;
            }
          };
          
      const { data: prices = [], isLoading } = useQuery({
                  queryKey: ["prices", shopInfo?.priceId, shopInfo?._id],
                  queryFn: async () => {
                        if (shopInfo?.priceId && shopInfo?._id) {
                              const res = await fetch(
                                    `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo.priceId}&shopId=${shopInfo._id}`
                              );
                              const data = await res.json();
                              return data?.data?.result;
                        }
                        return [];
                  },
                  enabled: !!shopInfo?.priceId && !!shopInfo?._id, // Ensure the query runs only if shopInfo is available
            });
      
            
            // Check for the 'POS' permission
            const check = prices?.permissions?.some((itm) => itm?.route === "Fraud");
       
      return (
            <div className="flex flex-col bar overflow-hidden mt-2">


                  {loading ? <LoaderData /> : <div>
                        {currentItems?.length ? (
                              <div className="bar overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                                     {actionLoad ? (
                        <div className="bgx" style={{ 
                              height: '100vh',
                              background: 'rgba(110, 110, 110, 0.63)',
                              width: '100%',
                              zIndex: 9999,
                              position: 'fixed',
                              top: 0
                            }}>
                                                                  <div style={{ 
        background: 'white',
        width: '160px',
        padding: '10px',
        margin: 'auto',
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        borderRadius: '10px'
      }} className="flex bp items-center space-x-2 mx-auto">
                                                                        
                                                                        <div className="w-6 h-6 border-4 border-t-4 border-gray-500 border-solid rounded-full animate-spin"></div>
                                                                        <span className="text-gray-700">Please Wait...</span>
                                                                  </div>
                                                                  </div>
                                                            ) : (
                                                                  <div></div>
                                                            )}
                                    <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                                          <div className="bar overflow-y-hidden bar overflow-x-auto">
                                                <table className="w-full bg-white border text-center text-sm font-light">
                                                      <thead className="border-b font-medium">
                                                            <tr>
                                                                  <th scope="col" className=" px-2 py-3 font-[500]">
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
                                                                  <th scope="col" className="text-left px-2 py-1 font-[500]" style={{ minWidth: '240px' }}>
                                                                        Order Info
                                                                  </th>
                                                             




                                                                  <th scope="col" className="text-right px-2 py-1 font-[500]">
                                                                        Total Price
                                                                  </th>
                                                                  <th scope="col" className=" px-2 py-1 font-[500]">
                                                                        Note
                                                                  </th>
                                                                  


                                                                  <th scope="col" className=" px-2 py-1 font-[500]" style={{ minWidth: '115px' }}>
                                                                        Status/Courier
                                                                  </th>
                                                                  <th scope="col" className=" px-2 py-1 font-[500]">
                                                                        Actions
                                                                  </th>

                                                            </tr>
                                                      </thead>

                                                      <tbody>
                                                            {currentItems?.map((item, index) => (
                                                                  <React.Fragment key={item?._id ?? item?.order_id
                                                                  }>
                                                                        <tr className="bg-gray-100">
                                                                              <td className=" px-1 py-1 font-medium">
                                                                                   
                                                                                    <input
                                                                                          type="checkbox"
                                                                                          onChange={(e) => handleCheckboxChange(e, item)}
                                                                                          checked={selectedItems.some(
                                                                                                (selectedItem) => selectedItem._id === (item._id ?? item.item?.order_number)
                                                                                          )}
                                                                                    />
                                                                              </td>

                                                                              <td className="px-2 py-1 ">
                                                                                    <div className="flex items-center gap-2 relative">
                                                                                    
                                                                                    
                                                                                    <div className="text-left flex items-center gap-1">
                                                                                           
 
                                                                                          <p className="flex text-left">

                                                                                                <Link
                                                                                                      // to="order-checkup"
                                                                                                      to={item?.order_number ? `/seller/orders/daraz-order/${item?.order_number}` : `order-checkup`}
                                                                                                      onClick={() => setCheckUpData(item)}
                                                                                                      style={{ whiteSpace: "nowrap" }}
                                                                                                      className="text-gray-500  font-[400]"
                                                                                                >
                                                                                                      {item?.orderNumber ?? item?.order_id}
                                                                                                </Link>
                                                                                                <span  className="ml-2"
                                                                                                onClick={() => copyID(item?.orderNumber ?? item?.order_id)}
                                                                                                >
                                                                                                      <BsCopy/>
                                                                                                </span>
                                                                                          </p>
                                                                                          
                                                                                         
                                                                                          <p> <span >
                                                                                               {
                                                                                                      item?.method?.Getaway=='CashOnDelivery' ? 'COD':item?.method?.Getaway ?? item?.payment_method
                                                                                                }
                                                                                               </span>,</p>
                                                                                          <p>  {item?.created_at ? getTimeAgo(item?.created_at) : getTimeAgo(item?.timestamp)} </p>

                                                                                    </div>
                                                                                    </div>
                                                                                   
                                                                              
                                                                                    <table className="text-left">
                                                                                          <tr className="text-lg">
                                                                                               
                                                                                                <td>
                                                                                                      <div className="flex items-center gap-1">
                                                                                                      {item?.addresses?.fullName}, <span  onClick={() => copyID(item?.addresses?.mobileNumber)} className="flex items-center gap-1">{item?.addresses?.mobileNumber}  <BsCopy/></span></div>
                                                                                                </td>
                                                                                          </tr>
                                                                                          {item?.addresses?.email ? (
                                                                                          <tr>
                                                                                              
                                                                                                <td>{item?.addresses?.email}</td>
                                                                                          </tr>
                                                                                          ):(<></>)}
                                                                                           
                                                                                          <tr>
                                                                                              
                                                                                                <td className="text-lg">
                                                                                                      <p  style={{width:'330px',wordWrap:'anywhere'}}>{item?.addresses?.province} {item?.addresses?.city ? '-':''} {item?.addresses?.city}  {item?.addresses?.area ? '-':''}</p>
                                                                                                      <p   className="flex items-center gap-1" onClick={() => copyID(`${item?.addresses?.address} - ${item?.addresses?.province} - ${item?.addresses?.city} - ${item?.addresses?.area}`)}
                                                                                                      >
                                                                                                            <div className=" "
                                                                                                            style={{width:'330px',wordWrap:'anywhere'}}
                                                                                                            >  {item?.addresses?.address
                                                                                                                  ?.split(' ') // Split the string into an array of words
                                                                                                                  .slice(0, 5) // Take the first 5 words
                                                                                                                  .join(' ')}</div> <BsCopy/>
                                                                                                      </p>
                                                                                                </td>
                                                                                          </tr>
                                                                                    </table>


                                                                              </td>



                                                                              <td className=" px-6 py-2"  >
                                                                                    <div className=" gap-2 items-center cols-2">
                                                                                          
                                                                                    </div>
                                                                                     
                                                                                   <table className="w-full">
                                                                                   
                                                                                    <tr>
                                                                                          <td className="text-right">৳.{item?.productList ? ratial_price(item?.productList) : item?.price} </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                          <td className="text-right">৳.{item.shipping_charge || 0}</td>
                                                                                    </tr>
                                                                                    {}
                                                                                 
                                                                                    <tr>
                                                                                          <td className="text-right">
                                                                                              
                                                                                          
                                                                                          
                                                                                                            ৳.{item?.productList 
                                                                                                ? parseInt(ratial_price(item?.productList)) + parseInt(item.shipping_charge || 0)
                                                                                                : parseInt(item?.price) + parseInt(item.shipping_charge || 0)
                                                                                                }
                                                                                          </td>
                                                                                    </tr>

                                                                                   </table>

                                                                              </td>

                                                                              <td style={{minWidth:'150px'}}>
                                                                                   
                                                                                    <button
                                                                                                className="text-[16px] mb-2 font-[400] text-gray-700 block w-full"
                                                                                                onClick={() => {handle_Note(item),setNoteType('customer')}}
                                                                                          >
                                                                                                {item?.customer_note ? item?.customer_note :'Customer Note'}
                                                                                          </button>  
                                                                                    <hr />
                                                                                    
                                                                                    <button
                                                                                                className="text-[16px] mt-2 font-[400] text-gray-700 block w-full"
                                                                                                onClick={() => {handle_Note(item),setNoteType('admin')}}
                                                                                          >
                                                                                                {item?.note ? item?.note :'Admin Note'}
                                                                                          </button>  
                                                                              </td>
                                                                              <td style={{ minWidth: '100px' }} className=" px-1 py-1">
                                                                                    <div> <a  className="text-[16px] font-[400] text-gray-700 block w-full" target="_blank" href={`https://doob.com.bd/fraud/index.html?phone=${item.addresses.mobileNumber}`}>Fraud Check</a></div>

                                                                                    {item?.statuses ? item?.statuses[0] : (item?.status ? item?.status : "Pending")}
                                                                                    <hr />
                                                                                    {item?.courier_name ? (
                                                                                          <>
                                                                                                <p>{item?.courier_name}</p>
                                                                                                <p>
                                                                                                      <a 
                                                                                                      href={
                                                                                                            item?.courier_name === 'Steadfast' 
                                                                                                            ? `https://steadfast.com.bd/t/${item?.tracking_code}` 
                                                                                                            : item?.courier_name === 'Pathao' 
                                                                                                            ? 'https://pathao.com' 
                                                                                                            : ''
                                                                                                      } 
                                                                                                      target="_blank" 
                                                                                                      rel="noopener noreferrer"
                                                                                                      >
                                                                                                            {item?.courier_id}
                                                                                                      </a>
                                                                                                </p>

                                                                                                <p>{item?.courier_status}</p>

                                                                                          </>
                                                                                    ) : (
                                                                                          <>
                                                                                                      {shopInfo.def_courier=='Steadfast' ? (
                                                                                                            <button
                                                                                                                  onClick={() => ReadyToShipGO(item)}
                                                                                                            
                                                                                                                  className="text-[16px] font-[400] text-gray-700 block w-full"
                                                                                                            >
                                                                                                                  Book Courier 
                                                                                                            </button>
                                                                                                      ):(
                                                                                                            <button
                                                                                                                  onClick={() => setReadyToShip(item)}
                                                                                                            
                                                                                                                  className="text-[16px] font-[400] text-gray-700 block w-full"
                                                                                                            >
                                                                                                                  Book Courier 
                                                                                                            </button>
                                                                                                      )}
                                                                                                
                                                                                                No Courier
                                                                                          </>
                                                                                    )}
                                                                                  

                                                                              </td>
                                                                             


                                                                              

                                                                              <td className="whitespace-nowrap px-6 py-1 text-[16px] font-[400] gap-2">
                                                                                    <div className="flex gap-2 mb-2">

                                                                                   
                                                                                          <button
                                                                                                className="text-[16px]  p-2 rounded bg-gray-200  font-[400] text-gray-700 block w-full"
                                                                                                onClick={() => handle_edit(item)}
                                                                                                >
                                                                                                Edit
                                                                                          </button>
                                                                                          <Link
                                                                                                      to={item?.order_number ? `/darazinvoice/${item?.order_number}` : `/invoice/${item?._id}`}
                                                                                                      onClick={() => {
                                                                                                            handlePrint();
                                                                                                            handlePrintStatus(item);
                                                                                                        }}
                                                                                                        
                                                                                                        className={`px-4 py-2 border ${item.print_status ? 'bg-green-300' : ''}`}

                                                                                                >
                                                                                                      <FiPrinter />
                                                                                          </Link>
                                                                                    </div>
                                                                                                <select
                                                                                                      onChange={(e) => handleDropdownChange(e, item)}
                                                                                                      className=" p-2 rounded focus:outline-none text-center w-[100%]"
                                                                                                >
                                                                                                      <option value="">Action</option>
                                                                                                      {item?.status === 'Cancel' && <option value="pending">Pending</option>}
                                                                                                      {item?.courier_id && <option value="checkStatus">Check Status</option>}
                                                                                                      {item?.status !== 'Cancel' && (
                                                                                                            <>
                                                                                                            {(item?.paid_status === 'unpaid' || item?.paid_status === undefined) && (
                                                                                                            <option value="paid">Paid</option>
                                                                                                            )}
                                                                                                            {item?.paid_status === 'paid' && <option value="unpaid">Unpaid</option>}
                                                                                                            </>
                                                                                                      )}
                                                                                                      <option value="onhold">On Hold</option>
                                                                                                      <option value="ready_to_ship">Ready to Ship</option>
                                                                                                      <option value="cancel">Cancel</option>
                                                                                                      <option value="delivered">Delivered</option>
                                                                                                      {item?.status === 'delivered' && (
                                                                                                            <>
                                                                                                            <option value="failed">Failed Delivery</option>
                                                                                                            <option value="returned">Returned</option>
                                                                                                            </>
                                                                                                      )}
                                                                                                      {item?.rejectNote ? (
                                                                                                            <option value="showRejectNote">Rejected</option>
                                                                                                      ) : (
                                                                                                            item?.status === 'return' && (
                                                                                                            <>
                                                                                                            <option value="approve">Approve</option>
                                                                                                            <option value="reject">Reject</option>
                                                                                                            </>
                                                                                                            )
                                                                                                      )}
                                                                                                      {item?.status === 'returned' && <option value="refund">Refund Data</option>}
                                                                                                      {item?.status === 'returned' && <option value="refund">Refund Data</option>}
                                                                                                      <option value="fraud_check">Fraud Check</option>
                                                                                                </select>
                                                                              </td>




                                                                            


                                                                        </tr>
                                                                        {
                                                                              item._id === readyToShip._id && readyToShip._id && (
                                                                                    <tr >
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
                                                                        
                                                                        {item?.productList.length > 0 ? (  <tr>
                                                                              
                                                                              <td colSpan="12" className="bg-white">
                                                                                  
                                                                                    <OrderAllinfoModal
                                                                                          status={item?.status ? item?.status : "Pending"}
                                                                                          setModalOn={setModalOn}
                                                                                          modalOn={item}
                                                                                          orderInfo={item}
                                                                                          productList={item?.productList}
                                                                                    />
                                                                              </td>
                                                                        </tr>):null}
                                                                            


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
                        (edit.orderNumber || edit.id) && <EditableOrder type={0} note_type={'all'} refetch={refetch} order={edit} setEdit={set_edit} />
                  }
                  {
                        (note_edit.orderNumber || note_edit.id) && <EditableOrder note_type={note_type} type={1} refetch={refetch} order={note_edit} setEdit={set_note_edit} />
                  }

                  {
                        showAlertC && (
                              <div className="fixed inset-0 z-10 bg-opacity-50 bar overflow-y-auto">
                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                          <div
                                                className="fixed inset-0 transition-opacity"
                                                aria-hidden="true"
                                          >
                                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                          </div>

                                          {/* This is the alert with text area for note */}
                                          <div className="inline-block align-bottom bg-white rounded-lg text-left bar overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                                                                              className="shadow-sm w-full p-2 focus:ring-gray-500 focus:border-gray-500 mt-1 block  sm:text-sm border-gray-300 rounded-md"
                                                                              placeholder="Enter your note here ..."
                                                                        ></textarea>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                                                      <button
                                                            onClick={() => setshowAlertC(false)}
                                                            type="button"
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                      >
                                                            Close
                                                      </button>
                                                      <button
                                                            onClick={() => cancelNoteSubmit()}
                                                            type="button"
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                      >
                                                            Submit
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )
                  }


                  <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        setItemsPerPage={setItemsPerPage}
                  />



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
