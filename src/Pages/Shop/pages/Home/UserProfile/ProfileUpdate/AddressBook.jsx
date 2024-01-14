import { useContext } from 'react';
import { AuthContext } from '../../../../../../AuthProvider/UserProvider';
import { PiPlus } from 'react-icons/pi';
import { useState } from 'react';
import AddAddress from './AddAddress';
import { useQuery } from '@tanstack/react-query';
import { ShopAuthProvider } from '../../../../../../AuthProvider/ShopAuthProvide';


const AddressBook = () => {
    const { shopUser, shopId, shop_id } = useContext(ShopAuthProvider)
    const [open, setOpen] = useState(false)


    const { data: address = [], refetch: addressReload } = useQuery({
        queryKey: ["address"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/user-address?userId=${shopUser?._id}&shopId=${shop_id?.shop_id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    }
                });

                const data = await res.json();
                const divisions = data.data;
                return divisions;
            } catch (error) {
                console.error("Error fetching shop data:", error);
                throw error; // Rethrow the error to mark the query as failed
            }
        },
    });



    return (
        <div>
            <div className='grid md:grid-cols-2 gap-8 '>
                {address.map((add) => (
                    <div className='bg-white capitalize p-4 rounded hover:shadow-xl border'>
                        <h1 >{add?.fullName}</h1>
                        <h1>{add?.mobileNumber}</h1>
                        <small><span>{add?.address},</span> <span>{add?.province} - </span> <span>{add?.city}</span> <span>{add?.area}</span></small>
                        <br />
                        <small className='flex gap-4 items-center mt-2'>
                            <span className='bg-green-200 p-0.5 px-1 rounded text-xs text-black '> {add.deliveryLabel}</span>
                            <span className='bg-gray-200 rounded text-xs px-1'>{add?.defaultAddress && "DEFAULT DELIVERY ADDRESS"}</span>
                            <span className='bg-gray-200 rounded text-xs px-1'>{add?.defaultBillingAddress && "DEFAULT BILLING ADDRESS"}</span>
                        </small>
                    </div>
                ))}
            </div>

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
    );
};

export default AddressBook;