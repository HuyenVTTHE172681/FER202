import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function ListRecipesAddIntegrient() {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRec, setSelected] = useState();
    const [newIngre, setNewIngre] = useState({
        ingredients: ""
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const recepiesAPI = await axios.get("http://localhost:9999/recipes");
                const usersAPI = await axios.get("http://localhost:9999/users");

                setRecipes(recepiesAPI.data);
                setUser(usersAPI.data);

                let filteredRecepies = recepiesAPI.data;

                // Filter by search term
                if (search.length > 0) {
                    filteredRecepies = filteredRecepies.filter((r) =>
                        r?.tags.some((tags) => tags.toLowerCase().includes(search.toLowerCase()))
                    );
                }

                setRecipes(filteredRecepies);
                console.log("Search:", search)

                console.log("Recepies filter: ", filteredRecepies);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [search]);

    console.log("Rêc: ", recipes)

    const handleViewRec = (items) => {
        setSelected(items);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIngre({
            ...newIngre,
            [name]: value
        })
    }

    const handleAddIngre = async (e) => {
        e.preventDefault();

        const updateRecepie = {
            ...selectedRec,
            ingredients: [...selectedRec?.ingredients, newIngre?.ingredients]
        };

        try {
            const res = await axios.put(`http://localhost:9999/recipes/${selectedRec?.id}`, updateRecepie);

            // Cập nhật danh sách recipes
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe.id === selectedRec.id ? res.data : recipe
                )
            );

            // Reset ô nhập liệu và state
            setNewIngre({
                ingredients: ""
            });
        } catch (err) {
            console.error("Error updating recipe:", err);
        }
    };




    return (
        <Container>
            <Row className="text-center py-3">
                <h2>Recipes Management</h2>
            </Row>
            <Row className="justify-content-center py-3">
                <Col sm={8}>
                    <Form.Control
                        type="text"
                        aria-label="search"
                        placeholder="Enter tag to search..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                {/* Student List */}
                <Col md={9}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Tags</th>
                                <th>Ingredient</th>
                                <th>Rating</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.length > 0 ? (
                                recipes.map((items) => (
                                    <tr key={items?.id}>
                                        <td>{items?.id}</td>
                                        <td>{items?.name}</td>
                                        <td>{items?.tags.map((t, index) => (
                                            <li style={{ listStyle: "none" }} key={index}>{t}</li>
                                        ))}</td>
                                        <td>{items?.ingredients.map((r, index) => (
                                            <li style={{ listStyle: "none" }} key={index}> {r}</li>
                                        ))}</td>
                                        <td>{items?.rating}</td>
                                        <td>
                                            <Button onClick={() => handleViewRec(items)}>View Rec</Button>
                                        </td>
                                    </tr>
                                ))
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

                {/* Subject filter */}
                <Col md={3} >
                    <h5>Ingredients List</h5>
                    {selectedRec ? (
                        <>

                            <ul>
                                <li style={{ listStyle: "none" }}>Id: {selectedRec?.id}</li>
                                <li style={{ listStyle: "none" }}>Name: {selectedRec?.name}</li>
                            </ul>
                            <div>
                                Add a new Ingredient
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter ingredient..."
                                    name="ingredients"
                                    value={newIngre.ingredients}
                                    onChange={handleInputChange}
                                />
                                <Button style={{ marginTop: "4px" }} onClick={handleAddIngre}>Add</Button>
                            </div>
                        </>
                    ) : (<>No items</>)
                    }

                </Col>
            </Row>
        </Container>
    );
}

export default ListRecipesAddIntegrient;
