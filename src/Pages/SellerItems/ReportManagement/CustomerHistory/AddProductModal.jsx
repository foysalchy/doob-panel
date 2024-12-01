import React, { useState, useMemo } from 'react';
import Pagination from '../../../../Common/Pagination';

const AddProductModal = ({ setOpenModal, title, products }) => {
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;

      const totalPages = Math.ceil(products.length / itemsPerPage);

      const currentProducts = useMemo(() => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return products.slice(startIndex, endIndex);
      }, [currentPage, products]);



      const totalItems = products.length;

      const handlePageChange = (page) => {
            setCurrentPage(page);
      };



      return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-85 overflow-y-auto h-full w-full z-50">
                  <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                              <button
                                    onClick={() => setOpenModal(false)}
                                    className="text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
                              >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                              </button>
                        </div>

                        <div className="overflow-x-auto">
                              <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                          <tr>
                                                {title === "Wishlist" || title === "Add to cart products" ? (
                                                      <>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regular Price</th>
                                                      </>
                                                ) : (
                                                      <>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product IDs</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regular Price</th>
                                                      </>
                                                )}
                                          </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                          {currentProducts.map((product, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                      {console.log(product)}
                                                      {title === "Wishlist" || title === "Add to cart products" ? (
                                                            <>
                                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                                        <img src={product.img} alt={product.productName} className="w-16 h-16 rounded-md object-cover" />
                                                                  </td>
                                                                  <td className="px-6 py-4  whitespace-nowrap text-sm text-gray-900 max-w-full truncate">
                                                                        {product.productName.split(" ").slice(0, 4).join(" ")}
                                                                        <br />
                                                                        <span className='text-xs'> {product?.productId}</span>
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.regular_price}</td>
                                                            </>
                                                      ) : (
                                                            <>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.orderNumber || product._id}</td>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        {product.productList?.map((item, idx) => (
                                                                              <span key={idx} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
                                                                                    {item.productId}
                                                                              </span>
                                                                        ))}
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.method?.Getaway}</td>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.promoHistory?.normalPrice}</td>
                                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.promoHistory?.normalPrice}</td>
                                                            </>
                                                      )}
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>


                        <Pagination
                              totalItems={totalItems}
                              itemsPerPage={itemsPerPage}
                              currentPage={currentPage}
                              onPageChange={handlePageChange}
                        />
                  </div>
            </div>
      );
};

export default AddProductModal;
