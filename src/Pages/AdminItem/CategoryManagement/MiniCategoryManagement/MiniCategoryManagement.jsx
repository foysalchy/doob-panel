import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MiniCategoryManagement = () => {
    const style = {
        addBtn: 'bg-black text-white px-4 py-2 flex items-center rounded-lg',

    }


    const { data: miniCategory = [], refetch } = useQuery({
        queryKey: ["miniCategory"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/category/miniCategories");
            const data = await res.json();
            return data.rows;
        },
    });

    // status update
    const statusUpdate = (id, status) => {
        fetch(`http://localhost:5000/api/v1/admin/category/miniCategory?id=${id}&status=${status}`, {
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

    return (
        <div>
            <Link to={'add'} ><button className={style.addBtn}> Add mega category</button></Link>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">

                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Photo</th>
                                <th className="py-3 px-6">Mini Category</th>
                                <th className="py-3 px-6">Sub Category</th>
                                <th className="py-3 px-6">Mega Category</th>
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Status</th>
                                <th className="py-3 px-6"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                miniCategory.map((item, idx) => {
                                    const formattedTimeStamp = new Date(item.timeStamp).toLocaleString();
                                    return (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={item?.img} alt="" className="ring-1 ring-gray-400 w-[60px] object-cover h-[60px] rounded" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.miniCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.subCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.megaCategoryName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formattedTimeStamp}</td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    item.status == 'true' ? <button onClick={() => statusUpdate(item?._id, false)} className="">Active</button> : <button onClick={() => statusUpdate(item?._id, true)} className=''>Deactivate</button>
                                                }
                                            </td>  <td className="px-6 py-4 whitespace-nowrap"> </td>
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

export default MiniCategoryManagement;