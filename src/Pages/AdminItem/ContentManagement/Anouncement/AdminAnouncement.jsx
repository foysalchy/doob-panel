import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "../../../../Common/DeleteModal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Swal from "sweetalert2";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert"
import useAddDivToTableCells from "../../../../Common/useAddDivToTableCells";

const AdminAnouncement = () => {
      useAddDivToTableCells()
      const [loading, setLoading] = useState(false);
      const [deleteId, setDeletId] = useState("");
      const [deletePopUp, setDeletePopUp] = useState(false);
      const [isDelete, setIsDelete] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);

      const { data: popupData = [], refetch, isLoading } = useQuery({
            queryKey: "announcement",
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/announcement`);
                  const data = await res.json();
                  return data?.data;
            },
      });

      const DeleteSeller = (id) => {
            setDeletePopUp(true);
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
            setLoading(true);
            fetch(`https://doob.dev/api/v1/admin/announcement?AnointmentId=${id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        showAlert(`Seller disable ${status} `, "", "success");
                        refetch();
                  });
      };

      const onDelete = (id) => {
            setLoading(true);
            fetch(`https://doob.dev/api/v1/admin/announcement?AnointmentId=${id}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
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
                  <div className='flex items-center justify-between gap-2'>
                  Announce
                  <Link
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="add"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">Add Announcement</span>
                  </Link>
                  </div>

                  <section className="mt-4 mx-auto">
                        <table className="min-w-full bg-white ">
                              <thead className="">
                                    <tr className="border-b">
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Photo
                                          </th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                URL
                                          </th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Title
                                          </th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Message
                                          </th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Date
                                          </th>
                                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Action
                                          </th>
                                    </tr>
                              </thead>

                              <tbody className="bg-white  ">
                                    {isLoading ? (
                                          <tr>
                                                <td colSpan="6" className="text-center py-8">
                                                      <LoaderData />
                                                </td>
                                          </tr>
                                    ) : popupData.length === 0 ? (
                                          <tr>
                                                <td colSpan="6" className="py-2 text-center text-gray-500">
                                                      Data Not Found!
                                                </td>
                                          </tr>
                                    ) : (
                                          popupData.map((itm) => (
                                                <tr key={itm?._id} className="border-b">
                                                      <td className="px-4 py-4 text-sm font-medium   whitespace-nowrap">
                                                            <div onClick={() => setOpenInvoice(itm?._id)} className="inline-flex items-center gap-x-3 cursor-pointer text-blue-500">
                                                                  <img src={itm?.image} alt="" className="w-20 h-20 rounded-lg" />
                                                            </div>
                                                      </td>
                                                      <td className="px-4 py-4 text-sm  ">{itm?.link}</td>
                                                      <td className="px-4 py-4 text-sm  ">{itm?.title}</td>
                                                      <td className="px-4 py-4 text_editor text-sm  ">
                                                            <div
                                                                  dangerouslySetInnerHTML={{
                                                                        __html: itm?.message,
                                                                  }}
                                                            ></div>
                                                      </td>
                                                      <td className="px-4 py-4 text-sm  ">
                                                            {new Date(itm?.time).toLocaleString("en-US", {
                                                                  year: "numeric",
                                                                  month: "long",
                                                                  day: "numeric",
                                                                  hour: "numeric",
                                                                  minute: "numeric",
                                                                  second: "numeric",
                                                            })}
                                                      </td>
                                                      <td className="px-4 py-4 text-sm  ">
                                                            <div className="flex items-center justify-around">
                                                                  <button onClick={() => onDelete(itm?._id)} className={style.deactive}>
                                                                        Delete
                                                                  </button>
                                                                  {itm?.status ? (
                                                                        <button onClick={() => EditStatus(itm?._id, false)} className={style.active}>
                                                                              Activate
                                                                        </button>
                                                                  ) : (
                                                                        <button onClick={() => EditStatus(itm?._id, true)} className={style.deactive} type="button">
                                                                              Deactivate
                                                                        </button>
                                                                  )}
                                                            </div>
                                                      </td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </section>
            </div>
      );
};

export default AdminAnouncement;
