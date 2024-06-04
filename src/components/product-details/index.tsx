import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchProductItem from '../../hooks/useFetchProductItem';
import AddToCartButton from '../add-to-cart-button';
import Loader from '../loader';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const { product, loading, error } = useFetchProductItem(productId);
    let priceBefore = product ? product?.price + 0.6 : 0;

    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
                <img src={product?.image} className="w-full aspect-4/3 object-cover rounded-lg mb-8 sm:mb-0" alt="product img" />
                <div className="flex flex-col gap-4 col-span-2">
                    <article className="text-sm text-darker-300 leading-[1.8] ">
                        <div className="flx flex-col mb-6 gap-2">
                            <h1 className="text-xl md:text-3xl">{product?.title}</h1>
                            <small className="text-xs text-gray-500">{product?.category}</small>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full my-4 gap-0 sm:gap-2">
                            <span className="font-medium text-md">{`SAR ${product?.price.toFixed(2)}`}</span>
                            <span className="font-medium text-sm line-through text-gray-300">{`SAR ${priceBefore.toFixed(2)}`}</span>
                        </div>
                        <p>{product?.description}</p>
                    </article>
                    {/* <AddToCartButton product={product} /> */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                            <button className="shrink-0 px-2 text-md text-gray-500">+</button>
                            <input type="number" value="1" className="w-[50px] flex-1 text-center appearance-none bg-transparent" />
                            <button className="shrink-0 px-2 text-md text-gray-500">-</button>
                        </div>
                        <button type="button" className="w-full h-[42px] bg-primary text-white flex-1 p-2 text-md rounded-md">إضافة للسلة</button>
                    </div>
                </div>
                {loading && <Loader />}
            </div>
        </div>
    );
}

export default ProductDetails;