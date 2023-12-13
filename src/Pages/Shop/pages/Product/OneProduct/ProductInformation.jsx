import React, { useContext, useState } from 'react';
import { FaBasketShopping, FaCircle, FaMessage } from 'react-icons/fa6';
import { MdDone } from 'react-icons/md';
import ProductDescription from '../../../../Home/Product/ProductDetails/ProductDescription';
import ProductReviews from '../../../../Home/Product/ProductDetails/ProductReviews';
import TrendingProducts from '../../../../Home/Product/ProductDetails/TrendingProducts';
import { Link, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MetaHelmet from '../../../../../Helmate/Helmate';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';

const ProductInformation = () => {


    const product = useLoaderData()
    console.log(product.data, 'productInfo');
    const [selectedImage, setSelectedImage] = useState(product.data.featuredImage.src);
    const [quantity, setQuantity] = useState(1);

    const { shop_id } = useContext(ShopAuthProvider)

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleManualInput = (e) => {
        const inputQuantity = parseInt(e.target.value, 10);

        if (!isNaN(inputQuantity) && inputQuantity > 0) {
            setQuantity(inputQuantity);
        }
    };

    const convertedRating = (2 / 10) * 5;

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    return (
        <section>
            <MetaHelmet title={product.data.metaTitle} description={product.data.metaDescription} image={product.data.MetaImage} />
            <div className="py-4">
                {/* Breadcrumbs */}
                <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-12">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Link to={`/shop/${shopId}`} className="hover:underline hover:text-gray-600">
                            Home
                        </Link>
                        {product.data.categories.filter((category) => category && category.name).map((category, index) => [
                            <span key={`arrow-${index}`}>
                                <svg
                                    className="h-5 w-5 leading-none text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </span>,
                            <Link
                                key={`category-${index}`}
                                to={`/shop/${shopId}/categories/${shop_id.shop_id}/${category.name}`}
                                className="hover:underline hover:text-gray-600"
                            >
                                {category.name}
                            </Link>,
                        ])}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-12 mt-6 ">
                    <div className="flex flex-col md:flex-row -mx-4 border rounded border-gray-300 py-4">
                        <div className="md:flex-1 px-4">
                            <div>
                                <div className="h-64  md:h-[22rem] rounded-lg bg-gray-100 mb-4">
                                    <div className="h-64 md:h-full rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                        <img
                                            className="w-94 h-full"
                                            src={selectedImage}
                                            srcSet={selectedImage}
                                            alt="Selected Image"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 -m-4 text-white">
                                    {product.data.images.map((imageUrl, index) => (
                                        <div key={index} className="p-4 w-full md:w-11/12 rounded">
                                            <Link
                                                className="block relative h-16 rounded overflow-hidden border"
                                                onClick={() => handleImageClick(imageUrl.src)}
                                            >
                                                <img
                                                    alt={`ecommerce${index + 1}`}
                                                    className="object-cover cursor-pointer block w-full h-full p-2 "
                                                    src={imageUrl.src}
                                                    srcSet={imageUrl.src}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* <div className="md:flex-1 px-4 ">
                            <div className="flex items-center">
                                <MdDone className="text-green-400" />
                                <p className="text-sm font-medium text-green-400 ml-1">
                                    In Stock
                                </p>
                            </div>
                            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                {product.data.name}
                            </h2>
                            <div>
                                <div className="flex items-center">
                                    <div className="flex">

                                        <span className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    className="w-4 h-4"
                                                    key={star}
                                                    style={{
                                                        color: star <= convertedRating ? 'gold' : 'gray',
                                                    }}
                                                >
                                                    <svg
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        className="w-4 h-4 "
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </span>
                                            ))}
                                            <span className="text-gray-600 ml-2">9.3</span>

                                        </span>

                                    </div>
                                    <div>
                                        <FaCircle className="text-[#DBDBDB] text-[8px] mx-2 md:mx-4" />
                                    </div>
                                    <div className="flex items-center">
                                        <FaMessage className="text-[#DBDBDB] mr-2 text-[15px]" />
                                        <p>32 reviews</p>
                                    </div>
                                    <div>
                                        <FaCircle className="text-[#DBDBDB] text-[8px] mx-2 md:mx-4" />
                                    </div>
                                    <div className="flex items-center">
                                        <FaBasketShopping className="text-[#DBDBDB] mr-2 text-[16px]" />
                                        <p>154 Sold</p>
                                    </div>
                                </div>

                            </div>

                            <div className="flex py-4 space-x-4">
                                <div>
                                    <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={handleDecrease}
                                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                        >
                                            -
                                        </button>

                                        <input
                                            type="number"
                                            id="Quantity"
                                            value={quantity}
                                            onChange={handleManualInput}
                                            className="h-10 w-24 rounded border px-4 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                        />

                                        <button
                                            type="button"
                                            onClick={handleIncrease}
                                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75 "
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="h-10 px-6 py-2 font-semibold rounded bg-gray-950 hover:bg-gray-800 text-white"
                                >
                                    Add to card
                                </button>
                                <button
                                    type="button"
                                    className="h-10 px-6 py-2 font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                                >
                                    By Now
                                </button>
                            </div>
                        </div> */}
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 px-4">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {product.data.brandName}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {product.data.name}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <div
                                className="mb-2  "
                                dangerouslySetInnerHTML={{
                                    __html: product.data.shortDescription,
                                }}
                            />
                            {/* <p className="leading-relaxed">
                                Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha
                                taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw
                                denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub
                                blue bottle austin listicle pour-over, neutra jean shorts keytar banjo
                                tattooed umami cardigan.
                            </p> */}
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    <span className='kalpurush'>৳</span>{product.data.price}
                                </span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Buy Now
                                </button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
                <div className="border p-6 rounded">
                    <ProductDescription description={product.data.description} />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
                <div className="border p-6 rounded">
                    <ProductReviews />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
                <div className="border p-6 rounded">
                    <TrendingProducts />
                </div>
            </div>
        </section>
    );
};

export default ProductInformation;