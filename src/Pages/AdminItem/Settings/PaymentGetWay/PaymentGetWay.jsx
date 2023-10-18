import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";

const PaymentGetWay = () => {



    const { data: getaway = [], refetch, isLoading } = useQuery({
        queryKey: ["getaway"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/admin/getaway");
            const data = await res.json();
            return data;
        },
    });


    const dataSubmit = (event) => {
        isLoading
        event.preventDefault();

        // Collect all input values based on the selected media
        const formData = {
            Getaway: selectedMedia,
            // Add other fields based on the selected media
            ...(selectedMedia === 'Bkash' && {
                BaseURL: event.target.BaseURL.value,
                key: event.target.key.value,
                Username: event.target.Username.value,
                Password: event.target.Password.value,
                Secret: event.target.Secret.value,
            }),
            ...(selectedMedia === 'Nogod' && {
                apiVersion: event.target.apiVersion.value,
                BaseURL: event.target.BaseURL.value,
                CallbackURL: event.target.CallbackURL.value,
                MerchantID: event.target.MerchantID.value,
                MerchantNumber: event.target.MerchantNumber.value,
                PrivateKey: event.target.PrivateKey.value,
                PublicKey: event.target.PublicKey.value,
            }),
            ...(selectedMedia === 'AmarPay' && {
                BaseURL: event.target.BaseURL.value,
                StoreID: event.target.StoreID.value,
                SignatureKey: event.target.SignatureKey.value,
            }),
        };


        console.log('Form Data:', formData);

        fetch(`http://localhost:5000/admin/getaway`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Your Getaway Upload Successfully", "", "success");

                refetch();
                form.reset();
            });

        event.target.reset();



    };

    const [selectedMedia, setSelectedMedia] = useState('Choose your getaway');

    const handleGetaway = (event) => {
        const selectedValue = event.target.value;
        setSelectedMedia(selectedValue);
    };


    const deleteHandel = (id) => {
        fetch(`http://localhost:5000/admin/getaway/${id}`, {
            method: "Delete",
            headers: {
                "content-type": "application/json",
            },

        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Your Getaway Delete Successfully", "", "success");
                refetch();
            });

    }


    return (
        <div>
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



                <div className="my-10">
                    <h1 className="text-2xl font-bold text-center">
                        Publish a Category for you and next
                    </h1>
                    <div className="p-10 border-2  rounded m-10">
                        <form onSubmit={dataSubmit} className="w-full ">

                            <div className='my-4'>
                                <label className="sr-only text-black" htmlFor="title">Select an option</label>
                                <select name='Media' onChange={handleGetaway}
                                    value={selectedMedia} id="countries" className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline">
                                    <option disabled>Choose your getaway</option>
                                    <option value="Bkash">Bkash</option>
                                    <option value="AmarPay">AmarPay</option>
                                    <option value="Nogod">Nogod </option>

                                </select>
                            </div>
                            {selectedMedia === 'Bkash' &&
                                <div>
                                    <div>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}   Base URL
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Base URL'}
                                            type="text"
                                            id="title"
                                            name="BaseURL"
                                        />
                                    </div>
                                    <div className='my-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  key
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + '  key'}
                                            type="text"
                                            id="title"
                                            name="key"
                                        />
                                    </div>

                                    <div className='my-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Username
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + '  Username'}
                                            type="text"
                                            id="title"
                                            name="Username"
                                        />
                                    </div>
                                    <div className='my-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia} Password
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + '  Password'}
                                            type="text"
                                            id="title"
                                            name="Password"
                                        />
                                    </div>
                                    <div className='my-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia} Secret
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + '  Secret'}
                                            type="text"
                                            id="title"
                                            name="Secret"
                                        />
                                    </div>
                                </div>
                            }
                            {
                                selectedMedia === 'Nogod' &&
                                <div>
                                    <div>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Api Version*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' apiVersion*'}
                                            type="text"
                                            id="title"
                                            name="apiVersion"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Base URL*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Base URL*'}
                                            type="text"
                                            id="title"
                                            name="BaseURL"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Callback URL*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Callback URL*'}
                                            type="text"
                                            id="title"
                                            name="CallbackURL"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Merchant ID*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Merchant ID*'}
                                            type="text"
                                            id="title"
                                            name="MerchantID"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Merchant Number*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Merchant Number*'}
                                            type="text"
                                            id="title"
                                            name="MerchantNumber"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Private Key*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Private Key*'}
                                            type="text"
                                            id="title"
                                            name="PrivateKey"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Public Key*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Public Key*'}
                                            type="text"
                                            id="title"
                                            name="PublicKey"
                                        />
                                    </div>
                                </div>
                            }
                            {
                                selectedMedia === 'AmarPay' &&
                                <div>
                                    <div className=''>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Base URL*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Base URL*'}
                                            type="text"
                                            id="title"
                                            name="BaseURL"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Store ID*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Store ID*'}
                                            type="text"
                                            id="title"
                                            name="StoreID"
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className="sr-only text-black" htmlFor="title">
                                            {selectedMedia}  Signature Key*
                                        </label>
                                        <input
                                            required
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            placeholder={selectedMedia + ' Signature Key*'}
                                            type="text"
                                            id="title"
                                            name="SignatureKey"
                                        />
                                    </div>
                                </div>
                            }


                            <div className="mt-4">
                                {isLoading ? <button type="button" className="bg-gray-800  py-2.5 px-7 rounded-lg text-white font-bold hover:bg-gray-900 hover:cursor-pointer" disabled>
                                    <div className="flex items-center justify-center m-[10px]">
                                        <div className="h-5 w-5 animate-spin rounded-full border-white border-4"></div>
                                        <div className="ml-2"> Processing... </div>
                                    </div>
                                </button>
                                    :
                                    <button
                                        type="submit"
                                        className="bg-gray-800  py-2.5 px-7 rounded-lg text-white font-bold hover:bg-gray-900 hover:cursor-pointer ">
                                        Submit
                                    </button>}

                            </div>
                        </form>
                    </div>
                </div>

                <div className='border my-10 p-10'>
                    <p className='text-xl font-bold text-center'>You are upload {getaway.length} Account Added </p>
                    <div className='flex items-center justify-center gap-4 my-4 '>

                        {
                            getaway.map(get => (
                                <div>
                                    {get.Getaway === 'Bkash' && <div className="group border relative block bg-white">
                                        <img
                                            alt="Developer"
                                            src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon-1536x1452.png"
                                            className="absolute inset-0 p-4 object-cover opacity-75 transition-opacity group-hover:opacity-20"
                                        />

                                        <div className="relative p-4 sm:p-6 lg:p-8">


                                            <div className="">
                                                <button
                                                    onClick={() => deleteHandel(get._id)}
                                                    className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    {get.Getaway === 'Nogod' &&
                                        <div className="group relative block border  bg-white">
                                            <img
                                                alt="Developer"
                                                src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png"
                                                className="absolute inset-0 w-full mt-4 opacity-75 transition-opacity group-hover:opacity-20"
                                            />

                                            <div className="relative p-4 sm:p-6 lg:p-8">


                                                <div className="">
                                                    <button
                                                        onClick={() => deleteHandel(get._id)}
                                                        className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {get.Getaway === 'AmarPay' && <div className="group relative block border  bg-white">
                                        <img
                                            alt="Developer"
                                            src="https://play-lh.googleusercontent.com/xA5zXoyQrqDjgz8bef64gAvnBpofTELWWWXYkuF3t5WnPADHv5Y91A8x51Z0RHJnLzM"
                                            className="absolute inset-0 p-4 w-full  opacity-75 transition-opacity group-hover:opacity-20"
                                        />

                                        <div className="relative p-4 sm:p-6 lg:p-8">


                                            <div className="">
                                                <button
                                                    onClick={() => deleteHandel(get._id)}
                                                    className="translate-y-8 transform opacity-0 transition-all bg-red-500 p-2 text-white group-hover:translate-y-0 group-hover:opacity-100"
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            ))
                        }
                    </div>
                </div>


            </div>
        </div>
    );
};

export default PaymentGetWay;