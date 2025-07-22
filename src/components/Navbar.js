import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import './Navbar.css';

function Navbar({ onLogout }) {
    const [showMenu, setShowMenu] = useState(false);
    const { cart } = useContext(CartContext);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-header">
<Link to="/" className="brand">
                        <h2>StreamList</h2>
                    </Link>

                   <div className="nav-icons">
  <Link to="/cart" className="cart-icon">
    <span className="material-icons">shopping_cart</span>
    <span className="cart-count">(
      {cart.reduce((total, item) => total + item.quantity, 0)}
    )</span>
  </Link>

  <span className="material-icons menu-icon" onClick={toggleMenu}>
    menu
  </span>
</div>

                </div>

                {showMenu && (
                    <ul className="nav-links">
                        <li onClick={() => setShowMenu(false)}>
                            <span className="material-icons">home</span>
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={() => setShowMenu(false)}>
                            <span className="material-icons">movie</span>
                            <Link to="/movies">Movies</Link>
                        </li>
                        <li onClick={() => setShowMenu(false)}>
                            <span className="material-icons">info</span>
                            <Link to="/about">About</Link>
                        </li>
                        <li onClick={() => setShowMenu(false)}>
                            <span className="material-icons">search</span>
                            <Link to="/search">Search</Link>
                        </li>
                        <li onClick={() => setShowMenu(false)}>
                            <span className="material-icons">subscriptions</span>
                            <Link to="/subscriptions">Subscriptions</Link>
                        </li>

                        {/* Logout Option */}
                        <li onClick={() => { onLogout(); setShowMenu(false); }} style={{ cursor: "pointer" }}>
                            <span className="material-icons">logout</span>
                            Logout
                        </li>
</ul>
                )}
            </nav>
        </>
    );
}
export default Navbar;