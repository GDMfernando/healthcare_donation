import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../common_components/login_form';
import { useNavigate } from "react-router-dom";
import { callAuth, callAPI } from "../../utils/help";
import { useCookies } from "react-cookie";

const HospitalLogin = () => {
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
        navigate("/hospital-dashboard");
      } else {
        alert("Login failed. Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container className="admin_login-wrapper">
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          {/* Image on the right */}
          <Image src="./images/hand-cupping-stethoscope-health-conce.jpg" alt="Header Image" fluid />
        </Col>
        <Col xs={12} md={6}>
          <div>
            <Image src="./images/logo.svg" alt="logo" width="150px" />
            <h1 className='mb-5'>Hospital Login</h1>
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
}

export default HospitalLogin;