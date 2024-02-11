// CampaignForm.js

import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const CampaignForm = ({ onSubmit, campaignData, handleInputChange, buttonText}) => {
  return (
    <Form onSubmit={onSubmit}>
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

      <Button variant="primary" className='primary_btn' type="submit">
       {buttonText}
      </Button>
    </Form>
  );
};

export default CampaignForm;
