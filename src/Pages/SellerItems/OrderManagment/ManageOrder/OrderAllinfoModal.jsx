import React from 'react';

const OrderAllinfoModal = ({ productList, setModalOn, modalOn }) => {
    // const {img, productName, productId, quantity, price, shopId, userId } = productList
    console.log(productList, 'modal');
    return (
        <>
            {
                modalOn && <div className='bg-[#000000f0] overflow-x-hidden overflow-y-auto fixed w-screen top-0 left-0 bottom-0 h-screen z-[2000] flex items-start justify-center'>
                    <div className="bg-white p-6 relative top-10">
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
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Product Id
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        quantity
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        shop Id
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        User Id
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productList?.map(itm => <tr key={itm?._id} className="border-b ">
                                        <td className="whitespace-nowrap border-r text-2xl p-2">
                                            <img src={itm?.img} alt="" className="w-16 object-cover h-16 rounded" />
                                        </td>
                                        <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                            {itm?.productName}
                                        </td>
                                        <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                            {itm?.price}
                                        </td>
                                        <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                            {itm?.productId}
                                        </td>
                                        <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                            {itm?.quantity}
                                        </td>
                                        <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                            {itm?.shopId}
                                        </td>
                                        <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                                            {itm?.userId}
                                        </td>
                                    </tr>)
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