import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UpdatePage from "./UpdatePage";
import { BsEye } from "react-icons/bs";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { FaArrowRightLong, FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineDeleteOutline, MdOutlineFolderDelete } from "react-icons/md";
import { TbRestore, TbTrashOff } from "react-icons/tb";
import BrightAlert from "bright-alert";

const PageManagement = () => {
  const { shopInfo } = useContext(AuthContext);
  const [trash_status, setTrash_status] = useState(false);

  const { data: faqs = [], refetch } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/pages");
      const data = await res.json();
      return data;
    },
  });

  const allPage = faqs.filter(
    (item) => item.draft || item.draft === trash_status
  );

  const ActiveHandle = (id) => {
    fetch(`https://doob.dev/api/v1/admin/page/status/${id}`, {
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
    fetch(`https://doob.dev/api/v1/admin/page/unstatus/${id}`, {
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
    fetch(`https://doob.dev/api/v1/admin/page/delete?id=${id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });
  };

  const trash = (id, status) => {
    fetch(`https://doob.dev/api/v1/admin/page/update-trash`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id, status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });
  };

  const [OpenModal, setOpenModal] = useState(false);

  const handleViewDetails = (ticketId) => {
    setOpenModal(ticketId);
  };

  console.log(faqs?.filter((faq) => faq?.trash !== trash_status));

  return (
    <div>
      <div className="flex gap-4">
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          to="/admin/page-management/add-page"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <svg
              className="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
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
            {trash_status ? "Active Page" : "Trash Page"}
          </span>
        </button>
      </div>
      <section className=" px-4 mx-auto">
        <h1 className="text-center my-10 font-bold text-2xl">
          This is Page List
        </h1>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 divide-gray-700">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Page Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {faqs
                      ?.filter((faq) => faq?.trash == trash_status)
                      ?.map((faq, index) => (
                        <tr>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="w-5/12">
                                <h2 className="font-medium text-gray-800  ">
                                  {faq?.title}
                                  <span className="text-yellow-600 ml-3">
                                    {faq?.draft && <>(draft)</>}
                                  </span>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {faq.status ? (
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
                              {trash_status && (
                                <button
                                  onClick={() => DeleteHandle(faq?._id)}
                                  className=" transition-colors duration-200 text-xl text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                  <MdOutlineDeleteOutline />
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  trash(faq?._id, faq?.trash ? false : true)
                                }
                                className=" transition-colors duration-200  text-xl text-red-500 hover:text-red-700 focus:outline-none"
                              >
                                {trash_status ? (
                                  <TbRestore className="text-green-500 hover:text-green-700" />
                                ) : (
                                  <TbTrashOff className="text-red-500 hover:text-red-700" />
                                )}
                                {/* <MdOutlineFolderDelete /> */}
                              </button>
                              <button
                                onClick={() => handleViewDetails(faq?._id)}
                              >
                                <BiEdit className=" transition-colors text-xl duration-200 text-yellow-500 hover:text-yellow-700 focus:outline-none" />
                              </button>

                              <Link
                                to={`/pages/${faq?._id}`}
                                // onClick={() => handleViewDetails(faq?._id)}
                              >
                                <BsEye className=" transition-colors text-xl duration-200 text-green-500 hover:text-green-700 focus:outline-none" />
                              </Link>
                            </div>
                          </td>
                          {OpenModal === faq?._id && (
                            <div className="h-0 w-0">
                              <UpdatePage
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

export default PageManagement;
