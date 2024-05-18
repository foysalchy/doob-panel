import { useContext, useRef } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import logo from '../../../assets/Logo.png'
const OrderInvoice = ({ openModal, setOpenModal, product }) => {
    const { user } = useContext(AuthContext)
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


    const InvoicePage = ({ itm }) => {
        console.log(product, "order");
        const totalPrice = product?.price * product?.quantity;
        return (
            <>
                <div
                    ref={componentRef}
                    className="p-12 mx-8 print-data  mt-6">

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
                            INVOICE....
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
                                    <p className="text-gray-600 text-sm">{product?.userInfo?.fullName}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Name :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{product?.userInfo?.address}</p>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <h4 className='font-semibold text-gray-700 text-sm'>
                                        Phone :
                                    </h4>
                                    <p className="text-gray-600 text-sm">{product?.userInfo?.mobileNumber}</p>
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
                                            <tr className="text-gray-700">
                                                <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                    <img src={product?.image ? product?.image : product?.image} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                </td>
                                                <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                    {product?.product?.name}
                                                </td>

                                                <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                    {product?.quantity ? product?.quantity : 0}
                                                </td>
                                                <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                    {product?.price ? product?.price : 0}
                                                </td>
                                            </tr>

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
                    <footer>

                    </footer>
                </div>
            </>
        )
    }


    console.log(product, 'info..');
    return (
        <div>

            <div onClick={() => setOpenModal(false)} className={`fixed p-12 z-[100] overflow-y-auto flex items-center justify-center ${openModal?._id == product?._id ? 'visible opacity-100' : 'invisible opacity-0'} inset-0  backdrop-blur-sm duration-100 bg-white`}>

                <div onClick={(e_) => e_.stopPropagation()} className={`text-   absolute w-screen h-full m-auto rounded-sm bg-white p-12  ${openModal?._id == product?._id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} bg-gray-100`}>

                    <div className=" p-12 mb-8">
                        <button
                            onClick={handlePrint}
                            className='bg-blue-500 px-6 py-2 rounded-2 text-black rounded-md'>Print</button>

                        <button onClick={() => setOpenModal(false)} className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white ml-2">Cancel</button>
                        <div
                            ref={componentRef}
                            className="w-full h-full p-8 m-auto bg-gray-50" style={{ width: '210mm', height: '237mm' }}>
                            <InvoicePage order={product} />
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInvoice;
