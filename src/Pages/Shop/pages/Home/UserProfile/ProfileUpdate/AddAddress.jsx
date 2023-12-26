import React, { useContext, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { ShopAuthProvider } from '../../../../../../AuthProvider/ShopAuthProvide';
import { useQuery } from '@tanstack/react-query';
import BrightAlert from 'bright-alert'
import { PiPlus } from 'react-icons/pi';
import { BiEdit } from 'react-icons/bi';
import EditAddress from './EditAddress';

const AddAddress = ({ open, setOpen, address, refetch }) => {
    // const { shopUser, shopId, shop_id } = useContext(ShopAuthProvider);

    const [newAddress, setNewAddress] = useState(false)
    const [editAddress, setEditAddress] = useState(false)

    // const [division, setDivision] = useState('');
    // const [district, setDistrict] = useState('');

    // const { data: divisions = [], refetch: refetchDivisions } = useQuery({
    //     queryKey: ["divisions"],
    //     queryFn: async () => {
    //         try {
    //             const res = await fetch(`https://bdapis.com/api/v1.1/divisions`);
    //             const data = await res.json();
    //             const divisions = data.data;
    //             return divisions;
    //         } catch (error) {
    //             console.error("Error fetching shop data:", error);
    //             throw error; // Rethrow the error to mark the query as failed
    //         }
    //     },
    // });

    // const { data: districts = [], refetch: refetchDistricts } = useQuery({
    //     queryKey: ["districts"],
    //     queryFn: async () => {
    //         try {
    //             if (division) {
    //                 const res = await fetch(`https://bdapis.com/api/v1.1/division/${division}`);
    //                 const data = await res.json();
    //                 const districts = data.data;
    //                 return districts;
    //             }
    //             return [];
    //         } catch (error) {
    //             console.error("Error fetching shop data:", error);
    //             throw error; // Rethrow the error to mark the query as failed
    //         }
    //     },
    // });


    // const submitData = (e) => {
    //     e.preventDefault();

    //     const fullName = document.getElementById('fullName').value;
    //     const mobileNumber = document.getElementById('mobileNumber').value;
    //     const province = document.getElementById('province').value;
    //     const city = document.getElementById('city').options[document.getElementById('city').selectedIndex].label;
    //     const area = document.getElementById('area').value;
    //     const address = document.getElementById('address').value;
    //     const landmark = document.getElementById('landmark').value;
    //     const deliveryLabel = document.getElementById('deliveryLabel').value;
    //     const defaultAddress = document.getElementById('defaultAddress').checked;
    //     const defaultBillingAddress = document.getElementById('defaultBillingAddress').checked;

    //     const data = {
    //         fullName,
    //         mobileNumber,
    //         province,
    //         city,
    //         area,
    //         address,
    //         landmark,
    //         deliveryLabel,
    //         defaultAddress,
    //         defaultBillingAddress,
    //         shopId: shop_id?.shop_id,
    //         userId: shopUser?._id
    //     };
    //     console.log(data);

    //     fetch('https://salenow-v2-backend.vercel.app/api/v1/shop/upload-Address', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "ngrok-skip-browser-warning": "69420",
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             BrightAlert()
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             // Handle the error
    //         });
    // }

    console.log(!newAddress || !editAddress, 'data');



    const [selectedAddress, setSelectedAddress] = useState(address[0])

    // const upazilla = district && JSON?.parse(district).upazilla

    return (
        <div>
            <div className={setOpen ? 'flex' : 'hidden'}>
                <div className="mx-auto py-20">
                    <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-30 shadow-2xl px-4 py-5 ${setOpen ? "block" : "hidden"}`}>
                        <div className="w-full max-w-[800px] h-[90%] rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] overflow-scroll relative">
                            <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b'>
                                <div className='pb-2 text-xl font-bold text-dark text-center sm:text-2xl'>My Billing Address</div>
                                <div onClick={() => { setOpen(!open), setNewAddress(false), setEditAddress(false) }} className='cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500'>
                                    <button><RxCross2 className='text-xl' /></button>
                                </div>
                            </div>


                            <div className='text-start my-4'>
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
                                </div>}

                            </div>




                            <div className={newAddress || !editAddress ? " z-50" : 'flex justify-between  py-4 items-start w-full absolute bottom-0 -z-50'}>

                                <div >
                                    {newAddress || !editAddress && <button
                                        onClick={() => setNewAddress(true)}
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
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AddAddress;
