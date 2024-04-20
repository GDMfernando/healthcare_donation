import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../../styles/main.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleHospitalButtonClick = () => {
    navigate('/all-hospitals');
  };

  const handleCampaignButtonClick = () => {
    navigate('/all-campaigns');
  };

    return(
<header className="header">
<Container>
<Row className="flex-column-reverse flex-md-row">
       
        <Col xs={12} md={6} className="order-md-1 d-flex flex-column justify-content-center mb-4"> 
          <div className="text-center text-md-start">
            <h1>Healing Hope for Patients</h1>
            <p>Join WishHealth in Making a Lasting Impact Through Donations.</p>
            <Button variant="primary" className='primary_btn me-2' onClick={handleHospitalButtonClick}>Donate for a hospital</Button>{' '}
            <Button variant="secondary" onClick={handleCampaignButtonClick}>Donate for a patient</Button>
          </div>
        </Col>
        <Col xs={12} md={6} className="order-md-2 mb-3 mb-md-0"> 
          <Image src="./images/hand-cupping-stethoscope-health-conce.jpg" alt="Header Image" fluid />
        </Col>
      </Row>
</Container>
</header>
    );
}

export default Header;

