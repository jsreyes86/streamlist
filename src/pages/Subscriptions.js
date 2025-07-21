import React, { useContext, useState } from "react";
import list from '../data/Data';
import { CartContext } from '../context/CartContext';
import './Subscriptions.css';

function Subscriptions() {
    const { cart, addToCart } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [warning, setWarning] = useState('');
    
    const filteredList = list.filter(item =>
        item.service.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

const handleAdd = (item) => {
    const isSubscription = item.id >= 1 && item.id <= 4;
    const alreadyHasSubscription = cart.some(cartItem => cartItem.id >= 1 && cartItem.id <= 4);

    if (isSubscription && alreadyHasSubscription) {
        setWarning("You can only add one subscription to your cart at a time.");
        setTimeout(() => setWarning(''), 3000);
        return;
    }
        addToCart(item);
    };


    return (
        <div className="subscriptions-container">
            <h1>Available Subscriptions & Products</h1>
            <input
                type="text"
                placeholder="Search subscriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {warning && <p className="warning">{warning}</p>}
            <div className="subscription-grid">
                {filteredList.map((item) => (
                    <div key={item.id} className="subscription-card">
                        <img src={item.img} alt={item.service} />
                        <h2>{item.service}</h2>
                        <p>{item.serviceInfo}</p>
                        <p><strong>${item.price.toFixed(2)}</strong></p>
                        <button onClick={() => handleAdd(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subscriptions;