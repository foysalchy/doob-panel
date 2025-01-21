import React, { useContext } from "react";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Swal from "sweetalert2";
import UserTicketView from "./UserTicketView";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import LoaderData from "../../../Common/LoaderData";
import ModalStaffPermisson from "./ModalStaffPermisson";
import showAlert from "../../../Common/alert";
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";
const UserSupportTicketForShop = () => {
      useAddDivToTableCells();
      const [ModalOpen, setModalOpen] = useState(false);
      const [ManageDepartments, setManageDepartments] = useState(false);
      const { shopInfo, user } = useContext(AuthContext);
      // const { user } = useContext(AuthContext);
      console.log(user);
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

      console.log(
            `https://doob.dev/api/v1/seller/user-support?shopId=${shopInfo._id}&staffId=${user._id}`
      );
      const {
            data: tickets = [],
            refetch,
            isLoading: loadingData,
      } = useQuery({
            queryKey: ["userSuport"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/user-support?shopId=${shopInfo._id}&staffId=${user._id}`
                  );
                  const data = await res.json();
                  console.log("🚀 ~ file", data);
                  // if (!data?.status) {
                  //   return [];
                  // } else {
                  //   return data;
                  // }
                  if (data?.status === false) {
                        return [];
                  }
                  return data;
            },
      });
      // console.log(tickets);

      const [searchQuery, setSearchQuery] = useState("");

      const [OpenModal, setOpenModal] = useState(false);

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const [currentPage, setCurrentPage] = useState(1);
      // check isArray

      console.log(Array.isArray(tickets));
      // Your filtering logic
      const filteredData =
            (Array.isArray(tickets) &&
                  tickets.length > 0 &&
                  tickets?.filter(
                        (item) =>
                              item?._id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                              item?.subject?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                              item?.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                              item?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                              String(`#${item.ticketId}`)
                                    ?.toLowerCase()
                                    .includes(String(`${searchQuery}`)?.toLowerCase())
                  )) ||
            [];

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

      const statusUpdate = ({ id, status }) => {
            fetch(`https://doob.dev/api/v1/seller/user-support/${id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: status }),
            })
                  .then((res) => {
                        if (!res.ok) {
                              throw new Error(`HTTP error! Status: ${res?.status}`);
                        }
                        return res.json();
                  })
                  .then((data) => {
                        console.log(data);
                        showAlert(`Status ${status}`, "", "success");
                        refetch();
                  })
                  .catch((error) => {
                        console.error("Error:", error);
                  });
      };

      return (
            <div className="">
                 <div className="flex justify-between items-center gap-2">
                        <p><b>User Ticket</b></p>
                        <div className="relative    my-3">
                                          <input
                                                type="text"
                                                id="Search"
                                                value={searchQuery}
                                                onChange={handleSearch}
                                                placeholder="Search for..."
                                                className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                                          />

                                          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                                <button
                                                      type="button"
                                                      className="text-gray-600 hover:text-gray-700"
                                                >
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
                  </div>
                  <div>
                        <section className="my-3  text-gray-100">
                              <div className="  grid grid-cols-2 gap-2  sm:grid-cols-2 xl:grid-cols-4">
                                    <div className="text-center   bg-white p-4   rounded-lg  bg-gray-100 text-gray-100">
                                          
                                          <div className="flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{openLength}</p>
                                                <p className="capitalize">Open Ticket</p>
                                          </div>
                                    </div>
                                    <div className="text-center   bg-white p-4   rounded-lg  bg-gray-100 text-gray-100">
                                          <div className="flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{noStatusLength}</p>
                                                <p className="capitalize">New Ticket</p>
                                          </div>
                                    </div>
                                    <div className="text-center   bg-white p-4   rounded-lg  bg-gray-100 text-gray-100">
                                          <div className="flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{closedLength}</p>
                                                <p className="capitalize">Closed Ticket</p>
                                          </div>
                                    </div>
                                    <div className="text-center   bg-white p-4   rounded-lg  bg-gray-100 text-gray-100">
                                          <div className="flex flex-col justify-center align-middle text-black">
                                                <p className="text-3xl font-semibold leadi">{tickets.length}</p>
                                                <p className="capitalize">All Tickets</p>
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </div>

                  <>
                        <div className=" py-2 bar overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                               
                              {!loadingData && (
                                    <div className="align-middle inline-block min-w-full shadow bar overflow-x-auto  bar overflow-y-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                                          <table className="min-w-full">
                                                <thead>
                                                      <tr>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                                  ID
                                                            </th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                                                  User Name
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
                                                          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                                            Action
                                                          </th>
                                                      </tr>
                                                </thead>

                                                <tbody className="bg-white">
                                                      {currentData.map((ticket) => (
                                                            <tr key={ticket?._id} className=" border-b ">
                                                                  <td className="px-6 py-4 whitespace-no-wrap ">
                                                                        <div className="flex items-center">
                                                                              <div>
                                                                                    <div className="text-sm leading-5 text-gray-800">
                                                                                          #{ticket?.ticketId}
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-no-wrap text-blue-900  text-sm leading-5">
                                                                        
                                                                              {ticket?.name}
                                                                       
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-no-wrap text-blue-900  text-sm leading-5">
                                                                        {truncateSubject(ticket?.subject)}
                                                                  </td>

                                                                  <td className="px-6 py-4 whitespace-no-wrap text-blue-900  text-sm leading-5">
                                                                        {(!ticket?.status && (
                                                                              <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                                                                    <span
                                                                                          aria-hidden=""
                                                                                          className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                                                                    />
                                                                                    <span className="relative text-xs">New Ticket</span>
                                                                              </span>
                                                                        )) ||
                                                                              (ticket?.status === "Open" && (
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                statusUpdate({
                                                                                                      id: ticket._id,
                                                                                                      status: "Closed",
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
                                                                                                statusUpdate({ id: ticket._id, status: "Open" })
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
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-no-wrap  text-blue-900 text-sm leading-5">
                                                                        {formatDateTime(ticket.time)}
                                                                  </td>
                                                                  <td className="px-6  text-blue-900  gap-2 flex py-4 whitespace-no-wrap text-right  text-sm leading-5">
                                                                        <button
                                                                              onClick={() => handleViewDetails(ticket._id)}
                                                                              className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                                                        >
                                                                              View 
                                                                        </button>
                                                                        <button
                                                                              onClick={() => setOpenModal(ticket)}
                                                                              className="px-2 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none"
                                                                        >
                                                                              Assaign
                                                                        </button>
                                                               

                                                                  {viewTicket === ticket._id && (
                                                                       
                                                                              <div>
                                                                                    <UserTicketView
                                                                                          refetch={refetch}
                                                                                          viewTicket={true} // You might want to adjust this condition based on your requirements
                                                                                          setViewTicket={setViewTicket}
                                                                                          ticketDetails={ticket}
                                                                                    />
                                                                              </div>
                                                                       
                                                                  )}

                                                                  {OpenModal?._id === ticket._id && (
                                                                        <div>
                                                                              <ModalStaffPermisson
                                                                                    refetch={refetch}
                                                                                    setOpenModal={setOpenModal}
                                                                                    OpenModal={OpenModal}
                                                                              // ticketInfo={ticket}
                                                                              />
                                                                        </div>
                                                                  )}

                                                                   <button
                                                                              onClick={() =>
                                                                                    fetch(
                                                                                          `https://doob.dev/api/v1/seller/user-support/${ticket._id}`,
                                                                                          {
                                                                                                method: "delete",
                                                                                                headers: { "Content-Type": "application/json" },
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
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              )}

                              {loadingData && <LoaderData />}
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

export default UserSupportTicketForShop;
