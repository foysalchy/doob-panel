import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { GiSaveArrow } from 'react-icons/gi';
import { RxCrossCircled } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SellerDomainManagement = () => {





    const openModal = (id) => {
        fetch(`http://localhost:5000/admin/seller/pass/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: `${data.password}`,
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `rgba(0,0,123,0.4)url("https://dai.ly/kdsm8Mf1dO7owozzml8")
    left top
    no-repeat
  `
                })
            })
            .catch(error => {
                // Handle errors, e.g., show an error message
                console.error('Fetch error:', error);
            });
    };



    const { data: seller = [], refetch, isLoading } = useQuery({
        queryKey: ["seller"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/admin/seller");
            const data = await res.json();
            return data;
        },
    });

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = seller.filter(
        (item) =>
            item?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item._id.toString().includes(searchQuery) || item?.domain?.toString().includes(searchQuery)
    );


    const [editingSellerId, setEditingSellerId] = useState(null);
    const [editedDomain, setEditedDomain] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(true);

    const handleEditClick = (sellerId, defaultDomain) => {
        setEditingSellerId(sellerId);
        setEditedDomain(defaultDomain);
    };

    const handleSaveClick = (sellerId) => {
        // Perform URL validation
        const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = domainRegex.test(editedDomain);

        if (isValid) {
            // Perform save logic here
            console.log(`New domain for seller ${sellerId}: ${editedDomain}`);
            setIsValidUrl(true);
        } else {
            setIsValidUrl(false);
            return; // Do not proceed with save if the URL is not valid
        }

        // Reset editing state
        setEditingSellerId(null);
        setEditedDomain('');
    };
    const handleCross = (sellerId) => {
        setEditingSellerId(null);
        setEditedDomain('');
    }

    return (
        <div className="">
            <nav
                aria-label="breadcrumb"
                className="w-full my-20 p-4 mb-4 rounded dark:bg-gray-800 dark:text-gray-100"
            >
                <ol className="flex h-8 space-x-2">
                    <li className="flex items-center">
                        <Link
                            rel="noopener noreferrer"
                            to={"/admin/dashboard"}
                            title="Back to homepage"
                            className="hover:underline"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 pr-1 dark:text-gray-400"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            fill="currentColor"
                            className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
                        >
                            <path d="M32 30.031h-32l16-28.061z"></path>
                        </svg>
                        <Link
                            rel="noopener noreferrer"
                            to={"/admin/settings"}
                            className="flex items-center px-1 capitalize hover:underline"
                        >
                            {" "}
                            Settings
                        </Link>
                    </li>
                </ol>
            </nav>


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

            <section className=" px-4 mx-auto">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 ">All seller</h2>
                    <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
                        {seller?.length}
                    </span>
                </div>
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block  py-2 ml-4">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className=" divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                    />
                                                    <span>Name</span>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <button className="flex items-center gap-x-2">
                                                    <span>Status</span>
                                                </button>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                <button className="flex items-center gap-x-2">
                                                    <span>Domain Name</span>
                                                </button>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Email address
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Password
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y  divide-gray-200 ">
                                        {filteredData.map((seller) => (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <input

                                                            type="checkbox"
                                                            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                        />
                                                        <div className="flex items-center gap-x-2">
                                                            <div>
                                                                <h2 className="font-medium text-gray-800  ">
                                                                    {seller?.name}
                                                                </h2>
                                                                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                                                    {seller?.userId}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        <h2 className="text-sm font-normal text-emerald-500">
                                                            Active
                                                        </h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                    {seller?.domain && <div>
                                                        {editingSellerId === seller.userId ? (
                                                            <div className='flex gap-2 items-center'>
                                                                <input
                                                                    type="text"
                                                                    value={editedDomain}
                                                                    onChange={(e) => {
                                                                        setEditedDomain(e.target.value);
                                                                        setIsValidUrl(true); // Reset validation on input change
                                                                    }}
                                                                    className={`border px-2 py-1 ${isValidUrl ? '' : 'border-red-500'}`}
                                                                />
                                                                <div className="flex items-center gap-x-2">
                                                                    <button
                                                                        onClick={() => handleSaveClick(seller.userId)}
                                                                        className="transition-colors duration-200 text-green-500 hover:text-green-700 focus:outline-none text-xl"
                                                                    >
                                                                        <GiSaveArrow />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleCross(seller.userId)}
                                                                        className="transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none text-xl"
                                                                    >
                                                                        <RxCrossCircled />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className='flex gap-2 items-center'>
                                                                {seller?.domain}
                                                                <div className="flex items-center gap-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(seller.userId, seller.domain)}
                                                                        className="transition-colors duration-200 hover:text-yellow-500 text-yellow-700 focus:outline-none"
                                                                    >
                                                                        <BiEditAlt className='text-xl' />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {editingSellerId === seller.userId && <div>

                                                            {!isValidUrl && (
                                                                <p className="text-red-500 text-xs mt-1">Please enter a valid domain.</p>
                                                            )}
                                                        </div>}


                                                    </div>}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                    {seller?.email}
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <button title={seller.userId} onClick={() => openModal(seller.userId)} className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">

                                                            ******
                                                        </button>
                                                    </div>

                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};


export default SellerDomainManagement;