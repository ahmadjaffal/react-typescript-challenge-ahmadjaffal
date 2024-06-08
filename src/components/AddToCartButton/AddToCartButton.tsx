import React, { useState, useContext } from 'react';
import { Product } from '../../types/types';
import { useUserAuth } from '../../hooks/useUserAuth';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddToCartButtonProps {
    product: Product;       // The product to be added to the cart
    isDetails: boolean;     // Indicates whether the button is used in a detailed view
}

/**
 * Button component to add a product to the cart.
 * @param product The product to be added to the cart
 * @param isDetails Indicates whether the button is used in a detailed view
 */
const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, isDetails = false }) => {
    const { dispatch } = useContext(CartContext);  // Cart context to dispatch cart actions
    const { isAuthenticated } = useUserAuth();     // Authentication state

    const [quantity, setQuantity] = useState<number>(1); // Quantity state

    /**
     * Handles the addition of the product to the cart.
     * @param product The product to be added to the cart
     */
    const handleAddToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', product: { ...product, quantity } });
        setQuantity(1);
        toast.success("Item added to your cart successfully!");
    };

    /**
     * Updates the quantity of the product in the local state.
     * @param type The type of update ('plus' or 'minus')
     */
    const updateQuantity = (type: string) => {
        if (type === 'plus') {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
        else {
            setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : prevQuantity);
        }
    }

    return (
        <>
            {isDetails ? <div className="flex items-center justify-center gap-4">
                <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                    <button
                        title={isAuthenticated ? '+ Quantity' : 'Login to add items to your cart!'}
                        className="shrink-0 px-2 text-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true}
                        onClick={() => updateQuantity('plus')}
                    >+</button>
                    <input
                        type="numeric"
                        min='1'
                        value={quantity}
                        title={isAuthenticated ? 'Quantity' : 'Login to add items to your cart!'}
                        className="w-[50px] flex-1 text-center appearance-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true}
                        readOnly={true}
                    />
                    <button
                        title={isAuthenticated ? '- Quantity' : 'Login to add items to your cart!'}
                        className="shrink-0 px-2 text-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true}
                        onClick={() => updateQuantity('minus')}
                    >-</button>
                </div>
                <button
                    type="button"
                    title={isAuthenticated ? 'Add To Cart' : 'Login to add items to your cart!'}
                    className="w-full h-[42px] bg-primary text-white flex-1 p-2 text-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                    disabled={isAuthenticated ? false : true}
                    onClick={() => handleAddToCart(product)}
                >
                    <i className='sicon-add-to-cart p-1 text-base text-secondary-100 mr-3'></i>
                    Add To Cart
                </button>
            </div>
                : <button
                    type="button"
                    title={isAuthenticated ? 'Add To Cart' : 'Login to add items to your cart!'}
                    className="w-full bg-primary text-white p-2 text-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                    disabled={isAuthenticated ? false : true}
                    onClick={() => handleAddToCart(product)}
                >
                    <i className='sicon-add-to-cart p-1 text-base text-secondary-100 mr-3'></i>
                    Add To Cart
                </button>
            }
        </>
    );
}

export default AddToCartButton;
