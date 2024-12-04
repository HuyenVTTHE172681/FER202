import { Col, Row } from "react-bootstrap";

function Header() {
    return (
      <>
        <Row
          id="header"
          style={{
            backgroundColor: "pink",
            color: "white",
            padding: "20px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          <Col style={{ textAlign: "center" }}>Shin nè, Cute hăm</Col>
        </Row>
      </>
    );
}

export default Header
