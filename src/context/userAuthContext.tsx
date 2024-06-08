import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { UserAuthContext } from '../types/types';

export const AuthContext = createContext<UserAuthContext | undefined>(undefined);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const localStatetoken = localStorage.getItem("token");
        if (localStatetoken) {
            setIsAuthenticated(true)
        }
        const localStateUsername = localStorage.getItem("username");
        if (localStateUsername) {
            setUsername(localStateUsername)
        }
    }, [])

    const login = async (username: string, password: string): Promise<{ success: boolean, message: string }> => {
        setLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.token) {
                setIsAuthenticated(true);
                setUsername(username);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                return { success: true, message: 'Login successful' };
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            return { success: false, message: 'Username or Password is incorrect!' };
        }
        finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setLoading(true);
        setIsAuthenticated(false);
        setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('cart');
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
