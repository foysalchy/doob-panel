import React from "react";
import ProductHero from "./ProductHero/ProductHero";
import ProductCatagory from "./ProductCatagory/ProductCatagory";
import NewProducts from "./NewProducts/NewProducts";
import UpComingProducts from "./UpComingProducts/UpComingProducts";
import ForYouProducts from "./ForYouProducts/ForYouProducts";
import ProductGallery from "./ProductGallery/ProductGallery";
import Services from "./Services/Services";
import Home from "../../Shop/pages/Home/Home";
import TopDiscountProduct from "./TopDiscountProduct/TopDiscountProduct";
import TopSellingProduct from "./TopSellingProduct/TopSellingProduct";
import MetaHelmet from "../../../Helmate/Helmate";

const Product = () => {
      return (
            <div className="bg-gray-100">
                  <MetaHelmet title="Product" description={' Here you have get all product in our  store  '} />
                  <div className="px-2 md:py-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <ProductHero />
                        <ProductCatagory />
                        <NewProducts />
                        <ProductGallery />
                        <TopDiscountProduct />
                        <TopSellingProduct />
                        <UpComingProducts />
                     
                        <ForYouProducts />
                        <Services />
                  </div>
            </div>
      );
};

export default Product;
