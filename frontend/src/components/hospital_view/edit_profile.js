import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import hospitalAdmin from "../../hooks/api/hospitalAdmin/hospitalAdmin";

const HospitalEditProfile = (props) => {
  const { activeTab } = props;
  const [cookie, _] = useCookies(["access_token"]);
  const [hospitalData, setHospitalData] = useState({
    name: "",
    address: "",
    phone_number: "",
    email: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    setHospitalData(props.hospitalData);
  }, [activeTab, props.hospitalData]);

  const handleInputChange = (e) => {
    setHospitalData({
      ...hospitalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
        body: JSON.stringify({
          name: hospitalData.name,
          address: hospitalData.address,
          phone_number: hospitalData.phone_number,
          email: hospitalData.email,
          type: hospitalData.type,
          description: hospitalData.description,
        }),
      };

      const response = await hospitalAdmin.updateHospitalData(fetchOptions);

      if (response.success) {
        alert("Successfully updated");
      } else {
        alert("Unsuccessfully updated");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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
              value={hospitalData?.name}
              onChange={handleInputChange}
              placeholder="Enter hospital name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={hospitalData?.address}
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
              name="phone_number"
              value={hospitalData?.phone_number}
              onChange={handleInputChange}
              placeholder="Enter hospital phone number"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={hospitalData?.email}
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
              value={hospitalData?.type}
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
              value={hospitalData?.description}
              onChange={handleInputChange}
              placeholder="Enter hospital description"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" className="primary_btn" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default HospitalEditProfile;
