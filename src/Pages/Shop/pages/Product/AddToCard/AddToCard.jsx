import { useState } from 'react';
import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
 import { useLoaderData } from 'react-router-dom';

const AddToCard = () => {
    const { shopUser, shop_id } = useContext(ShopAuthProvider);

    const productData = useLoaderData()
    const [cartProducts, setCartProducts] = useState(productData.data);


  


    const [selectAll, setSelectAll] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setAllProducts([...cartProducts]);
        } else {
            setAllProducts([]);
        }
    };

    const selectOne = (newProduct) => {
        setSelectAll(false)
        setAllProducts((prevProducts) => {
            const isProductSelected = prevProducts.some((product) => product._id === newProduct._id);

            if (isProductSelected) {

                return prevProducts.filter((product) => product._id !== newProduct._id);
            } else {

                return [...prevProducts, newProduct];
            }
        });
    };

    const calculateSubtotal = () => {
        return allProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shippingFee = 300;
        const shippingFeeDiscount = 0;
        return subtotal + shippingFee - shippingFeeDiscount;
    };


    const handleDecrease = (productId) => {
        setAllProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
        setCartProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    const handleIncrease = (productId) => {
        setAllProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
        setCartProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

    const handleManualInput = (productId, quantity) => {
        if (!isNaN(quantity) && quantity > 0) {
            setAllProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === productId ? { ...product, quantity: Math.max(quantity, 1) } : product
                )
            );
            setCartProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === productId ? { ...product, quantity: Math.max(quantity, 1) } : product
                )
            );
        }
    };

    const handleRemove = (productId) => {
        setCartProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
        );
        setAllProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
        );
        fetch(`https://evidently-active-magpie.ngrok-free.app/api/v1/shop/user/add-to-cart?productId=${productId}&token=${shopUser._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420", }

        }).then((res) => res.json()).then((data) => {
            console.log(data);
        })
    };

    const [promoPrice, setPromoPrice] = useState(false)
    const [promoDiscount, setPromoDiscount] = useState(false)
    const [process, setProcess] = useState(false)


    const checkPromoCode = (e) => {
        setProcess(true)
        e.preventDefault();
        const price = calculateTotal()
        const code = e.target.promoCode.value
        const shopId = shop_id.shop_id
        console.log(price);
        fetch(`https://evidently-active-magpie.ngrok-free.app/api/v1/shop/user/promocode?shopId=${shopId}&code=${code}&token=${shopUser._id}&price=${price}`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            setProcess(false)
            if (data.status) {
                setPromoPrice(data.promoPrice)
                setPromoDiscount(data.promoDiscount)
            }
        })

    }

    console.log(allProducts);
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10'>
            <div className='md:flex gap-4 w-full justify-between'>
                <div className=" rounded max-w-4xl p-6  sm:p-10 bg-gray-200 text-gray-900 w-full">
                    <div className='flex flex-col space-y-4'>
                        <h2 className="text-xl font-semibold">Your cart</h2>
                        <div className='flex gap-4 items-center'>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                            />
                            <span>Select All </span>
                        </div>
                        <ul className="flex flex-col divide-y dark:divide-gray-700">
                            {cartProducts.map((product) => (
                                // eslint-disable-next-line react/jsx-key
                                <li className="flex gap-4 flex-col py-6 sm:flex-row sm:justify-between">
                                    <input
                                        type="checkbox"
                                        checked={selectAll || allProducts.some((p) => p._id === product._id)}
                                        onChange={() => selectOne(product)}
                                    />
                                    <div className="flex w-full space-x-2 sm:space-x-4">
                                        <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={product.img} alt="Polaroid camera" />
                                        <div className="flex flex-col justify-between w-full pb-4">
                                            <div className="flex justify-between w-full pb-2 space-x-2">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{product.name}</h3>
                                                    <div>
                                                        <label htmlFor={`Quantity-${product._id}`} className="sr-only">
                                                            Quantity
                                                        </label>
                                                        <div className="flex products-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDecrease(product._id)}
                                                                className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                id={`Quantity-${product._id}`}
                                                                value={product.quantity}
                                                                onChange={(e) => handleManualInput(product._id, parseInt(e.target.value, 10))}
                                                                className="py-1 w-16 rounded border px-4 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleIncrease(product._id)}
                                                                className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75 "
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold"><span className='kalpurush' >৳</span>{product.price}</p>
                                                    <p className="text-sm line-through dark:text-gray-600"><span className='kalpurush' >৳</span>{product.regular_price}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-sm divide-x">
                                                <button type="button" className="flex items-center px-2 py-1 space-x-1" onClick={() => handleRemove(product._id)}>
                                                    <MdDelete className="w-5 h-5 " />
                                                    <span>Remove</span>
                                                </button>
                                                <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                                    </svg>
                                                    <span>Add to favorites</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
                <div className='bg-gray-200 lg:w-96 mt-8 lg:mt-0 min-h-[350px] max-h-[380px] rounded p-8'>
                    <div className="space-y-1 my-4">
                        <h2 className="text-xl font-semibold ">Order Summary</h2>
                        <div className='flex justify-between '>
                            <p className="text-gray-700">Subtotal ({allProducts.length} products) </p>
                            <p className='kalpurush'>৳ <span className='font-sans'>{calculateSubtotal()}</span></p>
                        </div>
                        <div className='flex justify-between '>
                            <p className="text-gray-700">Shipping Fee </p>
                            <p className='kalpurush'>৳ <span className='font-sans'>300</span></p>
                        </div>
                        <div className='flex justify-between '>
                            <p className="text-gray-700 ">Shipping Fee Discount </p>
                            <p className='kalpurush'>৳ <span className='font-sans'>0</span></p>
                        </div>
                        {promoDiscount && <div className='flex justify-between '>
                            <p className="text-gray-700 ">Promo Discount </p>
                            <p className='kalpurush'>৳ <span className='font-sans'>{promoDiscount}</span></p>
                        </div>}
                    </div>
                    {!promoDiscount && <form onSubmit={checkPromoCode} className="products-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                        <input
                            name='promoCode'
                            type="text"
                            placeholder="Enter your promo code"
                            className="text-gray-500 border outline-none px-4 py-2 rounded w-full sm:w-72"
                        />
                        <button type='submit' className="px-4 py-2 bg-gray-800 rounded text-white">
                            {process ? "Processing.." : "Apply"}
                        </button>
                    </form>}
                    <div className='flex justify-between py-2'>
                        <p className="text-gray-700 ">Total </p>
                        <p className='kalpurush'>৳ <span className='font-sans'>{promoPrice ? promoPrice : calculateTotal()}</span></p>
                    </div>
                    <div className=" w-full">
                        <button type="button" className="px-6 py-2 rounded w-full bg-gray-800 text-white">Process Checkout ({allProducts.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default AddToCard;


