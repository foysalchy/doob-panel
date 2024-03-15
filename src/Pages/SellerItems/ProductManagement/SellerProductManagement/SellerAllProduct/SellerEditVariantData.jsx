import React from 'react';
import EditAdminCategoryforSeller from './EditAdminCategoryforSeller';

const SellerEditVariantData = ({ variantInput, setVariantInput }) => {

    const style = {
        input: 'flex-grow px-2 h-10 w-full mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline',
        label: 'mt-3 text-sm',
        cart: 'flex  gap-3 border p-2 border-gray-300 bg-orange-100'
    }

    console.log(variantInput, 'input');

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                <div className={style.cart}>
                    <div>
                        <label className={style.label} htmlFor=""> Quantity 1 Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            console.log(newInputFields, '>>>>>>');
                            newInputFields[0].product1.quantity = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>

                    <div>
                        <label className={style.label} htmlFor=""> Quantity 1 Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].product1.quantityPrice = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>
                </div>

                <div className={style.cart}>
                    <div>
                        <label className={style.label} htmlFor=""> Quantity 2</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].product2.quantity = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>

                    <div>
                        <label className={style.label} htmlFor=""> Quantity 2 Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].product2.quantityPrice = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>
                </div>

                <div className={style.cart}>
                    <div>
                        <label className={style.label} htmlFor=""> Quantity 3 Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].product3.quantity = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>

                    <div>
                        <label className={style.label} htmlFor=""> Quantity 3 Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].product3.quantityPrice = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>
                </div>

                <div className={style.cart}>
                    <div>
                        <label className={style.label} htmlFor="">Selling Price</label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].sellingPrice = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>
                </div>

                <div className={style.cart}>
                    <div>
                        <label className={style.label} htmlFor="">Product cost  </label>
                        <input onChange={(e) => {
                            const newInputFields = [...variantInput];
                            newInputFields[0].ProductCost = e.target.value;
                            setVariantInput(newInputFields);
                        }} type="number" defaultValue={1} className={style.input} />
                    </div>
                </div>

            </div>


            <EditAdminCategoryforSeller />
        </div>
    );
};

export default SellerEditVariantData;