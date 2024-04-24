import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import CardPayment from './CardPayment';

const CardProduct = () => {
    const { user, shopInfo } = useContext(AuthContext)
    const get_cart_product = localStorage.getItem(`cart-product-${user._id}`);
    const initialCartProduct = JSON.parse(get_cart_product) || []; // Ensure cart_product is initialized as an array
    const [cartProduct, setCartProduct] = useState(initialCartProduct);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        // Update localStorage whenever cartProduct changes
        localStorage.setItem((`cart-product-${user._id}`), JSON.stringify(cartProduct));
    }, [cartProduct]);

    // Function to handle quantity update
    const handleQuantityUpdate = (index, newQuantity) => {
        const updatedCart = [...cartProduct];
        updatedCart[index].product_quantity = newQuantity;
        setCartProduct(updatedCart);
    };

    // Function to handle quantity decrease
    const handleQuantityDecrease = (index) => {
        const updatedCart = [...cartProduct];
        if (updatedCart[index].product_quantity > 1) {
            updatedCart[index].product_quantity--;
            setCartProduct(updatedCart);
        }
    };

    // Function to handle deletion of an item
    const handleDelete = (index) => {
        const updatedCart = [...cartProduct];
        updatedCart.splice(index, 1);
        setCartProduct(updatedCart);
    };

    // Function to handle individual selection of an item
    const handleSelectProduct = (index) => {
        const updatedCart = [...cartProduct];
        updatedCart[index].selected = !updatedCart[index].selected;
        setCartProduct(updatedCart);
    };

    // Function to toggle select all
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedCart = cartProduct.map(product => ({ ...product, selected: !selectAll }));
        setCartProduct(updatedCart);
    };

    // Function to calculate total


    const deliveryFees = {};

    // Calculate total delivery fee
    cartProduct.filter(product => product.selected).forEach(item => {
        const productId = item.product_id;
        const deliveryFee = parseFloat(item.delivery ? item.delivery : 0);

        // If the product ID is not in the deliveryFees object, add it with its delivery fee
        if (!(productId in deliveryFees)) {
            deliveryFees[productId] = deliveryFee;
        }
    });

    // Sum the delivery fees
    const totalDeliveryFee = Object.values(deliveryFees).reduce((acc, curr) => acc + curr, 0);
    const calculateTotal = () => {
        return cartProduct.filter(product => product.selected).reduce((total, product) => total + (parseInt(product.sellingPrice ? product.sellingPrice : product.product_price) * parseInt(product.product_quantity)), 0);
    };


    const [openPayment, setOpenPayment] = useState(false);

    const handleStore = (id, getway, userInfo, product) => {
        if (shopInfo) {
            const data = {
                shopId: shopInfo?.shopId,
                shopName: shopInfo?.shopName,
                shopUid: shopInfo?._id,
                quantity: product.product_quantity,
                sellingPrice: product.product_price,
                getway: getway,
                userInfo,
            };
            console.log(data);
            fetch(
                `https://salenow-v2-backend.vercel.app/api/v1/seller/web-store?id=${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((res) => res.json())
                .then((data) => {

                });
        } else {
            navigate("/sign-in");
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-4">Shopping cart ({cartProduct.length} Items)</h1>
                    <div className="overflow-hidden rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Product
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Price
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cartProduct.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" checked={product.selected} onChange={() => handleSelectProduct(index)} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img
                                                        alt=""
                                                        className="h-10 w-10 rounded"
                                                        height="40"
                                                        src={product.product_image}
                                                        style={{
                                                            aspectRatio: "40/40",
                                                            objectFit: "cover",
                                                        }}
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.product_id}</div>
                                                    <div className="text-sm text-gray-500">{product.product_name.split(' ').slice(0, 8).join(' ')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sellingPrice ? product.sellingPrice : product.product_price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded" onClick={() => handleQuantityDecrease(index)}>-</button>
                                                <span>{product.product_quantity}</span>
                                                <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded" onClick={() => handleQuantityUpdate(index, product.product_quantity + 1)}>+</button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(index)}>
                                                <TrashIcon className="h-6 w-6" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-full lg:w-96">
                    <div className="mb-4 p-4 bg-white rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Apply Coupon</h2>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded shadow-sm"
                                placeholder="Coupon code"
                                type="text"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded shadow">Apply</button>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Total</h2>
                        <div className="flex justify-between mb-2">
                            <span>Total</span>
                            <span>{calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Delivery</span>
                            <span>{totalDeliveryFee}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Discount</span>
                            <span>-৳0</span>
                        </div>
                        <div className="flex justify-between mb-4 font-bold">
                            <span>Subtotal</span>
                            <span>{calculateTotal() + totalDeliveryFee}</span>
                        </div>
                        <button onClick={() => setOpenPayment(cartProduct.filter(product => product.selected))} className="w-full bg-blue-600 text-white px-4 py-2 rounded shadow mb-4">Checkout</button>

                    </div>
                </div>
            </div>
            {
                openPayment && (
                    <CardPayment
                        openPayment={openPayment}
                        setOpenPayment={setOpenPayment}
                        handleStore={handleStore}
                    />
                )
            }
        </div>
    );
};



function CreditCardIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    );
}

function TrashIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}

function ViewIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
            <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
            <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
        </svg>
    );
}

export default CardProduct;