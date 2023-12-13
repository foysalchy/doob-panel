import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const CategoryByProduct = () => {
    const products = useLoaderData()

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    console.log('Shop ID:', shopId);
    console.log(products);
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <div className="flex flex-wrap py-20 -m-4">
                        {
                            products.data.map((product) => (
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
            </section>

        </div>
    );
};

export default CategoryByProduct;