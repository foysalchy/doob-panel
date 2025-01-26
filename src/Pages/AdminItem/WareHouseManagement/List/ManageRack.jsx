import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { BiEdit, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import ModalForWarehouse from "../Modal/ModalForWarehouse";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert";
import { Link } from "react-router-dom";
 
const ManageRack = () => {
      const { data: racks = [], refetch, isLoading } = useQuery({
            queryKey: ["racks"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/warehouse/rack"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData = racks?.filter((item) => {
            const lowercaseSearchQuery = searchQuery?.toLowerCase();

            return (
                  item.warehouse?.toLowerCase().includes(lowercaseSearchQuery) ||
                  item.area?.toLowerCase().includes(lowercaseSearchQuery) ||
                  item.rack?.toLowerCase().includes(lowercaseSearchQuery)
            );
      });


      const [itemsPerPage, setItemsPerPage] = useState(parseInt(15));

      const [currentPage, setCurrentPage] = useState(1);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = filteredData?.length && filteredData?.slice(startIndex, endIndex);

      console.log('rck', currentItems);

      const updateStatus = (id, status) => {
            fetch(
                  `https://doob.dev/api/v1/admin/warehouse/rack/status/${id}`,
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
                        showAlert(`Seller disable ${status} `, "", "success");
                        refetch();
                  });
      };

      const DeleteWarehouse = (id) => {
            let timerInterval;

            Swal.fire({
                  title: "Deleting Seller",
                  html: "Please wait... <br> <b></b> milliseconds remaining.",
                  timer: 500,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {
                              b.textContent = Swal.getTimerLeft();
                        }, 100);
                  },
                  willClose: () => {
                        clearInterval(timerInterval);
                  },
            }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                        // Timer completed, initiate the fetch for deletion
                        fetch(
                              `https://doob.dev/api/v1/admin/warehouse/rack/delete/${id}`,
                              {
                                    method: "DELETE",
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                              }
                        )
                              .then((res) => res.json())
                              .then((data) => {
                                    showAlert("Seller Deleted", "", "success");
                                    refetch();
                              })
                              .catch((error) => {
                                    console.error("Error deleting seller:", error);
                                    showAlert("Error Deleting Seller", "An error occurred", "error");
                              });
                  }
            });
      };

      const [OpenModal, setOpenModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenModal(ticketId);
      };

      return (
            <div>
                    <div className="mt-4 lg:pr-10 w-full mx-auto bar overflow-auto">
                   <div className="md:flex flex-row-reverse mb-3 items-center gap-1 justify-between">
                                                <div className="flex items-center gap-2">
                                                      <div className="relative">
                                                            <input
                                                                  type="text"
                                                                  id="Search"
                                                                  value={searchQuery}
                                                                  onChange={handleSearch}
                                                                  placeholder="Search for..."
                                                                  className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                                                            />
                  
                                                            
                                                      </div>
                  
                                                      <div className="flex items-center gap-2">
                                                            <select
                                                                  className="border w-[50px] px-1 py-2 text-sm rounded"
                                                                  onChange={(e) => setItemsPerPage(e.target.value)}
                                                            >
                                                                  <option value={15}>15</option>
                                                                  <option value={30}>30</option>
                                                                  <option value={70}>70</option>
                                                                  <option value={100}>100</option>
                                                            </select>{" "}
                                                      </div>
                                                </div>
                                                <div className="flex mt-3 md:mt-0 overflow-auto items-center gap-1">
                                                     
                                                      <button
                                                            className="min-w-[130px] group relative inline-flex items-center bar rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                                            onClick={() => handleViewDetails("Add Area")}
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
                                                                  Add Rack
                                                            </span>
                                                      </button>
                                                      <li  >
                                                            <Link
                                                            className="w-[130px] group relative inline-flex items-center bar rounded bg-gray-900 px-7 py-2.5 text-white focus:outline-none focus:ring active:bg-gray-500"
                                                           
                                                                  to={
                                                                        "/admin/warehouse/warehouse-management"
                                                                  }
                                                                 
                                                            >
                                                                  {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                                  Warehouse
                                                            </Link>
                                                      </li>
                                                      <li  >
                                                            <Link
                                                             className="w-[100px] group relative inline-flex items-center bar rounded bg-gray-900 px-7 py-2.5 text-white focus:outline-none focus:ring active:bg-gray-500"
                                                          
                                                                  to={
                                                                        "/admin/warehouse/area-management"
                                                                  }
                                                                 
                                                            >
                                                                  {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                                  Area
                                                            </Link>
                                                      </li>
                                                      <li  >
                                                            <Link
                                                            className="w-[100px] group relative inline-flex items-center bar rounded bg-gray-900 px-7 py-2.5 text-white focus:outline-none focus:ring active:bg-gray-500"
                                                           
                                                                  to={
                                                                        "/admin/warehouse/self-management"
                                                                  }
                                                                 
                                                            >
                                                                  {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                                  Shelf  
                                                            </Link>
                                                      </li>
                                                      <li  >
                                                            <Link
                                                            className="w-[100px] group relative inline-flex items-center bar rounded bg-gray-900 px-7 py-2.5 text-white focus:outline-none focus:ring active:bg-gray-500"
                                                           
                                                                  to={
                                                                        "/admin/warehouse/cell-management"
                                                                  }
                                                                 
                                                            >
                                                                  {/* <BiArea className="w-5 h-5 fill-current text-gray-400 " />{" "} */}
                                                                  Cell  
                                                            </Link>
                                                      </li>
                                                </div>
                                        
                  
                                               
                                          </div>

                        {OpenModal === "Add Rack" && (
                              <ModalForWarehouse
                                    OpenModal={OpenModal}
                                    setOpenModal={setOpenModal}
                                    data={"Add Rack"}
                                    refetch={refetch}
                              />
                        )}

                       
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                              <thead>
                                    <tr>
                                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                                                Rack Name
                                          </th>
                                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                Warehouse
                                          </th>
                                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                Area
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
                                                      <td colSpan="8" className="text-center py-8">
                                                            <LoaderData />
                                                      </td>
                                                </tr>
                                          )
                                                :
                                                currentItems.length > 0 ?
                                                      (currentItems.map((warehouse, index) => (
                                                            <tr key={index + warehouse._id} className="">
                                                                  <td className="px-4 py-3">
                                                                        <div className="flex gap-2 items-center">
                                                                              <div>
                                                                                    <h2 className="font-medium text-gray-800  ">
                                                                                          {warehouse?.rack}
                                                                                    </h2>
                                                                              </div>
                                                                        </div>
                                                                  </td>
                                                                  <td className="px-4 py-3">{warehouse?.warehouse}</td>
                                                                  <td className="px-4 py-3">{warehouse?.area}</td>
                                                                  <td className="px-4 py-3">
                                                                        {!warehouse?.status ? (
                                                                              <button
                                                                                    onClick={() => updateStatus(warehouse._id, true)}
                                                                                    className="inline-flex items-center justify-center py-1 px-4 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                                                                              >
                                                                                    Disable
                                                                              </button>
                                                                        ) : (
                                                                              <button
                                                                                    onClick={() => updateStatus(warehouse._id, false)}
                                                                                    className="inline-flex items-center justify-center py-1 px-4 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                                              >
                                                                                    Enable
                                                                              </button>
                                                                        )}{" "}
                                                                  </td>
                                                                  <td className="px-4  text-2xl flex gap-2 py-6 items-center text-gray-100">
                                                                        <MdDelete
                                                                              className="text-red-500 cursor-pointer"
                                                                              onClick={() => DeleteWarehouse(warehouse._id)}
                                                                        />
                                                                        <BiEdit
                                                                              className="text-yellow-500 cursor-pointer"
                                                                              onClick={() => handleViewDetails(warehouse?._id)}
                                                                        />
                                                                  </td>
                                                            </tr>
                                                      )))
                                                      : (
                                                            <tr>
                                                                  <td colSpan="4" className="text-center py-4">
                                                                        No areas found.
                                                                  </td>
                                                            </tr>
                                                      )
                                    }
                              </tbody>
                        </table>
                  </div>

                  <div className="mx-auto flex justify-center">
                        <nav aria-label="Page navigation example">
                              <ul className="inline-flex -space-x-px">
                                    <li>
                                          <button
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-l-lg"
                                          >
                                                Prev
                                          </button>
                                    </li>
                                    {Array.from(
                                          { length: Math.ceil(filteredData?.length / itemsPerPage) },
                                          (_, i) => (
                                                <li key={i}>
                                                      <button
                                                            onClick={() => setCurrentPage(i + 1)}
                                                            className={`bg-white border ${currentPage === i + 1
                                                                  ? "text-blue-600"
                                                                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                  } border-gray-300 leading-tight py-2 px-3 rounded`}
                                                      >
                                                            {i + 1}
                                                      </button>
                                                </li>
                                          )
                                    )}
                                    <li>
                                          <button
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={
                                                      currentPage ===
                                                      Math.ceil(
                                                            filteredData?.length &&
                                                            filteredData?.length / itemsPerPage
                                                      )
                                                }
                                                className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-r-lg"
                                          >
                                                Next
                                          </button>
                                    </li>
                              </ul>
                        </nav>
                  </div>

            </div>
      );
};

export default ManageRack;
