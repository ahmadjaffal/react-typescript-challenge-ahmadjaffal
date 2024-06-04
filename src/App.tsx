import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useFetchProducts, { Product } from './hooks/useFetchProducts';
import './App.scss';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Cart from './components/cart';
import Login from './components/login';
import ProductDetails from './components/product-details';

const App: React.FC = () => {
  // const { products, loading, error } = useFetchProducts();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const toggleCartMenu = () => {
    setIsCartOpen(!isCartOpen);
  };
  const toggleLoginMenu = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <main className="w-full main flex-auto">
      <div className="container">
        <Header
          toggleCartMenu={toggleCartMenu}
          toggleLoginMenu={toggleLoginMenu}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route
              path="/product/:id"
              render={(props) => {
                const id = parseInt(props.match.params.id);
                const product = products.find(p => p.id === id);
                return product ? <ProductDetails {...props} product={product} /> : <div>Product not found</div>;
              }}
            /> */}
          </Routes>
        </Router>
        <Login
          isLoginOpen={isLoginOpen}
          toggleLoginMenu={toggleLoginMenu}
        />
        <Cart
          isCartOpen={isCartOpen}
          toggleCartMenu={toggleCartMenu}
        />
        <Footer />
      </div>
    </main>
  );
}

export default App;
