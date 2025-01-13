import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDoList from "./pages/ToDoList";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ToDoList />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
