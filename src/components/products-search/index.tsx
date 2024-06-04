import React from 'react';

const ProductsSearch: React.FC = () => {
    return (
        <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="product_query" className="hidden">ابحث عن منتج</label>
                <input type="text" id="product_query" name="product_query" className="w-full p-2 bg-white appearance-none rounded-md border text-md" placeholder="ادخل اسم المنتج..." />
            </div>
            <div className="flex flex-col gap-1 shrink-0 sm:min-w-[180px]">
                <label htmlFor="categories" className="hidden">اختر تصنيف</label>
                <select id="categories" name="categories" className="bg-white border text-md rounded-md focus:ring-secondary-50 focus:border-secondary-50 block w-full px-2 py-1">
                    <option selected value="all">الكل</option>
                    <option value="cat_1">تصنيف ١</option>
                    <option value="cat_2">تصنيف ٢</option>
                    <option value="cat_3">تصنيف ٣</option>
                    <option value="cat_4">تصنيف ٤</option>
                </select>
            </div>
        </div>
    );
}

export default ProductsSearch;