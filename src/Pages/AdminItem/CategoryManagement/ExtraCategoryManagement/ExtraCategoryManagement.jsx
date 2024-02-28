import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ExtraCategoryManagement = () => {
    const style = {
        addBtn: 'bg-black text-white px-4 py-2 flex items-center rounded-lg',

    }

    const { data: extraCategory = [], refetch } = useQuery({
        queryKey: ["extraCategory"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/category/extraCategories");
            const data = await res.json();
            return data.rows;
        },
    });

    // status update
    const statusUpdate = (id, status) => {
        fetch(`https://backend.doob.com.bd/api/v1/admin/category/extraCategory?id=${id}&status=${status}`, {
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


    // status update
    const onDelete = (id) => {
        fetch(`https://backend.doob.com.bd/api/v1/admin/category/extraCategory?id=${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'status update');
                Swal.fire(" Delete", "", "success");
                refetch()
            });
    }



    return (
        <div>
            <Link to={'add'} ><button className={style.addBtn}> Add mega category</button></Link>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">

                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Photo </th>
                                <th className="py-3 px-6">Extra Category </th>
                                <th className="py-3 px-6">Mini Category</th>
                                <th className="py-3 px-6">Sub Category</th>
                                <th className="py-3 px-6">Mega Category</th>
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Status</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                extraCategory.map((item, idx) => {
                                    const formattedTimeStamp = new Date(item.timeStamp).toLocaleString();
                                    return (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={item?.img} alt="" className="ring-1 ring-gray-400 w-[60px] object-cover h-[60px] rounded" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.extraCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.miniCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.subCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.megaCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formattedTimeStamp}</td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    item.status == 'true' ? <button onClick={() => statusUpdate(item?._id, false)} className="">Active</button> : <button onClick={() => statusUpdate(item?._id, true)} className=''>Deactivate</button>
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className='px-3 py-2 bg-red-500 text-white rounded-lg text-xs' onClick={() => onDelete(item._id)}>Delete </button>
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

export default ExtraCategoryManagement;