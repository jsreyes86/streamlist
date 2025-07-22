import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { GoogleOAuthProvider } from '@react-oauth/google';

serviceWorkerRegistration.register();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='838667728704-r8j8thushl0behsnu2097256vpqev09o.apps.googleusercontent.com'>
    <CartProvider>
      <App />
    </CartProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

 
reportWebVitals();
