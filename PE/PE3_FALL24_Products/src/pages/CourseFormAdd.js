import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CourseFormAdd = () => {
    const [formData, setFormData] = useState({
        courseName: "",
        courseImage: "",
        percentLearning: 1,
        isCompleted: false,
        courseType: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Dynamically update isCompleted when percentLearning changes
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            isCompleted: prevData.percentLearning === 100,
        }));
    }, [formData.percentLearning]);

    // Validate input fields
    const validateForm = () => {
        const newErrors = {};

        // Validate courseName
        if (!formData.courseName || formData.courseName.split(" ").length < 2) {
            newErrors.courseName = "Course name must contain more than one word.";
        } else if (!/^[A-Z\s]+$/.test(formData.courseName)) {
            newErrors.courseName = "Course name must be in uppercase.";
        }

        // Validate courseImage
        // if (!formData.courseImage || !/^https?:\/\/.*\.(jpg|jpeg|png|webp|svg|gif)$/.test(formData.courseImage)) {
        //     newErrors.courseImage = "Invalid URL for the course image.";
        // }

        // Validate percentLearning
        if (formData.percentLearning < 1 || formData.percentLearning > 100) {
            newErrors.percentLearning = "Progress must be a number between 1 and 100.";
        }

        // Validate courseType
        if (!["Data Science", "Security", "Web/Design"].includes(formData.courseType)) {
            newErrors.courseType = "Please select a valid course type.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await axios.post("http://localhost:9999/courses", formData);
            alert("Course added successfully!");
            navigate("/all-courses");
        } catch (error) {
            console.error("Error adding course:", error.message);
            alert("Failed to add course.");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "percentLearning"
                ? value === "" ? "" : parseInt(value, 10) // Xử lý chuỗi rỗng
                : value,
        }));
    };

    return (
        <Container>
            <Row className="text-center py-3">
                <h2>Add Course</h2>
            </Row>
            <Form onSubmit={handleSubmit}>
                {/* Course Name */}
                <Form.Group controlId="courseName" className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                    />
                    {errors.courseName && <Alert variant="danger">{errors.courseName}</Alert>}
                </Form.Group>

                {/* Course Image */}
                <Form.Group controlId="courseImage" className="mb-3">
                    <Form.Label>Course Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="courseImage"
                        value={formData.courseImage}
                        onChange={handleChange}
                        required
                    />
                    {errors.courseImage && <Alert variant="danger">{errors.courseImage}</Alert>}
                </Form.Group>

                {/* Percent Learning */}
                <Form.Group controlId="percentLearning" className="mb-3">
                    <Form.Label>Progress (%)</Form.Label>
                    <Form.Control
                        type="number"
                        name="percentLearning"
                        value={formData.percentLearning}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        required
                    />
                    {errors.percentLearning && <Alert variant="danger">{errors.percentLearning}</Alert>}
                </Form.Group>

                {/* Course Type */}
                <Form.Group controlId="courseType" className="mb-3">
                    <Form.Label>Course Type</Form.Label>
                    <Form.Select
                        name="courseType"
                        value={formData.courseType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a type</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Security">Security</option>
                        <option value="Web/Design">Web/Design</option>
                    </Form.Select>
                    {errors.courseType && <Alert variant="danger">{errors.courseType}</Alert>}
                </Form.Group>

                {/* Is Completed */}
                <Form.Group controlId="isCompleted" className="mb-3">
                    <Form.Label>Completed</Form.Label>
                    <Form.Check
                        type="switch"
                        checked={formData.isCompleted}
                        label={formData.isCompleted ? "Yes" : "No"}
                        disabled
                    />
                </Form.Group>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "left",
                        textAlign: "center",
                        gap: "10px",
                    }}
                >
                    <Button variant="success" className="rounded-pill px-4 py-2 mb-4" type="submit">
                        Add Course
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="rounded-pill px-4 py-2 mb-4"
                        href="/home"
                    >
                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Back
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default CourseFormAdd;
