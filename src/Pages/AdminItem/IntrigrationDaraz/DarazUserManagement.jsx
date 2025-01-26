import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
// import DeleteModal from "../../../../Common/DeleteModal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { MdPadding } from "react-icons/md";
import Swal from "sweetalert2";
import DeleteModal from "../../../Common/DeleteModal";
import { DataLoader } from "../../../Common/DataLoader";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
import Pagination from "../../../Common/Pagination";
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";

const DarazUserManagement = () => {
      const [loading, setLoading] = useState(false);

      const {
            data: darazUserData = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["darazUsersData"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/old-all-daraz`);
                  const data = await res.json();
                  return data?.data;
            },
      });
      console.log(darazUserData);
      // console.count(darazUserData);

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
                        showAlert("Ads is Deleted", "", "success");
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
                        showAlert(`Seller disable ${status} `, "", "success");
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
                        showAlert(`Deleted Suucessfully`, "", "success");
                        refetch();
                  });
      };
      const blockHandler = (id, status) => {
            setLoading(true);
            fetch(`https://doob.dev/api/v1/admin/update-daraz-account/${id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log("🚀 ~ file: ", data);
                        if (data.success) {
                              showAlert(`${status} Successfully`, "", "success");
                        } else {
                              showAlert(`${status} Failed`, "", "error");
                        }
                        setLoading(false);

                        refetch();
                  });
      };



      const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
      };

      const [search, setSearch] = useState("");
      const [searchData, setSearchData] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(15);

      const handleSearch = (e) => {
            setSearch(e.target.value);
      };

      useEffect(() => {
            if (!darazUserData) return; // Early exit if darazUserData is undefined or null

            const filteredData = darazUserData
                  ?.filter((item) => {
                        // Combine the top-level object values and nested `shop2.data` values into one array
                        const combinedValues = [
                              ...Object.values(item),
                              ...(item.shop2?.data ? Object.values(item.shop2.data) : [])
                        ];

                        // Check if any value matches the search term
                        return combinedValues.some(
                              (value) =>
                                    typeof value === "string" &&
                                    value.toLowerCase().includes(search.toLowerCase())
                        );
                  })
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            setSearchData(filteredData);
      }, [search, darazUserData, currentPage, itemsPerPage, isLoading]);



      const totalItems = searchData?.length;

      console.log(searchData[0]);
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

                  <section className=" mt-0 mx-auto">


                        <div className="md:flex items-center justify-between gap-2">
                              <b>Accounts</b>
                        <form

                              className="max-w-md my-2">
                              <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                          onChange={handleSearch}
                                          type="text"
                                          placeholder="Search"
                                          className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                                    />
                              </div>
                        </form>
                        </div>


                        <table className="min-w-full bg-white ">
                              <thead className=" ">
                                    <tr className="border-b">
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5  text-sm font-normal text-left rtl:text-right "
                                          >
                                                Shop Name
                                          </th>
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                          >
                                                Daraz Shop Name
                                          </th>
                                         
                                          <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                          >
                                                Account Email
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
                              {isLoading && <LoaderData />}
                              <tbody className="bg-white ">

                                    {!isLoading &&
                                          searchData?.map((itm) => (
                                                <tr key={itm?._id} className="border-b">
                                                      <td className="px-2 py-2 text-sm font-medium ">
                                                            {/* <h2>{itm?.shopInfo ? itm.shopInfo?.name : "Empty"}</h2> */}
                                                            <h2>{itm?.shopData?.shopName}</h2>
                                                      </td>
                                                      <td className="px-2 py-2 text-sm font-medium ">
                                                            <h2>{itm?.shop2?.data?.name}</h2>
                                                      </td>
           
                                                      <td className="px-4 py-4 text-sm">
                                                            {itm?.result?.account}
                                                      </td>
                                                      
                                                      <td className="px-4 py-4 text-sm">
                                                            {new Date(itm?.data?.timestamp).toLocaleString("en-US", {
                                                                  year: "numeric",
                                                                  month: "long",
                                                                  day: "numeric",
                                                                  hour: "numeric",
                                                                  minute: "numeric",
                                                                  second: "numeric",
                                                            })}
                                                      </td>
                                                      <td className="px-4 py-4 text-sm">
                                                            <div className="flex items-center justify-around gap-3">
                                                                  {itm?.isAdmin === "block" ? (
                                                                        <button
                                                                              onClick={() => blockHandler(itm?._id, "unblock")}
                                                                              className={` bg-green-500 p-2  text-black font-bold rounded`}
                                                                        >
                                                                              UnBlock
                                                                        </button>
                                                                  ) : (
                                                                        <button
                                                                              onClick={() => blockHandler(itm?._id, "block")}
                                                                              className={` bg-yellow-500 p-2  text-black font-bold rounded`}
                                                                        >
                                                                              Block
                                                                        </button>
                                                                  )}
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
                        <Pagination
                              totalItems={totalItems}
                              itemsPerPage={itemsPerPage}
                              currentPage={currentPage}
                              onPageChange={handlePageChange}
                              setItemsPerPage={setItemsPerPage}
                        />
                  </section>
            </div>
      );
};

export default DarazUserManagement;
