import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
        const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9999/product/${id}`).then((response) => {
            setProduct(response.data);
            console.log("Data course: ", response.data);
        });
    }, [id]);

    if (!product) return <p>Loading...</p>;

const deletedProduct = (id) => {
    const confirmDeleted = window.confirm("Do you want to delete this product?");
    if (!confirmDeleted) return;

    axios.delete(`http://localhost:9999/product/${id}`).then(() => {
        navigate('/'); // Navigate to the homepage or product list after deletion
        // window.location.href = '/';
    }).catch((error) => {
        console.log("Error deleting product: ", error);
    });
}


    return (
        <>
            <Container fluid className="py-5 mt-5">
                <Container className="py-5">
                    <Row className="g-4 mb-5">
                        <Col lg={8} xl={9}>
                            <Row className="g-4">
                                <Col lg={6}>
                                    <div className="border rounded" style={{ overflow: "hidden" }}>
                                        <img
                                            src={`/assets/images/${product?.image}`}
                                            className="img-fluid rounded"
                                            alt={product?.title}
                                            style={{ width: "100%", height: "390px" }}
                                        />
                                    </div>
                                </Col>

                                <Col lg={6}>
                                    <h4 className="fw-bold mb-3">{product?.title}</h4>
                                    <p><strong>Id:</strong> {product?.id} </p>
                                    <p><strong>Description:</strong> {product?.description} </p>
                                    <p style={{ color: "blue", textDecoration: "line-through" }}>Price: $ {product?.price}</p>
                                    <p style={{ color: "red" }}>Discount: {product?.discountPercentage} %</p>
                                    <p style={{ color: "blue" }}>New price: <b>$ {product?.price * (1 - product?.discountPercentage / 100).toFixed(0)}</b> </p>
                                    <p><strong>Rating:</strong> {product?.rating} </p>
                                    <p><strong>Rating:</strong> {product?.stock} </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "left",
                                            textAlign: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <Button
                                            variant="success"
                                            className="px-4 py-2 mb-4"
                                            href="/"
                                        >
                                            Back to list
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="px-4 py-2 mb-4"
                                            onClick={() => deletedProduct(product?.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container></>
    );
}

export default ProductDetails;