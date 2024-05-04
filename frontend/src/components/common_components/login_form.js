import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ username, password, onUsernameChange, onPasswordChange, onLogin }) => {
  return (
    <Form>
      <Form.Group controlId="formBasicUsername" className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="button" className="mt-3 primary_btn btn-width btn-width" onClick={onLogin}>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
