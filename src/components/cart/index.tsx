import React, { useEffect } from 'react';
import { disableScroll, enableScroll } from '../../utils/disableScroll';
import productImage1 from '../../assets/images/products/01.png'
import productImage2 from '../../assets/images/products/02.png'
import productImage3 from '../../assets/images/products/03.png'
import productImage4 from '../../assets/images/products/04.png'

interface CartMenuProps {
    isCartOpen: boolean;
    toggleCartMenu: () => void;
}

const Cart: React.FC<CartMenuProps> = ({ isCartOpen, toggleCartMenu }) => {

    useEffect(() => {
        if (isCartOpen) {
            disableScroll();
        } else {
            enableScroll();
        }

        return () => {
            enableScroll();
        };
    }, [isCartOpen]);

    return (
        <>
            <div
                className={`z-20 fixed top-10 right-0 h-full w-full sm:max-w-[500px] mx-auto transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out`}>
                <div className="p-4 bg-white rounded-lg shadow-4xl">
                    <i onClick={toggleCartMenu} className='sicon-cancel cursor-pointer p-0.5 bg-red-500 text-white rounded m-2'></i>
                    <div className="flex flex-col mb-6">
                        <h2 className="text-lg flex items-center justify-center gap-2">سلة المشتريات</h2>
                    </div>
                    <ul className="flex flex-col overflow-auto max-h-60">
                        {/* <!-- product-entry--mini --> */}
                        <li className="flex items-start ms:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100">
                            <a href="product-details.html" className="flex items-start justify-center gap-2 flex-1">
                                <img src={productImage1} className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden" alt="Product Thumb" />
                                <div className="flex flex-col flex-1 gap-1">
                                    <h4>سماعات apple AirPods Max</h4>
                                    <div className="flex items-center justify-start gap-2">
                                        <b className="ltr">x 2</b><span className="text-xs text-gray-500">2,250.00 SAR</span>
                                    </div>
                                </div>
                            </a>
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                                    <button className="shrink-0 px-2 text-md text-gray-500">+</button>
                                    <input type="number" value="2" className="w-[50px] flex-1 text-center appearance-none bg-transparent" />
                                    <button className="shrink-0 px-2 text-md text-gray-500">-</button>
                                </div>
                                <button type="button" className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1">
                                    <i className="sicon-trash"></i>
                                </button>
                            </div>
                        </li>
                        <li className="flex items-start ms:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100">
                            <a href="product-details.html" className="flex items-start justify-center gap-2 flex-1">
                                <img src={productImage2} className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden" alt="Product Thumb" />
                                <div className="flex flex-col flex-1 gap-1">
                                    <h4>سماعات apple AirPods Max</h4>
                                    <div className="flex items-center justify-start gap-2">
                                        <b className="ltr">x 2</b><span className="text-xs text-gray-500">2,250.00 SAR</span>
                                    </div>
                                </div>
                            </a>
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                                    <button className="shrink-0 px-2 text-md text-gray-500">+</button>
                                    <input type="number" value="2" className="w-[50px] flex-1 text-center appearance-none bg-transparent" />
                                    <button className="shrink-0 px-2 text-md text-gray-500">-</button>
                                </div>
                                <button type="button" className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1">
                                    <i className="sicon-trash"></i>
                                </button>
                            </div>
                        </li>
                        <li className="flex items-start ms:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100">
                            <a href="product-details.html" className="flex items-start justify-center gap-2 flex-1">
                                <img src={productImage3} className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden" alt="Product Thumb" />
                                <div className="flex flex-col flex-1 gap-1">
                                    <h4>سماعات apple AirPods Max</h4>
                                    <div className="flex items-center justify-start gap-2">
                                        <b className="ltr">x 2</b><span className="text-xs text-gray-500">2,250.00 SAR</span>
                                    </div>
                                </div>
                            </a>
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                                    <button className="shrink-0 px-2 text-md text-gray-500">+</button>
                                    <input type="number" value="2" className="w-[50px] flex-1 text-center appearance-none bg-transparent" />
                                    <button className="shrink-0 px-2 text-md text-gray-500">-</button>
                                </div>
                                <button type="button" className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1">
                                    <i className="sicon-trash"></i>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div className="flex items-center justify-between px-4 py-8 border-gray-100 border-t border-b-1">
                        <h3 className="font-bold text-xl">اجمالي السلة</h3>
                        <span className="text-xl font-bold">2,250.00 SAR</span>
                    </div>
                    <button type="button" className="w-full bg-primary text-white p-3 text-md rounded-md">اتمام عملية الدفع</button>
                </div>
            </div>
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleCartMenu}
                ></div>
            )}
        </>
    );
}

export default Cart;