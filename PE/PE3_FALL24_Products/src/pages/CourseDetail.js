import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProgressBar from "../Components/ProgressBar";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:9999/courses/${id}`).then((response) => {
            setCourse(response.data);
            console.log("Data course: ", response.data);
        });
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <>
            <Container fluid className="py-5 mt-5">
                <Container className="py-5">
                    <Row className="g-4 mb-5">
                        <Col lg={8} xl={9}>
                            <Row className="g-4">
                                <Col lg={6}>
                                    <div className="border rounded" style={{ overflow: "hidden" }}>
                                        <img
                                            src={course.courseImage}
                                            className="img-fluid rounded"
                                            alt={course.courseName}
                                            style={{ width: "100%", height: "390px" }}
                                        />
                                    </div>
                                </Col>

                                <Col lg={6}>
                                    <h4 className="fw-bold mb-3">{course.courseName}</h4>
                                    <p className="mb-3">Type: {course.courseType}</p>
                                    <p className="mb-3">Progress: <strong>{course.percentLearning}%</strong> </p>
                                    <p className="mb-3">Progress: <ProgressBar progress={course.percentLearning} /></p>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "left",
                                            textAlign: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <Button
                                            variant="success"
                                            className="rounded-pill px-4 py-2 mb-4"
                                            href={`/update-course/${course.id}`}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            className="rounded-pill px-4 py-2 mb-4"
                                            href="/home"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Back
                                        </Button>
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>


    );
};

export default CourseDetail;
