import React, { createContext, useReducer, ReactNode } from 'react';
import { Product } from '../types/types';

type CartState = {
    cart: Product[];
};

type CartAction =
    | { type: 'ADD_TO_CART'; product: Product }
    | { type: 'REMOVE_FROM_CART'; productId: number }
    | { type: 'CLEAR_CART' };

const initialState: CartState = {
    cart: []
};

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({
    state: initialState,
    dispatch: () => null
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProduct = state.cart.find(product => product.id === action.product.id);
            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map(product => (
                        product.id === action.product.id
                            ? { ...product, quantity: (product.quantity || 0) + (action.product.quantity || 0) }
                            : product
                    ))
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.product }]
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product => product.id !== action.productId)
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
