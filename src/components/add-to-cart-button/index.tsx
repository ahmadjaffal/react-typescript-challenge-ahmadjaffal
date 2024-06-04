import React from 'react';
import { Product } from '../../hooks/useFetchProducts';


interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    return (
        <button type="button" className="w-full bg-primary text-white p-2 text-md rounded-md">إضافة للسلة</button>

        // <div className="flex items-center justify-center gap-4">
        //                 <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
        //                     <button className="shrink-0 px-2 text-md text-gray-500">+</button>
        //                     <input type="number" value="1" className="w-[50px] flex-1 text-center appearance-none bg-transparent" />
        //                     <button className="shrink-0 px-2 text-md text-gray-500">-</button>
        //                 </div>
        //                 <button type="button" className="w-full h-[42px] bg-primary text-white flex-1 p-2 text-md rounded-md">إضافة للسلة</button>
        //             </div>
    );
}

export default AddToCartButton;