import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginComponent from "../components/Login"; // Component ko capital rakho

function Login() {
  return (
    <div className="py-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <h2 className="text-center mb-4">Login</h2>
            <LoginComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
