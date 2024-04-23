import React, { useContext, useEffect, useState } from 'react';
import PosInvoice from './PosInvoice';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import BrightAlert from 'bright-alert';

const PosProductsDetails = ({ passUser, invoice, open, setOpen, setCartProducts }) => {


    const { shopInfo } = useContext(AuthContext)
    const [user, setUser] = useState(false)
    const [error, setError] = useState(false)

    const { name, email, phoneNumber, address } = passUser
    console.log(passUser);


    const [invoiceOpen, setInvoiceOpen] = useState(false);
    const [postData, setPostData] = useState(false)
    const [existing, setExisting] = useState(false);

    const handleInvoiceSubmit = () => {

        const data = {
            invoice,
            userInfo: {
                name,
                email,
                phoneNumber,
                address
            },

            shopId: shopInfo._id,
            date: new Date().getTime(),
        }

        console.log(data, 'data....');

        if (user.name || name) {
            setPostData(data);
            fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/pos-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((res) => res.json()).then((data) => {
                if (data.status) {
                    // BrightAlert()
                    setInvoiceOpen(true)
                    setUser(false)
                    setExisting(false)
                    // setOpen(false)
                    setError(false)
                    setCartProducts([])

                }
                else {
                    setError('User not found')
                    setUser(false)
                }
            })
        }




    }


    useEffect(() => {
        if (open) {
            handleInvoiceSubmit()
        }
    }, [open])




    return (
        <div>
            {/* {
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

                        {/* 
                        <h1 className="text-2xl font-bold mb-2 mt-4">User Info</h1>

                        <h1 className='flex gap-2'> <input onClick={() => { setExisting(!existing), setUser(false) }} type="checkbox" />Existing User ?</h1>

                        {existing && <div>
                            <label> Search User</label>
                            <div className='flex gap-2 items-center'>
                                <select onChange={(e) => setSearchType(e.target.value)} className='mt-1 p-2 border  focus:outline-none focus:border-gray-500  focus:ring-0' name="" id="">
                                    <option value="userNumber">Phone Number</option>
                                    <option value="userEmail">Email</option>
                                </select>
                                <input onChange={(e) => setSearchValue(e.target.value)} className='mt-1 ml-2 w-full p-2 border  focus:outline-none focus:border-gray-500  focus:ring-0' type="text" name="" id="" />
                                <button onClick={() => fetchData()} className='p-2  px-4 bg-gray-900 text-white'>
                                    Search
                                </button>
                            </div>
                        </div>}
                        {
                            error && <p className='text-sm text-red-500'>Error: {error}</p>
                        } 

                        <button
                            disabled={postData ? true : false}
                            className={`${postData ? 'bg-gray-500 cursor-not-allowed' : "bg-gray-900"} b text-white rounded-md p-2 w-full mt-3`}
                            onClick={handleInvoiceSubmit} >
                            Submit
                        </button>

                     


                        {/* <button onClick={handleInvoiceSubmit} className='bg-gray-900 text-white px-2 w-full py-2 rounded-md mt-5'>Submit</button>
                        {postData && <PosInvoice setOpen={setOpen} invoiceData={postData} setInvoiceOpen={setInvoiceOpen} invoiceOpen={invoiceOpen} />} 
                    </div>
                </div>
            } */}
            {postData && <PosInvoice setCartProducts={setCartProducts} setUser={setUser} setOpen={setOpen} invoiceData={postData} setInvoiceOpen={setInvoiceOpen} invoiceOpen={invoiceOpen} />}
        </div>
    );
};

export default PosProductsDetails;