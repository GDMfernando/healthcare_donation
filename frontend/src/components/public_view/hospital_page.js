import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar'
import Footer from './footer';
import { Tab, Tabs, Row, Col, Image } from 'react-bootstrap';
import DonationForm from '../common_components/donation_form';

const HospitalPage = () => {

  return (
    <div>
      <NavBar />
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          <Image
            src="./images/hand-cupping-stethoscope-health-conce.jpg"
            alt="Header Image"
            fluid
          />
        </Col>
        <Col xs={12} md={6}>
          <Tabs
            defaultActiveKey="Local"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="Local" title="Local">
              <DonationForm></DonationForm>
            </Tab>
            <Tab eventKey="International" title="International">
              Tab content for Profile
            </Tab>

          </Tabs>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}
export default HospitalPage;