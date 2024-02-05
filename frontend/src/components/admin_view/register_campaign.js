import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function RegisterCampaigne() {
    const [campaignData, setCampaignData] = useState({
        hospital: '',
        campaignName: '',
        patientName: '',
        campaignTarget: '',
        description: '',
        image: null,
      });


      const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setCampaignData({
          ...campaignData,
          [name]: name === 'image' ? files[0] : value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('hospital', campaignData.hospital);
        formData.append('campaignName', campaignData.campaignName);
        formData.append('patientName', campaignData.patientName);
        formData.append('campaignTarget', campaignData.campaignTarget);
        formData.append('description', campaignData.description);
        formData.append('image', campaignData.image);

        try {
            const response = await axios.post('http://localhost:3000/register-campaign', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            console.log('Campaign registered successfully:', response.data);
          } catch (error) {
            console.error('Error registering campaign:', error);
          }
        };

    return(
        <Container>
        <h2>Register Campaign</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridHospital">
              <Form.Label>Hospital:</Form.Label>
              <Form.Control
                type="text"
                name="hospital"
                value={campaignData.hospital}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            <Form.Group as={Col} controlId="formGridCampaignName">
              <Form.Label>Campaign Name:</Form.Label>
              <Form.Control
                type="text"
                name="campaignName"
                value={campaignData.campaignName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPatientName">
              <Form.Label>Patient Name:</Form.Label>
              <Form.Control
                type="text"
                name="patientName"
                value={campaignData.patientName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            <Form.Group as={Col} controlId="formGridCampaignTarget">
              <Form.Label>Campaign Target:</Form.Label>
              <Form.Control
                type="text"
                name="campaignTarget"
                value={campaignData.campaignTarget}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>
  
          <Form.Group controlId="formGridDescription" className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={campaignData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formGridImage" className="mb-3">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" accept="image/*" name="image" onChange={handleInputChange} required />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Register Campaign
          </Button>
        </Form>
      </Container>
    );
    
}
export default RegisterCampaigne;