import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import Cart from './pages/Cart';
import About from './pages/About';
import MovieSearch from './pages/MovieSearch';
import Subscriptions from './pages/Subscriptions';
import { CartProvider } from './context/CartContext';
import './App.css';


function App() {
  return (

<CartProvider>
<Router>
  <Navbar />
  <div className="container">
    <Routes>
      <Route path="/" element={<StreamList />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<MovieSearch />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
      </div>
      </Router>
</CartProvider>
  );
}

export default App;
