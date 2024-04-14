// HospitalPage.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar';
import Footer from './footer';
import { Tab, Tabs, Row, Col, Image, Container } from 'react-bootstrap';
import DonationFormLocal from '../common_components/donation_form_local';
import { useParams } from 'react-router-dom';
import { callAPI } from '../../utils/help';
import { useLocation } from 'react-router-dom';
import DonationFormInternational from '../common_components/donation_form_inter';
import PaymentComponent from '../common_components/payment_component';

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
      <NavBar />
      <Container className='p-0'>
        <div className='hospital-page-box'>
          <Row className="p-4 col-md-12">
            <Col xs={12} md={6}>
              <h1>{hospitalData.results.name} Hospital</h1>
              <Image className='public-card-image' src={`http://localhost:5000/uploads/${hospitalData.results.image}`}></Image>
              <p>{hospitalData.results.address}</p>
              <p>{hospitalData.results.email}</p>
              <p>{hospitalData.results.phone_number}</p>
              <p>{hospitalData.results.type}</p>
              <p>{hospitalData.results.description}</p>
            </Col>
            <Col xs={12} md={6} >
              <div className='hospital-page-formbox'>
                <h3 className='mb-4'>Donate to {hospitalData.results.name}</h3>
                <Tabs
                  defaultActiveKey="Local"
                  id="justify-tab-example"
                  justify
                >
                  <Tab eventKey="Local" title="Local">
                    <DonationFormLocal />
                    <PaymentComponent></PaymentComponent>
                  </Tab>
                  <Tab eventKey="International" title="International">
                    <DonationFormInternational></DonationFormInternational>
                    <PaymentComponent></PaymentComponent>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default HospitalPage;