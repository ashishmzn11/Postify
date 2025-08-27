import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignupComponent from "../components/Signup";

function Signup() {
  return (
    <div className="py-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <h2 className="text-center mb-4">Create an Account</h2>
            <SignupComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
