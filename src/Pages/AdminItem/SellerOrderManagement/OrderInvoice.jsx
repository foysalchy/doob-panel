import { useContext, useRef } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";

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


    console.log(product, 'info..');
    return (
        <div>

            <div onClick={() => setOpenModal(false)} className={`fixed p-12 z-[100] overflow-y-auto flex items-center justify-center ${openModal?._id == product?._id ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>

                <div onClick={(e_) => e_.stopPropagation()} className={`text-   absolute w-screen h-full m-auto rounded-sm bg-white p-12 drop-shadow-lg dark:bg-black border border-black dark:text-black ${openModal?._id == product?._id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>

                    <div className="bg-gray-100 p-12 ">
                        <button
                            onClick={handlePrint}
                            className='bg-blue-500 px-6 py-2 rounded-2 text-black rounded-md'>Print</button>

                        <button onClick={() => setOpenModal(false)} className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white ml-2">Cancel</button>
                        <div
                            ref={componentRef}
                            className="w-full h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '237mm' }}>
                            <header className="clearfix">
                                <div id=" ">
                                    <img

                                        className="w-[120px]"
                                        src={`https://doob.com.bd/assets/Logo-7314a69b.png`} />
                                </div>
                                <div id="company">
                                    <h2 className=" ">
                                        {user?.name}
                                    </h2>

                                    <div>
                                        <a href={user?.email}>
                                            {user?.email}
                                        </a>
                                    </div>
                                </div>
                            </header>
                            <main className='main mt-4'>
                                <div id="details" className="clearfix">
                                    <div id="client">
                                        {/* <img src={shopInfo?.logo} alt="" className="" /> */}
                                        <div className="to">INVOICE TO:</div>
                                        <h2 className="">
                                            {product?.customerName}
                                        </h2>

                                    </div>
                                    <div id="invoice">
                                        <h1>INVOICE</h1>
                                        <div className="wrap-2 mt-[-57px]  h-[100px] ml-[40px]">
                                            <Barcode value={product._id} />
                                        </div>
                                        <div className="date">Date of Invoice:
                                            {formattedDate(product?.date)}
                                        </div>
                                    </div>
                                </div>
                                <table className='table mx-auto w-[90%]' border={0} cellSpacing={0} cellPadding={0}>
                                    <thead className='thead'>
                                        <tr>
                                            <th className=" text-center">photo</th>
                                            <th className=" text-center">Name</th>
                                            <th className=" text-center bg-gray-400">UNIT PRICE</th>
                                            <th className="text-center">QUANTITY</th>
                                            <th className=" text-center no">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody className='tbody'>
                                        <tr className='text-center'>
                                            <td
                                                style={{
                                                    padding: '4px!important'
                                                }}
                                                className="">
                                                <img className='w-[90px] h-[90px] border border-opacity-40 rounded object-cover' src={product?.product?.image} alt="" />
                                            </td>
                                            <td className="">
                                                <h3 className="text-xs font-thin">
                                                    {product?.product?.name}
                                                </h3>
                                            </td>
                                            <td className=" ">
                                                {product?.price}
                                            </td>
                                            <td className=" ">
                                                {product?.quantity}
                                            </td>
                                            <td className="no ">
                                                {parseInt(product?.price) * parseInt(product?.quantity)}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        {/* <tr>
                                            <td colSpan={2} />
                                            <td colSpan={2}>SUBTOTAL</td>
                                            <td>
 
                                            </td>
                                        </tr> */}
                                        {/* <tr>
                                            <td colSpan={2} />
                                            <td colSpan={2}>TAX 25%</td>
                                            <td>300</td>
                                        </tr> */}
                                        <tr>
                                            <td colSpan={2} />
                                            <td colSpan={2}>GRAND TOTAL:</td>
                                            <td>
                                                {product.price * product?.quantity}
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


                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInvoice;
