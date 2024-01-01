import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import OrderAllinfoModal from './OrderAllinfoModal';

const TableRow = ({ data }) => {
    console.log(data);
    const { _id, method, ReadytoShip, price, ShipOnTimeSLA, Status, document, documentLink, orderDate, orderNumber, pendingSince, quantity, product, sellerSku, sendTo, timestamp, productList } = data;
    const [formattedDate, setFormattedDate] = useState('');
    const [emptyAction, setEmptyAction] = useState(true);
    // const { checkUpData, setCheckUpData } = useContext(ShopAuth);
    const [modalOn, setModalOn] = useState(false);
    useEffect(() => {
        const timestamp = 1704117773133;
        const date = new Date(timestamp);

        // Format the date and time as per your requirements
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formatted = date.toLocaleDateString('en-US', options);

        setFormattedDate(formatted);
    }, []);


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
                <OrderAllinfoModal setModalOn={setModalOn} modalOn={modalOn} productList={productList} />
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 ">
                <button onClick={handlePrint} className='text-blue-600 font-[500] text-[16px]'>Invoice</button>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                <Link to="order-checkup" className='text-blue-500 font-[400]'>{_id}</Link>
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
                {Status ? <>{status}</> : <>Process</>}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                {emptyAction && <> <button onClick={() => setEmptyAction(!emptyAction)} className='text-[16px] font-[400] text-blue-700' >Ready to Ship</button>
                    <button onClick={() => setEmptyAction(!emptyAction)} className='text-[16px] font-[400] text-blue-700' >Cancel</button> </>}
            </td>
        </tr>
    );
};

export default TableRow;