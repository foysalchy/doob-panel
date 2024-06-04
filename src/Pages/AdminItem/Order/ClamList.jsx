import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const ClamList = () => {

    const { data: products = [], refetch } = useQuery({
        queryKey: ["sellerAllOrder"],
        queryFn: async () => {
            const res = await fetch(
                `https://backend.doob.com.bd/api/v1/admin/get-shop-all-order`
            );
            const data = await res.json();
            console.log(data.data);

            return data?.data?.filter((item) => item?.status === "Clam");
        },
    });



    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = Math.ceil(products?.length / pageSize);

    const currentData = products?.length && products?.slice(startIndex, endIndex);

    const renderPageNumbers = () => {
        const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
        const endPage = Math.min(totalPages, startPage + pageSize - 1);

        return (
            <React.Fragment>
                {/* First Page */}
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

                {/* Current Page */}
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

                {/* Last Page */}
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



    return (
        <div>
            <div>
                <section className=" mx-auto">
                    <div className="flex products-center justify-between gap-x-3">
                        <div className="flex products-center gap-2">
                            <h2 className="text-lg font-medium text-gray-800 ">All Claim Orders</h2>
                            <span className="px-2 flex items-center  py-1 text-xs h-[22px] bg-blue-100 rounded-full d text-blue-400">
                                {products?.length}
                            </span>
                        </div>
                    </div>

                    {/* //! print modal */}


                    {/* //! print and status */}



                    {/* //?! table start */}

                    <div className="flex flex-col mt-6">
                        <div className="overflow-x-auto">
                            <div className="py-2">


                                <div className="overflow-x-auto border border-gray-700 md:rounded-lg">
                                    <table className="divide-y w-full divide-gray-700">
                                        <thead className="bg-gray-900 text-white">
                                            <tr>
                                                <th className="px-2 text-start ">
                                                    {/* //! all select input */}

                                                    Product Info
                                                </th>
                                                <th className="px-2 text-start ">Seller Name</th>
                                                <th className="px-2 text-start ">Profit</th>
                                                <th
                                                    scope="col"
                                                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right"
                                                >
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Status</span>
                                                    </button>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
                                                >
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Date and time</span>
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
                                                >
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Customer Name</span>
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                                                >
                                                    Order Quantity
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                                                >
                                                    Order Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left"
                                                >
                                                    <span>Action</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        {/* {selectedStatusModal && (
                                            <SelectStatusUpdate
                                                selectedStatusModal={selectedStatusModal}
                                                setSelectedStatusModal={setSelectedStatusModal}
                                                handleUpdateStatusForSelectedProducts={
                                                    handleUpdateStatusForSelectedProducts
                                                }
                                                orderInfo={selectProducts[0]}
                                                refetch={refetch}
                                                ships={ships}
                                            />
                                        )} */}
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentData.length ? (
                                                currentData?.map((product) => (
                                                    <React.Fragment key={product._id}>
                                                        <tr className="items-center" key={product._id}>
                                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                <div className="inline-flex items-center gap-x-3">
                                                                    {/* single input */}

                                                                    <div className="flex gap-x-2 relative">
                                                                        <div className=" w-10 h-10 overflow-hidden rounded-full">
                                                                            <img
                                                                                className="object-cover w-full h-full hover:cursor-pointer"
                                                                                src={product.image}
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <h2 className="font-medium text-gray-800">
                                                                                {product.product &&
                                                                                    product.product.name
                                                                                        .split(" ")
                                                                                        .slice(0, 5)
                                                                                        .join(" ")}
                                                                            </h2>
                                                                            <p className="text-sm font-normal text-gray-600">
                                                                                {product?._id}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                {product?.userInfo?.name}
                                                            </td>

                                                            {/* <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                {calculateProfit(product)}
                                                            </td> */}

                                                            <td className="px-4 py-4 text-sm flex items-center font-medium text-gray-700 whitespace-nowrap">
                                                                <div className="border-r flex items-center px-6 py-4 whitespace-nowrap text-[16px] font-[400]  flex-col gap-2">
                                                                    {product.status === "pending" && (
                                                                        <>
                                                                            <button
                                                                                // onClick={() => setReadyToShip(product)}
                                                                                // onClick={() =>
                                                                                //   productStatusUpdate(
                                                                                //     "ready_to_ship",
                                                                                //     product._id
                                                                                //   )
                                                                                // }
                                                                                onClick={() => setReadyToShip(product)}
                                                                                className="text-blue-700"
                                                                            >
                                                                                Ready to Ship
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    productStatusUpdate(
                                                                                        "Cancel",
                                                                                        product._id
                                                                                    )
                                                                                }
                                                                                className="text-blue-700"
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                    {product.status === "ready_to_ship" && (
                                                                        <button
                                                                            onClick={() =>
                                                                                productStatusUpdate(
                                                                                    "shipped",
                                                                                    product._id
                                                                                )
                                                                            }
                                                                            className="text-blue-700"
                                                                        >
                                                                            Shipped
                                                                        </button>
                                                                    )}
                                                                    {product.status === "shipped" && (
                                                                        <div className="flex flex-col gap-2">
                                                                            <button
                                                                                onClick={() =>
                                                                                    productStatusUpdate(
                                                                                        "delivered",
                                                                                        product._id
                                                                                    )
                                                                                }
                                                                                className="text-blue-700"
                                                                            >
                                                                                Delivered
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    productStatusUpdate(
                                                                                        "failed",
                                                                                        product._id
                                                                                    )
                                                                                }
                                                                                className="text-blue-700"
                                                                            >
                                                                                Failed Delivery
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {product.status === "delivered" && (
                                                                        <button
                                                                            onClick={() =>
                                                                                productStatusUpdate(
                                                                                    "returned",
                                                                                    product._id
                                                                                )
                                                                            }
                                                                            className="text-blue-700"
                                                                        >
                                                                            Returned
                                                                        </button>
                                                                    )}
                                                                    {product.status === "return" && (
                                                                        <div className="flex flex-col justify-center">
                                                                            <button
                                                                                onClick={() => {
                                                                                    setShowAlert(product);
                                                                                    checkBox(product._id);
                                                                                }}
                                                                                className="text-blue-700"
                                                                            >
                                                                                Approve
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    productStatusUpdate(
                                                                                        "failed",
                                                                                        product._id
                                                                                    )
                                                                                }
                                                                                className="text-blue-700"
                                                                            >
                                                                                Reject
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {product.status === "returned" && (
                                                                        <button
                                                                            onClick={() =>
                                                                                productStatusUpdate(
                                                                                    "RefoundOnly",
                                                                                    product._id
                                                                                )
                                                                            }
                                                                            className="text-blue-700"
                                                                        >
                                                                            Refund Data
                                                                        </button>
                                                                    )}
                                                                    {product.status === "Refund" && (
                                                                        <button
                                                                            onClick={() => viewDetails(product)}
                                                                            className="text-blue-700"
                                                                        >
                                                                            View Details
                                                                        </button>
                                                                    )}
                                                                    {
                                                                        <button className="text-blue-700">
                                                                            {product.status}
                                                                        </button>
                                                                    }
                                                                    {/* {product._id === readyToShip._id && (
                                                                        <tr>
                                                                            <td colSpan="10">
                                                                                <ReadyToShipModal
                                                                                    readyToShip={readyToShip}
                                                                                    setReadyToShip={setReadyToShip}
                                                                                    productStatusUpdate={
                                                                                        productStatusUpdate
                                                                                    }
                                                                                    orderInfo={product}
                                                                                    refetch={refetch}
                                                                                    ships={ships}
                                                                                />
                                                                            </td>
                                                                        </tr> */}
                                                                    {/* )} */}
                                                                </div>

                                                            </td>

                                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-x-2">
                                                                    <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                                        {new Date(product.date).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                {product.customerName}
                                                            </td>

                                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-x-2">
                                                                    <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                                        {product.quantity}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-x-2">
                                                                    <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                                        {product.price}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 mt-12  h-full my-auto flex items-center gap-4 text-sm whitespace-nowrap">
                                                                <button
                                                                    onClick={() => deleteMethod(product._id)}
                                                                    className="transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                {/* <button
                                                                    // onClick={() => setModalOpen(product)}
                                                                    className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                                                                >
                                                                    <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                                                                    <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                                                        {modalOpen._id === product._id
                                                                            ? "Close Details"
                                                                            : "View Details"}
                                                                    </span>
                                                                </button> */}
                                                            </td>
                                                        </tr>

                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <tr className="text-[gray] py-4 font-seminold  text-center w-full">
                                                    <td colSpan={7}>No items metch</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center mt-8">
                                    <ol className="flex justify-center gap-1 text-xs font-medium">
                                        <li>
                                            <button
                                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
                                                onClick={() =>
                                                    handleChangePage(Math.max(1, currentPage - 1))
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

                                        {renderPageNumbers()}

                                        <li>
                                            <button
                                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
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
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClamList;