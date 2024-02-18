import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "../common_components/login_form";
import { callAuth, callAPI } from "../../utils/help";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const fetchOptions = {
        body: JSON.stringify({ username, password }),
      };
      const response = await callAuth("users/login", "POST", fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setCookies("access_token", data.results.token, {
          path: "/",
          maxAge: 31536000,
        });
        localStorage.setItem("stop", true);
        navigate("/admin-dashboard");
      } else {
        alert("Login failed. Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          {/* Image on the right */}
          <Image
            src="./images/hand-cupping-stethoscope-health-conce.jpg"
            alt="Header Image"
            fluid
          />
        </Col>
        <Col xs={12} md={6}>
          <div>
            <Image src="./images/logo.svg" alt="logo" width="150px" />
            <h1 className="mb-5">Admin Login</h1>
          </div>
          <LoginForm
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onLogin={handleLogin}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
