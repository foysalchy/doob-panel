import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';

const SellerPrintPage = ({ setOn, products }) => {
    const { id } = useParams();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    console.log(products);

    return (
        <div className="bg-gray-100 p-12">
            <div className="flex items-center gap-2">
                <button onClick={() => setOn(false)} className='bg-gray-900 px-6 py-2 rounded-2 text-white rounded-md'>Cancel</button>

                <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md'>Print</button></div>

            <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>

                <div className="overflow-hidden   -gray-700 md:rounded-lg">
                    <table className="w-full bg-gray-100">
                        <thead className="bg-gray-900 text-white ">

                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 px-4 text-sm  font-normal text-left rtl:text-right "
                                >
                                    <div className="flex items-center gap-x-3">

                                        <span>Name</span>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-12 py-3.5  text-sm font-normal text-left rtl:text-right "
                                >
                                    <button className="flex items-center gap-x-2">
                                        <span>Price</span>
                                    </button>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm  font-normal text-left rtl:text-right "
                                >
                                    <button className="flex items-center gap-x-2">
                                        <span>Regular price</span>
                                    </button>
                                </th> <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm  font-normal text-left rtl:text-right "
                                >
                                    <button className="flex items-center gap-x-2">
                                        <span>Stock Quantity</span>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-50 divide-y  divide-gray-20 ">
                            {products?.map((product) => (
                                <tr className='bg-red-50'>

                                    <td className="px-4 py-4 text-sm  -black font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">

                                            <div className="flex relative items-center gap-x-2">
                                                <div className="imgSm  ">
                                                    <img
                                                        className="object-cover w-10 h-10 rounded"
                                                        srcSet={product?.featuredImage?.src}
                                                        src={product?.featuredImage?.src}
                                                        alt=""
                                                    />
                                                    <div
                                                        style={{
                                                            backgroundImage: `url(${product?.featuredImage?.src})`,
                                                        }}
                                                        className="absolute top-[-40px] duration-150 abs hidden bg-[url(${product?.featuredImage?.src})] left-[43px] object-cover bg-cover bg-white shadow-xl opacity-100 z-50 w-[150px] h-[150px] ring-1 ring-gray-500"
                                                    >
                                                    </div>
                                                </div>

                                                <div>
                                                    <h2 className="font-medium text-gray-800  ">
                                                        {product?.name?.split(' ').slice(0, 5).join(' ')}
                                                    </h2>
                                                    <p className="text-sm font-normal text-gray-600 ">
                                                        {product?.sku}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-4  -black text-sm font-medium text-gray-700 whitespace-nowrap">
                                        {product.price}
                                    </td>
                                    <td className="px-4 py-4 text-center text-sm  -black text-gray-500  whitespace-nowrap">
                                        {product.regular_price}
                                    </td>

                                    <td className="px-4 py-4 text-center text-sm  -black whitespace-nowrap">
                                        {product?.stock_quantity}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerPrintPage;

