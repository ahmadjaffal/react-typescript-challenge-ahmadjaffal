import React, { useContext } from 'react';
import { AuthContext } from '../context/userAuthContext';

export const useUserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useUserAuth must be used within an UserAuthProvider');
    }
    return context;
};