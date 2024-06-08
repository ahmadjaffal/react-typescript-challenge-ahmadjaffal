import React from 'react';
import Slider from '../components/Slider/Slider';
import Products from '../components/Products/Products';

const HomePage: React.FC = () => {
    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl dark:bg-zinc-900 dark:text-white">
            <Slider />
            <Products />
        </div>
    );
}

export default HomePage;