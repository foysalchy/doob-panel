import React, { useContext, useRef } from 'react';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const PrintedWebInvoice = (data) => {
    const invoiceData = data?.data;
    const { shopInfo, shopId } = useContext(AuthContext)


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





    console.log(totalPrice, 'invoice......');
    return (

        <div>
            <header className='flex items-center gap-2'>
                <button onClick={handlePrint} className='bg-blue-500 text-white px-4 py-1 rounded'>
                    Print
                </button>

            </header>

            <div ref={componentRef} className=''>
                {
                    invoiceData.map(itm =>

                        <div className="w-full h-full mb-2 p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                            <header className="clearfix">
                                <div id="logo">
                                    <img src={shopInfo?.logo} />
                                </div>
                                <div id="company">
                                    <h2 className="name">
                                        {shopInfo?.shopName}
                                    </h2>
                                    <div>455 Foggy Heights, AZ 85004, US</div>
                                    <div>
                                        {shopInfo?.shopNumber}
                                    </div>
                                    <div>
                                        <a href="mailto:company@example.com">
                                            {shopInfo?.shopEmail}
                                        </a>
                                    </div>
                                </div>
                            </header>
                            <main className='main mt-4'>
                                <div id="details" className="clearfix">
                                    <div id="client">
                                        {/* <img src={shopInfo?.logo} alt="" className="" /> */}
                                        <div className="to">INVOICE TO:</div>
                                        <h2 className="name">
                                            {itm?.addresses?.fullName}
                                        </h2>
                                        <div className="address">
                                            {itm?.addresses?.address} {itm?.addresses?.area} {itm?.addresses?.city} {itm?.addresses?.province}
                                        </div>
                                        <div className="email">
                                            <a href="mailto:john@example.com">
                                                {itm?.addresses?.mobileNumber}
                                            </a>
                                        </div>
                                    </div>
                                    <div id="invoice">
                                        <h1>INVOICE</h1>
                                        <div className="wrap-2 mt-[-57px] ml-[40px]">
                                            <Barcode value={itm?.orderNumber} />
                                        </div>
                                        <div className="date">Date of Invoice:
                                            {formattedDate(itm?.timestamp)}
                                        </div>
                                    </div>
                                </div>
                                <table className='table' border={0} cellSpacing={0} cellPadding={0}>
                                    <thead className='thead'>
                                        <tr>
                                            <th className="no text-center">#</th>
                                            <th className=" text-center">Product photo</th>
                                            <th className=" text-center">Product Name</th>
                                            <th className=" text-center bg-gray-400">UNIT PRICE</th>
                                            <th className="text-center">QUANTITY</th>
                                            <th className=" text-center no">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody className='tbody'>
                                        {
                                            itm?.productList?.map((list, index) => <tr key={index} className='text-center'>
                                                <td className="no">{index + 1}</td>
                                                <td className=""><img className='w-20 h-20 border border-opacity-40 rounded object-cover' src={list.img} alt="" /></td>
                                                <td className="">
                                                    <h3>{list.productName?.split(' ').slice(0, 5).join(" ")}</h3>
                                                </td>
                                                <td className=" ">{list?.price}</td>
                                                <td className=" ">{list.quantity}</td>
                                                <td className="no ">{parseInt(list?.price) * parseInt(list?.quantity)}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={3} />
                                            <td colSpan={2}>SUBTOTAL</td>
                                            <td>
                                                {itm?.productList?.reduce((acc, list) => acc + parseInt(list?.price) * parseInt(list?.quantity), 0)}
                                            </td>

                                        </tr>
                                        <tr>
                                            <td colSpan={3} />
                                            <td colSpan={2}>TAX 25%</td>
                                            <td>300</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3} />
                                            <td colSpan={2}>GRAND TOTAL</td>
                                            <td>
                                                {itm?.productList?.reduce((acc, list) => acc + parseInt(list?.price) * parseInt(list?.quantity), 0)}
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
                        </div>)
                }
            </div>
        </div>
    );
};

export default PrintedWebInvoice;