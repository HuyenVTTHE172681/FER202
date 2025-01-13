import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  ListGroup,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [subName, setSubName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseP = await axios.get(
          "http://localhost:9999/products/" + id
        );
        setProduct(responseP.data);
        const responseS = await axios.get(
          "http://localhost:9999/suppliers/" + responseP.data.supplier
        );
        setSubName(responseS.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleThumbnailClick = (src) => {
    // Handle thumbnail click logic
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-3">PRODUCT DETAIL</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to={"/"}>
            <Button variant="success">Go to Home</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          {product.images && product.images.length > 0 ? (
            <>
              <Card style={{ width: "2rem" }}>
                <Card.Img
                  variant="top"
                  src={`/assets/images/${product.images[0].name}`}
                />
              </Card>
              <hr />
              <div className="d-flex flex-wrap" style={{ marginTop: "1rem" }}>
                {product.images.map((img, index) => (
                  <Col
                    key={index}
                    onClick={() =>
                      handleThumbnailClick(`/assets/images/${img.name}`)
                    }
                  >
                    <Card.Img
                      variant="top"
                      src={`/assets/images/${img.name}`}
                      style={{ width: "5rem", border: "1px solid transparent" }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.border = "2px solid red")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.border = "1px solid transparent")
                      }
                    />
                  </Col>
                ))}
              </div>
              <hr />
            </>
          ) : (
            <p>No images available</p>
          )}
        </Col>
        <Col md={7}>
          <div>
            <h6>Price: {product.price} vnđ</h6>
            <h8>Supplier: {subName}</h8>
            <h6>Status: {product.status ? "In Stock" : "Out of Stock"}</h6>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
