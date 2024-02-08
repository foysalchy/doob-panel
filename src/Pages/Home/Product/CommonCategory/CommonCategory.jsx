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
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filterValue, setFilterValue] = useState({
        category: [{ key: 'Mobiles & Tablets', value: 'Mobiles & Tablets' }, { key: 'outStock', value: 'Out Stock' }],
        brand: ["inStock", "outOfStock"],
        minPrice: 0,
        maxPrice: 12000

    })

    const [selectedValues, setSelectedValues] = useState([]);

    const handleCheckboxChange = (key) => {
        const index = selectedValues.indexOf(key);

        if (index === -1) {
            setSelectedValues([...selectedValues, key]);
        } else {
            const updatedValues = [...selectedValues];
            updatedValues.splice(index, 1);
            setSelectedValues(updatedValues);
        }
    };

    useEffect(() => {
        categoryFilter(selectedValues)
        console.log("Selected values:", selectedValues);
    }, [selectedValues]);

    // console.log(loadAllProducts);
    const categoryFilter = (categories) => {
       
        console.log(categories, 'filtered');
    }

    console.log(products, 'products');

    return (
        <section className="text-gray-600 body-font">
            <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="pb-4 border-b flex justify-between items-center mt-3">
                    <h1 className="pt-2 font-semibold text-xl ">Category Name</h1>
                    <input type="text" className="border py-2 px-2 rounded-md w-[300px]" placeholder="Search..." />
                </div><br />
                <div className="grid gap-3 grid-cols-4">
                    <div className="">
                        <div className=' flex flex-col gap-2'>
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
                                            <span className="text-sm text-gray-700"> {selectedValues.length} Selected </span>

                                            {/* <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button> */}
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            {
                                                filterValue.category.map(itm => <li>
                                                    <label onChange={() => handleCheckboxChange(itm?.key)} htmlFor={itm?.key} className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id={itm?.key} className="h-5 w-5 rounded border-gray-300" />

                                                        <span className="text-sm font-medium text-gray-700"> {itm?.value} </span>
                                                    </label>
                                                </li>)
                                            }

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
                                            dffd
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
                                                        // onChange={(e) => setMinPrice(e.target.value)}
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
                                                        // onChange={(e) => setMaxPrice(e.target.value)}
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


                        </div>
                    </div>
                    <div className='flex col-span-3 md:flex-row flex-col w-full justify-between gap-8 '>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 w-full ">
                            {
                                products && products?.map((itm) => (
                                    <div key={itm?._id}>
                                        <div className="group  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white duration-150 hover:shadow-md">
                                            <a
                                                className="relative mx-3 mt-3 flex h-40 overflow-hidden rounded-xl"
                                                href="#"
                                            >
                                                <img
                                                    className="peer absolute top-0 right-0 h-full w-full object-cover"
                                                    src={itm?.featuredImage?.src}
                                                    alt="product image"
                                                />
                                                <img
                                                    className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                                                    src={itm?.images[1].src}
                                                    alt="product image"
                                                />
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
                                                <h5 className="text-lg tracking-tight text-slate-900">
                                                    {itm?.name?.slice(0, 18)}...
                                                </h5>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p>
                                                        <span className="text-xl font-bold text-slate-900">${itm?.price}</span>
                                                        <span className="text-sm text-slate-900 line-through">${itm?.regular_price}</span>
                                                    </p>
                                                </div>
                                                <Link to={`/products/${itm._id}`}
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