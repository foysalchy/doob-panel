import React from 'react';
import AdminCategoryforSeller from './AdminCategoryforSeller';

const VariantData = ({ variantInput, setVariantInput }) => {

    const style = {
        input: 'flex-grow h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline',
        label: 'mt-3 text-sm',
        cart: 'flex gap-3 border p-2 border-gray-300 bg-orange-100'
    }

    console.log(variantInput, 'input');

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className={style.cart}>
                    <label className={style.label} htmlFor="">Product Quantity Price</label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        console.log(newInputFields, '>>>>>>');
                        newInputFields[0].product1.quantity = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />

                    <label className={style.label} htmlFor=""> Quantity Price</label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        newInputFields[0].product1.quantityPrice = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />
                </div>

                <div className={style.cart}>
                    <label className={style.label} htmlFor="">Product Quantity Price</label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        newInputFields[0].product2.quantity = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />

                    <label className={style.label} htmlFor=""> Quantity Price</label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        newInputFields[0].product2.quantityPrice = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />
                </div>

                <div className={style.cart}>
                    <label className={style.label} htmlFor="">Product Quantity Price</label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        newInputFields[0].product3.quantity = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />

                    <label className={style.label} htmlFor=""> Quantity Price</label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        newInputFields[0].product3.quantityPrice = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />
                </div>
                <div className={style.cart}>
                    <label className={style.label} htmlFor="">Selling Price</label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        newInputFields[0].sellingPrice = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />
                </div>
                <div className={style.cart}>
                    <label className={style.label} htmlFor="">Product cost  </label>
                    <input onChange={(e) => {
                        const newInputFields = [...variantInput];
                        newInputFields[0].ProductCost = e.target.value;
                        setVariantInput(newInputFields);
                    }} type="number" defaultValue={1} className={style.input} />
                </div>

            </div>


            <AdminCategoryforSeller />
        </div>
    );
};

export default VariantData;