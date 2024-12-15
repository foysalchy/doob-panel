import React, { useState } from "react";

const Stock = ({ stockis, field, index, inputFields, setInputFields, daraz ,variantInput, setVariantInput, product}) => {
      console.log("inputFields:", inputFields[index].quantity);
      const currentDateTime = new Date().toISOString().slice(0, 16); // Current date and time in 'YYYY-MM-DDTHH:MM'
      const tenYearsFromNow = new Date();
      tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
      const futureDateTimeValue = tenYearsFromNow.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:MM'
     
     
      // const [quantity, setQuantity] = useState(0);
      return (
            <div>
                  <div className="  mt-4 border-gray-400  w-full bg-gray-100 rounded">
                       

                        <div className="grid items-center gap-4 md:grid-cols-5 mt-4">
                              <div>
                                    <label className="text-sm " htmlFor="Video url ">
                                          Quantity
                                    </label>
                                    {}
                                    {console.log(inputFields[index] ,'inputFields[index]?.new ')}
                                    <input
                                          readOnly={inputFields[index]?.new != true ? stockis : false} // Safely access the 'new' property
                                          onChange={(e) => {
                                                const newInputFields = [...inputFields]; // Create a copy of the current state
                                                newInputFields[index].quantity = e.target.value; // Update the specific index
                                                console.log(e.target.value);
                                                setInputFields(newInputFields); // Update the state
                                          }}
                                          value={field.quantity}
                                          className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                          placeholder="Input Quantity"
                                          type="text"
                                          name="quantity"
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
                               
                              <div>
                                    <label className={"mt-3 text-sm"} htmlFor="">
                                          Product cost
                                    </label>
                                    <input
                                          onChange={(e) => {
                                                const newInputFieldsx = [...variantInput];
                                                newInputFieldsx[index].ProductCost = e.target.value;
                                                setVariantInput(newInputFieldsx);
                                          }}
                                          type="text"
                                          defaultValue={
                                                product?.variantData && product?.variantData?.[index]?.ProductCost
                                                      ? product?.variantData?.[index]?.ProductCost
                                                      : 1
                                          }
                                          className={
                                                "flex-grow px-2 h-10 w-full mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                          }
                                    />
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

                        <div className="grid items-center gap-4 md:grid-cols-2 mt-4">
                              {/* {daraz && (
          <div>
            <label className="text-sm" htmlFor="offerStartDate">
              Special Price Start Date
            </label>
            <input
              onChange={(e) => {
                const newInputFields = [...inputFields];
                newInputFields[index].offerDate = e.target.value;
                setInputFields(newInputFields);
              }}
              value={field.offerDate ?? currentDateTime}
              className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
              placeholder="Input Offer Start Date"
              type="datetime-local"
              name="offerStartDate"
              id="offerStartDate"
            />
          </div>
        )} */}

                              {/* {daraz && (
                                    <div>
                                          <label className="text-sm" htmlFor="offerEndDate">
                                                Special Price End Date
                                          </label>
                                          <input
                                                onChange={(e) => {
                                                      const newInputFields = [...inputFields];
                                                      newInputFields[index].offerEndDate = e.target.value;
                                                      setInputFields(newInputFields);
                                                }}
                                                value={field.offerEndDate ?? futureDateTimeValue}
                                                className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                placeholder="Input Offer End Date"
                                                type="datetime-local"
                                                name="offerEndDate"
                                                id="offerEndDate"
                                          />
                                    </div>
                              )} */}

                        </div>
                  </div>
            </div>
      );
};

export default Stock;
