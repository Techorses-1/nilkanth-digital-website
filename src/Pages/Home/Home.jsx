import React from 'react'
import "./Home.scss";
import ProductShowcase from './ProductShowcase/ProductShowcase';
import AboutUs from './AboutUs/AboutUs';
import AllScalesBanner from './AllScalesBanner/AllScalesBanner';
import ShopByCategory from './ShopByCategory/ShopByCategory';
import HomeProducts from './HomeProducts/HomeProducts';

const Home = () => {
    return (
        <>
            <ProductShowcase />
            <ShopByCategory/>
            <AboutUs/>
            <HomeProducts/>
            <AllScalesBanner/>
            
        </>
    )
}

export default Home