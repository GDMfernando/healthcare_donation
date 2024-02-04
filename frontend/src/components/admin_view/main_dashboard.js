import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MainDashboard() {
    const cardsData = [
        {
            title: 'Card 1 Title',
            subtitle: 'Card 1 Subtitle',
            text: 'Some quick example text for Card 1.',
        },

        {
            title: 'Card 2 Title',
            subtitle: 'Card 2 Subtitle',
            text: 'Some quick example text for Card 2.',
        },
        {
            title: 'Card 2 Title',
            subtitle: 'Card 2 Subtitle',
            text: 'Some quick example text for Card 2.',
        },
        {
            title: 'Card 2 Title',
            subtitle: 'Card 2 Subtitle',
            text: 'Some quick example text for Card 2.',
        },
        {
            title: 'Card 2 Title',
            subtitle: 'Card 2 Subtitle',
            text: 'Some quick example text for Card 2.',
        },
        {
            title: 'Card 2 Title',
            subtitle: 'Card 2 Subtitle',
            text: 'Some quick example text for Card 2.',
        },

    ];

    return (
        <div className="card-container">
            <Row>
                {cardsData.map((card, index) => (
                    <Col key={index} md={4} style={{ marginBottom: '15px' }}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{card.subtitle}</Card.Subtitle>
                                <Card.Text>{card.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
export default MainDashboard;