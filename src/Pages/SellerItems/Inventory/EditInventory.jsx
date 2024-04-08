import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const EditInventory = ({ refetch, open, setOpen, data }) => {
    const [count, setCount] = useState(0);
    const { shopInfo } = useContext(AuthContext)
    const handleIncrease = () => {
        setCount(parseInt(count) + 1);
    };


    const handleDecrease = () => {
        setCount(parseInt(count) - 1);
    };

    const handleSubmit = () => {
        const stock = {
            productId: data._id,
            shopInfo: {
                address: shopInfo?.address,
                shopEmail: shopInfo?.shopEmail,
                shopName: shopInfo?.shopName,
                shopPhone: shopInfo?.shopPhone,
            },
            productInfo: {
                name: data?.name,
                price: data?.price,
                image: data?.featuredImage?.src,
                quantity: data?.stock_quantity,

            },
            warehouse: data?.warehouse,
            date: new Date().getTime(),
            quantity: count,
            shopId: data.shopId,
            shopName: shopInfo.shopName
        }

        {
            data.adminWare ? (fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/stock-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stock)
            }).then((res) => res.json()).then((data) => {
                refetch();
                setOpen(!open);

            })) : (fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/product-stock-update?productId=${data?._id}&quantity=${count}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },

            }).then((res) => res.json()).then((data) => {
                refetch();
                setOpen(!open);

            }))
        }
        console.log(data, '>>>>>>><<<<<<<<<<<<<<<<<<<');

    }

    return (
        <div className="fixed bg-[#000000a2] top-0 left-0 flex items-center justify-center w-screen h-screen z-[1000]">
            <div className='p-3 shadow-lg relative bg-white w-[500px] rounded-lg'>
                <header>
                    <h2 className='text-lg pb-2 border-b font-semibold'>Edit Quantity</h2>
                    <button onClick={() => setOpen(!open)} className='bg-gray-200 h-[30px] w-[30px] text-lg font-regular rounded-full flex items-center justify-center absolute right-2 top-2'>x</button>
                    {/* <h1 className="text-lg">{data?.name}</h1> */}
                    {/* form */}
                    <div ><br />
                        <div className="flex items-center ring-1 ring-gray-400 rounded-md">
                            <button
                                className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                                onClick={handleDecrease}
                            >
                                -
                            </button>
                            <input
                                onChange={(e) => setCount(e.target.value)}
                                type="text"
                                className="w-[400px] text-center"
                                value={count}
                            />
                            <button
                                className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                                onClick={handleIncrease}
                            >
                                +
                            </button>
                        </div>
                        <br />
                        {/* Add similar structure for other fields */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default EditInventory;