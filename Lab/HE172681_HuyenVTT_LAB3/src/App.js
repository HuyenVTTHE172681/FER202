import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListRecipes from './components/listRecipes';
import ListRecipesAddIntegrient from './components/listRecipesAddIntegrient';
import ListRecipesAdd from './components/ListRecipesAdd';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Component add your recipes */}
                <Route path="/" element={<ListRecipes />}></Route>
                {/* Component add your integrients */}
                <Route path="/add-integrients" element={<ListRecipesAddIntegrient />}></Route>
                {/* Component add and delete recipes  */}
                <Route path="/add-delete-recipes" element={<ListRecipesAdd />}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App;