import React, { useContext, useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";

import { Link } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import OrderAllinfoModal from "../../SellerItems/OrderManagment/ManageOrder/OrderAllinfoModal";
import LoaderData from "../../../Common/LoaderData";
import OrderInvoice from "../SellerOrderManagement/OrderInvoice";
import BrightAlert from "bright-alert";
import Reject_Modal from "./Reject_Modal";
import Swal from "sweetalert2";

const ClaimAndRerunAdmin = () => {
      const [modalOn, setModalOn] = useState(false);
      const [modalOpen, setModalOpen] = useState(false);
      const [reject_message, set_reject_message] = useState();

      const { shopInfo, setCheckUpData } = useContext(AuthContext);

      const { data: products = [], refetch, isLoading } = useQuery({
            queryKey: ["sellerAllOrder"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/get-shop-all-order`);
                  const data = await res.json();
                  return data.data;
            },
      });

      const statuses = ["return", "returned", "failed", "delivered"];

      const filteredProducts = products.filter(product =>
            statuses.includes(product.status) && product.order_status !== "claim"
      );

      const [cartProducts, setCartProducts] = useState(filteredProducts);

      // Update cart products whenever the products data changes
      useEffect(() => {
            setCartProducts(filteredProducts);
      }, [filteredProducts]); // Only depend on filteredProducts


      const handleSearch = (e) => {
            e.preventDefault();
            const searchValue = e.target.search.value;
            console.log(searchValue);
            const findProduct = tData.find((itm) =>
                  // itm.orderNumber.includes(searchValue) ||
                  itm._id.includes(searchValue)
            );
            console.log("🚀 ~ file: Claim:", findProduct);

            if (findProduct) {
                  const existingProductIndex = cartProducts.findIndex(
                        (item) => item.orderNumber === findProduct.orderNumber
                  );

                  if (existingProductIndex === -1) {
                        setCartProducts([...cartProducts, findProduct]);
                  } else {
                        console.log("Product with the same ID already exists in cart");
                  }

                  // Reset the form input field
                  e.target.reset();
            }
      };


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

                  `https://doob.dev/api/v1/admin/order-status-update?orderId=${orderId}`,

                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ order_status: status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert()
                        refetch();
                  });
      };

      const { data: ships = [] } = useQuery({
            queryKey: ["getaway"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/shipping-interrogation/${shopInfo._id}`
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



      const [readyToShip, setReadyToShip] = useState(false);

      const [showImage, setShowImage] = useState(false);
      const [selectedImage, setSelectedImage] = useState("");

      const handleImageClick = (image) => {
            setSelectedImage(image);
            setShowImage(true);
      };

      const handleProductStatusUpdate = (orders) => {
            fetch(`https://doob.dev/api/v1/admin/order-quantity-update`, {
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

      const [isChecked, setIsChecked] = useState(false);
      const [refundCheck, setRefundCheck] = useState(false);


      const [refundData, setRefundData] = useState(true);
      const checkBox = (orderId) => {
            fetch(
                  `https://doob.dev/api/v1/admin/refound-order-info?shopId=${shopInfo._id}&orderId=${orderId}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        setRefundData(data);
                  });
      };

      const updateOrderInfo = (note, file, id) => {
            const noteData = { note, file, orderId: id };
            fetch("https://doob.dev/api/v1/admin/refound-order-info", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(noteData),
            })
                  .then((res) => res.json())
                  .then((data) => alert(` Successfully Done!`));
      };
      const [file, setFile] = useState();






      const [selectAll, setSelectAll] = useState(false);

      const [ordersList, setOrderList] = useState([]);

      // Function to handle "Select All" action
      const handleSelectAll = () => {
            setSelectAll(!selectAll);
            if (!selectAll) {

                  setOrderList(currentItems);
            } else {

                  setOrderList([]);
            }
      };

      const handle_select = (item) => {

            if (ordersList.includes(item)) {
                  const new_list = ordersList.filter((itm) => {
                        return itm !== item
                  })
                  setOrderList(new_list)

            } else {
                  setOrderList([...ordersList, item])
            }
      }


      const update_all_status_claim = () => {

            const isConfirmedUpdate = confirm(
                  "Are you sure you want to update the status?"
            );

            if (isConfirmedUpdate) {
                  const isConfirmedStockUpdate = confirm(
                        "Would you like to update the stock as well for order ?"
                  );

                  ordersList.forEach((order) => {
                        // Ask for confirmation to update stock for each order

                        if (isConfirmedStockUpdate) {

                              handleProductStatusUpdate(order);
                              refetch();
                        } else {
                              // If not confirmed to update stock, call productStatusUpdate for claim
                              productStatusUpdate("claim", order?._id);
                        }
                  });
                  refetch();
            } else {
                  productStatusUpdate("claim", order?._id);
            }
      };

      const calculateProfit = (sale) => {
            const revenue = sale.quantity * sale.price;
            const totalCosts =
                  parseFloat(sale.handling) + (parseFloat(sale.commission) / 100) * revenue;
            const profit = revenue - totalCosts;

            return profit;
      };

      const [reject, setReject] = useState(false);

      const update_all_reject_status = () => {

            Swal.fire({
                  title: 'Are you sure?',
                  text: "Do you want to update the status?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, update it!',
                  cancelButtonText: 'No, cancel!',
            }).then((result) => {
                  if (result.isConfirmed) {

                        ordersList.forEach((order) => {
                              order_reject_update("reject", order?._id);
                        });
                        BrightAlert()
                        setReject(false)
                        set_reject_message(null)
                  } else {
                        setReject(false)

                  }
            });
      };





      const order_reject_update = (status, orderId) => {
            fetch(
                  `https://doob.dev/api/v1/admin/order-status-update?orderId=${orderId}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ order_status: status, reject_message }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {

                        refetch();
                  });
      };


      const [rejectNote, setRejectNote] = useState(false);


      console.log(rejectNote, 'rejectNote');


      return (
            <div className="flex flex-col bar overflow-hidden mt-4">
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
                  {ordersList.length ? (
                        <div className="flex items-center gap-8">
                              <button
                                    onClick={update_all_status_claim}
                                    className="bg-gray-800 w-[200px] mt-4 mb-6 text-white px-3 py-2 rounded"
                              >
                                    Approve
                              </button>
                              <button onClick={() => setReject(!reject)} className="bg-gray-800 w-[200px] mt-4 mb-6 text-white px-3 py-2 rounded">
                                    Reject
                              </button>
                        </div>
                  ) : null}

                  {
                        reject && <Reject_Modal
                              setReject={setReject}
                              reject={reject}
                              reject_message={reject_message}
                              set_reject_message={set_reject_message}
                              update_all_reject_status={update_all_reject_status}



                        />
                  }

                  <div className="bar overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                        <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                              <div className="bar overflow-hidden">
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
                                                            Profit
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Status
                                                      </th>

                                                </tr>
                                          </thead>
                                          <tbody>
                                                {
                                                      isLoading ? (
                                                            <tr>
                                                                  <td colSpan="11" className="text-center py-8">
                                                                        <LoaderData />
                                                                  </td>
                                                            </tr>
                                                      )
                                                            :
                                                            currentItems.length ?
                                                                  currentItems?.map((item, index) => (
                                                                        <React.Fragment key={item._id}>
                                                                              <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                                                    <td scope="col" className="border-r px-2 py-4 font-[500]">
                                                                                          <input
                                                                                                type="checkbox"
                                                                                                name=""
                                                                                                className="cursor-pointer"
                                                                                                onClick={() => handle_select(item)}
                                                                                                checked={ordersList.some((i) => i._id === item._id)}
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

                                                                                          <button
                                                                                                onClick={() => setModalOpen(item)}
                                                                                                className="text-blue-600 font-[500]"

                                                                                          >
                                                                                                {modalOpen._id === item._id
                                                                                                      ? "Close Details"
                                                                                                      : "View Details"}
                                                                                          </button>
                                                                                    </td>
                                                                                    <td className="border-r px-6 py-4">
                                                                                          <Link
                                                                                                to="/admin/orders/manage-order/order-checkup"
                                                                                                onClick={() => setCheckUpData(item)}
                                                                                                className="text-blue-500 font-[400]"
                                                                                          >
                                                                                                {item?._id}
                                                                                          </Link>
                                                                                    </td>
                                                                                    <td className="border-r px-6 py-4">
                                                                                          {formattedDate(item?.date)}
                                                                                    </td>
                                                                                    <td className="border-r w-[200px] px-6 py-4">
                                                                                          {getTimeAgo(item?.date)}
                                                                                    </td>
                                                                                    <td className="border-r px-6 py-4">
                                                                                          {item?.method?.Getaway ?? "Cash on delivery"}
                                                                                    </td>
                                                                                    <td className="border-r px-6 py-4">
                                                                                          {calculateProfit(item).toFixed(2)}
                                                                                    </td>
                                                                                    <td className="border-r px-6 py-4">
                                                                                          {
                                                                                                item.order_status === 'reject' ? <button onClick={() => setRejectNote(item)} className="px-4 py-2 capitalize text-red-500 " >
                                                                                                      {item.order_status}
                                                                                                </button>
                                                                                                      : item.order_status ? item.order_status : (item?.status ? item?.status : "Pending")
                                                                                          }

                                                                                    </td>

                                                                              </tr>

                                                                              {rejectNote && (
                                                                                    <div className="fixed inset-0 z-50 flex items-center justify-center text-start bg-[#00000030] bg-opacity-50">
                                                                                          <div className="bg-white p-4 rounded shadow-lg w-1/3">
                                                                                                <div className="flex justify-between">
                                                                                                      <h1 className="text-xl"> Note</h1>
                                                                                                      <button
                                                                                                            onClick={() => setRejectNote(false)}
                                                                                                            className="text-gray-500 text-xl hover:text-gray-700"
                                                                                                      >
                                                                                                            &times;
                                                                                                      </button>
                                                                                                </div>
                                                                                                <div>
                                                                                                      <h1>Status: {rejectNote?.order_status}</h1>
                                                                                                      <h1>Order Status: {rejectNote?.reject_message?.rejectStatus}</h1>
                                                                                                      <h1>Message: {rejectNote?.reject_message?.rejectNote ?? rejectNote?.approveNote}</h1>
                                                                                                      {/* {rejectNote?.reject_message.rejectNote ? <p className="">Reject Message: {rejectNote?.reject_message.rejectNote}</p> : ''} */}

                                                                                                      <div className="flex flex-wrap gap-1 mt-2">
                                                                                                            {
                                                                                                                  rejectNote?.reject_message?.rejectImages?.map((image, index) => (
                                                                                                                        <a target="_blank" href={image}>
                                                                                                                              <img key={index} src={image} alt="image" className="w-20 object-cover h-10 border" />
                                                                                                                        </a>
                                                                                                                  ))
                                                                                                            }
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              )}

                                                                              {modalOpen?._id === item._id && (
                                                                                    <OrderInvoice
                                                                                          openModal={modalOpen}
                                                                                          setOpenModal={setModalOpen}
                                                                                          product={item}
                                                                                    />
                                                                              )}
                                                                              {
                                                                                    item._id === modalOn && (
                                                                                          <tr>
                                                                                                {console.log(item)}
                                                                                                <td colSpan="10">
                                                                                                      <OrderAllinfoModal
                                                                                                            status={item?.status ? item?.status : "Pending"}
                                                                                                            setModalOn={setModalOn}
                                                                                                            modalOn={modalOn}
                                                                                                            productList={item?.product}
                                                                                                      />
                                                                                                </td>
                                                                                          </tr>
                                                                                    )
                                                                              }


                                                                        </React.Fragment>
                                                                  ))
                                                                  :

                                                                  <tr>
                                                                        <td className=" text-sm text-gray-400 py-4" colSpan="11">
                                                                              No Data Found!
                                                                        </td>
                                                                  </tr>
                                                }
                                          </tbody>
                                    </table>
                                    <PaginationComponent cartProducts={cartProducts} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} startIndex={startIndex} endIndex={endIndex} currentItems={currentItems} />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ClaimAndRerunAdmin;



const PaginationComponent = ({ cartProducts, itemsPerPage, currentPage, setCurrentPage, startIndex, endIndex, currentItems }) => {




      const totalItems = cartProducts.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const handlePageChange = (pageNumber) => {
            if (pageNumber >= 1 && pageNumber <= totalPages) {
                  setCurrentPage(pageNumber);
            }
      };

      return (
            <div className="py-6 bg-gray-50">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                              <p className="text-sm font-medium text-gray-500">
                                    Showing {startIndex + 1} to {endIndex} of {totalItems} results
                              </p>

                              <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                    {/* Previous Button */}
                                    <button
                                          onClick={() => handlePageChange(currentPage - 1)}
                                          disabled={currentPage === 1}
                                          className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                          <span className="sr-only"> Previous </span>
                                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                          </svg>
                                    </button>

                                    {/* Page Numbers */}
                                    {[...Array(totalPages)].map((_, index) => (
                                          <button
                                                key={index}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${currentPage === index + 1 ? 'text-gray-100 bg-blue-500 ' : 'text-gray-400 bg-white '} rounded-md focus:outline-none  w-9`}
                                          >
                                                {index + 1}
                                          </button>
                                    ))}

                                    {/* Next Button */}
                                    <button
                                          onClick={() => handlePageChange(currentPage + 1)}
                                          disabled={currentPage === totalPages}
                                          className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                          <span className="sr-only"> Next </span>
                                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                          </svg>
                                    </button>
                              </nav>
                        </div>
                  </div>


            </div>
      );
};
