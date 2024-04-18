import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const HospitalEditProfile = () => {
  const [hospitalData, setHospitalData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    type: '',
    description: ''
  });

  useEffect(() => {
    // Fetch hospital data for the logged-in user
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get('/api/hospital/getLoggedInHospital');
        if (response.data.success) {
          setHospitalData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchHospitalData();
  }, []);

  const handleInputChange = (e) => {
    setHospitalData({
      ...hospitalData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/hospital/update/${hospitalData.id}`, hospitalData);
      if (response.data.success) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container>
      <h1>Edit Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={hospitalData.name}
              onChange={handleInputChange}
              placeholder="Enter hospital name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={hospitalData.address}
              onChange={handleInputChange}
              placeholder="Enter hospital address"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={hospitalData.phone}
              onChange={handleInputChange}
              placeholder="Enter hospital phone number"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={hospitalData.email}
              onChange={handleInputChange}
              placeholder="Enter hospital email"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridType">
            <Form.Label>Hospital Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={hospitalData.type}
              onChange={handleInputChange}
            >
              <option value="">Select hospital type</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={hospitalData.description}
              onChange={handleInputChange}
              placeholder="Enter hospital description"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default HospitalEditProfile;
