import Button from 'react-bootstrap/Button';
import { Container, Col, Row, Form, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
function ToDoList() {
    const [todo, setToDo] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const todoApi = await axios.get("http://localhost:9999/todo");
                const userApi = await axios.get("http://localhost:9999/user");

                setToDo(todoApi.data);
                setUser(userApi.data);

                console.log(user)

                let filteredToDos = todoApi.data;

                if (selectedUser !== '') {
                    filteredToDos = filteredToDos.filter((todo) =>
                        todo.userId == selectedUser
                    );
                }

                if (completed !== "all") {
                    filteredToDos = filteredToDos.filter((todo) =>
                        completed === "completed" ? todo.completed : !todo.completed
                    );
                }

                // filteredToDos = filteredToDos.sort((a, b) => a.title.localeCompare(b.title));

                setToDo(filteredToDos);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [selectedUser, completed]);

    const handleSortByTitle = () => {
        const sortedTodos = [...todo].sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        })
        setToDo(sortedTodos);
    };

    const handleChangeStatus = (id) => {
        const updateTodoData = todo.map((todo) => {
            if (todo.id == id) {
                const updateToDo = { ...todo, completed: !todo.completed }
                return updateToDo
            }
            return todo;
        })
        setToDo(updateTodoData);
        window.alert("Change status successfully!");
    }
    return (
        <>
            <Container>
                <Row>
                    <Col className='mx-5'>
                        <Row>
                            <h2 className="text-center my-3">TODO LIST</h2>
                            <div className='d-flex align-items-center'>
                                <h4 className='mr-2'>Sort:</h4>
                                <Button variant="primary" onClick={handleSortByTitle}>Ascending by Title</Button>
                            </div>
                        </Row>
                        <Row className='my-5'>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>User</th>
                                        <th>Completed</th>
                                        <th>Change status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todo.length > 0 ? (todo.map((todo, index) =>
                                        <tr key={index}>
                                            <td>{todo?.id}</td>
                                            <td>{todo?.title}</td>
                                            <td>{user.find((user) => user?.id == todo?.userId)?.name}</td>
                                            <td style={{ color: todo?.completed ? "green" : "red" }}>
                                                {todo?.completed ? "Completed" : "Unfinished"}
                                            </td>
                                            <td>
                                                <Button variant="success" onClick={() => handleChangeStatus(todo?.id)}>Change</Button>
                                            </td></tr>)
                                    ) : (
                                        <>No item</>
                                    )}
                                </tbody>
                            </Table>
                        </Row>

                    </Col>
                    <Col md={2} className="d-none d-sm-block">
                        <h5>User</h5>
                        <Form>
                            <Form.Group className="mb-4">
                                {user.map((user) => (
                                    <Form.Check className="mt-3"
                                        type="checkbox"
                                        label={user?.name}
                                        value={user?.id}
                                        onChange={(e) => setSelectedUser(e.target.value)}
                                    />
                                ))}
                            </Form.Group>
                        </Form>
                        <h5>Completed</h5>
                        <Form.Check className="mt-3"
                            label="Finished"
                            type="radio"
                            name="status"
                            value="completed"
                            onChange={(e) => setCompleted(e.target.value)}
                        />
                        <Form.Check className="mt-3"
                            label="Unfinished"
                            type="radio"
                            name="status"
                            value="unfinished"
                            onChange={(e) => setCompleted(e.target.value)}
                        />
                        <Form.Check className="mt-3"
                            label="All"
                            type="radio"
                            name="status"
                            value="all"
                            defaultChecked
                            onChange={(e) => setCompleted(e.target.value)}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ToDoList