import React from 'react';

interface HeaderProps {
    toggleCartMenu: () => void;
    toggleLoginMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCartMenu, toggleLoginMenu }) => {
    return (
        <header className="w-full">
            <div className="container">
                <div className="md:py-6 py-4">
                    <div className="flex justify-between flex-col sm:flex-row gap-4 items-center">
                        {/* <!-- store logo & title --> */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                            <a href="index.html" className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50">
                                <img src="https://cdn.salla.network/images/logo/logo-square.png" alt="Logo" />
                            </a>
                            <div className="flex flex-col">
                                <h1 className="text-xl">متجر التجربة الجميلة</h1>
                                <small className="text-gray-400">متجرك لكل تجاربك وأفكارك الجميلة</small>
                            </div>
                        </div>
                        {/* <!-- cart and user --> */}
                        <div className="flex items-center gap-4">
                            <span> مرحبا بك </span>
                            <a onClick={toggleLoginMenu} type="button" className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary cursor-pointer">
                                <i className="sicon-user"></i>
                            </a>
                            <a onClick={toggleCartMenu} type="button" className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary cursor-pointer">
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