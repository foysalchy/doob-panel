import React from "react";
import { BiEdit, BiLeftArrow, BiRightArrow } from "react-icons/bi";
// import EditSellerInfo from '../SellerManagement/EditSellerInfo';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import ModalForCategory from "../ModalForCategory/ModalForCategory";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { Link } from "react-router-dom";

const ExtraCategoriesManagement = () => {
  const { shopInfo } = useContext(AuthContext);

  const { data: categories = [], refetch } = useQuery({
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


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(parseInt(15));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems =
    filteredData?.length && filteredData?.slice(startIndex, endIndex);


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
        Swal.fire(`Category disable ${status} `, "", "success");
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
            Swal.fire("Extra Category Deleted", "", "success");
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting seller:", error);
            Swal.fire("Error Deleting Seller", "An error occurred", "error");
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
    const url = `https://doob.dev/api/v1/image/upload-image`;
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
        Swal.fire(`Sub Category update `, "", "success");
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
        Swal.fire(`Category  feature ${status} `, "", "success");
        refetch();
      });
  };

  return (
    <div>
      <div className="mt-4 lg:pr-10 w-full mx-auto overflow-auto">
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

          <span className="text-sm font-medium transition-all group-hover:ms-4 md:w-auto w-full text-center">
            Add New Extra Category
          </span>
        </Link>

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

          <div className="flex items-center whitespace-nowrap gap-2">
            <span className="text-sm">Entire per page</span>
            <select

              className="border w-[50px] px-1 py-2 text-sm rounded"
              onChange={(e) => setItemsPerPage(e.target.value)}>
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
              <tbody>
                {currentItems && currentItems?.map((warehouse, index) => {
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
                              <span>&gt;

                              </span>
                              {warehouse?.subCategoryName}
                              <span>
                                &gt;</span>
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
                              {
                                darazExtraCategoryOption.darazSubCategoryName
                              }
                            </p>
                            {darazExtraCategoryOption.darazMiniCategoryName && (
                              <span>&gt;</span>
                            )}
                            <p>
                              {
                                darazExtraCategoryOption.darazMiniCategoryName
                              }
                            </p>
                            {darazExtraCategoryOption?.data?.name && (
                              <span>&gt;</span>
                            )}
                            <p>{darazExtraCategoryOption?.data?.name}</p>
                          </div>
                        </td>
                      )}
                      {/* {shopInfo.darazLogin &&
                                            <td className="px-4 py-3">
                                                {warehouse?.darazMiniCategory && (
                                                    <div className='flex gap-1 items-center'>
                                                        <p>{warehouse?.darazMiniCategory && JSON.parse(JSON.parse(warehouse?.megaCategory).darazCategory).name}</p>
                                                        <span>&gt;</span>
                                                        <p>{warehouse?.darazMiniCategory && JSON.parse(warehouse?.darazMiniCategory).name}</p>
                                                        <span>&gt;</span>
                                                        <p>{warehouse?.darazMiniCategory && JSON.parse(warehouse?.darazMiniCategory)?.child?.name}</p>
                                                    </div>)
                                                }
                                            </td>
                                        } */}

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
                            onClick={() =>
                              updateStatus(warehouse?._id, true)
                            }
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
                        <MdDelete
                          className="text-red-500 cursor-pointer"
                          onClick={() => DeleteWarehouse(warehouse?._id)}
                        />
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
                        className={`fixed z-[100] flex items-center justify-center ${editOn?._id === warehouse?._id
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
      </div>
    </div>
  );
};

export default ExtraCategoriesManagement;
