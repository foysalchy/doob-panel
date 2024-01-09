import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import AddAddress from './../../../Shop/pages/Home/UserProfile/ProfileUpdate/AddAddress';
import { useReactToPrint } from 'react-to-print';
import OrderAllinfoModal from './OrderAllinfoModal';
import ShippingModal from './ShipingModal';


const OrderTable = ({ searchValue, selectedValue }) => {
    const [modalOn, setModalOn] = useState(false)
    const { shopInfo, setCheckUpData } = useContext(AuthContext);

    const { data: tData = [], refetch } = useQuery({
        queryKey: ["sellerOrder"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);


    const filteredData = tData?.filter((item) => {
        if (searchValue === '' && selectedValue === "All") {
            return true; // Include all items when searchValue is empty and selectedValue is "All"
        } else if (selectedValue === "Pending") {
            return !item?.status;
        } else if (searchValue) {
            return item?._id?.toLowerCase().includes(searchValue.toLowerCase()); // Filter by _id
        } else if (selectedValue) {
            return item?.status === selectedValue; // Filter by status
        }

        return false; // Exclude items that don't meet any condition
    });
    console.log(filteredData);
    // Calculate the range of items to display based on pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData?.slice(startIndex, endIndex);

    const formattedDate = (time) => {
        const date = new Date(time);

        // Extract individual components (year, month, day, etc.)
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Format the components as needed
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const finalDate = formattedDate + ' ' + formattedTime;
        return finalDate;

    }



    const productStatusUpdate = (status, orderId) => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order-status-update?orderId=${orderId}&status=${status}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, orderId })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (!data.error) {
                alert("Successfully Updated");
                refetch()
            } else {
                alert("Failed to Update")
            }

        });
    }

    const { data: ships = [] } = useQuery({
        queryKey: ["getaway"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/shipping-interrogation/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });


    const ratial_price = (productList) => {
        let ratial_price = 0;
        for (let i = 0; i < productList.length; i++) {
            const price = parseFloat(productList[i]?.price) * parseFloat(productList[i]?.quantity);
            ratial_price += price
        }
        return ratial_price;
    }


    function getTimeAgo(timestamp) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - timestamp;

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    console.log(filteredData);

    const [readyToShip, setReadyToShip] = useState(false)


    const [showImage, setShowImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImage(true);
    };


    const handleProductStatusUpdate = (status, order, isAccepted) => {
        const confirmation = window.confirm(`Do you want to quantity update ?`);

        if (confirmation) {
            fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order-quantity-update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            }).then((res) => res.json()).then((data) => {
                console.log(data);
                if (data.success) {
                    productStatusUpdate('Returned', order._id)
                } else {
                    alert("Failed to Update")
                }

            });
        } else {
            // Handle the case when the user clicks "No" in the confirmation dialog
            // You can add specific behavior or leave it empty based on your requirements
        }
    };
    return (
        <div className="flex flex-col overflow-hidden mt-4">
            <div className="overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full  bg-white border text-center text-sm font-light">
                            <thead className="border-b  font-medium  ">
                                <tr>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">

                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">

                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Document
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Order No.
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Order Date
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Pending Since
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Retail Price
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Status
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.map((itm, index) => (
                                    <tr className="border-b ">
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                            # {index + 1}
                                        </td>
                                        <td className="whitespace-nowrap border-r text-2xl">
                                            <button onClick={() => setModalOn(!modalOn)} className=' px-4 py-4'>+</button>
                                            <OrderAllinfoModal status={itm?.status ? itm?.status : 'Pending'} setModalOn={setModalOn} modalOn={modalOn} productList={itm?.productList} />
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 ">
                                            <Link to={`/invoice/${itm?._id}`} onClick={handlePrint} className='text-blue-600 font-[500] text-[16px]'>Invoice</Link>
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                            <Link to="order-checkup" onClick={() => setCheckUpData(itm)} className='text-blue-500 font-[400]'>{itm?._id}</Link>
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                            {formattedDate(itm?.timestamp)}
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                            {getTimeAgo(itm?.timestamp)}
                                        </td>
                                        <td className="whitespace-nowrap border-r  px-6 py-4 text-[16px] font-[400]">
                                            {itm?.method.Getaway}
                                            {itm?.method.Getaway === 'Bank' && (
                                                <div className='flex justify-center'>
                                                    <img
                                                        src={itm.file}
                                                        className='h-10 '

                                                        alt=""
                                                        onClick={() => handleImageClick(itm.file)}
                                                    />
                                                </div>
                                            )}
                                            {/* END: ed8c6549bwf9 */}


                                            {showImage && (
                                                <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
                                                    <div className="relative max-w-full max-h-full">
                                                        <span
                                                            className="absolute top-4 right-4 text-white bg-black w-10 h-10 rounded-full flex justify-center items-center cursor-pointer text-2xl"
                                                            onClick={() => setShowImage(false)}
                                                        >
                                                            X
                                                        </span>
                                                        <img
                                                            src={selectedImage}
                                                            alt=""
                                                            className="max-w-full max-h-full object-contain"
                                                            style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                            {ratial_price(itm?.productList)}
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                                            {itm?.status ? <>{itm?.status}</> : <>Pending</>}
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                                            {!itm?.status &&
                                                <> <button
                                                    // onClick={() => productStatusUpdate("ReadyToShip", itm?._id)}
                                                    onClick={() => setReadyToShip(itm)}
                                                    className='text-[16px] font-[400] text-blue-700' >Ready to Ship</button>
                                                    <button onClick={() => productStatusUpdate("Cancel", itm?._id)} className='text-[16px] font-[400] text-blue-700' >Cancel</button> </>
                                                || itm?.status == 'ReadyToShip' && <button onClick={() => productStatusUpdate("Shipped", itm?._id)} className='text-[16px] font-[400] text-blue-700' >Shipped</button>
                                                || itm?.status == 'Shipped' && <div className='flex flex-col gap-2'>
                                                    <button onClick={() => productStatusUpdate("Delivered", itm?._id)} className='text-[16px] font-[400] text-blue-700' >Delivered</button>
                                                    <button onClick={() => productStatusUpdate("Failed", itm?._id)} className='text-[16px] font-[400] text-blue-700' >Failed Delivery</button>
                                                </div>
                                                || itm?.status == 'Delivered' && <button onClick={() => productStatusUpdate("Returned", itm?._id)} className='text-[16px] font-[400] text-blue-700' >Returned</button>
                                                || itm?.status === 'Return' && (
                                                    <div className='flex flex-col justify-center'>
                                                        <button onClick={() => handleProductStatusUpdate("Returned", itm, true)} className='text-[16px] font-[400] text-blue-700'>Quantity Update</button>
                                                        <button onClick={() => handleProductStatusUpdate("Returned", itm, true)} className='text-[16px] font-[400] text-blue-700'>Reject</button>

                                                    </div>
                                                )
                                                || itm?.status == 'Returned' && <button onClick={() => productStatusUpdate("RefoundOnly", itm?._id)} className='text-[16px] font-[400] text-blue-700' >Refund only</button>
                                                || itm?.status == 'Refund' && <button onClick={() => productStatusUpdate("Refund", itm?._id)} className='text-[16px] font-[400] text-blue-700' >View Details</button>
                                            }
                                        </td>
                                        {
                                            itm._id === readyToShip._id && <ShippingModal readyToShip={readyToShip} setReadyToShip={setReadyToShip} productStatusUpdate={productStatusUpdate} orderInfo={itm} refetch={refetch} ships={ships} />
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="max-w-2xl mx-auto mt-8 pb-8">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px">
                        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`bg-white border ${currentPage === i + 1
                                        ? 'text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                        } border-gray-300 leading-tight py-2 px-3 rounded ${i === 0 ? 'rounded-l-lg' : ''
                                        } ${i === Math.ceil(filteredData.length / itemsPerPage) - 1 ? 'rounded-r-lg' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default OrderTable;