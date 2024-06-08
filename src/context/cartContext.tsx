import React, { useEffect, createContext, useReducer, ReactNode } from 'react';
import { CartState, CartAction } from '../types/types';

// Define the initial state of the cart
const initialState: CartState = {
    cart: []
};

// Create a context to hold the cart state and dispatch function
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({
    state: initialState,
    dispatch: () => null
});

// Define the cart reducer function to handle state changes based on actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'INIT_CART':
            // Initialize cart with data from localStorage if exist
            return {
                ...state,
                cart: action.cart
            };
        case 'ADD_TO_CART':
            // Add a product to the cart or update its quantity if it's already exists
            const existingProduct = state.cart.find(product => product?.id === action.product?.id);
            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map(product => (
                        product?.id === action.product?.id
                            ? { ...product, quantity: (product?.quantity || 0) + (action.product?.quantity || 0) }
                            : product
                    ))
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.product }]
                };
            }
        case 'UPDATE_ITEM_QUANTITY':
            // Update the quantity of an item in the cart
            return {
                ...state,
                cart: state.cart.map(product =>
                    product?.id === action?.productId
                        ? { ...product, quantity: action?.quantity }
                        : product
                )
            };
        case 'REMOVE_FROM_CART':
            // Remove an item from the cart
            return {
                ...state,
                cart: state.cart.filter(product => product?.id !== action.productId)
            };
        case 'CLEAR_CART':
            // Clear the cart and remove it's data from localStorage
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

// Define the provider component to provide the cart context to its children
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Function to get initial cart state from localStorage or use the default initialState
    const getInitialState = (): CartState => {
        const localStateCart = localStorage.getItem("cart");
        return localStateCart ? { cart: JSON.parse(localStateCart) } : initialState;
    };

    // Use useReducer hook to manage state using cartReducer function and initial state
    const [state, dispatch] = useReducer(cartReducer, getInitialState());

    // Effect hook to update localStorage whenever cart state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state?.cart]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
