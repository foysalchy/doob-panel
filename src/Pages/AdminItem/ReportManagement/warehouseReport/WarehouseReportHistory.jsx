import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BiCloset } from "react-icons/bi";
import WarehouseAdminProductModal from "./WarehouseAdminProductModal";
import SellerShowPrivew from "../../../SellerItems/Warehouse/SellerShowPrivew";

const WarehouseReportHistory = () => {
  const [OpenModal, setOpenModal] = useState(false);
  const itemsPerPage = 10; // Number of items per page

  const { data: warehouseData = [], isLoading } = useQuery({
    queryKey: ["adminWarehouseData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/admin/warehouses-products`
      );
      const data = await res.json();
      return data.warehouses;
    },
  });

  //   console.log(warehouseData);
  const { data: wareLength = [], refetch: reload } = useQuery({
    queryKey: ["wareAdminLengthData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/admin/admin-all-warehouse-area-rack-cell-self`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log('----->>>', wareLength);

  // Calculate total number of pages
  const totalPages = Math.ceil(warehouseData.length / itemsPerPage);

  // Function to paginate data
  const paginate = (pageNumber) => {
    return warehouseData.slice(
      (pageNumber - 1) * itemsPerPage,
      pageNumber * itemsPerPage
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [isPreviewModal, setIsPreviewModal] = useState(false);

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-black">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Photo
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Area Details
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Rank Details
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Slag
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Products
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-"
                      >
                        Preview
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {warehouseData.map((data) => (
                      <tr key={data?.warehouse?._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray- whitespace-nowrap">
                          <img
                            src={data?.warehouse?.img}
                            alt=""
                            className="w-[50px] h-[50px] object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                          <span>{data?.warehouse?.name}</span>
                        </td>
                        <td className=" text- ">
                          <span>
                            {" "}
                            Area:{" "}
                            {
                              wareLength && wareLength?.find(
                                (item) =>
                                  item.warehouse === data?.warehouse?.name
                              )?.areas?.length
                            }
                          </span>

                          <span>
                            {" "}
                            Racks:{" "}
                            {
                              wareLength && wareLength?.find(
                                (item) =>
                                  item.warehouse === data?.warehouse?.name
                              )?.racks?.length
                            }
                          </span>
                        </td>

                        <td className="text-">
                          {" "}
                          <span>
                            {" "}
                            Selfs:{" "}
                            {
                              wareLength && wareLength?.find(
                                (item) =>
                                  item.warehouse === data?.warehouse?.name
                              )?.selfs?.length
                            }
                          </span>
                          <span>
                            {" "}
                            Cells:{" "}
                            {
                              wareLength && wareLength?.find(
                                (item) =>
                                  item.warehouse === data?.warehouse?.name
                              )?.cells?.length
                            }
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                            {data.warehouse.status ? (
                              <svg
                                width={12}
                                height={12}
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3L4.5 8.5L2 6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <BiCloset className="text-lg text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <span>{data?.warehouse?.slag}</span>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {data?.warehouse?.address}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button
                              onClick={() => setOpenModal(data?.warehouse?._id)}
                              className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                            >
                              Product ({data?.products.length})
                            </button>
                          </div>
                        </td>
                        <td className="">
                          <button
                            onClick={() =>
                              setIsPreviewModal({
                                data: wareLength?.find(
                                  (item) =>
                                    item.warehouse === data?.warehouse.name
                                ),
                                id: data?.warehouse._id,
                              })
                            }
                            className="text-black bg-slate-200 p-2 rounded "
                          >
                            Show Previews
                          </button>
                        </td>
                        {OpenModal === data.warehouse._id && (
                          <WarehouseProductModal
                            setOpenModal={setOpenModal}
                            products={data.products}
                          />
                        )}
                        {isPreviewModal.id === data?.warehouse._id && (
                          <SellerShowPrivew
                            status={isPreviewModal}
                            setStatus={setIsPreviewModal}
                          />
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center justify-between mt-6">
            <a
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex items-center px-2 py-2 mr-2 text-sm  text-white capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray text-white- dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </a>
            <div className="items-center hidden md:flex gap-x-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-1 mr-2 text-sm rounded-md ${currentPage === i + 1
                      ? "text-blue-500 dark:bg-gray-800 bg-blue-100/60"
                      : "text-gray-200 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {i + 1}
                </a>
              ))}
            </div>
            <a
              href="#"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="flex items-center  px-2 py-2 text-sm text-gray-200 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray- dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WarehouseReportHistory;
