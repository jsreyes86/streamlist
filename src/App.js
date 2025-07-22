import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import Cart from './pages/Cart';
import About from './pages/About';
import Login from './pages/Login';
import GlobalSearch from './pages/GlobalSearch';
import Subscriptions from './pages/Subscriptions';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import CreditCards from './pages/CreditCards';
import './App.css';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (

<CartProvider>
      <Router>
        <Navbar onLogout={handleLogout} />
        <div className="container">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <StreamList />
              </ProtectedRoute>
            } />

            <Route path="/movies" element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            } />

            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />

            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />

            <Route path="/search" element={
              <ProtectedRoute>
                <GlobalSearch />
              </ProtectedRoute>
            } />

            <Route path="/subscriptions" element={
              <ProtectedRoute>
                <Subscriptions />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={<CreditCards />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}


export default App;
