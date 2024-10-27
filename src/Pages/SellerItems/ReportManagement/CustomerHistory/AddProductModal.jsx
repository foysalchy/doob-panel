import React from 'react';

const AddProductModal = ({ setOpenModal, title, products }) => {
      console.log(products);
      return (
            <div className='bg-[#ffffff] w-screen h-screen fixed top-0 pt-10 left-0 flex  flex-col items-center gap-4 justify-start z-[1000]'>
                  <h1 className='text-xl text-black font-semibold'>{title}</h1>
                  <button onClick={() => setOpenModal(false)} className='text-2xl text-black absolute right-8 top-4'>x</button>
                  <section className="container px-4 mx-auto max-w-xl">
                        <div className="flex flex-col">
                              <div className="-mx-4 -my-2 bar overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                          <div className="bar overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                      <thead className="bg-gray-50 dark:bg-gray-800">
                                                            <tr>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                                  >
                                                                        <div className="flex items-center gap-x-3">
                                                                              <div className="flex items-center gap-x-2">
                                                                                    <span>Photo</span>
                                                                              </div>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                                  >
                                                                        Name
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                                  >
                                                                        Orders
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                                  >
                                                                        Price
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                                  >
                                                                        Regular Price
                                                                  </th>


                                                            </tr>
                                                      </thead>
                                                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                            {
                                                                  products?.map((product, index) => <tr>
                                                                        {/* <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                    />
                                                    <span>#3066</span>
                                                </div>
                                            </td> */}
                                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                                              <img src={product?.img} alt="product" className="w-[60px] h-[60px] rounded-md object-cover" />
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-300 dark:text-gray-300 whitespace-nowrap">
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
                                                                  )
                                                            }

                                                            <tr>
                                                                  <td colSpan={6}>
                                                                        Loader..
                                                                  </td>
                                                            </tr>

                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                              <a
                                    href="#"
                                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
                                    <span>previous</span>
                              </a>
                              <div className="items-center hidden md:flex gap-x-3">
                                    <a
                                          href="#"
                                          className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                                    >
                                          1
                                    </a>
                                    <a
                                          href="#"
                                          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                                    >
                                          2
                                    </a>
                                    <a
                                          href="#"
                                          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                                    >
                                          3
                                    </a>
                                    <a
                                          href="#"
                                          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                                    >
                                          ...
                                    </a>
                                    <a
                                          href="#"
                                          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                                    >
                                          12
                                    </a>
                                    <a
                                          href="#"
                                          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                                    >
                                          13
                                    </a>
                                    <a
                                          href="#"
                                          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                                    >
                                          14
                                    </a>
                              </div>
                              <a
                                    href="#"
                                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
                              </a>
                        </div>
                  </section>
            </div>
      );
};

export default AddProductModal;
