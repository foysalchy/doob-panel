import React from "react";
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "../../../../Common/DeleteModal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { MdEdit, MdPadding } from "react-icons/md";
import Swal from "sweetalert2";
import LoaderData from "../../../../Common/LoaderData";

const AdminFeatureImage = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data: featureImage = [], refetch, isLoading } = useQuery({
    queryKey: ["featureImage"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/admin/feature-images`
      );
      const data = await res.json();
      return data?.data ? data?.data : [];
    },
  });

  console.log(featureImage);
  const [deleteId, setDeletId] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  // const DeleteSeller = (id) => {

  //     setDeletePopUp(true)
  //     setDeletId(id)
  // };

  // if (isDelete) {

  //     fetch(`https://doob.dev/api/v1/seller/popup/delete/${deleteId}`, {
  //         method: "DELETE",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //     }).then((res) => res.json()).then((data) => {
  //         setIsDelete(false)
  //         setDeletId('')
  //         Swal.fire('Ads is Deleted', '', 'success')
  //         refetch('')

  //     })

  // }

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const style = {
    active: "px-3 py-1 rounded-md bg-blue-500 text-white",
    deactive: "px-3 py-1 rounded-md bg-red-500 text-white",
  };

  const EditStatus = (id, status) => {
    console.log(id, status);
    setLoading(true);
    fetch(
      `https://doob.dev/api/v1/admin/feature-image?id=${id}&status=${status}`,
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
        setLoading(false);
        Swal.fire(`Seller disable ${status} `, "", "success");
        refetch();
      });
  };

  const onDelete = (id) => {
    setLoading(true);
    fetch(`https://doob.dev/api/v1/admin/feature-image?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire(`Feature Image is Deleted `, "", "success");
        refetch();
      });
  };

  const [selectIndex, setSelectIndex] = useState("");

  const uploadImage = async (formData) => {
    const url = `https://doob.dev/api/v1/image/upload-image`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imageData = await response.json();
    return imageData.imageUrl;
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image;
    const url = form.url.value;
    const index = selectIndex;

    const imageFormData = new FormData();
    imageFormData.append("image", image.files[0]);
    const imageUrl = await uploadImage(imageFormData);

    const data = {
      image: imageUrl ? imageUrl : openModal?.image,
      link: url,
      index,
    };

    console.log(data, id);

    fetch(
      `https://doob.dev/api/v1/admin/feature-image-update?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(`Category update `, "", "success");
        refetch();
      });

    setOpenModal(false);
  };

  console.log(featureImage);
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
        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        to="add"
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
        </span>

        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Add Feature Image
        </span>
      </Link>

      <section className=" mt-4 mx-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Photo
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                URL
              </th>

              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Intex
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {
              isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <LoaderData />
                  </td>
                </tr>
              )
                :
                featureImage
                  ?.sort((a, b) => parseInt(a.index) - parseInt(b.index))
                  ?.map((itm) => (
                    <tr key={itm?._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
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
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                        {itm?.link}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                        {new Date(itm?.time).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                        {itm?.index && itm.index}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                        <div className="flex items-center justify-around">
                          <button
                            onClick={() => onDelete(itm?._id)}
                            className={style.deactive}
                          >
                            Delete
                          </button>
                          {itm.status ? (
                            <button
                              onClick={() => EditStatus(itm?._id, "false")}
                              className={style.active}
                            >
                              Activate
                            </button>
                          ) : (
                            <button
                              onClick={() => EditStatus(itm?._id, "true")}
                              className={style.deactive}
                              type="button"
                            >
                              Deactivate
                            </button>
                          )}

                          <button
                            onClick={() => setOpenModal(itm)}
                            className="bg-blue-500 text-white p-1 rounded text-lg"
                          >
                            <MdEdit />
                          </button>
                        </div>
                      </td>

                      <div
                        className={`fixed z-[100] flex items-center justify-center ${openModal?._id === itm?._id
                          ? "opacity-1 visible"
                          : "invisible opacity-0"
                          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                      >
                        <div
                          className={`absolute md:w-[500px] w-full rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${openModal?._id === itm?._id
                            ? "scale-1 opacity-1 duration-300"
                            : "scale-0 opacity-0 duration-150"
                            } `}
                        >
                          <svg
                            onClick={() => setOpenModal(false)}
                            className="mx-auto mr-0 w-8 cursor-pointer"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g strokeWidth="0"></g>
                            <g strokeLinecap="round" strokeLinejoin="round"></g>
                            <g>
                              <path
                                d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                fill="#000"
                              ></path>
                            </g>
                          </svg>

                          <form onSubmit={(e) => handleEdit(e, itm?._id)}>
                            <h1 className="text-lg font-semibold text-center mb-4">
                              Edit Feature Image
                            </h1>
                            <img
                              src={itm?.image}
                              alt=""
                              className="w-[100px] h-[100px] rounded"
                            />
                            <div className="flex flex-col items-start gap-1">
                              <label className="text-start" htmlFor="photo">
                                Photo
                              </label>
                              <input
                                type="file"
                                name="image"
                                className="border border-gray-500 p-1 rounded mb-3 w-full"
                              />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                              <label className="text-start" htmlFor="url">
                                URL
                              </label>
                              <input
                                defaultValue={openModal?.link}
                                type="url"
                                name="url"
                                className="border border-gray-500 p-1 rounded mb-3 w-full"
                              />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                              <label className="text-start" htmlFor="index">
                                Index
                              </label>
                              <select
                                onChange={(e) => setSelectIndex(e.target.value)}
                                name="index"
                                id="index"
                                className="border border-gray-500 p-1 rounded mb-3 w-full"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </div>
                            <br />
                            <div className="flex justify-start">
                              <button
                                type="submit"
                                className="me-2 rounded bg-green-700 px-6 py-1 text-white"
                              >
                                Sibmit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </tr>
                  ))}
          </tbody>
        </table>
        {/* modal */}
        <div></div>
        {/* modal */}
      </section>
    </div>
  );
};

export default AdminFeatureImage;
