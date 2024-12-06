import { Container, Row, Col, Form, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function StudentList() {
    const [student, setStudent] = useState([]);
    const [subject, setSubject] = useState([]);
    const [studentDetail, setStudentDetail] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Lấy dữ liệu về các khóa học
    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentAPI = await axios.get("http://localhost:9999/students");
                const studentDetailAPI = await axios.get("http://localhost:9999/student_details");
                const subjectAPI = await axios.get("http://localhost:9999/subjects");

                setStudent(studentAPI.data);
                setStudentDetail(studentDetailAPI.data);
                setSubject(subjectAPI.data);

                let filteredStudents = studentAPI.data;

                console.log("Student:", studentAPI.data);
                console.log("Subject:", subjectAPI.data);
                console.log("Student Detail: ", studentDetailAPI.data);

                if (search.length > 0) {
                    filteredStudents = filteredStudents.filter((student) => student.name.toLowerCase().includes(search.toLowerCase()));
                    console.log(filteredStudents);
                }

                setStudent(filteredStudents);

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [search, navigate]);


    console.log("Search name: ", search);
    console.log("Student: ", student);
    return (
        <>
            <Container>
                <Row className="text-center py-3">
                    <h2>Students Management</h2>
                </Row>
                <Row>
                    <Col sm={6} className="d-flex justify-content-center">
                        <Form.Control
                            type='text'
                            aria-label='search'
                            placeholder='Enter student name to search...'
                            style={{ width: '600px' }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    {/* Bộ lọc loại khóa học */}
                    <Col md={2}>
                        <div>
                            <h5>Subjects</h5>
                            {subject.map((c) => (
                                <Link >{c?.name}</Link>
                            ))}
                        </div>
                    </Col>

                    <Col md={10}>
                        <h5>List of Students</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>StudentId</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>IsRegularStudent</th>
                                    <th>View grades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.length > 0 ? (
                                    student.map((student) => {
                                        // Tìm chi tiết của sinh viên dựa trên studentId
                                        const studentDetails = studentDetail.find(
                                            (detail) => detail?.studentId === student?.studentId
                                        );

                                        return (
                                            <tr key={student?.id}>
                                                <td>{student?.studentId}</td>
                                                <td>{student?.name}</td>
                                                <td>{student?.age}</td>
                                                <td>{studentDetails?.address?.street || "N/A"}</td>
                                                <td>{studentDetails?.address?.city || "N/A"}</td>
                                                <td>
                                                    {student?.isRegularStudent ? "Fulltime" : "Applicant"}
                                                </td>
                                                <td>
                                                    <Link>View Grades</Link>

                                                </td>

                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No jobs available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StudentList;