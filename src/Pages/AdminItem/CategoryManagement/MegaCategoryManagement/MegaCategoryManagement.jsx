import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BiEdit } from 'react-icons/bi';

const MegaCategoryManagement = () => {

    const { data: megaCategory = [], refetch } = useQuery({
        queryKey: ["megaCategory"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/category/megacategory");
            const data = await res.json();
            return data.rows;
        },
    });


    // status update
    const statusUpdate = (id, status) => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/category/megacategory?id=${id}&status=${status}`, {
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

    const featureStatus = (id, status) => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/category/feature?id=${id}&feature=${status}`, {
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
        const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;
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
        const slag = form.slag.value;

        const imageFormData = new FormData();
        imageFormData.append("image", image.files[0]);
        const imageUrl = await uploadImage(imageFormData);


        const data = {
            image: imageUrl ? imageUrl : editOn?.image,
            name: name,
            slag: slag

        }

        console.log(data, id);

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/feature-image-update?id=${id}`, {
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
            <Link to={'add'} ><button className={style.addBtn}> +Add mega category</button></Link> <br />

            <div className="max-w-screen-xl mx-auto px-4 md:px-8">

                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Photo</th>
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Slag</th>
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Status</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                megaCategory.map((item, idx) => {
                                    const formattedTimeStamp = new Date(item.timeStamp).toLocaleString();
                                    return (
                                        <tr key={idx}>
                                            <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                                <img src={item.image} className="w-10 h-10 rounded-full" />

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.slag}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formattedTimeStamp}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    item.status == 'true' ? <button onClick={() => statusUpdate(item?._id, false)} className="">Active</button> : <button onClick={() => statusUpdate(item?._id, true)} className=''>Deactivate</button>
                                                }


                                            </td>
                                            <td className="px- py-4 items-center whitespace-nowrap">
                                                {
                                                    item.feature == 'true' ? <button onClick={() => featureStatus(item?._id, false)} className="">Feature Active</button> : <button onClick={() => featureStatus(item?._id, true)} className=''>Feature InActive</button>
                                                }

                                                <button
                                                    onClick={() => setEditOn(item)}
                                                    className='text-xl p-1 ml-6'>
                                                    <BiEdit />
                                                </button>
                                                <div className="absolute w-full top-0 left-0">
                                                    <div className={`fixed z-[100] flex items-center justify-center ${editOn?._id === item?._id ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                                                        <div className={`absolute md:w-[500px] w-full rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${editOn?._id === item?._id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                                                            <svg onClick={() => setEditOn(false)} className="mx-auto mr-0 w-8 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#000"></path></g></svg>

                                                            <form onSubmit={(e) => handleEdit(e, item?._id)}>
                                                                <h1 className="text-lg font-semibold text-center mb-4">
                                                                    Edit Mega Category
                                                                </h1>
                                                                <img src={item?.image} alt="" className="w-[100px] h-[100px] rounded" />
                                                                <div className="flex flex-col items-start gap-1">
                                                                    <label className='text-start' htmlFor="photo">Photo</label>
                                                                    <input
                                                                        type="file" name="image" className='border border-gray-500 p-1 rounded mb-3 w-full' />
                                                                </div>

                                                                <div className="flex flex-col items-start gap-1">
                                                                    <label className='text-start' htmlFor="photo">Name</label>
                                                                    <input
                                                                        defaultValue={item.name}
                                                                        type="text" name="name" className='border border-gray-500 p-1 rounded mb-3 w-full' />
                                                                </div>
                                                                <div className="flex flex-col items-start gap-1">
                                                                    <label className='text-start' htmlFor="photo">Slag</label>
                                                                    <input
                                                                        defaultValue={item.slag}
                                                                        type="text" name="slag" className='border border-gray-500 p-1 rounded mb-3 w-full' />
                                                                </div>

                                                                <br />
                                                                <div className="flex justify-start">
                                                                    <button type='submit' className="me-2 rounded bg-green-700 px-6 py-1 text-white">Sibmit</button>
                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

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

export default MegaCategoryManagement;