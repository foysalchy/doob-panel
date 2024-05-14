import { useReactToPrint } from 'react-to-print';
import React, { useContext, useRef } from 'react';
import Barcode from 'react-barcode';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';

const PrintedWebInvoice = (data) => {
    const invoiceData = data?.data || [];
    const { user, shopInfo, shopId } = useContext(AuthContext)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });




    const formattedDate = (time) => {
        const date = new Date(time);

        // Extract individual components (year, month, day, etc.)
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Format the components as needed
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const finalDate = formattedDate;
        return finalDate;

    }


    const totalPrice = (productList) => {
        productList?.reduce((total, item) => {
            console.log(total, item?.quantity, '+++++');
            return total?.price + item?.price * item?.quantity;
        }, 0);
    }


    const {
        data: shop = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["shop"],
        queryFn: async () => {
            const res = await fetch(
                `https://backend.doob.com.bd/api/v1/shop/${shopInfo?.shopId}`
            );
            const data = await res.json();
            return data;
        },
    });

    const InvoicePage = ({ itm }) => {


        const subTotal = itm?.productList?.reduce((acc, list) => acc + parseInt(list?.price) * parseInt(list?.quantity), 0);

        const total = itm?.productList?.reduce((acc, list) => acc + parseInt(list?.price) * parseInt(list?.quantity), 0)

        console.log(itm);
        return (
            <>
                <div
                    className="lg:px-6 bg-white print-container  pb-12 pt-16 mx-2 print-data">

                    <header className="flex items-start justify-between">
                        <img src={shop?.logo ?? logo} alt="logo" className='w-[200px]' />
                        <div className='whitespace-wrap w-[300px]'>
                            <p className='text-gray-600 text-end'>{user?.shopName}</p>
                            <p className='text-gray-600 text-end'>{user?.shopEmail}</p>
                        </div>
                    </header>

                    <main>
                        <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                            INVOICE
                        </div>

                        {/*................*/}
                        {/*.... Address ...*/}
                        {/*................*/}
                        <div className=" items-start justify-between mt-4">
                            <div>
                                <div className='flex items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Email :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{user?.email}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Phone :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{user?.phoneNumber}</p>
                                </div>
                            </div>

                            <div>
                                <li className='flex justify-start items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Invoice No : {user?._id}
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
                            <h1 className='text-end text-xl '>Total : {total}</h1>

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
            </>
        )
    }




    console.log(totalPrice, 'invoice......');
    return (

        <div>
            <header className='flex items-center gap-2'>
                <button onClick={handlePrint} className='bg-blue-500 text-white px-4 py-1 rounded'>
                    Print
                </button>
            </header>

            {invoiceData.length > 0 && (
                <div ref={componentRef} className=''>
                    {invoiceData?.map(itm => {

                        console.log(itm, 'itm');

                        const subTotal = itm?.productList?.reduce((acc, list) => acc + parseInt(list?.price) * parseInt(list?.quantity), 0);

                        const total = itm?.productList?.reduce((acc, list) => acc + parseInt(list?.price) * parseInt(list?.quantity), 0)

                        return (
                            <div className="w-full h-full mb-2 p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                                {/* <InvoicePage itm={itm} /> */}
                                <>
                                    <div
                                        className="lg:px-6 bg-white print-container  pb-12 pt-16 mx-2 print-data">

                                        <header className="flex items-start justify-between">
                                            <img src={shop?.logo ?? logo} alt="logo" className='w-[200px]' />
                                            <div className='whitespace-wrap w-[300px]'>
                                                <p className='text-gray-600 text-end'>{shop?.shopName}</p>
                                                <p className='text-gray-600 text-end'>{shop?.shopEmail}</p>
                                            </div>
                                        </header>

                                        <main>
                                            <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
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
                                                        <p className="text-gray-600 text-sm">{itm?.addresses?.fullName}</p>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Number :
                                                        </h4>
                                                        <p className="text-gray-600 text-sm">{itm?.addresses?.mobileNumber}</p>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                            address :
                                                        </h4>
                                                        <p className="text-gray-600 text-sm">{itm?.addresses?.address}, {itm?.addresses?.city}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <li className='flex justify-start items-center gap-2'>
                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice No : {user?._id}
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
                                                <h1 className='text-end text-xl '>Total : {total}</h1>

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
                                </>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PrintedWebInvoice;