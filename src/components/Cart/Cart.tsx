import React, { useState, useEffect, useContext } from 'react';
import { disableScroll, enableScroll } from '../../utils/disableScroll';
import { CartContext } from '../../context/cartContext';
import CartItem from '../CartItem/CartItem';
import { Product } from '../../types/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface CartMenuProps {
    isCartOpen: boolean;
    toggleCartMenu: () => void;
}

const Cart: React.FC<CartMenuProps> = ({ isCartOpen, toggleCartMenu }) => {
    const { state, dispatch } = useContext(CartContext);

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
            totalPrice += product?.price * (product?.quantity || 1);
        });
        return totalPrice.toFixed(2);
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
                <div className="p-4 bg-white rounded-lg shadow-4xl dark:bg-zinc-900 dark:text-white">
                    <i onClick={toggleCartMenu} title="Close cart"
                        className='sicon-cancel cursor-pointer text-xl text-primary m-2 absolute right-1 top-1 transition-colors ease-in-out delay-50 hover:text-primary-darker'></i>
                    <div className="flex flex-col mb-6">
                        <h2 className="text-lg flex items-center justify-center gap-2">
                            <i className='sicon-shopping-bag p-2 bg-secondary-50 text-primary rounded-full'></i>
                            Shopping Cart</h2>
                    </div>
                    <ul className="flex flex-col overflow-auto max-h-60 min-h-20">
                        {state.cart.length ? state.cart.map((product: Product) => (
                            <CartItem product={product} />
                        ))
                            : <div className='flex items-baseline text-sm justify-center mt-6 bg-yellow-100 p-4 rounded dark:bg-zinc-800'>
                                <i className='sicon-warning mr-2 p-1.5 bg-yellow-400 text-white rounded-full align-super'></i>
                                <p>Your cart is empty!</p>
                            </div>
                        }
                    </ul>
                    <div className="flex items-center justify-between px-4 py-8 border-gray-100 border-t border-b-1 mt-4 dark:border-zinc-500">
                        <h3 className="font-bold text-xl">Total Cart</h3>
                        <span className="text-xl font-bold">{`SAR ${calculateTotalPrice()}`}</span>
                    </div>
                    <button type="button"
                        className="w-full bg-primary text-white p-3 text-md rounded-md transition-colors ease-in-out delay-50 hover:bg-primary-darker disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={state.cart.length ? false : true}
                        title={!state.cart.length ? 'Add items to your cart to checkout!' : 'Checkout'}
                        onClick={handleCheckout}>
                        <i className='sicon-bag-dollar p-1 text-base text-secondary-100 mr-3'></i>
                        Checkout</button>
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