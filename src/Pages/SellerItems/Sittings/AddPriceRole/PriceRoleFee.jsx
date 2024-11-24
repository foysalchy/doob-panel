import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import BrightAlert from 'bright-alert';
import { useNavigate } from 'react-router-dom';
import showAlert from '../../../../Common/alert';

const PriceRoleFee = () => {

      const { shopInfo } = useContext(AuthContext)



      const shopId = shopInfo._id;
      const {
            data: shop = {},
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      const [info, setInfo] = useState(shop);
      const handleSubmit = (e) => {
            e.preventDefault();

            const weight = e.target.weight.value
            const inside = e.target.dhaka.value
            const outside = e.target.outdhaka.value
            const shopId = shopInfo._id;
            const data = { weight, inside, outside, shopId }

            fetch('https://doob.dev/api/v1/seller/add-shipping-role', {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data)
            }).then((res) => res.json()).then((data) => {

                  setInfo(data.data)
                  showAlert("Successfully Updated", "", "success")
            })
      }
      console.log(info, shopInfo, 'infox')
      // console.log(priceRole?.data);



      return (
            <div className="flex flex-col  h-screen">
                  <div className='flex gap-2 items-center justify-center'>
                        {/* <p>Your Price role</p>  <span className='kalpurush'> : ৳</span> <span>{ }</span> */}
                  </div>
                  <form className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-3">
                              <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                                          Range
                                    </label>
                                    <input
                                          required
                                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          id="priceRole"
                                          type="number"
                                          name="weight"
                                          defaultValue={info.weight}
                                          placeholder="Enter To value"
                                    />
                              </div>


                        </div>

                        <div className="grid grid-cols-2 gap-3">

                              <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                                          Inside Dhaka
                                    </label>
                                    <input
                                          required
                                          defaultValue={info.inside}
                                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          id="priceRole"
                                          type="number"
                                          name="dhaka"
                                          placeholder="Enter price range"
                                    />
                              </div>
                              <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                                          Outside Dhaka
                                    </label>
                                    <input
                                          required
                                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          id="priceRole"
                                          defaultValue={info.outside}
                                          type="number"
                                          name="outdhaka"
                                          placeholder="Enter price range"
                                    />
                              </div>
                        </div>
                        <div className="flex items-center justify-between">
                              <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                              >
                                    Submit
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default PriceRoleFee;
