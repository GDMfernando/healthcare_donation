import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/', {
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
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={6}>
          {/* Image on the right */}
          <Image src="./images/hand-cupping-stethoscope-health-conce.jpg" alt="Header Image" fluid />
        </Col>
        <Col xs={12} md={6}>
          <div>
            <h1>Admin Login</h1>
          </div>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="button" className="mt-3" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>

    </Container>
  );
}

export default Login;