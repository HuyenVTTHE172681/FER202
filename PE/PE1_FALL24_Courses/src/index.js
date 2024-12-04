//File src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

// Thiết lập baseURL mặc định
axios.defaults.baseURL = "http://localhost:9999";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
