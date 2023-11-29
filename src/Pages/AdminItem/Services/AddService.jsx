import { useQuery } from '@tanstack/react-query';
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



    const { data: categories = [], refetch } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/category");
            const data = await res.json();
            return data;
        },
    });









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

    const dataSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const price = form.price.value;
        const image = form.photo.files[0];
        const message = form.message.value;
        const category = form.category.value;
        const subscriptionPeriod = form.subscriptionPeriod.value;
        const MetaImage = form.MetaImage.files[0]
        const MetaTag = form.MetaTag.value
        const MetaDescription = form.MetaDescription.value


        const imageFormData = new FormData();
        imageFormData.append("image", image);
        const imageUrl = await uploadImage(imageFormData);

        const metaImageFormData = new FormData();
        metaImageFormData.append("image", MetaImage);
        console.log(metaImageFormData, imageFormData);

        const metaImageUrl = await uploadImage(metaImageFormData);

        const service = {
            title,
            price,
            message,
            img: imageUrl,
            category,
            subscriptionPeriod,
            MetaTag,
            MetaDescription,
            MetaImage: metaImageUrl,
        };

        console.log(metaImageUrl);

        postService(service, form);

    };


    async function uploadImage(formData) {
        const url = "http://localhost:5000/api/v1/image/upload-image";
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const imageData = await response.json();
        return imageData.imageUrl;
    }

    const postService = (service, form) => {

        fetch(`http://localhost:5000/api/v1/admin/addservice`, {
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
        <div>

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
                        <div className="relative mt-1.5">
                            <select
                                type="text"
                                id="Category"
                                name="category"
                                className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                                placeholder="Select a category"
                            >
                                <option selected disabled value="Select Service Category">Select Service Category</option>
                                {categories?.map((category, i) => (
                                    <option value={category?.title}>{category?.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative mt-1.5">
                            <select
                                type="text"
                                list="subscriptionPeriod"
                                id="subscriptionPeriod"
                                name="subscriptionPeriod"
                                className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                                placeholder="Select Subscription Period"
                            >
                                <option disabled selected className="" value="">Select Service Parched Time</option>
                                <option value="One Time">One Time</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
                            >
                                {previewUrl ? (
                                    <img
                                        srcSet={previewUrl}
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
                                    type="file" accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
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


                        <div>
                            <label className="sr-only text-black" htmlFor="title">
                                Meta Tag
                            </label>
                            <input
                                required
                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                placeholder="Meta Tag"
                                type="text"
                                id="MetaTag"
                                name="MetaTag"
                            />
                        </div>

                        <div>
                            <label className="sr-only text-black" htmlFor="title">
                                Meta Description
                            </label>
                            <textarea
                                required
                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                placeholder="Meta Description"
                                type="text"
                                id="MetaDescription"
                                name="MetaDescription"
                            />
                        </div>
                        <div>
                            <label className="sr-only text-black" htmlFor="title">
                                Meta Image'
                            </label>
                            <input
                                required
                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                placeholder="Meta Description"
                                type="file"
                                id="MetaImage"
                                name="MetaImage"
                            />

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