import React, { useState } from 'react';
import { Category } from '../../types/types';

interface ProductsSearchProps {
    categories: Category[];
    filterProducts: (category: string, searchTerm: string) => void;
}

/**
 * Component for searching and filtering products by category and search term.
 */
const ProductsSearch: React.FC<ProductsSearchProps> = ({ categories, filterProducts }) => {
    const [category, setCategory] = useState<string>('');  // State for selected category
    const [searchTerm, setSearchTerm] = useState<string>('');  // State for search term

    /**
     * Handler for search input change.
     * @param event The change event from the input field.
     */
    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        filterProducts(category, searchTerm);
    };

    /**
     * Handler for category select change.
     * @param event The change event from the select field.
     */
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        filterProducts(selectedCategory, searchTerm);
    };

    /**
     * Resets the search term and applies the filter.
     */
    const resetSearchTerm = () => {
        setSearchTerm('');
        filterProducts(category, '');
    };

    return (
        <div className="flex items-center justify-between gap-4 mb-4">
            {/* Search input field */}
            <div className="flex flex-col gap-1 flex-1 relative">
                <label htmlFor="product_query" className="hidden">Find a product</label>
                <input
                    type="text"
                    id="product_query"
                    name="product_query"
                    value={searchTerm}
                    title='Search'
                    className="w-full p-2 bg-white appearance-none rounded-md border text-md dark:bg-zinc-900 dark:border-zinc-700"
                    placeholder="Enter product name..."
                    onChange={handleSearchTermChange}
                />
                {/* Clear search button */}
                {searchTerm && (
                    <i
                        onClick={resetSearchTerm}
                        title='Clear Search'
                        className='sicon-cancel w-6 text-primary text-lg text-center cursor-pointer text-black rounded absolute right-1 top-1'
                    ></i>
                )}
            </div>
            {/* Category select field */}
            <div className="flex flex-col gap-1 shrink-0 sm:min-w-[180px]">
                <label htmlFor="categories" className="hidden">Select a category</label>
                <select
                    id="categories"
                    name="categories"
                    value={category}
                    title='Category'
                    onChange={handleCategoryChange}
                    className="bg-white border text-md rounded-md focus:ring-secondary-50 focus:border-secondary-50 block w-full px-2 py-1 dark:bg-zinc-900 dark:border-zinc-700"
                >
                    <option value="">All</option>
                    {/* Render category options */}
                    {categories && categories.map((category, index) => (
                        <option className='capitalize' key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ProductsSearch;
