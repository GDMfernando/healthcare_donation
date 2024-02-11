import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../common_components/login_form';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Login successful');
      } else {
        alert('Login failed. Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          {/* Image on the right */}
          <Image src="./images/hand-cupping-stethoscope-health-conce.jpg" alt="Header Image" fluid />
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
}

export default Login;