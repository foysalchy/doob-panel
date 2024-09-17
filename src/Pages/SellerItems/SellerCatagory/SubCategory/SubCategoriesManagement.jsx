import React, { useEffect, useRef } from "react";
import { BiEdit, BiLeftArrow, BiRightArrow } from "react-icons/bi";
// import EditSellerInfo from '../SellerManagement/EditSellerInfo';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdDelete, MdOutlineReplay } from "react-icons/md";
import Swal from "sweetalert2";
import ModalForCategory from "../ModalForCategory/ModalForCategory";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { Link } from "react-router-dom";
import EditSUbCategoryModal from "./EditSUbCategoryModal";
import LoaderData from "../../../../Common/LoaderData";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import BrightAlert from "bright-alert";
// import EditWareHouse from './EditWareHouse';
import showAlert from "../../../../Common/alert";
const SubCategoriesManagement = () => {
      const { shopInfo } = useContext(AuthContext);
      console.log(
            `https://doob.dev/api/v1/category/seller/sub/${shopInfo._id}`
      );

      const {
            data: categories = [],
            refetch,
            isLoading: loadingSubData,
      } = useQuery({
            queryKey: ["categories"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/sub/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };



      const filteredData =
            categories.length &&
            categories
                  ?.map((filteredItem) => {
                        console.log(filteredItem);
                        let parsedDarazCategory = filteredItem?.darazCategory;

                        try {
                              // Check if the string is not empty before parsing
                              if (parsedDarazCategory) {
                                    parsedDarazCategory = JSON.parse(parsedDarazCategory);
                              }
                        } catch (error) {
                              console.error("Error parsing JSON:", error);
                              // Handle invalid JSON by leaving it unchanged or handle it accordingly.
                        }

                        return {
                              ...filteredItem,
                              darazCategory: parsedDarazCategory,
                        };
                  })
                  .filter((item) => {
                        const lowercaseSearchQuery = searchQuery?.toLowerCase();
                        return item?.subCategoryName
                              ?.toLowerCase()
                              .includes(lowercaseSearchQuery);
                  });


      const handleChangePage = (newPage) => {
            setCurrentPage(newPage);
      };

      const renderPageNumbers = () => {
            const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
            const endPage = Math.min(totalPages, startPage + pageSize - 1);

            return (
                  <React.Fragment>
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
            fetch(
                  `https://doob.dev/api/v1/category/seller/sub/status/${id}`,
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
                        showAlert(`Category disable ${status} `, "", "success");
                        refetch();
                  });
      };

      const DeleteWarehouse = (id) => {
            let timerInterval;

            Swal.fire({
                  title: "Deleting...",
                  html: "Please wait <br> <b></b> milliseconds remaining.",
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
                              `https://doob.dev/api/v1/category/seller/sub/delete/${id}`,
                              {
                                    method: "DELETE",
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                              }
                        )
                              .then((res) => res.json())
                              .then((data) => {
                                    showAlert("Sub Category Deleted", "", "success");
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

      const handleViewDetails = (ticketId, warehouse) => {
            setOpenModal(ticketId);
            // console.log(warehouse, '...');
            setEditOn(warehouse);
      };

      const [editOn, setEditOn] = useState(false);

      const uploadImage = async (formData) => {
            const url = `https://doob.dev/api/v1/image/upload-image/?shopId=${shopInfo._id}`;
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });

            const imageData = await response.json();
            return imageData.imageUrl;
      };
      const [loading, setLoading] = useState(false);
      const handleEdit = async (e, id) => {
            e.preventDefault();
            const form = e.target;
            const image = form.image;
            const name = form.name.value;
            const imageFormData = new FormData();
            imageFormData.append("image", image.files[0]);
            const imageUrl = await uploadImage(imageFormData);

            const data = {
                  img: imageUrl ? imageUrl : editOn?.img,
                  name: name,
            };

            console.log(data, id, "update");

            fetch(
                  `https://doob.dev/api/v1/category/seller-update-subCategory?id=${id}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        showAlert(`Sub Category update `, "", "success");
                        refetch();
                        setEditOn(false);
                        form.reset();
                  });

      };

      const futuresUpdate = (id, status) => {
            fetch(
                  `https://doob.dev/api/v1/category/seller-update-subCategory-feature?id=${id}&status=${status}`,
                  {
                        method: "PUT",

                        headers: {
                              "Content-Type": "application/json",
                        },
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(`Category  feature ${status} `, "", "success");
                        refetch();
                  });
      };



      const category_trash = (id, status) => {
            fetch(`https://doob.dev/api/v1/category/seller-update-subCategory-trash?id=${id}`, {
                  method: "PUT",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify({ status: status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (status) {
                              showAlert("This Category on now in Trash","","success");
                        }
                        else {
                              showAlert("This Category on now in Active","","success");
                        }

                        refetch();
                  });


      }

      const dropdownRef = useRef(null);
      const [menuOn, setmenuOn] = useState();
      const [trash, settrash] = useState();
      const [selectedOption, setSelectedOption] = useState(false);

      const toggleDropdown = () => setmenuOn(!menuOn);

      const handleOptionClick = (option) => {
            switch (option) {
                  case 'Trash':
                        setSelectedOption(true);
                        break;
                  case 'Without Trash':
                        setSelectedOption(false);
                        break;
                  case 'All':
                        setSelectedOption(null);
                        break;
                  default:
                        setSelectedOption(null);
            }
            setmenuOn(false);
      };

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setmenuOn(false);
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, []);




      const filter_category = filteredData ? filteredData?.filter(item => {
            if (selectedOption === null) {
                  // Show all items if selectedOption is null
                  return true;
            }
            if (selectedOption === true) {
                  // Show items where item.trash is true
                  return item?.trash === true;
            }
            if (selectedOption === false) {
                  // Show items where item.trash is false or undefined
                  return item?.trash === false || item?.trash === undefined;
            }
            // Default case: show no items
            return false;
      }) : []




      const [itemsPerPage, setItemsPerPage] = useState(15);
      const [currentPage, setCurrentPage] = useState(1);

      // Calculate total pages
      const totalPages = Math.ceil(filter_category.length / itemsPerPage);

      // Calculate start and end index for slicing
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Get items for the current page
      const currentItems = filter_category.slice(startIndex, endIndex);

      // Handle page change
      const handlePageChange = (page) => {
            if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
            }
      };

      // Create page range for pagination
      const createPageRange = () => {
            const range = [];
            const delta = 2; // Number of pages to show before and after the current page

            for (let i = 1; i <= totalPages; i++) {
                  if (
                        i <= delta + 1 ||
                        (i >= currentPage - delta && i <= currentPage + delta) ||
                        i > totalPages - delta
                  ) {
                        range.push(i);
                  }
            }

            if (range[0] !== 1) range.unshift('...');
            if (range[range.length - 1] !== totalPages) range.push('...');

            return range;
      };

      const pageRange = createPageRange();




      return (
            <div>
                  <div className="mt-4 lg:pr-10 w-full mx-auto overflow-hidden">
                        <Link
                              to={"add"}
                              className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 md:w-auto w-full"
                              onClick={() => handleViewDetails("Add Mega Category")}
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

                              <span className="text-sm font-medium transition-all group-hover:ms-4 md:w-auto w-full">
                                    Add New Sub Category
                              </span>
                        </Link>
                        <div className="relative inline-flex ml-4 items-center" ref={dropdownRef}>
                              <button
                                    onClick={toggleDropdown}
                                    className="group mt-4  relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                              >
                                    <span className="absolute -start-full transition-all group-hover:start-4">
                                          <FaLongArrowAltRight />
                                    </span>
                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          {selectedOption === null ? 'Select Option' : selectedOption === true ? 'Trash' : selectedOption === false ? 'Without Trash' : 'All'}
                                    </span>
                                    <span className="ml-2">
                                          {menuOn ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                              </button>
                              {menuOn && (
                                    <div className="absolute left-0 z-50 top-full mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                          <ul className="py-1">
                                                {['Trash', 'Without Trash', 'All'].map(option => (
                                                      <li
                                                            key={option}
                                                            onClick={() => handleOptionClick(option)}
                                                            className={`cursor-pointer px-4 py-2 text-gray-900 ${selectedOption === (option === 'Trash' ? true : option === 'Without Trash' ? false : null) ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                                                      >
                                                            {option}
                                                      </li>
                                                ))}
                                          </ul>
                                    </div>
                              )}
                        </div>

                        {OpenModal === "Add Mega Category" && (
                              <ModalForCategory
                                    OpenModal={OpenModal}
                                    setOpenModal={setOpenModal}
                                    data={"Add Mega Category"}
                                    refetch={refetch}
                              />
                        )}

                        <div className="flex items-center justify-between">
                              <div className="relative my-6">
                                    <input
                                          type="text"
                                          id="Search"
                                          required
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
                              <div className="flex items-center whitespace-nowrap gap-2">
                                    <span className="text-sm">Entire per page</span>
                                    <select
                                          className="border w-[50px] px-1 py-2 text-sm rounded"
                                          onChange={(e) => setItemsPerPage(e.target.value)}
                                    >
                                          <option value={15}>15</option>
                                          <option value={30}>30</option>
                                          <option value={70}>70</option>
                                          <option value={100}>100</option>
                                    </select>
                              </div>
                        </div>

                        <div className="overflow-x-auto border border-gray-300 rounded-lg overflow-y-none">
                              <table className="table-auto w-full text-left whitespace-wrap">
                                    <thead>
                                          <tr className="border-b">
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                                                      Photo
                                                </th>

                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800   ">
                                                      Categories Name
                                                </th>

                                                {shopInfo.darazLogin && (
                                                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                            Daraz Category
                                                      </th>
                                                )}
                                                {shopInfo.wooLogin && (
                                                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                            Woocomarce Category
                                                      </th>
                                                )}
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                      Status
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  ">
                                                      Action
                                                </th>
                                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tr "></th>
                                          </tr>
                                    </thead>
                                    <tbody className=" ">
                                          {loadingSubData && <LoaderData />}
                                          {!loadingSubData &&
                                                !currentItems?.length ? '' :
                                                currentItems?.map((warehouse, index) => (
                                                      <tr key={index + warehouse?._id + 1} className="border-b">
                                                            <td className="px-4 py-3">
                                                                  <img
                                                                        src={warehouse?.img && warehouse?.img}
                                                                        alt=""
                                                                        className="w-[50px] rounded-lg"
                                                                  />
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                  <div className="flex gap-2 items-center">
                                                                        <div>
                                                                              <h2 className="font-medium text-gray-800  ">
                                                                                    {warehouse?.megaCategory &&
                                                                                          JSON.parse(warehouse.megaCategory).name}{" "}
                                                                                    <span>&gt;</span> {warehouse?.subCategoryName}
                                                                              </h2>
                                                                        </div>
                                                                  </div>
                                                            </td>
                                                            {shopInfo.darazLogin && (
                                                                  <td className="px-4 py-3 ">
                                                                        <div className="flex gap-1 items-center">
                                                                              <p>
                                                                                    {warehouse?.megaCategory &&
                                                                                          (() => {
                                                                                                try {
                                                                                                      const parsedMegaCategory = JSON.parse(
                                                                                                            warehouse?.megaCategory
                                                                                                      );
                                                                                                      const darazCategoryName =
                                                                                                            parsedMegaCategory &&
                                                                                                                  parsedMegaCategory.darazCategory
                                                                                                                  ? JSON.parse(
                                                                                                                        parsedMegaCategory.darazCategory
                                                                                                                  ).name
                                                                                                                  : null;

                                                                                                      return darazCategoryName;
                                                                                                } catch (error) {
                                                                                                      console.error("Error parsing JSON:", error);
                                                                                                      return null;
                                                                                                }
                                                                                          })()}
                                                                              </p>

                                                                              <p>
                                                                                    {warehouse?.darazSubCategory ? (
                                                                                          <span>
                                                                                                &gt;{" "}
                                                                                                {JSON.parse(warehouse?.darazSubCategory).name}
                                                                                          </span>
                                                                                    ) : (
                                                                                          "Invalidate"
                                                                                    )}
                                                                              </p>
                                                                        </div>
                                                                  </td>
                                                            )}
                                                            {shopInfo?.wooLogin && (
                                                                  <td className="px-4 py-3">
                                                                        {warehouse?.wooSubCategory
                                                                              ? JSON.parse(warehouse.wooSubCategory).name
                                                                              : "Invalidate"}{" "}
                                                                  </td>
                                                            )}
                                                            <td className="px-4 py-3">
                                                                  {!warehouse?.status ? (
                                                                        <button
                                                                              onClick={() => updateStatus(warehouse?._id, true)}
                                                                              className="inline-flex items-center justify-center py-1 px-4 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                                                                        >
                                                                              Disable
                                                                        </button>
                                                                  ) : (
                                                                        <button
                                                                              onClick={() => updateStatus(warehouse?._id, false)}
                                                                              className="inline-flex items-center justify-center py-1 px-4 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                                                        >
                                                                              Enable
                                                                        </button>
                                                                  )}{" "}
                                                            </td>
                                                            <td className="px-4  text-2xl flex gap-2 py-6 items-center text-gray-100">
                                                                  {/* <MdDelete
                                                                        className="text-red-500 cursor-pointer"
                                                                        onClick={() => DeleteWarehouse(warehouse?._id)}
                                                                  /> */}
                                                                  {!warehouse?.trash && <MdDelete
                                                                        className="text-red-500 text-xl cursor-pointer"
                                                                        onClick={() => category_trash(warehouse?._id, true)}
                                                                  />}
                                                                  {
                                                                        warehouse?.trash && <div className="flex gap-2 items-center">
                                                                              <MdDelete
                                                                                    className="text-red-500 text-xl cursor-pointer"
                                                                                    onClick={() => DeleteWarehouse(warehouse?._id)}
                                                                              />
                                                                              <MdOutlineReplay
                                                                                    className="text-green-500 text-xl cursor-pointer"
                                                                                    onClick={() => category_trash(warehouse?._id, false)}
                                                                              />
                                                                        </div>
                                                                  }
                                                                  <BiEdit
                                                                        className="text-yellow-500 cursor-pointer"
                                                                        onClick={() =>
                                                                              handleViewDetails(warehouse?._id, warehouse)
                                                                        }
                                                                  />
                                                            </td>
                                                            <td>

                                                                  <button
                                                                        onClick={() =>
                                                                              futuresUpdate(
                                                                                    warehouse?._id,
                                                                                    warehouse && warehouse.feature === "true"
                                                                                          ? false
                                                                                          : true
                                                                              )
                                                                        }
                                                                        className={`${warehouse && warehouse.feature === "true"
                                                                              ? "bg-green-500"
                                                                              : "bg-red-500"
                                                                              } text-white ml-2 rounded capitalize px-3 py-1`}
                                                                  >
                                                                        futures
                                                                  </button>
                                                            </td>

                                                            {editOn && (
                                                                  <EditSUbCategoryModal
                                                                        refetch={refetch}
                                                                        editOn={editOn}
                                                                        // data={warehouse}
                                                                        setEditOn={setEditOn}
                                                                        warehouse={warehouse}
                                                                  />
                                                            )}

                                                            {/* {OpenModal === warehouse?._id && <div className="h-0 w-0">
                                        <EditWareHouse OpenModal={OpenModal} refetch={refetch} setOpenModal={setOpenModal} data={warehouse} />
                                    </div>} */}
                                                      </tr>
                                                ))}
                                    </tbody>
                              </table>
                        </div>
                        <br />
                        <div className="py-6 bg-gray-50">
                              <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                                    <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                                          <p className="text-sm font-medium text-gray-500">
                                                Showing {startIndex + 1} to {Math.min(endIndex, filter_category.length)} of {filter_category.length} results
                                          </p>
                                          <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                                <button
                                                      onClick={() => handlePageChange(currentPage - 1)}
                                                      disabled={currentPage === 1}
                                                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                                      aria-label="Previous"
                                                >
                                                      <span className="sr-only">Previous</span>
                                                      <svg
                                                            className="flex-shrink-0 w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M15 19l-7-7 7-7"
                                                            />
                                                      </svg>
                                                </button>

                                                {pageRange.map((page, index) => (
                                                      <button
                                                            key={index}
                                                            onClick={() => typeof page === 'number' && handlePageChange(page)}
                                                            className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${typeof page === 'number' ? (currentPage === page ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-400 bg-white border border-gray-200') : 'text-gray-500 bg-white border border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9`}
                                                            aria-current={typeof page === 'number' && currentPage === page ? 'page' : undefined}
                                                      >
                                                            {page}
                                                      </button>
                                                ))}

                                                <button
                                                      onClick={() => handlePageChange(currentPage + 1)}
                                                      disabled={currentPage === totalPages}
                                                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                                      aria-label="Next"
                                                >
                                                      <span className="sr-only">Next</span>
                                                      <svg
                                                            className="flex-shrink-0 w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                                            />
                                                      </svg>
                                                </button>
                                          </nav>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default SubCategoriesManagement;
