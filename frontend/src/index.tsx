// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Optional: for any custom global styles

// Get the root DOM element where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the main App component into the root element
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);