import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const HospitalRegistration = () => {
  const [hospitalData, setHospitalData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    type: '',
    image: '',
  });

  const handleInputChange = (e) => {
    setHospitalData({
      ...hospitalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/admin-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospitalData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Hospital Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter email" value={hospitalData.name} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" value={hospitalData.address} onChange={handleInputChange} placeholder="Enter Address" required />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" name="phone" value={hospitalData.phone} onChange={handleInputChange} placeholder="Enter Phone Number" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={hospitalData.email} onChange={handleInputChange} placeholder="Enter Email" required />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" name="username" value={hospitalData.username} onChange={handleInputChange} placeholder="Enter Username" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="text" name="password" value={hospitalData.password} onChange={handleInputChange} placeholder="Enter Password" required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridType">
            <Form.Label>Hospital Type:</Form.Label>
            <Form.Select defaultValue="Select Hospital Type" name="type" value={hospitalData.type} onChange={handleInputChange} required>
              <option value="">Select Hospital Type</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formFile">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" value={hospitalData.image}   onChange={handleInputChange}/>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default HospitalRegistration;