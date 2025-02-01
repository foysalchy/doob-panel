import React from 'react';

const Delivery = ({inside,outside,setIsPaid,isPaid,shipping,setShipping}) => {
   
    const handleDeliveryOptionChange = (event) => {
      setIsPaid(event.target.value === "Paid");
      setShipping(event.target.value)
    };
    console.log(inside,outside,'insideinside')
    return (
        <div>
            <div className='border mt-4 border-gray-400 md:px-10 px-3 py-5 w-full bg-gray-100 rounded'>

                <div className='flex flex-col'>
                    <span className='font-bold'>Delivery Information</span>
                    <small>Please ensure you have entered the right package weight (kg) and dimensions (cm) for accurate shipping fee calculations.</small>
                </div>


                <div>
                    <label className='text-sm ' >Package Width (kg) </label>
                    <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Package Width (kg)   " name="packageWidth" id="" />
                </div>
                <div className='md:mt-4 grid md:grid-cols-3 md:gap-4'>
                    <div>
                        <label className='text-sm ' >Length (cm)</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Length (cm)  " name="productLength" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Width (cm)</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Width (cm)  " name="productWidth" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Height (cm)</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Height (cm)  " name="productHight" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Low Stock Warning</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Low Stock Warning" name="low_stock_warning" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Delivery Option</label>
                        <select
                            name="deliveryOption"
                            id="deliveryOption"
                            onChange={handleDeliveryOptionChange}
                            className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-purple-400 focus:outline-none focus:shadow-outline"
                            >

                            <option value="defult">Defult Shipping</option>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    {shipping=='Paid' && (
        <>
                    <div>
                        <label className='text-sm ' >Delivery Charge Inside Dhaka</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Delivery Charge Inside Dhaka" defaultValue={inside}   name="DeliveryChargeDhaka" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Delivery Charge Outside Dhaka</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Delivery Charge Outside Dhaka" defaultValue={outside} name="DeliveryChargeOutside" id="" />
                    </div>
                    </>
      )}
                </div>

            </div>
        </div>
    );
};

export default Delivery;