import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    return (
        <div>
            <Link to={'add'} ><button className={style.addBtn}> Add mega category</button></Link> <br />

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
                                            <td>
                                                {
                                                    item.feature == 'true' ? <button onClick={() => featureStatus(item?._id, false)} className="">Feature Active</button> : <button onClick={() => featureStatus(item?._id, true)} className=''>Feature InActive</button>
                                                }
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