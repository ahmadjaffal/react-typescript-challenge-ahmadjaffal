import React from 'react';
import { Product } from '../../types/types';
import { useAuth } from '../../context/userAuthContext';


interface AddToCartButtonProps {
    product: Product | null;
    isDetails: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, isDetails = false }) => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isDetails ? <div className="flex items-center justify-center gap-4">
                <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                    <button title={isAuthenticated ? '+ Quantity' : 'Login first!'}
                        className="shrink-0 px-2 text-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"                        
                        disabled={isAuthenticated ? false : true}>+</button>
                    <input type="number" value="1" title={isAuthenticated ? 'Quantity' : 'Login first!'}
                        className="w-[50px] flex-1 text-center appearance-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true} />
                    <button title={isAuthenticated ? '- Quantity' : 'Login first!'}
                        className="shrink-0 px-2 text-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAuthenticated ? false : true}>-</button>
                </div>
                <button type="button" title={isAuthenticated ? 'Add To Cart' : 'Login first!'}
                    className="w-full h-[42px] bg-primary text-white flex-1 p-2 text-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                    disabled={isAuthenticated ? false : true}>Add To Cart</button>
            </div>
                : <button type="button" title={isAuthenticated ? 'Add To Cart' : 'Login first!'}
                    className="w-full bg-primary text-white p-2 text-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                    disabled={isAuthenticated ? false : true}>Add To Cart</button>
            }
        </>
    );
}

export default AddToCartButton;