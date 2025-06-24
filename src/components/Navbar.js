import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-header">
                    <h2 className="brand">StreamList</h2>
                    <span className="material-icons menu-icon" onClick={toggleMenu}>
                        menu
                    </span>
                </div>

                {showMenu && (
                    <ul className="nav-links">
                        <li><span className="material-icons">home</span><Link to="/">Home</Link></li>
                        <li><span className="material-icons">movie</span><Link to="/movies">Movies</Link></li>
                        <li><span className="material-icons">shopping_cart</span><Link to="/cart">Cart</Link></li>
                        <li><span className="material-icons">info</span><Link to="/about">About</Link></li>
                    </ul>
                )}
            </nav>
        </>
    );
}
export default Navbar;