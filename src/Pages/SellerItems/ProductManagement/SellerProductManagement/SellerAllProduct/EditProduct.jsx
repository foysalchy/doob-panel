import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const EditProductForm = ({ product, setOpenModal, OpenModal }) => {
    delete product._id
    delete product.id
    delete product.shopId
    delete product.price_html
    delete product.menu_order
    const [editedProduct, setEditedProduct] = useState({ ...product });

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
            <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 text-center ">
                <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10'>
                    <div className='pb-2 text-xl font-bold text-white text-center sm:text-2xl'>Edit {product.name}</div>
                    <div onClick={() => setOpenModal(!OpenModal)} className='cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400'>
                        <RxCross2 className='text-xl' />
                    </div>
                </div>
                <div className='max-h-[500px] px-10 text-start overflow-y-scroll'>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6">
                        {Object.entries(editedProduct).map(([key, value]) => (
                            <div key={key} className="mb-4">
                                <label
                                    htmlFor={key}
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    {key}:
                                </label>
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Edit Product
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default EditProductForm;