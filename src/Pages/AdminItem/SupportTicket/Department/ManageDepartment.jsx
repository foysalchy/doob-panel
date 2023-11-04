import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ManageDepartment = ({ ManageDepartment, setManageDepartment }) => {


    const { data: departments = [], refetch, isLoading } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/departments");
            const data = await res.json();
            return data;
        },
    });


    const DeleteHandle = (id) => {

        fetch(`http://localhost:5000/api/v1/admin/delete_department/${id}`, {
            method: "DELETE"
        }).then(() => {
            refetch()
            Swal.fire({
                icon: 'success',
                title: 'Deleted Successfully!',
                showConfirmButton: false,
                timer: 1000
            })
        })

    };

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = departments.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item._id.toString().includes(searchQuery)
    );


    const TdStyle = {
        ThStyle: `w-1/6 bg-gray-900 border-l border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4`,
        TdStyle: `border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark`,
        TdButton: `inline-block px-6 py-2 border rounded border-primary text-primary hover:bg-primary hover:text-white`,
    }



    return (
        <div className={ManageDepartment ? 'flex' : 'hidden'}>
            <div className="container mx-auto py-20">

                <div
                    className={`fixed  z-40 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${ManageDepartment ? "block" : "hidden"
                        }`}
                >


                    <div

                        className="w-full h-[80%] overflow-scroll max-w-[570px] rounded-[20px] bg-white p-8 py-4 text-center "
                    >

                        <div className='flex justify-between items-start py-2'>
                            <div className="flex mt-2 flex-wrap border items-stretch w-8/12 h-full mb-6 relative">
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
                                <input
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    type="text"
                                    className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border  border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none  text-gray-500 font-thin"
                                    placeholder="Search"
                                />
                            </div>
                            <button onClick={() => setManageDepartment(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                                </svg>
                            </button>
                        </div>

                        <table className='overflow-scroll py-4'>
                            <thead className='text-center '>
                                <tr>
                                    <th className="w-1/6 bg-gray-900 border-l border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4"> Name of Department </th>
                                    <th className="w-1/6 bg-gray-900 border-l border-transparent py-4 px-3 text-lg font-semibold text-white  lg:px-4"> Action </th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    filteredData?.map((department) => (

                                        <tr>
                                            <td className="border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark">{department.name}</td>
                                            <td className="border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium text-dark">
                                                <button onClick={() => DeleteHandle(department._id)} className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none">
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ManageDepartment;