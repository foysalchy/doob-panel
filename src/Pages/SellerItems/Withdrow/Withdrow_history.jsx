import React, { useState, useEffect, useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { Link } from "react-router-dom";

const WithdrawHistory = () => {
      const { shopInfo } = useContext(AuthContext);
      const [searchTerm, setSearchTerm] = useState('');
      const [filteredHistory, setFilteredHistory] = useState([]);

      const { data: withdrawHistory = [], isLoading, error } = useQuery({
            queryKey: ['my-withdrawHistory'],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/withdraw-for-shop?shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      useEffect(() => {
            const filtered = withdrawHistory.filter((item) =>
                  Object.values(item).some((value) =>
                        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                  )
            );
            setFilteredHistory(filtered);
      }, [searchTerm, withdrawHistory]);

      if (isLoading) {
            return (
                  <div className="flex justify-center items-center h-screen">
                        <FaSpinner className="animate-spin text-4xl text-blue-500" />
                  </div>
            );
      }

      if (error) {
            return (
                  <div className="text-center text-red-500">
                        Error: {error.message}
                  </div>
            );
      }

      return (
            <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
                <div className="md:flex gap-2 mb-4 items-center justify-between">
                        <h1 className="text-2xl font-bold ">Withdraw History</h1>

                        <div className="flex items-center  gap-2">
                              <Link  to={"/seller/settings/price-role"} className="bg-gray-900 text-white px-4 py-2 rounded-md">Price Role  </Link>
                  
                             
                              <Link to={"/seller/withdraw"}  className="bg-gray-900 text-white px-4 py-2 rounded-md">  B2B</Link>
                  
                        </div>
                  </div>
                  <div className="mb-4 relative">
                        <input
                              type="text"
                              placeholder="Search by any field..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="overflow-x-auto shadow-xl rounded-lg">
                        <table className="min-w-full bg-white">
                              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                    <tr>
                                          {['ID', 'Amount', 'Date', 'Email', 'Phone', 'Account Number', 'Account Name', 'Bank Name', 'Status'].map((header) => (
                                                <th key={header} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                                      {header}
                                                </th>
                                          ))}
                                    </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                    {filteredHistory.length > 0 ? (
                                          filteredHistory.map((history) => (
                                                <tr key={history._id} className="hover:bg-gray-50 transition duration-150">
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{history._id}</td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.amount ?? "N/A"}</td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(history.time_stamp).toLocaleDateString()}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.email}</td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.phone}</td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.accountNumber}</td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.accountName}</td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history?.bankName || ''}</td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span
                                                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${history.status === false || history.status === undefined
                                                                        ? "bg-yellow-100 text-yellow-600"
                                                                        : history.status === true
                                                                              ? "bg-green-100 text-green-600"
                                                                              : "bg-red-100 text-red-600"
                                                                        }`}
                                                            >
                                                                  {
                                                                        history.status === false || history.status === undefined
                                                                              ? "Pending"
                                                                              : history.status === true
                                                                                    ? "Approved"
                                                                                    : "Rejected"
                                                                  }
                                                            </span>
                                                      </td>

                                                </tr>
                                          ))
                                    ) : (
                                          <tr>
                                                <td colSpan="9" className="px-6 py-4 text-sm text-center text-gray-500">
                                                      No withdraw history available.
                                                </td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default WithdrawHistory;
