import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function HospitalCards({ title, hospitals }) {
  return (
    <Container>
      <div className='mt-5 mb-5'><h2>{title}</h2></div>
      <Row xs={2} md={4} className="g-4">
        {hospitals.map((hospital) => {
          return (<Col key={hospital.id}>
            <Card>
              <Card.Img variant="top" className='public-card-image' src={`http://localhost:5000/uploads/${hospital.image}`} alt={`${hospital.name} Image`} />
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>{hospital.description}</Card.Text>
                <Button variant="primary" className="primary_btn">Donate</Button>
              </Card.Body>
            </Card>
          </Col>);
        })}
      </Row>
    </Container>

  );
}

export default HospitalCards;