import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../../../Common/Pagination';


export default function SearchAdminReport() {
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10);
      const [currentData, setCurrentData] = useState([]);

      const { data: searchData = [], isLoading, refetch } = useQuery({
            queryKey: ['adminSearchData'],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/get-all-search`);
                  const data = await res.json();
                  return data.data; // Assuming the response contains `data.data`
            },
      });

      // Calculate the data to display for the current page
      useEffect(() => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setCurrentData(searchData.slice(startIndex, endIndex));
      }, [currentPage, searchData, itemsPerPage]);

      const deleteSearch = async (id) => {
            try {
                  const res = await fetch(`https://doob.dev/api/v1/admin/delete-search?id=${id}`, {
                        method: 'DELETE',
                        headers: {
                              'content-type': 'application/json',
                        },
                  });
                  const data = await res.json();
                  if (data.success) {
                        alert('Delete successful');
                        refetch();
                  } else {
                        alert('Delete failed');
                  }
            } catch (error) {
                  console.error('Error deleting search:', error);
                  alert('An error occurred while deleting');
            }
      };

      const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
      };

      // Calculate term frequencies
      const termFrequencies = searchData.reduce((acc, search) => {
            acc[search.term] = (acc[search.term] || 0) + 1;
            return acc;
      }, {});

      // Filter unique terms
      const uniqueTerms = Array.from(new Set(currentData.map((search) => search.term)));

      return (
            <div className="container mx-auto px-4 py-8">
                  <h1 className="text-2xl font-bold mb-6">Search Admin Report</h1>
                  {isLoading ? (
                        <div className="text-center">
                              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                              <p className="mt-4">Loading data...</p>
                        </div>
                  ) : (
                        <>
                              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                                    <table className="min-w-full leading-normal">
                                          <thead>
                                                <tr>
                                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Search Term
                                                      </th>
                                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Frequency
                                                      </th>

                                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Actions
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {uniqueTerms.map((term) => {
                                                      const search = currentData.find((s) => s.term === term);
                                                      if (!search) return null;
                                                      return (
                                                            <tr key={search._id}>
                                                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        {search.term}
                                                                  </td>
                                                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        {termFrequencies[search.term]}
                                                                  </td>

                                                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <button
                                                                              onClick={() => deleteSearch(search._id)}
                                                                              className="text-red-600 hover:text-red-900"
                                                                        >
                                                                              Delete
                                                                        </button>
                                                                  </td>
                                                            </tr>
                                                      );
                                                })}
                                          </tbody>
                                    </table>
                              </div>
                              <Pagination
                                    totalItems={searchData.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                              />
                        </>
                  )}
            </div>
      );
}
