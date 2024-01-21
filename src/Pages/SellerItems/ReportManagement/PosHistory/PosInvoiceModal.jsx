import React from 'react';

const PosInvoiceModal = ({ setOpenInvoice, openInvoice, invoice }) => {
    const style = {
        overlay: 'fixed top-0 left-0 right-0 bottom-0 w-full bg-black h-screen overflow-y-auto bg-white p-2 flex items-center justify-center z-[2000]',
        cart: 'bg-white',
        title: 'text-3xl font-semibold text-center pb-4',
        close: 'text-2xl p-2 absolute right-3 top-2'
    }
    console.log(invoice.items);
    return (
        <div className={style.overlay}>
            <div className="-mx-4 -my-2 overflow-x-auto ">
                <div className="inline-block  py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden max-w-3xl overflow-x-auto  border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <h2 className={style?.title}>Products</h2>
                        <button onClick={() => setOpenInvoice(!openInvoice)} className={style.close}>x</button>
                        <table className=" divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                        Photo
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                        Quantity
                                    </th>  <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                        SKU
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {invoice.items.map(invoice =>
                                    <tr key={invoice?._id}>

                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                            <div onClick={() => setOpenInvoice(itm?._id)} className="inline-flex items-center gap-x-3 cursor-pointer text-blue-500">
                                                <img src={invoice.img} alt="" className="" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-wrap">
                                            {invoice.name}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="text-emerald-500">
                                                <h2 className="text-sm font-normal">
                                                    {invoice.price}
                                                </h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <div>
                                                    <h2 className="text-sm  text-gray-800 dark:text-white ">
                                                        {invoice.quantity}
                                                    </h2>

                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <h2 className="text-sm  text-gray-800 dark:text-white ">
                                                {invoice.sku}
                                            </h2>

                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosInvoiceModal;