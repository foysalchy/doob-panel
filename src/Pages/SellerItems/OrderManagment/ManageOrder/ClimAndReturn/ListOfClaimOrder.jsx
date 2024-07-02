import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import OrderAllinfoModal from "../OrderAllinfoModal";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { BiSearch } from "react-icons/bi";

const ListOfClaimOrder = () => {
  const [modalOn, setModalOn] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { shopInfo, setCheckUpData, user } = useContext(AuthContext);

  const { data: tData = [], refetch } = useQuery({
    queryKey: ["sellerOrderForClaim"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  console.log("my item", tData);

  // Calculate the range of items to display based on pagination
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tData?.slice(startIndex, endIndex);

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
      `https://doob.dev/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`,
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

  const {
    data: shop = {},
    isLoading,
    reload,
  } = useQuery({
    queryKey: ["shop"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/shop/${shopInfo?.shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

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

  const [readyToShip, setReadyToShip] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImage(true);
  };

  const handleProductStatusUpdate = (orders) => {
    fetch(`https://doob.dev/api/v1/seller/order-quantity-update`, {
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

  const viewDetails = (order) => {
    console.log(order);

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
  const cancelNoteSubmit = () => {
    console.log({
      isChecked,
      refundCheck,
      note,
      file,
      showAlert,
    });

    if (isChecked && !refundCheck) {
      handleProductStatusUpdate(showAlert);
      updateOrderInfo(note, file, showAlert._id);
      setShowAlert(false);
    } else if (isChecked && refundCheck) {
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
        console.log(data.status);
        if (data.status) {
          alert("Successfully Updated");
          refetch();
        } else {
          alert("Failed to Update");
        }
      });
  };
  const [cartProducts, setCartProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  {
  }

  return (
    <div>
      <div className="flex flex-col overflow-hidden mt-4">
        {/* <input
          onChange={(e) => setSearchQuery(e.target.vlue)}
          name="search"
          type="text"
          className="outline-none  bg-transparent w-full px-2"
          placeholder="Searching..."
        /> */}

        {/* {selectAll && <div className='flex items-center gap-8'>
                    <button onClick={update_all_status_claim} className='bg-gray-800 w-[200px] mt-4 mb-6 text-white px-3 py-2 rounded'>Approve</button>
                    <button className='bg-gray-800 w-[200px] mt-4 mb-6 text-white px-3 py-2 rounded'>Reject</button>
                </div>} */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Clam List</h2>

          <div className="flex items-center whitespace-nowrap gap-2">
            <span className="text-sm">Entire per page</span>
            <select
              className="border w-[50px] px-1 py-2 text-sm rounded"
              onChange={(e) => setItemsPerPage(e.target.value)}
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={70}>70</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
          <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="w-full bg-white border text-center text-sm font-light">
                <thead className="border-b font-medium">
                  <tr>
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
                      Approved Note
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      Reject Note
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      Retail Price
                    </th>
                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                      Status
                    </th>
                    {/* <th scope="col" className="border-r px-2 py-4 font-[500]">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentItems
                    ?.filter(
                      (item) =>
                        item.status === "claim" || item.status === "reject"
                    )
                    ?.map((item, index) => (
                      <React.Fragment key={item._id}>
                        <tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
                          {/* <td
                            scope="col"
                            className="border-r px-2 py-4 font-[500]"
                          >
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              checked={selectAll}
                            />
                          </td> */}
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
                              onClick={() => setOpenModal(item)}
                              className="text-blue-600 font-[500]"
                            >
                              Invoice
                            </button>
                          </td>
                          <td className="border-r px-6 py-4">
                            <Link
                              to="/seller/orders/manage-order/order-checkup"
                              onClick={() => setCheckUpData(item)}
                              className="text-blue-500 font-[400]"
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
                            {item?.approveNote}
                          </td>
                          <td className="border-r px-6 py-4">
                            <p>Reject Status:{item?.rejectStatus}</p>
                            <p className="">Reject Note:{item?.rejectNote}</p>
                          </td>
                          <td className="border-r px-6 py-4">
                            {ratial_price(item?.productList)}
                          </td>
                          <td className="border-r px-6 py-4">
                            {item?.status ? item?.status : "Pending"}
                          </td>
                          <td className="border-r px-6 py-4 flex items-center gap-2">
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

                        <div
                          onClick={() => setOpenModal(false)}
                          className={`fixed z-[100]   flex items-center justify-center ${
                            openModal?._id === item?._id
                              ? "opacity-1 visible"
                              : "invisible opacity-0"
                          } inset-0 bg- backdrop-blur-sm duration-100`}
                        >
                          <div
                            onClick={(e_) => e_.stopPropagation()}
                            className={`absolute w-full  p-6 text-center drop-shadow-2xl bg-gray-100 dark:text-white ${
                              openModal?._id === item?._id
                                ? "opacity-1 translate-y-0 duration-300"
                                : "translate-y-20 opacity-0 duration-150"
                            } overflow-y-auto h-screen`}
                          >
                            <div className="flex flex-col  space-y-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={handlePrint}
                                  className="rounded-md bg-indigo-600 px-6 py-2 text-sm text-white"
                                >
                                  Print
                                </button>
                                <button
                                  onClick={() => setOpenModal(false)}
                                  className="rounded-md border border-rose-600 px-6 py-2 text-sm text-rose-600 hover:bg-rose-600 hover:text-white"
                                >
                                  Cancel
                                </button>
                              </div>

                              <div className="">
                                <div
                                  ref={componentRef}
                                  className="lg:px-6 m-auto w-[210mm] h-[297mm] bg-white print-container  pb-12 pt-16  print-data"
                                >
                                  <header className="flex items-start justify-between">
                                    <img
                                      src={shop?.logo ?? ""}
                                      alt="logo"
                                      className="w-[200px]"
                                    />
                                    <div className="whitespace-wrap w-[300px]">
                                      <p className="text-gray-600 text-end">
                                        {shop?.shopName}
                                      </p>
                                      <p className="text-gray-600 text-end">
                                        {shop?.shopEmail}
                                      </p>
                                    </div>
                                  </header>

                                  <main>
                                    <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                      INVOICE
                                    </div>

                                    {/*.*/}
                                    {/*.... Address ...*/}
                                    {/*.*/}
                                    <div className=" items-start justify-between mt-4">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-semibold text-gray-700 text-sm">
                                            Name :
                                          </h4>
                                          <p className="text-gray-600 text-sm">
                                            {openModal?.addresses?.fullName}
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-semibold text-gray-700 text-sm">
                                            Number :
                                          </h4>
                                          <p className="text-gray-600 text-sm">
                                            {openModal?.addresses?.mobileNumber}
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-semibold text-gray-700 text-sm">
                                            address :
                                          </h4>
                                          <p className="text-gray-600 text-sm">
                                            {openModal?.addresses?.address},{" "}
                                            {openModal?.addresses?.city}
                                          </p>
                                        </div>
                                      </div>

                                      <div>
                                        <li className="flex justify-start items-center gap-2">
                                          <h4 className="font-semibold text-gray-700 text-sm">
                                            Invoice No : {user?._id}
                                          </h4>
                                          <p className="text-gray-600 text-sm">
                                            {openModal?._id}
                                          </p>
                                        </li>
                                      </div>
                                    </div>

                                    {/*.*/}
                                    {/*.... Product ...*/}
                                    {/*.*/}

                                    <section className="container mx-auto mt-8">
                                      <div className="w-full mb-8 overflow-hidden">
                                        <div className="w-full overflow-x-auto border">
                                          <table className="w-full">
                                            <thead>
                                              <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                <th className="px-4 py-2">
                                                  Photo
                                                </th>
                                                <th className="px-4 py-2">
                                                  Name
                                                </th>
                                                <th className="px-4 py-2 whitespace-nowrap">
                                                  Stock Quantity
                                                </th>
                                                <th className="px-4 py-2">
                                                  Price
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody className="bg-white text-black">
                                              {openModal?.productList?.map(
                                                (itm) => (
                                                  <tr
                                                    className="border-t"
                                                    key={itm?._id}
                                                  >
                                                    <td className="p-4 w-[110px] border-b border-blue-gray-50">
                                                      <img
                                                        src={itm?.img}
                                                        alt=""
                                                        className="w-[100px] object-cover h-[80px] rounded border"
                                                      />
                                                    </td>
                                                    <td className="p-4 text-start border-b w-[300px] border-blue-gray-50">
                                                      {itm?.productName}
                                                    </td>
                                                    <td className="p-4 text-start border-b border-blue-gray-50">
                                                      {itm?.price}
                                                    </td>
                                                    <td className="p-4 text-start border-b border-blue-gray-50">
                                                      {itm?.quantity}
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                      {/* <h1 className='text-end text-xl '>Total : {total}</h1> */}

                                      {/* <div id="thanks">Thank you!</div>
                            <div id="notices">
                                <div>NOTICE:</div>

                            </div>
                            <footer>
                                Invoice was created on a computer and is valid without the signature and
                                seal.
                            </footer> */}
                                    </section>
                                  </main>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

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
                    ))}
                </tbody>
              </table>
            </div>
            <br />
            <div className="mx-auto flex justify-center">
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                  <li>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-l-lg"
                    >
                      Prev
                    </button>
                  </li>
                  {Array.from(
                    { length: Math.ceil(currentItems?.length / itemsPerPage) },
                    (_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => setCurrentPage(i + 1)}
                          className={`bg-white border ${
                            currentPage === i + 1
                              ? "text-blue-600"
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          } border-gray-300 leading-tight py-2 px-3 rounded`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    )
                  )}
                  <li>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(
                          currentItems?.length &&
                            currentItems?.length / itemsPerPage
                        )
                      }
                      className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-r-lg"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfClaimOrder;
