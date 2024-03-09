import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditService from './EditService';
import { BsEye } from 'react-icons/bs';

const ManageService = () => {


    const { data: services = [], refetch, isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/services");
            const data = await res.json();
            return data;
        },
    });



    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = services.filter(
        (item) =>
            item.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            item._id.toString().includes(searchQuery)
    );



    const ActiveHandle = (id) => {

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/service/status/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                refetch();
                Swal.fire("success", "Your Service Publish Successfully", "success");
            });
    };

    const DeactiveHandle = (id) => {

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/service/unstatus/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                refetch();
                Swal.fire("success", "Your Service Unpublish Successfully", "success");
            });
    };


    const DeleteHandle = (id) => {

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/service/delete/${id}`, {
            method: "Delete",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                refetch();
                Swal.fire("success", "Your Service Delete Successfully", "success");
            });
    };




    const [OpenModal, setOpenModal] = useState(false)

    const handleViewDetails = (ticketId) => {
        setOpenModal(ticketId);
    };




    return (
        <div className="">


            <Link
                className="group relative inline-flex mb-10 items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/admin/services/add-service"
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
                    Add Service
                </span>
            </Link>

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

            <section className=" px-4 ">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 ">All Services</h2>
                    <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
                        {services?.length}
                    </span>
                </div>
                {filteredData.length ?
                    <div className="flex flex-col mt-6 w-full">
                        <div className="overflow-x-auto ">
                            <div className="  py-2 pr-10">
                                <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
                                    <table className=" w-full divide-y divide-gray-200 divide-gray-700">
                                        <thead className="bg-gray-50 ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                    <div className="flex items-center gap-x-3">

                                                        <span>Name</span>
                                                    </div>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Price</span>
                                                    </button>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Status</span>
                                                    </button>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                                >
                                                    Action
                                                </th>
                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y  divide-gray-200 ">
                                            {filteredData.map((service) => (
                                                <tr>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">

                                                            <div className="flex items-center gap-x-2">
                                                                <img
                                                                    className="object-cover w-10 h-10 rounded"
                                                                    srcSet={service?.img}
                                                                    alt=""
                                                                />
                                                                <div>
                                                                    <h2 className="font-medium text-gray-800  ">
                                                                        {service?.title}
                                                                    </h2>
                                                                    <p className="text-sm font-normal text-gray-600 text-gray-400">
                                                                        {service._id}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400">
                                                        {service?.price}
                                                    </td>
                                                    {service.status ?
                                                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <button onClick={() => DeactiveHandle(service?._id)} className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                <h2 className="text-sm font-normal text-emerald-500">
                                                                    Active
                                                                </h2>
                                                            </button>
                                                        </td> :
                                                        <td className="px-12 py-4 text-sm font-medium text-red-700 whitespace-nowrap">
                                                            <button onClick={() => ActiveHandle(service._id)} className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                <h2 className="text-sm font-normal text-red-500">
                                                                    Deactive
                                                                </h2>
                                                            </button>
                                                        </td>
                                                    }
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            <button onClick={() => DeleteHandle(service._id)} className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none">
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
                                                            <button onClick={() => handleViewDetails(service._id)} className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none">
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
                                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <Link to={`/service/${service?._id}`}>
                                                                <BsEye className=" transition-colors text-xl duration-200 text-green-500 hover:text-green-700 focus:outline-none" />
                                                            </Link>
                                                        </div>
                                                    </td>

                                                    {OpenModal === service._id && <div className="h-0 w-0">
                                                        <EditService OpenModal={OpenModal} refetch={refetch} setOpenModal={setOpenModal} BlogInfo={service} />
                                                    </div>}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <h1 className='text-2xl font-bold my-4'>
                        Sorry No Data Found
                    </h1>
                }
            </section>


        </div>
    );
};

export default ManageService;