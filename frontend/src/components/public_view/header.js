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
  <Row>
    <Col xs={12} md={6} className="d-flex align-items-center">
      {/* Content and buttons on the left */}
      <div>
        <h1>Healing Hope for Patients</h1>
        <p>Join WishHealth in Making a Lasting Impact Through Donations.</p>
        <Button variant="primary" className='primary_btn me-2' onClick={handleHospitalButtonClick}>Donate for a hospital</Button>{' '}
        <Button variant="secondary" onClick={handleCampaignButtonClick}>Donate for a patient</Button>
      </div>
    </Col>
    <Col xs={12} md={6}>
      {/* Image on the right */}
      <Image src="./images/hand-cupping-stethoscope-health-conce.jpg" alt="Header Image" fluid />
    </Col>
  </Row>
</Container>
</header>
    );
}

export default Header;

