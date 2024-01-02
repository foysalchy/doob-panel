import React, { useState } from 'react';

const DarazModalTableRow = ({ status, itm }) => {
    const [readyToShip, setReadyToShip] = useState(false)

    return (
        <tr key={itm?._id} className="border-b ">
            <td className="whitespace-nowrap border-r text-2xl p-2">
                <img src={itm?.img} alt="" className="w-16 object-cover h-16 rounded" />
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.productName}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.price}
            </td>
            {/* <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.productId}
            </td> */}
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.quantity}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {status}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {!readyToShip && <div className="flex flex-col gap-2">
                    <button className='text-blue-500' onClick={() => setReadyToShip(!readyToShip)}>Ready to ship</button>
                    <button className='text-blue-500' onClick={() => setReadyToShip(!readyToShip)}>Cancel</button>
                </div>}
            </td>
        </tr>
    );
};

export default DarazModalTableRow;