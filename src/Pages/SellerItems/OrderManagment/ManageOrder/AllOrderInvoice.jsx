import React, { useRef, useState, useEffect, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const AllOrderInvoice = ({ data, showPrintModal1, setShowPrintModal1 }) => {

    console.log(data);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const { shopInfo } = useContext(AuthContext);

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




                <div ref={componentRef}>
                    {data?.map((itm) => (
                        <div
                            style={{ width: "210mm", height: "297mm" }}
                            className="bg-white mx-auto mb-4 p-12  "
                            key={itm?._id}
                        >
                            <header className="flex justify-between  ">
                                <div id="logo">
                                    <img src={shopInfo?.logo} />
                                </div>
                                <div className="text-end">
                                    <h2 className="name">{shopInfo?.shopName}</h2>
                                    <div>{shopInfo?.shopNumber}</div>

                                    <div>
                                        <a href="mailto:company@example.com">
                                            {shopInfo?.shopEmail}
                                        </a>
                                    </div>
                                </div>
                            </header>
                            <br />
                            <main>
                                <div
                                    className="lg:px-6 bg-white print-container  pb-12 print-data">
                                    <main>
                                        <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 text-center ">
                                            INVOICE
                                        </div>

                                        {/*................*/}
                                        {/*.... Address ...*/}
                                        {/*................*/}
                                        <div className=" items-start justify-between mt-4">
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                                        Name :
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        {itm?.addresses?.fullName}
                                                    </p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                                        Number :
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        {itm?.addresses?.mobileNumber}
                                                    </p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                                        address :
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        {itm?.addresses?.address}, {itm?.addresses?.city}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <li className='flex justify-start items-center gap-2'>
                                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                                        {/* Invoice No : {user?._id} */}
                                                    </h4>
                                                    {/* <p className="text-gray-600 text-sm">{shopInfo?._id}</p> */}
                                                </li>

                                            </div>

                                        </div>

                                        {/*................*/}
                                        {/*.... Product ...*/}
                                        {/*................*/}

                                        <section className="container mx-auto mt-8">
                                            <div className="w-full mb-8 overflow-hidden">
                                                <div className="w-full overflow-x-auto border">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                <th className="px-4 py-2">Photo</th>
                                                                <th className="px-4 py-2">Name</th>
                                                                <th className="px-4 py-2 whitespace-nowrap">Stock Quantity</th>
                                                                <th className="px-4 py-2">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                            {itm?.productList?.map(itm => (
                                                                <tr className='border-t' key={itm?._id}>
                                                                    <td className="p-4 w-[110px] border-b border-blue-gray-50">
                                                                        <img src={itm?.img} alt="" className="w-[100px] object-cover h-[80px] rounded border" />
                                                                    </td>
                                                                    <td className="p-4 border-b w-[300px] border-blue-gray-50">
                                                                        {itm?.title}
                                                                    </td>
                                                                    <td className="p-4 border-b border-blue-gray-50">
                                                                        {itm?.price}
                                                                    </td>
                                                                    <td className="p-4 border-b border-blue-gray-50">
                                                                        1  {/* {itm?.quantity} */}
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                            {/* <tr>
                                                <td colSpan={6} className='px-1 py-2 text-sm border  border-gray-800'></td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border-b  border-gray-800 text-end'>
                                                    TOTAL:
                                                </td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border  border-gray-800 text-start'>
                                                    $5000
                                                </td>
                                            </tr> */}
                                                            {/* Add more rows here */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            {/* <h1 className='text-end text-xl '>Total : {total}</h1> */}

                                            {/* <div id="thanks">Thank you!</div>
                            <div id="notices">
                                <div>NOTICE:</div>

                            </div>
                            <footer>
                                Invoice was created on a computer and is valid without the signature and
                                seal.
                            </footer> */}
                                        </section>




                                    </main>
                                    <footer>

                                    </footer>
                                </div>
                            </main>
                        </div>
                    ))}
                </div>



                <div className="flex fixed top-4 left-4 gap-2">
                    <button onClick={handlePrint} className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white">print</button>

                    <button onClick={() => setShowPrintModal1(false)} className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white">Cancel</button>
                </div>

                <div
                    ref={componentRef}
                    className='bg-white mx-auto p-12 hidden'
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

            </div>
        </div>
    );
};

export default AllOrderInvoice;