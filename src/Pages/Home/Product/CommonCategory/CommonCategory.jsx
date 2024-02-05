import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

export default function CommonCategory() {
    const products = useLoaderData();
    const { shopInfo } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);
    const [filteredData, setFilteredData] = useState(products?.data);
    const shopId = idMatch ? idMatch[1] : null;
    const [minPrice, setMinPrice] = useState(false);
    const [maxPrice, setMaxPrice] = useState(false);
    const [checkedBrands, setCheckedBrands] = useState([]);
    const [brands, setBrands] = useState([])


    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/brand/${shopInfo?.shopId}`);
                const data = await res.json();
                // Update brands state
                setBrands(data);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            }
        };

        fetchBrands();
    }, [shopInfo?.shopId]);

    // Handle checkbox change
    const handleCheckboxChange = (brandId) => {
        if (checkedBrands.includes(brandId)) {
            setCheckedBrands(checkedBrands.filter(id => id !== brandId));
        } else {
            setCheckedBrands([...checkedBrands, brandId]);
        }
    };

    // Apply filters
    useEffect(() => {
        const applyFilters = () => {
            let filteredProducts = products?.data || [];

            if (checkedBrands.length > 0) {
                filteredProducts = filteredProducts.filter(product => checkedBrands.includes(product.brandName));
            }

            if (minPrice && !maxPrice) {
                filteredProducts = filteredProducts.filter(product => parseInt(product.price) >= minPrice);
            } else if (!minPrice && maxPrice) {
                filteredProducts = filteredProducts.filter(product => parseInt(product.price) <= maxPrice);
            } else if (minPrice && maxPrice) {
                filteredProducts = filteredProducts.filter(product => {
                    const productPrice = parseInt(product.price);
                    return productPrice >= minPrice && productPrice <= maxPrice;
                });
            }

            setFilteredData(filteredProducts);
        };

        applyFilters();
    }, [products, checkedBrands, minPrice, maxPrice]);

    console.log(filteredData, 'filtered');
    return (
        <section className="text-gray-600 body-font">
            <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div>

                </div>
                <div >
                    <div className='flex md:flex-row flex-col w-full justify-between gap-8 '>
                        <div className='md:w-96 flex flex-col gap-2'>
                            <div className="space-y-2">
                                <details
                                    className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                    >
                                        <span className="text-sm font-medium"> Category </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            <li>
                                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            <div className="space-y-2">
                                <details
                                    className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                    >
                                        <span className="text-sm font-medium"> Brands </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">


                                            {brands?.map(brand => <li key={brand._id}>
                                                <label htmlFor={`brandCheckbox-${brand._id}`} className="inline-flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`brandCheckbox-${brand._id}`}
                                                        className="h-5 w-5 rounded border-gray-300"
                                                        onChange={() => handleCheckboxChange(brand.name)}
                                                        checked={checkedBrands.includes(brand?.name)} />
                                                    <span className="text-sm font-medium text-gray-700">{brand?.name}</span>
                                                </label>
                                            </li>)}
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            <div className="space-y-2">

                                <details
                                    className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                    >
                                        <span className="text-sm font-medium"> Features </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            <li>
                                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            <div className="space-y-2">
                                <details
                                    className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                    >
                                        <span className="text-sm font-medium"> Price </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">


                                        <div className="border-t border-gray-200 p-4">
                                            <div className="flex justify-between gap-4">
                                                <label htmlFor="FilterPriceFrom" className="flex items-center gap-2  ring-1 ring-gray-500 rounded px-2 py-1">
                                                    <span className="text-xl font-semibold text-gray-600">৳</span>
                                                    <input
                                                        onChange={(e) => setMinPrice(e.target.value)}
                                                        value={minPrice}
                                                        type="number"
                                                        id="FilterPriceFrom"
                                                        placeholder="From"
                                                        className="w-full"
                                                    />
                                                </label>

                                                <label htmlFor="FilterPriceTo" className="flex items-center gap-2  ring-1 ring-gray-500 rounded px-2 py-1">
                                                    <span className="text-xl font-semibold text-gray-600">৳</span>
                                                    <input
                                                        onChange={(e) => setMaxPrice(e.target.value)}
                                                        value={maxPrice}
                                                        type="number"
                                                        id="FilterPriceTo"
                                                        placeholder="To"
                                                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                    />
                                                </label>

                                                <button onClick={() => {
                                                    setMaxPrice(false);
                                                    setMinPrice(false)
                                                }} type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div className="space-y-2">

                                <details
                                    className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                    >
                                        <span className="text-sm font-medium"> Condition </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            <li>
                                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            <div className="space-y-2">

                                <details
                                    className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                    >
                                        <span className="text-sm font-medium"> Rating </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            <li>
                                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            <div className="space-y-2">

                                <details
                                    className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                    >
                                        <span className="text-sm font-medium"> Manufacturer </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            <li>
                                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 w-full ">
                            {
                                [1, 2, 3, 4, 5]?.map((product) => (
                                    <div className="group  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white duration-150 hover:shadow-md">
                                        <a
                                            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                                            href="#"
                                        >
                                            <img
                                                className="peer absolute top-0 right-0 h-full w-full object-cover"
                                                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
                                                alt="product image"
                                            />
                                            <img
                                                className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                                                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                                alt="product image"
                                            />
                                            {/* <div class="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
<div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
<div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
<div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
    </div> */}
                                            <svg
                                                className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                role="img"
                                                width="1em"
                                                height="1em"
                                                preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 32 32"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                                                />
                                            </svg>
                                            {/* <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
                                        </a>
                                        <div className="mt-4 px-5 pb-5">
                                            <h5 className="text-xl tracking-tight text-slate-900">
                                                Nike Air MX Super 2500 - Red
                                            </h5>
                                            <div className="mt-2 mb-5 flex items-center justify-between">
                                                <p>
                                                    <span className="text-2xl font-bold text-slate-900">$449</span>
                                                    <span className="text-sm text-slate-900 line-through">$699</span>
                                                </p>
                                            </div>
                                            <Link to={`65b7a881f5ea829b1e903574`}
                                                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-2 h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>

                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}