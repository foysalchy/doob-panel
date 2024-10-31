import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowDown, FaCheckCircle, FaEquals, FaExclamationCircle } from "react-icons/fa";

const StockCheck = () => {
      const [selectedStatus, setSelectedStatus] = useState('all');


      const handleChange = (event) => {
            setSelectedStatus(event.target.value);
      };
      const { data: products = [], refetch } = useQuery({
            queryKey: ["products_for_admin"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/products");
                  const data = await res.json();
                  return data;
            },
      });




      const getStatus = (quantity, product_Low_alert) => {
            console.log(product_Low_alert, quantity);
            const lowAlert = product_Low_alert ? parseInt(product_Low_alert) : null;

            if (quantity <= 0) {
                  return {
                        text: "Stock Out",
                        color: "text-red-500",
                        icon: <FaExclamationCircle />,
                  };
            } else if (quantity <= (lowAlert !== null ? lowAlert : 10)) {
                  return {
                        text: "Lowest Stock",
                        color: "text-orange-500",
                        icon: <FaArrowDown />,
                  };
            } else if (quantity <= (lowAlert !== null ? lowAlert : 50)) {
                  return {
                        text: "Average Stock",
                        color: "text-yellow-500",
                        icon: <FaEquals />,
                  };
            } else {
                  return {
                        text: "Good Stock",
                        color: "text-green-500",
                        icon: <FaCheckCircle />,
                  };
            }
      };


      const MAX_PAGE_NUMBERS = 5;




      const [itemsPerPage, setItemsPerPage] = useState(10);

      const [currentPage, setCurrentPage] = useState(1);

      // Calculate the total number of pages
      const totalPages = Math.ceil(products.length / itemsPerPage);
      const getStockStatus = (quantity, lowAlert) => {
            if (quantity <= 0) {
                  return "Stock Out";
            } else if (quantity <= (lowAlert !== null ? lowAlert : 10)) {
                  return "Lowest Stock";
            } else if (quantity <= (lowAlert !== null ? lowAlert : 50)) {
                  return "Average Stock";
            } else {
                  return "Good Stock";
            }
      };

      const [searchTerm, setSearchTerm] = useState('');

      // Function to filter products based on selected status
      const filteredProducts = searchTerm.length > 0
            ? products.filter((item) => {
                  const itemValues = Object.values(item);
                  const productName = item.productInfo?.name?.toLowerCase() || ''; // Safely access productInfo.name

                  return (
                        itemValues.some((value) =>
                              value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                        ) || productName.includes(searchTerm.toLowerCase())
                  );
            }) : products.filter((product) => {
                  const stockStatus = getStockStatus(product.stock_quantity, product.low_stock_warning);

                  // Check if the stock status matches the selected status
                  const statusMatch = selectedStatus === 'all' || stockStatus === selectedStatus;

                  // Check if the search term matches any relevant field, including product name and productInfo

                  return statusMatch;
            });


      // Get the products to display on the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentProducts = filteredProducts.slice(startIndex, endIndex);

      const getPageNumbers = () => {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            const pageNumbers = [];

            if (totalPages <= MAX_PAGE_NUMBERS) {
                  // Show all page numbers if total pages are less than or equal to MAX_PAGE_NUMBERS
                  for (let i = 1; i <= totalPages; i++) {
                        pageNumbers.push(i);
                  }
            } else {
                  // Show the first page
                  pageNumbers.push(1);

                  // Show "..." if the current page is greater than 3
                  if (currentPage > 3) {
                        pageNumbers.push('...');
                  }

                  // Calculate the range of pages to display around the current page
                  const start = Math.max(2, currentPage - 1);
                  const end = Math.min(totalPages - 1, currentPage + 1);

                  for (let i = start; i <= end; i++) {
                        pageNumbers.push(i);
                  }

                  // Show "..." if the current page is less than totalPages - 2
                  if (currentPage < totalPages - 2) {
                        pageNumbers.push('...');
                  }

                  // Show the last page
                  pageNumbers.push(totalPages);
            }

            return pageNumbers;
      };

      const pageNumbers = getPageNumbers();

      // Function to handle page changes
      const handlePageChange = (pageNumber) => {
            if (pageNumber >= 1 && pageNumber <= totalPages) {
                  setCurrentPage(pageNumber);
            }
      };


      const calculateTotalQuantity = (data) => {
            let totalQuantity = 0;
            data.forEach((item) => {
                  totalQuantity += parseInt(item.quantity);
            });
            return totalQuantity;
      };
      return (
            <div>
                  <div className="">
                        <div className="">
                              <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                          <p className="text-xl font-bold text-gray-900">Stock Check</p>
                                          <p className="mt-1 text-sm font-medium text-gray-500">
                                                View all products with low stock level or out of stock products and manage their stock.
                                          </p>
                                    </div>
                                    <div className="flex items-center justify-start mt-4 sm:justify-end sm:mt-0 sm:space-x-7">

                                          <div className="relative my-5">
                                                <label htmlFor="Search" className="sr-only ">
                                                      {" "}
                                                      Search{" "}
                                                </label>

                                                <input
                                                      type="text"
                                                      id="Search"
                                                      onChange={(e) => setSearchTerm(e.target.value)}
                                                      placeholder="Search for..."
                                                      className="w-[200px] px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                                                />

                                                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                                      <button type="button" className="text-gray-600 hover:text-gray-700">
                                                            <span className="sr-only">Search</span>

                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                                  strokeWidth="1.5"
                                                                  stroke="currentColor"
                                                                  className="h-4 w-4"
                                                            >
                                                                  <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                                  />
                                                            </svg>
                                                      </button>
                                                </span>
                                          </div>

                                          <div className="inline-flex items-center justify-end">
                                                <label
                                                      htmlFor="sort"
                                                      className="text-base whitespace-nowrap font-medium text-gray-900 sm:text-sm"
                                                >
                                                      Per Page
                                                </label>
                                                <select
                                                      onChange={(e) => setItemsPerPage(e.target.value)}
                                                      id="sort"
                                                      name="sort"
                                                      className="block mx-4 w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none sm:text-sm"
                                                >
                                                      <option value="10">10</option>
                                                      <option value="20">20</option>
                                                      <option value="30">30</option>
                                                      <option value="40">40</option>
                                                      <option value="50">50</option>
                                                      <option value="100">100</option>
                                                </select>
                                          </div>
                                          <div className="inline-flex items-center justify-end">
                                                <label htmlFor="status-filter" className="text-base whitespace-nowrap font-medium text-gray-900 sm:text-sm">
                                                      Filter by Status
                                                </label>
                                                <select
                                                      onChange={(e) => setSelectedStatus(e.target.value)}
                                                      id="status-filter"
                                                      className="block mx-4 w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none sm:text-sm"
                                                >
                                                      <option value="all">All</option>
                                                      <option value="Stock Out">Stock Out</option>
                                                      <option value="Lowest Stock">Lowest Stock</option>
                                                      <option value="Average Stock">Average Stock</option>
                                                      <option value="Good Stock">Good Stock</option>
                                                </select>
                                          </div>
                                    </div>
                              </div>
                              <div className="flex flex-col mt-4 lg:mt-8">
                                    <div className="-mx-4 -my-2 bar overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full divide-gray-600 bg-gray-600 lg:divide-y">
                                                      <thead className=" table-header-group">
                                                            <tr>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-100 uppercase tracking-widest">
                                                                        Product
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Seller
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left  table-cell text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Shop
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Stock Quantity
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left  table-cell text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Price
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left  table-cell text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Status
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Warehouse
                                                                  </th>

                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {
                                                                  currentProducts.map((product) => {

                                                                        const status = getStatus(
                                                                              product?.stock_quantity,
                                                                              product?.low_stock_warning
                                                                        )
                                                                        return (<tr key={product._id} className="bg-white" >
                                                                              {console.log(product)}
                                                                              <td className="px-4 py-4 text-sm font-bold text-gray-900 align-top lg:align-middle w[15%]">
                                                                                    <div className="flex items-center">
                                                                                          <img
                                                                                                className="flex-shrink-0 object-cover w-12 h-12 mr-3 rounded"
                                                                                                src={
                                                                                                      product?.featuredImage?.src ?? product?.images[0]?.src
                                                                                                }
                                                                                                alt={product?.name}
                                                                                          />
                                                                                          <div>
                                                                                                <p> {product?.name.slice(0, 20)}</p>
                                                                                                <span className="block text-sm font-normal">{product?.sku}</span>
                                                                                          </div>
                                                                                    </div>

                                                                              </td>
                                                                              <td className=" px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                                    <div className="  items-center">
                                                                                          {product?.shopId}
                                                                                    </div>
                                                                                    <div className="  items-center">
                                                                                          {product?.seller}
                                                                                    </div>
                                                                              </td>
                                                                              <td className=" px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                                    {product?.darazSku?.[0]?.shop || ''}
                                                                              </td>
                                                                              <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                                    <span className="text-xs text-gray-500">
                                                                                          {" "}
                                                                                          {product?.variations?.map((varian) => {
                                                                                                if (varian?.SKU) {
                                                                                                      return <div><span>{varian?.SKU}</span>==<span>{varian?.quantity}</span></div>;
                                                                                                }
                                                                                          })}
                                                                                    </span>
                                                                                    Total {calculateTotalQuantity(
                                                                                          product?.variations
                                                                                    )}
                                                                                    <span className="text-red-400">
                                                                                          {product?.low_stock_warning ? `/${product?.low_stock_warning}` : ''}
                                                                                    </span>
                                                                              </td>
                                                                              <td className=" px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                                                                                    <div className="whitespace-nowrap border-r px-6 py-4 font-medium text-left">

                                                                                          <div>  <b>Price: </b>{product?.price}</div>
                                                                                          <div> <b>Regular:</b> {product?.regular_price}</div>
                                                                                          <div> <b>Sale:</b>   {product?.sale_price}</div>
                                                                                    </div>
                                                                              </td>
                                                                              <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                                    <>
                                                                                          <div className={`text-xs  ${status.color}`}>
                                                                                                <p className="flex items-center gap-2 justify-center">
                                                                                                      {status.icon} {status.text}
                                                                                                </p>
                                                                                          </div>
                                                                                          <div className={`text-xs text-yellow-500`}>
                                                                                                <p className="flex items-center gap-2 mt-2 justify-center">
                                                                                                      {product.stock_request ? "You have pending request" : ""}
                                                                                                </p>
                                                                                          </div>
                                                                                    </>
                                                                              </td>
                                                                              <td className="px-4 py-4 text-lg border-r  text-gray-700  whitespace-nowrap">
                                                                                    <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                                                          {product?.warehouse?.map((war) => {
                                                                                                if (war?.name) {
                                                                                                      return <span key={war}>{war?.name}</span>;
                                                                                                }
                                                                                          })}
                                                                                    </button>
                                                                              </td>

                                                                        </tr>)
                                                                  })
                                                            }

                                                      </tbody>
                                                </table>
                                          </div>



                                    </div>
                              </div>

                              <div className="py-6">
                                    <div>
                                          <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                                                <p className="text-sm font-medium text-gray-500">
                                                      Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of {products.length} results (Page {currentPage})
                                                </p>
                                                <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                                      <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                  e.preventDefault();
                                                                  handlePageChange(currentPage - 1);
                                                            }}
                                                            className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                                      >
                                                            <span className="sr-only">Previous</span>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                      </a>

                                                      {pageNumbers.map((number, index) => (
                                                            <span key={index}>
                                                                  {number === '...' ? (
                                                                        <span className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400">...</span>
                                                                  ) : (
                                                                        <a
                                                                              href="#"
                                                                              onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    handlePageChange(number);
                                                                              }}
                                                                              className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${number === currentPage ? 'text-gray-900 bg-gray-100 border border-gray-900 rounded-md' : 'text-gray-400 bg-white border border-gray-200 rounded-md'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9`}
                                                                              aria-current={number === currentPage ? 'page' : undefined}
                                                                        >
                                                                              {number}
                                                                        </a>
                                                                  )}
                                                            </span>
                                                      ))}

                                                      <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                  e.preventDefault();
                                                                  handlePageChange(currentPage + 1);
                                                            }}
                                                            className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                                                      >
                                                            <span className="sr-only">Next</span>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                                            </svg>
                                                      </a>
                                                </nav>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>


            </div>
      );
};

export default StockCheck;
