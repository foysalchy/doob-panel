import React, { useContext, useState } from 'react';
import { BiEdit, BiSearch } from 'react-icons/bi';
import EditInventory from './EditInventory';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { FaExclamationCircle, FaArrowDown, FaEquals, FaCheckCircle } from 'react-icons/fa';


const InventoryManagement = () => {
    const [open, setOpen] = useState(false);
    const { shopInfo } = useContext(AuthContext)

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all'); // Default filter option


    const { data: productData = [], refetch } = useQuery({
        queryKey: ["productData"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/all-products/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });



    const getStatus = (quantity) => {
        if (quantity <= 0) {
            return { text: 'Stock Out', color: 'text-red-500', icon: <FaExclamationCircle /> };
        } else if (quantity <= 10) {
            return { text: 'Lowest Stock', color: 'text-orange-500', icon: <FaArrowDown /> };
        } else if (quantity <= 50) {
            return { text: 'Average Stock', color: 'text-yellow-500', icon: <FaEquals /> };
        } else {
            return { text: 'Good Stock', color: 'text-green-500', icon: <FaCheckCircle /> };
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };
    const filteredProducts = productData.filter((product) => {
        if (selectedFilter === "all") {
            return product;
        } else if (selectedFilter === "Good Stock") {
            return product.stock_quantity > 50;
        } else if (selectedFilter === "Average Stock") {
            return product.stock_quantity <= 50 && product.stock_quantity > 10;
        } else if (selectedFilter === "Lowest Stock") {
            return product.stock_quantity <= 10 && product.stock_quantity > 0;
        } else if (selectedFilter === "Stock Out") {
            return product.stock_quantity <= 0;
        }
    })

    const searchProduct = filteredProducts.filter((product) => {
        if (searchTerm === "") {
            return product;
        } else if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return product;
        }
    })


    // console.log(productData);
    return (
        <div>
            <div className="overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        {/* Search Input */}
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

                        {/* Search Button */}


                        {/* Filter Options */}
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
                    <div className="overflow-hidden mt-3">
                        <table className="min-w-full  bg-white border text-center text-sm font-light">
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
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Regular Price
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Sale Price
                                    </th>

                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Stock Quantity
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {searchProduct?.map(product => {
                                    const status = getStatus(product?.stock_quantity);
                                    return (
                                        <tr className="border-b ">

                                            <td className="whitespace-nowrap border-r px-2 py-2 font-medium ">
                                                <img src={product?.featuredImage?.src} alt="" className="w-[80px] h-[80px] rounded-lg object-cover m-auto" />
                                            </td>
                                            <td className="whitespace-wrap text-sm text-start w-[300px] border-r px-6 py-4 font-medium ">
                                                {product?.name}
                                            </td>
                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                {product?.price}
                                            </td>
                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                {product?.regular_price}
                                            </td>
                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                {product?.sale_price}
                                            </td>

                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                {product?.stock_quantity}
                                            </td>

                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                <>
                                                    <div className={`text-xs  ${status.color}`}>
                                                        <p className='flex items-center gap-2 justify-center'>{status.icon} {status.text}</p>
                                                    </div>
                                                </>
                                            </td>
                                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                <button onClick={() => setOpen(product)} className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded-lg">Edit</button>
                                            </td>

                                            {open._id === product._id && <div className='h-0 w-0'>
                                                <EditInventory refetch={refetch} data={product} open={open} setOpen={setOpen} />
                                            </div>}
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default InventoryManagement;