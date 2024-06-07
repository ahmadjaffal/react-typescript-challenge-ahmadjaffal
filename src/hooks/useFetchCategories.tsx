import { useState, useEffect } from 'react';
import { Category } from '../types/types';

const useFetchCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://fakestoreapi.com/products/categories`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Category[] = await response.json();
            setCategories(data);
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    return { categories, loading, error };
};

export default useFetchCategories;
