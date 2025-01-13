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
  Table,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
function Cart() {
  const location = useLocation();
  const { cart: initialCart = [] } = location.state || {};

  const [cart, setCart] = useState(initialCart);
  console.log(cart);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const vat = total * 0.08;
  const totalWithVat = total + vat;

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center my-3">Shopping cart</h2>
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
        <Col>
          <Link to={"/"} className="float-end">
            clear cart
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Price (vnđ)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Card style={{ width: "10rem" }}>
                      <Card.Img
                        variant="top"
                        src={`assets/images/${item.images[0].name}`}
                      />
                    </Card>
                  </td>
                  <td>{item.price.toLocaleString()}</td>
                  <td>{item.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="float-end">
            <h3>VAT: 8%</h3>
            <h3>Total: {total}</h3>
            <h3>Total (VAT 8%):{totalWithVat}</h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
