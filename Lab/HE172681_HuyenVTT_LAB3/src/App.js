import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListRecipes from './components/listRecipes';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListRecipes />}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App;