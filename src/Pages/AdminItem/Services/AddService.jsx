import JoditEditor from 'jodit-react';
import React from 'react';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddService = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setFileName(file.name);
        }
    };

    const dataSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const price = form.price.value;
        const image = form.photo.files[0];
        const message = form.message.value;

        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=2b8c7f515b1f628299764a2ce4c4cb0e`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                const image = imageData.data.url;
                const service = {
                    title,
                    price,
                    message,
                    img: image,
                };
                postService(service, form);
            });
    };

    const postService = (service, form) => {

        fetch(`https://salenow-v2-backend.vercel.app/admin/addservice`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(service),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("success", "Your service Publish Successfully", "success");

                form.reset();
                setPreviewUrl("");
                setFileName("");
            });
    };

    return (
        <div className="px-4 py-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <nav
                aria-label="breadcrumb"
                className="w-full rounded p-4 mb-4 bg-gray-800 text-gray-100"
            >
                <ol className="flex h-8 space-x-2">
                    <li className="flex items-center">
                        <Link
                            rel="noopener noreferrer"
                            to={'/admin'}
                            title="Back to homepage"
                            className="hover:underline"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 pr-1 text-gray-400"
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
                            className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-600"
                        >
                            <path d="M32 30.031h-32l16-28.061z"></path>
                        </svg>
                        <Link
                            rel="noopener noreferrer"
                            to="/admin/servicemanagement"
                            className="flex items-center px-1 capitalize hover:underline"
                        >
                            services
                        </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            fill="currentColor"
                            className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-600"
                        >
                            <path d="M32 30.031h-32l16-28.061z"></path>
                        </svg>
                        <Link
                            rel="noopener noreferrer"
                            to="/admin/services/new-service"
                            className="flex items-center px-1 capitalize hover:underline"
                        >
                            New service
                        </Link>
                    </li>
                </ol>
            </nav>
            <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <h1 className="text-2xl font-bold text-center">
                    Publish a service for you and next
                </h1>
                <div className="p-10 border-2 rounded m-10">
                    <form onSubmit={dataSubmit} className="space-y-4 ">
                        <div>
                            <label className="sr-only text-black" htmlFor="title">
                                service Title
                            </label>
                            <input
                                required
                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                placeholder="Service Name"
                                type="text"
                                id="title"
                                name="title"
                            />
                        </div>
                        <div>
                            <label className="sr-only text-black" htmlFor="title">
                                Service Price
                            </label>
                            <input
                                required
                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                placeholder="Service Price"
                                type="text"
                                id="price"
                                name="price"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
                            >
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="File Preview"
                                        className="mt-2 w-8 h-8"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-8 h-8 text-gray-500 "
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                        />
                                    </svg>
                                )}
                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                                    {fileName ? fileName : " Upload Picture"}
                                </h2>
                                <p className="mt-2 text-xs tracking-wide text-gray-500 ">
                                    Upload Your Photo Only.
                                </p>
                                <input
                                    required
                                    id="dropzone-file"
                                    type="file" accept="application/pdf,image/webp,image/tiff,image/heic,image/gif,image/bmp,image/png,image/jpeg"
                                    name="photo"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        <div>
                            <div>
                                <JoditEditor name="message" id="message"></JoditEditor>
                            </div>
                        </div>
                        <div className="mt-4">
                            {
                                loading ?
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
                                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                                    >
                                        <span className="absolute -end-full transition-all group-hover:end-4">
                                            <BsArrowRight />
                                        </span>

                                        <span className="text-sm font-medium transition-all group-hover:me-4">
                                            Add Service
                                        </span>
                                    </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddService;