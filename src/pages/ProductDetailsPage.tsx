import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProductDetails from '../hooks/useFetchProductDetails';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';
import StarRating from '../components/StarRating/StarRating';
import Loader from '../components/Loader/Loader';

/**
 * ProductDetailsPage component displays details of a specific product.
 * Fetches product details based on the ID from the URL params.
 */
const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const { product, loading, error } = useFetchProductDetails(productId);
    let priceBefore = product ? product?.price + 0.6 : 0;

    // Effect to scroll top when ProductDetailsPage is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="px-2 py-2 sm:px-4 sm:py-10 bg-white rounded-lg shadow-4xl sm:h-screen dark:bg-zinc-900 dark:text-white">
            {!loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
                    <img
                        src={product?.image}
                        className="w-full aspect-4/3 object-cover rounded-lg mb-8 sm:mb-0"
                        alt={product?.title}
                        title={product?.title}
                    />
                    <div className="flex flex-col gap-4 col-span-2">
                        <article className="text-sm text-darker-300 leading-[1.8]">
                            <div className="flex flex-col mb-6 gap-2">
                                <h1 className="text-xl md:text-3xl dark:text-white">{product?.title}</h1>
                                <small className="text-xs text-gray-500 capitalize dark:text-white">{product?.category}</small>
                            </div>
                            <StarRating rate={product?.rating?.rate} isDetails={true} />
                            <div className="flex flex-col sm:flex-row w-full my-4 gap-0 sm:gap-2">
                                <span className="font-medium text-md dark:text-white">{`SAR ${product?.price.toFixed(2)}`}</span>
                                <span className="font-medium text-sm line-through text-gray-300 dark:text-gray-400">{`SAR ${priceBefore.toFixed(2)}`}</span>
                            </div>
                            <div className='sm:h-40 dark:text-white'>{product?.description}</div>
                        </article>
                        {product && <AddToCartButton product={product} isDetails={true} />}
                    </div>
                </div>
            ) : (
                <div className='sm:h-screen flex justify-center'><Loader /></div>
            )}
        </div>
    );
}

export default ProductDetailsPage;
