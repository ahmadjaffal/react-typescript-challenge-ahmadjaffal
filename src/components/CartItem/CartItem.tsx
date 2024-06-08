import React, { useState, useEffect, useContext } from 'react';
import { disableScroll, enableScroll } from '../../utils/disableScroll';
import { CartContext } from '../../context/cartContext';
import { Product } from '../../types/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartItemProps {
    product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
    const { dispatch } = useContext(CartContext);
    const [quantity, setQuantity] = useState<number>(product?.quantity ? product?.quantity : 1);

    const handleRemoveFromCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', productId });
        toast.success("Item removed from your cart successfully!");
    };

    const updateQuantity = (type: string, productId: number) => {
        setQuantity(prevQuantity => {
            let newQuantity = prevQuantity;

            if (type === 'plus') {
                newQuantity = prevQuantity + 1;
            } else {
                newQuantity = prevQuantity > 1 ? prevQuantity - 1 : prevQuantity;
            }

            dispatch({ type: 'UPDATE_ITEM_QUANTITY', quantity: newQuantity, productId });

            return newQuantity;
        });
    };

    return (
        <li key={product?.id}>
            <li className="flex items-start ms:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100 dark:hover:bg-zinc-800">
                <div className="flex items-start justify-center gap-2 flex-1">
                    <img src={product?.image} className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden" alt={product?.title} title={product?.title} />
                    <div className="flex flex-col flex-1 gap-1">
                        <h4>{product?.title}</h4>
                        <div className="flex items-center justify-start gap-2">
                            <b className="ltr">x {product?.quantity}</b><span className="text-xs text-gray-500">{`SAR ${(product?.price * (product?.quantity || 1)).toFixed(2)}`}</span>
                        </div>
                    </div>
                </div>
                <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                    <button title="+ Quantity"
                        className="shrink-0 px-2 text-md text-gray-500"
                        onClick={() => updateQuantity('plus', product?.id)}>+</button>
                    <input type="numeric" min='1' value={product?.quantity ? product?.quantity : 1} title="Quantity"
                        className="w-[50px] flex-1 text-center appearance-none bg-transparent" readOnly={true}/>
                    <button title="- Quantity"
                        className="shrink-0 px-2 text-md text-gray-500"
                        onClick={() => updateQuantity('minus', product?.id)}>-</button>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <button type="button" className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1 transition-colors ease-in-out delay-50 hover:bg-red-500 hover:text-white"
                        onClick={() => handleRemoveFromCart(product?.id)}>
                        <i className="sicon-trash" title="Remove item"></i>
                    </button>
                </div>
            </li>
        </li>
    );
}

export default CartItem;