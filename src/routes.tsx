import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;
