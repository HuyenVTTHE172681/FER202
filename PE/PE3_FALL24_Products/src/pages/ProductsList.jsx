import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
function ProductsList() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    // Lấy dữ liệu về các khóa học
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productAPI = await axios.get("http://localhost:9999/product");
                const categoryAPI = await axios.get("http://localhost:9999/category");
                const brandAPI = await axios.get("http://localhost:9999/brand");

                setProducts(productAPI.data);
                setCategory(categoryAPI.data);
                setBrand(brandAPI.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter((product) => {
        const isCategoryMatch = selectedCategory === "" || product.category === selectedCategory;
        const isBrandMatch = selectedBrand === "" || product.brand === selectedBrand;

        return isCategoryMatch && isBrandMatch;
    });

    return (
        <>
        <Container>
            <Row className="text-center py-3">
                <h2>List of Products</h2>
            </Row>
            <Row>
                {/* Bộ lọc loại khóa học */}
                <Col md={2}>
                    <div>
                        <h5>Categories</h5>
                        {category.map((c) => (
                            <Form.Check
                                type="radio"
                                label={c?.name}
                                key={c?.id}
                                value={c?.id}
                                checked={selectedCategory.includes(c?.id)}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            />
                        ))}
                    </div>
                    <div style={{ marginTop: "40px" }}>
                        <h5>Brands</h5>
                        {brand.map((b) => (
                            <Form.Check
                                type="radio"
                                label={b?.name}
                                key={b?.id}
                                value={b?.id}
                                checked={selectedBrand.includes(b?.id)}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                            />
                        ))}
                    </div>
                </Col>

                {/* Hiển thị danh sách khóa học */}
                <Col md={10}>
                    {filteredProducts.length > 0 ? (
                        <Row>
                            {filteredProducts.map((p) => (
                                <Col
                                    sm={4}
                                    md={3}
                                    key={p?.id}
                                    style={{ padding: "20px" }}
                                >
                                    <Card style={{ width: "100%", height: "520px" }}>
                                            <Card.Img
                                                variant="top"
                                                src={`/assets/images/${p?.image}`}
                                                alt={p?.title}
                                                style={{ height: "200px" }}
                                            />
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: "center", height: "60px" }}>{p?.title}</Card.Title>
                                            <Card.Text style={{ fontSize: "12px" }}>
                                                Brand: <strong>{brand.find((c) => c?.id == p?.brand)?.name}</strong>
                                                <br />
                                                Category: <strong>{category.find((c) => c?.id == p?.category)?.name}</strong> 
                                            </Card.Text>
                                            <div style={{ textAlign: "center" }}>
                                                <p style={{ color: "blue", textDecoration: "line-through" }}>Price: $ {p?.price}</p>
                                                <p style={{ color: "red" }}>Discount: {p?.discountPercentage} %</p>
                                                <p style={{ color: "blue" }}>New price: <b>$ {p?.price * (1 - p?.discountPercentage / 100).toFixed(0)}</b> </p>
                                            </div>
                                                <Button
                                                    className="btn btn-success"
                                                    href={`/product/${p?.id}`}
                                                    style={{
                                                    textAlign: "center",
                                                }}
                                                >
                                                    View Details
                                                </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No courses match the selected filter.</p>
                    )}
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default ProductsList;