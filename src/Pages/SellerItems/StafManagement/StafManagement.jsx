import React, { useContext, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import StaffEditModal from "./StaffEditModal";
import DeleteModal from "../../../Common/DeleteModal";
import Swal from "sweetalert2";

const StafManagement = () => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: staffInfo = [], refetch } = useQuery({
    queryKey: ["staffInfo"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/all-staff?shopEmail=${user.shopEmail}`
      );
      const data = await res.json();
      localStorage.setItem("price", JSON.stringify(data?.data));
      return data;
    },
  });

  const [deleteId, setDeletId] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const DeleteSeller = (id) => {
    setDeletePopUp(true);
    setDeletId(id);
  };

  if (isDelete) {
    fetch(
      `https://backend.doob.com.bd/api/v1/seller/staff-delete?email=${deleteId}`,
      {
        method: "PUT",
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
      });
  }

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
      <Link
        className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
        to="/seller/staff-account/add-new-staff"
      >
        <span className="absolute -start-full transition-all group-hover:start-10">
          <FaLongArrowAltRight />
        </span>

        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Add New Staff
        </span>
      </Link>

      <section className="mt-4">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">Team members</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {staffInfo?.userLength} users
          </span>
        </div>
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto ">
            <div className="inline-block min-w-full py-2 align-middle ">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <div className="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            className="text-blue-500 border-gray-300 rounded  "
                          />
                          <span>Name</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Role</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Email address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Permissions
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200  ">
                    {staffInfo?.users?.map((user) => (
                      <tr key={user?._id} className="border-b border-black">
                        {user?._id === modalOpen?._id && (
                          <div className="h-0 w-0">
                            <StaffEditModal
                              refetch={refetch}
                              OpenModal={modalOpen}
                              staffInfo={user}
                              setOpenModal={setModalOpen}
                            />
                          </div>
                        )}
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              className="text-blue-500 border-gray-300 rounded  "
                            />
                            <div className="flex items-center gap-x-2">
                              {/* <img
                                                            className="object-cover w-10 h-10 rounded-full"
                                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                                            alt=""
                                                        /> */}
                              <div>
                                <h2 className="font-medium text-gray-800  ">
                                  {user?.name}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4  border-black py-4 text-sm text-gray-500  whitespace-nowrap">
                          {user?.staffRole}
                        </td>
                        <td className="px-4  border-black py-4 text-sm text-gray-500  whitespace-nowrap">
                          {user?.email}
                        </td>
                        <td className="px-4  border-black py-4 text-sm whitespace-nowrap">
                          <div className="flex flex-wrap gap-3 items-center gap-x-2 ">
                            {user?.permissions?.map((itm) => (
                              <p
                                key={itm.name} // Add a unique key
                                className={`px-3 py-1 bg-blue-600 text-white text-xs rounded-full`}
                              >
                                {itm?.name}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="px-4  border-black py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button
                              onClick={() => DeleteSeller(user?.email)}
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500  hover:text-red-500 focus:outline-none"
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
                              onClick={() => setModalOpen(user)}
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500  hover:text-yellow-500 focus:outline-none"
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
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

export default StafManagement;
