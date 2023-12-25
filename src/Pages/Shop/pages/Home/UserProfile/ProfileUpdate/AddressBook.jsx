import { useContext } from 'react';
import { AuthContext } from '../../../../../../AuthProvider/UserProvider';
import { PiPlus } from 'react-icons/pi';
import { useState } from 'react';
import AddAddress from './AddAddress';
import { useQuery } from '@tanstack/react-query';
import { ShopAuthProvider } from '../../../../../../AuthProvider/ShopAuthProvide';


const AddressBook = () => {
    const { shopUser, shopId } = useContext(ShopAuthProvider)
    const [open, setOpen] = useState(false)


    const { data: address = [], refetch: addressReload } = useQuery({
        queryKey: ["address"],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/shop/user-address?userId=${shopUser?._id}&shopId=${shopId}`);

                const data = await res.json();
                const divisions = data.data;
                return divisions;
            } catch (error) {
                console.error("Error fetching shop data:", error);
                throw error; // Rethrow the error to mark the query as failed
            }
        },
    });

    console.log(address);

    return (
        <div>
            <div className='grid grid-cols-2 gap-8 '>
                {address.map((add) => (
                    <div className='bg-gray-100 capitalize p-4 rounded hover:shadow-xl border'>
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
            <div >{open && <AddAddress setOpen={setOpen} open={open} />}</div>

        </div >
    );
};

export default AddressBook;