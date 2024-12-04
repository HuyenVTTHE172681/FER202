import React from "react";
import { Button, Container } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllCourses from "../pages/AllCourses";
import CompletedCourses from "../pages/CompletedCourses";
import CourseDetail from "../pages/CourseDetail";
import CourseFormUpdate from "../pages/CourseFormUpdate";
import CourseFormAdd from "../pages/CourseFormAdd";

const Navbar = () => {
    return (
        // <nav>
        //     <ul>
        //         <li><Link to="/">Home</Link></li>
        //         <li><Link to="/all-courses">All Courses</Link></li>
        //         <li><Link to="/completed-courses">Completed Courses</Link></li>
        //         <li><Link to="/add-course">Add Course</Link></li>
        //     </ul>
        // </nav>
        <BrowserRouter>
            <Container className="justify-content-center">
                <div className="navButton">
                    <Link to="/home">
                        <Button variant="primary">Home</Button>{" "}
                    </Link>
                    <Link to="/all-courses">
                        <Button variant="danger">All Courses</Button>{" "}
                    </Link>
                    <Link to="/completed-courses">
                        <Button variant="warning">Completed Courses</Button>{" "}
                    </Link>
                    <Link to="/add-course">
                        <Button variant="success">Add Course</Button>
                    </Link>
                </div>
            </Container>
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/all-courses" element={<AllCourses />} />
                <Route exact path="/completed-courses" element={<CompletedCourses />} />
                <Route exact path="/course-detail/:id" element={<CourseDetail />} />
                <Route exact path="/add-course" element={<CourseFormAdd />} />
                <Route exact path="/update-course/:id" element={<CourseFormUpdate />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navbar;
