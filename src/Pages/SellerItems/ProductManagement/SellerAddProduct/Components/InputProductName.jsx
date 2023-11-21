import React from 'react';

const InputProductName = () => {
    return (
        <div>
            <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>

                <div className='flex flex-col'>
                    <span className='font-bold'>Product Information</span>
                    <small>Having accurate product information raises discoverability.</small>
                </div>
                <div className='flex flex-col mt-3'>
                    <span>Product Name <span className='text-red-500'> *</span></span>

                </div>

                <fieldset className="w-full  dark:text-gray-100">
                    <label for="url" className="block text-sm font-medium">Website</label>
                    <div className="flex">
                        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-700">English</span>
                        <input type="text" name="url" id="url" placeholder="Ex. Nikon Coolpix A300 Digital Camera" className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" />
                    </div>
                </fieldset>
                <fieldset className="w-full  dark:text-gray-100">
                    <label for="url" className="block text-sm font-medium">Website</label>
                    <div className="flex">
                        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md dark:bg-gray-700">Bengali</span>
                        <input type="text" name="url" id="url" placeholder="Ex. Nikon Coolpix A300 Digital Camera" className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white text-black border border-gray-300 rounded-r shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" />
                    </div>
                </fieldset>
            </div>
        </div>
    );
};

export default InputProductName;