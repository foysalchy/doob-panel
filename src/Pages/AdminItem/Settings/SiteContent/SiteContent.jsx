import { useQuery } from '@tanstack/react-query';
import BrightAlert from 'bright-alert';
import JoditEditor from "jodit-react";
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const SiteContent = () => {


    const { data: domainVideo, refetch, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/domain-video");
            const data = await res.json();
            return data;
        },
    });

    const { data: domainDoc, refetch: reload, isLoading: loading } = useQuery({
        queryKey: ["domainDoc"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/domain-document");
            const data = await res.json();
            return data.result;
        },
    });


    const { data: buyDomain, refetch: reLoading, isLoading: load } = useQuery({
        queryKey: ["buyDomain"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/buy-domain");
            const data = await res.json();
            return data;
        },
    });

    console.log(buyDomain, 'buy domain');


    const UploadForDomain = (e) => {
        e.preventDefault();
        const url = e.target.url.value

        fetch('https://backend.doob.com.bd/api/v1/admin/add-domain-url', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        }).then((res) => res.json())
            .then((data) => {
                Swal.fire(
                    "Add Domain Url Successful",
                    '',
                    'success'
                )
                refetch()
            })


    }



    const [isHovered, setIsHovered] = useState(false);


    const deleteVideo = (id) => {
        fetch('https://backend.doob.com.bd/api/v1/admin/delete-domain-url', {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then((res) => res.json())
            .then((data) => {
                refetch()
                Swal.fire(
                    "Delete Domain Url Successful",
                    '',
                    'success'
                )
            })
    }


    const submitDomainData = async (e) => {
        e.preventDefault();
        const data = e.target.gideLine.value;
        const time = new Date().getTime();
        const body = {
            data,
            time
        };

        try {
            const response = await fetch("https://backend.doob.com.bd/api/v1/admin/domain-document", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body) // Convert body object to JSON string
            });

            if (response.ok) {
                reload()
                BrightAlert();
            } else {
                // Handle non-successful response
                console.error("Failed to submit domain data:", response.statusText);
            }
        } catch (error) {
            // Handle fetch errors
            console.error("Error submitting domain data:", error);
        }
    };



    const buyingDomain = async (e) => {
        // event defult and need to input data 
        e.preventDefault();
        const url = e.target.url.value
        try {
            const response = await fetch("https://backend.doob.com.bd/api/v1/admin/buy-domain", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url }) // Convert body object to JSON string
            });

            if (response.ok) {
                reLoading()
                BrightAlert();
            } else {
                // Handle non-successful response
                console.error("Failed to submit domain data:", response.statusText);
            }
        } catch (error) {
            // Handle fetch errors
            console.error("Error submitting domain data:", error);
        }

    }



    return (
        <div >
            <fieldset className=" text-gray-100 bg-gray-500 p-10">
                <form onSubmit={UploadForDomain} className=" flex gap-4 w-full justify-around ">
                    <div className=" flex w-full">
                        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700">Provide  iframe </span>
                        <input type="text" name="url" id="url" placeholder="<iframe> Your Url</iframe> " className="flex flex-1  sm:text-sm rounded-r-md focus:ri border-gray-700 text-gray-900  focus:ri flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-gray-400 focus:outline-none focus:shadow-outline" />
                    </div>
                    <button

                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto md:inline-flex bg-gray-400 hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                    >
                        Upload for Domain
                    </button>
                </form>

            </fieldset>


            {
                !isLoading && domainVideo &&

                <div
                    className="mb-2 hover: relative my-20 "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className="flex items-center text_editor justify-center "
                        dangerouslySetInnerHTML={{ __html: domainVideo.DomainUrl }}
                    />
                    {isHovered && (
                        <button onClick={() => deleteVideo(domainVideo._id)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 " >
                            Delete
                        </button>
                    )}
                </div>


            }
            <hr className="my-4 border-gray-500" />
            <form onSubmit={buyingDomain} className="">
                <div>
                    <label for="domain name" class="block text-sm text-gray-900">Domain Name : <span className='text-green-500'>{buyDomain?.url}</span></label>

                    <div class="flex items-center mt-2">
                        <p class="py-2.5 px-3 text-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-r-0 rtl:rounded-r-lg rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-l-lg w-[150px]">Buying Url</p>
                        <input name='url' type="text" placeholder="https://doob.com.bd/" class="block w-full rounded-l-none rtl:rounded-l-lg rtl:rounded-r-none placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                </div>
                <button
                    type="submit"
                    className="block  mt-2 mb-10 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            <hr className="my-4 border-gray-500" />
            <form onSubmit={submitDomainData} className="">
                <JoditEditor name="gideLine" id="message"></JoditEditor>

                <button
                    type="submit"
                    className="block  mt-2 mb-10 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
            <hr className="my-4 border-gray-500" />

            <div
                className='text_editor'
                dangerouslySetInnerHTML={{
                    __html: domainDoc?.data,
                }}
            />
        </div>
    );
};

export default SiteContent;