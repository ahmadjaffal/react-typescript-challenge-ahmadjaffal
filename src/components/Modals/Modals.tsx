import React from "react";
import Login from "../Login/Login";
import Cart from "../Cart/Cart";

/**
 * Props for the Modals component.
 */
interface ModalsProps {
    isLoginOpen: boolean;           // Indicates whether the Login modal is open
    isCartOpen: boolean;            // Indicates whether the Cart modal is open
    toggleLoginMenu: () => void;    // Callback to toggle the Login modal
    toggleCartMenu: () => void;     // Callback to toggle the Cart modal
}

/**
 * Modals component to render Login and Cart modals based on their respective open states.
 */
const Modals: React.FC<ModalsProps> = ({ isLoginOpen, toggleLoginMenu, isCartOpen, toggleCartMenu }) => {
    return (
        <>
            {/* Render the Login modal if isLoginOpen is true */}
            <Login
                isLoginOpen={isLoginOpen}
                toggleLoginMenu={toggleLoginMenu}
            />
            {/* Render the Cart modal if isCartOpen is true */}
            <Cart
                isCartOpen={isCartOpen}
                toggleCartMenu={toggleCartMenu}
            />
        </>
    );
}

export default Modals;
