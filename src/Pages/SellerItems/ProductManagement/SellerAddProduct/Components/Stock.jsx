import React, { useState } from "react";

const Stock = ({ field, index, inputFields, setInputFields, daraz }) => {
  console.log("inputFields:", inputFields[index].quantity);

  // const [quantity, setQuantity] = useState(0);
  // console.log("🚀 quantity:", quantity)
  return (
    <div>
      <div className="border mt-4 border-gray-400 md:px-10 px-2 py-5 w-full bg-gray-100 rounded">
        <div className="flex flex-col">
          <span className="font-bold">Stock Informations</span>
          <small>
            Having accurate product information raises discoverability.
          </small>
        </div>

        <div className="grid items-center gap-4 md:grid-cols-5 mt-4">
          <div>
            <label className="text-sm " htmlFor="Video url ">
              Quantity
            </label>
            <input
              onChange={(e) => {
                const newInputFields = [...inputFields];
                newInputFields[index].quantity = e.target.value;
                console.log(e.target.value);
                setInputFields(newInputFields);
                //   setQuantity(e.target.value);
              }}
              value={field.quantity}
              // value={quantity}
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
              placeholder="Input Quantity"
              type="text"
              name="quantity"
              id=""
            />
          </div>

          <div>
            <label className="text-sm " htmlFor="Video url ">
              SKU
            </label>
            <input
              onChange={(e) => {
                const newInputFields = [...inputFields];
                newInputFields[index].SKU = e.target.value;
                setInputFields(newInputFields);
              }}
              value={field.SKU}
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
              placeholder="Input SKU"
              type="text"
              name="SKU"
              id=""
            />
          </div>

          <div>
            <label className="text-sm" htmlFor="Video url ">
              Normal Price BDT
            </label>
            <input
              onChange={(e) => {
                const newInputFields = [...inputFields];
                newInputFields[index].price = e.target.value;
                setInputFields(newInputFields);
              }}
              value={field.price}
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
              placeholder="Input Normal Price"
              type="text"
              name="price"
              id=""
            />
          </div>
          <div>
            <label className="text-sm " htmlFor="Video url ">
              Offer Price BDT
            </label>
            <input
              onChange={(e) => {
                const newInputFields = [...inputFields];
                newInputFields[index].offerPrice = e.target.value;
                setInputFields(newInputFields);
              }}
              value={field.offerPrice ?? 0}
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
              placeholder="Input Offer Price"
              type="text"
              name="offerPrice"
              id=""
            />
          </div>
          {daraz && (
            <div>
              <label className="text-sm " htmlFor="Video url ">
                Spacial Price Start Date
              </label>
              <input
                onChange={(e) => {
                  const newInputFields = [...inputFields];
                  newInputFields[index].offerDate = e.target.value;
                  setInputFields(newInputFields);
                }}
                value={field.offerDate??0}
                className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                placeholder="Input Offer Price"
                type="date"
                name="offerPrice"
                id=""
              />
            </div>
          )}
          {daraz && (
            <div>
              <label className="text-sm " htmlFor="Video url ">
                Spacial Price End Date
              </label>
              <input
                onChange={(e) => {
                  const newInputFields = [...inputFields];
                  newInputFields[index].offerEndDate = e.target.value;
                  setInputFields(newInputFields);
                }}
                value={field.offerEndDate??0}
                className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                placeholder="Input Offer Price"
                type="date"
                name="offerPrice"
                id=""
              />
            </div>
          )}
          <div className="min-w-fit">
            <label className="text-sm " htmlFor="Video url ">
              Product Ability
            </label>
            <select
              onChange={(e) => {
                const newInputFields = [...inputFields];
                newInputFields[index].ability = e.target.value;
                setInputFields(newInputFields);
              }}
              value={field.ability}
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
              name="ability"
              id=""
            >
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
