import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function ListRecipesAdd() {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRec, setSelected] = useState(null);
    const [newIngre, setNewIngre] = useState({ ingredients: "" });
    const [newRecipe, setNewRecipe] = useState({
        name: "",
        tags: [],
        ingredients: [],
        rating: 0
    });
    const [showAddForm, setShowAddForm] = useState(false);  // Control visibility of the add recipe form

    // Fetch data and filter recipes based on search
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
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchData();
    }, [search]);

    // Handle selecting a recipe to view its details
    const handleViewRec = (items) => {
        setSelected(items);
    };

    // Handle input change for adding an ingredient
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIngre({
            ...newIngre,
            [name]: value
        });
    };

    // Add ingredient to selected recipe
    const handleAddIngre = async (e) => {
        e.preventDefault();

        if (newIngre.ingredients.trim() === "") return; // Prevent adding empty ingredients

        const updateRecepie = {
            ...selectedRec,
            ingredients: [...selectedRec?.ingredients, newIngre?.ingredients]
        };

        try {
            const res = await axios.put(`http://localhost:9999/recipes/${selectedRec?.id}`, updateRecepie);

            // Update the recipes list with the modified recipe
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe.id === selectedRec.id ? res.data : recipe
                )
            );

            // Reset ingredient input
            setNewIngre({ ingredients: "" });
        } catch (err) {
            console.error("Error updating recipe:", err);
        }
    };

    // Handle deleting a recipe
    const handleDeleteRecipe = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/recipes/${id}`);
            // Remove the deleted recipe from the list
            setRecipes(recipes.filter((recipe) => recipe.id !== id));
            // Clear the selected recipe if it was deleted
            if (selectedRec?.id === id) {
                setSelected(null);
            }
        } catch (err) {
            console.error("Error deleting recipe:", err);
        }
    };

    // Handle adding a new recipe
    const handleAddNewRecipe = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:9999/recipes", newRecipe);
            // Add the new recipe to the list
            setRecipes([...recipes, res.data]);

            // Reset the newRecipe state
            setNewRecipe({
                name: "",
                tags: [],
                ingredients: [],
                rating: 0
            });

            // Hide the form after adding the recipe
            setShowAddForm(false);
        } catch (err) {
            console.error("Error adding new recipe:", err);
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
                {/* Recipe List */}
                <Col md={9}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Tags</th>
                                <th>Ingredient</th>
                                <th>Rating</th>
                                <th>Actions</th>
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
                                            <li style={{ listStyle: "none" }} key={index}>{r}</li>
                                        ))}</td>
                                        <td>{items?.rating}</td>
                                        <td>
                                            <Button onClick={() => handleViewRec(items)}>View Rec</Button>
                                            <Button onClick={() => handleDeleteRecipe(items.id)} variant="danger" style={{ marginLeft: "10px" }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No recipes found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>

                {/* Toggle Add New Recipe Form */}
                <Col md={3}>
                    <Button onClick={() => setShowAddForm(!showAddForm)} style={{ marginBottom: "20px" }}>
                        {showAddForm ? "Cancel" : "Add New Recipe"}
                    </Button>

                    {showAddForm && (
                        <div>
                            <h5>Add New Recipe</h5>
                            <Form onSubmit={handleAddNewRecipe}>
                                <Form.Group>
                                    <Form.Label>Recipe Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter recipe name"
                                        value={newRecipe.name}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter tags (comma separated)"
                                        value={newRecipe.tags.join(", ")}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, tags: e.target.value.split(",") })}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ingredients</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter ingredients (comma separated)"
                                        value={newRecipe.ingredients.join(", ")}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value.split(",") })}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter rating"
                                        value={newRecipe.rating}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, rating: parseInt(e.target.value) })}
                                    />
                                </Form.Group>
                                <Button type="submit" style={{ marginTop: "10px" }}>Add Recipe</Button>
                            </Form>
                        </div>
                    )}
                </Col>
            </Row>

            {/* Add Ingredients Section */}
            <Row className="mt-5">
                <Col md={3}>
                    {selectedRec ? (
                        <>
                            <h5>Selected Recipe: {selectedRec?.name}</h5>
                            <ul>
                                {selectedRec?.ingredients.map((r, index) => (
                                    <li key={index}>{r}</li>
                                ))}
                            </ul>
                            <Form.Control
                                type="text"
                                placeholder="Enter ingredient..."
                                value={newIngre.ingredients}
                                onChange={handleInputChange}
                            />
                            <Button onClick={handleAddIngre} style={{ marginTop: "10px" }}>Add Ingredient</Button>
                        </>
                    ) : (
                        <p>No recipe selected</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ListRecipesAdd;
