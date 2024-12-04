import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteCourse } from '../utils/deleteCourse';

const Home = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9999/courses')
            .then(response => {
                const filteredCourses = response.data.filter(course => !course.isCompleted || course.percentLearning < 100);
                setCourses(filteredCourses);
                console.log("Data courses in Home with filter", response.data, filteredCourses);
            });
    }, []);

    return (
        <Container>
            <Row className="text-center py-3">
                <h2>Home Courses</h2>
            </Row>
            <Row>
                <Col md={12}>
                    {courses.length > 0 ? (
                        <>
                            <Row>
                                {courses?.map((items) => {
                                    return (
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
                                                        src={items?.courseImage}
                                                        alt={items.name}
                                                    />
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title>{items?.courseName}</Card.Title>
                                                    <Card.Text>
                                                        Type: {items?.courseType}
                                                        <br />
                                                        Progress: {items?.percentLearning}%
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
                                                            onClick={() => deleteCourse(items.id, setCourses)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </>
                    ) : (<p>Loading...</p>)}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
