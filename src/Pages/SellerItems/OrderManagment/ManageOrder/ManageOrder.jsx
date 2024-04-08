import React, { useContext, useRef, useState } from 'react';
import { ordersNav } from './ManageOrderNavData';
import OrderTable from './OrderTable';
import ExportModal from './ExportModal';
import DarazOrderTable from '../DarazOrder/DarazOrderTable';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import WooCommerceOrderTable from '../WoocommerceOrder/WooCommerceOrderTable';
import PrintedWebInvoice from './PrintedWebInvoice';
import { useReactToPrint } from 'react-to-print';
import AllOrderInvoice from './AllOrderInvoice';

const ManageOrder = () => {
    const { shopInfo } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState('All');
    const [selectedItems, setSelectedItems] = useState([]);
    const [showPrintModal1, setShowPrintModal1] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [details, setDetails] = useState();
    const [daraz, setDaraz] = useState(false);
    const [showInvoiceSm, setShowInvoiceSm] = useState(false);
    const [woo, setWoo] = useState(false);
    const [passData, setPassData] = useState([])
    const [selected, setSelected] = useState([]);
    const [showInvoice, setShowInvoice] = useState(false);
  
    const { data: tData = [], refetch } = useQuery({
        queryKey: ["sellerOrder"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });

    const { data: darazOrder = [] } = useQuery({
        queryKey: ["sellerDaraz"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-order?id=${shopInfo._id}&status=All`);
            const data = await res.json();
            return data.data;
        },
    });

    const getOrderCount = (orders, status) => {
        return orders.filter(order => status === 'All' || (status === 'pending' && !order.status) || order.status === status).length;
    };

    const getDarazOrderCount = (orders, status) => {
        return orders.filter(order => status === 'All' || (status === 'pending' && !order.statuses[0]) || order.statuses[0] === status).length;
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    const get_print_for_selected_items = () => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-get-order-invoice?id=${shopInfo._id}&orderId=[${selected}]`)
            .then(res => res.text())
            .then(html => {

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Find the iframe element and extract its src attribute
                const iframe = tempDiv.querySelector('iframe');
                if (iframe) {
                    const src = iframe.getAttribute('src');
                    // Now you have the src value, you can use it as needed
                    console.log('src:', src);
                    // For example, you can open it in a new tab/window
                    window.open(src, '_blank');
                } else {
                    console.error('No iframe found in the HTML content.');
                }
            })
            .catch(error => {
                alert(error)
            });
    }


    const get_daraz_sleeted_order_invoice = () => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-get-order-items?id=${shopInfo._id}&orderId=[${selected}]`)
            .then(res => res.json())
            .then((data) => {
                console.log(data.data);
                const invoiceHTML = constructInvoiceHTML(data.data);

                // Open the invoice in a new window/tab
                const newWindow = window.open('');
                newWindow.document.write(invoiceHTML);
            })
            .catch(error => {
                alert(error)
            });

    }
    const constructInvoiceHTML = (invoiceData) => {
        // Construct the HTML content for the invoice using the fetched data
        let html = `
    <html>
    <head>
        <title>Invoice</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            h1 {
                text-align: center;
                margin-bottom: 20px;
            }
            .print-button {
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="max-w-2xl mx-auto p-4">
        <div class="print-button mt-8 text-right flex items-end justify-end">
            <button onclick="window.print()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Print Invoice</button>
        </div>
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold">Invoice</h1>
            </div>
            <div>
                <h2 class="text-lg font-semibold">Buyer Information</h2>
                <p><strong>Buyer ID:</strong> ${invoiceData.buyer_id}</p>
            </div>
            <div class="mt-8">
                <h2 class="text-lg font-semibold">Order Details</h2>
                <p><strong>Order ID:</strong> ${invoiceData.order_id}</p>
                <p><strong>Order Status:</strong> ${invoiceData.status}</p>
            </div>
            <div class="mt-8">
                <h2 class="text-lg font-semibold">Order Items</h2>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="py-2">Product Image</th>
                            <th class="py-2">Product Name</th>
                            <th class="py-2">SKU</th>
                            <th class="py-2">Price</th>
                            <th class="py-2">Quantity</th>
                            <th class="py-2">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
`;

        // Iterate over the order items and add rows to the table
        invoiceData.forEach(item => {
            html += `
            <tr>
                <td class="py-2"><img src="${item.product_main_image}" alt="Product Image" class="w-16 h-16 object-cover"></td>
                <td class="py-2">${item.name}</td>
                <td class="py-2">${item.sku}</td>
                <td class="py-2">${item.item_price}</td>
                <td class="py-2">${item.quantity}</td>
                <td class="py-2">${item.item_price * item.quantity}</td>
            </tr>
        `;
        });

        // Close the HTML content
        html += `
                    </tbody>
                </table>
            </div>
        </div>
        
    </body>
    </html>
`;

        return html;
    }

    //selected item.lop => {
    // get_daraz_sleeted_order_invoice
    // constructInvoiceHTML
    // }
    const getPrintForSelectedEveryItems = async () => {
        try {
            // Initialize an array to store all invoice HTML content
            const allInvoicesHTML = [];

            // Iterate over each selected order ID
            for (const orderId of selected) {
                // Fetch the order details (including invoice data) for the current order ID
                const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-get-order-items?id=${shopInfo._id}&orderId=[${orderId}]`);
                const data = await response.json();

                // Check if the response is successful
                if (response.ok) {
                    // Push the invoice data to the array
                    allInvoicesHTML.push(data.data);
                } else {
                    // Handle error if the response is not successful
                    console.error(`Failed to fetch invoice for order ID ${orderId}: ${data.error}`);
                }
            }

            console.log(allInvoicesHTML);

            // Once all invoices are fetched, generate HTML for all invoices
            const combinedInvoicesHTML = constructMultipleInvoiceHTML(allInvoicesHTML);

            // Open a new window and write the combined invoices HTML content
            const newWindow = window.open('');
            newWindow.document.write(combinedInvoicesHTML);

        } catch (error) {
            alert(error)
        }
    };

    const constructMultipleInvoiceHTML = (allInvoicesData) => {
        // Initialize an empty string to store the HTML content for all invoices
        let allInvoicesHTML = '';

        // Iterate over each invoice data
        allInvoicesData.forEach(invoiceData => {
            // Construct the HTML content for each invoice using the fetched data
            let html = `
            <div class="max-w-2xl mx-auto p-4">
                <div class="text-center mb-8">
                    <h1 class="text-2xl font-bold">Invoice</h1>
                </div>
                <div>
                    <h2 class="text-lg font-semibold">Buyer Information</h2>
                    <p><strong>Buyer ID:</strong> ${invoiceData.buyer_id}</p>
                </div>
                <div class="mt-8">
                    <h2 class="text-lg font-semibold">Order Details</h2>
                    <p><strong>Order ID:</strong> ${invoiceData.order_id}</p>
                    <p><strong>Order Status:</strong> ${invoiceData.status}</p>
                </div>
                <div class="mt-8">
                    <h2 class="text-lg font-semibold">Order Items</h2>
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="py-2">Product Image</th>
                                <th class="py-2">Product Name</th>
                                <th class="py-2">SKU</th>
                                <th class="py-2">Price</th>
                                <th class="py-2">Quantity</th>
                                <th class="py-2">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

            // Iterate over the order items and add rows to the table
            invoiceData.order_items.forEach(item => {
                html += `
                <tr>
                    <td class="py-2"><img src="${item.product_main_image}" alt="Product Image" class="product-image"></td>
                    <td class="py-2">${item.name}</td>
                    <td class="py-2">${item.sku}</td>
                    <td class="py-2">${item.item_price}</td>
                    <td class="py-2">${item.quantity}</td>
                    <td class="py-2">${item.item_price * item.quantity}</td>
                </tr>
            `;
            });

            // Close the HTML content for the current invoice
            html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

            // Append the HTML content of the current invoice to the overall HTML string
            allInvoicesHTML += html;
        });

        return allInvoicesHTML;
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    return (
        <div>
            <ExportModal openModal={openModal} details={details} setOpenModal={setOpenModal} />
            <h3 className="font-bold text-xl">Orders Overview</h3>
            <div className="flex flex-wrap justify-start  items-center gap-4 ">
                <button onClick={() => setDaraz(false)} className={`px-4 py-1 border text-white ${!daraz ? "bg-gray-900" : "bg-gray-500"}`}>
                    Web Order
                </button>
                <button onClick={() => setDaraz(true)} className={`px-4 py-1 border text-white ${daraz ? "bg-gray-900" : "bg-gray-500"}`}>
                    Daraz Order
                </button>
                <button onClick={() => setWoo(!woo)} className='px-4 py-1 bg-transparent border'>
                    Woo Commerce Order
                </button>
            </div>

            <nav className='flex flex-wrap md:gap-4 gap-2  mt-6'>
                {ordersNav?.map((itm) =>
                    itm?.status === 'dropdown' ? (
                        <select
                            key={itm.name}
                            className={`px-4 border-r bg-transparent relative border-gray-300 flex items-center gap-2 justify-center ${selectedValue === 'pending' ? 'text-red-500' : ''}`}
                            value={selectedValue}
                            onChange={e => setSelectedValue(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            {itm?.dropdownLink?.map(option => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <button
                            key={itm.name}
                            className={`px-4 border-r md:bg-transparent bg-gray-50 border-gray-300 flex  items-center ${selectedValue === itm.value ? 'text-red-500' : ''}`}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => setSelectedValue(itm.value)}
                        >
                            {itm.name} {!daraz ? `(${getOrderCount(tData, itm.value)})` : getDarazOrderCount(darazOrder.orders, itm.value)}
                        </button>
                    )
                )}
            </nav>

            <div>

                <div onClick={() => setShowInvoice(false)} className={`fixed z-[100] flex items-center justify-center ${showInvoice ? 'visible opacity-100' : 'invisible opacity-0'} inset-0   backdrop-blur-sm duration-100 dark:bg-white/10`}>

                    <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute w-[98%] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-gray-50 h-full  overflow-y-auto dark:text-black ${showInvoice ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                        <button onClick={() => setShowInvoice(false)} className='bg-red-500 absolute left-[100px] text-white px-4 py-1 rounded'>
                            Close
                        </button>
                        <PrintedWebInvoice data={selectedItems} />
                    </div>
                </div>

            </div>

            <div className="flex md:flex-row flex-col items-center gap-4 mt-4">
                <div className="relative inline-block text-left">
                    <button onClick={toggleDropdown} className="px-4 bg-white py-1 border" id="dropdown-button" aria-haspopup="true" aria-expanded={isOpen ? "true" : "false"}>
                        Print
                    </button>
                    {isOpen && !daraz && (
                        <div className="origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <button onClick={() => setShowPrintModal1(true)} className="block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="dropdown-item-1">Print Stock Checklist For Selected Items</button>
                                <button onClick={() => setShowInvoiceSm(true)} className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100" role="menuitem" tabIndex="-1" id="dropdown-item-2">Print Invoice For Selected Items</button>
                                <button
                                    onClick={() => setShowInvoice(true)}
                                    className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100" role="menuitem" tabIndex="-1" id="dropdown-item-3">Print Shipping Label For Selected Items</button>
                            </div>
                        </div>
                    )}
                    {isOpen && daraz && (
                        <div className="origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <button onClick={get_daraz_sleeted_order_invoice} className="block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="dropdown-item-1">Print Stock Checklist For Selected Items</button>
                                <button onClick={getPrintForSelectedEveryItems} className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100" role="menuitem" tabIndex="-1" id="dropdown-item-2">Print Invoice For Selected Items</button>
                                <button onClick={() => get_print_for_selected_items()} className="block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100" role="menuitem" tabIndex="-1" id="dropdown-item-3">Print Shipping Label For Selected Items</button>
                            </div>
                        </div>
                    )}
                </div>


                {/* print modal 2 area */}
                <div>
                    <div onClick={() => setShowInvoiceSm(false)} className={`fixed z-[100] flex items-center justify-center ${showInvoiceSm ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>

                        <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute w-[95%] h-[96%] overflow-y-auto rounded-sm bg-gray-50 p-6 drop-shadow-lg     ${showInvoiceSm ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                            <div ref={componentRef}>
                                {
                                    selectedItems?.map(itm => <div
                                        style={{ width: '210mm', height: '297mm' }}
                                        className='bg-white mx-auto mb-4 p-12  ' key={itm?._id}>
                                        <header className="flex ">
                                            <div id="logo">
                                                <img src={shopInfo?.logo} />
                                            </div>
                                            <div className='text-start' >
                                                <h2 className="name">
                                                    {shopInfo?.shopName}
                                                </h2>
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
                                        <br />
                                        <main>
                                            <h3 className="font-semibold">Order Details:</h3>

                                            <ul className='border mt-3'>
                                                <li className='flex items-center border-b'>
                                                    <div className='px-2 w-[170px]'>
                                                        name :
                                                    </div>
                                                    <div className='border-l py-2 ml-1 pl-2'>
                                                        {itm?.addresses.fullName}
                                                    </div>
                                                </li>
                                                <li className='flex border-b items-center'>
                                                    <div className='px-2 w-[170px]'>
                                                        Address :
                                                    </div>
                                                    <div className='border-l py-2 ml-1 pl-2'>
                                                        {itm?.addresses.address},{itm?.addresses?.area}, {itm?.addresses?.city}
                                                    </div>
                                                </li>
                                                <li className='flex border-b items-center'>
                                                    <div className='px-2 w-[170px]'>
                                                        Number :
                                                    </div>
                                                    <div className='border-l py-2 ml-1 pl-2'>
                                                        {itm?.addresses.mobileNumber}
                                                    </div>
                                                </li>
                                                <li className='flex border-b items-center'>
                                                    <div className='px-2 w-[170px]'>
                                                        Order Number :
                                                    </div>
                                                    <div className='border-l py-2 ml-1 pl-2'>
                                                        {itm?.orderNumber}
                                                    </div>
                                                </li>
                                                <li className='flex items-center'>
                                                    <div className='px-2 w-[170px]'>
                                                        invoice ID :
                                                    </div>
                                                    <div className='border-l py-2 ml-1 pl-2'>
                                                        {itm?._id}
                                                    </div>
                                                </li>
                                            </ul>

                                            <br />

                                            <h3 className="font-semibold">Products List:</h3>
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
                                                                <h3 className=''>{list.productName?.split(' ').slice(0, 5).join(" ")}</h3>
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
                                        </main>
                                    </div>)
                                }

                            </div>
                            <div className="flex gap-2">
                                <button onClick={handlePrint} className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white">Print</button>
                                <button onClick={() => setShowInvoiceSm(false)} className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end print modal 2  area */}


                {/* print modal 1 */}
                <div>

                    <div onClick={() => setShowPrintModal1(false)} className={`fixed z-[100] flex items-center justify-center ${showPrintModal1 ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>
                        <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute overflow-y-auto w-[96%] h-[98%] rounded-sm bg-gray-50 p-6 drop-shadow-lg text-black ${showPrintModal1 ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                            <AllOrderInvoice data={selectedItems} setShowPrintModal1={setShowPrintModal1} showPrintModal1={showPrintModal1} />
                        </div>
                    </div>
                </div>
                {/* end print modal 1 */}
                <button onClick={() => setOpenModal(!openModal)} className='px-4 py-1 bg-transparent border'>
                    Export orders
                </button>
                <input
                    className="w-[260px] md:mt-0 mt-3 rounded border-gray-400 focus:outline-none p-2 border"
                    type="date"
                    onChange={e => setSelectedDate(new Date(e.target.value))}
                />
                <div className="flex items-center gap-4">
                    <div className='flex items-center md:mt-0 mt-3 bg-white '>
                        <input onChange={e => setSearchValue(e.target.value)} type="text" placeholder='Search' className="w-[260px] rounded border-gray-400 focus:outline-none p-2 border" />
                    </div>
                </div>
            </div>

            <div className='mt-12 '>
                {/* <WooCommerceOrderTable searchValue={searchValue} /> */}
                {!daraz ?
                    <OrderTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} setPassData={setPassData} ordersNav={ordersNav} selectedDate={selectedDate} setDetails={setDetails} setOpenModal={setOpenModal} selectedValue={selectedValue} searchValue={searchValue} />
                    :
                    <DarazOrderTable selected={selected} setSelected={setSelected} selectedValue={selectedValue} searchValue={searchValue} />
                }
            </div>
        </div>
    );
};

export default ManageOrder;

