import { useState, useEffect } from 'react';
import { Category } from '../types/types';

// Custom hook to fetch categories from the API
const useFetchCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]); // State to store categories
    const [loading, setLoading] = useState<boolean>(false); // Flag to indicate loading state
    const [error, setError] = useState<string | null>(null); // State to store error message, if any

    // Effect hook to fetch categories when component mounts
    useEffect(() => {
        fetchCategories(); // Fetch categories when component mounts
    }, []);

    // Function to fetch categories from API
    const fetchCategories = async () => {
        setLoading(true); // Set loading state to true
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`https://fakestoreapi.com/products/categories`); // Fetch categories from API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Category[] = await response.json(); // Parse response data as an array of Category objects
            setCategories(data); // Update state with fetched categories
        } catch (err) {
            setError('Error fetching categories'); // Set error message if fetching fails
        } finally {
            setLoading(false); // Set loading state to false, regardless of success or failure
        }
    };

    // Return categories, loading state, and error state
    return { categories, loading, error };
};

export default useFetchCategories;
