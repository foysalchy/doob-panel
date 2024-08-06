import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import DeleteModal from "../../../../Common/DeleteModal";
import LoaderData from "../../../../Common/LoaderData";

const FeatureManagement = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { shopInfo } = useContext(AuthContext);

  const { data: faqs = [], refetch, isLoading: loadingData } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/feature/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const updateStatus = (id, status) => {
    fetch(`https://doob.dev/api/v1/seller/feature/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(`Seller disable ${status} `, "", "success");
        refetch();
      });
  };

  const [deleteId, setDeletId] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const DeleteSeller = (id) => {
    setDeletePopUp(true);
    setDeletId(id);
  };

  if (isDelete) {
    fetch(
      `https://doob.dev/api/v1/seller/feature/delete/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsDelete(false);
        setDeletId("");
        Swal.fire("Shop is Deleted", "", "success");
        refetch("");
        console.log(data);
      });

    console.log(deleteId, isDelete);
  }

  const [deleteOn, setDeleteOn] = useState(false);

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

  const handleEditItem = async (e, id) => {
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

    fetch(`https://doob.dev/api/v1/seller/feature/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(`image update`, "", "success");
        refetch();
      });

    setOpenModal(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  return (
    <div>
      <div className="h-0 w-0">
        {" "}
        <DeleteModal
          setOpenModal={setDeleteOn}
          OpenModal={deletePopUp}
          setIsDelete={setIsDelete}
        />
      </div>
      <div className="">
        {selectedImage && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
            <div className="relative max-w-screen-lg mx-auto">
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
          Add New feature
        </span>
      </Link>

      <section className=" px-4 mx-auto">
        <h1 className="text-center my-10 font-bold text-2xl">
          Feature Management
        </h1>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border  border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y  divide-gray-700">
                  <thead className="bg-gray-900 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Page Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Index</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  {loadingData && <LoaderData />}
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {faqs
                      ?.sort((a, b) => parseInt(a.index) - parseInt(b.index))
                      ?.map((faq, index) => (
                        <tr>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="inline-flex items-center gap-x-3">
                                <div className="flex   items-center gap-x-2">
                                  <img
                                    onClick={() => handleImageClick(faq?.image)}
                                    className="object-cover cursor-pointer w-10 h-10 rounded"
                                    src={faq?.image}
                                    srcSet={faq?.image}
                                    alt=""
                                  />
                                  <div className="font-medium text-gray-800 w-80 whitespace-pre-wrap ">
                                    {faq?.link}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {faq?.status ? (
                              <button
                                onClick={() => updateStatus(faq?._id, false)}
                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <h2 className="text-sm font-normal text-emerald-500">
                                  Active
                                </h2>
                              </button>
                            ) : (
                              <button
                                onClick={() => updateStatus(faq?._id, true)}
                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                <h2 className="text-sm font-normal text-red-500">
                                  Deactive
                                </h2>
                              </button>
                            )}
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {faq?.index && faq?.index}
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={() => DeleteSeller(faq?._id)}
                                className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>

                              <button onClick={() => setOpenModal(faq)}>
                                <BiEdit className=" transition-colors text-xl duration-200 text-yellow-500 hover:text-yellow-700 focus:outline-none" />
                              </button>
                            </div>
                          </td>

                          <div
                            className={`fixed z-[100] flex items-center justify-center ${openModal?._id === faq?._id
                              ? "opacity-1 visible"
                              : "invisible opacity-0"
                              } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                          >
                            <div
                              className={`absolute md:w-[500px] w-full rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${openModal?._id === faq?._id
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
                                <g
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g>
                                  <path
                                    d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                    fill="#000"
                                  ></path>
                                </g>
                              </svg>

                              <form
                                onSubmit={(e) => handleEditItem(e, faq?._id)}
                              >
                                <h1 className="text-lg font-semibold text-center mb-4">
                                  Edit Feature Image
                                </h1>

                                <img
                                  src={faq?.image}
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
                                    onChange={(e) =>
                                      setSelectIndex(e.target.value)
                                    }
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureManagement;
