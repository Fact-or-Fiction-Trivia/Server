import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Logo from "./Logo";
import Section from "./common/Section";
// import AuthSimpleRoutes from 'components/authentication/simple/AuthSimpleRoutes';
import Login from "./Login";

export const AuthSimpleLayout = () => (
  <Section className="py-0">
    <Row className="flex-center min-vh-100 py-6">
      <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
        <Logo />
        <Card>
          <Card.Body className="p-4 p-sm-5">
            {/* <AuthSimpleRoutes /> */}
            <Login />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Section>
);

export default AuthSimpleLayout;
