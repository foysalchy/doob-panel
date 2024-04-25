import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SubCategoryManagement = () => {



    const { data: subCategory = [], refetch } = useQuery({
        queryKey: ["subCategory"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/category/subcategories");
            const data = await res.json();
            return data.rows;
        },
    });

    // status update
    const statusUpdate = (id, status) => {
        fetch(`https://backend.doob.com.bd/api/v1/admin/category/subcategory?id=${id}&status=${status}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'status update');
                Swal.fire(" Status Updated", "", "success");
                refetch()
            });
    }

    const style = {
        addBtn: 'bg-black text-white px-4 py-2 flex items-center rounded-lg',

    }


    const [editOn, setEditOn] = useState(false);

    const uploadImage = async (formData) => {
        const url = `https://backend.doob.com.bd/api/v1/image/upload-image`;
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const imageData = await response.json();
        return imageData.imageUrl;
    };

    const handleEdit = async (e, id) => {
        e.preventDefault();
        const form = e.target;
        const image = form.image;
        const name = form.name.value;

        const imageFormData = new FormData();
        imageFormData.append("image", image.files[0]);
        const imageUrl = await uploadImage(imageFormData);


        const data = {
            img: imageUrl ? imageUrl : editOn?.img,
            subCategory: name,

        }

        console.log(data, id);

        fetch(`https://backend.doob.com.bd/api/v1/admin/feature-image-update?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            Swal.fire(`Category update `, '', 'success');
            refetch()
        })

        setEditOn(false);
    }

    return (
        <div>
            <Link to={'add'} ><button className={style.addBtn}> Add mega category</button></Link>

            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Photo</th>
                                <th className="py-3 px-6">Sub Category Name</th>
                                <th className="py-3 px-6">Mega Category Id</th>
                                <th className="py-3 px-6">Mega Category Name</th>
                                <th className="py-3 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                subCategory.map((item, idx) => {
                                    // const formattedTimeStamp = new Date(item.timeStamp * 1000).toLocaleString();
                                    return (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={item?.img} alt="" className="ring-1 ring-gray-400 w-[60px] object-cover h-[60px] rounded" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.subCategory}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.megaCategoryId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.megaCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    item.status == 'true' ? <button onClick={() => statusUpdate(item?._id, false)} className="">Active</button> : <button onClick={() => statusUpdate(item?._id, true)} className=''>Deactivate</button>
                                                }

                                                <button
                                                    onClick={() => setEditOn(item)}
                                                    className='text-xl p-1 ml-6'>
                                                    <BiEdit />
                                                </button>
                                            </td>

                                            <div className="absolute w-full top-0 left-0">
                                                <div className={`fixed z-[100] flex items-center justify-center ${editOn?._id === item?._id ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                                                    <div className={`absolute md:w-[500px] w-full rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${editOn?._id === item?._id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                                                        <svg onClick={() => setEditOn(false)} className="mx-auto mr-0 w-8 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#000"></path></g></svg>

                                                        <form onSubmit={(e) => handleEdit(e, item?._id)}>
                                                            <h1 className="text-lg font-semibold text-center mb-4">
                                                                Edit Sub Category
                                                            </h1>
                                                            <img src={item?.img} alt="" className="w-[100px] h-[100px] rounded" />
                                                            <div className="flex flex-col items-start gap-1">
                                                                <label className='text-start' htmlFor="photo">Photo</label>
                                                                <input
                                                                    type="file" name="image" className='border border-gray-500 p-1 rounded mb-3 w-full' />
                                                            </div>

                                                            <div className="flex flex-col items-start gap-1">
                                                                <label className='text-start' htmlFor="photo">Name</label>
                                                                <input
                                                                    defaultValue={item?.subCategory}
                                                                    type="text" name="name" className='border border-gray-500 p-1 rounded mb-3 w-full' />
                                                            </div>

                                                            <br />
                                                            <div className="flex justify-start">
                                                                <button type='submit' className="me-2 rounded bg-green-700 px-6 py-1 text-white">Sibmit</button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>
                                            </div>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default SubCategoryManagement;