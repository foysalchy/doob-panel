import React from 'react';

const Delivery = () => {
    return (
        <div>
            <div className='border mt-4 border-gray-400 md:px-10 px-3 py-5 w-full bg-gray-100 rounded'>

                <div className='flex flex-col'>
                    <span className='font-bold'>Delivery Information</span>
                    <small>Please ensure you have entered the right package weight (kg) and dimensions (cm) for accurate shipping fee calculations.</small>
                </div>


                <div>
                    <label className='text-sm ' >Package Width (kg) </label>
                    <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Quantity" type="number" name="packageWidth" id="" />
                </div>
                <div className='md:mt-4 grid md:grid-cols-3 md:gap-4'>
                    <div>
                        <label className='text-sm ' >Length (cm)</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Quantity" type="number" name="productLength" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Width (cm)</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Quantity" type="number" name="productWidth" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Height (cm)</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Quantity" type="number" name="productHight" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Delivery Charge</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Quantity" type="number" name="DeliveryCharge" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' >Low Stock Warning</label>
                        <input className="flex-grow w-full h-10 px-4 mt-1 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Low Stock Warning" type="number" name="low_stock_warning" id="" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Delivery;