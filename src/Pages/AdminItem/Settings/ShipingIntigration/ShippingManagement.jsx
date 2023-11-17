import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const ShippingManagement = () => {




    const { data: ships = [], refetch, isLoading } = useQuery({
        queryKey: ["getaway"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/allShippings");
            const data = await res.json();
            return data;
        },
    });


    const [selectedMedia, setSelectedMedia] = useState('Choose your Api');
    const [disabled, setDisable] = useState(true)

    const handleGetaway = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue == 'Choose your getaway') {
            setDisable(true)

        }
        else {
            setDisable(false);
            setSelectedMedia(selectedValue);

        }
    };





    const dataSubmit = (event) => {
        event.preventDefault();
        const name = selectedMedia
        const api = event.target.api.value
        const key = event.target.key.value
        const secretKey = event.target.key.value

        const data = {
            name,
            api,
            key,
            secretKey
        }

        fetch('https://salenow-v2-backend.vercel.app/api/v1/admin/shipping-interrogation', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === true) {
                    Swal.fire(
                        'Shipping interrogation Successful',
                        '',
                        'success'
                    )
                    refetch()
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Already have it!',
                        text: '',
                    });

                }

            })
    }



    const deleteHandel = (id) => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/removeShipping/${id}`, {
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
            <div>
                <div className="my-10">
                    <h1 className="text-2xl font-bold text-center">
                        Publish a Category for you and next
                    </h1>
                    <div className="p-10 bg-[#d3edc1] border-2  rounded m-10">
                        <form onSubmit={dataSubmit} className="w-full ">

                            <div className='my-4'>
                                <label className="sr-only text-black" htmlFor="title">Select an option</label>
                                <select name='Media' onChange={handleGetaway}
                                    value={selectedMedia} id="countries" className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline">
                                    <option disabled>Choose your Api</option>
                                    <option value="Redx">Redx</option>
                                    <option value="Steadfast">Steadfast </option>
                                </select>
                            </div>

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
                                        name="api"
                                    />
                                </div>
                                <div className='my-4'>
                                    <label className="sr-only text-black" htmlFor="title">
                                        {selectedMedia}  Api Key
                                    </label>
                                    <input
                                        required
                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                        placeholder={selectedMedia + '  Api Key'}
                                        type="text"
                                        id="title"
                                        name="key"
                                    />
                                </div>

                                <div className='my-4'>
                                    <label className="sr-only text-black" htmlFor="title">
                                        {selectedMedia}  Secret-Key
                                    </label>
                                    <input
                                        required
                                        className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                        placeholder={selectedMedia + '  Secret-Key'}
                                        type="text"
                                        id="title"
                                        name="secretKey"
                                    />
                                </div>

                            </div>



                            <div className="mt-4">
                                {
                                    isLoading ?
                                        <button disabled className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                                            <span className="text-sm font-medium">
                                                Loading...
                                            </span>
                                            <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            </svg>
                                        </button>

                                        :
                                        <button type='submit'
                                            disabled={selectedMedia == 'Choose your Api'}
                                            className="group relative inline-flex items-center overflow-hidden rounded disabled:bg-gray-400 bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                                        >
                                            <span className="absolute -end-full transition-all group-hover:end-4">
                                                <BsArrowRight />
                                            </span>

                                            <span className="text-sm font-medium transition-all group-hover:me-4">
                                                Upload Shipping Information
                                            </span>
                                        </button>
                                }

                            </div>
                        </form>
                    </div>

                    <div className='border my-10 p-10'>

                        <div className='flex items-center justify-center gap-4 my-4 '>

                            {
                                ships.map(get => (
                                    <div>

                                        {get.name === 'Redx' && <div className="group border relative block bg-white">
                                            <img
                                                alt="Developer"
                                                src="https://logowik.com/content/uploads/images/redx2046.jpg"
                                                className="absolute inset-0 py-3 object-cover opacity-75 flex justify-center items-center transition-opacity group-hover:opacity-20"
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
                                        {get.name === 'Steadfast' && <div className="group border relative block bg-white">
                                            <img
                                                alt="Developer"
                                                src="https://play-lh.googleusercontent.com/9OYsIvc-iKHte4jqVe-c4sA0vNL-tljBDVPguou6B-qdxQgSKpj8pZ7ZYh6MYEbawbo"
                                                className="absolute inset-0 p-2 object-cover opacity-75 flex justify-center items-center transition-opacity group-hover:opacity-20"
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

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShippingManagement;