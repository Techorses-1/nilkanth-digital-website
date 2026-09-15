import React from 'react'
import { useEffect } from "react";
import ProductSection from './ProductSection/ProductSection'

const Products = () => {


    useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}, []);

    return (

        <>
            <ProductSection />
        </>
    )
}

export default Products