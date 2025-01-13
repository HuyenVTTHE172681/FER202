import { useEffect } from "react"
import { useState } from "react"
import { Col, Table, Container, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import axios from 'axios';

function EmployeesList() {
    const [employee, setEmployee] = useState([]);
    const [department, setDepartment] = useState({});
    const { id } = useParams(); // Sử dụng useParams đ để lấy id trên url

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departmentApi = await axios.get(`http://localhost:9999/departments/${id}`);
                const employeeApi = await axios.get(`http://localhost:9999/employees?department=${id}`);

                // Cách 2: Thay vì dùng link http://localhost:9999/employees?department=${id}
                // - Dùng filter employee
                // - So sánh department trong employee với id trên url
                // let dataE = employeeApi.data.filter((e) => e.department == id);
                // - Sau đó set với dữ liệu trên api


                setDepartment(departmentApi.data);
                setEmployee(employeeApi.data);

                console.log("Emplaoyee: ", employeeApi.data);
                console.log("Department: ", departmentApi.data);


            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Container>
                <Row>
                    <h2 className="text-center my-3">List of Employee</h2>
                </Row>
                <Row>
                    <Link to="/">Home Page</Link>

                    <h4>DepartmentName: {department.name}</h4>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Employee Name</th>
                                    <th>Date of birth</th>
                                    <th>Gender</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>

                                {employee.map((e) => (
                                    <tr>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.dob}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.position}</td>
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

export default EmployeesList