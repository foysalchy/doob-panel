import { useState } from 'react';

const WarehouseProductModal = ({ setOpenModal, products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='bg-[#ffffff]  h-screen  overflow-y-auto top-0 pt-10 fixed right-0 left-0 flex  flex-col items-center gap-4 justify-start z-[6000] '>
            <h1 className='text-xl text-black font-semibold'>WareHouse</h1>
            <button onClick={() => setOpenModal(false)} className='text-2xl text-black absolute right-8 top-4'>x</button>
            <section className="container  flex-col  items-center px-4 mx-auto flex justify-center">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto ">
                        <div className="inline-block   py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className=" divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <span>Photo</span>
                                                    </div>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Name
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Category
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Regular Price
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Price
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Warehouse
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {currentProducts.map((product, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <img src={product?.featuredImage?.src} alt="product" className="w-[60px] h-[60px] rounded-md object-cover" />
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 w-[200px]">
                                                    <span className="w-[300px]">{product?.name}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap w-[300px] flex items-center flex-wrap gap-2">
                                                    {product?.categories.map(itm => (
                                                        <span className='bg-blue-500 text-white font-[400] px-2 rounded-full text-[10px]' key={itm?.name}>{itm?.name}</span>
                                                    ))}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {product?.price}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {product?.regular_price}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {product?.stock_quantity}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap w-[300px] flex items-center flex-wrap gap-2">
                                                    {product?.warehouse.map(itm => (
                                                        <span className='bg-blue-500 text-white font-[400] px-2 rounded-full text-[10px]' key={itm?.name}>{itm?.name}</span>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                        {currentProducts.length === 0 && (
                                            <tr>
                                                <td colSpan={8} className="px-4 py-4 text-sm font-medium text-gray-700 text-center">
                                                    No products available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 items-center justify-between mt-6">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
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
                        <span>Previous</span>
                    </button>
                    <div className="items-center hidden md:flex gap-3">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageClick(index + 1)}
                                className={`px-5 py-2  text-sm rounded-md dark:bg-gray-800 ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
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
                    </button>
                </div>
            </section>
        </div>
    );
};

export default WarehouseProductModal;