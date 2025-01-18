import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import OrderCkeckupRow from "./OrderCkeckupRow";
import { Check, Package, ThumbsUp, Truck, User } from 'lucide-react'

const OrderCheckup = () => {
      const { checkUpData, setCheckUpData } = useContext(AuthContext);
      console.log("🚀 ~ file: OrderCheckup.jsx:8 ~ OrderCheckup ~ checkUpData:", checkUpData)
      const [originalValue] = useState(checkUpData?.timestamp);
      const [formattedDate, setFormattedDate] = useState('');

      useEffect(() => {
            const timestamp = parseInt(originalValue);
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString(); // You can customize the format using toLocaleDateString and toLocaleTimeString

            setFormattedDate(formattedDate);
      }, [originalValue]);


      const totalPrice = checkUpData?.productList?.reduce((total, item) => {
            return total + item?.price * item?.quantity;
      }, 0);
      return (
            <div className="bg-gray-100">
                  <div className=' p-2 grid grid-cols-2 gap-6'>
                        <div className="">
                              <div className="bg-white p-3 rounded-lg">
                                    <h3 className="font-bold text-black">Customer Information </h3>
                                    <ul className="text-gray-600 mt-3">
                                          <li>
                                                <span className="font-semibold">Name :</span> {checkUpData?.addresses?.fullName}
                                          </li>
                                          <li>
                                                <span className="font-semibold">Phone :</span> {checkUpData?.addresses?.mobileNumber}
                                          </li>
                                          <li>
                                                <span className="font-semibold">Date :</span> {formattedDate}
                                          </li>
                                          <li>
                                                <span className="font-semibold">Payment Method :</span> {checkUpData?.method?.Getaway}
                                          </li>
                                          <li className="capitalize">
                                                <span className="font-semibold ">Payment Status :</span> {checkUpData?.paid_status ?? "Unpaid"}
                                          </li>
                                          {checkUpData?.file && <li>
                                                <a href={checkUpData?.file} target="_blank" rel="noopener noreferrer">
                                                      <img className="w-40" src={checkUpData?.file} alt="" />
                                                </a>
                                          </li>}
                                    </ul>
                              </div>
                        </div>
                        <div className="">
                              <div className="bg-white p-3 rounded-lg">
                                    <h3 className="font-semibold text-black">Billing Address</h3>
                                    <ul className="text-gray-600 mt-3">
                                          <li>
                                                {checkUpData?.addresses?.address}
                                          </li>
                                          <li>
                                                {checkUpData?.addresses?.area}
                                          </li>
                                          <li>
                                                {checkUpData?.addresses?.city}
                                          </li>
                                          <li>
                                                {checkUpData?.addresses?.province}
                                          </li>
                                          <li>
                                                Order Amount : {totalPrice?? 0}
                                          </li>
                                          <li>
                                                Shipping fee   : {checkUpData.promoHistory.normalPrice-totalPrice?? 0}
                                          </li>
                                          <li>
                                                Total    : {checkUpData.promoHistory.normalPrice??0}
                                          </li>
                                          <li>
                                                Discount Amount : {checkUpData.promoHistory.promoPrice ? checkUpData.promoHistory.promoPrice : 0}
                                          </li>
                                          {checkUpData.promoHistory.promoPrice && <li>
                                                Promo Code : {checkUpData.promoHistory.promoPrice && checkUpData.promoHistory.promoCode}
                                          </li>}
                                    </ul>
                              </div>
                        </div>
                  </div>
                  <div className="w-full  p-6">
                        <div className="card mb-6 p-4 bg-white rounded-lg shadow-sm">
                                    <h2 className="text-lg font-semibold mb-2">Order Status Changes Logs</h2>
                                    <div className="relative">
                                          <div className="flex justify-between items-center">
                                                <div  className="flex flex-col items-center relative z-10">
                                                      <div className= "w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground"  >
                                                      <Check className="h-5 w-5" /> 
                                                      </div>
                                                      <p className="mt-0 text-sm text-center text-green-700 max-w-[120px]"> <b>Customer</b> </p>
                                                      <p className="mt-0 text-sm text-center max-w-[120px]">Created</p>
                                                      <p className="mt-0 text-sm text-center max-w-[120px]">{formattedDate}</p>
                                                </div>
                                                {checkUpData?.tigger_user?.length > 0 ? (
                                                      checkUpData?.tigger_user.map((status, index) => (
                                                            <div key={index} className="flex flex-col items-center relative z-10">
                                                                  <div className= "w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground"  >
                                                                  <Check className="h-5 w-5" /> 
                                                                  </div>
                                                                  <p className="mt-0 text-sm text-green-700 text-center max-w-[120px]"><b>{status.user}</b></p>
                                                                  <p className="mt-0 text-sm text-center max-w-[120px]">{status.status}</p>
                                                                  <p className="mt-0 text-sm text-center max-w-[120px]">{status.dateTime}</p>
                                                            </div>
                                                      ))
                                                ) : (
                                                      <div className="text-muted-foreground"> </div>
                                                )}
                                          </div>
                                    </div>
                        </div>
                  </div>                         
                  {/* ? products */}
                  <div className="p-2 mt-8">
                        <h2 className="text-lg pb-2">Products</h2>
                        <table className="w-full  bg-white border text-center text-sm font-light ">
                              <thead className="border-b  font-medium  bar overflow-y-scroll">
                                    <tr className='font-bold'>

                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Image
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Name
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Price
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Product Id
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                quantity
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Status
                                          </th>
                                          <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                Action
                                          </th>

                                    </tr>
                              </thead>
                              <tbody>
                                    {
                                          checkUpData?.productList?.map(itm => <OrderCkeckupRow orderId={checkUpData._id} key={itm?._id} itm={itm} />)
                                    }

                              </tbody>
                        </table>


                  </div>
            </div>

      );
};

export default OrderCheckup;
