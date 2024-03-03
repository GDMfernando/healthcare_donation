import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function CampaignCards({ title, buttonText, onButtonClick, campaigns }) {
  return (
    <Container>
      <div><h2>{title}</h2></div>
      <Row xs={2} md={4} className="g-4">
        {campaigns.map((campaigns, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={`http://localhost:5000/uploads/${campaigns.image}`} />
              <Card.Body>
                <Card.Title>{campaigns.name}</Card.Title>
                <Card.Text>
                  {campaigns.description}
                </Card.Text>
                <Card.Text>Goal: 
                  {campaigns.target}
                </Card.Text>
                <Card.Text>Raised: 
                  {campaigns.raised}
                </Card.Text>
                <Button variant="primary" className="primary_btn">Donate</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="link" onClick={onButtonClick}>{buttonText}</Button>
    </Container>

  );
}

export default CampaignCards;