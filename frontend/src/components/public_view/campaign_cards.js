import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function CampaignCards({ title, campaigns, onDonateButtonClick }) {
  const handleDonateCampaignButton = (campaignId) => {
    onDonateButtonClick(campaignId);
  };

  return (
    <Container>
      <div className="mt-5 mb-5">
        <h2>{title}</h2>
      </div>
      <Row xs={2} md={4} className="g-4">
        {campaigns.map((campaigns, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                className="public-card-image"
                src={`http://localhost:5000/uploads/${campaigns.image}`}
              />
              <Card.Body>
                <Card.Title>{campaigns.name}</Card.Title>
                <Card.Text>{campaigns.description}</Card.Text>
                <Card.Text>
                  Goal:
                  {campaigns.target}
                </Card.Text>
                <Card.Text>
                  Raised:
                  {campaigns.raised}
                </Card.Text>
                <Button
                  variant="primary"
                  className="primary_btn"
                  onClick={() => handleDonateCampaignButton(campaigns.id)}
                >
                  Donate
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CampaignCards;
