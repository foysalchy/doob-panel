import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useImageUpload from "../../../Hooks/UploadImage";


const AdminWithdrow = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modalData, setModalData] = useState({ action: null, id: null });
      const [comment, setComment] = useState("");
      const [images, setImages] = useState([]);

      const { uploadImage } = useImageUpload();

      const { data: withdrawHistory = [], refetch } = useQuery({
            queryKey: ["my-withdrawHistory"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/withdraw-for-admin`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const update_status = async () => {

            // let uploadedImages = [];

            // // Upload each image and collect the result
            // for (let i = 0; i < images.length; i++) {
            //       const imageFormData = new FormData();
            //       imageFormData.append("file", images[i].file); // Assuming each image has a `file` property
            //       try {
            //             const response = await uploadImage(imageFormData); // Upload each image
            //             if (response?.url) {
            //                   uploadedImages.push(response.url); // Collect the uploaded image URL
            //             }
            //       } catch (error) {
            //             console.error(`Error uploading image ${i}:`, error);
            //       }
            // }

            const requestData = {
                  id: modalData.id,
                  status: modalData.action,
                  message: {
                        comment,
                        // images: uploadedImages,
                  }
            };

            // Send the status update request
            fetch(`http://localhost:5001/api/v1/admin/withdraw`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestData),
            })
                  .then((res) => res.json())
                  .then(() => {
                        console.log("Status updated successfully");
                        closeModal();
                        refetch();
                  })
                  .catch((error) => {
                        console.error("Error updating status:", error);
                  });



      };

      const openModal = (id, action) => {
            setModalData({ action, id });
            setIsModalOpen(true);
      };

      const closeModal = () => {
            setIsModalOpen(false);
            setComment("");
            setImages([]);
      };

      const handleImageChange = (e) => {
            const files = Array.from(e.target.files);
            const newImages = files.map((file) => ({
                  file,
                  preview: URL.createObjectURL(file),
            }));
            setImages((prev) => [...prev, ...newImages]);
      };

      const handleImageRemove = (index) => {
            setImages((prev) => prev.filter((_, i) => i !== index));
      };




      return (
            <div className=" mx-auto px-4 py-8 bar overflow-x-auto">
                  <table className="w-[1400px] bg-white border-collapse border border-gray-300">
                        <thead>
                              <tr className="bg-gray-200">
                                    <th className="text-left py-2 px-4">Amount</th>
                                    <th className="text-left py-2 px-4">Email</th>
                                    <th className="text-left py-2 px-4">Phone</th>
                                    <th className="text-left py-2 px-4">Account Number</th>
                                    <th className="text-left py-2 px-4">Account Name</th>
                                    <th className="text-left py-2 px-4">Bank Name</th>
                                    <th className="text-left py-2 px-4">Time</th>
                                    <th className="text-left py-2 px-4">Status</th>
                              </tr>
                        </thead>
                        <tbody>
                              {withdrawHistory.map((withdraw) => (
                                    <tr key={withdraw._id} className="border-t border-gray-300">
                                          <td className="py-2 px-4">{withdraw.amount}</td>
                                          <td className="py-2 px-4">{withdraw.email}</td>
                                          <td className="py-2 px-4">{withdraw.phone}</td>
                                          <td className="py-2 px-4">{withdraw.accountNumber}</td>
                                          <td className="py-2 px-4">{withdraw.accountName}</td>
                                          <td className="py-2 px-4">{withdraw.bankName}</td>
                                          <td className="py-2 px-4">
                                                <div className="bar overflow-x-hidden">
                                                      {new Date(withdraw.time_stamp).toLocaleString(undefined, {
                                                            dateStyle: "medium",
                                                            timeStyle: "medium",
                                                      })}
                                                </div>
                                          </td>
                                          <td className="py-2 px-4">
                                                {withdraw?.status ? (
                                                      <span
                                                            className={`capitalize ${withdraw.status === true ? "text-green-600" : withdraw.status === false ? "text-yellow-600" : "text-red-600"}`}
                                                      >
                                                            {withdraw.status === true
                                                                  ? "Approved"
                                                                  : withdraw.status === false
                                                                        ? "Pending"
                                                                        : "Rejected"}
                                                      </span>
                                                ) : (
                                                      <div className="flex space-x-2">
                                                            <button
                                                                  onClick={() => openModal(withdraw._id, "approve")}
                                                                  className="text-blue-600 bg-blue-100 px-4 py-1 rounded-md"
                                                            >
                                                                  Approve
                                                            </button>
                                                            <button
                                                                  onClick={() => openModal(withdraw._id, "reject")}
                                                                  className="text-red-600 bg-red-100 px-4 py-1 rounded-md"
                                                            >
                                                                  Reject
                                                            </button>
                                                      </div>
                                                )}

                                                {isModalOpen && (
                                                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-10">
                                                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                                                  <h2 className="text-lg font-semibold mb-4">
                                                                        {modalData.action === "approve" ? "Approve Withdrawal" : "Reject Withdrawal"}
                                                                  </h2>

                                                                  <textarea
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                        placeholder="Enter your comment"
                                                                        className="w-full border rounded-md p-2 mb-4"
                                                                        rows="4"
                                                                  ></textarea>

                                                                  {/* <div className="mb-4">
                                                                        <label
                                                                              htmlFor="file-upload"
                                                                              className="block text-gray-700 font-medium mb-2"
                                                                        >
                                                                              Upload Images
                                                                        </label>
                                                                        <div className="flex items-center justify-center w-full">
                                                                              <label
                                                                                    htmlFor="file-upload"
                                                                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
                                                                              >
                                                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                                          <svg
                                                                                                aria-hidden="true"
                                                                                                className="w-12 h-12 mb-3 text-blue-400"
                                                                                                fill="none"
                                                                                                stroke="currentColor"
                                                                                                viewBox="0 0 24 24"
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                          >
                                                                                                <path
                                                                                                      strokeLinecap="round"
                                                                                                      strokeLinejoin="round"
                                                                                                      strokeWidth="2"
                                                                                                      d="M7 16l-4-4m0 0l4-4m-4 4h18M13 5l7 7-7 7"
                                                                                                ></path>
                                                                                          </svg>
                                                                                          <p className="mb-2 text-sm text-gray-600">
                                                                                                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                                                                          </p>
                                                                                          <p className="text-xs text-gray-500">PNG, JPG, or JPEG (Max 5MB)</p>
                                                                                    </div>
                                                                                    <input
                                                                                          id="file-upload"
                                                                                          type="file"
                                                                                          accept="image/*"
                                                                                          multiple
                                                                                          onChange={handleImageChange}
                                                                                          className="hidden"
                                                                                    />
                                                                              </label>
                                                                        </div>
                                                                  </div>

                                                                  {images.length > 0 && (
                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                                                                              {images.map((image, index) => (
                                                                                    <div
                                                                                          key={index}
                                                                                          className="relative group bg-white shadow-md rounded-lg overflow-hidden border"
                                                                                    >
                                                                                          <img
                                                                                                src={image.preview}
                                                                                                alt={`Upload Preview ${index + 1}`}
                                                                                                className="w-full h-32 object-cover transition-transform transform group-hover:scale-105"
                                                                                          />
                                                                                          <button
                                                                                                onClick={() => handleImageRemove(index)}
                                                                                                className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full p-1 shadow hover:bg-red-700 transition"
                                                                                          >
                                                                                                <RxCross2 />
                                                                                          </button>
                                                                                    </div>
                                                                              ))}
                                                                        </div>
                                                                  )} */}



                                                                  <div className="flex justify-end gap-4">
                                                                        <button
                                                                              onClick={closeModal}
                                                                              className="text-gray-600 bg-gray-100 px-4 py-2 rounded-md"
                                                                        >
                                                                              Cancel
                                                                        </button>
                                                                        <button
                                                                              onClick={update_status}
                                                                              className="text-white bg-blue-600 px-4 py-2 rounded-md"
                                                                        >
                                                                              Submit
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                )}
                                          </td>


                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      );
};

export default AdminWithdrow;
