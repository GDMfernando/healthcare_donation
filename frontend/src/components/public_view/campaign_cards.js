import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function CampaignCards() {
  return (
    <Container>
      <div><h2>Popular Campaigns</h2></div>
      <Row xs={2} md={4} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="link">View More</Button>
    </Container>

  );
}

export default CampaignCards;