import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

function ListRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState(""); // Trạng thái search
    const [sortRating, setSortRating] = useState(""); // Trạng thái sắp xếp
    // const [selectedRec, setSelected] = useState(); // Trạng thái view recipes
    // const [newIngre, setNewIngre] = useState({ ingredients: "" });
    const [yourRecipes, setYourRecipes] = useState([]);

    // Lấy dữ liệu và filter
    useEffect(() => {
        const fetchData = async () => {
            try {
                const recepiesAPI = await axios.get("http://localhost:9999/recipes");
                const usersAPI = await axios.get("http://localhost:9999/users");

                setUser(usersAPI.data);

                let filteredRecepies = recepiesAPI.data;

                // Lọc recipes theo giá trị search (tags)
                if (search.length > 0) {
                    filteredRecepies = filteredRecepies.filter((r) =>
                        r?.tags.some((tags) => tags.toLowerCase().includes(search.toLowerCase()))
                    );
                }

                // Lọc recipes theo giá trị search (name)
                // if (search.length > 0) {
                //     filteredRecepies = filteredRecepies.filter((r) =>
                //         r.name.toLowerCase().includes(search.toLowerCase())
                //     );
                // }

                // Sắp xếp theo giá trị sortRating
                if (sortRating === "asc") {
                    filteredRecepies.sort((a, b) => a.rating - b.rating);
                } else if (sortRating === "desc") {
                    filteredRecepies.sort((a, b) => b.rating - a.rating);
                }

                setRecipes(filteredRecepies);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [search, sortRating]);

    const handleAddYourRecipe = (item) => {
        // Kiểm tra nếu công thức chưa tồn tại trong mảng
        if (!yourRecipes.some((r) => r.id === item.id)) {
            setYourRecipes((prev) => [...prev, item]);
            console.log("Your recipes:", yourRecipes);
        } else {
            alert("Recipe already exists!");
        }
    };

    // useEffect(() => {
    //     console.log("Updated yourRecipes:", yourRecipes);
    // }, [yourRecipes]);

    const handleRemoveRecipe = (id) => {
        setYourRecipes(yourRecipes.filter((r) => r.id !== id));
    }

    // const handleSaveYourRecipes = async () => {
    //     try {
    //         if (yourRecipes.length === 0) {
    //             alert("No recipes to save!");
    //             return;
    //         }

    //         // Tạo ID tự tăng dựa trên danh sách recipes hiện tại
    //         const newRecipes = yourRecipes.map((recipe, index) => ({
    //             ...recipe,
    //             id: yourRecipes.length + index + 1, // ID tự tăng
    //         }));

    //         // Gửi từng công thức lên API
    //         for (const recipe of newRecipes) {
    //             await axios.post("http://localhost:9999/your_recipes", recipe);
    //         }

    //         // Cập nhật danh sách recipes
    //         setRecipes((prev) => [...prev, ...newRecipes]);

    //         // Xóa danh sách yourRecipes sau khi lưu
    //         setYourRecipes([]);
    //         alert("Recipes saved successfully!");
    //         console.log("Saved recipes:", newRecipes);
    //     } catch (error) {
    //         console.error("Error saving recipes:", error.message);
    //         alert("Failed to save recipes.");
    //     }
    // };

    const handleSaveYourRecipes = async () => {
        try {
            if (yourRecipes.length === 0) {
                alert("No recipes to save!");
                return;
            }

            // Prepare the payload for `your_recipes` with the `recipe` key
            const payload = {
                id: `${new Date().getTime()}`, // Generate a unique ID for the your_recipes entry
                recipe: yourRecipes, // Attach the array of recipes under `recipe`
            };

            // Send the payload to the API
            await axios.post("http://localhost:9999/your_recipes", payload);

            // Clear the `yourRecipes` state and notify the user
            setYourRecipes([]);
            alert("Recipes saved successfully!");
            console.log("Saved recipes:", payload);
        } catch (error) {
            console.error("Error saving recipes:", error.message);
            alert("Failed to save recipes.");
        }
    };



    return (
        <Container>
            <Row className="text-center py-3">
                <h2>Recipes Management</h2>
            </Row>
            <Row className="justify-content-center py-3">
                <Col sm={2}>
                    <Form.Select aria-label="Sort by rating" onChange={(e) => setSortRating(e.target.value)}>
                        <option value="default">Sort by rating</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Form.Select>
                </Col>
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
                                            {/* <Button onClick={() => setSelected(items)}>View Rec</Button> */}
                                            <br />
                                            <Button className="mt-2" onClick={() => handleAddYourRecipe(items)}>Add Your Recipe</Button>
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
                <Col md={3}>
                    {/* <Row>
                        <h5>Ingredients List</h5>
                        {selectedRec ? (
                            <>
                                <ul>
                                    <li style={{ listStyle: "none" }}>Id: {selectedRec?.id}</li>
                                    <li style={{ listStyle: "none" }}>Name: {selectedRec?.name}</li>
                                </ul>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter ingredient..."
                                    name="ingredients"
                                    value={newIngre.ingredients}
                                    onChange={(e) =>
                                        setNewIngre({ ...newIngre, ingredients: e.target.value })
                                    }
                                />
                                <Button style={{ marginTop: "4px", width: "50px" }} onClick={() => console.log("Add")}>
                                    Add
                                </Button>
                            </>
                        ) : (
                            <>No items</>
                        )}
                    </Row> */}
                    <Row className="mt-3">
                        <h5>Your Recipes:</h5>
                        {yourRecipes.length > 0 ? (
                            <>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yourRecipes.map((items, index) => (
                                            <tr key={index}>
                                                <td>{items?.id}</td>
                                                <td>{items?.name}</td>
                                                <td>
                                                    <Button onClick={() => handleRemoveRecipe(items?.id)}>Remove</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Button style={{ marginTop: "4px", width: "50px" }} onClick={handleSaveYourRecipes}>
                                    Add
                                </Button>
                            </>
                        ) : (
                            <>No items</>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ListRecipes;
