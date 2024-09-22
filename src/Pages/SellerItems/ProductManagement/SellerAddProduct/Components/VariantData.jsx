import React, { useEffect } from 'react';

const VariantData = ({
    variantInput,
    inputFields,
    setVariantInput,
    multiVendor,
    index
}) => {
console.log(index,'index')
   
useEffect(() => {
    const newInputFields = [...variantInput];

    // Calculate the quantityPrice for product1 based on offerPrice or price
    const calculatedQuantityPrice = inputFields[index].offerPrice > 0
      ? Math.round(inputFields[index].offerPrice - (inputFields[index].offerPrice * 0.30))
      : Math.round(inputFields[index].price - (inputFields[index].price * 0.30));
    
    // Update the state with the new quantityPrice for product1
    newInputFields[index].product1.quantityPrice = calculatedQuantityPrice;

    // Calculate the quantityPrice for product2
    const calculatedQuantityPrice2 = inputFields[index].offerPrice > 0
      ? Math.round(inputFields[index].offerPrice - (inputFields[index].offerPrice * 0.33))
      : Math.round(inputFields[index].price - (inputFields[index].price * 0.33));
    
    // Update the state with the new quantityPrice for product2
    newInputFields[index].product2.quantityPrice = calculatedQuantityPrice2;

    // Calculate the quantityPrice for product3
    const calculatedQuantityPrice3 = inputFields[index].offerPrice > 0
      ? Math.round(inputFields[index].offerPrice - (inputFields[index].offerPrice * 0.35))
      : Math.round(inputFields[index].price - (inputFields[index].price * 0.35));
    
    // Update the state with the new quantityPrice for product3
    newInputFields[index].product3.quantityPrice = calculatedQuantityPrice3;

    setVariantInput(newInputFields);
}, [inputFields[index].offerPrice, inputFields[index].price, index]); // Add index as a dependency if necessary


    const style = {
        input: 'flex-grow px-2 h-10 w-full mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline',
        label: 'mt-3 text-sm',
        cart: 'flex gap-3 border p-2 border-gray-300 bg-orange-100',
        cartContain: ''
    };

    const getValidValue = (value) => isNaN(value) ? 0 : value;

    return (
        <div>
            
            <div className="grid grid-cols-3 gap-2">
            {multiVendor === true && (
                <>
                <div className={`border p-2 border-gray-300 bg-orange-100`}>
                    <h4 className='text-center pb-2 border-b font-semibold text-black border-gray-500 mb-2'>Slot 1 </h4>
                    <div className={`flex gap-3`}>
                        <div>
                            
                            <label className={style.label} htmlFor="">Quantity</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[index].product1.quantity = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" defaultValue={1} className={style.input} />
                        </div>
                        <div>
                            <label className={style.label} htmlFor="">Price</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[index].product1.quantityPrice = e.target.value;
                                setVariantInput(newInputFields);
                                }} type="text" value={inputFields[index].offerPrice > 0 
                                    ? Math.round(inputFields[index].offerPrice - (inputFields[index].offerPrice * 0.30)) 
                                    : Math.round(inputFields[index].price - (inputFields[index].price * 0.30))} 
                                className={style.input} />
                                
                              </div>
                    </div>
                </div>
                <div className={`border p-2 border-gray-300 bg-orange-100`}>
                    <h4 className='text-center pb-2 border-b font-semibold text-black border-gray-500 mb-2'>Slot 2</h4>
                    <div className="flex gap-3">
                        <div>
                            <label className={style.label} htmlFor="">Quantity</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[index].product2.quantity = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" defaultValue={10} className={style.input} />
                        </div>
                        <div>
                            <label className={style.label} htmlFor="">Price</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[index].product2.quantityPrice = e.target.value;
                                setVariantInput(newInputFields);
                                }} type="text"  value={inputFields[index].offerPrice > 0 
                                    ? Math.round(inputFields[index].offerPrice - (inputFields[index].offerPrice * 0.33)) 
                                    : Math.round(inputFields[index].price - (inputFields[index].price * 0.33))} 
                                className={style.input} />
                                
                              </div>
                    </div>
                </div>
                <div className={`border p-2 border-gray-300 bg-orange-100`}>
                    <h4 className='text-center pb-2 border-b font-semibold text-black border-gray-500 mb-2'>Slot 3</h4>
                    <div className="flex gap-3">
                        <div>
                            <label className={style.label} htmlFor="">Quantity</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[index].product3.quantity = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" defaultValue={50} className={style.input} />
                        </div>
                        <div>
                            <label className={style.label} htmlFor="">Price</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[index].product3.quantityPrice = e.target.value;
                                setVariantInput(newInputFields);
                                }} type="text"  value={inputFields[index].offerPrice > 0 
                                    ? Math.round(inputFields[index].offerPrice - (inputFields[index].offerPrice * 0.35)) 
                                    : Math.round(inputFields[index].price - (inputFields[index].price * 0.35))} 
                                className={style.input} />
                                

                             </div>
                    </div>
                </div></>
            )}
                <div className={style.cart}>
                    <div>
                        <label className={style.label} htmlFor="">Selling Recommended Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[index].sellingPrice = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="text" defaultValue={1} className={style.input} />
                    </div>
                </div>
                <div className={"flex  gap-3 border p-2 border-gray-300 bg-orange-100"}>
                    <div>
                        <label className={"mt-3 text-sm"} htmlFor="">
                        Product cost
                        </label>
                        <input
                        onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[index].ProductCost = e.target.value;
                            setVariantInput(newInputFields);
                        }}
                        type="text"
                        defaultValue={1}
                        className={
                            "flex-grow px-2 h-10 w-full mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        }
                        />
                    </div>
                    </div>
            </div>
         
        </div>
    );
};

export default VariantData;