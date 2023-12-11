import React from 'react';
import ShopProductHero from './ProductHero/ShopProductHero';

import UpComingProducts from '../../../Home/Product/UpComingProducts/UpComingProducts';
import ProductGallery from '../../../Home/Product/ProductGallery/ProductGallery';
import ForYouProducts from '../../../Home/Product/ForYouProducts/ForYouProducts';
import Services from '../../../Home/Product/Services/Services';
import ShopProductCategory from './ShopProductCategory/ShopProductCategory';
import ShopNewProduct from './NewProduct/ShopNewProduct';
import ShopFeature from './Feature/ShopFeature';

const Home = () => {
    return (
        <div className="bg-gray-100">
            <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <ShopProductHero />
                <ShopProductCategory />
                <ShopNewProduct />
                <UpComingProducts />
                <ShopFeature />
                <ForYouProducts />
                <Services />
            </div>
        </div>
    );
};

export default Home;