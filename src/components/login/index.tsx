import React, { useState, useEffect } from 'react';
import { disableScroll, enableScroll } from '../../utils/disableScroll';
import { useUserAuth } from '../../hooks/useUserAuth';
import Loader from '../loader';

interface LoginMenuProps {
    isLoginOpen: boolean;
    toggleLoginMenu: () => void;
}

const Login: React.FC<LoginMenuProps> = ({ isLoginOpen, toggleLoginMenu }) => {
    const { isAuthenticated, loading, username, login, logout } = useUserAuth();
    const [inputUsername, setInputUsername] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (isLoginOpen) {
            disableScroll();
        } else {
            enableScroll();
        }

        return () => {
            enableScroll();
            setResponse('');
            setSuccess(false);
            setInputUsername('');
            setInputPassword('');
        };
    }, [isLoginOpen]);

    const handleLogin = async () => {
        setResponse('');
        const result = await login(inputUsername, inputPassword);
        setResponse(result.message);
        setSuccess(result.success);
    };

    const handleLogout = () => {
        logout();
        setResponse('Logged out successfully!');
        setSuccess(true);
        setInputUsername('');
        setInputPassword('');
    };

    const forgetPassword = () => {
        setResponse('Reset password link sent to your email.');
        setSuccess(true);
    }

    const closeMessage = () => {
        setResponse('');
    }

    return (
        <>
            <div
                className={`z-20 fixed top-10 left-0 h-full w-full sm:max-w-[500px] mx-auto transform ${isLoginOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}>
                <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
                    <i onClick={toggleLoginMenu}
                        className='sicon-cancel cursor-pointer p-0.5 bg-red-500 text-white rounded m-2 absolute right-1 top-1 transition-colors ease-in-out delay-50 hover:bg-red-700'></i>
                    {!isAuthenticated ?
                        <>
                            <div className="flex flex-col text-center items-center justify-center mb-6">
                                <h2 className="text-lg">Login</h2>
                                <span className="text-xs text-gray-500">Do you want to login to continue shopping?</span>
                            </div>
                            <form method="post" action="#" className="flex flex-col w-full">
                                <div className="mb-4">
                                    <label className="block mb-2 text-md" htmlFor="username">Username</label>
                                    <input type="text"
                                        name="username"
                                        id="username"
                                        className="w-full p-2 bg-white appearance-none rounded-md border text-md cursor-pointer"
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
                                        className="w-full p-2 bg-white appearance-none rounded-md border text-md cursor-pointer"
                                        placeholder="Password..."
                                        value={inputPassword}
                                        onChange={(e) => setInputPassword(e.target.value)} />
                                </div>
                                {response &&
                                    <div className={`mb-4 text-xs rounded-md p-1.5 relative ${success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                        {response}
                                        <i onClick={closeMessage}
                                            className='sicon-cancel text-sm cursor-pointer text-black rounded absolute right-1 top-1'></i>
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
                                        title={inputUsername && inputPassword || loading ? 'Login' : 'Fill username & password to login'}>Login</button>
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
                            <div className='my-14'>
                                <i className='sicon-user-circle p-2 text-6xl bg-secondary text-white rounded-full'></i>
                                <h1 className='mt-3 font-bold'>Welcome {username}!</h1>
                                <span className="text-xs text-gray-500 mb-4">You can shop now</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md cursor-pointer transition-colors ease-in-out delay-50 hover:bg-primary-darker">
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