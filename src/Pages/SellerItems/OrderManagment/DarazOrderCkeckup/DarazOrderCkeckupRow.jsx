import React, { useState } from 'react';

const DarazOrderCkeckupRow = ({ itm }) => {
    const [readyToShip, setReadyToShip] = useState(false);
    console.log(itm);
    return (
        <tr key={itm?._id} className="border-b">
            <td className="whitespace-nowrap flex items-center justify-center border-r text-2xl p-2">
                <img src={itm?.product_main_image} alt="" className="w-16 object-cover h-16 rounded" />
            </td>
            <td className="whitespace-wrap w-[280px] border-r text-md font-[400] text-gray-800 px-4">
                {itm?.name}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.paid_price}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.sku}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.quantity ? itm?.quantity : 1}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {itm?.status}
            </td>
            <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                {!readyToShip && (
                    <div className="flex flex-col gap-2">
                        <button className="text-blue-500" onClick={() => setReadyToShip(!readyToShip)}>
                            Ready to ship
                        </button>
                        <button className="text-blue-500" onClick={() => setReadyToShip(!readyToShip)}>
                            Cancel
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default DarazOrderCkeckupRow;