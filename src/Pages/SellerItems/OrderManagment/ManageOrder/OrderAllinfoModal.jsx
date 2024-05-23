import React, { useState } from 'react';
import SelectOrderProductInvoice from './SelectOrderProductInvoice';


const OrderAllinfoModal = ({ status, productList, setModalOn, modalOn, orderInfo }) => {
    // const {img, productName, productId, quantity, price, shopId, userId } = productList
    const [selectedItems, setSelectedItems] = useState([]);



    const handleCheckboxChange = (productId, index) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.some(item => item.product._id === productId._id)) {
                return prevSelectedItems.filter((item) => item.product._id !== productId._id);
            } else {
                return [...prevSelectedItems, { product: productId, index: index }];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.length === productList.length) {
            setSelectedItems([]);
        } else {
            const allProducts = productList.map((product, index) => ({ product: product, index: index }));
            setSelectedItems(allProducts);
        }
    };

    const [print, setPrint] = useState(false)


    console.log(print, 'print');

    return (
        <>
            {
                selectedItems.length > 0 && print && <SelectOrderProductInvoice print={print} orderInfo={orderInfo} setPrint={setPrint} selectedItems={selectedItems} />
            }
            {modalOn && (
                <div className="p-4  ">

                    <div className="">
                        <div className="text-md font-semibold text-start pb-3"><button onClick={() => setPrint(true)} className='bg-red-600 text-[16px] px-2 rounded text-white font-[400]'>Print   </button>    Here is all Products</div>
                        <table className="min-w-full bg-white border-2 border-black text-center text-sm font-light">
                            <thead className="border-b font-medium overflow-y-scroll">
                                <tr className="font-bold">
                                    <th scope="col" onClick={handleSelectAll} className="border-r px-2 py-4 font-[500]">
                                        <input checked={selectedItems.length === productList.length} type="checkbox" name="" id="" />
                                    </th>
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
                                        Quantity
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
                                {productList?.map((item, index) => (
                                    <ModalTableRow
                                        orderInfo={orderInfo}
                                        key={item?._id}
                                        status={status}
                                        item={item}
                                        index={index + 1}
                                        isSelected={selectedItems.some(itm => itm.product._id === item?._id)}
                                        onCheckboxChange={handleCheckboxChange}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

const ModalTableRow = ({ status, item, isSelected, onCheckboxChange, index }) => {
    const handleCheckboxChange = () => {
        onCheckboxChange(item, index);
    };

    const [readyToShip, setReadyToShip] = useState(null);
    const [modalOn, setModalOn] = useState(false);

    return (
        <tr className='border'>
            <td className="border-r px-2 py-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                />
            </td>
            <td className="border-r px-4 py-4 "><img className='h-8 w-8 rounded border' src={item.img} alt="" /></td>
            <td className="border-r px-2 py-4 text-start">{item.productName}</td>
            <td className="border-r px-2 py-4">{item.price}</td>
            <td className="border-r px-2 py-4">{item.quantity}</td>
            <td className="border-r px-2 py-4">{status}</td>
            <td className="border-r px-2 py-4"> <td className="whitespace-nowrap  px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                {(!item?.status && (
                    <>
                        <button
                            onClick={() => setReadyToShip(item)}
                            // onClick={() =>
                            //   productStatusUpdate(
                            //     "ready_to_ship",
                            //     item?._id
                            //   )
                            // }
                            className="text-[16px] font-[400] text-blue-700"
                        >
                            Ready to Ship
                        </button>
                        <button
                            onClick={() =>
                                productStatusUpdate("Cancel", item?._id)
                            }
                            className="text-[16px] font-[400] text-blue-700"
                        >
                            Cancel
                        </button>
                    </>
                )) ||
                    (item?.status === "ready_to_ship" && (
                        <button
                            onClick={() =>
                                productStatusUpdate("shipped", item?._id)
                            }
                            className="text-[16px] font-[400] text-blue-700"
                        >
                            Shipped
                        </button>
                    )) ||
                    (item?.status === "shipped" && (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() =>
                                    productStatusUpdate(
                                        "delivered",
                                        item?._id
                                    )
                                }
                                className="text-[16px] font-[400] text-blue-700"
                            >
                                Delivered
                            </button>
                            <button
                                onClick={() =>
                                    productStatusUpdate("failed", item?._id)
                                }
                                className="text-[16px] font-[400] text-blue-700"
                            >
                                Failed Delivery
                            </button>
                        </div>
                    )) ||
                    (item?.status === "delivered" && (
                        <button
                            onClick={() =>
                                productStatusUpdate("returned", item?._id)
                            }
                            className="text-[16px] font-[400] text-blue-700"
                        >
                            Returned
                        </button>
                    )) ||
                    (item?.status === "return" && (
                        <div>
                            {item?.rejectNote ? (
                                <button
                                    className="text-red-500"
                                    onClick={() => showRejectNode(item)}
                                >
                                    Rejected
                                </button>
                            ) : (
                                <div className="flex flex-col justify-center">
                                    <button
                                        onClick={() => {
                                            setShowAlert(item),
                                                checkBox(item._id);
                                        }}
                                        className="text-[16px] font-[400] text-blue-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleRejectProduct(item)
                                        }
                                        className="text-[16px] font-[400] text-blue-700"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    )) ||
                    (item?.status === "returned" && (
                        <button
                            onClick={() =>
                                productStatusUpdate(
                                    "RefoundOnly",
                                    item?._id
                                )
                            }
                            className="text-[16px] font-[400] text-blue-700"
                        >
                            Refund Data
                        </button>
                    )) ||
                    (item?.status === "Refund" && (
                        <button
                            onClick={() => viewDetails(item)}
                            className="text-[16px] font-[400] text-blue-700"
                        >
                            View Details
                        </button>
                    ))}
            </td>

                <div>
                    <div
                        onClick={() => setModalOn(false)}
                        className={`fixed z-[100] flex items-center justify-center ${modalOn?._id === item?._id
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                            } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                    >
                        <div
                            onClick={(e_) => e_.stopPropagation()}
                            className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${modalOn?._id === item?._id
                                ? "scale-1 opacity-1 duration-300"
                                : "scale-0 opacity-0 duration-150"
                                }`}
                        >
                            <h1 className="mb-2 text-2xl font-semibold">
                                Edit Order { }
                            </h1>
                            <form>
                                <div className="flex items-start w-full mb-6 flex-col gap-1">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="border border-white w-full bg-transparent text-white py-2"
                                        defaultValue={item?.addresses?.fullName}
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        onClick={() => setModalOn(false)}
                                        className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                    >
                                        Ok
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div></td>
        </tr>
    );
};

export default OrderAllinfoModal;