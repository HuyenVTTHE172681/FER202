import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListMovie from "./pages/ListMovies";
import Star from "./pages/Star";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/movie" element={<ListMovie />}></Route>
                    <Route path="/movie/:id/add-star" element={<Star />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
