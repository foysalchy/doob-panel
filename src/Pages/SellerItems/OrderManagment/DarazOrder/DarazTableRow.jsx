import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import OrderAllinfoModal from './DarazOrderAllinfoModal';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import DarazOrderAllinfoModal from './DarazOrderAllinfoModal';

const DarazTableRow = ({ data }) => {
    console.log(data);
    const { _id, order_number, created_at, payment_method, method, ReadytoShip, price, ShipOnTimeSLA, statuses, document, documentLink, orderDate, orderNumber, pendingSince, quantity, product, sellerSku, sendTo, timestamp, productList } = data;
    const [formattedDate, setFormattedDate] = useState('');
    const [emptyAction, setEmptyAction] = useState(true);
    const { checkUpDarazData, setCheckUpDarazData } = useContext(AuthContext);
    const [modalOn, setModalOn] = useState(false);
    useEffect(() => {
        const Timestamp = timestamp;
        const date = new Date(Timestamp);

        // Format the date and time as per your requirements
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formatted = date.toLocaleDateString('en-US', options);

        setFormattedDate(formatted);
    }, []);


    //? summation productList product total price
    let ratial_price = 0;
    // for (let i = 0; i < productList.length; i++) {
    //     const price = parseFloat(productList[i]?.price);
    //     ratial_price += price

    // }

    console.log(data, '++++++++++++++++++++');

    const getTimeAgo = (createdAt) => {
        const currentDate = new Date();
        const createdDate = new Date(createdAt);
        const timeDifference = currentDate - createdDate;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    };

    // ? download invoice
    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // });
    return (
        <tr className="border-b ">
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                <div class="flex">
                    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-1" />

                </div>
            </td>
            <td className="whitespace-nowrap border-r text-2xl">
                <button onClick={() => setModalOn(!modalOn)} className=' px-4 py-4'>+</button>
                {/* <DarazOrderAllinfoModal status={Status ? Status : 'Process'} setModalOn={setModalOn} modalOn={modalOn} productList={productList} /> */}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 ">
                <Link to={`/darazinvoice/${order_number}`} onClick="" className='text-blue-600 font-[500] text-[16px]'>Invoice</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                <Link to={`${order_number}`} className='text-blue-500 font-[400]'>{order_number}</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {/* {formattedDate} */}{created_at}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {getTimeAgo(created_at)}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {payment_method}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {price}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {statuses ? <>{statuses[0]}</> : <>Process</>}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                {emptyAction && statuses[0] == "pending" && <> <button onClick={() => setEmptyAction(!emptyAction)} className='text-[16px] font-[400] text-blue-700' >Ready to Ship</button>
                    <button onClick={() => setEmptyAction(!emptyAction)} className='text-[16px] font-[400] text-blue-700' >Cancel</button> </>}
            </td>
        </tr>
    );
};

export default DarazTableRow;