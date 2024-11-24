import React, { useState, useMemo } from 'react';

const AddProductModal = ({ setOpenModal, title, products }) => {
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;

      const totalPages = Math.ceil(products.length / itemsPerPage);

      const currentProducts = useMemo(() => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return products.slice(startIndex, endIndex);
      }, [currentPage, products]);

      const goToPage = (page) => {
            setCurrentPage(Math.min(Math.max(1, page), totalPages));
      };

      return (
            <div className='bg-white w-screen h-screen fixed top-0 pt-10 left-0 flex flex-col items-center gap-4 justify-start z-[1000]'>
                  <h1 className='text-xl text-black font-semibold'>{title}</h1>
                  <button onClick={() => setOpenModal(false)} className='text-2xl text-black absolute right-8 top-4'>x</button>
                  <section className="container px-4 mx-auto max-w-xl">
                        <div className="flex flex-col">
                              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                      <thead className="bg-gray-50">
                                                            <tr>
                                                                  <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                                                                        <div className="flex items-center gap-x-3">
                                                                              <span>Photo</span>
                                                                        </div>
                                                                  </th>
                                                                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                                        Name
                                                                  </th>
                                                                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                                        Orders
                                                                  </th>
                                                                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                                        Price
                                                                  </th>
                                                                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                                        Regular Price
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="bg-white divide-y divide-gray-200">
                                                            {currentProducts.map((product, index) => (
                                                                  <tr key={index}>
                                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                              <img src={product?.img} alt="product" className="w-[60px] h-[60px] rounded-md object-cover" />
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                              {product?.productName}
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                              {product?.quantity}
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                              {product?.price}
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                              {product?.regular_price}
                                                                        </td>
                                                                  </tr>
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                              <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-5 h-5 rtl:-scale-x-100"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                          />
                                    </svg>
                                    <span>Previous</span>
                              </button>
                              <div className="items-center hidden md:flex gap-x-3">
                                    {[...Array(totalPages)].map((_, i) => (
                                          <button
                                                key={i}
                                                onClick={() => goToPage(i + 1)}
                                                className={`px-2 py-1 text-sm rounded-md ${currentPage === i + 1
                                                      ? 'text-blue-500 bg-blue-100/60'
                                                      : 'text-gray-500 hover:bg-gray-100'
                                                      }`}
                                          >
                                                {i + 1}
                                          </button>
                                    ))}
                              </div>
                              <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                    <span>Next</span>
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-5 h-5 rtl:-scale-x-100"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                          />
                                    </svg>
                              </button>
                        </div>
                  </section>
            </div>
      );
};

export default AddProductModal;
