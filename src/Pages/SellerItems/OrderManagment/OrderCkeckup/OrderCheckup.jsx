import { useContext } from "react";
import { ShopAuthProvider } from "../../../../AuthProvider/ShopAuthProvide";


const OrderCheckup = () => {
    console.log('+++++');
    return (
        <div>
            <div className='bg-gray-100 p-2 grid grid-cols-2 gap-6'>
                <div className="">
                    <div className="bg-white p-3 rounded-lg">
                        <h3 className="font-bold text-black">Customer Information</h3>
                        <ul className="text-gray-600 mt-3">
                            <li>
                                <span className="font-semibold">Name :</span> Home 360
                            </li>
                            <li>
                                <span className="font-semibold">Phone :</span> 01737375243
                            </li>
                            <li>
                                <span className="font-semibold">Date :</span> 01 Jan 2024 14:39
                            </li>
                            <li>
                                <span className="font-semibold">Payment Method :</span> Cashondelabery
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="">
                    <div className="bg-white p-3 rounded-lg">
                        <h3 className="font-semibold text-black">Billing Address</h3>
                        <ul className="text-gray-600 mt-3">
                            <li>
                                wret
                            </li>
                            <li>
                                Manikgonj Sadar
                            </li>
                            <li>
                                Manikgonj
                            </li>
                            <li>
                                Dhaka
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default OrderCheckup;