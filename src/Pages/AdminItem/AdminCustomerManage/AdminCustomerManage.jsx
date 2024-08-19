import { useQuery } from "@tanstack/react-query";
import { BiEdit, BiLeftArrow, BiLogIn, BiRightArrow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../Common/DeleteModal";
import { useContext } from "react";
import React, { useState } from "react";
import LoaderData from "../../../Common/LoaderData";

const AdminCustomerManage = () => {
      const { logOut, setUser, setShopInfo, setCookie } = useContext(AuthContext);
      const navigate = useNavigate();

      const { data: users = [], refetch, isLoading } = useQuery({
            queryKey: ["users"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/user");
                  const data = await res.json();
                  return data;
            },
      });

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData = users?.filter((item) => {
            const lowercaseSearchQuery = searchQuery?.toLowerCase();

            return (
                  item?.name?.toLowerCase()?.includes(lowercaseSearchQuery) ||
                  item?.userId?.toLowerCase()?.includes(lowercaseSearchQuery) ||
                  item?.email?.toLowerCase()?.includes(lowercaseSearchQuery)
            );
      });

      const [currentPage, setCurrentPage] = useState(1);

      const pageSize = 6;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(filteredData?.length / pageSize);

      const currentData = filteredData?.slice(startIndex, endIndex);

      const handleChangePage = (newPage) => {
            setCurrentPage(newPage);
      };

      const renderPageNumbers = () => {
            const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
            const endPage = Math.min(totalPages, startPage + pageSize - 1);

            return (
                  <React.Fragment>
                        {/* First Page */}
                        {startPage > 1 && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
                                          onClick={() => handleChangePage(1)}
                                    >
                                          1
                                    </button>
                              </li>
                        )}

                        {/* Current Page */}
                        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                              const pageNumber = startPage + index;
                              return (
                                    <li key={pageNumber}>
                                          <button
                                                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                                                      ? "border-blue-600 bg-blue-600 text-white"
                                                      : "border-gray-900 bg-white text-center leading-8 text-gray-900"
                                                      }`}
                                                onClick={() => handleChangePage(pageNumber)}
                                          >
                                                {pageNumber}
                                          </button>
                                    </li>
                              );
                        })}

                        {/* Last Page */}
                        {endPage < totalPages && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
                                          onClick={() => handleChangePage(totalPages)}
                                    >
                                          {totalPages}
                                    </button>
                              </li>
                        )}
                  </React.Fragment>
            );
      };

      const updateStatus = (id, status) => {
            fetch(`https://doob.dev/api/v1/admin/seller/status/${id}`, {
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

      const directLogin = async (email, userId) => {
            let password = "";
            await fetch(
                  `https://doob.dev/api/v1/admin/seller/pass/${userId}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        password = data.password;
                  });
            const data = {
                  email,
                  password,
            };
            console.log(data);

            await fetch("https://doob.dev/api/v1/auth/sign-in", {
                  method: "post",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        setUser(data.user);

                        if (data.user) {
                              if (data.user.role === "seller") {
                                    fetch(
                                          `https://doob.dev/api/v1/shop/checkshop?shopEmail=${data?.user?.shopId}`
                                    )
                                          .then((response) => response.json())
                                          .then((result) => {
                                                console.log(result, "208");
                                                if (result) {
                                                      setUser(data.user);
                                                      setShopInfo(result.information[0]);
                                                      navigate("/seller/dashboard");
                                                } else {
                                                      navigate("/shop-register");
                                                }
                                          });
                              }

                              if (data.user.role === "supperadmin") {
                                    navigate("/admin/dashboard");
                              }
                              if (data.user.role === "user") {
                                    navigate("/");
                              }
                        }
                  });
      };

      const [OpenModal, setOpenModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenModal(ticketId);
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
                  `https://doob.dev/api/v1/admin/seller/delete/${deleteId}`,
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


      console.log(currentData, '++++++++');
      return (
            <div>
                  <div className="mt-4 lg:pr-10 w-full mx-auto overflow-auto">
                        <div className="h-0 w-0">
                              {" "}
                              <DeleteModal
                                    setOpenModal={setDeletePopUp}
                                    OpenModal={deletePopUp}
                                    setIsDelete={setIsDelete}
                              />
                        </div>
                        <div className="relative w-3/5 my-6">
                              <input
                                    type="text"
                                    id="Search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search for..."
                                    className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                              />

                              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                    <button type="button" className="text-gray-600 hover:text-gray-700">
                                          <span className="sr-only">Search</span>

                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4 text-black"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                          </svg>
                                    </button>
                              </span>
                        </div>

                        <table className="table-auto w-full border border-gray-600 text-left whitespace-no-wrap">
                              <thead>
                                    <tr>
                                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                                                Seller Name
                                          </th>
                                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                Seller Email
                                          </th>
                                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                Status
                                          </th>
                                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tr ">
                                                Action
                                          </th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {
                                          isLoading ? (
                                                <tr>
                                                      <td colSpan="7" className="text-center py-8">
                                                            <LoaderData />
                                                      </td>
                                                </tr>
                                          )
                                                :
                                                (currentData.length < 0 ? currentData.map((seller, index) => (
                                                      <tr key={index + seller._id} className="">
                                                            <td className="px-4 py-3">
                                                                  <h2 className="font-medium text-gray-800  ">{seller.name}</h2>
                                                                  <p className="text-sm font-normal text-gray-600 ">
                                                                        {seller.shopName}
                                                                  </p>
                                                            </td>
                                                            <td className="px-4 py-3">{seller.email}</td>
                                                            <td className="px-4 py-3">
                                                                  {!seller.disable ? (
                                                                        <button
                                                                              onClick={() => updateStatus(seller._id, true)}
                                                                              className="inline-flex items-center justify-center py-1 px-4 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                                        >
                                                                              Disable
                                                                        </button>
                                                                  ) : (
                                                                        <button
                                                                              onClick={() => updateStatus(seller._id, false)}
                                                                              className="inline-flex items-center justify-center py-1 px-4 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                                                                        >
                                                                              Enable
                                                                        </button>
                                                                  )}{" "}
                                                            </td>
                                                            <td className="px-4  text-2xl flex gap-2 py-6 items-center text-gray-100">
                                                                  <MdDelete
                                                                        className="text-red-500 cursor-pointer"
                                                                        onClick={() => DeleteSeller(seller._id)}
                                                                  />
                                                                  <BiEdit
                                                                        className="text-yellow-500 cursor-pointer"
                                                                        onClick={() => handleViewDetails(seller?._id)}
                                                                  />
                                                                  <BiLogIn
                                                                        onClick={() => directLogin(seller.email, seller.userId)}
                                                                        className="text-green-500 cursor-pointer ml-4"
                                                                  />
                                                            </td>

                                                            {/* {OpenModal === seller._id && <div className="h-0 w-0">
                                        <EditSellerInfo OpenModal={OpenModal} refetch={refetch} setOpenModal={setOpenModal} SellerInfo={seller} />
                                    </div>} */}
                                                      </tr>
                                                ))
                                                      :
                                                      (<tr className="capitalize">
                                                            <td className="text-center" colSpan="4">
                                                                  Data not found!
                                                            </td>
                                                      </tr>)
                                                )
                                    }
                              </tbody>
                        </table>
                  </div>

                  <div className="flex justify-center mt-4">
                        <ol className="flex justify-center gap-1 text-xs font-medium">
                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                          disabled={currentPage === 1}
                                    >
                                          <span className="sr-only">Prev Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiLeftArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>

                              {renderPageNumbers()}

                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() =>
                                                handleChangePage(Math.min(totalPages, currentPage + 1))
                                          }
                                          disabled={currentPage === totalPages}
                                    >
                                          <span className="sr-only">Next Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiRightArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>
                        </ol>
                  </div>
            </div>
      );
};

export default AdminCustomerManage;
