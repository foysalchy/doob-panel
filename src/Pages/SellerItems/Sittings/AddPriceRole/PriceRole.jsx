import { useContext, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import EditPriceRoleModal from "./EditPriceRoleModal";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";

export default function PriceRole() {
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([1, 2, 3, 4, 5, 6, 7]);
    const { shopInfo } = useContext(AuthContext);
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = Math.ceil(filteredData?.length / pageSize);

    // const currentData = filteredData?.slice(startIndex, endIndex);


    const { data: priceRole = [], refetch } = useQuery({
        queryKey: ["priceRole"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/get-price-role/${shopInfo?._id}`);
            const data = await res.json();
            console.log(data, 'data');
            return data?.data;
        },
    });


    const handleDelete = (id) => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/delete-price-role?id=${id}`, {
            method: 'DELETE',
            headers: {

                'Content-Type': 'application/json'
            },

        }).then((res) => res.json()).then((data) => {
            refetch();
            BrightAlert('Deleted Successfully');
        })
    }

    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <Link to={`/seller/settings/add-price-role`}>
                <button className="border-gray-900 bg-gray-900  text-center leading-8 text-gray-100 rounded-lg px-4 py-2 mb-3">Add Price Role</button>
            </Link>

            {/* <button
                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : ''
                    }`}
                onClick={() => handleChangePage(pageNumber)}
            >
                {pageNumber}
            </button> */}

            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tl ">
                            To
                        </th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                            From
                        </th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                            Price Range
                        </th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800 ">
                            Percentage
                        </th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-800  rounded-tr ">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody >
                    {
                        priceRole?.map(itm => <tr key={itm?._id} className='border bg-gray-50'>
                            <td className="px-4 border-r py-3">
                                {itm?.to ? itm.to : 'Empty'}
                            </td>
                            <td className="px-4 border-r py-3">
                                {itm?.from ? itm.from : 'Empty'}
                            </td> <td className="px-4 border-r py-3">
                                {itm?.priceRange ? itm.priceRange : 'Empty'}
                            </td>
                            <td className="px-4 border-r py-3 capitalize">
                                {itm?.percentage ? itm.percentage : 'No'}
                            </td>

                            <td className="px-4 border-r py-3 flex gap-4">
                                <button onClick={() => handleDelete(itm?._id)} className="text-red-600">Delete</button>
                                <button onClick={() => setOpen(itm)} className="text-blue-600">Edit</button>
                            </td>
                            <div className="m-0 p-0">
                                {open?._id === itm?._id && <EditPriceRoleModal itm={itm} setOpen={setOpen} />}
                            </div>
                        </tr>)
                    }

                </tbody>
            </table>

            {/* <div className='flex justify-center mt-4'>
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
                                <BiLeftArrow className='text-xl' />
                            </svg>
                        </button>
                    </li>

                    {renderPageNumbers()}

                    <li>
                        <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                            onClick={() => handleChangePage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
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
            </div> */}
        </div>
    );
}