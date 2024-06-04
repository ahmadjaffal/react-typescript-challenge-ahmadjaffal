import React, { useEffect } from 'react';
import { disableScroll, enableScroll } from '../../utils/disableScroll';

interface LoginMenuProps {
    isLoginOpen: boolean;
    toggleLoginMenu: () => void;
}

const Login: React.FC<LoginMenuProps> = ({ isLoginOpen, toggleLoginMenu }) => {

    useEffect(() => {
        if (isLoginOpen) {
            disableScroll();
        } else {
            enableScroll();
        }

        return () => {
            enableScroll();
        };
    }, [isLoginOpen]);

    return (
        <>
            <div
                className={`z-20 fixed top-10 right-0 h-full w-full sm:max-w-[500px] mx-auto transform ${isLoginOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out`}>
                <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
                    <i onClick={toggleLoginMenu} className='sicon-cancel cursor-pointer p-0.5 bg-red-500 text-white rounded m-2'></i>
                    <div className="flex flex-col text-center items-center justify-center mb-6">
                        <h2 className="text-lg">تسجيل الدخول</h2>
                        <span className="text-xs text-gray-500">قم بتسجيل الدخول لمتابعة التسوق</span>
                    </div>
                    <form method="post" action="#" className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block mb-2 text-md" htmlFor="username">اسم المستخدم</label>
                            <input type="text" name="username" id="username" className="w-full p-2 bg-white appearance-none rounded-md border text-md" placeholder="اسم المستخدم.." />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-md" htmlFor="password">كلمة المرور</label>
                            <input type="password" name="password" id="password" className="w-full p-2 bg-white appearance-none rounded-md border text-md" placeholder="كلمة المرور.." />
                        </div>
                        <div className="flex gap-4">
                            <button type="button" className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md">دخول</button>
                            <button type="button" className="w-fit text-primary underline p-2 text-md rounded-md">نسيت كلمة المرور؟</button>
                        </div>
                    </form>
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