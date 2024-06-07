import { useState, useEffect } from 'react';
import { Category } from '../types/types';

const useFetchCategories = (productId: number | null) => {
    const [product, setProduct] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (productId !== null) {
            fetchCategories();
        }
    }, [productId]);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://fakestoreapi.com/products/categories`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Category = await response.json();
            setProduct(data);
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    return { product, loading, error };
};

export default useFetchCategories;
