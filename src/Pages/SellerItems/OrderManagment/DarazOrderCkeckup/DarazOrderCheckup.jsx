import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import DarazOrderCkeckupRow from "./DarazOrderCkeckupRow";


const DarazOrderCheckup = () => {
    const { checkUpData, setCheckUpData } = useContext(AuthContext);
    const [originalValue] = useState(checkUpData?.timestamp);
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const timestamp = parseInt(originalValue);
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString(); // You can customize the format using toLocaleDateString and toLocaleTimeString

        setFormattedDate(formattedDate);
    }, [originalValue]);
     return (
        <div className="bg-gray-100">
            <div className=' p-2 grid grid-cols-2 gap-6'>
                <div className="">
                    <div className="bg-white p-3 rounded-lg">
                        <h3 className="font-bold text-black">Customer Information</h3>
                        <ul className="text-gray-600 mt-3">
                            <li>
                                <span className="font-semibold">Name :</span> {checkUpData?.addresses?.fullName}
                            </li>
                            <li>
                                <span className="font-semibold">Phone :</span> {checkUpData?.addresses?.mobileNumber}
                            </li>
                            <li>
                                <span className="font-semibold">Date :</span> {formattedDate}
                            </li>
                            <li>
                                <span className="font-semibold">Payment Method :</span> {checkUpData?.method?.Getaway}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="">
                    <div className="bg-white p-3 rounded-lg">
                        <h3 className="font-semibold text-black">Billing Address</h3>
                        <ul className="text-gray-600 mt-3">
                            <li>
                                {checkUpData?.addresses?.address}
                            </li>
                            <li>
                                {checkUpData?.addresses?.area}
                            </li>
                            <li>
                                {checkUpData?.addresses?.city}
                            </li>
                            <li>
                                {checkUpData?.addresses?.province}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ? products */}
            <div className="p-2 mt-8">
                <h2 className="text-lg pb-2">Products</h2>
                <table className="w-full  bg-white border text-center text-sm font-light ">
                    <thead className="border-b  font-medium  overflow-y-scroll">
                        <tr className='font-bold'>

                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Image
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Name
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Price
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Product Id
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                quantity
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Status
                            </th>
                            <th scope="col" className="border-r px-2 py-4 font-[500]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            checkUpData?.productList?.slice(0, 4)?.map(itm => <DarazOrderCkeckupRow key={itm?._id} itm={itm} />)
                        }

                    </tbody>
                </table>

                <div className="flex justify-center py-12 ">
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px">
                            <li>
                                <a href="#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page"
                                    className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    );
};

export default DarazOrderCheckup;