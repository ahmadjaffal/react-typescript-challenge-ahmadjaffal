import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchProductDetails from '../hooks/useFetchProductDetails';
import AddToCartButton from '../components/add-to-cart-button';
import StarRating from '../components/star-rating';
import Loader from '../components/loader';

const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const { product, loading, error } = useFetchProductDetails(productId);
    let priceBefore = product ? product?.price + 0.6 : 0;

    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl sm:h-screen">
            {!loading ? <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
                <img src={product?.image}
                    className="w-full aspect-4/3 object-cover rounded-lg mb-8 sm:mb-0"
                    alt={product?.title} />
                <div className="flex flex-col gap-4 col-span-2">
                    <article className="text-sm text-darker-300 leading-[1.8] ">
                        <div className="flx flex-col mb-6 gap-2">
                            <h1 className="text-xl md:text-3xl">{product?.title}</h1>
                            <small className="text-xs text-gray-500">{product?.category}</small>
                        </div>
                        <StarRating rate={product?.rating?.rate} isDetails={true} />
                        <div className="flex flex-col sm:flex-row w-full my-4 gap-0 sm:gap-2">
                            <span className="font-medium text-md">{`SAR ${product?.price.toFixed(2)}`}</span>
                            <span className="font-medium text-sm line-through text-gray-300">{`SAR ${priceBefore.toFixed(2)}`}</span>
                        </div>
                        <div className='h-40'>{product?.description}</div>
                    </article>
                    <AddToCartButton product={product} isDetails={true} />
                </div>
            </div>
                : <div className='sm:h-screen flex justify-center'><Loader /></div>}
        </div>
    );
}

export default ProductDetailsPage;