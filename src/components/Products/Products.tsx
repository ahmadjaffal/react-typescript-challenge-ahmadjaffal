import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types/types';
import useFetchProducts from '../../hooks/useFetchProducts';
import useFetchCategories from '../../hooks/useFetchCategories';
import ProductsSearch from '../ProductsSearch/ProductsSearch';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';

/**
 * Component to display a list of products, with search, filtering, and lazy loading capabilities.
 */
const Products: React.FC = () => {
    const initialLoadCount = 3;  // Number of products to load initially
    const loadMoreThreshold = 0;  // Threshold in pixels before reaching bottom to trigger loading more products

    const [productsList, setProductsList] = useState<Product[]>([]);  // State to hold the list of products to display
    const [isFiltering, setIsFiltering] = useState(false);  // State to track if filtering is active
    const { products, loading, setLoading, error } = useFetchProducts();  // Custom hook to fetch products data
    const { categories } = useFetchCategories();  // Custom hook to fetch categories data

    // Effect to load initial products
    useEffect(() => {
        if (products.length > 0) {
            const initialProducts = products.slice(0, initialLoadCount);
            setProductsList(initialProducts);
        }
    }, [products]);

    // Function to load more products when user scrolls to bottom
    const handleScroll = useCallback(() => {
        setLoading(true);
        if (
            !isFiltering &&  // Check if filtering is active
            window.innerHeight + document.documentElement.scrollTop + loadMoreThreshold >=
            document.documentElement.offsetHeight
        ) {
            const currentLength = productsList.length;
            const nextProducts = products.slice(currentLength, currentLength + initialLoadCount);
            setProductsList(prevProducts => [...prevProducts, ...nextProducts]);
        }
        setLoading(false);
    }, [isFiltering, products, productsList]);

    // Attach scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    /**
     * Function to filter products based on category and search term.
     * @param category The category to filter by.
     * @param searchTerm The search term to filter by.
     */
    const filterProducts = (category: string, searchTerm: string) => {
        const filtered = products.filter(product => {
            return (
                (category === '' || product?.category === category) &&
                (searchTerm === '' || product?.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
        setProductsList(filtered);
        if (category === '' && searchTerm === '') {
            setIsFiltering(false);  // Set filtering state to false
        }
        else {
            setIsFiltering(true);  // Set filtering state to true
        }
    };

    return (
        <>
            {/* ProductsSearch component for filtering products */}
            <ProductsSearch categories={categories} filterProducts={filterProducts} />
            {/* Conditional rendering based on filteredProducts length */}
            {productsList?.length ? (
                <div className="grid mmd:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
                    {/* Render ProductItem for each product in productsList */}
                    {productsList.map((product: Product) => (
                        <ProductItem key={product?.id} product={product} />
                    ))}
                </div>
            ) : (
                // Render a message when no products are found
                <div className={`w-full text-center sm:h-40 mt-8 ${loading ? 'hidden' : ''}`}>
                    <i className='sicon-page-search p-1 text-3xl text-secondary mr-2'></i>
                    <span className='text-secondary-dark align-super'>No Products Found!</span>
                </div>
            )}
            {/* Render loader when loading state is true */}
            {loading && <div className='sm:h-20 flex justify-center'><Loader /></div>}
        </>
    );
}

export default Products;
