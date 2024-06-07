import React, { useState, useEffect } from 'react';
import { Product } from '../../types/types';
import useFetchProducts from '../../hooks/useFetchProducts';
import useFetchCategories from '../../hooks/useFetchCategories';
import ProductsSearch from '../products-search';
import ProductItem from '../product-item';
import Loader from '../loader';

const Products: React.FC = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const { products, loading, error } = useFetchProducts();
    const { categories } = useFetchCategories();

    useEffect(() => {
        setProductsList(products);
    }, [products]);

    const filterProducts = (type: string, value: string) => {
        console.log("type", type)
        console.log("value", value)
        
        // setProductsList()
    }

    return (
        <>
            <ProductsSearch categories={categories} filterProducts={filterProducts} />
            <div className="grid mmd:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
                {productsList?.length ? productsList.map((product: Product) => (
                    <ProductItem key={product.id} product={product} />
                ))
                    : <p>No Products To Display</p>}
            </div>
            {loading && <div className='sm:h-screen flex justify-center'><Loader /></div>}
        </>
    );
}

export default Products;