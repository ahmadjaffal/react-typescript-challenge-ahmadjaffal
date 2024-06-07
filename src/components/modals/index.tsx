import React from "react";
import Login from "../login";
import Cart from "../cart";

interface ModalsProps {
    isLoginOpen: boolean;
    isCartOpen: boolean;
    toggleLoginMenu: () => void;
    toggleCartMenu: () => void;
}

const Modals: React.FC<ModalsProps> = ({ isLoginOpen, toggleLoginMenu, isCartOpen, toggleCartMenu }) => {
    return (
        <>
            <Login
                isLoginOpen={isLoginOpen}
                toggleLoginMenu={toggleLoginMenu}
            />
            <Cart
                isCartOpen={isCartOpen}
                toggleCartMenu={toggleCartMenu}
            />
        </>
    );
}

export default Modals;