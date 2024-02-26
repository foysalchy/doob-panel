import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint
import { AuthContext } from "../../../AuthProvider/UserProvider";

const SellerOrderInvoice = ({ setOn, products }) => {
    const { user } = useContext(AuthContext)
    console.log(user, 'products');

    const subtotal = products.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 bg-white h-screen fixed">
            <div className="flex items-center gap-3">
                <button onClick={() => setOn(null)} className="bg-red-500 text-white rounded px-6 py-2">Cancel</button>
                <button onClick={handlePrint} className="bg-blue-500 text-white rounded px-6 py-2">Print</button>
            </div>
            <div ref={componentRef}  className="p-6 ">
                <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl m-12 md:px-24 lg:px-8 lg:py-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <h1 className="text-3xl font-bold">Doob</h1>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">INVOICE #</p>
                            <p>{user?._id}</p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold uppercase">{user?.name}</h2>
                        <p className="text-gray-400">{user?.email}</p>
                    </div>

                    <div className="overflow-hidden border border-gray-700 md:rounded-lg">
                        <table className="divide-y w-full divide-gray-700">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-sm font-normal text-left">
                                        <button className="flex items-center gap-x-2">
                                            <span>Photo</span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-sm font-normal text-left">
                                        <div className="flex items-center gap-x-3">
                                            <span>Customer Name</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-sm font-normal text-left">
                                        Order Quantity
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-sm font-normal text-left">
                                        Order Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products?.map(itm =>
                                    <tr key={itm?._id} className="bg-gray-50 mb-2">
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3 ml-7">
                                                <div className="flex items-center justify-center gap-x-2 relative">
                                                    <div className="bg-red-400 w-10 h-10 overflow-hidden rounded-full">
                                                        <img
                                                            className="object-cover w-full h-full hover:cursor-pointer"
                                                            src={itm?.product.image}
                                                            alt={itm?.product.name}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h2>{itm?.product.name}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            {itm.customerName}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            {itm.quantity}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            {itm.price}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <div className="text-right">
                            <p className="font-bold">SUB TOTAL</p>
                            <p className="font-bold">TAX</p>
                            <p className="font-bold">TOTAL</p>
                        </div>
                        <div className="text-right">
                            <p>${subtotal}</p>
                            <p>${tax}</p>
                            <p>${total}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-bold">TERMS & CONDITIONS:</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default SellerOrderInvoice;