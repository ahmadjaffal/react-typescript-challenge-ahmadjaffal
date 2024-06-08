import { useState, useEffect } from 'react';
import { Product } from '../types/types';

// Custom hook to fetch product details from the API
const useFetchProductDetails = (productId: number | null) => {
    const [product, setProduct] = useState<Product | null>(null); // State to store product details
    const [loading, setLoading] = useState<boolean>(false); // Flag to indicate loading state
    const [error, setError] = useState<string | null>(null); // State to store error message, if any

    // Effect hook to fetch product details when productId changes
    useEffect(() => {
        if (productId !== null) {
            fetchProduct(); // Fetch product details when productId is not null
        }
    }, [productId]);

    // Function to fetch product details from API
    const fetchProduct = async () => {
        setLoading(true); // Set loading state to true
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`); // Fetch product details from API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Product = await response.json(); // Parse response data as a Product object
            setProduct(data); // Update state with fetched product details
        } catch (err) {
            setError('Error fetching product details'); // Set error message if fetching fails
        } finally {
            setLoading(false); // Set loading state to false, regardless of success or failure
        }
    };

    // Return product details, loading state, and error state
    return { product, loading, error };
};

export default useFetchProductDetails;
