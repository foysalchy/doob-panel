import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';

const AllOrderInvoice = ({ data, showPrintModal1, setShowPrintModal1 }) => {

    console.log(data);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const [allProductList, setAllProductList] = useState([]);

    useEffect(() => {
        let products = []; // Temporary array to store all products
        data?.forEach(element => {
            element?.productList?.forEach(product => {
                products.push(product); // Add each product to the temporary array
            });
        });
        setAllProductList(products); // Set the state with all products once the loop completes
    }, [data]);

    console.log('Product:::::', data);

    return (
        <div>
            <div  >

                <div
                    ref={componentRef}
                    className='bg-white mx-auto p-12 '
                    style={{ width: '210mm', height: '297mm' }}>
                    <h1 className='text-3xl'>
                        <strong>Seller</strong> <span className="font-[400]">Center</span>
                    </h1>
                    <p className="text-gray-800">Checklist Printed on: {new Date().toLocaleString(new Date().getTime())}</p>

                    <table className='border mt-12 w-full'>
                        <tr>
                            <th className="border-b bg-gray-50 text-start p-2">SKU</th>
                            <th className="border-b bg-gray-50 text-start p-2">Image</th>
                            <th className="border-b bg-gray-50 text-start p-2">Product</th>
                            <th className="border-b bg-gray-50 text-start p-2">Order Number</th>
                            <th className="border-b bg-gray-50 text-start p-2">Quantity</th>
                        </tr>
                        <tbody>
                            {data?.map(order => (
                                order.productList?.map(item => (
                                    <tr key={item?._id}>
                                        <td className="border-b bg-gray-50  text-sm text-start p-2">
                                            {item?._id}
                                        </td>
                                        <td className="border-b bg-gray-50  text-start p-2">
                                            <img src={item?.img} alt="product 1" className="w-[60px] h-[60px] object-cover" />
                                        </td>
                                        <td className="border-b bg-gray-50  text-sm text-start p-2">
                                            {item?.productName}
                                        </td>
                                        <td className="border-b bg-gray-50  text-sm text-start p-2">
                                            {order.orderNumber} {/* Display the order number */}
                                        </td>
                                        <td className="border-b bg-gray-50 text-start p-2">
                                            {item?.quantity}
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>

                    </table>
                </div>
                <div className="flex gap-2">
                    <button onClick={handlePrint} className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white">print</button>

                    <button onClick={() => setShowPrintModal1(false)} className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AllOrderInvoice;