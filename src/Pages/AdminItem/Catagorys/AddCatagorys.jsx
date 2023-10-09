import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AddCatagorys = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preDeleteUrl, setPreDeleteUrl] = useState(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        data: category = [],
        refetch,

    } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await fetch(
                "http://localhost:5000/admin/category",
            );
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
                setPreDeleteUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setFileName(file.name);
        }
    };

    const dataSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const title = form.categoryName.value;
        const image = form.photo.files[0];


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
                const category = {
                    title,
                    img: image,
                };
                PostCategory(category, form);
            });
    };

    const PostCategory = (category, form) => {

        fetch(`http://localhost:5000/admin/category`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(category),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("success", "Your Category Publish Successfully", "success");

                form.reset();
                setPreDeleteUrl("");
                setFileName("");
                refetch()
            });
    };


    const DeleteCategory = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/admin/category`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("delete successful");
                console.log(data);
                refetch()
            });
    };



    return (
        <div className='w-full'>
            <div className="">
                <h1 className="text-2xl font-bold text-center">
                    Publish a Category for you and next
                </h1>
                <div className="p-10 border-2  rounded m-10">
                    <form onSubmit={dataSubmit} className="w-full ">
                        <div>
                            <label className="sr-only text-black" htmlFor="title">
                                Category Name
                            </label>
                            <input
                                required
                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                placeholder="Category Name"
                                type="text"
                                id="title"
                                name="categoryName"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
                            >
                                {preDeleteUrl ? (
                                    <img
                                        src={preDeleteUrl}
                                        alt="File PreDelete"
                                        className="mt-2 w-8 h-8"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        DeleteBox="0 0 24 24"
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
                                    type="file"
                                    name="photo"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>


                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                {loading ? "Loading.." : "Publish Category"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="overflow-x-auto">
                    {category.length ? <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left">
                            <tr>

                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Category Image
                                </th>

                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Category Name
                                </th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                category.map((cate, index) => (
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            <img className='w-10 h-10 rounded object-fill' src={cate.img} alt="" />
                                        </td>


                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{cate.title}</td>
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <button
                                                onClick={() => DeleteCategory(cate._id)}
                                                className="inline-block rounded  bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            }





                        </tbody>
                    </table> : <h1>
                        No Data Found
                    </h1>}
                </div>
            </div>
        </div>
    );
};


export default AddCatagorys;