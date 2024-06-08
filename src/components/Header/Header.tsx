import React from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';

interface HeaderProps {
    toggleCartMenu: () => void;
    toggleLoginMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCartMenu, toggleLoginMenu }) => {
    const { isAuthenticated, username } = useUserAuth();

    return (
        <header className="w-full">
            <div className="container">
                <div className="md:py-6 py-4">
                    <div className="flex justify-between flex-col sm:flex-row gap-4 items-center">
                        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                            <a href="/" className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50">
                                <img src="https://cdn.salla.network/images/logo/logo-square.png" title="Amazing Experience Store Logo" alt="Amazing Experience Store Logo" />
                            </a>
                            <div className="flex flex-col items-center sm:items-start">
                                <h1 className="text-xl">Amazing Experience Store</h1>
                                <small className="text-gray-400">Your store for all your beautiful experiences and ideas</small>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className='text-xs'> Hello {isAuthenticated ? username : 'Guest'}  </span>
                            <button onClick={toggleLoginMenu} title="Login"
                                className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary cursor-pointer transition-colors ease-in-out delay-50 hover:bg-secondary-d">
                                <i className="sicon-user"></i>
                            </button>
                            <button onClick={toggleCartMenu}
                                disabled={isAuthenticated ? false : true}
                                title={isAuthenticated ? 'Cart' : 'Login to access your cart!'}
                                className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary cursor-pointer transition-colors ease-in-out delay-50 hover:bg-secondary-d disabled:opacity-50 disabled:cursor-not-allowed">
                                <i className="sicon-shopping-bag"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;