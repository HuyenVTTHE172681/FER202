import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectsList from "./pages/ProjectList";
import EmployeesList from "./pages/Employees";
import EditProject from "./pages/EditProject";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProjectsList />}></Route>
                    <Route path="/projects/edit/:id" element={<EditProject />}></Route>
                    <Route path="/departments/:id/employees" element={<EmployeesList />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
