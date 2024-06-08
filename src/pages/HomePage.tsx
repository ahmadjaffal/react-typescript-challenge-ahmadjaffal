import React from 'react';
import Slider from '../components/Slider/Slider';
import Products from '../components/Products/Products';

/**
 * HomePage component represents the main landing page of the application.
 * It displays a slider with featured content and a list of products.
 */
const HomePage: React.FC = () => {
    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl dark:bg-zinc-900 dark:text-white">
            <Slider />
            <Products />
        </div>
    );
}

export default HomePage;
