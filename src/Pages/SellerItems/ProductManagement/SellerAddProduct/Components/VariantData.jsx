import React, { useEffect } from 'react';
import AdminCategoryforSeller from './AdminCategoryforSeller';

const VariantData = ({
    variantInput,
    setVariantInput,
    discount_10_present,
    discount_15_present,
    discount_20_present
}) => {

    useEffect(() => {
        setVariantInput((prevInput) => {
            if (prevInput[0].product1.quantityPrice !== discount_10_present) {
                const newInputFields = [...prevInput];
                newInputFields[0].product1.quantityPrice = discount_10_present;
                return newInputFields;
            }
            return prevInput;
        });
    }, [discount_10_present, setVariantInput]);

    useEffect(() => {
        setVariantInput((prevInput) => {
            if (prevInput[0].product2.quantityPrice !== discount_15_present) {
                const newInputFields = [...prevInput];
                newInputFields[0].product2.quantityPrice = discount_15_present;
                return newInputFields;
            }
            return prevInput;
        });
    }, [discount_15_present, setVariantInput]);

    useEffect(() => {
        setVariantInput((prevInput) => {
            if (prevInput[0].product3.quantityPrice !== discount_20_present) {
                const newInputFields = [...prevInput];
                newInputFields[0].product3.quantityPrice = discount_20_present;
                return newInputFields;
            }
            return prevInput;
        });
    }, [discount_20_present, setVariantInput]);

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
                <div className={`border p-2 border-gray-300 bg-orange-100`}>
                    <h4 className='text-center pb-2 border-b font-semibold text-black border-gray-500 mb-2'>Slot 1</h4>
                    <div className={`flex gap-3`}>
                        <div>
                            <label className={style.label} htmlFor="">Quantity</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[0].product1.quantity = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" defaultValue={1} className={style.input} />
                        </div>
                        <div>
                            <label className={style.label} htmlFor="">Price</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[0].product1.quantityPrice = e.target.value;
                                setVariantInput(newInputFields);
                            }}  type="text" value={getValidValue(variantInput[0].product1.quantityPrice)} className={style.input} />
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
                                newInputFields[0].product2.quantity = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" defaultValue={10} className={style.input} />
                        </div>
                        <div>
                            <label className={style.label} htmlFor="">Price</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[0].product2.quantityPrice = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" value={getValidValue(variantInput[0].product2.quantityPrice)} className={style.input} />
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
                                newInputFields[0].product3.quantity = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" defaultValue={50} className={style.input} />
                        </div>
                        <div>
                            <label className={style.label} htmlFor="">Price</label>
                            <input onChange={(e) => {
                                const newInputFields = [...variantInput];
                                newInputFields[0].product3.quantityPrice = e.target.value;
                                setVariantInput(newInputFields);
                            }} type="text" value={getValidValue(variantInput[0].product3.quantityPrice)} className={style.input} />
                        </div>
                    </div>
                </div>
                <div className={style.cart}>
                    <div>
                        <label className={style.label} htmlFor="">Selling Recommended Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].sellingPrice = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="text" defaultValue={1} className={style.input} />
                    </div>
                </div>
            </div>
            <AdminCategoryforSeller />
        </div>
    );
};

export default VariantData;