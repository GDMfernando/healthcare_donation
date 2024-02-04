import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../../styles/main.scss';


const Header = () => {
    return(
<header className="header">
<Container>
  <Row>
    <Col xs={12} md={6} className="d-flex align-items-center">
      {/* Content and buttons on the left */}
      <div>
        <h1>Your Content Here</h1>
        <p>Additional details or description</p>
        <Button variant="primary" className='primary_btn'>Donate for a hospital</Button>{' '}
        <Button variant="secondary">Donate for a patient</Button>
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

