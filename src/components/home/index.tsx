import React from 'react';
import Slider from '../slider';
import Products from '../products';

const Home: React.FC = () => {
    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            {/* <!-- slider --> */}
            <Slider />
            {/* <!-- Products --> */}
            <Products />
        </div>
    );
}

export default Home;