import React, { useContext } from "react";
import { useState } from "react";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ManageDepartment from "../Department/ManageDepartment";
import AddDepartment from "../Department/AddDepartment";
import { useQuery } from "@tanstack/react-query";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import ViewTicket from "./ViewTicket";
import Swal from "sweetalert2";
import LoaderData from "../../../../Common/LoaderData";
import ModalAdminStaffAccess from "./ModalAdminStaffAccess";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import showAlert from "../../../../Common/alert";
import useAddDivToTableCells from "../../../../Common/useAddDivToTableCells";

const SupportTicketManagement = () => {
      const [ModalOpen, setModalOpen] = useState(false);
      const [ManageDepartments, setManageDepartments] = useState(false);
      const { user } = useContext(AuthContext);
      const maxLength = 30;
      function truncateSubject(subject) {
            return subject?.length > maxLength
                  ? subject?.substring(0, maxLength) + " [marge]"
                  : subject;
      }
      const [OpenSupport, setOpenSupport] = useState(false);

      const formatDateTime = (date) => {
            return new Date(date).toLocaleString("en-US", {
                  // weekday: 'short',
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
            });
      };

      // console.log(user);

      let query = "";

      if (user?.role === "admin" || user?.role === "supperadmin") {
            query = "?";
      } else {
            query = `?email=${user?.email}`;
      }

      // console.log(query);
      const {
            data: tickets = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["supportTicketRequest"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/supportTicketRequest${query}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const [currentPage, setCurrentPage] = useState(1);
      const [OpenModal, setOpenModal] = useState(false);

      // Your filtering logic
      const filteredData = tickets?.filter(
            (item) =>
                  item?._id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                  item?.time?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                  item?.subject?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                  item?.userInfo?.email
                        ?.toLowerCase()
                        .includes(searchQuery?.toLowerCase()) ||
                  item?.userInfo?.name
                        ?.toLowerCase()
                        .includes(searchQuery?.toLowerCase()) ||
                  String(`#${item.ticketId}`)
                        ?.toLowerCase()
                        .includes(String(`${searchQuery}`)?.toLowerCase())
      );

      const pageSize = 10;
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
                                          className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900`}
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
                                                      : "border-gray-100 bg-white text-center leading-8 text-gray-900"
                                                      }`}
                                                onClick={() => handleChangePage(pageNumber)}
                                          >
                                                {pageNumber}
                                          </button>
                                    </li>
                              );
                        })}

                        {endPage < totalPages && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900`}
                                          onClick={() => handleChangePage(totalPages)}
                                    >
                                          {totalPages}
                                    </button>
                              </li>
                        )}
                  </React.Fragment>
            );
      };

      const [viewTicket, setViewTicket] = useState(false);

      const handleViewDetails = (ticketId) => {
            setViewTicket(ticketId);
      };

      const noStatusTickets = tickets?.filter((ticket) => !ticket?.status);
      const noStatusLength = noStatusTickets?.length;

      const openTicket = tickets?.filter((ticket) => ticket?.status === "Open");
      const openLength = openTicket?.length;

      const closedTicket = tickets?.filter((ticket) => ticket?.status === "Closed");
      const closedLength = closedTicket.length;
      useAddDivToTableCells()
      return (
            <div className=" w-full h-full p-2">
                  <div>
                        <section className="my-2  text-gray-100">
                              <div className="container grid grid-cols-2 gap-2 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                                    <div className="  p-4 space-x-1 rounded-lg md:space-x-6 bg-white">
                                          
                                          <div className="text-center text-center  flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{openLength}</p>
                                                <p className="capitalize">Open Ticket</p>
                                          </div>
                                    </div>
                                    <div className="  p-4 space-x-1 rounded-lg md:space-x-6 bg-white">
                                           
                                          <div className="text-center  flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{noStatusLength}</p>
                                                <p className="capitalize">New Ticket</p>
                                          </div>
                                    </div>
                                    <div className="  p-4 space-x-4 rounded-lg md:space-x-6 bg-white">
                                           
                                          <div className="text-center  flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{closedLength}</p>
                                                <p className="capitalize">Closed Ticket</p>
                                          </div>
                                    </div>
                                    <div className="  p-4 space-x-4 rounded-lg md:space-x-6 bg-white">
                                          
                                          <div className="text-center  flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{tickets.length}</p>
                                                <p className="capitalize">All Tickets</p>
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </div>

                  <div className="md:flex  items-center justify-between">
                       
                        <div className="flex gap-2 pl-1">
                              <div>
                                    <button
                                          onClick={() => {
                                                setModalOpen(true);
                                                setManageDepartments(false); // Assuming you want to close the Manage Department if it's open
                                          }}
                                          className="group relative inline-flex   items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                          to="/admin/services/add-service"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <BsArrowRight className="h-5 w-5 rtl:rotate-180" />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                Add Department
                                          </span>
                                    </button>
                                    {ModalOpen && (
                                          <div className="h-0 w-0">
                                                <AddDepartment
                                                      ModalOpen={ModalOpen}
                                                      setModalOpen={setModalOpen}
                                                />
                                          </div>
                                    )}
                              </div>

                              <div>
                                    <button
                                          onClick={() => {
                                                setManageDepartments(true);
                                                setModalOpen(false);
                                          }}
                                          className="group relative inline-flex   items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                          to="/admin/services/add-service"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <BsArrowRight className="h-5 w-5 rtl:rotate-180" />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                Manage Department
                                          </span>
                                    </button>
                                    {ManageDepartments && (
                                          <div className="h-0 w-0">
                                                <ManageDepartment
                                                      ManageDepartment={ManageDepartments}
                                                      setManageDepartment={setManageDepartments}
                                                />
                                          </div>
                                    )}
                              </div>
                        </div>
                        
                              <input
                                    onChange={handleSearch}
                                    type="text"
                                    className="md:w-[200px] w-[100%] md:mt-0 mt-3 rounded rounded-lg p-2 border "
                                    placeholder="Search"
                              />
                    
                                                      
                                                     
                  </div>

                  <>
                        <div className=" py-2 bar overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                            
                              {
                                    <div className="align-middle inline-block min-w-full shadow bar overflow-hidden bg-white shadow-dashboard px-2 pt-3 rounded-bl-lg rounded-br-lg">
                                          <table className="min-w-full">
                                                <thead>
                                                      <tr>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                                  ID
                                                            </th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                                                  Fullname
                                                            </th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                                                  Subject
                                                            </th>

                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                                                  Status
                                                            </th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                                                  Created At
                                                            </th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300" />
                                                            <th className="px-6 py-3 border-b-2 border-gray-300" />
                                                      </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                      {isLoading ? (
                                                            <tr>
                                                                  <td colSpan="6" className="text-center py-8">
                                                                        <LoaderData />
                                                                  </td>
                                                            </tr>
                                                      ) : currentData.length > 0 ? (
                                                            currentData.map((ticket) => (
                                                                  <tr key={ticket?._id} className="border-b">
                                                                        <td className="px-2 py-2 whitespace-no-wrap ">
                                                                              <div className="flex items-center">
                                                                                    <div>
                                                                                          <div className="text-sm leading-5 text-gray-800">
                                                                                                #{ticket?.ticketId}
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-2 py-2 whitespace-no-wrap ">
                                                                              <div className="text-sm leading-5 ">
                                                                                    {ticket?.userInfo?.name}
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-2 py-2 whitespace-no-wrap      text-sm leading-5">
                                                                              {truncateSubject(ticket?.subject)}
                                                                        </td>

                                                                        <td className="px-2 py-2 whitespace-no-wrap    text-sm leading-5">
                                                                              {(!ticket?.status && (
                                                                                    <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                                                                          <span
                                                                                                aria-hidden=""
                                                                                                className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                                                                          />
                                                                                          <span className="relative text-xs">
                                                                                                New Ticket
                                                                                          </span>
                                                                                    </span>
                                                                              )) ||
                                                                                    (ticket?.status === "Open" && (
                                                                                          <button
                                                                                                onClick={() =>
                                                                                                      fetch(
                                                                                                            `https://doob.dev/api/v1/support/support-ticket/status/${ticket.ticketId}`,
                                                                                                            {
                                                                                                                  method: "PUT",
                                                                                                                  headers: {
                                                                                                                        "Content-Type": "application/json",
                                                                                                                  },
                                                                                                                  body: JSON.stringify({
                                                                                                                        status: "Closed",
                                                                                                                  }),
                                                                                                            }
                                                                                                      )
                                                                                                            .then((res) => res.json())
                                                                                                            .then((data) => {
                                                                                                                  showAlert("Status Closed", "", "success");
                                                                                                                  refetch();
                                                                                                            })
                                                                                                }
                                                                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                                                          >
                                                                                                <span
                                                                                                      aria-hidden=""
                                                                                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                                                                />
                                                                                                <span className="relative text-xs">Open</span>
                                                                                          </button>
                                                                                    )) ||
                                                                                    (ticket?.status === "Closed" && (
                                                                                          <button
                                                                                                onClick={() =>
                                                                                                      fetch(
                                                                                                            `https://doob.dev/api/v1/support/support-ticket/status/${ticket.ticketId}`,
                                                                                                            {
                                                                                                                  method: "PUT",
                                                                                                                  headers: {
                                                                                                                        "Content-Type": "application/json",
                                                                                                                  },
                                                                                                                  body: JSON.stringify({ status: "Open" }),
                                                                                                            }
                                                                                                      )
                                                                                                            .then((res) => res.json())
                                                                                                            .then((data) => {
                                                                                                                  showAlert("Status Open", "", "success");
                                                                                                                  refetch();
                                                                                                            })
                                                                                                }
                                                                                                className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                                                                          >
                                                                                                <span
                                                                                                      aria-hidden=""
                                                                                                      className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                                                                                />
                                                                                                <span className="relative text-xs">Closed</span>
                                                                                          </button>
                                                                                    ))}
                                                                              {/* {ticket?.comments[ticket?.comments?.length - 1]?.user} */}
                                                                        

                                                                              {
                                                                                    // department?.comments[department?.comments?.length - 1]
                                                                                    ticket?.comments[ticket?.comments?.length - 1]
                                                                                          ?.user === ticket?.userInfo?.name && (
                                                                                          <span className="font-semibold text-yellow-900 leading-tight">
                                                                                                Waiting for Response
                                                                                          </span>
                                                                                    )
                                                                              }
                                                                        </td>
                                                                        <td className="px-2 py-2 whitespace-no-wrap   text-sm leading-5">
                                                                              {formatDateTime(ticket.time)}
                                                                        </td>
                                                                        <td className="px-2 py-2 whitespace-no-wrap text-right gap-2 flex text-sm leading-5">
                                                                              <button
                                                                                    onClick={() => handleViewDetails(ticket._id)}
                                                                                    className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                                                              >
                                                                                      Details
                                                                              </button>
                                                                        
                                                                              <button
                                                                                    onClick={() => setOpenModal(ticket)}
                                                                                    className="px-2 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none"
                                                                              >
                                                                                    Permission  
                                                                              </button>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          fetch(
                                                                                                `https://doob.dev/api/v1/admin/support-ticket/${ticket._id}`,
                                                                                                {
                                                                                                      method: "delete",
                                                                                                      headers: {
                                                                                                            "Content-Type": "application/json",
                                                                                                      },
                                                                                                      body: JSON.stringify({ status: "Open" }),
                                                                                                }
                                                                                          )
                                                                                                .then((res) => res.json())
                                                                                                .then((data) => {
                                                                                                      showAlert("Delete Successful", "", "success");
                                                                                                      refetch();
                                                                                                })
                                                                                    }
                                                                                    className="px-2 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none"
                                                                              >
                                                                                   
                                                                                    <span className="relative text-xs">Delete</span>
                                                                              </button>
                                                                        </td>

                                                                        {viewTicket === ticket._id && (
                                                                              <td colSpan="6">
                                                                                    <div>
                                                                                          <ViewTicket
                                                                                                refetch={refetch}
                                                                                                viewTicket={true} // You might want to adjust this condition based on your requirements
                                                                                                setViewTicket={setViewTicket}
                                                                                                ticketDetails={ticket}
                                                                                          />
                                                                                    </div>
                                                                              </td>
                                                                        )}

                                                                        {OpenModal?._id === ticket._id && (
                                                                              <div>
                                                                                    <ModalAdminStaffAccess
                                                                                          refetch={refetch}
                                                                                          setOpenModal={setOpenModal}
                                                                                          OpenModal={OpenModal}
                                                                                    // ticketInfo={ticket}
                                                                                    />
                                                                              </div>
                                                                        )}
                                                                       
                                                                  </tr>
                                                            ))
                                                      ) : (
                                                            <tr>
                                                                  <td
                                                                        colSpan="6"
                                                                        className="text-center text-gray-400 py-2"
                                                                  >
                                                                        Data Not Found
                                                                  </td>
                                                            </tr>
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              }
                        </div>
                        <div className="flex justify-center mt-4">
                              <ol className="flex justify-center gap-1 text-xs font-medium">
                                    <li>
                                          <button
                                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
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
                                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
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
                  </>
            </div>
      );
};

export default SupportTicketManagement;
