import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function HospitalCards({title, hospitals, buttonText, onButtonClick }) {
  return (
    <Container>
      <div><h2>{title}</h2></div>
      <Row xs={2} md={4} className="g-4">
      {hospitals.map((hospital) => {
  return (     <Col key={hospital.id}>
            <Card>
              <Card.Img variant="top" src={`http://localhost:5000/uploads/${hospital.image}`} alt={`${hospital.name} Image`} />
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>N/A</Card.Text>
                <Button variant="primary" className="primary_btn">Donate</Button>
              </Card.Body>
            </Card>
          </Col>  );
      })}
      </Row>
      <Button variant="link" onClick={onButtonClick}>{buttonText}</Button>
    </Container>

  );
}

export default HospitalCards;