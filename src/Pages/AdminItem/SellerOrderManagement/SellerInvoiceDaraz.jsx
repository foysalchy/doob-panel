import React from 'react';
import Logo from './doobBlack.png';
import { useQuery } from '@tanstack/react-query';


const SellerInvoiceDaraz = ({ invoiceData }) => {




    const parseDate = (dateString) => {
        if (!dateString) return new Date(); // Handle cases where dateString might be undefined or null

        // Extract date and time
        const [datePart, timePart, timezone] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hour, minute, second] = timePart.split(':');

        // Create a date object with the extracted components
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${timezone}`);
    };

    return (
        <div>
            <div className="max-w-2xl mx-auto p-4 bg-white border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <img
                        src={Logo} // Replace with actual logo URL
                        alt='Doob'
                        className="h-44"
                    />
                    <div className="text-right">
                        <p className="text-xs capitalize font-semibold">Doob</p>
                        <p className="text-xs capitalize">Mirpur Dhaka</p>
                        <a className='text-xs p-0' href={`mailto:info@doob.com.bd`}>info@doob.com.bd</a>
                        <p className="text-xs">+8801782323423</p>

                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-xl bg-gray-300 font-bold mb-6">SALES INVOICE</h2>

                {/* Invoice Info */}
                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-sm font-semibold">Billing Address</p>
                        <p className="text-sm">{invoiceData?.address_billing?.first_name}</p>
                        <p className="text-sm"> {invoiceData?.address_billing?.address5} </p>
                        <p className="text-sm">{invoiceData?.address_billing?.country}</p>
                        <p className="text-sm">{invoiceData?.address_billing?.phone}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">Invoice No.: {invoiceData?.order_id}</p>
                        <p className="text-sm">Invoice Date: {parseDate().toLocaleString()}</p>
                        <p className="text-sm">Order Number: {invoiceData?.order_id}</p>
                        <p className="text-sm">Order Date: {parseDate(invoiceData?.created_at).toLocaleString()}</p>
                    </div>
                </div>

                {/* Type of Supply */}
                {invoiceData?.payment_method && <div className="mb-4">
                    <p className="text-sm font-semibold">Type of Supply: <span className="font-normal">{invoiceData?.payment_method}</span></p>
                </div>}

                {/* Table */}
                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-sm">S/N</th>
                            <th className="border border-gray-300 p-2 text-sm">Photo </th>
                            <th className="border border-gray-300 p-2 text-sm">Item </th>
                            <th className="border border-gray-300 p-2 text-sm">Item SKU</th>
                            <th className="border border-gray-300 p-2 text-sm">Qty</th>

                            <th className="border border-gray-300 p-2 text-sm">Total Price</th>
                        </tr>
                    </thead>
                    {<tbody>
                        {invoiceData.items.map((product, idx) => <tr key={idx} >
                            <td className="border border-gray-300 p-2 text-sm">{idx + 1}</td>
                            {console.log(product)}
                            <td className="border border-gray-300 p-2 text-sm"><img src={product?.product_main_image} alt="" className="w-[100px] h-[80px] rounded border" /></td>
                            <td className="border border-gray-300 p-2 text-sm">{product.name}</td>
                            <td className="border border-gray-300 p-2 text-sm">{product?.shop_sku}</td>
                            <td className="border border-gray-300 p-2 text-sm">{product.items_count ?? 1}</td>
                            <td className="border border-gray-300 p-2 text-sm">{product.item_price}</td>
                        </tr>)}
                    </tbody>}
                </table>

                {/* Total */}
                <div className="text-right mb-4">
                    <p className="text-sm">Total Unit Price*: ৳{invoiceData?.price}</p>
                    <p className="text-sm">Total Delivery Fee*: ৳{invoiceData?.shipping_fee}</p>
                    <p className="text-sm font-semibold">Total: Rs {parseInt(invoiceData?.price) + parseInt(invoiceData?.shipping_fee)}</p>
                </div>

                {/* Notes */}
                <p className="text-xs text-gray-500 mb-4">
                    *Total charges for this shipment include prepaid custom duties and other taxes as applicable for the merchandise to be delivered to the address in the country specified by the customer.
                </p>

                <p className="text-xs text-gray-500 text-center mt-4">** This is a computer generated copy. No signature is required**</p>
            </div>
        </div>
    );
};

export default SellerInvoiceDaraz;