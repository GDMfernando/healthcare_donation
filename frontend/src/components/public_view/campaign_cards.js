import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Line } from "rc-progress";

// CampaignCards component definition
function CampaignCards({ title, campaigns, onDonateButtonClick }) {
  const handleDonateCampaignButton = (campaignId) => {
    onDonateButtonClick(campaignId);
  };
  // Function to truncate text to a certain length
  const truncate = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // Render CampaignCards component
  return (
    <Container>
      <div className="mt-5 mb-5">
        <h2>{title}</h2>
      </div>
      <Row xs={2} md={4} className="g-4">
        {campaigns.map((campaign, idx) => (
          <Col key={idx}>
            <Card className="campaignCard">
              <Card.Img
                variant="top"
                className="public-card-image"
                src={`http://localhost:5000/uploads/${campaign.image}`}
              />
              <Card.Body>
                <div>
                  <Card.Title>{truncate(campaign.name, 30)}</Card.Title>
                  <Card.Text>{truncate(campaign.description, 75)}</Card.Text>
                  <Card.Text className="mb-0 card-label">
                    Raised{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                      />
                    </svg>
                  </Card.Text>
                  <Card.Text className="mb-0">
                    LKR {campaign.raised > 0 ? campaign.raised : "0.00"}
                  </Card.Text>

                  <Line
                    percent={(campaign.raised / campaign.target) * 100}
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeColor="#80C242"
                    trailWidth={5}
                  />
                  <div className="campaigncard-target">
                    <Card.Text className="mb-0 ">
                      LKR {campaign.target}
                    </Card.Text>
                    <Card.Text className="mb-0 card-label ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-up-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                        />
                      </svg>
                      Target
                    </Card.Text>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="primary_btn mt-3"
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
