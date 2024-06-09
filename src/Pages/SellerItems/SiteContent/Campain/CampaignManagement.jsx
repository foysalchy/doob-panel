import React, { useContext, useState } from "react";
import DeleteModal from "../../../../Common/DeleteModal";
import { FaArrowRightLong } from "react-icons/fa6";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import { BiEdit } from "react-icons/bi";

const CampaignManagement = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { shopInfo } = useContext(AuthContext);

  const { data: faqs = [], refetch } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/get-campaign/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(`https://doob.dev/api/v1/seller/get-campaign/${shopInfo._id}`);

  const updateStatus = (id, status) => {
    const data = {
      id,
      status,
    };
    fetch(`https://doob.dev/api/v1/seller/update-status-campaign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire(`Status Update  `, "", "success");
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
      `https://doob.dev/api/v1/seller/delete-campaign/${deleteId}`,
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
        Swal.fire("Delete Successful", "", "success");
        refetch("");
        console.log(data);
      });

    console.log(deleteId, isDelete);
  }

  const [OpenModal, setOpenModal] = useState(false);

  const handleViewDetails = (campaign) => {
    // setOpenModal(ticketId
    navigate(
      `/seller/content-management/campaign-management/edit/${campaign?._id}`
    );
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // const formattedEndTime = new Date(faq?.endTime).toLocaleString();

  const formateTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");

    return `${monthName}-${day} ${formattedHours}:${minutes} ${ampm}`;
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
      <div className="">
        {selectedImage && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
            <div className="relative max-w-screen-md max-h-[80%] mx-auto">
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
          Add New Campaign
        </span>
      </Link>

      <section className=" px-4 mx-auto">
        <h1 className="text-center my-10 font-bold text-2xl">
          Here is your All Campaign List
        </h1>
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto ">
            <div className="">
              <div className="overflow-hidden border  border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y  divide-gray-700">
                  <thead className="bg-gray-900 ">
                    <tr>
                      <th scope="col" className=" text-gray-500 pl-4 ">
                        <button className="flex items-center gap-x-2">
                          <span>Campaign Name</span>
                        </button>
                      </th>
                      <th scope="col" className=" text-gray-500 ">
                        <button className="flex items-center gap-x-2">
                          <span>Campaign Time</span>
                        </button>
                      </th>
                      <th scope="col" className=" text-gray-500 ">
                        <button className="flex items-center gap-x-2">
                          <span>Campaign as a Flash</span>
                        </button>
                      </th>
                      <th scope="col" className="text-gray-500 ">
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
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
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {faqs?.map((faq, index) => (
                      <tr>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="inline-flex items-center gap-x-3">
                              <div>
                                <img
                                  onClick={() => handleImageClick(faq?.image)}
                                  className="object-cover cursor-pointer w-10 h-10 rounded"
                                  src={faq?.image}
                                  srcSet={faq?.image}
                                  alt=""
                                />
                              </div>
                              {faq?.name}
                            </div>
                          </div>
                        </td>

                        <td className="text-start">
                          {faq?.isFlash && (
                            <div className="font-medium text-gray-800  whitespace-pre-wrap ">
                              {formateTime(faq?.startTime)} -{" "}
                              {formateTime(faq?.endTime)}
                            </div>
                          )}
                        </td>
                        <td className="text-start">
                          <div className="font-medium text-gray-800  whitespace-pre-wrap ">
                            {faq?.isFlash ? "Yes" : "No"}
                          </div>
                        </td>
                        <td className=" py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {faq.status ? (
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

                            <button
                              onClick={() => handleViewDetails(faq)}
                            // to={`edit/${faq?._id}`}
                            >
                              <BiEdit className=" transition-colors text-xl duration-200 text-yellow-500 hover:text-yellow-700 focus:outline-none" />
                            </button>
                          </div>
                        </td>
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

export default CampaignManagement;
