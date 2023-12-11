import React from 'react';
import Select from 'react-select';

const Stock = ({ field, index, inputFields, setInputFields }) => {
    return (
        <div>
            <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>

                <div className='flex flex-col'>
                    <span className='font-bold'>Stock Information</span>
                    <small>Having accurate product information raises discoverability.</small>
                </div>


                <div className='grid  gap-4 grid-cols-6 mt-4'>
                    <div>
                        <label className='text-sm ' htmlFor="Video url ">Quantity</label>
                        <input
                            onChange={(e) => {
                                const newInputFields = [...inputFields];
                                newInputFields[index].quantity = e.target.value;
                                setInputFields(newInputFields);
                            }}
                            value={field.quantity}
                            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Quantity" type="number" name="quantity" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' htmlFor="Video url ">SKU</label>
                        <input
                            onChange={(e) => {
                                const newInputFields = [...inputFields];
                                newInputFields[index].SKU = e.target.value;
                                setInputFields(newInputFields);
                            }}
                            value={field.SKU}
                            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input SKU" type="text" name="SKU" id="" />
                    </div>

                    <div>
                        <label className='text-sm' htmlFor="Video url ">Normal Price BDT</label>
                        <input
                            onChange={(e) => {
                                const newInputFields = [...inputFields];
                                newInputFields[index].price = e.target.value;
                                setInputFields(newInputFields);
                            }}
                            value={field.price}
                            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Normal Price" type="number" name="price" id="" />
                    </div>
                    <div>
                        <label className='text-sm ' htmlFor="Video url ">Offer Price BDT</label>
                        <input
                            onChange={(e) => {
                                const newInputFields = [...inputFields];
                                newInputFields[index].offerPrice = e.target.value;
                                setInputFields(newInputFields);
                            }}
                            value={field.offerPrice}
                            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input Offer Price" type="number" name="offerPrice" id="" />
                    </div>
                    <div className='min-w-fit'>
                        <label className='text-sm ' htmlFor="Video url ">Product Ability</label>
                        <select
                            onChange={(e) => {
                                const newInputFields = [...inputFields];
                                newInputFields[index].ability = e.target.value;
                                setInputFields(newInputFields);
                            }}
                            value={field.ability}
                            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" name="ability" id="">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                    </div>
                    <div className='min-w-fit'>
                        <label className='text-sm ' htmlFor="Video url ">Sale Multi Vendor</label>
                        <select
                            onChange={(e) => {
                                const newInputFields = [...inputFields];
                                newInputFields[index].vendor = e.target.value;
                                setInputFields(newInputFields);
                            }}
                            value={field.vendor}
                            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" name="ability" id="">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                    </div>
                    {/* <div className='min-w-fit'>
                        <label className='text-sm ' htmlFor="Video url ">Sale Multi Vendor</label>
                        <Select
                            placeholder='Select Ability'
                            name='vendor'
                            options={[
                                { value: 'yes', label: 'YES' },
                                { value: 'no', label: 'No' },

                            ]}
                        />
                    </div> */}
                </div>

            </div>

        </div>
    );
};

export default Stock;