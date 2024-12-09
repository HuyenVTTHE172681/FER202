import { Container, Row, Col, Form, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";

function StudentList() {
    const [student, setStudent] = useState([]);
    const [subject, setSubject] = useState([]);
    const [studentDetail, setStudentDetail] = useState([]);
    const [search, setSearch] = useState("");
    // const navigate = useNavigate();
    // const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentAPI = await axios.get("http://localhost:9999/students");
                const studentDetailAPI = await axios.get("http://localhost:9999/student_details");
                const subjectAPI = await axios.get("http://localhost:9999/subjects");

                setStudentDetail(studentDetailAPI.data);
                setSubject(subjectAPI.data);

                let filteredStudents = studentAPI.data;

                // Filter by search term
                if (search.length > 0) {
                    filteredStudents = filteredStudents.filter((student) =>
                        student.name.toLowerCase().includes(search.toLowerCase())
                    );
                }

                setStudent(filteredStudents);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [search]);

    return (
        <Container>
            <Row className="text-center py-3">
                <h2>Students Management</h2>
            </Row>
            <Row className="justify-content-center py-3">
                <Col sm={8}>
                    <Form.Control
                        type="text"
                        aria-label="search"
                        placeholder="Enter student name to search..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                {/* Subject filter */}
                <Col md={3}>
                    <h5>Subjects</h5>
                    <ul>
                        {subject.map((c) => (
                            <li key={c.id}>
                                <Link>{c.name}</Link>
                            </li>
                        ))}
                    </ul>
                </Col>

                {/* Student List */}
                <Col md={9}>
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
                                <th>View Grades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.length > 0 ? (
                                student.map((student) => {
                                    const studentDetails = studentDetail.find(
                                        (detail) => detail.studentId === student.studentId
                                    );

                                    return (
                                        <tr key={student.id}>
                                            <td>{student.studentId}</td>
                                            <td>{student.name}</td>
                                            <td>{student.age}</td>
                                            <td>{studentDetails?.address?.street || "N/A"}</td>
                                            <td>{studentDetails?.address?.city || "N/A"}</td>
                                            <td>{student.isRegularStudent ? "Fulltime" : "Applicant"}</td>
                                            <td>
                                                <Link to={`/student/${student?.studentId}`}>View Grades</Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentList;
