import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "../../../../Common/DeleteModal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { MdPadding } from "react-icons/md";
import Swal from "sweetalert2";
import LoaderData from "../../../../Common/LoaderData";

const PopupManagement = () => {
  const [loading, setLoading] = useState(false);
  const { shopInfo } = useContext(AuthContext);
  const { data: faqs, refetch, isLoading: loadingData } = useQuery({
    queryKey: "faqs",
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/popup/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });


  const updateStatus = (id, status) => {
    fetch(`https://doob.dev/api/v1/seller/popup/status/${id}`, {
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
      `https://doob.dev/api/v1/seller/popup/delete/${deleteId}`,
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
        Swal.fire("Ads is Deleted", "", "success");
        refetch("");
      });
  }

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  console.log(faqs);

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
          Modify Popup
        </span>
      </Link>

      <section className=" mt-4 mx-auto">
        {faqs ? (
          <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <img
              className="object-cover w-full h-64"
              srcSet={faqs?.image}
              alt="Article"
            />
            <div className="p-6">
              <div>
                <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                  Ads Link
                </span>
                <a
                  href="#"
                  className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                  tabIndex={0}
                  role="link"
                >
                  {faqs?.link}
                </a>
              </div>
              <div className="flex items-center justify-around mt-4">
                <div className="flex items-center">
                  {faqs?.status ? (
                    <button
                      onClick={() => updateStatus(faqs?._id, false)}
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <h2 className="text-sm font-normal text-emerald-500">
                        Active
                      </h2>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(faqs?._id, true)}
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      <h2 className="text-sm font-normal text-red-500">
                        Deactive
                      </h2>
                    </button>
                  )}
                </div>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  {new Date(faqs?.time).toLocaleString()}
                </span>
                <div className="flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => DeleteSeller(faqs?._id)}
                    className=" transition-colors duration-200 text-red-500 hover:text-red-700 bg-gray-300 p-2 rounded-full focus:outline-none"
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
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1> sorry you have no ads right now</h1>
        )}
        {loadingData && <LoaderData />}
      </section>
    </div>
  );
};

export default PopupManagement;
