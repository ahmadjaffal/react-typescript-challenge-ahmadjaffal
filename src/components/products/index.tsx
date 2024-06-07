import React from 'react';
import { Product } from '../../types/types';
import useFetchProducts from '../../hooks/useFetchProducts';
import ProductsSearch from '../products-search';
import ProductItem from '../product-item';
import Loader from '../loader';

const Products: React.FC = () => {
    const { products, loading, error } = useFetchProducts();

    return (
        <>
            <ProductsSearch />
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
                {products?.length ? products.map((product: Product) => (
                    <ProductItem key={product.id} product={product} />
                ))
                    : <p>No Products To Display</p>}
            </div>
            {loading && <Loader />}
        </>
    );
}

export default Products;