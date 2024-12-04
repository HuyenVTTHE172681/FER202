import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllCourses = () => {
    // State để lưu danh sách tất cả khóa học và khóa học đã lọc
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]); // State lưu loại khóa học được chọn

    // Lấy dữ liệu về các khóa học
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9999/courses");
                setCourses(response.data);
                setFilteredCourses(response.data); // Mặc định hiển thị tất cả khóa học
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // Lọc khóa học dựa trên loại được chọn
    useEffect(() => {
        if (selectedTypes.length === 0) {
            setFilteredCourses(courses); // Nếu không chọn loại nào, hiển thị tất cả
        } else {
            const filtered = courses.filter((course) =>
                selectedTypes.includes(course.courseType)
            );
            setFilteredCourses(filtered);
        }
    }, [selectedTypes, courses]);

    // Xử lý khi checkbox thay đổi
    const handleCheckboxChange = (type) => {
        setSelectedTypes((prevSelected) =>
            prevSelected.includes(type)
                ? prevSelected.filter((t) => t !== type) // Bỏ loại nếu đã chọn trước đó
                : [...prevSelected, type] // Thêm loại mới
        );
    };
    console.log("Selected Types:", selectedTypes);

    // Xóa khóa học
    const deletedCourse = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        axios.delete(`http://localhost:9999/courses/${id}`).then(() => {
            setCourses(courses.filter((course) => course.id !== id));
        });
    };

    return (
        <Container>
            <Row className="text-center py-3">
                <h2>All Courses</h2>
            </Row>
            <Row>
                {/* Bộ lọc loại khóa học */}
                <Col md={2}>
                    <h5>Type of Course</h5>
                    <Form>
                        {["Data Science", "Security", "Web/Design"].map((type) => (
                            <Form.Check
                                key={type}
                                type="checkbox"
                                label={type}
                                onChange={() => handleCheckboxChange(type)}
                                checked={selectedTypes.includes(type)}
                            />
                        ))}
                    </Form>
                </Col>

                {/* Hiển thị danh sách khóa học */}
                <Col md={10}>
                    {filteredCourses.length > 0 ? (
                        <Row>
                            {filteredCourses.map((items) => (
                                <Col
                                    sm={4}
                                    md={3}
                                    key={items.id}
                                    style={{ padding: "20px" }}
                                >
                                    <Card>
                                        <Link to={`/course-detail/${items.id}`}>
                                            <Card.Img
                                                variant="top"
                                                src={items.courseImage}
                                                alt={items.courseName}
                                            />
                                        </Link>
                                        <Card.Body>
                                            <Card.Title>{items.courseName}</Card.Title>
                                            <Card.Text>
                                                Type: {items.courseType}
                                                <br />
                                                Progress: {items.percentLearning}%
                                            </Card.Text>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    textAlign: "center",
                                                    gap: "10px",
                                                }}
                                            >
                                                <Button
                                                    className="btn btn-primary"
                                                    href={`/course-detail/${items.id}`}
                                                >
                                                    View Detail
                                                </Button>
                                                <Button
                                                    className="btn btn-danger"
                                                    onClick={() => deletedCourse(items.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No courses match the selected filter.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AllCourses;
