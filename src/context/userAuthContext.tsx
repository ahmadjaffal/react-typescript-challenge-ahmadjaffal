import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { UserAuthContext } from '../types/types';
import { CartContext } from '../context/cartContext';

// Create a context for user authentication
export const AuthContext = createContext<UserAuthContext | undefined>(undefined);

// Provider component for managing user authentication state
export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
    const { dispatch } = useContext(CartContext); // Access the cart dispatch function from CartContext

    // State variables
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Flag indicating if user is authenticated
    const [loading, setLoading] = useState<boolean>(false); // Flag indicating loading state
    const [username, setUsername] = useState<string | null>(null); // Username of the authenticated user

    // Check localStorage on component mount to initialize state
    useEffect(() => {
        const localStateToken = localStorage.getItem("token");
        if (localStateToken) {
            setIsAuthenticated(true); // User is authenticated if token is present
        }
        const localStateUsername = localStorage.getItem("username");
        if (localStateUsername) {
            setUsername(localStateUsername); // Set the username from localStorage
        }
    }, []);

    // Function to handle user login
    const login = async (username: string, password: string): Promise<{ success: boolean, message: string }> => {
        setLoading(true); // Set loading to true during login
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
                // Login successful, update state and localStorage
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
        } finally {
            setLoading(false); // Always set loading to false after login attempt
        }
    };

    // Function to handle user logout
    const logout = () => {
        setLoading(true); // Set loading to true during logout
        setIsAuthenticated(false); // Update authentication state
        setUsername(null); // Clear username
        dispatch({ type: 'CLEAR_CART' }); // Clear cart using cart context dispatch function
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('username'); // Remove username from localStorage
        localStorage.removeItem('cart'); // Remove cart data from localStorage
        setLoading(false); // Set loading to false after logout
    };

    // Provide AuthContext to children components with value containing state and functions
    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
