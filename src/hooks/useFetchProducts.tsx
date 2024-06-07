import { useState, useEffect } from 'react';
import { Category, Product } from '../types/types';

const useFetchProducts = (category: Category = null) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    let ApiUrl = `https://fakestoreapi.com/products?limit=12`

    if (category !== null) {
        ApiUrl = `https://fakestoreapi.com/products/category/${category}`
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(ApiUrl);
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