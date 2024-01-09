import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BsViewList } from 'react-icons/bs';
import { MdDelete, MdOutlineViewInAr } from 'react-icons/md';
import EditProductForm from './EditProduct';
import DemoImage from './woocommerce-placeholder-600x600.png';
import Swal from 'sweetalert2';
import DeleteModal from '../../../../../Common/DeleteModal';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';


const SellerAllProducts = () => {
    const { shopInfo } = useContext(AuthContext)
    const [loadingStates, setLoadingStates] = useState({});
    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/all-products/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    const [OpenModal, setOpenModal] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");


    const maxLength = 30;
    const pageSize = 10




    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = products?.filter(
        (item) =>
            item.productName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            item.sku && item?.sku?.toString()?.includes(searchQuery) ||
            item?.name?.toString()?.includes(searchQuery)
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the current page data
    const currentData = filteredData.slice(startIndex, endIndex);





    const updateProductStatus = (id, status) => {
        console.log(id);
        fetch(`http://localhost:5000/api/v1/seller/update-product-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                status
            })

        }).then((res) => res.json()).then((data) => {
            Swal.fire(`Success`, '', 'success')
            refetch()
        })
    }


    const [deleteId, setDeletId] = useState('')
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    const DeleteSeller = (id) => {
        console.log(id);
        setDeletId(id)
        setDeletePopUp(true)
    };
    if (isDelete) {

        fetch(`http://localhost:5000/api/v1/seller/delete-product`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: deleteId,
            })

        }).then((res) => res.json()).then((data) => {
            setIsDelete(false)
            Swal.fire('Delete Success', '', 'success')
            refetch()
        })

        console.log(deleteId, isDelete);
    }


    const updateProduct = (id, sku, item_id, category) => {

        setLoadingStates(prevLoadingStates => ({
            ...prevLoadingStates,
            [id]: true,
        }));
        const data = { category, item_id, sku, id, shopId: shopInfo._id }
        fetch("http://localhost:5000/api/v1/seller/update-product", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setLoadingStates(prevLoadingStates => ({
                    ...prevLoadingStates,
                    [id]: false,
                }));
                if (data.error) {
                    Swal.fire(`${data.message}`, '', 'warning')
                }
                else {
                    Swal.fire(`${data.message}`, '', 'success')
                    refetch()
                }


            });

    }

    return (
        <div className="">
            <div className='h-0 w-0'>   <DeleteModal setOpenModal={setDeletePopUp} OpenModal={deletePopUp} setIsDelete={setIsDelete} /></div>

            <Link
                className="group relative inline-flex mb-10 items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                to="/seller/product-management/add-product"
            >
                <span className="absolute -start-full transition-all group-hover:start-4">
                    <svg
                        className="h-5 w-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Add Product
                </span>
            </Link>

            <div className="relative w-3/5 my-6">
                <input
                    type="text"
                    id="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for..."
                    className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
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
                            className="h-4 w-4 text-black"
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

            <section >
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 ">All Product</h2>
                    <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
                        {products?.length}
                    </span>
                </div>
                <div className="flex flex-col mt-6">
                    <div style={{
                        overflowY: 'scroll', // Always show the scrollbar
                        scrollbarWidth: 'thin', // For Firefox
                        scrollbarColor: 'gray transparent', // Set scrollbar color (gray) for Firefox
                        msOverflowStyle: 'scrollbar', // For Internet Explorer and Edge
                    }} className="overflow-x-scroll  ">
                        <div className=" w-[1700px]">
                            <div className="overflow-hidden border  border-gray-700 md:rounded-lg">  <table className="w-full">
                                <thead className="bg-gray-900 text-white ">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm border font-normal text-left rtl:text-right "
                                        >
                                            <div className="flex items-center gap-x-3">

                                                <span>Name</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 border text-sm font-normal text-left rtl:text-right "
                                        >
                                            <button className="flex items-center gap-x-2">
                                                <span>Status</span>
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
                                        >
                                            <button className="flex items-center gap-x-2">
                                                <span>Categories</span>
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
                                        >
                                            Regular Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
                                        >
                                            Stock Quantity
                                        </th>
                                        <th scope="col" className="px-4 border py-3.5 text-sm font-normal text-center  ">
                                            <span >Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y  divide-gray-200 ">
                                    {currentData.map((product) => (
                                        <tr>
                                            <td className="px-4 py-4 text-sm border-2 font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">

                                                    <div className="flex items-center gap-x-2">
                                                        {product?.images[0] ? <img
                                                            className="object-cover w-10 h-10 rounded"
                                                            srcSet={product?.images[0].src}
                                                            src={product?.images[0].src}
                                                            alt=""
                                                        />
                                                            : <img
                                                                className="object-cover border border-black w-10 h-10 rounded"
                                                                srcSet={DemoImage}
                                                                src={DemoImage}
                                                                alt=""
                                                            />
                                                        }
                                                        <div>
                                                            <h2 className="font-medium text-gray-800  ">
                                                                {product?.name.split(' ').slice(0, 5).join(' ')}
                                                            </h2>
                                                            <p className="text-sm font-normal text-gray-600 ">
                                                                {product?.sku}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {!product.adminWare ? <div>
                                                    {product.status === true ? <div
                                                        onClick={() => updateProductStatus(product._id, false)}
                                                        className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        <h2 className="text-sm font-normal text-emerald-500">
                                                            Active
                                                        </h2>
                                                    </div> :
                                                        <div
                                                            onClick={() => updateProductStatus(product?._id, true)}
                                                            className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                            <h2 className="text-sm font-normal text-red-500">
                                                                Inactive
                                                            </h2>
                                                        </div>}
                                                </div>
                                                    : <div

                                                        className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                                        <h2 className="text-sm font-normal text-yellow-500">
                                                            Pending
                                                        </h2>
                                                    </div>
                                                }
                                            </td>
                                            <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                {product?.categories
                                                    .filter((category) => category !== null && category !== '')
                                                    .map((category) => (
                                                        <span key={category?.id}>{category?.name}, </span>
                                                    ))}
                                            </td>
                                            <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                {product.regular_price}
                                            </td>
                                            <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                {product.price}
                                            </td>
                                            <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                        {product?.stock_quantity}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    <button
                                                        onClick={() => DeleteSeller(product._id)}
                                                        className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none">
                                                        <MdDelete className="w-5 h-5" />

                                                    </button>

                                                    <button onClick={() => setOpenModal(true)} className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4">
                                                        <MdOutlineViewInAr className="w-5 h-5" />
                                                    </button>
                                                    {
                                                        product.woo && <button onClick={() => updateProduct(product._id, product.sku, product.item_id, 'woo')} className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4">
                                                            {loadingStates[product._id] ? 'Updating...' : 'Update on woo'}
                                                        </button>
                                                    }
                                                    {product.daraz && <button onClick={() => updateProduct(product._id, product.variations[0].SKU, product.item_id, 'daraz')} className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4">
                                                        {loadingStates[product._id] ? 'Updating...' : 'Update on Daraz'}
                                                    </button>}
                                                    {/* <div className='h-0 w-0'>
                                                            <EditProductForm OpenModal={OpenModal} setOpenModal={setOpenModal} product={product} />
                                                        </div> */}
                                                </div>
                                                <div>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center my-4'>
                        <ol className="flex justify-center gap-1 text-xs font-medium">
                            <li>
                                <button
                                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
                                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <span className="sr-only">Prev Page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <BiLeftArrow className='text-xl' />
                                    </svg>
                                </button>
                            </li>

                            {/* Render your page number buttons dynamically */}
                            {/* {Array.from({ length: totalPages }).map((_, index) => (
                            <li key={index}>
                                <button
                                    className={`block h-8 w-8 rounded border ${index + 1 === currentPage
                                        ? '' // Current page styling
                                        : 'border-gray-100 bg-white text-center leading-8 text-gray-900'
                                        }`}
                                    onClick={() => handleChangePage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))} */}
                            <div className='border-blue-600 bg-blue-600 text-white p-2 px-3 rounded'>

                                <span> {currentPage}</span>
                            </div>

                            <li>
                                <button
                                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
                                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredData?.length / pageSize)))}
                                    disabled={currentPage === Math.ceil(filteredData?.length / pageSize)}
                                >
                                    <span className="sr-only">Next Page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <BiRightArrow className='text-xl' />
                                    </svg>
                                </button>
                            </li>
                        </ol>
                    </div>

                </div>
            </section >
        </div >
    );
};
export default SellerAllProducts;