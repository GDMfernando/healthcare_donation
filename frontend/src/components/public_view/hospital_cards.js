// HospitalCards.js
import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function HospitalCards({ title, hospitals, onDonateButtonClick }) {
  // Function to handle the donate button click
  const handleDonateButtonClick = (hospitalId) => {
    onDonateButtonClick(hospitalId);
  };

  // Function to truncate the description text if it exceeds a certain length
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  // Render HospitalCards component
  return (
    <Container>
      <div className="mt-5 mb-5">
        <h2>{title}</h2>
      </div>
      <Row xs={2} md={4} className="g-4">
        {/* Map through each hospital and create a card */}
        {hospitals.map((hospital) => {
          return (
            <Col key={hospital.id}>
              <Card className="hospitalcard">
                <Card.Img
                  variant="top"
                  className="public-card-image"
                  src={`http://localhost:5000/uploads/${hospital.image}`}
                  alt={`${hospital.name} Image`}
                />
                <Card.Body>
                  <div>
                    <Card.Title>{hospital.name}</Card.Title>
                    <Card.Text>
                      {truncateDescription(hospital.description, 72)}
                    </Card.Text>
                  </div>
                  {/* Button to donate to the hospital */}
                  <Button
                    variant="primary"
                    className="primary_btn"
                    onClick={() => handleDonateButtonClick(hospital.id)}
                  >
                    Donate
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default HospitalCards;
