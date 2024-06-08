import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductDetailsPage from '../pages/ProductDetailsPage';

/**
 * AppRoutes component defines the routing configuration for the application.
 * It specifies the routes and their corresponding components using React Router.
 */
const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;
