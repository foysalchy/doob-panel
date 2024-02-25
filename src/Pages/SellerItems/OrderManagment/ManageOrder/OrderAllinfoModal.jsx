import React, { useState } from 'react';
import ModalTableRow from './ModalTableRow';

const OrderAllinfoModal = ({ status, productList, setModalOn, modalOn }) => {
    // const {img, productName, productId, quantity, price, shopId, userId } = productList
    return (
        <>
            {/* bg-[#0000007a] overflow-x-hidden overflow-y-auto fixed w-screen top-0 left-0 bottom-0 h-screen z-[2000] flex items-start justify-center */}
            {
                modalOn && <div className=''>
                    <div className="">
                        {/* bg-white p-6 relative top-10 */}
                        <h3 className="text-md font-semibold text-start pb-3">Products</h3>
                        <button onClick={() => setModalOn(false)} className="bg-red-600 text-[16px] px-2 rounded text-white font-[400] absolute top-6 right-6">close</button>
                        <table className="min-w-full  bg-white border text-center text-sm font-light ">
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
                                    {/* <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Product Id...
                                    </th> */}
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
                                    productList?.map(itm => <ModalTableRow key={itm?._id} status={status} itm={itm} />)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    );
};

export default OrderAllinfoModal;