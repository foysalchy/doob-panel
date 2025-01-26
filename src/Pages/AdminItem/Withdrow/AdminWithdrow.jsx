import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useImageUpload from "../../../Hooks/UploadImage";
import { Search } from "lucide-react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const AdminWithdrow = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modalData, setModalData] = useState({ action: null, id: null });
      const [comment, setComment] = useState("");
      const [images, setImages] = useState([]);
      const [search_query, set_search_query] = useState('')

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

            const requestData = {
                  id: modalData.id,
                  status: modalData.action,
                  message: {
                        comment,
                        // images: uploadedImages,
                  }
            };

            fetch(`https://doob.dev/api/v1/admin/withdraw`, {

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


      const filtered_data = search_query
            ? withdrawHistory.filter((item) => {
                  return Object.values(item).some((value) =>
                        value?.toString().toLowerCase().includes(search_query.toLowerCase())
                  );
            })
            : withdrawHistory;





      return (
            <div className=" px-4 py-2 bar overflow-x-auto">

                   <div className='flex items-center justify-between gap-2'>
                        Withdraw
                        <div className="relative max-w-md my-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                    onChange={(e) => set_search_query(e.target.value)}
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="Search for anything..."
                                    aria-label="Search"
                              />
                        </div>
                  </div>
                  <Table className="w-full bg-white border-collapse border border-gray-300">
                        <Thead>
                              <Tr className="bg-gray-200">
                                    <Th className="text-left py-2 px-4">Amount</Th>
                                    <Th className="text-left py-2 px-4">Email</Th>
                                    <Th className="text-left py-2 px-4">Phone</Th>
                                    <Th className="text-left py-2 px-4">Account Number</Th>
                                    <Th className="text-left py-2 px-4">Account Name</Th>
                                    <Th className="text-left py-2 px-4">Bank Name</Th>
                                    <Th className="text-left py-2 px-4">Time</Th>
                                    <Th className="text-left py-2 px-4">Status</Th>
                              </Tr>
                        </Thead>
                        <Tbody>
                              {filtered_data.map((withdraw) => (
                                    <Tr key={withdraw._id} className="border-t border-gray-300">
                                          <Td className="py-2 px-4">{withdraw.amount}</Td>
                                          <Td className="py-2 px-4">{withdraw.email}</Td>
                                          <Td className="py-2 px-4">{withdraw.phone}</Td>
                                          <Td className="py-2 px-4">{withdraw.accountNumber}</Td>
                                          <Td className="py-2 px-4">{withdraw.accountName}</Td>
                                          <Td className="py-2 px-4">{withdraw.bankName}</Td>
                                          <Td className="py-2 px-4">
                                                <div className="bar overflow-x-hidden">
                                                      {new Date(withdraw.time_stamp).toLocaleString(undefined, {
                                                            dateStyle: "medium",
                                                            timeStyle: "medium",
                                                      })}
                                                </div>
                                          </Td>
                                          <Td className="py-2 px-4">
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
                                          </Td>


                                    </Tr>
                              ))}
                        </Tbody>
                  </Table>
            </div>
      );
};

export default AdminWithdrow;
