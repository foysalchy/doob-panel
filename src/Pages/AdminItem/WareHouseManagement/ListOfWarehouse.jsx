import React from 'react';
import { BiEdit, BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import EditSellerInfo from '../SellerManagement/EditSellerInfo';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import EditWareHouse from './EditWareHouse';
import ModalForWarehouse from './Modal/ModalForWarehouse';


const ListOfWarehouse = () => {


    const { data: warehouses = [], refetch } = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5001/api/v1/admin/warehouse");
            const data = await res.json();
            return data;
        },
    });

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = warehouses.filter((item) => {
        const lowercaseSearchQuery = searchQuery?.toLowerCase();

        return (
            item?.name?.toLowerCase()?.includes(lowercaseSearchQuery) ||
            item?.slag?.toLowerCase()?.includes(lowercaseSearchQuery)
        );
    });



    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = Math.ceil(filteredData?.length / pageSize);

    const currentData = filteredData.slice(startIndex, endIndex);

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



    const updateStatus = (id, status) => {
        fetch(`http://localhost:5001/api/v1/admin/warehouse/status/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }).then((res) => res.json()).then((data) => {
            Swal.fire(`Seller disable ${status} `, '', 'success');
            refetch()
        })
    }


    const DeleteWarehouse = async (id) => {


        const response = await fetch(`http://localhost:5001/api/v1/admin/warehouse/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            Swal.fire('Seller Deleted', '', 'success');
            refetch();
        } else {
            console.error('Error deleting seller:', response.statusText);
            Swal.fire('Error Deleting Seller', 'An error occurred', 'error');
        }


    };

    const [OpenModal, setOpenModal] = useState(false)

    const handleViewDetails = (ticketId) => {
        setOpenModal(ticketId);
    };





    return (
        <div>
            <div className="mt-4 lg:pr-10 w-full mx-auto overflow-auto">

                <button
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                    onClick={() => handleViewDetails('Add New Warehouse')}
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

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Add New Warehouse
                    </span>
                </button>

                {OpenModal === 'Add New Warehouse' && <ModalForWarehouse OpenModal={OpenModal} setOpenModal={setOpenModal} data={'Add New Warehouse'} refetch={refetch} />}

                <div className="relative w-3/5 my-6">
                    <input
                        type="text"
                        id="Search"
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


                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                                Warehouse Name
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                Address
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                                Status
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tr ">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentData.map((warehouse, index) => (

                                <tr key={index + warehouse._id} className=''>
                                    <td className="px-4 py-3">
                                        <div className='flex gap-2 items-center'>
                                            <img className='h-10 w-10 object-fill'
                                                src={warehouse.img}
                                                srcSet={warehouse.img}
                                                alt="" />
                                            <div>
                                                <h2 className="font-medium text-gray-800  ">
                                                    {warehouse.name}
                                                </h2>
                                                <p
                                                    className="text-sm font-normal text-gray-600 text-gray-400">
                                                    {warehouse.slag}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{warehouse.address}</td>
                                    <td className="px-4 py-3">{!warehouse.status ? (
                                        <button
                                            onClick={() => updateStatus(warehouse._id, true)}
                                            className="inline-flex items-center justify-center py-1 px-4 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                                        >
                                            Disable
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => updateStatus(warehouse._id, false)}
                                            className="inline-flex items-center justify-center py-1 px-4 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                        >
                                            Enable
                                        </button>
                                    )} </td>
                                    <td className="px-4  text-2xl flex gap-2 py-6 items-center text-gray-100">
                                        <MdDelete
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => DeleteWarehouse(warehouse._id)}
                                        />
                                        <BiEdit className="text-yellow-500 cursor-pointer"
                                            onClick={() => handleViewDetails(warehouse?._id)}

                                        />

                                    </td>


                                    {OpenModal === warehouse._id && <div className="h-0 w-0">
                                        <EditWareHouse OpenModal={OpenModal} refetch={refetch} setOpenModal={setOpenModal} data={warehouse} />
                                    </div>}



                                </tr>
                            ))
                        }

                    </tbody>
                </table>
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
        </div>
    );
};

export default ListOfWarehouse;