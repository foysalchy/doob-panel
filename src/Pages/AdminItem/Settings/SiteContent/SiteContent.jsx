import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const SiteContent = () => {


    const { data: domainVideo, refetch, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/domain-video");
            const data = await res.json();
            return data;
        },
    });


    const UploadForDomain = (e) => {
        e.preventDefault();
        const url = e.target.url.value

        fetch('https://salenow-v2-backend.vercel.app/api/v1/admin/add-domain-url', {
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
        fetch('https://salenow-v2-backend.vercel.app/api/v1/admin/delete-domain-url', {
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
                        className="flex items-center justify-center "
                        dangerouslySetInnerHTML={{ __html: domainVideo.DomainUrl }}
                    />
                    {isHovered && (
                        <button onClick={() => deleteVideo(domainVideo._id)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 " >
                            Delete
                        </button>
                    )}
                </div>


            }

        </div>
    );
};

export default SiteContent;