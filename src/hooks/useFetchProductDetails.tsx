import { useState, useEffect } from 'react';
import { Product } from '../types/types';

const useFetchProductDetails = (productId: number | null) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (productId !== null) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Product = await response.json();
            setProduct(data);
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    return { product, loading, error };
};

export default useFetchProductDetails;
