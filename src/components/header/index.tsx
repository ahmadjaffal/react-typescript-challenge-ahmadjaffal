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
                        {/* <!-- store logo & title --> */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                            <a href="/" className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50">
                                <img src="https://cdn.salla.network/images/logo/logo-square.png" alt="Amazing Experience Store Logo" />
                            </a>
                            <div className="flex flex-col">
                                <h1 className="text-xl">Amazing Experience Store</h1>
                                <small className="text-gray-400">Your store for all your beautiful experiences and ideas</small>
                            </div>
                        </div>
                        {/* <!-- cart and user --> */}
                        <div className="flex items-center gap-4">
                            <span className='text-xs'> Welcome {isAuthenticated ? username : 'Guest!'}  </span>
                            <a onClick={toggleLoginMenu} type="button"
                                className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary cursor-pointer transition-colors ease-in-out delay-50 hover:bg-secondary-d">
                                <i className="sicon-user"></i>
                            </a>
                            <a onClick={toggleCartMenu} type="button"
                                className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary cursor-pointer transition-colors ease-in-out delay-50 hover:bg-secondary-d">
                                <i className="sicon-shopping-bag"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;