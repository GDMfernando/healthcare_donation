import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginForm from "../common_components/login_form";
import { callAuth } from "../../utils/help";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  // State variables for username, password, and cookies
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate(); // React Router hook for navigation

  // Function to handle the login process
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
        if (data.results.userType === "SUPER_ADMIN") {
          navigate("/admin-dashboard");
        } else if (data.results.userType === "HOSPITAL_ADMIN") {
          navigate("/hospital-dashboard");
        } else {
          alert("Route not found. Invalid user type");
        }
      } else {
        alert("Login failed. Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    //admin login interface component
    <Container className="admin_login-wrapper">
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
