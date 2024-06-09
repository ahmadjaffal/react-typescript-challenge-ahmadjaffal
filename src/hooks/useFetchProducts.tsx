import { useState, useEffect } from 'react';
import { Product } from '../types/types';

// Custom hook to fetch products from the API
const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]); // State to store products
    const [loading, setLoading] = useState<boolean>(false); // Flag to indicate loading state
    const [error, setError] = useState<string | null>(null); // State to store error message, if any

    // Effect hook to fetch products when component mounts
    useEffect(() => {
        fetchProducts(); // Fetch products when component mounts
    }, []);

    // Function to fetch products from API
    const fetchProducts = async () => {
        setLoading(true); // Set loading state to true
        try {
            const response = await fetch('https://fakestoreapi.com/products?limit=18'); // Fetch products from API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Product[] = await response.json(); // Parse response data as an array of Product objects
            setProducts(data); // Update state with fetched products
        } catch (err) {
            setError('Error fetching products'); // Set error message if fetching fails
        } finally {
            setLoading(false); // Set loading state to false, regardless of success or failure
        }
    };

    // Return products, loading state, and error state
    return { products, loading, setLoading, error };
};

export default useFetchProducts;
