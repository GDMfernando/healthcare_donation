import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
        {campaigns.map((campaign, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                className="public-card-image"
                src={`http://localhost:5000/uploads/${campaign.image}`}
              />
              <Card.Body>
                <Card.Title>{campaign.name}</Card.Title>
                <Card.Text>{campaign.description}</Card.Text>
                <Card.Text>
                  Goal: LKR
                  {campaign.target}
                </Card.Text>
                <Card.Text>
                  Raised: LKR
                  {campaign.raised}
                </Card.Text>

                <CircularProgressbar
                  value={(campaign.raised / campaign.target) * 100} // Calculate the percentage of goal achieved
                  text={`${Math.round(
                    (campaign.raised / campaign.target) * 100
                  )}%`}
                />
                <Button
                  variant="primary"
                  className="primary_btn"
                  onClick={() => handleDonateCampaignButton(campaign.id)}
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
