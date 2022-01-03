/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../redux/reducers/auth";
import { toast } from "react-toastify";
import { Button, Form, Row, Col } from "react-bootstrap";
import Divider from "./Divider";
import SocialAuthButtons from "./SocialAuthButtons";

const AuthForm = ({ name, displayName, authenticateUser, error }) => {
  const hasLabel = true;
  const layout = "TODO";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Logged in as ${formData.email}`);
    authenticateUser(formData);
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Email address" : ""}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Password" : ""}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remember: e.target.checked,
                })
              }
            />
            <Form.Check.Label className="ms-2 mb-0">
              Remember Me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            Forget Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>

      <Divider className="mt-4">or log in with</Divider>

      <SocialAuthButtons />
    </Form>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit}
        name={name}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: 325,
          width: 400,
          backgroundColor: "rgb(16 20 24 / 50%)",
          // border: "1px solid #48bf84",
          boxShadow: "0 0 1px 0 #E5EAFA",
        }}
      >
        <div>
          <h3 style={{ color: "#E5EAFA" }}>Login</h3>
        </div>
        <div class="d-grid gap-3" style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <div class="col-auto">
              <input
                name="email"
                type="text"
                class="form-control"
                id="autoSizingInputGroup"
                placeholder="Email"
                required
                style={{ backgroundColor: "#E5EAFA" }}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div class="col-auto">
              <input
                name="password"
                type="password"
                class="form-control green"
                id="autoSizingInputGroup"
                placeholder="Password"
                required
                style={{ backgroundColor: "#E5EAFA" }}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <button
            type="submit"
            class="btn"
            style={{
              width: "100%",
              backgroundColor: "#c11c24",
              color: "rgb(35, 44, 51)",
              fontWeight: 700,
            }}
          >
            LOG IN
          </button>
        </div>
        <Link to="/forgot-password" style={{ color: "#E5EAFA" }}>
          Forgot Password?
        </Link>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateUser(formData) {
      dispatch(authenticate({ ...formData }));
    },
  };
};

export default connect(mapLogin, mapDispatch)(AuthForm);
export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
