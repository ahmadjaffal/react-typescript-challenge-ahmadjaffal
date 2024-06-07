import React from 'react';
import Slider from '../components/slider';
import Products from '../components/products';

const HomePage: React.FC = () => {
    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <Slider />
            <Products />
        </div>
    );
}

export default HomePage;