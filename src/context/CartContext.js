// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cartItems')
        return savedCart ? JSON.parse(savedCart) : [];
    });
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const isSubscription = item.id >= 1 && item.id <= 4;
        const alreadyHasSubscription = cart.some(cartItem => cartItem.id >= 1 && cartItem.id <= 4);
        if (isSubscription && alreadyHasSubscription) {
            alert('You can only add one subscription to your cart at a time.');
            return;
        }
        
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            const updatedCart = cart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCart(cart.map(item =>
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}