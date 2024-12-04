import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";

function Detail() {
  return (
    <Container fluid className="py-5 mt-5">
      <Container className="py-5">
        <Row className="g-4 mb-5">
          <Col lg={8} xl={9}>
            <Row className="g-4">
              <Col lg={6}>
                <div className="border rounded" style={{ overflow: "hidden" }}>
                  <a href="#">
                    <img
                      src="https://picsum.photos/200/300"
                      className="img-fluid rounded"
                      alt="Product"
                      style={{ width: "100%", height: "390px" }}
                    />
                  </a>
                </div>
              </Col>

              <Col lg={6}>
                <h4 className="fw-bold mb-3">Brocoli</h4>
                <p className="mb-3">Category: Vegetables</p>
                <h5 className="fw-bold mb-3">3.35 $</h5>
                <InputGroup
                  className="quantity mb-5"
                  style={{ width: "100px" }}
                >
                  <Button
                    variant="light"
                    size="sm"
                    className="rounded-circle border"
                  >
                    <i class="fa fa-minus"></i>
                  </Button>
                  <FormControl className="text-center border-0" value="1" />
                  <Button
                    variant="light"
                    size="sm"
                    className="rounded-circle border"
                  >
                    <i class="fa fa-plus"></i>
                  </Button>
                </InputGroup>
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4 py-2 mb-4"
                >
                  <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to
                  cart
                </Button>
              </Col>

              {/* Tab: Description and Reviews */}
              <Col lg={12}>
                <Tab.Container defaultActiveKey="/description">
                  <Nav variant="underline" className="mb-3">
                    <Nav.Item>
                      <Nav.Link eventKey="description">Description</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content className="mb-5">
                    <Tab.Pane eventKey="description">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Iste error temporibus cumque alias, tempore
                        ratione omnis explicabo velit consequuntur officiis
                        doloribus, nesciunt quos maiores placeat, aperiam at
                        fugiat minima eius!
                      </p>
                      <Carousel>
                        <Carousel.Item>
                          <div className="d-flex justify-content-between">
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="First slide"
                            />
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="Second slide"
                            />
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="Third slide"
                            />
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="Fourth slide"
                            />
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className="d-flex justify-content-between">
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="Fifth slide"
                            />
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="Sixth slide"
                            />
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="Seventh slide"
                            />
                            <img
                              className="d-block"
                              style={{ width: "150px", height: "150px" }}
                              src="https://picsum.photos/200/300"
                              alt="Eighth slide"
                            />
                          </div>
                        </Carousel.Item>
                        {/* You can add more Carousel.Item blocks as needed */}
                      </Carousel>
                    </Tab.Pane>

                    <Tab.Pane eventKey="reviews">
                      {/* Review 1 */}
                      <div className="d-flex">
                        <img
                          src="https://picsum.photos/200/300"
                          className="img-fluid rounded-circle p-3"
                          style={{ width: "100px", height: "100px" }}
                          alt="Reviewer"
                        />
                        <div>
                          <p className="mb-2" style={{ fontSize: "14px" }}>
                            April 12, 2024
                          </p>
                          <div className="d-flex justify-content-between">
                            <h5>Sam Peters</h5>
                          </div>
                          <p>
                            The generated Lorem Ipsum is therefore always free
                            from repetition injected humour, or
                            non-characteristic words etc.
                          </p>
                        </div>
                      </div>
                      {/* Review 2 */}
                      <div className="d-flex">
                        <img
                          src="https://picsum.photos/200/300"
                          className="img-fluid rounded-circle p-3"
                          style={{ width: "100px", height: "100px" }}
                          alt="Reviewer"
                        />
                        <div>
                          <p className="mb-2" style={{ fontSize: "14px" }}>
                            April 12, 2024
                          </p>
                          <div className="d-flex justify-content-between">
                            <h5>Sam Peters</h5>
                          </div>
                          <p>
                            The generated Lorem Ipsum is therefore always free
                            from repetition injected humour, or
                            non-characteristic words etc.
                          </p>
                        </div>
                      </div>
                      <Form className="mt-5">
                        <h5 className="mb-5 fw-bold">Leave a Reply</h5>
                        <Row className="g-4">
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                placeholder="Your Name *"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Control
                                type="email"
                                placeholder="Your Email *"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <Form.Group className="my-4">
                              <Form.Control
                                as="textarea"
                                rows={8}
                                placeholder="Your Review *"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <div className="d-flex justify-content-between py-3 mb-5">
                              <Button
                                variant="outline-secondary"
                                className="rounded-pill px-4 py-3"
                              >
                                Post Comment
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Col>
            </Row>
          </Col>
          <Col lg={4} xl={3}>
            <Row className="g-4 fruite">
              <Col lg={12}>
                <InputGroup className="mb-4">
                  <FormControl placeholder="keywords" />
                  <InputGroup.Text>
                    <i class="fa fa-search"></i>
                  </InputGroup.Text>
                </InputGroup>
                <h4>Categories</h4>
                <ul className="list-unstyled fruite-categorie">
                  <li>
                    <div className="d-flex justify-content-between fruite-name">
                      <a href="#">
                        <i className="fas fa-apple-alt me-2"></i>Apples
                      </a>
                      <span>(3)</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex justify-content-between fruite-name">
                      <a href="#">
                        <i className="fas fa-apple-alt me-2"></i>Pumpkin
                      </a>
                      <span>(5)</span>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Detail;
