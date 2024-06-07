import React, { createContext, useState, ReactNode } from 'react';
import { UserAuthContext } from '../types/types';

// Create a context with a default value
export const AuthContext = createContext<UserAuthContext | undefined>(undefined);

// Define the context provider component
export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

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

            // Assuming the API returns a token on successful login
            if (data.token) {
                setIsAuthenticated(true);
                setUsername(username);
                // Save the token to local storage or state management (e.g., Redux)
                localStorage.setItem('token', data.token);
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
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
