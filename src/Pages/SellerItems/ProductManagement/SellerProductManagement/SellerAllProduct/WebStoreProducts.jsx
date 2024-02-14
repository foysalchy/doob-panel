import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import DemoImage from './woocommerce-placeholder-600x600.png';
import { MdDelete, MdOutlineViewInAr } from "react-icons/md";

export default function WebStoreproduct({ priceRole, searchQuery }) {
    const { shopInfo } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10

    const { data: productData = [], refetch } = useQuery({
        queryKey: ["productData"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/web-store?id=${shopInfo._id}`);
                const data = await res.json();
                return data?.products;
            } catch (error) {
                throw error; // Rethrow the error to mark the query as failed
            }
        },
    });


    const filteredData = productData?.filter(
        (item) =>

            item.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            item.sku && item?.sku?.toString()?.includes(searchQuery)


    );



    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the current page data
    const currentData = filteredData.slice(startIndex, endIndex);



    // const myPriceRole = (pocket) => {
    //     const vale = priceRole.find((category) => parseInt(pocket) >= parseInt(category?.from) && parseInt(pocket) <= parseInt(category?.to));

    //     console.log(vale, ">>");

    //     const data = vale?.percentage === 'yes' ? parseInt(pocket) + (parseInt(pocket) * parseInt(vale?.priceRange)) / 100 : parseInt(pocket) + parseInt(vale?.priceRange);

    //     return data;
    // }
    const myPriceRole = (pocket) => {
        // Log the input pocket value
        console.log("Input Pocket:", pocket);

        // Find the relevant price range based on the pocket value
        const priceRange = priceRole.find((category) => {
            const from = parseInt(category.to);
            const to = parseInt(category.from);
            const parsedPocket = parseInt(pocket);
            console.log("Comparing:", from, to, parsedPocket);
            return parsedPocket >= from && parsedPocket <= to;
        });

        // Log the found price range
        console.log("Price Range:", priceRange);

        // Check if the priceRange is valid
        if (!priceRange) {
            console.log("Price range not found for the given pocket value.");
            return null;
        }

        // Parse the priceRange value based on whether it's a percentage or not
        const price = parseFloat(priceRange.priceRange);
        const data = priceRange.percentage === 'yes' ?
            parseFloat(pocket) + (parseFloat(pocket) * price) / 100 :
            parseFloat(pocket) + price;

        // Return the calculated data
        return data;
    };
    return (
        <div className="flex flex-col mt-6">
            <div style={{
                overflowY: 'scroll', // Always show the scrollbar
                scrollbarWidth: 'thin', // For Firefox
                scrollbarColor: 'gray transparent', // Set scrollbar color (gray) for Firefox
                msOverflowStyle: 'scrollbar', // For Internet Explorer and Edge
            }} className="overflow-x-scroll  ">
                <div className=" w-[1700px]">
                    <div className="overflow-hidden border  border-gray-700 md:rounded-lg">
                        <table className="w-full">
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
                                        Your Price
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
                                {
                                    filteredData && currentData?.map(product => <tr>
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
                                        <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                            {!myPriceRole(product?.price) ? product?.regular_price : myPriceRole(product?.price)}
                                        </td>
                                        <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                    {product?.sellers?.find(itm => itm?.shopUid === shopInfo?._id)?.quantity}
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

                                            </div>
                                            <div>

                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>


            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
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
                </button>
                <div className="items-center hidden lg:flex gap-x-3">

                    <div className='px-2 py-1 text-sm text-blue-500 rounded-md  bg-blue-100/60'>

                        <span> {currentPage}</span>
                    </div>

                </div>
                <button
                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredData?.length / pageSize)))}
                    disabled={currentPage === Math.ceil(filteredData?.length / pageSize)}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
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

        </div>
    );
}