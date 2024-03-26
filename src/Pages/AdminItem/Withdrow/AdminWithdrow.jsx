import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AdminWithdrow = () => {

    const { data: withdrawHistory = [], refetch } = useQuery({
        queryKey: ["my-withdrawHistory"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/api/v1/admin/withdraw-for-admin`);
            const data = await res.json();
            return data.data;
        },
    });


    const update_status = (id) => {
        fetch(`http://localhost:5001/api/v1/admin/withdraw`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                status: true
            }),
        }).then((res) => res.json()).then(() => {
            refetch()
        })
    }

    return (
        <div className=" mx-auto px-4 py-8 overflow-x-auto">
            <table className="w-[1400px] bg-white border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="text-left py-2 px-4">Amount</th>
                        <th className="text-left py-2 px-4">Email</th>
                        <th className="text-left py-2 px-4">Phone</th>
                        <th className="text-left py-2 px-4">Account Number</th>
                        <th className="text-left py-2 px-4">Account Name</th>
                        <th className="text-left py-2 px-4">Bank Name</th>
                        <th className="text-left py-2 px-4">Time</th>
                        <th className="text-left py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawHistory.map((withdraw) => (
                        <tr key={withdraw._id} className="border-t border-gray-300">
                            <td className="py-2 px-4">{withdraw.amount}</td>
                            <td className="py-2 px-4">{withdraw.email}</td>
                            <td className="py-2 px-4">{withdraw.phone}</td>
                            <td className="py-2 px-4">{withdraw.accountNumber}</td>
                            <td className="py-2 px-4">{withdraw.accountName}</td>
                            <td className="py-2 px-4">{withdraw.bankName}</td>
                            <td className="py-2 px-4">
                                <div className="overflow-x-hidden">
                                    {new Date(withdraw.time_stamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'medium' })}
                                </div>
                            </td>
                            <td className="py-2 px-4">
                                {withdraw.status ?
                                    <span className="text-green-600">Paid</span> :
                                    <button
                                        onClick={() => update_status(withdraw._id)} className="text-red-600">Pending</button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminWithdrow;
