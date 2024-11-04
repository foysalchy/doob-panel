import React, { useContext, useState } from "react";
import { BiEdit, BiSearch } from "react-icons/bi";
import EditInventory from "./EditInventory";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import {
      FaExclamationCircle,
      FaArrowDown,
      FaEquals,
      FaCheckCircle,
} from "react-icons/fa";

const InventoryManagement = () => {
      const [open, setOpen] = useState(false);
      const { shopInfo } = useContext(AuthContext);

      const [searchTerm, setSearchTerm] = useState("");
      const [selectedFilter, setSelectedFilter] = useState("all"); // Default filter option

      const { data: productData = [], refetch } = useQuery({
            queryKey: ["productData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/all-products/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const getStatus = (quantity, product_Low_alert) => {
            console.log(product_Low_alert, quantity);
            const lowAlert = product_Low_alert ? parseInt(product_Low_alert) : 0;

            if (quantity <= 0) {
                  return {
                        text: "Stock Out",
                        color: "text-red-500",
                        icon: <FaExclamationCircle />,
                  };
            } else if (quantity <= (lowAlert !== 0 ? lowAlert : 10)) {
                  return {
                        text: "Lowest Stock",
                        color: "text-orange-500",
                        icon: <FaArrowDown />,
                  };
            } else if (quantity <= (lowAlert !== 0 ? lowAlert : 50)) {
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

      const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
      };

      const handleFilterChange = (e) => {
            setSelectedFilter(e.target.value);
      };


      const filteredProducts = productData.filter((product) => {
            const lowStockWarning = product?.low_stock_warning
                  ? parseInt(product.low_stock_warning)
                  : 0;
            const stockQuantity = product.stock_quantity;

            switch (selectedFilter) {
                  case "all":
                        return true; // Include all products
                  case "Good Stock":
                        return stockQuantity > (lowStockWarning ? lowStockWarning + 50 : 50);
                  case "Average Stock":
                        return (
                              stockQuantity <= (lowStockWarning ? lowStockWarning + 50 : 50) &&
                              lowStockWarning &&
                              lowStockWarning > 10
                        );
                  case "Lowest Stock":
                        return (
                              stockQuantity <= (lowStockWarning ? lowStockWarning : 10) &&
                              stockQuantity > 0
                        );
                  case "Stock Out":
                        return stockQuantity <= 0;
                  default:
                        return true; // Default to include all products
            }
      });

      const searchProduct = filteredProducts?.filter((product) => {
            if (searchTerm) {
                  console.log(searchTerm)
                // Convert searchTerm to lower case for case-insensitive comparison
                const searchLower = searchTerm.toLowerCase();
        
                // Check if any key in the product object contains the searchTerm
                if (product) {
                  // Check if any key in the product object contains the searchTerm
                  return Object.values(product).some(value =>
                      value !== null && // Ensure the value is not null
                      value.toString().toLowerCase().includes(searchLower)
                  );
              }
            } else {
                // If no searchTerm, return true to include all products
                return true;
            }
        });
        


      const [itemsPerPage, setItemsPerPage] = useState(10); // Initial items per page
      const [currentPage, setCurrentPage] = useState(1);

      const totalPages = Math.ceil(searchProduct.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageData = searchProduct.slice(startIndex, endIndex);

      const handlePageChange = (page) => {
            setCurrentPage(page);
      };

      const handleItemsPerPageChange = (e) => {
            setItemsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1); // Reset to first page
      };

      // Create an array of page numbers for rendering
      const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
      const calculateTotalQuantity = (data) => {
            let totalQuantity = 0;
            data.forEach((item) => {
                  totalQuantity += parseInt(item.quantity);
            });
            return totalQuantity;
      };


      return (
            <div>
                  <div className="bar overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                        <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                              <div className="flex items-center space-x-4">

                                    <div className="relative flex items-center justify-between w-full">
                                          <input
                                                type="text"
                                                placeholder="Search..."
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                className="py-2 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                          />
                                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <BiSearch />
                                          </div>
                                    </div>


                                    <div className='flex gap-4 items-center w-full justify-end'>
                                          <div className="flex items-center py-4 space-x-3">
                                                <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-500">
                                                      Items per page:
                                                </label>
                                                <select
                                                      id="itemsPerPage"
                                                      value={itemsPerPage}
                                                      onChange={handleItemsPerPageChange}
                                                      className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
                                                >
                                                      <option value="3">3</option>
                                                      <option value="10">10</option>
                                                      <option value="20">20</option>
                                                      <option value="50">50</option>
                                                </select>
                                          </div>
                                          <select
                                                value={selectedFilter}
                                                onChange={handleFilterChange}
                                                className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                          >
                                                <option value="all">All</option>
                                                <option value="Good Stock">Good Stock</option>
                                                <option value="Average Stock">Average Stock</option>
                                                <option value="Lowest Stock">Lowest Stock</option>
                                                <option value="Stock Out">Stock Out</option>
                                                {/* Add more filter options as needed */}
                                          </select>
                                    </div>

                              </div>




                              <div className="bar overflow-hidden mt-3">
                                    <table className="min-w-full  bg-white rounded border text-center text-sm font-light">
                                          <thead className="border-b  font-medium  ">
                                                <tr>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Photo
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Product Name
                                                      </th>
                                                      <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                            Price
                                                      </th>



                                                      <th
                                                            scope="col"
                                                            className="border-r px-2 py-4 text-sm font-[500]"
                                                      >
                                                            Stock Quantity
                                                      </th>
                                                      <th
                                                            scope="col"
                                                            className="border-r px-2 py-4 text-sm font-[500]"
                                                      >
                                                            Shop
                                                      </th>
                                                      <th
                                                            scope="col"
                                                            className="border-r px-2 py-4 text-sm font-[500]"
                                                      >
                                                            Status
                                                      </th>
                                                      <th
                                                            scope="col"
                                                            className="border-r px-2 py-4 text-sm font-[500]"
                                                      >
                                                            Warehouse
                                                      </th>
                                                      <th
                                                            scope="col"
                                                            className="border-r px-2 py-4 text-sm font-[500]"
                                                      >
                                                            Action
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {currentPageData?.map((product) => {
                                                      const status = getStatus(
                                                            product?.stock_quantity,
                                                            product?.low_stock_warning
                                                      );
                                                      return (
                                                            <tr key={product?._id} className="border-b">
                                                                  <td className="whitespace-nowrap  border-r px-2 py-2 font-medium ">
                                                                        <img
                                                                              src={
                                                                                    product?.featuredImage?.src ?? product.images[0]?.src
                                                                              }
                                                                              alt=""
                                                                              className="min-w-[60px] h-[60px] rounded-lg object-cover m-auto"
                                                                        />
                                                                  </td>
                                                                  <td className="whitespace-wrap text-sm text-start w-[300px] border-r px-6 py-4 font-medium ">
                                                                        {product?.name.split(" ").slice(0, 4).join(" ")}
                                                                        <br />
                                                                        <span className="text-xs text-gray-500">
                                                                              {" "}
                                                                              {product?.sku}
                                                                        </span>
                                                                  </td>
                                                                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium text-left ">
                                                                        <div>  <b>Price: </b>{product?.price}</div>
                                                                        <div> <b>Regular:</b> {product?.regular_price}</div>
                                                                        <div> <b>Sale:</b>   {product?.sale_price}</div>
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
                                                                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                        {product?.darazSku?.[0]?.shop || ''}
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
                                                                                          return <span>{war?.name}</span>;
                                                                                    }
                                                                              })}
                                                                        </button>
                                                                  </td>
                                                                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                        <button
                                                                              onClick={() => setOpen(product)}
                                                                              className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded-lg"
                                                                        >
                                                                              Edit
                                                                        </button>
                                                                  </td>

                                                                  {open._id === product._id && (
                                                                        <div className="h-0 w-0">
                                                                              <EditInventory
                                                                                    refetch={refetch}
                                                                                    data={product}
                                                                                    open={open}
                                                                                    setOpen={setOpen}
                                                                              />
                                                                        </div>
                                                                  )}
                                                            </tr>
                                                      );
                                                })}
                                          </tbody>
                                    </table>
                              </div>

                              <nav className="relative mt-6  flex justify-end space-x-1.5">
                                    <button
                                          onClick={() => handlePageChange(currentPage - 1)}
                                          disabled={currentPage === 1}
                                          className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 disabled:opacity-50"
                                    >
                                          <span className="sr-only">Previous</span>
                                          <svg
                                                className="flex-shrink-0 w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                          </svg>
                                    </button>

                                    {pageNumbers.map((page) => (
                                          <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-9 ${page === currentPage
                                                      ? 'bg-gray-100 text-gray-900 border-gray-900'
                                                      : 'bg-white text-gray-400 border-gray-200'
                                                      }`}
                                          >
                                                {page}
                                          </button>
                                    ))}

                                    <button
                                          onClick={() => handlePageChange(currentPage + 1)}
                                          disabled={currentPage === totalPages}
                                          className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 disabled:opacity-50"
                                    >
                                          <span className="sr-only">Next</span>
                                          <svg
                                                className="flex-shrink-0 w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                          </svg>
                                    </button>
                              </nav>
                        </div>
                  </div>
            </div>
      );
};

export default InventoryManagement;
