import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../../../Common/Pagination';
import { Search } from 'lucide-react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import useAddDivToTableCells from '../../../../Common/useAddDivToTableCells';


export default function SearchAdminReport() {
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10);
      const [currentData, setCurrentData] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');

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
            setCurrentData(searchData.filter((search) => search.term.toLowerCase().includes(searchTerm.toLowerCase())).slice(startIndex, endIndex));
      }, [currentPage, searchData, itemsPerPage, searchTerm]);

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
            <div className="px-4 py-2">
                  <div className='flex mb-6 gap-2 items-center justify-between'>
                  <h1 className="text-lg  ">  History</h1>

                  <div className="relative max-w-md  ">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                              onChange={(e) => setSearchTerm(e.target.value)}
                              type="text"
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                              placeholder="Search for anything..."
                              aria-label="Search"
                        />
                  </div>
                  </div>
                  {isLoading ? (
                        <div className="text-center">
                              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 "></div>
                              <p className="mt-4">Loading data...</p>
                        </div>
                  ) : (
                        <>
                              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                                    <Table className="min-w-full leading-normal">
                                          <Thead>
                                                <Tr>
                                                      <Th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Search Term
                                                      </Th>
                                                      <Th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Count
                                                      </Th>

                                                      <Th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Actions
                                                      </Th>
                                                </Tr>
                                          </Thead>
                                          <Tbody>
                                                {uniqueTerms.map((term) => {
                                                      const search = currentData.find((s) => s.term === term);
                                                      if (!search) return null;
                                                      return (
                                                            <Tr key={search._id}>
                                                                  <td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        {search.term}
                                                                  </td>
                                                                  <Td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        {termFrequencies[search.term]}
                                                                  </Td>

                                                                  <Td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <button
                                                                              onClick={() => deleteSearch(search._id)}
                                                                              className="text-red-600 hover:text-red-900"
                                                                        >
                                                                              Delete
                                                                        </button>
                                                                  </Td>
                                                            </Tr>
                                                      );
                                                })}
                                          </Tbody>
                                    </Table>
                              </div>
                              <Pagination
                                    totalItems={searchData.filter((search) => search.term.toLowerCase().includes(searchTerm.toLowerCase())).length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                              />
                        </>
                  )}
            </div>
      );
}
