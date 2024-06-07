import React from 'react';
import { Category } from '../../types/types';

interface ProductsSearchProps {
    categories: Category[];
    filterProducts: (type: string, value: string) => void;
}

const ProductsSearch: React.FC<ProductsSearchProps> = ({ categories, filterProducts }) => {

    const handleFilterProducts = (type: string, value: string) => {
        filterProducts(type, value)
    }

    return (
        <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="product_query" className="hidden">Find a product</label>
                <input type="text" id="product_query" name="product_query"
                    className="w-full p-2 bg-white appearance-none rounded-md border text-md"
                    placeholder="Enter product name..."
                    onChange={(e) => handleFilterProducts("SerchText", e.target.value)} />
            </div>
            <div className="flex flex-col gap-1 shrink-0 sm:min-w-[180px]">
                <label htmlFor="categories" className="hidden">Select a category</label>
                <select id="categories" name="categories"
                    onChange={(e) => handleFilterProducts("Category", e.target.value)}
                    className="bg-white border text-md rounded-md focus:ring-secondary-50 focus:border-secondary-50 block w-full px-2 py-1">
                    <option value="all">All</option>
                    {categories && categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ProductsSearch;