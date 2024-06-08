import React, { useContext } from 'react';
import { AuthContext } from '../context/userAuthContext';
import { UserAuthContext } from '../types/types';

// Custom hook to use user authentication context
export const useUserAuth = () => {
    const context = useContext(AuthContext); // Get user authentication context from AuthContext

    // Throw error if context is not found
    if (!context) {
        throw new Error('useUserAuth must be used within an UserAuthProvider');
    }

    // Return context containing authentication state and functions
    return context as UserAuthContext;
};
