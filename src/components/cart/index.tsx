import React, { useState, useEffect, useContext } from 'react';
import { disableScroll, enableScroll } from '../../utils/disableScroll';
import { useUserAuth } from '../../hooks/useUserAuth';
import { CartContext } from '../../context/cartContext';
import { Product } from '../../types/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import productImage1 from '../../assets/images/products/01.png'


interface CartMenuProps {
    isCartOpen: boolean;
    toggleCartMenu: () => void;
}

const Cart: React.FC<CartMenuProps> = ({ isCartOpen, toggleCartMenu }) => {
    // const { isAuthenticated } = useUserAuth();
    const { state, dispatch } = useContext(CartContext);
    const [quantity, setQuantity] = useState<number>(1);
    let isAuthenticated = true

    useEffect(() => {
        if (isCartOpen) {
            disableScroll();
        } else {
            enableScroll();
        }

        return () => {
            enableScroll();
        };
    }, [isCartOpen]);

    useEffect(() => {
        calculateTotalPrice();
    }, [state]);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        state.cart.forEach((product: Product) => {
            totalPrice += product.price * (product.quantity || 1);
        });
        return totalPrice.toFixed(2);
    };

    const handleRemoveFromCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', productId });
        toast.success("Removed from the cart successfully!");
    };

    const handleCheckout = () => {
        dispatch({ type: 'CLEAR_CART' });
        toast.success("Checked out successfully!");
    }

    return (
        <>
            <div
                className={`z-20 fixed top-10 left-0 h-full w-full sm:max-w-[500px] mx-auto transform ${isCartOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}>
                <div className="p-4 bg-white rounded-lg shadow-4xl">
                    <i onClick={toggleCartMenu}
                        className='sicon-cancel cursor-pointer p-0.5 bg-red-500 text-white rounded m-2 absolute right-1 top-1 transition-colors ease-in-out delay-50 hover:bg-red-700'></i>
                    <div className="flex flex-col mb-6">
                        <h2 className="text-lg flex items-center justify-center gap-2">
                            <i className='sicon-shopping-bag p-2 bg-secondary-50 text-primary rounded-full'></i>
                            Shopping Cart</h2>
                    </div>
                    <ul className="flex flex-col overflow-auto max-h-60 min-h-20">
                        {state.cart.length ? state.cart.map((product: Product) => (
                            <li key={product.id}>
                                <li className="flex items-start ms:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100">
                                    <div className="flex items-start justify-center gap-2 flex-1">
                                        <img src={product.image} className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden" alt={product.title} title={product.title} />
                                        <div className="flex flex-col flex-1 gap-1">
                                            <h4>{product.title}</h4>
                                            <div className="flex items-center justify-start gap-2">
                                                <b className="ltr">x {product.quantity}</b><span className="text-xs text-gray-500">{`SAR ${(product?.price * (product.quantity || 1)).toFixed(2)}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                                            <input type="number" min='1' value={product.quantity || 1} title={isAuthenticated ? 'Quantity' : 'Login first!'}
                                                className="w-[50px] flex-1 text-center appearance-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isAuthenticated ? false : true} />
                                        </div>
                                        <button type="button" className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1 transition-colors ease-in-out delay-50 hover:bg-red-500 hover:text-white">
                                            <i className="sicon-trash" title="Remove Product" onClick={() => handleRemoveFromCart(product.id)}></i>
                                        </button>
                                    </div>
                                </li>
                            </li>
                        ))
                            : <li className='flex justify-center mt-6'>
                                <p>No items in the cart!</p>
                            </li>
                        }
                    </ul>
                    <div className="flex items-center justify-between px-4 py-8 border-gray-100 border-t border-b-1">
                        <h3 className="font-bold text-xl">Total Cart</h3>
                        <span className="text-xl font-bold">{`SAR ${calculateTotalPrice()}`}</span>
                    </div>
                    <button type="button" className="w-full bg-primary text-white p-3 text-md rounded-md transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                        onClick={handleCheckout}><i className='sicon-bag-dollar p-1 bg-secondary-50 text-primary rounded-full mr-3'></i>Checkout</button>
                </div>
            </div>
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleCartMenu}
                ></div>
            )}
        </>
    );
}

export default Cart;