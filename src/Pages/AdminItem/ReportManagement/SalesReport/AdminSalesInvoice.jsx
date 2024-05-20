import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import logo from '../../../../assets/doobBlack.png'
const AdminSalesInvoice = ({ products, setModalOpen }) => {
    const { user } = useContext(AuthContext);

    // Calculate subtotal
    const subtotal = products?.quantity * products?.productPrice;

    // Calculate tax
    const taxRate = 0.1;
    const tax = subtotal * taxRate;

    const total = subtotal + tax;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const date = new Date(products?.date);
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;



    const InvoicePage = ({ data }) => {
        const totalPrice = parseFloat(data?.data?.productPrice ?? 0) * parseFloat(data?.data?.quantity ?? 1);

        console.log(products, '.....');
        return (
            <>
                <div
                    ref={componentRef}
                    className="p-12 mx-8 print-data bg-white  mt-6">
                    <div className="">
                        <header className="flex items-start justify-between">
                            <img src={logo} alt="logo" className='w-[200px]' />
                            <div className='whitespace-wrap w-[300px]'>
                                <p className='text-gray-600 text-end'>{user?.name}</p>
                                <p className='text-gray-600 text-end'>{user?.email}</p>
                                <p className='text-gray-600 text-end'>{user?.phoneNumber}</p>
                            </div>
                        </header>
                        <main>
                            <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                INVOICE
                            </div>

                            {/*................*/}
                            {/*.... Address ...*/}
                            {/*................*/}
                            <div className="flex items-start justify-between mt-4">
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                            Name :
                                        </h4>
                                        <p className="text-gray-600 text-sm">{data?.user?.name}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                            Email :
                                        </h4>
                                        <p className="text-gray-600 text-sm">{data?.user?.email}</p>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                            Phone :
                                        </h4>
                                        <p className="text-gray-600 text-sm">{data?.user?.phoneNumber}</p>
                                    </div>

                                </div>

                                <div>
                                    <li className='flex justify-start items-center gap-2'>
                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                            Invoice No : {data?._id}
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
                                    <div className="w-full overflow-x-auto">
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
                                                {
                                                    <tr className="text-gray-700">
                                                        <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                            <img src={data?.data?.productImg ?? ''} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                        </td>
                                                        <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                            {data?.data?.productTitle}
                                                        </td>

                                                        <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                            {data?.data?.quantity ?? 1}
                                                        </td>
                                                        <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                            {data?.data?.productPrice ?? 0}
                                                        </td>
                                                    </tr>}

                                                <tr>
                                                    <td colSpan={3} className='px-1 py-2 text-sm border border-gray-800 text-right'>
                                                        TOTAL:
                                                    </td>
                                                    <td colSpan={1} className='px-1 py-2 text-sm border border-gray-800 text-center'>
                                                        ${totalPrice}
                                                    </td>
                                                </tr>
                                                {/* Add more rows here */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>



                        </main>
                    </div>
                </div>
            </>
        )
    }



    console.log(products, 'invoice>>>>', user);
    return (
        <div className='relative'>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-[3000] bg-gray-50 py-5">
                <button onClick={() => setModalOpen(false)} className='absolute right-4 text-2xl top-4'>
                    x
                </button>
                <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 absolute top-4 left-3 text-white rounded-md'>Print</button>

                <InvoicePage data={products} />



                {/* <div className='border p-3'>
                                                            <h2 className="text-lg font-semibold">Billing Information</h2>
                                                            <div className='flex gap-2 items-center'>

                                                                <div className="wrap ">
                                                                    <BarCode value={product._id} />
                                                                </div>
                                                                <div className='flex gap-2'>
                                                                    <h1>Name: {modalOpen.userInfo.name}</h1>
                                                                    <h1>Phone: {modalOpen.userInfo.phoneNumber}</h1>
                                                                    <h1>City:  {modalOpen.userInfo.city}</h1>
                                                                    <h1>Area: {modalOpen.userInfo.area}</h1>
                                                                </div>
                                                                <div>

                                                                </div>
                                                            </div>
                                                        </div> */}
            </div>
        </div>
    );
};

export default AdminSalesInvoice;