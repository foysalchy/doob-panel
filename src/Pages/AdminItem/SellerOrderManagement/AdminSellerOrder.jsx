import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import AdminOrderTableRow from './AdminOrderTableRow';
import LoaderData from '../../../Common/LoaderData';
import Select from "react-select";

const AdminSellerOrder = ({ searchValue, selected_daraz_order, set_selected_daraz_order, selectedValue }) => {

      const [currentPage, setCurrentPage] = useState(1);
      const [selected_warehouse, set_selected_warehouse] = useState(null);

      const { data: sellers = [], refetch } = useQuery({
            queryKey: ["sellers_for_admin"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/get-current-login-daraz"
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const sellers_data = sellers.map((seller) => seller._id);


      const [selectedAccount, setSelectedAccount] = useState(sellers_data);
      const [products_admin, set_products_admin] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([])
      const [isLoading, setIsLoading] = useState(false);



      useEffect(() => {
            const fetchData = async () => {
                  setIsLoading(true);
                  setCurrentPage(1);
                  const allProducts = [];

                  if (Array.isArray(selectedAccount)) {
                        for (let id of selectedAccount) {
                              const response = await fetch(`http://localhost:5001/api/v1/admin/daraz-orders?sellers=${id}&status=${selectedValue}`);
                              const data = await response.json();

                              if (data?.data) {
                                    allProducts.push(...data.data);
                              }
                        }
                        set_products_admin(allProducts);
                        setFilteredProducts(allProducts); // Initialize the filteredProducts with all products
                  } else {
                        const response = await fetch(`http://localhost:5001/api/v1/admin/daraz-orders?sellers=${selectedAccount}&status=${selectedValue}`);
                        const data = await response.json();

                        if (data?.data) {
                              set_products_admin(data.data);
                              setFilteredProducts(data.data); // Initialize filtered products
                        } else {
                              set_products_admin([]);
                              setFilteredProducts([]); // Set empty filteredProducts if no data
                        }
                  }
                  setIsLoading(false);
            };

            fetchData();
      }, [selectedAccount, selectedValue]);


      useEffect(() => {
            if (selected_warehouse) {
                  const filtered = products_admin.filter(product =>
                        product.product_warehouse?.some(warehouse => warehouse?.name === selected_warehouse)
                  );
                  setFilteredProducts(filtered); // Set the filtered products
            } else {
                  setFilteredProducts(products_admin); // Reset to all products when no warehouse is selected
            }
      }, [selected_warehouse, products_admin]);

      const filteredData = searchValue
            ? filteredProducts?.filter((itm) => {
                  const order_id = itm?.order_id;
                  const order_idString = order_id?.toString(); // Convert to string
                  return order_idString?.includes(searchValue);
            })
            : filteredProducts;




      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      // Calculate the total number of pages
      const [pageSize, setItemsPerPage] = useState(15);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(filteredData?.length / pageSize);

      // const currentData = filteredData?.length && filteredData?.slice(startIndex, endIndex);
      const currentData = filteredData?.length && filteredData.slice(startIndex, endIndex);

      const handleChangePage = (newPage) => {
            setCurrentPage(newPage);
      };

      const renderPageNumbers = () => {
            const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
            const endPage = Math.min(totalPages, startPage + pageSize - 1);

            return (
                  <React.Fragment>
                        {startPage > 1 && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
                                          onClick={() => handleChangePage(1)}
                                    >
                                          1
                                    </button>
                              </li>
                        )}

                        {/* Current Page */}
                        {Array.from({ length: endPage - startPage + 1 })?.map((_, index) => {
                              const pageNumber = startPage + index;
                              return (
                                    <li key={pageNumber}>
                                          <button
                                                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                                                      ? "border-blue-600 bg-blue-600 text-white"
                                                      : "border-gray-900 bg-white text-center leading-8 text-gray-900"
                                                      }`}
                                                onClick={() => handleChangePage(pageNumber)}
                                          >
                                                {pageNumber}
                                          </button>
                                    </li>
                              );
                        })}

                        {/* Last Page */}
                        {endPage < totalPages && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
                                          onClick={() => handleChangePage(totalPages)}
                                    >
                                          {totalPages}
                                    </button>
                              </li>
                        )}
                  </React.Fragment>
            );
      };





      const seller_option = sellers?.map((itm) => {
            return {
                  value: itm?._id,
                  label: itm?.shop2?.data?.name,
            };
      });


      const seller_filter = (event) => {
            const seller_id = event?.value;
            setSelectedAccount(seller_id);

      };




      useEffect(() => {
            refetch()
      }, [selectedAccount]);


      const { data: warehouses = [], } = useQuery({
            queryKey: ["warehouses"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/warehouse");
                  const data = await res.json();
                  return data;
            },
      });






      const warehouses_option = warehouses?.map((itm) => {

            return {
                  value: itm?.slag,
                  label: itm?.name,
            };
      });

      const warehouses_filter = (event) => {
            const warehouse_id = event?.value;
            set_selected_warehouse(warehouse_id);
      };





      return (
            <div className="">

                  <div className='mt-8 lg:flex gap-4'>

                        <Select
                              className='w-80'
                              placeholder="Select Seller"

                              options={seller_option}

                              onChange={seller_filter}
                        />
                        <Select
                              placeholder="Select Warehouse"
                              className="w-80"
                              options={warehouses_option}
                              onChange={warehouses_filter}
                        />
                  </div>
                  {!isLoading ? (
                        <div>
                              {currentData?.length ? (
                                    <div className=" sm:-mx-6 lg:-mx-8 ">
                                          <div className=" py-2 sm:px-6 lg:px-8">
                                                <div className="w-full">
                                                      <table className="">
                                                            <thead className="border-b bg-gray-500 text-white font-medium  ">
                                                                  <tr>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-4 py-4 font-[500]"
                                                                        >
                                                                              <input
                                                                                    checked={selected_daraz_order.length === currentData?.length}
                                                                                    onChange={() => {
                                                                                          if (!selected_daraz_order.length) {
                                                                                                console.log("Filtered Data:", currentData);
                                                                                                set_selected_daraz_order(
                                                                                                      currentData?.map((item) => item)
                                                                                                );
                                                                                          } else {
                                                                                                // If selected is true, deselect all items
                                                                                                console.log("Deselect All");
                                                                                                set_selected_daraz_order([]);
                                                                                          }
                                                                                    }}
                                                                                    type="checkbox"
                                                                                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                                                    id="hs-checkbox-group-1"
                                                                              />
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 py-4 font-[500]"
                                                                        ></th>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-4 py-4 font-[500]"
                                                                        >
                                                                              Document
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-4 py-4 font-[500]"
                                                                        >
                                                                              Order No.
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 py-4 text-sm font-[500]"
                                                                        >
                                                                              Order Date
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-4 py-4 text-sm font-[500]"
                                                                        >
                                                                              Pending Since
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-8 py-4 text-sm font-[500]"
                                                                        >
                                                                              Payment Method
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-4 py-4 text-sm font-[500]"
                                                                        >
                                                                              Retail Price
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-4 py-4 text-sm font-[500]"
                                                                        >
                                                                              Status
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className=" px-4 py-4 text-sm font-[500]"
                                                                        >
                                                                              Actions
                                                                        </th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>

                                                                  {currentData?.length &&
                                                                        currentData?.map((itm, index) => (
                                                                              <AdminOrderTableRow
                                                                                    select={selected_daraz_order}
                                                                                    setSelect={set_selected_daraz_order}
                                                                                    data={itm}
                                                                                    index={index}
                                                                                    key={index}
                                                                                    shopId={itm?.shopId}
                                                                              />
                                                                        ))}
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </div>
                                    </div>
                              ) : (
                                    <div className='my-10 mb-4 text-2xl'>Here is no order found</div>
                              )}
                        </div>
                  ) : (
                        <div className='my-10 mb-4 text-2xl'>
                              <LoaderData />
                        </div>
                  )
                  }
                  <div className="flex items-center justify-between">

                        <div className="flex items-center whitespace-nowrap gap-2">
                              <span className="text-sm">Entire per page </span>
                              <select

                                    className="border w-[50px] px-1 py-2 text-sm rounded"
                                    onChange={(e) => setItemsPerPage(e.target.value)}>
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={70}>70</option>
                                    <option value={100}>100</option>

                              </select>
                        </div>
                  </div>
                  <div className="flex justify-center mt-4">
                        <ol className="flex justify-center gap-1 text-xs font-medium">
                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                          disabled={currentPage === 1}
                                    >
                                          <span className="sr-only">Prev Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiLeftArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>

                              {renderPageNumbers()}

                              <li>
                                    <button
                                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                                          onClick={() =>
                                                handleChangePage(Math.min(totalPages, currentPage + 1))
                                          }
                                          disabled={currentPage === totalPages}
                                    >
                                          <span className="sr-only">Next Page</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                          >
                                                <BiRightArrow className="text-xl" />
                                          </svg>
                                    </button>
                              </li>
                        </ol>
                  </div>
            </div >
      );
};

export default AdminSellerOrder;
