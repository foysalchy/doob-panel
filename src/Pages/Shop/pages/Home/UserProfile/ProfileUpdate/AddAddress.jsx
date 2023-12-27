import React, { useContext, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { ShopAuthProvider } from '../../../../../../AuthProvider/ShopAuthProvide';
import { useQuery } from '@tanstack/react-query';
import BrightAlert from 'bright-alert'
import { PiPlus } from 'react-icons/pi';
import { BiEdit } from 'react-icons/bi';
import EditAddress from './EditAddress';

const AddAddress = ({ open, setOpen, address, refetch }) => {
    const { clickAddress, setClickAddress } = useContext(ShopAuthProvider);
    
    const [newAddress, setNewAddress] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    console.log(!newAddress || !editAddress, 'data');
    const [selectedAddress, setSelectedAddress] = useState(address[0])

    useEffect(() => {
        setClickAddress(selectedAddress)
    }, [selectedAddress])
    return (
        <div>
            <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${setOpen ? "block" : "hidden"}`}>
                <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 text-center ">
                    <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10'>
                        <div className='pb-2 text-xl font-bold text-white text-center sm:text-2xl'>My Billing </div>
                        <div onClick={() => { setOpen(!open), setNewAddress(false), setEditAddress(false) }} className='cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400'>
                            <RxCross2 className='text-xl' />
                        </div>
                    </div>
                    <div className='max-h-[500px] px-10 text-start overflow-y-scroll custom-scroll' >
                        {newAddress || editAddress ? <div className='z-50'> <EditAddress refetch={refetch} data={newAddress ? true : editAddress} /></div> : <div className='grid grid-cols-2 gap-8 '>
                            {address.map((add) => (
                                <div onClick={() => setSelectedAddress(add)} className={selectedAddress._id === add._id ? " bg-gray-300 capitalize p-4 rounded hover:shadow-xl border relative" : 'bg-gray-100 capitalize p-4 rounded hover:shadow-xl border relative'}>
                                    <h1 >{add?.fullName}</h1>
                                    <h1>{add?.mobileNumber}</h1>
                                    <small><span>{add?.address},</span> <span>{add?.province} - </span> <span>{add?.city}</span> <span>{add?.area}</span></small>
                                    <br />
                                    <small className='flex gap-4 items-center mt-2'>
                                        <span className='bg-green-200 p-0.5 px-1 rounded text-[9px] text-black '> {add.deliveryLabel}</span>
                                        <span className='bg-gray-200 rounded text-[9px] px-1'>{add?.defaultAddress && "DEFAULT DELIVERY ADDRESS"}</span>
                                        <span className='bg-gray-200 rounded text-[9px] px-1'>{add?.defaultBillingAddress && "DEFAULT BILLING ADDRESS"}</span>
                                    </small>
                                    <div className='absolute top-2 right-2'>
                                        <button onClick={() => setEditAddress(add)} className='text-blue-500 hover:text-blue-600'>Edit</button>
                                    </div>
                                    {/* <div className='h-0 w-0' >{open && <AddAddress address={add} setOpen={setOpen} open={open} />}</div> */}

                                </div>
                            ))}
                            <div className="">
                                <div className='mt-10' style={{ marginBottom: '10px' }}>
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="flex gap-4 items-center justify-center"
                                        style={{
                                            padding: '10px',
                                            backgroundColor: '#f0f0f0',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <PiPlus />  Add New Delivery Address
                                    </button>

                                </div>
                                <div className='h-0 w-0' >{open && <AddAddress refetch={addressReload} address={address} setOpen={setOpen} open={open} />}</div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AddAddress;
