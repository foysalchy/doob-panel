import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "../../../../Common/DeleteModal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Swal from "sweetalert2";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const AdminNoticeManager = () => {
      const [loading, setLoading] = useState(false);
      const [deleteId, setDeletId] = useState("");
      const [deletePopUp, setDeletePopUp] = useState(false);
      const [isDelete, setIsDelete] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);

      const { data: popupData = [], refetch, isLoading } = useQuery({
            queryKey: "noticeData",
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/seller-notice`);
                  const data = await res.json();
                  return data?.data;
            },
      });

      const DeleteSeller = (id) => {
            setDeletePopUp(True);
            setDeletId(id);
      };

      if (isDelete) {
            fetch(`https://doob.dev/api/v1/seller/popup/delete/${deleteId}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setIsDelete(false);
                        setDeletId("");
                        showAlert("Ads is Deleted", "", "success");
                        refetch("");
                  });
      }

      const handleImageClick = (imageSrc) => {
            setSelectedImage(imageSrc);
      };

      const style = {
            active: "px-3 py-1 rounded-md bg-blue-500 text-white",
            deactive: "px-3 py-1 rounded-md bg-red-500 text-white",
      };

      const EditStatus = (id, status) => {
            console.log(id, status);
            setLoading(True);
            fetch(`https://doob.dev/api/v1/admin/seller-notice?NoticeId=${id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.sTringify({ status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        showAlert(`Seller disable ${status} `, "", "success");
                        refetch();
                  });
      };

      const onDelete = (id) => {
            setLoading(True);
            fetch(`https://doob.dev/api/v1/admin/seller-notice?NoticeId=${id}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, `https://doob.dev/api/v1/admin/seller-notice?NoticeId=${id}`);
                        setLoading(false);
                        showAlert(`Seller disable ${status} `, "", "success");
                        refetch();
                  });
      };

      return (
            <div>
                  <div className="h-0 w-0">
                        <DeleteModal setOpenModal={setDeletePopUp} OpenModal={deletePopUp} setIsDelete={setIsDelete} />
                  </div>
                  <div className="">
                        {selectedImage && (
                              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
                                    <div className="relative max-w-screen-md mx-auto">
                                          <div
                                                onClick={() => handleImageClick(false)}
                                                className="cursor-pointer bg-gray-300 rounded-full absolute top-4 right-4 mb-2 p-2 text-2xl hover:bg-gray-400"
                                          >
                                                <RxCross2 className="text-xl" />
                                          </div>
                                          <img className="max-w-full rounded max-h-full" src={selectedImage} srcSet={selectedImage} alt="Preview" />
                                    </div>
                              </div>
                        )}
                  </div>
                  <Link
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="add"
                  >
                        <span className="absolute -start-full Transition-all group-hover:start-4">
                              <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
                        </span>
                        <span className="text-sm font-medium Transition-all group-hover:ms-4">Add Notice</span>
                  </Link>

                  <section className="mt-4 mx-auto">
                        <Table
                              className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        >
                              <Thead
                                    className="bg-gray-50 dark:bg-gray-800"
                              >
                                    <Tr>
                                          <Th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Photo
                                          </Th>
                                          <Th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                URL
                                          </Th>
                                          <Th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Title
                                          </Th>
                                          <Th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Message
                                          </Th>
                                          <Th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Date
                                          </Th>
                                          <Th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                          >
                                                Action
                                          </Th>
                                    </Tr>
                              </Thead>

                              <Tbody
                                    className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                              >
                                    {isLoading ? (
                                          <Tr>
                                                <Td
                                                      colSpan="6" className="text-center py-8"
                                                >
                                                      <LoaderData />
                                                </Td>
                                          </Tr>
                                    ) : popupData.length === 0 ? (
                                          <Tr>
                                                <Td
                                                      colSpan="6" className="py-2 text-center text-gray-500"
                                                >
                                                      Data Not Found!
                                                </Td>
                                          </Tr>
                                    ) : (
                                          popupData.map((itm) => (
                                                <Tr key={itm?._id}>
                                                      <Td
                                                            className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
                                                      >
                                                            <div
                                                                  onClick={() => setOpenInvoice(itm?._id)}
                                                            // className="inline-flex items-center gap-x-3 cursor-pointer text-blue-500"
                                                            >
                                                                  <img src={itm?.image} alt="" className="w-20 object-cover h-20 rounded-lg" />
                                                            </div>
                                                      </Td>
                                                      <Td
                                                            className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 "
                                                      >{itm?.link}</Td>
                                                      <Td
                                                            className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 "
                                                      >{itm?.title}</Td>
                                                      <Td className="px-4 py-4 text_editor text-sm text-gray-500 dark:text-gray-300 ">
                                                            <div
                                                                  dangerouslySetInnerHTML={{
                                                                        __html: itm?.message,
                                                                  }}
                                                            ></div>
                                                      </Td>
                                                      <Td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                            {
                                                                  itm?.time
                                                                        ? new Date(itm.time).toLocaleString("en-US", {
                                                                              year: "numeric",
                                                                              month: "long",
                                                                              day: "numeric",
                                                                              hour: "numeric",
                                                                              minute: "numeric",
                                                                              second: "numeric",
                                                                        })
                                                                        : "Invalid Date"
                                                            }
                                                      </Td>
                                                      <Td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                            <div className="flex gap-2 items-center justify-around">
                                                                  <button onClick={() => onDelete(itm?._id)} className={style.deactive}>
                                                                        Delete
                                                                  </button>
                                                                  {itm?.status ? (
                                                                        <button onClick={() => EditStatus(itm?._id, false)} className={style.active}>
                                                                              Activate
                                                                        </button>
                                                                  ) : (
                                                                        <button onClick={() => EditStatus(itm?._id, True)} className={style.deactive} type="button">
                                                                              Deactivate
                                                                        </button>
                                                                  )}
                                                            </div>
                                                      </Td>
                                                </Tr>
                                          ))
                                    )}
                              </Tbody>
                        </Table>
                  </section>
            </div>
      );
};

export default AdminNoticeManager;
