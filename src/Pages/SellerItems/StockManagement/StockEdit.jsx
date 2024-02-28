import { useState } from "react";
import Swal from "sweetalert2";

const StockEdit = ({ setOn, itm }) => {

    const [status, setStatus] = useState(itm?.status);
    const [newQuantity, setNewQuantity] = useState(itm?.quantity);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...itm,
            quantity: newQuantity
        };

        console.log(data);
        // fetch(`https://backend.doob.com.bd/api/v1/admin/stock-request?id=${itm?._id}&quantity=${newQuantity}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ status }),
        // }).then((res) => res.json()).then((data) => {
        //     Swal.fire(`Seller disable ${status} `, '', 'success');
        //     refetch()
        // })
    };


    return (
        <div className="bg-[#000000ce] w-full h-full fixed top-0 left-0  z-[5000] flex items-center justify-center p-2">
            <button onClick={() => setOn(false)} className="text-white text-2xl absolute top-3 right-5">x</button>
            <div className="">
                <div className="md:w-[550px] w-full h-[260px] rounded-xl bg-gray-100 p-3">
                    <h2 className="pb-5 text-lg font-semibold">Edit</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div >
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                Stock
                            </label>
                            <select
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm bg-white sm:text-sm py-2 px-2 border-gray-300 rounded-md"
                                onChange={(e) => setStatus(e.target.value)}
                                name="status" id="">
                                {/* <option selected value={status}>{status}</option> */}
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                value={newQuantity}
                                onChange={(e) => setNewQuantity(e.target.value)}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm py-2 px-2 border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StockEdit;