import React, { useState } from 'react';
import { FaAnglesRight } from 'react-icons/fa6';

const InvoiceSm = ({ order, modalOpen, setModalOpen, formatDate, totalPrice }) => {

    return (
        <div className='bg-[#000000e1] w-[100%] h-[100%] p-2 fixed transparent-scroll overflow-x-auto overflow-y-auto top-0 left-0 z-[2000]'>
            <button onClick={() => setModalOpen(!modalOpen)} className='bg-[red] m-6 text-white px-8 py-2 top-[-10px] absolute  right-[-14px]'>close</button>
            <div className="w-full mt-12 h-full p-8 m-auto bg-white" >
                <header className="clearfix">
                    <div id="logo">
                        <img src={order?.logo} />
                    </div>
                    <div id="company">
                        <h2 className="name">{order?.shopName}</h2>
                        {/* <div>455 Foggy Heights, AZ 85004, US</div> */}
                        <div>{order?.shopNumber}</div>
                        <div>
                            <a href="mailto:company@example.com">{order?.shopEmail}</a>
                        </div>
                    </div>
                </header>
                <main className='main mt-4'>
                    <div id="details" className="clearfix">
                        <div id="client">
                            <h1 className='text-3xl font-bold text-blue-500'>INVOICE</h1>
                            <div className="date">Date of Invoice: {formatDate(order?.timestamp)}</div>
                            {/* <img src={shoporder?.logo} alt="" className="" /> */}
                            <div className="to mt-3">INVOICE TO:</div>
                            <h2 className="name text-sm">{order?.addresses?.fullName}</h2>
                            <div className="address text-sm">{order?.addresses?.address} {order?.addresses?.area} {order?.addresses?.city} {order?.addresses?.province}</div>
                            <div className="email text-sm">
                                <a href="mailto:john@example.com">{order?.addresses?.mobileNumber}</a>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-center bg-white">
                        <div class="p-6 overflow-scroll px-0">
                            <table class="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr className=''>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 bg-green-500 text-white font-bold">
                                            <p class="block antialiased font-sans text-md font-bold leading-none  no">#</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Product Image</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Product Name</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Unit Price</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Quantity</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100  p-4 bg-green-500 text-white font-bold">
                                            <p class="block antialiased font-sans text-md font-bold leading-none  no">Total</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order?.productList?.map((list, index) => <tr key={list?._id} className='border-b bg-gray-50'>
                                            <td class="p-4 border-b border-blue-gray-50 bg-green-500 text-white">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{index + 1}</p>
                                            </td>
                                            <td class="p-2 border-b border-blue-gray-50">
                                                <img src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg" alt="Spotify" class="inline-block relative object-center   w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
                                            </td>

                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{list.productName?.split(' ').slice(0, 5).join(" ")}</p>
                                            </td>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{list?.price}</p>
                                            </td>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{list.quantity}</p>
                                            </td>
                                            <td class="p-4 border-b border-blue-gray-50 bg-green-500 text-white">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{parseInt(list?.price) * parseInt(list?.quantity)}</p>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                                <tfoot>
                                    <tr className=''>
                                        <td colSpan={3} />
                                        <td className='font-semibold text-md' colSpan={2}>SUBTOTAL</td>
                                        <td className='font-semibold text-center'>{totalPrice}</td>
                                    </tr>
                                    <tr className=''>
                                        <td colSpan={3} />
                                        <td className='font-semibold text-md' colSpan={2}>TAX 25%</td>
                                        <td className='font-semibold text-center'>300</td>
                                    </tr>
                                    <tr className=''>
                                        <td colSpan={3} />
                                        <td className='font-semibold text-md' colSpan={2}>GRAND TOTAL</td>
                                        <td className='font-semibold text-center'>{totalPrice + 300} </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </main>
                <div className='bg-white w-full p-6'>
                    <div className='text-md font-semibold'>Thank you!</div>
                    Invoice was created on a computer and is valid without the signature and
                    seal.
                </div>
            </div>


        </div>
    )
}
const InvoiceLg = ({ order, modalOpen, setModalOpen, formatDate, totalPrice }) => {

    return (
        <div className='bg-[#000000e1] w-[100%] h-[100%] p-2 fixed transparent-scroll overflow-x-auto overflow-y-auto top-0 left-0 z-[2000]'>
            <button onClick={() => setModalOpen(!modalOpen)} className='bg-white m-6 text-black px-8 py-2 float-right'>close</button>
            <div className="w-full mt-12 h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                <header className="clearfix">
                    <div id="logo">
                        <img src={order?.logo} />
                    </div>
                    <div id="company">
                        <h2 className="name">{order?.shopName}</h2>
                        {/* <div>455 Foggy Heights, AZ 85004, US</div> */}
                        <div>{order?.shopNumber}</div>
                        <div>
                            <a href="mailto:company@example.com">{order?.shopEmail}</a>
                        </div>
                    </div>
                </header>
                <main className='main mt-4'>
                    <div id="details" className="clearfix">
                        <div id="client">
                            {/* <img src={shoporder?.logo} alt="" className="" /> */}
                            <div className="to">INVOICE TO:</div>
                            <h2 className="name">{order?.addresses?.fullName}</h2>
                            <div className="address">{order?.addresses?.address} {order?.addresses?.area} {order?.addresses?.city} {order?.addresses?.province}</div>
                            <div className="email">
                                <a href="mailto:john@example.com">{order?.addresses?.mobileNumber}</a>
                            </div>
                        </div>
                        <div id="invoice">
                            <h1>INVOICE</h1>
                            <div className="date">Date of Invoice: {formatDate(order?.timestamp)}</div>
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
                                order?.productList?.map((list, index) => <tr key={index} className='text-center'>
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
                                <td>{totalPrice}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} />
                                <td colSpan={2}>TAX 25%</td>
                                <td>300</td>
                            </tr>
                            <tr>
                                <td colSpan={3} />
                                <td colSpan={2}>GRAND TOTAL</td>
                                <td>{totalPrice + 300} </td>
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
    )
}

const UserOrderInvoice = ({ order, modalOpen, setModalOpen }) => {
    const [steps, setStep] = useState({
        stepsItems: ["Order", "Processing", "Delivered"],
    })

    const totalPrice = order?.productList?.reduce((total, item) => {
        return total + item?.price * item?.quantity;
    }, 0);

    let subtotal = 0;

    const productList = order?.productList.map((product) => {
        const productSubtotal = product.price * product.quantity;
        subtotal += productSubtotal;
        return subtotal;
    })

    let currentStep;
    if (!order.status) {
        currentStep = 2;
    } else if (order.status === 'delivered') {
        currentStep = 5;
    } else if (order.status === 'ready_to_ship') {
        currentStep = 3;
    } else if (order.status === 'shipped') {
        currentStep = 4;
    } else if (order.status === 'canceled' || "failed" || 'returned') {
        currentStep = 5;
    } else {
        // Default to 1 or any other appropriate value
        currentStep = 1;
    }
    function formatDate(timestamp) {
        // Check if the timestamp is in seconds, and convert it to milliseconds if needed
        if (timestamp.toString().length === 10) {
            timestamp *= 1000;
        }
        const date = new Date(timestamp);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${formattedDate} `;
    }

    return (
        <>
            {order &&
                <div>
                    <div className="md:block block">
                        <InvoiceSm order={order} modalOpen={modalOpen} setModalOpen={setModalOpen} formatDate={formatDate} totalPrice={totalPrice} />
                    </div>
                    <div className="md:hidden hidden">
                        <InvoiceLg order={order} modalOpen={modalOpen} setModalOpen={setModalOpen} formatDate={formatDate} totalPrice={totalPrice} />
                    </div>
                </div>

            }
        </>
    );
};

export default UserOrderInvoice;