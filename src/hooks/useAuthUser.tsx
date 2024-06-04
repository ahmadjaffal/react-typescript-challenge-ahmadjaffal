import { useState, useEffect } from 'react';

export interface User {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const useAuthUser = () => {
    const [user, setProducts] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: User[] = await response.json();
                setProducts(data);
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { user, loading, error };
};

export default useAuthUser;