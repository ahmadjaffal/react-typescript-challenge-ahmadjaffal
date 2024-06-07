import { useState, useEffect } from 'react';
import { Product } from '../types/types';

const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products?limit=12');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Product[] = await response.json();
            setProducts(data);

        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error };
};

export default useFetchProducts;