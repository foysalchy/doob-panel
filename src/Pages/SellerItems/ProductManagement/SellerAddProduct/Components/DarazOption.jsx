import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const DarazOption = ({ datazCategory }) => {

    const ourData = [
        "Product Description",
        "Video URL",
        "Name",
        "Price",
        "Color Family",
        "Images",
        "Warranty Type",
        "SellerSKU",
        "Quantity",
        "Special Price",
        "Package Weight(kg)",
        "Package Weight (kg)",
        "Option",
        "adminWare",
        "Package Length (cm)",
        "English description",
        "Package Width (cm)",
        "Package Height (cm)",
        "Name in English language",
        "Short Description En",
        "Brand"

    ]

    console.log(datazCategory, 'daraz-category');

    const filteredData = datazCategory && datazCategory.filter(item => !ourData.includes(item.label))

    const renderInput = (category) => {
        switch (category.input_type) {
            case 'numeric':
                return (
                    <input
                        required={category?.is_mandatory === 1}
                        type="number"
                        id={category.label}
                        name={category.name}
                        className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        placeholder={`Please Input ${category.label}`}
                    />
                );
            case 'richText':
                return (
                    <textarea
                        required={category?.is_mandatory === 1}
                        id={category.label}
                        name={category.name}
                        className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        placeholder={`Please Input ${category.label}`}
                    />
                );
            case 'singleSelect':
                return (
                    <select
                        required={category?.is_mandatory === 1}
                        id={category.label}
                        name={category.name}
                        className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                    >
                        {/* Map over the options and set value attribute */}
                        {category.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                );
            case 'multiSelect':
                if (category.options?.length === 0) {
                    // Render a CreatableSelect for multiple values
                    return (
                        <CreatableSelect
                            required={category?.is_mandatory === 1}
                            id={category.label}
                            name={category.name}
                            isMulti
                            className="flex-grow w-full mb-3 md:mr-2 md:mb-0"
                            placeholder={`Please Input ${category.label} (Multiple Values)`}
                        />
                    );
                }

                // Render the CreatableSelect using category.options
                return (
                    <CreatableSelect
                        required={category?.is_mandatory === 1}
                        id={category.label}
                        name={category.name}
                        isMulti
                        options={category?.options?.map(option => ({ value: option.name, label: option.name }))}
                        className="flex-grow w-full mb-3 md:mr-2 md:mb-0"
                        placeholder={`Please Select ${category.label}`}
                    />
                );

            default:
                return (
                    <input
                        required={category?.is_mandatory === 1}
                        type={category?.input_type}
                        id={category?.label}
                        name={category?.name}
                        className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        placeholder={`Please Input ${category?.label}`}
                    />
                );
        }
    };

    console.log(filteredData[0], 'check-------');
    return (
        <div className="grid grid-cols-3 gap-2 mt-6 border  rounded p-4">
             
    {filteredData?.map((category) => (
  // Check if category.label is not 'nov'
  category.label !== 'Highlights' && (
                <div key={category?.label} className="flex w-full items-center space-x-4">
                    <div className='w-full'>
                        <label className='text-sm' htmlFor={category?.label}>{category?.label} {category?.is_mandatory === 1 && <span className="text-red-500 text-lg mt-1">*</span>}</label>
                        {renderInput(category)}
                    </div>
                </div>
            )))}
        </div>
    );
};

export default DarazOption;