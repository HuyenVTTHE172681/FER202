import { useEffect, useState } from 'react';
import { Container, Col, Row, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [department, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departmentApi = await axios.get("http://localhost:9999/departments");
                const projectApi = await axios.get("http://localhost:9999/projects");

                setDepartment(departmentApi.data);
                setProjects(projectApi.data);

                let filteredProjects = projectApi.data;

                if (selectedDepartment !== "all") {
                    filteredProjects = filteredProjects.filter((project) => project.department == selectedDepartment);
                }
                console.log("Selecte department: ", selectedDepartment);

                setProjects(filteredProjects);

            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [selectedDepartment]);

    return (
        <>
            <Container>
                <h2 className='text-center my-3'>List of Project</h2>
                <Row>
                    <Col xs={3}>
                        <h2>
                            Departments
                        </h2>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="radio" label="All" name="dept" value="all" onChange={(e) => setSelectedDepartment(e.target.value)} />
                            {department.map(d => (
                                <Form.Check type="radio" label={d.name} name="dept" value={d.id} onChange={(e) => setSelectedDepartment(e.target.value)} />
                            ))}
                        </Form.Group>
                    </Col>
                    <Col xs={9}>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Project Name</th>
                                    <th>Description</th>
                                    <th>StartDate</th>
                                    <th>Type</th>
                                    <th>DepartmentName</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((pd, index) => (
                                    <tr key={index}>
                                        <td>{pd?.id}</td>
                                        <td>{pd?.name}</td>
                                        <td>{pd?.description}</td>
                                        <td>{pd?.startDate}</td>
                                        <td>{pd?.type}</td>
                                        <td>
                                            <Link to={`/departments/${pd?.department}/employees`}>{department.find(d => d?.id == pd?.department)?.name}</Link>
                                        </td>
                                        <td>
                                            <Link to={`/projects/edit/${pd?.id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProjectsList