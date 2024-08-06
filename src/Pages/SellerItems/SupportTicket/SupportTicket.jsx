import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddSupportTicket from "./AddSupportTicket";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { BiLeftArrow, BiRightArrow, BiSupport } from "react-icons/bi";
import ViewSupportTicket from "./ViewSupportTicket";
import { MdEmail } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import { AiOutlineWhatsApp } from "react-icons/ai";
import LoaderData from "../../../Common/LoaderData";

const SellerSupportTicket = () => {
  const date = new Date();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const maxLength = 30;
  const pageSize = 10;

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

  const { user } = useContext(AuthContext);

  const {
    data: contact = [],
    refetch,
    isLoading: loadingData,
  } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/support/supportTicketRequest/${user._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = contact.filter(
    (item) =>
      item?._id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item?.subject?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item?.time?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      String(`#${item.ticketId}`)
        ?.toLowerCase()
        .includes(String(`${searchQuery}`)?.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the current page data
  const currentData = filteredData?.slice(startIndex, endIndex);
  // console.log("🚀 :", currentData)

  const [viewComment, setViewComment] = useState(false);

  const handleViewDetails = (ticketId) => {
    setViewComment(ticketId);
  };

  const [modal, setModal] = useState(false);
  const modalToggol = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button
        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        onClick={() => setOpenSupport(true)}
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
        </span>

        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Request New Support
        </span>
      </button>

      {contact.length ? (
        <div>
          <div className="relative md:w-3/5  my-6">
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

          <div className="overflow-x-auto overflow-h-hidden">
            <table className=" table-fixed  md:my-10 ">
              <thead className="text-center  ">
                <tr className="overflow-x-auto overflow-y-hidden  border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark whitespace-nowrap ">
                  <th className="w-1/6 bg-gray-900 border-l rounded-tl-md border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4">
                    {" "}
                    Department{" "}
                  </th>
                  <th className="w-1/6 bg-gray-900 border-l border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4">
                    {" "}
                    Subject{" "}
                  </th>
                  <th className="w-1/6 bg-gray-900 border-l border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4">
                    Status
                  </th>

                  <th className="w-1/6 bg-gray-900 border-l  border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4">
                    Last Update{" "}
                  </th>
                  <th className="w-1/6 bg-gray-900 border-l rounded-tr-md border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4">
                    {" "}
                  </th>
                </tr>
              </thead>
              {loadingData && <LoaderData />}
              <tbody>
                {currentData?.map((department) => (
                  <tr
                    key={department?._id}
                    className="overflow-x-auto overflow-y-hidden border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark whitespace-nowrap"
                  >
                    <td className="border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark">
                      #{department?.ticketId}
                    </td>
                    <td className="border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark">
                      {truncateSubject(department?.subject)}
                    </td>
                    <td className="border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark">
                      {(!department?.status && (
                        <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                          />
                          <span className="relative text-xs">Processing</span>
                        </span>
                      )) ||
                        (department?.status === "Open" && (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden=""
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative text-xs">Open</span>
                          </span>
                        )) ||
                        (department?.status === "Closed" && (
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden=""
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            />
                            <span className="relative text-xs">Closed</span>
                          </span>
                        ))}
                      {/* adfa:: */}
                      {
                        // department?.comments[department?.comments?.length - 1]
                        department?.comments[department?.comments?.length - 1]
                          ?.user !== department?.userInfo?.name && (
                          <span className="font-semibold text-yellow-900 leading-tight">
                            Waiting for Response
                          </span>
                        )
                      }
                      {/* // */}
                      {/* {department?.userInfo?.name} */}
                    </td>
                    <td className="border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark">
                      {formatDateTime(department.time)}
                    </td>
                    <td className='"border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark"'>
                      <button
                        onClick={() => handleViewDetails(department._id)}
                        className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {viewComment && (
            <div>
              <ViewSupportTicket
                refetch={refetch}
                viewComment={true}
                setViewComment={setViewComment}
                ticketDetails={currentData.find(
                  (department) => department._id === viewComment
                )}
              />
            </div>
          )}

          <div className="flex justify-center my-4">
            <ol className="flex justify-center gap-1 text-xs font-medium">
              <li>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
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

              <div className="border-blue-600 bg-blue-600 text-white p-2 px-3 rounded">
                <span> {currentPage}</span>
              </div>

              <li>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(
                        prevPage + 1,
                        Math.ceil(filteredData?.length / pageSize)
                      )
                    )
                  }
                  disabled={
                    currentPage === Math.ceil(filteredData?.length / pageSize)
                  }
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
      ) : (
        <h1 className="text-3xl text-center font-semibold text-gray-700 mt-8">
          No support tickets found
        </h1>
      )}
      <AddSupportTicket
        refetch={refetch}
        OpenSupport={OpenSupport}
        setOpenSupport={setOpenSupport}
        className="w-0 h-0"
      />

      <button className="fixed bottom-11 right-3">
        <BiSupport
          onClick={modalToggol}
          className="text-5xl bg-gray-100 shadow shadow-slate-500 p-2 text-blue-500 rounded-full"
        ></BiSupport>
      </button>
      {modal && (
        <div className="fixed bottom-48 right-20 z-50">
          <div
            className="absolute end-0 z-10 mt-2 w-44 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
          >
            <div className="p-2">
              <a
                href="#"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-teal-700 hover:bg-teal-50"
                role="menuitem"
              >
                <AiOutlineWhatsApp /> Whatsapp
              </a>

              <a
                href="#"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                role="menuitem"
              >
                <BsMessenger /> Messenger
              </a>

              <a
                href="#"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
              >
                <MdEmail /> Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerSupportTicket;
