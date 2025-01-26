import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import StockReportPrint from "./StockReportPrint";
import Pagination from "../../../../Common/Pagination";
import useAddDivToTableCells from "../../../../Common/useAddDivToTableCells";

const StockReport = () => {

      const {
            data: stockRequest = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["stockRequest"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/stock-request`);
                  const data = await res.json();
                  // console.log(data, "data");
                  return data?.data;
            },
      });

      console.log(stockRequest, "stockRequest");


      const [itemsPerPage, setItemsPerPage] = useState(10);

      const [currentPage, setCurrentPage] = useState(1);

      // Calculate the total number of pages
      const totalPages = Math.ceil(stockRequest.length / itemsPerPage);

      // Get the products to display on the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentProducts = stockRequest.slice(startIndex, endIndex);

      // Function to handle page changes
      const handlePageChange = (pageNumber) => {
            if (pageNumber >= 1 && pageNumber <= totalPages) {
                  setCurrentPage(pageNumber);
            }
      };

      // Generate page numbers
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
      }


      const [selectedProducts, setSelectedProducts] = useState([]);

      // Check if all products are selected
      const allSelected = currentProducts.length > 0 && selectedProducts.length === currentProducts.length;

      // Handle Select All
      const handleSelectAll = (event) => {
            if (event.target.checked) {
                  setSelectedProducts(currentProducts.map((product) => product));
            } else {
                  setSelectedProducts([]);
            }
      };

      // Handle Individual Checkbox
      const handleSelectProduct = (productId) => {
            setSelectedProducts((prevSelected) =>
                  prevSelected.includes(productId)
                        ? prevSelected.filter((id) => id !== productId)
                        : [...prevSelected, productId]
            );
      };

      const totalItems = stockRequest.length;


      const [Print, setPrint] = useState(false);

      useAddDivToTableCells()
      return (
            <div>

                  <div className="flex items-center sm:justify-between">
                        <div>
                              <p className="text-xl font-bold text-gray-900">Stock Reports</p>
                             
                        </div>
                        <div className="flex items-center justify-start mt-4 sm:justify-end sm:mt-0 sm:space-x-7">

                              <div className="inline-flex items-center justify-end">
                                   
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
                                    <div>
                                          <button
                                                type="button"
                                                onClick={() => setPrint(!Print)}
                                                className="items-center  w-[100px] px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm  flex hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                          >
                                                <svg
                                                      className="w-4 h-4 mr-1 -ml-1"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                      />
                                                </svg>
                                                Print
                                          </button>
                                    </div>
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
                                                            <input
                                                                  className="focus:ring-indigo-500 cursor-pointer h-4 w-4 text-indigo-600 border-gray-300 rounded mr-4"
                                                                  type="checkbox"
                                                                  checked={allSelected}
                                                                  onChange={handleSelectAll}
                                                            />
                                                            Product
                                                      </th>
                                                      <th className="py-3.5 px-4 text-center text-xs uppercase tracking-widest font-medium text-gray-100">
                                                            Status
                                                      </th>
                                                      <th className="py-3.5 px-4 text-center text-xs uppercase tracking-widest font-medium text-gray-100">
                                                            Quantity
                                                      </th>
                                                      <th className="py-3.5 px-4  text-center  table-cell text-xs uppercase tracking-widest font-medium text-gray-100">
                                                            Seller
                                                      </th>
                                                      <th className="py-3.5 px-4  text-center text-xs uppercase tracking-widest font-medium text-gray-100">
                                                            Warehouse
                                                      </th>

                                                </tr>
                                          </thead>
                                          <tbody>
                                                {
                                                      currentProducts.map((product) =>
                                                            <tr key={product._id} className="bg-white" >

                                                                  <td className="px-4 py-4 text-sm font-bold border-r text-gray-900 align-top lg:align-middle  ">
                                                                        <div className="flex items-center">
                                                                              <input
                                                                                    className="focus:ring-indigo-500 cursor-pointer h-4 w-4 text-indigo-600 border-gray-300 rounded mr-4"
                                                                                    type="checkbox"
                                                                                    checked={selectedProducts.includes(product)}
                                                                                    onChange={() => handleSelectProduct(product)}
                                                                              />
                                                                              <img
                                                                                    className="flex-shrink-0 object-cover w-16 h-16 mr-3 rounded"
                                                                                    src={
                                                                                          product?.productInfo.image
                                                                                    }
                                                                                    alt=""
                                                                              />
                                                                              <div>
                                                                                    <p> {product?.productInfo?.name.slice(0, 20)}</p>
                                                                                    <div style={{wordWrap: 'anywhere'}} className="block text-sm font-normal">{product?.SKU}</div>
                                                                                    <span className="block text-sm font-normal">{product?.productId}</span>
                                                                              </div>
                                                                        </div>

                                                                  </td>
                                                                  <td className=" px-4  border-r py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="whitespace-nowrap     font-medium text-left">
                                                                              <div > <b>delivery status: </b><span className="text-yellow-500">{product?.delivery_status}</span></div>
                                                                              <div> <b>status:</b> <span className="text-yellow-500">{product?.status}</span></div>

                                                                        </div>
                                                                  </td>
                                                                  <td className=" px-4 py-4 border-r text-sm font-medium text-center text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="text-center">

                                                                              {product?.quantity}
                                                                        </div>
                                                                  </td>
                                                                  <td className=" px-4 py-4 text-sm border-r font-medium mx-auto  text-gray-900 xl:table-cell whitespace-nowrap">
                                                                        <div className="whitespace-nowrap font-medium text-left">

                                                                              <div>  <b>Shop Name: </b><span className="font-semibold capitalize">{product?.shopInfo?.shopName}</span></div>
                                                                              <div>  {product?.shopInfo?.shopEmail}</div>

                                                                        </div>
                                                                  </td>
                                                                  <td className=" px-4 py-4 text-sm border-r font-medium mx-auto  text-gray-900 xl:table-cell whitespace-nowrap">
                                                                    
                                                                        {product?.warehouse?.map((war) => {
                                                                              if (war?.name) {
                                                                                    return <span key={war}>{war?.name}</span>;
                                                                              }
                                                                        })}
                                                                  </td>


                                                            </tr>)
                                                }

                                          </tbody>
                                    </table>
                              </div>



                        </div>
                  </div>


                  {
                        Print && <StockReportPrint currentProducts={selectedProducts} Print={Print} setPrint={setPrint} />
                  }

                 

                  <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                  />
            </div>
      );
};

export default StockReport;
