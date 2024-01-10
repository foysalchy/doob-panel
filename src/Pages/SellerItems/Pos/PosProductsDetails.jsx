import React from 'react';

const PosProductsDetails = ({ mData, open, setOpen }) => {
    console.log(mData, 'mData');
    return (
        <>
            {
                open && <div className='bg-[#050505bc] w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-[1000]'>
                    <div className="w-[500px] p-6 bg-white rounded-lg">
                        <button onClick={() => setOpen(!open)} className='p-2 float-right text-lg'>x</button>
                        <h1 className="text-lg pb-3 border-b">Products</h1>
                        <ul className="py-2">
                            {
                                mData?.cartProducts?.map((itm, index) => <li key={index}>
                                    <div className="flex gap-2 items-center border-b  py-2 ">
                                        <img src={itm?.MetaImage} className='w-[60px] ring-1 ring-gray-300 h-[60px] rounded-md ' alt="" />
                                        <div className="">
                                            <h3 className="font-semibold">{itm?.name.slice(0, 40)}</h3>
                                            <h3 className="">{itm?.price}</h3>
                                        </div>
                                    </div>
                                </li>)
                            }
                        </ul>
                        <ul className="">
                            <li className='flex justify-between  w-full items-center'>
                                <span className="font-regular">Total:</span> <p>{mData?.totalPrice}</p>
                            </li>
                            <li className='flex justify-between items-center w-full'>
                                <span className="font-regular">Pay Amount:</span> <p>{mData?.cashValue}</p>
                            </li>
                            <li className='flex font-bold justify-between items-center border-t mt-3 w-full'>
                                <span className="">Change:</span> <p>{mData?.mainPrice}</p>
                            </li>
                        </ul>
                        <button className='bg-gray-900 text-white px-2 w-full py-2 rounded-md mt-5'>Proceed</button>
                    </div>
                </div>
            }
        </>
    );
};

export default PosProductsDetails;