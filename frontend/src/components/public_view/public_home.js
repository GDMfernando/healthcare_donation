import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar'
import Header from './header'
import StatisticsBar from './statistics_bar';
import HospitalCards from './hospital_cards';
import CampaignCards from './campaign_cards';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { callAPI } from '../../utils/help';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const PublicHome = () => {
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalResponse = await callAPI('hospital/all', 'GET');
        const campaignResponse = await callAPI('campaign/all', 'GET');

        if (hospitalResponse.ok && campaignResponse.ok) {
          const hospitalData = await hospitalResponse.json();
          const campaignData = await campaignResponse.json();

          console.log('Fetched Hospitals:', hospitalData.results);
          console.log('Fetched Campaigns:', campaignData.results);

          setHospitals(hospitalData.results);
          setCampaigns(campaignData.results);
        } else {
          console.log('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleCampaignButtonClick = () => {
    navigate('/');
  };

  const handleHospitalButtonClick = () => {
    navigate('/');
  };
  return (
    <div className='overflow-x-hidden'>
      <NavBar />
      <Header />
      <StatisticsBar />

      <Container>
        <div><h2>Registered Hospitals</h2></div>
        <Row xs={2} md={4} className="g-4">
          {hospitals.map((hospital) => {
    
            return (<Col key={hospital.id}>
              <Card>
                <Card.Img variant="top"  />
                <Card.Body>
                  <Card.Title>{hospital.name}</Card.Title>
                  <Card.Text>7675</Card.Text>
                  <Button variant="primary" className="primary_btn">Donate</Button>
                </Card.Body>
              </Card>
            </Col>);
          })}
        </Row>
        <Button variant="link" onClick={handleHospitalButtonClick}>{"View More"}</Button>
      </Container>
      <CampaignCards title="Popular Campaigns" buttonText="View More" campaigns={campaigns} onButtonClick={handleCampaignButtonClick} />
      <Footer />
    </div>
  );
}
export default PublicHome;