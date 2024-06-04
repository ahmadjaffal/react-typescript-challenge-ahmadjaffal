import React, { useState } from 'react';
import './App.scss';
import Routes from './routes'
import Header from './components/header';
import Footer from './components/footer';
import Cart from './components/cart';
import Login from './components/login';

const App: React.FC = () => {
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
        <Routes />
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
