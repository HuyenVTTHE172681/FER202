import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  ListGroup,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseS = await axios.get("http://localhost:9999/suppliers");
        setSuppliers(responseS.data);

        const responseP = await axios.get("http://localhost:9999/products");
        let MapProductToSup = (p) => {
          const supInfo = responseS.data.find((s) => p.supplier == s.id);
          if (supInfo) {
            return { ...p, supplierName: supInfo.name };
          } else {
            return { ...p, supplierName: "Unknown" };
          }
        };
        const product_sup = responseP.data.map(MapProductToSup);
        setProducts(product_sup);
        console.log(product_sup);

        if (selectedSuppliers.length > 0) {
          setProducts(
            product_sup.filter((pd) =>
              selectedSuppliers.includes(pd.supplier.toString())
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedSuppliers]);

  const handleSupplierChange = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    if (checked) {
      setSelectedSuppliers([...selectedSuppliers, value]);
    } else {
      setSelectedSuppliers(
        selectedSuppliers.filter((filter) => filter !== value)
      );
    }
  };

  const handleClick = (product) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === product.id)) {
        return prevCart;
      }
      return [...prevCart, product];
    }); // khi them vao kiem tra neu san pham ton tai thi se khong them vao
    alert("Your product have been add to cart");
  };
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center my-3">ABC Shop</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className="float-end">
            Cart:{" "}
            <Button
              variant="link"
              onClick={() => navigate("/cart", { state: { cart } })}
            >
              [{cart.length}]
            </Button>
          </h5>
        </Col>
      </Row>
      <Row>
        <Col md={2} className="d-none d-sm-block">
          <h5>Filter by Supplier</h5>
          {suppliers.map((supplier) => (
            <Form.Check
              key={supplier.id}
              type="checkbox"
              label={supplier.name}
              onChange={handleSupplierChange}
              value={supplier.id}
            />
          ))}
        </Col>
        <Col>
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={3} className="my-3">
                <Card style={{ width: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={`assets/images/${product.images[0].name}`}
                    style={{ height: "150px" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Price: {product.price.toLocaleString()} VND
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Supplier: {product.supplierName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Status: {product.status ? "In stock" : "Out of stock"}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Link to={`/products/${product.id}`}>
                      <Button variant="danger" className="me-1">
                        Detail
                      </Button>
                    </Link>
                    <Link to={``}>
                      <Button
                        variant="success"
                        onClick={() => handleClick(product)}
                      >
                        Add to cart
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
