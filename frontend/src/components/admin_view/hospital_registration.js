import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";
import axios from "axios";

const HospitalRegistration = () => {
  const [cookie, _] = useCookies(["access_token"]);
  const [hospitalData, setHospitalData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    type: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setHospitalData({
      ...hospitalData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", hospitalData.name);
      formData.append("address", hospitalData.address);
      formData.append("phone_number", hospitalData.phone);
      formData.append("email", hospitalData.email);
      formData.append("username", hospitalData.username);
      formData.append("password", hospitalData.password);
      formData.append("type", hospitalData.type);
      formData.append("description", hospitalData.description);
      formData.append("image", hospitalData.image);

      const headers = {
        Authorization: `Bearer ${cookie.access_token}`,
      };

      const response = await axios.post(
        "http://localhost:5000/api/hospital/register",
        formData,
        {
          headers: headers,
        }
      );
      if (response?.data?.success) {
        alert("Successfully Registered");
        setHospitalData({
          name: "",
          address: "",
          phone: "",
          email: "",
          username: "",
          password: "",
          type: "",
          description: "",
          image: "",
        });
      } else {
        alert("Unsuccessfully Registered");
      }
    } catch (err) {
      alert("Unsuccessfully Registered");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Hospital Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Hospital Name"
              value={hospitalData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={hospitalData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={hospitalData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={hospitalData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={hospitalData.username}
              onChange={handleInputChange}
              placeholder="Enter Username"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={hospitalData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              required
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="formGridHospitalDescription" className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={hospitalData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridType">
            <Form.Label>Hospital Type:</Form.Label>
            <Form.Select
              defaultValue="Select Hospital Type"
              name="type"
              value={hospitalData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Hospital Type</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formFile">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" className="primary_btn" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default HospitalRegistration;
