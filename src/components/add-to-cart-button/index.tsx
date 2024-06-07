import React, { useState, useContext } from 'react';
import { Product } from '../../types/types';
import { useUserAuth } from '../../hooks/useUserAuth';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddToCartButtonProps {
    product: Product;
    isDetails: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, isDetails = false }) => {
    const { state, dispatch } = useContext(CartContext);
    // const { isAuthenticated } = useUserAuth();
    const [quantity, setQuantity] = useState<number>(1);

    let isAuthenticated = true

    const handleAddToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', product: { ...product, quantity } });
        setQuantity(1);
        toast.success("Added to the cart successfully!");
    };

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
                    <button title={isAuthenticated ? '+ Quantity' : 'Login first!'}
                        className="shrink-0 px-2 text-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true}
                        onClick={() => updateQuantity('plus')}>+</button>
                    <input type="number" min='1' value={quantity} title={isAuthenticated ? 'Quantity' : 'Login first!'}
                        className="w-[50px] flex-1 text-center appearance-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true} />
                    <button title={isAuthenticated ? '- Quantity' : 'Login first!'}
                        className="shrink-0 px-2 text-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true}
                        onClick={() => updateQuantity('minus')}>-</button>
                </div>
                <button type="button" title={isAuthenticated ? 'Add To Cart' : 'Login first!'}
                    className="w-full h-[42px] bg-primary text-white flex-1 p-2 text-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                    disabled={isAuthenticated ? false : true}
                    onClick={() => handleAddToCart(product)}><i className='sicon-add-to-cart p-1 bg-secondary-50 text-primary rounded-full mr-3'></i>Add To Cart</button>
            </div>
                : <button type="button" title={isAuthenticated ? 'Add To Cart' : 'Login first!'}
                    className="w-full bg-primary text-white p-2 text-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                    disabled={isAuthenticated ? false : true}
                    onClick={() => handleAddToCart(product)}><i className='sicon-add-to-cart p-1 bg-secondary-50 text-primary rounded-full mr-3'></i>Add To Cart</button>
            }
        </>
    );
}

export default AddToCartButton;