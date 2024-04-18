// HospitalPage.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar';
import Footer from './footer';
import { Tab, Tabs, Row, Col, Image, Container, Button } from 'react-bootstrap';
import DonationFormLocal from '../common_components/donation_form_local';
import { useParams } from 'react-router-dom';
import { callAPI } from '../../utils/help';
import { useLocation } from 'react-router-dom';
import DonationFormInternational from '../common_components/donation_form_inter';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, EmailShareButton, EmailIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';

const CampaignPage = () => {
  const { campaignId } = useParams();
  const location = useLocation();
  const { campaignData } = location.state || {};
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await callAPI(`hospital/public/${campaignId}`, 'GET');
        if (response.ok) {
          const data = await response.json();
          setCampaign(data.results);
        } else {
          console.error('Failed to fetch hospital data');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  if (!campaignData || !campaignData.results) {
    return <div>Loading...</div>; // Render loading indicator while campaign data is being fetched
  }
  const { name, image, hospital_name, target, description } = campaignData.results;
  const shareUrl = window.location.href;
  const title = `Support ${name} Campaign`;

  return (
    <div>
      <NavBar />
      <Container className='p-0'>
        <div className='hospital-page-box'>
          <Row className="col-md-12 p-4">
            <Col xs={12} md={6}>
              <h1>{campaignData.results.name}</h1>
              <Image className='campaign-page-img' src={`http://localhost:5000/uploads/${campaignData.results.image}`}></Image>
              <p className='m-0 mt-4 donation-page-subheadings'>Hospital</p>
              <p>{campaignData.results.hospital_name}</p>
              <p className='m-0 donation-page-subheadings'>Target </p>
              <p className='donation-target'>{campaignData.results.target}</p>
              <p className='m-0 donation-page-subheadings'>Description</p>
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
              <div className="mt-4">
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FacebookIcon></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon></TwitterIcon>
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} title={title}>
                  <LinkedinIcon></LinkedinIcon>
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={title}><WhatsappIcon></WhatsappIcon></WhatsappShareButton>
                <EmailShareButton url={shareUrl} title={title}><EmailIcon></EmailIcon></EmailShareButton>
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