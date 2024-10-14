import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const EditDarazCategory = ({ product, datazCategory }) => {
      const [filteredData, setFilteredData] = useState([]);

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
            "Brand",
            "End date of promotion",
            "Start date of promotion",
            "White Background Image"
      ];





      useEffect(() => {
            if (datazCategory) {
                  const filtered = datazCategory.filter(
                        (item) => !ourData.includes(item.label)
                  );
                  setFilteredData(filtered);
            }
      }, [datazCategory]);

      const renderInput = (category) => {
            const getValueByKey = (key) => {
                  const foundItem = product?.darazOptionData?.find(item => item[key]);
                  return foundItem ? foundItem[key] : null;
            };

            const value = getValueByKey(product.darazOptionData, category.name)


            switch (category.input_type) {
                  case "numeric":
                        return (
                              <input
                                    required={category?.is_mandatory === 1}
                                    defaultValue={getValueByKey(category.name)}
                                    type="number"
                                    id={category.label}
                                    name={category.name}
                                    className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    placeholder={`Please Input ${category.label}`}
                              />
                        );
                  case "richText":
                        return (
                              <textarea
                              required={category?.is_mandatory === 1}
                                    id={category.label}
                                    name={category.name}
                                    defaultValue={getValueByKey(category.name)}
                                    className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    placeholder={`Please Input ${category.label}`}
                              />
                        );
                  case "singleSelect":
                        return (
                              <select
                              required={category?.is_mandatory === 1}
                                    id={category.label}
                                    name={category.name}
                                    defaultValue={getValueByKey(category.name)}
                                    className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                              >
                                    {category.options?.map((option) => (
                                          <option key={option.value} value={option.value}>
                                                {option.name}
                                          </option>
                                    ))}
                              </select>
                        );
                  case "multiSelect":
                        return (
                              <CreatableSelect
                              required={category?.is_mandatory === 1}
                                    id={category.label}
                                    name={category.name}
                                    defaultValue={getValueByKey(category.name)}
                                    isMulti
                                    options={category?.options?.map((option) => ({
                                          value: option.name,
                                          label: option.name,
                                    }))}
                                    className="flex-grow w-full mb-3 md:mr-2 md:mb-0"
                                    placeholder={`Please Select ${category.label}`}
                              />
                        );
                  default:
                        return (
                              <input
                              required={category?.is_mandatory === 1}
                                    type={category?.input_type || "text"}
                                    id={category?.label}
                                    name={category?.name}
                                    defaultValue={getValueByKey(category.name)}
                                    className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    placeholder={`Please Input ${category?.label}`}
                              />
                        );
            }
      };

      return (
            <div className="grid grid-cols-3 gap-8 mt-4 border rounded p-4">
                  {filteredData?.map((category) =>
                        category.label !== "Highlights" ? (
                              <div key={category?.label} className="flex w-full items-center space-x-4">
                                    <div className="w-full">
                                    <label className='text-sm' htmlFor={category?.label}>{category?.label} {category?.is_mandatory === 1 && <span className="text-red-500 text-lg mt-1">*</span>}</label>
                                    {renderInput(category)}
                                    </div>
                              </div>
                        ) : null
                  )}
            </div>
      );
};

export default EditDarazCategory;
