import React, { useContext, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import useImageUpload from "../../../../../Hooks/UploadImage";
// import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import showAlert from "../../../../../Common/alert";
import BrightAlert from "bright-alert";
import { useNavigate } from "react-router-dom";

export default function RejectModal({
      ordersList,
      setReject,
      isReject,
      refetch,
      selectSearchCategory
}) {
      const { shopInfo } = useContext(AuthContext);

      const navigate = useNavigate();

      const [images, setImages] = useState([]);
      const [loading, setIsLoading] = useState(false);

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
      const { uploadImage } = useImageUpload();

      const [statusOptionSelect, setStatusOptionSelect] = useState("");
      let statusOption = []
      if (selectSearchCategory.value == 'Daraz Order') {
            statusOption = [
                  {
                        label: "Arrange to Claim",
                        value: "Arrange to Claim",
                  },
                  {
                        label: "Claimed",
                        value: "Claimed",
                  },
                  {
                        label: "Verifying",
                        value: "Verifying",
                  },
                  {
                        label: "Partial Refund",
                        value: "Partial Refund",
                  },
                  {
                        label: "Refund",
                        value: "Refund",
                  },
                  {
                        label: "Damaged",
                        value: "Damaged",
                  },
                  {
                        label: "Missing parts",
                        value: "Missing parts",
                  },


                  {
                        label: "Recived",
                        value: "approved",
                  },
                  {
                        label: "Rejected",
                        value: "decline",
                  },
            ];
      } else {
            statusOption = [

                  {
                        label: "Arrange to Claim",
                        value: "Arrange to Claim",
                  },
                  {
                        label: "Claimed",
                        value: "Claimed",
                  },
                  {
                        label: "Verifying",
                        value: "Verifying",
                  },
                  {
                        label: "Partial Refund",
                        value: "Partial Refund",
                  },
                  {
                        label: "Refund",
                        value: "Refund",
                  },

                  {
                        label: "Recived",
                        value: "approved",
                  },
                  {
                        label: "Rejected",
                        value: "decline",
                  },

            ];
      }



      console.log(ordersList, 'selected_category');

      const update_all_status_rejectSubmit = async (e) => {
            e.preventDefault();
            const values = Object.fromEntries(new FormData(e.target));
            console.log("Form values:", values);

            let rejectImages = [];
            for (let i = 0; i < images.length; i++) {
                  const imageUrl = await uploadImage(images[i].file);

                  rejectImages.push(imageUrl);
            }
            const { rejectStatus, rejectNote } = values;
            ordersList.forEach((order) => {

                  const rejectData = {
                        status: "return",
                        orderId: order?._id,
                        rejectNote: !order.rejectNote ? rejectNote : order.rejectNote,
                        rejectStatus: rejectStatus,
                        reject_message: order.rejectNote && rejectNote,
                        rejectImages
                  };

                  if (statusOptionSelect?.value === "approved" || statusOptionSelect?.value === "Refund" || statusOptionSelect?.value === "Partial Refund") {
                        rejectData["rejectAmount"] = parseInt(values?.rejectAmount);
                  }


                  fetch(`https://doob.dev/api/v1/seller/order-quantity-update`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(order),
                  })
                        .then((res) => res.json())
                        .then((data) => {

                              if (data.success) {
                                    if (order.daraz || order.woo) {
                                          fetch(
                                                `https://doob.dev/api/v1/seller/claim-order-add`,
                                                {
                                                      method: "PUT",
                                                      headers: { "Content-Type": "application/json" },
                                                      body: JSON.stringify({
                                                            ...order,
                                                            status: "return",
                                                            approveNote,
                                                      }),
                                                }
                                          )
                                                .then((res) => res.json())
                                                .then((data) => {
                                                      refetch();
                                                      showAlert("Approved", '', 'success');
                                                      setShowAlert(false);
                                                      setapproveNote("");
                                                      setSelectAll(!selectAll);
                                                      setIsUpdateQuantity(false);
                                                      setCartProducts([]);
                                                      navigate('/seller/orders/claim-order-list')
                                                });
                                    } else {
                                          fetch(
                                                `https://doob.dev/api/v1/seller/order-status-update?orderId=${order?._id}&status=return`,
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
                                                      showAlert("Approved", '', 'success');
                                                      refetch();
                                                      setReject(false);
                                                      setIsLoading(false);
                                                      navigate('/seller/orders/claim-order-list')
                                                });
                                    }
                                    refetch();

                                    // productStatusUpdate("reject", order._id);
                              } else {
                                    showAlert(data.message, '', 'warning');

                              }
                        });
            });


      };



      const update_all_status_reject_for_daraz = async (e) => {
            e.preventDefault();
            const values = Object.fromEntries(new FormData(e.target));


            let rejectImages = [];
            for (let i = 0; i < images.length; i++) {
                  const imageUrl = await uploadImage(images[i].file);

                  rejectImages.push(imageUrl);
            }
            const { rejectStatus, rejectNote } = values;
            ordersList.forEach((order) => {


                  const rejectData = {
                        status: "claim",
                        orderId: order?.order_id,
                        rejectNote: !order.rejectNote ? rejectNote : order.rejectNote,
                        rejectStatus: rejectStatus,
                        reject_message: !order.rejectNote ? rejectNote : order.rejectNote,
                        rejectImages
                  };


                  if (statusOptionSelect?.value === "approved") {
                        rejectData["rejectAmount"] = parseInt(values?.rejectAmount);
                  }
                  fetch(
                        `https://doob.dev/api/v1/seller/claim-order-add`,
                        {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                    ...order,
                                    status: "return",
                                    ...rejectData,
                                    order_type: 'daraz',
                                    shop_id: shopInfo?._id
                              }),
                        }
                  )
                        .then((res) => res.json())
                        .then((data) => {

                              console.log(data, 'data');
                              if (data.status === "success") {
                                    showAlert("Approved", '', 'success');
                                    refetch();
                                    setReject(false);
                                    setIsLoading(false);
                              } else {
                                    alert("Failed to check");
                              }
                        });

            });
      }


    

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${isReject ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10  text-center ">
                        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
                              <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
                                    {/* {data} */}
                              </div>
                              <div
                                    onClick={() => setReject(!isReject)}
                                    className="cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>

                        <div className="max-h-[700px] px-10 text-start bar overflow-y-scroll">
                              <form action="" onSubmit={selectSearchCategory.value === 'Daraz Order' ? update_all_status_reject_for_daraz : update_all_status_rejectSubmit}>
                                    <div className="mt-10 text-black">
                                          <label className="text-sm">Select Status</label>
                                          <Select
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
                                                // className="text-black"
                                                name="rejectStatus"
                                                required
                                                options={statusOption}
                                                placeholder="Please select"
                                                onChange={setStatusOptionSelect}
                                          />
                                    </div>
                                    {/* {} */}

                                    {(statusOptionSelect?.value === "approved" || statusOptionSelect?.value === "Refund" || statusOptionSelect?.value === "Partial Refund") && (
                                          <div className="mt-4">
                                                <label className="text-sm">Add Amount</label>
                                                <input
                                                      required
                                                      name="rejectAmount"
                                                      type="number"
                                                      placeholder="Reject Amount"
                                                      rows="4"
                                                      className="w-full p-2 border border-black rounded-md text-gray-900"
                                                />
                                          </div>
                                    )}

                                    <div className="space-y-2 mt-5">
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
                                    <div className=" mt-4">
                                          <label className="text-sm">Add Note</label>
                                          <textarea
                                                required
                                                name="rejectNote"
                                                type="text"
                                                placeholder="Reject Note"
                                                rows="4"
                                                className="w-full p-2 border border-black rounded-md  text-gray-900"
                                          />
                                    </div>

                                    <div className="flex items-center justify-between mt-10">
                                          {!loading ? (
                                                <button
                                                      type="submit"
                                                      className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                                >
                                                      <span className="absolute -start-full transition-all group-hover:start-4">
                                                            <FaLongArrowAltRight />
                                                      </span>
                                                      <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                            Update Reject
                                                      </span>
                                                </button>
                                          ) : (
                                                <div className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                                                      <span className="absolute -start-full transition-all group-hover:start-4">
                                                            <FaLongArrowAltRight />
                                                      </span>
                                                      <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                            Update
                                                      </span>
                                                </div>
                                          )}
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>
      );
}
