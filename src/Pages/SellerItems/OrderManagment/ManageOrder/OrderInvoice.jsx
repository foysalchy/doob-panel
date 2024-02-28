import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';

const OrderInvoice = ({ products, setModalOpen }) => {
const { user } = useContext(AuthContext);

// Calculate subtotal
const subtotal = products?.quantity * products?.price;

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
console.log(formattedDate);

console.log(products, 'invoice>>>>', user);
return (
    <div className='relative'>
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-[3000] bg-gray-50 py-5">
            <button onClick={() => setModalOpen(false)} className='absolute right-4 text-2xl top-4'>
                x
            </button>
            <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 absolute top-4 left-3 text-white rounded-md'>Print</button>

            <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '235mm', height: '297mm' }}>
                <header className="clearfix">
                    {/* <div id="logo">
                    <img src={products?.shop?.image} />
                </div> */}
                    <div id="company">
                        <h2 className="name">
                            {user?.customerName}
                        </h2>
                        {/* <div>{products?.shopInfo?.address}</div>
                    <div>
                        {products?.shopInfo?.shopEmail}
                    </div> */}
                    </div>
                </header>
                <main className='main mt-4'>
                    <div id="details" className="clearfix">
                        <div id="client">
                            {/* <img src={shopInfo?.logo} alt="" className="" /> */}
                            <div className="to">INVOICE TO:</div>
                            <h2 className="name">
                                {products?.userInfo?.name}
                            </h2>
                            <div className="address">
                                {products?.userInfo?.area}, {products?.userInfo?.city}
                            </div>
                            <div className="email">
                                <a href={`mailto:${products?.userInfo?.email}`}>
                                    {products?.userInfo?.email}
                                </a>
                            </div>
                        </div>
                        <div id="invoice">
                            <h1>INVOICE</h1>
                            <div className="wrap-2 mb-0 mt-[-57px] ml-[40px]">
                                <div className="wrap-2 ml-[60px]">
                                    <Barcode value={products?._id} options={{ format: 'code128' }} renderer="svg" />
                                </div>
                            </div>
                            <div className={""}>
                                {
                                    products?.warehouse?.map(itm => <span className="border-r text-black text-xs px-3 py-1 ">{itm?.name}</span>)
                                }
                            </div>
                            <div className="date">
                                Date of Invoice: {formattedDate}
                            </div>
                        </div>
                    </div>
                    <table className='table' border={0} cellSpacing={0} cellPadding={0}>
                        <thead className='thead'>
                            <tr>
                                <th className=" text-center">Product photo</th>
                                <th className=" text-center">Product Name</th>
                                <th className=" text-center bg-gray-400"> QUANTITY</th>
                                <th className="text-center no">PRICE</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            <tr className='text-center'>
                                <td className="">
                                    <img className='w-20 h-20 border border-opacity-40 rounded object-cover' src={products?.product?.image} alt="" />
                                </td>
                                <td className="">
                                    <h3 className='text-xs'>{products?.product?.name.slice(0, 80)}...</h3>
                                </td>
                                <td className="">
                                    {products?.quantity}
                                </td>

                                <td className="no">
                                    {products?.price}
                                </td>


                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={1} />
                                <td colSpan={2}>SUBTOTAL</td>
                                <td>
                                    {subtotal}
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={1} />
                                <td colSpan={2}>Tax</td>
                                <td>
                                    {tax}
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={1} />
                                <td colSpan={2}>GRAND TOTAL</td>
                                <td>
                                    {total}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div id="thanks">Thank you!</div>
                    <div id="notices">
                        <div>NOTICE:</div>

                    </div>
                    <footer>
                        Invoice was created on a computer and is valid without the signature and
                        seal.
                    </footer>
                </main>
            </div>



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

export default OrderInvoice;