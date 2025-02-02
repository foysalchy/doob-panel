import React from "react";
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "../../../../Common/DeleteModal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { MdPadding } from "react-icons/md";
import Swal from "sweetalert2";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert"
import useAddDivToTableCells from "../../../../Common/useAddDivToTableCells";

const AdminSliderManagement = () => {
      const [loading, setLoading] = useState(false);

      const { data: featureImage = [], refetch, isLoading } = useQuery({
            queryKey: ["slider"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/slider`
                  );
                  const data = await res.json();
                  return data?.data ? data?.data : [];
            },
      });

      const [deleteId, setDeletId] = useState("");
      const [deletePopUp, setDeletePopUp] = useState(false);
      const [isDelete, setIsDelete] = useState(false);

       

      const [selectedImage, setSelectedImage] = useState(null);

      const handleImageClick = (imageSrc) => {
            setSelectedImage(imageSrc);
      };

      const style = {
            active: "px-3 py-1 rounded-md bg-green-500 text-white",
            deactive: "px-3 py-1 rounded-md bg-red-500 text-white",
      };

      const EditStatus = (id, status) => {
            console.log(id, status);
            setLoading(true);
            fetch(
                  `https://doob.dev/api/v1/admin/slider?id=${id}&status=${status}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, "data");
                        setLoading(false);
                        showAlert(`Seller disable ${status} `, "", "success");
                        refetch();
                  });
      };
      const EditNoticeStatus = (id, status) => {
            console.log(id, status);
            setLoading(true);
            fetch(
                  `https://doob.dev/api/v1/admin/notice-slider?id=${id}&status=${status}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, "data");
                        setLoading(false);
                        showAlert(`Seller Notice ${status} `, "", "success");
                        refetch();
                  });
      };



      const onDelete = (id) => {
            setLoading(true);
            fetch(`https://doob.dev/api/v1/admin/slider?id=${id}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        showAlert(`Feature Image is Deleted `, "", "success");
                        refetch();
                  });
      };
      useAddDivToTableCells()
      return (
            <div>
                  <div className="h-0 w-0">
                        {" "}
                        <DeleteModal
                              setOpenModal={setDeletePopUp}
                              OpenModal={deletePopUp}
                              setIsDelete={setIsDelete}
                        />
                  </div>
                  <div className="">
                        {selectedImage && (
                              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
                                    <div className="relative max-w-screen-md mx-auto">
                                          <div
                                                onClick={() => handleImageClick(false)}
                                                className="cursor-pointer bg-gray-300 rounded-full absolute top-4 right-4  mb-2 p-2 text-2xl hover:bg-gray-400"
                                          >
                                                <RxCross2 className="text-xl" />
                                          </div>

                                          <img
                                                className="max-w-full rounded max-h-full"
                                                src={selectedImage}
                                                srcSet={selectedImage}
                                                alt="Preview"
                                          />
                                    </div>
                              </div>
                        )}
                  </div>
                  <Link
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="add"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Add   Slider
                        </span>
                  </Link>

                  <section className=" mt-4 mx-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-white">
                                    <tr className="border-b">
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                          >
                                                Photo
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                          >
                                                URL
                                          </th>

                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                          >
                                                Date
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                          >
                                                Action
                                          </th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white ">
                                    {
                                          isLoading ? (
                                                <tr>
                                                      <td colSpan="6" className="text-center py-8">
                                                            <LoaderData />
                                                      </td>
                                                </tr>
                                          )
                                                :
                                                featureImage.map((itm) => (
                                                      <tr key={itm?._id} className="border-b">
                                                            <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">
                                                                  <div
                                                                        onClick={() => setOpenInvoice(itm?._id)}
                                                                        className="inline-flex items-center gap-x-3 cursor-pointer text-blue-500"
                                                                  >
                                                                        <img
                                                                              src={itm?.image}
                                                                              alt=""
                                                                              className="w-20 h-20 rounded-lg"
                                                                        />
                                                                  </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm  ">
                                                                  {itm?.link}
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
                                                                  <div className=" gap-2 items-center justify-around">
                                                                        <button
                                                                              onClick={() => onDelete(itm?._id)}
                                                                              className={style.deactive}
                                                                        >
                                                                              Delete
                                                                        </button>
                                                                        {itm?.status == "true" ? (
                                                                              <button
                                                                                    onClick={() => EditStatus(itm?._id, "false")}
                                                                                    className={style.active}
                                                                                    style={{margin:'0px 10px'}}
                                                                              >
                                                                                    Banner
                                                                              </button>
                                                                        ) : (
                                                                              <button
                                                                                    onClick={() => EditStatus(itm?._id, "true")}
                                                                                    className={style.deactive}
                                                                                    type="button"
                                                                                    style={{margin:'0px 10px'}}
                                                                              >
                                                                                    Banner  
                                                                              </button>
                                                                        )}

                                                                        {itm.n_status == "true" ? (
                                                                              <button
                                                                                    onClick={() => EditNoticeStatus(itm?._id, "false")}
                                                                                    className={style.active}
                                                                              >
                                                                                    Dashboard
                                                                              </button>
                                                                        ) : (
                                                                              <button
                                                                                    onClick={() => EditNoticeStatus(itm?._id, "true")}
                                                                                    className={style.deactive}
                                                                                    type="button"
                                                                              >
                                                                                     Dashboard
                                                                              </button>
                                                                        )}
                                                                  </div>
                                                            </td>
                                                      </tr>
                                                ))}
                              </tbody>
                        </table>
                  </section>
            </div>
      );
};

export default AdminSliderManagement;
