import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import LoaderData from '../../../../Common/LoaderData';

const SelectInvoiceCard = ({ invoiceData, id, shopInfo }) => {

    const {
        data: darazInvoiceData = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: [`invoiceDarazOrder_${id}`],
        queryFn: async () => {
            if (shopInfo) {
                const res = await fetch(
                    `https://doob.dev/api/v1/seller/daraz-single-order?id=${shopInfo?._id}&orderId=${id}`
                );
                const data = await res.json();
                return data.data;
            }
        },
    });


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
                        src={shopInfo?.logo} // Replace with actual logo URL
                        alt={shopInfo?.shopName}
                        className="h-10"
                    />
                    <div className="text-right">
                        <p className="text-xs capitalize font-semibold">{shopInfo.shopName}</p>
                        <p className="text-xs capitalize">{shopInfo.address}</p>
                        <a className='text-xs p-0' href={`mailto:${shopInfo?.shopEmail}`}>{shopInfo?.shopEmail}</a>
                        <p className="text-xs">0{shopInfo?.shopNumber}</p>

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
                            <th className="border border-gray-300 p-2 text-sm">Photo</th>
                            <th className="border border-gray-300 p-2 text-sm">Item Name</th>
                            <th className="border border-gray-300 p-2 text-sm">Item SKU</th>
                            <th className="border border-gray-300 p-2 text-sm">Qty</th>

                            <th className="border border-gray-300 p-2 text-sm">Total Price</th>
                        </tr>
                    </thead>
                    {isLoading ? <LoaderData /> : <tbody>
                        {darazInvoiceData.map((product, idx) => <tr key={idx} >
                            <td className="border border-gray-300 p-2 text-sm">{idx + 1}</td>
                            {console.log(product)}
                            <td className="border border-gray-300 p-2 text-sm"><img width="100px" src={product.product_main_image} alt="" srcset="" /></td>
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

export default SelectInvoiceCard;