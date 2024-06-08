import React, { useState, useEffect } from 'react';
import { Product } from '../../types/types';
import useFetchProducts from '../../hooks/useFetchProducts';
import useFetchCategories from '../../hooks/useFetchCategories';
import ProductsSearch from '../ProductsSearch/ProductsSearch';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';

const Products: React.FC = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const { products, loading, error } = useFetchProducts();
    const { categories } = useFetchCategories();

    useEffect(() => {
        setProductsList(products);
    }, [products]);

    const filterProducts = (category: string, searchTerm: string) => {
        const filteredProducts = products.filter(product => {
            return (
                (category === '' || product?.category === category) &&
                (searchTerm === '' || product?.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
        setProductsList(filteredProducts);
    };

    return (
        <>
            <ProductsSearch categories={categories} filterProducts={filterProducts} />
            {productsList?.length ? <div className="grid mmd:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
                {productsList.map((product: Product) => (

                    <ProductItem key={product?.id} product={product} />

                ))}
            </div>
                : <div className={`w-full text-center sm:h-screen mt-8 ${loading ? 'hidden' : ''}`}>
                    <i className='sicon-page-search p-1 text-3xl text-secondary mr-2'></i>
                    <span className='text-secondary-dark align-super'>No Products Found!</span>
                </div>}
            {loading && <div className='sm:h-screen flex justify-center'><Loader /></div>}
        </>
    );
}

export default Products;