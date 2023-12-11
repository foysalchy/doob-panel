import React from 'react';

const DarazOption = ({ datazCategory }) => {
    console.log(datazCategory[0]?.advanced);
    return (
        <div className="grid grid-cols-2 mt-4">
            {datazCategory?.map((category) => (
                <div key={category.label} className="flex items-center space-x-4">
                    <div>
                        <label className='text-sm' htmlFor={category.label}>{category.label}</label>
                        <input
                            type={category.input_type}
                            id={category.label}
                            name={category.label}
                            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder={`Please Input ${category.label}`} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DarazOption;