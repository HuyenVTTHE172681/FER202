import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
