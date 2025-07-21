import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
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
                        <li><span className="material-icons">home</span><Link to="/" onClick={() => setShowMenu(false)}>Home</Link></li>
                        <li><span className="material-icons">movie</span><Link to="/movies" onClick={() => setShowMenu(false)}>Movies</Link></li>
                        <li><span className="material-icons">info</span><Link to="/about" onClick={() => setShowMenu(false)}>About</Link></li>
                        <li><span className="material-icons">search</span><Link to="/search" onClick={() => setShowMenu(false)}>Search</Link></li>
                        <li><span className="material-icons">subscriptions</span><Link to="/subscriptions" onClick={() => setShowMenu(false)}>Subscriptions</Link></li>
                    </ul>
                )}
            </nav>
        </>
    );
}
export default Navbar;