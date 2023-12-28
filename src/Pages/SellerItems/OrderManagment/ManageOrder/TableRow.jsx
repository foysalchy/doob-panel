import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const TableRow = ({ data }) => {
    const { PaymentMethod, ReadytoShip, RetailPrice, ShipOnTimeSLA, Status, document, documentLink, orderDate, orderNumber, pendingSince, printed, product, sellerSku, sendTo } = data;

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
                {orderDate}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {pendingSince}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {PaymentMethod}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {RetailPrice}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {Status}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                {ShipOnTimeSLA}
            </td>
            <td className="whitespace-nowrap border-r px-4 py-4 text-[16px] font-[400]">
                {
                    printed ? <BiCheck className='text-3xl text-green-600' /> : <CgClose className='text-2xl text-red-600' />
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