import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import uploadImage from '../SellerShopInfo/Upload.json'
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const EditShopInfo = ({ Edit, setEdit, }) => {


    const { setShopInfo, shopInfo } = useContext(AuthContext)

    const { shopName, shopEmail, shopNumber, shopId, address } = shopInfo



    const [shopUnicName, setshopUnicName] = useState(shopId);
    const [errorName, setErrorName] = useState('');
    const [uniq, setUniq] = useState()

    const shopNameCheck = async (e) => {
        e.preventDefault();
        setErrorName()

        let name = e.target.value;
        name = name?.toLowerCase().replace(/\s+/g, '-');
        setshopUnicName(name);

        if (name.length > 2) {
            try {
                const response = await fetch(`http://localhost:5001/api/v1/shop/info/${name}`);
                const data = await response.json();

                if (data) {
                    setUniq(true)
                    setErrorName('')

                    values.shopId = name

                } else {
                    setErrorName('This is not uniq name')
                    setUniq(false)// Set the shop name in the state
                }
            } catch (error) {
                console.error('Error checking shop name:', error);
            }
        }
        else {
            setUniq(false)
            setErrorName("It's Not a valid Name")
        }
    };





    const [shopID, setShopID] = useState(false)


    const updateShopHandler = async (event) => {

        event.preventDefault();

        const updatedShopInfo = {
            shopName: event.target.shopName.value,
            shopNumber: event.target.shopNumber.value,
            shopEmail: event.target.shopEmail.value,
            address: event.target.address.value,
        };

        shopInfo.shopName = updatedShopInfo.shopName;
        shopInfo.shopNumber = updatedShopInfo.shopNumber;
        shopInfo.shopEmail = updatedShopInfo.shopEmail;
        shopInfo.address = updatedShopInfo.address;


        try {
            if (shopID) {
                shopInfo.shopId = shopUnicName;
                fetch(`http://localhost:5001/api/v1/shop/updateInfo`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(shopInfo)
                })
                    .then((res) => res.json())
                    .then((data) => {

                        setShopInfo(data)
                        const jsonData = JSON.stringify(data);


                        document.cookie = `SellerShop=${encodeURIComponent(jsonData)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                        Swal.fire(
                            'Updated!',
                            "",
                            'success'
                        )

                    })

            }

            else {
                fetch(`http://localhost:5001/api/v1/shop/updateInfo`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(shopInfo)
                })
                    .then((res) => res.json())
                    .then((data) => {

                        const jsonData = JSON.stringify(data);

                        document.cookie = `SellerShop=${encodeURIComponent(jsonData)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;

                        Swal.fire(
                            'Updated!',
                            "",
                            'success'
                        )

                    })


            }

        } catch (error) {
            console.error("Error updating shopInfo:", error);
        }
    };



    // const fetchUpdatedShopInfo = async (updatedShopInfo) => {
    //     // Make a POST request to update shopInfo on the server
    //     try {
    //         // const response = await axios.post('/api/shops/update', updatedShopInfo);

    //     } catch (error) {
    //         console.error("Error updating shopInfo on the server:", error);
    //     }
    // };

    // const createNewShopInfo = async (updatedShopInfo) => {
    //     // Make a POST request to create new shopInfo on the server
    //     try {
    //         fetch(`http://localhost:5001/api/v1/shop/updateInfo`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(updatedShopInfo)
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                Swal
    //             })
    //     } catch (error) {
    //         console.error("Error creating shopInfo on the server:", error);
    //     }
    // };





    return (
        <div >
            <div className={Edit ? 'flex' : 'hidden'}>
                <div className=" mx-auto py-20">

                    <div
                        className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5  ${Edit ? "block" : "hidden"
                            }`}
                    >


                        <div className="w-full max-w-[600px]   rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px]">
                            <div className='flex justify-between  pt-4 items-start w-full sticky top-0 bg-white border-b'>
                                <div className='pb-2 text-xl font-bold text-dark text-center sm:text-2xl'>Update Shop Info</div>
                                <div onClick={() => setEdit(!Edit)} className='cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500'>
                                    <button> <RxCross2 className='text-xl' /></button>
                                </div>
                            </div>
                            <div>

                                <div className='my-4  overflow-y-scroll'>
                                    <form onSubmit={updateShopHandler} className='border-2 border-gray-500 p-4 rounded-xl' action=" ">
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                name="shopName"
                                                defaultValue={shopName}
                                                placeholder="Name of Shop"
                                                className="w-full border rounded-md py-2 px-3"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="email"
                                                name="shopEmail"
                                                defaultValue={shopEmail}
                                                placeholder="Email"
                                                className="w-full border rounded-md py-2 px-3"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="number"
                                                name="shopNumber"
                                                defaultValue={shopNumber}
                                                placeholder="Phone Number"
                                                className="w-full border rounded-md py-2 px-3"
                                            />
                                        </div>
                                        {shopID && <div className="mb-4">
                                            <div className="relative">

                                                <input
                                                    required
                                                    onBlur={shopNameCheck}
                                                    type='text'
                                                    placeholder='Input Your Uniq Shop Name'

                                                    value={shopUnicName}
                                                    onChange={(e) => setshopUnicName(e.target.value)}
                                                    className={uniq ? "border-green-700 flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border  rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline" : " flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-red-500 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"}
                                                />
                                                {uniq && (
                                                    <span className="pointer-events-none absolute inset-y-0 text-green-500 font-bold end-0 grid w-10 place-content-center">
                                                        <Lottie animationData={uploadImage} loop={false} />
                                                        {/* <GrStatusGood className=' bg-green-500 rounded-full font-bold' /> */}
                                                    </span>
                                                )}
                                            </div>
                                        </div>}
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                name="address"
                                                defaultValue={address}
                                                placeholder="Shop Address"
                                                className="w-full border rounded-md py-2 px-3"
                                            />
                                        </div>

                                        <div className='flex justify-between'>

                                            <button
                                                disabled={!uniq && shopID}
                                                type="submit"
                                                className="bg-blue-500  text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                                            >
                                                Submit
                                            </button>
                                            {!shopID ? <button type='button' onClick={() => setShopID(!shopID)}>
                                                I need to update my Store Id
                                            </button> :
                                                <button type='button' onClick={() => { setShopID(!shopID); setshopUnicName(shopId) }}>
                                                    I'm happy with my current Store Id
                                                </button>}
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>




                </div>
            </div>
        </div>
    );
};

export default EditShopInfo;