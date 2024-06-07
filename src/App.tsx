import React, { useState } from 'react';
import { AuthProvider } from '../src/context/userAuthContext';
import Routes from './routes'
import Header from './components/header';
import Modals from './components/modals';
import Footer from './components/footer';
import './App.scss';

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
      <div className="container mx-auto">
        <AuthProvider>
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
        </AuthProvider>
      </div>
    </main>
  );
}

export default App;
