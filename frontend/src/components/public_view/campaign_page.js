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

const CampaignPage = () => {
  const { campaignId } = useParams();
  const location = useLocation();
  const { campaignData } = location.state || {};
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await callAPI(`hospital/public/${campaignId}`, 'GET');
        if (response.ok) {
          const data = await response.json();
        } else {
          console.error('Failed to fetch hospital data');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  return (
    <div>
      <NavBar />
      <Container className='p-0'>
        <div className='hospital-page-box'>
          <Row className="col-md-12 p-4">
            <Col xs={12} md={6}>
              <h1>{campaignData.results.name}</h1>
              <Image className='public-card-image' src={`http://localhost:5000/uploads/${campaignData.results.image}`}></Image>
              <p>{campaignData.results.hospital_name}</p>
              <p>{campaignData.results.target}</p>
              <p>{campaignData.results.description}</p>
            </Col>
            <Col xs={12} md={6} >
              <div className='hospital-page-formbox'>
                <h3 className='mb-4'>Donate to {campaignData.results.name}</h3>
                <Tabs
                  defaultActiveKey="Local"
                  id="justify-tab-example"
                  justify
                >
                  <Tab eventKey="Local" title="Local">
                    <DonationFormLocal />
                  </Tab>
                  <Tab eventKey="International" title="International">
                    <DonationFormInternational></DonationFormInternational>
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

export default CampaignPage;