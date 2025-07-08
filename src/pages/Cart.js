import React, { useContext} from "react";
import { CartContext } from "../context/CartContext";
import "../pages/Cart.css";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const handleQuantityChange = (itemId, e) => {
        const quantity = parseInt(e.target.value, 10);
if (isNaN(quantity) || quantity < 1) {
    removeFromCart(itemId);
} else {
    updateQuantity(itemId, quantity);
}
    };

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);
   
    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p> Your cart is empty.</p>
            ) : (
                <>
                                    <div className="cart-items">
                                        {cart.map((item) => (
                                            <div key={item.id} className="cart-item">
                                                <img src={item.img} alt={item.service} />
                                                <div className="cart-details">
                                                    <h3>{item.service}</h3>
                                                    <p>{item.serviceInfo}</p>
                                                    <p><strong>${item.price.toFixed(2)}</strong></p>
                                                    <div className="quantity-control">
                                                        <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                                                        <input
                                                            type="number"
                                                            id={`quantity-${item.id}`}
                                                            value={item.quantity || 1}
                                                            onChange={(e) => handleQuantityChange(item.id, e)}
                                                            min="1"
                                                        />
                                                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <h2 className="total-price">
                                        Total Price: ${totalPrice.toFixed(2)}
                                    </h2>
                                </>
                            )}
                        </div>
                    );
}
export default Cart;
