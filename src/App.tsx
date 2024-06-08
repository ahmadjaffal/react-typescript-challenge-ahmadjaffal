import React, { useState } from 'react';
import { UserAuthProvider } from '../src/context/userAuthContext';
import { CartProvider } from '../src/context/cartContext';
import { ToastContainer } from 'react-toastify';
import Routes from './routes/Routes'
import Header from './components/Header/Header';
import Modals from './components/Modals/Modals';
import Footer from './components/Footer/Footer';
import './App.scss';

/**
 * App component is the root component of the application.
 * It provides the main layout, context providers, and top-level components.
 */
const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  /**
   * Toggles the cart menu open/close state.
   */
  const toggleCartMenu = () => {
    setIsCartOpen(!isCartOpen);
  };

  /**
   * Toggles the login menu open/close state.
   */
  const toggleLoginMenu = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <main className="w-full main flex-auto">
      <div className="container mx-auto">
        <UserAuthProvider>
          <CartProvider>
            <ToastContainer />
            <Header
              toggleCartMenu={toggleCartMenu}
              toggleLoginMenu={toggleLoginMenu}
            />
            <Routes />
            <Modals
              isLoginOpen={isLoginOpen}
              toggleLoginMenu={toggleLoginMenu}
              isCartOpen={isCartOpen}
              toggleCartMenu={toggleCartMenu}
            />
            <Footer />
          </CartProvider>
        </UserAuthProvider>
      </div>
    </main>
  );
}

export default App;
