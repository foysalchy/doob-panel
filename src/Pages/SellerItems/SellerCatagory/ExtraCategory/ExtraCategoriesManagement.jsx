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
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert";
import Select from 'react-select';
import BrightAlert from "bright-alert";
import { FaChevronDown, FaChevronUp, FaLongArrowAltRight } from "react-icons/fa";
const ExtraCategoriesManagement = () => {
      const { shopInfo } = useContext(AuthContext);

      const { data: categories = [], refetch, isLoading: loadingData } = useQuery({
            queryKey: ["categoriesData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/extra/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });




      //   console.log(categories);
      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData =
            categories.length &&
            categories
                  ?.map((filteredItem) => {
                        let parsedDarazCategory = filteredItem?.darazCategory;

                        try {
                              parsedDarazCategory = JSON.parse(filteredItem?.darazCategory);
                        } catch (error) { }

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
                  `https://doob.dev/api/v1/category/seller/extra/status/${id}`,
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
                              `https://doob.dev/api/v1/category/seller/extra/delete/${id}`,
                              {
                                    method: "DELETE",
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                              }
                        )
                              .then((res) => res.json())
                              .then((data) => {
                                    showAlert("Extra Category Deleted", "", "success");
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
      const [editOn, setEditOn] = useState(false);

      const handleViewDetails = (data) => {
            setOpenModal(data?._id);
            setEditOn(data);
      };

      const uploadImage = async (formData) => {
            const url =`https://doob.dev/api/v1/image/upload-image/?shopId=${shopInfo._id}`;
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });

            const imageData = await response.json();
            return imageData.imageUrl;
      };
      const [loading, setLoading] = useState(false);



      const [darazCategory_id, setDarazCategory_id] = useState(false);

      const handleChange = (selectedOption) => {
            if (selectedOption) {
                  setDarazCategory_id(selectedOption.sub_id);
            }
      };


      const handleEdit = async (e, id) => {
            e.preventDefault();
            const form = e.target;
            const image = form.image;
            const name = form.name.value;
            const imageFormData = new FormData();
            imageFormData.append("image", image.files[0]);
            const imageUrl = await uploadImage(imageFormData);
            const daraz = e.target.darazExtraCategory.value ?? editOn?.darazExtraCategory

            const data = {
                  img: imageUrl ? imageUrl : editOn?.img,
                  name: name,
                  darazExtraCategory: daraz,
                  darazCategory_id: darazCategory_id
            };

            console.log(data);

            fetch(
                  `https://doob.dev/api/v1/category/seller-update-extraCategory?id=${id}`,
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
                  `https://doob.dev/api/v1/category/seller-update-extraCategory-feature?id=${id}&status=${status}`,
                  {
                        method: "PUT",

                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ feature: status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(`Category  feature ${status} `, "", "success");
                        refetch();
                  });
      };










      const { data: darazData = [] } = useQuery({
            queryKey: ["category"],
            queryFn: async () => {
                  if (shopInfo.darazLogin) {
                        const res = await fetch(
                              `https://doob.dev/api/v1/daraz/category/${shopInfo._id}`
                        );
                        const data = await res.json();
                        return data;
                  }

                  return [];
            },
      });


      let parsedObject;
      try {
            parsedObject = editOn.megaCategory ? JSON.parse(editOn.megaCategory) : null;
      } catch (error) {
            console.error('Failed to parse JSON:', error);
            parsedObject = null;
      }



      let daraz_extra_option = []

      if (editOn && editOn.subId) {
            const mega_category = JSON.parse(editOn.megaCategory)
            const darazCategory = mega_category.darazCategory
            const daraz_category_json = JSON.parse(darazCategory).children
            const sub_category = daraz_category_json.filter(item => item.category_id === editOn.subId)[0];
            const mini_category = sub_category.children.filter(item => item.category_id === editOn.miniId)[0].children

            daraz_extra_option =
                  mini_category &&
                  mini_category?.map((data) => {
                        const option = {
                              value: JSON.stringify({
                                    data,
                                    darazMiniCategoryName: sub_category.name,
                                    // darazSubCategoryName: data.name,
                              }),
                              label: `${data.name} (${data.leaf ? "can upload" : "can't upload"})`,
                              sub_id: data.category_id,
                        };

                        return option;
                  }) || []
      }



      const category_trash = (id, status) => {
            fetch(`https://doob.dev/api/v1/category/seller-update-extraCategory-trash?id=${id}`, {
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
                  <div className="mt-4 lg:pr-10 w-full mx-auto overflow-auto">
                        <Link
                              to={"add"}
                              className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 md:w-auto w-full"
                              onClick={() => handleViewDetails("Add Mega Category")}
                        >
                              <span className="absolute -start-full transition-all group-hover:start-4">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4 md:w-auto w-full text-center">
                                    Add New Extra Category
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

                        <div className="flex flex-col mt-6">
                              <div className="overflow-x-auto border border-gray-300 rounded-lg overflow-y-none">
                                    <table className="table-auto w-full text-left whitespace-wrap">
                                          <thead>
                                                <tr className="border-b">
                                                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                                                            Photo
                                                      </th>
                                                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  ">
                                                            Extra Category Name
                                                      </th>

                                                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800   ">
                                                            Daraz Category
                                                      </th>

                                                      {shopInfo.darazLogin && (
                                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                                  Woo-commerce Category
                                                            </th>
                                                      )}
                                                      {shopInfo.wooLogin && (
                                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                                  Status
                                                            </th>
                                                      )}
                                                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                                            Action
                                                      </th>

                                                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tr "></th>
                                                </tr>
                                          </thead>
                                          {loadingData && <LoaderData />}
                                          <tbody>
                                                {!currentItems.length ? '' :
                                                      currentItems?.map((warehouse, index) => {
                                                            const miniCategoryName = warehouse?.miniCategoryName;

                                                            let category;
                                                            try {
                                                                  category = miniCategoryName
                                                                        ? JSON.parse(miniCategoryName)
                                                                        : null;
                                                            } catch (error) {
                                                                  console.error("Error parsing JSON:", error);
                                                            }
                                                            const parsedData = warehouse?.darazExtraCategory;

                                                            let darazExtraCategoryOption;
                                                            try {
                                                                  darazExtraCategoryOption = parsedData
                                                                        ? JSON.parse(parsedData)
                                                                        : "";
                                                            } catch (error) {
                                                                  console.error("Error parsing JSON:", error);
                                                            }

                                                            console.log(darazExtraCategoryOption.data);

                                                            return (
                                                                  <tr key={index + warehouse?._id + 1} className="">
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
                                                                                                      JSON.parse(warehouse.megaCategory).name}
                                                                                                <span>&gt;</span>
                                                                                                {warehouse?.subCategoryName}
                                                                                                <span>&gt;</span>
                                                                                                {warehouse?.miniCategoryName}
                                                                                                <span>&gt;</span>
                                                                                                {warehouse?.extraCategoryName}
                                                                                          </h2>
                                                                                    </div>
                                                                              </div>
                                                                        </td>

                                                                        {shopInfo.darazLogin && (
                                                                              <td className="px-4 py-3">
                                                                                    <div className="flex gap-1 items-center text-sm">
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
                                                                                                                              : "Invalidate";

                                                                                                                  return darazCategoryName;
                                                                                                            } catch (error) {
                                                                                                                  console.error(
                                                                                                                        "Error parsing JSON:",
                                                                                                                        error
                                                                                                                  );
                                                                                                                  return null;
                                                                                                            }
                                                                                                      })()}
                                                                                          </p>
                                                                                          {darazExtraCategoryOption.darazSubCategoryName && (
                                                                                                <span>&gt;</span>
                                                                                          )}
                                                                                          <p>
                                                                                                {darazExtraCategoryOption.darazSubCategoryName}
                                                                                          </p>
                                                                                          {darazExtraCategoryOption.darazMiniCategoryName && (
                                                                                                <span>&gt;</span>
                                                                                          )}
                                                                                          <p>
                                                                                                {darazExtraCategoryOption.darazMiniCategoryName}
                                                                                          </p>
                                                                                          {darazExtraCategoryOption?.data?.name && (
                                                                                                <span>&gt;</span>
                                                                                          )}
                                                                                          <p>{darazExtraCategoryOption?.data?.name}</p>
                                                                                    </div>
                                                                              </td>
                                                                        )}

                                                                        {shopInfo?.wooLogin && (
                                                                              <td className="px-4 py-3">
                                                                                    {" "}
                                                                                    {warehouse?.megaCategory &&
                                                                                          (() => {
                                                                                                try {
                                                                                                      const parsedMegaCategory = JSON.parse(
                                                                                                            warehouse?.megaCategory
                                                                                                      );
                                                                                                      const darazCategoryName =
                                                                                                            parsedMegaCategory &&
                                                                                                                  parsedMegaCategory.wocomarceCategory
                                                                                                                  ? JSON.parse(
                                                                                                                        parsedMegaCategory.wocomarceCategory
                                                                                                                  ).name
                                                                                                                  : "Invalidate";

                                                                                                      return darazCategoryName;
                                                                                                } catch (error) {
                                                                                                      console.error("Error parsing JSON:", error);
                                                                                                      return null;
                                                                                                }
                                                                                          })()}{" "}
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
                                                                                          onClick={() =>
                                                                                                updateStatus(warehouse?._id, false)
                                                                                          }
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
                                                                                    onClick={() => handleViewDetails(warehouse)}
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

                                                                        <div
                                                                              className={`fixed  flex items-center justify-center ${editOn?._id === warehouse?._id
                                                                                    ? "opacity-1 visible"
                                                                                    : "invisible opacity-0"
                                                                                    } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                                                                        >
                                                                              <div
                                                                                    className={`absolute md:w-[500px] w-full rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${editOn?._id === warehouse?._id
                                                                                          ? "scale-1 opacity-1 duration-300"
                                                                                          : "scale-0 opacity-0 duration-150"
                                                                                          } `}
                                                                              >
                                                                                    <svg
                                                                                          onClick={() => setEditOn(false)}
                                                                                          className="mx-auto mr-0 w-8 cursor-pointer"
                                                                                          viewBox="0 0 24 24"
                                                                                          fill="none"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                          <g strokeWidth="0"></g>
                                                                                          <g
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                          ></g>
                                                                                          <g>
                                                                                                <path
                                                                                                      d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                                                                                      fill="#000"
                                                                                                ></path>
                                                                                          </g>
                                                                                    </svg>

                                                                                    <form
                                                                                          onSubmit={(e) => handleEdit(e, warehouse?._id)}
                                                                                    >
                                                                                          <h1 className="text-lg font-semibold text-center mb-4">
                                                                                                Edit Extra Category
                                                                                          </h1>
                                                                                          <img
                                                                                                src={warehouse?.img}
                                                                                                alt=""
                                                                                                className="w-[100px] h-[100px] rounded"
                                                                                          />
                                                                                          <div className="flex flex-col items-start gap-1">
                                                                                                <label className="text-start" htmlFor="photo">
                                                                                                      Photo
                                                                                                </label>
                                                                                                <input
                                                                                                      type="file"
                                                                                                      name="image"
                                                                                                      className="border border-gray-500 p-1 rounded mb-3 w-full"
                                                                                                />
                                                                                          </div>

                                                                                          <div className="flex flex-col items-start gap-1">
                                                                                                <label className="text-start" htmlFor="photo">
                                                                                                      Name
                                                                                                </label>
                                                                                                <input
                                                                                                      defaultValue={warehouse?.extraCategoryName}
                                                                                                      type="text"
                                                                                                      name="name"
                                                                                                      className="border border-gray-500 p-1 rounded mb-3 w-full"
                                                                                                />
                                                                                          </div>

                                                                                          {shopInfo.darazLogin && daraz_extra_option.length > 0 && (
                                                                                                <div className="z-[3000]">
                                                                                                      <div className="mt-4">
                                                                                                            <label className="text-sm">Select Daraz Category</label>
                                                                                                            <Select
                                                                                                                  onChange={handleChange}
                                                                                                                  menuPortalTarget={document.body}
                                                                                                                  styles={{
                                                                                                                        control: (provided) => ({
                                                                                                                              ...provided,
                                                                                                                              cursor: "pointer",
                                                                                                                        }),
                                                                                                                        option: (provided) => ({
                                                                                                                              ...provided,
                                                                                                                              cursor: "pointer",
                                                                                                                        }),
                                                                                                                  }}
                                                                                                                  name="darazExtraCategory"
                                                                                                                  required
                                                                                                                  options={daraz_extra_option}
                                                                                                                  placeholder="Select Daraz Category"
                                                                                                            />
                                                                                                      </div>
                                                                                                </div>
                                                                                          )}


                                                                                          <br />
                                                                                          <div className="flex justify-start">
                                                                                                <button
                                                                                                      type="submit"
                                                                                                      className="me-2 rounded bg-green-700 px-6 py-1 text-white"
                                                                                                >
                                                                                                      Sibmit
                                                                                                </button>
                                                                                          </div>
                                                                                    </form>
                                                                              </div>
                                                                        </div>

                                                                        {/* {OpenModal === warehouse?._id && <div className="h-0 w-0">
                                        <EditWareHouse OpenModal={OpenModal} refetch={refetch} setOpenModal={setOpenModal} data={warehouse} />
                                    </div>} */}
                                                                  </tr>
                                                            );
                                                      })}
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
            </div>
      );
};

export default ExtraCategoriesManagement;
