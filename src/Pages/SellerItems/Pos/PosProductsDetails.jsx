import React, { useState } from 'react';

const PosProductsDetails = ({ invoice, open, setOpen }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    return (
        <div>
            {
                open && <div className='bg-[#050505bc]  w-screen  fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-[1000]'>
                    <div className="w-[600px] max-h-[90%] overflow-y-auto p-6 bg-white rounded-lg">
                        <button onClick={() => setOpen(!open)} className='p-2 float-right text-lg'>x</button>
                        <h1 className="text-lg pb-3 border-b">Products</h1>
                        <ul className="py-2">
                            {
                                invoice?.items?.map((itm, index) => <li key={index}>
                                    <div className="flex gap-2 items-center border-b  py-2 ">
                                        <img src={itm?.img} className='w-[60px] ring-1 ring-gray-300 h-[60px] rounded-md ' alt="" />
                                        <div className="">
                                            <h3 className="font-semibold">{itm?.name.slice(0, 40)}</h3>
                                            <h3 className="flex gap-10">Price: {itm?.price} <span>Qty:<span>{itm?.quantity} </span></span></h3>
                                        </div>

                                    </div>
                                </li>)
                            }
                        </ul>
                        <ul className="">
                            <li className='flex justify-between  w-full items-center'>
                                <span className="font-regular">Total:</span> <p>{invoice?.total}</p>
                            </li>
                            <li className='flex justify-between items-center w-full'>
                                <span className="font-regular">Pay Amount:</span> <p>{invoice?.cash}</p>
                            </li>
                            {invoice?.discount > 0 && <li className='flex justify-between items-center w-full'>
                                <span className="font-regular">Discount:</span> <p>{parseInt(invoice?.discount)}</p>
                            </li>}
                            <li className='flex font-bold justify-between items-center border-t mt-3 w-full'>
                                <span className="">Change:</span> <p>{parseInt(invoice?.change)}</p>
                            </li>
                        </ul>


                        <h1 className="text-2xl font-bold mb-2 mt-4">User Info</h1> 
                        
                        <form>

                            <div className="mb-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
                                    Phone Number:
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                                    Address:
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                            </div>
                        </form>


                        <button className='bg-gray-900 text-white px-2 w-full py-2 rounded-md mt-5'>Proceed</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default PosProductsDetails;