import React from 'react';
import ProductHero from './ProductHero/ProductHero';
import ProductCatagory from './ProductCatagory/ProductCatagory';

const Product = () => {
    return (
        <div className='bg-gray-100'>

            <div className='px-4  py-4 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
                <ProductHero />
                <ProductCatagory />
            </div>
        </div>
    );
};

export default Product;