import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const CategoryByProduct = () => {
    const products = useLoaderData()

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    const [availabilityOpen, setAvailabilityOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const toggleAvailability = () => {
        setAvailabilityOpen(!availabilityOpen);
    };

    const togglePrice = () => {
        setPriceOpen(!priceOpen);
    };

    const handlePriceFromChange = (e) => {
        setPriceFrom(e.target.value);
    };

    const handlePriceToChange = (e) => {
        setPriceTo(e.target.value);
    };

    const resetFilters = () => {
        // Add logic to reset filters based on your requirements
        setPriceFrom('');
        setPriceTo('');
        // Add other filter reset logic as needed
    };




    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <div >
                        <div className='grid '>
                            <div className='grid-cols-1'>
                                <div className="space-y-2">
                                    {/* Availability */}
                                    <details
                                        className={`overflow-hidden rounded border border-gray-300 ${!availabilityOpen && 'group-open:-rotate-180'
                                            }`}
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                            onClick={toggleAvailability}
                                        >
                                            <span className="text-sm font-medium"> Availability </span>
                                            <span className="transition">{availabilityOpen ? '▼' : '►'}</span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>
                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={resetFilters}>
                                                    Reset
                                                </button>
                                            </header>

                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                {/* Add logic to handle checkbox changes based on your requirements */}
                                                {/* Example checkbox */}
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />
                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>
                                                {/* Add other checkboxes as needed */}
                                            </ul>
                                        </div>
                                    </details>

                                    {/* Price */}
                                    <details
                                        className={`overflow-hidden rounded border border-gray-300 ${!priceOpen && 'group-open:-rotate-180'
                                            }`}
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                                            onClick={togglePrice}
                                        >
                                            <span className="text-sm font-medium"> Price </span>
                                            <span className="transition">{priceOpen ? '▼' : '►'}</span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> The highest price is $600 </span>
                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={resetFilters}>
                                                    Reset
                                                </button>
                                            </header>

                                            <div className="border-t border-gray-200 p-4">
                                                <div className="flex justify-between gap-4">
                                                    {/* Price range input */}
                                                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">$</span>
                                                        <input
                                                            type="number"
                                                            id="FilterPriceFrom"
                                                            placeholder="From"
                                                            value={priceFrom}
                                                            onChange={handlePriceFromChange}
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>

                                                    <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">$</span>
                                                        <input
                                                            type="number"
                                                            id="FilterPriceTo"
                                                            placeholder="To"
                                                            value={priceTo}
                                                            onChange={handlePriceToChange}
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>
                            <div className="flex grid-cols-7 flex-wrap py-20 -m-4">
                                {
                                    products?.data?.map((product) => (
                                        <Link to={`/shop/${shopId}/product/${product?._id}`} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                            <a className="block relative h-48 rounded overflow-hidden">
                                                <img
                                                    alt="ecommerce"
                                                    className="object-cover object-center w-full h-full block"
                                                    src={product.featuredImage.src}
                                                />
                                            </a>
                                            <div className="mt-4">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                                    {product.brandName}
                                                </h3>
                                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                                    {product.name}
                                                </h2>
                                                <p className="mt-1"><span className='kalpurush'>৳</span>{product.price}</p>
                                            </div>
                                        </Link>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoryByProduct;