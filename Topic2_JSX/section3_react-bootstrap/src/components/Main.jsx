import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import mainData from "../data.json";

function Main() {
        const products = mainData?.products;
        console.log("Products: ", products);
    return (
      <>
        <Row>
          <Col md={2}>Left main</Col>
          <Col md={10}>
            <Container fluid>
              <Row>
                <Col>cute</Col>
              </Row>
              <Row>
                {products?.map((items) => {
                  return (
                    <Col
                      sm={4}
                      md={3}
                      key={items.id}
                      style={{ padding: "20px" }}
                    >
                      <Card>
                        {/* <Card.Img
                                                    variant="top"
                                                    src={`/assets/images/${items.images[0]}`}
                                                    alt={items.name}
                                                /> */}
                        {/* {items.images.map((image, index) => (
                                                    <Card.Img
                                                        key={index}
                                                        variant="top"
                                                        src={`/assets/images/${image}`}
                                                        alt={`${items.name} image ${index + 1}`}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ))} */}
                        <Carousel>
                          {items.images.map((image, index) => (
                            <Carousel.Item key={index}>
                              <img
                                className="d-block w-100"
                                src={`/assets/images/${image}`}
                                alt={`${items.name} image ${index + 1}`}
                                style={{ height: "150px", objectFit: "cover" }}
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                        <Card.Body>
                          <Card.Title>{items?.name}</Card.Title>
                          <Card.Text>
                            {items?.description.substring(0, 30)}
                          </Card.Text>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              textAlign: "center",
                              gap: "10px",
                            }}
                          >
                            <Button
                              href={"/product-id/${items.id}"}
                              className="btn btn-primary"
                            >
                              View Detail
                            </Button>
                            <Button
                              href="{/add-card/${items.id}}"
                              className="btn btn-success"
                            >
                              Add to Card
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Col>
        </Row>
      </>
    );
}

export default Main