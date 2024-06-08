import React, { useState, useEffect } from 'react';
import { disableScroll, enableScroll } from '../../utils/disableScroll';
import { useUserAuth } from '../../hooks/useUserAuth';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginMenuProps {
    isLoginOpen: boolean;            // Flag to determine if the login menu is open or closed
    toggleLoginMenu: () => void;    // Function to toggle the login menu
}

/**
 * Login component to handle user authentication.
 * @param isLoginOpen Flag to determine if the login menu is open or closed
 * @param toggleLoginMenu Function to toggle the login menu
 */
const Login: React.FC<LoginMenuProps> = ({ isLoginOpen, toggleLoginMenu }) => {
    const { isAuthenticated, loading, username, login, logout } = useUserAuth(); // Authentication state and methods from custom hook
    const [inputUsername, setInputUsername] = useState<string>(''); // State for username input
    const [inputPassword, setInputPassword] = useState<string>(''); // State for password input
    const [response, setResponse] = useState<string>(''); // State for response message
    const [success, setSuccess] = useState<boolean>(false); // State for success state of login or password reset

    // Effect to toggle scrolling and reset state when opening/closing login menu
    useEffect(() => {
        if (isLoginOpen) {
            disableScroll();
        } else {
            enableScroll();
        }

        return () => {
            enableScroll(); // Cleanup to enable scrolling
            setResponse(''); // Clear response message
            setSuccess(false); // Reset success state
            setInputUsername(''); // Clear username input
            setInputPassword(''); // Clear password input
        };
    }, [isLoginOpen]);

    // Function to handle user login
    const handleLogin = async () => {
        setResponse('');
        const result = await login(inputUsername, inputPassword); // Call login function from hook
        setResponse(result.message); // Set response message
        setSuccess(result.success); // Set success state
        if (result.success)
            toast.success("Logged in successfully!"); // Show success toast if login is successful
    };

    // Function to handle user logout
    const handleLogout = () => {
        logout(); // Call logout function from hook
        setResponse(''); // Clear response message
        setInputUsername(''); // Clear username input
        setInputPassword(''); // Clear password input
        toast.success("Logged out successfully!"); // Show success toast for logout
    };

    // Function to handle forgot password action
    const forgetPassword = () => {
        setResponse('Reset password link sent to your email.'); // Set response message
        setSuccess(true); // Set success state to true
    };

    // Function to close response message
    const closeMessage = () => {
        setResponse('');
    };

    return (
        <>
            <div
                className={`z-20 fixed top-10 left-0 h-full w-full sm:max-w-[500px] mx-auto transform ${isLoginOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}>
                <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl dark:bg-zinc-900 dark:text-white">
                    <i onClick={toggleLoginMenu} title="Close login"
                        className='sicon-cancel cursor-pointer text-xl text-primary m-2 absolute right-1 top-1 transition-colors ease-in-out delay-50 hover:text-primary-darker'></i>
                    {!isAuthenticated ?
                        <>
                            <div className="flex flex-col text-center items-center justify-center mb-6">
                                <h2 className="text-lg">
                                    <i className='sicon-user p-2 bg-secondary-50 text-primary rounded-full mr-2'></i>
                                    Login</h2>
                                <span className="text-xs text-gray-500 pt-1.5">Do you want to login to continue shopping?</span>
                            </div>
                            <form method="post" action="#" className="flex flex-col w-full">
                                <div className="mb-4">
                                    <label className="block mb-2 text-md" htmlFor="username">Username</label>
                                    <input type="text"
                                        name="username"
                                        id="username"
                                        className="w-full p-2 bg-white appearance-none rounded-md border text-md cursor-pointer dark:bg-zinc-900 dark:border-zinc-700"
                                        placeholder="Username..."
                                        value={inputUsername}
                                        onChange={(e) => setInputUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-md" htmlFor="password">Password</label>
                                    <input type="password"
                                        name="password"
                                        id="password"
                                        className="w-full p-2 bg-white appearance-none rounded-md border text-md cursor-pointer dark:bg-zinc-900 dark:border-zinc-700"
                                        placeholder="Password..."
                                        value={inputPassword}
                                        onChange={(e) => setInputPassword(e.target.value)} />
                                </div>
                                {response &&
                                    <div className={`mb-4 text-xs rounded-md p-1.5 relative ${success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                        {response}
                                        <i onClick={closeMessage} className='sicon-cancel text-sm cursor-pointer text-black rounded absolute right-1 top-1'></i>
                                    </div>}
                                {loading &&
                                    <div className='mb-4'>
                                        <Loader />
                                    </div>}
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={handleLogin}
                                        className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:bg-primary-darker"
                                        disabled={inputUsername && inputPassword || loading ? false : true}
                                        title={inputUsername && inputPassword || loading ? 'Login' : 'Fill username & password to login'}>
                                        <i className='sicon-user-check p-1 text-base text-secondary-100 rounded-full mr-3'></i>
                                        Login</button>
                                    <button
                                        type="button"
                                        onClick={forgetPassword}
                                        className="w-fit text-primary underline p-2 text-md rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out delay-50 hover:text-primary-darker"
                                        disabled={!success ? false : true}
                                        title={!success ? 'Forgot your password?' : 'Reset link is already sent'}
                                    >Forgot your password?</button>
                                </div>
                            </form>
                        </>
                        : <div className="flex flex-col text-center items-center justify-center">
                            <h2 className="text-lg">User Profile</h2>
                            <div className='my-10'>
                                <i className='sicon-user-circle p-2 text-6xl bg-secondary text-white rounded-full'></i>
                                <h1 className='mt-3 font-bold'>Hello {username}!</h1>
                                <span className="text-xs text-gray-500 mb-4">You can shop now</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md cursor-pointer transition-colors ease-in-out delay-50 hover:bg-primary-darker">
                                <i className='sicon-user-cancel p-1 text-base text-secondary-100 rounded-full mr-3'></i>
                                Logout</button>
                        </div>
                    }
                </div>
            </div>
            {isLoginOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleLoginMenu}
                ></div>
            )}
        </>
    );
}

export default Login;
