import React, { useState, useEffect } from "react";
import './CreditCards.css';

function CreditCards() {
  const [creditCards, setCreditCards] = useState([]);
    const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  useEffect(() => {
    const storedCards = localStorage.getItem("creditCards") || "[]";
    setCreditCards(JSON.parse(storedCards));
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "expirationDate") {
      value = value.replace(/\D/g, '').slice(0, 4);
        if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
    }
    if (name === "cardNumber") {
      value = value.replace(/\D/g, '').slice(0, 16);
    }
     if (name === "cvv") {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedCard = {
  ...form,
  cardNumber: form.cardNumber.replace(/\D/g, '') // Store plain digits only
};

    const newCards = [...creditCards, formattedCard];
    setCreditCards(newCards);
    localStorage.setItem("creditCards", JSON.stringify(newCards));
    setForm({
      name: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    });
  };

  const handleDelete = (index) => {
    const updated = creditCards.filter((_, i) => i !== index);
    setCreditCards(updated);
    localStorage.setItem("creditCards", JSON.stringify(updated));
  };
  
  return (
<div className="credit-card-container">
      <h2>Manage Credit Cards</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Cardholder Name"
          required
        />
        <input
          type="password"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          required
          maxLength="19"
        />
        <input
          name="expirationDate"
          value={form.expirationDate}
          onChange={handleChange}
          placeholder="MM/YY"
          required
          maxLength="5"
        />
        <input
          name="cvv"
          value={form.cvv}
          onChange={handleChange}
          placeholder="CVV"
          required
          maxLength="4"
        />
        <button type="submit">Save Card</button>
      </form>


      <div className="card-list">
        {creditCards.map((card, idx) => (
          <div className="card-item" key={idx}>
            <div>
              <p><strong>{card.name}</strong></p>
              <p>**** **** **** {card.cardNumber && card.cardNumber.slice(-4)}</p>
              <p>Expires: {card.expirationDate}</p>
            </div>
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreditCards;
