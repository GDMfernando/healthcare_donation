// HospitalPage.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar';
import Footer from './footer';
import { Tab, Tabs, Row, Col, Image } from 'react-bootstrap';
import DonationForm from '../common_components/donation_form';
import { useParams } from 'react-router-dom';
import { callAPI } from '../../utils/help';
import { useLocation } from 'react-router-dom';

const HospitalPage = () => {
  const { hospitalId } = useParams();
  const location = useLocation();
  const { hospitalData } = location.state || {};
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await callAPI(`hospital/public/${hospitalId}`, 'GET');
        if (response.ok) {
          const data = await response.json();
          // setHospitalName(data.name);
        } else {
          console.error('Failed to fetch hospital data');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchHospitalData();
  }, [hospitalId]);

  return (
    <div>
      <h1>{hospitalData.name}</h1>
      <NavBar />
      <div className='hospital-page-box'>
        <Row className="align-items-center p-4">
          <Col xs={12} md={6}>
            <Image
              src="./images/hand-cupping-stethoscope-health-conce.jpg"
              alt="Header Image"
              fluid
            />
          </Col>
          <Col xs={12} md={6} >
            <div className='hospital-page-formbox'>
              <h2 className='mb-4'>Donate to {hospitalData.results.name}</h2>
              <Tabs
                defaultActiveKey="Local"
                id="justify-tab-example"
                justify
              >
                <Tab eventKey="Local" title="Local">
                  <DonationForm />
                </Tab>
                <Tab eventKey="International" title="International">
                <DonationForm />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default HospitalPage;