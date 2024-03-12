

import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import ImageUploadSeller from './ImageUploadSeller';
import ProductInfoSeller from './ProductInfoSeller';
import EditSincronusCategory from './EditSincronusCategory';
import EditWareHouse from './EditWarehiuses';

const EditProductForm = ({ product, setOpenModal, OpenModal }) => {
    delete product._id
    delete product.id
    delete product.shopId
    delete product.price_html
    delete product.menu_order
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [isChecked, setIsChecked] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform actions with the updated product object, for example, send it to the server
        console.log(editedProduct);
    };

    return (
        <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"}`}>
            <div className="w-[90%] overflow-x-hidden rounded-[6px] bg-white pb-10 text-center ">
                <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[6px] px-10'>
                    <div className='pb-2 text-xl font-bold text-white text-center sm:text-2xl'>Edit  </div>
                    <div onClick={() => setOpenModal(!OpenModal)} className='cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400'>
                        <RxCross2 className='text-xl' />
                    </div>
                </div>
                <br />
                <form className='h-[600px] overflow-x-hidden  px-10 text-start overflow-y-auto'>
                    <ImageUploadSeller product={product} />

                    <ProductInfoSeller />
                    
                    <EditSincronusCategory />

                    <EditWareHouse />

                    <label
                        htmlFor="Toggle3"
                        className={`inline-flex items-center py-4 rounded-md cursor-pointer ${isChecked ? 'text-gray-800' : ''
                            }`}>

                        <input
                            id="Toggle3"
                            type="checkbox"
                            className="hidden peer"
                            checked={isChecked}
                            onClick={() => setIsChecked(!isChecked)}
                        />
                        <span
                            className={`px-4 py-2 rounded-l-md ${isChecked ? ' bg-gray-300' : 'bg-violet-400'
                                }`}>
                            Upcoming Product
                        </span>
                        <span
                            className={`px-4 py-2 rounded-r-md ${isChecked ? ' bg-violet-400' : 'bg-gray-300'
                                }`}
                        >
                            For You Product
                        </span>
                    </label>

                    <button
                        className='bg-gray-800 text-white px-8 py-2 rounded-md mt-4'
                        type="submit">Submit</button>
                </form>
            </div>
        </div>

    );
};

export default EditProductForm;