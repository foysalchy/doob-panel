import React from "react";

import { useQuery } from "@tanstack/react-query";
// import DeleteModal from "../../../../Common/DeleteModal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { MdPadding } from "react-icons/md";
import Swal from "sweetalert2";
import DeleteModal from "../../../Common/DeleteModal";

const DarazUserManagement = () => {
  const [loading, setLoading] = useState(false);

  const { data: darazUserData = [], refetch } = useQuery({
    queryKey: "noticeData",
    queryFn: async () => {
      const res = await fetch(`https://doob.dev/api/v1/admin//old-all-daraz`);
      const data = await res.json();
      return data?.data;
    },
  });
  console.log(darazUserData);

  const [deleteId, setDeletId] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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
        Swal.fire("Ads is Deleted", "", "success");
        refetch("");
      });
  }

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
    fetch(`https://doob.dev/api/v1/admin/seller-notice?NoticeId=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire(`Seller disable ${status} `, "", "success");
        refetch();
      });
  };

  const onDelete = (id) => {
    // console.log(
    //   "🚀 ~ id:",
    //   `https://doob.dev/api/v1/admin/delete-daraz-account/id=${id}`
    // );

    // return;
    setLoading(true);
    fetch(`https://doob.dev/api/v1/admin/delete-daraz-account/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "🚀 ~ file: DarazUserManagement.jsx:87 ~ .then ~ data:",
          data
        );

        setLoading(false);
        Swal.fire(`Deleted Suucessfully`, "", "success");
        refetch();
      });
  };
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

      <section className=" mt-4 mx-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                User Country
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Account Email
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Sign Method
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Account PlatForm
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
            {darazUserData.map((itm) => (
              <tr key={itm?._id}>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  <h2>{itm?.shopInfo ? itm.shopInfo?.name : "Empty"}</h2>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  <h2>{itm?.result?.user_info?.country}</h2>
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                  {itm?.result?.account}
                </td>
                <td className="px-4 py-4 text_editor text-sm text-gray-500 dark:text-gray-300 ">
                  <h2>{itm?.data?.sign_method}</h2>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                  {new Date(itm?.data?.timestamp).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                  <div className="flex items-center justify-around">
                    <button
                      onClick={() => onDelete(itm?._id)}
                      className={style.deactive}
                    >
                      Delete
                    </button>
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

export default DarazUserManagement;
