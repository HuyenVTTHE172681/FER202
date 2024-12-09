import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentGrades() {
    const [student, setStudent] = useState([]);
    const [subject, setSubject] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [evaluations, setEvaluations] = useState([]);
    const [newGrade, setNewGrade] = useState("");
    const [newExplanation, setNewExplanation] = useState("");

    const id = window.location.pathname.split("/")[2];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentAPI = await axios.get("http://localhost:9999/students");
                const evaluationAPI = await axios.get("http://localhost:9999/evaluations?studentId=" + id);
                const subjectAPI = await axios.get("http://localhost:9999/subjects");

                setEvaluations(evaluationAPI.data);
                console.log("Evaluations before: ", evaluationAPI.data);
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

    // console.log("Students: ", student)
    // console.log("Evaluations: ", evaluations)
    // console.log("Student Id: ", student.map((s) => s.studentId))
    // console.log("Evaluations: ", evaluations.map((e) => e.studentId))

    const backtoHome = () => {
        navigate("/");
    }

    const handleAddGrade = async () => {
        if (!newExplanation || !newGrade) {
            alert("Please fill in all fields.");
        } else {

            try {
                const studentID = window.location.pathname.split("/")[2];
                console.log("Student ID: ", studentID);


                const newEvaluation = {
                    studentID,
                    grade: parseFloat(newGrade),
                    additionalExplanation: newExplanation
                };

                // Gửi request để thêm điểm vào database
                await axios.post("http://localhost:9999/evaluations", newEvaluation);
                console.log("Grade new: ", newEvaluation);
                alert("Grade added successfully!");

                // Reset form
                setNewGrade("");
                setNewExplanation("");

                // Reload lại dữ liệu từ API
                const evaluationAPI = await axios.get("http://localhost:9999/evaluations?studentId=" + id);
                setEvaluations(evaluationAPI.data);
                console.log("Evaluations after: ", evaluationAPI.data);
            } catch (error) {
                console.log(error);
            }
        }

    }

    // const evaluationStudent = evaluations.filter(evaluation => evaluation.studentId == id).map((e) => e);
    // console.log("evaluationStudent", evaluationStudent)

    const studentEvaluations = student.filter(student => student.studentId == id).map((s) => s.name);
    console.log("studentEvaluations", studentEvaluations)


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
                    <Row>
                        <Col md={2}>
                            {/* <Button variant="success" onClick={() => window.location.href = "/"}>Back to Home</Button> */}
                            <Button variant="success" onClick={backtoHome}>Back to Home</Button>
                        </Col>
                    </Row>
                    <Row className="py-3">
                        <h5 className="text-center">{studentEvaluations}'s Grade Details: </h5>
                    </Row>
                    <h6>Add new grade</h6>
                    <Row className="mb-3">
                        <Col md={5}>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Enter grade"
                                value={newGrade}
                                onChange={(e) => setNewGrade(e.target.value)}
                            />
                        </Col>
                        <Col md={5}>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter additional explanation"
                                value={newExplanation}
                                onChange={(e) => setNewExplanation(e.target.value)}
                            />
                        </Col>
                        <Col md={2}>
                            <Button onClick={handleAddGrade}>Add new</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Grade</th>
                                    <th>Explanation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluations.length > 0 ? (
                                    evaluations.map((e) => {
                                        return (
                                            <tr key={e.id}>
                                                <td>{e?.grade || "N/A"}</td>
                                                <td>{e?.additionalExplanation || "N/A"}</td>
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
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentGrades;
