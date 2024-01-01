import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const TableRow = ({ data }) => {
    console.log(data);
    const { method, ReadytoShip, price, ShipOnTimeSLA, Status, document, documentLink, orderDate, orderNumber, pendingSince, quantity, product, sellerSku, sendTo, timestamp } = data;


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

    return (
        <tr className="border-b ">
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                <div class="flex">
                    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-1" />

                </div>
            </td>
            <td className="whitespace-nowrap border-r px-4 py-4 text-2xl">
                +
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 ">
                <Link className='text-[16px] font-[400] text-blue-700' to={documentLink}>{document}</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 ">
                <Link className='text-[16px] font-[400] text-blue-700' to={orderNumber}>{orderNumber}</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {getTimeAgo(timestamp)}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {pendingSince}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {method.Getaway}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {price}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {Status}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {ShipOnTimeSLA}
            </td>
            <td className="whitespace-nowrap border-r px-4 py-4 text-[16px] font-[400]">
                {
                    quantity
                }

            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                <button className='text-[16px] font-[400] text-blue-700' >Ready to Ship</button>
                <button className='text-[16px] font-[400] text-blue-700' >Cancel</button>
            </td>
        </tr>
    );
};

export default TableRow;