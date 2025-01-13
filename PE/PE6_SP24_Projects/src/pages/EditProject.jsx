import { useEffect, useState } from "react";
import { Col, Row, Button, Container, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function EditProject() {
    const { id } = useParams();

    const [department, setDepartment] = useState([]); // Initialize as an array
    const [project, setProject] = useState({});
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        startDate: "",
        type: "",
        department: 1,
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const departmentApi = await axios.get(`http://localhost:9999/departments`);
                const projectApi = await axios.get(`http://localhost:9999/projects`);
                const projectIdApi = await axios.get(`http://localhost:9999/projects/${id}`);

                setDepartment(departmentApi.data); // Set departments array
                setProject(projectApi.data);
                setNewProject(projectIdApi.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchProject();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prevState) => ({
            ...prevState,
            [name]: value ,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9999/projects/${id}`, newProject);
            alert("Project updated successfully!");
        } catch (error) {
            console.error("Error updating project", error);
        }
    };

    return (
        <>
            <Container>
                <Row>
                    <h2 className="text-center my-3">Edit Project</h2>
                </Row>
                <Row>
                    <Link to="/">Home Page</Link>
                </Row>

                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="projectName">
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newProject?.name}
                                    onChange={handleChange}
                                    required
                                    className="mb-3"
                                />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={newProject?.description}
                                    onChange={handleChange}
                                    className="mb-3"
                                />
                            </Form.Group>
                            <Form.Group controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={newProject?.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="type">
                                <Form.Label className="my-3">Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="type"
                                    value={newProject?.type}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="department">
                                <Form.Label className="my-3">Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="department"
                                    value={newProject?.department}
                                    onChange={handleChange}
                                    required
                                >
                                    {department.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="my-3">
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EditProject;
