import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { Product } from '../../types/types';
import StarRating from '../StarRating/StarRating';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    let priceBefore = product ? product?.price + 0.6 : 0;

    return (
        <div className="rounded-lg border-2 border-gray-50 dark:border-zinc-700 flex flex-col items-start justify-start md:p-3 p-2 relative">
            <Link to={`/product/${product?.id}`} className='block w-full relative mb-4' title={product?.title}>
                <img src={product?.image} alt={product?.title} title={product?.title}
                    className="w-full aspect-4/3 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105" />
            </Link>
            <div className="w-full flex flex-col flex-1 items-start justify-start gap-4">
                <div className="flex items-center justify-center flex-col gap-1 w-full">
                    <Link to={`/product/${product?.id}`} className='block w-full text-primary text-center' title={product?.title}>
                        <h2 className="text-sm dark:text-white">{product?.title}</h2>
                    </Link>
                    <small className="block text-xs w-full text-center capitalize dark:text-white">{product?.category}</small>
                </div>
                <StarRating rate={product?.rating?.rate} isDetails={false} />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center w-full my-4 gap-0 sm:gap-2">
                <span className="font-medium text-md dark:text-white">{`SAR ${product?.price.toFixed(2)}`}</span>
                <span className="font-medium text-sm line-through text-gray-300 dark:text-white">{`SAR ${priceBefore.toFixed(2)}`}</span>
            </div>
            <AddToCartButton product={product} isDetails={false} />
        </div>
    );
}

export default ProductItem;