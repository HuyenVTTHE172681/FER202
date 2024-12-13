// import React, { useState, useEffect } from "react";
// import { Table, Button, Form, Row, Col } from "react-bootstrap";

// const API_URL_RECIPES = "http://localhost:9999/recipes";
// const API_URL_YOUR_RECIPES = "http://localhost:9999/your_recipes";

// function RecipesManagement() {
//     const [recipes, setRecipes] = useState([]);
//     const [yourRecipes, setYourRecipes] = useState([]);
//     const [searchTag, setSearchTag] = useState("");

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             const response = await fetch(API_URL_RECIPES);
//             const data = await response.json();

//             const enrichedData = data.map((recipe) => ({
//                 ...recipe,
//                 ingredients: recipe.ingredients || "Default Ingredients",
//                 instructions: recipe.instructions || "Default Instructions",
//             }));

//             setRecipes(enrichedData);
//         };

//         fetchRecipes();
//     }, []);

//     const filteredRecipes = recipes.filter((recipe) =>
//         recipe.tags.some((tag) => tag.toLowerCase().includes(searchTag.toLowerCase()))
//     );

//     const handleAddRecipe = (recipe) => {
//         if (!yourRecipes.some((r) => r.id === recipe.id)) {
//             setYourRecipes([...yourRecipes, recipe]);
//         }
//     };

//     const handleRemoveRecipe = (id) => {
//         setYourRecipes(yourRecipes.filter((recipe) => recipe.id !== id));
//     };

//     const handleSaveYourRecipes = async () => {
//         // Lấy số lượng recipe đã lưu từ API
//         const response = await fetch(API_URL_YOUR_RECIPES);
//         const existingData = await response.json();
//         const currentCount = existingData.length;

//         const formattedData = {
//             id: user_id_${ currentCount + 1
//     }, // ID tăng dần
//         recipes: yourRecipes.map((recipe, index) => ({
//             id: currentCount + index + 1, // ID bắt đầu từ số lượng hiện tại
//             ingredients: recipe.ingredients,
//             instructions: recipe.instructions,
//         })),
//     };

// await fetch(API_URL_YOUR_RECIPES, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formattedData),
// });

// alert("Your recipes have been saved!");
// setYourRecipes([]); // Xóa danh sách sau khi lưu
//   };

// return (
//     <div>
//         <h2 className="my-4">Recipes Management</h2>

//         <Form>
//             <Form.Group className="mb-3" controlId="searchTag">
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter Tag to search..."
//                     value={searchTag}
//                     onChange={(e) => setSearchTag(e.target.value)}
//                 />
//             </Form.Group>
//         </Form>

//         <Row>
//             <Col md={6}>
//                 <h4>All Recipes</h4>
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Id</th>
//                             <th>Name</th>
//                             <th>Tags</th>
//                             <th>Function</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredRecipes.map((recipe) => (
//                             <tr key={recipe.id}>
//                                 <td>{recipe.id}</td>
//                                 <td>{recipe.name}</td>
//                                 <td>{recipe.tags.join(", ")}</td>
//                                 <td>
//                                     <Button
//                                         onClick={() => handleAddRecipe(recipe)}
//                                         disabled={yourRecipes.some((r) => r.id === recipe.id)}
//                                     >
//                                         Add Your Recipe
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Col>

//             <Col md={6}>
//                 <h4>Your Recipes</h4>
//                 {yourRecipes.length === 0 ? (
//                     <p>(Empty)</p>
//                 ) : (
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>Id</th>
//                                 <th>Name</th>
//                                 <th>Function</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {yourRecipes.map((recipe, index) => (
//                                 <tr key={index}>
//                                     <td>{recipe?.id}</td>
//                                     <td>{recipe?.name}</td>
//                                     <td>
//                                         <Button
//                                             variant="danger"
//                                             onClick={() => handleRemoveRecipe(recipe.id)}
//                                         >
//                                             Remove
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 )}
//                 <Button className="mt-3" onClick={handleSaveYourRecipes}>
//                     Save
//                 </Button>
//             </Col>
//         </Row>
//     </div>
// );
// }

// export default RecipesManagement;