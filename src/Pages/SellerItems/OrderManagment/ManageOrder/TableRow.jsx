import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import OrderAllinfoModal from './OrderAllinfoModal';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const TableRow = ({ data, refetch }) => {
    console.log(data);
    const { _id, method, order_number, ReadytoShip, price, ShipOnTimeSLA, status, document, documentLink, orderDate, orderNumber, pendingSince, quantity, product, sellerSku, sendTo, timestamp, productList, action } = data;
    const [formattedDate, setFormattedDate] = useState('');
    // const [emptyAction, setEmptyAction] = useState(true);
    const { checkUpData, setCheckUpData } = useContext(AuthContext);
    const [modalOn, setModalOn] = useState(false);
    useEffect(() => {
        const Timestamp = timestamp;
        const date = new Date(Timestamp);

        // Format the date and time as per your requirements
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formatted = date.toLocaleDateString('en-US', options);

        setFormattedDate(formatted);
    }, []);

    const productStatusUpdate = (status, orderId) => {

        // need a post mathod here bosy have id and status 
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
        // console.log("console log data");
        console.log(status, orderId, "whare is this");
    }


    //? summation productList product total price
    let ratial_price = 0;
    for (let i = 0; i < productList.length; i++) {
        const price = parseFloat(productList[i]?.price);
        ratial_price += price

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

    // ? download invoice
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <tr className="border-b ">
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                <div class="flex">
                    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-1" />

                </div>
            </td>
            <td className="whitespace-nowrap border-r text-2xl">
                <button onClick={() => setModalOn(!modalOn)} className=' px-4 py-4'>+</button>
                <OrderAllinfoModal status={status ? status : 'Pending'} setModalOn={setModalOn} modalOn={modalOn} productList={productList} />
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 ">
                <Link to={`/invoice/${data?._id}`} onClick={handlePrint} className='text-blue-600 font-[500] text-[16px]'>Invoice</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                <Link onClick={() => setCheckUpData(data)} to="order-checkup" className='text-blue-500 font-[400]'>{_id}</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {formattedDate}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {getTimeAgo(timestamp)}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {method.Getaway}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {ratial_price}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {status ? <>{status}</> : <>Pending</>}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                {!status &&
                    <> <button onClick={() => productStatusUpdate("ReadyToShip", _id)} className='text-[16px] font-[400] text-blue-700' >Ready to Ship</button>
                        <button onClick={() => productStatusUpdate("Cancel", _id)} className='text-[16px] font-[400] text-blue-700' >Cancel</button> </>}
            </td>
        </tr>
    );
};

export default TableRow;