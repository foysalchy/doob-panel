import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import OrderCkeckupRow from "./ReviewCkeckupRow";
import ReviewCkeckupRow from "./ReviewCkeckupRow";


const ReviewCheckup = () => {
      const { reviewCheckUpData, setReviewCheckUpData } = useContext(AuthContext);
      const [originalValue] = useState(reviewCheckUpData?.timestamp);
      const [formattedDate, setFormattedDate] = useState('');

      useEffect(() => {
            const timestamp = parseInt(originalValue);
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString(); // You can customize the format using toLocaleDateString and toLocaleTimeString

            setFormattedDate(formattedDate);
      }, [originalValue]);
      console.log(reviewCheckUpData, '+++++');
      return (
            <div className="bg-gray-100">
                  <div className=' p-2 grid grid-cols-2 gap-6'>
                        <div className="">
                              <div className="bg-white p-3 rounded-lg">
                                    <h3 className="font-bold text-black">Customer Information</h3>
                                    <ul className="text-gray-600 mt-3">
                                          <li>
                                                <span className="font-semibold">Name :</span> {reviewCheckUpData?.addresses?.fullName}
                                          </li>
                                          <li>
                                                <span className="font-semibold">Phone :</span> {reviewCheckUpData?.addresses?.mobileNumber}
                                          </li>
                                          <li>
                                                <span className="font-semibold">Date :</span> {formattedDate}
                                          </li>
                                          <li>
                                                <span className="font-semibold">Payment Method :</span> {reviewCheckUpData?.method?.Getaway}
                                          </li>
                                    </ul>
                              </div>
                        </div>
                        <div className="">
                              <div className="bg-white p-3 rounded-lg">
                                    <h3 className="font-semibold text-black">Billing Address</h3>
                                    <ul className="text-gray-600 mt-3">
                                          <li>
                                                {reviewCheckUpData?.addresses?.address}
                                          </li>
                                          <li>
                                                {reviewCheckUpData?.addresses?.area}
                                          </li>
                                          <li>
                                                {reviewCheckUpData?.addresses?.city}
                                          </li>
                                          <li>
                                                {reviewCheckUpData?.addresses?.province}
                                          </li>
                                    </ul>
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
                                          reviewCheckUpData?.productList?.slice(0, 4)?.map(itm => <ReviewCkeckupRow key={itm?._id} itm={itm} />)
                                    }

                              </tbody>
                        </table>


                  </div>
            </div>

      );
};

export default ReviewCheckup;
