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
const UserSupportTicketForShop = () => {
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
      <div>
        <section className="my-6  text-gray-100">
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-100 text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 text-gray-800"
                >
                  <polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
                  <path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
                  <path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle text-black">
                <p className="text-3xl font-semibold leadi">{openLength}</p>
                <p className="capitalize">Open Ticket</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-100 text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 text-gray-800"
                >
                  <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                  <path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
                  <polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
                  <polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle text-black">
                <p className="text-3xl font-semibold leadi">{noStatusLength}</p>
                <p className="capitalize">New Ticket</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-100 text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 text-gray-800"
                >
                  <path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
                  <rect width="32" height="32" x="80" y="264"></rect>
                  <rect width="32" height="32" x="240" y="128"></rect>
                  <rect width="32" height="32" x="136" y="168"></rect>
                  <rect width="32" height="32" x="400" y="264"></rect>
                  <path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle text-black">
                <p className="text-3xl font-semibold leadi">{closedLength}</p>
                <p className="capitalize">Closed Ticket</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-100 text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 text-gray-800"
                >
                  <path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle text-black">
                <p className="text-3xl font-semibold leadi">{tickets.length}</p>
                <p className="capitalize">All Tickets</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <>
        <div className=" py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
            <div className="flex justify-between">
              <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                  <div className="flex">
                    <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                      <svg
                        width={18}
                        height={18}
                        className="w-4 lg:w-auto"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                          stroke="#455A64"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.9993 16.9993L13.1328 13.1328"
                          stroke="#455A64"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  {!loadingData && (
                    <input
                      onChange={handleSearch}
                      type="text"
                      className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                      placeholder="Search"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {!loadingData && (
            <div className="align-middle inline-block min-w-full shadow overflow-x-auto  overflow-y-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
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
                    <th className="px-6 py-3 border-b-2 border-gray-300" />
                    <th className="px-6 py-3 border-b-2 border-gray-300" />
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {currentData.map((ticket) => (
                    <tr key={ticket?._id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 text-gray-800">
                              #{ticket?.ticketId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        <div className="text-sm leading-5 text-blue-900">
                          {ticket?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        {truncateSubject(ticket?.subject)}
                      </td>

                      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
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
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                        {formatDateTime(ticket.time)}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <button
                          onClick={() => handleViewDetails(ticket._id)}
                          className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <button
                          onClick={() => setOpenModal(ticket)}
                          className="px-2 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none"
                        >
                          Permission Staff
                        </button>
                      </td>

                      {viewTicket === ticket._id && (
                        <td colSpan="6">
                          <div>
                            <UserTicketView
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
                          <ModalStaffPermisson
                            refetch={refetch}
                            setOpenModal={setOpenModal}
                            OpenModal={OpenModal}
                          // ticketInfo={ticket}
                          />
                        </div>
                      )}

                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
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
                          className="relative inline-block ml-4 px-3 py-1 font-semibold text-red-900 leading-tight"
                        >
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          />
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
