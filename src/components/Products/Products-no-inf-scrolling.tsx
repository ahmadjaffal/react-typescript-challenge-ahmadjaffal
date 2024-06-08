import React, { useState, useEffect } from 'react';
import { Product } from '../../types/types';
import useFetchProducts from '../../hooks/useFetchProducts';
import useFetchCategories from '../../hooks/useFetchCategories';
import ProductsSearch from '../ProductsSearch/ProductsSearch';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';

/**
 * Component to display a list of products, with search and filtering capabilities.
 */
const ProductsNoInfScolling: React.FC = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);  // State to hold the list of products to display
    const { products, loading, error } = useFetchProducts();           // Custom hook to fetch products data
    const { categories } = useFetchCategories();                      // Custom hook to fetch categories data

    useEffect(() => {
        setProductsList(products);  // Update productsList state when products data changes
    }, [products]);

    /**
     * Filter products based on category and search term.
     * @param category The category to filter by.
     * @param searchTerm The search term to filter by.
     */
    const filterProducts = (category: string, searchTerm: string) => {
        const filteredProducts = products.filter(product => {
            return (
                (category === '' || product?.category === category) &&
                (searchTerm === '' || product?.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
        setProductsList(filteredProducts);  // Update productsList state with filtered products
    };

    return (
        <>
            {/* ProductsSearch component for filtering products */}
            <ProductsSearch categories={categories} filterProducts={filterProducts} />
            {/* Conditional rendering based on productsList length */}
            {productsList?.length ? (
                <div className="grid mmd:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
                    {/* Render ProductItem for each product in productsList */}
                    {productsList.map((product: Product) => (
                        <ProductItem key={product?.id} product={product} />
                    ))}
                </div>
            ) : (
                // Render a message when no products are found
                <div className={`w-full text-center sm:h-screen mt-8 ${loading ? 'hidden' : ''}`}>
                    <i className='sicon-page-search p-1 text-3xl text-secondary mr-2'></i>
                    <span className='text-secondary-dark align-super'>No Products Found!</span>
                </div>
            )}
            {/* Render loader when loading state is true */}
            {loading && <div className='sm:h-screen flex justify-center'><Loader /></div>}
        </>
    );
}

export default ProductsNoInfScolling;
