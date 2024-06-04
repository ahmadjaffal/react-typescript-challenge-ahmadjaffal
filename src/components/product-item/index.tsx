import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../add-to-cart-button';
import { Product } from '../../hooks/useFetchProducts';
import StarRating from '../star-rating';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    let priceBefore = product ? product?.price + 0.6 : 0;

    return (
        <div className="rounded-lg border-2 border-gray-50 flex flex-col items-start justify-start md:p-3 p-2 relative">
            <Link to={`/product/${product?.id}`} className='block w-full relative mb-4'>
                <img src={product?.image} alt={product?.title} className="w-full aspect-4/3 object-cover rounded-lg" />
            </Link>
            <div className="w-full flex flex-col flex-1 items-start justify-start gap-4">
                <div className="flex items-center justify-center flex-col gap-1 w-full">
                    <Link to={`/product/${product?.id}`} className='block w-full text-primary text-center'>
                        <h2 className="text-sm">{product?.title}</h2>
                    </Link>
                    <small className="block text-xs w-full text-center">{product?.category}</small>
                </div>
                <StarRating rate={product?.rating?.rate} />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center w-full my-4 gap-0 sm:gap-2">
                <span className="font-medium text-md">{`SAR ${product?.price.toFixed(2)}`}</span>
                <span className="font-medium text-sm line-through text-gray-300">{`SAR ${priceBefore.toFixed(2)}`}</span>
            </div>
            <AddToCartButton product={product} />
        </div>
    );
}

export default ProductItem;