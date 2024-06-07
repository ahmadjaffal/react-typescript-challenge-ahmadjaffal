import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the authentication context state
interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    username: string | null;
    login: (username: string, password: string) => Promise<{ success: boolean, message: string }>;
    logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Define the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
            console.log(data);

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
            console.error('Error during login:', error);
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
