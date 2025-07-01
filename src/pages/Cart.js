import React from "react";

function Cart() {
    return (
        <div className="cart-container">
            <h1>Cart Page</h1>
            <p>Your cart is currently empty.</p>
            <p>Browse our <a href="/movies">movies</a> to add items to your cart.</p>
        </div>
    );
}
export default Cart;
