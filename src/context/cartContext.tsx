import React, { useEffect, createContext, useReducer, ReactNode } from 'react';
import { CartState, CartAction } from '../types/types'

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
        case 'INIT_CART':
            return {
                ...state,
                cart: action.cart
            };
        case 'ADD_TO_CART':
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
            return {
                ...state,
                cart: state.cart.map(product =>
                    product?.id === action?.productId
                        ? { ...product, quantity: action?.quantity }
                        : product
                )
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product => product?.id !== action.productId)
            };
        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const getInitialState = (): CartState => {
        const localStateCart = localStorage.getItem("cart");
        return localStateCart ? { cart: JSON.parse(localStateCart) } : initialState;
    };

    const [state, dispatch] = useReducer(cartReducer, getInitialState());

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
