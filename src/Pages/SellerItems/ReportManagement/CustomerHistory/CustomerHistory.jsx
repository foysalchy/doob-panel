import React, { useContext, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import AddProductModal from './AddProductModal';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const CustomerHistory = () => {
    const { shopInfo } = useContext(AuthContext);
    const [BiLoader, setLoader] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    const { data: customerData = [], isLoading } = useQuery({
        queryKey: ["customerdata"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/customer-report?shopId=${shopInfo?.shopId}`);
            const data = await res.json();
            return data;
        },
    });



    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 6;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = Math.ceil(customerData?.length / pageSize);

    const currentData = customerData.slice(startIndex, endIndex);

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
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-gray-900 bg-white text-center leading-8 text-gray-900'
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
            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <span>Name</span>
                                                    </div>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Provider
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Added Products
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Orders
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                WishList
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            currentData?.map((customer, index) => <tr key={customer?._id}>
                                                {/* <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                    />
                                                    <span>#3066</span>
                                                </div>
                                                </td> */}
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <span>{customer?.name}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-300 dark:text-gray-300 whitespace-nowrap">
                                                    {customer?.email}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {customer?.provider}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">

                                                    <button onClick={() => setOpenModal({ customer, status: "cart", title: "Add to cart products" })} className='text-blue-500'>Total Cart Products  ({customer?.addToCart.length})</button>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <button
                                                        // onClick={() => setOpenModal({ customer, status: "order", title: "Order List" })} 
                                                        className='text-blue-500'>Total Orders  ({customer?.orderList.length})</button>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <button onClick={() => setOpenModal({ customer, status: "wishlist", title: "Wishlist" })} className='text-blue-500'>Total Wishlist  ({customer?.wishList.length})</button>
                                                </td>
                                                {openModal && <span>
                                                    {openModal.customer._id == customer._id && <AddProductModal setOpenModal={setOpenModal} title={openModal?.title} products={openModal.status == "cart" && customer?.addToCart || openModal.status == "order" && customer.orderList || openModal.status == "wishlist" && customer?.wishList} />}
                                                </span>}
                                            </tr>)
                                        }

                                        <tr>
                                            <td colSpan={6}>

                                                Loader.......
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='flex justify-center mt-4'>
                    <ol className="flex justify-center gap-1 text-xs font-medium">
                        <li>
                            <button
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
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
                                    <BiLeftArrow className='text-xl' />
                                </svg>
                            </button>
                        </li>

                        {renderPageNumbers()}

                        <li>
                            <button
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                                onClick={() => handleChangePage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">Next Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <BiRightArrow className='text-xl' />
                                </svg>
                            </button>
                        </li>
                    </ol>
                </div>
            </section>

        </div>
    );
};

export default CustomerHistory;