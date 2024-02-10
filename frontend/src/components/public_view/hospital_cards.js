import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function HospitalCards({title, hospitals, buttonText, onButtonClick }) {
  return (
    <Container>
      <div><h2>{title}</h2></div>
      <Row xs={2} md={4} className="g-4">
        {hospitals.map((hospital, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={hospital.imageUrl} />
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>{hospital.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="link" onClick={onButtonClick}>{buttonText}</Button>
    </Container>

  );
}

export default HospitalCards;