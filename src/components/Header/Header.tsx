import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { addDarkMode, removeDarkMode } from '../../utils/darkMode';

interface HeaderProps {
    toggleCartMenu: () => void;     // Function to toggle the cart menu
    toggleLoginMenu: () => void;    // Function to toggle the login menu
}

/**
 * Header component for the application.
 * @param toggleCartMenu Function to toggle the cart menu
 * @param toggleLoginMenu Function to toggle the login menu
 */
const Header: React.FC<HeaderProps> = ({ toggleCartMenu, toggleLoginMenu }) => {
    const { isAuthenticated, username } = useUserAuth(); // Authentication status and username from custom hook
    const [isDarkMode, setIsDarkMode] = useState(false); // Local state for dark mode toggle

    // Effect to load dark mode preference from localStorage
    useEffect(() => {
        const localStateDark = localStorage.getItem("dark");
        if (localStateDark === 'true') {
            setIsDarkMode(true)
        }
    }, []);

    // Effect to toggle dark mode and save preference to localStorage
    useEffect(() => {
        if (isDarkMode) {
            addDarkMode();
        } else {
            removeDarkMode();
        }
        localStorage.setItem('dark', JSON.stringify(isDarkMode));

        return () => {
            removeDarkMode(); // Cleanup function to remove dark mode styles
        };
    }, [isDarkMode]);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <header className="w-full bg-gray-50 sticky z-10 top-0 dark:bg-zinc-900 dark:text-white">
            <div className="container">
                <div className="md:py-6 py-4">
                    <div className="flex justify-between flex-col sm:flex-row gap-4 items-center">
                        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                            <a href="/" className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50 dark:bg-zinc-900" title="Amazing Experience Store Logo">
                                <img src="https://cdn.salla.network/images/logo/logo-square.png" title="Amazing Experience Store Logo" alt="Amazing Experience Store Logo" />
                            </a>
                            <div className="flex flex-col items-center sm:items-start">
                                <h1 className="text-xl">Amazing Experience Store</h1>
                                <small className="text-gray-400">Your store for all your beautiful experiences and ideas</small>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className='text-xs'> Hello {isAuthenticated ? username + '!' : 'Guest'}  </span>
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
                            <div className='flex items-center gap-1'>
                                <div className="flex items-center justify-center bg-secondary-50 dark:bg-gray-200 rounded-full w-10 h-6 p-1 cursor-pointer relative" onClick={toggleDarkMode} title='Toggle Dark/Light mode'>
                                    <div className={`bg-primary dark:bg-secondary left-0 absolute rounded-full w-5 h-5 shadow-md transform duration-300 ${isDarkMode ? 'translate-x-full' : 'translate-x-0'}`}></div>
                                </div>
                                <div className="ml-2 text-gray-600 dark:text-gray-300 focus:outline-none" title={isDarkMode ? 'Dark mode' : 'Light mode'}>
                                    {isDarkMode ?
                                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                            <path className="fill-gray-200" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
                                            <path
                                                className="fill-gray-200"
                                                d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                                            />
                                        </svg>
                                        : <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                className="fill-yellow-400"
                                                d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                                            />
                                            <path className="fill-yellow-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
                                        </svg>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
