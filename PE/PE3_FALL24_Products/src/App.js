import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductsList />}></Route>
                    <Route path="/product/:id" element={<ProductDetails />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
