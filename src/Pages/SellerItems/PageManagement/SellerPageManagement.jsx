import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import SellerUpdatePage from "./SellerUpdatePage";
import { BsEye } from "react-icons/bs";
import { MdOutlineFolderDelete, MdRestore } from "react-icons/md";
import { TbRestore } from "react-icons/tb";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { TbTrashOff } from "react-icons/tb";
import BrightAlert from "bright-alert";
import LoaderData from "../../../Common/LoaderData";

const SellerPageManagement = () => {
  const [loading, setLoading] = useState(false);
  const [trash_status, setTrash_status] = useState(false);
  const [daft, setDaft] = useState(false);

  console.log(trash_status);

  const { shopInfo } = useContext(AuthContext);

  const {
    data: faqs = [],
    refetch,
    isLoading: loadingData,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/pages/${shopInfo.shopId}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(`https://doob.dev/api/v1/seller/pages/${shopInfo.shopId}`);
  const ActiveHandle = (id) => {
    setLoading(true);

    fetch(`https://doob.dev/api/v1/seller/page/status/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });
  };

  const DeactiveHandle = (id) => {
    fetch(`https://doob.dev/api/v1/seller/page/falseStatus/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });
  };
  const DeleteHandle = (id) => {
    fetch(`https://doob.dev/api/v1/seller/page/delete/${id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });
  };

  const trash = (id, status) => {
    fetch(`https://doob.dev/api/v1/seller/page/trash-status`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id, status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });
  };

  const [OpenModal, setOpenModal] = useState(false);

  const handleViewDetails = (ticketId) => {
    setOpenModal(ticketId);
  };

  // console.log(faqs.filter((faq) => faq?.trash !== trash_status));

  console.log(faqs);

  return (
    <div>
      <div className="flex gap-4">
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          to="/seller/manage-pages/add-page"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4">
            Add New Page
          </span>
        </Link>
        <button
          className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          onClick={() => setTrash_status(!trash_status)}
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4">
            {trash_status ? "Manage Page" : "  Trash Page"}
          </span>
        </button>
        <button
          className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          onClick={() => setDaft(!daft)}
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
          </span>
          <span className="text-sm font-medium transition-all group-hover:ms-4">
            Daft
          </span>
        </button>
      </div>
      <section className=" px-4 mx-auto">
        <h1 className="text-center my-10 font-bold text-2xl">
          {trash_status ? "Trash Page List" : " Page List"}
        </h1>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border b border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-50 ">
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
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  {loadingData && <LoaderData />}
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {faqs
                      .filter((faq) => faq?.trash == trash_status)
                      .filter((faq) => faq?.draft == daft)
                      ?.map((faq, index) => (
                        <tr key={faq?.title}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="w-5/12">
                                <h2 className="font-medium text-gray-800  ">
                                  {faq?.title}
                                  <span className="text-yellow-500">
                                    {faq?.draft && " (Drafts)"}
                                  </span>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {faq?.status ? (
                              <button
                                onClick={() => DeactiveHandle(faq?._id)}
                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <h2 className="text-sm font-normal text-emerald-500">
                                  Active
                                </h2>
                              </button>
                            ) : (
                              <button
                                onClick={() => ActiveHandle(faq?._id)}
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
                                onClick={() =>
                                  trash_status
                                    ? DeleteHandle(faq?._id)
                                    : trash(faq?._id, faq?.trash ? false : true)
                                }
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
                              {trash_status && (
                                <button
                                  onClick={() =>
                                    trash(faq?._id, faq?.trash ? false : true)
                                  }
                                  className=" transition-colors duration-200  text-xl  focus:outline-none"
                                >
                                  {
                                    <TbRestore className="text-green-500 hover:text-green-700" />
                                  }
                                </button>
                              )}

                              <button
                                onClick={() => handleViewDetails(faq?._id)}
                              >
                                <BiEdit className=" transition-colors text-xl duration-200 text-yellow-500 hover:text-yellow-700 focus:outline-none" />
                              </button>
                              <Link
                                to={`/shop/${shopInfo.shopId}/pages/${faq?._id}`}
                              >
                                <BsEye className="transition-colors text-xl duration-200 cursor-pointer text-green-500 hover:text-green-700 focus:outline-none" />
                              </Link>
                            </div>
                          </td>
                          {OpenModal === faq?._id && (
                            <div className="h-0 w-0">
                              <SellerUpdatePage
                                OpenModal={OpenModal}
                                refetch={refetch}
                                setOpenModal={setOpenModal}
                                FAQInfo={faq}
                              />
                            </div>
                          )}
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

export default SellerPageManagement;
